
# Gemini CLI

**Gemini CLI** is Google's open-source terminal agent. It's free to start with a Google account and keeps its settings in `~/.gemini/settings.json` (user) and `.gemini/settings.json` (project).

:::summary In this chapter
- The four approval modes and how to start in each
- `settings.json` keys for autonomy and safety
- The policy engine: allow and deny rules in TOML files
- Folder trust, the sandbox, and headless mode
- The Gemini GitHub Action
:::

## Approval modes

| Mode | What runs without asking |
|---|---|
| `default` | Reads; edits and commands ask |
| `auto_edit` | File edits too |
| `plan` | Read-only research and planning |
| `yolo` | Everything |

```bash
gemini --approval-mode=yolo
```

> [!NOTE]
> The short `--yolo` (`-y`) flag still works but is **deprecated**; use `--approval-mode=yolo`. YOLO can only be switched on from the command line, never from `settings.json`, so put it in an alias:

```bash title=~/.zshrc or ~/.bashrc
alias gem='gemini --approval-mode=yolo --sandbox'
```

For a hands-off default that stops short of YOLO, set the starting mode in settings:

```json title=~/.gemini/settings.json
{
  "general": {
    "defaultApprovalMode": "auto_edit",
    "checkpointing": { "enabled": true }
  },
  "security": {
    "enablePermanentToolApproval": true
  }
}
```

`defaultApprovalMode` accepts `default`, `auto_edit`, or `plan`. **Checkpointing** saves a snapshot before changes so you can roll back. `enablePermanentToolApproval` adds **Allow for all future sessions** to approval dialogs, so one click stops a prompt forever.

## Pre-approve specific tools

The quick way is `tools.allowed`, a list of tools that skip the confirmation dialog:

```json title=~/.gemini/settings.json (excerpt)
{
  "tools": {
    "allowed": [
      "run_shell_command(git)",
      "run_shell_command(npm test)"
    ]
  }
}
```

The more powerful way is the **policy engine**: TOML rule files in `~/.gemini/policies/` (any name ending in `.toml`). Each rule names a tool, optional conditions, a decision (`allow`, `deny`, or `ask_user`), and a priority from 0 to 999; the highest-priority match wins.

```toml title=~/.gemini/policies/autonomy.toml
[[rule]]
toolName = "run_shell_command"
commandPrefix = "git"
decision = "allow"
priority = 100

[[rule]]
toolName = "run_shell_command"
commandPrefix = "rm -rf"
decision = "deny"
priority = 200
```

A deny rule keeps a guardrail even in YOLO mode. Rules can be limited to modes (`yolo`, `autoEdit`, `plan`); a rule with no modes is always active. Admin policies sit in a higher tier than user policies, which sit above workspace policies.

## MCP servers you trust

Add `"trust": true` to a server in `mcpServers` to skip confirmation for all its tools:

```json title=~/.gemini/settings.json (excerpt)
{
  "mcpServers": {
    "github": {
      "httpUrl": "https://api.githubcopilot.com/mcp/",
      "trust": true
    }
  }
}
```

## Folder trust

The first time you open a folder, Gemini CLI asks whether to trust it. Untrusted folders restrict what runs, and project settings and `.env` files may be ignored. Your answers are saved in `~/.gemini/trustedFolders.json`. For one non-interactive session, `--skip-trust` trusts the current folder. **Trust parent folder** trusts everything under a directory such as `~/code`.

## The sandbox

`--sandbox` (`-s`) runs tools in an isolated environment. Set it permanently with `tools.sandbox` or the `GEMINI_SANDBOX` environment variable:

| Value | Meaning |
|---|---|
| `true` | Use the default sandbox for your platform |
| `docker` or `podman` | Run in a container (default image `ghcr.io/google/gemini-cli`) |
| A profile or command | Custom sandbox |

On macOS the default Seatbelt profile, `permissive-open`, restricts writes but allows the network. The sandbox only sees the current project unless you mount more. Pairing `--approval-mode=yolo` with `--sandbox` is the sensible maximum-autonomy setup on your own machine.

## Headless mode

Gemini CLI runs **headless** (no interactive screen) when you pass `-p` or when it isn't attached to a terminal:

```bash
gemini -p "Update the changelog from the last 20 commits" \
  --approval-mode=yolo \
  --output-format json
```

`--output-format` accepts `text`, `json` (one object with `response` and `stats`), or `stream-json`. `--include-directories` adds folders to the workspace; `--resume latest` continues the last session.

## The GitHub Action

Google's `google-github-actions/run-gemini-cli` action runs Gemini CLI in a workflow. Pass `gemini_api_key` (or Google Cloud workload identity inputs), a `prompt`, and optionally `settings`, a JSON string written to the project's `.gemini/settings.json`. Since the runner is disposable, YOLO-style autonomy there is reasonable.

## What still asks in Gemini CLI

| Still asks or refuses | Why |
|---|---|
| YOLO refused | `security.disableYoloMode` or `admin.secureModeEnabled` is true |
| No "Always allow" options | `security.disableAlwaysAllow` or admin secure mode |
| Tools restricted in a new folder | Folder trust; trust it or use `--skip-trust` |
| A specific command asks | A policy rule with `ask_user` |
| A command is blocked | A policy `deny` rule, which also applies in YOLO |

:::checklist
- An alias starts Gemini with `--approval-mode=yolo --sandbox`
- `defaultApprovalMode` is `auto_edit` for interactive use
- Policy files deny the few things you never want
- Trusted MCP servers have `"trust": true`
- Your code folder is trusted (parent-folder trust)
:::
