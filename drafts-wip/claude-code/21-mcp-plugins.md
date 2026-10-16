# MCP Servers: Connect Other Apps

**MCP** (Model Context Protocol) is an open standard that lets AI tools plug into other software. An **MCP server** is a small connector that gives Claude new abilities, such as reading your Notion pages or creating GitHub issues. (This series has a whole manual on MCP.)

:::summary In this chapter
- Adding remote and local MCP servers
- Scopes: just you, this project, or everywhere
- Signing in, checking status, and removing servers
- Two worked examples, and staying safe
:::

## Add a remote server

Most modern services offer a **remote** server: a web address. Add one like this:

```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

Then type `/mcp` inside Claude Code, select the server, and sign in through your browser. Some servers use a token in a header instead:

```bash
claude mcp add --transport http secure-api https://api.example.com/mcp \
  --header "Authorization: Bearer your-token"
```

## Add a local server

Some servers run as a program on your own computer (a **local** or **stdio** server). Everything after the `--` is the command that starts it:

```bash
claude mcp add --env API_KEY=your-key myserver -- npx -y @example/mcp-server
```

## Choose a scope

| Scope | Flag | Loads in | Stored in |
|---|---|---|---|
| Local (default) | `--scope local` | This project, just you | `~/.claude.json` |
| Project | `--scope project` | This project, whole team | `.mcp.json` in the project (commit it) |
| User | `--scope user` | All your projects | `~/.claude.json` |

A project `.mcp.json` file looks like this. `${VAR}` reads an environment variable, so secrets stay out of Git:

```json title=.mcp.json
{
  "mcpServers": {
    "shared-server": {
      "type": "http",
      "url": "https://example.com/mcp",
      "headers": { "Authorization": "Bearer ${SHARED_TOKEN}" }
    }
  }
}
```

## Manage servers

| Command | What it does |
|---|---|
| `claude mcp list` | List servers and whether they're connected |
| `claude mcp get <name>` | Show details for one server |
| `claude mcp remove <name>` | Remove a server |
| `claude mcp login <name>` | Sign in without opening `/mcp` |
| `/mcp` | Status, sign-in, enable, disable, reconnect |
| `/mcp reconnect all` | Retry every failed server |

## Worked example: GitHub

```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp/ \
  --header "Authorization: Bearer YOUR_GITHUB_PAT"
```

Replace `YOUR_GITHUB_PAT` with a GitHub personal access token. Then try "Show me all open PRs assigned to me" or "Create an issue for the bug we just found." (If you have the `gh` tool installed, Claude can use it directly too, which uses less context.)

## Worked example: a database, read-only

```bash
claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
  --dsn "postgresql://readonly:pass@localhost:5432/shop"
```

Use a database user that can only read. Then ask "What were total sales this month?"

## Prompts and context cost

- MCP servers can add slash commands from their **prompts**, such as `/mcp__github__pr_review 456` (Chapter 10).
- Tools load on demand, so only their names use context until Claude needs one. Still, disable servers you don't use with `/mcp`.

> [!WARNING]
> Only install MCP servers you trust. A server can see what Claude sends it and can return text that tries to trick Claude. Prefer official servers published by the company whose product you're connecting.

:::checklist
- I've added one remote server and signed in with `/mcp`
- I know the difference between local, project, and user scope
- I keep tokens out of committed files
:::

# Plugins and Marketplaces

A **plugin** packages skills, subagents, hooks, and MCP servers together. Type `/plugin` to browse and install from **marketplaces** (catalogs of plugins). Anthropic's official marketplace is built in.

:::summary In this chapter
- Installing a plugin in a few keystrokes
- Adding other marketplaces
- Install scopes, and keeping plugins under control
:::

## Install a plugin

:::steps Install from the official marketplace
1. **Open the manager.** Type `/plugin` and go to the **Discover** tab.
2. **Pick a plugin.** Read its description and, for official plugins, its **Context cost** estimate.
3. **Choose a scope** and install. Or type it directly:
   ```text
   /plugin install commit-commands@claude-plugins-official
   ```
4. **Reload if asked.** Run `/reload-plugins` if the install summary tells you to.
:::

Plugin commands are prefixed with the plugin name, as in `/plugin-name:command`.

## Add another marketplace

```text
/plugin marketplace add your-org/plugins
```

A marketplace can be a GitHub repository (`owner/repo`, optionally `#tag` to pin a version), any Git URL, a local folder, or a web address of a `marketplace.json` file. From your shell, `claude plugin install …` and `claude plugin marketplace add …` do the same without opening a session.

## Scopes

| Scope | Enabled for |
|---|---|
| User | You, in every project on this computer |
| Project | Everyone in the repository (saved in `.claude/settings.json`) |
| Local | You, in this repository only |

## Keeping plugins under control

- Every enabled plugin adds its skill descriptions to every session, so turn off ones you don't use (`/plugin` → **Installed**, or `claude plugin disable <name>`).
- `/doctor` and `/skill-doctor` point out extensions that cost context but aren't used.
- A plugin runs code as you. Install from sources you trust, and read what a third-party plugin includes first.

:::checklist
- I've browsed the Discover tab in `/plugin`
- I know how to disable a plugin I'm not using
:::
