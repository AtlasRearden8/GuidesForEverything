# Triggers: How Workflows Start

Every workflow begins with a trigger. Picking the right one is the first design decision you make, and it affects how quickly your workflow reacts and how many executions it uses. This chapter covers each kind, with set-up steps for the most important.

:::summary In this chapter
- The trigger types at a glance
- Schedules, including Cron expressions
- Webhooks: URLs, security and responses
- Forms, multi-page forms and chat
- App triggers: instant versus polling
- Test URLs versus production URLs
:::

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
| **MCP Server Trigger** | An AI app calls one of its tools | Chapter 22 |

## Schedule Trigger

Choose a **Trigger Interval**: Seconds, Minutes, Hours, Days, Weeks, Months, or **Custom (Cron)**. Each interval asks for the details you'd expect, such as **Trigger at Hour** and **Trigger at Minute**, or the weekdays for a weekly schedule. You can add several rules to one trigger.

**Cron** is a compact way to write schedules. n8n's Cron field accepts an optional seconds column at the front, which is why you may see six positions:

| Cron expression | Means |
|---|---|
| `0 9 * * 1-5` | 9:00 every weekday |
| `*/15 * * * *` | Every 15 minutes |
| `0 8 1 * *` | 8:00 on the 1st of each month |
| `0 0 18 * * 5` | 18:00 every Friday (with seconds first) |

The five standard positions are minute, hour, day of month, month and day of week. Sites like crontab.guru explain any expression in plain English.

> [!IMPORTANT]
> Schedules only run when the workflow is **published**, and they use the workflow's time zone (set in workflow settings) or, failing that, the instance time zone. Self-hosted instances default to New York time.

> [!TIP]
> Every schedule run is a production execution. A trigger every minute is about 43,000 runs a month, far beyond a Starter plan. Every 15 minutes is about 2,900. Pick the slowest schedule that does the job.

## Webhook

A **webhook** is a web address that another service calls when something happens. The Webhook node gives you that address.

:::steps Set up a webhook
1. **Add a Webhook node.** Choose the **HTTP Method** the other service will use, usually `POST`.
2. **Optionally set a Path**, such as `new-order`, instead of the random one. Paths can include parameters like `/order/:id`.
3. **Choose Authentication.** Basic auth, header auth or JWT auth stop strangers from triggering your workflow. Use one for anything public.
4. **Choose Respond.** **Immediately** replies "Workflow got started"; **When Last Node Finishes** replies with the final data; **Using 'Respond to Webhook' Node** lets you build a custom reply.
5. **Copy the Test URL**, click **Listen for test event**, and send a test from the other service. The data appears in the output.
6. **Publish**, then give the other service the **Production URL**.
:::

Useful options include **IP(s) Allowlist** (only accept calls from listed addresses), **Ignore Bots**, **Allowed Origins (CORS)** for calls from web pages, and **Binary Property** to receive files. The maximum payload is 16 MB by default.

## Test URLs versus production URLs

Webhook and Form triggers each have **two** addresses:

- **Test URL**: works while you click **Listen for test event** in the editor, so you can see data arrive.
- **Production URL**: works once the workflow is **published**.

On self-hosted n8n they differ only in the path: test URLs contain `/webhook-test/` and production URLs contain `/webhook/`.

The most common beginner puzzle, "my webhook works in testing but not for real," is almost always because the workflow isn't published, or the other app is still using the test URL.

## n8n Form Trigger

n8n can host a simple web form for you, with no website needed.

:::steps Build a sign-up form
1. **Add an n8n Form Trigger.** Give it a **Form Title** and **Form Description**.
2. **Add form elements.** Types include Text, Email, Number, Date, Dropdown, Checkboxes, Radio Buttons, Textarea, File, Password, Hidden Field and Custom HTML. Tick **Required Field** where needed.
3. **Choose Respond When.** **Form Is Submitted** confirms straight away; **Workflow Finishes** waits until the workflow has run.
4. **Test it.** Click **Execute step**; n8n opens the form. Submit it and the answers appear as fields named after each element.
5. **Publish and share the production URL.**
:::

For **multi-page forms**, add **n8n Form** nodes after the trigger. Each is another page, and the last can show a completion screen, redirect to a web page, show your own text, or return a file. You can put If nodes between pages to show different questions depending on earlier answers.

> [!TIP]
> Options let you hide the "Form automated with n8n" line, rename the submit button, set a custom path, and restyle the form with CSS.

## Chat Trigger

The **Chat Trigger** starts a workflow from a chat message, usually feeding an AI Agent (Chapter 20). Turn on **Make Chat Publicly Available** to get a shareable chat page. **Mode** is either **Hosted Chat** (n8n's ready-made chat page, set up with options for title, placeholder and welcome message) or **Embedded Chat** (your own website calls the workflow, for example with n8n's chat widget). Authentication can be none, basic auth, or **n8n User Auth** (only people logged in to your n8n).

## App triggers: instant or polling?

App triggers come in two flavours:

- **Instant (webhook-based)**: the app tells n8n immediately. Examples: Telegram, Stripe, GitHub. Needs a public HTTPS address, so it won't work on a laptop without a tunnel.
- **Polling**: n8n checks the app on a timer, set by **Poll Times**. Examples: Gmail Trigger, Google Sheets Trigger. Each check that finds something new is an execution.

> [!WARNING]
> Telegram allows only one webhook per bot. If you test a Telegram Trigger while the same workflow is published, the test URL replaces the production one, and the published workflow stops receiving messages until you publish again.

## Other triggers

- **Execute Sub-workflow Trigger** (shown as "When Executed by Another Workflow"): Chapter 14.
- **Error Trigger**: Chapter 17.
- **RSS Feed Trigger**: new items in a feed.
- **Local File Trigger** (self-hosted): a file changes in a folder.

:::checklist
- I can choose between schedule, webhook, form, chat and app triggers
- I know schedules use the workflow or instance time zone
- I've secured any public webhook with authentication
- I give other services the production URL, not the test URL
- I know polling triggers use executions every time they find something
:::

