# Designing Tools the AI Uses Well

A server that works in the Inspector can still be awkward for an AI. The model only knows what your names, descriptions, and results tell it. This short chapter collects the habits that make the difference.

:::summary In this chapter
- Naming and describing tools so the AI picks the right one
- Shaping inputs and outputs
- Writing errors the AI can recover from
- Server instructions, and keeping the tool list small
:::

## Names and descriptions

- **Use verb-first names** that say what happens: `search_orders`, `create_invoice`, `cancel_subscription`. Avoid vague names like `process` or `handle`.
- **Start the description with "Use this when…"** and say what the tool does *not* do: "Use this when the user asks about past orders. Does not include refunds; use `list_refunds` for those."
- **Describe every input**, with an example value and the units: "Amount in cents, e.g. 1999 for $19.99."
- **Mention side effects**: "Sends an email immediately. Ask the user to confirm the recipient first."

| Weak | Strong |
|---|---|
| `get` / "Gets data" | `get_customer` / "Use this to look up one customer by email or ID" |
| `date: str` | `date: str` described as "ISO date, e.g. 2026-10-17" |
| `type: str` | `type: Literal["bug", "feature", "question"]` |

## Fewer, sharper tools

Every tool's description takes up some of the AI's attention. Fifty near-identical tools confuse it; eight well-chosen ones don't. Design around the *tasks* people ask for ("find an order and its shipping status") rather than mirroring every endpoint of an API. Some apps also cap the total: Devin Desktop's Cascade allows 100 tools across all servers.

## Inputs

- Use **enums** (a fixed list of choices) wherever the values are known.
- Set **limits** (`minimum`, `maximum`, string length) so bad values are rejected with a clear message.
- Make inputs optional with sensible defaults, so simple requests stay simple.
- Accept the identifiers people actually have (an email address, an order number), not only internal IDs.

## Outputs

- **Return what the AI needs, not everything you have.** Trim long records to the useful fields. Claude Code, for instance, warns above 10,000 tokens and moves results over 25,000 tokens to a file.
- **Paginate** long lists: return the first 20 results and a way to ask for more.
- **Include identifiers** in results, so the next tool call can use them.
- **Use structured output** (a typed return value) when an app might want to display or process the data.

## Errors that help

Write errors the way you'd explain a problem to a helpful colleague: what went wrong, and what to try instead.

```text
No customer found with email "sam@exmaple.com". Check the spelling,
or call search_customers with part of the name.
```

The AI reads this, notices the typo, and retries, often without bothering you.

## Server instructions

Both SDKs let you set **instructions** for the whole server: a few sentences about when to use it and how its tools fit together ("Always call `list_projects` before `create_task`"). Claude Code's tool search and ChatGPT both use these to decide when your server is relevant, so put the most important sentence first.

## Safety by design

- Mark read-only tools with `readOnlyHint` and dangerous ones with `destructiveHint`.
- Split risky actions: `draft_email` and `send_email` rather than one tool that does both.
- Make repeated calls safe where possible (`idempotentHint`), because AIs sometimes retry.
- Never put secrets in tool results or descriptions.

:::checklist
- Every tool has a verb-first name and a "Use this when…" description
- Every input has a description, an example, and limits or choices where possible
- Results are trimmed, paginated, and include IDs
- Errors say what to try next
- The server has short, useful instructions
:::

