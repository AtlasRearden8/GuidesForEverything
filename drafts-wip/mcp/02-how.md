# How MCP Works

You don't need to understand the plumbing to *use* MCP, but a little knowledge goes a long way when something doesn't connect, or when you decide to build your own server. This chapter walks through every moving part, one at a time.

:::summary In this chapter
- What happens, step by step, when you ask an AI to use a server
- The three server primitives: tools, resources, and prompts
- Client features: elicitation, plus the deprecated sampling and roots
- Capabilities, protocol versions, and extensions such as MCP Apps
- Transports: stdio for local servers, Streamable HTTP for remote ones
- Signing in with OAuth, API keys, and headers
:::

## A request, from start to finish

Here's what happens when you type "What's on my calendar tomorrow?" into an app with a calendar server connected:

:::steps Behind the scenes of one tool call
1. **The app discovers the tools.** When it starts (or when you switch the connector on), the host's client asks the server, "What tools do you have?" The server replies with a list: names, descriptions, and the inputs each one expects.
2. **The model reads the menu.** The host hands those tool descriptions to the AI model alongside your message, a bit like giving a waiter the day's specials.
3. **The model decides to call a tool.** It replies, in effect, "Please run `list_events` with `date = tomorrow`."
4. **You may be asked to approve.** Many apps show a confirmation, especially for tools that change things.
5. **The client sends the call.** The host's client sends a small message to the server: "Call `list_events` with these inputs."
6. **The server does the work** (here, asking Google or Microsoft for your events) and sends back a result.
7. **The model writes the answer.** It reads the result and replies to you in plain English, perhaps calling more tools first.
:::

The AI model never talks to the server directly. The host sits in the middle, which is what lets it ask for your approval, hide tools you've switched off, and keep a log.

## Under the hood: JSON-RPC messages

All MCP messages use a format called **JSON-RPC 2.0**: small structured text messages written in **JSON** (a text format of names and values; there's a primer in the next chapter). A tool call looks roughly like this:

```json title=request
{
  "jsonrpc": "2.0",
  "id": 7,
  "method": "tools/call",
  "params": {
    "name": "list_events",
    "arguments": { "date": "2026-10-17" }
  }
}
```

And the reply carries the same `id`, so the client knows which question it answers:

```json title=response
{
  "jsonrpc": "2.0",
  "id": 7,
  "result": {
    "content": [
      { "type": "text", "text": "09:30 Stand-up\n14:00 Dentist" }
    ],
    "isError": false
  }
}
```

The `method` names follow a simple pattern you'll see in logs: `tools/list`, `tools/call`, `resources/list`, `resources/read`, `prompts/list`, `prompts/get`. You'll never write these by hand when using MCP, but recognising them makes logs far less scary.

## The three things a server can offer

| Primitive | What it is | Who controls it | Example |
|---|---|---|---|
| **Tools** | Actions the AI can take | The AI decides when to call them, usually with your approval | `create_issue`, `send_message`, `query_database` |
| **Resources** | Information the AI can read | You or the app attach them as context | A file, a database schema, a document |
| **Prompts** | Ready-made templates | You pick them, often as a `/command` | "Summarize this pull request" |

"Who controls it" is the heart of the design. A tool runs because the *model* chose it. A resource is attached because the *application* (or you) chose it. A prompt runs because *you* picked it from a menu. If you've used websites, a resource is like reading a page and a tool is like submitting a form.

### Tools in depth

Tools are by far the most common primitive. Each tool has:

- **A name**, such as `search_books`. Names are short and use letters, digits, underscores, or hyphens.
- **A description** the AI reads to decide when the tool helps. This is the single most important piece of text in a server.
- **An input schema**: a precise description, in a format called **JSON Schema**, of the inputs the tool accepts and which are required. For example, "`query` is required text; `limit` is an optional whole number from 1 to 50."
- **Optional annotations**: hints about behaviour that apps can use to decide when to ask you first.

| Annotation | Meaning when true |
|---|---|
| `readOnlyHint` | The tool only reads; it changes nothing |
| `destructiveHint` | It may delete or overwrite things |
| `idempotentHint` | Running it twice has the same effect as once |
| `openWorldHint` | It reaches outside systems, such as the web |

A tool's result contains **content** (text, images, or embedded resources the AI reads) and, optionally, **structured content** (tidy data for the app). If something goes wrong, the result is marked `isError: true` and contains a message the AI can read and react to, for example by retrying with a corrected input.

> [!IMPORTANT]
> Annotations are *hints*, not security. A badly written or malicious server can claim a tool is read-only when it isn't. ChatGPT, for example, treats any tool without `readOnlyHint` as a write action and asks for confirmation. Your real protection is the permission you give the server.

### Resources in depth

A **resource** is a piece of data identified by a **URI**: an address such as `file:///Users/sam/notes.txt`, `config://app`, or `users://42/profile`. (A URI is the general form of the web addresses you already know.) Each resource also has a name, a description, and a **MIME type** saying what kind of content it is, such as `text/plain`, `text/markdown`, `application/json`, or `image/png`.

- A **resource template** is a pattern with blanks, such as `users://{user_id}/profile`. The app fills in the blank to read one specific item.
- Apps can **subscribe** to a resource to hear when it changes.
- In Claude Code you attach resources by typing `@` in your message; in Claude's apps they appear in the **+** menu of a chat.

### Prompts in depth

A **prompt** is a reusable message template a server offers, with named blanks (called **arguments**) for you to fill in. A code-review server might offer a "review this code" prompt with a `code` argument. Apps usually show prompts as slash commands: in Claude Code a prompt called `pr_review` from a server called `github` appears as `/mcp__github__pr_review`.

## Features that flow the other way

Most requests go from the app to the server. A few features let the *server* ask the *app* for something.

| Feature | What it does | Status in 2026-07-28 |
|---|---|---|
| **Elicitation** | The server asks *you* a question mid-task, via a form or a link | Active |
| **Sampling** | The server asks the host's AI model to write some text for it | Deprecated |
| **Roots** | The host tells the server which folders it may work in | Deprecated |
| **Logging** | The server sends log messages to the app | Deprecated |

**Elicitation** comes in two modes. **Form mode** asks for a simple value ("Which project should I file this in?" or "Delete 12 files, are you sure?"). **URL mode** sends you to a web page, such as a sign-in or payment page, where what you type never passes through the AI app at all.

**Deprecated** means "still works, but scheduled for removal; don't build new things on it." The current specification keeps sampling, roots, and logging working until at least the first version released on or after 28 July 2027. The suggested replacements: pass folders as ordinary tool inputs or settings (instead of roots), call an AI provider's API directly (instead of sampling), and write logs to the server's own error output or a monitoring system (instead of logging).

## Capabilities: who can do what

When a client first contacts a server, each side states its **capabilities**: which families of features it supports. A server that offers tools declares `tools`; one that also offers resources declares `resources`; and so on. An app that sees no `prompts` capability won't bother asking for prompts. This is why the MCP Inspector (Chapter 11) only shows a **Prompts** tab for servers that have some.

## Protocol versions and what changed in 2026

Until 2025, every connection began with a short "handshake" called `initialize`, where client and server agreed on a version. The **2026-07-28** version made MCP **stateless**: there's no handshake and no long-lived session. Instead:

- Every request carries its own version and client details in a small metadata field called `_meta`.
- Servers answer a new `server/discover` request that lists their versions, capabilities, and identity in one go.
- When a server needs more information mid-request (for example, elicitation), it replies "input required" with its questions, and the client simply *retries* the original request with the answers. The specification calls this **multi round-trip requests**.

Why should a beginner care? Mostly you won't, because apps and official toolkits handle both the old ("legacy") and new ("modern") styles automatically. But when you read older tutorials, you'll now recognise words like `initialize` and "session" as the older approach.

## Extensions: optional extras

The 2026 specification added a formal way to bolt on optional **extensions**. The official ones include:

- **MCP Apps**: tools can return small interactive web pages (charts, forms, dashboards) that the host displays safely inside the chat. Claude, Claude Desktop, VS Code with GitHub Copilot, Cursor and others support them.
- **Tasks**: long-running jobs the app can check on later.
- **Skills**: servers can share packaged instructions ("Agent Skills") with the AI.
- **Authorization extensions**: extra sign-in methods for businesses, such as machine-to-machine credentials.

If an app doesn't support an extension, the server still works through ordinary MCP.

## Local servers and remote servers

| | Local server | Remote server |
|---|---|---|
| **Runs** | On your computer, started by the host app | On the internet, run by the service provider |
| **Transport** | **stdio**: the host talks to it through the program's input and output | **Streamable HTTP**: the host talks to it over a web address |
| **Setup** | A command in a config file, such as `npx -y @some/server` | Paste a URL and sign in |
| **Good for** | Your files, local databases, browser automation | Cloud services: GitHub, Notion, Slack, Stripe… |
| **Needs** | Often Node.js or Python installed | Just an account with the service |

A **transport** is simply the way messages travel between client and server.

### stdio, the local transport

Every program on your computer has three standard channels: **standard input** (stdin), where it receives text; **standard output** (stdout), where it prints results; and **standard error** (stderr), for warnings and logs. With **stdio**, the host starts the server program itself and writes MCP messages to its stdin, reading replies from its stdout.

Two consequences matter a lot when things go wrong:

- **stdout belongs to MCP.** If a server prints anything else there, even a friendly "Server started!", the host receives garbage and usually drops the connection. Well-behaved servers write their own messages to stderr instead.
- **The host starts the server, not you.** It runs the server from its own working folder, with only a few of your environment settings. That's why config files need full paths.

### Streamable HTTP, the remote transport

A **remote** server lives at a single web address, usually ending in `/mcp`, such as `https://mcp.notion.com/mcp`. The client sends each message as an ordinary web request (an HTTP POST). The server either replies with one JSON answer or, for longer jobs, streams progress updates followed by the answer, using a technique called **Server-Sent Events** (SSE).

You may also see an older transport called **HTTP+SSE**, with addresses ending in `/sse`. It has been deprecated since March 2025 in favour of Streamable HTTP. Use the `/mcp` address whenever a service offers both.

> [!NOTE]
> Some apps add their own transports. Claude Code, for example, can also connect to WebSocket servers. These are app features rather than part of the core MCP standard.

## Signing in: OAuth

Remote servers usually use **OAuth**, the same "Sign in with…" flow you've seen everywhere. You click **Connect**, a browser window opens on the service's own website, you approve what the AI may access, and the service hands the app a **token**: a long secret string that works like a temporary key card. You never give your password to the AI app.

Here's the flow MCP uses, in plain English:

:::steps How MCP sign-in works
1. **The app tries the server** and gets a "401 Unauthorized" reply, which is web-speak for "you need to sign in."
2. **The server points the way.** It publishes a small document (its *protected resource metadata*) saying which sign-in service it trusts.
3. **The app introduces itself** to that sign-in service. Modern apps publish a *Client ID Metadata Document* (a public web page describing the app); older ones register themselves automatically with *Dynamic Client Registration*, which is now deprecated.
4. **You approve in your browser** and choose what to allow. The list of permissions is called the **scope**.
5. **The app receives tokens** and sends the access token with every request. A *refresh token* lets it get a new one when the old one expires, without bothering you.
:::

Some servers instead use an **API key** or **personal access token**: a secret string you create on the service's website and paste into the app, often as an HTTP **header** such as `Authorization: Bearer <token>`. A header is a labelled line of extra information sent with every web request.

> [!TIP]
> Prefer remote servers with OAuth from the official vendor. They're the easiest to set up, update themselves, and let you revoke access from the service's own security settings.

:::checklist
- I can describe the seven steps of a tool call, and where the host sits
- I know tools are model-controlled, resources app-controlled, prompts user-controlled
- I know annotations are hints, not security
- I know stdout is reserved for MCP messages in a local server
- I know remote servers usually end in `/mcp` and sign in with OAuth
:::

