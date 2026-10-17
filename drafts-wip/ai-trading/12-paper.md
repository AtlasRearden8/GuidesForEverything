# Paper Trading for Weeks

A backtest tells you how rules behaved on old data. **Paper trading** tells you how your *whole system* behaves today: the scheduler, the data, the orders, the logs, the alerts, and you. It's where you find the bugs that history can't show.

:::summary In this chapter
- Why paper trading comes before any real money
- How long to run it
- Success criteria you write down in advance
- A weekly review routine
:::

## What paper trading catches

| Problem | Backtest sees it? | Paper trading sees it? |
|---|---|---|
| Strategy logic | Yes | Yes |
| Scheduler didn't run | No | Yes |
| Orders rejected (wrong size, wrong symbol) | No | Yes |
| Holidays and early closes | Rarely | Yes |
| Alerts not arriving | No | Yes |
| Fills worse than closes | Only if modelled | Partly |
| Your own urge to "fix" things | No | Yes |

## How long?

Run the bot on paper for **at least eight weeks**, and longer for slow strategies. A daily 50/200 trend bot may trade only a few times in that period, so the main goal is proving the *machinery* works: dozens of clean runs, at least one holiday, at least one order of each type, and at least one alert.

> [!TIP]
> Speed up the machinery test without changing your real strategy: run a second paper account with a deliberately twitchy setting (such as 5/20-day averages) so orders happen often. Delete it afterwards.

## Write your success criteria first

Decide *before* you start what "pass" means, and put it in a file so you can't move the goalposts later:

```markdown title=paper-criteria.md
# Paper trading pass criteria (written 2026-10-17)
- [ ] 40+ scheduled runs, zero missed without an alert
- [ ] Zero unintended orders (wrong symbol, size, or duplicate)
- [ ] Every order logged with ID, size, price, and reason
- [ ] Risk limits tested: kill switch, daily loss, max positions
- [ ] Paper fills within 0.2% of the price the bot expected
- [ ] Paper results roughly match a backtest of the same period
- [ ] I read every daily report and understood every trade
```

Notice there's nothing about making money. In eight weeks, profit or loss is mostly luck. You're testing reliability and honesty.

## Compare paper with the backtest

At the end, rerun your backtest on exactly the paper period. If the backtest says three trades and the bot made seven, something differs: data, timing, or a bug. Track it down before going further.

## The weekly review

:::steps Every weekend
1. **Read the log.** Skim `logs/bot.log` for warnings and errors.
2. **Reconcile.** Compare the bot's trade log with the broker's order history. They should match one for one.
3. **Check limits.** Did any risk rule fire? Was it correct?
4. **Note surprises.** Write one line per surprise in a journal.
5. **Change at most one thing.** And only with a test proving the fix.
:::

```prompt
Here is a week of my bot's log and the broker's order history:
[paste both]. Do they match exactly? List any order in one but not
the other, any errors, and anything that looks unusual.
```

:::checklist
- I wrote pass criteria before starting
- My bot ran on paper for at least eight weeks
- Broker history and my trade log match exactly
- I compared paper results with a backtest of the same period
- Every criterion is ticked, or I've fixed the cause and restarted the clock
:::

