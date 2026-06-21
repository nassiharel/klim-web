---
title: "klim share export"
description: Export tools to stdout, snapshots, or named profiles
---

Export detected tools to YAML. Without a subcommand, prints to stdout. Includes snapshot and profile management for saved exports.

## Usage

```bash
klim share export [flags]           # print manifest to stdout
klim share export save [label]      # save as timestamped snapshot
klim share export list              # list saved snapshots
klim share export show <name>       # show a snapshot
klim share export delete <name>     # delete a snapshot
klim share export profile <command> # manage named profiles
```

## Flags

| Flag | Commands | Description |
|------|----------|-------------|
| `--refresh` | export | Force fresh scan, ignoring on-disk cache |

## Subcommands

### Snapshots (Saved Exports)

| Command | Description |
|---------|-------------|
| `klim share export save [label]` | Save current tool state as a timestamped snapshot |
| `klim share export list` | List saved snapshots |
| `klim share export show <name>` | Show tools in a snapshot |
| `klim share export delete <name>` | Delete a snapshot |

### Profiles (Named Snapshots)

| Command | Description |
|---------|-------------|
| `klim share export profile save <name>` | Save current state as a named profile |
| `klim share export profile list` | List saved profiles |
| `klim share export profile show <name>` | Show a profile's tools |
| `klim share export profile delete <name>` | Delete a profile |

## Snapshots vs Profiles

- **Snapshots** are timestamped — for point-in-time backups before upgrades or experiments
- **Profiles** are named — for switching between configurations ("work", "personal", "client-x")

## Examples

```bash
# Export to stdout
klim share export

# Save to file
klim share export > my-tools.yaml

# Force fresh scan before export
klim share export --refresh > my-tools.yaml

# Save before a big upgrade
klim share export save "before-k8s-upgrade"

# List all snapshots
klim share export list

# View what was in a snapshot
klim share export show before-k8s-upgrade

# Save a named profile
klim share export profile save work

# List profiles
klim share export profile list

# Import on another machine
klim share import my-tools.yaml
```

## Output Format

The YAML manifest includes all installed tools with their versions and package IDs:

```yaml
tools:
  - name: az
    version: "2.67.0"
    source: brew
    packages:
      brew: azure-cli
      winget: Microsoft.AzureCLI
      choco: azure-cli
  - name: docker
    version: "24.0.7"
    source: manual
    packages:
      brew: docker
      winget: Docker.DockerDesktop
      choco: docker-desktop
```

## Cross-Platform Portability

The manifest is **cross-platform** — it contains package IDs for all supported package managers. When imported on a different OS, klim automatically picks the best available package manager.

## Storage

- Snapshots: `~/.klim/snapshots/<timestamp>-<label>.yaml`
- Profiles: `~/.klim/profiles/<name>.yaml`

Both use the same YAML manifest format, so snapshots can also be used with `klim plan diff` and `klim share import`.

## Name Matching

The `show` and `delete` commands support fuzzy matching — you can use a label, prefix, suffix, or substring:

```bash
klim share export show before-k8s    # matches "2026-04-30T...-before-k8s-upgrade"
klim share export show upgrade       # also matches
```

## See Also

- [`klim share import`](../import/) — Install tools from a manifest
- [`klim share link`](../share/) — Generate a compact share token
- [`klim plan diff`](../diff/) — Compare against a snapshot or manifest
