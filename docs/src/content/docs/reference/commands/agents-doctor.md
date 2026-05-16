---
title: "klim agents doctor"
description: Diagnose provider detection, missing binaries, and stale agent caches.
---

`klim agents doctor` answers the question *"why doesn't klim see my
Claude Code plugins?"* It walks each known provider, checks whether
its CLI binary is on `PATH`, validates the on-disk layout, and reports
any issues that would prevent `klim agents` from listing accurate
state.

## Usage

```bash
klim agents doctor [flags]
```

## Flags

| Flag | Description |
|------|-------------|
| `--provider` | Limit checks to a single provider. |
| `--refresh` | Force a fresh provider scan instead of trusting the cache. |
| `--output` | `text` (default), `json`, or `yaml`. |

## What it checks

| Check | Why it matters |
|-------|---------------|
| Provider binary on `PATH` | `klim agents launch` exec's the provider directly; missing binaries make launch fail. |
| Expected config directory exists | If the provider's directory is missing, plugins / MCPs / sessions will appear empty. |
| Manifest files are well-formed | Corrupt JSON / YAML in a provider's plugin manifest hides every entity for that provider. |
| Cache freshness | Stale cache > 24 h triggers a soft warning to run `klim agents refresh`. |
| Marketplaces reachable | For providers with remote marketplaces, can the configured URL be loaded? |

## Examples

```bash
# Full diagnosis across every provider
klim agents doctor

# JSON for CI / scripting
klim agents doctor --output json | jq '.issues[] | select(.severity=="error")'
```

## Output

Text output groups issues by severity (error / warning / info) and
includes a *Fix:* hint where klim can suggest one. Structured output
follows the same schema as `klim doctor`:

```json
{
  "providers": [
    { "id": "claude-code", "detected": true, "version": "0.5.3" }
  ],
  "issues": [
    {
      "severity": "warning",
      "provider": "copilot-cli",
      "message": "agents cache is 26h old",
      "fix": "run `klim agents refresh`"
    }
  ]
}
```
