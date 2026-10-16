# A Catalog of Popular Servers

Thousands of MCP servers exist. This chapter covers the ones most people actually use, with a short setup recipe for each. Every recipe was checked against the provider's own documentation in October 2026, but servers change fast: when in doubt, copy the command from the official README.

:::summary In this chapter
- Official servers from the companies themselves
- Reference servers from the MCP project
- Copy-paste setup recipes for files, code, docs, chat, databases, browsers, and automation
- Where to find more
:::

## How to read a recipe

Each recipe gives you either a **URL** (a remote server: add it as a connector, or with `claude mcp add --transport http`) or a **command** (a local server: put it in your app's config, or after `--` in Claude Code). The Claude Code form is shown because it's one line; Chapter 5 shows how to turn it into any other app's format.

## Official servers from the companies themselves

These are maintained by the service provider. Start here.

| Server | What the AI can do | Type |
|---|---|---|
| **GitHub** | Read code, manage issues and pull requests, check Actions | Remote |
| **Notion** | Search, read, create, and update pages and databases | Remote |
| **Linear**, **Asana**, **Atlassian** (Jira, Confluence) | Manage tasks, projects, and docs | Remote |
| **Slack** | Search and post messages | Remote |
| **Google Drive, Gmail, Calendar** | Find files, read and draft email, manage events (available as Claude connectors) | Remote |
| **Stripe** | Look up customers, payments, and invoices | Remote |
| **Supabase**, **Neon** | Manage databases and run queries | Remote |
| **Sentry** | Investigate errors in your apps | Remote |
| **Figma**, **Canva** | Read designs and create graphics | Remote |
| **Hugging Face** | Search models, datasets, Spaces, and papers | Remote |
| **Zapier**, **n8n** | Trigger thousands of app actions and your own workflows | Remote |
| **Playwright** (Microsoft) | Control a web browser: click, type, screenshot | Local |

## Remote server addresses

:::compact
| Service | Server URL | Sign-in |
|---|---|---|
| GitHub | `https://api.githubcopilot.com/mcp/` | OAuth or personal access token |
| Notion | `https://mcp.notion.com/mcp` | OAuth |
| Linear | `https://mcp.linear.app/mcp` | OAuth |
| Atlassian | `https://mcp.atlassian.com/v1/mcp` | OAuth |
| Sentry | `https://mcp.sentry.dev/mcp` | OAuth |
| Stripe | `https://mcp.stripe.com` | OAuth or API key |
| Supabase | `https://mcp.supabase.com/mcp` | OAuth |
| Hugging Face | `https://huggingface.co/mcp` | Optional token |
| HubSpot | `https://mcp.hubspot.com/anthropic` | OAuth |
| MCP example | `https://example-server.modelcontextprotocol.io/mcp` | Test server |
:::

> [!TIP]
> In Claude, check the Connectors Directory first: many of these are listed there and connect with one click. Slack, Google Drive, Gmail, and Calendar are easiest that way, because their servers require a registered app on the provider's side.

## Recipes: code and project management

### GitHub

GitHub's official server reads repositories and manages issues, pull requests, and Actions.

```bash
# Remote, with a fine-grained personal access token
claude mcp add --transport http github https://api.githubcopilot.com/mcp/ \
  --header "Authorization: Bearer YOUR_GITHUB_PAT"
```

Create the token at github.com/settings/personal-access-tokens as a **fine-grained** token limited to the repositories Claude should see. Prefer read-only permissions until you trust your setup. The server can also run locally in Docker (`ghcr.io/github/github-mcp-server`) with a `--read-only` mode that hides every write tool.

### Linear, Atlassian, Notion

```bash
claude mcp add --transport http linear https://mcp.linear.app/mcp
claude mcp add --transport http atlassian https://mcp.atlassian.com/v1/mcp
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

Then run `/mcp` and sign in. Each server only sees what your account can see in that service.

### Sentry

```bash
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
```

Ask: "What are the five most frequent unresolved errors in the last 24 hours, and which file causes each?" You can narrow the server to one organization or project with a longer URL such as `https://mcp.sentry.dev/mcp/my-org/my-project`.

## Recipes: data and databases

### Stripe

```bash
claude mcp add --transport http stripe https://mcp.stripe.com
```

Use a **restricted API key** or test mode while learning. Never let an AI issue refunds or create charges on your live account without approval prompts on.

### Supabase

```bash
claude mcp add --transport http supabase https://mcp.supabase.com/mcp
```

Supabase lets you scope the server to one project by adding `?project_ref=<your-project-id>` to the URL, which is a good habit.

### PostgreSQL and other SQL databases

The old reference Postgres server is archived. **DBHub** (`@bytebase/dbhub`) is a maintained alternative that connects to Postgres, MySQL, SQL Server, and others through a connection string:

```bash
claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
  --dsn "postgresql://readonly:pass@db.example.com:5432/analytics"
```

> [!IMPORTANT]
> Create a database user with **read-only** permissions for the AI. Then even a confused or manipulated model can't change or delete data.

### Hugging Face

```bash
claude mcp add --transport http hf https://huggingface.co/mcp
```

Search models, datasets, and papers: "Find three small open models for sentiment analysis and compare their licences."

## Recipes: the reference servers {{Free}}

The MCP project publishes example servers on GitHub (`modelcontextprotocol/servers`). They're free, open source, and good for learning.

| Server | Run it with | What it does |
|---|---|---|
| **Filesystem** | `npx -y @modelcontextprotocol/server-filesystem <folders>` | Read and write files in folders you choose |
| **Fetch** | `uvx mcp-server-fetch` | Download web pages as clean text |
| **Git** | `uvx mcp-server-git --repository <path>` | Inspect and work with a local Git repository |
| **Memory** | `npx -y @modelcontextprotocol/server-memory` | A knowledge graph the AI can store facts in |
| **Time** | `uvx mcp-server-time` | Current time and time-zone conversion |
| **Sequential Thinking** | `npx -y @modelcontextprotocol/server-sequential-thinking` | Helps the AI work through a problem step by step |
| **Everything** | `npx -y @modelcontextprotocol/server-everything` | A test server with every feature, for experiments |

For example, in Claude Desktop's config:

```json title=claude_desktop_config.json
{
  "mcpServers": {
    "fetch": { "command": "uvx", "args": ["mcp-server-fetch"] },
    "time": { "command": "uvx", "args": ["mcp-server-time"] },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": { "MEMORY_FILE_PATH": "/Users/sam/mcp/memory.jsonl" }
    }
  }
}
```

> [!NOTE]
> Older guides mention reference servers for GitHub, Slack, Google Drive, Postgres, Puppeteer, SQLite, and Brave Search. Those are **archived** (no longer maintained). Use the companies' official servers instead, such as `@brave/brave-search-mcp-server` for Brave Search.

## Recipes: browsers and the web

### Playwright

Microsoft's **Playwright** server controls a real web browser: it opens pages, clicks, types, and takes screenshots. It needs Node.js 18 or newer.

```bash
claude mcp add playwright -- npx @playwright/mcp@latest
```

```json title=Any app's config
{
  "mcpServers": {
    "playwright": { "command": "npx", "args": ["@playwright/mcp@latest"] }
  }
}
```

Try: "Open example.com, find the contact form, fill it in with test data, and screenshot the result before submitting." Add the `--isolated` argument to use a fresh browser profile each time, so the AI never sees your saved logins.

## Recipes: automation hubs

- **Zapier** offers an MCP server that exposes actions across thousands of apps. Set it up from zapier.com/mcp, choose which actions to allow, then connect it from Claude's directory or with the URL Zapier gives you. Actions run through your Zapier account and count toward its usage.
- **n8n** can turn any workflow into an MCP tool with the **MCP Server Trigger** node (Chapter 5, and Recipe 9 in Chapter 15).

## Where to find more

- **The official MCP Registry** at registry.modelcontextprotocol.io (Chapter 13).
- **Anthropic's Connectors Directory**: claude.ai/directory.
- **The VS Code gallery**: search `@mcp` in the Extensions view.
- **The Cursor Marketplace** and cursor.directory.
- **Each vendor's documentation**: search "[product name] MCP server".
- **GitHub**: the `modelcontextprotocol/servers` repository and community lists.

> [!TIP]
> The companion guide in this series, *AI Tools, Connectors & MCP Directory*, lists far more servers by category, each labeled Free, Freemium, or Paid.

:::checklist
- I start with the official server from the service's own company
- I scope tokens and database users to the minimum (one repo, read-only)
- I avoid archived reference servers in favour of maintained ones
- I copy package names exactly from the official docs
:::

