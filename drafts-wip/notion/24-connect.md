# Connect Notion to Other Tools

Notion works best when it talks to the other apps you use. This chapter covers built-in connections, link previews, the Web Clipper, and automation tools such as Zapier, Make, and n8n.

:::summary In this chapter
- Connections in Settings
- Link previews and embeds
- Slack and other popular connections
- No-code automation tools
:::

## Built-in connections

Notion connects with Slack, Google Drive, GitHub, Jira, Figma, and many more. Paste a link from those apps and choose **Paste as preview** for a live card. Manage connections under [[Settings > Connections]].

:::steps Add a connection
1. **Open [[Settings > Connections]].**
2. **Search or filter** for the app.
3. **Open it and follow the steps** to sign in and approve access.
4. **Add it to pages:** on a page, click **••• › More**, find **Connections**, and choose **Add connections**.
:::

> [!NOTE]
> On Enterprise plans, workspace owners can limit which connections members may install. If you can't find one, ask an owner.

## Link previews and embeds

| Paste option | Shows |
|---|---|
| **Mention** | A small inline link with the app's icon |
| **Paste as preview** | A live card (a GitHub pull request, a Figma frame, a Jira ticket) |
| **Embed** | The content itself, inside the page |
| **Bookmark** | A link card with a title and image |

## Popular connections

| App | What it does |
|---|---|
| **Slack** | Notifications from automations; AI search and actions in Slack |
| **Google Drive** | Previews and embeds of Docs, Sheets, and Slides; AI search |
| **GitHub, Jira, Asana** | Previews, and on Business plans synced databases |
| **Figma** | Live previews of designs |
| **Gmail** | Send mail from buttons and automations; Agent actions |

## No-code automation tools

Zapier, Make, and n8n all have Notion integrations (for example, "add every new form response to a Notion database"; see the *n8n* manual). Typical recipes:

- New email with a label → new item in a Notion database.
- New row in a Google Sheet → new Notion page.
- Notion item set to Done → message in a chat app.
- Notion **Send webhook** action → start a workflow in n8n.

These tools sign in to Notion with **OAuth** (a "log in and approve" screen) and ask which pages they may access. Pick only the pages they need.

> [!TIP]
> If a tool says it "can't find" your database, open the database's **••• › More › Connections** and check the tool is listed. Chapter 25 explains why.

:::checklist
- I opened Settings › Connections
- I pasted a link as a preview
- I know which automation tool I'd use, and how it gets access
:::

