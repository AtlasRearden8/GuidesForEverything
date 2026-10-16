# Permissions and Safety

Claude Code can edit files and run commands on your computer, so it comes with a permission system: rules for what it may do without asking. Understanding it lets you work faster *and* safer.

:::summary In this chapter
- The six permission modes, in depth, and how to switch
- Allow, ask, and deny rules, and how to write them
- Protected paths and actions no mode approves
- Safety nets: checkpoints, Git, and the sandbox
:::

## Permission modes

A **permission mode** sets how much Claude can do before checking with you. Press <kbd>Shift</kbd> + <kbd>Tab</kbd> to cycle modes during a session. The status bar shows the active one.

| Mode | Runs without asking | Good for |
|---|---|---|
| **Manual** (`default`) | Reading files only | Sensitive work; learning what Claude does |
| **Accept edits** (`acceptEdits`) | Reading, editing files, and simple file commands like `mkdir`, `mv`, `cp` | Iterating on code you'll review afterwards |
| **Plan** (`plan`) | Reading and exploring; no edits until you approve a plan | Thinking before building |
| **Auto** (`auto`) | Almost everything, with a safety **classifier** checking each action in the background | Long tasks with few interruptions |
| **Don't ask** (`dontAsk`) | Only pre-approved tools; everything else is refused | Scripts and automation |
| **Bypass** (`bypassPermissions`) | Everything, no checks | Disposable containers and virtual machines **only** |

**Auto mode** is the starting mode for new terminal and VS Code sessions on recent versions of Claude Code. A second AI model (the **classifier**) reviews each risky action, such as running a script from the internet, force-pushing code, deploying, or deleting files that existed before the session, and blocks anything that goes beyond what you asked for.

> [!IMPORTANT]
> You can tell auto mode about limits in plain English: "don't push anything until I've reviewed it." The classifier treats that as a rule for the rest of the conversation. For a hard guarantee, add a **deny rule** (below).

To start a session in a particular mode:

```bash
claude --permission-mode plan
```

The CLI also accepts `manual` as another name for `default`.

### Each mode in more detail

**Manual** stops before most edits, shell commands, and network requests. Choose it when you want to see and approve every step, for example in an unfamiliar project.

**Accept edits** lets Claude create and edit files inside your working folder and run common file commands (`mkdir`, `touch`, `rm`, `rmdir`, `mv`, `cp`, `sed`) there. Other commands still ask. Review the result afterwards with `/diff`.

**Plan** is covered in Chapter 12.

**Auto** needs a supported model (recent Opus, Sonnet, Haiku 5.5, or Fable) and can be turned off by Team and Enterprise admins. By default the classifier only trusts your working folder and your repository's remotes; `/auto-mode-setup` describes the rest of your trusted setup. Auto mode reduces prompts but doesn't guarantee safety.

**Don't ask** never shows a prompt: anything not pre-approved is simply refused. It's meant for scripts, and it never appears in the <kbd>Shift</kbd> + <kbd>Tab</kbd> cycle.

**Bypass** only joins the cycle if you start with `--dangerously-skip-permissions` or a similar flag. Deny rules still apply even here.

> [!WARNING]
> If you set `"defaultMode": "auto"` in a project's `.claude/settings.json`, it won't take effect. Put it in your personal `~/.claude/settings.json` instead.

## Allow, ask, and deny rules

Rules let you pre-approve safe actions and forbid dangerous ones. Type `/permissions` to see and edit them, or write them in a settings file.

- **Allow**: run without asking.
- **Ask**: always ask first, even in auto mode.
- **Deny**: never allowed, in any mode.

Deny rules win over ask rules, which win over allow rules.

```json title=.claude/settings.json
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git commit *)"
    ],
    "ask": [
      "Bash(git push *)"
    ],
    "deny": [
      "Read(./.env)",
      "Bash(rm -rf *)"
    ]
  }
}
```

The `*` matches anything, so `Bash(npm run *)` covers `npm run build`, `npm run test`, and so on. Put the `*` *after* the sub-command: `Bash(git commit *)` is narrow, but `Bash(git *)` allows every Git command.

> [!TIP]
> Tired of approving the same harmless commands? Type `/fewer-permission-prompts`. Claude scans your recent sessions and proposes a safe allow-list for read-only commands you use often.

### Rule syntax cheat sheet

| Rule | Matches |
|---|---|
| `Bash` | Every shell command |
| `Bash(npm test)` | Exactly `npm test` |
| `Bash(git diff *)` | Any command starting `git diff ` (the space matters) |
| `Read(./.env)` | Reading `.env` in the current folder |
| `Read(./secrets/**)` | Reading anything inside `secrets/` |
| `Edit(/src/**/*.ts)` | Editing TypeScript files under the project's `src/` |
| `Read(~/Documents/*.pdf)` | PDFs in your Documents folder |
| `WebFetch(domain:example.com)` | Fetching pages from example.com |
| `mcp__github` | Every tool from the `github` MCP server |
| `mcp__github__*` | Same, written as a pattern |
| `Agent(Explore)` | The built-in Explore subagent |

Path prefixes in `Read` and `Edit` rules: `./` or no prefix means relative to the current folder, `/` means relative to where the settings file applies (the project), `~/` means your home folder, and `//` means an absolute path from the root of the disk.

> [!NOTE]
> File rules are checked for `Read` and `Edit` only. A `Read` deny rule also blocks images you paste and folders you @-mention from that path.

## Protected paths and actions no mode approves

Some writes are never auto-approved, except in bypass mode: changes to your Git internals (`.git`), your shell setup files (like `.bashrc`), and Claude Code's own `.claude` settings. Allow rules don't override this.

In every mode, including bypass, Claude Code still asks or refuses for:

- tools matched by an **ask** rule;
- the `AskUserQuestion` tool and other tools that need a human answer;
- `rm` and `rmdir` targeting **critical paths**, such as your home folder or the root of the disk.

## Where settings live

Claude Code reads settings from several files. When the same setting appears in more than one place, the higher one in this list wins:

| Priority | File | Applies to |
|---|---|---|
| 1 (highest) | Managed settings from your organization | Everyone in your company |
| 2 | `claude --settings …` on the command line | This session |
| 3 | `.claude/settings.local.json` | You, in this project (not shared) |
| 4 | `.claude/settings.json` | Everyone working in this project |
| 5 | `~/.claude/settings.json` | You, in every project |

`~` means your home folder. A file inside `.claude/` lives in the project folder. Chapter 15 covers settings files in depth.

## Safety nets

- **Checkpoints:** `/rewind` (or <kbd>Esc</kbd> <kbd>Esc</kbd>) restores earlier file versions.
- **Git:** commit your work before big changes so you can always get back. Ask Claude: "commit everything with a clear message before you start."
- **Protected files:** Claude never silently edits things like `.git`, `.bashrc`, or its own `.claude` settings. It always asks, except in bypass mode.
- **Sandbox:** type `/sandbox` (macOS, Linux, WSL2) to run Claude's shell commands in an isolated box with limited file and network access.

> [!CAUTION] Bypass mode is for throwaway machines
> `--dangerously-skip-permissions` turns off every check. A bad instruction hidden in a web page or file (a **prompt injection**) could then make Claude do real damage. Only use it inside a container or virtual machine you're happy to wipe. The *Maximum Autonomy* guide in this series covers how to set that up.

## A sensible starter setup

```json title=~/.claude/settings.json
{
  "permissions": {
    "allow": ["Bash(npm run test *)", "Bash(git status *)"],
    "ask": ["Bash(git push *)"],
    "deny": ["Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)"]
  }
}
```

:::checklist
- I know which permission mode I'm in from the status bar
- I've added an allow rule for a safe command I run often
- My `.env` and secret files are protected by deny rules
- I never use bypass mode on my everyday computer
:::
