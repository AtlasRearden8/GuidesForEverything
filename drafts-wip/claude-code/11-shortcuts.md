# Keyboard Shortcuts and Launch Options

Keyboard shortcuts make Claude Code feel quick. You don't need to learn them all: press <kbd>?</kbd> on an empty prompt to see the list any time. This chapter also covers the options you can add when you start `claude` from the terminal.

:::summary In this chapter
- The everyday shortcuts and what they do
- Editing your prompt, multi-line input, and history search
- Vim mode and customizing shortcuts
- Starting Claude Code with command-line options
:::

## The shortcuts you'll use daily

| Keys | Action |
|---|---|
| <kbd>Esc</kbd> | Stop Claude mid-task, or close a dialog |
| <kbd>Esc</kbd> <kbd>Esc</kbd> | Clear your draft; on an empty prompt, open rewind |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Cycle permission modes |
| <kbd>Shift</kbd> + <kbd>Enter</kbd> | New line without sending |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Scroll through previous prompts |
| <kbd>Ctrl</kbd> + <kbd>R</kbd> | Search prompt history |
| <kbd>Ctrl</kbd> + <kbd>C</kbd> | Interrupt; on an empty prompt, press twice to exit |
| <kbd>Ctrl</kbd> + <kbd>D</kbd> | Exit (press twice) |
| <kbd>Ctrl</kbd> + <kbd>O</kbd> | Show the detailed transcript of what Claude did |
| <kbd>Ctrl</kbd> + <kbd>T</kbd> | Show or hide Claude's task checklist |
| <kbd>Ctrl</kbd> + <kbd>G</kbd> | Edit your prompt (or a plan) in a text editor |
| <kbd>Ctrl</kbd> + <kbd>V</kbd> | Paste an image (<kbd>Cmd</kbd> + <kbd>V</kbd> in iTerm2, <kbd>Alt</kbd> + <kbd>V</kbd> on Windows) |
| <kbd>Ctrl</kbd> + <kbd>B</kbd> | Send a long-running command to the background |
| <kbd>Ctrl</kbd> + <kbd>S</kbd> | Stash your draft; press again on an empty prompt to bring it back |
| <kbd>Ctrl</kbd> + <kbd>L</kbd> | Redraw a garbled screen |
| <kbd>?</kbd> | Show the shortcut help panel (on an empty prompt) |

## Model and mode shortcuts

| Mac | Windows / Linux | Action |
|---|---|---|
| <kbd>Option</kbd> + <kbd>P</kbd> | <kbd>Alt</kbd> + <kbd>P</kbd> | Switch model without clearing your prompt |
| <kbd>Option</kbd> + <kbd>T</kbd> | <kbd>Alt</kbd> + <kbd>T</kbd> | Toggle extended thinking (older models only) |
| <kbd>Option</kbd> + <kbd>O</kbd> | <kbd>Alt</kbd> + <kbd>O</kbd> | Toggle fast mode |

> [!NOTE]
> On a Mac, most <kbd>Option</kbd> shortcuts only work after you set Option to act as "Meta" in your terminal's settings. `/terminal-setup` helps with this in Apple Terminal.

## Editing your prompt

| Keys | Action |
|---|---|
| <kbd>Ctrl</kbd> + <kbd>A</kbd> / <kbd>Ctrl</kbd> + <kbd>E</kbd> | Jump to the start / end of the line |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> | Delete to the end of the line |
| <kbd>Ctrl</kbd> + <kbd>U</kbd> | Delete back to the start of the line |
| <kbd>Ctrl</kbd> + <kbd>W</kbd> | Delete back to the previous space (a whole path at once) |
| <kbd>Ctrl</kbd> + <kbd>Y</kbd> | Paste back what you just deleted |
| <kbd>Alt</kbd> + <kbd>B</kbd> / <kbd>Alt</kbd> + <kbd>F</kbd> | Move back / forward one word |
| <kbd>Ctrl</kbd> + <kbd>_</kbd> | Undo your last edit to the prompt |

### Multi-line prompts

| Method | Works in |
|---|---|
| `\` then <kbd>Enter</kbd> | Every terminal |
| <kbd>Ctrl</kbd> + <kbd>J</kbd> | Every terminal |
| <kbd>Shift</kbd> + <kbd>Enter</kbd> | iTerm2, WezTerm, Ghostty, Kitty, Warp, Apple Terminal, Windows Terminal; others after `/terminal-setup` |
| <kbd>Option</kbd> + <kbd>Enter</kbd> | Mac, after enabling Option as Meta |
| Paste | Paste a block of text or logs directly |

## Quick prefixes

| Type | Meaning |
|---|---|
| `/` at the start | Command or skill |
| `!` at the start | Shell mode: run a command yourself |
| `@` | File path autocomplete |
| `:` | Emoji shortcode, such as `:tada:` |
| `?` on an empty prompt | Shortcut help |

## Prompt history and search

Your prompts are remembered per folder, even across sessions, so <kbd>↑</kbd> can bring back yesterday's request. Press <kbd>Ctrl</kbd> + <kbd>R</kbd> and type a few letters to search older prompts; press <kbd>Ctrl</kbd> + <kbd>R</kbd> again for older matches, <kbd>Tab</kbd> to edit the match, or <kbd>Enter</kbd> to run it.

## Shortcuts in the transcript viewer

After <kbd>Ctrl</kbd> + <kbd>O</kbd>: <kbd>q</kbd> or <kbd>Esc</kbd> closes it. In fullscreen mode, <kbd>{</kbd> and <kbd>}</kbd> jump between your prompts, <kbd>v</kbd> opens the conversation in your editor, and <kbd>?</kbd> lists more keys.

## Vim mode

If you know the Vim editor, turn on Vim-style editing in `/config` → **Editor mode**. <kbd>Esc</kbd> enters NORMAL mode and <kbd>i</kbd>, <kbd>a</kbd>, <kbd>o</kbd> return to typing. To map `jj` to Escape, add this to your settings:

```json title=~/.claude/settings.json
{
  "editorMode": "vim",
  "vimInsertModeRemaps": { "jj": "<Esc>" }
}
```

## Customize your shortcuts

Run `/keybindings` to open `~/.claude/keybindings.json`. Each block names a **context** (where the keys apply, such as `Chat` or `Global`) and maps keys to actions. Setting a key to `null` unbinds it. Changes apply as soon as you save.

```json title=~/.claude/keybindings.json
{
  "$schema": "https://www.schemastore.org/claude-code-keybindings.json",
  "bindings": [
    {
      "context": "Chat",
      "bindings": {
        "ctrl+e": "chat:externalEditor",
        "ctrl+s": null
      }
    }
  ]
}
```

## Starting Claude Code from the terminal

| Command | What it does |
|---|---|
| `claude` | Start an interactive session |
| `claude "fix the build error"` | Start with a first request |
| `claude -c` | Continue the most recent conversation here |
| `claude -r` | Choose an older conversation to resume |
| `claude -r "auth-refactor"` | Resume a session by name |
| `claude -n checkout-bug` | Start a session with a name |
| `claude -p "summarize README.md"` | Answer once and exit (handy in scripts) |
| `claude --model opus` | Use a specific model this session |
| `claude --effort high` | Use a specific effort level this session |
| `claude --permission-mode plan` | Start in a specific permission mode |
| `claude -w new-feature` | Work in an isolated copy of the repo (a Git *worktree*) |
| `claude --add-dir ../shared` | Give access to an extra folder |
| `claude --chrome` | Enable Chrome browser control |
| `claude --safe-mode` | Start with all customizations off, to troubleshoot |
| `claude --debug` | Write a detailed debug log |
| `claude update` | Update now |
| `claude doctor` | Check installation health |
| `claude agents` | Open agent view to manage background sessions |
| `claude -v` | Print the version |

:::checklist
- I've pressed <kbd>?</kbd> to see the shortcut panel
- I can write a multi-line prompt
- I've searched my history with <kbd>Ctrl</kbd> + <kbd>R</kbd>
- I know how to start Claude Code with a model, a mode, or a name
:::
