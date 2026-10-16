# Core Nodes: The Toolkit You'll Use Every Day

App nodes talk to other services; **core nodes** are the logic and plumbing that join everything together. Learn these ten or so and you can build almost any workflow. This chapter explains each one with a small example.

:::summary In this chapter
- Edit Fields (Set), Filter, If and Switch
- Merge and Loop Over Items
- HTTP Request, including pagination and cURL import
- Wait, and the smaller helpers
- A reference table of every everyday core node
:::

## Edit Fields (Set)

**Edit Fields** (often still called the Set node) adds, changes or removes fields. It has two modes: **Manual Mapping**, where you add fields one by one in the interface, and **JSON Output**, where you write the JSON yourself.

- Turn on **Keep Only Set Fields** (or set **Include in Output** accordingly) to drop everything you didn't list, which keeps later nodes tidy.
- Each field has a type (String, Number, Boolean, Array, Object). Choose the right one so later comparisons work.

> [!TIP]
> Put an Edit Fields node right after a trigger to rename messy field names (`Your E-mail Address`) into clean ones (`email`). Every later node becomes easier to read.

## Filter

**Filter** keeps only items that match your conditions and silently drops the rest. Use it to skip unneeded work early, which also saves executions downstream. Example: keep orders where `{{ $json.total }}` **is greater than** `100`.

## If

**If** sends each item down a **true** or **false** output. Conditions compare values by type: String (contains, starts with, is empty…), Number (greater than…), Date & Time (is after…), Boolean, Array (contains, length…) and Object. Combine several conditions with **AND** (all must match) or **OR** (any may match).

## Switch

**Switch** is an If with many outputs, like a railway junction. In **Rules** mode, you add one rule per output, for example "category is *billing*," "category is *technical*." Useful options:

- **Fallback Output**: where items go if no rule matches. Add an extra output so nothing disappears silently.
- **Send data to all matching outputs**: otherwise an item only goes to the first matching rule.
- **Ignore Case**: treat `Billing` and `billing` the same.

**Expression** mode lets an expression return the output number directly.

## Merge

**Merge** waits for two (or more) inputs and combines them. Choose a mode:

| Mode | Does | Like |
|---|---|---|
| **Append** | Lists all items from input 1, then input 2 | Stacking two piles |
| **Combine › Matching Fields** | Joins items where a field matches (e.g. `email`) | A spreadsheet lookup |
| **Combine › Position** | Pairs item 1 with item 1, item 2 with item 2 | Zipping two lists |
| **Combine › All Possible Combinations** | Every item with every other item | A grid |
| **SQL Query** | Write SQL over the inputs | A database query |
| **Choose Branch** | Waits for both, outputs one | A gate |

When matching fields, choose what to keep: **Keep Matches** (inner join), **Keep Everything** (outer join), **Enrich Input 1** (keep all of input 1, add matches from input 2) and so on.

> [!NOTE]
> A common pattern is If → two branches → Merge. Merge waits for both branches, so the workflow continues once, with all the data, after the paths split.

## Loop Over Items (Split in Batches)

Usually you **don't need a loop**: nodes already process every item. Use **Loop Over Items** when you must handle items in smaller groups, typically to respect an API's **rate limit** (how many requests per minute it accepts).

:::steps Process 500 contacts, 10 at a time
1. **Add Loop Over Items** after the node producing the contacts. Set **Batch Size** to `10`.
2. **Connect the loop output** to the work you want to do (for example an HTTP Request), then a **Wait** node of 2 seconds.
3. **Connect the Wait node back** to the Loop Over Items input. That closes the loop.
4. **Connect the done output** to whatever should happen at the end. It receives all processed items once every batch has finished.
:::

You can also build a "loop until" by connecting a later node back to an earlier one with an If node deciding when to stop.

## HTTP Request

**HTTP Request** calls any web API, so it's your escape hatch when n8n has no dedicated node. The key settings:

| Setting | What to put |
|---|---|
| **Method** | `GET` to read, `POST` to create, `PUT`/`PATCH` to update, `DELETE` to remove |
| **URL** | The API endpoint from the service's docs |
| **Authentication** | A **predefined credential** for a known app, or a **generic** one (header, bearer, basic, OAuth2) |
| **Send Query Parameters** | Values after `?` in the URL |
| **Send Headers** | Extra headers the API asks for |
| **Send Body** | JSON, form data, or a binary file for POST/PUT |

Useful options: **Batching** (items per batch plus a pause, for rate limits), **Pagination** (fetch all pages automatically, either by updating a parameter each request or by following a "next URL" in the response), **Response › Never Error** (don't fail on 4xx/5xx codes), and **Timeout**.

> [!TIP]
> API docs often show a `curl` command. Click **Import cURL** in the HTTP Request node, paste it, and n8n fills in method, URL, headers and body for you. Move any secret key into a credential afterwards.

> [!TIP]
> Choosing **Predefined Credential Type** lets you reuse, say, your Notion credential to call a Notion API endpoint the Notion node doesn't cover.

## Wait

**Wait** pauses a workflow. Its modes are **After Time Interval** (wait 10 minutes), **At Specified Time** (wait until Monday 9am), **On Webhook Call** (wait until something calls a unique "resume" URL, available as `$execution.resumeUrl`) and **On Form Submitted** (wait until someone completes a form). Long waits don't hold up your server: n8n saves the execution and resumes it later.

## Everyday helpers

:::compact
| Node | Use it to |
|---|---|
| **Aggregate** | Combine many items into one item with lists |
| **Split Out** | Turn a list inside one item into many items |
| **Summarize** | Count, sum or average, grouped by a field |
| **Sort** / **Limit** | Order items; keep only the first *n* |
| **Remove Duplicates** | Drop repeats in this run, or items seen in previous runs |
| **Compare Datasets** | Find what's new, changed or missing between two lists |
| **Date & Time** | Format, add to, or compare dates |
| **Crypto** | Hash values, generate random strings |
| **HTML** | Extract content from web pages with CSS selectors |
| **Respond to Webhook** | Send a custom reply to a Webhook caller |
| **Execute Sub-workflow** | Call another workflow (Chapter 14) |
| **Stop and Error** | Fail on purpose with a clear message (Chapter 17) |
| **No Operation, do nothing** | A placeholder that keeps the canvas tidy |
| **Data Table** | Read and write n8n's built-in tables (Chapter 15) |
:::

> [!TIP]
> **Remove Duplicates** has a mode called **Remove Items Processed in Previous Executions**. It remembers what it has seen across runs, which is perfect for "only alert me about new RSS posts" without a database.

:::checklist
- I can reshape data with Edit Fields
- I can branch with If and Switch, and rejoin with Merge
- I know when I need Loop Over Items (and when I don't)
- I can call an API with HTTP Request and import a cURL command
- I know Remove Duplicates can remember previous runs
:::

