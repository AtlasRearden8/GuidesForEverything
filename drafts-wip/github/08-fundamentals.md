# Git Fundamentals in Depth

You can use Git for months by memorizing four commands. But a little understanding of what Git is actually doing makes everything else in this manual click, and makes mistakes far less scary. This chapter explains commits, staging, diffs, and history properly, with real examples you can try.

:::summary In this chapter
- What a commit really is, and how Git names it
- The three places your work lives, and the life cycle of a file
- Staging exactly what you want, even part of a file
- Reading `git status` and `git diff` output
- Exploring history with `git log`, `git show`, and `git blame`
- Pointing at commits with `HEAD`, `HEAD~1`, and friends
:::

## Snapshots, not copies of changes

Each **commit** is a complete snapshot of every tracked file at one moment, stored efficiently so unchanged files take no extra space. Every commit records:

| Part | Example | Meaning |
|---|---|---|
| **Hash** | `3f9a2c1…` | A unique ID made from the contents |
| **Author** | Sam Lee | Who made it, and their email |
| **Date** | 16 Oct 2026, 10:42 | When it was made |
| **Message** | `Add opening hours` | Why it was made |
| **Parent** | `a71b0e4…` | The commit that came just before |

The **hash** is a 40-character code such as `3f9a2c1e8b…`. You almost never need all of it: the first seven characters (the **short hash**, like `3f9a2c1`) are enough to identify a commit in nearly every project.

Because each commit points to its parent, the history forms a chain:

```text
First  <--  Add menu  <--  Fix prices  <--  Add hours   (main)
```

A **branch** is simply a label pointing at the newest commit in a chain. More on that in the Branches chapter.

## The three places your work lives

| Place | What it is |
|---|---|
| **Working folder** | The files you see and edit on your computer |
| **Staging area** | Changes you've marked as "ready to go in the next commit" (also called the **index**) |
| **Repository** | The saved history of commits, both on your computer (*local*) and on GitHub (the *remote*, usually named `origin`) |

Think of packing a parcel. The working folder is your desk, covered in things. The staging area is the open box: you choose what goes in. A commit seals the box and labels it. Pushing posts it to GitHub.

### The life cycle of a file

| State | Meaning | Gets there by |
|---|---|---|
| **Untracked** | New; Git has never saved it | Creating a file |
| **Modified** | Changed since the last commit | Editing a tracked file |
| **Staged** | Marked for the next commit | `git add` |
| **Committed** | Safely stored in history | `git commit` |

## Reading git status

`git status` is the command you'll run most. It never changes anything, so run it whenever you're unsure. Here's real output, with one edited file and one new file:

```text
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   menu.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	hours.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

Notice that Git tells you the next command to use in brackets. For a compact version, run `git status --short`: `M` means modified, `??` means untracked, and a letter in the first column means staged.

## Staging exactly what you want

| Command | Stages |
|---|---|
| `git add menu.txt` | One file |
| `git add images/` | Everything in a folder |
| `git add .` | Everything changed in the current folder and below |
| `git add -p` | Pieces of files, one chunk at a time |
| `git restore --staged menu.txt` | Un-stages a file (your edits stay) |

### Staging part of a file

Say you fixed a typo *and* started a new feature in the same file. `git add -p` (p for "patch") shows each changed chunk and asks what to do:

| Answer | Means |
|---|---|
| `y` | Yes, stage this chunk |
| `n` | No, skip it |
| `s` | Split it into smaller chunks |
| `q` | Quit; keep what you've chosen so far |
| `?` | Show help |

Now you can commit the typo fix on its own, with its own clear message. Small, focused commits make history easy to read and easy to undo.

## Committing

```bash
git commit -m "Fix typo in opening hours"
```

For a longer explanation, add a second `-m`: the first becomes the title and the second the body.

```bash
git commit -m "Add winter hours" -m "We close at 3pm from Nov to Feb."
```

`git commit -am "message"` stages every *modified tracked* file and commits in one step. It skips brand-new files, so use it only when you know there are none.

## Reading a diff

A **diff** shows the difference between two versions. `git diff` shows unstaged changes; `git diff --staged` shows what's about to be committed.

```text
diff --git a/menu.txt b/menu.txt
--- a/menu.txt
+++ b/menu.txt
@@ -1,2 +1,3 @@
 Croissant  3.00
-Muffin     2.50
+Muffin     2.75
+Scone      2.25
```

- Lines starting with `-` were removed; lines with `+` were added. A changed line shows as one of each.
- Lines with a space in front are unchanged context, shown so you can find your place.
- The `@@ -1,2 +1,3 @@` line says where the chunk is: starting at line 1, two lines before and three lines after.

| Command | Compares |
|---|---|
| `git diff` | Working folder vs staging area |
| `git diff --staged` | Staging area vs last commit |
| `git diff HEAD` | Everything since the last commit |
| `git diff main..my-branch` | Two branches |
| `git diff --stat` | Just a summary of files and line counts |

## Exploring history

:::compact
| Command | What it shows |
|---|---|
| `git log` | Full list of commits, newest first (press <kbd>q</kbd> to exit) |
| `git log --oneline` | One commit per line: short hash and title |
| `git log --oneline --graph --all` | A text drawing of all branches |
| `git log -n 5` | Only the last five commits |
| `git log -p menu.txt` | Every change ever made to one file |
| `git log --author="Sam"` | Commits by one person |
| `git log --since="2 weeks ago"` | Recent commits only |
| `git log --grep="hours"` | Commits whose message mentions "hours" |
| `git show 3f9a2c1` | One commit's message and diff |
| `git blame menu.txt` | Who last changed each line, and in which commit |
:::

## Pointing at commits

You can name a commit in several ways, and use these names in almost any command:

| Name | Means |
|---|---|
| `3f9a2c1` | A specific commit, by short hash |
| `HEAD` | Where you are now (usually the newest commit on your branch) |
| `HEAD~1` | One commit before `HEAD` |
| `HEAD~3` | Three commits before `HEAD` |
| `main` | The newest commit on the `main` branch |
| `v1.0.0` | A tagged commit (see the Releases chapter) |

### Looking at an old version

```bash
# print a file as it was three commits ago
git show HEAD~3:menu.txt

# bring back that old version into your working folder
git restore --source=HEAD~3 menu.txt
```

You can also step back in time with the whole project:

```bash
git switch --detach HEAD~3
```

Git calls this **detached HEAD**: you're looking at an old commit rather than standing on a branch. Look around freely. To return, run `git switch main`. If you want to keep changes made there, create a branch first with `git switch -c rescue-branch`.

> [!TIP]
> Git refuses to switch if you have uncommitted changes that would be overwritten. Commit them, or set them aside with `git stash` (explained in the Undoing Mistakes chapter), then switch.

## Try it: a five-minute practice session

:::steps Practice in a scratch folder
1. **Make a folder and start a repository.**
   ```bash
   mkdir git-practice && cd git-practice
   git init
   ```
2. **Create a file and commit it.**
   ```bash
   echo "Croissant 3.00" > menu.txt
   git add menu.txt
   git commit -m "Start the menu"
   ```
3. **Change it twice, and look before you commit.**
   ```bash
   echo "Muffin 2.50" >> menu.txt
   git status
   git diff
   git commit -am "Add muffins"
   ```
4. **Read the history.**
   ```bash
   git log --oneline
   git show HEAD~1:menu.txt
   ```
:::

:::checklist
- I can explain working folder, staging area, and repository
- I read `git status` before every commit
- I can stage one file, or part of a file
- I can read a diff and find a file's history
- I know what `HEAD~1` means
:::
