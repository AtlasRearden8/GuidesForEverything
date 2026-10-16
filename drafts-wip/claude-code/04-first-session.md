# Your First Session

Let's build something. In this chapter you'll start Claude Code, ask it questions, and have it create and change real files. Follow along at your own computer: it takes about twenty minutes.

:::summary In this chapter
- What the Claude Code screen shows you
- A complete walkthrough: build a small website, change it, review it, save it
- Asking questions, pointing at files, and running your own commands
- Approving actions, interrupting, undoing, ending, and resuming
:::

## The Claude Code screen

When you run `claude`, you'll see:

- A **welcome panel** showing the version, the AI model in use, and your current folder.
- A **prompt box** where you type, marked with `>`.
- A **status bar** underneath showing the current *permission mode* (more on this in Chapter 14), and sometimes hints, the effort level, or a link to an open pull request.

Type your request in plain English and press <kbd>Enter</kbd>. There's no special syntax to learn.

> [!TIP]
> To write several lines before sending, press <kbd>Shift</kbd> + <kbd>Enter</kbd> for a new line (or type `\` then <kbd>Enter</kbd>, which works in every terminal). <kbd>Ctrl</kbd> + <kbd>J</kbd> also adds a new line in any terminal.

### The four special characters

Most of what you type is plain English, but four characters at the start of the prompt do something special:

| Type | What happens | Example |
|---|---|---|
| `/` | Opens the command menu (Chapters 7–10) | `/help` |
| `@` | Autocompletes a file or folder name to point Claude at it | `@index.html` |
| `!` | Runs a shell command yourself; Claude sees the output | `! ls` |
| `?` | On an empty prompt, shows the keyboard shortcuts | `?` |

## Build a small website

:::steps Your first project
1. **Start in an empty folder.**
   ```bash
   mkdir ~/bakery-site
   cd ~/bakery-site
   claude
   ```
2. **Describe what you want.**
   ```prompt
   Create a simple one-page website for a bakery called "Rise & Shine".
   Include our hours (Tue–Sun, 7am–3pm), a short menu with prices,
   and a contact section. Keep it to plain HTML and CSS.
   ```
3. **Watch it plan and work.** Claude explains what it's about to do, then creates files such as `index.html` and `styles.css`.
4. **Approve when asked.** If Claude asks permission to create a file, choose **Yes**. (Chapter 14 explains how to approve whole categories at once.)
5. **Open the result.** Ask: `open the website in my browser`. Or open `index.html` from your file manager.
6. **Change it.** Try: `make the colors warmer and add a photo placeholder at the top`.
:::

That's the whole rhythm: **describe, review, refine.**

## Watch what Claude is doing

While Claude works, it prints short lines such as "Read index.html" or "Edit styles.css." To see the full detail, press <kbd>Ctrl</kbd> + <kbd>O</kbd> to open the **transcript viewer**. It shows every tool Claude used and its results. Press <kbd>Esc</kbd> or <kbd>q</kbd> to close it.

For bigger tasks Claude keeps a to-do **task list** for itself. Press <kbd>Ctrl</kbd> + <kbd>T</kbd> to show or hide it.

## Review the changes

Before you keep anything, look at what changed. Type:

```text
/diff
```

You'll see every line Claude added (usually green) and removed (usually red). A view like this is called a **diff**. If something looks wrong, just say so: "Put the menu back the way it was, but keep the new colors."

## Save your work with Git

If your folder isn't a Git repository yet, ask Claude to set one up and save a first snapshot:

```prompt
Turn this folder into a Git repository and commit everything
with a clear message.
```

From now on, every commit is a safe point you can return to, even weeks later.

## Ask questions about existing code

Claude Code shines when you point it at a project someone else wrote. Start it inside the project folder and try:

```prompt
what does this project do?
```

```prompt
explain the folder structure like I'm new to coding
```

```prompt
where is the main entry point, and what happens when the app starts?
```

You don't need to tell Claude which files to read. It looks around by itself. If you *want* to point at a file, type `@` and start typing its name; Claude Code autocompletes the path.

## Run your own commands with !

Sometimes you want to run a command yourself and have Claude react to the result. Start the line with `!`:

```text
! npm test
```

The command runs straight away, without needing Claude's approval, and its output lands in the conversation. Claude then responds to it, for example by explaining the failures. Press <kbd>Esc</kbd> or <kbd>Backspace</kbd> on an empty prompt to leave shell mode.

## Approving, interrupting, and undoing

**Permission prompts.** Before Claude edits a file or runs a command it isn't sure about, it may show what it intends to do and offer choices like:

- **Yes**: allow this one action.
- **Yes, and don't ask again**: allow this kind of action from now on in this project.
- **No**: refuse, and optionally tell Claude what to do instead.

Press <kbd>Tab</kbd> on **Yes** or **No** to add a short comment with your answer, such as "Yes, but use port 8080."

**Interrupting.** Press <kbd>Esc</kbd> at any time to stop Claude mid-task. It keeps what it has done so far, and you can redirect it: "Stop. Use blue instead of green."

**Queueing.** You don't have to wait. Type a message and press <kbd>Enter</kbd> while Claude works; it's queued and sent when Claude is ready. Queued messages show in gray until Claude starts on them.

**Undoing.** Claude Code saves a **checkpoint** before each change. Press <kbd>Esc</kbd> twice on an empty prompt (or type `/rewind`) to roll the conversation *and/or* your files back to an earlier point. Chapter 13 covers this in depth.

> [!WARNING]
> Checkpoints cover file edits Claude makes. They can't undo things outside your computer, like a sent email, a deleted cloud file, or a database change. For real safety, use Git (Chapter 14 and the GitHub manual in this series).

## Ending and resuming

| To… | Do this |
|---|---|
| Leave Claude Code | Type `/exit`, or press <kbd>Ctrl</kbd> + <kbd>D</kbd> twice |
| Start fresh in the same window | `/clear` |
| Continue your last conversation | `claude -c` (from the terminal) |
| Pick an older conversation | `claude -r`, or `/resume` inside Claude Code |
| Name a session to find it later | `/rename bakery-site` |

When you come back to a terminal after a few minutes away, Claude Code may show a one-line **recap** of what happened so far, so you can pick up where you left off.

## Your first-session practice list

Try each of these in your bakery project. They take a minute each and cover the skills you'll use every day:

```prompt
Add a "Specials" section under the menu with two weekly specials.
```

```prompt
Explain, in three sentences, how styles.css changes the page.
```

```prompt
Check the page for spelling mistakes and fix them.
```

```text
/rename bakery-site
```

```text
/exit
```

Then run `claude -c` in the same folder and ask `what did we do last time?`.

:::checklist
- I built a page by describing it in plain English
- I reviewed the changes with `/diff`
- I committed my work to Git
- I used `@` to point at a file and `!` to run a command
- I interrupted Claude with <kbd>Esc</kbd> and resumed a session with `claude -c`
:::
