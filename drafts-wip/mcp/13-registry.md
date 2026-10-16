# The MCP Registry

The **MCP Registry** at registry.modelcontextprotocol.io is the official public catalog of MCP servers, run by the MCP project and backed by Anthropic, GitHub, Microsoft, PulseMCP, and others. It's currently in **preview**, so details may still change.

:::summary In this chapter
- What the registry stores, and what it doesn't
- Server names and namespaces
- Publishing your own server, step by step
- Finding servers through the registry and the marketplaces built on it
:::

## What the registry is

The registry holds **metadata**: a description of each server and how to install or reach it. It does *not* hold the code. The code stays on a package registry such as npm (for Node.js), PyPI (for Python), NuGet, or Docker Hub, or, for remote servers, at the server's own URL.

Each entry is a `server.json` file with:

- a unique **name** in reverse-domain style, such as `io.github.sam/weather` or `com.example/weather`;
- where to find it: a package (`npm`, `pypi`, …) and/or a **remote** URL;
- how to run it: arguments and environment variables, marking which are secret;
- a description and a version number.

Most people never use the registry directly. App marketplaces, galleries, and directories (called **aggregators**) read from it and add their own curation, ratings, and security checks.

> [!IMPORTANT]
> A listing is not an endorsement. The registry verifies *who* published a server (through their GitHub account or domain), not whether the code is safe. Apply the checks from Chapter 7 to every server.

## Namespaces: proving it's yours

Server names are tied to something you can prove you own:

| Name starts with | You prove it by |
|---|---|
| `io.github.your-username/` | Signing in with that GitHub account |
| `com.yourcompany/` | A DNS record or a file on that domain |

This stops anyone else from publishing a server called `com.notion/…`.

## Publishing a server, step by step

This example publishes a TypeScript server that's already on npm. You need an npm account and a GitHub account.

:::steps Publish to the MCP Registry
1. **Add `mcpName` to `package.json`**, so the registry can confirm the package is yours:
   ```json
   {
     "name": "@my-username/mcp-weather-server",
     "version": "1.0.1",
     "mcpName": "io.github.my-username/weather"
   }
   ```
2. **Publish the package to npm** (`npm adduser`, then `npm publish --access public`).
3. **Install the publisher tool**, `mcp-publisher`. With Homebrew: `brew install mcp-publisher`. Other systems can download it from the registry's GitHub releases page. Check with `mcp-publisher --help`.
4. **Create `server.json`** in your project with `mcp-publisher init`, then edit it so the `name` matches `mcpName` and both version numbers match your package.
5. **Sign in** with `mcp-publisher login github`. Visit github.com/login/device and enter the code it shows.
6. **Publish** with `mcp-publisher publish`.
7. **Check it's listed:**
   ```bash
   R=https://registry.modelcontextprotocol.io
   curl "$R/v0.1/servers?search=io.github.my-username/weather"
   ```
:::

A minimal `server.json` for that package looks like this:

```json title=server.json
{
  "$schema": "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
  "name": "io.github.my-username/weather",
  "description": "An MCP server for weather information.",
  "repository": {
    "url": "https://github.com/my-username/mcp-weather-server",
    "source": "github"
  },
  "version": "1.0.1",
  "packages": [
    {
      "registryType": "npm",
      "identifier": "@my-username/mcp-weather-server",
      "version": "1.0.1",
      "transport": { "type": "stdio" }
    }
  ]
}
```

### Python packages and remote servers

- **PyPI:** use `"registryType": "pypi"`, and prove ownership by putting `mcp-name: io.github.my-username/weather` somewhere in your package's README (it may be hidden in an HTML comment: `<!-- mcp-name: … -->`).
- **Remote servers:** add a `remotes` list instead of (or as well as) `packages`:
  ```json
  "remotes": [
    { "type": "streamable-http", "url": "https://weather.example.com/mcp" }
  ]
  ```

### Common publishing errors

| Message | Fix |
|---|---|
| "Registry validation failed for package" | Add `mcpName` (npm) or `mcp-name:` (PyPI README) and republish the package |
| "Invalid or expired Registry JWT token" | Run `mcp-publisher login github` again |
| "You do not have permission to publish this server" | With GitHub sign-in, the name must start with `io.github.your-username/` |

> [!TIP]
> The registry's docs include a GitHub Actions recipe that publishes automatically whenever you tag a new release. Private servers (on an internal network or private package registry) can't be listed; the registry is for public servers only.

:::checklist
- I understand the registry stores metadata, and the code lives elsewhere
- My server's name uses a namespace I control
- `mcpName` / `mcp-name` matches the `name` in `server.json`
- I verified my listing with the registry's search API
:::

