---
title: "klim tool search"
description: Search the tool marketplace
---

Search the tool marketplace by name, description, category, tags, or GitHub topics. Results are ranked by relevance and GitHub stars.

## Usage

```bash
klim tool search <query> [flags]
```

## Flags

| Flag | Short | Description |
|------|-------|-------------|
| `--category` | `-c` | Filter by category |
| `--limit` | `-n` | Max results to show (default: 15) |

## How Matching Works

The search engine scores each tool against your query by matching:

| Field | Weight | Example |
|-------|--------|---------|
| Exact name match | Highest | `klim tool search jq` → exact hit |
| Partial name match | High | `klim tool search kube` → kubectl, kubectx |
| Category | Medium | `klim tool search cloud` → Cloud tools |
| Tags | Medium | `klim tool search encryption` → age, sops |
| GitHub topics | Medium | `klim tool search ci` → act, gh |
| Description | Low | `klim tool search "json processor"` → jq, yq |

Results are then boosted by GitHub star count for popular tools.

## Examples

```bash
# Find JSON tools
klim tool search json

# Multi-word search
klim tool search "kubernetes dashboard"

# Filter by category
klim tool search cli --category Security

# Limit results
klim tool search cloud -n 5
```

## TUI

The TUI search (press `/` on any tab) uses the same search engine. It matches against descriptions and GitHub topics in addition to names, categories, and tags.

## See Also

- [klim tool onboard](../onboard/) — Role-based tool recommendations
- [Tool Catalog](../../../marketplace/catalog/) — Browse all tools
