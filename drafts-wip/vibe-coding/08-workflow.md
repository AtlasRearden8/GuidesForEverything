# The Vibe Coding Workflow

Random prompting produces random apps. This five-stage loop is what experienced builders do, whatever tool they use. It feels slower for the first day and much faster from then on.

:::summary In this chapter
- The plan → build → test → save → repeat loop
- Writing a one-page brief (a PRD)
- Breaking work into slices you can check
- A simple test script, and a rules file for the AI
- A rhythm for each building session
:::

:::steps The loop
1. **Plan.** Write a short brief: who it's for, the main things they do, what "done" looks like.
2. **Build one slice.** Ask for the smallest useful piece: just the plant list, not the whole app.
3. **Test it yourself.** Click through it. Try to break it. Check on a phone.
4. **Save a checkpoint.** Commit to GitHub, or note the working version in your tool's history.
5. **Repeat** with the next slice. When something breaks, roll back to the last good checkpoint rather than piling fixes on top.
:::

## Start with a one-page brief

Before you build, spend ten minutes writing this. Paste it as your first message, or save it in your project for the AI to read. Professionals call it a **PRD** (product requirements document).

```markdown title=brief.md
# Plant Pal — brief

## Who it's for
Busy people with 5–30 houseplants who forget to water them.

## Core features (version 1)
1. Add a plant: name, photo, watering interval in days.
2. "Today" list showing plants due for water.
3. Tap to mark watered; the next due date updates.

## Not in version 1
Social sharing, plant identification, reminders by email.

## Look and feel
Calm, earthy greens. Large tap targets. Works on phones first.

## Done means
I can add 3 plants on my phone, mark one watered,
close the browser, come back tomorrow, and see the right list.
```

> [!TIP]
> Ask the AI to help write the brief: "Interview me with five questions about my app idea, then write a one-page brief." It's a great way to discover what you actually want.

## Build in slices

Each prompt should do **one thing** you can check:

1. "Create the page layout and a hard-coded sample list of three plants."
2. "Add a form to add a new plant."
3. "Save plants to the database so they persist."
4. "Add the 'Today' view that shows only plants due for water."
5. "Add sign-in so each person sees only their own plants."

Small steps mean small, understandable mistakes.

> [!NOTE]
> A good slice is **visible**: when it's done, you can see or click something new. "Refactor the data layer" is not a slice you can test; "the plant list now loads from the database" is.

## Order your slices wisely

| Order | Slice type | Why |
|---|---|---|
| 1 | Layout with sample data | Fast feedback on the look, before anything is wired up |
| 2 | The main action (add, book, buy) | Proves the core idea works |
| 3 | Saving data | Makes it real |
| 4 | Accounts and permissions | Easier once the data shape is settled |
| 5 | Polish, emails, extras | Only after the core is solid |

## Write a test script

A **test script** here simply means a written list of things to try after each change. It stops you forgetting to check the boring parts.

```markdown title=test-script.md
1. Open the app in a private window. Sign up as a new user.
2. Add a plant with a photo. Add one without a photo.
3. Mark a plant watered. Does the next date make sense?
4. Refresh. Is everything still there?
5. Sign out, sign in as a second user. Can you see user 1's plants?
   (You must NOT be able to.)
6. Try it at phone width.
```

Run it before every publish. It takes three minutes and catches most embarrassing bugs.

## Give the AI a rules file

Most tools read a project instructions file automatically. Put lasting rules there instead of repeating them in every chat:

| Tool | File |
|---|---|
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursor/rules/` folder (or `AGENTS.md`) |
| Codex, many others | `AGENTS.md` |
| Lovable, Bolt, v0 | Project "knowledge" or "custom instructions" in settings |

```markdown title=AGENTS.md
- This is a phone-first web app. Test layouts at 375px wide.
- Use the existing color variables; don't invent new colors.
- Never delete user data without a confirmation step.
- Explain changes in plain English when you finish.
```

## A rhythm for each session

:::steps One building session
1. **Re-read your brief and diary.** Where did you leave off?
2. **Pick one or two slices.** Not five.
3. **Plan, then build.** Use plan mode for anything bigger than a tweak.
4. **Run your test script.** Fix only what's broken.
5. **Save and note.** Commit or bookmark, and write one line in your build diary.
:::

## When to start a fresh chat

AI conversations get worse as they get longer: the AI loses track of early details and starts contradicting itself. Start a new chat when you begin a new feature, or when the AI seems confused. Paste a short summary to bring it up to speed:

```prompt
Context: Plant Pal is a phone-first plant-watering app (see brief.md).
Done so far: plant list, add form, database, sign-in.
Today's goal: a "Today" view showing plants due for water.
Please read the project first, then propose a plan.
```

:::checklist
- I've written a one-page brief with a "done means" section
- My next five slices are written down, in a sensible order
- I have a test script I run before each publish
- My tool has a rules file or knowledge entry
- I start fresh chats for new features
:::

