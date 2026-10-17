# Build Your Own Server in Python

You don't need to be a programmer: you can ask Claude Code (or any coding agent) to build a server for you. But seeing how one works makes you far better at asking for, testing, and trusting it. This chapter uses the official **Python SDK** (software development kit), version 2, which speaks the 2026-07-28 protocol and still serves older apps.

:::summary In this chapter
- Setting up a project with uv
- A first tool, tested and connected to Claude
- Richer inputs, errors the AI can read, and annotations
- Resources, resource templates, and prompts
- The Context object, logging, and asking the user questions
- A complete "notes" server, and a quick automated test
:::

## Setting up

The Python SDK is the `mcp` package on PyPI. It needs **Python 3.11 or newer**; uv will fetch a suitable Python for you if needed.

:::steps Create a "tip calculator" server
1. **Install uv** from docs.astral.sh/uv, then make a project:
   ```bash
   uv init tips
   cd tips
   uv add "mcp[cli]"
   ```
   The `[cli]` part adds the `mcp` command (`mcp dev`, `mcp run`, `mcp install`).
2. **Create `tips.py`** with this code:
   ```python title=tips.py
   from mcp.server import MCPServer

   mcp = MCPServer("tips")

   @mcp.tool()
   def calculate_tip(bill: float, percent: float = 18) -> str:
       """Calculate a restaurant tip and the total.

       Args:
           bill: The bill amount before tip
           percent: Tip percentage, e.g. 18
       """
       tip = round(bill * percent / 100, 2)
       return f"Tip: ${tip:.2f}, total: ${bill + tip:.2f}"

   if __name__ == "__main__":
       mcp.run(transport="stdio")
   ```
3. **Test it with the MCP Inspector**, a free testing tool that opens in your browser:
   ```bash
   uv run mcp dev tips.py
   ```
   Open the URL it prints, click **Connect**, open the **Tools** tab, choose `calculate_tip`, enter a bill, and run it.
4. **Connect it to Claude Desktop.** The easiest way is to let the SDK write the config for you:
   ```bash
   uv run mcp install tips.py
   ```
   Or add it by hand to `claude_desktop_config.json` (use the full path to your folder):
   ```json
   {
     "mcpServers": {
       "tips": {
         "command": "uv",
         "args": ["--directory", "/Users/username/tips", "run", "tips.py"]
       }
     }
   }
   ```
5. **Restart Claude Desktop** fully and ask: "What's a 20% tip on $86.40?"
:::

Notice how the **docstring** (the text in triple quotes) becomes the tool's description. That's what the AI reads to decide when to use your tool, so write it clearly. The function's name becomes the tool's name, and the **type hints** (`bill: float`) become the input schema: the SDK rejects a call like `bill = "lots"` before your code even runs.

> [!NOTE]
> Older tutorials write `from mcp.server.fastmcp import FastMCP`. That was version 1 of the SDK. In version 2 the class is called `MCPServer` and lives in `mcp.server`; the old import no longer exists.

### What each line does

- `from mcp.server import MCPServer` loads the SDK's high-level server class.
- `mcp = MCPServer("tips")` creates a server named "tips". Keep the variable name `mcp`: the `mcp` command looks for it (or `server`, or `app`).
- `@mcp.tool()` (with the brackets) registers the function below it as a tool.
- `mcp.run()` starts the server over stdio, waiting for a host to talk to it. It sits under `if __name__ == "__main__":` so that tools which *import* your file don't accidentally start it.

### Other hosts, same command

The SDK documentation suggests one launch command that works from anywhere, because `uv` builds the environment on the fly:

```bash
uv run --with "mcp[cli]" mcp run /absolute/path/to/tips.py
```

```bash
# Claude Code
claude mcp add tips -- uv run --with "mcp[cli]" mcp run /abs/path/tips.py
```

For Cursor (`.cursor/mcp.json`) and VS Code (`.vscode/mcp.json`, key `servers`, with `"type": "stdio"`), use `"command": "uv"` and put the rest in `args`.

> [!TIP]
> If a host says it can't find `uv`, replace `"uv"` with its full path from `which uv` (or `where uv` on Windows). That's exactly what `mcp install` writes.

## Richer tool inputs

Type hints get you a long way. For descriptions and limits on each input, use `Annotated` with Pydantic's `Field` (Pydantic is a data-validation library the SDK installs for you):

```python title=books.py
from typing import Annotated, Literal

from pydantic import Field

from mcp.server import MCPServer

mcp = MCPServer("Bookshop")


@mcp.tool()
def search_books(
    query: Annotated[str, Field(description="Title or author to search for.")],
    limit: Annotated[int, Field(ge=1, le=50)] = 10,
    genre: Literal["fiction", "non-fiction", "poetry"] | None = None,
) -> str:
    """Search the catalog by title or author."""
    where = f" in {genre}" if genre else ""
    return f"Found 3 books matching {query!r}{where} (up to {limit})."
```

- `Field(description=…)` gives the AI a note about one input.
- `Field(ge=1, le=50)` sets a minimum and maximum. Ask for `limit=999` and the AI gets back a readable error and retries with a valid value.
- `Literal[…]` restricts an input to a fixed list of choices.
- A default value (`= 10`) makes an input optional.

For many inputs, group them into a Pydantic model. The AI fills it in as a JSON object, and your function receives a real, validated `Book`:

```python
from pydantic import BaseModel, Field

class Book(BaseModel):
    title: str
    author: str
    year: int = Field(ge=1450, description="Year of first publication.")

@mcp.tool()
def add_book(book: Book) -> str:
    """Add a book to the catalog."""
    return f"Added {book.title!r} by {book.author} ({book.year})."
```

If a tool calls a web API, reads files, or queries a database, write it as `async def` and `await` the slow parts. Plain `def` tools are fine too: the SDK runs them on a separate thread so they don't block the server.

## Errors the AI can understand

When something goes wrong, raise a `ToolError`. Its message goes back to the AI, which can explain it or try again:

```python
from mcp.server.mcpserver.exceptions import ToolError

CATALOG = {"Dune": "Frank Herbert", "Neuromancer": "William Gibson"}

@mcp.tool()
def get_author(title: str) -> str:
    """Look up the author of a book in the catalog."""
    if title not in CATALOG:
        raise ToolError(f"No book titled {title!r} in the catalog.")
    return CATALOG[title]
```

> [!WARNING]
> Don't `return` an error message as ordinary text: the app then thinks the call succeeded. And other exceptions (a crash) only tell the AI "Error executing tool", with the details hidden in your server's log.

## Titles and annotations

```python
from mcp.types import ToolAnnotations

@mcp.tool(
    title="Search the catalog",
    annotations=ToolAnnotations(read_only_hint=True, open_world_hint=False),
)
def search_catalog(query: str) -> str:
    """Search the catalog by title or author."""
    return f"Found 3 books matching {query!r}."
```

`title` is a friendly display name. `read_only_hint=True` tells apps the tool changes nothing, so they may skip the approval prompt; mark tools that delete things with `destructive_hint=True`.

## Resources

A resource is data the app can load, addressed by a URI:

```python title=resources.py
from mcp.server import MCPServer

mcp = MCPServer("Bookshop")


@mcp.resource("config://app")
def get_config() -> str:
    """The active shop configuration."""
    return "theme=dark\nlanguage=en"


@mcp.resource("users://{user_id}/profile")
def get_user_profile(user_id: str) -> str:
    """A customer's profile."""
    return f"User {user_id}: 12 orders since 2021."


@mcp.resource("stats://catalog", mime_type="application/json")
def catalog_stats() -> dict[str, int]:
    """Live counts for the catalog."""
    return {"books": 1204, "authors": 391}
```

- `config://app` is a fixed resource.
- `users://{user_id}/profile` is a **template**: the `{user_id}` blank must match the function's parameter name exactly, or the server refuses to start.
- Return a `str` for text, `bytes` for binary data such as images, or a `dict` or list to have it sent as JSON. Set `mime_type` to describe it; the default is `text/plain`.

## Prompts

A prompt is a template the *user* picks, often as a slash command:

```python title=prompts.py
from mcp.server import MCPServer
from mcp.server.mcpserver.prompts.base import (
    AssistantMessage, Message, UserMessage,
)

mcp = MCPServer("Code Helper")


@mcp.prompt()
def review_code(code: str) -> str:
    """Review a piece of code."""
    return f"Please review this code:\n\n{code}"


@mcp.prompt()
def debug_error(error: str) -> list[Message]:
    """Start a debugging conversation."""
    return [
        UserMessage("I'm seeing this error:"),
        UserMessage(error),
        AssistantMessage("I'll help debug that. What have you tried?"),
    ]
```

Returning a string creates one user message. Returning a list seeds a whole conversation.

## The Context object

Add a parameter typed `Context` to any tool and the SDK fills it in. The AI never sees it.

```python
from mcp.server import MCPServer
from mcp.server.mcpserver import Context

mcp = MCPServer("Bookshop")

@mcp.resource("catalog://genres")
def genres() -> str:
    """The genres the catalog is organised into."""
    return "fiction, non-fiction, poetry"

@mcp.tool()
async def describe_catalog(ctx: Context) -> str:
    """Describe how the catalog is organised."""
    [contents] = await ctx.read_resource("catalog://genres")
    return f"The catalog is organised into: {contents.content}"
```

The Context also offers `await ctx.report_progress(done, total, message)` for long jobs, and `ctx.request_id` for your logs.

### Asking the user a question

To ask the user something mid-task (elicitation), version 2 of the SDK recommends a **resolver**: a small function attached to a parameter with `Resolve(...)`, which returns `Elicit("question", Model)` when it needs an answer. The SDK then asks in whichever way the user's app supports. It's an advanced feature; see "Elicitation" in the Python SDK docs at py.sdk.modelcontextprotocol.io when you need it.

## Logging: never print

On stdio, stdout *is* the connection, so a stray `print()` can corrupt it. Use Python's `logging` module, which writes to stderr:

```python
import logging

from mcp.server import MCPServer

logger = logging.getLogger(__name__)
mcp = MCPServer("Bookshop", log_level="DEBUG")

@mcp.tool()
def search_books(query: str) -> str:
    """Search the catalog by title or author."""
    logger.info("Searching for %r", query)
    return f"Found 3 books matching {query!r}."
```

Log lines never reach the AI; they're for you. Claude Desktop saves them in `mcp-server-NAME.log`, and the Inspector shows them in its **Console** tab.

## A complete example: a notes server

Here's a small but real server that saves notes to a file, with tools, a resource, and a prompt. First the setup and storage:

```python title=notes.py (part 1)
import json
import logging
from pathlib import Path

from mcp.server import MCPServer
from mcp.server.mcpserver.exceptions import ToolError
from mcp.types import ToolAnnotations

logger = logging.getLogger(__name__)
NOTES_FILE = Path.home() / "mcp-notes.json"

mcp = MCPServer(
    "Notes",
    instructions="Personal notes. Use add_note to save, list_notes to read.",
)


def load() -> list[str]:
    if NOTES_FILE.exists():
        return json.loads(NOTES_FILE.read_text())
    return []


def save(notes: list[str]) -> None:
    NOTES_FILE.write_text(json.dumps(notes, indent=2))
```

`instructions` is a short note to the AI about the whole server; Claude Code and ChatGPT use it to decide when your server is relevant. Next, the tools:

```python title=notes.py (part 2)
@mcp.tool()
def add_note(text: str) -> str:
    """Save a new note. Use this when the user asks you to remember
    or write something down."""
    notes = load()
    notes.append(text)
    save(notes)
    logger.info("Saved note %d", len(notes))
    return f"Saved note #{len(notes)}."


@mcp.tool(annotations=ToolAnnotations(read_only_hint=True))
def list_notes() -> list[str]:
    """List all saved notes, oldest first."""
    return load()


@mcp.tool(annotations=ToolAnnotations(destructive_hint=True))
def delete_note(number: int) -> str:
    """Delete one note by its number (1 is the oldest)."""
    notes = load()
    if not 1 <= number <= len(notes):
        raise ToolError(f"There is no note #{number}.")
    removed = notes.pop(number - 1)
    save(notes)
    return f"Deleted: {removed}"
```

Finally a resource, a prompt, and the start-up line:

```python title=notes.py (part 3)
@mcp.resource("notes://all", mime_type="application/json")
def all_notes() -> list[str]:
    """Every saved note, as JSON."""
    return load()


@mcp.prompt()
def weekly_review() -> str:
    """Review this week's notes and suggest next actions."""
    return ("List my notes, group them by theme, and suggest "
            "three next actions.")


if __name__ == "__main__":
    mcp.run()
```

Run `uv run mcp dev notes.py` to try every tab in the Inspector, then `uv run mcp install notes.py` to add it to Claude Desktop.

## Testing without any app

The SDK includes a `Client` you can point at your server object directly, in memory. That makes a quick automated check easy:

```python title=check_notes.py
import anyio

from mcp import Client

from notes import mcp


async def main() -> None:
    async with Client(mcp) as client:
        result = await client.call_tool("add_note", {"text": "Buy milk"})
        print(result.content)
        result = await client.call_tool("list_notes", {})
        print(result.structured_content)


anyio.run(main)
```

Run it with `uv run python check_notes.py`. (It writes to your real notes file, so delete the test note afterwards, or point `NOTES_FILE` somewhere else while testing.)

## Let an agent build it

```prompt
Build an MCP server in Python using the official mcp SDK (version 2,
from mcp.server import MCPServer) that exposes two tools for my bakery:
"todays_specials" (reads specials.csv) and "add_special" (appends a
row). Include clear tool descriptions and annotations, raise ToolError
for bad input, log with the logging module (never print), test it with
the MCP Inspector CLI, and show me the Claude Desktop config to add it.
```

:::checklist
- My tools have clear names, docstrings, and type hints
- I raise `ToolError` for problems the AI should hear about
- I use `logging`, never `print`, in a stdio server
- I've tested every tool in the Inspector, and my host config uses absolute paths
:::

