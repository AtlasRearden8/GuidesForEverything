# End-to-End Recipes

Each recipe here is a complete project, from nothing to a working result. Pick the one closest to what you want, follow it once, and then adapt it. They get gradually more technical as you go.

:::summary In this chapter
- Ten recipes, from tidying files to deploying your own connector
- The exact setup, a prompt to paste, and what to check
- Safety notes for each
:::

## Recipe 1: Tidy your Downloads folder (Claude Desktop)

**You'll need:** Claude Desktop, Node.js.

:::steps Organize files with the filesystem server
1. **Add the filesystem server** for just your Downloads folder, as in Chapter 4 (one folder only).
2. **Fully restart Claude Desktop** and confirm **filesystem** appears under **+**, **Connectors**.
3. **Ask for a plan first:**
   ```prompt
   Look in my Downloads folder. Propose a tidy folder structure (by
   type and year) and list what you'd move where. Don't move anything
   until I say "go".
   ```
4. **Review the plan**, then say "go" and approve the moves as they appear.
:::

> [!TIP]
> Asking for a plan before any action is a great habit with every write-capable server.

## Recipe 2: Triage GitHub issues (Claude Code)

**You'll need:** Claude Code, a GitHub fine-grained token for one repository with read access to issues.

:::steps Summarize and label issues
1. **Create the token** at github.com/settings/personal-access-tokens, limited to one repository, issues read-only.
2. **Add the server:**
   ```bash
   claude mcp add --transport http github https://api.githubcopilot.com/mcp/ \
     --header "Authorization: Bearer YOUR_GITHUB_PAT"
   ```
3. **Check** `/mcp` shows it connected.
4. **Ask:**
   ```prompt
   List the open issues in my-org/my-repo created this week. Group them
   into bugs, feature requests, and questions, and suggest a priority
   for each with a one-line reason.
   ```
5. **When you trust the results**, give the token issue write access and ask Claude to apply labels.
:::

## Recipe 3: Turn tomorrow's meetings into Notion pages (claude.ai)

**You'll need:** a Claude account with the Google Calendar (or Microsoft 365) and Notion connectors.

:::steps Prepare meeting notes automatically
1. **Connect both** from [[Customize > Connectors]].
2. **Create a Notion page** called "Meeting notes" to hold the new pages.
3. **Ask:**
   ```prompt
   For each meeting on my calendar tomorrow, create a page under
   "Meeting notes" in Notion with the title, time, attendees, and
   empty sections for Agenda, Notes, and Actions.
   ```
4. **Check the pages** in Notion, and approve each creation in Claude.
:::

## Recipe 4: Ask your database questions safely (Claude Code)

**You'll need:** Claude Code, a PostgreSQL (or MySQL) database, permission to create a user.

:::steps Read-only analytics with DBHub
1. **Create a read-only user** (ask your database admin, or in PostgreSQL grant only `SELECT` on the tables needed).
2. **Add the server:**
   ```bash
   claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
     --dsn "postgresql://readonly:PASSWORD@HOST:5432/DBNAME"
   ```
3. **Explore the schema:** "Show me the tables and what each one stores."
4. **Ask business questions:** "What was total revenue per month this year? Show the SQL you used."
:::

> [!CAUTION]
> Never connect an AI to a production database with a user that can write. Read-only access turns a dangerous mistake into a harmless error.

## Recipe 5: Test a website with Playwright (VS Code or Cursor)

**You'll need:** VS Code with Copilot, or Cursor; Node.js 18+.

:::steps Automated website check
1. **Install Playwright MCP:** in VS Code, search `@mcp playwright` in Extensions and click **Install**; in Cursor, add the `playwright` entry from Chapter 6 to `~/.cursor/mcp.json`.
2. **Ask:**
   ```prompt
   Open https://example.com. Check that every link on the home page
   works, try the main navigation on a phone-sized window, and give me
   a list of problems with screenshots.
   ```
3. **Watch the browser** and approve each step.
:::

## Recipe 6: From error to fix with Sentry and GitHub (Claude Code)

**You'll need:** Claude Code inside your app's Git repository, a Sentry account.

:::steps Investigate a production error
1. **Add Sentry** and sign in:
   ```bash
   claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
   ```
   Then run `/mcp` and authenticate.
2. **Ask:**
   ```prompt
   Find the most frequent unresolved Sentry error in the last 24 hours.
   Show the stack trace, find the code responsible in this repository,
   explain the cause, and propose a fix with a test. Don't commit.
   ```
3. **Review the diff**, run the tests, and commit it yourself.
:::

## Recipe 7: Give Claude a long-term memory (Claude Desktop)

**You'll need:** Claude Desktop, Node.js.

:::steps A personal knowledge graph
1. **Add the Memory server** with a file you choose:
   ```json
   "memory": {
     "command": "npx",
     "args": ["-y", "@modelcontextprotocol/server-memory"],
     "env": { "MEMORY_FILE_PATH": "/Users/sam/mcp/memory.jsonl" }
   }
   ```
2. **Restart** and tell Claude: "Remember that I'm vegetarian, my team is Product Design, and my manager is Priya."
3. **In a new chat**, ask: "What do you know about me from memory?"
:::

The memory file is plain text you can open, edit, or delete at any time.

## Recipe 8: Build a bakery-specials server (Python)

**You'll need:** uv, Claude Desktop.

:::steps Your own data, your own tools
1. **Create the project:** `uv init bakery && cd bakery && uv add "mcp[cli]"`.
2. **Create `specials.csv`** with a header row `name,price` and a few rows.
3. **Create `bakery.py`:**
   ```python title=bakery.py
   import csv
   from pathlib import Path

   from mcp.server import MCPServer

   CSV = Path(__file__).parent / "specials.csv"
   mcp = MCPServer("bakery")


   @mcp.tool()
   def todays_specials() -> list[dict]:
       """List today's specials with prices."""
       with CSV.open() as f:
           return list(csv.DictReader(f))


   @mcp.tool()
   def add_special(name: str, price: float) -> str:
       """Add a special. Use when the owner names a new item."""
       with CSV.open("a", newline="") as f:
           csv.writer(f).writerow([name, f"{price:.2f}"])
       return f"Added {name} at ${price:.2f}."


   if __name__ == "__main__":
       mcp.run()
   ```
4. **Test** with `uv run mcp dev bakery.py`, then **install** with `uv run mcp install bakery.py`.
5. **Restart Claude Desktop** and ask: "What are today's specials? Add a lemon tart at 4.50."
:::

## Recipe 9: Call an n8n workflow from Claude

**You'll need:** an n8n instance reachable from the internet (n8n Cloud, or self-hosted with a public URL).

:::steps Expose a workflow as a tool
1. **Create a workflow** in n8n with an **MCP Server Trigger** node.
2. **Attach a tool**, for example a **Call n8n Workflow Tool** node pointing at a workflow that adds a row to a Google Sheet. Give it a clear name and description.
3. **Set authentication** to **Bearer auth** and create a long random token.
4. **Publish the workflow** and copy the **Production** URL.
5. **Add it to Claude Code:**
   ```bash
   claude mcp add --transport http n8n https://YOUR-N8N/mcp/PATH \
     --header "Authorization: Bearer YOUR_TOKEN"
   ```
   Or in claude.ai, add a custom connector with that URL and the header.
6. **Ask:** "Log a new lead: Jo Smith, jo@example.com, interested in the Pro plan."
:::

## Recipe 10: Deploy your own connector (Cloudflare)

**You'll need:** Node.js, a free Cloudflare account, a Claude account.

:::steps From code to claude.ai
1. **Follow the Cloudflare steps** in Chapter 12 to deploy the notes Worker.
2. **Test the live URL** with the Inspector (`--server-url https://…workers.dev/mcp --transport http`).
3. **Add it in Claude:** [[Customize > Connectors]], **+ Add**, **Add custom connector**, name it "My notes", paste the URL, choose **No sign in**.
4. **Ask in a new chat:** "Use My notes to save: call the plumber on Friday."
5. **Before adding private tools**, protect the server with a key or OAuth (Chapter 12).
:::

:::checklist
- I asked for a plan before letting the AI change anything
- I used the narrowest token, folder, or database user for each recipe
- I tested custom servers in the Inspector before connecting an app
- I removed connectors I no longer need
:::

