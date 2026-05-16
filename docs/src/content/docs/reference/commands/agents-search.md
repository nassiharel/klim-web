---
title: "klim agents search"
description: Fuzzy-search across every agent entity klim has detected.
---

`klim agents search` runs a fuzzy match across every detected agent
entity (marketplaces, plugins, skills, MCPs, sessions) and ranks the
results by score. Use `type:query` to scope the search to a single
entity type.

## Usage

```bash
klim agents search <query> [flags]
```

## Flags

| Flag | Description |
|------|-------------|
| `--provider` | Limit to one provider. |
| `--limit` | Cap the number of results returned (default 20). |
| `--output` | `text` (default), `json`, or `yaml`. |

## Scoped search

Prefix the query with `<type>:` to restrict the match to one entity
type:

| Prefix | Searches |
|--------|----------|
| `plugin:` | Plugins only |
| `skill:` | Skills only |
| `mcp:` | MCP servers only |
| `session:` | Sessions only |
| `marketplace:` | Marketplaces only |

## Examples

```bash
# Fuzzy search across everything
klim agents search react

# Scoped — only plugins
klim agents search plugin:auth

# Limit + JSON output
klim agents search test --limit 5 --output json
```

## Output

Text output sorts results by descending fuzzy-match score; the type
prefix tells you what each row is.

```
  Score  Type     Provider     Name                Description
  ─────  ───────  ───────────  ──────────────────  ──────────────────────────────
  98     plugin   claude-code  react-test-helper   React component test scaffolds
  82     skill    copilot-cli  test-failure        Diagnose failing test output
  76     mcp      claude-code  testcontainers      MCP for Testcontainers
```
