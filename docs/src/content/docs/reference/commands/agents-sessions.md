---
title: "klim agent session"
description: List, resume, and delete agent sessions.
---

Each provider keeps a record of past agent conversations. `klim agent
sessions` is a uniform view: list them, resume one, or delete an old
session you no longer need.

## Subcommands

```bash
klim agent session list
klim agent session resume <id>
klim agent session delete <id>
```

| Command | Description |
|---------|-------------|
| `list` | Show every saved session across providers. |
| `resume` | Re-open a session — equivalent to `klim agent launch --session <id>`. |
| `delete` | Delete a session record from the provider's history store. |

## Flags

| Flag | Description |
|------|-------------|
| `--provider` | Limit to one provider. |
| `--limit` | (list only) Cap rows returned (default 50). |
| `--output` | `text` (default), `json`, or `yaml`. |

## Session ids

Session ids embed the provider, the working directory, and the session
nonce, URL-escaped so they survive shell-quoting:

```
claude:home%2Fuser%2Frepo:4b5e737e
copilot:home%2Fuser%2Frepo:770b0f2b
```

You can copy a row's id from `klim agent session list` and pass it
verbatim to `resume` / `delete`.

## Examples

```bash
# Latest 20 sessions across every provider
klim agent session list --limit 20

# Just Claude Code, YAML
klim agent session list --provider claude-code --output yaml

# Resume the most recent session for the current directory
klim agent session resume claude:$(pwd | jq -sRr @uri)

# Delete a session
klim agent session delete copilot:home%2Fuser%2Frepo:770b0f2b
```
