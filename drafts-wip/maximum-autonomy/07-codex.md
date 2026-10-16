
# OpenAI Codex

**Codex** is OpenAI's coding agent. It comes as a command-line tool (the Codex CLI), an IDE extension for VS Code and similar editors, part of the ChatGPT desktop app, and **Codex Cloud**, which runs tasks on OpenAI's machines. They share one settings file: `~/.codex/config.toml`.

:::summary In this chapter
- Codex's two controls: the sandbox and the approval policy
- The four permission modes in the app, IDE, and CLI
- Every flag and `config.toml` key for hands-off work
- `codex exec` for scripts and CI, and the Codex GitHub Action
- Codex Cloud environments and internet access
- What still prompts or pauses
:::

## Two controls that work together

Codex separates *what it can reach* from *when it asks*:

| Control | Question it answers | Values |
|---|---|---|
| **Sandbox mode** (`sandbox_mode`, `--sandbox`) | What can commands touch? | `read-only`, `workspace-write`, `danger-full-access` |
| **Approval policy** (`approval_policy`, `--ask-for-approval`) | When does Codex pause? | `on-request`, `never`, or a `granular` table |
| **Reviewer** (`approvals_reviewer`) | Who answers a pause? | `user` or `auto_review` |

Changing who reviews a request never widens the sandbox. That's the key idea: you can make Codex prompt-free *inside* a tight sandbox, or remove the sandbox entirely.

## The permission modes

In the ChatGPT desktop app and the IDE extension, open the permissions control below the message box. In the CLI, type `/permissions`.

| Mode | Sandbox | Approvals | Asks you |
|---|---|---|---|
| **Ask for approval** | `workspace-write` | `on-request`, you review | To edit outside the workspace or use the internet |
| **Approve for me** | `workspace-write` | `on-request`, `auto_review` | Only for actions flagged as potentially unsafe |
| **Full access** | `danger-full-access` | `never` | Never |
| **Custom** | From `config.toml` | From `config.toml` | Depends |

**Approve for me** is Codex's Level 3: a reviewer agent checks each action that would otherwise need approval, looking for data exfiltration, credential probing, persistent security weakening, and destructive actions. Low- and medium-risk actions go ahead; critical-risk actions are denied. It uses extra model calls, so it adds to your usage.

## Level 3 from the command line

```bash
codex --approve-for-me
```

`--approve-for-me` (alias `--not-so-yolo`) means `workspace-write` plus `on-request` plus the automatic reviewer. The same in `config.toml`:

```toml title=~/.codex/config.toml
sandbox_mode = "workspace-write"
approval_policy = "on-request"
approvals_reviewer = "auto_review"

[sandbox_workspace_write]
network_access = true
```

By default `workspace-write` has **no network** for commands. `network_access = true` lets `npm install` and friends work without asking.

## Level 4: no prompts, no sandbox

**One session:**

```bash
codex --yolo
```

`--yolo` is the alias of `--dangerously-bypass-approvals-and-sandbox`: every command runs with no approvals and no sandbox. **Make it the default:**

```toml title=~/.codex/config.toml
approval_policy = "never"
sandbox_mode = "danger-full-access"
```

In the Codex app and IDE extension, choose **Full access** from the permissions menu.

**A middle ground:** `approval_policy = "never"` with `sandbox_mode = "workspace-write"` never asks, and simply refuses anything the sandbox doesn't allow. That's ideal when you want zero prompts but still want Codex walled into the project.

> [!WARNING]
> **`--full-auto` is no longer supported**, and neither is `approval_policy = "untrusted"`. Old scripts and blog posts still use them. Replace `--full-auto` with `--sandbox workspace-write` (plus `-a never` if you want no prompts) or with `--approve-for-me`.

## Every flag that matters

| Flag | Meaning |
|---|---|
| `-s`, `--sandbox <mode>` | `read-only`, `workspace-write`, or `danger-full-access` |
| `-a`, `--ask-for-approval <policy>` | `on-request` or `never` |
| `--approve-for-me` | Auto-review preset |
| `--yolo` | No approvals, no sandbox |
| `--add-dir <path>` | Another writable folder (repeatable) |
| `-C`, `--cd <path>` | Working folder |
| `-c key=value` | Override any config key for this run |
| `-p`, `--profile <name>` | Layer `$CODEX_HOME/<name>.config.toml` on top |
| `--search` | Live web search instead of the cached index |

## Profiles: one file per autonomy level

A **profile** is a small extra config file layered on top of your main one. Keep one for each level you use:

```toml title=~/.codex/yolo.config.toml
approval_policy = "never"
sandbox_mode = "danger-full-access"
```

```toml title=~/.codex/walled.config.toml
approval_policy = "never"
sandbox_mode = "workspace-write"

[sandbox_workspace_write]
network_access = true
writable_roots = ["/tmp/build"]
```

Then run `codex -p yolo` inside a container, or `codex -p walled` on your laptop.

## Trust your projects

Codex starts in `read-only` until you trust a folder, and skips a project's own `.codex/` settings in untrusted folders. Trust a project once:

```toml title=~/.codex/config.toml
[projects."/home/me/code/my-app"]
trust_level = "trusted"
```

## MCP servers without prompts

Each MCP server (and each of its tools) can have its own approval mode: `auto`, `prompt`, `writes` (prompt only for tools not marked read-only), or `approve`.

```toml title=~/.codex/config.toml
[mcp_servers.github]
url = "https://api.githubcopilot.com/mcp/"
bearer_token_env_var = "GITHUB_PAT"
default_tools_approval_mode = "approve"
```

> [!NOTE]
> With an interactive approval policy, Codex still asks before app or MCP tools that advertise a **destructive** annotation. `approval_policy = "never"` removes those prompts too.

## Protected paths

Even in `workspace-write`, these stay read-only inside each writable root: `.git` (and the real git folder it points to), `.agents`, `.codex`, and `.aws`. Only `danger-full-access` lifts this.

## Scripts and CI: `codex exec`

`codex exec` (short form `codex e`) runs one task and exits. It streams progress to the error stream and prints only the final answer, so you can pipe it.

```bash
codex exec --sandbox workspace-write \
  -a never \
  --json \
  -o result.md \
  "Fix the failing tests"
```

| Flag | Meaning |
|---|---|
| `--json` | One JSON event per line (`thread.started`, `turn.completed`, …) |
| `-o`, `--output-last-message <file>` | Save the final answer |
| `--output-schema <file>` | Force the final answer to match a JSON Schema |
| `--ephemeral` | Don't save session files |
| `--skip-git-repo-check` | Run outside a git repository |
| `--ignore-user-config` | Don't load `~/.codex/config.toml` |
| `codex exec resume --last "…"` | Continue the previous run |

By default `codex exec` runs **read-only**. Give it `--sandbox workspace-write` to edit, or `--sandbox danger-full-access` (or `--yolo`) inside an isolated runner. In CI, pass the key only to that command: `CODEX_API_KEY=… codex exec …`.

## The Codex GitHub Action

```yaml title=.github/workflows/codex.yml (excerpt)
- uses: openai/codex-action@v1
  with:
    openai-api-key: ${{ secrets.OPENAI_API_KEY }}
    prompt-file: .github/codex/prompts/review.md
    sandbox: workspace-write
```

The action starts a proxy so your key isn't exposed to repository code. Its `safety-strategy` defaults to `drop-sudo`, which removes `sudo` before Codex runs; `unprivileged-user` runs Codex as a named account; `unsafe` is required on Windows runners. Keep `drop-sudo` on shared runners.

## Codex Cloud

Codex Cloud runs tasks in isolated cloud workspaces, so work continues while your computer sleeps. Start on the web or in the desktop app with **Work in › Cloud** and a published **environment** (the saved setup: repositories, tools, and access).

:::steps Give a cloud environment internet access
1. **Open the environment** (or **Settings › Codex Cloud › Environments › Create environment**).
2. **Turn on "Allow Codex to access internet."**
3. **Choose Allow domains:** **Package managers** (npm, PyPI, crates, Go, Maven, apt, GitHub, and more), **Custom domains only**, or **All (unrestricted)**.
4. **Add hosts** under **Additional allowed domains** if needed, then save, test, and **Publish**.
:::

Store keys as **network secrets**: saving one adds its domains to the allowlist automatically. Your organization's **Agent Security** settings apply on top and can't be overridden from an environment.

## Notifications

Point `notify` at a program that runs when a turn completes, for chat webhooks or desktop alerts:

```toml title=~/.codex/config.toml
notify = ["python3", "/home/me/bin/codex-notify.py"]

[tui]
notifications = true
```

## What still asks or pauses in Codex

| Still happens | Why |
|---|---|
| Prompts to leave the sandbox, in `on-request` | Use `-a never` or Full access |
| Destructive MCP/app tools ask, in interactive policies | Use `approval_policy = "never"` |
| **Safety monitoring** can pause a task | Runs separately from approvals; in the CLI a paused task ends |
| Writes to `.git`, `.codex`, `.agents`, `.aws` | Protected unless `danger-full-access` |
| Untrusted folders start read-only | Trust the project |
| Admin **managed requirements** | Can disable modes or restrict reviewers |
| Cloud tasks can't reach a domain | Environment allowlist and Agent Security rules |

:::checklist
- `~/.codex/config.toml` sets the default level you want
- Profiles exist for "walled" and "yolo" runs
- Scripts no longer use `--full-auto`
- Projects you use are marked `trusted`
- CI passes the API key only to the `codex exec` step
- Cloud environments have the domains they need
:::
