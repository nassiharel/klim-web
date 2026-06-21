---
title: "klim tool remove"
description: Remove installed tools via the system package manager
---

`klim tool remove` uninstalls tools using the package manager they were
originally installed from (detected via the `klim tool list` scan), or the
`--source` you specify. Falls back to OS-priority when the installed
source isn't recorded. Source precedence overall matches
[`klim tool install`](./install).

## Usage

```bash
klim tool remove [tool...] [flags]
```

At least one positional tool name **or** `--pack` is required.

## Behavior per target

| State | Outcome |
|-------|---------|
| Installed | remove |
| Not installed | skipped (`not_installed`) |
| `klim` itself | refused — use the OS uninstaller for klim |
| Not in catalog | reported, skipped |

The self-protection refuses to remove the binary named `klim`, so
`klim tool remove klim` never runs the underlying package manager.

## Flags

Same as [`klim tool install`](./install#flags):
`--source`, `--pack` (repeatable), `--dry-run`, `--yes`/`-y`,
`--refresh`, `--output`.

## Examples

```bash
# Remove a single tool
klim tool remove jq

# Remove every installed tool in a pack
klim tool remove --pack go-developer --yes

# Pin the package manager
klim tool remove jq fzf --source brew --dry-run
```

## Exit codes

Same as `klim tool install`: 0 OK, 1 runtime error, 2 usage error,
3 partial failure.

## See also

- [`klim tool install`](./install)
- [`klim tool upgrade`](./upgrade)
