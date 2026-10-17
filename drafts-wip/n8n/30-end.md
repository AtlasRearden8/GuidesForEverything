# Quick Reference {.unnumbered}

:::cheatsheet
**Pattern:** Trigger → get data → reshape → decide → act

**Start:** n8n Cloud trial (14 days) · or `curl -fsSL https://get.n8n.io | sh` · or Docker `n8nio/n8n` → http://localhost:5678

**Editor:** <kbd>N</kbd> add node · **Execute step** test one node · **Execute workflow** test all · **Publish** (<kbd>Shift</kbd> + <kbd>P</kbd>) go live · <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> command bar

**Expressions:** `{{ $json.field }}` · `{{ $('Node name').item.json.field }}` · `{{ $now.toFormat('yyyy-MM-dd') }}` · `{{ $ifEmpty($json.x, 'default') }}`

**Code node:** `$input.all()` (all items) · `$input.item.json` (each item) · return `[{ json: {...} }]` · Python: `_items`, `item["json"]["field"]`

**Webhooks:** test URL while listening · production URL only after publishing · secure with header or basic auth

**Reliability:** Executions tab · Debug in editor · Retry On Fail · error output · error workflow with Error Trigger · pin data while building

**AI:** AI Agent = chat model + memory + tools + system message · RAG = embeddings + vector store + splitter · MCP Client Tool to use servers · MCP Server Trigger to become one · instance-level MCP for Claude and ChatGPT

**Self-hosting:** Compose + PostgreSQL + Caddy · `N8N_WEBHOOK_URL`, `N8N_PROXY_HOPS=1`, `N8N_ENCRYPTION_KEY` · back up `.n8n` volume and database · update: edit version, `docker compose pull`, `docker compose up -d`
:::

# Glossary {.unnumbered}

:::glossary
AI Agent node
: A workflow node that uses an AI model to decide which attached tools to call to complete a request.

API
: A way for programs to talk to each other; n8n's HTTP Request node can call almost any API.

Binary data
: File data, such as a PDF or image, carried in an item's `binary` section.

Caddy
: A reverse proxy that obtains and renews HTTPS certificates automatically.

Chat model
: The sub-node that connects an AI node to a language model provider.

Chunking
: Cutting long documents into smaller passages so they can be searched separately.

Cluster node
: An AI root node, such as AI Agent, with sub-nodes plugged into it.

Concurrency
: How many executions can run at the same time.

Credential
: Saved sign-in details, an OAuth connection or an API key, that let nodes use an app.

Cron
: A compact text format for schedules, such as `0 9 * * 1-5`.

Data table
: A simple table stored inside n8n for keeping data between workflow runs.

DNS record
: A setting that points a domain name at a server's IP address.

Docker
: Software that runs programs in sealed containers.

Docker Compose
: A tool that starts several containers together from one file.

Draft
: Saved edits to a workflow that aren't live until you publish.

Embedding
: A list of numbers representing the meaning of a piece of text.

Encryption key
: The secret n8n uses to encrypt saved credentials.

Environment variable
: A setting passed to n8n when it starts, such as `N8N_WEBHOOK_URL`.

Error workflow
: A workflow starting with an Error Trigger that runs when another workflow fails.

Execution
: One run of a workflow, logged with all its data.

Expression
: A formula inside `{{ }}` that inserts or calculates values from earlier nodes.

Gateway credits
: Prepaid n8n Cloud credits for running supported AI models without your own provider account.

Guardrails
: A node that checks text for unsafe content, personal data or off-topic requests.

Hallucination
: When an AI model confidently states something false.

HTTPS
: Encrypted web traffic, shown by a padlock in the browser.

Instance
: Your own copy of n8n, with its own address.

Item
: A single piece of data, such as one row or one email, flowing through a workflow.

Item linking
: n8n's record of which input item produced each output item.

JSON
: The structured text format n8n uses to represent data.

LLM
: Large language model, the AI that reads and writes text.

Luxon
: The date library behind `$now` and `$today`.

MCP
: Model Context Protocol, the standard for connecting AI apps to tools; see the *MCP* manual.

Memory
: A sub-node that stores an AI conversation so the agent remembers it.

Node
: One building block in a workflow: a trigger, an app action, or a logic step.

OAuth
: A secure "sign in with…" method for connecting apps without sharing your password.

Pin data
: Freeze a node's output so you can keep building without re-running it.

Polling
: A trigger that checks an app on a timer for new data.

PostgreSQL
: A robust database recommended for production n8n.

Production execution
: A run started by a trigger on a published workflow; the kind plans count.

Publish
: Make the current version of a workflow live so its triggers run automatically.

Queue mode
: A scaling setup where workers run executions taken from a Redis queue.

RAG
: Retrieval-augmented generation: the AI looks up your documents before answering.

Rate limit
: A cap on how many requests a service accepts in a period.

Redis
: A fast data store used as the queue in queue mode.

Reverse proxy
: A program that receives web traffic, handles HTTPS and passes requests to n8n.

Self-hosting
: Running n8n on your own computer or server instead of n8n Cloud.

Sub-workflow
: A workflow called by another workflow, used to reuse common steps.

System message
: Standing instructions that tell an AI who it is and how to behave.

Task runner
: A separate process where n8n runs Code node code safely.

Token
: A chunk of text, about three-quarters of a word, that AI providers charge by.

Trigger
: The node that starts a workflow, such as a schedule, webhook, form, or app event.

Two-factor authentication
: Signing in with a password plus a code from your phone.

Vector store
: A database that finds text by similarity of meaning.

VPS
: A virtual private server: a rented, always-on computer in a data centre.

Webhook
: A unique web address that other apps send data to, which starts a workflow.

Worker
: An n8n process that runs executions in queue mode.

Workflow
: A set of connected nodes that automates a task.

Workflow history
: Saved earlier versions of a workflow that you can view or restore.
:::
