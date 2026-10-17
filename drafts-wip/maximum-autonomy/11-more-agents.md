
# More Coding Agents

The big names aren't the only agents worth running hands-off. This chapter covers the rest of the current field, from Cognition's Devin family to open-source tools you can run anywhere.

:::summary In this chapter
- Devin Desktop (formerly Windsurf), Devin CLI, and Devin in the cloud
- Cline's Auto Approve and YOLO mode, in the editor and the CLI
- Aider, OpenHands, and Goose: open-source terminal agents
- Browser app builders
- Tools that are gone or that we couldn't verify
:::

## Devin Desktop (formerly Windsurf)

Cognition's editor, long known as **Windsurf**, now appears in its docs as **Devin Desktop**, with the **Cascade** agent inside it. Cascade's terminal commands follow one of four **auto-execution levels**, chosen in the **Devin Settings** panel in the bottom-right corner of the editor:

| Level | Behavior |
|---|---|
| **Disabled** | Every command needs approval |
| **Allowlist Only** | Only allow-listed commands run |
| **Auto** | The agent judges safety; risky commands ask (premium models only) |
| **Turbo** | Everything runs, except your deny list |

**Turbo** is the maximum. Build your lists from the command cards: when Cascade waits for approval, open the dropdown next to **Run** and choose **Prefix** (auto-run every command starting the same way, like `git *`), **Allow** (that exact command), or **Deny**.

> [!NOTE]
> On Teams and Enterprise, admins can cap the maximum level (for example at Auto, which hides Turbo) and add team-wide lists in **Admin Portal › Team Settings › Terminal Commands › Manage Lists**. A team deny list always wins.

The **Devin Local** agent inside the editor uses the Devin CLI permission model below instead.

## Devin CLI

The **Devin CLI** is Cognition's terminal agent. It has five permission modes:

| Mode | Shell and fetch | File edits |
|---|---|---|
| **Normal** | Ask | Ask |
| **Accept Edits** | Ask | Auto in the workspace |
| **Smart** | Auto when a fast model judges them safe | Auto in the workspace |
| **Bypass** | Auto | Auto |
| **Autonomous** (with `--sandbox`) | Auto, contained by the OS sandbox | Ask |

```bash
devin --permission-mode bypass
```

Inside a session, `/bypass` (aliases `/yolo`, `/dangerous`) or `/mode bypass` switches over; `DEVIN_PERMISSION_MODE=smart devin` sets the mode from the environment. `devin -p "prompt"` runs once and prints the answer.

Rules live in `~/.config/devin/config.json` (you), `.devin/config.json` (the project, committed), and `.devin/config.local.json` (you, in this project, git-ignored):

```json title=~/.config/devin/config.json
{
  "permissions": {
    "allow": ["Read(**)", "Exec(git)", "Exec(npm run)"],
    "deny": ["Exec(sudo)"]
  }
}
```

Organization deny and ask rules stay active in Smart, Bypass, and Autonomous modes.

## Devin (cloud)

Cloud **Devin** sessions run in Cognition's VMs and already work without step-by-step approvals. Your levers are what it can reach and what it can spend: **Secrets** (organization, personal, repo, or session), **Security Profiles** that restrict network, MCP, git, and GitHub CLI access, and **ACU limits** (Devin's usage units) per organization and per user on Enterprise.

## Cline

**Cline** is an open-source agent for VS Code and JetBrains, with a CLI.

| Auto Approve setting | Allows |
|---|---|
| Read project files / Read all files | Reads inside / outside the workspace |
| Edit project files / Edit all files | Edits inside / outside the workspace |
| Execute safe commands / Execute all commands | Commands the model marks safe / all commands |
| Use the browser | Web fetching and searching |
| Use MCP servers | MCP tools and resources |

The "all" options only extend their base toggle, so turn both on. For everything at once, open **Cline Settings**, then **Features**, and tick **YOLO Mode**: file changes anywhere, all commands, browser actions, MCP tools, and Plan-to-Act switches are approved.

The **Cline CLI** starts in act mode with auto-approve on by default (`--auto-approve` defaults to `true`). `cline "your task" --json` gives machine-readable output, and `cline` supports cron scheduling for recurring jobs.

## Aider

**Aider** is a long-standing open-source terminal pair programmer. It edits files directly and commits each change to git automatically (`--auto-commits` is on by default), which makes rollback easy.

```bash
aider --yes-always --auto-test --test-cmd "npm test" \
  --message "Add input validation to the signup form"
```

| Option | Meaning |
|---|---|
| `--yes-always` (env `AIDER_YES_ALWAYS`) | Say yes to every confirmation |
| `--message "…"` | Send one message, apply the reply, exit |
| `--auto-test` + `--test-cmd` | Run tests after each change |
| `--no-suggest-shell-commands` | Stop it proposing shell commands at all |

Put defaults in `.aider.conf.yml` in your repo root or home folder.

## OpenHands

**OpenHands** is an open-source agent platform with a CLI, a web GUI, and a cloud service. It runs code in a sandbox (Docker by default).

| Command | Behavior |
|---|---|
| `openhands` | Asks before actions (default) |
| `openhands --llm-approve` | An AI reviews actions |
| `openhands --always-approve` | Runs everything |
| `openhands --headless -t "task"` | No UI; always runs in always-approve mode |

Add `--json` in headless mode for one JSON event per line, or `-f task.txt` to read the task from a file.

## Goose

**Goose** is an open-source agent (desktop app and CLI) whose default mode is already **Completely Autonomous**.

| Mode | `/mode` command | Behavior |
|---|---|---|
| Completely Autonomous | `/mode auto` | No approvals (default) |
| Smart Approval | `/mode smart_approve` | Low-risk actions run; others ask |
| Manual Approval | `/mode approve` | Asks before tools |
| Chat Only | `/mode chat` | No tools |

Set the default with `GOOSE_MODE=auto` or in **Settings › Chat › Default Mode** in the desktop app. `goose run -t "instructions"` runs a task and exits; `GOOSE_MAX_TURNS` caps how long it can go without input (default 1000).

## Browser app builders

| Tool | Max-autonomy setting |
|---|---|
| **Replit Agent** | In the Agent's tools panel, set **Autonomy Level** to **Max** for long, unsupervised runs (labeled beta) |
| **Lovable, Bolt, v0, Base44** | They act without per-step approvals already. Give them a connected GitHub repo and backend, and let them run; review via version history |

## Gone, or check for yourself

- **Roo Code** was shut down on May 15, according to the notice in its repository README. Its README points users to Cline and to ZooCode, a community fork. Remove it from unattended setups.
- **Amp** (Sourcegraph's agent) and **Jules** (Google's asynchronous coding agent) are still offered, but we couldn't confirm their current approval settings for this edition. Both run largely without step-by-step prompts; check their docs for the exact switches before relying on them.

:::checklist
- Devin Desktop at Turbo, with a deny list, only inside a box
- Devin CLI started with `--permission-mode bypass` or `smart`
- Cline: base toggles plus "all" options, or YOLO Mode
- Aider aliased with `--yes-always`
- Any Roo Code setups migrated
:::
