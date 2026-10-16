# Legal, Account and Tax Basics

You don't need a law degree to run a small bot, but you do need to know the handful of rules that trip beginners up. This chapter focuses on the United States, with a short note for other countries at the end. It's general education, not tax or legal advice.

:::summary In this chapter
- Brokers versus crypto exchanges
- Cash accounts versus margin accounts
- The end of the "pattern day trader" rule in 2026
- Crypto protections (and the lack of them)
- Short-term gains, wash sales, Form 1099-DA, and record keeping
:::

## Brokers and exchanges

A **broker** (or **brokerage**) is a company that holds your account and sends your orders to the market. To trade U.S. stocks and **ETFs** (exchange-traded funds: baskets of many investments that trade like a single stock), you open an account with a broker such as Alpaca or Interactive Brokers.

A **crypto exchange** is a company that runs a marketplace for **cryptocurrencies** like bitcoin, usually holding your coins for you. Coinbase and Kraken are examples. Some brokers, including Alpaca, offer crypto too.

| | Stock broker | Crypto exchange |
|---|---|---|
| Regulated by | SEC and FINRA | Mix of federal and state rules |
| Account protection | SIPC up to $500,000 (incl. $250,000 cash) | No SIPC for most crypto |
| Trading hours | Weekdays, set hours | 24 hours, 7 days |
| Typical fees | $0 commission on stocks | A percentage per trade |

**SIPC** (the Securities Investor Protection Corporation) protects customers if a member brokerage *fails* and assets go missing. It doesn't protect you from market losses. SIPC states that it does not protect crypto assets that aren't registered securities, even when held at a SIPC member firm.

> [!WARNING]
> If a crypto exchange collapses, you may be an unsecured creditor waiting years to recover a fraction of your money. Keep only what the bot needs on any exchange.

## Cash accounts versus margin accounts

- A **cash account** lets you buy only with money you've deposited. You can't lose more than you put in. **Start here.**
- A **margin account** lets you borrow from the broker to buy more, and is required for **short selling** (betting a price falls). Borrowing multiplies gains *and* losses, and losses can exceed your deposit.

Cash accounts have one rule to understand: **settlement**. When you sell a stock, the cash isn't officially yours until the trade *settles*. Since May 28, 2024, most U.S. stock trades settle **T+1**, one business day after the trade date. FINRA warns that if you buy with unsettled cash and then sell that new position before the original sale settles, you can get a **good faith violation**. Buying and selling before paying at all is **free-riding**, which under the Federal Reserve's Regulation T can get your cash account restricted for 90 days.

> [!TIP]
> The bot in this manual trades at most once a day per symbol and only uses settled cash, which keeps you well clear of these rules. If you build something faster, track settled cash in code.

## The pattern day trader rule ended in 2026

For decades, FINRA Rule 4210 labelled anyone who made four or more day trades within five business days in a margin account a **pattern day trader (PDT)** and required them to keep at least **$25,000** in the account. Many beginner guides still describe this rule.

It has changed. In **FINRA Regulatory Notice 26-10** (April 20, 2026), FINRA announced new **intraday margin standards** that replace the day-trading margin requirements entirely, including the PDT designation and the $25,000 minimum. The SEC approved the change on April 14, 2026.

| Date | What happens |
|---|---|
| June 4, 2026 | New rule takes effect |
| Until Oct 20, 2027 | Brokers may phase in the change |

Instead of counting trades, firms must make sure your margin account has enough equity for the exposure you take on *during* the day. The standard minimums for margin accounts still apply.

> [!IMPORTANT]
> Because of the phase-in, **your broker may still apply the old PDT rules** until it switches over. Check your broker's own notice before relying on the change. Alpaca, for example, has a help page titled *Understanding FINRA's New Intraday Margin Rule and the End of PDT*. And cash accounts were never subject to PDT; settlement rules still apply.

## Crypto rules in brief

- U.S. crypto exchanges must register with the Treasury's FinCEN and often hold state licenses. Check that any platform is licensed where you live.
- The SEC and CFTC have jointly listed bitcoin, ether, and a number of other large tokens as examples of **digital commodities** rather than securities.
- Crypto markets never close, prices can move 10% in an hour, and many tokens have little real trading activity. Your bot must handle weekends and sudden moves.
- Stick to large, liquid coins on a licensed U.S. exchange while learning.

## Taxes: the essentials

### Short-term versus long-term gains

According to the IRS, if you hold an asset **one year or less**, your gain or loss is **short-term**; more than a year is **long-term**. Short-term gains are taxed as ordinary income. Long-term gains get lower rates (0%, 15%, or 20% for most people). Almost every trade a bot makes is short-term.

If losses exceed gains in a year, you can deduct up to **$3,000** of net loss against other income ($1,500 if married filing separately) and carry the rest forward.

### The wash-sale rule

IRS Publication 550 explains that a **wash sale** happens when you sell stock or securities at a loss and, **within 30 days before or after**, buy substantially identical stock or securities. The loss is disallowed for now and added to the cost of the new shares.

Bots trigger wash sales constantly, because they often sell and rebuy the same fund within a month. That doesn't usually raise your total tax over time, but it makes your records messy. Your broker tracks wash sales for stocks within one account.

> [!NOTE]
> As of this edition, the wash-sale rule's text covers "stock or securities," and the IRS treats crypto as property. A bill introduced in June 2026, **H.R. 9172**, would extend wash-sale rules to most digital assets, and as written would apply to sales after its introduction date if enacted. Check its status on congress.gov and ask a tax professional.

### Form 1099-DA for crypto

Brokers send you a **1099** form each year listing your sales. For crypto, the IRS created **Form 1099-DA**. Under the IRS's final regulations, custodial crypto brokers must report **gross proceeds** for sales on or after **January 1, 2025**, and **cost basis** for certain sales on or after **January 1, 2026**. Every U.S. tax return also asks a yes/no **digital assets question**; selling or exchanging crypto means "Yes."

### Keep records anyway

Your bot makes many small trades. Keep your own record of every fill: date and time, symbol, side, quantity, price, fees, and order ID. You'll build a trade log that does this automatically (Chapter 15). Export your broker's yearly tax documents and keep them with the bot's logs.

## Other countries

The ideas carry over, but the rules don't. In the UK, look up HMRC's capital gains guidance and the Financial Conduct Authority's register. In the EU, check your national regulator and ESMA. In Canada, check CIRO and your province. In Australia, check ASIC and the ATO. Alpaca's paper-only account is available globally, so you can still learn everything here before choosing a local broker.

:::checklist
- I'll start with a cash account, not margin
- I understand T+1 settlement and good faith violations
- I know the PDT rule was replaced, but my broker may still apply it until it switches
- I know crypto usually isn't SIPC-protected
- I know bot profits are mostly short-term and taxed as ordinary income
- I'll keep a trade log and my 1099s
:::

