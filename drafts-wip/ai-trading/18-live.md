# Going Live with Tiny Money

If your bot passed every paper-trading criterion, you've earned the right to try it with real money: a *small* amount. The goal of going live isn't profit yet. It's discovering what paper trading couldn't simulate.

:::summary In this chapter
- The go-live checklist
- Choosing a tiny starting amount
- Switching from paper to live safely
- The first month: what to watch
- When to scale up, and when to stop
:::

## Are you ready?

:::checklist
- Every paper criterion from Chapter 12 is ticked
- The kill switch, daily loss limit and drawdown halt were all tested on paper
- I've reread Chapter 2 and still choose to continue
- The money I'll use could vanish without hurting me or anyone I support
- I have an emergency fund and no high-interest debt
- I know how to close all positions by hand on the broker's website
:::

## How much?

Start with an amount small enough to be boring: many people choose a few hundred dollars. With tiny accounts, two things change:

- **Whole shares get chunky.** A $500 account can't buy a $500 fund with 1% risk. Pick cheaper ETFs, raise `max_position_pct`, or switch the bot to fractional dollar orders (without OTO stops, which need whole shares at Alpaca; your bot's daily check then acts as the exit).
- **Fees matter more on crypto.** A 0.25% fee per trade is 0.5% for a round trip.

> [!CAUTION]
> Never deposit more because the bot is losing ("it's due to come back"), and never raise limits to "win it back." That's how small, survivable losses turn into big ones.

## Switching from paper to live

:::steps Go live safely
1. **Open and fund a live account.** Use a **cash** account. Turn on two-factor authentication.
2. **Create live keys.** Use the most restrictive permissions offered and an IP allowlist if available.
3. **Keep live keys separate.** Put them in the server's `.env` only, replacing the paper keys, and add `ALLOW_LIVE=yes`.
4. **Flip the config.** Set `paper = false` in `config.toml`. The two-key lock now lets the bot run live.
5. **Lower the limits.** Cut `max_order_dollars` to a small number for the first month.
6. **Dry-run on live.** `python -m bot.main --dry-run`. Check the account number and equity in the log are your live account's.
7. **Watch the first real run.** Be at your screen. Confirm each order and stop in the broker's dashboard.
:::

## The first month

Compare every live fill with the price the bot expected (the `ref_price` in your trade log). The difference is your real **slippage**. Also compare live results with your paper account running the same rules in parallel. Keep the paper bot running: it's your control group.

| Watch for | What it means |
|---|---|
| Fills consistently worse than expected | Raise cost assumptions in your backtest |
| Orders rejected | Account permissions, buying power, or settlement |
| Live and paper diverge | Timing, data, or a bug that only shows with real fills |
| Your stress level | If you check your phone hourly, the amount is too big |

## Scaling up, slowly

If, after three months live, the bot ran cleanly and live results tracked paper, you *may* add money in small steps: perhaps double, then wait another three months. Never add money because of a hot streak. And there's no obligation to scale at all.

## When to stop

Write your stop rules now, while you're calm:

```markdown title=stop-rules.md
I will turn the bot off and review if ANY of these happen:
- The drawdown halt fires
- An unintended order is ever placed
- Live results trail paper by more than 3% over 3 months
- I can't explain a trade from the log
- I feel tempted to override it or raise limits
```

Turning a bot off isn't failure. It's the risk system working, with you as its final layer.

:::checklist
- I'm live with an amount I consider boring
- Live keys are trade-only and stored only on the server
- I watched the first live run and confirmed orders and stops
- A paper bot runs in parallel as a control
- I've written my stop rules
:::

