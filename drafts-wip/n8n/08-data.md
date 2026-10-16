# How Data Flows: Items, JSON and Binary

Every confusing moment in n8n comes down to one question: *what data does this node actually have?* This chapter gives you a clear picture of how n8n packages data, how it moves between nodes, how files travel alongside it, and how to inspect it at every step.

:::summary In this chapter
- JSON in five minutes
- The shape of n8n data: a list of items, each with `json` and `binary`
- How nodes process many items
- Files (binary data) and the nodes that handle them
- Splitting, combining and linking items
- Pinning and mocking data while you build
:::

## JSON in five minutes

**JSON** (JavaScript Object Notation) is a way of writing structured data as text. It has just a few building blocks:

| Building block | Looks like | Holds |
|---|---|---|
| **String** | `"Sam"` | Text, always in double quotes |
| **Number** | `42` or `3.5` | Numbers, no quotes |
| **Boolean** | `true` / `false` | Yes or no |
| **Null** | `null` | "Nothing here" |
| **Object** | `{ "name": "Sam" }` | Named fields (keys and values) |
| **Array** | `[ "a", "b", "c" ]` | An ordered list, counted from 0 |

Objects and arrays can sit inside each other as deeply as you like:

```json
{
  "name": "Sam Lee",
  "email": "sam@example.com",
  "address": { "city": "Austin", "zip": "78701" },
  "orders": [ 120, 45, 300 ]
}
```

To reach a value you follow the path: `address.city` is `"Austin"`, and `orders[0]` is `120`, the first entry.

## The shape of n8n data

All data passed between nodes is a **list of items**. Each item is an object with a `json` key holding the actual data, and optionally a `binary` key holding files:

```json
[
  { "json": { "name": "Ana", "email": "ana@example.com" } },
  { "json": { "name": "Ben", "email": "ben@example.com" } }
]
```

That's two items. In the editor's Table view you'd see two rows. In JSON view n8n usually hides the `json` wrapper to keep things tidy, but it's always there underneath.

> [!TIP]
> In the Code node you can return plain objects, and n8n adds the `json` wrapper and the surrounding list for you. When something says "item," think "one row" or "one record."

## How nodes process many items

Most nodes run their operation **once per item**. If a Google Sheets node outputs 50 rows and you connect a Slack node, Slack sends 50 messages. Each time, expressions like `{{ $json.name }}` resolve to the current item's value.

A few nodes are exceptions and work on the whole list at once, for example the Code node in **Run Once for All Items** mode, Aggregate, Summarize and Merge. Some database and API operations also run only once regardless of item count. The node's documentation says so when that's the case.

> [!NOTE]
> Sub-nodes attached to AI nodes (chat models, memory, tools) behave differently: an expression in a sub-node always resolves to the **first** item.

## Inspecting data

Every node's input and output panel has three views:

- **Table**: rows and columns, like a spreadsheet. Nested data shows in bold; click to expand.
- **JSON**: the exact structure. Best when you need precise paths.
- **Schema**: a list of field names and types, without values. Best for dragging fields into parameters.

Above the panel, n8n shows how many items there are, for example *3 items*. Check this number whenever results surprise you.

## Files: binary data

**Binary data** is anything that isn't text: a PDF invoice, a photo, a spreadsheet file, an audio clip. n8n keeps files in the item's `binary` section, under a name such as `data` or `attachment_0`:

```json
{
  "json": { "subject": "Your invoice" },
  "binary": {
    "data": {
      "fileName": "invoice-1042.pdf",
      "mimeType": "application/pdf",
      "fileExtension": "pdf"
    }
  }
}
```

The **MIME type** describes the kind of file (`image/png`, `application/pdf`). In the output panel, binary items show a **View** button so you can preview or download them.

| Node | What it does with files |
|---|---|
| **Extract From File** | Reads CSV, XLSX, PDF, HTML, JSON, ICS, RTF or text into JSON fields |
| **Convert to File** | Turns JSON into a CSV, XLSX, HTML, ICS, JSON or text file |
| **Read/Write Files from Disk** | Reads or saves files on a self-hosted server |
| **Compression** | Zips and unzips files |
| **Edit Image** | Resizes, crops and annotates images |
| **HTTP Request** | Downloads files when the response is a file |

When a node like Gmail or Google Drive needs a file, it asks for the **binary property name** (often `data`). That's simply which file slot to use.

> [!TIP]
> Email nodes can download attachments as binary data, usually in numbered slots such as `attachment_0`. Look at the node's output panel to see the exact names, then use that name wherever the next node asks for a binary property.

## Splitting and combining items

Sometimes data arrives in the wrong shape. Two nodes fix most cases:

- **Split Out** turns one item containing a list into many items. One order with five products becomes five items, one per product.
- **Aggregate** does the reverse: many items become one item with a list, handy for building a single summary email.

Others you'll use: **Summarize** (totals and counts, like a pivot table), **Sort**, **Limit** (keep only the first *n*), and **Remove Duplicates**.

:::steps Turn one list into many items
1. **Start with one item** that has an `orders` array (pin some sample data as described below).
2. **Add Split Out.** Set **Fields To Split Out** to `orders`.
3. **Execute the step.** The output now shows one item per order, ready for per-order processing.
:::

## Item linking

n8n remembers which input item produced each output item. This **item linking** (also called *paired items*) is what lets `{{ $('Get Customer').item.json.name }}` find the right customer for the current order, even several nodes later. You rarely need to think about it. If you see an error about paired items, it usually means a Code node changed the number of items; Chapter 10 explains how to fix that.

## Pinning and mocking data

**Pinning** freezes a node's output so later runs reuse it instead of calling the real service. Open a node after it has run and click the **pin** icon in the output panel, or select the node and press <kbd>P</kbd>.

You can also **mock** data: click the edit (pencil) icon on an output panel and type or paste your own JSON. This is perfect for building a workflow before the real data source exists.

> [!IMPORTANT]
> Pinned data is for building only. Production executions ignore pins and always fetch fresh data, so a published workflow behaves correctly even if you forget to unpin.

:::checklist
- I can read a JSON object and follow a path like `address.city`
- I know n8n data is a list of items, each with `json` and maybe `binary`
- I check the item count when results surprise me
- I know Split Out and Aggregate change the number of items
- I can pin and mock data while building
:::

