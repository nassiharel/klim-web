---
title: "klim agent refresh"
description: Invalidate the agents scan cache and force a fresh provider walk.
---

`klim agent refresh` drops `~/.klim/cache/agents-cache.yaml` and
rescans every provider's on-disk state. Use it when you've just
installed a plugin / MCP outside of klim, or when `klim agent
doctor` reports a stale cache.

## Usage

```bash
klim agent refresh [flags]
```

## Flags

| Flag | Description |
|------|-------------|
| `--provider` | Refresh only one provider's cache slice. |
| `--output` | `text` (default), `json`, or `yaml`. |

## Examples

```bash
# Rescan everything
klim agent refresh

# Just claude-code
klim agent refresh --provider claude-code
```

## Notes

The cache is otherwise refreshed on a best-effort basis when you run
`klim agent list` with `--refresh`, or after a successful `plugins
install` / `mcps install`. Explicit `klim agent refresh` is mostly
useful in scripts or after manual edits to a provider's config
directory.
