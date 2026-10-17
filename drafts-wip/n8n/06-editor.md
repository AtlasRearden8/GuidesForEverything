# A Tour of the Editor

The n8n editor is where you'll spend most of your time. It looks busy at first, but there are only a few areas, and each has one job. This chapter walks you around them, shows the shortcuts that save the most time, and explains the three-panel window you'll use to set up every node.

:::summary In this chapter
- The Overview page, projects and folders
- The canvas, the nodes panel and the top bar
- The node details view: input, parameters, output
- Sticky notes, groups, and the command bar
- Keyboard shortcuts worth learning
:::

## The Overview page

When you sign in, you land on **Overview**: a list of everything you can access. Tabs along the top switch between **Workflows**, **Credentials**, **Executions** and **Data tables**.

- **Personal space** holds the workflows and credentials you created.
- **Projects** group workflows, credentials and data tables for a team. The number of shared projects depends on your plan.
- **Folders** let you organise workflows inside a project. On self-hosted Community, folders need the free registration.
- **Tags** are labels you add to workflows, like `marketing` or `client-acme`, then filter by.

## The main areas

- **Left sidebar**: Overview (all workflows), Templates, Credentials, and Settings.
- **Canvas**: the big grid where you place and connect nodes. Scroll to zoom; drag the background to pan.
- **Top bar**: the workflow's name, the **Publish** button, and the **Editor / Executions** tabs.
- **Execute workflow** button (bottom of canvas): runs the whole workflow once, right now, for testing.

## Adding nodes

Click the **+** on the canvas (or press <kbd>N</kbd>) to open the **nodes panel**. Search by app ("Gmail") or by action ("send email"). Nodes are grouped as:

- **Triggers**: how a workflow starts.
- **App nodes**: actions in other services (Google Sheets, Slack, Notion, Airtable…).
- **Core nodes**: logic and data: If, Switch, Edit Fields (Set), Merge, Loop Over Items, Wait, Code, HTTP Request.
- **AI nodes**: AI Agent, chat models, memory, tools, vector stores.

Many app nodes contain dozens of **operations**. The Google Sheets node, for example, can append rows, update rows, read rows, delete rows and more. Pick the node, then choose the operation.

## Connecting nodes

Every node has small circles called **connectors**. Drag from the output connector on the right side of one node to the input connector on the left of another to join them. To insert a node between two others, hover over the line joining them and click the **+** that appears. To delete a connection, hover over it and click the bin icon.

## The node details view

Double-click any node to open it. You'll see three panels:

| Panel | What it shows |
|---|---|
| **Input** (left) | The data arriving from the previous node |
| **Parameters** (middle) | The node's settings: which account, which operation, which fields |
| **Output** (right) | What the node produced after you click **Execute step** |

Switch the input and output views between **Table**, **JSON**, and **Schema**. Table is easiest to read; JSON shows the exact structure.

The middle panel has two tabs. **Parameters** holds what the node does. **Settings** holds how it behaves: retry on failure, what to do on error, whether to always output data, and notes to show on the canvas.

> [!TIP]
> Test every node as you add it. Click **Execute step**, check the output looks right, then move on. Building in small tested steps is the secret to workflows that work first time.

## Fixed values and expressions

Every parameter can be **Fixed** (a plain value you type) or an **Expression** (a formula that uses data from earlier nodes). Hover over a field to see the **Fixed / Expression** switch. A shortcut: type <kbd>=</kbd> in an empty field to switch it to expression mode. Chapter 9 covers expressions in depth.

## Sticky notes and groups

**Sticky notes** are coloured notes you place on the canvas to explain what a section does. Press <kbd>Shift</kbd> + <kbd>S</kbd> to add one. They support Markdown, so you can add headings, lists and links. **Groups** box related nodes together: select nodes and press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>G</kbd>.

> [!TIP]
> Future-you is a different person. A one-line sticky note ("Runs at 7am, emails Sam the weather") saves twenty minutes of puzzling six months from now.

## The command bar

Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> to open the **command bar**. Type what you want: add a node, publish, open a workflow, open credentials, jump to settings, or retry an execution. It's the fastest way around n8n once you know it exists.

## Keyboard shortcuts worth learning

:::compact
| Shortcut | Does |
|---|---|
| <kbd>N</kbd> | Open the nodes panel |
| <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Enter</kbd> | Execute the workflow |
| <kbd>Shift</kbd> + <kbd>P</kbd> | Publish |
| <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> | Undo (add <kbd>Shift</kbd> to redo) |
| <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> | Command bar |
| <kbd>1</kbd> | Zoom to fit the whole workflow |
| <kbd>0</kbd> | Reset zoom |
| <kbd>Space</kbd> + drag | Move around the canvas |
| <kbd>Shift</kbd> + <kbd>S</kbd> | Add a sticky note |
| <kbd>F2</kbd> | Rename the selected node |
| <kbd>D</kbd> | Deactivate (skip) the selected node |
| <kbd>P</kbd> | Pin the selected node's data |
| <kbd>Delete</kbd> | Delete the selected node |
| <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd> / <kbd>V</kbd> | Copy and paste nodes |
:::

> [!NOTE]
> Copied nodes are plain JSON text. You can paste them into a message to a colleague or a forum post, and they can paste them straight onto their canvas.

## The Executions tab

Next to **Editor** at the top of each workflow is **Executions**: a list of every run of that workflow, with its status and timing. Click one to see exactly what each node received and produced. Chapter 18 shows how to use it for debugging.

## Settings you'll visit

| Place | What's there |
|---|---|
| [[Settings > Personal]] | Your name, password and 2FA |
| [[Settings > Usage and plan]] | Plan, licence, free registration |
| [[Settings > Community nodes]] | Install extra nodes (self-hosted) |
| [[Settings > Instance-level MCP]] | Let AI apps use your n8n (Chapter 22) |
| Workflow menu (…) › **Settings** | Error workflow, time zone, what executions to save |

:::checklist
- I can open the nodes panel and add a node
- I can connect, insert and delete connections
- I know the three panels of the node details view
:::

