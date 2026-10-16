# AI Editors and Agents Up Close

Editors and agents work on real files on your computer (or in a cloud copy of your project). They are more powerful than browser builders and less hand-holding. You don't need them on day one, but it helps to know what each is for.

:::summary In this chapter
- What an editor gives you that a builder doesn't
- Profiles of Cursor, Copilot, Devin Desktop, Kiro, and Zed
- Profiles of Claude Code, Codex, Gemini CLI, and Devin
- How to choose, and how they combine
:::

## Why move to an editor or agent?

- **You own the files.** Your project lives in a normal folder, backed up to GitHub.
- **No ceiling.** Any language, any library, any hosting service.
- **Flat-rate plans.** A monthly subscription is often cheaper than builder credits for heavy building.
- **You learn faster.** You see every file the AI touches.

The trade-off: you set up things yourself, like installing tools and running the app locally. The AI can do most of that for you if you ask.

## Cursor {{Freemium}}

Cursor looks like VS Code (the most popular free code editor) with AI woven through it. It is owned by SpaceX/xAI, and its plans are part of "The X Subscription," which also covers Grok.

| Plan | Price | Notes |
|---|---|---|
| Free | $0 | Limited usage |
| Plus | $8/mo | Grok models only |
| Premium | $30/mo | Most popular; more usage, latest models |
| Super / Ultra | $100 / $200 per month | For heavy daily agent use |

Usage comes from one pool shared across Cursor and Grok, and the allowance **refreshes weekly**, so one heavy day doesn't wipe out your month.

**Best for:** people who want the most polished all-round AI editor. **Watch out for:** the cheapest paid plan limits you to Grok models.

## VS Code + GitHub Copilot {{Freemium}}

VS Code is free from Microsoft; **GitHub Copilot** adds AI chat, autocomplete, an agent mode, and a **cloud agent** you can assign GitHub issues to.

| Plan | Price | Notes |
|---|---|---|
| Copilot Free | $0 | Up to 2,000 completions a month; automatic model choice |
| Copilot Student | $0 | For verified students |
| Copilot Pro | $10/mo | More AI credits; cloud agent included |
| Copilot Pro+ / Max | $39 / $100 per month | Larger allowances of AI credits |

**Best for:** anyone already on GitHub, and anyone on a tight budget. **Watch out for:** Copilot Free doesn't include the cloud agent.

## Devin Desktop (formerly Windsurf) {{Freemium}}

Cognition renamed its Windsurf editor **Devin Desktop**. It sits alongside the Devin CLI and **Devin Cloud** agents under one account.

- **Free:** a light quota, unlimited Tab completions and inline edits.
- **Pro, $20/mo:** frontier models from several AI companies and access to cloud agents.
- **Max, $200/mo:** much higher quotas.

**Best for:** people who want an editor and cloud agents from one company.

## Kiro {{Freemium}}

Amazon's Kiro is built around **specs**: before writing code, it helps you write requirements, a design, and a task list. That makes it a natural fit for the planning habits in this manual.

| Plan | Price | Credits per month |
|---|---|---|
| Free | $0 | 50 |
| Pro | $20/mo | 1,000 |
| Pro+ | $40/mo | 2,000 |
| Pro Max / Power | $100 / $200 per month | 5,000 / 10,000 |

Extra credits cost $0.04 each on paid plans.

## Zed {{Freemium}}

Zed is a very fast editor with AI agents built in. The editor is free forever; **Pro** is $10/mo with $5 of AI usage included and usage-based billing beyond that. Best for people who like a lightweight, speedy tool.

## Claude Code {{Paid}}

Anthropic's **Claude Code** is an agent you talk to in plain English. It reads your project, plans, edits files, runs commands, and checks its own work. It runs in a terminal, a desktop app, VS Code and other editors, and on the web. The *Claude Code* manual in this series covers it in depth.

| Plan | Price |
|---|---|
| Claude Pro | $20/mo ($17/mo billed yearly) |
| Claude Max | From $100/mo (5x Pro usage) or $200/mo (20x) |

**Best for:** larger tasks you want done end to end, and working while you're away (cloud sessions).

## OpenAI Codex {{Freemium}}

**Codex** is OpenAI's coding agent, with an app, a terminal tool, editor extensions, and cloud tasks. It is included in ChatGPT plans: Free, Go ($8/mo), Plus ($20/mo), and Pro (from $100/mo), with bigger plans giving more usage.

## Gemini CLI {{Free}}

Google's open-source terminal agent. Sign in with a Google account for a free tier. If you have Node.js installed, you can try it without installing anything:

```bash
npx @google/gemini-cli
```

## Devin {{Paid}}

**Devin** is Cognition's autonomous cloud engineer: you hand it a task, it works in its own cloud workspace, and returns a pull request. Cloud agents are included from the Devin Pro plan.

## How to choose

| You are… | Try |
|---|---|
| New to editors and want a guided feel | Cursor or VS Code + Copilot |
| On a tight budget | VS Code + Copilot Free, Gemini CLI, Zed |
| A planner who likes specs | Kiro |
| Wanting big tasks done end to end | Claude Code or Codex |
| Wanting work done while you sleep | Claude Code on the web, Codex cloud, Copilot cloud agent, Devin |

> [!TIP]
> Editors and agents combine well. A common setup is **Cursor or VS Code for looking around**, plus **Claude Code or Codex for the heavy lifting**. They all read the same project files, and most read an `AGENTS.md` rules file.

:::checklist
- I know the difference between an editor and an agent
- I've picked one to try when I outgrow my builder
- I've noted its price and what the free plan allows
:::

