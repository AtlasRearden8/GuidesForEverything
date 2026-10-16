# Branches in Depth

**Branches** let you work on something new without risking the version that works. They're cheap, fast, and the foundation of everything collaborative on GitHub: pull requests, code review, and AI agents working in parallel. This chapter explains what a branch really is and how to create, switch, rename, and tidy them.

:::summary In this chapter
- What a branch actually is (a movable label)
- Creating, switching, listing, renaming, and deleting branches
- Local branches versus remote branches like `origin/main`
- Creating branches on the GitHub website
- Naming conventions and the simple "GitHub flow"
:::

## A branch is a movable label

Remember that each commit points to the one before it. A **branch** is just a name attached to one commit. When you commit on a branch, the label moves forward to the new commit. Creating a branch takes a fraction of a second and costs almost no space, because nothing is copied.

```text
                 o---o   (winter-hours)
                /
o---o---o---o---o        (main)
```

Here, `main` and `winter-hours` share history up to a point, then each has its own new commits. Work on one doesn't affect the other until you **merge** them.

**HEAD** is Git's name for "the branch you're on right now." Switching branches moves HEAD and swaps the files in your working folder to match.

## Everyday branch commands

:::compact
| Command | What it does |
|---|---|
| `git branch` | List local branches; `*` marks the current one |
| `git branch -a` | Also list remote branches (`remotes/origin/…`) |
| `git branch -vv` | Show each branch's latest commit and its GitHub partner |
| `git switch winter-hours` | Move to an existing branch |
| `git switch -c winter-hours` | Create a new branch and move to it |
| `git switch -` | Jump back to the branch you were on before |
| `git branch -m new-name` | Rename the current branch |
| `git branch -d winter-hours` | Delete a branch that has been merged |
| `git branch -D winter-hours` | Force-delete a branch, even if unmerged |
| `git push -u origin winter-hours` | Publish a branch to GitHub |
| `git push origin --delete winter-hours` | Delete the branch on GitHub |
| `git fetch --prune` | Forget remote branches that were deleted on GitHub |
:::

> [!NOTE]
> Older tutorials use `git checkout` for switching (`git checkout -b name` creates a branch). It still works. `git switch` is the newer, clearer command for the same job, so this manual uses it.

### The branch workflow

:::steps Make a change on a branch
1. **Start from an up-to-date main.**
   ```bash
   git switch main
   git pull
   ```
2. **Create and switch to a new branch.**
   ```bash
   git switch -c add-menu-page
   ```
3. **Make your changes, then commit them** as usual (`git add .` and `git commit -m "…"`).
4. **Push the branch to GitHub.**
   ```bash
   git push -u origin add-menu-page
   ```
5. **Open a pull request**, review, and merge (next chapters).
6. **Tidy up afterwards.**
   ```bash
   git switch main
   git pull
   git branch -d add-menu-page
   ```
:::

## Local and remote branches

There are two kinds of branch to keep in mind:

| Kind | Example | Lives |
|---|---|---|
| **Local branch** | `main`, `add-menu-page` | On your computer; you commit to these |
| **Remote-tracking branch** | `origin/main` | A read-only bookmark of where GitHub's branch was at your last fetch |

`origin/main` only updates when you run `git fetch` or `git pull`. That's why `git status` might say "Your branch is up to date with origin/main" even though a teammate pushed five minutes ago: your bookmark is simply old. Run `git fetch` to refresh it.

To work on a branch someone else pushed:

```bash
git fetch
git switch their-branch-name
```

Git notices that `origin/their-branch-name` exists and creates a matching local branch for you.

## Branches on the GitHub website

- **Create:** click the branch menu (it says `main`) above the file list, type a new name, and click **Create branch**.
- **See all:** click the branch count next to the branch menu to see every branch, with buttons to delete stale ones.
- **From an issue:** in an issue's right sidebar, under **Development**, click **Create a branch**. The branch is linked to the issue automatically.
- **Change the default branch:** [[Settings > General]], then the **Default branch** section. Rarely needed, but good to know.

## Naming branches

Good names say what the branch is for, so anyone can guess its purpose from a list.

| Style | Example |
|---|---|
| Feature | `add-gift-cards`, `feature/gift-cards` |
| Bug fix | `fix-cart-total`, `fix/cart-total` |
| Issue number | `42-winter-hours` |
| AI agent work | `claude/add-tests`, `copilot/fix-login` |

Use lowercase letters, numbers, and dashes. Avoid spaces and most punctuation. Slashes are allowed and many tools group branches by the part before the slash.

## The GitHub flow

Most small teams use a simple routine called the **GitHub flow**:

1. `main` always works and could be published at any moment.
2. For each change, create a short-lived branch from `main`.
3. Commit on the branch and push it early.
4. Open a pull request, get feedback, and let automated checks run.
5. Merge into `main`, then delete the branch.

Short branches (hours or days, not weeks) are the secret. The longer a branch lives, the more `main` moves on without it, and the harder the eventual merge.

> [!TIP]
> Working with several AI agents at once? Give each its own branch. They can then work in parallel without overwriting each other, and you review each one's pull request separately.

## Common branch hiccups

| Message | What it means | Fix |
|---|---|---|
| `cannot delete branch 'x' used by worktree` or `checked out` | You're standing on it | `git switch main` first |
| `The branch 'x' is not fully merged` | It has commits not in `main` | Merge it, or use `-D` if you're sure |
| `Your local changes would be overwritten` | Uncommitted edits block the switch | Commit, or `git stash`, then switch |
| `fatal: a branch named 'x' already exists` | The name is taken | Pick another, or `git switch x` |

:::checklist
- I can create, switch, and list branches
- I start every branch from an up-to-date `main`
- I know `origin/main` only updates when I fetch
- I delete branches after they're merged
:::
