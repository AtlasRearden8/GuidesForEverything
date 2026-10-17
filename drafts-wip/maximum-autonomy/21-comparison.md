
# The Master Comparison

One place to compare every tool in this guide. Use it to pick tools, or as a reminder of where a setting lives.

## Where the settings live

:::compact
| Tool | User config | Project config |
|---|---|---|
| Claude Code | `~/.claude/settings.json` | `.claude/settings.json`, `.claude/settings.local.json` |
| Codex | `~/.codex/config.toml` | `.codex/` (trusted projects only) |
| Gemini CLI | `~/.gemini/settings.json`, `~/.gemini/policies/` | `.gemini/settings.json` |
| Copilot CLI | `~/.copilot/settings.json` | Repository settings |
| VS Code | User `settings.json` | `.vscode/settings.json` |
| Cursor editor | `~/.cursor/permissions.json`, `sandbox.json` | `.cursor/permissions.json` |
| Cursor CLI | `~/.cursor/cli-config.json` | `.cursor/cli.json` |
| Devin CLI | `~/.config/devin/config.json` | `.devin/config.json` |
| Aider | `~/.aider.conf.yml` | `.aider.conf.yml` |
| Goose | `goose configure` | — |
:::

## Levels, side by side

:::compact
| Tool | Level 3 (reviewed) | Level 4 (bypass) |
|---|---|---|
| Claude Code | `--permission-mode auto` | `--dangerously-skip-permissions` |
| Codex | `--approve-for-me` | `--yolo` |
| Gemini CLI | `--approval-mode=auto_edit` (edits only) | `--approval-mode=yolo` |
| Copilot CLI | `/permissions assisted` | `--yolo` |
| VS Code Copilot | Assisted permissions | Allow all / Autopilot |
| Cursor editor | Auto-review | Run Everything |
| Cursor CLI | Allow tokens | `--force` |
| Devin Desktop | Auto | Turbo |
| Devin CLI | Smart | Bypass |
| Cline | Auto Approve toggles | YOLO Mode |
| OpenHands | `--llm-approve` | `--always-approve` |
| Goose | `smart_approve` | `auto` (default) |
| Aider | — | `--yes-always` |
:::

## Headless commands

:::compact
| Tool | One-shot command | JSON output |
|---|---|---|
| Claude Code | `claude -p "…"` | `--output-format json` |
| Codex | `codex exec "…"` | `--json` |
| Gemini CLI | `gemini -p "…"` | `--output-format json` |
| Copilot CLI | `copilot -p "…"` | `-s` (answer only) |
| Cursor CLI | `agent -p "…"` | `--output-format json` |
| Devin CLI | `devin -p "…"` | — |
| Cline CLI | `cline "…"` | `--json` |
| OpenHands | `openhands --headless -t "…"` | `--json` |
| Goose | `goose run -t "…"` | — |
| Aider | `aider --message "…"` | — |
:::

## Built-in sandboxes and clouds

:::compact
| Tool | Local sandbox | Cloud option |
|---|---|---|
| Claude Code | Bash sandbox, sandbox runtime | Cloud sessions, routines |
| Codex | `workspace-write` (Seatbelt / Linux) | Codex Cloud |
| Gemini CLI | `--sandbox` (Seatbelt, Docker, Podman) | GitHub Action |
| Copilot | VS Code sandbox | Cloud agent |
| Cursor | Auto-review sandbox | Cloud Agents |
| Devin | `--sandbox` (Autonomous mode) | Devin cloud |
| OpenHands | Docker sandbox | OpenHands cloud |
:::

## What can't be turned off

:::compact
| Tool | Survives every setting |
|---|---|
| Claude Code | Critical-path deletes, ask rules, `AskUserQuestion`, org policies |
| Codex | Safety monitoring pauses, managed requirements |
| Gemini CLI | Admin secure mode, policy denies |
| Copilot | Org policies, `disableBypassPermissionsMode` |
| Cursor | Team policies, built-in security rules |
| Devin | Org deny/ask rules, admin max level |
| Browsing agents | Purchases, sends, CAPTCHAs |
:::
