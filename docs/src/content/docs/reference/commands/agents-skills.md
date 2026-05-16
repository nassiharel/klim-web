---
title: "klim agents skills"
description: Browse agent skills across providers.
---

Skills are reusable prompts / playbooks an agent loads on demand.
`klim agents skills` enumerates them and lets you preview one without
launching the agent.

## Subcommands

```bash
klim agents skills list
klim agents skills show --provider <p> <name>
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
klim agents skills list

# Preview a specific skill's body
klim agents skills show --provider claude-code summarize

# Just claude-code's skills, JSON
klim agents skills list --provider claude-code --output json
```

## See also

- [`klim agents launch --skill <name>`](/reference/commands/agents-launch/) —
  open a session with a skill loaded.
