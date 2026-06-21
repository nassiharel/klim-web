---
title: "klim agent"
description: Discover and manage the agent-tooling ecosystem across Claude Code, GitHub Copilot CLI, and MCP servers.
---

`klim agent` is klim's view into the AI agent ecosystem on your machine.
It cuts across multiple agent CLIs — currently **Claude Code** and
**GitHub Copilot CLI** plus the **MCP registry** — and surfaces five
entity types under a single set of subcommands:

| Type | What it is |
|------|-----------|
| **marketplaces** | Sources an agent CLI pulls plugins, skills, and MCPs from. |
| **plugins** | First-party / community extensions installed for a provider. |
| **skills** | Reusable prompts / playbooks loaded by an agent. |
| **mcps** | Model Context Protocol servers — tools an agent can call. |
| **sessions** | Saved or active conversations you can resume / inspect. |

The same data also drives the TUI's **Agents** tab — see the
[Agents Tab guide](/guides/agents/) for the interactive view.

## Usage

```bash
klim agent [command] [flags]
```

Running `klim agent` with no subcommand prints a summary of every
detected entity, grouped by provider.

## Subcommands

| Command | What it does |
|---------|-------------|
| [`klim agent list`](/reference/commands/agents-list/) | List discovered agent entities; filter by `--type`, `--provider`, `--installed`, `--available`, `--search`. |
| [`klim agent search`](/reference/commands/agents-search/) | Fuzzy search across all entities, or scope with `type:query` (e.g. `plugin:auth`). |
| [`klim agent launch`](/reference/commands/agents-launch/) | Open an agent session with a chosen skill / plugin / saved session. |
| [`klim agent marketplace`](/reference/commands/agents-marketplaces/) | Browse / add / remove marketplaces (provider-specific). |
| [`klim agent plugin`](/reference/commands/agents-plugins/) | List / install / remove plugins. |
| [`klim agent skill`](/reference/commands/agents-skills/) | Browse skills. |
| [`klim agent mcp`](/reference/commands/agents-mcps/) | List / install / remove MCP servers. |
| [`klim agent session`](/reference/commands/agents-sessions/) | List, resume, or delete agent sessions. |
| [`klim agent doctor`](/reference/commands/agents-doctor/) | Diagnose provider detection and cache freshness. |
| [`klim agent refresh`](/reference/commands/agents-refresh/) | Invalidate the agents scan cache and rescan from disk. |

## Global flags

These flags apply to most subcommands; individual command pages note any
extras.

| Flag | Description |
|------|-------------|
| `--provider` | Limit to one provider: `claude-code`, `copilot-cli`, or `mcp-registry`. |
| `--type` | Filter by entity type: `marketplace|plugin|skill|mcp|session`. |
| `--installed` | Show only installed entities (plugins / MCPs). |
| `--available` | Show only available (non-installed) catalog entries. |
| `--search` | Same as `klim agent search <query>`. |
| `--refresh` | Ignore the cache and rescan from disk. |
| `--output` | `text` (default), `json`, or `yaml`. |

## Examples

```bash
# Survey everything on this host
klim agent

# Just Claude Code's MCP servers
klim agent list --provider claude-code --type mcp

# Fuzzy search across everything
klim agent search react

# Scoped search — only plugins
klim agent search plugin:auth

# Launch a saved session
klim agent launch --session "claude:home%2Fuser%2Frepo"

# Pipe to jq / yq
klim agent list --output json | jq '.entities[] | select(.type=="plugin")'
klim agent list --output yaml > agents-snapshot.yaml
```

## Where klim looks

klim **doesn't** speak to remote APIs to enumerate agent state — every
provider has a well-known on-disk layout under the user profile, and
klim parses those directly:

| Provider | Layout |
|----------|--------|
| **Claude Code** | `~/.config/claude-code/` (Linux/macOS), `%APPDATA%\Claude\` (Windows). Sessions, plugins, MCPs, marketplaces. |
| **GitHub Copilot CLI** | `~/.config/github-copilot/` and `~/.copilot/`. Plugins, MCPs, session history. |
| **MCP registry** | A bundled catalog of well-known MCP servers, refreshable via `klim agent refresh`. |

The scan is cached per-host (`~/.klim/cache/agents-cache.yaml`) so
repeated runs are fast; pass `--refresh` to force a rescan.

## See also

- [Agents Tab guide](/guides/agents/) — interactive TUI walkthrough
- [`klim agent launch`](/reference/commands/agents-launch/) — open a
  session without remembering the provider's CLI flags
