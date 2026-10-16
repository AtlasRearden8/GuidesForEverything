# What Autonomous AI Trading Is (and Isn't)

An **autonomous trading bot** is a small computer program that buys and sells investments for you, on a schedule, following rules you wrote down in advance. Once it's switched on, it doesn't wait for you to click anything. That's the "autonomous" part. The "AI" part is optional, and smaller than the ads suggest. This chapter clears up what you're actually building.

:::summary In this chapter
- What a trading bot does, step by step
- Where AI genuinely helps, and where it doesn't
- The system you'll build in this manual
- A realistic timeline from zero to live
:::

## A bot is a loop with rules

Strip away the marketing and every trading bot does the same five things, over and over:

1. **Wake up.** A scheduler (a clock on a computer) starts the program, for example every weekday at 10:00 a.m.
2. **Look.** It downloads recent prices from your broker's data service.
3. **Decide.** It runs your **strategy**, the written rules that say when to buy and when to sell. For example: "Own this fund when its 50-day average price is above its 200-day average."
4. **Check.** It runs **risk rules**: Is this trade too big? Have we already lost too much today? Is the kill switch on?
5. **Act and record.** If every check passes, it sends an **order** (an instruction to buy or sell) to your broker through an **API**, writes what it did to a log file, and messages you.

An **API** (application programming interface) is a doorway that lets one program talk to another. Your broker's website is a doorway for humans; its API is a doorway for programs. Your bot will use it to read your balance, fetch prices, and place orders.

> [!NOTE]
> "Autonomous" doesn't mean "unsupervised forever." It means the bot doesn't need you *in the moment*. You still review its reports, update it, and decide whether it keeps running. Think of a dishwasher: it runs by itself, but you still check it's not leaking.

## What "AI" really adds

People use "AI trading" to mean four very different things:

| Kind | What it is | Honest verdict |
|---|---|---|
| Rule-based bot | Fixed if-then rules, no AI | Most real bots; the safest start |
| AI as coder | An assistant like Claude writes and reviews your bot | Huge help for beginners |
| AI as analyst | A language model reads news and scores it | Useful as one input, never alone |
| AI as trader | An AI agent decides and places trades | Experimental; needs tight guardrails |

This manual uses AI in all four ways, but in that order of trust. Your bot's *decisions* will start as plain, testable rules. AI will help you write the code, explain errors, review your logic, and (later, optionally) add a news-based filter. You'll also see how to connect an AI agent to a paper account, with fences around it.

> [!IMPORTANT]
> No AI can predict prices reliably. Markets react to news nobody has seen yet. The U.S. Commodity Futures Trading Commission (CFTC) puts it bluntly in a customer advisory titled *"AI Won't Turn Trading Bots into Money Machines"*: AI technology can't predict the future or sudden market changes.

## What a bot is good at

A bot is not smarter than you. Its advantages are about *behaviour*:

- **It follows the plan.** It never panics in a crash or gets greedy in a rally.
- **It never forgets.** It checks every rule on every run, even at 3 a.m.
- **It's testable.** You can replay years of history and see how the rules *would* have behaved.
- **It's consistent and logged.** Every decision is written down, so you can learn from it.

And what it's bad at: it can't tell when the world has changed, it will repeat a bug thousands of times without blinking, and it will happily trade itself into a loss if your rules allow it. That's why half of this manual is about testing and safety.

## The system you'll build

By the end of this manual you'll have a working bot made of small, understandable parts:

:::cols
- Python project on your computer
- Paper trading account at Alpaca
- Config file with your rules
- Data module (daily prices)
- Strategy module (signals)
- Risk module (the "no" rules)
- Orders module (the only part that trades)
- Log file and state file
- Telegram or Slack alerts
- Daily report and small dashboard
- Tests that check the logic
- Scheduler on a cloud server
:::

We use **Alpaca** for the main build because it offers a free paper trading account to anyone with an email address, a well-documented Python library, commission-free U.S. stock trading, and an official AI connector. You can adapt the same design to other brokers; Chapter 5 compares them.

## A realistic timeline

:::steps From zero to a live bot
1. **Weeks 1–2: Learn and set up.** Read Chapters 1–8, install Python and VS Code, open a paper account, and get your first script running.
2. **Weeks 3–4: Build and backtest.** Write your strategy, test it on history, and learn why most good-looking backtests are lies.
3. **Weeks 5–6: Build the full bot.** Add risk rules, orders, logging, state, alerts, and tests.
4. **Weeks 7–14 (at least): Paper trade.** Run it on a schedule with fake money and compare results with the backtest.
5. **After that: Go live tiny.** If, and only if, paper trading met your success criteria, switch to a very small real-money account.
:::

> [!TIP]
> Treat this as learning a craft, like woodworking. Your first table will wobble. That's fine, as long as you build it with scrap wood (paper money) rather than the good oak (your savings).

## How to use this manual

Read the chapters in order the first time. Every chapter ends with a checklist; don't move on until you can tick it. Code appears in short blocks with an explanation between each one. You don't have to type it: you can paste it, or ask Claude Code to write it with the prompts provided. Either way, **read every line** before you run it. A bot is software that spends money.

:::checklist
- I can explain what a trading bot does in five steps
- I know that "AI" in this manual mostly means an AI coding helper
- I understand no tool can guarantee profits
- I've blocked out several weeks for paper trading before going live
:::

