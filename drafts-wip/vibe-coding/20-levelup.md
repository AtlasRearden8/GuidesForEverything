# Leveling Up: Editors and Agents

Browser builders take you far. When you need more control, the same project can move to an AI editor or agent on your computer without starting over.

:::summary In this chapter
- Signs you've outgrown a browser builder
- Moving a project to your computer through GitHub
- Working in Cursor, and with agents like Claude Code
- Working through pull requests
:::

## Signs you've outgrown a browser builder

- Each change breaks something else, and fixes cost more and more credits.
- You need a feature the builder can't do (a custom server task, an unusual library).
- You want to understand and own your code.
- You're spending more on credits than a flat-rate agent plan would cost.

## Moving your project

:::steps Open your builder project on your own computer
1. **Make sure it's on GitHub.** Use the builder's GitHub sync.
2. **Install an editor or agent.** Cursor, VS Code with Copilot, or Claude Code (see the *Claude Code* and *GitHub* manuals in this series).
3. **Clone the repository** to your computer: `git clone <url>`, or **Clone repository** in your editor's welcome screen.
4. **Ask the AI to get it running.**
   ```prompt
   This project was built in Lovable. Install what it needs and start
   it locally, then explain how to run it myself next time.
   ```
5. **Keep both in sync.** Push changes to GitHub; most builders pull them back automatically.
:::

> [!NOTE]
> Running locally usually needs **Node.js** installed, plus a `.env` file with your project's public settings. The `.env` file isn't in GitHub (it's ignored on purpose), so ask the AI which values it needs and where to find them.

## Working in Cursor

Cursor looks like VS Code, with an AI panel on the side.

| Feature | What it does |
|---|---|
| **Tab** | Predicts your next edit as you type; press <kbd>Tab</kbd> to accept |
| **Inline edit** (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd>) | Select code and describe a change |
| **Agent / chat** (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>L</kbd> or <kbd>I</kbd>) | Ask questions or have the agent make multi-file changes |
| **Rules** | Project instructions in `.cursor/rules/` or `AGENTS.md` |
| **Cloud agents** | Hand off a task to run in the cloud while you keep working |

## Agents: the most hands-off option

Coding agents like Claude Code and Codex can take a whole task, such as "add email reminders," and work through it: read the code, plan, edit files, run the app, fix errors, and commit. They usually ask permission before running commands or editing files; read what they want to do before approving.

```prompt
Read this project and AGENTS.md. Then add weekly email reminders as
described in docs/reminders-spec.md. Plan first and wait for my OK.
Work on a new branch, run the app to test, and commit as you go.
```

## Working through pull requests

Pair agents with GitHub so every change arrives as a reviewable **pull request**. You read the summary, look at the list of changed files, try the preview deployment many hosts create for each pull request, and merge only when happy.

> [!TIP]
> A powerful combo: **plan in chat, build with an agent, review the pull request on GitHub.** You stay in charge of *what* gets built while the AI handles *how*.

:::checklist
- My project runs on my own computer
- I know which `.env` values it needs
- I've had an agent make one change on a branch
- I've reviewed and merged a pull request
:::

