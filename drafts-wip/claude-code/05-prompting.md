# Talking to Claude Effectively

Claude Code is capable, but it isn't a mind reader. A little care in how you ask makes a huge difference in what you get back. This chapter collects the habits and patterns that work best, with prompts you can copy.

:::summary In this chapter
- The habits that produce great results
- Plan mode: think first, then build
- Sharing screenshots, errors, and files
- Proven prompting patterns, with before-and-after examples
- A library of reusable prompts, and the mistakes to avoid
:::

## Five habits of great prompts

1. **Be specific.** Instead of "fix the bug," say "users see a blank screen after entering a wrong password, so fix that."
2. **Give the goal, not just the task.** "I want customers to order ahead online" helps Claude make better choices than "add a form."
3. **Break big jobs into steps.** Number them, and Claude will work through them in order.
4. **Let Claude explore first.** "Read the code and explain how login works before changing anything."
5. **Say how you'll judge success.** "When you're done, run the tests and show me they pass."

```prompt
1. Add a "Order ahead" page with a form for name, item, and pickup time.
2. Save orders to a file called orders.csv.
3. Add a link to the new page in the site's menu.
4. Open the site and confirm the form works before you finish.
```

## Plan mode: look before you leap

For anything bigger than a small tweak, ask Claude to **plan first**. In **plan mode** Claude researches and writes a step-by-step plan but won't edit your files until you approve it.

- Press <kbd>Shift</kbd> + <kbd>Tab</kbd> until the status bar says `plan mode on`, **or**
- Start your message with `/plan`, for example: `/plan add online ordering`.

When the plan appears you can approve it, ask for changes ("No, keep planning, and don't use a database"), or press <kbd>Ctrl</kbd> + <kbd>G</kbd> to edit the plan yourself in a text editor. Chapter 12 covers plan mode in depth.

> [!TIP]
> Plan mode is the single best habit for beginners. Reading the plan teaches you how the project works, and it catches misunderstandings before any files change.

## Share what you see

- **Error messages:** copy and paste them straight into the prompt. Include the whole thing.
- **Screenshots:** paste an image with <kbd>Ctrl</kbd> + <kbd>V</kbd> (<kbd>Cmd</kbd> + <kbd>V</kbd> in iTerm2, <kbd>Alt</kbd> + <kbd>V</kbd> on Windows). Claude can see it. Each image shows up as a chip like `[Image #1]` you can refer to.
- **Files:** type `@` followed by part of a file name.
- **A command's output:** start a line with `!` to run a shell command yourself, for example `!npm test`. Claude sees the result and responds to it.

## Ask a side question

Want to ask something without derailing the current task? Use `/btw`:

```prompt
/btw what's the difference between HTML and CSS?
```

The answer appears without being added to the main conversation. Side questions can't use tools, so Claude answers only from what it already knows in this session.

## Keep conversations focused

Claude can hold a lot in mind at once, but that space, the **context window**, is not unlimited. Long, wandering sessions get slower and cost more of your usage.

- Use `/clear` when you switch to an unrelated task.
- Use `/compact` to summarize a long conversation and free up space while staying on the same task.
- Use `/context` to see how full the context window is.

Chapter 6 explains exactly how the context window works and when to use each command.

## Pattern 1: Explore, plan, code, commit

Anthropic's recommended workflow for anything non-trivial has four phases:

:::steps Explore → plan → code → commit
1. **Explore.** Switch to plan mode and ask Claude to read the relevant parts.
   ```prompt
   read the files that handle the menu and understand how prices
   are shown. don't change anything yet.
   ```
2. **Plan.** Ask for a written plan.
   ```prompt
   I want to add a "sold out" badge to menu items. what files need
   to change? write a step-by-step plan.
   ```
3. **Code.** Approve the plan, then let Claude build and check it.
   ```prompt
   implement the plan. then open the page and confirm the badge
   shows on items marked sold out.
   ```
4. **Commit.** Save the result with a clear message.
   ```prompt
   commit with a descriptive message
   ```
:::

> [!NOTE]
> If you could describe the change in one sentence, such as "fix the typo in the header," skip the plan and just ask.

## Pattern 2: Give Claude a way to check its work

Claude stops when the work *looks* done. If it has a test, a build, or a screenshot to compare against, it can check for itself and keep fixing until the check passes. This is the most powerful habit of all.

| Instead of | Try |
|---|---|
| "implement a function that validates email addresses" | "write a validateEmail function. `user@example.com` is valid, `invalid` is not, `user@.com` is not. run the tests after implementing" |
| "make the dashboard look better" | "[paste screenshot] implement this design. take a screenshot of the result, compare it to the original, and fix the differences" |
| "the build is failing" | "the build fails with this error: [paste]. fix the root cause, don't just hide the error, and confirm the build succeeds" |

Ask Claude to **show evidence**: the test output, the command it ran, or a screenshot. Reviewing evidence is faster than checking everything yourself.

## Pattern 3: Point at examples and sources

| Instead of | Try |
|---|---|
| "add tests for foo.py" | "write a test for foo.py covering the case where the user is logged out. avoid mocks" |
| "add a calendar widget" | "look at how the existing widgets on the home page are built. follow that pattern for a calendar widget" |
| "why is this code so weird?" | "look through this file's Git history and summarize how it came to be this way" |
| "fix the login bug" | "login fails after the session times out. check the code in src/auth/. write a failing test that shows the bug, then fix it" |

## Pattern 4: Let Claude interview you

For a bigger feature you haven't fully thought through, ask Claude to ask *you* the questions first:

```prompt
I want to build an online ordering page for my bakery. Interview me
in detail using the AskUserQuestion tool. Ask about how it should
work, what customers see, edge cases, and tradeoffs. Skip obvious
questions. When we've covered everything, write a spec to SPEC.md.
```

When the spec is done, start a fresh session (`/clear`) and ask Claude to build what `SPEC.md` describes. The new session has a clean context focused entirely on building.

## Pattern 5: Ask for deeper thinking when it matters

Claude thinks before it answers. For a hard problem, include the word `ultrathink` anywhere in your prompt to ask for deeper reasoning on that one turn:

```prompt
ultrathink: why does the order total sometimes come out one cent off?
```

Other phrases such as "think hard" are treated as ordinary words. To change how much Claude thinks for the whole session, use `/effort` (Chapter 18).

## A library of reusable prompts

:::compact
| Situation | Prompt to paste |
|---|---|
| New project | "Give me a tour of this project: what it does, the main folders, and how to run it." |
| Before changing anything | "Read the relevant code and explain your understanding back to me before you edit anything." |
| A confusing error | "Here's the full error: [paste]. Explain it in plain English, find the cause, and fix it." |
| Unclear instructions | "Ask me up to five questions before you start, so you understand what I want." |
| Getting a second opinion | "Review what you just did as a strict senior reviewer. List anything risky or sloppy." |
| Learning while you work | "Explain each change as you make it, as if I'm learning to code." |
| Keeping scope small | "Only change files in the menu/ folder. Ask before touching anything else." |
| Wrapping up | "Summarize what we changed today, what's left, and any risks, in five bullets." |
:::

## Common mistakes and their fixes

| Mistake | What goes wrong | Fix |
|---|---|---|
| **The kitchen-sink session** | You mix unrelated tasks; context fills with noise | `/clear` between unrelated tasks |
| **Correcting over and over** | Failed attempts pile up and confuse Claude | After two failed corrections, `/clear` and write a better first prompt |
| **The giant CLAUDE.md** | Important rules get lost in a long file | Keep it short; move procedures into skills (Chapter 10) |
| **Trusting without checking** | Plausible code misses edge cases | Always give a test, a build, or a screenshot to check against |
| **Endless exploring** | "Investigate this" reads hundreds of files | Narrow the question, or ask Claude to use a subagent (Chapter 19) |

:::checklist
- My prompts say what, where, and how I'll judge success
- I use plan mode for anything that touches several files
- I give Claude a way to check its work
- I `/clear` between unrelated tasks
:::
