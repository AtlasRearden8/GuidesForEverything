
# Multi-Agent Setups

Once one agent runs hands-off, the obvious next step is several at once: one fixing bugs, one writing tests, one upgrading dependencies. The challenge is keeping them from tripping over each other.

:::summary In this chapter
- Git worktrees: one folder per agent
- Subagents and agent teams inside one tool
- Cloud fleets
- Rules that keep parallel agents from colliding
:::

## One worktree per agent

A **git worktree** is an extra working folder for the same repository, checked out on its own branch. Agents in different worktrees can edit freely without overwriting each other.

```bash
git worktree add ../my-app-tests -b agent/tests
git worktree add ../my-app-deps  -b agent/deps
git worktree list
git worktree remove ../my-app-tests   # when done
```

Several tools create worktrees for you:

| Tool | Command |
|---|---|
| Claude Code | `claude -w <name>` (folder `.claude/worktrees/<name>`), add `--tmux` |
| Codex | `codex exec --worktree "…"` |
| Cursor CLI | `agent -w <name>` (under `~/.cursor/worktrees/`) |

## A tmux layout for three agents

```bash
tmux new -s fleet -d
tmux send-keys -t fleet "cd ../my-app-tests" C-m
tmux send-keys -t fleet "claude --bg 'Raise test coverage'" C-m
tmux split-window -t fleet
tmux send-keys -t fleet "cd ../my-app-deps && codex --yolo" C-m
tmux attach -t fleet
```

Each pane is a separate agent in its own worktree, each in its own box if you're in bypass.

## Subagents and agent teams

A **subagent** is a helper agent that the main agent starts for one part of a job, with its own instructions and tools. In Claude Code, subagents inherit the parent's permission mode, so a parent in bypass gives its subagents full access too. Claude Code's **agent teams** go further: several sessions coordinate and message each other. When teammates message each other, the auto-mode classifier reviews each message in auto mode, and cross-session messaging safeguards still apply in bypass.

Devin CLI and Cline also offer subagents and agent teams; Copilot CLI has a `--fleet` option for parallel work.

## Cloud fleets

The easiest parallelism is in the cloud, where each task gets its own VM: Claude Code cloud sessions and routines, Codex Cloud, Copilot cloud agent (assign several issues), Cursor Cloud Agents ("as many as you want in parallel"), and Devin. Each produces a pull request, and your branch protection decides what lands.

## Rules that prevent collisions

:::checklist
- One agent, one branch, one worktree
- Split work by folder or feature, not by "whoever gets there first"
- Each agent writes its plan to a file the others can read
- Only humans (or auto-merge with green checks) merge to `main`
- Shared resources (databases, ports, cloud accounts) are separate per agent
- A total spend limit covers the whole fleet
:::

> [!WARNING]
> Costs multiply with agents. Three agents in parallel use roughly three times the tokens. Set the account-level spend limit with the whole fleet in mind.
