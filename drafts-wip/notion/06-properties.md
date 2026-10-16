# Database Properties

A **database** is a collection of pages that share the same set of **properties** (fields). Each item is a full page you can open and write in, *and* a row with data like a date, a status, or a person. This chapter covers every property type and how to set each one up.

:::summary In this chapter
- Build your first database: a reading list
- Every property type, with examples
- Editing, hiding, and reordering properties
- Status groups, date options, number formats
- Conditional color, and letting AI fill in properties
:::

## Create a database

:::steps Your first database: a reading list
1. **Create a new page** called "Reading list".
2. **Type `/database`** and choose an inline or full-page database.
3. **Rename the default columns.** "Name" holds the book title.
4. **Add properties.** Click **+** at the end of the header row. Add **Author** (Text), **Status** (Status: Not started / In progress / Done), **Rating** (Select: ★ to ★★★★★), and **Finished** (Date).
5. **Add a few books.** Click **New** or the empty row at the bottom.
6. **Open a book** by hovering over its name and clicking **Open**, and write your notes inside it. Every row is a page!
:::

## Property types

| Property | Holds | Example use |
|---|---|---|
| **Text** | Words, with formatting | Author, notes |
| **Number** | Numbers, money, percentages | Price, hours |
| **Select** | One tag from a list | Genre, priority |
| **Multi-select** | Several tags from a list | Topics, skills |
| **Status** | To-do / In progress / Complete groups | Task progress |
| **Date** | A date or range, with optional time and reminder | Due date |
| **Person** | Workspace members or groups | Assignee |
| **Files & media** | Uploaded files and images | Contract PDF, cover photo |
| **Checkbox** | Yes or no | Paid? |
| **URL** | A web link that opens in a new tab | Website |
| **Email** | An address that opens your mail app | Contact email |
| **Phone** | A number your device can call | Client phone |
| **Relation** | Links to items in another database | Tasks ↔ Projects |
| **Rollup** | Summarizes data through a relation | % of tasks done |
| **Formula** | Calculates from other properties | Days until due |
| **Button** | Runs actions with one click | "Mark done" |
| **ID** | An automatic unique number | TASK-42 |
| **Place** | A location or address | Office, venue |
| **Created time**, **Created by** | Set automatically when an item is made | Audit trail |
| **Last edited time**, **Last edited by** | Updated automatically on every edit | "Stale" check |

The first column, usually called **Name**, is the item's title. Every database has exactly one.

> [!NOTE]
> Each database can have up to 500 properties. You'll almost certainly never hit that, but if you do, delete or combine unused ones.

## Adding and editing properties

- **Add:** click **+** to the right of the last column, or in a table click a column name and choose **Insert left** or **Insert right**. Give it a name and pick a type.
- **Edit:** click a column name to rename it, change its type, filter or sort by it, or run calculations.
- **Manage all properties:** open the database's settings menu (the slider icon at the top) and choose **Edit properties**. Here you can search, add, duplicate, or delete properties.
- **Hide or show** a property in the current view: settings menu › **Property visibility**, then click the 👁️ next to it.
- **Reorder** columns by dragging their headers.

> [!TIP]
> Hiding a property only hides it in *that view*. The data is still there. Use this to keep each view focused.

## The important types, in more detail

### Select and multi-select

Type an option and press <kbd>Enter</kbd> to create it; Notion assigns a random color. Click **•••** next to an option to rename it, change its color, or delete it. Drag options by their **⋮⋮** to reorder them, which also controls how they sort.

> [!TIP]
> Choose **Select** when an item can only be one thing (a task has one priority), and **Multi-select** when it can be many (a recipe can be both "vegetarian" and "quick").

### Status

A **Status** property sorts its options into three groups: **To-do**, **In progress**, and **Complete**. You can rename options and add more inside each group (for example "Blocked" under In progress). Board views and progress rollups understand these groups, which makes Status better than Select for tracking work.

### Date

Click a date cell to open the date picker:

- **Remind:** get a notification at a date and time.
- **End date:** turn it into a range, such as a trip from Monday to Friday. Timeline views need ranges.
- **Include time:** add a time, not just a day.
- **Date format & timezone:** choose how the date looks.
- **Clear:** remove the date.

### Number

Numbers can be formatted as plain numbers, with commas, as percentages, or as currencies. You can also show a number as a **progress bar**, which is great for tracking completion (store 0.75 with the percent format and it shows as 75%).

### Person

Type a name and press <kbd>Enter</kbd> to tag someone. Tagged people are notified by default. Person properties also power filters like *Assignee is Me*, and, on Business and Enterprise plans, permissions that let people see only their own items (Chapter 20).

### Files & media

Click the cell to upload, paste a link, or drag files in. A gallery view can show the first image as each card's cover.

### ID

An **ID** property numbers each item automatically: 1, 2, 3… You can add a prefix, such as `BUG`, to get `BUG-1`, `BUG-2`. IDs are unique and can't be edited by hand, which makes them perfect for tickets and invoices.

### Place

A **Place** property holds a location: your current location, a place name, or an address. It powers the **Map** view (Chapter 7).

## Conditional color

**Conditional color** colors items that match a rule, such as showing overdue tasks in red.

:::steps Color overdue tasks red
1. **Open the settings menu** (slider icon) at the top of the view.
2. **Choose Conditional color › New color setting.**
3. **Pick the property**, such as **Due**.
4. **Set the rule**, such as *Due is before Today*.
5. **Choose a background color**, such as red. In a table, choose whether to color the whole row or just that cell.
:::

Conditional color works in table, board, calendar, timeline, list, and feed views. You need edit access to the database to set it up.

## Let AI fill in properties

Notion AI can **autofill** certain properties for every item: a one-line summary, keywords, a translation, or a category based on the page's content. Create the property, choose an AI autofill option in its settings, and describe what you want. On Free and Plus plans this is part of the limited AI trial (Chapter 16).

## Page layouts

Open any database item and you'll see its properties at the top. You can design a **layout** that applies to every page in the database, choosing which properties appear first and how they're arranged. Open an item and look for the option to customize its layout near the properties.

## Worked example: a property plan

Before you build, sketch your properties on paper. Here's a plan for a simple **home inventory**:

| Property | Type | Why |
|---|---|---|
| Name | Title | "Washing machine" |
| Room | Select | Kitchen, Garage… |
| Bought | Date | For warranty dates |
| Price | Number (currency) | For insurance |
| Receipt | Files & media | Proof of purchase |
| Warranty ends | Date | Reminders before expiry |
| Photo | Files & media | Gallery covers |

:::checklist
- I built a reading list with four properties
- I know when to use Select, Multi-select, and Status
- I set a date with a reminder
- I hid a property in one view
- I set up a conditional color rule
:::

