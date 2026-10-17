---
title: Autonomous AI Trading
subtitle: Build, test, and run a hands-off trading bot, step by step
volume: 10
edition: October 2026
kicker: A Beginner’s Manual
audience: For complete beginners
accent: "#0F8A5F"
accent2: "#E3A008"
motif: blocks
blurb: |
  This manual walks you, one small step at a time, from "I have never written code" to a **trading bot that runs by itself**: it wakes up on a schedule, reads market data, decides, checks its own safety rules, places orders through a broker's API, writes a log, and sends you a daily report. You'll build it in Python with an AI assistant (Claude Code) as your pair programmer, test it on years of history, and run it on **paper money** for weeks before a single real dollar is involved.

  It is also an honest book. Most people who trade actively lose money, and no bot, AI model, or course can guarantee a profit. You'll see the real studies, learn the legal and tax basics, and build the guardrails (position limits, stop-losses, daily loss limits and a kill switch) that keep a mistake small. The goal is a calm, well-tested system you understand, sized so that even its worst day is one you can shrug off.
disclaimer: This manual is education, not financial, legal, or tax advice. Trading involves risk, including the loss of all money you put in; past and simulated results do not predict future returns. Only trade money you can afford to lose, and paper-trade first. Broker features, fees, rules, and tax law were checked against official sources in October 2026 and change often; confirm current details with your broker, the IRS, FINRA, the SEC, or a qualified professional before acting.
---

# Strategies in Plain English

A **strategy** is a set of rules precise enough that a computer can follow them without asking you. This chapter covers six classic beginner strategies, from the safest to the most active, each with plain-English rules and a short Python function. None of them is a secret money machine; each works in some markets and fails in others.

:::summary In this chapter
- DCA and rebalancing bots: the safest autonomous start
- Moving-average trend following
- Mean reversion
- Momentum
- Grid bots for crypto
- How to choose
:::

## 1. Dollar-cost averaging (DCA)

**Rule:** Every week (or month), buy a fixed dollar amount of the same fund, no matter the price.

**Dollar-cost averaging** doesn't try to predict anything. When prices are low, your fixed amount buys more shares; when high, fewer. It's the simplest useful bot, and a great first project because there's almost nothing to go wrong.

```python title=dca.py
from alpaca.trading.requests import MarketOrderRequest
from alpaca.trading.enums import OrderSide, TimeInForce


def dca_buy(trading, symbol: str, dollars: float):
    """Buy a fixed dollar amount (fractional shares allowed)."""
    order = MarketOrderRequest(
        symbol=symbol,
        notional=dollars,          # dollars, not shares
        side=OrderSide.BUY,
        time_in_force=TimeInForce.DAY,
    )
    return trading.submit_order(order)
```

`notional` means "spend this many dollars." Alpaca then buys a **fractional share** (part of a share) if needed. Fractional dollar orders use a `DAY` time in force: the order is valid only for that trading day.

## 2. Rebalancing

**Rule:** Keep a fixed mix, say 60% stocks and 40% bonds. When the mix drifts more than 5 percentage points from target, trade back to it.

**Rebalancing** quietly sells what has risen and buys what has fallen. It's a classic, low-turnover approach and an excellent autonomous bot.

```python title=rebalance.py
def rebalance_plan(values: dict, targets: dict, band=0.05):
    """Return {symbol: dollars to buy (+) or sell (-)}.

    values:  current dollar value held of each symbol
    targets: desired weights that add up to 1.0
    """
    total = sum(values.values())
    plan = {}
    for sym, weight in targets.items():
        current = values.get(sym, 0.0)
        drift = current / total - weight if total else -weight
        if abs(drift) > band:
            plan[sym] = round(weight * total - current, 2)
    return plan
```

Example: you hold $7,000 of VTI and $3,000 of BND, targeting 60/40. VTI is at 70%, ten points over, so the plan says sell $1,000 of VTI and buy $1,000 of BND.

```python
>>> rebalance_plan({"VTI": 7000, "BND": 3000}, {"VTI": .6, "BND": .4})
{'VTI': -1000.0, 'BND': 1000.0}
```

> [!TIP]
> DCA and rebalancing are the safest autonomous start. Many readers should build one of these first, run it for a few months, and only then move on to signal-based strategies.

## 3. Moving-average trend following

**Rule:** Own the fund when its 50-day average price is above its 200-day average. Otherwise hold cash.

A **moving average** (MA) is the average closing price over the last N days, recalculated each day. **Trend following** assumes that prices that have been rising tend to keep rising for a while. The 50/200 crossover is slow and trades only a few times a year. Its goal is to sidestep long, deep declines, at the cost of being late on both the way in and the way out, and of getting "whipsawed" in choppy markets.

```python title=signals.py
import pandas as pd


def trend_signal(closes: pd.Series, fast=50, slow=200) -> str:
    """'BUY' if the fast average is above the slow one, else 'SELL'.
    Returns 'HOLD' if there isn't enough history yet."""
    closes = closes.dropna()
    if len(closes) < slow:
        return "HOLD"
    fast_ma = closes.rolling(fast).mean().iloc[-1]
    slow_ma = closes.rolling(slow).mean().iloc[-1]
    return "BUY" if fast_ma > slow_ma else "SELL"
```

`rolling(50).mean()` computes the 50-day moving average for every day; `.iloc[-1]` takes the latest one. This is the strategy your full bot uses in Chapters 14 and 15.

## 4. Mean reversion

**Rule:** When a fund falls unusually far below its recent average, buy; sell when it returns to the average.

**Mean reversion** bets that stretched prices snap back. A common measure is the **z-score**: how many standard deviations today's price is from its 20-day average. (**Standard deviation** measures how spread out prices usually are.)

```python
def zscore_signal(closes: pd.Series, window=20, entry=-2.0) -> str:
    """'BUY' when price is unusually low, 'SELL' when back to normal."""
    closes = closes.dropna()
    if len(closes) < window:
        return "HOLD"
    recent = closes.iloc[-window:]
    z = (closes.iloc[-1] - recent.mean()) / recent.std()
    if z <= entry:
        return "BUY"
    if z >= 0:
        return "SELL"
    return "HOLD"
```

> [!WARNING]
> Mean reversion fails badly when a drop is the start of a real collapse. Always pair it with a stop-loss (Chapter 13), and use it on diversified ETFs, not single companies.

## 5. Momentum

**Rule:** Once a month, rank your watchlist by its return over the past 12 months, skipping the most recent month. Hold the top two.

**Momentum** compares assets with each other: the recent winners tend to keep outperforming for a while. Skipping the last month avoids short-term reversals.

```python
def momentum_picks(closes: pd.DataFrame, top_n=2,
                   lookback=252, skip=21) -> list[str]:
    """Symbols with the best 12-1 month return."""
    if len(closes) < lookback:
        return []
    past = closes.iloc[-lookback]
    recent = closes.iloc[-skip]
    returns = (recent / past - 1).dropna()
    return list(returns.sort_values(ascending=False).index[:top_n])
```

There are about 252 trading days in a year and 21 in a month, which is where those numbers come from.

## 6. Grid bots (crypto)

**Rule:** Place buy orders at evenly spaced prices below the current price and sell orders above it. Each time a buy fills, place a sell one level higher.

A **grid bot** profits from prices bouncing up and down within a range. It's popular on crypto exchanges.

```python
def grid_levels(low: float, high: float, n: int) -> list[float]:
    """n+1 evenly spaced prices from low to high."""
    step = (high - low) / n
    return [round(low + i * step, 2) for i in range(n + 1)]

# grid_levels(60000, 70000, 5)
# -> [60000.0, 62000.0, 64000.0, 66000.0, 68000.0, 70000.0]
```

> [!CAUTION]
> Grid bots have a nasty failure mode: if the price falls out of the bottom of your range and keeps going, you end up holding a pile of coins bought all the way down. Decide in advance what the bot does below the range (usually: stop and alert you), and make sure fees are smaller than the gap between levels.

## Choosing your first strategy

| Strategy | Trades/year | Hardest part | Beginner fit |
|---|---|---|---|
| DCA | 12–52 | Nothing | Best |
| Rebalancing | 1–4 | Cash flows | Best |
| MA trend | 2–6 per symbol | Whipsaws | Very good |
| Mean reversion | 10–30 | Falling knives | Okay with stops |
| Momentum | 12 rebalances | Turnover, taxes | Good |
| Grid | Many | Breakouts, fees | Later |

> [!NOTE]
> A strategy's rules are only a hypothesis. Chapter 11 shows you how to test whether a strategy *would* have worked, and why "would have" is a weaker promise than it sounds.

```prompt
Explain the 50/200-day moving-average strategy to a beginner. Then
list three market conditions where it tends to lose money, with a
historical example of each. Be honest about its weaknesses.
```

:::checklist
- I can describe each strategy's rule in one sentence
- I understand why DCA and rebalancing are the safest start
- I've chosen a first strategy to test (the MA trend is the default here)
- I know each strategy's main way of failing
:::

# Glossary {.unnumbered}

:::glossary
API
: Application programming interface: a doorway that lets one program talk to another, such as your bot talking to your broker.

API key
: A pair of secret codes (key ID and secret) that lets a program act on your account.

Adjusted prices
: Historical prices rewritten to remove the effect of stock splits and dividends.

AI agent
: An AI that can take actions, such as placing orders, not just answer questions.

Atomic write
: Saving a file by writing a temporary copy and swapping it in, so the file is never half-written.

Backtest
: Replaying a strategy on historical prices to see how it would have performed.

Bar
: A summary of trading over a period (open, high, low, close, volume). Also called a candle.

Benchmark
: What you compare a strategy with, usually buying and holding the same fund.

Bracket order
: An entry order plus a take-profit and a stop-loss that activate when it fills.

Broker
: A company that holds your investment account and sends your orders to the market.

CAGR
: Compound annual growth rate: the average yearly return, with compounding.

Cash account
: A brokerage account where you can only buy with deposited money; no borrowing.

Circuit breaker
: A rule that halts the bot when results suggest something is wrong, such as a large drawdown.

Client order ID
: Your own label attached to an order, so you can trace it back to a specific run.

cron
: The classic Linux scheduler that runs commands at set times.

Crypto exchange
: A company that runs a marketplace for cryptocurrencies, usually holding your coins.

CSV
: Comma-separated values: a plain-text table that opens in any spreadsheet.

Daily loss limit
: A rule that stops trading for the day after the account falls a set percentage.

Dataclass
: A Python container for a group of related settings or values.

DataFrame
: A pandas table of rows and columns, used for prices and calculations.

Day trading
: Opening and closing positions within the same trading day.

Digital assets question
: The yes/no question about crypto on U.S. federal tax returns.

Digital commodity
: A crypto asset, such as bitcoin, that the SEC and CFTC treat as a commodity rather than a security.

Dividend
: A cash payment a company or fund makes to its shareholders.

Dollar-cost averaging (DCA)
: Buying a fixed dollar amount at regular intervals regardless of price.

Drawdown
: The fall from an account's or strategy's highest value to a later low.

Dry run
: Running the bot so it makes and logs decisions without sending any orders.

Equity curve
: A chart or series showing how an account's value changed over time.

ETF
: Exchange-traded fund: a basket of investments that trades like a single stock.

Form 1099-DA
: The IRS form crypto brokers use to report your digital asset sales.

Fractional share
: Part of one share, bought by specifying a dollar amount.

Free-riding
: Buying and selling a security in a cash account before paying for it; can lead to a 90-day restriction.

GTC
: Good-till-cancelled: an order that stays open until filled or cancelled (Alpaca cancels them after 90 days).

Good faith violation
: Selling a security bought with unsettled funds before those funds settle, in a cash account.

Grid bot
: A bot that places buy and sell orders at evenly spaced prices to profit from price swings in a range.

Guardrail
: A rule that keeps a component's mistakes harmless, such as defaulting an unexpected AI answer to "neutral."

Heartbeat
: A check that the bot actually ran, so silent failures are noticed.

IEX
: Investors Exchange, a single U.S. stock exchange whose real-time data Alpaca provides free.

Intraday margin standards
: FINRA's 2026 replacement for the pattern day trader rules, based on exposure during the day.

IP allowlist
: A setting that only accepts an API key from listed internet addresses. Also called whitelisting.

Kill switch
: A way to stop the bot and close all positions immediately.

Large language model (LLM)
: An AI model that reads and writes text, such as Claude.

Least privilege
: Giving each key or tool only the permissions it truly needs.

Leverage
: Controlling a larger position than your deposit, magnifying gains and losses.

Liquidity
: How easily something can be bought or sold without moving its price.

Look-ahead bias
: A backtest error that uses information you wouldn't have had at the time.

Machine learning (ML)
: Letting a program find patterns in data instead of writing rules by hand.

Maker / taker
: A maker order waits on the order book and adds liquidity; a taker order fills immediately. Fees often differ.

Margin account
: A brokerage account that lets you borrow to buy or sell short.

Market data
: Prices and volumes coming from exchanges.

Market order
: An order to buy or sell immediately at the best available price.

MCP
: Model Context Protocol: a standard way to connect AI apps to outside tools such as a broker.

Mean reversion
: A strategy betting that unusually stretched prices return toward their average.

Momentum
: A strategy that buys recent relative winners, expecting them to keep outperforming for a while.

Moving average
: The average price over the last N days, recalculated daily.

Notional order
: An order specified in dollars rather than shares.

OHLCV
: Open, high, low, close, volume: the five numbers in a price bar.

Order
: An instruction to your broker to buy or sell.

OTO order
: One-triggers-other: an entry order that activates a second order (such as a stop-loss) when it fills.

Overfitting
: Tuning rules so closely to past data that they capture noise and fail on new data.

Paper trading
: Simulated trading with fake money against real prices.

Pattern day trader (PDT)
: A former FINRA designation for frequent day traders in margin accounts, with a $25,000 minimum; replaced in 2026.

Position
: The amount of a particular investment you currently hold.

Position sizing
: Deciding how much to buy, for example with the 1–2% risk rule.

Prompt injection
: Hidden text that tries to trick an AI into doing something it shouldn't.

Pure function
: A function that only uses its inputs and returns an answer, with no network or file access.

Rebalancing
: Trading back to a target mix of investments when it drifts.

Risk rules
: Code that can veto a trade, such as size limits and loss limits.

Rotating log
: A log file that starts a new file at a size limit and keeps only a few old ones.

Sandbox
: A test version of an API; some simulate trading, others return canned answers.

Settlement
: When a trade officially completes and cash or shares change hands; T+1 for most U.S. stocks.

Sharpe ratio
: Return divided by volatility; a measure of return per unit of risk.

Short-term capital gain
: Profit on an asset held one year or less; taxed as ordinary income in the U.S.

Short selling
: Selling borrowed shares to profit if the price falls; requires margin.

SIP
: Securities information processor: the combined data feed of all U.S. exchanges.

SIPC
: Securities Investor Protection Corporation: protects customers if a member brokerage fails, up to $500,000 including $250,000 cash.

Slippage
: The difference between the price you expected and the price you got.

Spot
: Buying the actual asset (such as a coin) rather than a contract about it.

Spread
: The gap between the best buying and selling prices.

Standard deviation
: A measure of how spread out values are around their average.

State file
: A small file where the bot remembers things between runs.

Stop-loss
: An order that sells automatically if the price falls to a chosen level.

Strategy
: Written rules precise enough for a computer to follow.

Survivorship bias
: Testing only on assets that still exist, ignoring those that failed.

systemd timer
: A Linux scheduler built into Ubuntu that can catch up on missed runs.

T+1
: Settlement one business day after the trade date.

Terminal
: A window for typing commands instead of clicking.

Timeframe
: How often the bot looks at prices and can trade (daily, hourly, and so on).

TOML
: A simple settings file format of names and values.

Trend following
: A strategy that holds assets while their prices are trending up.

Virtual environment
: A private set of Python libraries for one project.

VM
: Virtual machine: a rented computer in a data centre.

Walk-forward testing
: Choosing parameters on past data, testing them on the next unseen period, and rolling forward.

Wash sale
: Selling at a loss and buying substantially identical securities within 30 days before or after; the loss is deferred.

Watchlist
: The short list of symbols the bot is allowed to trade.

Z-score
: How many standard deviations a value is from its average.
:::
