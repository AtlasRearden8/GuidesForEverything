# Connect MCP in Other Apps

The same servers work everywhere; only the place you configure them differs. This chapter shows each major app step by step, with the exact file locations and the small differences that trip people up.

:::summary In this chapter
- A comparison table of where every app keeps its MCP settings
- ChatGPT, Cursor, VS Code, Devin Desktop (formerly Windsurf), and Gemini CLI
- n8n, both as an MCP client and as an MCP server
- How to translate a config written for one app into another
:::

## Where each app keeps its settings

| App | How to add a server | Config file | Top-level key |
|---|---|---|---|
| **Claude Desktop** | [[Settings > Developer > Edit Config]] (local) or connectors (remote) | `claude_desktop_config.json` | `mcpServers` |
| **Claude Code** | `claude mcp add …` | `~/.claude.json` or `.mcp.json` | `mcpServers` |
| **Cursor** | The **Customize** page, or edit the file | `~/.cursor/mcp.json` or `.cursor/mcp.json` | `mcpServers` |
| **VS Code** (Copilot) | **MCP: Add Server**, or the `@mcp` gallery | `.mcp.json`, `.vscode/mcp.json`, or user files | `mcpServers` or `servers` |
| **ChatGPT** | chatgpt.com/plugins, then **Add custom MCP server** | Set in the app | n/a |
| **Devin Desktop** | The Cascade panel, or edit the file | `~/.config/devin/mcp_config.json` | `mcpServers` |
| **Gemini CLI** | `gemini mcp add …`, or edit settings | `~/.gemini/settings.json` or `.gemini/settings.json` | `mcpServers` |

> [!WARNING]
> VS Code's own file, `.vscode/mcp.json`, uses `"servers"` while most other apps use `"mcpServers"`. Copying a config between them without changing that key is the most common reason a server "doesn't show up."

### Translating between apps

Most configs share the same `command`, `args`, and `env` fields. The differences are small:

| App | Remote server field | Notes |
|---|---|---|
| Claude Desktop | (use a connector) | Local `command` servers only in the file |
| Claude Code | `"type": "http"` plus `"url"` | A `url` without `type` fails |
| Cursor | `"url"` | `type` optional |
| VS Code | `"type": "http"` plus `"url"` | Key is `servers` in `.vscode/mcp.json` |
| Devin Desktop | `"serverUrl"` or `"url"` | 100-tool limit across servers |
| Gemini CLI | `"httpUrl"` (`"url"` means SSE) | `trust` skips confirmations |

## ChatGPT

ChatGPT connects to **remote** servers only, reachable over HTTPS (or through OpenAI's Secure MCP Tunnel for private servers). A custom MCP server becomes a **plugin** in your personal plugins directory. Workspace permissions and security settings on business plans can limit or block this.

:::steps Add a custom MCP server to ChatGPT
1. **Go to** chatgpt.com/plugins on the web.
2. **Select the plus button**, then **Add custom MCP server**.
3. **Enter a name** and, optionally, a description. Under **Connection**, enter the **Server URL**, including the `/mcp` path.
4. **Configure authentication:** **OAuth**, **No authentication**, or **OAuth or no authentication**.
5. **Read the risk warning** and select **I understand and want to continue**.
6. **Select Create as a plugin.** ChatGPT shows the tools it discovered.
7. **Install it** from your personal plugins (chatgpt.com/plugins?view=personal) using the plus button.
8. **Use it.** Start a new chat, type `@`, choose your plugin, and ask for something.
:::

> [!TIP]
> To practise, OpenAI's quickstart uses a public, read-only example server with a `roll_dice` tool at `https://tinymcp.dev/api/moldy-aloof-zettabyte/mcp`, with **No authentication**. Ask it to roll a 20-sided die.

Good to know about ChatGPT:

- **Write actions need confirmation by default.** ChatGPT treats any tool without the `readOnlyHint` annotation as a write action.
- **You can inspect every call.** Expand a tool call in the chat to see the exact JSON sent and received.
- **Be explicit when tools overlap:** "Use the Acme CRM plugin's `update_record` tool; don't use any other tools."
- **Refresh after changes.** If the server's tools change, open the plugin at chatgpt.com/plugins and select **Refresh**.

> [!NOTE]
> ChatGPT's menus for this feature have moved several times (it used to sit under a "Developer mode" setting). If what you see differs, search OpenAI's help center for "custom MCP server."

## Cursor

Cursor is an AI code editor. Install official servers with one click from the **Cursor Marketplace** on its **Customize** page, browse community servers at cursor.directory, or configure your own in a file:

- **Project:** `.cursor/mcp.json` inside the project folder, for tools that belong to one project.
- **Global:** `~/.cursor/mcp.json` in your home folder, for tools you want everywhere.

```json title=.cursor/mcp.json
{
  "mcpServers": {
    "github": {
      "url": "https://api.githubcopilot.com/mcp/"
    },
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

Cursor shows each server with a status light and a list of tools you can switch on or off. Sign in to servers that need OAuth from the same screen.

### Cursor's helpful extras

Cursor fills in **variables** in `command`, `args`, `env`, `url`, and `headers`:

| Variable | Becomes |
|---|---|
| `${env:NAME}` | The environment variable `NAME` |
| `${userHome}` | Your home folder |
| `${workspaceFolder}` | The project root |
| `${workspaceFolderBasename}` | The project folder's name |
| `${pathSeparator}` or `${/}` | `/` or `\` for your system |

```json title=.cursor/mcp.json
{
  "mcpServers": {
    "local-server": {
      "command": "python",
      "args": ["${workspaceFolder}/tools/mcp_server.py"],
      "env": { "API_KEY": "${env:API_KEY}" }
    },
    "remote-server": {
      "url": "https://api.example.com/mcp",
      "headers": { "Authorization": "Bearer ${env:MY_SERVICE_TOKEN}" }
    }
  }
}
```

Local servers can also load secrets from a file with `"envFile": "${workspaceFolder}/.env"`. Some services (Figma and Linear, for example) require a fixed OAuth app; for those, add an `auth` object with your `CLIENT_ID` (and `CLIENT_SECRET` if needed) to the remote entry.

> [!TIP]
> Cursor's MCP logs live in the **Output** panel (<kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>U</kbd>): choose **MCP Logs** from the dropdown.

## VS Code with GitHub Copilot

VS Code needs the **GitHub Copilot** extension, signed in (the free tier is enough). MCP tools are used by Copilot's agent in the **Chat** view (<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>I</kbd>, or <kbd>Ctrl</kbd>+<kbd>Cmd</kbd>+<kbd>I</kbd> on a Mac).

:::steps Install a server from the gallery
1. **Open the Extensions view** (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd>) and type `@mcp playwright` in the search box.
2. **Select Install** to add it to your user profile, or right-click and choose **Install in Workspace** to share it with the project.
3. **Confirm you trust the server** when asked. VS Code starts it and discovers its tools.
4. **Open the Chat view** and ask: "Go to code.visualstudio.com and give me a screenshot of the homepage."
5. **Approve the tool calls** as they appear. Use the **Configure Tools** button in the chat input to switch individual tools off.
:::

To add a server by hand, open the Command Palette (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>) and run **MCP: Add Server** (or **Chat: Open Customizations**, then **MCP Servers**). Choose **Command (stdio)** for a local server or **HTTP** for a remote one, and follow the prompts.

### VS Code's config files

| Scope | File | Top-level key |
|---|---|---|
| Workspace (portable) | `.mcp.json` at the project root | `mcpServers` |
| Workspace (VS Code only) | `.vscode/mcp.json` | `servers` |
| User (portable) | `~/.copilot/mcp-config.json` | `mcpServers` |
| User profile | Run **MCP: Open User Configuration** | `servers` |

VS Code now prefers the **portable** files, which other Copilot tools can share. The `.vscode/mcp.json` format still works and adds VS Code-only features such as input variables that prompt you for secrets:

```json title=.vscode/mcp.json
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@microsoft/mcp-server-playwright"]
    }
  }
}
```

Other handy routes: `code --add-mcp '{"name":"fetch","command":"uvx","args":["mcp-server-fetch"]}'` adds a server from the terminal, and the `chat.mcp.discovery.enabled` setting lets VS Code reuse servers you've already configured in Claude Desktop, Cursor, and others.

> [!NOTE]
> Workspace servers follow VS Code's **Workspace Trust**: in a folder you haven't trusted, they don't start. That's deliberate, because opening a stranger's project could otherwise run their servers on your machine. To read a server's logs, run **MCP: List Servers**, pick it, and choose **Show Output**.

## Devin Desktop (formerly Windsurf)

Windsurf's editor is now **Devin Desktop**, and its **Cascade** agent reads MCP servers from `mcp_config.json`:

- **macOS / Linux:** `~/.config/devin/mcp_config.json`
- **Windows:** `%APPDATA%\devin\mcp_config.json`

```json title=mcp_config.json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem",
               "/Users/sam/projects"]
    },
    "remote-http-mcp": {
      "serverUrl": "https://example.com/mcp"
    }
  }
}
```

Remote servers use `serverUrl` (or `url`), and OAuth is supported. Cascade can use at most **100 tools** at once across all servers, so switch off servers you don't need from the MCPs section of the Cascade panel's **⋯** menu.

## Gemini CLI

Google's **Gemini CLI** is a terminal agent, similar in spirit to Claude Code. It stores servers in `settings.json`: `~/.gemini/settings.json` for you, or `.gemini/settings.json` inside a project.

```bash
# A local server, with an environment variable
gemini mcp add -e API_KEY=123 my-server /path/to/server arg1

# A remote Streamable HTTP server
gemini mcp add --transport http notion https://mcp.notion.com/mcp

# Add it for all your projects instead of this one
gemini mcp add --scope user --transport http notion https://mcp.notion.com/mcp

gemini mcp list
gemini mcp remove notion
```

The default scope is `project` and the default transport is `stdio`. Inside Gemini CLI, `/mcp` shows each server's status and tools, and `/mcp auth` signs in to servers that use OAuth.

| Setting | Meaning |
|---|---|
| `command` + `args` | A local stdio server |
| `httpUrl` | A remote Streamable HTTP server |
| `url` | A remote server using the older SSE transport |
| `trust` | `true` skips all confirmations (use sparingly) |
| `includeTools` / `excludeTools` | Allow or block specific tools |

## n8n

**n8n** is a workflow automation tool (see the *n8n* manual in this series). It speaks MCP in both directions:

- **MCP Client Tool node:** lets an n8n AI Agent use tools from any external MCP server. Add it as a tool under an AI Agent node and paste the server's URL.
- **MCP Server Trigger node:** turns an n8n workflow into an MCP server with its own URL, so Claude, Cursor, and others can call your workflows as tools. It supports Streamable HTTP and SSE (not stdio), and can require **Bearer** or **Header** authentication.
- **Instance-level MCP:** n8n can also expose your whole instance to AI apps. Go to [[Settings > Instance-level MCP]], click **Connect**, pick your client (Claude.ai, ChatGPT, Claude Code, Cursor, VS Code, and others are listed), and follow the tailored steps. OAuth is recommended; an API key also works.

The MCP Server Trigger shows two URLs: a **Test** URL that works while you're editing (and shows the data in the editor), and a **Production** URL that works once the workflow is published.

## Other hosts

Zed, JetBrains IDEs, LM Studio, Goose, and many other apps support MCP. Their settings screens differ, but the ingredients are always the same: a name, then either a **command** with arguments (local) or a **URL** (remote), plus any keys. If an app only supports local servers and you need a remote one, a small bridge program such as `mcp-remote` can run locally and forward to the remote URL.

:::checklist
- I know which file and top-level key each of my apps uses
- I can convert a Claude Desktop config for Cursor, VS Code, Devin Desktop, or Gemini CLI
- I can add a remote server to ChatGPT as a plugin and call it with `@`
- I know where to find MCP logs in Cursor and VS Code
:::

