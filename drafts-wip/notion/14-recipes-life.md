# Recipes for Your Own Life

These step-by-step builds use only what you've learned so far. Each takes 15 to 30 minutes. Build one, use it for a week, then tweak it: the best Notion systems grow out of real use.

:::summary In this chapter
- A second brain using the PARA method
- A reading list with progress
- A habit tracker
- A budget tracker
- A job application tracker
:::

## Recipe 1: a second brain (PARA)

A **second brain** is a trusted place for everything you want to remember. **PARA** is a popular way to organize it, using four buckets:

| Bucket | Holds | Example |
|---|---|---|
| **Projects** | Short efforts with a goal and an end | "Plan the wedding" |
| **Areas** | Ongoing responsibilities | Health, Finances, Home |
| **Resources** | Topics you're interested in | Recipes, Photography |
| **Archive** | Anything finished or inactive | Last year's projects |

:::steps Build PARA
1. **Create a page "Second brain"** with four linked sections, or one database per bucket.
2. **Create a Notes database** with properties: Type (Select: Note, Idea, Clipping), Project (Relation), Area (Relation), Resource (Relation), Created time.
3. **Create Projects and Areas databases.** Projects: Status, Deadline, Area (Relation). Areas: just a name and icon.
4. **Add an Inbox view** of Notes filtered to *Project is empty AND Area is empty AND Resource is empty*. New notes land here until you file them.
5. **Add a "➕ Capture" button** that adds a page to Notes and opens it.
6. **Install the Web Clipper** (Chapter 27) to save web pages straight into Notes.
7. **Weekly:** empty the Inbox by linking each note to a Project, Area, or Resource. Set finished projects to Done and filter them into an Archive view.
:::

> [!TIP]
> Don't over-organize. A note that's linked to *one* sensible place is findable; search and Notion AI will do the rest.

## Recipe 2: a reading list

:::steps Build a reading list
1. **Create a full-page database "Books".** Properties: Author (Text), Status (Status: Want to read, Reading, Finished), Rating (Select: ★ to ★★★★★), Genre (Multi-select), Cover (Files & media), Pages (Number), Pages read (Number), Finished (Date).
2. **Add a Progress formula:** `format(round(prop("Pages read") / prop("Pages") * 100)) + "%"`.
3. **Add a Gallery view** with Cover as the card preview: your bookshelf.
4. **Add a Board** grouped by Status.
5. **Add a Chart view:** books finished per month (X axis Finished, grouped by month).
6. **Make a template** with headings: Summary, Favorite quotes, What I'll do differently.
:::

## Recipe 3: a habit tracker

:::steps Build a habit tracker
1. **Create a database "Habits log"** where each item is one day. Title: the date as text, or use a Date property called Day.
2. **Add a Checkbox for each habit:** Exercise, Read, Water, Sleep by 11.
3. **Add a Score formula:**
   ```text
   toNumber(prop("Exercise")) + toNumber(prop("Read")) +
     toNumber(prop("Water")) + toNumber(prop("Sleep by 11"))
   ```
4. **Add a repeating template** that creates a new day every morning (daily repeat).
5. **Add a table view** sorted by Day, descending, with column **Calculate › Percent checked** under each habit.
6. **Add a line chart** of Score over Day to see your trend.
:::

## Recipe 4: a budget tracker

:::steps Build a budget
1. **Create a Categories database:** Name (Groceries, Rent, Fun…), Monthly budget (Number, currency).
2. **Create a Transactions database:** Amount (Number, currency), Date, Type (Select: Income, Expense), Category (Relation to Categories), Account (Select).
3. **In Categories, add a rollup "Spent":** relation *Transactions*, property *Amount*, calculate **Sum**.
4. **Add a "Left" formula** in Categories: `prop("Monthly budget") - prop("Spent")`.
5. **Color categories** with Left below 0 in red (conditional color).
6. **Add views of Transactions:** This month (Date is within this month), by Category (grouped), and a donut chart of spending by category.
7. **Add a "➖ Expense" button** that adds a transaction with Type = Expense and Date = today.
:::

> [!NOTE]
> The "Spent" rollup adds up *all* transactions in a category, not just this month's. For monthly totals, start a new set of Categories each month from a template, or filter your Transactions views by month.

## Recipe 5: a job application tracker

:::steps Build a job hunt board
1. **Create a database "Applications".** Properties: Company (Text), Role (Text), Status (Status: Saved, Applied, Interviewing, Offer, Rejected), Applied (Date), Salary (Number), Link (URL), Contact (Email), Next step (Date).
2. **Add a Board** grouped by Status: drag each application along as it progresses.
3. **Add "Days since applied":** `dateBetween(today(), prop("Applied"), "days")`.
4. **Add a "Follow up" view:** Status is Applied AND Days since applied > 7.
5. **Make a template** with sections: Job description (paste it in), Why I fit, Questions to ask, Interview notes.
6. **Set reminders** on Next step dates so Notion nudges you.
:::

```prompt
Using the job description on this page and my CV page, draft a short,
friendly cover letter and five questions I could ask in the interview.
```

:::checklist
- I built at least one of these recipes
- I used it for a few days and changed one thing
- I added a template or a button to speed up daily entry
:::

