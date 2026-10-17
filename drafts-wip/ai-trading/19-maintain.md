# Maintaining and Improving It

A bot isn't finished when it first runs. Libraries update, brokers change their APIs, markets change character, and your own ideas evolve. A little routine maintenance keeps it trustworthy.

:::summary In this chapter
- Daily, weekly, monthly and yearly routines
- Updating libraries safely
- Changing the strategy without fooling yourself
- Using Claude Code for reviews and upgrades
:::

## Routines

| When | Task |
|---|---|
| Daily | Read the daily report; act on any alert |
| Weekly | Skim the log; reconcile trade log with broker history |
| Monthly | Check stops still exist (GTC orders expire after 90 days at Alpaca); review costs and slippage |
| Quarterly | Rotate API keys; update libraries; rerun tests and backtests |
| Yearly | Download tax forms; archive logs; reread your stop rules |

## Updating libraries safely

`alpaca-py` and other libraries change over time, and an update can rename something your bot uses. Update on your own computer first, never directly on the server:

:::steps Upgrade safely
1. **Create a branch.** `git checkout -b upgrade-libs`.
2. **Upgrade.** `pip install --upgrade alpaca-py pandas`, then `pip freeze > requirements.txt`.
3. **Read the changelog.** Look for "breaking changes" in the library's release notes.
4. **Test.** `python -m pytest -q` and `python -m bot.main --dry-run`.
5. **Paper first.** Run the upgraded bot on paper for a week.
6. **Deploy.** Merge, pull on the server, reinstall from `requirements.txt`.
:::

## Changing the strategy

Every change is a new hypothesis. Treat it the same way as the first one: backtest with costs, walk-forward test, then paper trade before it goes live. Keep a **change log**: date, what changed, why, and the evidence.

> [!WARNING]
> The most dangerous moment is right after a losing streak, when you're tempted to tweak parameters until the recent past looks good. That's overfitting in real time. Decide changes on weekends, with data, never during market hours.

## Ideas for improvement

- **More symbols, same rules.** Diversification is the closest thing to a free lunch.
- **A volatility filter.** Size positions smaller when markets are jumpy.
- **A second, uncorrelated bot.** For example a rebalancing bot alongside the trend bot, each with its own budget.
- **Better fills.** Use limit orders near the current price instead of market orders.
- **The AI news filter** from Chapter 10, tested on paper first.

## Claude Code as your maintenance partner

```prompt
Review this whole repository as a cautious senior engineer. Find
bugs, unhandled errors, and any path where an order could be sent
without passing bot/risk.py. Rank issues by danger. Don't change
any files yet.
```

```prompt
alpaca-py has a new version. Read its changelog and the current docs,
check every alpaca import and call in this repo, and list anything
that changed. Then run the tests.
```

```prompt
Add a new risk rule: skip new buys when the symbol's 20-day volatility
is above 3% per day. Put it in bot/risk.py, add it to config.toml,
write pytest tests first, then the code. Show me the diff.
```

:::checklist
- I have a written routine and I follow it
- Library upgrades go through tests and paper first
- Strategy changes go through backtest, walk-forward, then paper
- I keep a change log
:::

