
# Safety Nets

Containment limits what can go wrong. Safety nets make what *does* go wrong easy to undo. With good nets you can say "yes" to more autonomy, because every mistake is a few clicks from reversed.

:::summary In this chapter
- Git as an undo button: commits, branches, and checkpoints
- Built-in checkpoints in each tool
- Backups for everything outside Git
- Kill switches: how to stop an agent fast
- Budget limits as a last line
:::

## Git is your undo button

**Git** records every saved version (a **commit**) of your project. If an agent breaks something, you return to a good commit.

:::cheatsheet
**See what changed:** `git status` and `git diff`

**Undo uncommitted changes to one file:** `git restore path/to/file`

**Save a restore point before a run:** `git commit -am "before agent run"`

**Find an old good state:** `git log --oneline`

**Go back on a new branch:** `git switch -c rescue <commit-id>`

**Recover "lost" commits:** `git reflog`
:::

Habits that make Git a reliable net:

- **Agents never work on `main`.** Give each run its own branch (`agent/…`).
- **Commit often.** Ask agents to commit after each working step.
- **Push often.** A pushed branch survives the box being destroyed.
- **Protect `main`** with status checks and no force pushes (Chapter 12).

## Checkpoints built into the tools

| Tool | Checkpoint feature |
|---|---|
| **Claude Code** | Rewind to an earlier point in the session (press <kbd>Esc</kbd> twice, or `/rewind`) |
| **Gemini CLI** | `general.checkpointing.enabled` saves a snapshot before changes |
| **Cline** | Checkpoints in the task history |
| **Aider** | A git commit for every change (`/undo` reverts the last one) |
| **Cursor, Devin Desktop** | Restore points in the chat timeline |

> [!NOTE]
> Session checkpoints usually cover file edits made by the agent's edit tools, not everything a shell command did (a database change, a deleted folder outside the project). Git and backups cover the rest.

## Backups for everything else

:::checklist
- Your computer: Time Machine (Mac) or File History (Windows) on
- Cloud drives: version history enabled (Google Drive, Dropbox, OneDrive keep old versions)
- Databases the agent can write: automatic daily backups or snapshots
- Notion: page version history; export the workspace now and then
- n8n: back up the database volume; export workflows
- VM or container: a snapshot before big runs
:::

## Kill switches

Know how to stop each agent *before* you need to.

| To stop | Do this |
|---|---|
| An interactive terminal agent | <kbd>Esc</kbd> to interrupt the turn, <kbd>Ctrl</kbd> + <kbd>C</kbd> to quit |
| A Claude Code background agent | `claude agents`, then stop it |
| A tmux session | `tmux kill-session -t agent` |
| A runaway process | `pkill -f claude` (or `codex`, `gemini`, `agent`) |
| A container | `docker stop <name>` |
| A GitHub Actions run | Actions tab, the run, then **Cancel workflow** |
| A Copilot cloud agent task | Stop it from the pull request or the agents page |
| A leaked or abused token | Revoke it on the service's token page, immediately |
| Spending | Lower the spend limit to zero, or disable the API key |

> [!IMPORTANT]
> The fastest universal kill switch is **revoking the agent's tokens**. An agent without its API key can't think, and one without its GitHub token can't push. That's another reason agents should have their own keys: you can cut them off without locking yourself out.

## Budgets as the last net

Spend limits (Chapter 3) stop a runaway loop from becoming a big bill. Per-run caps like `--max-budget-usd` and `--max-turns` stop a single run; account-level limits stop everything.

:::checklist
- Agents always work on branches; `main` is protected
- Commits and pushes happen often
- Backups cover files, drives, and databases the agent can reach
- I know the kill switch for every agent I run
- Spend limits are set and I've tested that revoking a key stops the agent
:::
