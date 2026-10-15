---
title: n8n
subtitle: Automate your work and build AI agents, visually, one node at a time
volume: 6
edition: October 2026
accent: "#E8456B"
accent2: "#7B61FF"
motif: network
blurb: |
  n8n (say "n-eight-n," short for "nodemation") is a visual automation tool. You connect building blocks, called **nodes**, on a canvas to make **workflows** that run on their own: "every morning, check the weather and email me," "when someone fills in my form, add them to a spreadsheet and send a welcome message," or "when a support email arrives, have an AI draft a reply."

  n8n connects to more than a thousand apps, has powerful AI features built in, and, unlike most automation tools, you can run it on your own computer for free. This manual takes you from your first click to AI agents, MCP, and reliable production workflows.
---

# Meet n8n

:::summary In this chapter
- What n8n does and how it compares to Zapier and Make
- Cloud versus self-hosted
- What you'll build in this manual
:::

## What is workflow automation?

A **workflow** is a recipe that a computer follows automatically. It always starts with a **trigger** (*something happens*), then runs **steps** (*do these things*):

| Trigger | Steps |
|---|---|
| Every weekday at 8am | Get today's calendar → summarize with AI → send to Slack |
| A new row in Google Sheets | Create an invoice in Stripe → email the customer |
| A form is submitted | Add the person to your mailing list → notify you on Telegram |
| An email arrives at support@ | AI sorts it → drafts a reply → creates a task |

In n8n, every trigger and every step is a **node**: a box on a canvas. You connect the boxes with lines, and data flows along those lines from left to right.

## How n8n compares

| | n8n | Zapier | Make |
|---|---|---|---|
| Style | Visual canvas with branches and loops | Simple step-by-step lists | Visual canvas |
| Self-hosting | **Yes, free** | No | No |
| Pricing basis | Per workflow *execution*, however many steps | Per task (each step counts) | Per operation |
| Code when you need it | JavaScript or Python nodes | Limited | Limited |
| AI agents and MCP | Built in | Yes | Yes |
| Best for | Power, flexibility, and low cost at scale | The quickest simple automations | Visual mid-complexity flows |

> [!NOTE]
> n8n is "fair-code": its source code is public and the self-hosted Community Edition is free to use, including for your own business, under n8n's Sustainable Use License. You only pay for n8n Cloud or for enterprise features.

## Cloud or self-hosted?

- **n8n Cloud**: n8n runs it for you. Sign up and start in the browser. Easiest, with a free trial. **Recommended for beginners.**
- **Self-hosted**: you run n8n on your own computer or a server. Free and unlimited, but you're responsible for keeping it running, updated, and secure.

You can start on Cloud and move later. Workflows export and import as files.

# Key Ideas in Five Minutes

| Term | Meaning |
|---|---|
| **Workflow** | A set of connected nodes that does one job |
| **Node** | One block: a trigger, an action in an app, or a logic step |
| **Trigger node** | The first node, which starts the workflow (a schedule, a webhook, a new email…) |
| **Item** | One piece of data moving through the workflow, like one email or one spreadsheet row. Nodes run once per item |
| **JSON** | The text format n8n uses to show data: `{ "name": "Sam", "city": "Austin" }` |
| **Expression** | A small formula inside `{{ }}` that pulls in data from earlier nodes |
| **Credential** | Saved sign-in details that let a node use an app on your behalf |
| **Execution** | One run of a workflow; n8n keeps a log of each |
| **Publish** | Make a workflow live, so its triggers fire automatically |

## Items: the most important idea

When a node outputs **five rows** from a spreadsheet, that's **five items**, and the next node normally runs **five times**, once for each. That's how a "send an email" node can send one personalized email per row without any loops.

## Draft versus published

n8n saves your edits automatically as a **draft**. Your triggers only run automatically after you click **Publish** (or press <kbd>Shift</kbd> + <kbd>P</kbd>). Later edits stay in draft until you publish again, so you can safely tinker with a live workflow.

# Get n8n Running

## Option A: n8n Cloud (recommended)

:::steps Start on n8n Cloud
1. **Go to n8n.io** and click **Get started**. Create an account; a free trial starts automatically.
2. **Choose a name** for your workspace. It becomes your address, like `yourname.app.n8n.cloud`.
3. **Open the editor.** You'll see the Overview page with your workflows list.
:::

| Cloud plan | Price (billed yearly) | Executions per month | Highlights |
|---|---|---|---|
| **Starter** | €20/month | 2,500 | Unlimited workflows, AI agents and MCP, 5 concurrent runs |
| **Pro** | €50/month | 10,000 | More concurrency, admin roles, workflow history, insights |
| **Business** | €667/month | 40,000 | SSO, environments, Git version control (self-hosted) |
| **Enterprise** | Contact sales | Custom | Advanced security, support with an SLA |

Prices from n8n.io/pricing, October 2026. Monthly billing costs a little more. An **execution** is one full run of a workflow, however many nodes it has.

## Option B: self-host on your own computer

**The one-line setup** (macOS, Linux, or WSL):

```bash
curl -fsSL https://get.n8n.io | sh
```

**With Docker** (any system with Docker Desktop installed):

```bash
docker volume create n8n_data

docker run -it --rm --name n8n -p 5678:5678 \
  -e GENERIC_TIMEZONE="America/New_York" -e TZ="America/New_York" \
  -v n8n_data:/home/node/.n8n \
  n8nio/n8n
```

**Just trying it?** If you have Node.js (version 20.19–24) installed, run `npx n8n`.

Then open **http://localhost:5678** in your browser and create the owner account.

> [!WARNING]
> A self-hosted n8n on your laptop only runs while your laptop is on and awake, and outside services can't reach its webhooks. For always-on automations, use n8n Cloud or a small cloud server (see Chapter 12).

> [!TIP]
> Replace `America/New_York` with your own time zone (for example `Europe/London` or `America/Los_Angeles`) so schedules fire at the right local time.

# A Tour of the Editor

## The main areas

- **Left sidebar**: Overview (all workflows), Templates, Credentials, and Settings.
- **Canvas**: the big grid where you place and connect nodes. Scroll to zoom; drag the background to pan.
- **Top bar**: the workflow's name, the **Publish** button, and the **Editor / Executions** tabs.
- **Execute workflow** button (bottom of canvas): runs the whole workflow once, right now, for testing.

## Adding nodes

Click the **+** on the canvas (or press <kbd>Tab</kbd>) to open the **nodes panel**. Search by app ("Gmail") or by action ("send email"). Nodes are grouped as:

- **Triggers**: how a workflow starts.
- **App nodes**: actions in other services (Google Sheets, Slack, Notion, Airtable…).
- **Core nodes**: logic and data: If, Switch, Edit Fields (Set), Merge, Loop Over Items, Wait, Code, HTTP Request.
- **AI nodes**: AI Agent, chat models, memory, tools, vector stores.

## The node details view

Double-click any node to open it. You'll see three panels:

| Panel | What it shows |
|---|---|
| **Input** (left) | The data arriving from the previous node |
| **Parameters** (middle) | The node's settings: which account, which operation, which fields |
| **Output** (right) | What the node produced after you click **Execute step** |

Switch the input and output views between **Table**, **JSON**, and **Schema**. Table is easiest to read; JSON shows the exact structure.

> [!TIP]
> Test every node as you add it. Click **Execute step**, check the output looks right, then move on. Building in small tested steps is the secret to workflows that work first time.

# Your First Workflow: A Morning Weather Email

Let's build a workflow that checks the weather every morning and emails you a summary. It uses a free weather service that needs no account.

:::steps Build the weather workflow
1. **Create a workflow.** On the Overview page click **Create Workflow**. Name it "Morning weather".
2. **Add a Schedule Trigger.** Click **Add first step**, search **Schedule**, and choose **Schedule Trigger**. Set **Trigger Interval** to **Days** and **Trigger at Hour** to **7am**. Close the node.
3. **Add an HTTP Request node.** Click the **+** after the trigger, search **HTTP Request**, and paste this into **URL** (it's New York; change the latitude and longitude to your city):
   ```text
   https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&timezone=auto
   ```
   Click **Execute step**. The output shows today's forecast in a `daily` section.
4. **Add an Edit Fields (Set) node** to make a friendly message. Add a field named `message` and switch its value to **Expression** mode, then enter:
   ```text
   Today: high {{ $json.daily.temperature_2m_max[0] }}°F, low {{ $json.daily.temperature_2m_min[0] }}°F, {{ $json.daily.precipitation_probability_max[0] }}% chance of rain.
   ```
   Click **Execute step** and check the message reads correctly.
5. **Add a Gmail node** (or Outlook, or Send Email). Choose the **Send a message** operation. Under **Credential**, choose **Create new credential** and sign in with Google. Set **To** to your address, **Subject** to `Your morning weather`, and drag the `message` field from the input panel into **Message**.
6. **Test the whole thing.** Click **Execute workflow** and check your inbox.
7. **Publish.** Click **Publish** (top right). From tomorrow, it runs every morning at 7.
:::

Congratulations: you've built a real automation. Notice the pattern you'll use forever: **trigger → get data → reshape data → send it somewhere.**

> [!NOTE]
> The `[0]` in the expression means "the first entry in the list," which is today. `[1]` would be tomorrow.

## Add a decision

Make it smarter: only send an umbrella warning if rain is likely.

:::steps Add an If node
1. **Insert an If node** between Edit Fields and Gmail. Hover over the connecting line and click **+**.
2. **Set the condition.** Value 1: drag in `precipitation_probability_max` (or use the expression `{{ $('HTTP Request').item.json.daily.precipitation_probability_max[0] }}`). Operation: **Number › is greater than**. Value 2: `50`.
3. **Connect the outputs.** Connect the **true** output to your Gmail node with the subject "☔ Take an umbrella!", and add a second Gmail node on **false** for normal days, or leave false empty to send nothing.
:::

# Working with Data

## Mapping by dragging

The easiest way to use data from an earlier node: open a node, find the field in the **Input** panel, and **drag it** into a parameter. n8n writes the expression for you.

## Expressions cheat sheet

Expressions live inside double curly braces and can contain small bits of JavaScript.

| Expression | Gives you |
|---|---|
| `{{ $json.email }}` | The `email` field of the current item |
| `{{ $json.name.toUpperCase() }}` | The name in capital letters |
| `{{ $('Google Sheets').item.json.total }}` | A field from a specific earlier node, by name |
| `{{ $now.toFormat('yyyy-MM-dd') }}` | Today's date, like `2026-10-15` |
| `{{ $today.minus(7, 'days') }}` | The date one week ago |
| `{{ $json.price * 1.08 }}` | Arithmetic: price plus 8% tax |
| `{{ $json.status === 'paid' ? 'Thanks!' : 'Reminder' }}` | Choose text based on a condition |

> [!TIP]
> Not sure how to write an expression? Click **Ask AI** or the AI assistant in the expression editor and describe what you want: "the first name from the full_name field."

## Nodes for reshaping data

| Node | Use it to |
|---|---|
| **Edit Fields (Set)** | Add, rename, or remove fields |
| **If** / **Switch** | Send items down different paths |
| **Filter** | Keep only items that match a rule |
| **Merge** | Combine data from two branches |
| **Aggregate** / **Split Out** | Turn many items into one list, or one list into many items |
| **Loop Over Items** | Process items in batches (useful with rate limits) |
| **Code** | Write JavaScript or Python when nothing else fits |
| **Data tables** | Store data inside n8n itself, like a simple spreadsheet, to reuse across workflows |

## Pinning data

While building, click **Pin** on a node's output to freeze it. Later nodes then use that saved sample instead of calling the real service again, which is perfect for working on a webhook or an expensive AI step without re-triggering it.

# Triggers: How Workflows Start

| Trigger | Starts when… | Example |
|---|---|---|
| **Schedule Trigger** | A time arrives: every hour, every Monday at 9… | Weekly report |
| **Webhook** | Another app sends data to n8n's unique URL | Payment received in Stripe |
| **n8n Form Trigger** | Someone submits a form n8n hosts for you | Event sign-up |
| **App triggers** | Something happens in an app (new email, new row, new file) | New Gmail message with a label |
| **Chat Trigger** | Someone sends a message in a chat window | A chatbot for your website |
| **Execute Workflow Trigger** | Another workflow calls this one | Reusable "send notification" sub-workflow |
| **Error Trigger** | Another workflow fails | Alert yourself on failure |
| **Manual** | You click **Execute workflow** | Testing |

## Test URLs versus production URLs

Webhook and Form triggers each have **two** addresses:

- **Test URL**: works while you click **Listen for test event** in the editor, so you can see data arrive.
- **Production URL**: works once the workflow is **published**.

The most common beginner puzzle, "my webhook works in testing but not for real," is almost always because the workflow isn't published, or the other app is still using the test URL.

# Connecting Your Apps

## Credentials

A **credential** stores the sign-in for an app so nodes can use it. Create them from a node (**Credential › Create new credential**) or from **Credentials** in the sidebar. There are two main kinds:

- **OAuth** ("Sign in with Google," "Connect to Slack"): click a button and approve in a pop-up. On n8n Cloud, most of these work instantly.
- **API key or token**: copy a secret key from the app's developer settings and paste it in.

> [!NOTE]
> On **self-hosted** n8n, some OAuth apps (notably Google) require you to create your own "OAuth app" in that company's developer console first. Each credential page in n8n links to step-by-step instructions.

## When there's no node: HTTP Request

Almost every online service has an **API**. If n8n has no dedicated node for it, use the **HTTP Request** node with the service's documentation. Many API docs show a `curl` command; n8n's HTTP Request node has **Import cURL**, which fills in everything for you.

## Security habits

- Name credentials clearly, for example "Gmail: personal" and "Gmail: business."
- Give each credential the minimum access it needs.
- Never paste keys into Code nodes or text fields; always use credentials.
- Remove credentials you no longer use.

# AI in n8n

n8n has three layers of AI: AI *steps* inside workflows, AI *agents* that decide what to do, and AI that *builds workflows for you*.

## AI steps in a workflow

Add an AI model node anywhere to summarize, classify, translate, or extract information. The **Basic LLM Chain**, **Information Extractor**, **Text Classifier**, and **Sentiment Analysis** nodes cover the common jobs. Connect a **chat model** (OpenAI, Anthropic Claude, Google Gemini, Mistral, Ollama for local models, and more) using your API key.

> [!TIP]
> On n8n Cloud Starter and Pro plans you can choose **Use Gateway credits** in a model's credential field. n8n handles billing, so you don't need your own OpenAI or Anthropic account. Great for getting started.

## The AI Agent node

The **AI Agent** node is a mini-agent inside a workflow. You attach:

| Part | What it's for |
|---|---|
| **Chat model** | The AI brain (e.g. Claude or GPT) |
| **Memory** | Remembers the conversation, e.g. **Simple Memory**, or a database for persistence |
| **Tools** | Things the agent can do: Gmail, Google Calendar, HTTP Request, a sub-workflow, or an **MCP Client Tool** |
| **System message** | Instructions: who it is and how to behave |

:::steps Build a simple chatbot agent
1. **Add a Chat Trigger** as the first node.
2. **Add an AI Agent node** after it.
3. **Attach a chat model** (click **Chat Model +**) and choose, for example, **Anthropic Chat Model** with your credential or Gateway credits.
4. **Attach Simple Memory** so it remembers the conversation.
5. **Attach a tool**, for example **Google Calendar** with the operation *Get many events*, so it can answer "what's on my schedule?"
6. **Write the system message:** "You are my friendly scheduling assistant. Use the calendar tool to answer questions about my day. Be brief."
7. **Click Open chat** at the bottom of the canvas and talk to it.
:::

## Agents (first-class, in preview)

Newer versions of n8n also offer **Agents** as their own kind of project item, alongside workflows. You configure a model, instructions, tools, skills, and a knowledge base in the **Agent Builder**, then let people reach the agent through chat, channels, or schedules. Agents can call your workflows as tools. The feature is in preview, so expect changes.

## MCP and n8n

n8n speaks MCP in three ways (see the *MCP* manual in this series):

| Feature | Direction | Use it to |
|---|---|---|
| **MCP Client Tool** node | n8n uses other MCP servers | Give your AI Agent tools from GitHub, Notion, Linear, and more. The node panel also has a one-click **MCP Servers** registry |
| **MCP Server Trigger** node | Other AI apps use one n8n workflow | Turn a workflow into a custom MCP server that Claude or Cursor can call |
| **Instance-level MCP server** | Other AI apps use all of n8n | Let Claude, ChatGPT, or a coding agent search, run, *and build* your workflows from a chat |

## Let AI build workflows for you

- **n8n Assistant / Ask n8n AI**: describe what you want inside n8n and it drafts or fixes workflows and expressions.
- **From Claude or another MCP client**: connect to n8n's instance-level MCP server and say "build a workflow that saves Gmail attachments to Google Drive."

> [!WARNING]
> Review AI-built workflows before publishing, especially nodes that send messages, delete data, or spend money. Test with pinned or sample data first.

# Reliable Workflows

## Debugging with executions

Click the **Executions** tab to see every run, its status (succeeded, failed, running), and the exact data each node received and produced. Click a failed execution, find the red node, and read its error. You can **Debug in editor** to load that run's data onto the canvas and fix it.

## Handling errors

| Tool | What it does |
|---|---|
| **Retry On Fail** (node settings) | Automatically retry a flaky step, e.g. 3 times, waiting 5 seconds |
| **On Error › Continue** (node settings) | Keep the workflow going and send the error down a separate output |
| **Error workflow** | In workflow **Settings**, choose a workflow that starts with an **Error Trigger**; it runs whenever this one fails, so you can email or Slack yourself the details |
| **Stop and Error** node | Deliberately fail with a clear message when something's wrong |

> [!TIP]
> Make one "Alert me" error workflow, with Error Trigger → Gmail or Slack, and set it as the error workflow for everything you publish. You'll know about problems before anyone else does.

## Good habits

:::checklist
- Name every node clearly ("Get today's orders," not "HTTP Request3")
- Add **sticky notes** on the canvas explaining tricky parts
- Test with pinned data before publishing
- Set an error workflow
- Watch your execution count on Cloud; use filters early to skip unnecessary runs
- Use **sub-workflows** (Execute Workflow) for steps you repeat in many workflows
:::

# Templates and Community

You rarely need to start from scratch. **n8n.io/workflows** hosts thousands of free templates: lead capture, social media posting, invoice processing, AI support agents, and more. Click **Use workflow** to copy one into your n8n, then add your own credentials.

The **community forum** (community.n8n.io) is friendly and active. Search it first; someone has usually solved your problem. Self-hosted users can also install **community nodes**, extra nodes built by other users, from **Settings › Community nodes**. Install only well-maintained ones from authors you trust.

# Self-Hosting Essentials

If you self-host for real (not just to experiment), cover these basics:

| Topic | What to do |
|---|---|
| **Always-on hosting** | Use a small cloud server (DigitalOcean, Hetzner, AWS…) or a service with one-click n8n, rather than your laptop |
| **Docker Compose** | n8n's recommended production setup, with a proper database (PostgreSQL) |
| **HTTPS and a domain** | Put n8n behind a reverse proxy with a certificate, and set `WEBHOOK_URL` to your public address so webhooks work |
| **Encryption key** | n8n encrypts credentials with a key in its data folder. Back it up; without it, saved credentials can't be decrypted |
| **Backups** | Back up the data volume and database regularly; export important workflows too |
| **Updates** | Update regularly for features and security fixes; read the release notes for breaking changes first |
| **Access** | Use a strong owner password and two-factor authentication; don't expose the editor to the internet unprotected |

> [!NOTE]
> The npm installation method is deprecated from n8n 3.0. Use Docker or Docker Compose for anything long-lived.

# Quick Reference {.unnumbered}

:::cheatsheet
**Pattern:** Trigger → get data → reshape → decide → act

**Start:** n8n Cloud trial · or `curl -fsSL https://get.n8n.io | sh` · or Docker `n8nio/n8n` → http://localhost:5678

**Editor:** <kbd>Tab</kbd> add node · **Execute step** test one node · **Execute workflow** test all · **Publish** (<kbd>Shift</kbd> + <kbd>P</kbd>) go live

**Expressions:** `{{ $json.field }}` · `{{ $('Node name').item.json.field }}` · `{{ $now.toFormat('yyyy-MM-dd') }}`

**Webhooks:** test URL while listening · production URL only after publishing

**Reliability:** Executions tab · Retry On Fail · error workflow with Error Trigger · pin data while building

**AI:** AI Agent = chat model + memory + tools + system message · MCP Client Tool to use servers · MCP Server Trigger to become one
:::

# Glossary {.unnumbered}

:::glossary
AI Agent node
: A workflow node that uses an AI model to decide which attached tools to call to complete a request.

API
: A way for programs to talk to each other; n8n's HTTP Request node can call almost any API.

Credential
: Saved sign-in details, an OAuth connection or an API key, that let nodes use an app.

Data table
: A simple table stored inside n8n for keeping data between workflow runs.

Execution
: One run of a workflow, logged with all its data.

Expression
: A formula inside `{{ }}` that inserts or calculates values from earlier nodes.

Gateway credits
: Prepaid n8n Cloud credits for running supported AI models without your own provider account.

Item
: A single piece of data, such as one row or one email, flowing through a workflow.

JSON
: The structured text format n8n uses to represent data.

MCP
: Model Context Protocol, the standard for connecting AI apps to tools; see the *MCP* manual.

Node
: One building block in a workflow: a trigger, an app action, or a logic step.

OAuth
: A secure "sign in with…" method for connecting apps without sharing your password.

Pin data
: Freeze a node's output so you can keep building without re-running it.

Publish
: Make the current version of a workflow live so its triggers run automatically.

Self-hosting
: Running n8n on your own computer or server instead of n8n Cloud.

Sub-workflow
: A workflow called by another workflow, used to reuse common steps.

Trigger
: The node that starts a workflow, such as a schedule, webhook, form, or app event.

Webhook
: A unique web address that other apps send data to, which starts a workflow.

Workflow
: A set of connected nodes that automates a task.
:::
