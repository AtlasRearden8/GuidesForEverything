# Your First Repository, Entirely in the Browser

You can do real work on GitHub without installing anything. Let's create a repository, edit a file, add folders, and save commits, all from the website.

:::summary In this chapter
- Creating a repository
- Editing, creating, uploading, renaming, and deleting files
- Making commits from the browser
- Reading the history of a file
- Renaming, changing visibility of, or deleting a repository
:::

## Create a repository

:::steps New repository
1. **Click the + menu** (top right) and choose **New repository**.
2. **Name it.** For example `my-first-repo`. Use lowercase letters and dashes.
3. **Add a description**, like "Learning GitHub."
4. **Choose Public or Private.** Public means anyone can see it; private means only you and people you invite.
5. **Tick "Add a README file."** A README is the welcome page of your repository.
6. **Click Create repository.**
:::

You're now looking at your repository's home page. The file list is in the middle, the README is shown below it, and tabs across the top lead to **Issues**, **Pull requests**, **Actions**, and **Settings**.

> [!NOTE]
> The create page also offers a `.gitignore` template and a license. Both are explained in the README, LICENSE and .gitignore chapter. It's fine to skip them for a practice repository.

## Edit a file and make your first commit

:::steps Edit and commit
1. **Open README.md** by clicking its name.
2. **Click the pencil icon** (Edit this file).
3. **Change the text.** Add a line such as `This is where I'm learning GitHub!`
4. **Check the Preview tab** to see how it will look.
5. **Click Commit changes…** (top right).
6. **Write a commit message**, a short note saying what you did: `Add welcome line to README`.
7. **Choose "Commit directly to the main branch"** and click **Commit changes**.
:::

Congratulations: that's a **commit**. Click the clock icon labeled **commits** on the repository page to see the history, including GitHub's original "Initial commit."

> [!TIP]
> The commit dialog also offers **Create a new branch for this commit and start a pull request**. That's the safer choice on shared projects, and the Pull Requests chapter explains why.

## Create new files and folders

:::steps Create a file
1. **Click Add file**, then **Create new file**.
2. **Type a name**, such as `notes.md`.
3. **To put it in a folder, type a slash.** Typing `ideas/notes.md` creates a folder called `ideas` with the file inside. Git only stores folders that contain at least one file.
4. **Write some text**, then **Commit changes…** as before.
:::

## Upload files

On the repository page, click **Add file**, then **Upload files**, and drag in documents, images, or code. Write a commit message and click **Commit changes**.

| Limit | Size |
|---|---|
| Largest file you can upload through the browser | 25 MiB |
| Git warns you about files larger than | 50 MiB |
| GitHub blocks files larger than | 100 MiB |
| Recommended total repository size | Under 1 GB (under 5 GB strongly recommended) |

For big files such as videos or design files, use **Git Large File Storage** (Git LFS), an add-on that stores large files separately, or keep them out of the repository altogether.

## Rename, move, or delete a file

- **Rename or move:** open the file, click the pencil, and edit the name box at the top. Add `folder/` in front to move it into a folder, then commit.
- **Delete:** open the file, click the **…** menu (top right of the file), choose **Delete file**, and commit.

Nothing is truly lost: deleted files remain in the history, and you can bring them back.

## Read the history of a file

Open any file and click **History** to see every commit that changed it. Click a commit to see a **diff**: a before-and-after view where removed lines are red with a minus sign and added lines are green with a plus sign.

Click **Blame** (or press <kbd>B</kbd>) to see, line by line, which commit last changed each line and who made it. Despite the name, it's for understanding, not blaming!

## Repository settings you'll want early

All of these live under the repository's **Settings** tab, on the **General** page.

| Task | Where |
|---|---|
| Rename the repository | Repository name box at the top |
| Turn features on or off (Wiki, Issues, Discussions) | **Features** section |
| Make it public or private | **Danger Zone**, then **Change visibility** |
| Make it read-only but keep it | **Danger Zone**, then **Archive this repository** |
| Delete it forever | **Danger Zone**, then **Delete this repository** |

> [!WARNING]
> Deleting a repository removes its issues, pull requests, and history for everyone. If you just want it out of the way, **archive** it instead.

> [!TIP]
> Press the <kbd>.</kbd> (period) key on any repository page to open **github.dev**, a full code editor that runs in your browser. It's great for editing several files at once. The Codespaces chapter covers it.

:::checklist
- Created `my-first-repo` with a README
- Made a commit by editing a file
- Created a file inside a new folder
- Looked at a diff in the History view
- Found the Danger Zone (and didn't press anything)
:::
