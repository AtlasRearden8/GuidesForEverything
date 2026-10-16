# Issues, Labels and Milestones

GitHub isn't just for code. Its planning tools work for any project, from a website to a wedding. This chapter covers **issues**, the building block of planning on GitHub, plus the labels, milestones, and templates that keep them organized.

:::summary In this chapter
- Writing issues people can act on
- Assignees, labels, milestones, and sub-issues
- Linking issues to pull requests so they close themselves
- Issue templates and forms
- Searching and filtering issues
:::

## Issues

An **issue** is a tracked item: a bug, a task, a question, or an idea. Click the **Issues** tab, then **New issue**. Give it a title and description, and optionally:

- **Assignees**: who's responsible (this can be an AI agent such as Copilot).
- **Labels**: colored tags like `bug`, `design`, or `good first issue`.
- **Milestone**: group issues toward a goal or deadline.
- **Projects**: add it to a planning board (next chapter).

### Writing a good issue

| Part | Example |
|---|---|
| **Title** that says what's wrong | "Checkout total ignores discount codes" |
| **Steps to reproduce** | 1. Add a cake. 2. Enter code SPRING. 3. Look at total. |
| **Expected** | Total drops by 10% |
| **Actual** | Total stays the same |
| **Extras** | Screenshot, browser, device |

For tasks, a short task list in the description works well:

```markdown
- [ ] Take photos of new cakes
- [ ] Write descriptions
- [ ] Add to menu page
```

## Labels

**Labels** are colored tags for sorting. New repositories start with a standard set:

:::compact
| Label | Use for |
|---|---|
| `bug` | Something isn't working |
| `documentation` | Improvements to docs |
| `duplicate` | Already reported elsewhere |
| `enhancement` | A new feature request |
| `good first issue` | Suitable for newcomers |
| `help wanted` | Maintainers would welcome help |
| `invalid` | No longer relevant |
| `question` | Needs more information |
| `wontfix` | Won't be worked on |
:::

Manage them under **Issues**, then **Labels** (create, rename, recolor), or with `gh label create "urgent" --color FF0000`.

## Milestones

A **milestone** groups issues and pull requests toward a goal, like "Website launch" or "Version 2.0," with an optional due date and a progress bar. Create one under **Issues**, then **Milestones**, then **New milestone**, and pick it in an issue's sidebar.

## Sub-issues

Big jobs break down into **sub-issues**: smaller issues nested under a parent, each with its own assignee and status. Open the parent issue and use **Create sub-issue** (or add an existing issue). A parent can hold up to 100 sub-issues, nested up to eight levels deep, and shows a progress count.

## Closing issues automatically

Write one of these keywords plus the issue number in a pull request description or commit message, and the issue closes when the change merges into the default branch:

`close`, `closes`, `closed`, `fix`, `fixes`, `fixed`, `resolve`, `resolves`, `resolved`

For example: `Fixes #12`. In an issue's **Development** sidebar you can also link a pull request or create a branch directly.

When closing by hand, choose a reason: **Close as completed**, or **Close as not planned** for ideas you've decided against.

## Issue templates and forms

Templates give reporters a structure, so you get the information you need. Put them in the `.github/ISSUE_TEMPLATE` folder. An **issue form** is a YAML template with real input boxes:

```yaml title=.github/ISSUE_TEMPLATE/bug.yml
name: Bug Report
description: Tell us about something that's broken.
title: "[Bug]: "
labels: ["bug"]
body:
  - type: textarea
    id: what-happened
    attributes:
      label: What happened?
      description: And what did you expect to happen?
    validations:
      required: true
  - type: input
    id: device
    attributes:
      label: Device and browser
      placeholder: e.g. iPhone 15, Safari
```

Add a `config.yml` in the same folder with `blank_issues_enabled: false` to make everyone use a template.

## Finding issues

Type these into the search box on the Issues tab:

| Filter | Finds |
|---|---|
| `is:open is:issue` | Open issues (the default) |
| `assignee:@me` | Issues assigned to you |
| `author:@me` | Issues you opened |
| `label:bug` | Issues with a label |
| `no:assignee` | Nobody has picked it up |
| `milestone:"Website launch"` | Issues in a milestone |
| `sort:updated-desc` | Most recently active first |

## Notifications and mentions

Type `@username` in any comment to notify that person, or `@org/team` to notify a team. Click the bell icon to see your notifications. **Watch** a repository (top of its page) to follow everything that happens in it, and click **Subscribe** on one issue to follow just that conversation.

```prompt
Here is a messy list of feedback from customers. Turn it into
separate GitHub issues, each with a clear title, steps to reproduce
where relevant, and a suggested label from: bug, enhancement,
documentation, question.
```

:::checklist
- Wrote an issue with a clear title and steps
- Added labels and a milestone
- Broke a big issue into sub-issues
- Closed an issue automatically with `Fixes #` in a pull request
:::
