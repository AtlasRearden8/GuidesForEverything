# Notion MCP: Connect AI Assistants

**MCP** (Model Context Protocol) is a standard way for AI apps to use other tools. Notion runs an official **MCP server**, so assistants like Claude, ChatGPT, Cursor, and Claude Code can search, read, create, and update your Notion pages and databases (see the *MCP* manual in this series).

:::summary In this chapter
- What Notion MCP does, and how it differs from the API
- Connecting Claude, Claude Code, Codex, Cursor, and others
- What an assistant can do once connected
- Security and admin controls
:::

## How it works

Notion MCP is a **remote** server hosted by Notion at `https://mcp.notion.com/mcp`. Your AI app connects to it, you sign in with **OAuth** (a Notion "approve access" screen), and the assistant can then use Notion tools: search, fetch pages, create pages and databases, update properties, add comments, and more.

| | Notion MCP | Notion API |
|---|---|---|
| **Built for** | AI assistants | Programs you write |
| **Sign-in** | OAuth, as you | Token for a connection |
| **Sees** | Everything *you* can see | Only pages shared with the connection |
| **Setup** | Minutes, no code | Code required |

## Connect your assistant

- **Claude:** [[Settings > Connectors]], find **Notion**, click **Connect**, and approve.
- **Claude Code:** `claude mcp add --transport http notion https://mcp.notion.com/mcp`, then `/mcp` to sign in.
- **Cursor and others:** add a remote server with the URL `https://mcp.notion.com/mcp`.

### Codex

Add this to `~/.codex/config.toml`, then run `codex mcp login notion`:

```toml title=config.toml
[mcp_servers.notion]
url = "https://mcp.notion.com/mcp"
```

### Cursor

Create `.cursor/mcp.json` in your project (or `~/.cursor/mcp.json` for every project), then enable Notion in Cursor and complete the sign-in:

```json title=mcp.json
{
  "mcpServers": {
    "notion": {
      "url": "https://mcp.notion.com/mcp"
    }
  }
}
```

### Any other MCP client

| Option | Use when |
|---|---|
| Streamable HTTP: `https://mcp.notion.com/mcp` | The default; try this first |
| SSE: `https://mcp.notion.com/sse` | The app doesn't support Streamable HTTP |
| `npx -y mcp-remote https://mcp.notion.com/mcp` | The app only supports local (stdio) servers |

> [!TIP]
> In Claude Code, `--scope user` makes the Notion server available in every project, and `--scope project` shares it with your team through a `.mcp.json` file.

## Things to ask once connected

```prompt
Search my Notion for the Q3 launch plan and summarize the open risks.
```

```prompt
Create a Notion page called "Release notes 2.4" in my Engineering
teamspace from the changes in this repository's last ten commits.
```

```prompt
Add these five customer requests to my Requests database in Notion,
setting Priority to Medium and linking each to the right company.
```

## Security

You sign in with OAuth, and the AI can only see pages *you* can see. That also means it can see *everything* you can see, so:

- **Start with personal use** before rolling it out to a team.
- **Use clear page titles**, because AI relies on them to find things.
- **Review what the assistant changes**, especially bulk edits.
- **Disconnect** apps you no longer use from your workspace settings.

Workspace owners can review and restrict these connections in [[Settings > Connections]]. On the **Enterprise** plan, owners can allow only approved AI apps: under **Permissions**, set **Restrict AI apps members can connect** to **Only from approved list**.

> [!NOTE]
> Notion also offers an older, open-source MCP server you run yourself, but Notion says it's no longer actively maintained. Use the hosted server unless you have a special reason.

:::checklist
- I connected one AI app to Notion MCP
- I asked it to search and summarize a page
- I know the assistant sees everything I can see
:::

