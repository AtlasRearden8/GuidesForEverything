# Key Ideas in Five Minutes

Before you click anything, learn a handful of words. Every n8n screen, error message and forum answer uses them, and once they click, everything else in this manual gets easier.

:::summary In this chapter
- The ten words you need to know
- Items: the single most important idea
- Draft versus published workflows
- Manual, partial and production runs
:::

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
| **Instance** | Your own copy of n8n, on Cloud or on your server, with its own address |

## Items: the most important idea

When a node outputs **five rows** from a spreadsheet, that's **five items**, and the next node normally runs **five times**, once for each. That's how a "send an email" node can send one personalized email per row without any loops.

Picture a conveyor belt. Each item is a parcel on the belt. Each node is a machine the belt passes through. The machine does its job to every parcel in turn, then passes them all along. You rarely have to think about "for each row, do this": n8n does it for you.

:::steps See items in action
1. **Imagine a sheet with three customers.** A Google Sheets node reads it and outputs three items: Ana, Ben and Chloé.
2. **Add a Gmail node after it.** Set **To** to the expression `{{ $json.email }}`.
3. **Run it.** The Gmail node runs three times and sends three emails, each to the right person, because `$json` always means "the current item."
:::

> [!TIP]
> When something sends one email too many, or one too few, count the items. Nine times out of ten the surprise is that a node produced more (or fewer) items than you expected. Chapter 8 shows how to inspect them.

## Nodes come in a few families

| Family | What it does | Examples |
|---|---|---|
| **Trigger** | Starts the workflow | Schedule, Webhook, Gmail Trigger |
| **App (action)** | Does something in another service | Slack, Google Sheets, Notion |
| **Core** | Logic and data shaping | If, Merge, Edit Fields, Code |
| **AI** | Language models and agents | AI Agent, chat models, vector stores |

Some AI nodes are **cluster nodes**: a main **root node** (such as AI Agent) with smaller **sub-nodes** plugged into its underside (a chat model, a memory, some tools). You'll meet them in Chapter 19.

## Draft versus published

n8n saves your edits automatically as a **draft**. Your triggers only run automatically after you click **Publish** (or press <kbd>Shift</kbd> + <kbd>P</kbd>). Later edits stay in draft until you publish again, so you can safely tinker with a live workflow.

## Three kinds of run

| Kind | Started by | Counts against Cloud quota? |
|---|---|---|
| **Manual** | You, clicking **Execute workflow** or **Execute step** | No |
| **Partial** | You, running one node and the ones it depends on | No |
| **Production** | A trigger on a published workflow | Yes |

Only production runs count as executions on n8n Cloud plans, so test as much as you like.

:::checklist
- I can explain the difference between a node and an item
- I know `$json` means "the current item"
- I know edits stay in draft until I publish
- I know manual test runs don't use up my execution allowance
:::

