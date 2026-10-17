
# What Always Asks: The Master List

These are the prompts and blocks that survive every setting in this guide. They're worth knowing so you're not surprised when a "fully autonomous" agent pauses.

| Tool | Always asks or blocks |
|---|---|
| **Claude Code** | Critical-path `rm`/`rmdir` (root, home, top-level dirs, working dir); explicit ask rules; `AskUserQuestion`; `requiresUserInteraction` MCP tools; org "ask" connector policies; PowerShell `Remove-Item` on system paths; running bypass as root outside a sandbox |
| **Claude Desktop / Chrome** | Purchases, account creation, CAPTCHAs; classifier-flagged actions on external sites; deleting sessions |
| **Cowork** | Write connector tools when the admin hasn't allowed "Always allow" |
| **Claude cloud sessions** | No bypass; Auto is the ceiling |
| **Cursor** | Team admin policies; hard-coded security rules; (outside Run Everything) protected paths and commands leaving the sandbox |
| **VS Code / Copilot** | Tools set to `false`; organization policies; enabled sandbox limits |
| **Codex** | Safety-monitoring pauses; managed requirements; protected `.git`, `.codex`, `.agents`, `.aws` outside full access |
| **Gemini CLI** | Admin secure mode or `disableYoloMode`; policy deny rules; untrusted folders |
| **GitHub** | Sudo mode in the web UI; push protection for secrets; org SSO and policies |
| **n8n** | Workflows not enabled for MCP; Execute Command unavailable on Cloud |
| **Notion** | Pages not shared with a connection; owner-level MCP restrictions |
| **ChatGPT agent** | Confirmations before high-impact actions (purchases, sending); "watch mode" on sensitive sites |
| **Devin Desktop / CLI** | Admin maximum level and team deny lists; org deny and ask rules |
| **Cline** | Nothing beyond what you leave unticked, once YOLO Mode is on |
| **OpenHands headless** | Nothing: always-approve can't be turned off there |

> [!TIP]
> When a "fully autonomous" agent pauses, check this table first. If the pause is on the list, plan around it (leave that step for yourself, or rewrite the command). If it isn't, it's a setting you can change; the tool's chapter shows where.

# Your Autonomy Setup Checklist {.unnumbered}

:::checklist
- Agents run in a dev container, VM, cloud box, or separate user account
- Separate GitHub account or app for agents; fine-grained token with full repo permissions
- Hard spend limits set on every AI and cloud account
- Everything in Git; `main` protected by status checks; auto-merge allowed
- `~/.claude/settings.json`: `defaultMode` set to `auto` or `bypassPermissions`, plus `skipDangerousModePermissionPrompt`
- Claude Desktop: **Allow bypass permissions mode** on; Cowork: **Automatically approve**
- Every connector tool set to **Always allow**
- Cursor: **Run Everything** (or Auto-review with allow instructions)
- VS Code: `chat.tools.global.autoApprove` on, or Autopilot
- Codex `config.toml`: `approval_policy = "never"`, `sandbox_mode = "danger-full-access"`; Gemini alias with `--approval-mode=yolo`
- n8n: API key, instance-level MCP on, workflows enabled for MCP; `NODES_EXCLUDE="[]"` if self-hosted
- Notion: MCP connected; API connection with all capabilities and top-level pages shared
- Unattended runs have `--max-turns` and `--max-budget-usd` limits
- Cursor CLI, Copilot CLI, Devin CLI, and Aider aliases set for hands-off runs
- Notifications reach my phone when an agent needs me or finishes
- I know every kill switch, and revoking a key stops the agent
:::

# Glossary {.unnumbered}

:::glossary
Allowlist
: A list of pre-approved actions an agent may take without asking.

Auto mode
: Claude Code's permission mode in which a classifier reviews actions instead of a person.

Bypass permissions
: A mode that skips approval prompts entirely (`--dangerously-skip-permissions` in Claude Code).

Classifier
: A second AI model that judges whether an agent's action is safe and matches the request.

Containment
: Limiting what an agent can reach (a container, separate accounts, budgets) instead of limiting what it may do.

Critical path
: A folder, such as the root, your home folder, or the working directory, that Claude Code protects from deletion in every mode.

Dev container
: A Docker container configured as a development environment, used to isolate agents.

Fine-grained token
: A GitHub access token limited to chosen repositories and permissions.

Headless / print mode
: Running an agent non-interactively from a script, such as `claude -p`.

Prompt injection
: Instructions hidden in content an agent reads, meant to hijack its behavior.

Ruleset
: GitHub settings that protect branches, with an optional bypass list.

Sandbox
: An isolated environment limiting the files and network a command can reach.

Sudo mode
: GitHub's re-authentication step for sensitive actions in the web interface.

YOLO mode
: Informal name for fully automatic approval in tools like Gemini CLI, Codex, and Copilot CLI.

ACU
: Agent Compute Unit, the usage unit Devin bills in.

Agent
: An AI model that takes actions, such as editing files and running commands, not just answering.

Agent SDK
: Anthropic's library for building your own programs on Claude Code's engine.

API key
: A secret string that lets a program use a service's API and bills to your account.

Approval policy
: Codex's setting for when it pauses to ask (`on-request` or `never`).

Approve for me
: Codex's mode in which an automatic reviewer answers approval requests.

Auto-review
: Cursor's Run Mode in which a classifier checks calls that aren't allowlisted.

Autopilot
: A mode in VS Code and Copilot CLI that keeps working until the task is complete.

Background agent
: An agent session that keeps running after you close the terminal (`claude --bg`).

Checkpoint
: A saved snapshot you can roll back to after an agent's changes.

Cloud agent
: An agent that runs on the vendor's machines instead of your computer.

Cron
: The Linux and macOS scheduler that runs commands on a timetable.

Deny rule
: A rule that blocks a specific action, even in bypass mode.

Docker
: Software that runs disposable, isolated containers.

Environment variable
: A named value your shell passes to programs, often used for tokens.

Folder trust
: A one-time question about whether a tool may fully run in a folder.

GitHub Action
: A workflow that runs automatically on GitHub's servers when something happens in a repository.

GitHub App
: An integration installed on chosen repositories that acts under its own name with short-lived tokens.

Hook
: A command an agent tool runs automatically at a set moment, such as before each tool call.

Kill switch
: A fast way to stop an agent, such as revoking its token.

Machine user
: A separate GitHub account used only for automation.

MCP
: Model Context Protocol, a standard way for agents to use outside tools.

MicroVM
: A small, fast-starting virtual machine.

Network allowlist
: A list of websites an agent's commands may reach; all others are blocked.

Non-root user
: An ordinary account without administrator powers.

OpenTelemetry
: A standard format for sending usage metrics and logs to monitoring tools.

Permission mode
: A preset that decides which actions an agent may take without asking.

Permission prompt
: A pause in which the agent asks you to approve an action.

Policy engine
: Gemini CLI's system of TOML rule files that allow, deny, or ask about tools.

Profile (Codex)
: An extra config file layered on top of `config.toml` with `--profile`.

Protected path
: A file or folder, such as `.git`, that tools guard from automatic writes.

Routine
: A saved Claude Code task that runs in Anthropic's cloud on a schedule, an API call, or a GitHub event.

Sandbox runtime
: Anthropic's package that wraps a whole process, such as Claude Code, in OS isolation.

Scope
: A permission attached to a token, such as "write to repositories".

Spend limit
: A hard cap on how much an account can spend.

Subagent
: A helper agent started by the main agent for part of a task.

tmux
: A terminal program that keeps sessions running after you disconnect.

Token
: A secret string that lets a program act as an account.

Turbo mode
: Devin Desktop's auto-execution level that runs every command except deny-listed ones.

Virtual machine
: A whole simulated computer with its own operating system.

Worktree
: An extra working folder for the same git repository, on its own branch.
:::
