# MCP: n8n and Other AI Apps

**MCP** (Model Context Protocol) is the standard way for AI apps to use outside tools, like a universal plug socket. n8n speaks MCP in both directions: your agents can use other MCP servers, and AI apps such as Claude can use n8n. See the *MCP* manual in this series for the bigger picture.

:::summary In this chapter
- The three ways n8n uses MCP
- Giving your agent tools from MCP servers
- Turning a workflow into an MCP server
- Letting Claude or ChatGPT search, run and build your workflows
:::

| Feature | Direction | Use it to |
|---|---|---|
| **MCP Client Tool** node | n8n uses other MCP servers | Give your AI Agent tools from GitHub, Notion, Linear, and more. The node panel also has a one-click **MCP Servers** registry |
| **MCP Server Trigger** node | Other AI apps use one n8n workflow | Turn a workflow into a custom MCP server that Claude or Cursor can call |
| **Instance-level MCP server** | Other AI apps use all of n8n | Let Claude, ChatGPT, or a coding agent search, run, *and build* your workflows from a chat |

## Using MCP servers in your agents

:::steps Add a registry MCP server in one click
1. **Open your AI Agent's tools panel** by clicking **Tool +**.
2. **Search for the service** (for example Notion or Linear) or open the **MCP Servers** section.
3. **Select it and sign in** when asked. n8n creates the MCP credential for you.
4. **Choose Tools to include**: all, a selected list, or all except some.
:::

If a server isn't in the registry, add an **MCP Client Tool** and enter its **endpoint URL** (for example `https://mcp.notion.com/mcp`) and authentication (bearer token, header, multiple headers or OAuth2). To use an MCP tool as an ordinary workflow step rather than through an agent, use the **MCP Client** node and pick the tool from its list.

| Use a built-in tool when… | Use an MCP server when… |
|---|---|
| You know the exact action needed | The agent needs a range of actions |
| You want to fix most parameters | You're happy for it to choose tools and arguments |

## Turn a workflow into an MCP server

:::steps Expose tools with the MCP Server Trigger
1. **Create a workflow** with an **MCP Server Trigger**.
2. **Attach tools** to it: app nodes, or **Call n8n Workflow Tool** nodes that run your own workflows.
3. **Set Authentication** to **Bearer auth** or **Header auth**, and choose a memorable **Path**.
4. **Publish**, then copy the **Production URL** from the top of the node.
5. **Add it to your AI app** as a remote MCP server, with the token.
:::

For apps that only support local (stdio) servers, such as some Claude Desktop setups, n8n's docs show bridging with `mcp-remote`:

```json title=claude_desktop_config.json
{
  "mcpServers": {
    "n8n": {
      "command": "npx",
      "args": ["mcp-remote", "<MCP_URL>",
               "--header", "Authorization: Bearer ${AUTH_TOKEN}"],
      "env": { "AUTH_TOKEN": "<MCP_BEARER_TOKEN>" }
    }
  }
}
```

## Instance-level MCP: let AI build for you

The instance-level server connects an AI app to your whole n8n. From a chat, the AI can search workflows, run the ones you've enabled, create and edit workflows (n8n 2.13 onward), and manage data tables.

:::steps Connect Claude to your n8n
1. **Enable it.** As owner or admin, open [[Settings > Instance-level MCP]] and select **Enable MCP access**.
2. **Connect a client.** In **Connection details**, select **Connect**. Choose **OAuth (recommended)** or an API key. Web clients offer one-click setup; otherwise copy the **Server URL**, which ends in `/mcp-server/http`.
3. **Approve access** when the client sends you back to n8n.
4. **Enable workflows.** Clients can only see previews until you enable a workflow: open it, go to the workflow menu › **Settings** and toggle **Available in MCP**, or use **Workflows enabled** on the MCP settings page.
:::

> [!IMPORTANT]
> Every connected client can see every workflow you've enabled for MCP. Enable only what you're happy for AI apps to run. You can revoke a client at any time under **Connected clients**.

> [!WARNING]
> Review AI-built workflows before publishing, especially nodes that send messages, delete data, or spend money. Test with pinned or sample data first.

```prompt
Using my n8n MCP connection, build a workflow that triggers when a file is
added to my Google Drive folder "Receipts", extracts the vendor, date and
total with AI, and appends them to the Google Sheet "Expenses 2026".
Test it with a sample, show me the result, and don't publish it.
```

:::checklist
- I've given an agent tools from an MCP server
- I've exposed one workflow with the MCP Server Trigger and authentication
- I've connected an AI app to instance-level MCP
- I've enabled only the workflows I want AI apps to use
:::

