# Sessions and Parallel Work

A **session** is one conversation with Claude Code, saved so you can come back to it. Once you're comfortable with a single session, you can run several at once, each on its own task.

:::summary In this chapter
- Naming, resuming, branching, and exporting sessions
- Git worktrees: separate copies for parallel work
- Background sessions and agent view
- Cloud sessions for work that runs while your laptop is closed
:::

## Managing sessions

| To… | Inside Claude Code | From the terminal |
|---|---|---|
| Name a session | `/rename checkout-bug` | `claude -n checkout-bug` |
| Continue the latest one here | — | `claude -c` |
| Pick from a list | `/resume` | `claude -r` |
| Resume by name | `/resume checkout-bug` | `claude -r checkout-bug` |
| Try a different direction | `/branch` | `claude -c --fork-session` |
| Save a transcript | `/export notes.txt` | — |
| Find sessions linked to a pull request | — | `claude --from-pr 123` |

Local transcripts are kept for 30 days by default; change that with the `cleanupPeriodDays` setting.

## Worktrees: one folder per task

Two sessions editing the same files at once will trip over each other. A Git **worktree** is a second working copy of the same repository, on its own branch, in its own folder. Claude Code makes them for you:

```bash
claude -w new-menu
```

This starts Claude in `<repo>/.claude/worktrees/new-menu`, on its own branch. Open another terminal and run `claude -w fix-footer` for a second, independent task. When you're done, ask Claude to merge or open a pull request for each branch.

## Background sessions and agent view

A **background session** keeps working without a terminal attached:

- Inside a session, `/background` detaches it; `/fork` copies it into a new background session.
- From your shell, `claude --bg "fix the flaky test"` starts one directly.
- `claude agents` opens **agent view**: one screen listing every background session, what it's doing, and which ones need your input. Select a row to attach; press <kbd>←</kbd> to step back out.
- `claude attach <id>`, `claude logs <id>`, and `claude stop <id>` manage sessions from the shell.

> [!NOTE]
> Background sessions still follow your permission mode, so one may pause waiting for an approval. Agent view shows which.

## Cloud sessions

A **cloud session** runs on Anthropic's computers against a copy of your GitHub repository, so it keeps going when your laptop is closed. Start one at claude.ai/code, from the mobile app, or from the terminal:

```bash
claude --cloud "add input validation to the signup form"
```

When it's done, Claude pushes a branch for you to review. Bring a cloud session back to your terminal with `/teleport` or `claude --teleport`. Chapter 25 covers this in more detail.

## Choosing the right way to run in parallel

| You want | Use |
|---|---|
| A side job that reports back into this chat | `/subtask` or a subagent |
| A second attempt you can compare | `/fork` or `/branch` |
| Two tasks editing different code at once | `claude -w <name>` in two terminals |
| Many similar changes across the codebase | `/batch` |
| Work that continues with your laptop closed | A cloud session (`claude --cloud`) |

> [!TIP]
> Start small: one main session plus one worktree is plenty for most people. Every extra session uses your plan's usage too.

:::checklist
- I name sessions I'll come back to
- I use `claude -w` when I want two tasks at once
:::

# Models, Effort, and Speed

Claude Code can use several Claude models. Picking the right one, and the right amount of thinking, saves usage and gets better results.

:::summary In this chapter
- The model aliases and what each is for
- Effort levels, `ultrathink`, and fast mode
- The `opusplan` hybrid and the advisor
- Extended context
:::

## The models

Use an **alias** (a short nickname) instead of a full version number. Aliases always point to the latest version for your account.

| Alias | Model on the Anthropic API | Best for |
|---|---|---|
| `opus` | Opus 5.5 | Complex reasoning, architecture, hard bugs |
| `sonnet` | Sonnet 5.5 | Most everyday coding |
| `haiku` | Haiku 5.5 | Quick, simple tasks; lowest usage |
| `fable` | Fable 5.1 | The hardest, longest tasks, where available |
| `best` | Fable where available, otherwise Opus | "Give me the strongest" |
| `opusplan` | Opus in plan mode, Sonnet otherwise | Good plans at a lower cost |
| `default` | Your account's default | Undo any override |

Through Amazon Bedrock, Google Cloud, or Microsoft Foundry, the aliases can point to earlier versions.

### Switching models

- `/model sonnet` switches and saves it as your default; `/model` alone opens a picker (press <kbd>s</kbd> to switch for this session only).
- `claude --model opus` sets the model for one session.
- <kbd>Option</kbd>/<kbd>Alt</kbd> + <kbd>P</kbd> switches without clearing your prompt.
- To pin an exact version, use its full name, such as `claude-opus-5-5`.

> [!TIP]
> A sensible pattern: Sonnet for daily work, Opus (or `opusplan`) for planning and tricky problems, Haiku for simple, repetitive jobs. Switching to Opus also affects subagents that inherit your model.

## Effort levels

**Effort** controls how much Claude thinks before acting. Lower is faster and uses less of your plan; higher is more thorough.

| Level | Use it for |
|---|---|
| `low` | Quick exchanges you review each time: brainstorming, renames |
| `medium` | Day-to-day work with a clear scope. The default on Opus 5.5, Sonnet 5.5, and Haiku 5.5 |
| `high` | Bug fixes where edge cases matter |
| `xhigh` | Deeper reasoning at higher cost |
| `max` | Hard problems you want worked through without you; this session only |

Set it with `/effort high`, the arrow keys in `/model`, or `claude --effort high`. For a single hard question, put `ultrathink` in your prompt instead of changing the session.

## Fast mode

`/fast on` makes recent Opus models respond up to about 2.5 times faster at a higher price per token. It's the same model with a speed-focused configuration, a research preview. Use it for live debugging, then `/fast off`.

## The advisor

`/advisor opus` lets Claude consult a stronger second model at key moments, such as before committing to an approach. It's experimental and only on the Anthropic API.

## Extended context

Current models such as Opus 5.5, Sonnet 5.5, and Haiku 5.5 run with a 1-million-token context window by default. For some older models, a `[1m]` suffix (such as `sonnet[1m]`) selects the larger window, which may need usage credits depending on your plan.

:::checklist
- I've switched models with `/model`
- I've tried a different effort level
- I know `ultrathink` asks for deep thinking on one turn
:::
