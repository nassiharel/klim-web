---
title: "klim agent mcp"
description: List, install, and remove Model Context Protocol (MCP) servers.
---

MCP (Model Context Protocol) servers are tools an agent can call —
filesystem access, database queries, web fetch, etc. `klim agent
mcps` is the cross-provider front-end for managing them.

## Subcommands

```bash
klim agent mcp list
klim agent mcp install --provider <p> <name>
klim agent mcp remove --provider <p> <name>
```

| Command | Description |
|---------|-------------|
| `list` | Show every MCP detected across providers, plus available entries from the MCP registry. |
| `install` | Install an MCP for a provider. |
| `remove` | Uninstall an MCP. |

## Flags

| Flag | Description |
|------|-------------|
| `--provider` | Required for install / remove. |
| `--installed` | (list only) Show only installed MCPs. |
| `--available` | (list only) Show only available registry entries that aren't installed. |
| `--output` | `text` (default), `json`, or `yaml`. |

## Examples

```bash
# Everything detected + available
klim agent mcp list

# Only Claude Code's installed MCPs
klim agent mcp list --provider claude-code --installed

# Install an MCP
klim agent mcp install --provider claude-code filesystem

# Remove one
klim agent mcp remove --provider claude-code filesystem
```

## The MCP registry

klim bundles a curated registry of well-known MCP servers. Entries
appear in `klim agent mcp list --available` and can be installed
into any provider that supports MCP. Refresh the bundled registry
with `klim agent refresh`.
