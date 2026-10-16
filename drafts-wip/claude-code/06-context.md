# How Context Works: /clear or /compact?

Every message you send, every file Claude reads, and every command output it sees goes into Claude's working memory for the session. Understanding that memory, the **context window**, is the key to fast, cheap, accurate sessions.

:::summary In this chapter
- What the context window is and what fills it
- How to see what's using space with `/context`
- What automatic compaction does, and what survives it
- Exactly when to use `/clear`, `/compact`, `/rewind`, `/btw`, or a subagent
:::

## The context window, explained simply

Imagine Claude working at a desk. Everything it needs for the current task is spread out on the desk: your instructions, the files it opened, the test results it ran. The desk is the **context window**. It's large, but not infinite.

Two things make the desk matter:

- **Every message re-reads the desk.** Each time you send a prompt, Claude Code sends the whole conversation so far to the model. A cluttered desk costs more usage on *every* turn.
- **A crowded desk is distracting.** When old, unrelated material fills the space, Claude can lose track of what matters now.

Context is measured in **tokens**, chunks of text roughly three-quarters of a word long. Current Claude models on the Anthropic API, such as Opus 5.5, Sonnet 5.5, and Haiku 5.5, run with a window of about **1 million tokens** by default. That's a lot, but long sessions with big files still fill it.

## What fills the context window

Some things load before you type anything; others pile up as you work.

| Loads at the start | Builds up as you work |
|---|---|
| Your `CLAUDE.md` files (Chapter 16) | Your messages and Claude's replies |
| Auto memory notes | Every file Claude reads |
| The names of available tools and MCP servers | Command and test output |
| Short descriptions of available skills | Skills you invoke (their full text) |
| Claude Code's own instructions | Rules that apply to files Claude opens |

> [!NOTE]
> MCP tools (Chapter 21) are loaded on demand. Until Claude needs a tool, only its name takes up space.

## See what's using space: /context

Type `/context` at any time. Claude Code draws a colored grid showing how full the window is, broken down by category, with suggestions such as "this MCP server is using a lot of space" or "your memory files are large." Use `/context all` to expand the full per-item breakdown.

```text
/context
```

> [!TIP]
> You can also show context usage permanently at the bottom of the screen with a custom **status line**. Type `/statusline show context usage and the model name` and Claude sets one up for you.

## Automatic compaction

You don't have to manage context by hand. As the window approaches its limit, Claude Code **compacts** the conversation automatically: it first clears out old tool outputs, then replaces the older conversation with a structured summary. Your session keeps going.

The tradeoff is detail. A summary keeps your requests, key decisions, and important code, but specific instructions you gave early in the conversation may be lost. That's why lasting rules belong in `CLAUDE.md`, not in chat.

### What survives compaction

| Kind of content | After compaction |
|---|---|
| Project-root `CLAUDE.md` and unscoped rules | Re-read from disk and put back |
| Auto memory | Re-read from disk |
| The plan from plan mode | Re-read from disk |
| Recently read or edited files | Up to five re-read, most recently changed first |
| Skills you invoked | Put back, trimmed to the first 5,000 tokens each |
| Nested `CLAUDE.md` files and path-scoped rules | Reload when Claude next opens a matching file |
| Instructions you only typed in chat | Summarized, so details may be lost |
| Background commands and subagents | Keep running |

## /clear: a fresh desk

`/clear` starts a brand-new conversation with an empty context. Your project memory (`CLAUDE.md`, auto memory) still loads, so Claude still knows your project's rules; it just forgets the chat.

```text
/clear
```

- **It costs nothing.** No summary is made, so no usage is spent.
- **Nothing is lost forever.** The old conversation is saved. Get it back with `/resume`, or, in the same Claude Code window, from the top of the `/rewind` menu.
- **Give the old chat a name** to find it easily: `/clear menu-redesign` labels the previous conversation in the `/resume` picker.
- `/reset` and `/new` do the same thing.

## /compact: a tidy desk

`/compact` summarizes the conversation so far and replaces it with the summary. You stay on the same task with most of the useful knowledge, but far fewer tokens.

```text
/compact
```

The best part is that you can tell it what to keep:

```text
/compact focus on the checkout bug and the files we changed
```

- **It costs some usage**, because Claude has to read the whole conversation to summarize it.
- **Steer it ahead of time.** Add a section to your `CLAUDE.md` that every compaction follows:

```markdown title=CLAUDE.md
# Compact instructions
When compacting, always keep the full list of files we changed
and the exact test commands we used.
```

## The decision table

| Your situation | Use | Why |
|---|---|---|
| Starting an unrelated task | `/clear` | Old context is noise and costs tokens every turn |
| Same task, conversation getting long | `/compact focus on …` | Keeps what matters, frees space |
| Corrected Claude twice and it's still wrong | `/clear`, then a better prompt | Failed attempts confuse it; a clean start wins |
| A long detour you no longer need | `/rewind` → **Summarize from here** | Compresses only the detour |
| Long setup chat, but recent work matters | `/rewind` → **Summarize up to here** | Compresses the old part, keeps the recent part |
| Quick question about the work so far | `/btw` | Answer never enters the conversation |
| Big research job ("read every file in src/") | Ask for a subagent | Reading happens in the subagent's own context |
| Want compaction to happen earlier | `/autocompact 500k` | Compacts sooner, keeping each turn smaller |

> [!IMPORTANT]
> A rule of thumb from Anthropic: if you've corrected Claude more than twice on the same issue, the conversation is cluttered with failed approaches. `/clear` and start again with a more specific prompt that includes what you learned. A clean session with a better prompt almost always wins.

## Other ways to keep context lean

- **Delegate big reads to subagents.** A subagent works in its own context window and hands back only a summary. Just ask: "use a subagent to find every place we calculate tax."
- **Move procedures out of CLAUDE.md into skills.** A skill's full text only loads when it's used (Chapter 10).
- **Turn off MCP servers you aren't using** with `/mcp`.
- **Be specific.** "Fix the tax rounding in cart.js" reads one file; "improve the code" reads everything.

## Prompt caching, briefly

Claude Code reuses the unchanged start of your conversation from a short-term cache, which makes repeated context much cheaper. On a subscription the cache lasts about an hour. If you step away longer, your next message reprocesses the full context. One more reason to `/clear` before starting something new after a long break.

:::checklist
- I've run `/context` and seen what fills my window
- I `/clear` between unrelated tasks and `/compact focus on …` within long ones
- I keep lasting rules in `CLAUDE.md`, not in chat
- I ask for a subagent when a task needs lots of reading
:::
