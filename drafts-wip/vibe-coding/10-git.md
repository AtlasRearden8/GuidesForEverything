# Version Control Safety Nets

The single most important habit in vibe coding is saving working versions. AI makes changes quickly and confidently, and sometimes those changes are wrong. With good safety nets, any mistake is one click away from undone.

:::summary In this chapter
- The three layers of safety: builder history, Git, and GitHub
- Git explained without jargon
- Using GitHub Desktop, the command line, or your AI to save versions
- Branches for experiments
- How to recover from a bad change
:::

## Three layers of safety

| Layer | What it is | Protects you from |
|---|---|---|
| **Builder history** | Versions or checkpoints inside Lovable, Bolt, Replit | A bad prompt in the last hour |
| **Git** | A history of your project's files, saved at moments you choose | Bad changes from any tool, on any day |
| **GitHub** | An online home for your Git history | A lost laptop, a closed account, a builder you leave |

Use all three. Builder history is automatic. Git and GitHub take a minute to set up and repay that minute many times over.

## Git without jargon

**Git** is a program that records snapshots of your project. Each snapshot is a **commit**, with a short message describing what changed. You can look back at any commit, compare it with today, or return to it.

**GitHub** is a website that stores your Git history online, called a **repository** (or **repo**). Builders that "sync with GitHub" are making commits for you every time the AI changes something.

A few more words:

- **Push:** send your new commits up to GitHub.
- **Pull:** bring down commits made elsewhere (by a builder, a teammate, or a cloud agent).
- **Clone:** download a full copy of a repo to your computer.
- **Branch:** a separate line of work, so you can experiment without touching the working version.
- **Pull request (PR):** a proposal to merge a branch into the main version, with the changes laid out for review.

> [!NOTE]
> The *GitHub* manual in this series covers all of this in depth, with screenshots of every step. This chapter gives you just enough to stay safe.

## Connect your builder to GitHub

:::steps Turn on GitHub sync
1. **Create a free GitHub account** at github.com, if you don't have one.
2. **Open your builder's GitHub setting.** It's usually in the project's settings or an integrations menu.
3. **Authorize the builder.** GitHub asks which repositories it may access. Allow just the ones it creates, if offered.
4. **Create the repository.** The builder makes a new repo and pushes your code.
5. **Check it on github.com.** You should see your files and a list of commits.
:::

From now on, every change the builder makes becomes a commit. Lovable, Bolt, and Base44 offer two-way sync, so changes pushed to GitHub from elsewhere flow back into the builder too.

## Saving versions yourself

When you work in an editor or with an agent on your computer, you decide when to commit. Three ways to do it:

**GitHub Desktop (easiest).** A free app for Windows and Mac. Changed files appear in a list; type a short summary and click **Commit to main**, then **Push origin**.

**The command line.** In a terminal, inside your project folder:

```bash
git status                       # what's changed?
git add -A                       # include every change
git commit -m "Add Today view"   # save a snapshot
git push                         # send it to GitHub
```

**Ask your AI agent.** Agents like Claude Code and Codex can commit for you:

```prompt
The Today view works now. Commit everything with a clear message,
then push to GitHub.
```

> [!TIP]
> Commit every time something works, not just at the end of the day. Small commits with clear messages ("Add plant photo upload") make it easy to find exactly where something broke.

## Keep secrets out of Git

A file called `.gitignore` lists files Git must never save. Your `.env` file, which holds secret keys, must be in it. Most project templates include one already; check:

```text title=.gitignore
node_modules/
.env
.env.local
.DS_Store
```

GitHub also has **push protection**, on by default for public repositories, which blocks pushes that contain recognizable secrets such as API keys. Treat it as a seatbelt, not a reason to be careless.

## Branches for experiments

When you want to try something risky, like a redesign or a new payment flow, do it on a branch.

```bash
git switch -c try-new-design     # make and enter a new branch
# ...build and test the experiment...
git switch main                  # go back to the safe version
```

If the experiment works, merge it through a pull request on GitHub. If not, delete the branch and nothing is lost. In GitHub Desktop, use **Current branch > New branch**.

## Recovering from a bad change

| Situation | What to do |
|---|---|
| The last prompt broke things | Use the builder's history or checkpoint rollback |
| A file got mangled, not yet committed | `git restore filename` puts back the last committed version |
| A commit broke things | `git revert <commit-id>` makes a new commit that undoes it |
| You're lost and want yesterday's version | Ask your agent: "Show me recent commits and help me return to the last one where X worked" |

`git revert` is safe because it doesn't erase history; it adds an "undo" on top. Avoid commands with `--force` or `reset --hard` unless you understand exactly what they'll delete.

```bash
git log --oneline -10            # show the last 10 commits
```

> [!CAUTION]
> If an AI suggests `git push --force` or `git reset --hard`, stop and ask why. These commands can permanently throw away work. There is almost always a safer way.

:::checklist
- My project is connected to GitHub
- I can see my commits on github.com
- `.env` is listed in `.gitignore`
- I commit after each working slice
- I know how to restore a version in my builder and with Git
:::

