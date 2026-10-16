# Slash Commands: Setup, Models, and Cost

This chapter covers the commands you use to set Claude Code up the way you like it, choose which model does the work, and keep an eye on your usage. Most of them you'll run once or twice and then forget about, which is exactly the point.

:::summary In this chapter
- Project setup and memory: `/init`, `/memory`, `/import`
- Settings and permissions: `/config`, `/status`, `/permissions` and more
- Look and feel: `/theme`, `/color`, `/tui`, `/statusline`, `/output-style`, `/voice`
- Models and cost: `/model`, `/effort`, `/fast`, `/advisor`, `/usage` and the limit commands
:::

## Project setup and memory

### `/init`

Studies your project and writes a starter `CLAUDE.md` file with build commands, test instructions, and conventions it finds.

- **When:** the first time you use Claude Code in a project.
- **Try:** `/init`
- **Watch out:** if a `CLAUDE.md` already exists, it suggests improvements instead of overwriting. Read what it writes and delete anything vague. For a guided version that also offers skills, hooks, and a personal memory file, start Claude Code with the environment variable `CLAUDE_CODE_NEW_INIT=1` set.

### `/memory`

Opens your `CLAUDE.md` files for editing, turns **auto memory** (notes Claude keeps for itself) on or off, and shows what auto memory has saved.

- **When:** Claude keeps forgetting a rule, or you're curious what it remembers about you.
- **Try:** `/memory`, then pick a file to open it in your editor.
- **Watch out:** turning auto memory off here saves the choice to your user settings, so it applies to every project. Chapter 16 covers memory in depth.

### `/import [codex|gemini|cursor] [--dry-run] [--yes]`

Copies your setup from OpenAI Codex, Google Gemini CLI, or Cursor into Claude Code: instruction files, MCP servers, commands, subagents, and skills.

- **When:** you're switching to Claude Code from one of those tools.
- **Try:** `/import cursor --dry-run` to preview what would come across without changing anything.
- **Watch out:** not available on Amazon Bedrock, Google Cloud, or Microsoft Foundry setups. `/init` offers it automatically when it spots Codex or Gemini files.

## Settings and permissions

### `/config [key=value ...]`

Opens the Settings screen for theme, model, editor mode, output style, and other preferences. Alias: `/settings`.

- **When:** you want to change a preference without editing a file.
- **Try:** `/config`, or set things directly: `/config theme=dark`, `/config model=sonnet`. Run `/config --help` to list the keys it accepts.
- **Watch out:** the `key=value` form can turn *off* a setting that needs your confirmation, such as automatic continue at a usage limit, but can't turn it on. In the VS Code panel and the desktop app, change settings through those apps instead.

### `/status`

Opens the Status tab: your Claude Code version, model, account, and connection health.

- **When:** you want to confirm which account or model you're on, or that a settings file loaded.
- **Try:** `/status`
- **Watch out:** it works even while Claude is busy. It also lists warnings, such as an instruction file that's too long.

### `/permissions`

Opens a dialog to view, add, and remove **allow**, **ask**, and **deny** rules, manage working folders, and review recent auto mode denials. Alias: `/allowed-tools`.

- **When:** Claude keeps asking about the same safe command, or you want to block something for good.
- **Try:** `/permissions`, then add `Bash(npm run test *)` to the allow list.
- **Watch out:** changes made while Claude is working apply from its next action. Chapter 14 explains the rule syntax.

### `/fewer-permission-prompts` *(skill)*

Scans your past sessions for harmless, read-only commands you approve often, and adds a prioritized allow list to the project's `.claude/settings.json`.

- **When:** permission prompts are slowing you down.
- **Try:** `/fewer-permission-prompts`
- **Watch out:** it writes to the *shared* project settings file, which your team may commit. Review the list before you keep it.

### `/auto-mode-setup`

Drafts a description of your trusted infrastructure (the repositories, storage buckets, and web domains that are yours) for the **auto mode** safety classifier, then saves it to your user settings after you review it.

- **When:** auto mode blocks actions that are actually fine, such as pushing to your company's repositories.
- **Try:** `/auto-mode-setup`
- **Watch out:** requires a Pro, Max, or Team plan. By default the classifier trusts only your working folder and the current repository's remotes.

### `/update-config [request]` *(skill)*

Describe a settings change in plain English and Claude edits the right `settings.json` file for you.

- **When:** you know what you want but not which file or key it lives in.
- **Try:** `/update-config allow npm test without asking`, or `/update-config show a notification when Claude needs me`
- **Watch out:** for simple preferences like theme or model, `/config` is quicker.

### `/sandbox`

Turns the command **sandbox** on or off. The sandbox is a boundary, enforced by your operating system, around the shell commands Claude runs: it limits which files they can write and which websites they can reach.

- **When:** you want fewer permission prompts with an extra safety net.
- **Try:** `/sandbox`, then choose a mode in the panel.
- **Watch out:** it works on macOS, Linux, and WSL 2, not native Windows. On Linux and WSL 2 it needs the `bubblewrap` and `socat` packages; the panel tells you if they're missing. It covers shell commands only, not Claude's file tools or MCP servers.

## Look and feel

### `/theme`

Changes the color theme: light, dark, an `auto` option that follows your terminal, colorblind-friendly themes, and themes that use your terminal's own colors.

- **When:** the text is hard to read, or you just prefer a different look.
- **Try:** `/theme`. Inside the picker, <kbd>Ctrl</kbd> + <kbd>T</kbd> toggles code coloring.
- **Watch out:** pick **New custom theme…** to build your own.

### `/color [color|default]`

Colors this session's prompt bar: `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, or `cyan`.

- **When:** you have several Claude Code windows open and want to tell them apart.
- **Try:** `/color green`, `/color default` to reset, or just `/color` for a random one.
- **Watch out:** the color is for this session only.

### `/tui [default|fullscreen]`

Switches the screen renderer and relaunches with your conversation intact. `fullscreen` is a smoother, flicker-free mode with mouse support.

- **When:** the screen flickers or jumps while Claude works, especially in VS Code's terminal or tmux.
- **Try:** `/tui fullscreen`; run `/tui` alone to see which one you're using.
- **Watch out:** fullscreen mode is a research preview, and some shortcuts behave slightly differently there.

### `/focus`

In fullscreen mode, toggles a tidy view that shows only your last prompt, a one-line summary of Claude's actions, and the final answer.

- **When:** you want less scrolling detail.
- **Try:** `/focus`
- **Watch out:** only available in fullscreen rendering. The choice is remembered across sessions.

### `/scroll-speed`

Adjusts how fast the mouse wheel scrolls in fullscreen mode.

- **When:** scrolling moves too slowly or too fast.
- **Try:** `/scroll-speed`
- **Watch out:** fullscreen only, and not available in JetBrains' built-in terminal.

### `/statusline`

Sets up the **status line**, a custom bar at the bottom of the screen that can show context usage, cost, the Git branch, or anything else.

- **When:** you want to see context usage at a glance.
- **Try:** `/statusline show the model, the git branch, and context used`, or run it alone to copy your shell prompt's style.
- **Watch out:** the status line runs a small script on your machine; Claude writes it for you.

### `/output-style [style]`

Lists **output styles** or switches to one. A style changes how Claude talks to you: **Default**, **Proactive** (gets on with routine decisions), **Concise** (shorter answers), **Explanatory** (adds short "Insight" notes explaining choices), and **Learning** (explains and leaves small pieces for you to write).

- **When:** you're learning to code and want explanations, or you want shorter replies.
- **Try:** `/output-style explanatory`, or `/output-style` to see the list.
- **Watch out:** requires a recent version of Claude Code; run `claude update` if it's missing.

### `/keybindings`

Opens your keyboard shortcut file, `~/.claude/keybindings.json`, creating it if needed.

- **When:** you want to change or add a shortcut.
- **Try:** `/keybindings`
- **Watch out:** changes apply as soon as you save. Chapter 11 shows the file format.

### `/terminal-setup`

Sets up your terminal so <kbd>Shift</kbd> + <kbd>Enter</kbd> adds a new line, in VS Code, Cursor, Alacritty, Zed, and similar terminals. In Apple Terminal it enables <kbd>Option</kbd> + <kbd>Enter</kbd> instead; in iTerm2 it turns on clipboard access so `/copy` works.

- **When:** <kbd>Shift</kbd> + <kbd>Enter</kbd> sends your message instead of adding a line.
- **Try:** `/terminal-setup`
- **Watch out:** until then, `\` followed by <kbd>Enter</kbd> or <kbd>Ctrl</kbd> + <kbd>J</kbd> adds a new line in any terminal.

### `/voice [hold|tap|off]`

Turns on voice dictation so you can speak your prompts.

- **When:** you'd rather talk than type.
- **Try:** `/voice hold`, then hold <kbd>Space</kbd> to record; or `/voice tap` to tap once to start and again to stop.
- **Watch out:** requires a Claude.ai account login.

### `/ide` and `/chrome`

`/ide` shows and manages the connection to your code editor (VS Code, JetBrains, and others). `/chrome` configures **Claude in Chrome**, which lets Claude use your Chrome browser to test pages.

- **When:** diffs aren't opening in your editor, or you want Claude to click through your website.
- **Try:** `/ide`, `/chrome`
- **Watch out:** Chrome control needs the Claude in Chrome extension; start with `claude --chrome` to enable it for a session.

## Models and effort

### `/model [model]`

Switches the AI model and saves it as your default for new sessions.

- **When:** you want the most capable model for a hard problem, or a faster, lighter one for routine work.
- **Try:** `/model opus`, `/model sonnet`, `/model haiku`, or `/model` to open the picker. In the picker, the left and right arrows adjust effort, and <kbd>s</kbd> switches for this session only.
- **Watch out:** switching mid-conversation can ask you to confirm, because the new model can't reuse the cached conversation. `/model opusplan` uses Opus while planning and Sonnet while building. Chapter 18 compares the models.

### `/effort [level|auto|status]`

Sets how much Claude thinks before acting: `low`, `medium`, `high`, `xhigh`, or `max`.

- **When:** routine edits (lower) or tricky bugs (higher).
- **Try:** `/effort high`, `/effort status` to see the current level, `/effort auto` to go back to the default, or `/effort` alone for a slider.
- **Watch out:** higher effort uses more of your plan. `max` lasts for this session only. On Opus 5.5, Sonnet 5.5, and Haiku 5.5 the default is `medium`.

### `/fast [on|off]`

Turns on **fast mode**, which makes Claude Opus respond up to about 2.5 times faster at a higher cost per token.

- **When:** live debugging or rapid back-and-forth where waiting hurts.
- **Try:** `/fast on`, then `/fast off` when you're done.
- **Watch out:** it's a research preview, works only on recent Opus models (not Sonnet or Haiku), and costs more. Turn it off when speed doesn't matter.

### `/advisor [model|off]`

Turns on the **advisor**, a second, usually stronger model that Claude consults at key moments, such as before committing to an approach.

- **When:** you run a lighter model day to day but want a stronger second opinion on hard decisions.
- **Try:** `/advisor opus`, or `/advisor off`
- **Watch out:** experimental, and only on the Anthropic API (not Bedrock, Google Cloud, or Foundry). Advisor calls use usage too.

## Usage, limits, and plans

### `/usage`

Shows how much of your plan's limits you've used, activity stats, and, on paid plans, a breakdown of what used the most. Aliases: `/cost`, and `/stats` (opens on the Stats tab).

- **When:** you want to know how close you are to a limit.
- **Try:** `/usage`
- **Watch out:** the dollar figure at the top is meant for pay-per-use Console accounts. On a subscription, watch the usage bars instead.

### `/rate-limit-options`

When a usage limit stops a request, shows your options: wait and continue automatically when the limit resets, add usage credits, or upgrade.

- **When:** Claude has stopped because you hit a limit.
- **Try:** `/rate-limit-options`
- **Watch out:** requires a claude.ai subscription. By default Claude Code waits and continues by itself once the limit resets, as long as you leave the session open.

### `/usage-credits`

Opens your billing settings to add **usage credits** (paid extra usage beyond your plan). On Team and Enterprise without billing access, it sends a request to your admin instead.

- **When:** you hit a limit in the middle of something urgent.
- **Try:** `/usage-credits`
- **Watch out:** credits cost real money; set a spending cap in your billing settings.

### `/upgrade`

Opens the upgrade page in your browser to move to a higher plan.

- **When:** you regularly run out of usage on Pro.
- **Try:** `/upgrade`
- **Watch out:** not shown on Enterprise plans.

### `/insights`

Creates a web-page report about your recent sessions on this computer: which projects you work in, how you use Claude Code, where things go wrong, and features to try.

- **When:** after a few weeks of use, to learn better habits.
- **Try:** `/insights`
- **Watch out:** generating the report uses some usage, and it isn't available in cloud sessions.

:::checklist
- I've run `/init` in a project and reviewed the `CLAUDE.md` it wrote
- I can open `/config` and `/permissions`
- I've tried `/model` and `/effort` and know what they change
- I check `/usage` when I'm worried about limits
:::
