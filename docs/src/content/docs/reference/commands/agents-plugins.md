---
title: "klim agents plugins"
description: List, install, and remove agent plugins.
---

Plugins are the first-party / community extensions an agent CLI loads
at startup. `klim agents plugins` is the cross-provider front-end for
managing them.

## Subcommands

```bash
klim agents plugins list
klim agents plugins install --provider <p> <name>
klim agents plugins remove --provider <p> <name>
```

| Command | Description |
|---------|-------------|
| `list` | Show every plugin detected across providers. |
| `install` | Install a plugin from a configured marketplace. |
| `remove` | Uninstall a plugin. |

## Flags

| Flag | Description |
|------|-------------|
| `--provider` | Required for install / remove. |
| `--installed` | (list only) Show only installed plugins. |
| `--available` | (list only) Show only available, non-installed entries. |
| `--output` | `text` (default), `json`, or `yaml`. |

## Examples

```bash
# Every plugin klim can see
klim agents plugins list

# Only what's installed, as YAML
klim agents plugins list --installed --output yaml

# Install a plugin
klim agents plugins install --provider claude-code react-test-helper

# Remove a plugin
klim agents plugins remove --provider claude-code react-test-helper
```

## What gets called underneath

For both install and remove klim invokes the provider's native plugin
command (`claude-code plugin install …`, etc.) — no klim-specific
state is written. The cached entity list (`~/.klim/cache/agents-cache.yaml`)
is invalidated automatically on success.
