# Subagents: Specialist Helpers

A **subagent** is a helper Claude can hand work to. Each has its own instructions, its own allowed tools, and its own fresh context, so a big research job doesn't clutter your main conversation.

:::summary In this chapter
- The built-in subagents
- Creating your own, by asking or by writing a file
- The settings a subagent file can hold
- Calling a subagent on purpose, and three example designs
:::

## Out-of-the-box extending

Out of the box, Claude Code can work with files, run commands, and search the web. You can extend it in five ways. Each has its own job, and each gets its own chapter:

| Feature | In one sentence | Lives in |
|---|---|---|
| **Subagents** | Specialist helpers with their own instructions and tools | `.claude/agents/<name>.md` |
| **Hooks** | Run your own command automatically when something happens | `"hooks"` in settings.json |
| **MCP servers** | Connect Claude to outside tools: GitHub, Notion, databases, browsers | `claude mcp add …` |
| **Plugins** | Bundles of the others you can install in one step | `/plugin` |
| **Skills** | Save a reusable set of instructions as a `/command` (Chapter 10) | `.claude/skills/<name>/SKILL.md` |

## Built-in subagents

| Subagent | What it does | Tools |
|---|---|---|
| **Explore** | Fast searching and reading of a codebase | Read-only |
| **Plan** | Research during plan mode | Read-only |
| **General-purpose** | Complex jobs that need both research and changes | All tools |

Claude uses these automatically. When you see "Explore(…)" in the transcript, a subagent is reading code on Claude's behalf; only its summary comes back to your conversation.

## Create your own

The easiest way is to ask:

```prompt
Create a project subagent called "copy-editor" that checks my website text
for spelling, tone, and reading level. It should only be able to read files.
```

Claude saves it as `.claude/agents/copy-editor.md`. Personal subagents for every project go in `~/.claude/agents/`. Claude Code notices new or changed files within a few seconds.

### The file format

```markdown title=.claude/agents/code-reviewer.md
---
name: code-reviewer
description: Expert code reviewer. Use right after writing or
  changing code.
tools: Read, Grep, Glob, Bash
model: sonnet
---

You are a senior code reviewer. When invoked:
1. Run git diff to see recent changes.
2. Check for clear naming, error handling, exposed secrets,
   input validation, and missing tests.
3. Report findings as Critical, Warnings, and Suggestions, each
   with a specific fix.
```

The frontmatter configures the subagent; the text below becomes its instructions. Only `name` and `description` are required.

:::compact
| Field | What it does |
|---|---|
| `tools` | Tools it may use, such as `Read, Grep`. Omit to inherit all |
| `disallowedTools` | Tools to remove |
| `model` | `sonnet`, `opus`, `haiku`, `fable`, a full ID, or `inherit` |
| `permissionMode` | Its permission mode, such as `plan` or `acceptEdits` |
| `maxTurns` | Stop after this many steps |
| `skills` | Skills preloaded into it |
| `mcpServers` | MCP servers it can use |
| `memory` | Give it its own long-term memory: `user`, `project`, or `local` |
| `isolation` | `worktree` gives it its own copy of the repository |
| `effort`, `color`, `background` | Effort level, display color, always run in background |
:::

## Calling a subagent on purpose

| How | Example |
|---|---|
| Name it in plain English | "Use the code-reviewer subagent to look at my changes" |
| @-mention it (guarantees it runs) | `@"code-reviewer (agent)" look at the auth changes` |
| Run the whole session as it | `claude --agent code-reviewer` |

Subagents usually run in the **background**, so you can keep chatting while they work. Press <kbd>Ctrl</kbd> + <kbd>B</kbd> to background one that's running in front, and `/tasks` to check on them.

## Three useful designs

| Subagent | Tools | Instructions in brief |
|---|---|---|
| **test-writer** | Read, Edit, Write, Bash | Write tests for new code, run them, report failures |
| **debugger** | Read, Edit, Bash, Grep | Reproduce the error, find the root cause, make the smallest fix |
| **docs-checker** | Read, Grep, Glob | Compare the README with the code and list anything out of date |

> [!TIP]
> Give a subagent a clear `description` saying *when* to use it ("Use after any change to the checkout code"). That's what Claude reads to decide whether to delegate.

:::checklist
- I've seen Explore working in the transcript
- I've created a subagent by asking Claude
- I know how to @-mention a subagent
:::

# Hooks: Automatic Actions

A **hook** runs a command of yours at a specific moment, for example after every file edit or when Claude needs your attention. Unlike CLAUDE.md, hooks *always* run.

:::summary In this chapter
- How hooks are configured
- The main hook events
- Four ready-to-use examples, for every operating system
- How hooks talk back to Claude, and how to debug them
:::

## Your first hook: a desktop notification

This example shows a desktop notification on a Mac whenever Claude is waiting for you:

```json title=~/.claude/settings.json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude needs you\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

For other systems, replace the `command` line:

| System | Command |
|---|---|
| Linux | `notify-send 'Claude Code' 'Claude needs you'` (package `libnotify-bin`) |
| Windows | A PowerShell `MessageBox` command; ask Claude to write it for you |

Type `/hooks` to see what's configured. You can also just describe the hook you want and ask Claude to set it up.

> [!TIP]
> On a Mac, if no notification appears, run `osascript -e 'display notification "test"'` once, then allow notifications for **Script Editor** in [[System Settings > Notifications]].

## How a hook is built

Each hook has three parts: the **event** (when), an optional **matcher** (which tools or cases), and the **command** (what runs). Several events can live side by side in one `"hooks"` object.

| Event | Fires when |
|---|---|
| `SessionStart` | A session begins or resumes (also after compaction) |
| `UserPromptSubmit` | You send a prompt, before Claude sees it |
| `PreToolUse` | Before a tool runs. Can block it |
| `PostToolUse` | After a tool succeeds |
| `Notification` | Claude needs your input or permission |
| `Stop` | Claude finishes responding |
| `SubagentStop` | A subagent finishes |
| `PreCompact` / `PostCompact` | Around compaction |
| `SessionEnd` | A session ends |

There are more for special cases, such as `PermissionRequest`, `FileChanged`, and `ConfigChange`.

## Example: format code after every edit

```json title=.claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"
          }
        ]
      }
    ]
  }
}
```

The hook receives details about the edit as JSON on its input; `jq` (a small JSON tool you may need to install) pulls out the file path, and Prettier formats that file.

## Example: block edits to protected files

Save this script as `.claude/hooks/protect-files.sh` and make it runnable with `chmod +x .claude/hooks/protect-files.sh`:

```bash title=.claude/hooks/protect-files.sh
#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

for pattern in ".env" "package-lock.json" ".git/"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "Blocked: $FILE_PATH is protected" >&2
    exit 2
  fi
done
exit 0
```

Then register it:

```json title=.claude/settings.json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-files.sh"
          }
        ]
      }
    ]
  }
}
```

## Example: remind Claude after compaction

```json title=.claude/settings.json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "compact",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Reminder: use Bun, not npm. Run bun test before committing.'"
          }
        ]
      }
    ]
  }
}
```

Text a `SessionStart` hook prints is added to Claude's context.

## How hooks talk back: exit codes

| Exit code | Meaning |
|---|---|
| `0` | No objection. For `SessionStart` and `UserPromptSubmit`, printed text is added to context |
| `2` | Block the action. The message you print to error output (stderr) goes to Claude as feedback |
| Anything else | A non-blocking error; the action goes ahead and a notice appears |

Hooks can also print structured JSON for finer control; the official hooks reference covers it.

## Debugging hooks

| Problem | Fix |
|---|---|
| Hook never fires | Check `/hooks`; check the event name and matcher spelling |
| "hook error" notice | Run the command yourself in a terminal to see the error |
| Script won't run | Make it executable with `chmod +x`; use the full path |
| JSON output ignored | Your shell profile may print text first; keep hook output clean |
| Need more detail | Start with `claude --debug` and read the log |

> [!WARNING]
> Hooks run with your full permissions, automatically. Read any hook in a project you didn't write before trusting that folder.

:::checklist
- I've set up a notification hook
- I understand exit code 2 blocks an action
- I check `/hooks` after adding one
:::
