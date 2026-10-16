# What Is MCP?

MCP is the reason your AI assistant can suddenly read your files, file a GitHub issue, or look something up in your company's database. This chapter explains the idea in plain English, before any setup.

:::summary In this chapter
- The problem MCP solves, and the "USB-C for AI" idea
- Hosts, clients, and servers in plain English
- What you can actually do once MCP is set up
- Who supports MCP today, and how the standard is governed
- A two-minute first taste you can try right now
:::

## The problem: every AI needed custom plumbing

An **AI model** (the "brain" behind Claude, ChatGPT, Gemini and others) is trained on a huge snapshot of text. It knows a lot about the world in general, but nothing about *your* world: your inbox, your spreadsheets, your code, today's weather. It also can't *do* anything outside the chat window. It can write an email for you, but it can't send it.

Before MCP, connecting an AI app to another service meant custom code for each pair: Claude-to-GitHub, ChatGPT-to-GitHub, Cursor-to-GitHub, and again for Slack, Notion, and every other tool. With 10 AI apps and 100 services, that's up to 1,000 separate integrations, each built and maintained by someone. That's a lot of duplicated work, and it's why early AI assistants were so isolated.

## The solution: one standard plug

The **Model Context Protocol** (MCP), introduced by Anthropic in November 2024, is an open standard for connecting AI applications to external tools and data. A **protocol** is simply an agreed set of rules for how two programs talk, the same way the rules of the postal system let anyone send a letter to anyone.

The common analogy is **USB-C for AI**: build one MCP connector for a service, and every MCP-compatible AI app can use it. Instead of 1,000 integrations, you need 10 apps that speak MCP and 100 services that speak MCP.

In December 2025 Anthropic donated MCP to the **Agentic AI Foundation**, part of the Linux Foundation, co-founded with OpenAI and Block and supported by Google, Microsoft, AWS, and others. It's now a neutral, industry-wide standard, developed in the open on GitHub and documented at modelcontextprotocol.io.

> [!NOTE]
> "Open standard" means anyone can read the rules and build on them for free, without asking permission or paying a licence fee. Nobody owns your MCP server except you.

## The three roles

| Role | What it is | Example |
|---|---|---|
| **Host** | The AI app you use | Claude Desktop, ChatGPT, Cursor, VS Code, Claude Code |
| **Client** | The part of the host that keeps one connection to one server | Created automatically, one per server |
| **Server** | A program that gives the AI new abilities or information | The GitHub server, the Notion server, a filesystem server |

You'll mostly hear about **hosts** (your app) and **servers** (what you connect). In Claude's apps, servers you connect are called **connectors**; in ChatGPT they become **plugins** (earlier called apps or connectors).

A helpful picture: the host is a restaurant, each server is a supplier (the bakery, the butcher, the greengrocer), and each client is the phone line the restaurant keeps open to one supplier. The chef (the AI model) decides what to order; the suppliers do the work; nobody needs to know how the others run their business.

> [!NOTE]
> "Server" sounds like a big computer in a data center, but an MCP server can be a small program running on your own laptop, or a web address hosted by a company like Notion or GitHub.

## What a server can offer, in one sentence each

You'll meet these properly in the next chapter. For now:

- **Tools** are actions the AI can take, such as "create an issue" or "search my files."
- **Resources** are pieces of information the app can load for the AI to read, such as a document or a database schema.
- **Prompts** are ready-made instructions you can pick from a menu, often as a `/command`.

## What MCP makes possible

- "Summarize the unread issues in my GitHub repo and draft replies."
- "Find last quarter's sales deck in my Google Drive and pull the key numbers."
- "Create a Notion page for each meeting on my calendar tomorrow."
- "Query our database for customers who signed up this week."
- "Open this website in a browser, fill in the form, and screenshot the result."
- "When this Sentry error appears, find the code that causes it and open a pull request."
- "Every morning, check the shared inbox and post a summary to our team channel."

Notice the pattern: each request mixes *thinking* (which the AI does well) with *reaching into another system* (which MCP makes possible).

## What MCP is not

It helps to clear up a few common misunderstandings early:

- **MCP is not an AI model.** It doesn't make the AI smarter; it gives the AI hands and eyes.
- **MCP is not a product you buy.** It's a set of rules. The apps and servers that follow those rules may be free or paid.
- **MCP doesn't bypass permissions.** A server can only do what the account or token you give it is allowed to do.
- **MCP isn't magic automation.** The AI still decides when to use a tool, and good apps ask for your approval before anything risky.

## Who supports MCP

Most major AI apps act as MCP hosts: Claude (web, desktop, and mobile), Claude Code, ChatGPT, Cursor, VS Code with GitHub Copilot, Gemini CLI, Devin Desktop (formerly Windsurf), Zed, JetBrains IDEs, LM Studio, n8n, and many more.

On the server side, thousands exist. Big companies such as GitHub, Notion, Atlassian, Linear, Stripe, Sentry, Supabase, Slack, and Hugging Face publish official servers, and the open-source community has built servers for almost everything else.

## How the standard keeps evolving

The MCP **specification** (the official rulebook) is released in dated versions. The current version is **2026-07-28**; earlier ones include 2025-11-25, 2025-06-18, 2025-03-26 and the original 2024-11-05. You'll see these dates in documentation and error messages.

Good news for beginners: apps and the official building kits negotiate versions automatically, so a new app can talk to an older server and vice versa. You rarely need to think about version numbers unless you're building something.

:::steps Try it: connect your first server in two minutes
1. **Open Claude** at claude.ai (a free account is enough) or in the Claude Desktop app.
2. **Go to** [[Customize > Connectors]], click **+** (Add), and choose **Add custom connector**.
3. **Name it** "MCP example" and **paste this URL**: `https://example-server.modelcontextprotocol.io/mcp`. This is a public demonstration server run by the MCP project.
4. **Finish** by following the prompts (sign in if asked) and clicking **Add**.
5. **Start a new chat**, click **+**, then **Connectors**, and make sure the new connector is switched on. Ask: "What tools does the MCP example connector give you? Try one."
:::

> [!TIP]
> Free Claude accounts can add one custom connector. When you've finished exploring, remove the example connector from [[Customize > Connectors]] to free that slot for something useful.

:::checklist
- I can explain MCP as "one standard plug between AI apps and other software"
- I know the difference between a host (my app) and a server (what I connect)
- I can name the three things a server can offer: tools, resources, prompts
- I know MCP gives the AI abilities, but not more permission than I grant it
:::

