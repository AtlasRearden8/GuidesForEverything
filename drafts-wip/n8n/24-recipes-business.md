# Recipes: Business Workflows

These recipes handle the admin that eats into a small business's week: capturing leads, enriching them, processing invoices, keeping tools in sync and watching the web for changes.

:::summary In this chapter
- Recipe 5: form to CRM
- Recipe 6: lead enrichment
- Recipe 7: invoice processing with AI
- Recipe 8: Notion sync
- Recipe 9: web page change monitor
:::

## Recipe 5: form to CRM

**Goal:** a contact form that adds the person to your CRM, emails them a welcome, and pings you.

**Nodes:** n8n Form Trigger, Edit Fields, CRM node (HubSpot, Pipedrive, Airtable or a Google Sheet), Gmail, Slack or Telegram.

:::steps Build it
1. **n8n Form Trigger:** title "Get in touch"; fields Name (Text, required), Email (Email, required), Company (Text), Message (Textarea). **Respond When:** Form Is Submitted.
2. **Edit Fields:** tidy the data: `name` = `{{ $json.Name.trim().toTitleCase() }}`, `email` = `{{ $json.Email.trim().toLowerCase() }}`.
3. **CRM node:** choose the create-or-update contact operation (for example HubSpot **Contact › Create or Update**), mapping email, name and company. "Create or update" avoids duplicates when someone submits twice.
4. **Gmail:** send a short welcome to `{{ $json.email }}`.
5. **Slack:** post `New lead: {{ $json.name }} ({{ $json.company }})` to `#sales`.
:::

> [!TIP]
> Spam filler? Add a **Hidden Field** to the form and drop any submission where it's filled in (bots fill everything), or run the message through a Text Classifier and discard `spam`.

## Recipe 6: lead enrichment

**Goal:** when a new lead arrives, look up their company's website, summarise what it does, and score the lead.

**Nodes:** a trigger (Recipe 5's form, a CRM trigger, or a Sheets trigger), HTTP Request, HTML, Information Extractor, CRM update.

:::steps Build it
1. **Get the domain:** `{{ $json.email.extractDomain() }}`. Skip free mail domains with a Filter (`gmail.com`, `outlook.com`…).
2. **HTTP Request:** GET `https://{{ $json.domain }}`, response format **Text**. Turn on **Never Error** and Retry On Fail: some sites are slow.
3. **HTML › Extract HTML Content:** pull the `title`, the meta description and the `body` text.
4. **Information Extractor:** attributes `industry`, `company_size_guess`, `one_line_summary`, `fit_score` (1–5, with your ideal-customer description in the system prompt).
5. **CRM update:** write the fields back to the contact; if `fit_score` ≥ 4, also alert sales.
:::

**Extend it:** use a dedicated enrichment API through HTTP Request; route low-fit leads to a nurture email sequence.

## Recipe 7: invoice processing with AI

**Goal:** invoices emailed to `invoices@` are read automatically, logged in a sheet, and filed in Drive.

**Nodes:** Gmail Trigger (or IMAP Email trigger), Filter, Extract From File, Information Extractor, Google Drive, Google Sheets, If.

:::steps Build it
1. **Gmail Trigger:** poll every few minutes for messages to your invoices address or with an "Invoices" label, downloading attachments.
2. **Filter:** keep items whose attachment is a PDF (`mimeType` is `application/pdf`).
3. **Extract From File › Extract From PDF:** point it at the attachment's binary property. Out comes the invoice's text.
4. **Information Extractor:** from the text, extract `supplier`, `invoice_number`, `invoice_date`, `due_date`, `currency`, `total` (number).
5. **Google Drive › Upload:** save the PDF into "Invoices/2026" named `{{ $json.supplier }} {{ $json.invoice_number }}.pdf`.
6. **Google Sheets › Append Row:** log the fields with the Drive link.
7. **If:** total above your approval limit → Slack your manager with the details.
:::

> [!CAUTION]
> AI extraction is very good but not perfect. Keep a person in the loop for payments: have the workflow *log and alert*, not pay. Add a "checked" column you tick by hand.

> [!TIP]
> Scanned paper invoices have no text layer, so Extract From PDF returns nothing. Send the file to a vision-capable model or an OCR service instead.

## Recipe 8: Notion sync

**Goal:** keep a Notion database of tasks in step with a Google Sheet (or another tool), so teammates can work wherever they like.

**Nodes:** Schedule Trigger, Notion (get database pages), Google Sheets (get rows), Compare Datasets, Notion create/update, Sheets update.

:::steps Build a one-way sync (Sheet → Notion)
1. **Connect Notion.** Create an internal integration in Notion's developer settings, copy its secret into an n8n Notion credential, and **share your database with the integration** from the database's connections menu.
2. **Schedule Trigger:** every 30 minutes.
3. **Google Sheets:** get all rows (each needs a stable `task_id`).
4. **Notion › Database Page › Get Many:** get all pages from the database, with their `task_id` property.
5. **Compare Datasets:** compare on `task_id`. Its outputs separate items only in the sheet (new), in both but different (changed), and only in Notion.
6. **Notion › Create:** for new items. **Notion › Update:** for changed items, using the page ID from the Notion side.
:::

> [!NOTE]
> Two-way sync is much harder: you need to know which side changed most recently, and avoid ping-ponging. Start one-way; add the other direction only if you truly need it, using a "last edited" timestamp on both sides.

## Recipe 9: web page change monitor

**Goal:** check a page (a price, a job board, a "sold out" notice) every hour and alert you when it changes.

**Nodes:** Schedule Trigger, HTTP Request, HTML, Data Table, If, Telegram or email.

:::steps Build it
1. **Schedule Trigger:** every hour.
2. **HTTP Request:** GET the page, response format **Text**.
3. **HTML › Extract HTML Content:** extract just the part you care about with a **CSS selector** (right-click the element in your browser, **Inspect**, then copy the selector), into a field `value`.
4. **Data Table › Get:** read the last saved value for this URL.
5. **If:** new `value` is not equal to the saved one.
6. **True branch:** send `Changed: {{ $json.value }}` by Telegram, then **Data Table › Upsert** the new value.
:::

> [!WARNING]
> Respect websites: check politely (hourly, not every minute), follow their terms, and prefer an official API or RSS feed if one exists. Pages that build their content with JavaScript may need a scraping service rather than a plain HTTP request.

:::checklist
- Lead data is cleaned before it reaches my CRM
- AI-extracted invoice data is checked by a person before payment
- My Notion integration has access to the database
- My monitor checks politely and stores the last value
:::

