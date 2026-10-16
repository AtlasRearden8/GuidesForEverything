# Projects Boards and Discussions

Issues track individual pieces of work. **Projects** show the big picture across many of them, and **Discussions** give your community a place for conversations that aren't tasks at all.

:::summary In this chapter
- Creating a project with table, board, and roadmap views
- Custom fields, including iterations
- Built-in automations
- Turning on Discussions and using categories, answers, and polls
- When to use an issue, a discussion, or a project
:::

## Projects

**Projects** are flexible boards and spreadsheets built from your issues and pull requests, like a lightweight Trello or Notion database. From your profile or organization, open **Projects**, then **New project**, and choose a **Board** (columns like *To do*, *In progress*, *Done*), a **Table**, or a **Roadmap**.

:::steps Set up a simple board
1. **Create the project** from your profile's **Projects** tab: **New project**, pick **Board**, and name it.
2. **Add items.** At the bottom of a column, type `#` to search for issues and pull requests, or just type text to create a **draft issue** (a note you can convert to a real issue later).
3. **Drag cards** between columns as work progresses.
4. **Link it to a repository** from the repository's **Projects** tab, so the team finds it.
:::

### Views

Each project can have several saved **views** of the same items:

| Layout | Good for |
|---|---|
| **Table** | Sorting, filtering, and bulk-editing like a spreadsheet |
| **Board** | Moving cards through stages (kanban) |
| **Roadmap** | Seeing work on a timeline using date fields |

Click **New view** to add one. You can group, sort, and filter each view differently, for example a board grouped by assignee.

### Custom fields

Add up to 50 fields to describe items beyond the built-in assignee, labels, and milestone:

| Field type | Example |
|---|---|
| Single select | Priority: Low, Medium, High |
| Date | Target ship date |
| Number | Estimate in hours |
| Text | A quick note |
| Iteration | Two-week cycles ("sprints"), with breaks |

### Automations

Open the project's **…** menu, then **Workflows**, to turn on built-in automations, such as setting Status to *Done* when an issue closes or a pull request merges, or adding new issues from a repository automatically. The **Insights** button draws charts of progress.

## Discussions

**GitHub Discussions** is a forum built into a repository: a place for questions, ideas, announcements, and show-and-tell that don't belong in the issue tracker.

:::steps Turn on Discussions
1. **Open Settings** on the repository.
2. **Scroll to Features** and click **Set up discussions**.
3. **Write a welcome post** from the template, then click **Start discussion**.
:::

Inside, discussions are sorted into **categories** such as Announcements, Q&A, Ideas, and Polls. In Q&A categories you can **mark a comment as the answer**, which shows at the top for future visitors. Maintainers can pin, lock, and close discussions, and **convert an issue into a discussion** when it turns out to be a conversation rather than a task.

## Issue, discussion, or project?

| You have... | Use |
|---|---|
| A specific bug or task someone will do | Issue |
| A question, idea, or open-ended conversation | Discussion |
| Many issues to plan and track over time | Project |
| A long-lived document or guide | README, docs folder, or Wiki |

:::checklist
- Created a project with a board and a table view
- Added a Priority field and a draft issue
- Turned on the "item closed" workflow
- Enabled Discussions and posted a welcome message
:::
