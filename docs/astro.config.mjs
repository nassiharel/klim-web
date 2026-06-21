import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// `site` and `base` are configurable per deployment target so canonical
// URLs, sitemap entries, and OG meta tags reflect the real public URL:
//
//   - github.io project pages (combined deploy): site=
//     https://<owner>.github.io/<repo> and base=/docs/. The marketing
//     website lives at the root and the docs are mounted under /docs/.
//   - Custom subdomain (docs.klim.dev): site=https://docs.klim.dev
//     and base=/. Mount as the apex of a dedicated host.
//
// The combined Pages workflow (.github/workflows/deploy-pages.yml)
// copies the docs build into `_pages/docs/` of the unified Pages
// artifact, so base=/docs/ is the correct default for that workflow.
// Both env vars are wired from the workflow so a future custom-domain
// switch only needs a workflow edit, not a code change here.
const docsBase = process.env.KLIM_DOCS_BASE ?? '/docs/';
const docsSite = process.env.KLIM_DOCS_SITE ?? 'https://docs.klim.dev';

export default defineConfig({
  site: docsSite,
  base: docsBase,
  integrations: [
    starlight({
      title: 'klim',
      description: 'Documentation for klim — deterministic developer toolchains across local machines, teams, CI, and agents',
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: false,
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/nassiharel/klim' },
      ],
      editLink: {
        baseUrl: 'https://github.com/nassiharel/klim-web/edit/main/docs/',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Quick Start', slug: 'getting-started/quickstart' },
            { label: 'Troubleshooting & FAQ', slug: 'troubleshooting' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'TUI Overview', slug: 'guides/tui-overview' },
            { label: 'Agents Tab', slug: 'guides/agents' },
            { label: 'Favorites', slug: 'guides/favorites' },
            { label: 'Batch Updates', slug: 'guides/batch-updates' },
            { label: 'Backup & Restore', slug: 'guides/backup-restore' },
            { label: 'Team Manifests', slug: 'guides/team-manifests' },
            { label: 'Dashboard', slug: 'guides/dashboard' },
            { label: 'Security', slug: 'guides/security' },
            { label: 'Shell Integration', slug: 'guides/shell-integration' },
            { label: 'Environment Diff', slug: 'guides/environment-diff' },
            { label: 'Adding Tools', slug: 'guides/adding-tools' },
            { label: 'Adding Packs', slug: 'guides/adding-packs' },
          ],
        },
        {
          label: 'CLI Reference',
          items: [
            {
              label: 'Tools',
              items: [
                { label: 'tool search', slug: 'reference/commands/search' },
                { label: 'tool install', slug: 'reference/commands/install' },
                { label: 'tool upgrade', slug: 'reference/commands/upgrade' },
                { label: 'tool remove', slug: 'reference/commands/remove' },
                { label: 'tool info', slug: 'reference/commands/info' },
                { label: 'tool why', slug: 'reference/commands/why' },
                { label: 'tool graph', slug: 'reference/commands/graph' },
                { label: 'tool list', slug: 'reference/commands/list' },
                { label: 'tool try', slug: 'reference/commands/try' },
                { label: 'tool onboard', slug: 'reference/commands/onboard' },
                { label: 'tool watch', slug: 'reference/commands/watch' },
                { label: 'tool catalog', slug: 'reference/commands/tools' },
              ],
            },
            {
              label: 'Projects',
              items: [
                { label: 'project check', slug: 'reference/commands/check' },
                { label: 'project init', slug: 'reference/commands/init' },
                { label: 'project generate', slug: 'reference/commands/generate' },
              ],
            },
            {
              label: 'Plan & Apply',
              items: [
                { label: 'plan show', slug: 'reference/commands/plan' },
                { label: 'plan apply', slug: 'reference/commands/apply' },
                { label: 'plan diff', slug: 'reference/commands/diff' },
                { label: 'plan rollback', slug: 'reference/commands/rollback' },
                { label: 'plan checkpoint', slug: 'reference/commands/checkpoint' },
              ],
            },
            {
              label: 'Environment',
              items: [
                { label: 'env', slug: 'reference/commands/env' },
                { label: 'env trail', slug: 'reference/commands/trail' },
              ],
            },
            {
              label: 'Sharing',
              items: [
                { label: 'share export', slug: 'reference/commands/export' },
                { label: 'share import', slug: 'reference/commands/import' },
                { label: 'share link', slug: 'reference/commands/share' },
                { label: 'share link open', slug: 'reference/commands/open' },
                { label: 'share badge', slug: 'reference/commands/badge' },
              ],
            },
            {
              label: 'Agents',
              items: [
                { label: 'agent', slug: 'reference/commands/agents' },
                { label: 'agent list', slug: 'reference/commands/agents-list' },
                { label: 'agent search', slug: 'reference/commands/agents-search' },
                { label: 'agent launch', slug: 'reference/commands/agents-launch' },
                { label: 'agent marketplace', slug: 'reference/commands/agents-marketplaces' },
                { label: 'agent plugin', slug: 'reference/commands/agents-plugins' },
                { label: 'agent skill', slug: 'reference/commands/agents-skills' },
                { label: 'agent mcp', slug: 'reference/commands/agents-mcps' },
                { label: 'agent session', slug: 'reference/commands/agents-sessions' },
                { label: 'agent doctor', slug: 'reference/commands/agents-doctor' },
                { label: 'agent refresh', slug: 'reference/commands/agents-refresh' },
              ],
            },
            {
              label: 'Security & Diagnostics',
              items: [
                { label: 'doctor', slug: 'reference/commands/health' },
                { label: 'security', slug: 'reference/commands/security' },
                { label: 'security vuln', slug: 'reference/commands/vuln' },
                { label: 'security score', slug: 'reference/commands/score' },
              ],
            },
            {
              label: 'Shell',
              items: [
                { label: 'shell completion', slug: 'reference/commands/completion' },
                { label: 'shell hook', slug: 'reference/commands/hook' },
                { label: 'shell proxy', slug: 'reference/commands/proxy' },
              ],
            },
            {
              label: 'Configuration',
              items: [
                { label: 'config', slug: 'reference/commands/config' },
                { label: 'config marketplace', slug: 'reference/commands/marketplace' },
              ],
            },
            {
              label: 'System',
              items: [
                { label: 'update', slug: 'reference/commands/update' },
                { label: 'version', slug: 'reference/commands/version' },
                { label: 'browser', slug: 'reference/commands/browser' },
              ],
            },
          ],
        },
        {
          label: 'Configuration',
          items: [
            { label: 'config.yaml Reference', slug: 'reference/configuration' },
            { label: 'Output Formats', slug: 'reference/output-formats' },
          ],
        },
        {
          label: 'Contributing',
          items: [
            { label: 'Development', slug: 'contributing/development' },
            { label: 'Architecture', slug: 'contributing/architecture' },
          ],
        },
      ],
    }),
  ],
});
