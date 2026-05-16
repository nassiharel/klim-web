---
title: "klim agents launch"
description: Launch an agent session with a chosen skill, plugin, or saved session.
---

`klim agents launch` opens an interactive agent session via the
provider's own CLI, but you don't have to remember each provider's
flag syntax. Pick the entity (skill / plugin / saved session), and
klim builds the right command line and either runs it or prints it
for review.

## Usage

```bash
klim agents launch [flags]
```

## Flags

| Flag | Description |
|------|-------------|
| `--provider` | Required when ambiguous: `claude-code`, `copilot-cli`. |
| `--skill <name>` | Launch with a specific skill loaded. |
| `--plugin <name>` | Launch with a specific plugin enabled. |
| `--session <id>` | Resume a saved session (use the full id from `klim agents sessions list`). |
| `--print-only` | Print the launch command instead of executing it — useful for scripts or remote shells. |
| `--cwd <path>` | Override the working directory for the launched session. |

## Examples

```bash
# Start a Claude Code session with the summarize skill loaded
klim agents launch --provider claude-code --skill summarize

# Resume a saved session by id (URL-escaped path)
klim agents launch --session "claude:home%2Fuser%2Frepo"

# Just show me the command — don't execute it
klim agents launch --provider copilot-cli --plugin test-runner --print-only
```

## How it works

klim doesn't shim the provider — it locates the provider's binary on
`PATH`, builds the right argv (passing skill / plugin / session refs in
the provider's native format), and `exec`s into it. The session
inherits your TTY, environment variables, and signal handlers exactly
as if you'd typed the provider command yourself.

`--print-only` is the escape hatch when you want to embed the launch
command in a shell script, a tmux config, or an IDE task without
actually starting an interactive session right now.
