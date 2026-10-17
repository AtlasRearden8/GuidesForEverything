# Glossary {.unnumbered}

:::glossary
API
: Application programming interface: a doorway that lets one program talk to another, such as your bot talking to your broker.

API key
: A pair of secret codes (key ID and secret) that lets a program act on your account.

Adjusted prices
: Historical prices rewritten to remove the effect of stock splits and dividends.

AI agent
: An AI that can take actions, such as placing orders, not just answer questions.

Atomic write
: Saving a file by writing a temporary copy and swapping it in, so the file is never half-written.

Backtest
: Replaying a strategy on historical prices to see how it would have performed.

Bar
: A summary of trading over a period (open, high, low, close, volume). Also called a candle.

Benchmark
: What you compare a strategy with, usually buying and holding the same fund.

Bracket order
: An entry order plus a take-profit and a stop-loss that activate when it fills.

Broker
: A company that holds your investment account and sends your orders to the market.

CAGR
: Compound annual growth rate: the average yearly return, with compounding.

Cash account
: A brokerage account where you can only buy with deposited money; no borrowing.

Circuit breaker
: A rule that halts the bot when results suggest something is wrong, such as a large drawdown.

Client order ID
: Your own label attached to an order, so you can trace it back to a specific run.

cron
: The classic Linux scheduler that runs commands at set times.

Crypto exchange
: A company that runs a marketplace for cryptocurrencies, usually holding your coins.

CSV
: Comma-separated values: a plain-text table that opens in any spreadsheet.

Daily loss limit
: A rule that stops trading for the day after the account falls a set percentage.

Dataclass
: A Python container for a group of related settings or values.

DataFrame
: A pandas table of rows and columns, used for prices and calculations.

Day trading
: Opening and closing positions within the same trading day.

Digital assets question
: The yes/no question about crypto on U.S. federal tax returns.

Digital commodity
: A crypto asset, such as bitcoin, that the SEC and CFTC treat as a commodity rather than a security.

Dividend
: A cash payment a company or fund makes to its shareholders.

Dollar-cost averaging (DCA)
: Buying a fixed dollar amount at regular intervals regardless of price.

Drawdown
: The fall from an account's or strategy's highest value to a later low.

Dry run
: Running the bot so it makes and logs decisions without sending any orders.

Equity curve
: A chart or series showing how an account's value changed over time.

ETF
: Exchange-traded fund: a basket of investments that trades like a single stock.

Form 1099-DA
: The IRS form crypto brokers use to report your digital asset sales.

Fractional share
: Part of one share, bought by specifying a dollar amount.

Free-riding
: Buying and selling a security in a cash account before paying for it; can lead to a 90-day restriction.

GTC
: Good-till-cancelled: an order that stays open until filled or cancelled (Alpaca cancels them after 90 days).

Good faith violation
: Selling a security bought with unsettled funds before those funds settle, in a cash account.

Grid bot
: A bot that places buy and sell orders at evenly spaced prices to profit from price swings in a range.

Guardrail
: A rule that keeps a component's mistakes harmless, such as defaulting an unexpected AI answer to "neutral."

Heartbeat
: A check that the bot actually ran, so silent failures are noticed.

IEX
: Investors Exchange, a single U.S. stock exchange whose real-time data Alpaca provides free.

Intraday margin standards
: FINRA's 2026 replacement for the pattern day trader rules, based on exposure during the day.

IP allowlist
: A setting that only accepts an API key from listed internet addresses. Also called whitelisting.

Kill switch
: A way to stop the bot and close all positions immediately.

Large language model (LLM)
: An AI model that reads and writes text, such as Claude.

Least privilege
: Giving each key or tool only the permissions it truly needs.

Leverage
: Controlling a larger position than your deposit, magnifying gains and losses.

Liquidity
: How easily something can be bought or sold without moving its price.

Look-ahead bias
: A backtest error that uses information you wouldn't have had at the time.

Machine learning (ML)
: Letting a program find patterns in data instead of writing rules by hand.

Maker / taker
: A maker order waits on the order book and adds liquidity; a taker order fills immediately. Fees often differ.

Margin account
: A brokerage account that lets you borrow to buy or sell short.

Market data
: Prices and volumes coming from exchanges.

Market order
: An order to buy or sell immediately at the best available price.

MCP
: Model Context Protocol: a standard way to connect AI apps to outside tools such as a broker.

Mean reversion
: A strategy betting that unusually stretched prices return toward their average.

Momentum
: A strategy that buys recent relative winners, expecting them to keep outperforming for a while.

Moving average
: The average price over the last N days, recalculated daily.

Notional order
: An order specified in dollars rather than shares.

OHLCV
: Open, high, low, close, volume: the five numbers in a price bar.

Order
: An instruction to your broker to buy or sell.

OTO order
: One-triggers-other: an entry order that activates a second order (such as a stop-loss) when it fills.

Overfitting
: Tuning rules so closely to past data that they capture noise and fail on new data.

Paper trading
: Simulated trading with fake money against real prices.

Pattern day trader (PDT)
: A former FINRA designation for frequent day traders in margin accounts, with a $25,000 minimum; replaced in 2026.

Position
: The amount of a particular investment you currently hold.

Position sizing
: Deciding how much to buy, for example with the 1–2% risk rule.

Prompt injection
: Hidden text that tries to trick an AI into doing something it shouldn't.

Pure function
: A function that only uses its inputs and returns an answer, with no network or file access.

Rebalancing
: Trading back to a target mix of investments when it drifts.

Risk rules
: Code that can veto a trade, such as size limits and loss limits.

Rotating log
: A log file that starts a new file at a size limit and keeps only a few old ones.

Sandbox
: A test version of an API; some simulate trading, others return canned answers.

Settlement
: When a trade officially completes and cash or shares change hands; T+1 for most U.S. stocks.

Sharpe ratio
: Return divided by volatility; a measure of return per unit of risk.

Short-term capital gain
: Profit on an asset held one year or less; taxed as ordinary income in the U.S.

Short selling
: Selling borrowed shares to profit if the price falls; requires margin.

SIP
: Securities information processor: the combined data feed of all U.S. exchanges.

SIPC
: Securities Investor Protection Corporation: protects customers if a member brokerage fails, up to $500,000 including $250,000 cash.

Slippage
: The difference between the price you expected and the price you got.

Spot
: Buying the actual asset (such as a coin) rather than a contract about it.

Spread
: The gap between the best buying and selling prices.

Standard deviation
: A measure of how spread out values are around their average.

State file
: A small file where the bot remembers things between runs.

Stop-loss
: An order that sells automatically if the price falls to a chosen level.

Strategy
: Written rules precise enough for a computer to follow.

Survivorship bias
: Testing only on assets that still exist, ignoring those that failed.

systemd timer
: A Linux scheduler built into Ubuntu that can catch up on missed runs.

T+1
: Settlement one business day after the trade date.

Terminal
: A window for typing commands instead of clicking.

Timeframe
: How often the bot looks at prices and can trade (daily, hourly, and so on).

TOML
: A simple settings file format of names and values.

Trend following
: A strategy that holds assets while their prices are trending up.

Virtual environment
: A private set of Python libraries for one project.

VM
: Virtual machine: a rented computer in a data centre.

Walk-forward testing
: Choosing parameters on past data, testing them on the next unseen period, and rolling forward.

Wash sale
: Selling at a loss and buying substantially identical securities within 30 days before or after; the loss is deferred.

Watchlist
: The short list of symbols the bot is allowed to trade.

Z-score
: How many standard deviations a value is from its average.
:::
