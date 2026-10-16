# Data Tables: A Spreadsheet Inside n8n

Workflows often need to remember things between runs: which emails were already handled, a list of VIP customers, the prompt text your AI uses. You could use Google Sheets or a database, but n8n has **data tables** built in: simple tables that live inside your n8n project.

:::summary In this chapter
- What data tables are good (and not good) for
- Creating a table by hand or from a CSV
- Reading and writing rows with the Data Table node
- A worked example: never process the same item twice
- Limits and alternatives
:::

## Good uses

- Remembering what you've already processed, to avoid duplicates
- Lookup tables, such as product codes to names
- Reusable prompts and message templates
- A simple log of what your workflows did
- Test cases for checking AI workflows

## Create a table

:::steps Make a "processed" table
1. **Open your project** (or Overview) and select the **Data tables** tab.
2. **Select Create Data table** from the button in the top right.
3. **Name it** "processed_items".
4. **Choose From scratch**, then add columns: `item_id` (string) and `processed_at` (date).
:::

You can also choose **Import CSV** to build a table from a spreadsheet file, and later **Download CSV** from the table's menu. In the table view you can add, edit, reorder and delete rows and columns by hand.

## The Data Table node

In a workflow, the **Data Table** node works with two resources:

| Resource | Operations |
|---|---|
| **Row** | Insert, Get, Update, Upsert, Delete, If Row Exists, If Row Does Not Exist |
| **Data table** | Create, List, Update, Delete |

**Upsert** means "update the row if it exists, otherwise insert it." **If Row Does Not Exist** passes through only the items that aren't in the table yet, which makes it a one-node duplicate filter.

## Worked example: skip what you've seen

:::steps Process each item only once
1. **Start with your trigger and data**, for example an RSS Read node returning posts with a `link` field.
2. **Add a Data Table node**, resource **Row**, operation **If Row Does Not Exist**. Choose `processed_items` and match `item_id` against `{{ $json.link }}`.
3. **Do the work** on the items that come out: send them to Slack, summarise them, and so on.
4. **Record them.** Add another Data Table node, operation **Insert**, setting `item_id` to `{{ $json.link }}` and `processed_at` to `{{ $now.toISO() }}`.
:::

Run it twice: the second run finds nothing new and stops early.

## Limits

- By default, all data tables in an instance share **200 MiB** of storage. n8n warns at 80%. Past the limit, inserts and updates fail. Self-hosted owners can raise it with the `N8N_DATA_TABLES_MAX_SIZE_BYTES` environment variable.
- Tables belong to a project, and everyone in the project can use them.
- The Code node can't read data tables directly; use the Data Table node and pass the results in.

## Data tables, variables or a real database?

| Need | Use |
|---|---|
| Rows and columns, moderate size | Data tables |
| A few constant values used everywhere (paid plans) | Custom variables (`$vars`) |
| Large data, many users, complex queries | PostgreSQL, Airtable, Google Sheets or similar |

:::checklist
- I've created a data table by hand
- I've used Insert and If Row Does Not Exist in a workflow
- I know the 200 MiB default limit
- I know when to move to a real database
:::

