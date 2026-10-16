# Beyond the Terminal: IDE, Desktop, Web, and Mobile

Everything you've learned carries over to Claude Code's other surfaces. They share your settings, skills, and `CLAUDE.md` files on the same computer.

:::summary In this chapter
- The VS Code extension and JetBrains plugin
- The desktop app's Code tab
- Cloud sessions on the web and phone
- Remote Control, and Claude in Chrome
:::

## VS Code and Cursor

In VS Code or Cursor, open the Extensions view (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd>), search for **Claude Code**, and click **Install**. A Claude panel appears in the sidebar. You can review proposed changes as inline diffs and @-mention the lines you've selected.

You need VS Code 1.94 or later. The extension includes its own copy of Claude Code for the panel; to run `claude` in VS Code's terminal too, install the CLI as in Chapter 3.

| Action | Mac | Windows / Linux |
|---|---|---|
| Switch focus between editor and Claude | <kbd>Cmd</kbd> + <kbd>Esc</kbd> | <kbd>Ctrl</kbd> + <kbd>Esc</kbd> |
| Open a new conversation tab | <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>Esc</kbd> | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Esc</kbd> |
| Insert an @-mention of the selection | <kbd>Option</kbd> + <kbd>K</kbd> | <kbd>Alt</kbd> + <kbd>K</kbd> |
| Reopen a closed Claude tab | <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>T</kbd> | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>T</kbd> |

- Open the panel with the Spark icon in the editor toolbar, or **✻ Claude Code** in the status bar.
- Claude automatically sees the text you've selected.
- In Manual mode, each edit opens a side-by-side diff with **Accept** and **Reject** buttons.
- Run **Claude Code: Open Walkthrough** from the Command Palette for a guided tour.

## JetBrains IDEs

The plugin works with IntelliJ IDEA, PyCharm, Android Studio, WebStorm, PhpStorm, GoLand, and others. Install the CLI first (Chapter 3), then install **Claude Code** from the JetBrains Marketplace and restart the IDE. Press <kbd>Cmd</kbd> + <kbd>Esc</kbd> (Mac) or <kbd>Ctrl</kbd> + <kbd>Esc</kbd> to open it; diffs open in the IDE's diff viewer, and your current selection is shared with Claude.

## The desktop app

Download the Claude app from claude.com/download, sign in, and open the **Code** tab. You get the same Claude Code with a graphical interface: a folder picker, a visual **diff** (a side-by-side view of what changed), a permission-mode selector next to the send button, and the ability to run several sessions in parallel.

- The app has three tabs: **Chat** (no file access), **Cowork** (a background agent for general tasks), and **Code**.
- Choose **Local** to work on your own files, or **Cloud** to run in the cloud.
- You don't need the CLI installed; the app includes Claude Code. Builds exist for macOS, Windows (x64 and ARM64), and Linux (beta).
- From the terminal, `/desktop` moves your current session into the app.

## Claude Code on the web and phone

At [claude.ai/code](https://claude.ai/code), or in the **Code** tab of the Claude mobile app, you can start a **cloud session**: Claude works on a copy of your GitHub repository on Anthropic's computers, so it keeps going even when your laptop is closed. When it's done, it pushes a branch you can review. Cloud sessions are available on Pro, Max, Team, and eligible Enterprise seats, and need your GitHub account connected.

From the terminal, `claude --cloud "fix the login bug"` hands a task to the cloud, and `claude --teleport` pulls a cloud session back to your computer.

| | Cloud session | Local session | Local + Remote Control |
|---|---|---|---|
| Code runs on | Anthropic's cloud | Your computer | Your computer |
| Uses your local setup | No, repository only | Yes | Yes |
| Needs GitHub | Yes | No | No |
| Keeps going if you disconnect | Yes | No | While your computer stays on |

## Remote Control

**Remote Control** lets you continue a session that's running on your computer from your phone or any browser. Run `/remote-control` (or start with `claude --remote-control`), then open the session at claude.ai/code or in the mobile app. Your files and tools stay on your machine, which must stay on. It needs a claude.ai subscription; on Team and Enterprise an Owner must switch it on first.

## The mobile app

There's no separate Claude Code app: use the **Code** tab in the Claude app for iOS or Android. Run `/mobile` to show a QR code that opens the right app store. From your phone you can start cloud sessions, drive Remote Control sessions, and get notified when Claude needs you.

## Claude in Chrome

Start with `claude --chrome` (or configure it with `/chrome`) and Claude can use your Chrome browser through the Claude in Chrome extension: open your site, click through it, fill forms, and read the browser console to debug.

:::checklist
- I've tried Claude Code in at least one editor or the desktop app
- I know cloud sessions keep working when my laptop is closed
- I know `/remote-control` lets me continue from my phone
:::

# Costs and Limits

Claude Code use is included in paid subscriptions up to a limit, or billed per token on a Console account. A few habits make your usage go much further.

:::summary In this chapter
- How usage is measured
- Checking usage with `/usage`
- What happens when you hit a limit
- Fifteen ways to save usage
:::

## How usage works

On a **subscription** (Pro, Max, Team), Claude Code use is included up to your plan's limits, which reset over time. On a **Console** account you pay per **token** (a token is a chunk of text, roughly ¾ of a word). Longer conversations and bigger files use more tokens.

Type `/usage` to see your current usage, your limits, and a breakdown of what's using the most.

### Why usage climbs in a long session

- **Every turn resends the conversation.** A long, cluttered context costs more on every message.
- **Breaks cost more.** On a subscription, the conversation cache lasts about an hour. Come back later and your next message reprocesses everything.
- **Helpers add up.** Subagents, workflows, `/loop`, and `/goal` all send their own requests.
- **Compacting a huge conversation is itself a big request.** `/clear` costs nothing.

## When you hit a limit

By default, Claude Code waits in the open session and continues the task by itself when your limit resets. The bottom of the screen shows when. Press <kbd>Esc</kbd> to cancel the wait. You can also:

- run `/rate-limit-options` to choose between waiting, adding usage credits, and upgrading;
- run `/usage-credits` to add paid extra usage;
- run `/upgrade` to move to a bigger plan.

Turn automatic continue off in `/config` (**Continue automatically at usage limit**).

## Make your usage go further

- **`/clear` between unrelated tasks.** Old conversation history is re-read with every message.
- **`/compact` during long tasks** to shrink the history.
- **Use a lighter model for simple jobs:** `/model haiku` or `/model sonnet` for routine work, and save the most powerful model for hard problems.
- **Be specific.** A precise request avoids wasted exploration.
- **Keep CLAUDE.md lean.** It's loaded into every session.

More ways, from Anthropic's guidance:

1. **Use plan mode for big changes** so Claude doesn't build the wrong thing and redo it.
2. **Stop early.** Press <kbd>Esc</kbd> as soon as Claude heads the wrong way, then `/rewind`.
3. **Lower the effort** for routine work: `/effort low` or `medium`.
4. **Move procedures from CLAUDE.md into skills**, which load only when used.
5. **Disable MCP servers you aren't using** with `/mcp`. Command-line tools like `gh` are cheaper than MCP servers.
6. **Send big reads to a subagent**, ideally on a smaller model, so only a summary comes back.
7. **Give Claude a check to run** (tests, a build) so it gets it right without rounds of fixes.
8. **Use `/btw` for quick questions** that don't need to stay in the conversation.
9. **Avoid leaving `/loop` running** when you don't need it.
10. **Install a code-intelligence plugin** for typed languages, so Claude jumps to definitions instead of reading many files.

> [!TIP]
> If you hit a limit mid-task, `/rate-limit-options` shows your choices: wait for the reset, add usage credits, or upgrade.

:::checklist
- I check `/usage` once in a while
- I `/clear` between tasks and choose lighter models for simple jobs
- I know Claude Code can wait and continue after a limit resets
:::
