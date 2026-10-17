
# Copy-Paste Config Files

Every file in this chapter is a complete starting point for maximum autonomy. Copy it, adjust paths and names, and save. Each assumes the agent runs inside a box from Chapter 2.

## Claude Code

```json title=~/.claude/settings.json
{
  "permissions": {
    "defaultMode": "bypassPermissions",
    "deny": ["Bash(git push --force *)", "Read(~/.ssh/**)"]
  },
  "skipDangerousModePermissionPrompt": true,
  "enableAllProjectMcpServers": true,
  "sandbox": { "enabled": false },
  "env": { "CLAUDE_CODE_DISABLE_DANGEROUS_RM_TIMEOUT": "1" }
}
```

For your laptop, swap `bypassPermissions` for `auto` and set `"sandbox": { "enabled": true, "failIfUnavailable": true }`.

## Codex

```toml title=~/.codex/config.toml
approval_policy = "never"
sandbox_mode = "danger-full-access"
web_search = "live"
notify = ["/home/me/bin/ping-phone.sh", "Codex done"]

[projects."/work"]
trust_level = "trusted"
```

## Gemini CLI

```json title=~/.gemini/settings.json
{
  "general": {
    "defaultApprovalMode": "auto_edit",
    "checkpointing": { "enabled": true }
  },
  "security": { "enablePermanentToolApproval": true },
  "tools": { "sandbox": "docker" }
}
```

```bash title=~/.zshrc
alias gem='gemini --approval-mode=yolo --sandbox'
```

## VS Code and Copilot

```json title=VS Code settings.json
{
  "chat.tools.global.autoApprove": true,
  "chat.autopilot.advanced.enabled": true,
  "claudeCode.initialPermissionMode": "bypassPermissions"
}
```

```bash title=~/.zshrc
alias cop='copilot --yolo --no-ask-user'
```

## Cursor CLI

```json title=~/.cursor/cli-config.json
{
  "permissions": {
    "allow": ["Shell(*)", "Read(**)", "Write(**)", "WebFetch(*)", "Mcp(*:*)"],
    "deny": ["Write(**/.env*)"]
  }
}
```

## Devin CLI

```json title=~/.config/devin/config.json
{
  "permissions": {
    "allow": ["Read(**)", "Exec(git)", "Exec(npm)", "Exec(pnpm)"],
    "deny": ["Exec(sudo)"]
  }
}
```

```bash title=~/.zshrc
alias dv='devin --permission-mode bypass'
```

## Aider

```yaml title=~/.aider.conf.yml
yes-always: true
auto-commits: true
auto-test: true
test-cmd: npm test
```

## Goose

```bash title=~/.zshrc
export GOOSE_MODE=auto
export GOOSE_MAX_TURNS=200
```

## A dev container for any agent

```json title=.devcontainer/devcontainer.json
{
  "image": "mcr.microsoft.com/devcontainers/javascript-node:22",
  "remoteUser": "node",
  "features": {
    "ghcr.io/anthropics/devcontainer-features/claude-code:1.0": {}
  },
  "mounts": [
    "source=agent-home-${devcontainerId},target=/home/node/.claude,type=volume"
  ],
  "containerEnv": {
    "CLAUDE_CONFIG_DIR": "/home/node/.claude",
    "DISABLE_AUTOUPDATER": "1"
  },
  "postCreateCommand": "npm install -g @openai/codex @google/gemini-cli"
}
```

> [!TIP]
> Commit the dev container to your repository, but never commit keys. Pass them in from your host environment or as Codespaces secrets.
