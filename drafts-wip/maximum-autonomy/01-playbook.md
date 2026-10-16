
# The Autonomy Playbook

An **AI agent** is an AI model that doesn't just answer questions: it takes actions. It reads files, edits code, runs commands in a terminal, browses websites, and calls other services on your behalf. Every agent tool ships with a safety habit built in: before it does something that could cause harm, it stops and asks you. That pause is called a **permission prompt** (or an approval prompt).

Prompts are sensible defaults, but they get in the way of the thing that makes agents valuable: working while you do something else. This guide shows you, tool by tool, how to remove those pauses, and how to set up your computer and accounts so that removing them is a reasonable bet rather than a reckless one.

:::summary In this chapter
- The words you need: agent, prompt, mode, sandbox, token
- The four levels of agent autonomy
- "Contain, don't restrict": the principle behind this guide
- How to choose a level for each project
- The quick-start setup for each tool
:::

## A few words before we start

You'll meet these terms on almost every page. Each one is in the glossary at the back too.

| Term | Plain-English meaning |
|---|---|
| **Permission mode** | A preset that decides which actions ask first |
| **Allowlist** | A list of actions pre-approved to run without asking |
| **Deny rule** | A rule that blocks an action in every mode |
| **Sandbox** | A walled-off area that limits what files and websites a command can reach |
| **Token** | A long secret string that lets a program act as you on a service |
| **Headless** | Running an agent from a script, with no chat window |
| **Config file** | A text file (often JSON or TOML) where a tool keeps its settings |

> [!TIP]
> **JSON** and **TOML** are just two formats for settings files. JSON uses curly braces and quotes (`{"key": "value"}`); TOML uses `key = "value"` lines. You can edit both in any text editor. If a tool refuses to start after an edit, a missing comma or quote is the usual culprit.

## Four levels of autonomy

Every agent tool offers some version of these four levels:

| Level | What happens | Examples |
|---|---|---|
| **1. Ask** | The agent asks before most actions | Claude Code *Manual*, Cursor *Allowlist* with an empty list |
| **2. Allowlist** | Pre-approved actions run; everything else asks | Allow rules, terminal allowlists |
| **3. Classifier** | A second AI reviews each action and blocks only risky ones | Claude Code *Auto*, Cursor *Auto-review*, Codex *Approve for me* |
| **4. Bypass** | Everything runs. No checks except a few hard-coded ones | `--dangerously-skip-permissions`, Cursor *Run Everything*, Codex `--yolo` |

Level 3 gets you about 95% of the hands-off feel while still catching disasters. Level 4 is true maximum autonomy. This guide gives you both, so you can choose per tool and per project.

### What a classifier actually does

A **classifier** is a second, smaller AI model that looks at each action the main agent wants to take and answers one question: "Is this safe, and is it what the person asked for?" If yes, the action runs with no prompt. If no, it's blocked, and the agent is told to find another way. Classifiers are good at catching obvious disasters (deleting a database, sending secrets to a strange website) and at spotting **prompt injection**. They are not perfect, and every vendor says so.

## Contain, don't restrict

Prompts exist to stop an agent from damaging things that matter. You can get the same protection a better way: put the agent somewhere where **nothing it can reach matters too much**. Then you can safely turn the prompts off.

- **A disposable machine:** a container, a virtual machine, a cloud dev box, or a spare computer.
- **Separate accounts:** a dedicated GitHub account or bot for the agent, a separate Notion workspace or teamspace, a separate n8n instance.
- **Narrow-but-complete tokens:** full power *inside* the agent's projects, nothing outside them.
- **Budgets:** spending caps on every API and cloud account.
- **Backups and Git:** everything committed, everything restorable.

Chapter 2 shows how to set this up in an afternoon, and Chapter 3 covers tokens and money.

> [!IMPORTANT]
> The single biggest real-world risk of hands-off agents is **prompt injection**: instructions hidden in a web page, email, issue, or document that the agent reads and obeys. Containment limits the damage it can do. Bypass settings remove the last line of defense against it.

## Choose a level for each project

You don't need one setting for your whole life. Most people end up with a mix.

| Situation | Sensible level | Why |
|---|---|---|
| Throwaway prototype in a container | 4. Bypass | Nothing to lose |
| Your main project on your laptop | 3. Classifier | Speed, with a safety net |
| Scheduled job in CI | 2. Allowlist, or 4 inside the runner | Predictable, no human present |
| Anything touching production or money | 1. Ask, or 3 with deny rules | Mistakes are expensive |
| Agent that reads email or the web | 3. Classifier, in a box | Prompt injection is likely |

:::steps Decide in two minutes
1. **Ask what the agent can reach.** List the folders, accounts, and tokens available where it runs.
2. **Ask what the worst mistake would cost.** A deleted test folder is cheap; a leaked cloud key is not.
3. **Shrink the reach first.** Move the work into a container or give it a narrower token (Chapters 2 and 3).
4. **Then raise the level.** Once the worst case is cheap, pick Level 3 or 4.
:::

## Quick-start: maximum autonomy at a glance

| Tool | Hands-off with safety review | Full bypass |
|---|---|---|
| **Claude Code (CLI)** | `"defaultMode": "auto"` in `~/.claude/settings.json` | `claude --dangerously-skip-permissions` |
| **Claude Desktop, Code tab** | Mode selector, then **Auto** | Settings › Claude Code › **Allow bypass permissions mode**, then **Bypass permissions** |
| **Claude Cowork** | Mode selector, then **Automatically approve** | (no separate bypass) |
| **claude.ai connectors** | Each tool set to **Always allow** | (same) |
| **Cursor** | Approvals & Execution: **Auto-review** | Approvals & Execution: **Run Everything** |
| **Cursor CLI** | Allow rules in `cli-config.json` | `agent --force` (alias `--yolo`) |
| **VS Code + Copilot** | **Assisted permissions** (experimental) | **Allow all** / **Autopilot**, `chat.tools.global.autoApprove` |
| **Copilot CLI** | `/permissions assisted` | `copilot --yolo` (alias of `--allow-all`) |
| **OpenAI Codex** | `codex --approve-for-me` | `codex --yolo`, or `approval_policy = "never"` + `sandbox_mode = "danger-full-access"` |
| **Gemini CLI** | `--approval-mode=auto_edit` | `gemini --approval-mode=yolo` |
| **Devin Desktop (Windsurf)** | Auto-execution **Auto** | Auto-execution **Turbo** |
| **Devin CLI** | `--permission-mode smart` | `--permission-mode bypass` |
| **Cline** | Auto Approve toggles | Settings › Features › **YOLO Mode** |
| **Aider** | (asks only to confirm) | `aider --yes-always` |
| **OpenHands CLI** | `--llm-approve` | `--always-approve`, or `--headless` |
| **Goose** | `/mode smart_approve` | `GOOSE_MODE=auto` (the default) |
| **GitHub** | Bot account + fine-grained token | Broad token + Actions write permissions + auto-merge |
| **n8n** | Instance-level MCP + API key | Plus `NODES_EXCLUDE="[]"` on self-hosted |
| **Notion** | Notion MCP (OAuth) | Internal connection with all capabilities, shared at the top level |

:::checklist
- I know which projects get Level 3 and which get Level 4
- I know what my agent can reach where it runs
- I've read the prompt-injection warning and plan to contain agents that read the web or email
:::
