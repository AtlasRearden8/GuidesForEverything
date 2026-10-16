# Merging and Merge Conflicts, Step by Step

**Merging** brings the work from one branch into another. Most merges happen automatically in a second. Occasionally Git needs you to make a decision, and that's a **merge conflict**. Conflicts look alarming the first time, but they're just Git politely asking, "Which version do you want?" This chapter walks through both, slowly.

:::summary In this chapter
- What a merge does: fast-forward merges and merge commits
- Merging on the command line
- Why conflicts happen, and how to read conflict markers
- Resolving a conflict step by step: terminal, VS Code, and the GitHub website
- Backing out of a merge, and habits that prevent conflicts
:::

## What a merge does

### Fast-forward

If `main` hasn't changed since you created your branch, Git simply slides the `main` label forward to your newest commit. No new commit is needed. This is called a **fast-forward** merge.

```text
before:  o---o (main)
              \
               o---o (my-branch)

after:   o---o---o---o (main, my-branch)
```

### Merge commit

If both branches have new commits, Git combines them and records a **merge commit**: a special commit with two parents, one from each branch.

```text
before:  o---o---o (main)
              \
               o---o (my-branch)

after:   o---o---o-------M (main)
              \         /
               o-------o (my-branch)
```

## Merging on the command line

Switch to the branch you want to merge *into*, then name the branch to merge *from*:

```bash
git switch main
git pull
git merge add-menu-page
```

On GitHub, you'll usually merge through a pull request instead (next chapters), which adds review and checks. The concepts are identical.

## Why conflicts happen

Git merges changes line by line. If two branches changed *different* lines, or different files, Git combines them without asking. A conflict only happens when both branches changed the *same lines* in different ways, or one branch edited a file the other deleted. Git won't guess which is right, so it stops and asks you.

Here's what you'll see in the terminal:

```text
Auto-merging hours.txt
CONFLICT (content): Merge conflict in hours.txt
Automatic merge failed; fix conflicts and then commit the result.
```

## Reading conflict markers

Git writes both versions into the file, fenced with **conflict markers**:

```text
<<<<<<< HEAD
Open 7am to 2pm
=======
Open 8am to 4pm
>>>>>>> update-hours
```

| Marker | Means |
|---|---|
| `<<<<<<< HEAD` | Start of *your* version (the branch you're on) |
| `=======` | The divider between the two versions |
| `>>>>>>> update-hours` | End of *their* version (the branch being merged in) |

Your job is to replace the whole fenced block, markers included, with the text you actually want. That might be one side, the other, or a mix of both.

## Resolving a conflict in the terminal

:::steps Fix a merge conflict
1. **Don't panic, and read the status.**
   ```bash
   git status
   ```
   Files with conflicts are listed under **Unmerged paths** as `both modified`.
2. **Open each conflicted file** in your editor and search for `<<<<<<<`.
3. **Decide what the text should say.** For example, after checking with your teammate, the shop now opens 8am to 2pm.
4. **Delete the markers and write the final version.**
   ```text
   Open 8am to 2pm
   ```
5. **Mark the file as resolved by staging it.**
   ```bash
   git add hours.txt
   ```
6. **Repeat for every conflicted file**, until `git status` lists none.
7. **Finish the merge.** Git pre-fills a message such as "Merge branch 'update-hours'".
   ```bash
   git commit
   ```
8. **Test, then push.** Make sure the project still works before sharing.
:::

### Taking one whole side

If you know one version is entirely right for a file, you don't need to edit by hand:

```bash
git checkout --ours hours.txt     # keep my version
git checkout --theirs hours.txt   # keep the incoming version
git add hours.txt
```

### Changed your mind?

Before you commit, you can cancel the whole merge and return to exactly where you started:

```bash
git merge --abort
```

## Resolving in VS Code

Visual Studio Code highlights conflicts in color and puts small clickable links above each one:

| Link | Keeps |
|---|---|
| **Accept Current Change** | Your version (HEAD) |
| **Accept Incoming Change** | The other branch's version |
| **Accept Both Changes** | Both, one after the other |
| **Compare Changes** | Opens a side-by-side view to help you decide |

After choosing, save the file, then stage and commit as above (VS Code's Source Control panel has buttons for both). Many editors, including GitHub Desktop's suggested editor, work the same way.

## Resolving on the GitHub website

When a pull request can't be merged automatically, GitHub says **This branch has conflicts that must be resolved**.

:::steps Resolve conflicts in a pull request
1. **Click Resolve conflicts** near the bottom of the pull request.
2. **Edit the file** in the browser editor: keep the right text and delete the markers.
3. **Click Mark as resolved** when that file has no markers left.
4. **Move to the next file**, listed on the left under "conflicting files," and repeat.
5. **Click Commit merge.** This merges the base branch into your pull request's branch.
:::

> [!NOTE]
> The web editor handles simple text conflicts. For complicated ones (for example, a file deleted on one side), GitHub asks you to resolve them locally, using the terminal steps above.

## Asking an AI agent to help

Conflicts are a great job for an AI coding agent, because it can read both versions and the surrounding code. Ask it to explain, not just fix:

```prompt
There are merge conflicts on this branch. For each conflict, explain
what each side was trying to do, propose a resolution that keeps
both intentions where possible, and wait for my OK before
committing. Then run the tests.
```

## Habits that prevent conflicts

- **Pull often.** Merge `main` into your branch (or pull) every day on long tasks.
- **Keep branches short-lived.** Merge small changes quickly.
- **Split big files** that everyone edits into smaller ones.
- **Talk.** If two people need the same file, agree who goes first.
- **Don't reformat whole files** in the same branch as real changes; formatting touches every line.

| Symptom | What to do |
|---|---|
| `You have unmerged paths` | Resolve, `git add` each file, then `git commit` |
| Markers like `<<<<<<<` got committed by mistake | Edit them out, commit again |
| `Merging is not possible because you have unmerged files` | You're mid-merge; finish it or `git merge --abort` |
| Too many conflicts to face | `git merge --abort`, then merge in smaller steps or ask for help |

:::checklist
- I know the difference between a fast-forward and a merge commit
- I can read `<<<<<<<`, `=======`, and `>>>>>>>` markers
- I resolved a practice conflict, staged it, and committed
- I know `git merge --abort` is my escape hatch
:::
