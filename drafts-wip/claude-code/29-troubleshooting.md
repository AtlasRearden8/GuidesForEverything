# Troubleshooting

Most problems have a quick fix. Start with the right diagnostic tool, then look up your symptom in the tables below.

:::summary In this chapter
- The four diagnostic tools and when to use each
- A big table of problems and fixes, by category
- How to get more help
:::

## Your diagnostic toolkit

| Tool | Where | What it does |
|---|---|---|
| `claude doctor` | Your shell | Quick, read-only check of installation and settings files |
| `/doctor` | Inside Claude Code | Full checkup that can fix problems after you confirm |
| `/debug [description]` | Inside Claude Code | Turns on logging and analyzes what's going wrong |
| `claude --safe-mode` | Your shell | Starts with all customizations off, to see whether one of them is the cause |
| `claude --debug` | Your shell | Writes a detailed debug log from the start |

## Installation and login

| Problem | Try this |
|---|---|
| `claude: command not found` | Open a new terminal window. Still failing? Re-run the installer and follow the PATH fix it prints, or run `claude doctor`. |
| `'irm' is not recognized` | You're in CMD, not PowerShell. Use the CMD install command, or open PowerShell. |
| `The token '&&' is not a valid statement separator` | You're in PowerShell. Use the PowerShell command instead. |
| Login window doesn't open | Copy the link Claude Code prints into your browser manually. |
| Old version keeps running after an update | You may have two installs. Run `claude doctor` to find duplicates |
| Prompted to log in again | Your login expired: `/login` |

## Everyday use

| Problem | Try this |
|---|---|
| Claude keeps asking permission for the same thing | Choose **Yes, and don't ask again**, add an allow rule, or run `/fewer-permission-prompts`. |
| Claude ignores an instruction | Put it in CLAUDE.md, make it concrete, and keep the file short. For must-never-happen rules, use a deny rule. |
| Responses getting slow or confused | `/compact` or `/clear`, then restate the goal. |
| Something is broken and you don't know why | `/doctor` inside Claude Code. It diagnoses and offers fixes. |
| `Unknown command` | Check the spelling; the command may not be available on your plan or platform; run `claude update` |
| My own skill doesn't appear | `/reload-skills`; check the folder layout `skills/<name>/SKILL.md` |
| Rewind says no files were restored | The change was made by a shell command, or the snapshot was cleaned up. Use Git |
| <kbd>Shift</kbd> + <kbd>Enter</kbd> sends the message | Run `/terminal-setup`, or use `\` + <kbd>Enter</kbd> |
| <kbd>Option</kbd> shortcuts do nothing on a Mac | Set Option as Meta in your terminal's settings |
| Screen flickers or jumps | Try `/tui fullscreen`; press <kbd>Ctrl</kbd> + <kbd>L</kbd> to redraw |
| Auto-compaction keeps failing | A single huge file or output is refilling context. `/clear` and avoid reading it whole |
| Hit a usage limit | Wait for the automatic continue, or see `/rate-limit-options` |

## Extensions

| Problem | Try this |
|---|---|
| MCP server shows "Failed to connect" | `claude mcp get <name>` shows the error; re-authenticate in `/mcp`. |
| MCP server needs sign-in again | `/mcp`, select it, sign in; or `claude mcp login <name>` |
| Hook doesn't fire | Check `/hooks`, the event name, and the matcher; make scripts executable |
| Plugin missing after install | `/reload-plugins`, then check `/plugin` → **Installed** |
| Settings file ignored | It's probably invalid JSON. Look for comments or trailing commas; check `/status` |
| `defaultMode: auto` has no effect | Move it to `~/.claude/settings.json` |

## Editors and other surfaces

| Problem | Try this |
|---|---|
| VS Code extension doesn't appear | Restart VS Code, or run **Developer: Reload Window** |
| JetBrains says it can't launch Claude Code | Install the CLI and make sure `claude` is on your PATH |
| Diffs don't open in my editor | `/ide` to check the connection |
| Cloud session can't see my private repository | Install the Claude GitHub App on that repository |

## Getting more help

> [!NOTE]
> Stuck? Type `/bug` to report a problem to Anthropic, ask Claude itself ("why did that fail?"), or take the free Claude Code courses at academy.claude.com.

:::checklist
- I try `/doctor` first when something is wrong
- I know `claude --safe-mode` rules out my own customizations
- I can report a bug with `/bug`
:::
