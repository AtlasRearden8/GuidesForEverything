# Risk Management in Code

Strategies decide what you'd *like* to do. Risk rules decide what you're *allowed* to do. In a well-built bot, the risk module can veto anything, and nothing reaches the broker without passing it. This chapter explains each rule; Chapter 15 puts them in the bot.

:::summary In this chapter
- Position sizing and the 1–2% rule
- Stop-losses
- Daily loss limits and maximum drawdown
- Maximum positions and order caps
- Kill switches and circuit breakers
:::

## Position sizing: the 1–2% rule

**Position sizing** answers "how much do I buy?" The **1–2% rule** says: size each position so that if your stop-loss is hit, you lose no more than 1% (or at most 2%) of your account.

The math:

- **Risk dollars** = account equity × risk per trade
- **Loss per share** = entry price × stop distance
- **Shares** = risk dollars ÷ loss per share

**Worked example.** Account: $10,000. Risk per trade: 1% = $100. Fund price: $500. Stop 8% below entry, so a stop-out loses $40 per share. $100 ÷ $40 = 2.5, rounded **down** to 2 shares. Add a cap too: no single position over 20% of the account ($2,000, or 4 shares). The smaller answer wins: **2 shares**.

```python title=bot/risk.py (part 1)
import math


def position_size(equity, price, risk_pct, stop_pct, max_pos_pct):
    """Whole shares so that a stop-out loses about risk_pct."""
    if price <= 0 or stop_pct <= 0:
        return 0
    by_risk = (equity * risk_pct) / (price * stop_pct)
    by_cap = (equity * max_pos_pct) / price
    return max(0, math.floor(min(by_risk, by_cap)))
```

> [!NOTE]
> Using 1% doesn't mean you can only lose 1% per trade. Prices can **gap** past your stop overnight. It means a *typical* bad trade costs about 1%, so ten losses in a row cost about 10%, not your account.

## Stop-losses

A **stop-loss** (or **stop order**) is an order that sells automatically if the price falls to a level you choose. Your bot places it with the broker at the same time as the buy, so it protects you even if your server is down.

At Alpaca, an **OTO** order (one-triggers-other) submits a buy plus a stop that activates once the buy fills. A **bracket** order adds a take-profit too. Bracket legs must use `day` or `gtc` time in force. **GTC** (good-till-cancelled) orders stay open until filled or cancelled, but Alpaca cancels GTC orders automatically 90 days after creation, so a long-running bot must check its stops still exist.

> [!WARNING]
> A stop becomes a market order when triggered, so in a fast fall you can be filled well below your stop price. Stops limit losses; they don't guarantee a price.

## Daily loss limit

A **max daily loss** stops trading for the rest of the day if the account has dropped too much since yesterday's close. Alpaca's account object includes `equity` (now) and `last_equity` (at the previous close), which makes this easy:

```python title=bot/risk.py (part 2)
def daily_loss_breached(equity, last_equity, max_loss_pct):
    if last_equity <= 0:
        return False
    return (last_equity - equity) / last_equity >= max_loss_pct


def drawdown_breached(equity, peak_equity, max_dd_pct):
    if peak_equity <= 0:
        return False
    return (peak_equity - equity) / peak_equity >= max_dd_pct
```

**Maximum drawdown** is the fall from the account's highest value. If it passes your limit, say 15%, the bot halts until you review it. That's a **circuit breaker**: a rule that stops the system when results suggest something is wrong.

## Position and order limits

```python title=bot/risk.py (part 3)
def approve_buy(symbol, qty, price, cash, n_open, rules, allowed):
    """Return (ok, reason). Every new buy must pass this."""
    if symbol not in allowed:
        return False, "symbol not on the approved list"
    if qty < 1:
        return False, "size rounds to zero shares"
    if n_open >= rules["max_open_positions"]:
        return False, "too many open positions"
    if qty * price > cash:
        return False, "not enough settled cash"
    if qty * price > rules["max_order_dollars"]:
        return False, "order bigger than the per-order cap"
    return True, "ok"
```

Each line blocks a specific disaster: trading an unexpected symbol, a zero-size order, over-diversifying into too many positions, spending money you don't have, and a giant order caused by a bug.

The bot also caps **orders per run**. If a bug makes it think every symbol needs a trade, it stops after a handful instead of sending hundreds.

## The kill switch

A **kill switch** is a way to stop the bot and flatten everything instantly. The simplest version is a file: if a file named `KILL_SWITCH` exists in the project folder, the bot cancels all orders, closes all positions, alerts you, and exits.

```python title=bot/risk.py (part 4)
from pathlib import Path

KILL_FILE = Path(__file__).resolve().parent.parent / "KILL_SWITCH"


def kill_switch_on() -> bool:
    return KILL_FILE.exists()
```

To pull it from a server: `touch KILL_SWITCH`. To pull it from anywhere, you can also log in to the broker's website and close positions by hand; practise both.

> [!IMPORTANT]
> Rehearse the kill switch on paper. Create the file, run the bot, confirm everything closes, delete the file. A safety feature you've never tested is a hope, not a feature.

## The full rule set

```toml title=config.toml ([risk] section)
[risk]
risk_per_trade = 0.01      # 1% of equity at risk per position
stop_loss_pct = 0.08       # protective stop 8% below entry
max_position_pct = 0.20    # no position over 20% of equity
max_open_positions = 5
max_order_dollars = 2500   # hard cap per order
max_daily_loss_pct = 0.03  # halt for the day if down 3%
max_drawdown_pct = 0.15    # halt until reviewed if 15% below peak
max_orders_per_run = 5
```

:::checklist
- I can calculate a position size by hand with the 1% rule
- Every buy will carry a broker-side stop-loss
- My bot has daily-loss and drawdown circuit breakers
- Order size, position count and orders per run are capped
- I know how to pull the kill switch two different ways
:::

