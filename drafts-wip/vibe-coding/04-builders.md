# App Builders Up Close

Browser app builders are where most people start, and many never need to leave. They look alike at first glance, but each has a personality. This chapter gives an honest profile of each, so you can pick one with confidence.

:::summary In this chapter
- Lovable, Bolt, v0, Replit, Base44, Google AI Studio, and Figma Make
- What each is best at, where each struggles, and what it costs
- How credits and tokens work in each
- A side-by-side comparison
:::

## How builders charge

Every builder measures AI work in some unit: **credits**, **tokens** (small chunks of text, roughly three-quarters of a word), or dollars of usage. A tiny change like "make the button gray" costs little; "add login and a database" costs more. Large projects cost more per message, because the AI has to read more of your code each time.

> [!TIP]
> Most builders now have a **planning or chat mode** that discusses changes without editing code. It is usually cheaper than building, and it prevents expensive wrong turns.

## Lovable {{Freemium}}

Lovable turns a description into a polished full-stack web app: pages, a database, logins, and hosting.

| | |
|---|---|
| **Best for** | Good-looking web apps with accounts and data |
| **Backend** | Built-in "Lovable Cloud" (database, auth, storage, functions) or your own Supabase |
| **Modes** | **Build** (makes changes), **Plan** (writes a plan you approve), **Chat** (discuss only) |
| **Price** | Free: 5 credits a day (up to 30 a month). Pro from $25/mo (100 credits) |

**Strengths.** Attractive designs out of the box; two-way sync with GitHub, GitLab, or Bitbucket; **Knowledge** settings that hold lasting instructions; version history with bookmarks; built-in payments (Stripe or Paddle); a Quick security scan that runs every time you publish, plus an optional Deep scan.

**Watch out for.** Credits can go quickly on big projects. Custom domains need a paid plan. Monthly credits expire if unused (two months after issue on monthly plans), so don't stockpile.

> [!NOTE]
> Lovable says you own the code, apps, and data you create. A Plan mode message costs one credit, plus any research the AI runs while planning.

## Bolt {{Freemium}}

Bolt, from StackBlitz, runs a full development environment inside your browser tab. It is fast, flexible, and handles mobile apps.

| | |
|---|---|
| **Best for** | Quick prototypes, mobile apps (with Expo), importing Figma designs |
| **Backend** | **Bolt Cloud**: hosting, domains, database, sign-in, file storage, payments; or Supabase |
| **Modes** | Build, plus **Plan Mode** to agree on an approach first |
| **Price** | Free: 300K tokens a day, 1M a month. Pro $25/mo (from 10M tokens). Teams $30/member |

**Strengths.** Very fast iteration; starts from a prompt, uploaded files, a Figma frame, or a Google Stitch design; GitHub sync; a database security check that flags issues such as a missing access rule; paid tokens roll over for one extra month.

**Watch out for.** Token use grows with project size, because Bolt syncs your whole project to the AI with each message. Keep projects focused.

## v0 {{Freemium}}

v0 is Vercel's builder. It shines at interfaces: clean layouts using modern web components, ready to deploy on Vercel.

| | |
|---|---|
| **Best for** | Landing pages, dashboards, portfolio sites, polished interfaces |
| **Backend** | Connects to databases through Vercel's marketplace (Supabase, Neon, and others) |
| **Editing** | **Design Mode** for visual tweaks without prompting |
| **Price** | Free: 7 messages a day. Plus $30/user/mo ($30 of credits plus $2 daily on login) |

**Strengths.** Excellent visual quality; one-click deploy to Vercel; GitHub sync; produces standard Next.js code that any developer recognizes.

**Watch out for.** The free plan's daily message limit is tight. Back-end features take more setup than in Lovable or Base44.

## Replit {{Freemium}}

Replit is a complete cloud workspace with an AI **Agent** that plans, builds, tests, and publishes apps, including native mobile apps.

| | |
|---|---|
| **Best for** | Apps with real back ends, scripts, bots, mobile apps, dashboards from data |
| **Agent modes** | **Free Mode** (no-cost everyday work within an allowance), **Power**, and **Max** |
| **Safety net** | **Checkpoints** after each request, with one-click rollback |
| **Price** | Starter free (daily Free Mode cap; one published app for 30 days). Core $20/mo. Pro $100/mo |

**Strengths.** Handles almost any kind of app or language; built-in database, secrets, and publishing; mobile apps you can test with Expo Go and send to the App Store; Plan and Build modes; it asks for confirmation before a paid action starts.

**Watch out for.** Paid work uses **effort-based pricing**: complex requests cost more. Watch the usage meter in your first weeks.

## Base44 {{Freemium}}

Base44, owned by Wix, builds complete apps with the database, logins, and hosting already wired together. It is very beginner-friendly.

| | |
|---|---|
| **Best for** | Internal tools, client portals, simple business apps |
| **Backend** | Built in: data tables, user sign-in, data permissions, workflows, email |
| **Extras** | Plan mode, a separate test database, one-click security scan, Stripe setup |
| **Price** | Free: 25 message credits a month. Paid plans from Starter ($16/mo billed yearly) |

**Strengths.** The least setup of any builder; data permissions you can set in plain English; paid plans include a free domain for a year; two-way GitHub sync exports your full source code.

**Watch out for.** On the Free plan you can view your code but not edit it. Yearly billing saves 20%, but try monthly first.

## Google AI Studio (Build mode) {{Free}}

Google AI Studio's Build mode creates web apps powered by Google's Gemini models.

| | |
|---|---|
| **Best for** | Free experiments and AI-powered apps (image, text, voice) |
| **Backend** | Can set up Firebase: Firestore database and "Sign in with Google" |
| **Extras** | Secrets management, GitHub sync, download as ZIP |
| **Deploy** | Share, or deploy to Google Cloud Run (Cloud Run charges may apply) |

**Strengths.** Free for prototyping; your Gemini API key stays on the server side; great for apps that use AI features.

**Watch out for.** Deploying to Cloud Run uses your Google Cloud account and its billing. Set a budget alert there.

## Figma Make

Figma Make turns prompts, and designs you already have in Figma, into working prototypes and responsive websites you can publish. It is a natural choice if you or your designer already live in Figma. Check Figma's pricing page for how its AI credits work on your plan.

## Side by side

:::compact
| Builder | Easiest for | Mobile apps | Code ownership |
|---|---|---|---|
| **Lovable** | Polished web apps with logins | Web only (phone-friendly) | Two-way Git sync |
| **Bolt** | Fast prototypes, Figma imports | Yes, via Expo | GitHub sync, export |
| **v0** | Interfaces and landing pages | Web only | GitHub sync |
| **Replit** | Anything with a real back end | Yes, via Expo | Full workspace access |
| **Base44** | Internal tools, least setup | Web only | GitHub sync (paid plans) |
| **AI Studio** | Free AI-powered experiments | Web only | GitHub sync, ZIP |
:::

> [!IMPORTANT]
> Whatever you choose, **connect GitHub in your first session**. It backs up your work, and it means you can move the project to any other tool later.

:::checklist
- I've chosen one builder to start with
- I know how it charges (credits, tokens, or usage)
- I've found its plan or chat mode
- I know where its version history lives
:::

