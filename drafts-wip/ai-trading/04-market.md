# Choosing a Market

Where your bot trades matters as much as how. Some markets forgive beginner mistakes; others punish them within minutes. This chapter helps you pick a calm playground.

:::summary In this chapter
- Stocks and ETFs versus spot crypto
- Why to avoid leverage, options, and futures at first
- Picking a starter watchlist
:::

## The two beginner-friendly markets

### Stocks and ETFs

A **stock** (or **share**) is a small piece of ownership in a company. An **ETF** holds many stocks or bonds at once. For a first bot, ETFs are ideal: one ticker gives you hundreds of companies, so a single company's bad news can't sink you.

| Strength | Why it helps a beginner |
|---|---|
| Deep markets | Popular ETFs trade millions of shares a day, so your order barely moves the price |
| Set hours | The bot only needs to run on weekdays (9:30 a.m. to 4:00 p.m. Eastern for the core session) |
| Low costs | $0 commissions at many brokers; tiny spreads on big ETFs |
| Protections | SIPC coverage, regulated brokers |

### Spot crypto

**Spot** means you buy the actual coin, not a contract about it. Crypto is popular for bots because it trades around the clock and has big price swings.

| Strength | Caution |
|---|---|
| Open 24/7 | Your bot must handle nights and weekends |
| Easy to start | Higher fees per trade, often 0.1%–0.6% |
| Big moves | Big moves go both ways; 20% drops happen |
| Many coins | Small coins can be illiquid or manipulated |

> [!TIP]
> Start with stocks/ETFs for your first bot. The fixed hours give you nights and weekends to read logs and fix things. Add crypto later as a second bot with its own budget.

## Leave these for later

| Product | What it is | Why not yet |
|---|---|---|
| **Margin** | Borrowed money | Losses can exceed your deposit |
| **Options** | Contracts giving the right to buy/sell at a set price by a date | Complex pricing; many expire worthless; small bugs get expensive |
| **Futures** | Contracts to buy/sell later, with built-in leverage | One bad day can wipe out an account |
| **Perpetuals** | Crypto futures with no expiry | High leverage, forced liquidations |
| **Forex/CFDs** | Currency and contract-for-difference trading | Heavy leverage; many offshore scams |

**Leverage** means controlling a large position with a small deposit. At 10× leverage, a 10% move against you wipes out 100% of your money. A bot with a bug and leverage can lose everything before you wake up.

> [!CAUTION]
> Several broker APIs and AI connectors can trade options and futures. Turn those permissions off. Your risk module will also reject any symbol that's not on your approved list.

## Pick a starter watchlist

A **watchlist** is the short list of symbols your bot is allowed to trade. Keep it small, liquid, and diversified. A sensible starter list mixes broad U.S. stocks, international stocks, bonds and gold, for example:

| Symbol | What it tracks |
|---|---|
| SPY | 500 large U.S. companies |
| QQQ | 100 large Nasdaq companies |
| IWM | 2,000 smaller U.S. companies |
| EFA | Developed markets outside North America |
| TLT | Long-term U.S. Treasury bonds |
| GLD | Gold |

These are examples to learn with, not recommendations. Whatever you choose, look up each fund's issuer page to see what it holds and what it costs to own (its expense ratio).

For crypto, a starter list is just **BTC/USD** and **ETH/USD**: the two largest and most heavily traded pairs.

## Choose a timeframe

A bot's **timeframe** is how often it looks at prices and can trade.

| Timeframe | Trades per year | Beginner fit |
|---|---|---|
| Monthly | ~12 | Excellent (DCA, rebalancing) |
| Daily | Dozens | Excellent (this manual's main bot) |
| Hourly | Hundreds | Possible later |
| Minutes or seconds | Thousands | Avoid: costs and competition win |

Slower is better while learning. A daily bot gives every trade time to make sense, keeps costs low, and survives a server hiccup without drama.

:::checklist
- My first bot will trade liquid ETFs (or BTC/ETH spot)
- No margin, options, futures, perpetuals or leverage
- I've written a starter watchlist of 3–6 symbols
- My bot will run daily, not every minute
:::

