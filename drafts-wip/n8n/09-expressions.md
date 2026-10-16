# Expressions: Little Formulas, Big Power

An **expression** is a small formula inside a node's parameter that fills in a value when the workflow runs. "Send this email to *whoever filled in the form*." "Name the file *today's date*." If you've used formulas in a spreadsheet, you already understand the idea. This chapter teaches you to read and write them with confidence.

:::summary In this chapter
- How to switch a field to expression mode and map by dragging
- Reaching data from the current item and from earlier nodes
- Built-in variables: dates, workflow and execution details
- Handy functions for text, numbers and lists
- Working with dates using Luxon
- Getting help from AI and fixing common errors
:::

## Mapping by dragging

The easiest way to use data from an earlier node: open a node, find the field in the **Input** panel, and **drag it** into a parameter. n8n writes the expression for you.

## Expression mode

Every parameter can be **Fixed** or **Expression**. Click **Expression** above a field (or type <kbd>=</kbd> in an empty one) and the field turns into an editor that shows a live **preview** of the result underneath. Anything inside `{{ }}` is calculated; anything outside is plain text:

```text
Hello {{ $json.firstName }}, your order #{{ $json.orderId }} has shipped!
```

> [!TIP]
> Watch the preview as you type. If it shows the value you expect for the first item, you're nearly always right. If it says `undefined`, the path is wrong: check spelling and capitals.

## Expressions cheat sheet

Expressions live inside double curly braces and can contain small bits of JavaScript.

| Expression | Gives you |
|---|---|
| `{{ $json.email }}` | The `email` field of the current item |
| `{{ $json.name.toUpperCase() }}` | The name in capital letters |
| `{{ $('Google Sheets').item.json.total }}` | A field from a specific earlier node, by name |
| `{{ $now.toFormat('yyyy-MM-dd') }}` | Today's date, like `2026-10-15` |
| `{{ $today.minus(7, 'days') }}` | The date one week ago |
| `{{ $json.price * 1.08 }}` | Arithmetic: price plus 8% tax |
| `{{ $json.status === 'paid' ? 'Thanks!' : 'Reminder' }}` | Choose text based on a condition |

> [!TIP]
> Not sure how to write an expression? Click **Ask AI** or the AI assistant in the expression editor and describe what you want: "the first name from the full_name field."

## Reaching your data

| Write this | To get |
|---|---|
| `$json.field` | A field of the current item |
| `$json.address.city` | A nested field |
| `$json.tags[0]` | The first entry of a list |
| `$json['First Name']` | A field whose name has spaces |
| `$('Node Name').item.json.field` | The matching item from an earlier node |
| `$('Node Name').first().json.field` | The first item from an earlier node |
| `$('Node Name').all()` | Every item from an earlier node, as a list |
| `$input.first().json.field` | The first item arriving at this node |
| `$input.all().length` | How many items arrived |

`.item` is the clever one: it follows item linking (Chapter 8) to find the item that belongs to the one you're processing now. Use `.first()` when an earlier node produced a single item, such as a settings lookup.

## Built-in variables

| Variable | Gives you |
|---|---|
| `$now` | The current date and time |
| `$today` | Today at midnight |
| `$workflow.name` / `$workflow.id` | This workflow's name and ID |
| `$workflow.active` | Whether it's published |
| `$execution.id` | This run's ID, handy in error messages |
| `$execution.mode` | `test` (you clicked a button) or `production` |
| `$itemIndex` | The position of the current item, from 0 |
| `$vars.NAME` | A custom variable (paid plans) |

## Helper functions

n8n adds its own conveniences on top of JavaScript:

| Function | Example | Result |
|---|---|---|
| `$if()` | `{{ $if($json.vip, 'Gold', 'Standard') }}` | Picks one of two values |
| `$ifEmpty()` | `{{ $ifEmpty($json.nickname, $json.name) }}` | A fallback when a value is empty |
| `$jmespath()` | `{{ $jmespath($json, 'orders[*].id') }}` | Queries JSON with JMESPath |

## Functions for text, numbers and lists

Add these after a value with a dot. Type a dot in the expression editor to see suggestions.

:::compact
| Function | On | Example | Gives |
|---|---|---|---|
| `.toTitleCase()` | Text | `"ana lópez".toTitleCase()` | `Ana López` |
| `.extractEmail()` | Text | `"Mail: a@b.com".extractEmail()` | `a@b.com` |
| `.extractDomain()` | Text | `"a@shop.com".extractDomain()` | `shop.com` |
| `.removeTags()` | Text | `"<b>Hi</b>".removeTags()` | `Hi` |
| `.removeMarkdown()` | Text | `"**Hi**".removeMarkdown()` | `Hi` |
| `.isEmpty()` | Text, list | `"".isEmpty()` | `true` |
| `.toNumber()` | Text | `"42".toNumber()` | `42` |
| `.urlEncode()` | Text | `"a b".urlEncode()` | `a%20b` |
| `.toDateTime()` | Text | `"2026-10-16".toDateTime()` | A date you can format |
| `.sum()` | List | `[1,2,3].sum()` | `6` |
| `.average()` | List | `[2,4].average()` | `3` |
| `.unique()` | List | `[1,1,2].unique()` | `[1,2]` |
| `.pluck()` | List | `$json.people.pluck('email')` | Just the emails |
| `.first()` / `.last()` | List | `[5,6,7].last()` | `7` |
| `.join()` | List | `['a','b'].join(', ')` | `a, b` |
| `.chunk()` | List | `[1,2,3,4].chunk(2)` | `[[1,2],[3,4]]` |
:::

## Dates and times with Luxon

n8n's `$now` and `$today` are **Luxon** date objects. Luxon is a popular JavaScript date library, and it makes date maths readable:

| Expression | Result (example) |
|---|---|
| `{{ $now.toFormat('d LLLL yyyy') }}` | `16 October 2026` |
| `{{ $now.toFormat('cccc') }}` | `Friday` |
| `{{ $now.toFormat('HH:mm') }}` | `07:00` |
| `{{ $now.plus(1, 'day').toFormat('yyyy-MM-dd') }}` | Tomorrow's date |
| `{{ $today.startOf('month').toISO() }}` | The first of this month |
| `{{ $json.created.toDateTime().toFormat('d LLL') }}` | Format a date from your data |

Common format codes: `yyyy` year, `MM` month number, `LLL` short month name, `LLLL` full month name, `dd` day, `cccc` weekday, `HH` hour (24h), `mm` minutes.

> [!NOTE]
> Dates use the workflow's time zone if one is set in workflow settings, otherwise the instance time zone. If a time is an hour out, that's usually the reason.

## Expressions or nodes?

You can do a lot inside expressions, but long formulas are hard to read. A good rule:

- **Short and specific** (format a name, pick a field): use an expression.
- **Reshaping many fields**: use **Edit Fields (Set)**.
- **Logic across many items** (totals, grouping, complex rules): use **Aggregate**, **Summarize**, or a **Code** node (Chapter 10).

## Worked example: a friendly order summary

Given an item like `{ "firstName": "ana", "items": [ {"price": 12}, {"price": 30} ], "date": "2026-10-16" }`, this expression:

```text
Hi {{ $json.firstName.toTitleCase() }}, your {{ $json.items.length }} items
total ${{ $json.items.pluck('price').sum() }}, ordered on
{{ $json.date.toDateTime().toFormat('d LLLL') }}.
```

produces *Hi Ana, your 2 items total $42, ordered on 16 October.*

```prompt
I'm writing an n8n expression. My item looks like this: [paste the JSON
from the input panel]. I want [describe the result, e.g. "the customer's
first name in capitals, or 'friend' if it's empty"]. Give me the
expression inside {{ }} and explain each part.
```

## Common expression errors

| Message or symptom | Cause | Fix |
|---|---|---|
| Preview shows `undefined` | Wrong path or capitalisation | Drag the field in instead of typing |
| Preview reports invalid syntax | A missing bracket or quote | Count your `(`, `)`, `'` and `}}` |
| "Can't get data for expression" | The referenced node hasn't run yet | Execute the earlier node first |
| Paired item error | Item links broken by a Code node | Use `.first()` or fix the Code node (Chapter 10) |
| Shows `[object Object]` | You inserted a whole object into text | Pick a field, or wrap it in `JSON.stringify()` |

:::checklist
- I can switch a field to expression mode and read the preview
- I can reach a field from an earlier node with `$('Node Name')`
- I can format today's date with Luxon
- I know a few text and list functions
- I know when to use a node instead of a long expression
:::

