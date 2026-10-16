# Install Git on Your Computer

Working in the browser is great for small edits. For real projects, and for AI coding tools that work on your computer, you'll want Git installed locally. You can drive it three ways: a friendly app (**GitHub Desktop**), the **command line**, or let an **AI agent** run the commands for you.

:::summary In this chapter
- A two-minute introduction to the terminal
- Installing Git on Windows, macOS, or Linux
- Telling Git who you are, and a few settings worth changing
- Signing in to GitHub from your computer
- Choosing between GitHub Desktop and the command line
:::

## A two-minute terminal primer

A **terminal** (also called the command line or shell) is a window where you type instructions instead of clicking. On Windows use **Git Bash** (installed with Git) or **Terminal**; on a Mac, open **Terminal** from Applications, then Utilities; on Linux, open your Terminal app.

The terminal is always "standing in" one folder, called the **current directory**. These commands move you around:

| Command | What it does |
|---|---|
| `pwd` | Print where you are now |
| `ls` | List the files here (`dir` in Windows Command Prompt) |
| `cd projects` | Move into the `projects` folder |
| `cd ..` | Move up one folder |
| `mkdir my-site` | Make a new folder called `my-site` |
| `clear` | Tidy the screen |

> [!TIP]
> Press <kbd>Tab</kbd> to auto-complete file and folder names, and the up arrow to bring back your previous command. Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to stop a command that's running.

## Install Git

| System | How |
|---|---|
| **Windows** | Download the installer from git-scm.com and accept the defaults. It includes **Git Bash** and **Git Credential Manager**, which handles signing in to GitHub. |
| **macOS** | Open Terminal and type `git --version`. If Git isn't installed, macOS offers to install the developer tools. Or use Homebrew: `brew install git`. |
| **Linux** | Ubuntu/Debian: `sudo apt install git` · Fedora: `sudo dnf install git` |

Check it worked:

```bash
git --version
```

You should see something like `git version 2.x`. Any recent version is fine.

## Tell Git who you are

Every commit is labeled with a name and email. Set them once:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
```

> [!TIP]
> To keep your real email private, use the **noreply** address GitHub gives you. Find it at [[Settings > Emails]] (it looks like `12345+username@users.noreply.github.com`) and tick **Keep my email addresses private**.

The `--global` part means "for every project on this computer." Leave it out inside a project folder to use different details just for that project, for example a work email.

### A few settings worth changing

```bash
# use VS Code for commit messages instead of the Vim editor
git config --global core.editor "code --wait"

# when pulling, merge (the beginner-friendly default)
git config --global pull.rebase false

# see all your settings
git config --list
```

> [!NOTE]
> If Git ever drops you into a strange full-screen editor called **Vim**, type <kbd>Esc</kbd>, then `:wq`, then <kbd>Enter</kbd> to save and exit. Setting `core.editor` as above stops it happening.

### Line endings on Windows

Windows and Mac/Linux mark the end of a line with different invisible characters. The Git for Windows installer's default handles this for you. If teammates see every line of a file marked as changed, run this on Windows:

```bash
git config --global core.autocrlf true
```

## Sign in to GitHub from your computer

GitHub stopped accepting your account password for Git operations years ago. You sign in through the browser instead, with one of these:

| Method | How | Good for |
|---|---|---|
| **GitHub Desktop** | Sign in when the app starts | App users |
| **GitHub CLI** | `gh auth login` | Command line and AI agents |
| **Git Credential Manager** | Pops up a browser window on first push | Windows users |
| **SSH key** | A key file on your computer | Long-term setups |

The Securing Your Account chapter explains SSH keys and personal access tokens.

## Option A: GitHub Desktop (easiest)

Download **GitHub Desktop** from desktop.github.com (Windows 10 64-bit or later, and macOS 12 or later). Sign in with your GitHub account, and it handles authentication for you. Every action in the next chapters has a button in Desktop: **Clone**, **Commit**, **Push origin**, **Fetch**, **Create branch**, **Create pull request**. The GitHub Desktop chapter walks through it.

## Option B: the GitHub CLI (best for AI tools)

The **GitHub CLI**, a program called `gh`, lets you, and AI agents like Claude Code, do GitHub things from the terminal: create repositories, open pull requests, manage issues.

| System | Install command |
|---|---|
| macOS | `brew install gh` |
| Windows | `winget install --id GitHub.cli` (or the installer from cli.github.com) |
| Linux | Follow the apt/dnf instructions linked from cli.github.com |

Then sign in. It also sets up Git to use your GitHub login:

```bash
gh auth login
```

Answer the questions: choose **GitHub.com**, **HTTPS**, **Yes** to authenticate Git, and **Login with a web browser**. Copy the one-time code, paste it into the browser page that opens, and approve. Check it worked with:

```bash
gh auth status
```

The gh CLI Cookbook chapter is full of ready-to-use commands.

## Option C: let an AI agent drive

If you use Claude Code, Copilot, or a similar agent, you can simply ask: "Initialize Git in this folder, make a first commit, and publish it as a private GitHub repository." It will run the same commands you'll learn next. Read what it's about to do before approving, especially anything with `--force` or `reset --hard`.

:::checklist
- `git --version` prints a version
- Name and (noreply) email set with `git config --global`
- Default branch set to `main`
- Signed in with GitHub Desktop or `gh auth login`
:::
