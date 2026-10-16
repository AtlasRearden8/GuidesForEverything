# Testing with MCP Inspector

The **MCP Inspector** is the official testing tool for MCP servers. It connects to a server exactly as an AI app would, but instead of an AI choosing what to call, *you* do, with forms and buttons. It's the fastest way to answer "Is my server broken, or is it the app?"

:::summary In this chapter
- The Inspector's three modes: web, command line (CLI), and terminal (TUI)
- Testing local and remote servers
- A tour of the tabs
- Scripted checks for automated testing
:::

## Before you start

The Inspector runs through `npx`, so there's nothing to install, but it needs **Node.js 22.19.0 or newer**. Check with `node --version`.

| Mode | Start it with | Good for |
|---|---|---|
| **Web** | `npx @modelcontextprotocol/inspector` | Exploring, the richest view |
| **CLI** | `npx @modelcontextprotocol/inspector --cli` | Scripts, automated checks, coding agents |
| **TUI** | `npx @modelcontextprotocol/inspector --tui` | A terminal interface when there's no browser |

## Testing a local server

Put the command that starts your server after the Inspector's name:

```bash
# A published npm server
npx -y @modelcontextprotocol/inspector \
  npx @modelcontextprotocol/server-filesystem ~/Desktop

# A published Python server
npx @modelcontextprotocol/inspector uvx mcp-server-git --repository ~/code/repo

# Your own servers
npx @modelcontextprotocol/inspector npx tsx src/index.ts
uv run mcp dev server.py
```

`uv run mcp dev server.py` is the Python SDK's shortcut; it starts the Inspector for you.

:::steps Your first Inspector session
1. **Run one of the commands above.** The Inspector prints a web address containing a one-time security token and opens it in your browser.
2. **Use that exact address.** The Inspector normally lives at port 6274 on your own computer, but typing `localhost:6274` by hand skips the token and won't work.
3. **Click Connect.** A green status means the server started and answered.
4. **Open the Tools tab** and click a tool. You'll see its description, a form built from its input schema, and its annotations.
5. **Fill in the form and run it.** The result appears below, exactly as the AI would receive it.
6. **Check the other tabs**: Resources, Prompts, and the monitoring tabs described below.
:::

## Testing a remote server

```bash
npx @modelcontextprotocol/inspector --server-url https://example.com/mcp \
  --transport http
```

If the server uses OAuth, the Inspector runs the sign-in flow in your browser, just as a real app would. That makes it a great way to check a remote server *before* adding it to Claude or ChatGPT.

## A tour of the tabs

| Tab | Shows up when | What it's for |
|---|---|---|
| **Servers** | Always | Add, edit, and connect servers |
| **Tools** | The server has tools | Browse schemas, call tools, see results |
| **Resources** | The server has resources | List, read, and subscribe |
| **Prompts** | The server has prompts | Fill in arguments and preview messages |
| **Apps** | Tools with interactive UI | Render MCP Apps in a safe frame |
| **Protocol** | Always | The raw JSON-RPC messages, request by request |
| **Network** | Remote servers | HTTP status codes, headers, and bodies |
| **Console** | Local servers | The server's stderr: its logs and crash messages |

The **Protocol**, **Network**, and **Console** tabs can be pinned as a sidebar, so you can watch the traffic while you click around.

> [!TIP]
> When a server "connects but has no tools," look at **Console**. A Python traceback or a Node.js error there tells you exactly what broke.

## Scripted checks with the CLI

The CLI connects, runs one request, prints the result, and exits:

```bash
I="npx @modelcontextprotocol/inspector --cli"

# List the tools
$I node build/index.js --method tools/list

# Call a tool with arguments
$I node build/index.js --method tools/call --tool-name get-alerts \
  --tool-arg state=TX

# Read a resource and render a prompt
$I node build/index.js --method resources/read --uri config://app
$I node build/index.js --method prompts/get --prompt-name review-code \
  --prompt-args code="let x = 1"

# A remote server, as JSON for other tools
$I https://example.com/mcp --transport http --method tools/list \
  --format json
```

`--tool-arg` takes `key=value` pairs and converts numbers automatically; use `--tool-args-json '{"zip":"10001"}'` to send an exact JSON object. Add `--strict` to `tools/list` to report schema problems that some apps would reject. Because the CLI exits with a non-zero code on failure, you can run these checks automatically every time you change your server.

> [!WARNING]
> The Inspector saves sign-in tokens and secrets in your operating system's keychain when it can. On machines without one (many Linux servers and containers) it falls back to `~/.mcp-inspector/secrets.json`, unencrypted unless you set a key. Don't leave real tokens there on shared machines.

## A testing routine for your own servers

:::checklist
- `tools/list` shows every tool, with the descriptions I expect
- Each tool works with normal input
- Each tool gives a readable error for wrong input (missing, too long, wrong type)
- Empty results ("nothing found") are handled gracefully
- The Console tab shows no warnings or tracebacks
- Resources and prompts render correctly
- After changes, I rerun the CLI checks before reconnecting a real app
:::

