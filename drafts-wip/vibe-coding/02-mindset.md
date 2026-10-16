# The Vibe-Coding Mindset

The tools in this manual change every few months. The habits in this chapter don't. People who succeed with vibe coding are rarely the most technical; they are the clearest thinkers and the most patient testers.

:::summary In this chapter
- Your role: product manager, tester, and editor
- Realistic expectations, including the "last 20%" wall
- Seven habits that separate finished apps from abandoned ones
- Common myths, and the truth behind them
:::

## Your three jobs

When you vibe code, the AI handles the typing. You keep three jobs that no AI can do for you:

1. **Product manager.** Decide what to build, for whom, and what "done" means. Say no to features that can wait.
2. **Tester.** Use the app like a real person would, including a confused or careless one. Find what's broken.
3. **Editor.** Read the AI's plans and summaries, ask "why?", and stop it when it heads the wrong way.

> [!NOTE]
> You will also become a little bit of a developer over time, whether you mean to or not. That's a good thing. Each concept you pick up, like "front end" or "environment variable," makes your prompts sharper and your apps safer.

## Realistic expectations

AI builders are astonishing at the first 80% of an app. In an hour you can have something that looks finished. The last 20%, the edge cases, the logins, the "what if two people do this at once," takes longer. Experienced builders call this **the last-20% wall**.

| Stage | How it feels | What helps |
|---|---|---|
| First version | Magical: it works in minutes | Enjoy it, then save a checkpoint |
| Adding features | Mostly smooth, occasional breakage | Small slices, one feature per message |
| Real users and data | Slower; details matter | Security checklist, testing as a new user |
| Long-term upkeep | Changes ripple in surprising ways | Git, a rules file, regular tidy-ups |

None of this is a reason to stop. It's a reason to plan for it, so that a slow week doesn't feel like failure.

## Seven habits of successful vibe coders

:::steps The habits
1. **Start smaller than you want.** Build the one feature that proves the idea. Everything else waits for version 2.
2. **Write it down first.** A one-page brief beats an hour of improvised prompting.
3. **One change per message.** Small requests produce small, understandable mistakes.
4. **Test after every change.** Click the thing you just changed, and one thing you didn't.
5. **Save working versions.** A checkpoint or Git commit after each success makes every mistake reversible.
6. **Read what the AI tells you.** Its summary often admits "I also changed X" or "I couldn't do Y."
7. **Ask "explain this" often.** Understanding grows quietly, and it pays off when things break.
:::

## Myths and realities

| Myth | Reality |
|---|---|
| "I'll never need to understand anything." | You'll need concepts, not code: what a database is, where secrets live |
| "If it looks done, it is done." | Looks are the easy part; test data, logins, and errors |
| "More detailed prompts are always better." | Clear beats long. One focused request wins |
| "The AI knows best." | It is confident, not always right. You decide |
| "I picked the wrong tool and must start over." | Code moves between tools through GitHub |
| "Vibe-coded apps can't be real businesses." | Many are, once they pass security and testing basics |

## When to bring in a professional

Vibe coding takes you a long way on your own. Consider paying a developer for a review when:

- you are about to handle payments, health data, or children's data;
- your app has hundreds of real users and changes keep breaking it;
- you need to meet a legal or industry standard;
- you have been stuck on the same problem for more than a few days.

A few hours of expert review costs far less than a data leak. The "Maintaining and Handing Off" chapter shows how to prepare your project so that review is quick.

> [!TIP]
> Keep a **build diary**: a simple note with the date, what you asked for, what worked, and what broke. It costs a minute a day and it is the best debugging tool you'll ever have.

:::checklist
- I understand my three jobs: product manager, tester, editor
- I expect the last 20% to take longer, and I'm fine with that
- I've picked one small first feature
- I have somewhere to keep a build diary
:::

