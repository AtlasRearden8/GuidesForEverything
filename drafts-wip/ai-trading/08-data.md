# Market Data

Your bot can only be as good as the prices it sees. **Market data** is the stream of prices and trading volume coming out of the exchanges. In this chapter you'll download your first prices, understand what they mean, and learn how data goes wrong.

:::summary In this chapter
- Bars, OHLCV, and timeframes
- Feeds: IEX versus SIP
- Downloading daily bars with `alpaca-py`
- Adjusted prices, missing data, and sanity checks
:::

## Bars and OHLCV

Prices are usually grouped into **bars** (also called candles). A daily bar summarises one trading day with five numbers, known as **OHLCV**:

| Field | Meaning |
|---|---|
| Open | First trade price of the period |
| High | Highest price |
| Low | Lowest price |
| Close | Last trade price |
| Volume | How many shares traded |

The bot in this manual uses **daily closes**: one number per day per symbol.

## Feeds: IEX and SIP

U.S. stocks trade on many exchanges at once. The **SIP** (securities information processor) combines all of them. **IEX** is a single exchange. Alpaca's free Basic plan gives you real-time IEX data, while for historical requests it can serve full SIP data as long as you don't ask for the most recent 15 minutes. For a daily bot that reads *yesterday's* closes, the free plan is plenty.

## Your first data script

Create a file named `hello_data.py`:

```python title=hello_data.py
import os
from datetime import datetime, timedelta, timezone

from dotenv import load_dotenv
from alpaca.data.historical import StockHistoricalDataClient
from alpaca.data.requests import StockBarsRequest
from alpaca.data.timeframe import TimeFrame
from alpaca.data.enums import Adjustment

load_dotenv()
client = StockHistoricalDataClient(
    os.environ["ALPACA_API_KEY"], os.environ["ALPACA_SECRET_KEY"]
)

request = StockBarsRequest(
    symbol_or_symbols=["SPY", "TLT"],
    timeframe=TimeFrame.Day,
    start=datetime.now(timezone.utc) - timedelta(days=30),
    adjustment=Adjustment.ALL,
)
bars = client.get_stock_bars(request).df
print(bars.tail(10))
```

Run it with `python hello_data.py`. You'll see a table with a two-level index (symbol, then timestamp) and columns including `open`, `high`, `low`, `close`, and `volume`.

What each part does:

- `StockHistoricalDataClient` is the object that talks to Alpaca's data service.
- `StockBarsRequest` describes what you want: which symbols, what bar size, and from when.
- `Adjustment.ALL` asks for prices **adjusted** for stock splits and dividends (explained below).
- `.df` turns the answer into a pandas **DataFrame**, a table you can calculate with.

### Reshape into one column per symbol

Strategies are easier to write when each symbol is its own column:

```python
closes = bars["close"].unstack(level=0)   # rows: dates, cols: symbols
closes.index = closes.index.date          # drop the time of day
print(closes.tail())
```

### Crypto data

Alpaca's crypto data doesn't even need keys:

```python
from alpaca.data.historical import CryptoHistoricalDataClient
from alpaca.data.requests import CryptoBarsRequest

crypto = CryptoHistoricalDataClient()
req = CryptoBarsRequest(
    symbol_or_symbols=["BTC/USD"],
    timeframe=TimeFrame.Day,
    start=datetime.now(timezone.utc) - timedelta(days=30),
)
print(crypto.get_crypto_bars(req).df.tail())
```

Note the slash: Alpaca writes crypto pairs as `BTC/USD`.

## Adjusted prices

When a company does a 4-for-1 **stock split**, the price drops to a quarter overnight, but nobody lost money. Unadjusted data shows a fake 75% crash, and your bot might sell in panic. **Adjusted** data rewrites history to remove that jump, and also accounts for **dividends** (cash payments to shareholders). Always backtest and signal on adjusted prices.

## How data goes wrong

| Problem | Symptom | Defense |
|---|---|---|
| Missing days | Fewer rows than expected | Require a minimum row count |
| Today's partial bar | Last "close" is a mid-day price | Drop today's row before computing signals |
| Bad tick | One absurd price | Reject moves over, say, 25% in a day for an ETF |
| Stale data | Last date is days old | Check the last date is the previous trading day |
| Rate limits | HTTP 429 errors | Fewer requests; ask for many symbols at once |

A quick sanity check you'll reuse in the bot:

```python
def sane(series, max_jump=0.25, min_rows=200):
    """True if a price series looks usable."""
    s = series.dropna()
    if len(s) < min_rows:
        return False
    biggest_move = s.pct_change().abs().max()
    return biggest_move < max_jump
```

> [!WARNING]
> Free, unofficial data sources such as the `yfinance` library are handy for quick experiments, but they scrape public websites, can break without warning, and aren't licensed for every use. For anything your bot trades on, use your broker's official data.

## Other data you might want

- **News:** Alpaca's data API includes news articles for stocks and crypto (used in Chapter 10).
- **Market calendar and clock:** Alpaca's trading API tells you if the market is open and lists trading days and early closes (Chapter 16).
- **Fundamentals and alternative data:** Company earnings, sentiment, and so on. Skip these for your first bot.

:::checklist
- I ran `hello_data.py` and saw real daily bars
- I can reshape bars into one column per symbol
- I use adjusted prices for anything my bot decides with
- I know the five ways data goes wrong and how to check for them
:::

