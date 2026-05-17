---
title: "klim badge"
description: Generate Shields.io-compatible README badges for your klim environment.
---

`klim badge` prints Shields.io-compatible badge markdown that summarises
your current klim state. Drop the output into a project README, a
personal profile, a team dashboard, or a CI status page to show off (or
alert on) your toolchain health.

## Usage

```bash
klim badge [flags]
```

## Badges

| Badge | What it shows |
|-------|---------------|
| **klim score** | Overall environment score X/Y graded A+..F (matches `klim score --badge`). |
| **klim tools** | Number of installed tools. |
| **klim audit** | Audit-findings count (`clean` or `N issues`). Counts klim audit warnings + infos — **not** vulnerability scan results; for CVEs use `klim security`. |
| **klim fresh** | Percentage of installed tools currently up to date. |

By default every badge is printed. Use the per-badge flags to pick a
subset.

## Flags

| Flag | Description |
|------|-------------|
| `--all` | Print every badge (the no-flag default). |
| `--score` | Include the score badge. |
| `--tools` | Include the tools badge. |
| `--audit` | Include the audit badge. |
| `--fresh` | Include the fresh-percent badge. |
| `--refresh` | Ignore the scan cache and rescan. |
| `--output` | `text` (default, Markdown), `json`, or `yaml`. |

## Examples

```bash
# Every badge, ready to paste into a README
klim badge

# Just score + audit
klim badge --score --audit

# Score badge URL only — same colour table as `klim score --badge`
klim badge --score | head -1

# Machine-readable
klim badge --output json
klim badge --output yaml > badges.yaml
```

## Output

Text output is Markdown — one badge per line:

```markdown
[![klim score](https://img.shields.io/badge/klim%20score-61%2F100%20D-orange)](https://github.com/nassiharel/klim)
[![klim tools](https://img.shields.io/badge/klim%20tools-23-blue)](https://github.com/nassiharel/klim)
[![klim audit](https://img.shields.io/badge/klim%20audit-clean-brightgreen)](https://github.com/nassiharel/klim)
[![klim fresh](https://img.shields.io/badge/klim%20fresh-87%25-green)](https://github.com/nassiharel/klim)
```

The score badge's colour comes from `internal/score.BadgeColor`, the
same helper `klim score --badge` uses, so the two commands always
agree on the colour for the same score.

## Performance

`klim badge` only runs the doctor + compliance + audit pipeline when
the badges you asked for need it. `klim badge --tools --fresh` skips
that work entirely; `klim badge --output yaml` includes the full
structured score block so it always runs the full pipeline.
