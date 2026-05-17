---
title: "klim agents marketplaces"
description: Browse and manage agent marketplaces (Claude Code, Copilot CLI).
---

Some agent providers pull plugins / skills / MCPs from one or more
marketplaces — URLs that point at a catalog index. `klim agents
marketplaces` lets you list, add, and remove those URLs through one
common interface.

## Subcommands

```bash
klim agents marketplaces list
klim agents marketplaces add --provider <p> <url>
klim agents marketplaces remove --provider <p> <url>
```

| Command | Description |
|---------|-------------|
| `list` | Show every configured marketplace, grouped by provider. |
| `add` | Add a new marketplace URL to a provider's configuration. |
| `remove` | Remove a marketplace from a provider's configuration. |

## Flags

| Flag | Description |
|------|-------------|
| `--provider` | Required for `add` / `remove`. One of `claude-code`, `copilot-cli`. |
| `--output` | `text` (default), `json`, or `yaml`. |

## Examples

```bash
# Show every configured marketplace
klim agents marketplaces list

# Add a marketplace to Claude Code
klim agents marketplaces add --provider claude-code https://example.com/cc-marketplace.yaml

# Remove a marketplace
klim agents marketplaces remove --provider copilot-cli https://stale.example.com/idx.yaml
```

## Notes

klim writes through to each provider's native config file (no klim
sidecar state), so changes you make here are immediately visible to
the underlying CLI on its next launch.
