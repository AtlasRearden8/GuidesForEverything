
# Running Unattended

"Unattended" means the agent runs while you're asleep, in a meeting, or away from your desk. There are four common ways to do it: a terminal session that keeps running, a schedule on your own machine, a schedule in CI, and a vendor's cloud.

:::summary In this chapter
- tmux: keep a session alive after you disconnect
- cron and launchd: schedules on your own machine
- CI schedules on GitHub Actions
- Long-running sessions and how to keep them on track
- A wrapper script with time and money limits
:::

## Keep a session alive with tmux

**tmux** is a free terminal program that keeps sessions running after you close the window or lose your connection. Install it with `brew install tmux` (Mac) or `sudo apt install tmux` (Ubuntu).

:::cheatsheet
**Start a named session:** `tmux new -s agent`

**Detach (leave it running):** <kbd>Ctrl</kbd> + <kbd>B</kbd>, then <kbd>D</kbd>

**List sessions:** `tmux ls`

**Reattach:** `tmux attach -t agent`

**Kill it:** `tmux kill-session -t agent`
:::

Start your agent in bypass inside the tmux session, detach, and check back later. On a cloud VM, this survives your laptop going to sleep. Claude Code's `--bg` flag and `claude -w <name> --tmux` do similar jobs for you.

## Schedules on your own machine: cron

**cron** runs commands on a timetable on Linux and macOS. Edit your schedule with `crontab -e`. Each line has five time fields (minute, hour, day of month, month, day of week) and a command:

```bash title=crontab -e
# Every weekday at 07:30, run the nightly agent script
30 7 * * 1-5 /home/me/bin/agent-nightly.sh >> /home/me/logs/agent.log 2>&1
```

> [!TIP]
> cron runs with a nearly empty environment. Use full paths to programs, and load your API key inside the script (for example `source ~/.agent-env`) rather than relying on your shell profile.

On a Mac, **launchd** is Apple's native scheduler, and cron also works. On Windows, use **Task Scheduler**.

## A wrapper script with seat belts

Put limits around every unattended run: a time limit, a turn limit, a budget, a log, and a git safety branch.

```bash title=~/bin/agent-nightly.sh
#!/usr/bin/env bash
set -euo pipefail
source ~/.agent-env            # exports ANTHROPIC_API_KEY
cd ~/code/my-app
git fetch origin && git switch -C agent/nightly origin/main

timeout 45m claude -p "$(cat ~/prompts/nightly.md)" \
  --dangerously-skip-permissions \
  --permission-prompts none \
  --max-turns 80 \
  --max-budget-usd 8 \
  --output-format json > ~/logs/nightly-$(date +%F).json

git push -u origin agent/nightly
```

| Line | Seat belt |
|---|---|
| `set -euo pipefail` | Stop on the first error |
| `git switch -C agent/nightly` | Work on a fresh branch, never `main` |
| `timeout 45m` | Kill the run after 45 minutes |
| `--max-turns`, `--max-budget-usd` | Cap effort and spend |
| JSON log per day | A record of what happened |

Swap the `claude` line for `codex exec --yolo`, `gemini -p … --approval-mode=yolo`, `copilot -p … --allow-all-tools`, or `agent -p --force` to use another tool.

## Schedules in CI

GitHub Actions can run on a cron schedule (`on: schedule`), in UTC. Chapter 5 has a full Claude Code example and Chapter 7 the Codex Action. Rules worth remembering:

- Schedules run only from the default branch.
- In public repositories, GitHub disables schedules after 60 days without activity.
- Runners are disposable, so bypass modes are reasonable there. Keep secrets limited to the agent step.

## Vendor clouds

The simplest unattended option is a vendor's cloud: Claude Code **routines** and cloud sessions, **Codex Cloud** scheduled tasks (created from ChatGPT web or the desktop app), **Copilot cloud agent**, **Cursor Cloud Agents**, and **Devin**. Your laptop can be off. Chapter 2 covers their network settings.

## Long-running sessions

Long sessions drift. Keep them on track:

- **Write the goal down.** Put the task, the definition of done, and the boundaries in a file (`TASK.md` or your CLAUDE.md / AGENTS.md) the agent re-reads.
- **Ask for checkpoints.** "Commit after each working step" gives you restore points.
- **Prefer several short runs** over one marathon; chain them with `--resume`.
- **Let it continue after usage limits.** Claude Code can resume automatically when a claude.ai usage limit resets (the `autoContinueAtUsageLimit` setting).

```markdown title=TASK.md
Goal: migrate all API routes from Express to Fastify.
Done when: npm test passes and no file imports "express".
Rules: work on branch agent/fastify; commit after each route; never touch
the deploy/ folder; if blocked for more than 3 attempts, write BLOCKED.md
explaining why and stop.
```

:::checklist
- Long runs happen in tmux, `--bg`, CI, or a vendor cloud
- Scheduled runs use a wrapper with timeout, turn, and budget limits
- Each run works on its own branch and writes a log
- The task file defines "done" and when to stop
:::
