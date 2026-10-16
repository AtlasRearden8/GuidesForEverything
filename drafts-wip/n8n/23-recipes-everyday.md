# Recipes: Everyday Automations

The next three chapters are a cookbook: twelve complete workflows you can build in an afternoon each. Every recipe lists what you need, the steps, and ideas to extend it. Build them as written first, then make them yours. Exact field names in app nodes can vary slightly between versions; pick the closest match.

:::summary In this chapter
- Recipe 1: RSS-to-Slack daily digest
- Recipe 2: a daily report email
- Recipe 3: nightly file backup
- Recipe 4: social post scheduler
:::

> [!TIP]
> For every recipe: test each node as you add it, pin data on slow or expensive steps, attach your error workflow (Chapter 17), and only then publish.

## Recipe 1: RSS-to-Slack digest

**Goal:** every morning, post a short AI-written digest of new articles from your favourite sites to a Slack channel.

**You need:** Slack credential, a chat model (or Gateway credits). **Nodes:** Schedule Trigger, RSS Read, Remove Duplicates, Limit, Aggregate, Basic LLM Chain, Slack.

:::steps Build the digest
1. **Schedule Trigger:** Days, at 8am.
2. **RSS Read:** paste a feed URL (most blogs and news sites have one; try adding `/feed` or `/rss` to the site address). For several feeds, put the URLs in an Edit Fields node as a list, Split Out, and feed each into RSS Read using `{{ $json.url }}`.
3. **Remove Duplicates:** operation **Remove Items Processed in Previous Executions**, deduping on `{{ $json.link }}`. Now you only see new articles.
4. **Limit:** keep 10 items so the digest stays short.
5. **Aggregate:** combine the `title`, `link` and `contentSnippet` fields into lists, making one item.
6. **Basic LLM Chain:** prompt: `Write a friendly Slack digest. For each article give the title as a link and one sentence on why it matters. Articles: {{ JSON.stringify($json) }}`.
7. **Slack:** send a message to `#reading` with the chain's `text` output.
:::

**Extend it:** add a Text Classifier to tag articles by topic; post only on weekdays; send to email or Telegram instead.

## Recipe 2: daily report email

**Goal:** at 6pm, email yourself a summary of today's sales from a Google Sheet.

**Nodes:** Schedule Trigger, Google Sheets, Filter, Summarize, Code (or Edit Fields), Gmail.

:::steps Build the report
1. **Schedule Trigger:** Days, at 6pm.
2. **Google Sheets:** operation to get rows from your "Sales" sheet.
3. **Filter:** keep rows where `{{ $json.date }}` equals `{{ $today.toFormat('yyyy-MM-dd') }}` (match your sheet's date format).
4. **Summarize:** sum `amount`, count rows, grouped by `product` if you like.
5. **Code:** build an HTML table with recipe 5 from Chapter 10, adding a total line.
6. **Gmail:** send to yourself, subject `Sales {{ $today.toFormat('d LLL') }}`, email type HTML, message `{{ $json.html }}`.
:::

> [!TIP]
> If no sales happened, the Filter outputs nothing and the email isn't sent. Prefer a "No sales today" email? Turn on **Always Output Data** on the Filter and add an If node checking for an empty result.

## Recipe 3: nightly file backup

**Goal:** every night, copy new files from one cloud folder to another (for example Google Drive to Dropbox), and log what was copied.

**Nodes:** Schedule Trigger, Google Drive (search/list files), Data Table, Google Drive (download), Dropbox (upload), Data Table (insert).

:::steps Build the backup
1. **Schedule Trigger:** Days, at 2am.
2. **Google Drive:** list or search the files in your chosen folder.
3. **Data Table › If Row Does Not Exist:** check each file ID against a `backed_up` table (Chapter 15), so only new files continue.
4. **Google Drive › Download:** download each file by ID. It arrives as binary data.
5. **Dropbox › Upload:** set the path to `/Backups/{{ $json.name }}` and the binary property to the download's slot (usually `data`).
6. **Data Table › Insert:** record the file ID, name and `{{ $now.toISO() }}`.
:::

**Self-hosted variation:** use **Read/Write Files from Disk** to save files to a folder on your server that your system backups already cover. Large files use memory, so add Loop Over Items with a small batch size if you back up many big files.

## Recipe 4: social post scheduler

**Goal:** write posts in a spreadsheet with a date and time; n8n publishes each one when it's due.

**Sheet columns:** `post_text`, `image_url`, `publish_at` (e.g. `2026-10-20 09:00`), `status`.

**Nodes:** Schedule Trigger, Google Sheets, Filter, social node (LinkedIn, X, Facebook…), Google Sheets update.

:::steps Build the scheduler
1. **Schedule Trigger:** every 15 minutes.
2. **Google Sheets:** get rows from the "Posts" sheet.
3. **Filter:** `status` **is empty** AND `{{ $json.publish_at.toDateTime() }}` **is before** `{{ $now }}` (Date & Time comparison).
4. **Social node:** for example **LinkedIn › Create a post** with `{{ $json.post_text }}`. If there's an image, download it first with HTTP Request and attach the binary.
5. **Google Sheets › Update row:** set `status` to `posted` and add the time, matching on the row number.
:::

> [!WARNING]
> Always mark rows as posted *after* posting succeeds, and attach your error workflow. Otherwise a failure could cause a post to go out twice, or not at all.

**Extend it:** add a Basic LLM Chain that turns one long post into short versions for each network; add an approval step with a Wait node set to **On Form Submitted**.

:::checklist
- I've built at least one recipe end to end
- It uses Remove Duplicates or a data table so it never repeats work
- It has my error workflow attached
- I tested it with **Execute workflow** before publishing
:::

