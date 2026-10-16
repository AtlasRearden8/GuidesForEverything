# Sub-workflows: Build Once, Reuse Everywhere

As you build more workflows, you'll notice the same steps appearing again and again: "send a Slack alert," "look up a customer," "log this to a sheet." A **sub-workflow** is a workflow that other workflows call, like a function in programming. Build it once, call it from anywhere, fix it in one place.

:::summary In this chapter
- Why sub-workflows make life easier
- Creating a sub-workflow with defined inputs
- Calling it with Execute Sub-workflow
- How data passes in and out
- Turning part of an existing workflow into a sub-workflow
:::

## Why bother?

- **Less repetition.** Change your alert format once, and every workflow that uses it updates.
- **Tidier canvases.** A 60-node workflow becomes a readable 10-node workflow calling helpers.
- **Lower memory use.** Big jobs split into smaller runs.
- **Cheaper.** Sub-workflow executions don't count towards your plan's monthly execution limit.
- **AI tools.** An AI agent can call a sub-workflow as a tool (Chapter 20).

## Create the sub-workflow

:::steps Build a reusable "Notify me" workflow
1. **Create a new workflow** called "Notify me".
2. **Add the Execute Sub-workflow Trigger.** In the trigger list it's titled **When Executed by Another Workflow**.
3. **Define the inputs.** Set **Input data mode** to **Define using fields below**, and add `title` (String) and `message` (String). Other modes are **Define using JSON example** and **Accept all data**.
4. **Add the work.** For example a Slack node posting `*{{ $json.title }}*` and `{{ $json.message }}` to your alerts channel.
5. **Make sure it has no errors.** A parent workflow can't call a sub-workflow that contains errors.
:::

> [!TIP]
> In the sub-workflow's settings, **This workflow can be called by** controls who may use it: for example only workflows in the same project, or specific workflows.

## Call it from another workflow

:::steps Call "Notify me"
1. **Add an Execute Sub-workflow node** where you want the notification.
2. **Choose the workflow** from the list (source **Database**). Its inputs, `title` and `message`, appear automatically.
3. **Fill in the inputs** with expressions, such as `New order` and `{{ $json.customer }} spent {{ $json.total }}`.
4. **Choose the mode.** **Run once with all items** sends all items in one call; **Run once for each item** calls it for every item.
5. **Run it.** Open the node afterwards and click **View sub-execution** to jump into the sub-workflow's run.
:::

## How data passes between workflows

1. The Execute Sub-workflow node sends its data to the sub-workflow's trigger.
2. The sub-workflow runs.
3. Whatever its **last node** outputs comes back to the Execute Sub-workflow node in the parent, and the parent carries on.

If you don't need the result, turn off the option **Wait for Sub-Workflow Completion** so the parent continues immediately, like posting a letter rather than waiting for a reply.

## Convert part of a workflow

Already have a long workflow? n8n can convert a selection of connected nodes into a sub-workflow: it moves them into a new workflow and puts an Execute Sub-workflow node in their place. Search the docs for "Convert to sub-workflows" for the current steps. Check the new sub-workflow's inputs afterwards.

## Ideas for your library

:::cols
- Notify me (Slack, email or Telegram)
- Look up or create a CRM contact
- Log an event to a sheet or data table
- Summarise text with AI
- Format a date or currency your way
- Get an access token for an awkward API
:::

:::checklist
- I've built a sub-workflow with defined inputs
- I've called it with Execute Sub-workflow and viewed the sub-execution
- I know the last node's output is returned to the parent
- I know sub-workflow runs don't count against my execution quota
:::

