
# MCP Servers and Connectors

Every MCP tool call can trigger an approval prompt. Here's how to approve them up front in each host.

| Host | Auto-approve MCP tools |
|---|---|
| **Claude Code** | Allow rules: `"mcp__github__*"`, `"mcp__notion__*"`, one per server (a bare `mcp__*` is ignored). Or bypass mode. `"enableAllProjectMcpServers": true` skips approving `.mcp.json` servers |
| **Claude apps** | Connector, then **Tool permissions**, then **Always allow** |
| **Cursor** | **Run Everything** covers MCP calls; Auto-review sends them to the classifier |
| **VS Code** | **Allow all**, Autopilot, or `chat.tools.global.autoApprove` |
| **Codex** | `approval_policy = "never"`, or `default_tools_approval_mode = "approve"` per server |
| **Gemini CLI** | `--approval-mode=yolo`, or per server `"trust": true` in its `mcpServers` entry |
| **n8n AI Agent** | Don't add human-review steps to its tools |
| **Cursor CLI** | `--approve-mcps`, plus `Mcp(server:tool)` allow tokens |
| **Copilot CLI** | `--allow-tool='ServerName'` |

## Give servers enough power

- **Remote OAuth servers** (GitHub, Notion, Linear…) act with *your* account's permissions. Approve every scope they request during sign-in.
- **Token-based servers:** create the token with the broad scopes from Chapter 12 (GitHub) or full capabilities (Notion, Chapter 15).
- **Local servers:** they run with your user's file and network permissions. Point filesystem servers at the folders you want writable.

**Still asks:** tools a server marks as needing user interaction (`requiresUserInteraction`) always prompt in Claude Code, and so do connector tools your organization set to "ask." ChatGPT's developer-mode connectors may still ask you to confirm write actions.

## What MCP is, in one paragraph

The **Model Context Protocol (MCP)** is a standard way for agents to use outside tools. An **MCP server** is a small program (on your computer, or a web address) that offers tools such as "create issue" or "search pages". The **host** is the agent app that connects to it. Each tool call is a separate action the host may ask you to approve, which is why MCP is a common source of prompts.

## Approve servers, then tools

Most hosts ask twice: once to *connect* a server, and again for each *tool call*. Remove both:

| Host | Approve connecting | Approve calls |
|---|---|---|
| Claude Code | `enableAllProjectMcpServers: true` | `mcp__server__*` allow rules |
| Cursor CLI | `--approve-mcps` | `Mcp(*:*)` |
| Gemini CLI | Trusted folder | `"trust": true` |
| Codex | Configured in `config.toml` | `approval_mode = "approve"` |

> [!WARNING]
> An MCP server that reads email, web pages, or tickets is a prompt-injection doorway. Auto-approve its *read* tools freely, but think twice before auto-approving *write* tools on the same agent that reads untrusted content.

:::checklist
- Every server you rely on is approved to connect
- Its tools are pre-approved in each host you use
- Tokens behind those servers follow the "narrow but complete" rule
:::
