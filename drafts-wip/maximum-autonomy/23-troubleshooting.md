
# Troubleshooting

When an agent that should be hands-off keeps stopping, find the symptom here.

## Claude Code

:::compact
| Symptom | Likely cause | Fix |
|---|---|---|
| `defaultMode: auto` ignored, starts in Manual | Set in a project file | Move it to `~/.claude/settings.json` |
| "cannot be used with root/sudo privileges" | Running as root | Use a non-root user or dev container |
| Auto mode "unavailable" | Unsupported model, or `disableAutoMode` | Switch model; check managed settings |
| Auto mode suddenly asks every time | 3-in-a-row or 20-total blocks | Approve once; add `autoMode` rules |
| `rm -rf` of a folder asks even in bypass | Critical path | Delete a literal subfolder instead |
| Edit to `.git` or `.claude` asks | Protected path | Bypass mode, or approve for the session |
| `--bg` bypass ignored | Acceptance not in user settings | Add `skipDangerousModePermissionPrompt` to `~/.claude/settings.json` |
| `mcp__*` allow rule does nothing | Allow globs must name a server | Use `mcp__github__*` |
| Project allow rules ignored in `-p` | Folder not trusted | Open it once interactively and trust it |
| CI run hangs | A prompt with nobody to answer | `--permission-prompts none` or `dontAsk` |
| Cloud session ignores bypass | Not offered in the cloud | Use Auto |
:::

## Codex

:::compact
| Symptom | Likely cause | Fix |
|---|---|---|
| "unknown flag --full-auto" | Removed | `--sandbox workspace-write` or `--approve-for-me` |
| `npm install` fails | No network in `workspace-write` | `network_access = true` |
| Asks before every MCP tool | Server approval mode | `default_tools_approval_mode = "approve"` |
| Starts read-only | Folder not trusted | `trust_level = "trusted"` |
| Can't write `.git` | Protected path | `danger-full-access` |
| `codex exec` won't run | Not a git repo | `--skip-git-repo-check` |
| Task paused | Safety monitoring | Review findings; resume if offered |
| Cloud task can't download | Domain not allowed | Add it under Additional allowed domains |
:::

## Gemini CLI, Copilot, Cursor, and others

:::compact
| Symptom | Likely cause | Fix |
|---|---|---|
| Gemini YOLO refused | `disableYoloMode` or admin secure mode | Change setting or ask admin |
| YOLO in `settings.json` ignored | Only allowed on the command line | Use an alias |
| Gemini ignores project settings | Folder untrusted | Trust it, or `--skip-trust` |
| Copilot CLI `-p` asks for tools | Programmatic mode needs it | `--allow-all-tools` |
| Copilot `--yolo` ignored | Admin policy | `disableBypassPermissionsMode` is set |
| Copilot cloud agent blocked from a site | Firewall | Add to the custom allowlist |
| Cursor CLI proposes but doesn't edit | No `--force` | Add `--force` |
| Cursor Auto-review grayed out | Classifier model not allowed | Admin enables it in Team Settings › Models |
| Devin Desktop has no Turbo | Admin capped the level | Ask admin |
| Cline still asks for "all" commands | Base toggle off | Enable both toggles, or YOLO Mode |
| Roo Code stopped working | Shut down | Move to Cline or another tool |
:::

## General

:::compact
| Symptom | Likely cause | Fix |
|---|---|---|
| Push to workflow files rejected | Token lacks `workflow` scope | `gh auth refresh -s workflow` |
| Push blocked "secret detected" | Push protection | Remove the secret; rotate it |
| Agent can't open PRs in Actions | Workflow permissions | Read and write; allow PR creation |
| Cron job does nothing | Empty environment | Full paths; load keys in the script |
| Agent stops at a login page | Not signed in | Sign in first in the agent's profile |
| Costs spike overnight | Loop or fleet | Per-run caps and account spend limit |
:::
