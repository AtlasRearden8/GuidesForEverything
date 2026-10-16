# Database Views

A **view** is one way of looking at a database. The same tasks can appear as a table for editing, a board for tracking progress, and a calendar for deadlines, all at once, all showing the same data. Change an item in one view and it changes everywhere.

:::summary In this chapter
- Every view type and what it's best for
- Creating, renaming, and switching views
- How pages open from a view
- The special settings of each view
- Dashboards: many views on one screen
:::

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
| **Chart** | Bar, line, donut, or number charts | Reports |
| **Feed** | Stacked posts, like a blog or social feed | Team updates, announcements |
| **Map** | Pins from a Place property | Places, travel plans |
| **Form** | A fill-in form that creates items | Requests, sign-ups, surveys |
| **Dashboard** | Several views side by side (Business and Enterprise) | Status overviews |

Each view has its own **Filter** (show only some items), **Sort** (order them), and **Group** (split into sections). For example, make a "Currently reading" board view filtered to *Status is In progress*. Chapter 8 covers these in depth.

## Create and manage views

:::steps Add a view
1. **Click + next to your current view's name** at the top left of the database. On a narrow screen, click the current view's name and choose **New view**.
2. **Choose a layout**, such as Board.
3. **Name the view**, such as "By status".
4. **Set it up**: pick the property to group or plot by, then add any filters.
:::

- **Rename, duplicate, or delete** a view: click its name.
- **Reorder views** by dragging their tabs.
- **Show tabs as icons, text, or both:** click a view tab › **Display as**. This only changes what *you* see.
- **Link to a view:** settings menu › **Copy link to view**. Share it so people land on exactly the right view.

> [!NOTE]
> Each view has its own settings. Changing filters or hidden properties in one view doesn't affect the others.

## How pages open

Each view decides how an item opens when you click it. In the settings menu, choose **Layout › Open pages in**:

| Option | What happens | Default for |
|---|---|---|
| **Side peek** | Opens on the right; the database stays usable on the left | Table, board, list, timeline |
| **Center peek** | Opens in a focused window in the middle | Gallery, calendar |
| **Full page** | Opens as a normal page | Nothing by default |

In peek view, jump to the next or previous item with <kbd>Ctrl</kbd> + <kbd>J</kbd> / <kbd>Ctrl</kbd> + <kbd>K</kbd> on Windows, or <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>J</kbd> / <kbd>K</kbd> on a Mac.

## Each view in detail

### Table

The classic grid. Useful extras:

- **Calculate:** at the bottom of a column, choose a calculation such as Sum, Average, Count, or Percent checked.
- **Wrap text:** click a column name › **Wrap text** to show long text on several lines.
- **Freeze columns:** click a column name › **Freeze up to column** so it stays visible as you scroll sideways.
- **Fill down:** select several cells and press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>D</kbd> to copy the top value down.

### Board

Cards arranged in columns, one column per value of a property (usually Status). Drag a card to another column to change its value. In the settings menu you can:

- **Group by** a different property, and **sub-group** by another, such as Status columns with Priority rows.
- Change the **Card size** (small, medium, large) and the **Card preview** (page cover, page content, or an image from a Files property). Toggle **Fit image** to avoid cropping.

### Calendar

Shows each item on its date. Choose which date property to use with **Show calendar by**. Hover over a day and click **+** to add an item on that date. Drag items to reschedule them.

> [!TIP]
> Want your Notion deadlines next to your real meetings? Add the database to Notion Calendar (Chapter 22).

### Timeline

Shows items as bars from their start to end date, like a Gantt chart. It needs a date property that holds a **range**. Use the dropdown near **Today** to zoom from hours to years. Drag a bar's ends to change its dates. Timelines can also show **dependencies** between tasks (Chapter 9).

### List

A minimal list of page titles, with any properties you choose shown at the right. Perfect for notes and documents where the content matters more than the fields.

### Gallery

A grid of cards, each with a preview image. Like boards, galleries have **Card preview**, **Card size**, and **Fit image** settings. Choose a Files & media property as the preview to show photos you've uploaded.

### Chart

Turns your data into a **vertical bar**, **horizontal bar**, **line**, **donut**, or **number** chart. Type `/chart` on a page, or add a Chart view to an existing database. You pick what goes on each axis, such as *Status* on the X axis and *Count* on the Y axis.

> [!NOTE]
> The Free plan includes one chart to try; paid plans get unlimited charts. Charts show up to 200 groups at a time, and you can't edit items from a chart view.

### Feed

Shows items as stacked posts you scroll through, like a blog. Readers can comment on each post directly, and authors can see view counts. Type `/feed view` on a page, or add a Feed view to a database. Use it for weekly team updates or a family news page.

### Map

Shows items as pins on a map, using a **Place** property (one is created for you if needed). Type `/map` on a page, or add a Map view. Click a pin to open its page. A map shows up to 100 items at once.

### Form

Turns the database into a form that anyone you choose can fill in. Each answer becomes a new item. Forms have a whole chapter of their own (Chapter 19).

## Dashboards

A **dashboard view** (Business and Enterprise plans) arranges several **widgets** in one layout. Each widget shows a view, such as a chart of tasks by status, a board of this week's work, and a calendar of deadlines.

:::steps Build a dashboard view
1. **Open a database** and click **+** to add a view, then choose **Dashboard**. Or type `/dash` on a page.
2. **Click Edit** in the database header to enter edit mode.
3. **Add a widget** with the **+** on a row, and pick an existing view or create a new one.
4. **Arrange widgets:** drag them into rows; drag the dividers to change widths and heights.
5. **Leave edit mode** to use the dashboard.
:::

Dashboards hold up to 4 widgets per row and 12 in total, and can mix views from several databases. You can also ask Notion Agent: "Create a dashboard for my Tasks database that shows key metrics."

> [!TIP]
> On Free and Plus plans, you can build a dashboard *page* instead: a normal page with several linked views arranged in columns. Chapter 13 shows how.

## Worked example: one database, four views

Take a **Tasks** database with Name, Status, Due, Priority, and Assignee:

| View | Layout | Settings |
|---|---|---|
| All tasks | Table | Sorted by Due, ascending |
| Board | Board | Grouped by Status, sub-grouped by Priority |
| Deadlines | Calendar | Show calendar by Due |
| My week | List | Filter: Assignee is Me, Due is this week |

:::checklist
- I added a board view grouped by Status
- I added a calendar view using a date property
- I changed how pages open in one view
- I tried a chart or gallery view
- I know dashboards need Business or Enterprise
:::

