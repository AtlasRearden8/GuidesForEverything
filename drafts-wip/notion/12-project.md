# Build a Project Tracker

Let's combine everything into a small but real system: projects with tasks. This is the most popular Notion setup in the world, and once you've built it, you'll understand how every other system works.

:::summary In this chapter
- Two linked databases: Projects and Tasks
- Progress bars with a rollup
- Useful views for daily work
- A task template and two automations
:::

## The plan

| Database | Properties |
|---|---|
| **Projects** | Name, Status, Owner (Person), Deadline (Date), Tasks (Relation), Progress (Rollup) |
| **Tasks** | Name, Status, Assignee (Person), Due (Date), Priority (Select), Project (Relation), Days left (Formula) |

## Build it

:::steps Build Projects + Tasks
1. **Create a page** called "Work hub".
2. **Add a Projects database** (`/database`, full page). Properties: **Status** (Status), **Owner** (Person), **Deadline** (Date).
3. **Add a Tasks database** inside Work hub. Properties: **Status** (Status), **Assignee** (Person), **Due** (Date), **Priority** (Select: High, Medium, Low).
4. **Link them.** In Tasks, add a **Relation** property pointing to **Projects**, and switch on **Show on Projects** so both sides see the link.
5. **Add progress.** In Projects, add a **Rollup**: relation *Tasks*, property *Status*, calculate *Percent per group › Complete*. Show it as a bar.
6. **Add a countdown.** In Tasks, add a **Formula** called "Days left": `dateBetween(prop("Due"), today(), "days")`.
7. **Create useful views of Tasks:** a **Board** grouped by Status, a **Calendar** by Due date, and a **My tasks** table filtered to *Assignee contains Me*.
8. **Add a template.** In Tasks, click the arrow next to **New**, choose **+ New template**, and add a checklist ("Definition of done") that every new task starts with.
:::

## Make it work for you

:::steps Finishing touches
1. **Sort Priority options** High, Medium, Low in the property menu, then sort the board by Priority.
2. **Color overdue tasks:** Conditional color › *Due is before Today* › red.
3. **Add an "Overdue" view:** filter *Due is before today* AND *Status is not Done*.
4. **Turn on sub-items** for big tasks (Chapter 9).
5. **Add a timeline view** of Projects using a Dates range property, so you can see them across the quarter.
:::

> [!NOTE]
> Prefer not to build from scratch? The **Templates** gallery (in the sidebar, or notion.com/templates) has thousands of ready-made systems: project trackers, CRMs, habit trackers, and more. Duplicate one, then customize it.

## Automate the busywork

- **Buttons** (`/button`): one click to add a pre-filled task, change several properties, or open a page.
- **Database automations** (paid plans): "when Status changes to Done, set Completed date to today and notify the owner in Slack." Find them under the ⚡ icon at the top right of a database.
- **Recurring templates:** make a template repeat, such as "Weekly review every Friday."

## A weekly routine

:::checklist
- Monday: open **My tasks**, set this week's Due dates
- Daily: work from the **Board**, drag cards as you go
- Friday: check the **Overdue** view and each project's Progress bar
- Friday: archive finished projects by setting Status to Done
:::

