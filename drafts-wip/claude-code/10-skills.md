# Custom Slash Commands and Skills

The built-in commands are just the start. You can make your own: type `/fix-issue 123` and Claude follows the steps *you* wrote. In Claude Code these are called **skills**, and older-style **custom commands** still work too.

:::summary In this chapter
- The difference between `.claude/commands/` files and `.claude/skills/` folders
- Where to save a skill so it works in one project or everywhere
- Frontmatter: the settings at the top of a skill file
- Arguments with `$ARGUMENTS`, `$0`, `$1`, and named arguments
- Seven worked examples, plus MCP prompts as commands
:::

## Commands and skills: one feature, two formats

A **skill** is a folder containing a file called `SKILL.md`. The folder name becomes the command. A **custom command** is a single Markdown file in a `commands` folder. Both create the same kind of `/command`:

| Format | File | Command you type |
|---|---|---|
| Custom command (older) | `.claude/commands/deploy.md` | `/deploy` |
| Skill (recommended) | `.claude/skills/deploy/SKILL.md` | `/deploy` |

Your existing command files keep working. Skills add two extras: a folder for supporting files (scripts, examples, reference notes), and the ability for Claude to use the skill **automatically** when your request matches its description.

> [!NOTE]
> Skills follow the open **Agent Skills** standard (agentskills.io), so a simple skill can work in other AI tools as well.

## Where skills live

| Location | Path | Works in |
|---|---|---|
| Personal | `~/.claude/skills/<name>/SKILL.md` | All your projects on this computer |
| Project | `.claude/skills/<name>/SKILL.md` | This project; commit it to share with your team |
| Plugin | `<plugin>/skills/<name>/SKILL.md` | Wherever the plugin is on, as `/plugin-name:skill-name` |

Files in subfolders of `.claude/commands/` get a prefix: `.claude/commands/frontend/component.md` becomes `/frontend:component`.

## Your first skill in three minutes

:::steps Create /summarize-changes
1. **Make the folder.**
   ```bash
   mkdir -p ~/.claude/skills/summarize-changes
   ```
2. **Write `SKILL.md`.** Save this text in that folder:
   ```markdown title=~/.claude/skills/summarize-changes/SKILL.md
   ---
   description: Summarizes uncommitted changes and flags anything risky.
     Use when the user asks what changed or wants a commit message.
   ---

   ## Current changes

   !`git diff HEAD`

   ## Instructions

   Summarize the changes above in two or three bullet points, then
   list any risks, such as missing error handling or hardcoded
   values. If the diff is empty, say there are no changes.
   ```
3. **Test it.** In any Git project, run `/summarize-changes`, or just ask "what did I change?" and Claude picks the skill by itself.
:::

The line `` !`git diff HEAD` `` is **dynamic context**: Claude Code runs that command first and pastes its output into the skill before Claude reads it. So Claude sees your real, current changes.

> [!TIP]
> If you create a skill while Claude Code is running and it doesn't appear, run `/reload-skills`.

## Frontmatter: the settings block

**Frontmatter** is the block between `---` lines at the very top of the file. Every field is optional; `description` is the one to always write.

:::compact
| Field | What it does |
|---|---|
| `name` | The command name. Defaults to the folder name |
| `description` | What the skill does and when to use it. Claude reads this to decide when to load the skill |
| `when_to_use` | Extra trigger phrases or example requests |
| `argument-hint` | Hint shown in the menu, such as `[issue-number]` |
| `arguments` | Names for positional arguments, such as `[issue, branch]` |
| `disable-model-invocation` | `true` means only *you* can run it; Claude won't start it on its own |
| `user-invocable` | `false` hides it from the `/` menu; only Claude uses it |
| `allowed-tools` | Tools Claude may use without asking while the skill runs, such as `Bash(git add *)` |
| `disallowed-tools` | Tools removed while the skill runs |
| `model` / `effort` | Use a particular model or effort level for this skill |
| `context` | `fork` runs the skill in its own subagent |
| `agent` | Which subagent type to use with `context: fork` |
| `paths` | Only auto-load when working on matching files, such as `src/**/*.ts` |
| `hooks` | Hooks that switch on when the skill is used |
:::

> [!WARNING]
> Field names must match exactly, hyphens included. Claude Code silently ignores a misspelled field. And the opening `---` must be the very first line of the file.

## Passing arguments

Whatever you type after the command name becomes its **arguments**.

| Placeholder | Becomes | With `/migrate SearchBar JS TS` |
|---|---|---|
| `$ARGUMENTS` | Everything you typed | `SearchBar JS TS` |
| `$ARGUMENTS[0]` or `$0` | The first word | `SearchBar` |
| `$1`, `$2` | The second, third word | `JS`, `TS` |
| `$name` | A named argument from `arguments:` | depends on the list |

- Wrap multi-word values in quotes: `/greet "Sam Lee" morning` makes `$0` = `Sam Lee`.
- If your skill has no placeholder, Claude Code adds `ARGUMENTS: …` to the end so Claude still sees what you typed.
- To write a literal dollar amount like `$1.00`, escape it: `\$1.00`.
- Other handy values: `${CLAUDE_SKILL_DIR}` (the skill's own folder), `${CLAUDE_PROJECT_DIR}` (the project root), and `${CLAUDE_SESSION_ID}`.

## Worked examples

### 1. Fix an issue by number

```markdown title=.claude/skills/fix-issue/SKILL.md
---
description: Fix a GitHub issue
argument-hint: [issue-number]
disable-model-invocation: true
---

Fix GitHub issue $ARGUMENTS following our coding standards.

1. Read the issue with `gh issue view $ARGUMENTS`
2. Understand the requirements
3. Implement the fix and write tests
4. Run the tests and create a commit
```

Run it with `/fix-issue 123`. Claude receives "Fix GitHub issue 123 following our coding standards…".

### 2. Migrate a component, with positional arguments

```markdown title=.claude/skills/migrate-component/SKILL.md
---
description: Migrate a component from one language to another
argument-hint: [component] [from] [to]
---

Migrate the $0 component from $1 to $2.
Preserve all existing behavior and tests.
```

Run `/migrate-component SearchBar JavaScript TypeScript`.

### 3. A safe commit command with pre-approved tools

```markdown title=.claude/skills/commit/SKILL.md
---
description: Stage and commit the current changes
disable-model-invocation: true
allowed-tools: Bash(git add *) Bash(git commit *) Bash(git status *)
---

Look at the current changes, stage them, and commit with a short,
clear message in the imperative mood ("Add menu prices").
```

Because of `allowed-tools`, Claude won't ask permission for those Git commands *during this skill*. The approval ends when you send your next message.

### 4. A weekly update anyone can read

```markdown title=~/.claude/skills/weekly-update/SKILL.md
---
description: Writes a friendly weekly progress update from recent Git
  commits. Use when asked for a status update or weekly summary.
---

## Commits this week

!`git log --since="7 days ago" --oneline`

Write a short update with three bullets of what got done and one
bullet of what's next, in plain language a non-programmer understands.
```

### 5. A pull request summary in a separate subagent

```markdown title=.claude/skills/pr-summary/SKILL.md
---
description: Summarize changes in a pull request
context: fork
agent: Explore
allowed-tools: Bash(gh *)
---

- PR diff: !`gh pr diff`
- PR comments: !`gh pr view --comments`

Summarize this pull request: what it changes, why, and any risks.
```

`context: fork` runs the skill in a fresh subagent, keeping the big diff out of your main conversation. The subagent can't see your chat, so the skill must contain everything it needs.

### 6. Reference knowledge Claude applies by itself

```markdown title=.claude/skills/house-style/SKILL.md
---
description: Writing style for all customer-facing text on the
  bakery website. Use when writing or editing page copy.
user-invocable: false
---

- Warm, short sentences. No jargon.
- Prices always as "$4.50", never "4.5".
- Call items "bakes", never "products".
```

With `user-invocable: false` it never appears in the menu; Claude uses it whenever you edit page text.

### 7. A grouped command in the older format

```markdown title=.claude/commands/frontend/component.md
---
description: Create a new UI component
argument-hint: [ComponentName]
---

Create a new component called $ARGUMENTS in src/components/,
following the pattern of the existing components, with a test file.
```

Run it with `/frontend:component PriceTag`.

## Stacking skills and adding supporting files

You can start a message with several skills: `/write-tests /fix-issue 123` loads both and passes `123` to each (up to six skills).

A skill folder can hold more than `SKILL.md`:

```text
my-skill/
├── SKILL.md       (required: overview and steps)
├── reference.md   (detailed notes, loaded only when needed)
├── examples.md    (sample outputs)
└── scripts/
    └── helper.py  (a script Claude runs)
```

Mention the extra files in `SKILL.md` ("For full API details see reference.md") so Claude knows when to open them. Keep `SKILL.md` itself under about 500 lines.

## Who can run a skill?

| Frontmatter | You can run it | Claude can run it on its own |
|---|---|---|
| (default) | Yes | Yes |
| `disable-model-invocation: true` | Yes | No |
| `user-invocable: false` | No | Yes |

Use `disable-model-invocation: true` for anything with side effects, such as deploying or sending messages. You don't want Claude deciding to deploy because the code "looks ready."

## MCP prompts as slash commands

MCP servers (Chapter 21) can offer ready-made **prompts**, and Claude Code turns them into commands. Type `/` and look for entries marked `(MCP)`, listed as `/servername:promptname`. You can also type the long form:

```text
/mcp__github__list_prs
/mcp__github__pr_review 456
/mcp__jira__create_issue login-bug high
```

Arguments are separated by spaces, and the prompt's result is added straight into the conversation.

## Bundled skills you already have

Claude Code ships with skills such as `/doctor`, `/code-review`, `/simplify`, `/batch`, `/loop`, `/debug`, `/run`, `/verify`, and `/claude-api` (Chapters 7–9). To turn bundled skills off, set `disableBundledSkills` in your settings.

## When a skill misbehaves

| Problem | Fix |
|---|---|
| Claude doesn't use the skill | Put words you'd naturally say into the `description`; or run it directly with `/name` |
| `/name` isn't recognized | Check the folder name for odd characters; run `/reload-skills`; check `/skills` |
| Fields seem ignored | The YAML may be broken. Start with `claude --debug` to see the error |
| Claude uses it too often | Make the description narrower, or add `disable-model-invocation: true` |
| Claude stops following it later | Put the key rules near the top; after `/compact`, run the skill again |

:::checklist
- I've made a personal skill in `~/.claude/skills/`
- I've used `$ARGUMENTS` or `$0` to pass information in
- I protect side-effect skills with `disable-model-invocation: true`
- I know `/skills` and `/reload-skills`
:::
