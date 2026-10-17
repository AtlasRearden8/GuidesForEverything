# Running It 24/7

Your laptop sleeps, travels, and updates itself at awkward moments. An autonomous bot needs a computer that's always on. This chapter covers four ways to schedule it, from a cloud server to GitHub Actions, and how to handle market hours and holidays.

:::summary In this chapter
- Market hours, holidays and early closes
- A small cloud server (VM)
- Scheduling with cron and with systemd timers
- GitHub Actions schedules
- n8n as a scheduler
:::

## Market hours and holidays

The NYSE core trading session runs **9:30 a.m. to 4:00 p.m. Eastern Time**, Monday to Friday, except market holidays. Some days close early at **1:00 p.m.**; in late 2026 these include **Friday, November 27** (the day after Thanksgiving) and **Thursday, December 24**.

You don't need to hard-code any of this. Your bot already asks Alpaca's **clock** whether the market is open (`trading.get_clock()`), and exits if not. Alpaca's **calendar** lists every trading day with its open and close times:

```python
from datetime import date
from alpaca.trading.requests import GetCalendarRequest

days = trading.get_calendar(GetCalendarRequest(
    start=date(2026, 11, 20), end=date(2026, 12, 31)))
for d in days:
    print(d.date, d.open.time(), d.close.time())
```

So the scheduler's job is simple: start the bot every weekday at a time the market is normally open, such as **10:00 a.m. Eastern**, and let the clock check handle holidays.

> [!TIP]
> Why 10:00 and not 9:30? The first minutes after the open are the most volatile, with the widest spreads. Waiting half an hour usually gets calmer fills. On early-close days, 10:00 is still well inside the session.

Crypto never closes, so a crypto bot can run on any schedule, but remember that weekend liquidity is thinner.

## Option 1: A small cloud server

A **VM** (virtual machine) is a rented computer in a data centre. A bot like this one needs very little: the smallest Linux VM from providers such as DigitalOcean, AWS Lightsail, Google Cloud, Hetzner, or Oracle Cloud is enough, and several providers offer free tiers or credits. Check current pricing on each provider's site.

:::steps Set up an Ubuntu server
1. **Create the VM.** Choose Ubuntu LTS and the smallest size. Add your SSH key when asked (SSH is a secure way to log in to a server from your terminal).
2. **Log in.** `ssh root@YOUR_SERVER_IP`, then create a normal user: `adduser bot` and `usermod -aG sudo bot`. Log in again as `bot`.
3. **Update and install Python.**
   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install -y python3-venv git
   ```
4. **Set the server's time zone to New York.** This makes schedules easy to read.
   ```bash
   sudo timedatectl set-timezone America/New_York
   ```
5. **Copy your project.** Clone it from a *private* GitHub repo, or copy it with `scp`. Then create the `.venv` and install `requirements.txt` as in Chapter 6.
6. **Create `.env` on the server by hand.** Never copy secrets through Git. Run `chmod 600 .env`.
7. **Test.** `python -m bot.main --dry-run`.
:::

> [!WARNING]
> Turn on the provider's firewall and allow only SSH. Your bot makes outgoing connections only; nothing needs to reach it from the internet.

## Option 2: Schedule with cron

**cron** is the classic Linux scheduler. Each line of a **crontab** says *when* and *what*. Open yours with `crontab -e` and add:

```text
# m  h  dom mon dow  command
0   10  *   *   1-5  cd /home/bot/trading-bot && .venv/bin/python -m bot.main >> logs/cron.log 2>&1
```

Read it as: minute 0, hour 10, any day of month, any month, Monday to Friday (1–5). Because you set the server's time zone to New York, 10 means 10:00 a.m. Eastern, and daylight saving is handled for you. The `>> logs/cron.log 2>&1` part saves all output, including errors.

## Option 3: Schedule with systemd

**systemd** is the service manager built into Ubuntu. Its **timers** add a feature cron lacks: `Persistent=true` runs a missed job when the server comes back after downtime. Create two files:

```ini title=/etc/systemd/system/tradingbot.service
[Unit]
Description=Trading bot, one run

[Service]
Type=oneshot
User=bot
WorkingDirectory=/home/bot/trading-bot
ExecStart=/home/bot/trading-bot/.venv/bin/python -m bot.main
```

```ini title=/etc/systemd/system/tradingbot.timer
[Unit]
Description=Run the trading bot on weekday mornings

[Timer]
OnCalendar=Mon..Fri 10:00
Persistent=true

[Install]
WantedBy=timers.target
```

Then enable it and check:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now tradingbot.timer
systemctl list-timers tradingbot.timer
journalctl -u tradingbot.service -n 50
```

`OnCalendar` uses the server's local time (New York, from step 4). `journalctl` shows the output of recent runs.

## Option 4: GitHub Actions

**GitHub Actions** can run your bot on GitHub's computers on a schedule, with no server to maintain. GitHub's docs note some important limits:

- The shortest interval is once every **5 minutes**.
- Scheduled runs can be **delayed** during busy periods, especially at the start of every hour, and some queued jobs may be dropped.
- Schedules run in **UTC** by default, but you can add a `timezone`.
- In a **public** repository, scheduled workflows are disabled after **60 days** with no activity.

Use a **private** repository, and store keys in [[Settings > Secrets and variables > Actions]]. Then add:

```yaml title=.github/workflows/bot.yml
name: Trading bot
on:
  schedule:
    - cron: "7 10 * * 1-5"
      timezone: "America/New_York"
  workflow_dispatch:

jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-python@v7
        with:
          python-version: "3.13"
      - run: pip install -r requirements.txt
      - run: python -m bot.main
        env:
          ALPACA_API_KEY: ${{ secrets.ALPACA_API_KEY }}
          ALPACA_SECRET_KEY: ${{ secrets.ALPACA_SECRET_KEY }}
          TELEGRAM_BOT_TOKEN: ${{ secrets.TELEGRAM_BOT_TOKEN }}
          TELEGRAM_CHAT_ID: ${{ secrets.TELEGRAM_CHAT_ID }}
```

The minute is set to 7, not 0, to avoid the busy top of the hour. `workflow_dispatch` adds a **Run workflow** button for manual runs.

> [!IMPORTANT]
> Each Actions run starts on a fresh computer, so `state.json` and `logs/` vanish afterwards. For a daily bot that's survivable (the broker remembers positions and orders), but your peak-equity record and halt flag are lost. Either keep using a server, or have the workflow save those files somewhere persistent, such as committing them back to the private repo. Ask Claude Code to add that step if you go this route.

## Option 5: n8n

**n8n** is a visual automation tool (see the *n8n* manual in this series). Its **Schedule Trigger** node can start a workflow on weekdays at 10:00. On a self-hosted n8n, you can run the bot as a command on the same machine; on n8n Cloud, use an HTTP Request node to call a small web endpoint you host instead. n8n is most useful *around* the bot: forwarding alerts, building weekly summaries, or logging trades to a spreadsheet.

## Which should you pick?

| Option | Cost | Reliability | Effort |
|---|---|---|---|
| Cloud VM + systemd | Small monthly fee | High | Medium |
| Cloud VM + cron | Small monthly fee | High | Low |
| GitHub Actions | Free tier minutes | Medium (delays possible) | Low |
| n8n | Depends on hosting | Medium | Medium |
| Your laptop | Free | Low | Low |

:::checklist
- My bot runs automatically every trading day
- I know where its output goes (log file or journal)
- Holidays and early closes are handled by the clock check
- Secrets are on the server or in Actions secrets, never in Git
- I tested a missed run and a manual run
:::

