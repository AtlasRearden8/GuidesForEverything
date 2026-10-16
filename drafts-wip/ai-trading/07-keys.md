# API Key Safety

An **API key** is a pair of secret codes that lets your bot act on your account without your password. Usually there's a **key ID** (like a username) and a **secret key** (like a password). Anyone holding both can do whatever the key is allowed to do. Treat them like the keys to your house.

:::summary In this chapter
- Creating paper keys at Alpaca
- Least privilege: trade-only, no withdrawals
- IP allowlists and expiry dates
- Storing keys in a `.env` file
- What to do if a key leaks
:::

## Create your paper keys

:::steps Generate Alpaca paper keys
1. **Log in and switch to your paper account.** Check the account switcher at the top left.
2. **Find the API Keys panel.** On the dashboard home page it's in the right sidebar.
3. **Click Generate New Keys.** Alpaca shows your key ID and secret.
4. **Copy both into your `.env` file immediately** (next section). The secret is shown only once; if you lose it, regenerate the keys.
:::

> [!NOTE]
> Paper and live accounts have **different keys**. A paper key can't touch real money. That's a natural safety barrier, so keep paper keys and live keys in separate files and never mix them up.

## The principle of least privilege

**Least privilege** means giving each key only the powers it truly needs. A trading bot needs to read balances and place and cancel orders. It never needs to **withdraw** or **transfer** money.

| Exchange | Turn ON | Turn OFF |
|---|---|---|
| Kraken | Query Funds, Query Open Orders & Trades, Modify Orders, Cancel/Close Orders | Withdraw Funds, Deposit Funds |
| Coinbase (CDP) | View and Trade permissions you need | Transfer |
| Any broker | Trading for the one account the bot uses | Anything about money movement |

Coinbase's documentation spells out why: if someone obtains an API secret with the **transfer** permission, they can send all the crypto out of your account. Without it, a thief can trade badly but can't empty the account.

## IP allowlists

An **IP address** is your server's address on the internet. An **IP allowlist** (also called whitelisting) tells the exchange: "only accept this key from these addresses." Coinbase and Kraken both offer it, and Coinbase recommends it.

:::steps Lock a key to your server
1. **Find your server's public IP.** On the server, run `curl -4 ifconfig.me`. (On a home connection the IP can change; a cloud server's is usually fixed.)
2. **Edit the key.** In the exchange's API key settings, add that address to the allowlist.
3. **Test.** Run the bot once from the server. Then try from your laptop: it should be refused.
:::

Kraken also lets you give a key an **expiration date**. A key that expires after three months forces a regular, healthy rotation.

## Store keys in a .env file

Never type keys into your code. Put them in a file called `.env` in your project folder:

```bash title=.env
ALPACA_API_KEY=PKXXXXXXXXXXXXXXXXXX
ALPACA_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
SLACK_WEBHOOK_URL=
```

Your code loads it with `python-dotenv`:

```python
import os
from dotenv import load_dotenv

load_dotenv()                      # reads .env into the environment
key = os.environ["ALPACA_API_KEY"]  # crashes loudly if missing: good
```

Also create a `.env.example` with the same names and no values. That file is safe to commit and reminds you which settings exist.

> [!TIP]
> On Mac or Linux, make the file readable only by you: `chmod 600 .env`.

## Rules for keys

:::cheatsheet
**Do**
- Use separate keys for paper and live
- Give live keys trade-only permissions
- Add an IP allowlist where offered
- Rotate keys every few months
- Turn on two-factor authentication on the account

**Never**
- Paste keys into code, chat apps, screenshots or AI prompts
- Commit `.env` to Git
- Give withdrawal permission to a bot
- Share a key with a "signal service" or third-party bot
:::

## If a key leaks

:::steps Emergency response
1. **Delete or regenerate the key at the broker.** Do this first, before investigating.
2. **Check recent orders and activity** in the dashboard for anything you didn't do.
3. **Cancel unexpected open orders** and close unexpected positions.
4. **Find the leak.** A public GitHub repo? A pasted log? Fix it.
5. **Create a new key** with minimal permissions and update `.env`.
:::

:::checklist
- I've generated Alpaca **paper** keys and saved them in `.env`
- `.env` is in `.gitignore`, and `.env.example` has no values
- I know which permissions a live key should never have
- I know how to add an IP allowlist and what to do after a leak
:::

