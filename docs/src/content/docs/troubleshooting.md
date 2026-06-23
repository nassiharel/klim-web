---
title: Troubleshooting & FAQ
description: Common questions and fixes for klim across macOS, Linux, and Windows
---

Common questions and quick fixes. If something here doesn't cover your case, open a
[Discussion](https://github.com/nassiharel/klim/discussions) or
[issue](https://github.com/nassiharel/klim/issues).

## Frequently asked questions

### Does klim replace my package manager?

No. klim is a cross-platform *layer* over the native managers you already trust — brew, winget,
scoop, apt, choco, snap, and npm. It picks the right one per platform and delegates the actual
install; it never reimplements package management.

### Do I need an account, server, or to send telemetry?

No. klim is a single binary. There is no account, no server, and no telemetry. Everything it
stores lives under `~/.klim/`.

### How is klim different from asdf / mise / devcontainers?

asdf and mise manage language *runtimes* via their own shims. devcontainers need Docker. klim
covers your *whole* tool set (CLIs, editors, cloud tools, databases…) across all three operating
systems, using your native package managers — no new runtime and no container required. See the
[comparison on the website](https://github.com/nassiharel/klim#how-is-klim-different).

### Where does klim store its data?

Everything is under `~/.klim/` (`%USERPROFILE%\.klim` on Windows): `config.yaml`, the cached
marketplace catalog, scan cache, checkpoints, backups, and logs. Override the root with the
`KLIM_HOME` environment variable.

## Troubleshooting

### "command not found" after installing a tool

A new tool's directory may not be on your `PATH` yet, or your shell cached the old `PATH`.
Restart the shell, then run:

```bash
klim doctor path        # show PATH conflicts and shadowed binaries
klim doctor             # full environment diagnostics
```

### klim can't load the marketplace catalog

The catalog is fetched from GitHub on first use and cached locally. If you're offline with no
cache, the catalog can't load. Reconnect once and run:

```bash
klim tool search ripgrep --refresh    # force a fresh catalog fetch
```

### Versions look stale or a tool shows "not installed" when it is

klim caches scan results per host for speed. Force a rescan:

```bash
klim tool list --refresh
```

In the TUI, press `r` to rescan.

### Shell completions aren't working

Completions ship in the release archives and Linux packages, or you can generate them directly:

```bash
klim shell completion bash   # or zsh | fish | powershell
```

See [shell completion](/reference/commands/completion/) for where to install the output for
your shell.

### An upgrade broke something — how do I roll back?

`klim plan apply` auto-creates a checkpoint before it changes anything. List and roll back:

```bash
klim plan checkpoint list
klim plan rollback <checkpoint>
```

See [plan](/reference/commands/plan/), [apply](/reference/commands/apply/), and
[rollback](/reference/commands/rollback/).

### A PATH fix changed my environment and I want it back

Any Health-tab fix that touches `PATH` captures a backup first. Restore it with:

```bash
klim doctor path-backups list
klim doctor path-backups restore-cmd <backup>
```

## Getting more help

- `klim --help` and `klim <command> --help` document every command and flag.
- [GitHub Discussions](https://github.com/nassiharel/klim/discussions) for questions and ideas.
- [GitHub Issues](https://github.com/nassiharel/klim/issues) for bugs and tool requests.
