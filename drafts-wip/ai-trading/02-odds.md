# The Honest Odds and Risks

Before you write a line of code, you deserve the truth about the game you're joining. This isn't meant to scare you off. It's meant to set your expectations so that a bad week doesn't feel like a betrayal and a good week doesn't make you reckless.

:::summary In this chapter
- What the research says about active traders
- Why the odds are tilted against short-term trading
- The specific risks a bot adds
- How to define "success" in a way you can actually win
:::

## What the studies found

Researchers have studied millions of real trading accounts. The results are remarkably consistent:

| Study | What they looked at | Finding |
|---|---|---|
| Barber & Odean, *Journal of Finance* (2000) | 66,465 U.S. households, 1991–1996 | The most active traders earned 11.4% a year while the market returned 17.9% |
| Barber, Lee, Liu & Odean, *Review of Financial Studies* (2009) | Every individual investor in Taiwan | Individuals' trading cost them 3.8 percentage points a year in aggregate |
| Barber, Lee, Liu & Odean, *Journal of Financial Markets* (2014) | Taiwanese day traders, 1992–2006 | Less than 1% could predictably and reliably earn positive returns after fees |
| Chague, De-Losso & Giovannetti (2019) | Everyone who started day trading Brazilian futures, 2013–2015 | 97% of those who kept going over 300 days lost money; only 1.1% earned more than minimum wage |

**Day trading** means opening and closing positions within the same day. The Brazilian study is especially sobering because it followed *persistent* traders, the people who stuck with it. Practice didn't save them; the authors found no evidence that day traders learn their way into profit.

> [!IMPORTANT]
> These studies are about humans clicking buttons, but a bot doesn't escape the same forces. It pays the same costs, competes against the same professionals, and faces the same randomness. Automation removes emotional mistakes. It doesn't create an edge.

## Why the odds are tilted

- **Costs add up.** Even "commission-free" trading has a **spread** (the gap between the buying price and the selling price), small regulatory fees, and **slippage** (getting a slightly worse price than you expected). Crypto exchanges charge explicit fees on every trade. A strategy that trades daily pays these hundreds of times a year.
- **You're trading against professionals.** Big firms have faster computers, better data, and teams of PhDs. In short-term trading, you're often the slowest player at the table.
- **Taxes.** In the U.S., profits on things held a year or less are taxed at your ordinary income rate, usually higher than the rate on long-term gains (Chapter 3).
- **Randomness looks like skill.** Over a few months, luck dominates. A coin-flipping strategy can look brilliant for a while.
- **Even professionals struggle.** S&P Dow Jones Indices' long-running SPIVA reports find that most actively managed funds trail their benchmark index over long periods.

## The extra risks a bot brings

| Risk | What it looks like | Your defense (chapter) |
|---|---|---|
| Bugs | A typo buys 100 shares instead of 10 | Tests, size caps (13, 15) |
| Runaway loops | The bot re-sends the same order every minute | Order limits per run (13) |
| Bad data | A price glitch triggers a sell | Sanity checks (8) |
| Outages | Your server or the broker is down | Alerts, heartbeat (17) |
| Overfitting | Rules tuned to the past fail in the future | Walk-forward testing (11) |
| Stolen keys | Someone uses your API key | Trade-only keys, IP limits (7) |
| AI mistakes | A model misreads news or invents facts | AI as a filter only, guardrails (10) |

## Nothing guarantees profit

Say it out loud once: *there is no strategy, bot, AI model, course, or signal group that guarantees profits.* Anyone who promises otherwise is either mistaken or running a scam (Chapter 20 shows the warning signs). Regulators at the SEC, FINRA, and the North American Securities Administrators Association issued a joint alert warning about platforms claiming their AI "can't lose" or picks "guaranteed" winners.

## A definition of success you can win

You can't control returns. You *can* control process. For your first year, define success like this:

:::checklist
- I built a bot I understand line by line
- It ran for months without a single unintended trade
- Its live results stayed close to its paper results
- My worst day lost less than the limit I set in advance
- I never added money I couldn't afford to lose
- I learned enough to judge new strategies sceptically
:::

That's a genuinely valuable outcome even if the bot only matches, or slightly trails, simply buying and holding an index fund. Many people who go through this process end up running a calm, automated **DCA** (regular-investment) or **rebalancing** bot, which is a perfectly good result. Those bots are covered first in Chapter 9.

> [!CAUTION]
> Only trade money you can afford to lose completely. Not your emergency fund, not rent, not borrowed money. If losing the whole amount would change your life, the amount is too big.

## Before you continue

:::checklist
- I've read the research and accept that most active traders lose
- I've chosen an amount I could lose without real harm
- I'm committed to paper trading first
- My goal for year one is a safe, well-tested process
:::

