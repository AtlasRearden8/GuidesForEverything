# Slash Commands: Tools, Reviews, Account, and Help

The last group of built-in commands connects Claude Code to other tools, checks your work before you ship it, links your session to the cloud and your other devices, manages your account, and helps when something goes wrong.

:::summary In this chapter
- Extensions: `/mcp`, `/agents`, `/hooks`, `/plugin`, `/skills` and related commands
- Bundled helpers: `/run`, `/verify`, `/debug`, `/deep-research` and more
- Reviewing and shipping: `/diff`, `/code-review`, `/simplify`, `/security-review`
- Cloud, devices, and sharing: `/teleport`, `/remote-control`, `/desktop`, `/artifacts`
- Account, help, and troubleshooting commands, plus commands that were removed
:::

## Tools, MCP, agents, hooks, and plugins

### `/mcp [reconnect|enable|disable …]`

Manages your **MCP servers**, the connectors that give Claude access to other apps such as GitHub or Notion. Opens a list showing each server's status, and handles signing in.

- **When:** you just added a server and need to sign in, or a server shows "failed."
- **Try:** `/mcp`, `/mcp reconnect github`, `/mcp reconnect all`, or `/mcp disable notion`
- **Watch out:** disabling a server you aren't using frees context space. Adding servers happens in your shell with `claude mcp add` (Chapter 21).

### `/agents`

Reminds you how to create and manage **subagents**: ask Claude to make one, or edit the files in `.claude/agents/` or `~/.claude/agents/`.

- **When:** you want a specialist helper, such as a code reviewer.
- **Try:** `/agents`, then ask: "Create a project subagent called test-writer that only writes tests."
- **Watch out:** older versions opened a full menu here; current versions just point you to the easiest path. Chapter 19 covers subagents.

### `/hooks`

Shows the **hooks** you've configured: your own commands that run automatically at set moments, such as after every file edit.

- **When:** you added a hook and want to confirm Claude Code sees it.
- **Try:** `/hooks`
- **Watch out:** it's a viewer. Create hooks by editing a settings file or by asking Claude (Chapter 20).

### `/plugin [subcommand]`

Opens the plugin manager to browse, install, enable, and disable **plugins**: bundles of skills, subagents, hooks, and MCP servers.

- **When:** you want ready-made extras without building them yourself.
- **Try:** `/plugin`, or `/plugin install commit-commands@claude-plugins-official`
- **Watch out:** a plugin runs with your permissions, and every enabled plugin adds a little to your context. Install only what you trust and use (Chapter 22).

### `/reload-plugins [--force]`

Reloads your plugins so recent changes take effect without restarting.

- **When:** you installed or edited a plugin and it isn't showing up.
- **Try:** `/reload-plugins`
- **Watch out:** if the reload would change which MCP tools are loaded, it warns and skips unless you add `--force`.

### `/skills`, `/reload-skills`, and `/skill-doctor`

- `/skills` lists every skill available to you. Type to filter, press <kbd>t</kbd> to sort by size, and press <kbd>Space</kbd> to change whether Claude and the `/` menu can see a skill.
- `/reload-skills` re-scans your skill folders so a skill you just created works without restarting.
- `/skill-doctor` shows what each skill costs in context and how often it's used, so you can turn off the ones you don't need.

- **When:** you've written your own skills (Chapter 10) or installed plugins that add some.
- **Try:** `/skills`, `/reload-skills`, `/skill-doctor`
- **Watch out:** `/skill-doctor` needs a recent version of Claude Code.

### `/plugin-authoring`

Loads the reference Claude uses to build a **mod**: a plugin that changes Claude Code's own interface, such as a custom panel or toast message.

- **When:** you want Claude to build an interface tweak for you.
- **Try:** "Make me a mod that shows a toast when tests fail." Claude usually loads this by itself.
- **Watch out:** it comes from a built-in plugin you can switch off in `/plugin`.

### `/workflows` and `/workflow-authoring`

A **dynamic workflow** is a script Claude writes that runs many subagents at once in the background, for jobs like a codebase-wide bug sweep. `/workflows` opens the progress view to watch, pause, resume, or save workflows. `/workflow-authoring` loads the reference for writing one.

- **When:** a huge job needs more helpers than one conversation can coordinate.
- **Try:** `/workflows`
- **Watch out:** workflows can use a lot of usage. On Pro, turn them on first in `/config`.

## Bundled helper skills

These are ready-made skills that come with Claude Code. Some, like `/run` and `/claude-api`, Claude may also use by itself when they fit.

| Command | What it does | Try |
|---|---|---|
| `/run` *(skill)* | Launches your app and drives it, to see a change actually working | `/run` |
| `/verify` *(skill)* | Builds and runs your app to confirm a change does what it should | `/verify` |
| `/run-skill-generator` *(skill)* | Records how to build and launch your project, so `/run` and `/verify` get it right | `/run-skill-generator` |
| `/debug [description]` *(skill)* | Turns on debug logging and reads the log to diagnose a problem | `/debug MCP server keeps disconnecting` |
| `/deep-research <question>` | Searches the web widely, cross-checks sources, and writes a cited report | `/deep-research best way to cache images on a static site` |
| `/claude-api [subcommand]` *(skill)* | Loads Claude API reference material for building your own AI apps | `/claude-api migrate` |
| `/claude-in-chrome [task]` *(skill)* | Carries out a task in your Chrome browser | `/claude-in-chrome fill in the contact form and submit it` |
| `/dataviz [request]` *(skill)* | Design guidance for charts and dashboards | `/dataviz chart monthly sales by product` |

> [!TIP]
> `/verify` and `/deep-research` run only when you ask for them, because they can take a while and use a fair amount of usage. Run `/run-skill-generator` once per project if your app needs anything unusual to start, such as a database or a special environment file.

## Reviewing and shipping

### `/diff`

Shows every change in your working files, including Claude's edits so far, in an interactive viewer.

- **When:** before you commit, or whenever you want to see exactly what Claude changed.
- **Try:** `/diff`
- **Watch out:** it shows uncommitted changes in your folder, including ones you made yourself.

### `/code-review [level] [--fix] [--comment] [target]` *(skill)*

Reviews your changes for bugs. Alias: `/review`. With no target it reviews your current branch and uncommitted changes. It runs as a background subagent, so you can keep working.

- **When:** before committing or opening a pull request.
- **Try:** `/code-review`, `/code-review high`, `/code-review --fix` to apply the fixes, `/code-review 1234` for a pull request, or `/code-review src/cart` for one folder.
- **Watch out:** the level (`low`, `medium`, `high`, `xhigh`, `max`) trades thoroughness for usage, and is remembered for next time. `--comment` posts findings on the GitHub pull request. `--fix` edits go through your normal permissions.

### `/ultrareview [PR or branch]`

Runs a deep, multi-agent review in a cloud sandbox. The preferred spelling is `/code-review ultra`.

- **When:** an important pull request deserves an extra-careful review.
- **Try:** `/code-review ultra 1234`
- **Watch out:** Pro and Max include 3 free runs; after that it needs usage credits.

### `/simplify [target]` *(skill)*

Four review agents look at your recent changes for cleanup: reusing existing helpers, simpler code, efficiency, and the right level of abstraction. Then it applies the fixes.

- **When:** the code works but feels messy.
- **Try:** `/simplify`, or `/simplify src/cart`
- **Watch out:** it doesn't look for bugs. Use `/code-review` for that.

### `/security-review`

Checks the changes on your current branch for security problems, such as injection attacks, login flaws, and leaked data.

- **When:** before shipping anything that handles logins, payments, or personal data.
- **Try:** `/security-review`
- **Watch out:** it compares against your `origin` remote's default branch, so the repository needs an `origin` remote.

### `/install-github-app`

Installs the Claude GitHub App on a repository and, optionally, sets up GitHub Actions so people can mention `@claude` in issues and pull requests.

- **When:** you want Claude's help directly on GitHub.
- **Try:** `/install-github-app`
- **Watch out:** github.com only (not GitLab or Bitbucket), needs admin access to the repository and the `gh` command-line tool. Chapter 24 walks through it.

### `/autofix-pr [prompt]`

Starts a cloud session that watches the current branch's pull request and pushes fixes when tests fail or reviewers leave comments.

- **When:** you've opened a PR and want CI failures handled while you do other things.
- **Try:** `/autofix-pr`, or `/autofix-pr only fix lint and type errors`
- **Watch out:** needs the `gh` tool and access to cloud sessions. To watch a different PR, check out its branch first.

### `/schedule [description]`

Creates, updates, lists, or runs **routines**: tasks that run on Anthropic's cloud on a schedule, even when your computer is off. Alias: `/routines`.

- **When:** you want something done every morning, like a summary of new issues.
- **Try:** `/schedule every weekday at 9am, summarize new GitHub issues`
- **Watch out:** routines run in the cloud against your GitHub repositories, not on your local files. For checks while a session is open, use `/loop`.

### `/install-slack-app`

Installs the Claude Slack app through your browser.

- **When:** your team wants to hand coding tasks to Claude from Slack.
- **Try:** `/install-slack-app`
- **Watch out:** a workspace admin may need to approve the app.

## Cloud, devices, and sharing

| Command | What it does | Watch out |
|---|---|---|
| `/teleport` (also `/tp`) | Pulls a cloud session from claude.ai/code into this terminal, with its branch and conversation | Needs a claude.ai subscription |
| `/remote-control` (also `/rc`) | Lets you continue this local session from your phone or a browser | Your computer must stay on with Claude Code running |
| `/remote-env` | Chooses the default cloud environment for cloud sessions you start from here | Only matters if you use cloud sessions |
| `/web-setup` | Connects your GitHub account for cloud sessions using your local `gh` login | Requires the `gh` tool, signed in |
| `/desktop` (also `/app`) | Continues this session in the Claude desktop app | macOS or x64 Windows, with a subscription |
| `/mobile` (also `/ios`, `/android`) | Shows a QR code to download the Claude mobile app | — |
| `/artifacts` | Lists your **artifacts** (live, private web pages Claude publishes on claude.ai) to attach, open, or copy a link | Only where artifacts are available |
| `/team-onboarding` | Writes a setup guide for a teammate from your last 30 days of use | Review it for anything private before sharing |

### Design, slides, and artifact helpers

| Command | What it does |
|---|---|
| `/design [brief]` *(skill)* | Drafts UI mockups, screen flows, or posters on a Claude Design canvas you can edit in your browser |
| `/design-login` | Authorizes design-system access for `/design-sync` |
| `/design-sync [hint]` *(skill)* | Uploads your repository's React design system to Claude Design, so designs use your real components |
| `/slides [brief]` *(skill)* | Makes a slide deck from your brief as an artifact |
| `/artifact-capabilities` *(skill)* | Loads what a published artifact can do, such as live data or file downloads |
| `/artifact-diagramming` *(skill)* | Loads guidance for drawing clear diagrams in artifacts |

These depend on artifacts being available to your account, and aren't available on Amazon Bedrock, Google Cloud, or Microsoft Foundry.

## Account

### `/login` and `/logout`

`/login` signs in to your Anthropic account or switches accounts; `/logout` signs out.

- **When:** you want to switch between a personal and a work account, or login seems broken.
- **Try:** `/logout`, close Claude Code, then `claude` and sign in again.
- **Watch out:** switching accounts mid-task cancels an automatic wait for a usage limit.

### `/privacy-settings`

Shows and updates your privacy settings, such as whether your chats can help improve future models.

- **When:** you want to check or change how your data is used (Chapter 28).
- **Try:** `/privacy-settings`
- **Watch out:** only available on Pro and Max plans; Team and Enterprise data rules are set by your organization's agreement.

### `/passes`

Shares a free week of Claude Code with friends, if your account is eligible. It only appears when you can use it.

## Help and troubleshooting

### `/help`

Shows help and the commands available to you.

- **Try:** `/help`. You can also just ask Claude: "how do I undo a change?"

### `/doctor` *(skill)*

Runs a setup checkup: installation health, settings files, unused extensions, oversized `CLAUDE.md` files, and permission suggestions. It reports first and asks before fixing anything. Alias: `/checkup`.

- **When:** something feels off, or Claude Code seems slow to start.
- **Try:** `/doctor`, or `/doctor prompt-audit` to check your instruction files for outdated or conflicting rules.
- **Watch out:** `claude doctor` in your shell is a quick, read-only version that runs without starting a session.

### `/bug [report]` and `/feedback [report]`

`/bug` reports a bug to Anthropic; `/feedback` sends product feedback. Both let you choose how much of the session to include and ask for consent before sending. Alias for `/bug`: `/share`.

- **When:** you hit a bug or have a suggestion.
- **Try:** `/bug the diff view doesn't open in VS Code`
- **Watch out:** reports that include your conversation are kept for five years, so leave out anything sensitive.

### `/release-notes`

Shows what changed in each version of Claude Code, in a version picker.

- **Try:** `/release-notes` after an update, to see what's new.

### `/powerup`

Teaches Claude Code features through quick interactive lessons with animated demos.

- **Try:** `/powerup`. It's a friendly way to keep learning after this manual.

### `/heapdump`

Saves a memory snapshot for diagnosing high memory use. Hidden from the menu: type it in full.

- **Watch out:** only share the small `-diagnostics.json` file it makes. The large `.heapsnapshot` file contains your whole conversation and credentials.

### `/setup-bedrock` and `/setup-vertex`

Wizards that connect Claude Code to Amazon Bedrock or Google Cloud's Agent Platform instead of an Anthropic account. They stay hidden until the matching setting (`CLAUDE_CODE_USE_BEDROCK=1` or `CLAUDE_CODE_USE_VERTEX=1`) is turned on. Most beginners never need them.

## Just for fun

| Command | What it does |
|---|---|
| `/radio` | Opens Claude FM lo-fi radio in your browser |
| `/stickers` | Order Claude Code stickers |

## Removed commands

If you read older tutorials, you may see commands that no longer exist:

| Old command | What to do instead |
|---|---|
| `/pr-comments` | Ask Claude directly: "show me the comments on this pull request" |
| `/ultraplan` | Use plan mode (`/plan` or <kbd>Shift</kbd> + <kbd>Tab</kbd>) |
| `/vim` | Turn on Vim editing in `/config` → **Editor mode** |

:::checklist
- I know `/mcp`, `/plugin`, and `/skills` manage my extensions
- I review changes with `/diff` and `/code-review` before committing
- I know `/doctor` is my first stop when something seems broken
- I can report a problem with `/bug`
:::
