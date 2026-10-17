# Build the Bot, Part 1: Foundations

Now you'll assemble everything into one real, autonomous bot that trades on Alpaca's paper API. It runs once per trading day, follows the 50/200-day trend rule on a small ETF watchlist, and refuses anything its risk rules don't approve. This chapter sets up the project, configuration, data, and signals. Chapter 15 adds risk checks, orders, state, logging, the main loop, and tests.

:::summary In this chapter
- The project layout and why it's split into modules
- `config.toml` and the settings loader
- The data module
- The signal module
- Building it with Claude Code
:::

## The project layout

```text
trading-bot/
├── .env                 # secrets (never committed)
├── .env.example         # names of secrets, no values
├── .gitignore
├── config.toml          # your rules: symbols, risk limits
├── requirements.txt
├── bot/
│   ├── __init__.py      # empty file: marks a Python package
│   ├── config.py        # loads config.toml and .env
│   ├── data.py          # fetches daily prices
│   ├── signals.py       # strategy: BUY / SELL / HOLD
│   ├── risk.py          # every rule that can say no
│   ├── orders.py        # the ONLY code that sends orders
│   ├── state.py         # remembers things between runs
│   ├── notify.py        # Telegram / Slack alerts
│   ├── logs.py          # log file setup and trade log
│   └── main.py          # one run, start to finish
├── tests/
│   ├── test_signals.py
│   └── test_risk.py
└── logs/                # created automatically
```

Why so many files? Each one has one job, so you can test it alone and read it in a minute. Most importantly, **only `orders.py` talks to the broker's order system**. If you ever wonder "what can place a trade?", there's exactly one place to look.

Create the folders and the empty package file:

```bash
mkdir -p bot tests logs
touch bot/__init__.py
```

(On Windows PowerShell, create `bot\__init__.py` as an empty file from VS Code instead of `touch`.)

## Step 1: The config file

Your rules live in a **TOML** file, a simple settings format of names and values that Python can read without extra libraries.

```toml title=config.toml
[bot]
paper = true
symbols = ["SPY", "QQQ", "IWM", "EFA", "TLT", "GLD"]
fast_days = 50
slow_days = 200

[risk]
risk_per_trade = 0.01
stop_loss_pct = 0.08
max_position_pct = 0.20
max_open_positions = 5
max_order_dollars = 2500
max_daily_loss_pct = 0.03
max_drawdown_pct = 0.15
max_orders_per_run = 5
```

Changing your rules means editing this file, not the code. Commit it to Git so every change to your rules is recorded.

## Step 2: The settings loader

```python title=bot/config.py
"""Load rules from config.toml and secrets from .env."""
import os
import tomllib
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent.parent


@dataclass(frozen=True)
class Settings:
    api_key: str
    secret_key: str
    paper: bool
    symbols: list
    fast_days: int
    slow_days: int
    risk: dict
```

A **dataclass** is a tidy container for related values. `frozen=True` means nothing can change the settings by accident while the bot runs.

```python title=bot/config.py (continued)
def load_settings() -> Settings:
    load_dotenv(ROOT / ".env")
    with open(ROOT / "config.toml", "rb") as f:
        cfg = tomllib.load(f)
    paper = cfg["bot"].get("paper", True)
    if not paper and os.getenv("ALLOW_LIVE") != "yes":
        raise SystemExit("Live trading needs ALLOW_LIVE=yes in .env")
    return Settings(
        api_key=os.environ["ALPACA_API_KEY"],
        secret_key=os.environ["ALPACA_SECRET_KEY"],
        paper=paper,
        symbols=cfg["bot"]["symbols"],
        fast_days=cfg["bot"]["fast_days"],
        slow_days=cfg["bot"]["slow_days"],
        risk=cfg["risk"],
    )
```

The `ALLOW_LIVE` check is a **two-key lock**: switching to real money requires changing `config.toml` *and* adding a line to `.env`. One accidental edit isn't enough.

## Step 3: The data module

```python title=bot/data.py
"""Fetch completed daily closes from Alpaca."""
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo

from alpaca.data.enums import Adjustment
from alpaca.data.requests import StockBarsRequest
from alpaca.data.timeframe import TimeFrame

NY = ZoneInfo("America/New_York")


def get_daily_closes(client, symbols, days):
    """DataFrame of closes: one column per symbol, one row per day.
    Today's unfinished bar is dropped."""
    start = datetime.now(timezone.utc) - timedelta(days=int(days * 1.6))
    req = StockBarsRequest(
        symbol_or_symbols=symbols,
        timeframe=TimeFrame.Day,
        start=start,
        adjustment=Adjustment.ALL,
    )
    bars = client.get_stock_bars(req).df
    closes = bars["close"].unstack(level=0)
    closes.index = closes.index.tz_convert(NY).date
    today = datetime.now(NY).date()
    return closes[closes.index < today]
```

Two details worth understanding:

- `days * 1.6` asks for extra calendar days, because 200 *trading* days need roughly 290 calendar days once you skip weekends and holidays.
- The last line drops today's row. The bot runs during the trading day, when today's "close" isn't final yet. Using only completed days keeps the bot identical to the backtest.

## Step 4: The signal module

This is the same function from Chapter 9, plus the sanity check from Chapter 8:

```python title=bot/signals.py
"""Strategy logic. Pure functions: no network, easy to test."""
import pandas as pd


def sane(series: pd.Series, min_rows: int, max_jump=0.25) -> bool:
    s = series.dropna()
    if len(s) < min_rows:
        return False
    return s.pct_change().abs().max() < max_jump


def trend_signal(closes: pd.Series, fast=50, slow=200) -> str:
    closes = closes.dropna()
    if len(closes) < slow:
        return "HOLD"
    fast_ma = closes.rolling(fast).mean().iloc[-1]
    slow_ma = closes.rolling(slow).mean().iloc[-1]
    return "BUY" if fast_ma > slow_ma else "SELL"
```

"Pure function" means it only uses its inputs and returns an answer, without touching the internet, files, or the clock. That's why it's trivial to test.

## Building it with Claude Code

You can type these files yourself, or ask Claude Code to create them, one module at a time:

```prompt
Read CLAUDE.md. Create bot/config.py and config.toml exactly as
described: a frozen Settings dataclass, tomllib for config, dotenv for
secrets, and a two-key lock (paper=false only works if ALLOW_LIVE=yes).
Explain each line for a beginner. Don't create any other files.
```

```prompt
Create bot/data.py with get_daily_closes(client, symbols, days) using
alpaca-py's StockBarsRequest with TimeFrame.Day and Adjustment.ALL.
Drop today's unfinished bar using the America/New_York date. Check
the current alpaca-py docs for class names before writing.
```

> [!TIP]
> After each file, run a quick check before moving on: `python -c "from bot.config import load_settings; print(load_settings().symbols)"`. Small steps make errors easy to find.

:::checklist
- My project has the folder layout above
- `config.toml` holds my symbols and risk limits
- `load_settings()` loads without errors and refuses live mode without `ALLOW_LIVE`
- `get_daily_closes()` returns one column per symbol, ending yesterday
- `trend_signal()` returns BUY, SELL or HOLD
:::

