# Build Your Own Server in TypeScript

**TypeScript** is JavaScript with type labels added, and it's the other most popular language for MCP servers. If you already know JavaScript, or your project lives in the Node.js world, this is the SDK for you. Version 2 of the official TypeScript SDK is split into packages: `@modelcontextprotocol/server` for servers and `@modelcontextprotocol/client` for clients.

:::summary In this chapter
- Setting up a Node.js project with the TypeScript SDK
- Registering tools with Zod schemas
- Resources, resource templates, and prompts
- Connecting to Claude Desktop, Claude Code, Cursor, and VS Code
:::

## Setting up

You need **Node.js 20 or later**.

:::steps Create a weather-alerts project
1. **Make a folder and project:**
   ```bash
   mkdir weather && cd weather
   npm init -y
   npm pkg set type=module
   npm install @modelcontextprotocol/server zod tsx
   mkdir src
   ```
2. **Understand what you installed.** `@modelcontextprotocol/server` is the SDK. **Zod** describes and checks the shape of inputs. **tsx** runs TypeScript directly, so there's no build step. `type=module` matters because the SDK uses modern JavaScript modules only.
3. **Create `src/index.ts`** with the code in the next section.
:::

> [!NOTE]
> Tutorials written before mid-2026 install `@modelcontextprotocol/sdk` and call `server.tool(...)`. That's version 1. Version 2 uses `registerTool`, `registerResource`, and `registerPrompt`.

## A first tool

This server asks the US National Weather Service for active alerts in a state:

```ts title=src/index.ts (part 1)
import { McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import * as z from 'zod/v4';

const NWS_API = 'https://api.weather.gov';

interface AlertsResponse {
  features: { properties: { event?: string; headline?: string } }[];
}

function createServer(): McpServer {
  const server = new McpServer({ name: 'weather', version: '1.0.0' });
```

The `createServer` function is a **factory**: it builds and returns a fresh server. Now register the tool inside it:

```ts title=src/index.ts (part 2)
  server.registerTool(
    'get-alerts',
    {
      description: 'Get the active weather alerts for a US state',
      inputSchema: z.object({
        state: z.string().length(2).describe('Two-letter code, e.g. CA'),
      }),
    },
    async ({ state }) => {
      const code = state.toUpperCase();
      const res = await fetch(`${NWS_API}/alerts/active?area=${code}`, {
        headers: { 'User-Agent': 'mcp-weather-tutorial/1.0' },
      });
      if (!res.ok) {
        return {
          content: [{ type: 'text', text: `NWS error: HTTP ${res.status}` }],
          isError: true,
        };
      }
      const { features } = (await res.json()) as AlertsResponse;
      if (features.length === 0) {
        return { content: [{ type: 'text', text: `No alerts for ${code}.` }] };
      }
      const lines = features.map(
        (f) => f.properties.headline ?? f.properties.event ?? 'Alert',
      );
      return { content: [{ type: 'text', text: lines.join('\n') }] };
    },
  );

  return server;
}

void serveStdio(createServer);
console.error('weather MCP server running on stdio');
```

What's going on:

- `registerTool(name, config, handler)` registers a tool. The **Zod schema** in `inputSchema` is the only schema you write: the SDK turns it into JSON Schema for the AI, checks every call against it, and gives your handler typed inputs. Call it with `{ "state": "California" }` and the SDK rejects it, because that's longer than two letters.
- The handler returns **content**: a list of blocks, here one `text` block. `isError: true` marks a failure the AI can read.
- `serveStdio(createServer)` serves your factory over stdio.
- `console.error` writes to stderr. **Never use `console.log`** in a stdio server: it writes to stdout and corrupts the connection.

:::steps Run and test it
1. **Run it:** `npx tsx src/index.ts`. You'll see the banner and then nothing: it's waiting for a host. Press <kbd>Ctrl</kbd> + <kbd>C</kbd>.
2. **Open it in the Inspector:**
   ```bash
   npx @modelcontextprotocol/inspector npx tsx src/index.ts
   ```
3. **Click Connect**, open **Tools**, choose `get-alerts`, enter `TX`, and run it.
:::

## Resources

```ts title=resources.ts
import { McpServer, ResourceTemplate } from '@modelcontextprotocol/server';

const server = new McpServer({ name: 'workspace', version: '1.0.0' });

server.registerResource(
  'config',
  'config://app',
  { title: 'App config', description: 'Configuration', mimeType: 'text/plain' },
  async (uri) => ({
    contents: [{ uri: uri.href, text: 'log_level=info\nregion=eu-west-1' }],
  }),
);

server.registerResource(
  'user-profile',
  new ResourceTemplate('users://{userId}/profile', { list: undefined }),
  { title: 'User profile', mimeType: 'application/json' },
  async (uri, { userId }) => ({
    contents: [{ uri: uri.href, text: JSON.stringify({ userId, orders: 12 }) }],
  }),
);
```

A fixed resource takes a URI string; a template takes a `ResourceTemplate` with `{blanks}`. The `list: undefined` option means "don't try to list every possible user." Each item in `contents` carries either `text` or a base64-encoded `blob` for binary data.

## Prompts

```ts title=prompts.ts
import { McpServer } from '@modelcontextprotocol/server';
import * as z from 'zod/v4';

const server = new McpServer({ name: 'review', version: '1.0.0' });

server.registerPrompt(
  'review-code',
  {
    title: 'Code Review',
    description: 'Review code for best practices and potential issues',
    argsSchema: z.object({ code: z.string().describe('The code to review') }),
  },
  ({ code }) => ({
    messages: [
      {
        role: 'user' as const,
        content: { type: 'text' as const, text: `Review this code:\n\n${code}` },
      },
    ],
  }),
);
```

## Annotations

Add `title` and `annotations` to a tool's config to help apps decide when to ask for approval:

```ts
server.registerTool(
  'clear-catalog',
  {
    title: 'Clear the catalog',
    description: 'Remove every product from the catalog',
    annotations: { readOnlyHint: false, destructiveHint: true },
  },
  async () => {
    catalog.length = 0;
    return { content: [{ type: 'text', text: 'Catalog cleared' }] };
  },
);
```

A tool that takes no inputs simply leaves out `inputSchema`.

## Connecting your TypeScript server

Every host needs the same thing: a command that starts the server, with **absolute** paths.

```json title=claude_desktop_config.json
{
  "mcpServers": {
    "weather": {
      "command": "npx",
      "args": ["tsx", "/Users/sam/weather/src/index.ts"]
    }
  }
}
```

```bash
# Claude Code
claude mcp add weather -- npx tsx /Users/sam/weather/src/index.ts
```

Use the same `command` and `args` in Cursor's `mcpServers` or VS Code's `servers` (with `"type": "stdio"`). For a faster start in production, compile with the TypeScript compiler and run the output with `node`.

## Let an agent build it

```prompt
Using the official MCP TypeScript SDK v2 (@modelcontextprotocol/server,
registerTool, zod/v4, serveStdio), build a server with tools to list,
add, and complete to-dos stored in todos.json. Add annotations
(readOnlyHint, destructiveHint), return isError results for bad input,
log only with console.error, and test every tool with the MCP Inspector
CLI. Then give me the configs for Claude Desktop and Cursor.
```

:::checklist
- My project has `"type": "module"` and uses `@modelcontextprotocol/server`
- Each tool has a clear description and a Zod `inputSchema`
- I log with `console.error`, never `console.log`
- Failures return `isError: true` with a helpful message
- Host configs use absolute paths
:::

