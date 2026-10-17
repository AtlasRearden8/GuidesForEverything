# Backtesting Step by Step

A **backtest** replays your strategy over historical prices to see how it *would* have done. It's the cheapest way to throw away bad ideas. It's also the easiest place to fool yourself, so this chapter spends as long on the traps as on the code.

:::summary In this chapter
- Downloading history and saving it to a file
- A from-scratch backtest in pandas, with costs
- The numbers that matter: CAGR, drawdown, Sharpe
- The same test in vectorbt; a note on backtrader
- Overfitting, look-ahead bias, and walk-forward testing
:::

## Step 1: Save history to a file

Download once, then test as often as you like without hitting the API:

```python title=download.py
import os
from datetime import datetime
from dotenv import load_dotenv
from alpaca.data.historical import StockHistoricalDataClient
from alpaca.data.requests import StockBarsRequest
from alpaca.data.timeframe import TimeFrame
from alpaca.data.enums import Adjustment

load_dotenv()
client = StockHistoricalDataClient(os.environ["ALPACA_API_KEY"],
                                   os.environ["ALPACA_SECRET_KEY"])
req = StockBarsRequest(
    symbol_or_symbols=["SPY", "QQQ", "IWM", "EFA", "TLT", "GLD"],
    timeframe=TimeFrame.Day,
    start=datetime(2016, 1, 1),
    adjustment=Adjustment.ALL,
)
closes = client.get_stock_bars(req).df["close"].unstack(level=0)
closes.index = closes.index.date
closes.to_csv("closes.csv")
print(closes.shape, "saved")
```

## Step 2: A backtest in pandas

The idea: compute the signal each day, hold the position **from the next day**, and charge costs whenever the position changes.

```python title=backtest.py
import pandas as pd


def backtest_ma(close: pd.Series, fast=50, slow=200,
                cost=0.001) -> pd.Series:
    """Daily equity curve of the MA strategy, starting at 1.0.

    cost: fraction lost per trade (fees + slippage), 0.1% here.
    """
    fast_ma = close.rolling(fast).mean()
    slow_ma = close.rolling(slow).mean()
    signal = (fast_ma > slow_ma).astype(int)
    position = signal.shift(1).fillna(0)     # act the NEXT day
    daily_ret = close.pct_change().fillna(0)
    trades = position.diff().abs().fillna(0)
    strat_ret = position * daily_ret - trades * cost
    return (1 + strat_ret).cumprod()
```

Line by line:

- `signal` is 1 on days the fast average is above the slow one, else 0.
- `shift(1)` moves the signal forward one day. You only know today's close *after* the market shuts, so the earliest you can act is tomorrow. Forgetting this is called **look-ahead bias**, the most common backtest bug.
- `daily_ret` is each day's percentage change.
- `trades` is 1 on days the position changes; each change costs `cost`.
- `cumprod()` compounds the daily returns into an **equity curve**: what $1 grew into.

## Step 3: Measure it

```python title=stats.py
import numpy as np


def stats(equity: pd.Series) -> dict:
    days = len(equity)
    years = days / 252
    cagr = equity.iloc[-1] ** (1 / years) - 1
    peak = equity.cummax()
    max_dd = (equity / peak - 1).min()
    ret = equity.pct_change().dropna()
    sharpe = np.sqrt(252) * ret.mean() / ret.std()
    return {"CAGR": round(cagr, 4), "MaxDD": round(max_dd, 4),
            "Sharpe": round(sharpe, 2)}
```

| Number | Meaning | Rough guide |
|---|---|---|
| **CAGR** | Compound annual growth rate: the average yearly return | Compare with buy-and-hold |
| **Max drawdown** | Worst fall from a peak, e.g. −0.33 = −33% | Could you sit through it? |
| **Sharpe ratio** | Return per unit of volatility (ignoring the risk-free rate here) | Above 1 is good; above 2 is suspicious |

Now compare with simply holding:

```python
closes = pd.read_csv("closes.csv", index_col=0, parse_dates=True)
spy = closes["SPY"].dropna()
strategy = backtest_ma(spy)
hold = spy / spy.iloc[0]
print("Strategy:", stats(strategy))
print("Buy&hold:", stats(hold))
```

> [!IMPORTANT]
> Always compare against a **benchmark**, usually buy-and-hold of the same fund. A strategy that made 9% a year sounds good until you learn holding made 13%. Trend strategies often earn *less* than holding but with smaller drawdowns. Whether that trade-off suits you is a personal decision.

## Step 4: The same test in vectorbt

**vectorbt** is a fast open-source backtesting library (`pip install vectorbt`; it needs Python 3.11 or newer). Once you understand the pandas version, it saves time:

```python
import vectorbt as vbt

fast = vbt.MA.run(spy, 50)
slow = vbt.MA.run(spy, 200)
entries = fast.ma_crossed_above(slow).vbt.fshift(1)
exits = fast.ma_crossed_below(slow).vbt.fshift(1)

pf = vbt.Portfolio.from_signals(
    spy, entries, exits,
    init_cash=10_000, fees=0.0005, slippage=0.0005, freq="1D",
)
print(pf.stats())
```

`fshift(1)` shifts the signals forward a day, for the same look-ahead reason as before. `fees` and `slippage` are fractions per trade.

> [!NOTE]
> You'll see **backtrader** in many tutorials. It works, but its last release was in April 2023, so expect rough edges with new Python versions. **backtesting.py** (`pip install backtesting`) is another simple option; note its AGPL licence if you ever plan to distribute your code.

## The traps

### Fees and slippage

Real fills are worse than the closing price. Include at least 0.05%–0.1% per trade for liquid ETFs, more for crypto (where the explicit fee alone can be 0.25% at Alpaca's lowest tier). Rerun your test at double the costs: if the strategy dies, it was never robust.

### Overfitting

**Overfitting** means tuning rules until they fit the past perfectly, including its random noise. If you try 500 combinations of averages and keep the best, the best one is probably lucky.

Warning signs:

- Results change a lot when you nudge a parameter (49 days great, 51 days terrible)
- Very few trades
- A Sharpe ratio above 2 on daily data
- Works on one fund only

### Look-ahead and survivorship bias

**Look-ahead bias** is using information you wouldn't have had: same-day closes, revised data, or future index membership. **Survivorship bias** is testing only on companies that exist today, ignoring the ones that went bust. ETFs on broad indexes reduce, but don't remove, both problems.

## Walk-forward testing

**Walk-forward testing** mimics real life: pick parameters using only the past, then test them on the next, unseen period, and roll forward.

```python title=walkforward.py
def walk_forward(close, fasts=(20, 50, 100), slows=(150, 200),
                 train_years=3, test_years=1):
    results = []
    start = close.index[0].year
    end = close.index[-1].year
    for y in range(start + train_years, end + 1, test_years):
        train = close[str(y - train_years):str(y - 1)]
        best = max(((f, s) for f in fasts for s in slows if f < s),
                   key=lambda p: backtest_ma(train, *p).iloc[-1])
        window = close[str(y - 1):str(y)]      # warm-up + test year
        eq = backtest_ma(window, *best)
        test_eq = eq[str(y)] / eq[str(y)].iloc[0]
        results.append((y, best, round(test_eq.iloc[-1] - 1, 4)))
    return results
```

Each row shows a year, the parameters chosen *before* it, and how they did *in* it. Only the out-of-sample years count. If those years look much worse than your original backtest, you were overfitting.

> [!TIP]
> Simple rules with few parameters, tested on many symbols and many years, are the ones most likely to survive contact with the future.

```prompt
Here's my backtest code: [paste]. Check it for look-ahead bias,
missing costs, and any way it uses information from the future.
Explain each problem in plain English and show the fix.
```

:::checklist
- I have a saved price file and a working pandas backtest
- My backtest acts the day after the signal and charges costs
- I compared it with buy-and-hold
- I reran it with double costs and nearby parameters
- I ran a walk-forward test and judged the out-of-sample years
:::

