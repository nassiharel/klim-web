---
title: Agents Tab
description: Discover and manage AI agent ecosystems across Claude Code and GitHub Copilot CLI from the klim TUI.
---

The **Agents** tab (key `5`) gives klim's TUI a single home for the
AI agent ecosystem on your machine. It works across multiple agent
CLIs — currently **Claude Code** and **GitHub Copilot CLI** — plus
the bundled **MCP registry**, and surfaces five entity types under
one set of sub-tabs:

| Sub-tab | Shows |
|---------|-------|
| **Marketplaces** | Catalog sources each provider pulls from. |
| **Plugins** | First-party / community plugins detected per provider. |
| **Skills** | Reusable prompts / playbooks. |
| **MCPs** | Model Context Protocol servers — tools an agent can call. |
| **Sessions** | Saved or active conversations you can resume. |

## Keys

| Key | Action |
|-----|--------|
| `5` | Jump to the Agents tab |
| `Tab` / `Shift-Tab` | Cycle sub-tabs |
| `/` | Open the scoped search overlay (e.g. `plugin:auth`) |
| `r` | Refresh — invalidate cache and rescan disk |
| `l` | **Launch** the selected session / skill / plugin |
| `enter` | Open the entity detail page |
| `i` | Install (plugins / MCPs only) |
| `x` | Remove (plugins / MCPs only) |
| `?` | Show context-sensitive help |

## What klim reads

klim doesn't speak to remote APIs to enumerate agent state — every
provider has a well-known on-disk layout under the user profile,
and klim parses those directly:

| Provider | Layout |
|----------|--------|
| **Claude Code** | `~/.config/claude-code/` (Linux / macOS), `%APPDATA%\Claude\` (Windows). |
| **GitHub Copilot CLI** | `~/.config/github-copilot/` and `~/.copilot/`. |
| **MCP registry** | A bundled catalog refreshable via `klim agent refresh`. |

The scan is cached at `~/.klim/cache/agents-cache.yaml` so the tab
loads instantly on subsequent runs. Hit `r` (or run
`klim agent refresh` from the CLI) to force a rescan.

## Provider health

If a provider isn't detected — binary missing from `PATH`, config
directory absent, or manifest files unreadable — the sub-tab shows
the issue inline and points at `klim agent doctor` for full
diagnostics.

## Launching a session

Highlight a skill / plugin / session row and press `l`. klim builds
the provider's native CLI command (skill / plugin / session refs in
the right format) and `exec`s into it. Your TTY, environment, and
signal handlers all carry through, so the session behaves exactly as
if you'd typed the provider command by hand.

The corresponding CLI commands cover the same surface:

- [`klim agent`](/reference/commands/agents/) — overview + global flags
- [`klim agent list`](/reference/commands/agents-list/)
- [`klim agent search`](/reference/commands/agents-search/)
- [`klim agent launch`](/reference/commands/agents-launch/)
- [`klim agent doctor`](/reference/commands/agents-doctor/)

## Cross-provider promote

When the same entity (e.g. a plugin) is available on multiple
providers, the detail page exposes a **Promote** action — pick the
provider you want to mirror it to. Promote is also available from
`klim agent` via the future cross-provider helpers; see the agents
overview for the matrix of supported promotions.

## Costs view

Some providers (Claude Code via the `claude-code-statusline` plugin,
Copilot CLI via its built-in telemetry) expose per-session cost data.
When detected, the Agents → Sessions sub-tab shows a **Costs**
column rolled up from those provider records. This is purely a
local view — klim never sends agent data anywhere.
