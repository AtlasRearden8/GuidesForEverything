# Relations, Rollups, and Sub-items

Real life is connected. Tasks belong to projects, books have authors, invoices belong to clients. **Relations** connect databases so each item knows its partners, and **rollups** summarize across those connections.

:::summary In this chapter
- What relations are, with a plain example
- One-way and two-way relations, and limits
- Rollups and their calculations
- Sub-items and dependencies for tasks
:::

## Relations and rollups, simply

A **relation** connects two databases. Link a **Tasks** database to a **Projects** database and each task knows its project, and each project lists its tasks. A **rollup** then summarizes across that link, such as "count of tasks" or "percent of tasks done," shown right on the project.

Think of a relation like a string tied between two index cards. A rollup reads something off every card at the other end of the string and adds it up.

## Create a relation

:::steps Link Tasks to Projects
1. **Open the Tasks database** and add a property. Choose **Relation**.
2. **Pick the database to connect to:** Projects.
3. **Decide on two-way.** Switch on **Show on Projects** (two-way relation) so each project also gets a "Tasks" property listing its tasks.
4. **Optional limit.** Choose **1 page** if each task should belong to only one project, or **No limit**.
5. **Click Add relation.**
6. **Fill it in:** click a task's Project cell and choose a project.
:::

| Setting | Meaning |
|---|---|
| **One-way** | Only Tasks shows the link |
| **Two-way** | Both databases get a property and stay in sync |
| **Limit: 1 page** | Each item links to one item at most |
| **Self-relation** | A database related to itself, such as "Parent task" or "Next / Previous" |

> [!TIP]
> Name both sides clearly: "Project" on Tasks and "Tasks" on Projects. You'll thank yourself when you build rollups and formulas.

## Rollups

A **rollup** looks through a relation at one property of the related items and calculates something.

:::steps Show project progress
1. **In Projects, add a Rollup property** called "Progress".
2. **Relation:** Tasks.
3. **Property:** Status.
4. **Calculate:** **Percent per group › Complete**.
5. **Show as** a bar for a visual progress meter.
:::

Common rollup calculations:

| Calculation | Gives you | Example |
|---|---|---|
| **Show original** | The related values themselves | All task names |
| **Count all** | How many related items | 12 tasks |
| **Count values / unique values** | How many values or distinct values | 3 assignees |
| **Percent empty / not empty** | Share with or without a value | 40% have due dates |
| **Sum, average, median, min, max** | Number maths | Total hours |
| **Earliest / latest date, date range** | Date summaries | Next deadline |
| **Percent per group** | Share in a Status group | 75% Complete |

## Sub-items

**Sub-items** break a big task into smaller tasks inside the same database.

:::steps Turn on sub-items
1. **Open the settings menu** at the top of the database.
2. **Under Database settings, choose More settings.**
3. **Choose Sub-items › Turn on sub-items.**
:::

You can then show sub-items **nested in a toggle** under their parent, or as a **flattened list**. Filter options let you show parents only, parents and sub-items, or sub-items only.

> [!CAUTION]
> Deleting a parent item deletes all of its sub-items too. Move the sub-items out first if you want to keep them.

## Dependencies

**Dependencies** record that one task is *blocked by* another, such as "Print flyers" is blocked by "Design flyers". Turn them on in the same **More settings** menu. In a timeline view, dependencies appear as arrows between bars, so you can see what has to happen first.

## Worked example: a tiny book club

:::steps Books and Members
1. **Create two databases:** Books (Title, Month) and Members (Name).
2. **Add a two-way relation** from Books to Members called "Read by".
3. **Tick off readers** for each book in its "Read by" cell.
4. **In Members, add a rollup** "Books read": relation *Books*, calculate **Count all**.
5. **In Books, add a rollup** "Readers": relation *Read by*, **Count all**.
:::

Now each member shows how many books they've read, and each book shows how many people read it.

:::checklist
- I created a two-way relation between two databases
- I added a rollup that counts related items
- I built a progress rollup using Percent per group
- I turned on sub-items in a task database
:::

