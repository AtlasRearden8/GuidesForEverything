
# VS Code and GitHub Copilot

**GitHub Copilot** is GitHub's AI assistant. For autonomy it comes in three forms: **agent mode** in VS Code's chat, the **Copilot CLI** in your terminal, and the **Copilot cloud agent** (formerly the coding agent), which works on GitHub's servers and opens pull requests.

:::summary In this chapter
- Allow all, Autopilot, and the global auto-approve setting in VS Code
- Copilot CLI flags, permission modes, and programmatic runs
- Tool rules: allow some commands, deny others
- The cloud agent's firewall and MCP settings
- What still asks
:::

## Copilot agent in VS Code

| Level | How |
|---|---|
| **Allow all** | Choose **Allow all** in the chat session's permission picker: "runs all tool calls without confirmation" |
| **Autopilot** | Choose **Autopilot** in the mode picker: auto-approves tools, retries errors, and answers blocking questions itself |
| **Advanced Autopilot** (preview) | `"chat.autopilot.advanced.enabled": true`, where a separate model decides when the task is complete |
| **Every workspace** | `"chat.tools.global.autoApprove": true` |
| **This session only** | Type `/yolo` (or `/autoApprove`); undo with `/disableYolo` |

```json title=VS Code settings.json
{
  "chat.tools.global.autoApprove": true,
  "chat.autopilot.advanced.enabled": true
}
```

Finer-grained alternatives: `chat.tools.terminal.autoApprove` (terminal command rules) and `chat.tools.urls.autoApprove` (web addresses). Terminal writes detected *outside* the workspace still ask by default; that's governed by `chat.tools.terminal.blockDetectedFileWrites`.

Running the **Claude agent harness inside VS Code**? Its equivalent of bypass is `"github.copilot.chat.claudeAgent.allowDangerouslySkipPermissions": true`. The **Claude Code extension** has its own **Allow dangerously skip permissions** toggle in its settings, after which **Bypass permissions** appears in its mode indicator.

**Still asks in VS Code:** tools or terminal rules you've set to `false`; organization (device-management) policies; and, unless you change `blockDetectedFileWrites`, terminal writes it detects outside the workspace. An enabled sandbox still limits file and network access even in Allow all.

### Finer-grained terminal rules

If you'd rather not approve everything, `chat.tools.terminal.autoApprove` takes a map of commands to `true` (run freely) or `false` (always ask). Patterns between slashes are treated as regular expressions:

```json title=VS Code settings.json
{
  "chat.tools.terminal.autoApprove": {
    "npm": true,
    "git": true,
    "/^git push --force/": false,
    "rm": false
  }
}
```

## Copilot CLI

```bash
copilot --yolo
```

`--yolo` is an alias for `--allow-all`, which combines `--allow-all-tools`, `--allow-all-paths`, and `--allow-all-urls`. Inside a session, `/yolo` or `/allow-all` does the same; `/permissions` switches between `default`, `assisted` (an AI reviews requests, Level 3), and `allow-all`, and `/permissions reset` clears your approvals.

| Flag | Meaning |
|---|---|
| `--allow-all-tools` | Tools run without confirmation (env `COPILOT_ALLOW_ALL`); required for programmatic use |
| `--allow-tool='shell(git:*)'` | Pre-approve a tool or command family |
| `--deny-tool='shell(git push)'` | Block it; deny beats allow |
| `--allow-url=…`, `--deny-url=…` | Web access rules |
| `--add-dir=PATH` | Extra folder the agent may use |
| `--autopilot` | Keep working until the task is complete |
| `--max-autopilot-continues=N` | Cap autopilot's continuations |
| `--no-ask-user` | Disable the question tool so it never stops to ask |
| `--secret-env-vars=VAR` | Hide a variable from shells and MCP servers |

Tool rules use `shell(...)` for commands, `write` for file writes, and the server name for MCP tools, such as `MyMCP(create_issue)` or all of `MyMCP`. `shell(git:*)` matches `git push` and `git pull` but not `gitea`.

### Programmatic runs

```bash
copilot -p "Fix the lint errors and commit" \
  --allow-all-tools --allow-all-paths \
  --no-ask-user -s \
  --share=./copilot-run.md
```

`-p` runs once and exits; `-s` prints only the answer; `--share` saves a Markdown transcript. `--plan --mode autopilot` plans first and then carries on into autopilot without waiting for a human. In CI, put a fine-grained token with the **Copilot Requests** permission in `COPILOT_GITHUB_TOKEN`.

> [!NOTE]
> Admins can block every allow-all option with `permissions.disableBypassPermissionsMode` set to `"disable"`, or allow only assisted approval with `"allow-auto-only"`.

## Copilot cloud agent (on GitHub)

Assign an issue to Copilot and it works in its own GitHub Actions environment, then opens a pull request. It already runs without prompts. Widen what it can reach in the repository's [[Settings > Copilot > Internet access]]:

- **Enable firewall:** **Disabled** gives it unrestricted internet (maximum reach, maximum exfiltration risk).
- **Recommended allowlist:** on by default, covering common package registries.
- **Custom allowlist:** add the domains your build needs.

Add MCP servers in [[Settings > Copilot > MCP servers]], then click **Save MCP configuration**. Secrets the servers need go in Agents secrets whose names start with `COPILOT_MCP_`. Organization owners can set firewall rules for every repository, including **Let repositories decide**.

## What still asks in VS Code and Copilot

| Still asks or blocks | Why / workaround |
|---|---|
| Tools or terminal rules set to `false` | Your own rules; change them |
| Terminal writes detected outside the workspace | `chat.tools.terminal.blockDetectedFileWrites` |
| Organization (device-management) policies | Admin control |
| Sandbox limits in Allow all | An enabled sandbox still limits files and network |
| CLI allow-all flags ignored | `disableBypassPermissionsMode` policy |
| Cloud agent can't reach a site | Firewall allowlist |

:::checklist
- VS Code: `chat.tools.global.autoApprove` on, or Autopilot chosen
- Copilot CLI: alias with `--yolo`, or `--allow-tool` rules for daily use
- Programmatic runs use `--allow-all-tools --no-ask-user`
- Cloud agent firewall and MCP servers set for the repository
:::
