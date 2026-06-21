---
title: "klim agent skill"
description: Browse agent skills across providers.
---

Skills are reusable prompts / playbooks an agent loads on demand.
`klim agent skill` enumerates them and lets you preview one without
launching the agent.

## Subcommands

```bash
klim agent skill list
klim agent skill show --provider <p> <name>
```

| Command | Description |
|---------|-------------|
| `list` | List every skill across providers. |
| `show` | Print the body of a single skill (markdown / prompt text). |

## Flags

| Flag | Description |
|------|-------------|
| `--provider` | Limit to one provider. Required for `show`. |
| `--output` | `text` (default), `json`, or `yaml`. |

## Examples

```bash
# List all detected skills
klim agent skill list

# Preview a specific skill's body
klim agent skill show --provider claude-code summarize

# Just claude-code's skills, JSON
klim agent skill list --provider claude-code --output json
```

## See also

- [`klim agent launch --skill <name>`](/reference/commands/agents-launch/) —
  open a session with a skill loaded.
