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

