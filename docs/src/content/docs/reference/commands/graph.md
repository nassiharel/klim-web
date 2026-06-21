---
title: "klim tool graph"
description: Render a force-directed graph of your installed tools.
---

`klim tool graph` draws every tool klim has detected on `PATH` as a node in
a force-directed graph. Edges connect tools that share a property —
category, tag, or package manager — so you can see clusters in your
toolchain at a glance.

## Usage

```bash
klim tool graph [flags]
```

By default the command prints a static terminal snapshot to stdout,
ready to paste into a README or pipe to a file. Use `--tui` for an
animated, fullscreen viewer.

## Flags

| Flag | Description |
|------|-------------|
| `--by` | Edge meaning: `category` (default), `tag`, or `pm`. |
| `--tui` | Open the animated 10fps fullscreen viewer. Sizes itself from the terminal — `--width`/`--height` are rejected with this flag. |
| `--iters` | Max layout iterations for the static snapshot (default 200, cap 5000). |
| `--width` | Render width (0 = autodetect, cap 2000). Static snapshot only. |
| `--height` | Render height (0 = autodetect, cap 2000). Static snapshot only. |

## --by modes

| Mode | Edges connect tools that… |
|------|---------------------------|
| `category` (default) | …share a marketplace category (e.g. `Cloud`, `Editor`). |
| `tag` | …share at least one marketplace tag. |
| `pm` | …were installed by the same package manager (winget / scoop / npm / etc.). The `manual` bucket (binaries klim couldn't attribute to any PM) is intentionally skipped to avoid a giant misleading clique. |

## Examples

```bash
# Static snapshot, default --by category
klim tool graph

# Animated fullscreen
klim tool graph --tui

# Group by tag instead
klim tool graph --by tag

# Group by package manager
klim tool graph --by pm

# Fixed-size snapshot for a README
klim tool graph --width 80 --height 24 > toolchain.txt
```

## Output

Each `●` is a tool node, coloured by category, with the tool name
truncated to 10 characters as a label. Edges are drawn as `·` glyphs
using Bresenham's line algorithm:

```
●azd●code●pwsh●
●tokei                              ·
                                   ●
                                   ·
                                ····
                             ····
●python···········●dotnet●lazygit·········●
```

When stdout isn't a TTY (e.g. piped to a file), the renderer
automatically suppresses ANSI escapes so the output is safe to paste
into a Markdown code fence.

## Caps and safety

- **`--width` / `--height` ≤ 2000** per axis.
- **`width × height` ≤ 250 000 cells** — the area cap scales both
  axes down proportionally if you ask for more, keeping aspect ratio
  intact.
- **`--iters` ≤ 5000** — the static layout simulation is bounded so a
  typo can't pin a CPU.
- **Edges per shared bucket capped at 32** — a tag like `cli` shared
  by 200 tools won't fan out into ~20 000 edges. Larger buckets use a
  star pattern rooted at the first member.
- **Labels are sanitised** — control characters (ANSI escapes,
  newlines) are stripped before drawing so a maliciously-named catalog
  entry can't inject sequences into the rendered grid.

## See also

- [`klim tool list`](/reference/commands/list/) — text-form view of your toolchain.
- [`klim dashboard`](/guides/dashboard/) — TUI breakdown by category / PM / tag.
