# Pull Requests and Code Review

A **pull request** (PR) is a proposal: "here are some changes on my branch; please review them and merge them into `main`." It gives everyone one page to see the exact changes, discuss them line by line, watch automated checks, and click merge when it's ready. This is how professional teams, and AI coding agents, work every day.

:::summary In this chapter
- Opening a pull request, including drafts
- A tour of the pull request page
- Reviewing: comments, suggestions, approving, and requesting changes
- Responding to feedback as the author
- Merge options, auto-merge, templates, and code owners
:::

## Open a pull request

:::steps Make a change and propose it
1. **Create and switch to a new branch.**
   ```bash
   git switch -c add-menu-page
   ```
2. **Make your changes, then commit them** as usual (`git add .` and `git commit -m "…"`).
3. **Push the branch to GitHub.**
   ```bash
   git push -u origin add-menu-page
   ```
4. **Open a pull request.** GitHub shows a yellow banner with **Compare & pull request**. Click it. Or run `gh pr create`.
5. **Describe the change.** Write what you did and why. Click **Create pull request**.
6. **Review.** Teammates (or AI reviewers) comment on specific lines, and automated checks run.
7. **Merge.** When everyone's happy, click **Merge pull request**, then **Delete branch**.
8. **Update your computer.**
   ```bash
   git switch main
   git pull
   ```
:::

> [!TIP]
> Even if you work alone, use pull requests for anything an AI agent writes. The PR page gives you a clean, line-by-line view of every change before it reaches `main`.

### The two branches

Every pull request compares a **base** branch (where changes will land, usually `main`) with a **compare** or **head** branch (your work). Check both at the top of the page before creating it.

### Draft pull requests

Not ready for review yet? Click the arrow beside **Create pull request** and choose **Create draft pull request** (or `gh pr create --draft`). Drafts can't be merged and don't ping code owners. When you're done, click **Ready for review**.

### Writing a good description

```markdown
## What
Adds a menu page with prices and allergy notes.

## Why
Customers keep phoning to ask what we sell. Fixes #12.

## How to test
Open /menu.html and check prices match the paper menu.
```

Writing `Fixes #12` (or `closes`, `resolves`) links issue 12, and it closes automatically when the PR merges into the default branch.

## A tour of the pull request page

| Tab | Shows |
|---|---|
| **Conversation** | Description, comments, review decisions, checks, and the merge button |
| **Commits** | Each commit on the branch |
| **Checks** | Results from GitHub Actions and other automated tests |
| **Files changed** | The diff: every changed line, where reviewers comment |

In **Files changed**, tick **Viewed** on each file as you go; it collapses and stays ticked unless the file changes again.

## Reviewing a pull request

:::steps Review someone's changes
1. **Open Files changed** and read through the diff.
2. **Comment on a line.** Hover over a line, click the blue **+**, and type. Drag to select several lines.
3. **Suggest an exact fix.** Click the suggestion icon (or type the block below) to propose replacement text the author can apply with one click.
4. **Click Start a review** rather than single comments, so your comments arrive together.
5. **Finish your review** (top right): choose **Comment**, **Approve**, or **Request changes**, add a summary, and submit.
:::

````markdown
```suggestion
Open 8am to 2pm
```
````

| Decision | Meaning |
|---|---|
| **Comment** | General feedback, no verdict |
| **Approve** | Ready to merge |
| **Request changes** | Must be addressed before merging |

### Kind, useful reviews

- Start with what's good. Then be specific: "this breaks when the cart is empty" beats "this is wrong."
- Ask questions rather than issue orders: "Could we reuse the price function here?"
- Mark small points as optional: "nit: extra space."
- Review promptly. A pull request waiting days goes stale and gathers conflicts.

## Responding as the author

- **Apply suggestions:** click **Commit suggestion**, or **Add suggestion to batch** to apply several in one commit.
- **Push more commits** to the same branch; the pull request updates itself.
- **Reply and resolve:** answer each comment, then click **Resolve conversation**.
- **Re-request review** with the circular arrow next to the reviewer's name.

## Three ways to merge

When you merge a pull request, GitHub offers:

| Option | What happens | Use when |
|---|---|---|
| **Create a merge commit** | Keeps every commit plus a "merge" commit | You want the full history |
| **Squash and merge** | Combines all the PR's commits into one | You want a tidy history (popular) |
| **Rebase and merge** | Replays commits on top of main, no merge commit | Advanced teams with linear history |

Admins can turn options on or off in [[Settings > General]] under **Pull Requests**, and tick **Automatically delete head branches** so merged branches tidy themselves away.

### Auto-merge

If a PR must wait for approvals or checks, click **Enable auto-merge** (`gh pr merge --auto`). GitHub merges it the moment requirements are met. An admin must first tick **Allow auto-merge** in [[Settings > General]].

## Templates and code owners

- **PR template:** a file at `.github/pull_request_template.md` pre-fills every new pull request description. Put the What / Why / How to test headings above in it.
- **CODEOWNERS:** a file at `.github/CODEOWNERS` (or the top level, or `docs/`) names who must review which files. GitHub requests their review automatically.

```text title=.github/CODEOWNERS
# Sam reviews everything by default
*            @sam
# The design team owns the stylesheets
*.css        @bakery-co/design
/docs/       @alex
```

## Reviewing AI-written pull requests

AI agents produce lots of plausible code quickly, so review it as carefully as a stranger's:

:::checklist
- Does the description match what the diff actually does?
- Are there tests, and did the checks pass?
- Any new dependencies, secrets, or files outside the task?
- Anything deleted that shouldn't be?
- Would I understand this code in six months?
:::

```prompt
Review this pull request as a careful senior developer. List real
bugs first, then risky changes, then style nits marked as optional.
For each point, quote the file and line and suggest a fix.
```
