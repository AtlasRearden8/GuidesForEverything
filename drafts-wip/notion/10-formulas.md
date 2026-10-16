# Formulas

A **formula** property calculates a value from other properties, like a spreadsheet formula that runs on every row. Notion's current formula language (often called **Formula 2.0**) can work with text, numbers, dates, people, and even related pages. This chapter starts gently and ends with more than twenty recipes you can copy.

:::summary In this chapter
- How the formula editor works
- The building blocks: properties, operators, functions
- Data types, and why they matter
- 22 worked examples to copy
- Getting Notion AI to write formulas, and fixing errors
:::

## Create a formula

:::steps Add a formula property
1. **Open the settings menu › Edit properties › New property.**
2. **Choose Formula** and give it a name.
3. **Click Edit formula.** The formula editor opens.
4. **Type your formula** in the box at the top.
5. **Check the preview.** If you opened the editor from a row, you'll see that row's result live.
:::

The editor has three parts: the formula box at the top, a list of properties and functions on the left, and an explanation with examples on the right for whatever you hover over. If something's missing, the editor tells you what it expects.

## The building blocks

| Part | Examples | What it does |
|---|---|---|
| **Properties** | `prop("Due")`, `prop("Price")` | Reads a property's value |
| **Maths operators** | `+ - * / % ^` | Arithmetic (`+` also joins text) |
| **Comparisons** | `== != > >= < <=` | True or false checks |
| **Logic** | `and`, `or`, `not` | Combine checks |
| **Ternary** | `X ? Y : Z` | Short for `if(X, Y, Z)` |
| **Functions** | `if()`, `round()`, `dateAdd()` | Do a job and return a result |

When you type `prop("Due")`, the editor shows it as a neat property chip. You can also click properties in the left panel instead of typing.

**Dot notation** lets you chain functions: `prop("Name").length()` is the same as `length(prop("Name"))`.

## Data types

Every value has a **type**, and functions expect particular types:

| Type | Example | Comes from |
|---|---|---|
| Text | `"Hello"` | Text, Select, Status, URL |
| Number | `42` | Number, rollups |
| Boolean | `true` / `false` | Checkbox, comparisons |
| Date | `@October 16, 2026` | Date, Created time |
| Person | A workspace member | Person, Created by |
| List | `[1, 2, 3]` | Multi-select, Relation |
| Page | A related page | Relation |

Use `format()` to turn anything into text, and `toNumber()` to turn text into a number.

## Useful functions at a glance

:::compact
| Group | Functions |
|---|---|
| Logic | `if`, `ifs`, `empty`, `and`, `or`, `not` |
| Text | `length`, `contains`, `substring`, `replace`, `replaceAll`, `lower`, `upper`, `trim`, `split`, `join`, `repeat`, `style`, `link`, `format` |
| Numbers | `round`, `ceil`, `floor`, `abs`, `min`, `max`, `sum`, `mean`, `median`, `sqrt`, `pow`, `mod`, `formatNumber` |
| Dates | `now`, `today`, `dateAdd`, `dateSubtract`, `dateBetween`, `dateStart`, `dateEnd`, `formatDate`, `parseDate`, `week`, `month`, `year`, `day` |
| Lists | `at`, `first`, `last`, `filter`, `map`, `find`, `some`, `every`, `includes`, `unique`, `sort`, `reverse`, `slice`, `concat`, `flat` |
| People | `name`, `email` |
| Variables | `let`, `lets` |
:::

In list functions, the word `current` means "the item being looked at right now".

## Worked examples: dates

**1. Days until due.** Negative numbers mean overdue.

```text title=Days left
dateBetween(prop("Due"), today(), "days")
```

**2. Overdue flag.**

```text title=Overdue
if(prop("Due") < now() and prop("Status") != "Done", "⚠️ Overdue", "")
```

**3. Overdue, in bold red.** `style()` takes styles (`"b"` bold, `"i"` italic, `"u"` underline) and colors.

```text title=Overdue (styled)
if(and(now() > prop("Due"), prop("Status") != "Done"),
  style("Overdue", "red", "b"), "")
```

**4. Due date two weeks after the start.**

```text title=Due
dateAdd(prop("Start"), 2, "weeks")
```

**5. A friendly date.**

```text title=Nice date
formatDate(prop("Date"), "MMMM D, YYYY")
```

**6. Week label**, handy for grouping journal entries.

```text title=Week
"Week " + format(week(prop("Date")))
```

**7. Age in years.**

```text title=Age
dateBetween(today(), prop("Birthday"), "years")
```

**8. Length of a date range in days.**

```text title=Trip length
dateBetween(dateEnd(prop("Dates")), dateStart(prop("Dates")), "days")
```

## Worked examples: text and numbers

**9. Full name.**

```text title=Full name
prop("First name") + " " + prop("Last name")
```

**10. Price with 20% tax**, rounded to two decimals.

```text title=Gross
round(prop("Price") * 1.2, 2)
```

**11. Show money nicely.**

```text title=Revenue label
"Revenue: " + formatNumber(prop("Revenue"), "usd", 0)
```

**12. Reading progress as a percentage.**

```text title=Progress
format(round(prop("Pages read") / prop("Total pages") * 100)) + "%"
```

**13. A text progress bar** from a 0–1 number.

```text title=Bar
repeat("●", round(prop("Progress") * 10)) +
  repeat("○", 10 - round(prop("Progress") * 10))
```

**14. Priority score with `ifs`** (cleaner than nested ifs).

```text title=Score
ifs(prop("Priority") == "High", 3,
    prop("Priority") == "Medium", 2,
    1)
```

**15. RICE prioritization** (Reach × Impact × Confidence ÷ Effort).

```text title=RICE
prop("Reach") * prop("Impact") * prop("Confidence") / prop("Effort")
```

**16. A clickable link.**

```text title=Open site
link("Open site", prop("URL"))
```

**17. Turn a title into a web-friendly slug.**

```text title=Slug
lower(replaceAll(trim(prop("Name")), " ", "-"))
```

## Worked examples: lists, people, and relations

**18. Has the "Urgent" tag?**

```text title=Urgent?
prop("Tags").includes("Urgent")
```

**19. Names of everyone assigned.**

```text title=Assignees
prop("Assignee").map(current.name()).join(", ")
```

**20. Count related tasks.**

```text title=Task count
prop("Tasks").length()
```

**21. Count open tasks** using `filter` and `current`.

```text title=Open tasks
prop("Tasks").filter(current.prop("Status") != "Done").length()
```

**22. Percent of tasks done, safe when there are none.** `lets` names values so the formula reads like a sentence.

```text title=% done
lets(
  total, prop("Tasks").length(),
  done, prop("Tasks").filter(current.prop("Status") == "Done").length(),
  if(total == 0, "–", format(round(done / total * 100)) + "%")
)
```

**23. Total spent from a related Expenses database.**

```text title=Spent
sum(prop("Expenses").map(current.prop("Amount")))
```

> [!TIP]
> Long formulas can span several lines in the editor. Line breaks and indentation make them much easier to read.

## Let Notion AI write it

On Business and Enterprise plans, the formula editor has a Notion AI field. Describe what you want in plain English:

```prompt
Return ⚠️ if the due date has passed and the status isn't Done.
```

```prompt
Turn the title property into a URL slug.
```

```prompt
Fix the errors in this formula, and make it handle empty dates.
```

Notion AI can also explain a formula ("What does this formula do?"). It can't do loops or random numbers, because Notion formulas don't have them.

## Where else formulas work

Besides formula properties, you can use formulas inside **button actions**, **database button actions**, and **database automation actions** (Chapter 11), for example to set a date to "today plus 3 days".

## Fixing common formula errors

| Message or symptom | Likely cause | Fix |
|---|---|---|
| Type mismatch | Joining a number to text | Wrap the number in `format()` |
| Property not found | Property renamed or deleted | Re-insert it from the left panel |
| Result is blank | An input is empty | Check with `empty()` first |
| Division error or odd result | Dividing by zero | Guard with `if(x == 0, …)` |
| Wrong date difference sign | Dates in the wrong order | Swap the two dates in `dateBetween` |
| Text comparison fails | Typo or different capitals | Copy the option name exactly |

:::checklist
- I created a formula property and saw the live preview
- I copied a date formula and a text formula
- I used `if` or `ifs` to show a label
- I used `filter` and `current` on a relation
- I know where to ask AI for help with formulas
:::

