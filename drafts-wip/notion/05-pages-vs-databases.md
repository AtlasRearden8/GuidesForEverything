# Pages vs Databases

New Notion users often ask: "Should this be a page or a database?" This chapter answers that question, then explains how databases are put together: full-page and inline databases, data sources, and linked views.

:::summary In this chapter
- The difference between a page and a database, in plain English
- A simple test for choosing between them
- Full-page vs inline databases
- Data sources and linked views
- Creating, duplicating, and locking a database
:::

## The short answer

- A **page** is a document. Use it for things you *read and write*: notes, guides, essays, plans.
- A **database** is a collection of similar pages. Use it for things you *track, sort, or count*: tasks, books, clients, expenses.

Here's the clever part: every item in a database is *also* a page. Open any row and you get a full page to write in, with the item's properties (date, status, owner…) shown at the top.

## A simple test

Ask yourself three questions:

1. **Will I have many of these?** (Ten books, fifty tasks, two hundred clients.)
2. **Do they share the same details?** (Every book has an author and a rating.)
3. **Will I want to sort, filter, or see them in different ways?** (Only unread books; tasks by due date.)

If you answered yes to two or more, use a **database**. If not, a plain **page** is fine. You can always change your mind later.

| You're making… | Use | Why |
|---|---|---|
| Meeting notes for one meeting | Page (inside a database of meetings) | One document, but you'll have many meetings |
| A company handbook | Pages | Mostly reading |
| A to-do list for today | Page with to-do blocks | Short-lived and simple |
| All your tasks for the year | Database | Many items with dates and statuses |
| A recipe | Page | One document |
| A recipe collection | Database (gallery view) | Many recipes with tags and photos |
| Contacts or clients | Database | Many items with the same fields |

> [!TIP]
> A good rule of thumb: if you find yourself copying and pasting the same headings or checklist into page after page, that's a sign you want a database with a template (Chapter 11).

## How a database is built

| Part | What it is | Example (a reading list) |
|---|---|---|
| **Database** | The container | "Reading list" |
| **Item** (row, card, or page) | One entry | "The Hobbit" |
| **Property** | A field every item has | Author, Status, Rating |
| **Value** | What's in one property for one item | "J.R.R. Tolkien" |
| **View** | One way of displaying the items | A table of everything; a board by status |

## Full-page vs inline databases

| Type | Where it lives | Best for |
|---|---|---|
| **Full-page database** | It *is* a page, listed in the sidebar | Main databases you open often |
| **Inline database** | Inside another page, between other blocks | Small databases next to related notes |

- **Expand** an inline database to full screen with the **⤡** icon at its top.
- **Turn inline into full page:** drag it with **⋮⋮** into the sidebar as a top-level page.
- **Turn full page into inline:** drag it into another page in the sidebar, open that page, then click **⋮⋮ › Turn into inline**.

## Create a database

:::steps Three ways to start
1. **From a new page.** Create a page and, under **Get started with**, choose **Table** (or another layout).
2. **With the slash command.** On any page, type `/database` and pick inline or full page.
3. **With AI.** When you create a database, choose **Build with AI** and describe what you need, such as "a reading list with author, genre, status, and rating". Notion AI builds the properties for you.
:::

You can also start from a **Suggested template**, or base the new database on an existing one in your workspace.

## Data sources

A **data source** is the actual collection of items and properties behind a database. Most databases have one data source. But a single database can hold *several* data sources, each with its own properties. For example, a CRM database might hold separate Contacts, Companies, and Deals data sources, all managed in one place.

You don't need to think about data sources for simple setups. They matter when you build advanced systems or use the API (Chapter 25), which talks to data sources directly.

## Linked views

A **linked view** shows a database that lives somewhere else, with its own filters and layout. Changes you make in a linked view change the original data, because it *is* the same data.

:::steps Add a linked view
1. **Open the page** where you want the view, such as your Home page.
2. **Type `/linked`** and choose the **linked view** option.
3. **Pick the database** you want to show.
4. **Set up the view:** choose a layout and add filters, such as *Assignee is Me*.
:::

> [!NOTE]
> Deleting a linked view only removes that view. The original database and its items are untouched.

## Duplicate or lock a database

- **Duplicate:** for an inline database, use **⋮⋮ › Duplicate**; for a full-page database, use **••• › Duplicate**. Choose **Duplicate with content** to copy everything, or **Duplicate without content** to reuse just the structure.
- **Lock:** on a full-page database, choose **••• › Lock database** so others can't change its properties and options by accident.

:::checklist
- I can explain the difference between a page and a database
- I used the three-question test on something I want to track
- I know full-page vs inline databases
- I added a linked view of a database to another page
:::

