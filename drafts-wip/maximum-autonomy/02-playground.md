
# Build a Safe Playground

Fifteen minutes of setup here lets you run everything else in this guide at full throttle. The idea is simple: if the agent works inside a box, the worst it can do is wreck the box. You throw the box away and make a new one.

:::summary In this chapter
- The six kinds of "box" and how they compare
- A dev container step by step, with a working `devcontainer.json`
- Claude Code's built-in Bash sandbox and the sandbox runtime
- Plain Docker, virtual machines, and cloud sandboxes
- Network allowlists: deciding which websites the agent can reach
:::

## Pick your box

| Box | What it isolates | Needs Docker | Effort |
|---|---|---|---|
| **Built-in Bash sandbox** | Shell commands only | No | Minimal |
| **Sandbox runtime** | The whole agent process | No | Low |
| **Dev container** | A full dev environment | Yes | Medium |
| **Custom Docker container** | A full dev environment | Yes | Medium |
| **Virtual machine** | A whole operating system | No | High |
| **Cloud session** | A whole OS, hosted for you | No | None |

The first two run on your own computer with operating-system guardrails. The rest put the agent inside something separate. For bypass mode, Anthropic's guidance is clear: always use a container, a VM, or the sandbox runtime, so that file tools, plugins, and MCP servers are inside the boundary too.

> [!WARNING]
> No box is perfect. If the agent can reach the internet, it can still leak whatever it can read. If your project folder is mounted writable, the agent can still change that code. Isolation shrinks the damage; it doesn't erase it.

## Option 1: a dev container (recommended for coding agents)

A **dev container** is a Docker container configured as a complete development environment. **Docker** is a free program that runs lightweight, disposable "mini-computers" called **containers**. Anthropic publishes a reference dev container for Claude Code that runs as a **non-root user** (an ordinary account, not the all-powerful administrator) with a network firewall, which is exactly the setup bypass mode is designed for.

:::steps Run agents in a dev container
1. **Install Docker Desktop** (docker.com) and **VS Code** with the **Dev Containers** extension.
2. **Add a `.devcontainer/` folder** to your project with the file below.
3. **Open the project in the container.** Command Palette (<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> or <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>), then **Dev Containers: Rebuild Container**.
4. **Sign in.** Open a terminal in the container and run `claude`.
5. **Run your agent in bypass mode.** If it goes wrong, rebuild the container; your host machine is untouched.
:::

The smallest working file uses Anthropic's **Dev Container Feature**, an add-on that installs Claude Code into any image:

```json title=.devcontainer/devcontainer.json
{
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
  "features": {
    "ghcr.io/anthropics/devcontainer-features/claude-code:1.0": {}
  }
}
```

The `:1.0` pins the installer script, not Claude Code itself; the feature installs the latest release.

### Keep your sign-in across rebuilds

By default, a rebuild wipes the container's home folder, so you'd sign in every time. Store Claude Code's config folder in a Docker **volume** (a storage area that survives rebuilds). For a container whose user is `node`:

```json title=devcontainer.json (excerpt)
"mounts": [
  "source=claude-code-config,target=/home/node/.claude,type=volume"
],
"containerEnv": {
  "CLAUDE_CONFIG_DIR": "/home/node/.claude"
}
```

Want one volume per project? Put `${devcontainerId}` in the source name, as Anthropic's reference configuration does: `source=claude-code-config-${devcontainerId}`.

### Lock the network

The reference container (in the `anthropics/claude-code` repository, folder `.devcontainer`) includes `init-firewall.sh`, a script that limits outbound traffic to the destinations it allows. A firewall inside a container needs extra permissions, so the reference adds the `NET_ADMIN` and `NET_RAW` capabilities through `runArgs`.

### Stop the container changing under you

```json title=devcontainer.json (excerpt)
"containerEnv": {
  "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
  "DISABLE_AUTOUPDATER": "1"
}
```

The first line turns off telemetry and error reporting (and features like Remote Control that need it); the second stops Claude Code updating itself. To pin a version, install with `npm install -g @anthropic-ai/claude-code@X.Y.Z` in a Dockerfile instead of using the feature.

> [!NOTE]
> On Linux and macOS, Claude Code refuses `--dangerously-skip-permissions` when run as **root** or with `sudo`, except inside a recognized sandbox. Dev containers and a normal user account both satisfy this. Check that `remoteUser` in your dev container is a non-root account.

### Codespaces works too

**GitHub Codespaces** runs dev containers in the cloud. Store `ANTHROPIC_API_KEY`, or a `CLAUDE_CODE_OAUTH_TOKEN` made with `claude setup-token`, as a Codespaces secret so sign-in carries across codespaces.

## Option 2: Claude Code's built-in Bash sandbox

You don't always need Docker. Claude Code can wrap every shell command in an operating-system sandbox: **Seatbelt** on macOS and **bubblewrap** on Linux and WSL2 (Windows' Linux layer). On Linux, install `bubblewrap` and `socat` first.

Run `/sandbox` inside Claude Code and choose **auto-allow**, or set it in a file:

```json title=~/.claude/settings.json
{
  "sandbox": {
    "enabled": true,
    "autoAllowBashIfSandboxed": true,
    "failIfUnavailable": true,
    "filesystem": {
      "allowWrite": ["/tmp/build"],
      "denyRead": ["~/.aws/credentials"]
    },
    "network": {
      "allowedDomains": ["github.com", "*.npmjs.org"]
    }
  }
}
```

| Key | What it does |
|---|---|
| `enabled` | Sandboxes Bash commands |
| `autoAllowBashIfSandboxed` | Sandboxed commands run with no prompt (default `true`) |
| `failIfUnavailable` | Refuse to start if the sandbox can't load, instead of running unsandboxed |
| `filesystem.allowWrite` / `denyRead` | Extra writable paths; paths hidden from commands |
| `network.allowedDomains` | Websites sandboxed commands may reach |
| `excludedCommands` | Commands that run outside, such as `"docker *"` |

> [!TIP]
> Without `failIfUnavailable`, a missing dependency silently means "no sandbox." Turn it on whenever you rely on the sandbox for safety.

## Option 3: the sandbox runtime

The Bash sandbox only covers shell commands; file edits and MCP servers still run on your host. Anthropic's **sandbox runtime** (the npm package `@anthropic-ai/sandbox-runtime`) wraps the *whole* Claude Code process in the same isolation.

:::steps Launch Claude Code inside the runtime
1. **Install the Linux packages** `bubblewrap`, `socat`, and `ripgrep` (macOS needs nothing extra).
2. **Write `~/.srt-settings.json`.** Allow writes to your project, `~/.claude`, `~/.claude.json`, and `/tmp` (`/private/tmp` on macOS). Allow the domains `api.anthropic.com`, `claude.ai`, and `platform.claude.com`. The package README documents the exact format.
3. **Create the config paths on Linux:** `mkdir -p ~/.claude && { [ -f ~/.claude.json ] || echo '{}' > ~/.claude.json; }`
4. **Launch it:** `npx @anthropic-ai/sandbox-runtime claude`
:::

The runtime denies network access by default and refuses to start if your settings file is invalid. It also blocks writes to `.git/hooks`, `.git/config`, `.mcp.json`, and shell startup files on its own.

> [!CAUTION]
> If `~/.srt-settings.json` doesn't exist, the runtime still starts, with everything locked down. A clean start is not proof your settings loaded. Check that the agent can reach what it needs before you walk away.

## Option 4: a plain Docker container

If you'd rather not use VS Code, run any agent in a throwaway container from the terminal. This mounts only the current project:

```bash
docker run --rm -it \
  --user 1000:1000 \
  -v "$PWD":/work -w /work \
  -e ANTHROPIC_API_KEY \
  node:22 bash
```

| Flag | Meaning |
|---|---|
| `--rm` | Delete the container when you exit |
| `-it` | Interactive terminal |
| `--user 1000:1000` | Run as a normal user, not root |
| `-v "$PWD":/work` | Share only this folder with the container |
| `-e ANTHROPIC_API_KEY` | Pass your key in from the host environment |

Inside, install your agent with npm and run it in bypass mode. Add `--network none` to cut the internet entirely (the agent then can't reach its own model API, so this suits offline tools only), or use a firewall script like Anthropic's for an allowlist.

## Option 5: a virtual machine or spare computer

A **virtual machine (VM)** is a whole simulated computer with its own operating system. It's the strongest separation you can get at home. Options include a small cloud server, a local hypervisor (UTM, Parallels, VirtualBox, Hyper-V), or a spare laptop.

**Docker Sandboxes** (docs.docker.com/ai/sandboxes) is a free Docker product that gives each agent a **microVM**, a tiny fast-starting VM, with its own Docker daemon and workspace sync. Anthropic's docs list it as a way to run Claude Code isolated on any host.

## Option 6: cloud sessions

Several vendors run the agent on *their* machines:

| Service | Where it runs | Network control |
|---|---|---|
| Claude Code cloud sessions (claude.ai/code) | Anthropic-managed VM | None / Trusted / Full / Custom |
| Codex Cloud | OpenAI-managed workspace | Off, Package managers, Custom, All |
| Copilot cloud agent | GitHub Actions runner | Firewall with allowlist |
| Cursor Cloud Agents | Cursor-managed VM | Allow all / Default + allowlist / Allowlist only |
| Devin | Cognition-managed VM | Security profiles |

These are the easiest "box" of all: the agent can't touch your laptop. The trade-off is that cloud sessions often cap autonomy (Claude Code's cloud sessions don't offer bypass, for example) and they can only see what you push to GitHub.

## Network allowlists: who can the agent talk to?

A **network allowlist** is a list of websites (domains) the agent's commands may reach; everything else is blocked. It's the best single defense against data being smuggled out after a prompt injection.

A good starting list for a coding agent:

:::cols
- Your model API (e.g. `api.anthropic.com`)
- `github.com` and `codeload.github.com`
- `registry.npmjs.org`
- `pypi.org`, `files.pythonhosted.org`
- `crates.io`, `proxy.golang.org`
- Your own company's API domains
:::

Add domains only when a task fails because one is blocked. Each tool's chapter shows where its allowlist lives.

## Option 7: a separate user account on your computer

Create a second user account on your Mac or PC just for agents. Your personal files, browser logins, password manager, and SSH keys stay out of reach. It's not as strong as a VM, but it costs nothing and takes five minutes.

## Troubleshooting the box

| Problem | Fix |
|---|---|
| "cannot be used with root/sudo privileges" | Set a non-root `remoteUser`, or run Docker with `--user` |
| Sign-in lost on every rebuild | Mount a volume at `~/.claude` and set `CLAUDE_CONFIG_DIR` |
| Bash sandbox silently off on Linux | Install `bubblewrap` and `socat`; set `failIfUnavailable` |
| Bubblewrap fails inside Docker | Set `sandbox.enableWeakerNestedSandbox` to `true` |
| `npm install` fails in the box | Add the registry to the network allowlist |

:::checklist
- I've picked a box for each project that will run in bypass mode
- The agent runs as a non-root user, and the network is limited to an allowlist
- I can throw the box away and rebuild it in minutes, sign-in included
:::
