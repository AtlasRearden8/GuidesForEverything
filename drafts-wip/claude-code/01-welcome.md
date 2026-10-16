# Welcome to Claude Code

Claude Code is an **AI coding agent**. That means it can do more than answer questions: it can open the files in your project, change them, run programs, check its own work, and keep going until a task is done. You stay in charge the whole time.

:::summary In this chapter
- What Claude Code is and what it's good for
- How the "agentic loop" works, and the tools Claude uses
- The different places you can use it
- What you need before you start, and how to use this manual
:::

## What is an "agent"?

You have probably used a **chatbot** such as the Claude app or ChatGPT. You type a question and it types back an answer. If it suggests code, *you* copy it, paste it into a file, and run it.

An **agent** closes that loop. When you ask Claude Code to "add a contact form to my website," it will:

1. Look through your project to understand how it's built.
2. Decide which files need to change.
3. Edit those files (asking your permission first, unless you've told it not to).
4. Run commands, for example starting your website, to check that the change works.
5. Tell you what it did, in plain language.

This cycle of *look → plan → act → check* is called the **agentic loop**. It's what makes Claude Code feel less like a search engine and more like a teammate.

## How the loop works under the hood

Anthropic describes the loop in three phases that blend together: **gather context**, **take action**, and **verify results**. A question about your code might only need the first phase. A bug fix cycles through all three, again and again, until the bug is gone.

Two things power the loop:

- **A model.** This is the AI "brain" that reads, reasons, and decides what to do next. Claude Code uses Anthropic's Claude models: Opus, Sonnet, Haiku, and (on some plans) Fable. Chapter 18 explains how to pick one.
- **Tools.** A **tool** is an action Claude can take, such as "read this file" or "run this command." Without tools, Claude could only reply with text. With tools, it can act.

Claude Code itself is the layer around the model that provides the tools and decides what the model sees. People call this layer the **harness**.

| Tool category | What Claude can do with it |
|---|---|
| **File operations** | Read files, edit code, create new files, rename and reorganize |
| **Search** | Find files by name, search inside files, explore a project |
| **Execution** | Run shell commands, start servers, run tests, use Git |
| **Web** | Search the web, fetch documentation, look up error messages |
| **Code intelligence** | See type errors after edits, jump to definitions (needs a plugin) |

When you say "fix the failing tests," Claude might run the tests, read the error, search for the right file, read it, edit it, and run the tests again. Each step gives it new information for the next one.

> [!NOTE]
> You're part of the loop too. You can press <kbd>Esc</kbd> at any moment to stop Claude and point it in a new direction. It keeps everything it has learned so far.

## What can you do with it?

You don't need to be a programmer to get value from Claude Code. People use it to:

- **Build things from a description.** "Make me a one-page website for my bakery with our hours and a menu."
- **Understand unfamiliar code.** "Explain what this project does, as if I'm new to coding."
- **Fix problems.** "When I run the app I get this error. Find out why and fix it."
- **Automate chores.** "Rename all these photos by the date they were taken."
- **Work with Git and GitHub.** "Commit my changes with a clear message and open a pull request."
- **Write documents and data files**, not just code: reports, spreadsheets, scripts, and more.

> [!TIP]
> You can ask Claude Code about itself. Questions like "what can Claude Code do?" or "how do I add an MCP server?" work, because it has its own documentation built in.

## Where Claude Code runs

Claude Code is one product with several "front doors." They share the same brain and the same settings, so what you learn in this manual works everywhere.

| Surface | What it looks like | Best for |
|---|---|---|
| **Terminal (CLI)** | A text window where you type | The full feature set; the focus of this manual |
| **Desktop app** | The Claude app's **Code** tab | People who prefer buttons and windows over typing commands |
| **VS Code / Cursor extension** | A chat panel inside your code editor | Seeing edits side-by-side with your files |
| **JetBrains plugin** | Runs inside IntelliJ, PyCharm, etc. | Developers already using those editors |
| **Web** | [claude.ai/code](https://claude.ai/code) | Running tasks in the cloud, even from a phone |
| **Slack, GitHub Actions** | Mention Claude in a chat or pull request | Teams and automation |

**CLI** stands for *command-line interface*: a program you control by typing text commands instead of clicking.

## What you need

:::checklist
- A computer running **macOS 13+**, **Windows 10 (1809+)**, or a recent **Linux** (Ubuntu 20.04+, Debian 10+), with at least 4 GB of RAM
- An internet connection
- A **paid Claude account**: Pro, Max, Team, or Enterprise, *or* an Anthropic Console account that pays per use
- A folder to work in (it can be empty, so you don't need an existing project)
:::

> [!NOTE]
> The free Claude plan does **not** include Claude Code. The cheapest way in is the Pro plan. See the pricing table in Chapter 3.

## How to use this manual

The chapters are grouped so you can read straight through or jump to what you need:

| Part | Chapters | What you'll learn |
|---|---|---|
| **Getting started** | 1–5 | Terminal basics, installing, your first session, good prompts |
| **Context and commands** | 6–11 | How memory fills up, every slash command, custom commands, shortcuts |
| **Staying in control** | 12–17 | Plan mode, checkpoints, permissions, settings, CLAUDE.md, sessions |
| **Going further** | 18–25 | Models, subagents, hooks, MCP, plugins, scripts, GitHub, other apps |
| **Everyday practice** | 26–29 | Costs, project recipes, security and privacy, troubleshooting |
| **Reference** | Back pages | Slash command cheatsheet, quick reference, glossary |

Words in **bold** are explained the first time they appear and again in the Glossary at the back. Text in `code style` is something you type exactly. Keys look like <kbd>Esc</kbd>.

> [!TIP]
> Don't try to memorize anything. Type `/` inside Claude Code at any time to see a searchable menu of every command, and press <kbd>?</kbd> on an empty prompt to see the keyboard shortcuts.
