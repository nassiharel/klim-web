---
title: "klim shell proxy"
description: Manage auto-install shims for CLI tools
---

Create lightweight shims that auto-install tools on first use. When you run a shimmed tool that isn't installed, klim automatically installs it via the best available package manager, then runs it.

## Subcommands

| Command | Description |
|---------|-------------|
| `klim shell proxy setup` | Create the shims directory and show PATH instructions |
| `klim shell proxy add <tool> [tool...]` | Create shims for one or more tools |
| `klim shell proxy remove <tool> [tool...]` | Remove shims |
| `klim shell proxy list` | List active shims |

## Setup

```bash
# Create the shims directory
klim shell proxy setup

# Add shims directory to your PATH (shown by setup)
export PATH="$HOME/.klim/shims:$PATH"

# Create shims for tools
klim shell proxy add kubectl terraform helm
```

## How It Works

1. `klim shell proxy add kubectl` creates a lightweight shim script in `~/.klim/shims/`
2. When you run `kubectl`, the shim checks if the real `kubectl` is installed elsewhere in PATH
3. If found → runs it directly
4. If not found → installs via the best available package manager, then runs it

## Examples

```bash
# Set up and create shims
klim shell proxy setup
klim shell proxy add kubectl terraform helm jq

# List active shims
klim shell proxy list

# Remove a shim
klim shell proxy remove kubectl
```

## See Also

- [klim tool try](../try/) — Try a tool temporarily
