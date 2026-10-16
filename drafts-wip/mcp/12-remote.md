# Remote Servers and Deploying Them

A local server only works on the computer where it's installed. To share a server with your team, or to use it from claude.ai, ChatGPT, or your phone, it must run on the internet over **Streamable HTTP**. This chapter takes the servers you built and puts them online.

:::summary In this chapter
- When to go remote, and what changes
- Serving over HTTP from Python and TypeScript
- Deploying to Cloudflare Workers
- Securing a public server: Host checks, tokens, and OAuth
- Connecting your deployed server to Claude and ChatGPT
:::

## When to go remote

| Keep it local when… | Go remote when… |
|---|---|
| It works on your own files or apps | Other people need to use it |
| It's personal and experimental | You want it in claude.ai, ChatGPT, or mobile |
| It needs your computer's browser or devices | It wraps a cloud API or database |

Remote servers need extra care: anyone who finds the URL can try to use it, so a public server needs authentication unless its tools are harmless.

## Python: serving over HTTP

Change one line of your server:

```python
if __name__ == "__main__":
    mcp.run(transport="streamable-http", port=3001)
```

Clients now connect to `http://127.0.0.1:3001/mcp`. The defaults are host `127.0.0.1`, port `8000`, and path `/mcp`. Without editing code, `uv run mcp run server.py --transport streamable-http` does the same on port 8000.

Test it from a second terminal:

```bash
npx @modelcontextprotocol/inspector \
  --server-url http://127.0.0.1:3001/mcp --transport http
```

### Going live behind a real hostname

For deployment, build the web app yourself and tell it which hostnames to accept. This protects against **DNS rebinding**, a trick where a malicious web page reaches servers on your machine:

```python title=server.py
from mcp.server import MCPServer
from mcp.server.transport_security import TransportSecuritySettings

mcp = MCPServer("Notes")


@mcp.tool()
def add_note(text: str) -> str:
    """Save a note."""
    return f"Saved: {text}"


security = TransportSecuritySettings(
    allowed_hosts=["mcp.example.com", "mcp.example.com:*"],
)
app = mcp.streamable_http_app(transport_security=security)
```

Run it with **uvicorn**, the web server the SDK installs: `uvicorn server:app --host 0.0.0.0 --port 8000`. Behind a proxy that handles HTTPS, add `--proxy-headers --forwarded-allow-ips='<proxy address>'`.

> [!WARNING]
> If a freshly deployed Python server answers every request with **421 Misdirected Request** or "Invalid Host header," its hostname isn't in `allowed_hosts`. Add it (both with and without `:*`) and redeploy.

## TypeScript: serving over HTTP

`createMcpHandler` turns your server factory into a standard web handler. A new server instance serves every request, so there's no state to share between machines and the server scales easily.

```ts title=src/http.ts
import { createServer } from 'node:http';
import { createMcpHandler, McpServer } from '@modelcontextprotocol/server';
import {
  localhostHostValidation,
  localhostOriginValidation,
  toNodeHandler,
} from '@modelcontextprotocol/node';
import * as z from 'zod/v4';

const handler = createMcpHandler(() => {
  const server = new McpServer({ name: 'notes', version: '1.0.0' });
  server.registerTool(
    'add-note',
    {
      description: 'Save a note',
      inputSchema: z.object({ text: z.string() }),
    },
    async ({ text }) => ({
      content: [{ type: 'text', text: `Saved: ${text}` }],
    }),
  );
  return server;
});

const nodeHandler = toNodeHandler(handler);
const validateHost = localhostHostValidation();
const validateOrigin = localhostOriginValidation();

createServer((req, res) => {
  if (!validateHost(req, res) || !validateOrigin(req, res)) return;
  void nodeHandler(req, res);
}).listen(3000, '127.0.0.1');
```

Install the extra package with `npm install @modelcontextprotocol/node`, run `npx tsx src/http.ts`, and connect to `http://127.0.0.1:3000/mcp`. Ready-made helpers also exist for Express, Fastify, and Hono (`@modelcontextprotocol/express` and friends).

## Deploying to Cloudflare Workers

**Cloudflare Workers** run small programs on Cloudflare's global network, and the free tier is generous for experiments. The TypeScript SDK's handler already has the shape Workers expect, so the whole server is one file.

:::steps Deploy a remote MCP server to Cloudflare
1. **Create a Cloudflare account** at cloudflare.com, if you don't have one.
2. **Create a Worker project:**
   ```bash
   npm create cloudflare@latest my-mcp
   cd my-mcp
   npm install @modelcontextprotocol/server zod
   ```
   When asked, choose the simple "Hello World" Worker starter and TypeScript.
3. **Replace `src/index.ts`** with:
   ```ts title=src/index.ts
   import { createMcpHandler, McpServer } from '@modelcontextprotocol/server';
   import * as z from 'zod/v4';

   const handler = createMcpHandler(() => {
     const server = new McpServer({ name: 'notes', version: '1.0.0' });
     server.registerTool(
       'add-note',
       {
         description: 'Append a note',
         inputSchema: z.object({ text: z.string() }),
       },
       async ({ text }) => ({
         content: [{ type: 'text', text: `Saved: ${text}` }],
       }),
     );
     return server;
   });

   export default handler;
   ```
4. **Try it locally** with `npx wrangler dev`. It serves on `http://127.0.0.1:8787`; test `http://127.0.0.1:8787/mcp` with the Inspector.
5. **Deploy** with `npx wrangler deploy` and sign in when asked. Wrangler prints your address, such as `https://my-mcp.your-account.workers.dev`.
6. **Test the live URL** (`…workers.dev/mcp`) with the Inspector before connecting an app.
:::

> [!NOTE]
> Cloudflare also offers a one-command template: `npm create cloudflare@latest -- remote-mcp-server-authless --template=cloudflare/ai/demos/remote-mcp-authless`. Cloudflare's own docs note that its quick-deploy templates use an older, deprecated approach, so prefer the SDK handler above (or Cloudflare's current `mcp-worker` example) for anything new.

On a public deployment, add `hostHeaderValidationResponse` and `originValidationResponse` from `@modelcontextprotocol/server` in front of the handler to accept only your own hostname, and add authentication before you give it tools that read or change private data.

## Authentication for remote servers

There are three common levels:

| Level | How | Good for |
|---|---|---|
| **None** | Anyone with the URL can call it | Harmless public tools (weather, dice) |
| **Fixed key** | Clients send a header such as `Authorization: Bearer <key>` | Personal or team servers |
| **OAuth** | Users sign in; each gets their own token and scopes | Servers that act on each user's data |

For a fixed key, check the header yourself before passing the request to the MCP handler, and keep the key in your host's secret settings (in Cloudflare, `npx wrangler secret put API_KEY`). Claude's custom connectors and Claude Code (`--header`) can both send a fixed header.

For OAuth, your server must publish **protected resource metadata** pointing at an **authorization server** (a sign-in service such as Auth0, Okta, Cloudflare Access, or your own) and reject requests without a valid token with `401 Unauthorized`. Both SDKs include helpers for verifying tokens. Read "Understanding Authorization in MCP" at modelcontextprotocol.io before building this: getting OAuth subtly wrong is a classic source of security holes.

## Connecting your deployed server

- **Claude:** [[Customize > Connectors]], **+ Add**, **Add custom connector**, paste `https://…/mcp`. Remember that Claude connects from Anthropic's cloud, so the server must be publicly reachable.
- **Claude Code:** `claude mcp add --transport http notes https://my-mcp.your-account.workers.dev/mcp`
- **ChatGPT:** chatgpt.com/plugins, **Add custom MCP server**.
- **Apps that only run local servers:** use the `mcp-remote` bridge, `npx mcp-remote https://…/mcp`, as the command.

:::checklist
- My server answers on `/mcp` over HTTPS, tested with the Inspector
- Only my own hostname is accepted
- Anything private or destructive requires a key or OAuth
- Secrets live in my host's secret store, not in the code
- I've added it to at least one app and called a tool
:::

