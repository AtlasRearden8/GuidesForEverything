# Meet n8n

Welcome. If you have ever copied information from an email into a spreadsheet, or checked the same website every morning, you already know the kind of work n8n is built to take off your hands. This chapter explains what n8n is, how it differs from similar tools, and what you will be able to build by the end of this manual.

:::summary In this chapter
- What workflow automation is, in plain English
- How n8n compares to Zapier and Make
- What "fair-code" and the Community Edition mean
- Cloud versus self-hosted, in one paragraph
- How this manual is organised and how to use it
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

Think of it like a kitchen. The trigger is the order coming in. Each node is a cook at a station: one chops, one fries, one plates. The lines between nodes are the counter where dishes slide from one cook to the next. You design the kitchen once; after that, every order is handled the same way, day and night.

## What can you automate?

Almost anything that happens on a computer and follows a pattern. Some everyday examples that people build in their first month:

:::cols
- A daily digest of news from your favourite websites
- Saving email attachments to Google Drive
- Posting new blog articles to social media
- Adding form sign-ups to a CRM
- Reminding customers about unpaid invoices
- Backing up files every night
- A chatbot that answers questions about your documents
- Alerts when a web page changes
:::

If you can describe a task as "when *this* happens, do *that*, then *that*," n8n can probably do it.

## How n8n compares

| | n8n | Zapier | Make |
|---|---|---|---|
| Style | Visual canvas with branches and loops | Simple step-by-step lists | Visual canvas |
| Self-hosting | **Yes, free** | No | No |
| Pricing basis | Per workflow *execution*, however many steps | Per task (each step counts) | Per operation |
| Code when you need it | JavaScript or Python nodes | Limited | Limited |
| AI agents and MCP | Built in | Yes | Yes |
| Best for | Power, flexibility, and low cost at scale | The quickest simple automations | Visual mid-complexity flows |

The pricing row matters more than it looks. Because n8n charges per **execution** (one full run of a workflow) rather than per step, a twenty-step workflow costs the same as a two-step one. Complex automations stay cheap.

> [!NOTE]
> n8n is "fair-code": its source code is public and the self-hosted Community Edition is free to use, including for your own business, under n8n's Sustainable Use License. You only pay for n8n Cloud or for enterprise features.

## What "fair-code" means for you

You don't need to read licences to use n8n, but it helps to know the basics:

- **You can** run the free self-hosted version for yourself or inside your own company, with unlimited workflows and executions.
- **You can** read and change the code.
- **You pay** if you want n8n to host it for you (n8n Cloud), or for business features such as single sign-on and Git version control on a self-hosted server.
- If you want to sell n8n itself as a hosted service to others, read the licence first.

## Cloud or self-hosted?

- **n8n Cloud**: n8n runs it for you. Sign up and start in the browser. Easiest, with a free trial. **Recommended for beginners.**
- **Self-hosted**: you run n8n on your own computer or a server. Free and unlimited, but you're responsible for keeping it running, updated, and secure.

You can start on Cloud and move later. Workflows export and import as files. Chapter 3 helps you decide properly.

## How this manual is organised

The manual has five parts. Read the first part in order; after that, dip in wherever you need.

| Part | Chapters | What you'll learn |
|---|---|---|
| **Getting started** | 1–7 | Concepts, choosing and installing n8n, the editor, your first workflow |
| **Building skills** | 8–18 | Data, expressions, code, core nodes, triggers, credentials, reuse, errors, debugging |
| **AI** | 19–22 | AI steps, agents, knowledge bases (RAG), MCP |
| **Recipes** | 23–25 | Twelve complete, step-by-step workflows to copy |
| **Running n8n** | 26–29 | Self-hosting operations, costs, community, troubleshooting |

> [!TIP]
> Keep n8n open in another window while you read, and try each example as you go. Automation is learned by doing: ten minutes of clicking teaches more than an hour of reading.

:::checklist
- I know what a workflow, trigger and node are
- I know n8n charges per execution, not per step
- I know there is a free self-hosted edition and a paid Cloud service
- I have n8n open (or will after Chapter 4) so I can follow along
:::

