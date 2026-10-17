
# Cursor

**Cursor** is an AI-first code editor built on VS Code. It has three agents: the one in the editor, a command-line agent called `agent`, and **Cloud Agents** that run on Cursor's machines.

:::summary In this chapter
- The three Run Modes: Auto-review, Allowlist, Run Everything
- `permissions.json` and `sandbox.json`
- The Cursor CLI's permission tokens and `--force`
- Cloud Agents and their network modes
- What still asks
:::

## The editor's agent

:::steps Turn on Run Everything
1. **Open settings:** [[Settings > Agents > Approvals & Execution]].
2. **Set the Run Mode to Run Everything.** Every tool call, including shell commands, MCP tools, and web fetches, runs automatically, with no sandbox and no classifier.
3. **Read Access** is hidden in Run Everything (nothing is checked). In other modes, set it to **System** to allow reads outside the workspace without asking.
:::

Prefer a safety net? **Auto-review** runs allowlisted calls immediately, sandboxes shell commands where it can, and sends the rest to a classifier. Tune it in plain English in `~/.cursor/permissions.json`:

```json title=~/.cursor/permissions.json
{
  "autoRun": {
    "allow_instructions": [
      "Any git command in this project, including push to branches starting with agent/.",
      "Installing packages with npm, pnpm, or pip."
    ],
    "block_instructions": []
  }
}
```

The sandbox's network access and extra writable paths live in `~/.cursor/sandbox.json`.

| Run Mode | What runs without asking | Classifier |
|---|---|---|
| **Auto-review** | Allowlisted calls; other shell commands in the sandbox; the rest reviewed | Yes |
| **Allowlist** | Only your allowlist (sandboxed shell commands optional) | No |
| **Run Everything** | Every tool call | No |

Auto-review covers shell, MCP, and Fetch calls. Its classifier runs on small Cursor-managed models; on a team plan, if it's grayed out, an admin needs to allow the fallback model in **Team Settings › Models**. Cursor states plainly that Auto-review is not a security boundary. `permissions.json` can live in `~/.cursor/` (all projects) or `<project>/.cursor/` (one project); a team configuration in the dashboard overrides both.

> [!TIP]
> The easiest way to edit `permissions.json` is to ask the agent: "I want every AWS CLI command to go through approval first." It writes the instruction for you.

## The Cursor CLI

Install it with `curl https://cursor.com/install -fsS | bash` (Windows PowerShell: `irm 'https://cursor.com/install?win32=true' | iex`). The command is `agent`. It reads permissions from `~/.cursor/cli-config.json` (global) or `.cursor/cli.json` (project):

```json title=~/.cursor/cli-config.json
{
  "permissions": {
    "allow": [
      "Shell(*)", "Read(**)", "Write(**)",
      "WebFetch(*)", "Mcp(*:*)"
    ],
    "deny": ["Shell(rm)", "Write(**/.env*)"]
  }
}
```

| Token | Matches |
|---|---|
| `Shell(git)` | Any `git` subcommand |
| `Shell(curl:*)` | `curl` with any arguments |
| `Read(src/**/*.ts)` / `Write(src/**)` | Files by glob |
| `WebFetch(*.example.com)` | Fetches from that domain |
| `Mcp(server:tool)` | One MCP tool; `*` for wildcards |

### Hands-off CLI runs

```bash
agent -p --force --trust --approve-mcps \
  --output-format json \
  "Refactor this module to modern syntax"
```

| Flag | Meaning |
|---|---|
| `-p`, `--print` | Non-interactive; can use write and shell tools |
| `-f`, `--force` (alias `--yolo`) | Allow commands unless explicitly denied |
| `--trust` | Trust the workspace without asking (headless only) |
| `--approve-mcps` | Approve all MCP servers automatically |
| `--sandbox enabled` / `disabled` | Turn the sandbox on or off |
| `-w`, `--worktree [name]` | Work in a new git worktree under `~/.cursor/worktrees/` |

Without `--force`, print mode only *proposes* file changes. For scripts, set `CURSOR_API_KEY` instead of signing in.

## Cloud Agents

Cloud Agents run in isolated VMs with full development environments, as many in parallel as you like. Start them from the editor, the web, Slack (`@cursor`), or a GitHub or Bitbucket comment (`@cursor`). They clone your repo, work on a separate branch, and push for handoff. Add secrets at cursor.com/dashboard/cloud-agents.

Cloud Agents have internet access by default. Network modes:

| Mode | Reach |
|---|---|
| **Allow all network access** | Any host |
| **Default + allowlist** | Cursor's defaults plus your domains |
| **Allowlist only** | Only your domains (plus Cursor's own services and your git host) |

## What still asks in Cursor

| Still asks | Why |
|---|---|
| Edits to configuration files (like workspace settings) | Default guardrail outside Run Everything |
| Writes to `.git/config`, `.git/hooks`, `.vscode`, `.cursorignore` | Protected paths in Auto-review and Allowlist |
| Commands that must leave the sandbox | Auto-review and Allowlist |
| Every new MCP connection | Approve once, or `--approve-mcps` in the CLI |
| Team admin policies and built-in security rules | Can't be weakened by local files |

:::checklist
- Editor: Run Everything (in a box) or Auto-review with allow instructions
- `~/.cursor/permissions.json` has your standing instructions
- CLI: `cli-config.json` allows what you use; scripts use `-p --force --trust`
- Cloud Agents: network mode and secrets set
:::
