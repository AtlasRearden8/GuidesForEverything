# Debugging and Logs

When a server won't connect or misbehaves, guessing wastes hours. A calm, layer-by-layer method finds the problem in minutes. This chapter gives you that method and shows where every app keeps its logs.

:::summary In this chapter
- A five-step method that works for any app and any server
- Where to find logs in Claude Desktop, Claude Code, Cursor, VS Code, and Gemini CLI
- Reading common error messages
- Environment, path, and timeout problems
:::

## The method: work from the bottom up

:::steps Find the broken layer
1. **Check the config file.** Is the JSON valid? Is the top-level key right (`mcpServers` or `servers`)? Are paths absolute?
2. **Run the server yourself.** Copy the `command` and `args` into a terminal. A local stdio server should print nothing and wait; press <kbd>Ctrl</kbd> + <kbd>C</kbd>. An error message or an instant exit is your real bug.
3. **Test it in the Inspector.** If it works there, the server is fine and the problem is the app's setup. If it fails there too, the problem is the server.
4. **Read the app's logs** (below). Look for the server's name and the first error, not the last.
5. **Restart properly.** Apps read configs at launch. Fully quit (not just close) the app, then reopen it.
:::

> [!TIP]
> Change one thing at a time, and restart after each change. Changing three things at once means you never learn which one mattered.

## Where the logs are

| App | Where to look |
|---|---|
| **Claude Desktop** (macOS) | `~/Library/Logs/Claude/` |
| **Claude Desktop** (Windows) | `%APPDATA%\Claude\logs\` |
| **Claude Code** | `claude mcp list`, `claude mcp get <name>`, and `/mcp` |
| **Cursor** | Output panel (<kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd>), then **MCP Logs** |
| **VS Code** | **MCP: List Servers**, pick the server, **Show Output** |
| **Gemini CLI** | `gemini mcp list` and `/mcp` |
| **MCP Inspector** | **Console** (local) or **Network** (remote) tab |

### Claude Desktop in detail

`mcp.log` records connections and connection failures. Each `mcp-server-NAME.log` holds that server's own stderr output, so look there for tracebacks. To follow them live:

```bash
# macOS
tail -n 20 -F ~/Library/Logs/Claude/mcp*.log
```

```powershell
# Windows (PowerShell)
type "$env:AppData\Claude\logs\mcp*.log"
```

For deeper problems you can enable Chrome DevTools inside Claude Desktop by creating `developer_settings.json` containing `{"allowDevTools": true}` next to `claude_desktop_config.json`, then pressing <kbd>Cmd</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (macOS) or <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>I</kbd> (Windows).

### Claude Code in detail

`claude mcp list` shows each server's status. `claude mcp get <name>` adds an `Issue:` line with the last error, including the HTTP status code for remote servers. For a full trace, start Claude Code with `claude --debug-file /tmp/claude-debug.log` and search the file for the server's name.

## Reading common messages

| You see | It usually means |
|---|---|
| `spawn npx ENOENT` / `command not found` | The app can't find the program; use its full path |
| `Cannot find module` / `ModuleNotFoundError` | A dependency isn't installed where the app runs it |
| `Unexpected token` / "not valid JSON" | Something printed to stdout; log to stderr instead |
| `401 Unauthorized` | You need to sign in, or the token expired |
| `403 Forbidden` | Signed in, but the token lacks permission (scope) |
| `404 Not Found` | Wrong URL; check the `/mcp` path |
| `421 Misdirected Request` | The server's Host allow-list doesn't include its hostname |
| `-32602` (Invalid params) | Wrong tool name or inputs that fail the schema |
| `-32603` (Internal error) | The server crashed while handling the request |
| Timeout | The server is slow to start or a tool is slow |

## Environment problems

Apps start local servers with a **minimal environment**: fewer settings than your terminal has, and a different working folder.

- **PATH:** the list of folders where your system looks for programs. If your terminal finds `npx` but the app doesn't, use the full path from `which npx`. People who installed Node.js through a version manager (such as nvm) hit this most.
- **Working folder:** may be `/`. Use absolute paths for every file and folder.
- **Variables:** put each server's keys in its own `env` block; don't rely on your shell profile.
- **Windows and `${APPDATA}`:** if a log mentions `${APPDATA}` in a path, add `"APPDATA": "C:\\Users\\you\\AppData\\Roaming\\"` to that server's `env`, and make sure npm is installed globally (`npm install -g npm`).

## Timeouts

- **Claude Code:** `MCP_TIMEOUT=10000 claude` allows 10 seconds for start-up; a `"timeout"` field in milliseconds on a server entry limits each tool call.
- **Gemini CLI:** a `timeout` field per server (default 10 minutes).
- **First runs are slow:** `npx` and `uvx` download packages the first time. Run the command once in a terminal to warm the cache.

:::checklist
- I ran the server's command myself before blaming the app
- I tested it in the Inspector
- I found the app's log and read the first error
- I used absolute paths and per-server `env`
- I fully restarted the app after every change
:::

