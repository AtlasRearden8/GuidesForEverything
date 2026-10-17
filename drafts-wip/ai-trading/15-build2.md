# Build the Bot, Part 2: Risk, Orders and the Main Loop

With data and signals in place, you'll now add the parts that keep the bot safe and accountable, then wire everything together into one run.

:::summary In this chapter
- The risk module, assembled
- The state file
- The orders module: buys with stops, clean exits
- Logging and a trade log
- Alerts
- The main loop, a dry-run mode, and tests
:::

## Step 5: The risk module

Put the four parts from Chapter 13 into one file, `bot/risk.py`: `position_size`, `daily_loss_breached`, `drawdown_breached`, `approve_buy`, and `kill_switch_on`. Put the imports (`import math` and `from pathlib import Path`) at the top. Nothing in this file talks to the broker; it only answers yes or no.

## Step 6: The state file

The broker remembers your positions and orders. A few things it doesn't know, such as the account's highest-ever value or whether you halted the bot, go in a small **JSON** file (a common text format for structured data).

```python title=bot/state.py
"""A tiny JSON file that remembers things between runs."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STATE_FILE = ROOT / "state.json"
DEFAULT = {"peak_equity": 0.0, "halted": False,
           "halt_reason": "", "last_run": ""}


def load_state(path: Path = STATE_FILE) -> dict:
    if path.exists():
        return {**DEFAULT, **json.loads(path.read_text())}
    return dict(DEFAULT)


def save_state(state: dict, path: Path = STATE_FILE) -> None:
    tmp = path.with_suffix(".tmp")
    tmp.write_text(json.dumps(state, indent=2))
    tmp.replace(path)   # swap in one step: never half-written
```

Writing to a temporary file and then renaming it is called an **atomic write**. If the server loses power mid-save, you get either the old file or the new one, never a corrupted mix.

Once `halted` is `true`, the bot does nothing until *you* edit the file back to `false` after investigating. That's deliberate.

## Step 7: The orders module

```python title=bot/orders.py
"""The ONLY module allowed to send orders to the broker."""
import time

from alpaca.trading.enums import (OrderClass, OrderSide,
                                  QueryOrderStatus, TimeInForce)
from alpaca.trading.requests import (GetOrdersRequest,
                                     MarketOrderRequest,
                                     StopLossRequest)


def buy_with_stop(trading, symbol, qty, ref_price, stop_pct, tag):
    """Market buy of whole shares plus a broker-side stop-loss."""
    stop_price = round(ref_price * (1 - stop_pct), 2)
    order = MarketOrderRequest(
        symbol=symbol,
        qty=qty,
        side=OrderSide.BUY,
        time_in_force=TimeInForce.GTC,
        order_class=OrderClass.OTO,
        stop_loss=StopLossRequest(stop_price=stop_price),
        client_order_id=f"{tag}-{symbol}-buy",
    )
    return trading.submit_order(order)
```

What's happening:

- An **OTO** order sends the buy and, once it fills, activates the stop-loss at the broker.
- `stop_price` is 8% (your `stop_loss_pct`) below yesterday's close.
- `client_order_id` is *your* label for the order, built from the date, so every order in the broker's history traces back to a specific run. Alpaca treats it as an identifier you supply for each order; using the date means a second run on the same day can't quietly create a look-alike order.

Selling has one wrinkle: the shares are already reserved by the open stop order, so you must cancel it first.

```python title=bot/orders.py (continued)
def cancel_open_orders(trading, symbol, wait_s=10):
    req = GetOrdersRequest(status=QueryOrderStatus.OPEN,
                           symbols=[symbol])
    for o in trading.get_orders(filter=req):
        trading.cancel_order_by_id(o.id)
    for _ in range(wait_s):          # wait for cancels to finish
        if not trading.get_orders(filter=req):
            return
        time.sleep(1)
    raise RuntimeError(f"Open orders for {symbol} did not cancel")


def sell_all(trading, symbol):
    cancel_open_orders(trading, symbol)
    return trading.close_position(symbol)
```

If cancelling takes too long, the function raises an error instead of guessing. The main loop catches it, logs it, and alerts you.

## Step 8: Logging and the trade log

```python title=bot/logs.py
"""Human-readable log plus a CSV trade log for taxes and review."""
import csv
import logging
from datetime import datetime, timezone
from logging.handlers import RotatingFileHandler
from pathlib import Path

LOG_DIR = Path(__file__).resolve().parent.parent / "logs"


def setup_logging():
    LOG_DIR.mkdir(exist_ok=True)
    fmt = "%(asctime)s %(levelname)s %(name)s: %(message)s"
    file = RotatingFileHandler(LOG_DIR / "bot.log",
                               maxBytes=1_000_000, backupCount=5)
    logging.basicConfig(level=logging.INFO, format=fmt,
                        handlers=[file, logging.StreamHandler()])


def record_trade(symbol, side, qty, price, reason, order_id):
    path = LOG_DIR / "trades.csv"
    new = not path.exists()
    with open(path, "a", newline="") as f:
        w = csv.writer(f)
        if new:
            w.writerow(["time_utc", "symbol", "side", "qty",
                        "ref_price", "reason", "order_id"])
        now = datetime.now(timezone.utc).isoformat(timespec="seconds")
        w.writerow([now, symbol, side, qty, price, reason, order_id])
```

A **rotating** log file starts a new file once it reaches about 1 MB and keeps the last five, so logs can never fill your disk. The trade log is a **CSV** (comma-separated values) file you can open in any spreadsheet. Fill prices come from the broker's order history; the trade log records what the bot *intended* and why.

## Step 9: Alerts

```python title=bot/notify.py
"""Send a message to Telegram and/or Slack. Never crash the bot."""
import logging
import os

import requests

log = logging.getLogger(__name__)


def notify(text: str) -> None:
    token = os.getenv("TELEGRAM_BOT_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    slack_url = os.getenv("SLACK_WEBHOOK_URL")
    try:
        if token and chat_id:
            requests.post(
                f"https://api.telegram.org/bot{token}/sendMessage",
                data={"chat_id": chat_id, "text": text}, timeout=10)
        if slack_url:
            requests.post(slack_url, json={"text": text}, timeout=10)
    except requests.RequestException as e:
        log.warning("Alert failed: %s", e)
```

If neither is configured, `notify` silently does nothing; Chapter 17 shows how to get the tokens. A failed alert is logged but never stops trading logic.

## Step 10: The main loop

`bot/main.py` runs once, top to bottom, then exits. The scheduler (Chapter 16) starts it every trading day. First the imports and safety gates:

```python title=bot/main.py
"""One complete run of the bot."""
import argparse
import logging
from datetime import date, datetime, timezone

from alpaca.data.historical import StockHistoricalDataClient
from alpaca.trading.client import TradingClient

from bot import orders, risk
from bot.config import load_settings
from bot.data import get_daily_closes
from bot.logs import record_trade, setup_logging
from bot.notify import notify
from bot.signals import sane, trend_signal
from bot.state import load_state, save_state

log = logging.getLogger("bot")


def halt(state, reason):
    state["halted"], state["halt_reason"] = True, reason
    save_state(state)
    log.error("HALTED: %s", reason)
    notify(f"Bot HALTED: {reason}")
```

Next, the start of `run()`: connect, check the kill switch, the halt flag, the market clock, and the circuit breakers.

```python title=bot/main.py (continued)
def run(dry_run=False):
    s = load_settings()
    rules = s.risk
    state = load_state()
    trading = TradingClient(s.api_key, s.secret_key, paper=s.paper)
    data = StockHistoricalDataClient(s.api_key, s.secret_key)

    if risk.kill_switch_on():
        log.warning("Kill switch ON: closing everything.")
        if not dry_run:
            trading.close_all_positions(cancel_orders=True)
        notify("KILL SWITCH: all orders cancelled, positions closed.")
        return
    if state["halted"]:
        log.warning("Halted earlier: %s", state["halt_reason"])
        return
    clock = trading.get_clock()
    if not clock.is_open:
        log.info("Market closed. Next open: %s", clock.next_open)
        return

    acct = trading.get_account()
    equity, last_eq = float(acct.equity), float(acct.last_equity)
    cash = float(acct.cash)
    state["peak_equity"] = max(state["peak_equity"], equity)
    if risk.daily_loss_breached(equity, last_eq,
                                rules["max_daily_loss_pct"]):
        notify(f"Daily loss limit hit (equity {equity:,.0f}). "
               "No trades today.")
        save_state(state)
        return
    if risk.drawdown_breached(equity, state["peak_equity"],
                              rules["max_drawdown_pct"]):
        return halt(state, f"drawdown limit, equity {equity:,.0f}")
```

Notice the order: the cheapest, most important checks come first. Note that the daily loss limit pauses only for today, while the drawdown breaker halts until you investigate.

Now the decision loop:

```python title=bot/main.py (continued)
    positions = {p.symbol: p for p in trading.get_all_positions()}
    closes = get_daily_closes(data, s.symbols, s.slow_days)
    tag, sent, summary = date.today().isoformat(), 0, []

    for sym in s.symbols:
        if sent >= rules["max_orders_per_run"]:
            log.warning("Order cap reached; stopping for today.")
            break
        if sym not in closes or not sane(closes[sym], s.slow_days):
            log.warning("%s: data failed sanity check, skipped", sym)
            continue
        signal = trend_signal(closes[sym], s.fast_days, s.slow_days)
        price = float(closes[sym].dropna().iloc[-1])
        held = sym in positions
        if signal == "SELL" and held:
            qty = float(positions[sym].qty)
            log.info("%s: SELL %s (trend down)", sym, qty)
            if not dry_run:
                o = orders.sell_all(trading, sym)
                record_trade(sym, "sell", qty, price, "trend", o.id)
            sent += 1
            summary.append(f"SELL {sym}")
```

And the buy branch, which must pass every risk check:

```python title=bot/main.py (continued)
        elif signal == "BUY" and not held:
            qty = risk.position_size(
                equity, price, rules["risk_per_trade"],
                rules["stop_loss_pct"], rules["max_position_pct"])
            ok, why = risk.approve_buy(sym, qty, price, cash,
                                       len(positions), rules,
                                       s.symbols)
            if not ok:
                log.info("%s: buy skipped (%s)", sym, why)
                continue
            log.info("%s: BUY %d @ ~%.2f", sym, qty, price)
            if not dry_run:
                o = orders.buy_with_stop(trading, sym, qty, price,
                                         rules["stop_loss_pct"], tag)
                record_trade(sym, "buy", qty, price, "trend", o.id)
            cash -= qty * price
            positions[sym] = None      # counts toward the limit
            sent += 1
            summary.append(f"BUY {qty} {sym}")
```

Finally, save state, send the summary, and the entry point that catches crashes:

```python title=bot/main.py (continued)
    state["last_run"] = datetime.now(timezone.utc).isoformat()
    save_state(state)
    mode = "DRY RUN" if dry_run else ("PAPER" if s.paper else "LIVE")
    notify(f"[{mode}] equity {equity:,.0f}. "
           + (", ".join(summary) or "No trades."))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true",
                        help="decide and log, but send no orders")
    args = parser.parse_args()
    setup_logging()
    try:
        run(dry_run=args.dry_run)
    except Exception as e:
        logging.getLogger("bot").exception("Run crashed")
        notify(f"Bot CRASHED: {type(e).__name__}: {e}")
        raise
```

Run it from the project folder:

```bash
python -m bot.main --dry-run
```

`--dry-run` makes every decision and logs it but sends no orders. Use it after every change. When the dry run looks right, run it for real on paper with `python -m bot.main`.

> [!NOTE]
> The bot exits early when the market is closed, so running it on a weekend just logs "Market closed." To test the decision logic anyway, temporarily comment out the clock check, run with `--dry-run`, and put it back.

## Step 11: Tests

**Tests** are small programs that check your code gives the right answers. `pytest` finds every file named `test_*.py` and runs every function starting with `test_`.

```python title=tests/test_signals.py
import pandas as pd

from bot.signals import sane, trend_signal


def test_rising_prices_mean_buy():
    s = pd.Series(range(1, 301), dtype=float)
    assert trend_signal(s, 50, 200) == "BUY"


def test_falling_prices_mean_sell():
    s = pd.Series(range(300, 0, -1), dtype=float)
    assert trend_signal(s, 50, 200) == "SELL"


def test_too_little_history_holds():
    s = pd.Series(range(1, 100), dtype=float)
    assert trend_signal(s, 50, 200) == "HOLD"


def test_sanity_rejects_a_crazy_jump():
    s = pd.Series([100.0] * 250 + [300.0])
    assert not sane(s, min_rows=200)
```

```python title=tests/test_risk.py
from bot import risk

RULES = {"max_open_positions": 5, "max_order_dollars": 2500}
OK = ["SPY", "TLT"]


def test_worked_example_gives_two_shares():
    assert risk.position_size(10_000, 500, 0.01, 0.08, 0.20) == 2


def test_cap_limits_size():
    # 1% risk, tiny 1% stop would mean 100 shares; cap allows 4
    assert risk.position_size(10_000, 500, 0.01, 0.01, 0.20) == 4


def test_unknown_symbol_is_refused():
    ok, _ = risk.approve_buy("XYZ", 1, 100, 10_000, 0, RULES, OK)
    assert not ok


def test_order_cap_is_enforced():
    ok, why = risk.approve_buy("SPY", 10, 300, 10_000, 0, RULES, OK)
    assert not ok and "cap" in why


def test_daily_loss_trips_at_three_percent():
    assert risk.daily_loss_breached(9_700, 10_000, 0.03)
    assert not risk.daily_loss_breached(9_800, 10_000, 0.03)
```

Run them all:

```bash
python -m pytest -q
```

You should see every test pass. Run the tests before every change you deploy. If you change a rule, change its test first.

```prompt
Write more pytest tests for bot/risk.py and bot/state.py: zero or
negative prices, missing state file, a corrupted state file, and the
drawdown breaker. Use tmp_path for files. Don't touch other modules.
```

:::checklist
- `bot/risk.py`, `state.py`, `orders.py`, `logs.py`, `notify.py` and `main.py` exist
- `python -m pytest -q` passes
- `python -m bot.main --dry-run` logs a decision for every symbol
- One real paper run placed orders I could see in the Alpaca dashboard
- Each paper buy has a matching stop order
- The kill switch closed everything on paper, and I deleted the file afterwards
:::

