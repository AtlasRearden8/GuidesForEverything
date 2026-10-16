# What Is Vibe Coding?

Vibe coding is the friendliest way into software that has ever existed. You describe what you want in everyday words, an AI writes the code, and you judge the result by using it. This chapter explains where the idea came from, what it is good at, and where you need to be careful.

:::summary In this chapter
- Where the term came from and what it really means
- The three levels of vibe coding, and which one to aim for
- What vibe coding is great at, and where it needs care
- What a real vibe-coding session looks like
:::

## A new way to build

In early 2025, AI researcher Andrej Karpathy described a style of programming where you "fully give in to the vibes": you tell an AI what you want, accept its changes, run the result, and keep going by describing what to fix. He called it **vibe coding**, and the name stuck.

Before this, building software meant learning a **programming language** (a precise written language computers can follow, such as JavaScript or Python) and typing every instruction yourself. Now the AI does the typing. Your job moves from *writing code* to *deciding what to build and checking that it works*.

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
- **Browser extensions and small mobile apps:** little helpers that fix one annoyance in your day.
- **Learning:** asking the AI to explain what it built is one of the fastest ways to learn to code.

## Where it needs care

| Situation | Why it's risky | What to do |
|---|---|---|
| Handling money or payments | Bugs can cost real money | Use proven services (Stripe) and test thoroughly |
| Storing personal data | Leaks hurt people and break laws | Follow the security chapter's checklist |
| Big, long-lived products | AI-written code can grow messy | Use Git, keep a plan, tidy up regularly |
| Anything safety-critical | Mistakes are dangerous | Get a professional review |

> [!TIP]
> The mindset that works: **you are the product manager, the AI is your fast but literal developer.** Be clear about what you want, check its work, and break big jobs into small, testable pieces.

## What a session actually looks like

Here is a realistic first hour with a browser app builder, so you know what to expect.

| Time | What you do | What the AI does |
|---|---|---|
| 0–10 min | Write a short description of your idea | Asks a question or two, then builds a first version |
| 10–25 min | Click around the preview and note problems | Fixes one problem per message |
| 25–40 min | Ask for the next feature | Adds it, sometimes breaking something small |
| 40–50 min | Spot the breakage and describe it precisely | Repairs it |
| 50–60 min | Save a checkpoint and publish | Gives you a public web address |

Notice that most of your time goes into **trying the app and describing what you see**. That is the core skill, and you already have it: you use apps every day.

## Words you'll meet straight away

You do not need to learn to program, but a few words come up constantly. Each is explained again where it matters, and all of them are in the glossary.

:::compact
| Word | Plain meaning |
|---|---|
| **Code** | The written instructions that make an app work |
| **Prompt** | The message you type to the AI |
| **Preview** | A live, clickable version of your app while you build |
| **Deploy / publish** | Put your app online so others can use it |
| **Database** | Where the app stores information so it isn't lost |
| **Bug** | Something that doesn't work the way it should |
| **Repository (repo)** | A project folder whose history is tracked, usually on GitHub |
:::

:::checklist
- I know vibe coding means describing, testing, and refining
- I'm aiming for "AI-assisted building," not blind acceptance
- I know which kinds of projects need extra care
- I expect to spend most of my time testing and describing
:::

