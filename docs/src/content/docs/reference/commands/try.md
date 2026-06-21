---
title: "klim tool try"
description: Install a tool temporarily and run it
---

Install a tool, run it with optional arguments, then offer to remove it. Try before you commit.

## Usage

```bash
klim tool try <tool> [-- args...] [flags]
```

## Flags

| Flag | Description |
|------|-------------|
| `--keep` | Keep the tool after trying (skip removal prompt) |

## Examples

```bash
# Install bat, open interactive mode, then ask keep/remove
klim tool try bat

# Install bat, run it on a file, then ask keep/remove
klim tool try bat -- README.md

# Install ripgrep and search — keep it afterwards
klim tool try ripgrep --keep -- -i "TODO" .
```

## How It Works

1. Checks if the tool is already installed (skips install if so)
2. Installs via the best available package manager
3. Runs the tool with any provided arguments
4. After the tool exits, prompts: **"Keep or remove?"**
5. If you choose to remove, runs the package manager's uninstall command

## Notes

- If the tool is already installed, `klim tool try` just runs it (no cleanup prompt)
- The tool's exit code is propagated to the caller
- `--keep` skips the cleanup prompt entirely

## See Also

- [klim shell proxy](../proxy/) — Auto-install shims for permanent lazy-loading
