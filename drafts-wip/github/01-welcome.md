# Welcome to GitHub

You've probably heard "push it to GitHub" or "it's in the repo." This chapter explains what those words mean and why GitHub is worth learning, even if you never plan to call yourself a programmer.

:::summary In this chapter
- The difference between Git and GitHub
- What "version control" means, with an everyday example
- Why GitHub matters, especially when you work with AI
- The handful of words you'll hear constantly
- How this manual is organized, and the three ways to use GitHub
:::

## Git and GitHub are two different things

**Git** is a free program that runs on your computer. It watches a folder and records snapshots of the files in it over time, so you can see what changed, when, and why, and go back to any earlier version. Git was created in 2005 and is used almost everywhere.

**GitHub** is a website (github.com, owned by Microsoft) that stores copies of Git projects online. It adds everything you need to work with others: a web interface, discussions, task tracking, reviews, automation, and website hosting.

> [!NOTE]
> A good analogy: Git is like the "track changes" and version history in a word processor; GitHub is like a shared cloud drive built around that history.

There are other websites that host Git projects, such as GitLab and Bitbucket. The Git skills in this manual work with all of them. The GitHub-specific parts (pull requests, Actions, Pages, Copilot) are what make GitHub the most popular choice.

## What is version control?

**Version control** is a system that records changes to files over time so you can recall specific versions later. You already do a clumsy version of it if you have ever saved files like these:

```text
menu.docx
menu-v2.docx
menu-v2-FINAL.docx
menu-v2-FINAL-really-final.docx
```

Git replaces that mess with one file and a tidy list of saved moments. Each moment, called a **commit**, records exactly what changed, who changed it, when, and a short note explaining why. You can compare any two moments, or bring back any old version, at any time.

| Without version control | With Git |
|---|---|
| Many copies of the same file | One file, many saved versions |
| "Which one is the latest?" | The latest is always the current file |
| Changes overwrite each other | Changes are combined, or flagged for you |
| Undo only goes back a few steps | Undo goes back to the very first save |
| A crash can lose a day's work | Every commit is a recovery point |

## Why bother?

- **A safety net.** Every saved snapshot is permanent. Broke something? Go back.
- **A backup.** Your work lives on GitHub's servers as well as your computer.
- **A shared workspace.** Several people, or several AI agents, can work on the same project at once.
- **A portfolio.** Your public projects show what you can build.
- **AI tools expect it.** Claude Code, Copilot, Cursor, Lovable, Bolt, and others connect to GitHub to read, change, and publish your code.
- **It isn't only for code.** People use GitHub for writing books, keeping recipes, planning events, publishing websites, and storing research notes. Anything made of text files benefits from history.

## Words you'll hear constantly

| Word | Plain-English meaning |
|---|---|
| **Repository** (repo) | A project folder that Git tracks, plus its entire history |
| **Commit** | A saved snapshot of your files, with a message describing the change |
| **Branch** | A separate line of work, so you can try things without touching the main version |
| **Main** | The default branch: the "official" version of the project |
| **Merge** | Combine the changes from one branch into another |
| **Pull request** (PR) | A proposal to merge a branch, with a place to discuss and review it |
| **Issue** | A to-do item, bug report, or idea, tracked on GitHub |
| **Clone** | Download a full copy of a repository to your computer |
| **Push** / **Pull** | Send your commits up to GitHub / bring others' commits down |
| **Fork** | Your own copy of someone else's repository on GitHub |

Don't worry about memorizing these; each one gets its own explanation as we go, and they're all in the Glossary.

## Three ways to use GitHub

You can do almost everything in this manual in more than one way. Pick whichever feels comfortable, and switch any time.

| Way | What it looks like | Best for |
|---|---|---|
| **The website** | Clicking buttons on github.com | Small edits, planning, reviewing |
| **An app** | GitHub Desktop, or your code editor's Git panel | Beginners who want to see changes visually |
| **The command line** | Typing `git` and `gh` commands in a terminal | Speed, and working alongside AI agents |

A fourth way is increasingly common: you describe what you want in plain English, and an **AI agent** (a program that can take actions, not just chat) runs the commands for you. Even then, knowing what the commands do lets you check the agent's work.

## How this manual is organized

:::cols
- **Getting started:** account, website tour, first repository, Markdown, project files
- **Git on your computer:** installing, fundamentals, the daily loop
- **Working in parallel:** branches, merging, rebasing, undoing mistakes
- **Working together:** pull requests, open source, issues, projects
- **Tools:** GitHub Desktop and the `gh` command line
- **Automation and publishing:** Actions, secrets, Pages, releases
- **Cloud and AI:** Codespaces, Copilot, Claude Code
- **Staying safe:** account and repository security
- **Teams and mobile:** organizations, GitHub Mobile, pricing
- **Help:** troubleshooting, quick reference, glossary
:::

> [!TIP]
> You don't need to read in order. If you only want to publish a website, read the first four chapters and then jump to GitHub Pages. If something breaks, the Undoing Mistakes and Troubleshooting chapters are written for exactly that moment.

:::checklist
- I can explain the difference between Git and GitHub
- I know what a commit, branch, and pull request are, roughly
- I've picked the way I'd like to start: website, app, or command line
:::
