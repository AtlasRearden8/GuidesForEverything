# Slash Commands: The Basics and Your Session

A **slash command** is a short instruction to Claude Code itself, typed at the start of the prompt with a `/`, such as `/clear` or `/compact`. Commands control the session: they switch models, manage memory, review changes, and much more. This chapter and the next two cover **every** built-in command, grouped by what you use it for.

:::summary In this chapter
- How slash commands work: arguments, aliases, the menu, and queueing
- Commands for your session and context: `/clear`, `/compact`, `/context`, `/rewind`, `/resume` and friends
- Commands that shape how Claude works: `/plan`, `/goal`, `/loop`, `/cd`, `/add-dir`
- Commands for background and parallel work
:::

## How slash commands work

Type `/` on an empty prompt and a menu appears. Keep typing to filter it: `/com` narrows the list to `/compact`, `/config`, `/context`, and so on. Press <kbd>Enter</kbd> to run the highlighted command, or <kbd>Tab</kbd> to fill it in and keep typing.

:::steps Run your first commands
1. **Open the menu.** Type `/` and look through the list.
2. **Run a command with no arguments.** Type `/help` and press <kbd>Enter</kbd>.
3. **Run a command with arguments.** Type `/rename practice-session` and press <kbd>Enter</kbd>. The name appears on the prompt bar.
4. **Try an alias.** Type `/new`. The menu highlights `/clear`, because `/new` is another name for it.
:::

### The rules in brief

- **A command only counts at the start of your message.** Whatever follows the name becomes its **arguments** (extra information), as in `/compact focus on the login bug`.
- **Notation in this manual:** `<arg>` means required, `[arg]` means optional. So `/add-dir <path>` needs a folder, while `/clear [name]` works with or without one.
- **Aliases** are alternative names. `/reset` and `/new` both run `/clear`; `/quit` runs `/exit`.
- **Sending a command while Claude is busy** queues it until the current turn ends. A few, such as `/status`, `/tasks`, and `/usage`, run immediately.
- **Typos don't run anything risky.** If you mistype, nothing is highlighted, and pressing <kbd>Enter</kbd> just reports `Unknown command`.
- **Not every command appears for everyone.** Some depend on your operating system, plan, or settings. A few, such as `/heapdump`, are hidden from the menu on purpose and run only when you type the full name.
- **Mid-sentence completion.** Typing `/` after a space, as in `run the tests, then /com`, offers to complete a command name, but only a command at the very start of a message actually runs.

### Three kinds of command

| Kind | How it works | Examples |
|---|---|---|
| **Built-in command** | Fixed behavior coded into Claude Code | `/clear`, `/model`, `/config` |
| **Bundled skill** | A ready-made set of instructions Claude follows using its tools | `/doctor`, `/code-review`, `/loop`, `/batch` |
| **Your own commands** | Skills and commands you or your plugins add (Chapter 10) | `/fix-issue 123` |

You use all three the same way. This manual marks bundled skills with *(skill)*. MCP servers can add commands too; Chapter 10 shows how.

> [!TIP]
> Each command entry below has the same parts: what it does, **When** a beginner would use it, **Try** for an example you can type, and **Watch out** for gotchas.

## Session and context commands

### `/clear [name]`

Starts a new conversation with an empty context. Your `CLAUDE.md` files and auto memory still load. Aliases: `/reset`, `/new`.

- **When:** you finish one task and start an unrelated one, or Claude seems confused after several corrections.
- **Try:** `/clear`, or `/clear menu-redesign` to label the old conversation so you can find it in `/resume`.
- **Watch out:** the old chat isn't deleted. Get it back with `/resume`, or from the top of the `/rewind` menu in the same window. Clearing costs no usage.

### `/compact [instructions]`

Summarizes the conversation so far and replaces it with the summary, freeing space while you stay on the same task.

- **When:** a long task is still going and `/context` shows the window filling up.
- **Try:** `/compact focus on the checkout bug and the files we changed`
- **Watch out:** compacting uses some usage, because Claude reads everything to summarize it. Details you only typed in chat can be lost; put lasting rules in `CLAUDE.md`.

### `/context [all]`

Shows how full the context window is as a colored grid, with suggestions for what to trim.

- **When:** sessions feel slow, or you want to know what's eating space.
- **Try:** `/context`, or `/context all` for the full item-by-item breakdown.
- **Watch out:** if the conversation is already over the limit, the output says by how much and which command frees space.

### `/autocompact [auto|<tokens>]`

Sets how full the context window gets before Claude Code compacts automatically.

- **When:** you want smaller, cheaper turns and don't mind compacting more often.
- **Try:** `/autocompact 500k`, or `/autocompact auto` to go back to the default for your model.
- **Watch out:** the value is saved to your user settings and applies to future sessions too. To change it for one session only, start with `claude --autocompact 500k`.

### `/rewind`

Opens the rewind menu to restore code, conversation, or both to an earlier point, or to summarize part of the conversation. Same as pressing <kbd>Esc</kbd> twice on an empty prompt. Aliases: `/checkpoint`, `/undo`.

- **When:** Claude went down the wrong path, or you want to compress a long detour.
- **Try:** `/rewind`, pick the message before things went wrong, then **Restore code and conversation**.
- **Watch out:** changes made by shell commands (such as `rm` or `mv`) and edits you made outside Claude Code aren't tracked. Chapter 13 has the full story.

### `/resume [session]`

Reopens an earlier conversation, by name or ID, or from a picker. Alias: `/continue`.

- **When:** you closed Claude Code yesterday and want to carry on.
- **Try:** `/resume`, or `/resume bakery-site` to jump straight to a named session.
- **Watch out:** local transcripts are kept for 30 days by default. From the terminal, `claude -c` continues the latest session in this folder and `claude -r` opens the picker.

### `/rename [name]`

Gives the current session a name, shown on the prompt bar and in `/resume`.

- **When:** you'll want to find this conversation again later.
- **Try:** `/rename checkout-bug`. Without a name, Claude Code makes one up from the conversation.
- **Watch out:** names are capped at 200 characters. You can also name a session at launch with `claude -n checkout-bug`.

### `/branch [name]`

Splits the conversation at this point so you can try a different direction. You move into the new branch; the original stays safe in `/resume`.

- **When:** you want to try a risky idea without losing the conversation as it stands.
- **Try:** `/branch try-database-version`
- **Watch out:** this branches the *conversation*, not your Git repository. Your files are shared, so commit or use a Git branch if you need separate code.

### `/recap`

Writes a one-line summary of the session so far.

- **When:** you've lost track, or you're handing the session to someone else.
- **Try:** `/recap`
- **Watch out:** Claude Code also shows a recap on its own when you return after a few minutes away. Turn that off in `/config` under **Session recap**.

### `/btw [question]`

Asks a side question about the current session without adding it to the conversation history.

- **When:** you want to check a detail without derailing the task, even while Claude is still working.
- **Try:** `/btw what was the name of that config file again?`
- **Watch out:** side questions have no tools, so Claude answers only from what's already in the session. In the answer overlay, press <kbd>c</kbd> to copy it or <kbd>f</kbd> to hand the question to a subagent that *can* use tools. Run `/btw` alone to reopen your last answer.

### `/export [filename]`

Saves the conversation as plain text.

- **When:** you want a record of a session, or to share it with a colleague.
- **Try:** `/export checkout-bug.txt`, or just `/export` to choose between the clipboard and a file.
- **Watch out:** the file contains everything in the chat, including any secrets you pasted. Check before sharing.

### `/copy [N]`

Copies Claude's last response to your clipboard. `/copy 2` copies the one before that.

- **When:** you want to paste Claude's answer into an email or document.
- **Try:** `/copy`. If the response has code blocks, a picker lets you copy just one.
- **Watch out:** over SSH the clipboard may not reach your computer; press <kbd>w</kbd> in the picker to write to a file instead. In iTerm2, run `/terminal-setup` once so copying works.

### `/exit`

Quits Claude Code. Alias: `/quit`. Pressing <kbd>Ctrl</kbd> + <kbd>D</kbd> twice does the same.

- **When:** you're done for now. Your conversation is saved for `/resume`.
- **Try:** `/exit`
- **Watch out:** in an attached background session, `/exit` *detaches* and the session keeps running. Use `/stop` to actually stop it.

## Commands that shape how Claude works

### `/plan [description]`

Switches to plan mode, where Claude researches and proposes a plan but doesn't edit files until you approve.

- **When:** any change that touches several files, or code you don't know well.
- **Try:** `/plan add a gift-card option to checkout`
- **Watch out:** plan mode adds a step. For one-line fixes, just ask. Chapter 12 covers plan mode in depth.

### `/goal [condition|clear]`

Sets a finish line. Claude keeps working turn after turn, and after each turn a separate model checks whether the condition is met.

- **When:** a job with a clear, checkable end, like "all tests pass."
- **Try:** `/goal all tests in tests/cart pass and the linter is clean`. Run `/goal` alone to see the current goal, and `/goal clear` to cancel it.
- **Watch out:** a goal doesn't change your permission mode, so in Manual mode Claude still stops to ask permission. Only one goal can be active per session, and every extra turn uses more of your plan.

### `/loop [interval] [prompt]` *(skill)*

Runs a prompt again and again while the session stays open. Alias: `/proactive`.

- **When:** checking on something slow, like a deploy or a CI run.
- **Try:** `/loop 5m check if the deploy finished and tell me what happened`, or `/loop check whether CI passed` to let Claude choose the interval.
- **Watch out:** loops stop when you close Claude Code, and recurring ones expire after seven days. Each run sends your whole conversation, so it uses usage even while you're away. Press <kbd>Esc</kbd> to stop a self-paced loop.

### `/cd <path>`

Moves the session to a different folder while keeping the conversation.

- **When:** you started Claude Code in the wrong folder.
- **Try:** `/cd ~/projects/bakery-site`. Type part of a path and press <kbd>Tab</kbd> to complete it.
- **Watch out:** the new folder's project settings start applying. To keep the current folder *and* reach another one, use `/add-dir`.

### `/add-dir <path>`

Lets Claude read and edit files in an extra folder for this session.

- **When:** your work spans two folders, such as a website and a shared images folder.
- **Try:** `/add-dir ../shared-assets`
- **Watch out:** this grants file access, not configuration: most of the other folder's `.claude/` settings aren't loaded, although its skills are. Network drives such as `\\server\share` usually can't be added.

## Background and parallel work

These commands let Claude work on several things at once. They're handy once you're comfortable; skip them on day one. Chapter 17 explains background sessions and worktrees.

### `/tasks`

Lists the background work in this session: long-running commands and subagents, including ones that finished. Alias: `/bashes`.

- **When:** you pressed <kbd>Ctrl</kbd> + <kbd>B</kbd> to background a server and want to check on it.
- **Try:** `/tasks`
- **Watch out:** this is different from Claude's to-do checklist, which you toggle with <kbd>Ctrl</kbd> + <kbd>T</kbd>.

### `/background [prompt]`

Detaches the whole session so it keeps running as a **background agent** and frees your terminal. Alias: `/bg`.

- **When:** a long task can finish without you watching.
- **Try:** `/background finish the refactor and run the full test suite`
- **Watch out:** check on it later with `claude agents` from your shell. Background sessions still ask for permissions, so a task can pause while waiting for you.

### `/fork [prompt]`

Copies the conversation into a new background session while you keep working here.

- **When:** you want a second attempt at something to run in parallel.
- **Try:** `/fork try the same fix using a database instead of a file`
- **Watch out:** Claude Code normally tells the copy to create its own Git worktree before changing code, so its edits don't collide with yours. Manage it with `claude agents`.

### `/subtask <task>`

Starts a background subagent that knows the full conversation, works on a side task, and reports back here when it's done.

- **When:** a side job, like writing tests, can happen while you carry on.
- **Try:** `/subtask write unit tests for the cart total function`
- **Watch out:** the result comes back into *this* conversation. For a separate session, use `/fork`; to switch into a copy yourself, use `/branch`.

### `/stop`

Stops the background session you're attached to. Its transcript and any worktree are kept.

- **When:** a background session is going the wrong way.
- **Try:** `/stop`
- **Watch out:** to leave a background session running and just step out, use `/exit` or press <kbd>←</kbd> instead.

### `/batch <instruction>` *(skill)*

Plans a large change, splits it into 5 to 30 independent pieces, and, once you approve, runs one background subagent per piece, each in its own worktree.

- **When:** the same kind of change must happen across many files.
- **Try:** `/batch migrate src/ from JavaScript to TypeScript`
- **Watch out:** it needs a Git repository and can use a lot of usage, because many subagents run at once. Read the plan carefully before approving.

### `/list-agents`

Lists the subagents, teammates, and other Claude Code sessions this session can send messages to. Alias: `/peers`.

- **When:** you're coordinating several sessions and need their names.
- **Try:** `/list-agents`
- **Watch out:** only available where cross-session messaging is turned on; otherwise it reports `Unknown command`.

:::checklist
- I know a command only runs when it starts my message
- I can tell `/clear` (fresh start) from `/compact` (summary) from `/rewind` (go back)
- I can name, branch, export, and resume a session
- I've tried `/btw` for a side question and `/plan` before a bigger change
:::
