
# Notion

## Notion MCP (simplest, full personal access)

Connect `https://mcp.notion.com/mcp` from Claude ([[Settings > Connectors > Notion]]), Claude Code, Cursor, or ChatGPT. Signing in with OAuth gives the AI exactly **your** access: every page you can see and edit. Then set its tools to **Always allow** in the host app (Chapter 13).

## An API connection with every capability

For n8n, Zapier, and scripts:

:::steps Create an all-access connection
1. **Open** notion.com/profile/integrations (or [[Settings > Connections > Develop or manage integrations]]) and create a new **internal connection** for your workspace. You must be a workspace owner.
2. **Enable every capability:** read content, update content, insert content, read comments, insert comments, and read user information including email addresses.
3. **Grant content access broadly.** In the connection's **Content access** tab, add every top-level page in each teamspace you want covered. Child pages inherit access.
4. **Copy the API token** into your tools.
:::

## Notion AI agents

Custom Agents run on schedules or triggers. Give each agent the sources and tools it needs in the Agent Builder, and review its run log rather than approving each action. On Business and Enterprise plans, admins control who can create agents, and Custom Agents use paid Notion credits.

**Still limited:** a connection can never see pages you haven't shared with it. Workspace owners can restrict or revoke MCP clients in [[Settings > Connections]]. Agents run inside Notion's own permission system and can't exceed the access of the content shared with them.

## Which option to use

| You want | Use |
|---|---|
| Claude, Cursor, or ChatGPT to work in your whole workspace | Notion MCP with OAuth |
| A script or n8n to write to specific pages | Internal connection with an API token |
| Work that runs inside Notion on a schedule | Notion Custom Agents |
| Agents kept away from private pages | A separate teamspace shared only with the connection |

> [!TIP]
> Notion keeps page history. If an agent rewrites a page badly, open the page's **•••** menu, then **Version history**, and restore an earlier version (how far back depends on your plan).

:::checklist
- Notion MCP connected and its tools set to **Always allow**
- API connection has every capability and top-level pages shared
- Agent-writable content lives in a teamspace you can afford to lose
:::
