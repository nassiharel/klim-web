---
title: "klim tool catalog"
description: Manage the tool catalog
---

Manage the local tool catalog cache.

## Usage

```bash
klim tool catalog <subcommand>
```

## Subcommands

### tools path

Print the path to the local catalog cache file:

```bash
klim tool catalog path
# Output: /home/user/.klim/marketplace/marketplace-cache.yaml

klim tool catalog path --output json
# {"cache_path": "/home/user/.klim/marketplace/marketplace-cache.yaml"}
```

Accepts `--output text` (default) or `--output json`.

## About the Catalog

The tool catalog is fetched from GitHub at runtime and cached locally. It contains definitions for 110+ developer tools with their package manager IDs, categories, tags, and metadata.

The catalog source of truth is the `marketplace/` directory in the klim repository. Individual tool YAML files are assembled into a single `marketplace.yaml` by CI and published to the `marketplace` branch.

## See Also

- [Adding Tools](../../../guides/adding-tools/) — How to contribute to the catalog
- [Adding Tools guide](../../../guides/adding-tools/) — Browsing the catalog in the TUI
