# The Code Node: JavaScript and Python

Most workflows never need code. But sometimes you need one small calculation that no node offers, or a tricky reshaping of data. The **Code** node lets you write a few lines of JavaScript or Python as a step. You don't need to be a programmer: with the examples here, and an AI assistant to help, a beginner can use it safely.

:::summary In this chapter
- When to reach for code, and when not to
- The two modes: once for all items, or once for each item
- What your code receives and must return
- Five copy-paste JavaScript recipes
- Python in n8n and how it differs
- Limits on Cloud and self-hosted, and getting AI help
:::

## When to use code

| Use a Code node when… | Use other nodes when… |
|---|---|
| A calculation has many steps | You only need to rename or add fields (Edit Fields) |
| You need custom logic across all items | You need to branch (If, Switch) |
| No node does the transformation | A node or expression already does it |
| You're parsing an odd text format | You need HTTP calls or files (HTTP Request, Read/Write Files) |

> [!NOTE]
> The Code node can't make HTTP requests or read files on disk. Use the HTTP Request and Read/Write Files from Disk nodes for those, and pass their results into your code.

## The two modes

| Mode | Runs | You use |
|---|---|---|
| **Run Once for All Items** (default) | One time, with every item | `$input.all()` |
| **Run Once for Each Item** | Once per item | `$json` or `$input.item` |

Choose **Each Item** for simple per-row changes. Choose **All Items** when you need to look across rows: totals, sorting, grouping, or comparing.

## What goes in and what comes out

Your code receives items and must **return** items. Each returned item is an object with a `json` key (n8n will add it if you forget, and wrap a single object in a list for you). This minimal example, in **Run Once for All Items** mode, adds a field to every item:

```javascript title=Add a field to every item
const items = $input.all();

for (const item of items) {
  item.json.fullName = `${item.json.first} ${item.json.last}`;
}

return items;
```

The same thing in **Run Once for Each Item** mode is even shorter:

```javascript title=Per-item version
const j = $input.item.json;
return { json: { ...j, fullName: `${j.first} ${j.last}` } };
```

The `...j` copies all existing fields, then `fullName` is added.

## Five JavaScript recipes

**1. Total an order list** (All Items mode). Returns one item with the sum:

```javascript
const total = $input.all()
  .reduce((sum, item) => sum + Number(item.json.amount || 0), 0);

return [{ json: { total, count: $input.all().length } }];
```

**2. Keep only recent items** (All Items mode). Drops anything older than seven days:

```javascript
const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;

return $input.all().filter(
  (item) => new Date(item.json.date).getTime() >= cutoff
);
```

**3. Group by a field** (All Items mode). Turns orders into one item per customer:

```javascript
const groups = {};
for (const { json } of $input.all()) {
  groups[json.customer] ??= { customer: json.customer, orders: 0 };
  groups[json.customer].orders += 1;
}
return Object.values(groups).map((g) => ({ json: g }));
```

**4. Clean up messy text** (Each Item mode):

```javascript
const raw = $input.item.json.phone || '';
const digits = raw.replace(/\D/g, '');
return { json: { ...$input.item.json, phone: digits } };
```

**5. Build an HTML table for an email** (All Items mode):

```javascript
const rows = $input.all().map(({ json }) =>
  `<tr><td>${json.name}</td><td>${json.status}</td></tr>`
).join('');

return [{ json: { html: `<table>${rows}</table>` } }];
```

> [!TIP]
> Use `console.log(something)` while building. The output appears in your **browser's developer console** (press <kbd>F12</kbd> and choose **Console**), which is handy for peeking inside variables.

## Built-ins you can use in code

Everything from Chapter 9 works in JavaScript code too: `$input`, `$json`, `$('Node Name').all()`, `$now`, `$today`, `$workflow`, `$execution` and `$vars`. Type `$` in the editor to see suggestions.

## Python

Choose **Python** from the language option on the Code node. n8n runs real Python ("native Python") through its **task runners**, separate processes that execute code safely away from the main n8n program. It works a little differently from JavaScript:

- In **Run Once for All Items** mode, your items are in `_items`. In **Run Once for Each Item** mode, the current item is `_item`.
- Use square brackets to reach fields: `item["json"]["name"]`, not `item.json.name`.
- Other n8n built-ins (like `$('Node')`) aren't available in native Python.

```python title=Python, Run Once for All Items
for item in _items:
    name = item["json"].get("name", "")
    item["json"]["name_upper"] = name.upper()

return _items
```

> [!NOTE]
> On n8n Cloud, Python Code nodes can't import any libraries, even from Python's standard library. On self-hosted n8n you can allow specific standard-library and third-party modules through the task runner configuration. The older in-browser Python (Pyodide) was removed in n8n 2.0, so old Python examples using `item.json.field` need updating.

## Libraries in JavaScript

On n8n Cloud, the JavaScript Code node can use two extra modules: Node.js's `crypto` (for hashing and random IDs) and the `moment` date library. Self-hosted users can allow other built-in and npm modules through environment settings (see Chapter 26).

## Keeping items linked

When your code returns the **same number of items in the same order**, n8n keeps item linking intact, and later nodes can still use `$('Earlier Node').item`. When you return fewer or more items (filtering, grouping, splitting), the links may break. If a later node complains about paired items, either reference earlier data with `.first()` or `.all()`, or include the fields you need in your returned items so later nodes don't have to look back.

## Let AI write it

The Code node has AI help built in on n8n Cloud: describe what you want, and it drafts the code. Any chat assistant works too:

```prompt
Write an n8n Code node in JavaScript, mode "Run Once for All Items".
Input items look like this: [paste one item's JSON]. I want the output to
be [describe it]. Return an array of objects with a "json" key. Keep it
short and add a comment on each line explaining what it does.
```

> [!WARNING]
> Read AI-written code before you run it on real data. Test with pinned sample data first, and check the output panel item by item.

## Common Code node errors

| Error | Cause | Fix |
|---|---|---|
| "Code doesn't return items properly" | Returned something that isn't a list of objects | Return `[{ json: {...} }]` or the items list |
| "Cannot read properties of undefined" | A field you used doesn't exist on some item | Use `item.json.x ?? ''` for a default |
| `$input.item` is undefined | Wrong mode | Use `$input.all()` in All Items mode |
| `Cannot find module` | Library not allowed on this instance | Use built-ins, or allow the module (self-hosted) |
| Python `KeyError` | A field is missing | Use `item["json"].get("field")` |

:::checklist
- I know the difference between the two modes
- I can return items in the right shape
- I've tried at least one recipe with pinned data
- I know Python uses `_items` and square brackets
- I check AI-written code before trusting it
:::

