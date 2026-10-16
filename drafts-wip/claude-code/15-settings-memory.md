# Settings Files

Almost everything about Claude Code can be configured: permissions, hooks, the default model, environment variables, and more. Settings live in plain JSON files. This chapter shows where they are, how they combine, and how to change them safely.

:::summary In this chapter
- The four settings files and who each one affects
- Three ways to change a setting
- How precedence works, and why lists merge
- Common settings you'll actually use
:::

## The four files

| Scope | File | Who it affects | Use it for |
|---|---|---|---|
| User | `~/.claude/settings.json` | You, in every project | Theme, default model, personal rules |
| Shared project | `.claude/settings.json` | Everyone in the project (commit it) | Team permissions, hooks, plugins |
| Project local | `.claude/settings.local.json` | You, in this project only | Personal overrides; kept out of Git |
| Managed | Deployed by your organization | Everyone it's deployed to | Company security policy |

On Windows, `~/.claude` means `%USERPROFILE%\.claude`. Installing Claude Code doesn't create any of these files; Claude Code creates them when you first change something, or you create them yourself.

> [!NOTE]
> A fifth file, `~/.claude.json`, holds your sign-in, MCP servers, and per-project state such as folder trust. Claude Code manages it; you rarely need to touch it.

## Three ways to change a setting

1. **The menu.** Type `/config` for common personal options (theme, editor mode, verbose output, and more). Or set one directly: `/config verbose=true`.
2. **Ask Claude.** `/update-config` with a plain-English request, or simply "add an allow rule for npm test to my project settings."
3. **Edit the file.** Open it in any editor:

```json title=~/.claude/settings.json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "model": "sonnet",
  "autoUpdatesChannel": "stable",
  "permissions": {
    "allow": ["Bash(npm run lint)", "Bash(npm run test *)"],
    "deny": ["Read(./.env)", "Read(./.env.*)"]
  }
}
```

The `$schema` line gives you autocomplete and error-checking in editors like VS Code. After saving, run `/status` to confirm the file loaded.

> [!WARNING]
> Settings files are strict JSON. A `//` comment or a trailing comma after the last item is an error, and Claude Code reports a **Settings Error** at the next start. `/doctor` can help fix it.

For one session only, pass settings on the command line: `claude --settings ./my-settings.json`.

## Precedence: who wins

When the same key appears in several places, the highest level wins:

1. Managed settings (your organization)
2. Command line (`--settings`)
3. Project local (`.claude/settings.local.json`)
4. Shared project (`.claude/settings.json`)
5. User (`~/.claude/settings.json`)

**Lists merge instead of replacing.** If your user file allows `Bash(npm test)` and the project file allows `Bash(git status *)`, both apply.

## Settings you'll use most

:::compact
| Key | Example | What it does |
|---|---|---|
| `model` | `"sonnet"` | Default model for new sessions |
| `permissions` | `{ "allow": [...], "deny": [...] }` | Allow, ask, and deny rules (Chapter 14) |
| `permissions.defaultMode` | `"plan"` | Starting permission mode |
| `env` | `{ "MY_VAR": "1" }` | Environment variables for every session |
| `hooks` | `{ "PostToolUse": [...] }` | Automatic actions (Chapter 20) |
| `autoUpdatesChannel` | `"stable"` | Update channel: `latest` or `stable` |
| `autoMemoryEnabled` | `false` | Turn auto memory off |
| `cleanupPeriodDays` | `60` | How long local transcripts are kept |
| `editorMode` | `"vim"` | Vim-style prompt editing |
| `autoContinueAtUsageLimit` | `false` | Don't auto-continue after a limit resets |
| `disableBundledSkills` | `true` | Hide the bundled skills |
| `respondToBashCommands` | `false` | Don't reply automatically to `!` command output |
:::

:::checklist
- I know which settings file to edit for me versus my team
- I've changed a setting with `/config`
- I check `/status` after editing a settings file
:::

# Memory: Teaching Claude Your Project

Every session starts with a blank slate. Two features carry knowledge from one session to the next: **CLAUDE.md files**, which you write, and **auto memory**, which Claude writes.

:::summary In this chapter
- What a CLAUDE.md file is and where to put it
- Generating one with `/init`, and what belongs in it
- Imports, rules files, and AGENTS.md
- How auto memory works, and fixing memory problems
:::

## CLAUDE.md files

A `CLAUDE.md` file is a plain-text note, written in **Markdown** (a simple way to format text with `#` headings and `-` bullets), that Claude reads at the start of every session. Use it for anything you'd otherwise re-explain each time: how to run the project, house style, "always do X" rules.

| Where | File | Who it's for |
|---|---|---|
| Your whole computer | `~/.claude/CLAUDE.md` | Your personal preferences, every project |
| A project (shared) | `./CLAUDE.md` or `./.claude/CLAUDE.md` | Everyone on the project, checked into Git |
| A project (just you) | `./CLAUDE.local.md` | Your private notes; add it to `.gitignore` |
| Your organization | A managed file set up by IT | Company-wide standards |

### How they load

- Claude Code loads `CLAUDE.md` and `CLAUDE.local.md` from your current folder **and every folder above it**, and combines them. Instructions closer to where you started are read last.
- A `CLAUDE.md` inside a **subfolder** loads only when Claude starts working with files in that subfolder.
- HTML comments (`<!-- like this -->`) are stripped out, so you can leave notes for humans that cost no context.
- The project-root `CLAUDE.md` is re-read after compaction, so its rules survive long sessions.

## Create one with /init

Inside a project, type:

```prompt
/init
```

Claude studies the project and writes a starter `CLAUDE.md` with build commands, test instructions, and conventions it finds. If one already exists, it suggests improvements instead of overwriting.

## What to put in it

```markdown title=CLAUDE.md
# Rise & Shine bakery website

## How to preview
- Open index.html in a browser. No build step.

## Style
- Plain HTML and CSS only. No frameworks.
- Colors: warm cream (#FFF6E9) and cinnamon (#B5562B).
- Write friendly, short copy. No jargon.

## Rules
- Keep every page working on phones.
- Ask before deleting any image.
```

Tips from Anthropic's guidance:

- **Keep it short:** aim for under about 200 lines. Long files get followed less reliably.
- **Be concrete:** "Use 2-space indentation" beats "format code nicely."
- **Add a line when Claude makes the same mistake twice.**
- **Import other files** with `@`, e.g. `See @README.md for an overview.`

### What to leave out

Skip anything Claude can work out by reading the code, such as a list of every folder. Move long, step-by-step procedures into a **skill** (Chapter 10), which only loads when needed. `/doctor` can suggest what to trim.

> [!NOTE]
> CLAUDE.md is *guidance*, not a lock. To truly block an action, use a deny rule (Chapter 14) or a hook (Chapter 20).

## Imports

Write `@path/to/file` anywhere in a `CLAUDE.md` to pull that file in:

```markdown title=CLAUDE.md
See @README.md for the project overview and @package.json for scripts.

# Git workflow
- @docs/git-instructions.md
```

- Relative paths are relative to the file doing the importing.
- Imports can nest up to four levels deep.
- To mention a path *without* importing it, wrap it in backticks: `` `@README.md` ``.
- The first time a project imports a file from outside the project, Claude Code asks you to approve it.
- Imports help organization but don't save space: imported files load at the start too.

## Rules files: `.claude/rules/`

For bigger projects, split instructions into topic files in `.claude/rules/`, such as `testing.md` and `api-design.md`. A rule without frontmatter loads every session. Add `paths` to load a rule only when Claude works on matching files:

```markdown title=.claude/rules/api.md
---
paths:
  - "src/api/**/*.ts"
---

- Every API endpoint validates its input.
- Use the standard error response format.
```

You can also keep personal rules for every project in `~/.claude/rules/`.

## AGENTS.md

Some projects use an `AGENTS.md` file for other AI coding tools. Claude Code reads it as project instructions when there's no `CLAUDE.md` in the folder or above it. If you have both, Claude reads only `CLAUDE.md`; to share one file, put `@AGENTS.md` inside your `CLAUDE.md`.

## Auto memory

As you work, Claude can note your corrections and preferences ("Sam prefers short commit messages") in its own memory files, which load automatically next time. Type `/memory` to view or edit them, open your CLAUDE.md files, or turn auto memory on or off.

- **Where it lives:** `~/.claude/projects/<project>/memory/`, with an index file called `MEMORY.md` and one small file per memory. All worktrees of a repository share one memory folder. It stays on your computer.
- **What loads:** the first 200 lines (or 25 KB) of `MEMORY.md` each session; topic files are read only when needed.
- **What Claude saves:** your role and preferences, corrections you give, project decisions it can't see in the code, and where to find outside information. It skips what's already in the code or your `CLAUDE.md`.
- **When it saves:** you'll see messages like "Saved 2 memories." It's all plain Markdown you can read, edit, or delete.
- **Turning it off:** use the toggle in `/memory`, set `"autoMemoryEnabled": false` in a project's settings, or set the environment variable `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`.

## Fixing memory problems

| Problem | Fix |
|---|---|
| Claude ignores my `CLAUDE.md` | Run `/context` and check it's listed under memory files; make the instruction more specific; remove conflicting rules |
| A rule disappeared after `/compact` | It was only in chat, or in a subfolder file that hasn't reloaded. Move it to the project-root `CLAUDE.md` |
| My `CLAUDE.md` is huge | Trim it, move procedures into skills, use path-scoped rules; run `/doctor` |
| I don't know what auto memory saved | `/memory` → open the auto memory folder |
| My `AGENTS.md` isn't read | There's a `CLAUDE.md` above it; import `@AGENTS.md` from that file |
| It must happen *every* time | Write a hook instead (Chapter 20) |

:::checklist
- My project has a short, concrete `CLAUDE.md`
- I've added a rule after Claude repeated a mistake
- I've looked inside my auto memory with `/memory`
:::
