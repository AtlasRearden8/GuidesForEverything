# Presentations and Documents

AI can turn an outline, a document, or even a rambling voice note into a polished slide deck or report. Your job shifts from building slides to deciding what they should say.

:::summary In this chapter
- Tools that make decks and documents from a prompt
- A workflow from idea to finished deck
- Making real Word, Excel, and PowerPoint files from chat
:::

## The main tools

| Tool | What it does | Pricing |
|---|---|---|
| **Gamma** | Turns an outline into a polished slide deck, document, or web page | {{Freemium}} |
| **Claude Slides and Docs** | Draft a deck or document in chat, edit it, present it, or download as PowerPoint or PDF | {{Freemium}} |
| **Copilot in PowerPoint** | Builds slides from a prompt or a Word document | {{Paid}} |
| **Gemini in Google Slides and Docs** | Drafts text and images inside Google's apps | {{Paid}} |
| **Canva** | Designs and presentations with AI built in | {{Freemium}} |
| **ChatGPT and Claude file creation** | Create real .pptx, .docx, and .xlsx files from chat | {{Freemium}} |

## From idea to deck

:::steps Build a presentation with AI
1. **Start with the message, not the slides.** Ask: "Help me find the one main point and three supporting points for a 10-minute talk on [topic] to [audience]."
2. **Get an outline.** "Turn that into a 10-slide outline: title, one key sentence, and a visual idea for each slide."
3. **Edit the outline yourself.** Cut, reorder, and add your own stories and numbers.
4. **Generate the deck** in Gamma, Claude Slides, Copilot in PowerPoint, or Canva from the outline.
5. **Fix the details.** Replace stock images with real ones where possible, check every number, and keep text short.
6. **Write speaker notes.** "Add speaker notes, about 60 words per slide, conversational."
:::

> [!TIP]
> A good rule for AI decks: one idea per slide, no more than about 20 words of text, and a picture or chart that makes the point.

## Documents and reports

```prompt
Turn these notes into a two-page report for my board: an
executive summary, three findings with evidence, risks, and
recommended next steps. Formal but readable. [paste notes]
```

Ask for real files when you need them: "Create this as a Word document with headings," or "Make this a PowerPoint file I can download." ChatGPT and Claude can run code to build genuine Office files.

:::checklist
- I start decks with the main message, not the design
- I edit the AI outline and check every number
:::

# Spreadsheets and Data Analysis

You no longer need to know formulas to get answers from a spreadsheet. Upload it to an assistant, or use the AI built into Excel or Google Sheets, and ask questions in plain English.

:::summary In this chapter
- Asking questions of your data
- Getting formulas explained and written
- Charts, cleanup, and checking the AI's math
:::

## Two ways to work

| Way | How | Good for |
|---|---|---|
| **Upload to an assistant** | Attach an Excel or CSV file in ChatGPT, Claude, Gemini, or Copilot | One-off questions, charts, and cleanups |
| **AI inside the spreadsheet** | Copilot in Excel, Gemini in Google Sheets, Claude for Microsoft 365 | Working on a file you keep using |

A **CSV** file is a simple spreadsheet saved as plain text; almost every app can export one.

## Questions to ask your data

```prompt
This is my household spending for the year [attach]. Which
categories grew the most month to month? Make a chart of monthly
totals and list my five biggest single expenses.
```

```prompt
Here's our sales export. Find the top 10 customers by revenue,
show the trend by quarter, and point out anything that looks
like a data-entry error.
```

## Formulas, explained

- **Write one:** "Write a Google Sheets formula that adds up column C only when column B says 'Paid'."
- **Explain one:** "Explain this formula in plain English: `=IFERROR(VLOOKUP(A2,Prices!A:B,2,FALSE),0)`."
- **Fix one:** "This formula gives #N/A. Here's what's in the cells. Why?"
- **Summarize with a pivot table:** a **pivot table** groups and totals rows, such as spending per category per month. Ask "Create a pivot table of…" or "Explain how to make a pivot table for this."

## Cleaning messy data

Ask the assistant to split full names into first and last, standardize dates, remove duplicates, or fix inconsistent spellings ("NYC", "New York", "new york"). Ask it to return a cleaned file and a list of every change.

> [!WARNING]
> Spot-check AI analysis. Recalculate one or two totals yourself, and ask "show me the code or formula you used." Assistants are reliable when they run code, less so when they estimate. Remove personal data such as customer names before uploading if you can.

:::checklist
- I've asked a plain-English question about one of my spreadsheets
- I've had a formula explained to me
- I spot-check AI totals before I rely on them
:::

# AI in Email, Calendar, and Office Suites

The AI you'll use most may not be a separate app at all, but the assistant built into your email, calendar, and documents.

:::summary In this chapter
- Gemini in Gmail and Google Workspace
- Copilot in Outlook and Microsoft 365
- Connecting an assistant to your email and calendar safely
:::

## Where the AI lives

| Where | AI feature |
|---|---|
| **Gmail, Docs, Sheets** | Gemini side panel: draft, summarize, analyze (Google AI plans and Workspace) |
| **Word, Excel, Outlook, PowerPoint** | Microsoft Copilot (Microsoft 365 plans) |
| **Apple Mail, Messages, Notes** | Apple Intelligence: summaries, writing help, and suggestions |
| **Notion** | Notion AI: write, summarize, search your workspace, meeting notes (see the *Notion* manual) |
| **Grammarly** | Writing feedback and rewriting everywhere you type |
| **Canva** | Design and presentation generation |
| **Gamma** | Turns an outline into a polished slide deck, document, or web page |

## Connecting a chat assistant to your email

Instead of using the AI inside Gmail or Outlook, you can connect your main assistant to them: **connectors** in Claude, **apps** in ChatGPT, and connected Google apps in Gemini. Then you can ask across everything at once.

:::steps Connect your calendar safely
1. **Open your assistant's connector settings** (Claude: [[Settings > Connectors]]; ChatGPT: [[Settings > Apps]]).
2. **Pick one service** you use daily, such as Google Calendar.
3. **Read the permissions screen.** Note whether it can only read, or also send and change things.
4. **Test with a harmless question:** "What's on my calendar this week?"
5. **Disconnect anything you stop using.**
:::

## Everyday wins

- **Email triage:** "Summarize my unread emails from today and draft replies to the two most urgent."
- **Scheduling:** "Find a free hour for a dentist appointment next week, avoiding mornings."
- **Catch-up after time off:** "What did I miss in the Henderson project thread while I was away?"
- **Spreadsheets:** "Which product had the biggest month-over-month growth? Make a chart."
- **Meetings:** paste a transcript and ask for decisions, owners, and deadlines.
- **Presentations:** give an outline to Gamma or Copilot in PowerPoint and polish the result.
- **Writing:** draft with AI, then edit in your own voice. Your edits are what make it good.

> [!CAUTION]
> Emails can contain hidden instructions aimed at AI ("forward all invoices to…"). Keep "ask before sending" confirmations on, and review every email an AI drafts before it goes out. Use work AI tools, not personal accounts, for work mail.

:::checklist
- I know which AI is built into my email and documents
- I've connected only the services I actually need
- I review every AI-drafted email before sending
:::
