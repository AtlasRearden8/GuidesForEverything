# Troubleshooting

Find your symptom, try the fix, and if that fails, follow the five-step method in Chapter 14.

## Setup and configuration

:::compact
| Symptom | Likely cause and fix |
|---|---|
| Server doesn't appear at all | Invalid JSON (check commas and quotes), wrong top-level key (`servers` vs `mcpServers`), or the app wasn't fully restarted |
| Only the first server loads | You pasted a second `mcpServers` block; merge both entries into one |
| "Edit Config" button missing | You opened the account settings inside the window; use the menu-bar **Settings…** in Claude Desktop |
| `mcp install` says "Claude app not found" | Install Claude Desktop and open it once so its config folder exists |
| Paths not working | Use absolute paths, e.g. `/Users/sam/Documents` not `~/Documents`; double the backslashes on Windows |
| Works in terminal, not in the app | The app has a smaller PATH and environment; use full paths and an `env` block |
| VS Code server won't start | The folder isn't trusted (Workspace Trust), or you declined the server trust prompt |
| Cursor shows a red dot | Open the Output panel, choose **MCP Logs**, and read the error |
| Claude Code ignores a `url` server | Add `"type": "http"`; an entry without `type` is treated as local |
| Claude Code asks to approve servers | They're from the project's `.mcp.json`; approve them, or run `claude mcp reset-project-choices` |
:::

## Starting local servers

:::compact
| Symptom | Likely cause and fix |
|---|---|
| "Failed to connect" / red status | Run the server's command yourself in a terminal to see the error; check that Node.js or uv is installed |
| `npx` or `uv` "not found" | The app can't see your PATH. Use the full path, e.g. `/usr/local/bin/npx` (find it with `which npx`, or `where npx` on Windows) |
| `ENOENT` with `${APPDATA}` (Windows) | Add the expanded `APPDATA` path to the server's `env` and install npm globally |
| First start times out | `npx`/`uvx` is downloading; run the command once in a terminal, or raise the timeout |
| Server starts then disconnects | Something wrote to stdout; switch `print`/`console.log` to logging on stderr |
| Python `ModuleNotFoundError: mcp` | Run through `uv run` (or `uv run --with "mcp[cli]"`) so the SDK is available |
| `ImportError` for `FastMCP` | You have SDK v2; use `from mcp.server import MCPServer` |
| TypeScript "Cannot use import statement" | Add `"type": "module"` to `package.json` |
| Docker server exits immediately | Use `docker run -i --rm` (interactive), not `-d` |
:::

## Remote servers and sign-in

:::compact
| Symptom | Likely cause and fix |
|---|---|
| "Needs authentication" | Sign in from the app's connector panel (`/mcp` in Claude Code, `/mcp auth` in Gemini CLI) |
| Browser sign-in never returns | Copy the callback URL from the browser's address bar into the app's prompt (Claude Code), or retry |
| 401 after it worked before | The token expired or was revoked; sign in again or clear authentication |
| 403 Forbidden | The token lacks the needed scope; create a token with the right permissions |
| 404 Not Found | Wrong URL; most servers end in `/mcp`, older ones in `/sse` |
| Custom connector can't connect, but my browser can | Claude connects from Anthropic's cloud; the server must be public, not on localhost or a VPN |
| Free Claude account can't add a second custom connector | Free plans allow one; remove the old one or upgrade |
| Team members can't add connectors | Only Owners (or an Enterprise role with library access) can add them at [[Organization settings > Connectors]] |
| ChatGPT can't add a server | Workspace settings may block custom MCP servers; ask your admin |
| Deployed Python server returns 421 | Add your hostname to `allowed_hosts` in `TransportSecuritySettings` |
:::

## Tools and behaviour

:::compact
| Symptom | Likely cause and fix |
|---|---|
| AI never uses the tool | Mention it explicitly ("use the GitHub connector to…"), make sure it's switched on, and check the tool descriptions |
| AI picks the wrong tool | Make names and descriptions more specific; switch off overlapping tools or servers |
| Connected, but zero tools | The server crashed on start, or tools registered on a different server object; check the Console tab |
| Too many tools, slow responses | Disable servers and tools you don't need; each one takes up the AI's attention and context |
| Tool results cut off or saved to a file | The output is too large; return less, paginate, or raise `MAX_MCP_OUTPUT_TOKENS` in Claude Code |
| New tools don't appear | Restart the app, or **Refresh** the plugin in ChatGPT |
| Asked to approve every call | Approvals protect you; allow trusted read-only tools for the session where the app offers it |
| Prompts don't show as commands | Type `/` in Claude Code; prompts appear as `/server:prompt (MCP)` |
| Resource not listed | Templates (URIs with `{blanks}`) appear under resource templates, not resources |
| Tool returns "Error executing tool" | An unexpected crash; read the server log, and raise `ToolError` for expected problems |
:::

## Still stuck?

:::steps Last-resort steps
1. **Test with the Inspector** to separate server problems from app problems.
2. **Try a known-good server**, such as `npx -y @modelcontextprotocol/server-everything`. If that fails too, the problem is your app or machine setup.
3. **Update everything**: the app, Node.js, uv, and the server package.
4. **Search the server's GitHub issues** for your exact error message.
5. **Ask an AI for help**, pasting your config (with secrets removed) and the first error from the log.
:::

