# Quick Reference {.unnumbered}

:::cheatsheet
**Roles:** Host = your AI app · Client = one connection · Server = adds tools/resources/prompts

**Remote server:** paste URL → sign in (OAuth) · Claude: [[Customize > Connectors > Add custom connector]] · ChatGPT: chatgpt.com/plugins → Add custom MCP server

**Local server (Claude Desktop):** menu bar Settings → Developer → Edit Config → add under `"mcpServers"` → fully restart

**Claude Code:** `claude mcp add --transport http <name> <url>` · `claude mcp add <name> -- <command>` · `--scope local|project|user` · `claude mcp list` · `/mcp`

**Gemini CLI:** `gemini mcp add --transport http <name> <url>` · `gemini mcp list` · `/mcp`

**Cursor:** `~/.cursor/mcp.json` → `"mcpServers"` · **VS Code:** `.mcp.json` → `"mcpServers"`, or `.vscode/mcp.json` → `"servers"` · **Devin Desktop:** `~/.config/devin/mcp_config.json`

**Python server:** `uv add "mcp[cli]"` · `from mcp.server import MCPServer` · `@mcp.tool()` · `uv run mcp dev server.py` · `uv run mcp install server.py`

**TypeScript server:** `npm install @modelcontextprotocol/server zod` · `registerTool` · `serveStdio(createServer)` · `createMcpHandler` for HTTP

**Test a server:** `npx @modelcontextprotocol/inspector <command>` · `--server-url <url> --transport http` · `--cli --method tools/list`

**Logs:** Claude Desktop `~/Library/Logs/Claude/mcp*.log` · Cursor Output → MCP Logs · VS Code MCP: List Servers → Show Output

**Publish:** `mcp-publisher init` · `mcp-publisher login github` · `mcp-publisher publish`

**Safety:** official servers · least privilege · approvals on for write/send/delete · remove unused connectors
:::

