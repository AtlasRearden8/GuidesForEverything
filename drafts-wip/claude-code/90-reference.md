# Slash Command Cheatsheet {.unnumbered}

:::compact
| Command | Does | Command | Does |
|---|---|---|---|
| `/clear` | Fresh conversation | `/compact [focus]` | Summarize to free space |
| `/context` | Show context usage | `/rewind` | Undo code and/or chat |
| `/resume` | Reopen a session | `/rename <name>` | Name this session |
| `/branch` | Split the conversation | `/btw <q>` | Side question |
| `/export` | Save chat as text | `/copy [N]` | Copy last reply |
| `/plan [task]` | Plan mode | `/goal <cond>` | Work until done |
| `/loop 5m <p>` | Repeat a prompt | `/diff` | Review changes |
| `/code-review` | Find bugs | `/simplify` | Clean up code |
| `/security-review` | Security check | `/init` | Create CLAUDE.md |
| `/memory` | Edit memory | `/config` | Settings |
| `/status` | Version, account | `/permissions` | Allow/deny rules |
| `/model` | Switch model | `/effort` | Thinking level |
| `/fast` | Fast mode | `/usage` | Limits and usage |
| `/mcp` | MCP servers | `/plugin` | Plugins |
| `/skills` | List skills | `/hooks` | View hooks |
| `/agents` | Subagent help | `/tasks` | Background work |
| `/add-dir <path>` | Extra folder | `/cd <path>` | Move session |
| `/theme` | Colors | `/statusline` | Status bar |
| `/output-style` | Reply style | `/terminal-setup` | Fix Shift+Enter |
| `/sandbox` | Command sandbox | `/doctor` | Setup checkup |
| `/debug` | Diagnose issues | `/bug` | Report a bug |
| `/login` | Sign in | `/logout` | Sign out |
| `/teleport` | Pull cloud session | `/remote-control` | Use from phone |
| `/install-github-app` | @claude on GitHub | `/help` | Help |
| `/release-notes` | What's new | `/exit` | Quit |
:::


# Quick Reference {.unnumbered}

:::cheatsheet
**Install (Mac/Linux):** `curl -fsSL https://claude.ai/install.sh | bash`  
**Install (Windows PowerShell):** `irm https://claude.ai/install.ps1 | iex`  
**Start:** `cd my-project` then `claude` · **Continue:** `claude -c` · **Resume:** `claude -r`

**Stop:** <kbd>Esc</kbd> · **Undo:** <kbd>Esc</kbd> <kbd>Esc</kbd> or `/rewind` · **Modes:** <kbd>Shift</kbd> + <kbd>Tab</kbd> · **New line:** <kbd>Shift</kbd> + <kbd>Enter</kbd>

**Plan first:** `/plan …` · **Fresh start:** `/clear` · **Shrink history:** `/compact` · **Project memory:** `/init`

**Prefixes:** `/` command · `@` file · `!` shell command · `?` shortcuts

**Connect an app:** `claude mcp add --transport http <name> <url>` then `/mcp` to sign in

**Script it:** `claude -p "…" --output-format json --allowedTools "Read"`

**Your own command:** `~/.claude/skills/<name>/SKILL.md` → `/<name> $ARGUMENTS`

**Aliases:** `/reset` `/new` → `/clear` · `/undo` `/checkpoint` → `/rewind` · `/continue` → `/resume` · `/review` → `/code-review` · `/cost` `/stats` → `/usage` · `/settings` → `/config` · `/quit` → `/exit` · `/bg` → `/background` · `/checkup` → `/doctor`

**Health check:** `claude doctor` · **Update:** `claude update` · **Usage:** `/usage`
:::

# Glossary {.unnumbered}

:::glossary
Agent
: An AI that can take actions, such as reading and editing files or running commands, in a loop until a task is finished, rather than only replying with text.

Agent SDK
: A Python and TypeScript library that lets you build Claude Code's agent loop and tools into your own programs.

Agent view
: The screen opened with `claude agents` that lists and manages background sessions.

Agentic loop
: The cycle an agent repeats: gather context, plan, act, check the result.

Alias
: An alternative name for a command or model, such as `/new` for `/clear`, or `sonnet` for the latest Sonnet model.

Argument
: Extra information typed after a command's name, such as the focus text in `/compact focus on the bug`.

Artifact
: A live web page Claude publishes on claude.ai from your session, private unless you share it.

Auto memory
: Notes Claude writes for itself about your preferences and project, loaded at the start of each session.

Auto mode
: A permission mode where a separate safety classifier reviews Claude's actions instead of asking you about each one.

Background session
: A Claude Code session that keeps running without a terminal attached.

Bundled skill
: A ready-made skill that ships with Claude Code, such as `/doctor` or `/loop`.

Bypass permissions
: A permission mode (`--dangerously-skip-permissions`) that skips all checks. Meant only for isolated, disposable environments.

Checkpoint
: An automatic snapshot taken before Claude edits files, which you can return to with `/rewind`.

Classifier
: A second AI model that judges whether an action in auto mode matches what you asked for.

CLAUDE.md
: A Markdown file of instructions Claude reads at the start of every session.

CLI
: Command-line interface: a program you control by typing commands in a terminal.

Cloud session
: A Claude Code session that runs on Anthropic's computers against a copy of your GitHub repository.

Commit
: A saved snapshot of your files in Git, with a description.

Compaction
: Replacing the older part of a conversation with a summary to free context space, automatically or with `/compact`.

Context window
: The amount of conversation and file content Claude can consider at once.

Current directory
: The folder your terminal is "in." Claude Code works on the files in this folder. Also called the working directory.

Custom command
: A Markdown file in `.claude/commands/` that creates your own slash command; the older form of a skill.

Diff
: A view showing exactly which lines of a file were added, removed, or changed.

Dynamic context
: A `` !`command` `` line in a skill that runs before Claude reads the skill, inserting the command's output.

Dynamic workflow
: A script Claude writes that runs many subagents at once in the background.

Effort
: How much Claude thinks before acting, from `low` to `max`.

Environment variable
: A named setting that programs can read, such as `ANTHROPIC_API_KEY`.

Fast mode
: A faster, more expensive configuration of Claude Opus, toggled with `/fast`.

Frontmatter
: The settings block between `---` lines at the top of a skill or subagent file.

Git
: A tool that records the history of your files so you can review changes and go back in time.

GitHub Actions
: GitHub's automation system, which runs workflows when things happen in a repository.

Harness
: The software around the AI model, here Claude Code itself, that provides tools and manages what the model sees.

Headless mode
: Running Claude Code non-interactively with `claude -p`, for scripts and automation. Also called print mode.

Hook
: A command you configure to run automatically at a set moment, such as after every file edit.

Markdown
: A simple text format that uses symbols like `#` and `-` for headings and lists.

MCP
: Model Context Protocol, an open standard for connecting AI tools to other apps and data.

MCP prompt
: A ready-made prompt an MCP server offers, which appears as a slash command.

MCP server
: A connector that gives an AI new tools, such as access to Notion, GitHub, or a database.

Model
: The specific AI "brain" doing the work, e.g. Opus (most capable), Sonnet (balanced), Haiku (fastest).

Output style
: A setting that changes how Claude responds, such as Concise or Learning.

PATH
: The list of folders your terminal searches when you type a program's name.

Permission mode
: The setting that decides which actions Claude can take without asking you.

Plan mode
: A permission mode in which Claude researches and proposes a plan but makes no edits until you approve.

Plugin
: An installable bundle of skills, subagents, hooks, and MCP servers.

Plugin marketplace
: A catalog of plugins you can add and install from.

Prompt
: The request you type to Claude. Also, the terminal's "ready for input" marker.

Prompt caching
: Reusing the unchanged start of a conversation so repeated context costs less.

Prompt injection
: Hidden instructions in a web page, file, or tool result that try to trick an AI into doing something you didn't ask for.

Remote Control
: A feature that lets you continue a session running on your computer from your phone or a browser.

Repository
: A folder whose history Git tracks. Often shortened to "repo."

Routine
: A task that runs on Anthropic's cloud on a schedule, created with `/schedule`.

Sandbox
: An isolated environment that limits which files and network addresses a command can reach.

Session
: One saved conversation with Claude Code, which you can name and resume.

Shell
: The program inside a terminal that reads and runs your commands, such as Zsh, Bash, or PowerShell.

Skill
: A saved set of instructions, in a `SKILL.md` file, that Claude can use automatically or that you can run as a `/command`.

Slash command
: An instruction to Claude Code itself, typed at the start of the prompt with a `/`, such as `/clear`.

Status line
: A customizable bar at the bottom of the Claude Code screen.

Subagent
: A specialist helper with its own instructions and tools that Claude can delegate work to.

Terminal
: A text window for typing commands to your computer. Also called a shell, console, or command prompt.

Token
: A small chunk of text, roughly three-quarters of a word, used to measure AI usage.

Tool
: An action Claude can take, such as reading a file or running a command.

Usage credits
: Paid extra usage you can add when you hit your plan's limit.

Workflow (GitHub)
: An automation file in `.github/workflows/` that GitHub Actions runs.

Worktree
: A separate working copy of a Git repository, so parallel tasks don't step on each other.

WSL
: Windows Subsystem for Linux, a built-in way to run Linux on Windows.
:::
