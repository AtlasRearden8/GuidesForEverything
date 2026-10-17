
# Claude Code (Terminal)

Claude Code has the most complete autonomy controls of any tool. It runs in your terminal, in VS Code and JetBrains, in the Claude Desktop app, and in the cloud, and every one of those reads the same settings files.

:::summary In this chapter
- The six permission modes and what each lets through
- Where settings live and which files can set which modes
- Auto mode: the classifier, its default blocks, and how to tune it
- Bypass mode, protected paths, and critical paths
- Permission rules, hooks, and the full maximum-autonomy settings file
- What still prompts, no matter what
:::

## The settings files

- `~/.claude/settings.json`: **user** settings. Your machine-wide defaults.
- `.claude/settings.json` (project, shared with your team) and `.claude/settings.local.json` (project, just you).
- **Managed settings**, such as `/etc/claude-code/managed-settings.json` on Linux, set by an organization. These win over everything.
- `--settings <file or JSON>` on the command line, for one session.

> [!WARNING]
> `"defaultMode": "auto"` and `"defaultMode": "bypassPermissions"` are **ignored** in project files (`.claude/settings.json` and `.claude/settings.local.json`); this stops a cloned repository from switching your agent to bypass. Put them in `~/.claude/settings.json`, in managed settings, in a `--settings` file, or pass the flag.

## The six permission modes

| Mode | Runs without asking | Best for |
|---|---|---|
| `default` (**Manual**) | Reads only | Sensitive work |
| `acceptEdits` | Reads, edits, and `mkdir`, `touch`, `rm`, `mv`, `cp`, `sed` in your folders | Reviewing with `git diff` afterwards |
| `plan` | Reads (plus classifier-approved commands when auto is available) | Exploring before changing |
| `auto` | Everything, with background safety checks | Long tasks, hands-off work |
| `dontAsk` | Pre-approved tools only; anything else is denied | Locked-down CI |
| `bypassPermissions` | Everything | Containers and VMs only |

Press <kbd>Shift</kbd> + <kbd>Tab</kbd> during a session to cycle modes; the status bar shows the active one (for example `⏵⏵ auto mode on` or `⏵⏵ bypass permissions on`). Start in a mode with `claude --permission-mode <mode>`. `manual` is accepted as an alias for `default`.

> [!NOTE]
> **Deny rules block in every mode**, including bypass. **Allow rules have no effect in bypass**, which already allows everything. That makes deny rules your one hard guardrail inside a fully open session.

## Level 3: auto mode by default

With Claude Code v2.1.283 or later, interactive terminal and VS Code sessions start in **auto mode** on every plan and provider, where a classifier model reviews risky actions instead of asking you. To make it explicit and permanent:

```json title=~/.claude/settings.json
{
  "permissions": {
    "defaultMode": "auto"
  }
}
```

Auto mode needs a supported model. On the Anthropic API that means Claude Opus 4.6 or later, Sonnet 4.6 or later, Haiku 5.5, or a Fable model. Team and Enterprise admins can switch it off with `permissions.disableAutoMode`.

### What the classifier blocks by default

The classifier trusts your working directory and the git remotes configured when the session started. Out of the box it blocks, among others:

:::compact
| Blocked | Example |
|---|---|
| Downloading and running code | `curl … | bash` |
| Sending sensitive data out | Posting secrets to an unknown site |
| Production deploys and migrations | `kubectl apply` on prod |
| Discarding uncommitted work | `git reset --hard`, `git clean -fd` |
| Force push | `git push --force` |
| Destroying infrastructure | `terraform destroy` |
| Merging an unapproved PR | `gh pr merge` with no human review |
| Granting permissions | IAM or repo-admin changes |
| Mass deletion on cloud storage | Emptying a bucket |
:::

### Reduce false alarms

- **Teach it your infrastructure.** Run `/auto-mode-setup` to draft `autoMode.environment` entries (trusted repos, buckets, domains, services) from your project and recent sessions, and save them.
- **Approve standing patterns.** Tell it in plain English *with specifics*: "you may force-push to branches starting with `agent/`" works; "you can force-push" clears nothing.
- **Write rules in settings.** `autoMode` takes plain-English arrays. Include `"$defaults"` to keep the built-in rules:

```json title=~/.claude/settings.json
{
  "autoMode": {
    "environment": [
      "$defaults",
      "github.com/my-org/* repositories are ours",
      "staging.example.com is a test environment"
    ],
    "allow": ["$defaults", "Force-push to branches named agent/*"],
    "soft_deny": ["$defaults", "Never run terraform apply"]
  }
}
```

- **Check the rules:** `claude auto-mode defaults` prints the built-in lists; `claude auto-mode config` shows your effective config.
- **See what was blocked:** `/permissions`, then the **Recently denied** tab. Press `r` to retry an action with a manual approval.

> [!NOTE]
> If the classifier blocks 3 actions in a row or 20 in total, auto mode pauses and asks you. These thresholds can't be changed. In `claude -p` runs with no prompt available, the blocked action is skipped and Claude keeps working.

> [!WARNING]
> Things you say ("don't push yet") are treated as boundaries, but they live only in the conversation. If context compaction removes that message, the boundary can be lost. For a hard guarantee, write a deny rule.

## Level 4: bypass permissions

**One session:**

```bash
claude --dangerously-skip-permissions
```

(Equivalent: `claude --permission-mode bypassPermissions`.) The first time, you accept a warning; Claude Code then records `"skipDangerousModePermissionPrompt": true` in `~/.claude/settings.json` so it doesn't ask again.

**Every session, by default:**

```json title=~/.claude/settings.json
{
  "permissions": {
    "defaultMode": "bypassPermissions"
  },
  "skipDangerousModePermissionPrompt": true
}
```

**Start in another mode but keep bypass one keypress away:** `claude --allow-dangerously-skip-permissions` adds bypass to the <kbd>Shift</kbd> + <kbd>Tab</kbd> cycle without starting in it. You can't switch *into* bypass from a session started without it enabled.

**A shell alias** for convenience:

```bash title=~/.zshrc or ~/.bashrc
alias yolo='claude --dangerously-skip-permissions'
```

> [!CAUTION]
> Bypass mode offers no protection against prompt injection. Anthropic's own warning: use it only in containers, VMs, or dev containers, ideally without open internet access.

## Protected paths

Some files are guarded because changing them could break your repository or quietly change Claude's own settings. Writes to them are never auto-approved except in bypass mode.

:::cols
- `.git`, `.config/git`
- `.vscode`, `.idea`
- `.husky`, `.cargo`, `.yarn`, `.mvn`
- `.devcontainer`, `.devcontainer.json`
- `.claude` (mostly)
- `.gitconfig`, `.gitmodules`
- Shell files: `.bashrc`, `.zshrc`, `.profile`…
- `.npmrc`, `.yarnrc`, `bunfig.toml`
- `.pre-commit-config.yaml`
- `.mcp.json`, `.claude.json`
:::

| Mode | Protected-path writes |
|---|---|
| `default`, `acceptEdits` | Prompted |
| `auto` | Sent to the classifier |
| `dontAsk` | Denied |
| `bypassPermissions` | Allowed |

Allow rules can't pre-approve these; the check runs first. When prompted for `.claude/`, the option **Yes, and allow Claude to edit files in this project's .claude folder for this session** saves you repeat prompts.

## Critical paths: the deletion circuit breaker

**Critical paths** are the filesystem root, your home folder, top-level system folders, and your working directory and its parents. No allow rule and no hook can approve `rm` or `rmdir` aimed at them.

| Mode | Critical-path `rm` |
|---|---|
| `default`, `acceptEdits`, `plan` | Asks you |
| `auto` | Asks in the terminal with a 2-minute countdown; denied elsewhere |
| `dontAsk` | Denied |
| `bypassPermissions` | Asks, with a 2-minute countdown in the terminal |

If the countdown runs out, the command is denied and Claude is told what to do instead, so an unattended session keeps working. After three unanswered countdowns, further critical-path removals are denied immediately. Setting `CLAUDE_CODE_DISABLE_DANGEROUS_RM_TIMEOUT=1` changes this: auto mode sends them to the classifier instead, and bypass shows the prompt with no time limit.

> [!TIP]
> Avoid the prompt entirely by deleting literal subfolders (`rm -rf ./build`) rather than the working directory itself, and ask agents in your CLAUDE.md to do the same.

## Permission rules

Rules live under `permissions` in any settings file, as `allow`, `ask`, and `deny` arrays. Each rule names a tool, optionally with a pattern in brackets:

| Rule | Matches |
|---|---|
| `Bash` | Every shell command |
| `Bash(npm test)` | Exactly `npm test` |
| `Bash(git push *)` | `git push` with any arguments |
| `Edit(src/**)` | Edits anywhere under `src` |
| `Read(//etc/**)` | Reads under the absolute path `/etc` |
| `WebFetch` | Every web fetch |
| `mcp__github__*` | Every tool from the `github` MCP server |

Precedence is deny, then ask, then allow. An MCP allow glob must name its server: `mcp__*` on its own is ignored in allow rules (it works in deny rules).

## Hooks: answer prompts with a script

A **hook** is a command Claude Code runs automatically at a set moment. Two events matter for autonomy:

- **`PreToolUse`** runs before every tool call and can return `"permissionDecision": "allow"`, `"deny"`, or `"ask"`.
- **`PermissionRequest`** runs only when Claude Code is about to ask you, and can answer on your behalf.

```json title=~/.claude/settings.json (excerpt)
{
  "hooks": {
    "PermissionRequest": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "~/.claude/approve.sh" }
        ]
      }
    ]
  }
}
```

The script reads the request as JSON on standard input and prints a decision:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PermissionRequest",
    "decision": { "behavior": "allow" }
  }
}
```

Deny and ask rules are still checked after a hook says allow, and a hook can never approve a critical-path deletion. In non-interactive sessions, a `PermissionRequest` that no hook answers is denied.

## A complete maximum-autonomy settings file

```json title=~/.claude/settings.json
{
  "permissions": {
    "defaultMode": "bypassPermissions",
    "allow": [
      "Bash", "Edit", "Write", "WebFetch", "WebSearch",
      "mcp__github__*", "mcp__notion__*"
    ],
    "deny": ["Bash(git push --force *)", "Read(~/.ssh/**)"],
    "additionalDirectories": ["~/projects"]
  },
  "skipDangerousModePermissionPrompt": true,
  "enableAllProjectMcpServers": true,
  "env": {
    "CLAUDE_CODE_DISABLE_DANGEROUS_RM_TIMEOUT": "1"
  }
}
```

What each line buys you:

| Setting | Effect |
|---|---|
| `defaultMode: bypassPermissions` | Every session starts with no prompts |
| `allow` rules | Useful when you drop into auto or manual mode: these tools stop asking. (No effect *in* bypass; broad rules like `Bash` are suspended while in auto mode.) |
| `deny` rules | Your hard guardrails, enforced even in bypass |
| `mcp__server__*` | Approves every tool from that MCP server |
| `additionalDirectories` | Lets Claude read and edit outside the folder you started in |
| `enableAllProjectMcpServers` | Auto-approves servers listed in projects' `.mcp.json` files |
| `CLAUDE_CODE_DISABLE_DANGEROUS_RM_TIMEOUT` | Removes the 2-minute countdown on critical deletions (the prompt itself stays) |

> [!TIP]
> Workspace trust: the first time you open a folder, Claude Code asks whether you trust it. Answer once per repository and it remembers. For automation, `-p` runs don't show the dialog, though project allow rules aren't applied there until a folder is trusted.

## Reduce prompts without bypass

If you'd rather stay in Manual or Accept-edits mode for some projects:

- `/fewer-permission-prompts` scans your history and proposes an allowlist.
- `/sandbox`, then **auto-allow**, runs shell commands inside an OS-level sandbox *without prompting* (macOS, Linux, WSL2).
- Answer prompts with **Yes, and don't ask again** to save rules automatically.
- In Manual or Accept-edits mode, a Bash prompt can offer **Yes, and switch to auto mode**.

```prompt
Look through my last week of Claude Code sessions in this project. List the
commands I approved by hand most often, then add safe ones to the allow list
in .claude/settings.local.json. Don't add anything that deletes, pushes, or
deploys. Show me the diff before saving.
```

## What still prompts in Claude Code, no matter what

| Still asks, even in bypass | Why / workaround |
|---|---|
| Tools matching an explicit **ask** rule | Remove the ask rule |
| `rm` / `rmdir` targeting a **critical path** | A deliberate circuit breaker; use literal subfolder paths |
| `AskUserQuestion` and MCP tools marked **requiresUserInteraction** | By design; they need an answer from a person |
| Connector tools your **organization** set to "ask" | Admin policy |
| Reads outside working directories if `blockReadsOutsideWorkingDirectories` is on | Leave it off, or add directories |
| Some cross-session messaging approvals | Only matters with several sessions messaging each other |
| `Remove-Item` on system paths or bare wildcards (PowerShell) | Denied outright in every mode |
| Sessions started with `--restricted` | Bypass is refused |
| **Cloud sessions** (claude.ai/code) | Bypass isn't offered; **Auto** is the maximum |

:::checklist
- `~/.claude/settings.json` sets `defaultMode` to `auto` or `bypassPermissions`
- Deny rules cover the few things you never want, even in bypass
- `/auto-mode-setup` has taught the classifier; bypass runs only in a box
:::
