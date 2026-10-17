# The Notion API: A Beginner Example

The **API** (application programming interface) is how programs talk to Notion: reading pages, adding database items, and reacting to changes. You don't need to be a developer to try it. This chapter walks you through your first API call, step by step.

:::summary In this chapter
- Connections, tokens, and why sharing matters
- Creating an internal connection
- Your first request with curl
- Adding a database item from the command line and from JavaScript
- API versions, webhooks, and personal access tokens
:::

## Key words

| Word | Meaning |
|---|---|
| **Connection** | A program's identity in Notion, formerly called an *integration* |
| **Internal connection** | A connection for your own workspace only |
| **API token** | A secret password the program sends with every request |
| **Endpoint** | A web address the API answers at, such as `https://api.notion.com/v1/pages` |
| **Data source** | The collection of items behind a database (Chapter 5) |
| **JSON** | The text format the API uses for data |

## Step 1: create a connection

For Zapier, Make, n8n, or your own scripts, create a **connection** (Notion's developer docs call it an *internal connection*, formerly an *integration*):

:::steps Create an API connection
1. **Open the developer portal** at app.notion.com/developers/connections. You need to be a workspace owner.
2. **In the Build section, choose Internal connections**, then **Create a new connection**. Give it a name and pick the workspace.
3. **Copy the API token** from its **Configuration** tab. Treat it like a password. Here you can also choose its **capabilities**, such as read, update, and insert content.
4. **Grant access to pages.** Either add pages in the connection's **Content access** tab, or open a page, click **••• › More › Connections › Add connections**, and pick your connection.
5. **Paste the token** into n8n, Zapier, or your script's credentials.
:::

> [!NOTE]
> A new connection can't see *anything* until you share pages with it. Sharing a parent page also shares its subpages. If an automation says "object not found," this is almost always why.

> [!CAUTION]
> Never paste your token into a web page, a shared document, or code you upload to GitHub. Store it in an **environment variable** (a setting on your computer that programs can read). If a token leaks, create a new one.

## Step 2: test the token

Open a terminal (Terminal on a Mac, PowerShell on Windows). First, store your token in an environment variable so it doesn't appear in your commands. On a Mac or Linux:

```bash
export NOTION_API_KEY="paste-your-token-here"
```

Now ask Notion who your connection is:

```bash
curl https://api.notion.com/v1/users/me \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2026-03-11"
```

If it works, you'll get back a short JSON answer describing your connection's **bot user**. An error saying `unauthorized` means the token is wrong.

> [!IMPORTANT]
> Every request must include a `Notion-Version` header. Notion names versions by date; the latest is `2026-03-11`. Older versions keep working, but new examples in the docs use the latest one.

## Step 3: add an item to a database

Make a small database called "Groceries" with three properties: **Grocery item** (the title), **Price** (Number), and **Last ordered** (Date). Share it with your connection (Step 1, item 4).

Next you need the **data source ID**, a long code identifying the database's data source. Copy it from the database's **Manage data sources** option in Notion, then store it:

```bash
export NOTION_DATA_SOURCE_ID="paste-the-id-here"
```

Now create a page (an item) in it:

```bash
curl https://api.notion.com/v1/pages \
  -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Notion-Version: 2026-03-11" \
  --data "{
    \"parent\": { \"data_source_id\": \"$NOTION_DATA_SOURCE_ID\" },
    \"properties\": {
      \"Grocery item\": {
        \"title\": [{ \"text\": { \"content\": \"Tomatoes\" } }]
      },
      \"Price\": { \"number\": 1.49 },
      \"Last ordered\": { \"date\": { \"start\": \"2026-09-01\" } }
    }
  }"
```

Open the database: "Tomatoes" is there. Running the command again adds another copy.

| Error | Usually means |
|---|---|
| `400` validation error | A property name or value doesn't match the database |
| `401` unauthorized | The token is wrong or missing |
| `403` | The connection lacks a capability, such as insert content |
| `404` not found | Wrong ID, or the database isn't shared with the connection |

## The same thing in JavaScript

If you have Node.js installed, Notion's official SDK (a ready-made code library) makes this tidier. Install it in a new folder:

```bash
npm install @notionhq/client
```

Save this as `create-page.mjs`:

```javascript title=create-page.mjs
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const page = await notion.pages.create({
  parent: { data_source_id: process.env.NOTION_DATA_SOURCE_ID },
  properties: {
    "Grocery item": { title: [{ text: { content: "Bread" } }] },
    Price: { number: 2.5 },
    "Last ordered": { date: { start: "2026-10-16" } },
  },
});

console.log("Created page:", page.id);
```

Run it with `node create-page.mjs`. The SDK sets the version header for you.

```prompt
Using the Notion API version 2026-03-11 and the @notionhq/client SDK,
write a Node.js script that reads every item in my data source and
prints the titles of items whose Price is over 5. Explain each line.
```

## More you can do

- **Query a data source** to read items with filters and sorts.
- **Append blocks** to add content to a page.
- **Webhooks:** let Notion send your server a message when content changes, instead of checking constantly.
- **Public connections** use OAuth so other people can install your app in *their* workspaces.
- **Personal access tokens** (from the developer portal) act as *you*, with your own permissions, for personal scripts and trusted tools.

The full reference lives at developers.notion.com.

:::checklist
- I created an internal connection and copied its token safely
- I shared a database with the connection
- I ran the "who am I" request
- I added an item with curl or JavaScript
:::

