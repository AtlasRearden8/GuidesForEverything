# Connect MCP in Claude

Claude was the first MCP host, and it offers three ways in: **connectors** in claude.ai and the Claude apps, **local servers** in Claude Desktop, and the `claude mcp` commands in **Claude Code**. This chapter covers all three, step by step.

:::summary In this chapter
- Adding connectors from Anthropic's directory, and custom connectors by URL
- Connectors on Team and Enterprise plans
- Running local servers in Claude Desktop, and one-click desktop extensions
- Claude Code: adding servers, scopes, `.mcp.json`, sign-in, and everyday commands
:::

## Connectors in claude.ai and the Claude apps

Claude's **Connectors** are MCP servers. Many popular ones (Google Drive, Gmail, Calendar, GitHub, Notion, Slack, Asana, Canva, Figma, and more) are listed in Anthropic's **Connectors Directory** and connect in a couple of clicks. Connectors work across Claude on the web, Claude Desktop, Cowork, and the mobile apps, and connectors you add in claude.ai also appear in Claude Code when you're signed in with the same account.

:::steps Add a connector from the directory
1. **Open the directory.** In claude.ai or the Claude app, go to [[Customize > Connectors]] and click **+** next to **Connectors**. Or, in a chat, click **+** (or type `/`), hover over **Connectors**, choose **Manage connectors**, then click **+**.
2. **Pick a service.** Browse by category or scroll the full list, and click a connector to read what it can read and write.
3. **Click Connect** (or **Install**).
4. **Sign in and approve** in the browser window that opens.
5. **Use it.** In a chat, click **+**, then **Connectors**, and make sure it's switched on. Then ask, for example: "What's on my calendar tomorrow?"
:::

Once a connector is set up, Claude can bring it into a conversation on its own when it fits what you ask, so you don't have to name it every time. You can still switch connectors on and off per conversation from the **+** menu.

## Add any remote server as a custom connector

Custom connectors are available on Free, Pro, Max, Team, and Enterprise plans. **Free users are limited to one custom connector.**

:::steps Add a custom connector (Pro and Max)
1. **Open** [[Customize > Connectors]].
2. **Click + Add**, then choose **Add custom connector**.
3. **Enter a name** (what you'll see in the list) and **paste the server URL** given by the provider, for example `https://mcp.notion.com/mcp`. Click **Continue**.
4. **Review the authentication settings** Claude detected, and click **Continue**.
5. **Choose how people sign in** under **Authentication**: "Sign in now," "Sign in when needed," or "No sign in."
6. **Choose the OAuth client.** "Use Claude's published identity (Recommended)" suits almost everyone. The other options, "Register automatically" and "Use your own OAuth client," are for servers that need them.
7. **Add request headers** only if the provider gave you a fixed API key or token instead of OAuth.
8. **Click Add**, then sign in if prompted.
9. **Review tool permissions.** Click the connector to switch individual tools on or off.
:::

> [!IMPORTANT]
> Custom connectors are reached from **Anthropic's cloud**, not from your computer, even in Claude Desktop. A server on your home network, behind a company VPN, or on `localhost` won't work as a custom connector. It must be reachable on the public internet (or your firewall must allow Anthropic's published IP addresses). For servers on your own machine, use Claude Desktop's local servers instead.

To change a custom connector, remove it (the **⋯** menu next to it in [[Customize > Connectors]]) and add it again with the new details.

## Connectors on Team and Enterprise plans

On Team plans only **Owners** and **Primary Owners** can add connectors for the organization; on Enterprise, people with a custom role that includes managing libraries can too.

:::steps Add a connector for your organization (owners)
1. **Go to** [[Organization settings > Connectors]].
2. **For a directory connector**, click **Browse connectors**, pick one, and click **Add to your team**.
3. **For a custom one**, click **Add**, hover over **Custom**, and select **Web**. Then follow the same name, URL, authentication, and headers steps as above.
4. **Tell your team.** Each member then opens [[Customize > Connectors]], finds the connector (custom ones carry a "Custom" label), and clicks **Connect** to sign in with their own account.
:::

Enabling a connector for the team doesn't give anyone access by itself: each person signs in individually, so Claude can only reach what that person can already reach. The exception is a connector set up with a **shared credential**, such as one API key in the request headers; everyone using it then has that key's access, so choose a key limited to what members should see. Owners can also restrict actions organization-wide, for example allowing a connector to read email but not send it.

## Local servers in Claude Desktop

Claude Desktop (for macOS, Windows, and Linux) can also run **local** servers from a config file. These use your computer's own network and files, and are separate from connectors.

:::steps Add the filesystem server to Claude Desktop
1. **Open Claude Desktop's settings** from the *menu bar* (on a Mac, **Claude** in the top menu, then **Settings…**), not the account settings inside the window.
2. **Go to the Developer tab** and click **Edit Config**. This opens `claude_desktop_config.json`:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
3. **Paste this**, replacing `username` with your computer's user name:
   ```json title=claude_desktop_config.json
   {
     "mcpServers": {
       "filesystem": {
         "command": "npx",
         "args": [
           "-y",
           "@modelcontextprotocol/server-filesystem",
           "/Users/username/Desktop",
           "/Users/username/Downloads"
         ]
       }
     }
   }
   ```
4. **Save, then fully quit and reopen Claude Desktop.** Closing the window isn't enough.
5. **Check it's connected.** Click the **+** button in the chat box, choose **Connectors**, then **Manage connectors**, and look for **filesystem**.
6. **Try it:** "Make a folder on my Desktop called Receipts and move any PDFs from Downloads with 'receipt' in the name into it."
:::

On Windows, the same config uses doubled backslashes:

```json title=claude_desktop_config.json (Windows)
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Users\\username\\Desktop",
        "C:\\Users\\username\\Downloads"
      ]
    }
  }
}
```

Let's decode the config. `"filesystem"` is a friendly name you choose. `"command": "npx"` uses Node.js to run the server. `"-y"` answers "yes" automatically when npx asks to download the package. `@modelcontextprotocol/server-filesystem` is the package's exact name. Every argument after that is a folder the server is allowed to touch.

> [!CAUTION]
> A local server runs with *your* user account's permissions. Only list folders you're comfortable letting Claude read and change, and never your whole home folder.

### Approving actions

Before Claude runs a tool, Claude Desktop shows what it wants to do and asks for approval. Read the request: which tool, which file, which values. You can allow it once, allow it for the rest of the chat, or deny it. When in doubt, deny and ask Claude to explain what it was trying to do.

### Passing secrets to a local server

Many servers need an API key. Add an `env` block to that server's entry:

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@brave/brave-search-mcp-server"],
      "env": { "BRAVE_API_KEY": "paste-your-key-here" }
    }
  }
}
```

The package name above is an example; always copy the exact name from the server's own documentation.

### Desktop extensions: no config file needed

**Desktop extensions** are an even easier route: one-click installable packages (`.mcpb` files) for local servers, rather like browser extensions.

:::steps Install a desktop extension
1. **Open** [[Settings > Extensions]] in Claude Desktop.
2. **Click Browse extensions** to see Anthropic-reviewed extensions, and click **Install** on one you want.
3. **Fill in any settings** it asks for, such as an API key or a folder.
4. **Use it.** It's available in your conversations straight away.
:::

To install an extension file someone gave you, open [[Settings > Extensions]], click **Advanced settings**, find **Extension Developer**, click **Install Extension…**, and choose the `.mcpb` file. Only do this for files from people you trust.

> [!TIP]
> Claude Desktop writes MCP logs to `~/Library/Logs/Claude/` on macOS and `%APPDATA%\Claude\logs\` on Windows. `mcp.log` records connections; `mcp-server-NAME.log` holds each server's own messages. Chapter 14 shows how to read them.

## Claude Code

**Claude Code** is Anthropic's coding agent for the terminal (with desktop and web versions too; see the *Claude Code* manual in this series). It adds servers with the `claude mcp` command rather than a hand-edited file.

### Adding servers

```bash
# A remote server (recommended for cloud services)
claude mcp add --transport http notion https://mcp.notion.com/mcp

# A remote server that uses an API key in a header
claude mcp add --transport http secure-api https://api.example.com/mcp \
  --header "Authorization: Bearer your-token"

# A local server: everything after -- is the command to run
claude mcp add filesystem -- \
  npx -y @modelcontextprotocol/server-filesystem ~/Documents

# A local server with a secret
claude mcp add --env AIRTABLE_API_KEY=YOUR_KEY --transport stdio airtable \
  -- npx -y airtable-mcp-server
```

The `--` (double dash) is important for local servers. Everything before it is for Claude Code (`--transport`, `--env`, `--scope`); everything after it is passed to the server untouched. Server names may use only letters, numbers, hyphens, and underscores.

> [!NOTE]
> Older services sometimes offer only an SSE address ending in `/sse`. Try `--transport http` first; recent Claude Code versions fall back automatically. `--transport sse` still exists but is deprecated.

### Scopes: who and where a server loads

| Scope | Loads in | Shared with team | Stored in |
|---|---|---|---|
| `local` (default) | This project only | No | `~/.claude.json` |
| `project` | This project only | Yes, via Git | `.mcp.json` in the project |
| `user` | All your projects | No | `~/.claude.json` |

```bash
claude mcp add --transport http stripe --scope local https://mcp.stripe.com
claude mcp add --transport http shared --scope project https://example.com/mcp
claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com/anthropic
```

A **project-scoped** server is written to a `.mcp.json` file at the root of your project, which you can commit to Git so teammates get the same servers:

```json title=.mcp.json
{
  "mcpServers": {
    "shared-server": {
      "type": "http",
      "url": "https://example.com/mcp"
    }
  }
}
```

For safety, Claude Code asks for your approval before it uses servers from a project's `.mcp.json` for the first time. To forget those choices, run `claude mcp reset-project-choices`. If the same server name appears in several scopes, local wins over project, which wins over user.

### Keeping secrets out of `.mcp.json`

Shared files shouldn't contain secrets. Claude Code expands **environment variables** in `.mcp.json`: `${VAR}` becomes the value of `VAR`, and `${VAR:-default}` uses `default` when `VAR` isn't set.

```json title=.mcp.json
{
  "mcpServers": {
    "api-server": {
      "type": "http",
      "url": "${API_BASE_URL:-https://api.example.com}/mcp",
      "headers": { "Authorization": "Bearer ${API_KEY}" }
    }
  }
}
```

Each teammate sets `API_KEY` in their own shell. As a safety measure, Claude Code refuses to send its own credentials (such as `ANTHROPIC_API_KEY`) to a remote server this way; give your server its own variable name.

### Signing in to remote servers

:::steps Sign in to a server that uses OAuth
1. **Add the server**, for example Sentry:
   ```bash
   claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
   ```
2. **Start Claude Code** with `claude` and type `/mcp`.
3. **Pick the server** marked as needing authentication, and follow the steps in your browser.
4. **Check the status** with `claude mcp list`. You want `✔ Connected`.
:::

You can also sign in from your shell with `claude mcp login sentry` (add `--no-browser` over SSH, then open the printed link on your own computer) and sign out with `claude mcp logout sentry`. Tokens are stored securely and refreshed automatically; **Clear authentication** in the `/mcp` menu revokes them.

### Everyday commands

:::cheatsheet
`claude mcp list` · list servers with a health status (`✔ Connected`, `! Needs authentication`, `✘ Failed to connect`)

`claude mcp get <name>` · details and the last error for one server

`claude mcp remove <name>` · remove a server (and its stored sign-in)

`claude mcp add-json <name> '<json>'` · add a server from a JSON snippet

`claude mcp add-from-claude-desktop` · import servers from Claude Desktop (macOS and WSL)

`/mcp` (inside Claude Code) · status, sign-in, enable or disable, reconnect

`claude mcp serve` · run Claude Code itself as an MCP server for other apps
:::

### Copying a config written for another app

Server instructions are often written for Claude Desktop or Cursor. You can paste the inside of their `mcpServers` entry straight into `add-json`:

```bash
claude mcp add-json example \
  '{"command":"npx","args":["-y","@example/mcp-server"]}'
```

One trap: an entry with a `url` but no `type` is read as a *local* server and fails. Add `"type": "http"` to remote entries.

### Using resources, prompts, and big results

- **Resources:** type `@` in your message to see resources from connected servers next to your files, for example `@github:issue://123`.
- **Prompts:** type `/` to see them, listed as `/server:prompt (MCP)`. You can also run `/mcp__github__pr_review 456`, with arguments separated by spaces.
- **Large outputs:** Claude Code warns when a tool returns over 10,000 tokens and, by default, saves results over 25,000 tokens to a file. Raise the limit with the `MAX_MCP_OUTPUT_TOKENS` environment variable, for example `MAX_MCP_OUTPUT_TOKENS=50000 claude`.
- **Slow servers:** `MCP_TIMEOUT=10000 claude` gives servers 10 seconds to start.
- **Many servers:** Claude Code's **tool search** loads full tool descriptions only when needed, so connecting lots of servers barely affects its memory.

> [!TIP]
> Want Claude to help? Run `/plugin install mcp-server-dev@claude-plugins-official` inside Claude Code, then `/mcp-server-dev:build-mcp-server`. Claude asks about your use case and scaffolds a server for you.

:::checklist
- I can add a directory connector and a custom connector in claude.ai
- I know custom connectors must be reachable from the public internet
- I can edit `claude_desktop_config.json` and fully restart Claude Desktop
- I can add a remote and a local server in Claude Code, and choose a scope
- I can sign in with `/mcp` and check status with `claude mcp list`
:::

