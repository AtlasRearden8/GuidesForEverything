# Saving, Publishing and Versions

n8n separates *working on* a workflow from *running it for real*. Understanding this saves you from the two classic mistakes: "I changed it but nothing happened" and "I broke the live version while experimenting."

:::summary In this chapter
- Autosave and drafts
- Publishing, unpublishing and the publish button's states
- Workflow history: viewing and restoring old versions
- Naming versions
- Exporting, importing and sharing workflows as files
- Tags, folders and settings that help you stay organised
:::

## Autosave and drafts

Changes save automatically as you edit, usually within a few seconds; there's no save button to remember. Every edit stays in **draft** until you publish. Only one person can edit a workflow at a time: others see it read-only until the editor becomes inactive.

## Publishing

**Publishing** makes the current version live. Production executions then always use that published version, not your latest edits. When you publish:

- Webhook and Form triggers start answering on their production URLs.
- Schedules start running.
- App events start triggering the workflow.

:::steps Publish a workflow
1. **Click Publish** in the top bar, or press <kbd>Shift</kbd> + <kbd>P</kbd>.
2. **Optionally name the version** and add a description of what changed.
3. **Click Publish** in the dialog. The button shows **Publishing** while n8n registers your triggers in the background.
:::

The **Publish** button tells you the state at a glance:

| Button state | Meaning |
|---|---|
| Disabled | Nothing to publish |
| Active | Unpublished changes are waiting |
| Published | Live and up to date |
| Published, has changes | Live, but your newer edits aren't live yet |
| Published, partial | Some triggers failed to activate; hover to see which, then publish again |
| Failed to publish | No trigger activated; fix the problem and retry |

To **unpublish** (stop a workflow from running), use the arrow next to **Publish**, the workflow list, or version history. Shortcut: <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>U</kbd>.

> [!TIP]
> Because edits stay in draft, you can safely improve a live workflow during the day and publish when you're happy. Test with **Execute workflow** first.

## Workflow history

Each autosave creates a new **version**. Open history with the clock icon in the top bar. For each version you can:

- **Restore version**: make it your current draft (it doesn't change production until you publish);
- **Clone to new workflow**: start a copy from it;
- **Open version in new tab**: compare side by side;
- **Download**: save it as JSON;
- **Name version**: protect it from automatic cleanup.

How far back you can go depends on your plan: the last 24 hours for everyone, five days on Cloud Pro, and full history on Enterprise. Named versions are available on Cloud Pro and Enterprise and self-hosted Business and Enterprise, and are never pruned.

## Exporting and importing

Workflows are JSON files, which makes them easy to back up and share.

- **Download:** workflow menu (…) › **Download**.
- **Import:** in a new workflow, use the workflow menu › **Import from File** or **Import from URL**, or simply **paste** the JSON onto the canvas.
- **Copy nodes:** select nodes, <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd>, and paste into another workflow or a message.

> [!WARNING]
> Exported workflows don't contain credential secrets, but they do contain node settings, which can include things like email addresses, sheet IDs or URLs. Check before posting a workflow publicly, and remove anything personal.

## Staying organised

- **Names:** "Weekly sales report (Mon 8am)" beats "My workflow 7."
- **Tags:** add from the top bar, then filter the list by tag.
- **Folders and projects:** group related workflows.
- **Descriptions and sticky notes:** explain the why, not just the what.
- **Archive** workflows you no longer use rather than deleting them straight away.

## Workflow settings worth knowing

Open the workflow menu (…) › **Settings**:

| Setting | Use it to |
|---|---|
| **Error Workflow** | Run an alert workflow when this one fails (Chapter 17) |
| **This workflow can be called by** | Control which workflows may use it as a sub-workflow |
| **Timezone** | Override the instance time zone for schedules and dates |
| **Save failed / successful production executions** | Choose what to keep in the Executions list |
| **Save manual executions** | Keep or discard your test runs |
| **Timeout Workflow** | Stop runs that take too long |

## Git and environments (advanced)

On self-hosted Business and Enterprise plans, **source control** connects n8n to a Git repository so you can keep separate development and production instances and move changes between them in a controlled way. Most individuals don't need this: version history and exported JSON files are plenty.

:::checklist
- I know edits stay in draft until I publish
- I can read the Publish button's state
- I've restored or cloned an older version
- I've exported a workflow as JSON and imported it again
- I've set a time zone and error workflow in workflow settings
:::

