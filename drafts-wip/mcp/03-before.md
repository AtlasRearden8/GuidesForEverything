# Before You Start

Remote servers need nothing installed: you paste a web address and sign in. **Local** servers are small programs, so your computer needs the right "engine" to run them. This chapter gets you ready, and teaches the few technical skills you'll use throughout the manual.

:::summary In this chapter
- The three tools that run most local servers: Node.js, uv, and Docker
- Opening a terminal and running your first commands
- Reading and writing JSON config files without breaking them
- Full paths, environment variables, and keeping secrets safe
:::

## What you need, and when

| Requirement | Why | How to get it | Check it |
|---|---|---|---|
| **Node.js** (LTS version) | Runs servers started with `npx` | nodejs.org | `node --version` |
| **uv** (for Python servers) | Runs servers started with `uvx` or `uv` | docs.astral.sh/uv | `uv --version` |
| **Docker** (sometimes) | Runs servers packaged as containers | docker.com | `docker --version` |

- **Node.js** is a program that runs JavaScript outside a web browser. It comes with **npm**, a package manager, and **npx**, which downloads and runs a package in one step. Choose the **LTS** ("long-term support") download, the stable one.
- **uv** is a fast tool for running Python programs. Its companion command **uvx** downloads and runs a Python tool in one step, much like npx.
- **Docker** runs programs inside **containers**: sealed boxes that hold a program and everything it needs. Containers are also a good safety measure (Chapter 7).

> [!NOTE]
> The MCP Inspector testing tool (Chapter 11) needs Node.js **22.19.0 or newer**. If you plan to build servers, install a current LTS version of Node.js.

## Opening a terminal

A **terminal** is a window where you type commands instead of clicking.

- **macOS:** press <kbd>Cmd</kbd> + <kbd>Space</kbd>, type **Terminal**, and press <kbd>Return</kbd>.
- **Windows:** press the <kbd>Windows</kbd> key, type **PowerShell**, and press <kbd>Enter</kbd>.
- **Linux:** press <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd> on most systems.

Type a command, press <kbd>Enter</kbd>, and read what comes back. To stop a program that keeps running, press <kbd>Ctrl</kbd> + <kbd>C</kbd>.

:::steps Install and check your tools
1. **Install Node.js** from nodejs.org (LTS), accepting the defaults.
2. **Install uv** by following the one-line instructions at docs.astral.sh/uv for your system.
3. **Close and reopen your terminal** so it notices the new programs.
4. **Check both work:**
   ```bash
   node --version
   npx --version
   uv --version
   ```
   Each should print a version number. "Command not found" means the install didn't finish or the terminal needs reopening.
5. **Find where they live.** Apps sometimes can't find these programs, and you'll need the full path:
   ```bash
   which npx      # macOS and Linux
   which uv
   where npx      # Windows
   ```
:::

## A two-minute JSON primer

Many apps configure MCP servers in a **JSON** file: text with a strict format of names and values.

```json
{
  "mcpServers": {
    "my-server-name": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/sam/Documents"],
      "env": { "API_KEY": "paste-key-here" }
    }
  }
}
```

- Curly braces `{ }` hold named settings; square brackets `[ ]` hold lists.
- Names and text go in "double quotes".
- Items are separated by commas, but **no comma after the last item**.
- On Windows, backslashes in paths are doubled: `"C:\\Users\\Sam\\Documents"`.

> [!WARNING]
> One missing comma or quote breaks the whole file, and the app silently loads no servers. Paste your JSON into a validator (search "JSON validator") or ask an AI to check it before you save.

### Adding a second server

The most common beginner mistake is pasting a whole new `{ "mcpServers": … }` block underneath the old one. Instead, add the new server *inside* the existing `mcpServers`, separated by a comma:

```json title=Two servers, one file
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem",
               "/Users/sam/Documents"]
    },
    "time": {
      "command": "uvx",
      "args": ["mcp-server-time"]
    }
  }
}
```

### What each field means

| Field | Used for | Meaning |
|---|---|---|
| `command` | Local servers | The program to start, such as `npx`, `uvx`, `node`, `docker` |
| `args` | Local servers | The list of words passed to that program |
| `env` | Local servers | Settings (often secrets) given only to this server |
| `url` | Remote servers | The server's web address |
| `headers` | Remote servers | Extra lines sent with each request, such as an API key |
| `type` | Some apps | `stdio`, `http`, or `sse`, to say which transport to use |

## Full paths, not shortcuts

A **path** is a file's address on your computer. A **full** (or **absolute**) path starts from the top: `/Users/sam/Documents` on a Mac, `/home/sam/Documents` on Linux, `C:\Users\Sam\Documents` on Windows. A **relative** path, such as `Documents` or `./data`, depends on which folder you're "in", and the app starts servers from a folder you don't control.

> [!TIP]
> To find a folder's full path, drag the folder into a terminal window: the path appears as text. On a Mac you can also right-click a folder while holding <kbd>Option</kbd> and choose **Copy as Pathname**.

The shortcut `~` (meaning "my home folder") works in a terminal but often **not** inside JSON config files. Write the full path instead.

## Environment variables and secrets

An **environment variable** is a named setting a program can read, such as `GITHUB_TOKEN=abc123`. MCP servers often read their API keys this way. In a config file, the `env` block sets them for that server only. Some apps also let you reference a variable instead of writing the secret into the file: Claude Code understands `${API_KEY}`, Cursor `${env:API_KEY}`, and Gemini CLI `$API_KEY`.

:::checklist
- Never paste API keys into a chat with an AI; put them in the config's `env` or `headers`
- Never commit a config file that contains real keys to GitHub
- Create a separate, limited key for each server where the service allows it
- Store keys you might need again in a password manager
- If a key leaks, revoke it on the service's website straight away and make a new one
:::

