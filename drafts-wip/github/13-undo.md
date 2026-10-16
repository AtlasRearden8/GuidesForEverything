# Undoing Mistakes: the Panic Page

Take a breath. Git almost never truly loses work that was committed, and many uncommitted mistakes are fixable too. This chapter is a recipe book: find the situation that matches yours, and follow the recipe.

:::summary In this chapter
- The four undo tools: restore, revert, reset, and reflog
- Setting work aside with stash
- A recipe table for the most common "oh no" moments
- What to do if a mistake is already on GitHub
:::

## First, stop and look

Before you run any undo command:

1. Run `git status` and read it carefully.
2. Run `git log --oneline -n 5` to see where you are.
3. If you're unsure, make a safety copy: `git switch -c backup-before-fix`, then `git switch -` back. A branch costs nothing and keeps the current state safe.

## The four undo tools

| Tool | Undoes | Rewrites history? | Safe after pushing? |
|---|---|---|---|
| `git restore` | Uncommitted changes to files | No | Yes |
| `git revert` | A commit, by adding an opposite commit | No | Yes |
| `git reset` | Commits, by moving the branch label back | Yes | No (only local commits) |
| `git reflog` | Finds "lost" commits after a reset or rebase | No | Yes |

### restore: throw away or un-stage changes

```bash
git restore menu.txt            # discard edits to menu.txt
git restore .                   # discard ALL uncommitted edits
git restore --staged menu.txt   # un-stage, but keep the edits
```

> [!WARNING]
> Discarded uncommitted edits are gone; Git never saved them. Double-check with `git diff` first.

### revert: undo a commit safely

```bash
git revert 3f9a2c1
```

This creates a *new* commit that does the exact opposite of `3f9a2c1`. History stays intact, which makes it the right tool for anything already pushed or shared.

### reset: move the branch back

| Command | Commits after the target | Your file changes |
|---|---|---|
| `git reset --soft HEAD~1` | Removed | Kept, and staged |
| `git reset HEAD~1` (mixed) | Removed | Kept, not staged |
| `git reset --hard HEAD~1` | Removed | Thrown away |

`--soft` and the default mixed mode are gentle: you only lose the commit, not the work. `--hard` discards changes, so use it only when you really mean it.

### reflog: Git's secret diary

Git records every place HEAD has been, even after resets and rebases, for at least 30 days by default:

```text
fb7361b HEAD@{0}: commit: Again
3331bbc HEAD@{1}: reset: moving to HEAD~1
6b18521 HEAD@{2}: commit (amend): Second, better
543b229 HEAD@{3}: commit: Second
```

Find the line from before the mistake and go back to it, or rescue it onto a new branch:

```bash
git reflog
git switch -c rescued 6b18521
```

## stash: set work aside

**Stashing** puts your uncommitted changes on a shelf so you can switch branches or pull, then bring them back later.

| Command | Does |
|---|---|
| `git stash push -m "half-done header"` | Shelve changes, with a label |
| `git stash list` | See the shelf |
| `git stash pop` | Bring back the latest, and remove it from the shelf |
| `git stash apply` | Bring it back, but keep a copy on the shelf |
| `git stash push -u` | Also shelve brand-new (untracked) files |
| `git stash drop` | Throw away the latest stash |

## The recipe table

:::compact
| Oh no, I... | Do this |
|---|---|
| Edited a file and want the old version back | `git restore file` |
| Staged a file by mistake | `git restore --staged file` |
| Made a typo in my last commit message (not pushed) | `git commit --amend -m "Better message"` |
| Forgot a file in my last commit (not pushed) | `git add file` then `git commit --amend --no-edit` |
| Want to undo my last commit but keep the work (not pushed) | `git reset --soft HEAD~1` |
| Committed to `main` instead of a branch (not pushed) | `git switch -c new-branch`, then `git switch main` and `git reset --hard origin/main` |
| Pushed a bad commit to a shared branch | `git revert <hash>` then `git push` |
| Reset or rebased and lost commits | `git reflog`, then `git switch -c rescued <hash>` |
| Deleted a branch with unmerged work | `git reflog`, find its last commit, `git branch name <hash>` |
| Deleted a file and committed it | `git restore --source=HEAD~1 file` and commit |
| Want to throw away everything since my last pull | `git reset --hard origin/main` (careful!) |
| Have a mess of untracked files | Preview with `git clean -n`, then delete with `git clean -fd` |
| Am stuck in the middle of a merge | `git merge --abort` |
| Am stuck in the middle of a rebase | `git rebase --abort` |
| Pulled and got a scary editor window | It's a merge message: in Vim press <kbd>Esc</kbd>, type `:wq`, <kbd>Enter</kbd> |
| Committed a password or API key | Revoke the key at its source first, then see Securing Your Repositories |
:::

> [!CAUTION]
> `reset --hard`, `clean -fd`, and `push --force` are the three commands that can destroy work. Never run them, and never approve an AI agent running them, without reading exactly what will be lost.

## Undoing on the GitHub website

- **Revert a merged pull request:** open the merged pull request and click **Revert**. GitHub creates a new pull request that undoes it, which you then merge.
- **Restore a deleted branch:** on a closed or merged pull request, click **Restore branch**.
- **GitHub Desktop:** **Undo** appears right after you commit, and you can right-click any commit in **History** and choose **Revert Changes in Commit**.

```prompt
I think I made a Git mistake. Before changing anything, run git
status, git log --oneline -n 10 and git reflog -n 10, explain in
plain English what state my repository is in, and suggest the safest
way to get back to where I want to be. Don't run any command that
discards work without asking me first.
```

:::checklist
- I know restore, revert, reset, and reflog, and when to use each
- I revert (not reset) anything already pushed
- I make a backup branch before risky fixes
- I've practiced `git stash` and `git stash pop`
:::
