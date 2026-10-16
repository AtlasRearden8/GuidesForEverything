# The AI Agent Node in Depth

An AI step does one fixed job. An **AI agent** decides *what to do*: it reads a request, chooses which tools to use, uses them, looks at the results, and keeps going until it has an answer. This chapter explains how agents work in n8n and how to make them dependable.

:::summary In this chapter
- How an agent thinks: the reason–act loop
- The parts: model, memory, tools, system message
- Building a chatbot agent step by step
- Memory types and sessions
- Tools: app nodes, HTTP, sub-workflows, `$fromAI()`
- Human approval, guardrails and limits
- n8n's first-class Agents (preview)
:::

## How an agent works

An agent runs a loop. It **thinks** ("to answer this I need today's calendar"), **acts** (calls the calendar tool), **observes** the result, and repeats until it can reply. Each tool has a name and a description; the model reads those descriptions to decide what to use, so clear descriptions matter enormously.

## The AI Agent node

The **AI Agent** node is a mini-agent inside a workflow. You attach:

| Part | What it's for |
|---|---|
| **Chat model** | The AI brain (e.g. Claude or GPT) |
| **Memory** | Remembers the conversation, e.g. **Simple Memory**, or a database for persistence |
| **Tools** | Things the agent can do: Gmail, Google Calendar, HTTP Request, a sub-workflow, or an **MCP Client Tool** |
| **System message** | Instructions: who it is and how to behave |

The agent needs at least one tool. Its prompt comes either **from the previous node automatically** (it expects a field called `chatInput`, which the Chat Trigger provides) or from a prompt you **define below**.

:::steps Build a simple chatbot agent
1. **Add a Chat Trigger** as the first node.
2. **Add an AI Agent node** after it.
3. **Attach a chat model** (click **Chat Model +**) and choose, for example, **Anthropic Chat Model** with your credential or Gateway credits.
4. **Attach Simple Memory** so it remembers the conversation.
5. **Attach a tool**, for example **Google Calendar** with the operation *Get many events*, so it can answer "what's on my schedule?"
6. **Write the system message:** "You are my friendly scheduling assistant. Use the calendar tool to answer questions about my day. Be brief."
7. **Click Open chat** at the bottom of the canvas and talk to it.
:::

## Writing the system message

The system message is the agent's job description. A good one covers:

```prompt
You are the support assistant for Bright Bikes, a bicycle shop.
Goal: answer customer questions about orders, opening hours and repairs.
Tools: use "Find order" to look up orders by email. Use "Knowledge base"
for policies. Never guess an order status; always look it up.
Style: friendly, plain English, under 100 words.
If you can't help, say so and offer to pass the message to a human.
Today's date is {{ $now.toFormat('d LLLL yyyy') }}.
```

> [!TIP]
> Models don't know today's date. Adding it to the system message with an expression prevents a whole class of mistakes.

## Agent options

| Option | Use it to |
|---|---|
| **Max Iterations** | Cap how many think–act rounds it can take (default 10) |
| **Return Intermediate Steps** | Include the tool calls in the output, for checking its reasoning |
| **Require Specific Output Format** | Attach an output parser for structured results |
| **Enable Streaming** | Show the reply word by word in chat |
| **Automatically Passthrough Binary Images** | Let the model see images from earlier nodes |

## Memory

Without memory, every message is a fresh start. Memory sub-nodes store the conversation:

| Memory node | Stores history | Good for |
|---|---|---|
| **Simple Memory** | Inside n8n | Getting started, single-server setups |
| **Postgres Chat Memory** | In a PostgreSQL database | Production, survives restarts |
| **Redis Chat Memory** | In Redis | Fast, production |
| **MongoDB Chat Memory** | In MongoDB | If you already use MongoDB |

Two settings matter: the **Session Key**, which keeps different users' conversations apart (the Chat Trigger supplies a session ID automatically), and the **Context Window Length**, how many past exchanges to send back to the model. Longer memory means better context but more tokens.

> [!WARNING]
> Simple Memory doesn't work for published workflows when n8n runs in queue mode (Chapter 26). Use Postgres or Redis chat memory there.

## Tools

Almost any app node can be attached as a tool: Gmail, Sheets, Notion, Slack, Calendar, HTTP Request and hundreds more. Other useful tools include **Call n8n Workflow Tool** (run a sub-workflow), **Code Tool**, **Calculator**, **Think** (gives the model room to plan), **Wikipedia**, **SerpAPI** or **SearXNG** for web search, **Vector Store Question Answer Tool** (Chapter 21), and **MCP Client Tool** (Chapter 22).

When you attach an app node as a tool, you choose which parameters you fix and which the AI fills in. For any field you want the model to decide, let the AI define it (the field shows an option for this); n8n writes it as a `$fromAI()` expression, which you can also type yourself:

```text
{{ $fromAI('recipient_email', 'The email address of the customer', 'string') }}
```

Fix everything you can (the sender, the channel, the sheet) and leave open only what the agent truly needs to choose. Fewer open fields means fewer mistakes.

> [!TIP]
> Give each tool a clear name and description: "Find order: looks up a customer's orders by email address. Returns order number, status and date." The model chooses tools by reading these.

## Human review for risky tools

You can make the agent ask a person before it uses certain tools. Click the agent's tool connector, find **Human review** in the tools panel, choose a channel (chat, Slack, Telegram and others), and connect the sensitive tools to it. When the agent wants to use one, the workflow pauses and sends an approval request; the action runs only if someone approves.

## Guardrails

The **Guardrails** node checks text before it reaches your model, or before a model's answer reaches a customer. **Check Text for Violations** sends failing items to a **Fail** branch; **Sanitize Text** replaces sensitive content instead. Available checks include keywords, jailbreak attempts, NSFW content, personal data (PII) such as card or phone numbers, secret keys, staying on topic, URLs, and your own custom or regex rules. LLM-based checks need a chat model attached.

## Keeping agents dependable

:::checklist
- One clear job per agent; split big jobs into several agents or sub-workflows
- Fixed parameters wherever possible, `$fromAI()` only where needed
- Human review on anything that sends, deletes or pays
- Guardrails on public-facing input and output
- Max Iterations set to a sensible number
- Tested with tricky questions before publishing
:::

## Agents (first-class, in preview)

Newer versions of n8n also offer **Agents** as their own kind of project item, alongside workflows. You configure a model, instructions, tools, skills, and a knowledge base in the **Agent Builder**, then let people reach the agent through chat, channels, or schedules. Agents can call your workflows as tools. The feature is in preview, so expect changes. Owners can switch it on or off in [[Settings > Agents]].

| Choose | When |
|---|---|
| AI Agent node in a workflow | The flow is mostly fixed, with AI as one step |
| A first-class Agent | The AI owns the conversation and decides what to do |

