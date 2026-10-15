---
title: Notion
subtitle: One workspace for notes, docs, projects, and databases, with AI built in
volume: 7
edition: October 2026
accent: "#C2711B"
accent2: "#2E8C74"
motif: pages
blurb: |
  Notion is a flexible workspace where you write notes and documents, manage projects and to-do lists, build simple databases, and share it all with others. Think of it as digital LEGO: a handful of simple pieces (pages, blocks, and databases) that snap together into almost anything, from a personal journal to a whole company wiki.

  This manual starts with the building blocks, teaches the database features that make Notion powerful, sets up a real project tracker and a personal dashboard, and covers Notion AI, agents, sharing, and connecting Notion to other AI tools.
---

# Welcome to Notion

:::summary In this chapter
- What Notion is good for
- Creating your account and workspace
- Finding your way around the screen
:::

## What people use Notion for

- **Notes and journals**: class notes, meeting notes, daily logs.
- **Documents and wikis**: how-to guides, company handbooks, recipes.
- **Task and project management**: to-do lists, Kanban boards, content calendars.
- **Databases**: reading lists, client lists (a simple CRM), inventories, habit trackers.
- **Websites**: publish any page to the web with Notion Sites.
- **AI help**: write, summarize, answer questions about your workspace, and automate busywork.

## Get started

:::steps Create your account
1. **Go to notion.com** and click **Get Notion free**, or download the desktop and mobile apps from notion.com/download.
2. **Sign up** with your email, Google, or Apple account.
3. **Choose how you'll use it**: for yourself, with a team, or for school. This just picks starter templates.
4. **Name your workspace.** A **workspace** is your whole Notion account space; you can create more later (for example, one personal, one for work).
:::

## The Notion screen

| Area | What it is |
|---|---|
| **Sidebar** (left) | Your pages in sections: **Teamspaces** (shared), **Private** (just you), and **Shared** (pages others shared with you); plus Search, Home, Inbox, and Settings |
| **Page** (center) | Whatever you're working on |
| **Top bar** | The page's location (its "breadcrumb"), **Share**, comments, updates, and the **•••** menu |
| **Notion AI** | The AI icon at the bottom right, or press <kbd>Space</kbd> on an empty line |

> [!TIP]
> Press <kbd>Cmd</kbd> + <kbd>P</kbd> (Mac) or <kbd>Ctrl</kbd> + <kbd>P</kbd> (Windows) to search everything. It's the fastest way to jump to any page.

# Pages and Blocks

Everything in Notion is made of **pages**, and every page is made of **blocks**.

## Blocks: the LEGO bricks

A **block** is any single piece of content: a paragraph, a heading, a to-do checkbox, an image, a table, an embedded video. Each block can be moved, turned into another type, or nested inside another.

- Hover over any block and drag the **⋮⋮** handle to move it.
- Click the handle to **Turn into** another type, change its color, or duplicate or delete it.
- Drag a block to the far right of another block to create **columns**.

## The slash command

Type `/` anywhere to insert any block:

| Type | To get |
|---|---|
| `/h1`, `/h2`, `/h3` | Headings |
| `/todo` | A to-do checkbox |
| `/bullet`, `/num` | Bulleted or numbered lists |
| `/toggle` | A collapsible section |
| `/callout` | A highlighted box with an icon |
| `/code` | A code block |
| `/table` | A simple table |
| `/database` | A full database (Chapter 4) |
| `/image`, `/video`, `/file` | Media and files |
| `/embed` | Embed a map, form, Figma file, and more |
| `/page` | A new page inside this one |
| `/button` | A button that runs actions when clicked |

## Markdown shortcuts

Type these at the start of a line for instant formatting:

| Type | Result |
|---|---|
| `#` then space | Heading 1 (`##` for H2, `###` for H3) |
| `-` or `*` then space | Bullet |
| `1.` then space | Numbered list |
| `[]` | To-do checkbox |
| `>` then space | Toggle |
| `"` then space | Quote |
| `---` | Divider line |
| ```` ``` ```` | Code block |
| `**text**` | **Bold** |
| `` `text` `` | Inline code |

## Pages inside pages

Any page can contain other pages, so you can organize everything like folders. Type `/page` to create a subpage, or `[[` and a name to link to an existing page (or create a new one). Type `@` to mention a person, a page, or a date such as `@tomorrow`; dates can carry reminders.

> [!TIP]
> Keep your sidebar tidy with a few top-level "home" pages, such as **Home**, **Projects**, **Notes**, **Areas**, and **Archive**, and put everything else inside them.

# Databases: Notion's Superpower

A **database** is a collection of pages that share the same set of **properties** (fields). Each item is a full page you can open and write in, *and* a row with data like a date, a status, or a person. The same database can be shown many different ways.

## Create a database

:::steps Your first database: a reading list
1. **Create a new page** called "Reading list".
2. **Type `/database`** and choose **Database – Inline** (or **Full page**).
3. **Rename the default columns.** "Name" holds the book title.
4. **Add properties.** Click **+** at the end of the header row. Add **Author** (Text), **Status** (Status: Not started / In progress / Done), **Rating** (Select: ★ to ★★★★★), and **Finished** (Date).
5. **Add a few books.** Click **New** or the empty row at the bottom.
6. **Open a book** by hovering over its name and clicking **Open**, and write your notes inside it. Every row is a page!
:::

## Property types

| Property | Holds | Example use |
|---|---|---|
| **Text** | Words | Author, notes |
| **Number** | Numbers, money, percentages | Price, hours |
| **Select** / **Multi-select** | One or several tags from a list | Genre, priority |
| **Status** | To-do / In progress / Complete groups | Task progress |
| **Date** | A date or range, with optional reminder | Due date |
| **Person** | Workspace members | Assignee |
| **Checkbox** | Yes or no | Paid? |
| **URL**, **Email**, **Phone** | Links and contacts | Website |
| **Files & media** | Uploaded files | Contract PDF |
| **Relation** | Links to items in another database | Tasks ↔ Projects |
| **Rollup** | Summarizes data through a relation | % of tasks done |
| **Formula** | Calculates from other properties | Days until due |
| **Created time**, **Last edited** | Automatic timestamps | Audit trail |

## Views: the same data, many ways

Click **+** next to the existing view's name, at the top left of the database, to add a view:

| View | Shows items as… | Great for |
|---|---|---|
| **Table** | Rows and columns | Editing lots of data |
| **Board** | Cards in columns, grouped by status or tag | Kanban task tracking |
| **Calendar** | Items on their dates | Content calendars, deadlines |
| **Timeline** | Bars across time | Project schedules |
| **List** | A clean list of pages | Notes, docs |
| **Gallery** | Cards with cover images | Recipes, portfolios, moodboards |
| **Chart** | Bar, line, or donut charts | Dashboards |
| **Form** | A fill-in form that creates items | Requests, sign-ups, surveys |
| **Map** | Pins from an address property | Places, travel plans |

Each view has its own **Filter** (show only some items), **Sort** (order them), and **Group** (split into sections). For example, make a "Currently reading" board view filtered to *Status is In progress*.

## Relations and rollups, simply

A **relation** connects two databases. Link a **Tasks** database to a **Projects** database and each task knows its project, and each project lists its tasks. A **rollup** then summarizes across that link, such as "count of tasks" or "percent of tasks done," shown right on the project.

## Formulas, simply

A **formula** property calculates a value. Two useful ones:

```text title=Days until due
dateBetween(prop("Due"), now(), "days")
```

```text title=Overdue flag
if(prop("Due") < now() and prop("Status") != "Done", "⚠️ Overdue", "")
```

> [!TIP]
> Don't know the formula? Ask Notion AI: "Write a formula that shows how many days are left until the Due date."

# Build a Project Tracker

Let's combine everything into a small but real system: projects with tasks.

:::steps Build Projects + Tasks
1. **Create a page** called "Work hub".
2. **Add a Projects database** (`/database`, full page). Properties: **Status** (Status), **Owner** (Person), **Deadline** (Date).
3. **Add a Tasks database** inside Work hub. Properties: **Status** (Status), **Assignee** (Person), **Due** (Date), **Priority** (Select: High, Medium, Low).
4. **Link them.** In Tasks, add a **Relation** property pointing to **Projects**, and switch on **Show on Projects** so both sides see the link.
5. **Add progress.** In Projects, add a **Rollup**: relation *Tasks*, property *Status*, calculate *Percent per group › Complete*. Show it as a bar.
6. **Create useful views of Tasks:** a **Board** grouped by Status, a **Calendar** by Due date, and a **My tasks** table filtered to *Assignee contains Me*.
7. **Add a template.** In Tasks, click the arrow next to **New**, choose **+ New template**, and add a checklist ("Definition of done") that every new task starts with.
:::

> [!NOTE]
> Prefer not to build from scratch? The **Templates** gallery (in the sidebar, or notion.com/templates) has thousands of ready-made systems: project trackers, CRMs, habit trackers, and more. Duplicate one, then customize it.

## Automate the busywork

- **Buttons** (`/button`): one click to add a pre-filled task, change several properties, or open a page.
- **Database automations** (paid plans): "when Status changes to Done, set Completed date to today and notify the owner in Slack." Find them under the ⚡ icon at the top right of a database.
- **Recurring templates:** make a template repeat, such as "Weekly review every Friday."

# A Personal Dashboard

A **dashboard** is a home page that pulls your important stuff into one view.

:::steps Make a "Home" dashboard
1. **Create a page called Home** and give it an icon and a cover image (hover near the title to add them).
2. **Add columns.** Type `/2` and choose **2 columns**, or drag blocks side by side.
3. **Left column:** add a **linked view** of your Tasks database (`/linked`), filtered to *Assignee is Me* and *Due is this week*, shown as a **List**.
4. **Right column:** a linked **Calendar** view, a callout with this week's focus, and a few quick links (`[[` to link pages).
5. **Add a Chart view** of tasks by status for a visual check-in.
6. **Pin it.** Right-click the page in the sidebar and choose **Add to Favorites**.
:::

A **linked view** shows a database that lives elsewhere, filtered and styled for this spot. Changes made there update the original.

# Notion AI and Agents

Notion AI is built into the workspace. It can write and edit, answer questions using your pages (and connected apps), take meeting notes, build databases, and carry out multi-step tasks as an **agent**.

## What's included

| Plan | AI features |
|---|---|
| **Free**, **Plus** | A limited trial of Notion AI features |
| **Business**, **Enterprise** | Notion Agent, AI Meeting Notes, Enterprise Search across connected apps, and the full set of AI writing tools |
| **Custom Agents** | Free to try, then paid with **Notion credits** (an add-on: $10 per 1,000 credits per month) |

## Ways to use Notion AI

- **On an empty line:** press <kbd>Space</kbd> and ask: "Draft a project kickoff agenda."
- **On selected text:** select it, then choose **Ask AI** to improve, shorten, translate, or change the tone.
- **In the AI panel** (AI icon at the bottom right): ask questions across your workspace. "What did we decide about the launch date?" It answers with links to the source pages.
- **AI Meeting Notes:** type `/meeting` to transcribe and summarize a meeting with action items.
- **AI in databases:** add AI-generated properties such as summaries, keywords, or translations that fill in automatically for every row.

## Notion Agent

The **Notion Agent** can take on multi-step jobs inside your workspace:

```prompt
Look through my meeting notes from the last two weeks, find every action
item assigned to me, and add each one to my Tasks database with a due
date and a link back to the meeting.
```

```prompt
Turn this brainstorm page into a Projects database with a row for each
idea, and fill in a one-sentence summary and an estimated effort.
```

## Custom Agents

**Custom Agents** run on their own: on a schedule or when something happens, such as a new database item or a message. They follow your plain-English instructions, use the sources and tools you allow (including Slack, Linear, and other apps via MCP), and log every run so you can review and undo changes. Typical uses: answering team questions, routing incoming requests, and writing weekly status updates.

> [!TIP]
> Give agents narrow, specific jobs and limited access ("only the Support database and the #help channel"). Review their logs for the first week before trusting them fully.

# Sharing and Collaboration

## Sharing a page

Click **Share** at the top right of any page:

- **Invite** people by email and choose their access: **Full access**, **Can edit**, **Can comment**, or **Can view**.
- **General access**: decide whether only invited people, everyone in your workspace, or anyone with the link can open it.
- **Publish** (the **Publish** tab in the Share menu): turn the page into a public website with **Notion Sites**, at a `notion.site` address or your own domain on paid plans.

Pages inherit sharing from their parent: share a parent page and everything inside it is shared too.

## Teamspaces

On team plans, **Teamspaces** organize work by group (Marketing, Engineering…), each with its own members and permissions.

## Working together

- **Comments:** select text and click **Comment**, or hover over a block and use its comment icon. Mention teammates with `@`.
- **Page history:** **•••** menu, then **Version history**, to see and restore earlier versions. The history length depends on your plan.
- **Notifications:** the **Inbox** in the sidebar collects mentions, comments, and reminders.

> [!WARNING]
> Before publishing a page to the web, check the subpages inside it. They're published too, unless you change their settings.

# Connect Notion to Other Tools

## Built-in connections

Notion connects with Slack, Google Drive, GitHub, Jira, Figma, and many more. Paste a link from those apps and choose **Paste as preview** for a live card. Manage connections under [[Settings > Connections]].

**Notion Mail** and **Notion Calendar** are free companion apps that link your inbox and calendar to your Notion pages.

## Connect AI tools with Notion MCP

Notion runs an official **MCP server**, so assistants like Claude, ChatGPT, Cursor, and Claude Code can search, read, create, and update your Notion pages and databases (see the *MCP* manual in this series):

- **Claude:** [[Settings > Connectors]], find **Notion**, click **Connect**, and approve.
- **Claude Code:** `claude mcp add --transport http notion https://mcp.notion.com/mcp`, then `/mcp` to sign in.
- **Cursor and others:** add a remote server with the URL `https://mcp.notion.com/mcp`.

You sign in with OAuth, and the AI can only see pages *you* can see. Workspace owners can review and restrict these connections in [[Settings > Connections]].

## Automation tools and the API

Zapier, Make, and n8n all have Notion integrations (for example, "add every new form response to a Notion database"; see the *n8n* manual). For these, or for your own scripts, create a **connection** (Notion's developer docs call it an *internal connection*, formerly an *integration*):

:::steps Create an API connection
1. **Open the developer portal** at notion.com/profile/integrations, or [[Settings > Connections > Develop or manage integrations]].
2. **Create a new connection** for your workspace and give it a name.
3. **Copy the API token** from its configuration page. Treat it like a password.
4. **Grant access to pages.** Either add pages in the connection's **Content access** tab, or open a page, click **•••**, then **Connections**, and add your connection.
5. **Paste the token** into n8n, Zapier, or your script's credentials.
:::

> [!NOTE]
> A new connection can't see *anything* until you share pages with it. Sharing a parent page also shares its subpages. If an automation says "object not found," this is almost always why.

# Plans and Pricing

| Plan | Price per member | Good for |
|---|---|---|
| **Free** | $0 | Individuals: unlimited pages and blocks; limited file uploads and history; an AI trial |
| **Plus** | $10/month billed yearly ($12 monthly) | Small teams and power users: unlimited uploads, longer history, more guests |
| **Business** | $20/month billed yearly ($24 monthly) | Teams that want Notion AI and agents, SSO, and private teamspaces |
| **Enterprise** | Custom | Advanced security, admin controls, and AI data protections |

From notion.com/pricing, October 2026. Students and teachers can often get Plus free with a school email.

# Tips and Troubleshooting

| Problem | Try this |
|---|---|
| Can't find a page | <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>P</kbd> to search; check **Trash** in the sidebar (deleted pages are kept for a while) |
| Database feels cluttered | Create views with filters instead of deleting data |
| Someone can't open a shared link | Check **Share** settings; they may need an invitation, or general access widened |
| Automation can't find my page | Share the page with the connection (••• › Connections) |
| Page is slow | Very large databases or embeds slow things down; split them or use filtered views |
| Want to work offline | Use the desktop or mobile app and mark key pages available offline |

## Keyboard shortcuts worth learning

| Shortcut (Mac / Windows) | Action |
|---|---|
| <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>N</kbd> | New page |
| <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>P</kbd> | Search |
| <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> | Add a link |
| <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> | Toggle dark mode |
| <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>\</kbd> | Show or hide the sidebar |
| <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>D</kbd> | Duplicate the selected block |
| <kbd>Esc</kbd> | Select the current block |
| <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>/</kbd> | Turn the selected block into another type |

# Quick Reference {.unnumbered}

:::cheatsheet
**Insert anything:** `/` · **Link a page:** `[[` · **Mention a person, page, or date:** `@` · **Ask AI:** <kbd>Space</kbd> on an empty line

**Formatting:** `#` heading · `-` bullet · `[]` to-do · `>` toggle · `---` divider

**Databases:** properties = fields · views = Table / Board / Calendar / Timeline / Gallery / Chart / Form · filter, sort, group per view · relation + rollup to connect databases

**Share:** Share › invite or publish · sharing a parent shares its subpages

**AI connections:** Notion MCP `https://mcp.notion.com/mcp` · API: create a connection, then share pages with it
:::

# Glossary {.unnumbered}

:::glossary
Block
: Any single piece of content on a page, such as a paragraph, heading, image, or to-do.

Button
: A block that performs set actions, like adding a pre-filled task, when clicked.

Connection
: A link between Notion and another app or script, which needs pages shared with it. Formerly called an integration.

Custom Agent
: A Notion AI agent that runs on a schedule or trigger to do a recurring job.

Dashboard
: A page that collects important views and links in one place.

Database
: A collection of pages that share the same properties, viewable in many layouts.

Filter
: A rule that shows only database items that match, such as Status is In progress.

Formula
: A property that calculates its value from other properties.

Linked view
: A view of a database placed on a different page.

Markdown shortcut
: Typing symbols like `#` or `-` to format text instantly.

MCP
: Model Context Protocol, the standard that lets AI apps connect to Notion and other tools.

Notion Agent
: Notion AI's ability to carry out multi-step tasks in your workspace.

Notion Sites
: Notion's feature for publishing pages as public websites.

Page
: A document in Notion that can contain blocks and other pages.

Property
: A field on a database item, such as Date, Status, or Person.

Relation
: A property that links items in one database to items in another.

Rollup
: A property that summarizes related items, such as counting tasks or averaging values.

Template
: A reusable starting layout for a page or database item.

Teamspace
: A shared area of a workspace for a specific team, with its own members.

View
: One way of displaying a database: table, board, calendar, timeline, and more.

Workspace
: Your whole Notion environment, containing all your pages and members.
:::
