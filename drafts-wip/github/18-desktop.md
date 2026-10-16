# GitHub Desktop

**GitHub Desktop** is a free, open source app for Windows and macOS that does everything in the Everyday Workflow chapter with buttons instead of commands. It shows exactly what changed in color, so it's a wonderful way to learn Git visually. You can switch to the command line any time; both work on the same repository.

:::summary In this chapter
- Installing and signing in
- Cloning, creating, and adding repositories
- Committing, pushing, and pulling
- Branches and pull requests from Desktop
- Stash, undo, revert, and conflicts
:::

## Install and sign in

:::steps Get started
1. **Download** from desktop.github.com. It runs on Windows 10 64-bit or later and macOS 12 or later. (There's no official Linux version.)
2. **Sign in.** Choose **Sign in to GitHub.com** and approve in your browser.
3. **Configure Git.** Desktop asks for your name and email; use your noreply address to keep your email private.
:::

## Get a repository

From the **File** menu:

| Option | Use it when |
|---|---|
| **Clone repository** | The project is on GitHub and you want it on your computer |
| **New repository** | You're starting from nothing |
| **Add local repository** | The folder is already a Git repository on your computer |

For a new repository, click **Publish repository** afterwards to put it on GitHub (untick **Keep this code private** only if you want it public).

## The main window

| Area | What it shows |
|---|---|
| **Current repository** (top left) | Switch between projects |
| **Current branch** (top middle) | Switch, create, and merge branches |
| **Fetch origin / Pull origin / Push origin** (top right) | Sync with GitHub; the label changes to what's needed |
| **Changes** tab | Files you've changed, with the diff on the right |
| **History** tab | Past commits, with their diffs |

## Commit and push

:::steps The daily loop in Desktop
1. **Edit files** in your editor (**Repository**, then **Open in Visual Studio Code** or your chosen editor).
2. **Review changes** in the **Changes** tab. Untick any file you don't want in this commit; click line numbers in the diff to include or exclude individual lines.
3. **Write a message** in the **Summary** box (and optionally **Description**). If you have Copilot, the **Generate commit message with Copilot** button drafts one.
4. **Click Commit to main** (or your branch's name).
5. **Click Push origin** to send it to GitHub.
:::

Click **Fetch origin** regularly; if others pushed, the button becomes **Pull origin**.

## Branches and pull requests

- **Create a branch:** **Current branch**, then **New branch**. Name it and choose what to base it on (usually `main`).
- **Publish it:** click **Publish branch**.
- **Open a pull request:** click **Create Pull Request**; Desktop opens the GitHub page with everything filled in.
- **Update your branch with main:** **Current branch**, then **Choose a branch to merge into** *your-branch*, pick `main`, and merge.
- **Check out someone's PR:** the **Pull requests** list under **Current branch** lets you switch to any open pull request's branch to try it.

## Fixing things

| Need | In Desktop |
|---|---|
| Throw away edits to a file | Right-click it in **Changes**, then **Discard Changes** |
| Set work aside | Right-click the changes header, then **Stash All Changes**; restore from **Stashed Changes** |
| Undo the commit you just made | Click **Undo** at the bottom left (before pushing) |
| Undo an older commit safely | **History**, right-click the commit, **Revert Changes in Commit** |
| Resolve a conflict | Desktop lists conflicted files; open each in your editor, fix, then click **Continue merge** |

> [!TIP]
> Desktop shows the equivalent idea for every action, so after a few weeks try the same thing in the terminal. The **Repository** menu's **Open in Terminal** (Command Prompt on Windows) opens a terminal in the right folder.

:::checklist
- Signed in and cloned a repository
- Committed with a clear Summary and pushed
- Created a branch and opened a pull request from Desktop
- Tried Undo and Revert on a practice repository
:::
