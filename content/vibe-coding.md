---
title: Vibe Coding
subtitle: Build real apps and websites by describing them in plain English
volume: 3
edition: October 2026
accent: "#7C4DDB"
accent2: "#F06BA8"
motif: waves
blurb: |
  "Vibe coding" means building software by describing what you want to an AI and letting it write the code. You steer with words, try the result, and keep refining. People with no programming background are launching websites, internal tools, and even small businesses this way.

  This manual tours today's tools, helps you choose one, and teaches a repeatable process: plan, build in small slices, test, save, and ship. It also covers the parts beginners usually miss, like databases, logins, payments, security, and what to do when the AI gets stuck.
---

# What Is Vibe Coding?

:::summary In this chapter
- Where the term came from and what it really means
- What vibe coding is great at, and where it needs care
- The mindset that makes it work
:::

## A new way to build

In early 2025, AI researcher Andrej Karpathy described a style of programming where you "fully give in to the vibes": you tell an AI what you want, accept its changes, run the result, and keep going by describing what to fix. He called it **vibe coding**, and the name stuck.

Today the phrase covers a whole spectrum:

- **Pure vibe coding:** you never look at the code. You judge only by what you see and click.
- **AI-assisted building:** you mostly describe, but you read plans, check changes, and learn as you go.
- **AI pair programming:** professionals using AI to write code faster, while reviewing every line.

This manual starts you at the first level and gently walks you toward the second. That's where the best results, and the fewest disasters, happen.

## What it's great for

- **Prototypes:** turn an idea into something clickable in an afternoon.
- **Personal tools:** a habit tracker, a recipe organizer, a budget calculator.
- **Small-business sites and apps:** booking pages, menus, client portals, internal dashboards.
- **Automations and scripts:** "Every Monday, combine these spreadsheets and email me a summary."
- **Learning:** asking the AI to explain what it built is one of the fastest ways to learn to code.

## Where it needs care

| Situation | Why it's risky | What to do |
|---|---|---|
| Handling money or payments | Bugs can cost real money | Use proven services (Stripe) and test thoroughly |
| Storing personal data | Leaks hurt people and break laws | Learn the security checklist in Chapter 10 |
| Big, long-lived products | AI-written code can grow messy | Use Git, keep a plan, refactor regularly |
| Anything safety-critical | Mistakes are dangerous | Get a professional review |

> [!TIP]
> The mindset that works: **you are the product manager, the AI is your fast but literal developer.** Be clear about what you want, check its work, and break big jobs into small, testable pieces.

# The Tool Landscape

There are dozens of vibe coding tools, but they fall into three families. Knowing which family a tool belongs to tells you most of what you need to know.

## Family 1: App builders in your browser

Type a description on a website and watch a working app appear, with a live preview, hosting, and often a database built in. **Nothing to install.** Best for beginners and for web apps.

| Tool | Made by | Known for | Starting price |
|---|---|---|---|
| **Lovable** | Lovable | Polished full-stack web apps; built-in backend ("Lovable Cloud") or Supabase; GitHub sync | Free plan; Pro from $25/mo (100 credits) |
| **Bolt** | StackBlitz | Fast web and mobile app prototypes running in the browser | Free (1M tokens/mo); Pro $25/mo |
| **v0** | Vercel | Beautiful interfaces with modern web components; one-click deploy to Vercel | Free (limited daily messages); Plus $30/mo |
| **Replit** | Replit | "Agent" builds and hosts full apps in a cloud workspace | Core $20/mo; Pro $100/mo |
| **Base44** | Wix | All-in-one apps with database, login, and hosting included | Free; Starter $16/mo (billed yearly) |
| **Google AI Studio (Build)** | Google | Gemini-powered app building with Firebase backends | Free for prototyping |

## Family 2: AI code editors

A code editor (a program for viewing and editing code files) with AI built into every corner: chat, autocomplete, and agents that edit many files at once. **Installed on your computer.** Best once your project outgrows a browser builder, or when you want to see and own the files.

| Tool | Notes | Starting price |
|---|---|---|
| **Cursor** | The most popular AI editor, built on VS Code. Owned by SpaceX/xAI since 2026; plans now come bundled in "The X Subscription" | Free; Plus $8/mo (Grok models only); Premium $30/mo |
| **VS Code + GitHub Copilot** | Microsoft's free editor plus GitHub's AI | Copilot Free; Pro $10/mo |
| **Devin Desktop** (formerly Windsurf) | Cognition's AI editor | Free tier; paid plans |
| **Kiro** | Amazon's editor, focused on writing specs before code | Free tier; paid plans |
| **Zed** | Very fast editor with AI agents built in | Free; paid AI plans |

## Family 3: Coding agents

Agents work on your files, run commands, test their own work, and keep going until a job is done. They can work in a terminal, an editor, a desktop app, or in the cloud while you're away.

| Tool | Notes | How you pay |
|---|---|---|
| **Claude Code** | Anthropic's agent: terminal, desktop app, VS Code, web (see the *Claude Code* manual) | Claude Pro $20/mo and up |
| **OpenAI Codex** | OpenAI's agent: app, terminal, IDE, cloud | Included in ChatGPT Plus ($20/mo) and up |
| **Gemini CLI** | Google's open-source terminal agent | Free tier with a Google account |
| **Copilot coding agent** | Assign a GitHub issue to Copilot; get a pull request | Copilot Pro and up |
| **Devin** | Cognition's autonomous cloud engineer | Paid plans |

> [!NOTE]
> Prices change constantly in this market. Cursor's plans changed in October 2026, for example. Treat these as a rough guide and check each tool's pricing page before you subscribe.

## Which should you pick?

| If you want to… | Start with |
|---|---|
| Build your first web app with zero setup | Lovable, Bolt, or Base44 |
| Design a beautiful interface or landing page | v0 |
| Build and host an app with a backend in one place | Replit or Lovable |
| Try for free with no credit card | Google AI Studio Build, or the free tiers of Lovable/Bolt/v0 |
| Own your files and grow a serious project | Cursor or VS Code + Copilot, with Claude Code or Codex |
| Have AI work while you're away | Claude Code (cloud), Codex, or the Copilot coding agent |

> [!TIP]
> A great path for beginners: **start in a browser builder, connect it to GitHub early, then open the same project in Cursor or Claude Code** when you need more control. Nothing is lost along the way.

# Your First App in a Browser Builder

The steps below use Lovable as the example, but Bolt, v0, Base44, and Replit work almost identically.

:::steps Build and publish a first app
1. **Sign up.** Go to lovable.dev (or your chosen tool) and create a free account.
2. **Describe your app in the main box.** Be specific about *who* it's for and *what* they do:
   ```prompt
   Build a simple "Plant Pal" web app where I can add my houseplants
   (name, photo, how often to water), see which plants need water today,
   and tick them off when watered. Friendly, earthy green design.
   Works well on phones.
   ```
3. **Watch it build.** The AI writes the code and a **preview** (a live, clickable version) appears beside the chat.
4. **Try it like a user.** Click every button. Add a plant. Refresh the page. Does your data stay?
5. **Ask for one change at a time.**
   ```prompt
   When I refresh, my plants disappear. Save them permanently
   so they're still there tomorrow.
   ```
6. **Connect GitHub.** Find the GitHub option in the project's settings or menu and link your account. Your code is now backed up, versioned, and portable.
7. **Publish.** Click **Publish** (or **Deploy**). You'll get a public web address to share.
:::

> [!WARNING]
> In step 5 the AI will probably add a **database** and maybe **login**. That's great, but it means your app now stores data. Read Chapter 7 before inviting real users.

## Getting to know the screen

Most browser builders share the same layout:

- **Chat panel:** where you describe changes.
- **Preview:** your app running live. Many tools let you switch to a phone-sized view.
- **Code view:** the actual files. Peek in sometimes; it's how you learn.
- **Version history:** earlier versions you can restore if a change goes wrong.
- **Settings / Integrations:** GitHub, database, custom domain, payments.

## Visual editing

Many builders let you click an element in the preview, say a heading or a button, and change its text, color, or size directly, or point at it and say "make this bigger." This is quicker, and usually cheaper in credits, than describing the change in chat.

# The Vibe Coding Workflow

Random prompting produces random apps. This five-stage loop is what experienced builders do.

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

# Prompts That Work

## The anatomy of a great prompt

A strong prompt answers four questions:

1. **What** do you want? ("Add a search box above the plant list.")
2. **Why?** ("I have 30 plants and scrolling is slow.")
3. **How should it behave?** ("Filter as I type; ignore capital letters.")
4. **How will you know it's right?** ("Typing 'fern' shows only my two ferns.")

```prompt
Add a search box above the plant list. I have 30 plants and
scrolling is slow. Filter the list as I type, ignoring capital
letters. Typing "fern" should show only plants with fern in the name.
Don't change anything else on the page.
```

That last line, "don't change anything else," saves a surprising amount of grief.

## Prompt templates

#### Starting an app

```prompt
Build [app] for [who]. They need to [main job 1], [main job 2],
and [main job 3]. Style: [3 adjectives], similar in feel to [an app
you like]. Phone-friendly. Start with just [first slice].
```

#### Adding a feature

```prompt
Add [feature] to [page]. When the user [action], it should [result].
Keep the current design. Don't change other features.
```

#### Fixing a bug

```prompt
Bug: when I [steps to reproduce], I expected [what should happen]
but instead [what actually happens]. Here's the error message: [paste].
Find the cause, explain it in one sentence, then fix it.
```

#### Improving design

```prompt
Make the [page] feel more [premium / playful / calm]. Improve spacing,
typography, and contrast. Keep all content and functionality the same.
```

#### Understanding what was built

```prompt
Explain how this app is organized, as if I'm new to coding.
What are the main files, and what does each one do?
```

## Use pictures

Screenshots communicate more than paragraphs. Most tools accept images: paste a screenshot of a bug, a sketch on paper, or a website whose style you admire ("match the spacing and feel of this, but with my colors").

## Ask for options before decisions

```prompt
I want users to be able to pay for a premium plan.
Give me three ways to do this, with pros and cons, before building anything.
```

# Data, Logins, and Payments

Sooner or later your app needs to remember things, know who's using it, or take money. Here's what's going on behind the scenes, so you can make good decisions.

## Front end and back end

- The **front end** is what runs in the user's browser: pages, buttons, layout.
- The **back end** is what runs on a server: storing data, checking passwords, sending emails, talking to other services.
- A **database** is where the back end keeps information, organized into **tables** (like spreadsheet tabs) of **rows** (records) and **columns** (fields).

Browser builders increasingly include a back end for you (Lovable Cloud, Base44, Replit, Bolt Cloud), or connect to **Supabase**, a popular hosted database with login and file storage built in.

## Logins (authentication)

**Authentication** ("auth") is proving who someone is: email and password, a magic link, or "Sign in with Google." Always use your platform's built-in auth or a proven service. Never ask the AI to invent its own password system.

```prompt
Add sign-in with email magic links and Google, using the built-in
auth. Each user should only ever see and edit their own plants.
```

That last sentence matters enormously. See "Row-level security" in Chapter 10.

## Payments

Use **Stripe** (or your builder's payments integration) for anything involving money. Stripe handles card details so they never touch your app.

- Build and test in Stripe's **test mode** first, with its test card numbers.
- Let Stripe host the checkout page; it's safer and simpler.
- Ask the AI to explain how a payment marks someone as "premium," and test what happens if a payment fails.

## API keys and environment variables

An **API** (application programming interface) is how one program talks to another, for example your app asking OpenAI to write text or asking a weather service for a forecast. Services identify you with an **API key**, a long secret string.

Keys belong in **environment variables** (also called **secrets**): settings stored on the server, outside your code. Every builder has a **Secrets** or **Environment variables** panel.

> [!CAUTION]
> Never paste API keys directly into chat or code, and never put a secret key in front-end code. Anyone can read front-end code in their browser and use your key, and run up your bill.

# Leveling Up: Editors and Agents

## Signs you've outgrown a browser builder

- Each change breaks something else, and fixes cost more and more credits.
- You need a feature the builder can't do (a custom server task, an unusual library).
- You want to understand and own your code.

## Moving your project

:::steps Open your builder project on your own computer
1. **Make sure it's on GitHub.** Use the builder's GitHub sync (Chapter 3).
2. **Install an editor or agent.** Cursor, VS Code with Copilot, or Claude Code (see the *Claude Code* and *GitHub* manuals in this series).
3. **Clone the repository** to your computer: `git clone <url>`, or **Clone repository** in your editor's welcome screen.
4. **Ask the AI to get it running.**
   ```prompt
   This project was built in Lovable. Install what it needs and start
   it locally, then explain how to run it myself next time.
   ```
5. **Keep both in sync.** Push changes to GitHub; most builders pull them back automatically.
:::

## Working in Cursor

Cursor looks like VS Code, with an AI panel on the side.

| Feature | What it does |
|---|---|
| **Tab** | Predicts your next edit as you type; press <kbd>Tab</kbd> to accept |
| **Inline edit** (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd>) | Select code and describe a change |
| **Agent / chat** (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>L</kbd> or <kbd>I</kbd>) | Ask questions or have the agent make multi-file changes |
| **Rules** | Project instructions in `.cursor/rules/` or `AGENTS.md` |
| **Cloud agents** | Hand off a task to run in the cloud while you keep working |

## Agents: the most hands-off option

Coding agents like Claude Code and Codex can take a whole task, such as "add email reminders," and work through it: read the code, plan, edit files, run the app, fix errors, and commit. Pair them with GitHub so every change arrives as a reviewable pull request.

> [!TIP]
> A powerful combo: **plan in chat, build with an agent, review the pull request on GitHub.** You stay in charge of *what* gets built while the AI handles *how*.

# Shipping Your App

## Hosting

**Hosting** means running your app on a computer that's always online so others can use it. Your options:

| Option | Good for |
|---|---|
| Your builder's **Publish** button | The easiest path; usually includes a free subdomain |
| **Vercel** | Next.js and React apps; great with v0 |
| **Netlify** / **Cloudflare Pages** | Static sites and front-end apps |
| **GitHub Pages** | Simple static websites (see the *GitHub* manual) |
| **Replit Deployments** | Apps built in Replit |

## Your own domain name

Buy a domain (like `plantpal.app`) from a registrar such as Cloudflare, Namecheap, or Porkbun. Then, in your host's **Domains** settings, add it and follow the instructions to update the **DNS records**, the internet's address book that points your domain at your host. Changes can take from minutes to a few hours to work everywhere.

## Pre-launch checklist

:::checklist
- Tested every feature on a phone and a computer
- Tried signing up as a brand-new user, in a private browser window
- Confirmed user A cannot see user B's data
- No secret keys in front-end code; secrets stored in environment variables
- Error messages are friendly, not technical
- A privacy policy page if you collect any personal data
- A backup or export of your database
- Spending limits set on every paid service (AI APIs, hosting, database)
:::

# When You Get Stuck

Every vibe coder hits the same wall: the AI keeps "fixing" a bug and it keeps coming back, or each fix breaks something new. Here's how to get unstuck.

## Break the loop

1. **Stop prompting the same request.** If two attempts failed, a third identical one probably will too.
2. **Roll back** to the last version that worked (version history or Git), and try a different approach.
3. **Ask for a diagnosis, not a fix:**
   ```prompt
   Don't change any code yet. List the three most likely causes of
   this bug, and how we could test each one.
   ```
4. **Add visibility:** "Add logging so we can see what's happening when I click Save." Then paste what the logs say.
5. **Start a fresh chat** with a short summary. Long conversations confuse AIs.
6. **Simplify:** remove the broken feature, get back to green, rebuild it in smaller slices.
7. **Switch models or tools.** A different AI often spots what the first one missed.

## Reading error messages

Error messages look scary but are just clues. Copy the *whole* message, including file names and line numbers, and paste it to the AI. To find errors in a web app, open your browser's **developer tools** (<kbd>F12</kbd>, or right-click and choose **Inspect**) and look at the **Console** tab.

> [!NOTE]
> "It doesn't work" gives the AI nothing to go on. "When I click Save on the Add Plant form, nothing happens, and the console shows `TypeError: cannot read properties of undefined`" gets it fixed.

# Security for Vibe Coders

AI tools make it easy to build apps that *work* but aren't *safe*. A few habits prevent the most common, and most embarrassing, problems.

## The big five

1. **Keep secrets secret.** API keys in environment variables, never in front-end code or GitHub.
2. **Lock down your database.** With Supabase and similar services, turn on **row-level security** (RLS): rules in the database itself that say "users can only read and change their own rows." Without it, anyone who knows your app's address may be able to read everything.
3. **Never trust the browser.** Anything checked only in the front end (prices, permissions, "is premium?") can be faked. Important checks must happen on the server.
4. **Use proven building blocks** for login, payments, and file uploads, not home-made versions.
5. **Set spending limits.** Put budget caps and alerts on AI APIs, hosting, and databases. A bug or a bot can otherwise run up a large bill overnight.

## Ask the AI to audit itself

```prompt
Act as a security reviewer. Check this app for: exposed secrets,
missing row-level security, actions that only check permissions in the
browser, missing rate limits on forms and AI features, and personal
data we store but don't need. List problems by severity, then fix the
critical ones.
```

Many builders also include a built-in security scan. Run it before every launch.

## Privacy and the law

If you collect names, emails, or anything personal, you have responsibilities: tell people what you collect (a privacy policy), collect only what you need, and delete data on request. Rules vary by country (for example GDPR in Europe and CCPA in California). For anything health- or finance-related, get professional advice.

# Costs and Credits

Most vibe coding tools charge with **credits** (or **tokens**), units of AI work. Bigger requests and longer conversations use more.

## Make credits last

- **Plan before building.** A clear brief avoids expensive rewrites.
- **Use visual edits** for small text and color changes instead of chat.
- **Batch small tweaks** into one clear message, but keep big features separate.
- **Roll back instead of re-prompting** when a change goes badly.
- **Use "chat" or "plan" modes** to discuss ideas; many tools charge less when the AI isn't editing code.
- **Move heavy work to an agent subscription** (Claude Code, Codex, Cursor) when you're doing lots of building. A flat monthly plan is often cheaper than pay-per-credit builders.

## A typical starter budget

| Stage | Setup | Monthly cost |
|---|---|---|
| Exploring | Free tiers of 2–3 builders | $0 |
| Building your first real app | One builder plan | ≈ $20–30 |
| Growing a serious project | Builder or editor + Claude Pro or ChatGPT Plus | ≈ $40–60 |
| Running in production | Plus hosting, database, domain | add ≈ $10–50 |

# Quick Reference {.unnumbered}

:::cheatsheet
**The loop:** Plan → build one slice → test → checkpoint → repeat

**Great prompt:** What + why + how it behaves + how you'll know it's right + "don't change anything else"

**Stuck?** Roll back → ask for causes, not fixes → add logging → fresh chat → simplify → try another model

**Before launch:** secrets in env vars · row-level security on · server-side checks · spending limits · test as a new user

**Grow up path:** Browser builder → connect GitHub → open in Cursor / Claude Code / Codex → work via pull requests
:::

# Glossary {.unnumbered}

:::glossary
Agent
: An AI that takes actions, such as editing files and running commands, in a loop until a task is done.

API
: Application programming interface: a way for one program to talk to another.

API key
: A secret string that identifies you to a service, like a password for programs.

Authentication
: Proving who a user is, for example with a password, magic link, or Google sign-in.

Back end
: The part of an app that runs on a server: data, logins, emails, payments.

Checkpoint
: A saved, working version of your project you can return to.

Code editor
: A program for viewing and editing code files, such as VS Code or Cursor.

Credits
: Units many AI tools use to measure and charge for usage.

Database
: Organized storage for an app's information, in tables of rows and columns.

Deploy
: Put your app on a server so others can use it. Also called publishing or shipping.

DNS
: The internet's address book, which points a domain name at the computer hosting your site.

Environment variable
: A setting stored outside your code, used for secrets like API keys.

Front end
: The part of an app that runs in the user's browser.

Hosting
: Running your app on an always-online computer.

PRD
: Product requirements document: a brief describing what to build and why.

Preview
: A live, clickable version of your app inside a builder.

Prompt
: The instructions you give an AI.

Row-level security
: Database rules ensuring each user can only access their own records.

Rules file
: A file of lasting instructions an AI tool reads automatically, such as `AGENTS.md` or `CLAUDE.md`.

Supabase
: A popular hosted database service with built-in logins and file storage.

Token
: A small chunk of text used to measure AI usage, roughly three-quarters of a word.

Vibe coding
: Building software mainly by describing what you want to an AI and iterating on the results.
:::
