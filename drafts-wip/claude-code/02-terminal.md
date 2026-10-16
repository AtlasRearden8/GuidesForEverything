# Terminal Basics in Ten Minutes

The terminal looks intimidating, but you only need a handful of ideas to use Claude Code comfortably. Think of it as a very literal text message conversation with your computer.

:::summary In this chapter
- How to open a terminal on Mac, Windows, and Linux
- Folders, paths, and the "current directory"
- The commands you'll actually use
- Copying, pasting, stopping programs, and a two-minute introduction to Git
:::

## Opening a terminal

:::steps Open your terminal
1. **On a Mac.** Press <kbd>Cmd</kbd> + <kbd>Space</kbd>, type `Terminal`, and press <kbd>Enter</kbd>.
2. **On Windows.** Press the <kbd>Windows</kbd> key, type `PowerShell`, and open **Windows PowerShell** (or **Terminal**, which opens PowerShell by default).
3. **On Linux.** Press <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd> on most systems, or search your apps for "Terminal."
:::

You'll see a line ending in something like `%`, `$`, or `>`. That's the **prompt**: the terminal waiting for you to type. When this manual shows a command, type it after the prompt and press <kbd>Enter</kbd>.

> [!TIP]
> On Windows, the prompt starts with `PS C:\` when you're in **PowerShell** and just `C:\` when you're in the older **Command Prompt (CMD)**. Claude Code works in both, but the install commands differ.

### What a "shell" is

The program running inside the terminal window is called a **shell**. It reads what you type and runs it. Common shells are **Zsh** (the Mac default), **Bash** (common on Linux), and **PowerShell** or **CMD** on Windows. They mostly agree on the basics in this chapter; where they differ, this manual says so.

## Folders and paths

Everything on your computer lives in **folders** (also called **directories**). A **path** is the address of a folder or file, like `/Users/sam/projects/bakery` on a Mac or `C:\Users\Sam\projects\bakery` on Windows.

The terminal is always "standing in" one folder, called the **current directory** or **working directory**. Claude Code works on the files in whatever folder you start it from. That's how it knows which project you mean.

The `~` symbol is shorthand for your **home folder** (for example `/Users/sam`). A single dot `.` means "this folder," and two dots `..` mean "the folder above this one."

## The five commands you need

| Command | What it does | Example |
|---|---|---|
| `pwd` | Show which folder you're in ("print working directory") | `pwd` |
| `ls` | List the files here (`dir` in CMD) | `ls` |
| `cd` | Change into a folder | `cd projects/bakery` |
| `cd ..` | Go up one folder | `cd ..` |
| `mkdir` | Make a new folder | `mkdir bakery` |

Here's how to make a practice folder and step inside it:

```bash
cd ~
mkdir my-first-project
cd my-first-project
pwd
```

> [!TIP]
> Press <kbd>Tab</kbd> while typing a folder name and the terminal finishes it for you. Press the <kbd>↑</kbd> arrow to bring back the last command you typed.

### A few more that come in handy

| Command | What it does | Windows PowerShell |
|---|---|---|
| `cat notes.txt` | Print a file's contents | `cat notes.txt` works too |
| `open .` | Open this folder in Finder (Mac) | `explorer .` |
| `xdg-open .` | Open this folder in your file manager (Linux) | — |
| `clear` | Wipe the screen (not your files) | `cls` or `clear` |
| `code .` | Open this folder in VS Code, if installed | `code .` |

You rarely need these, because Claude Code can run commands for you. Knowing them just helps you follow along.

## Copying and pasting in a terminal

- **Mac:** <kbd>Cmd</kbd> + <kbd>C</kbd> and <kbd>Cmd</kbd> + <kbd>V</kbd>, as usual.
- **Windows Terminal / PowerShell:** <kbd>Ctrl</kbd> + <kbd>V</kbd> pastes; right-click also pastes.
- **Linux:** usually <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>V</kbd>.

In a terminal, <kbd>Ctrl</kbd> + <kbd>C</kbd> usually means **stop the running program**, not copy.

## Stopping and exiting

- <kbd>Ctrl</kbd> + <kbd>C</kbd> stops whatever is running in the terminal.
- `exit` closes the shell (and usually the window).
- Inside Claude Code, <kbd>Esc</kbd> stops Claude's current task, and `/exit` quits Claude Code itself. You'll meet both again in Chapter 4.

## Environment variables in one minute

An **environment variable** is a named setting that programs can read, like a sticky note attached to your terminal session. For example, `ANTHROPIC_API_KEY` holds an API key. You'll see a few of these later.

| Shell | Set one for this session | Read it back |
|---|---|---|
| Mac/Linux (Zsh, Bash) | `export NAME=value` | `echo $NAME` |
| Windows PowerShell | `$env:NAME = "value"` | `echo $env:NAME` |

A variable you set this way disappears when you close the window. That's usually what you want while experimenting.

## Git in two minutes

**Git** is a tool that records snapshots of your files, called **commits**, so you can see what changed and go back in time. Claude Code works best in a folder that uses Git, because every change becomes easy to review and undo. A folder tracked by Git is called a **repository** (or **repo**).

You don't need to learn Git commands to start: you can ask Claude to run them. Here's what the common requests mean:

| You say to Claude | What happens |
|---|---|
| "Turn this folder into a Git repo" | Runs `git init` to start tracking files |
| "Commit everything with a clear message" | Saves a snapshot with a description |
| "Show me what changed since the last commit" | Runs `git diff` and explains it |
| "Undo my last uncommitted changes to index.html" | Restores the file from the last commit |
| "Make a new branch called new-menu" | Creates a separate line of work |

> [!NOTE]
> GitHub is a website for storing Git repositories online and collaborating. The *GitHub* manual in this series covers it from scratch.

:::checklist
- I can open a terminal and see the prompt
- I can use `cd`, `ls`, and `pwd` to move around
- I know <kbd>Ctrl</kbd> + <kbd>C</kbd> stops a program in the terminal
- I have a practice folder called `my-first-project`
:::
