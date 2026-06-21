---
title: "klim share import"
description: Install tools from an exported manifest
---

Install tools listed in a YAML manifest created by `klim share export`.

## Usage

```bash
klim share import <file> [flags]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `<file>` | Path to the YAML manifest file |

## Flags

| Flag | Short | Description |
|------|-------|-------------|
| `--yes` | `-y` | Install all tools without prompting |

## Examples

```bash
# Interactive — confirm before installing each tool
klim share import my-tools.yaml

# Non-interactive — install everything
klim share import my-tools.yaml --yes
```

## How It Works

1. Reads the YAML manifest
2. For each tool, determines the best package manager for the current OS
3. Runs the native install command (e.g., `brew install`, `winget install`)
4. Invalidates the scan cache so subsequent commands reflect the changes

## See Also

- [`klim share export`](../export/) — Export tools to a manifest
- [`klim share link open`](../open/) — Install from a share token
