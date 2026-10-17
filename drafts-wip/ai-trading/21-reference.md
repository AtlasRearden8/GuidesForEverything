# Checklists and Troubleshooting

Everything in one place: master checklists to print, a big troubleshooting table, and a quick reference.

:::summary In this chapter
- Master checklists from setup to live
- Troubleshooting common errors
- Quick command reference
:::

## Master checklists

### Before writing code

:::checklist
- I've read the honest odds and accept that profit isn't guaranteed
- I've chosen a loss-tolerable amount and a cash account
- I know the PDT rule was replaced but my broker may still apply it
- I've picked ETFs (or BTC/ETH spot) and a daily timeframe
- I have a paper account with two-factor authentication
:::

### Before paper trading

:::checklist
- Backtest acts the next day and includes costs
- Walk-forward results are acceptable
- All tests pass, and the dry run makes sense
- Kill switch, daily loss and drawdown limits are configured
- Alerts and the daily report arrive
- Pass criteria are written down
:::

### Before going live

:::checklist
- Eight-plus weeks of clean paper runs; trade log matches the broker
- Live keys are trade-only, IP-limited where possible, stored only on the server
- `paper = false` and `ALLOW_LIVE=yes` set deliberately; limits lowered
- I know how to close everything by hand
- Stop rules are written down
:::

## Troubleshooting

:::compact
| Symptom | Likely cause | Fix |
|---|---|---|
| `KeyError: 'ALPACA_API_KEY'` | `.env` missing or not loaded | Check the file is in the project root and names match |
| HTTP 401 / 403 "unauthorized" or "forbidden" | Wrong keys, or paper keys used live | Regenerate keys; match `paper=` to the key type |
| `ModuleNotFoundError: alpaca` | Virtual environment not active | `source .venv/bin/activate`, then reinstall |
| `ModuleNotFoundError: bot` | Run from wrong folder | `cd` to the project root; use `python -m bot.main` |
| `tomllib` not found | Python older than 3.11 | Install Python 3.12+ |
| Error mentioning your subscription and SIP data | Asking for the last 15 minutes on the free plan | Request completed days only, or use the IEX feed |
| HTTP 429 | Too many requests | Fetch many symbols in one request; slow down |
| Empty DataFrame | Wrong symbol, weekend start date, or too short a range | Print the request; widen `start` |
| Every signal is HOLD | Not enough history | Fetch more days than `slow_days` |
| "insufficient qty available" on sell | Shares held by an open stop order | Cancel open orders first (the bot does) |
| Order rejected: buying power | Unsettled cash or too large | Lower size; respect settlement |
| Bracket/OTO rejected | Fractional qty or wrong time in force | Whole shares; `day` or `gtc` |
| Stop orders disappeared | GTC orders auto-cancel after 90 days | Monthly stop check; re-place stops |
| Bot never runs | Scheduler, time zone, or path wrong | `systemctl list-timers` or check cron log |
| Runs at the wrong hour | Server in UTC | `timedatectl set-timezone America/New_York` |
| Actions schedule late or skipped | GitHub load at the top of the hour | Use an odd minute; accept delays or use a VM |
| Scheduled workflow stopped | Public repo inactive 60 days | Use a private repo; re-enable the workflow |
| No Telegram messages | Never messaged the bot, or wrong chat ID | Message it first; recheck `getUpdates` |
| Bot says halted | Drawdown breaker fired | Investigate, then set `halted` to false in `state.json` |
| Kill switch does nothing | File in the wrong folder | Create `KILL_SWITCH` in the project root |
| Live results far below paper | Slippage, timing, fees | Measure slippage; raise backtest costs |
| Two buys of the same fund | Logic bug or a run repeated | Check `client_order_id` tags and the position check |
| MCP tools don't appear | `uv` missing or client not restarted | Install uv; restart; check keys in config |
:::

## Quick reference

:::cheatsheet
**Everyday commands**
- Activate the environment: `source .venv/bin/activate`
- Run tests: `python -m pytest -q`
- Dry run: `python -m bot.main --dry-run`
- Real (paper) run: `python -m bot.main`
- Daily report: `python -m bot.report`
- Dashboard: `streamlit run dashboard.py`
- Kill switch on: `touch KILL_SWITCH`; off: `rm KILL_SWITCH`
- Timer status: `systemctl list-timers tradingbot.timer`
- Recent output: `journalctl -u tradingbot.service -n 50`
- Follow the log: `tail -f logs/bot.log`
:::

> [!TIP]
> When you're stuck, paste the full error and the code around it into Claude Code and ask: "Explain this error for a beginner, find the cause, and propose the smallest fix." Then read the fix before accepting it.

