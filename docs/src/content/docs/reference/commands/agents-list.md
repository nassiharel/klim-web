---
title: "klim agent list"
description: List discovered agent marketplaces, plugins, skills, MCPs, and sessions across every detected provider.
---

`klim agent list` enumerates every agent entity klim has detected on
this host: marketplaces, plugins, skills, MCPs, and sessions. Filter
by type, provider, or installation state to narrow the result.

## Usage

```bash
klim agent list [flags]
```

## Flags

| Flag | Description |
|------|-------------|
| `--type` | Filter by entity type: `marketplace`, `plugin`, `skill`, `mcp`, `session`. |
| `--provider` | Limit to one provider: `claude-code`, `copilot-cli`, `mcp-registry`. |
| `--installed` | Show only installed entities (plugins / MCPs). |
| `--available` | Show only available (non-installed) catalog entries. |
| `--search` | Fuzzy filter — same as `klim agent search <query>` but applied to the list output. |
| `--refresh` | Ignore the agents scan cache and rescan from disk. |
| `--output` | `text` (default), `json`, or `yaml`. |

## Examples

```bash
# Everything detected, grouped by provider
klim agent list

# Only Claude Code's MCPs
klim agent list --provider claude-code --type mcp

# Installed plugins only
klim agent list --type plugin --installed

# Pipe to jq for scripting
klim agent list --output json | jq '.entities[] | select(.installed==true) | .name'

# Snapshot to YAML
klim agent list --output yaml > agents-state.yaml
```

## Output

Text output groups entities by provider, with one column per type and
a count next to each header. JSON and YAML emit a stable schema:

```yaml
generated_at: 2026-05-16T19:15:00Z
providers:
  - id: claude-code
    detected: true
    version: 0.5.3
    counts:
      marketplaces: 1
      plugins: 4
      skills: 7
      mcps: 3
      sessions: 12
entities:
  - id: claude-code:plugin:auth-helper
    type: plugin
    provider: claude-code
    name: auth-helper
    installed: true
    version: 1.2.0
    description: OAuth/JWT helpers for agent sessions
  # …
```

See the [agents overview](/reference/commands/agents/) for what each
entity type means and where klim reads it from on disk.
