---
title: "klim agent marketplace"
description: Browse and manage agent marketplaces (Claude Code, Copilot CLI).
---

Some agent providers pull plugins / skills / MCPs from one or more
marketplaces — URLs that point at a catalog index. `klim agent
marketplaces` lets you list, add, and remove those URLs through one
common interface.

## Subcommands

```bash
klim agent marketplace list
klim agent marketplace add --provider <p> <url>
klim agent marketplace remove --provider <p> <url>
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
klim agent marketplace list

# Add a marketplace to Claude Code
klim agent marketplace add --provider claude-code https://example.com/cc-marketplace.yaml

# Remove a marketplace
klim agent marketplace remove --provider copilot-cli https://stale.example.com/idx.yaml
```

## Notes

klim writes through to each provider's native config file (no klim
sidecar state), so changes you make here are immediately visible to
the underlying CLI on its next launch.
