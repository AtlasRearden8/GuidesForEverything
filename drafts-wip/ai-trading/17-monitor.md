# Monitoring, Alerts and a Dashboard

A bot you can't see is a bot you can't trust. Monitoring means three things: **alerts** when something happens, a **daily report** so silence is never ambiguous, and a **dashboard** for the big picture.

:::summary In this chapter
- Setting up Telegram, Slack and email alerts
- What to alert on
- A daily report
- A heartbeat that notices when the bot *didn't* run
- A small dashboard with Streamlit
:::

## Telegram alerts {{Free}}

:::steps Create a Telegram bot for alerts
1. **Talk to BotFather.** In Telegram, search for **@BotFather** (the official bot for creating bots), send `/newbot`, and follow the prompts. It gives you a **token**.
2. **Message your new bot.** Open your bot's chat and send it any message, such as "hi".
3. **Find your chat ID.** In a browser, open `https://api.telegram.org/bot<TOKEN>/getUpdates` (replace `<TOKEN>`). Look for `"chat":{"id":` and copy the number.
4. **Add both to `.env`.** Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.
5. **Test.** `python -c "from dotenv import load_dotenv; load_dotenv(); from bot.notify import notify; notify('hello from the bot')"`
:::

The token is a secret: anyone with it can send messages as your bot, so keep it in `.env` only.

## Slack alerts

In Slack, create an app with **Incoming Webhooks** enabled and add a webhook to a channel. Slack gives you a URL starting with `https://hooks.slack.com/services/`. Put it in `.env` as `SLACK_WEBHOOK_URL`. The bot posts JSON like `{"text": "..."}` to it. Treat the URL as a secret.

## Email alerts

Python's built-in `smtplib` can send email through your provider's SMTP server. Most providers (Gmail included) require an **app password** rather than your normal password. Email is fine for the daily report but too slow and easy to miss for urgent alerts.

```python title=bot/emailer.py
import os
import smtplib
from email.message import EmailMessage


def send_email(subject: str, body: str) -> None:
    msg = EmailMessage()
    msg["Subject"], msg["To"] = subject, os.environ["ALERT_EMAIL_TO"]
    msg["From"] = os.environ["SMTP_USER"]
    msg.set_content(body)
    with smtplib.SMTP(os.environ["SMTP_HOST"], 587) as s:
        s.starttls()
        s.login(os.environ["SMTP_USER"], os.environ["SMTP_PASSWORD"])
        s.send_message(msg)
```

## What to alert on

| Event | Urgency | Already in the bot? |
|---|---|---|
| Any order sent | Info | Yes (run summary) |
| Crash / exception | High | Yes |
| Daily loss limit hit | High | Yes |
| Drawdown halt | High | Yes |
| Kill switch used | High | Yes |
| Bot didn't run | High | Add a heartbeat (below) |
| Data failed sanity check | Medium | Logged; add alert if you like |

## The daily report

Add a short report after the market closes. It lists equity, today's change, and every position:

```python title=bot/report.py
from bot.config import load_settings
from bot.notify import notify
from alpaca.trading.client import TradingClient


def daily_report():
    s = load_settings()
    t = TradingClient(s.api_key, s.secret_key, paper=s.paper)
    a = t.get_account()
    eq, last = float(a.equity), float(a.last_equity)
    change = (eq - last) / last * 100 if last else 0.0
    lines = [f"Equity ${eq:,.2f} ({change:+.2f}% today)",
             f"Cash ${float(a.cash):,.2f}"]
    for p in t.get_all_positions():
        lines.append(f"{p.symbol}: {p.qty} sh, "
                     f"P/L ${float(p.unrealized_pl):,.2f}")
    notify("Daily report\n" + "\n".join(lines))


if __name__ == "__main__":
    daily_report()
```

Schedule it for about 4:30 p.m. Eastern on weekdays with another cron line or systemd timer: `python -m bot.report`.

## A heartbeat for silent failures

The scariest failure is the one that sends no alert: the server is off, or the scheduler broke. A **heartbeat** checks that the bot *did* run. The bot writes `last_run` to `state.json`; a separate tiny script, run by a second schedule (or a free external uptime monitor that watches a URL), alerts you if `last_run` is more than a day old on a trading day.

```python title=bot/heartbeat.py
from datetime import datetime, timedelta, timezone

from bot.notify import notify
from bot.state import load_state

last = load_state()["last_run"]
age = (datetime.now(timezone.utc) - datetime.fromisoformat(last)
       if last else timedelta.max)
if age > timedelta(hours=26):
    notify(f"Heartbeat: bot hasn't completed a run since {last!r}")
```

> [!NOTE]
> `last_run` is only saved on days the market was open and the bot reached the end. Run the heartbeat on weekday afternoons, and expect one extra alert after a holiday. A daily report that *doesn't* arrive is your other heartbeat: if you don't hear from the bot, assume something's wrong.

## A simple dashboard

**Streamlit** turns a Python script into a web page (`pip install streamlit`). This one shows your equity history from Alpaca and your trade log:

```python title=dashboard.py
import pandas as pd
import streamlit as st
from alpaca.trading.client import TradingClient
from alpaca.trading.requests import GetPortfolioHistoryRequest

from bot.config import load_settings

s = load_settings()
t = TradingClient(s.api_key, s.secret_key, paper=s.paper)
st.title("Trading bot dashboard")

a = t.get_account()
st.metric("Equity", f"${float(a.equity):,.2f}")

h = t.get_portfolio_history(
    GetPortfolioHistoryRequest(period="3M", timeframe="1D"))
curve = pd.Series(h.equity, index=pd.to_datetime(h.timestamp, unit="s"))
st.line_chart(curve)

st.subheader("Trade log")
st.dataframe(pd.read_csv("logs/trades.csv"))
```

Run it with `streamlit run dashboard.py` and open the address it prints. On a server, don't expose it to the internet; view it through an SSH tunnel (`ssh -L 8501:localhost:8501 bot@SERVER`), then open `http://localhost:8501` on your own computer.

:::checklist
- Telegram or Slack alerts arrive on my phone
- I get a daily report after the close
- A heartbeat or a missing report would tell me the bot stopped
- I can see equity history and the trade log in a dashboard
:::

