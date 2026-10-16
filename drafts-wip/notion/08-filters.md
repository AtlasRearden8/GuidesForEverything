# Filters, Sorts, and Groups

A database with fifty items is useful. A database that shows you *just the five you need right now* is wonderful. Filters, sorts, and groups do that, and each view keeps its own.

:::summary In this chapter
- Simple filters, and advanced filters with AND and OR
- Saving filters for everyone or just for you
- Sorting by one or several properties
- Grouping and sub-grouping
- Searching inside a database
:::

## Filters

A **filter** shows only the items that match a rule, such as *Status is not Done*.

:::steps Add a filter
1. **Open the settings menu** (the slider icon) at the top of the database.
2. **Choose Filter** under View settings.
3. **Pick a property**, such as Status.
4. **Set the rule**, such as *is not* › *Done*.
5. **Choose Save for everyone** if everyone should see the filter in this view. Leave it unselected to keep the filter just for you.
:::

The rules you can choose depend on the property type:

| Property | Example rules |
|---|---|
| Text | contains, does not contain, starts with, is empty |
| Number | =, ≠, >, <, is empty |
| Select / Status | is, is not, is empty |
| Multi-select | contains, does not contain |
| Date | is today, is before, is within *next week*, is relative to today |
| Person | contains *Me*, is empty |
| Checkbox | is checked, is not checked |

> [!TIP]
> Filters like *Assignee contains Me* and *Due is relative to today* adjust automatically for whoever is looking and whatever day it is. Use them to build views that never need updating.

### Advanced filters

An **advanced filter** combines rules with **AND** (all must be true) and **OR** (any can be true), in groups nested up to three layers deep.

:::steps Build an advanced filter
1. **Open the settings menu › Filter › Add advanced filter.**
2. **Add your first rule**, such as *Status is not Done*.
3. **Add a second rule** and choose **And** or **Or** between them.
4. **Add a filter group** for rules that belong together.
:::

For example, "urgent work that's mine":

```text
Status is not Done
AND ( Priority is High
      OR Due is before Today )
AND Assignee contains Me
```

To delete a filter, open it and choose **••• › Delete filter**.

## Sorts

A **sort** orders items by a property, ascending or descending.

- **Text** sorts alphabetically; **numbers** numerically; **dates** by time.
- **Select and multi-select** sort in the order of their options. Drag options in the property menu to change that order, such as High, Medium, Low.
- **Multiple sorts:** add several and drag them by **⋮⋮** to set which applies first. For example, sort by Priority, then by Due.

Like filters, sorts can be saved for everyone or kept for you. Remove one with the **X** next to it.

## Groups

**Grouping** splits a view into sections by a property's values, such as one section per Status. Board views are always grouped; other views can be too.

- Settings menu › **Group** › choose a property.
- **Hide** groups you don't need with 👁️, and sort the groups manually or alphabetically.
- **Hide empty groups** to reduce clutter.
- **Sub-group** for a second layer: Status columns with Priority rows, for example.
- **Remove grouping** from the same menu.

## Search inside a database

Databases with at least three items get a 🔍 icon at the top. Click it and type: the view shrinks to matching items as you type.

## Recipes for common views

| View name | Filter | Sort or group |
|---|---|---|
| Today | Due is today | Sort by Priority |
| Overdue | Due is before today AND Status is not Done | Sort by Due |
| This week | Due is within this week | Group by Status |
| Waiting on others | Status is Blocked | Group by Assignee |
| Recently edited | Last edited time is within past week | Sort by Last edited, descending |
| Unread books | Status is Not started | Sort by Created time |

> [!NOTE]
> Filters hide items; they never delete them. If something seems to have vanished, check the view's filters first, or switch to an unfiltered view.

:::checklist
- I added a filter and chose whether to save it for everyone
- I built an advanced filter with AND and OR
- I sorted by two properties
- I grouped a table by Status and hid empty groups
- I made a "My tasks" view filtered to Me
:::

