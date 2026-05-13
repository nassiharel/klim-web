import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import https from 'node:https';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

// import.meta.dirname is Node 20+ only. The Astro toolchain pinned in
// our lockfile still runs on Node 18 in some CI images, so derive the
// directory portably via fileURLToPath / path.dirname.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const OUT = path.resolve(__dirname, '../src/data/marketplace.json');

// The assembled marketplace catalog lives in the klim repo's
// `marketplace` branch. The deploy-pages workflow fetches it via curl
// before this script runs. Locally we fall back to the user's klim
// cache, and finally to a remote fetch so `npm run dev` works on a
// fresh clone.
const MARKETPLACE_URL =
  'https://raw.githubusercontent.com/nassiharel/klim/marketplace/marketplace.yaml';

function fetchRemote(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      })
      .on('error', reject);
  });
}

async function loadMarketplace() {
  // 1. CI-staged marketplace.yaml at repo root (deploy-pages.yml curls
  //    it before running the build).
  const repoRoot = path.resolve(__dirname, '../../marketplace.yaml');
  if (fs.existsSync(repoRoot)) {
    const stat = fs.statSync(repoRoot);
    if (stat.size > 100) {
      console.log(`  Loaded marketplace from ${repoRoot}`);
      return yaml.load(fs.readFileSync(repoRoot, 'utf8'));
    }
  }

  // 2. User's local klim cache (best UX for `npm run dev`).
  const userCache = path.join(
    os.homedir(),
    '.klim',
    'marketplace',
    'marketplace-cache.yaml',
  );
  if (fs.existsSync(userCache)) {
    console.log(`  Loaded marketplace from ${userCache}`);
    return yaml.load(fs.readFileSync(userCache, 'utf8'));
  }

  // 3. Remote fallback.
  console.log(`  Fetching marketplace from ${MARKETPLACE_URL}`);
  const body = await fetchRemote(MARKETPLACE_URL);
  return yaml.load(body);
}

const data = await loadMarketplace();
const rawTools = Array.isArray(data?.tools) ? data.tools : [];
const rawPacks = Array.isArray(data?.packs) ? data.packs : [];

const tools = rawTools.map(t => ({
  name: t.name,
  display_name: t.display_name || t.name,
  category: t.category || 'Other',
  tags: Array.isArray(t.tags) ? t.tags : [],
  binary_names: Array.isArray(t.binary_names) ? t.binary_names : [],
  github: t.github || null,
  packages: t.packages || {},
  github_info: t.github_info || null,
}));

const packs = rawPacks.map(p => ({
  name: p.name,
  display_name: p.display_name || p.name,
  description: p.description || '',
  icon: p.icon || '📦',
  tools: Array.isArray(p.tools) ? p.tools : [],
}));

tools.sort((a, b) =>
  a.display_name.localeCompare(b.display_name, undefined, { sensitivity: 'base' }),
);
packs.sort((a, b) =>
  a.display_name.localeCompare(b.display_name, undefined, { sensitivity: 'base' }),
);

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ tools, packs }, null, 2));

console.log(`Generated marketplace.json: ${tools.length} tools, ${packs.length} packs`);
