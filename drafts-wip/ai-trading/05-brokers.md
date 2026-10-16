# Choosing a Broker or Exchange

Your bot needs a broker with two things: an **API** it can use, and a **paper trading** or **sandbox** environment where it can practise with fake money. **Paper trading** simulates real orders against live prices without risking money. A **sandbox** is a test copy of the API; some sandboxes simulate trading, others just return canned example answers.

:::summary In this chapter
- What to look for in a broker for bots
- Alpaca, Interactive Brokers, Tradier, tastytrade, Schwab
- Coinbase Advanced Trade and Kraken for crypto
- A side-by-side comparison
:::

## What matters for a bot

| Feature | Why it matters |
|---|---|
| Paper trading that simulates fills | You can run the real bot for weeks safely |
| A maintained Python library | Less code for you to write |
| Clear fees | You can include them in backtests |
| Key permissions | Trade-only keys with no withdrawals |
| Good docs and status page | You can debug problems yourself |

## Stock brokers

### Alpaca {{Free}}

Alpaca is built for programmers and is this manual's main example.

- **Paper trading:** Free for everyone. Anyone in the world can open a **Paper Only Account** with just an email address. New paper accounts start with $100,000 of pretend money, and you can open and delete extra paper accounts from the dashboard.
- **Fees:** Commission-free U.S. stock and ETF trading. Crypto has volume-tiered fees; at the lowest tier they're 0.15% for **maker** orders (orders that wait on the order book) and 0.25% for **taker** orders (orders that fill immediately).
- **Python library:** `alpaca-py` (version 0.44 in October 2026; needs Python 3.10 or newer).
- **Market data:** The free **Basic** plan includes real-time data from the IEX exchange and historical data, with 200 data requests per minute. **Algo Trader Plus** ($99/month) adds all U.S. exchanges.
- **AI connector:** An official MCP server lets AI assistants read your account and place orders (Chapter 10).

> [!NOTE]
> Alpaca's docs list what paper trading *doesn't* simulate: market impact, slippage from delays, queue position, price improvement, regulatory fees, and dividends. Paper results will usually look a bit better than live ones.

### Interactive Brokers (IBKR)

A large global broker with access to many countries' markets.

- **APIs:** The **TWS API** (works with its desktop Trader Workstation or IB Gateway program, with Python support) and the REST-based **Web API**.
- **Paper trading:** Offers a paper trading account with simulated funds.
- **Fees:** IBKR Lite advertises $0 commissions on U.S. stocks and ETFs; IBKR Pro uses per-share pricing.
- **Good for:** People who want international markets later. The API is more complex for beginners.

### Tradier

A broker focused on API trading. A free account gets you both live trading and a **paper trading sandbox**, each with its own access token. Check Tradier's pricing page for current plans.

### tastytrade

Offers an open API with a **sandbox** that resets every 24 hours and uses 15-minute delayed quotes. Sandbox and production credentials are separate. Better known for options, which you're avoiding for now.

### Charles Schwab

Schwab's **Trader API – Individual** lets you build apps for your own accounts. Access requires a developer account and an approval process. Look for current paper-trading options on developer.schwab.com before planning around it.

## Crypto exchanges

### Coinbase Advanced Trade

Coinbase's **Advanced Trade API** offers REST and WebSocket access to spot trading, with an official Python SDK, `coinbase-advanced-py`.

- **Keys:** Created in the Coinbase Developer Platform (CDP) portal under **Secret API Keys**. You can set an **IP allowlist** and permission restrictions, and you must choose the **ECDSA** signature algorithm.
- **Sandbox:** A *static* sandbox: responses are pre-defined examples, and only account and order endpoints are available. It's good for checking your code's format, but it doesn't simulate fills, so it isn't true paper trading.
- **Fees:** Tiered maker/taker fees; check Coinbase's Advanced fee page.

### Kraken

Kraken's spot API offers REST and WebSocket access.

- **Key permissions:** Separate switches for Query Funds, Deposit Funds, **Withdraw Funds**, querying orders, Modify Orders, and Cancel/Close Orders. Kraken's own guidance: a trading key would almost certainly not need Withdraw Funds. You can also set IP whitelisting and a key expiration date.
- **Paper trading:** Kraken's command-line tool, **kraken-cli**, includes paper trading against live prices with no API keys, plus a built-in MCP server for AI agents.

## Side by side

:::compact
| Broker | Markets | Paper/sandbox | Python |
|---|---|---|---|
| **Alpaca** | U.S. stocks, ETFs, options, crypto | Full paper trading, free | `alpaca-py` |
| **Interactive Brokers** | Global stocks, options, futures | Paper account | TWS API |
| **Tradier** | U.S. stocks, options | Paper sandbox | REST |
| **tastytrade** | U.S. stocks, options, futures | Sandbox (resets daily) | REST |
| **Schwab** | U.S. stocks, options | Check current docs | REST |
| **Coinbase** | Crypto | Static sandbox only | `coinbase-advanced-py` |
| **Kraken** | Crypto | kraken-cli paper mode | REST |
:::

> [!TIP]
> Not sure? Start with an Alpaca paper account. It costs nothing, takes minutes, and everything in Chapters 14–15 works with it directly. You can pick a live broker later, once you know what you need.

:::steps Open an Alpaca paper account
1. **Sign up.** Go to alpaca.markets and create an account with your email. Choose the paper-only option if you aren't ready to open a live account.
2. **Turn on two-factor authentication.** Find it in your account's security settings.
3. **Open the paper dashboard.** Make sure the account switcher at the top left shows a paper account.
4. **Don't create keys yet.** You'll do that safely in Chapter 7.
:::

:::checklist
- I've chosen a broker with an API and a real paper-trading mode
- I know which fees apply to my market
- I have an Alpaca paper account (or my chosen broker's equivalent)
- Two-factor authentication is on
:::

