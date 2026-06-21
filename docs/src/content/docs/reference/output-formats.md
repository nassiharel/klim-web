---
title: Output formats
description: How klim's structured output flags (--output text|json|yaml, --json) work across commands.
---

Almost every klim command that produces structured data accepts the
same flag for choosing how that data is rendered:

```bash
--output text|json|yaml
```

- **`text`** *(default)* — human-readable. Prose, progress, and
  summaries are written to **stderr**; only data goes to **stdout**.
- **`json`** — indented JSON on stdout.
- **`yaml`** — YAML on stdout.

`--json` is supported as a deprecated alias for `--output=json` and
prints a one-line deprecation warning to stderr.

## Why two streams matter

When `--output=json` or `--output=yaml` is set, klim is careful to keep
**stdout** clean of any prose: even spinners and summaries that you'd
normally see during an `install` or `apply` are moved to stderr. That
means you can pipe stdout into `jq`, `yq`, or a file with no
post-processing:

```bash
klim tool list --output json | jq '.tools[] | select(.installed==true) | .name'
klim security score --output yaml > score.yaml
klim tool install kubectl --output json 2> install.log
```

## YAML schema matches JSON

The YAML encoder routes through JSON first, so YAML output uses the
**same key names** the JSON output does — including `snake_case`,
`omitempty`, and any custom `MarshalJSON` overrides:

```bash
$ klim security score --output json | head -3
{
  "total": 61,
  "max_total": 100,
$ klim security score --output yaml | head -3
total: 61
max_total: 100
grade: D
```

If a field is `omitempty` in the JSON schema it stays omitted in the
YAML output too.

## Unsupported value? Usage error.

Passing `--output=yaml` to a command that hasn't opted into YAML
returns a **UsageError** and exits with code 2 — klim never silently
falls back to text. Same for unknown values like `--output=jsno`:

```bash
$ klim tool graph --output yaml
Error: --output=yaml is not supported for this command
exit status 2
```

## Which commands support which formats

The matrix is large enough that we keep it in
[`CLI-CONVENTIONS.md`](https://github.com/nassiharel/klim/blob/main/CLI-CONVENTIONS.md)
inside the main repo. As of klim's current release:

- **Full matrix (`text|json|yaml`)** — `apply`, `audit`, `check`,
  `config marketplace list`, `diff`, `health`, `health path`, `info`,
  `install`, `list`, `plan`, `remove`, `rollback`, `score`, `search`,
  `security compliance check`, `security vuln`, `share`, `tools path`,
  `trail log`, `trail show`, `trail diff`, `upgrade`, `watch`, `why`,
  plus `agents list`, `agents search`, `badge`, `env`.
- **YAML by design** — `export` (manifests are always YAML).
- **Text only** — `graph` (the output is a terminal drawing, not
  structured data).
- **JSON only** — `audit --sbom` emits CycloneDX, which has no
  YAML form.

## See also

- [`klim tool list`](/reference/commands/list/) — the canonical example of
  per-tool structured output.
- [`klim security score`](/reference/commands/score/) — environment health score
  as JSON, YAML, or a Shields.io badge URL.
- [`klim env`](/reference/commands/env/) — full environment manifests
  for backup / share.
