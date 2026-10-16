# Handling Errors Gracefully

Things go wrong: an API is down for a minute, a customer leaves a field blank, a password expires. A reliable workflow expects this. This chapter shows the tools n8n gives you to retry, route around, and get told about problems before anyone else notices.

:::summary In this chapter
- Retry On Fail for flaky services
- On Error: stop, continue, or take an error branch
- Error workflows and the Error Trigger
- Failing on purpose with Stop and Error
- Patterns for missing data and rate limits
:::

| Tool | What it does |
|---|---|
| **Retry On Fail** (node settings) | Automatically retry a flaky step, e.g. 3 times, waiting 5 seconds |
| **On Error › Continue** (node settings) | Keep the workflow going and send the error down a separate output |
| **Error workflow** | In workflow **Settings**, choose a workflow that starts with an **Error Trigger**; it runs whenever this one fails, so you can email or Slack yourself the details |
| **Stop and Error** node | Deliberately fail with a clear message when something's wrong |

## Retry On Fail

Open a node, switch to its **Settings** tab, and turn on **Retry On Fail**. Set **Max Tries** (for example 3) and **Wait Between Tries** (for example 5,000 ms). Use it on anything that talks over the internet: HTTP requests, AI models, app nodes. Most temporary failures disappear on the second try.

## On Error

Also in a node's **Settings**, **On Error** decides what happens when the node fails after any retries:

| Choice | Result |
|---|---|
| **Stop Workflow** (default) | The run fails; the error workflow fires |
| **Continue** | Carry on with the error details as the output |
| **Continue (using error output)** | The node gets a second, red **error** output you can connect to fallback steps |

The error output is the most useful: for example, if enriching a lead fails, send it down the error output to a "needs manual review" sheet instead of losing it.

## Error workflows

:::steps Create an "Alert me" error workflow
1. **Create a new workflow** called "Error handler".
2. **Add an Error Trigger** as the first node.
3. **Add a message node**, for example Gmail or Slack, with a message like:
   ```text
   ⚠️ {{ $json.workflow.name }} failed
   Node: {{ $json.execution.lastNodeExecuted }}
   Error: {{ $json.execution.error.message }}
   Details: {{ $json.execution.url }}
   ```
4. **Save it.** An error workflow doesn't need publishing to work.
5. **Attach it.** In each important workflow, open the workflow menu (…) › **Settings**, choose "Error handler" under **Error Workflow**, and save.
:::

The Error Trigger receives the failed workflow's name and ID, the execution ID and a link to it, the error message, and the last node that ran. If the failure happened in the trigger itself (for example a schedule couldn't activate), the data arrives under `trigger` instead, with less detail.

> [!TIP]
> Make one "Alert me" error workflow, with Error Trigger → Gmail or Slack, and set it as the error workflow for everything you publish. You'll know about problems before anyone else does.

## Stop and Error

Sometimes nothing technically fails, but the data is wrong: an order with a negative total, a form with no email. Add an If node to check, and on the bad path add **Stop and Error** with a clear message such as `Order {{ $json.id }} has no email`. The run fails cleanly and your error workflow tells you why.

## Patterns for common problems

| Problem | Pattern |
|---|---|
| A field is sometimes missing | Use `{{ $ifEmpty($json.phone, 'none') }}`, or an If node checking **is empty** |
| The API rate-limits you (error 429) | HTTP Request **Batching**, or Loop Over Items with a Wait node |
| A service is down for hours | Error output → store the item in a data table → a scheduled workflow retries later |
| A node returns no items and the flow stops | Turn on **Always Output Data** in node settings, then check for emptiness |
| Long runs time out | Split into sub-workflows; set **Timeout Workflow** deliberately |

> [!NOTE]
> When a node outputs zero items, the nodes after it don't run. That's usually what you want ("nothing new, nothing to do"), but it surprises people. **Always Output Data** makes the node output one empty item instead.

:::checklist
- Retry On Fail is on for my internet-facing nodes
- I've used an error output for at least one fallback path
- I have an "Error handler" workflow
- Every published workflow points at it
- I validate key data and fail clearly with Stop and Error
:::

