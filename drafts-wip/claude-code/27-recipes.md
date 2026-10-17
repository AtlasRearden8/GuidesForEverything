# Project Recipes

These recipes walk through real jobs from start to finish. Each lists what you need, the steps, prompts to paste, and how to know you're done. Adapt the names to your own project.

:::summary In this chapter
- Fourteen complete recipes, from fixing a bug to automating pull request reviews
- The commands and habits from earlier chapters, used together
:::

## Recipe 1: Fix a bug from an error message

:::steps Fix a bug
1. **Commit first** so you can always get back: `! git status`, then "commit everything with a clear message."
2. **Paste the full error.**
   ```prompt
   When I click "Checkout" I get this error: [paste the whole error].
   Find the root cause. Write a failing test that shows the bug
   before you fix it.
   ```
3. **Let Claude fix it and run the test again.** Ask to see the passing output.
4. **Review** with `/diff`, then `/code-review`.
5. **Commit** with a message that describes the bug.
:::

**Done when:** the new test passes and the error no longer appears.

## Recipe 2: Build a small website from scratch

:::steps Build a site
1. **Make a folder and start:** `mkdir ~/portfolio && cd ~/portfolio && claude`.
2. **Plan first.** Press <kbd>Shift</kbd> + <kbd>Tab</kbd> into plan mode:
   ```prompt
   Plan a three-page portfolio site (Home, Projects, Contact) in plain
   HTML and CSS. Mobile-friendly, calm colors, no frameworks.
   ```
3. **Approve the plan** and let Claude build it.
4. **Check it in a browser:** "open the site in my browser."
5. **Refine** with small requests: "make the headings larger," "add my three projects with placeholders."
6. **Write a `CLAUDE.md`** with `/init` so future sessions know the style.
:::

## Recipe 3: Write tests for existing code

```prompt
Find the functions in src/cart.js that have no tests. Write tests
for them, covering normal cases and edge cases like an empty cart
and a negative quantity. Run the tests and show me the results.
```

If tests fail, ask: "Is the test wrong or the code wrong? Explain before changing anything." Finish with `/simplify` to tidy the new test code.

## Recipe 4: Refactor safely

:::steps Refactor
1. **Make sure tests exist and pass.** If not, do Recipe 3 first.
2. **Plan in plan mode.**
   ```prompt
   checkout.js is 900 lines. Plan how to split it into smaller files
   without changing behavior. List each new file and what moves there.
   ```
3. **Approve, then build in small steps:** "do step 1 only, then run the tests."
4. **Repeat** step by step, committing after each passing step.
5. **Run `/code-review`** at the end.
:::

## Recipe 5: Review a pull request

```text
/code-review 1234
```

Or, for a conversation about it: "Check out PR 1234, explain what it changes in plain English, and list anything risky." Add `--comment` to post the findings on GitHub, or use `/code-review ultra 1234` for a deep cloud review of an important change.

## Recipe 6: Understand a project you've never seen

```prompt
Give me a tour of this project for a beginner: what it does, the
main folders, how to run it, and where a change to the login page
would go. Use a subagent to explore so our conversation stays short.
```

Then ask follow-ups, and finish with "write what you learned into CLAUDE.md, keeping it short."

## Recipe 7: Write or update documentation

```prompt
Compare README.md with the actual code. List anything that's out of
date or missing, then update the README. Keep it friendly and add a
"Getting started" section with exact commands.
```

## Recipe 8: Automate a chore with a script

```prompt
Write a script that renames every photo in ./photos to its date
taken, like 2026-10-16_001.jpg. Show me what it would rename first
(a dry run), and only rename after I confirm.
```

> [!TIP]
> Always ask for a **dry run** first for anything that renames, moves, or deletes files. Shell-command changes aren't covered by checkpoints.

## Recipe 9: Clean up a spreadsheet (CSV)

```prompt
customers.csv has duplicate rows, inconsistent phone formats, and
blank emails. Write a cleaned copy to customers-clean.csv (never
overwrite the original) and give me a summary of what changed.
```

## Recipe 10: Add a feature with an interview and a spec

:::steps Spec-first feature
1. **Ask Claude to interview you** (Chapter 5, Pattern 4) and write `SPEC.md`.
2. **Read and edit `SPEC.md`** yourself.
3. **`/clear`**, then: "Implement SPEC.md. Run the tests after each part."
4. **Set a finish line:** `/goal every item in SPEC.md works and all tests pass`.
5. **Review and commit.**
:::

## Recipe 11: Make a team command

:::steps Create /release-notes-draft
1. **Create the skill folder** in the project: `.claude/skills/release-notes-draft/`.
2. **Write `SKILL.md`:**
   ```markdown title=.claude/skills/release-notes-draft/SKILL.md
   ---
   description: Draft release notes from commits since the last tag
   disable-model-invocation: true
   ---

   !`git log $(git describe --tags --abbrev=0)..HEAD --oneline`

   Turn these commits into release notes for customers, grouped
   into New, Improved, and Fixed. Plain language, no commit hashes.
   ```
3. **Commit it** so teammates get `/release-notes-draft` too.
:::

## Recipe 12: Set up automatic pull request help on GitHub

Run `/install-github-app` in the repository (Chapter 24), merge the pull request it opens, then comment `@claude review this PR for bugs` on any pull request.

## Recipe 13: Make the same change across many files

```text
/batch replace the old logger with the new logger in every file under src/
```

Claude plans the work, splits it into independent pieces, and, after you approve, runs them in parallel worktrees. Check the plan carefully; this uses more usage than a single session.

## Recipe 14: Watch a slow job

```text
/loop 5m check whether the deploy finished and tell me what happened
```

Or, while your CI runs: `/loop check whether CI passed and fix anything that failed`. Press <kbd>Esc</kbd> to stop a self-paced loop.

:::checklist
- I commit before starting any recipe
- I ask for a check (tests, dry run, screenshot) in every recipe
- I review with `/diff` or `/code-review` before committing
:::

# Security and Privacy

Claude Code is powerful because it can act on your computer. This chapter explains how your data is handled and how to keep yourself safe.

:::summary In this chapter
- How Anthropic uses and keeps your data
- Prompt injection and the built-in safeguards
- Protecting secrets
- A security checklist
:::

## Your data

| Account type | Training on your data | How long it's kept |
|---|---|---|
| Free, Pro, Max (consumer) | Only if you allow it in your privacy settings | 5 years if you allow training; 30 days if not |
| Team, Enterprise, API (commercial) | Not used for training unless your organization opts in | 30 days by default |

- Change consumer privacy settings at any time at claude.ai/settings/data-privacy-controls, or with `/privacy-settings`.
- Claude Code also keeps transcripts **on your computer** in `~/.claude/projects/` for 30 days by default, so you can resume sessions. They're plain text: treat that folder as private.
- Bug reports sent with `/bug` or `/feedback` that include your conversation are kept for five years.

## Prompt injection

A **prompt injection** is text hidden in a web page, file, issue, or tool result that tries to trick Claude into doing something you didn't ask for. Claude Code's defenses include:

- **Permission prompts** for edits, commands, and network requests in Manual mode.
- **Network commands** such as `curl` and `wget` aren't auto-approved by default.
- **Web pages are summarized** by a separate model call before Claude sees them.
- **Folder trust:** Claude Code asks before working in a folder you haven't trusted, and asks separately before using MCP servers listed in a project's `.mcp.json`.
- **Commands it can't fully understand** require approval.
- **Credentials** are stored in the macOS Keychain, or in a file only your user can read.

> [!WARNING]
> No system is immune. Review commands before approving them, don't pipe untrusted content straight into Claude, and use a virtual machine or container for anything risky.

## Protecting secrets

- **Deny reads of secret files:**
  ```json title=.claude/settings.json
  {
    "permissions": {
      "deny": ["Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)"]
    }
  }
  ```
- **Never paste API keys into chat.** If you do, rotate (replace) the key.
- **Keep tokens out of committed files:** use `${VAR}` in `.mcp.json` and GitHub secrets in workflows.
- **Check exports and bug reports** before sharing them.

## Trusting other people's projects

When you open a project someone else wrote, its `.claude/settings.json` hooks, `.mcp.json` servers, and skills can run code. Read them before choosing **Yes** at the trust prompt. Remember that `claude -p` shows no trust prompt at all.

## Extra steps for teams

- Share safe defaults in a committed `.claude/settings.json`: deny rules for secrets, ask rules for `git push`.
- Ask administrators about **managed settings**, which can enforce rules nobody can override.
- Review changes to `.claude/`, `.mcp.json`, and workflow files in pull requests as carefully as code.
- Report suspected security issues in Claude Code through Anthropic's official channels, not in public issues.

:::checklist
- I know my plan's data training and retention rules
- My secret files are covered by deny rules
- I read hooks, MCP servers, and skills before trusting a stranger's project
:::
