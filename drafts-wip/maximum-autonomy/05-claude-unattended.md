
# Claude Code Without You: Headless, CI, SDK, and Cloud

Everything in the last chapter assumed you were sitting at a terminal. This chapter is about the times you aren't: scripts, scheduled jobs, GitHub workflows, your own programs, and Anthropic's cloud.

:::summary In this chapter
- Print mode (`claude -p`) and the flags that keep it safe
- Background agents that outlive your terminal
- The Claude Code GitHub Action, including scheduled runs
- The Agent SDK's permission options
- Cloud sessions, routines, and auto-fix for pull requests
:::

## Print mode: one command, no chat window

**Print mode** runs a single task and exits. It's how you call Claude Code from scripts, cron jobs, and CI.

```bash
claude -p "Fix the failing tests and commit the result" \
  --dangerously-skip-permissions \
  --permission-prompts none \
  --max-turns 60 \
  --max-budget-usd 10 \
  --output-format json
```

| Flag | What it does |
|---|---|
| `-p`, `--print` | Run once, print the answer, exit |
| `--permission-prompts none` | Deny anything that would still need a human, instead of waiting forever |
| `--max-turns` | Stop after this many agent turns (exits with an error) |
| `--max-budget-usd` | Stop once estimated spend reaches this amount |
| `--output-format` | `text`, `json`, or `stream-json` |
| `--json-schema` | Validate the final answer against a JSON Schema |
| `--bare` | Skip hooks, skills, plugins, MCP servers, and CLAUDE.md for a fast, predictable start |
| `--no-session-persistence` | Don't save the session to disk |
| `--fallback-model` | Try another model if the first is overloaded |

**Without bypass**, use an exact allowlist. Anything not listed is denied, and the run never waits:

```bash
claude -p "run the test suite and summarize failures" \
  --permission-mode dontAsk \
  --allowedTools "Bash(npm test)" "Read"
```

> [!TIP]
> Chain runs with `--resume <session-id>` or `--continue` (most recent in this folder). Name sessions with `-n nightly-fix` so they're easy to find.

### Let a program answer prompts

`--permission-prompt-tool <mcp_tool>` hands every prompt to an MCP tool you wrote, which replies allow or deny. It's the scripted version of a human approver, useful when you want custom logic such as "allow anything inside `/work`".

## Background agents

```bash
claude --bg "Upgrade all dependencies and fix what breaks"
```

`--bg` starts a **background agent** and returns immediately, printing its session ID and management commands. It keeps running after you close the terminal. Run `claude agents` to see and manage them. `claude --bg --exec 'pytest -x'` runs a plain shell command as a background job instead.

> [!IMPORTANT]
> Background sessions honor bypass only when your acceptance is recorded in `~/.claude/settings.json` (or managed settings). With no acceptance recorded, `claude --bg --permission-mode bypassPermissions` is refused until you accept the warning once in an interactive session.

## Git worktrees: parallel agents without collisions

`claude -w feature-auth` starts Claude in its own **git worktree** (a second working copy of the repo on its own branch) at `.claude/worktrees/feature-auth`. Add `--tmux` to open it in a tmux session. Chapter 21 covers running several agents this way.

## The Claude Code GitHub Action

The **GitHub Action** runs Claude Code inside GitHub's own servers whenever something happens in your repository: a comment mentioning `@claude`, a new pull request, or a schedule.

:::steps Set it up in one command
1. **Open Claude Code** in the repository.
2. **Run `/install-github-app`.** It installs the Claude GitHub App, adds an authentication secret, and opens a pull request with the workflow file.
3. **Merge the pull request.** Now `@claude` works in any issue or PR comment.
:::

Prefer doing it by hand? Install the app from github.com/apps/claude, add a repository secret `ANTHROPIC_API_KEY` (or `CLAUDE_CODE_OAUTH_TOKEN` from `claude setup-token`), and add this workflow:

```yaml title=.github/workflows/claude.yml
name: Claude Code
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
jobs:
  claude:
    if: contains(github.event.comment.body, '@claude')
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
      id-token: write
      actions: read
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 1
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

`id-token: write` is required for the action's GitHub App authentication; `actions: read` lets Claude read CI results.

### Run on a schedule

With a `prompt` input, the action runs on any event, including a **cron schedule** (a timetable written as five fields: minute, hour, day, month, weekday). Give it tools explicitly with `claude_args`, because a plain prompt has no shell or GitHub access until you grant it:

```yaml title=.github/workflows/nightly.yml
name: Nightly Report
on:
  schedule:
    - cron: "0 9 * * *"
jobs:
  report:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      issues: read
      id-token: write
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "Summarize yesterday's commits and open issues"
          claude_args: |
            --allowedTools "mcp__github__list_commits,mcp__github__list_issues"
```

For maximum autonomy inside the runner, which is already a throwaway machine, pass `--dangerously-skip-permissions` or broad `--allowedTools` in `claude_args`.

**Still limited in the Action:** the person triggering it must have write access (set `allowed_non_write_users` to widen this), and bot accounts are rejected unless listed in `allowed_bots`, which stops bots triggering Claude in a loop. GitHub runs schedules only from the default branch, and in public repositories disables them after 60 days without activity.

## The Agent SDK

The **Agent SDK** lets you build your own programs on top of Claude Code's engine, in Python or TypeScript. Permissions are options on the query:

```python title=agent.py
from claude_agent_sdk import query, ClaudeAgentOptions

options = ClaudeAgentOptions(
    permission_mode="bypassPermissions",
    disallowed_tools=["Bash(git push --force *)"],
)
```

| Option | Effect |
|---|---|
| `permission_mode` / `permissionMode` | Any of the six modes |
| `allowed_tools` / `allowedTools` | Pre-approves listed tools |
| `disallowed_tools` / `disallowedTools` | Deny rules; enforced even in bypass |
| `canUseTool` callback | Your code decides each prompt |
| `set_permission_mode()` | Change mode mid-session |

> [!WARNING]
> `allowed_tools` does **not** restrict bypass mode: unlisted tools fall through to the mode, which approves them. To lock an agent down, pair `allowedTools` with `permissionMode: "dontAsk"`. Subagents inherit bypass, too.

## Cloud sessions at claude.ai/code

Cloud sessions run in an Anthropic-managed VM, so your laptop can be closed. Start one from the web, the mobile app, or the terminal with `claude --cloud "Fix the login bug"`. Pull one back to your terminal with `claude --teleport`.

| Setting | Maximum-autonomy choice |
|---|---|
| Permission mode | **Auto** (bypass isn't available; file edits are pre-approved in every mode) |
| Network access | **Full** for any domain, or **Custom** with your own allowlist |
| Setup script | Install everything the agent needs up front |

Network levels are **None**, **Trusted** (package registries, GitHub, cloud SDKs), **Full**, and **Custom**. GitHub and enabled connectors stay reachable whatever you choose.

### Auto-fix pull requests

Claude can watch a pull request and push fixes when CI fails or a reviewer comments. In a cloud session, open the CI status bar and select **Auto-fix**; from your terminal, run `/autofix-pr` on the PR's branch. It needs the Claude GitHub App installed.

## Routines and scheduled tasks

| Option | Runs on | Machine on? | Prompts |
|---|---|---|---|
| **Routines** (`/schedule`, claude.ai/code/routines) | Anthropic's cloud | No | None (autonomous) |
| **Desktop scheduled tasks** | Your computer | Yes | Configurable per task |
| **`/loop`** in a session | Your computer | Yes, session open | Inherits the session |

**Routines** (research preview, Pro, Max, Team, and Enterprise) package a prompt, repositories, and connectors, and run on a schedule (minimum hourly), from an API call with a bearer token, or on GitHub events such as a new pull request. `/loop 5m /babysit-prs` reruns a prompt every five minutes inside an open session.

:::checklist
- Unattended runs use `-p` with `--max-turns` and `--max-budget-usd`
- CI either runs in bypass inside the runner or uses `dontAsk` with an exact allowlist
- The GitHub Action's secret is an API key if several people share it
- Background agents work because bypass acceptance is in `~/.claude/settings.json`
- Cloud sessions have the network level the task needs
:::
