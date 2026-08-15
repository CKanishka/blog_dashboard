# OpenCode Dependabot Fixer

This repository includes an OpenCode agent that prepares focused fixes for npm Dependabot alerts. A separate deterministic GitHub Actions job validates the generated patch and opens a pull request against `master`.

## Components

- `.opencode/agents/dependabot-fixer.md` defines the remediation and safety rules.
- `bin/opencode-dependabot-discover` finds open npm alerts that are not linked to an existing PR.
- `bin/opencode-dependabot-validate` enforces the result schema, alert links, lockfile format, and strategy-specific file allowlist.
- `bin/opencode-dependabot-local` performs a local prepare-and-validate dry run for one alert.
- `.github/workflows/opencode-dependabot.yml` discovers alerts, runs OpenCode without write credentials, and publishes only validated patches.

## Resolution order

The agent uses the first safe strategy:

1. Re-resolve the vulnerable transitive package when every current parent range accepts the patched version. Only the affected lockfile may change.
2. Upgrade the smallest blocking upstream dependency to the lowest compatible patch or minor release after reviewing release notes, package differences, engines, peers, and application usage.
3. Add an exact, preferably parent-scoped npm override after verifying compatibility.

The repository has independent root and `client/` npm projects. The agent changes only projects associated with the selected alerts and preserves each lockfile's existing `lockfileVersion`.

## Security model

OpenCode runs in a read-only GitHub job and never receives repository write credentials or the Dependabot API token. It cannot commit, push, create a PR, dismiss alerts, or merge changes.

The prepared patch is structurally validated and transferred as a short-lived artifact. A separate job with no model credentials applies it to a clean checkout, repeats validation and tests, and performs deterministic Git and GitHub commands.

The automation rejects manual lockfile edits, temporary override tricks, broad dependency upgrades, lockfile-format migrations, unrelated package churn, cross-major forced overrides, and changes outside the affected npm project.

## Local dry run

Commit the automation files first so the worktree is clean, then authenticate OpenCode and GitHub:

```bash
opencode providers login
gh auth status
```

Run one open Dependabot alert locally:

```bash
bin/opencode-dependabot-local 123
```

The script uses the token from `DEPENDABOT_ALERTS_TOKEN` when set, otherwise it uses `gh auth token`. Override the model when needed:

```bash
OPENCODE_DEPENDABOT_MODEL=openai/gpt-5 \
  bin/opencode-dependabot-local 123
```

The local runner fetches the alert, invokes the restricted `dependabot-fixer` agent, and runs the same structural validator used in CI. It never commits, pushes, or opens a PR.

For consistency with the GitHub Actions workflow and the old lockfile format in this repo, the local runner temporarily prepends a `.scratch/npm-bin/npm` wrapper that executes `npm@8.19.4`.

Inspect the result with:

```bash
jq . .scratch/dependabot-result.json
git status --short
git diff
```

## GitHub setup

Create these Actions secrets:

- `DEPENDABOT_ALERTS_TOKEN`: a fine-grained personal access token or GitHub App installation token with read access to Dependabot alerts for this repository.
- `OPENAI_API_KEY`: the provider key used by the default workflow model.

Optional repository variables:

- `OPENCODE_DEPENDABOT_MODEL`: OpenCode GitHub Action model identifier. Defaults to `gpt-5.4-mini`.

For local runs, use the provider-qualified OpenCode CLI form such as `openai/gpt-5.4-mini`. The GitHub Action expects the shorter model id such as `gpt-5.4-mini`.
- `OPENCODE_DEPENDABOT_ENABLED=true`: enables scheduled polling. Manual workflow runs remain available when this variable is absent.

The schedule processes at most one unlinked package group per run, prioritizing critical and high-severity runtime alerts. Branches use `dependabot-<alert-number>-upgrade-<package>`.

GitHub Actions does not provide a native Dependabot-alert-created trigger. For near-real-time execution, a GitHub App or webhook can translate a `repository_vulnerability_alert` creation event into a `repository_dispatch` event named `dependabot-alert`. The scheduled poll remains the recovery path.
