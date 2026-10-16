# Get n8n Running

Time to get your own n8n. This chapter covers the two quickest routes: an n8n Cloud trial in your browser, or n8n on your own computer with Docker. If you want an always-on server with your own domain name, read this chapter first and then Chapter 5.

:::summary In this chapter
- Starting an n8n Cloud trial, and what happens when it ends
- The Cloud plans and their limits
- Running n8n on your computer: the one-line setup, Docker, and npx
- Creating the owner account and your first look around
:::

## Option A: n8n Cloud (recommended)

:::steps Start on n8n Cloud
1. **Go to n8n.io** and click **Get started**. Create an account; a free trial starts automatically. No credit card is needed.
2. **Choose a name** for your workspace. It becomes your address, like `yourname.app.n8n.cloud`.
3. **Open the editor.** You'll see the Overview page with your workflows list.
4. **Check your time zone.** Schedules use it. On Cloud, n8n tries to detect your time zone at sign-up. To change it, open your Cloud dashboard, select **Manage**, and change the **Timezone** dropdown.
:::

### What the trial includes

The free trial lasts **14 days** and gives you Pro plan features with the computing power of the Starter plan. Its limits are **1,000 executions**, 5 concurrent executions and one team project. You can upgrade at any time with the **Upgrade** button in the top-right corner, choosing yearly or monthly billing.

> [!WARNING] When the trial ends
> If you don't upgrade, the trial expires on its own and no charges occur, but n8n then deletes your workspace. You have 90 days to download your workflows afterwards. Export anything you want to keep before day 14.

### The Cloud plans

| Cloud plan | Price (billed yearly) | Executions per month | Highlights |
|---|---|---|---|
| **Starter** | €20/month | 2,500 | Unlimited workflows, AI agents and MCP, 5 concurrent runs |
| **Pro** | €50/month | 10,000 | More concurrency, admin roles, workflow history, insights |
| **Enterprise** | Contact sales | Custom | SSO, advanced security, support with an SLA |

Prices from n8n.io/pricing, October 2026. Billed monthly, Starter is €24 and Pro is €60 a month. Every plan includes unlimited users, unlimited workflows and every integration. An **execution** is one full run of a workflow, however many nodes it has. Chapter 27 covers costs in depth, including the self-hosted Business plan.

## Option B: self-host on your own computer

Running n8n on your laptop is free and great for learning. You need **Docker**, a free program that runs software in sealed boxes called **containers**, so n8n can't interfere with the rest of your computer. Install **Docker Desktop** from docker.com, open it once, and leave it running in the background.

### The one-line setup (easiest)

On macOS, Linux, or Windows with WSL (Windows Subsystem for Linux), open a terminal and run:

```bash
curl -fsSL https://get.n8n.io | sh
```

The script checks Docker is running, creates an `n8n` folder in the current directory, writes the configuration files, downloads n8n and starts it. When it finishes it prints `n8n is running at: http://localhost:5678`.

| To do this | Run this |
|---|---|
| Stop n8n | `docker compose -f ./n8n/compose.yml down` |
| Start it again | `docker compose -f ./n8n/compose.yml up -d` |
| Upgrade | `curl -fsSL https://get.n8n.io \| sh -s -- --upgrade` |

> [!TIP]
> Prefer not to pipe a script from the internet straight into your shell? Download it with `curl -fsSL https://get.n8n.io -o get-n8n.sh`, read it with `less get-n8n.sh`, then run `sh get-n8n.sh`.

> [!CAUTION]
> The uninstall command, `docker compose -f ./n8n/compose.yml down -v`, deletes **all** your n8n data, including workflows and credentials. The `-v` means "remove volumes." Leave it off when you only want to stop n8n.

### With plain Docker

If you'd rather type the Docker command yourself (any system with Docker Desktop installed):

```bash
docker volume create n8n_data

docker run -it --rm --name n8n -p 5678:5678 \
  -e GENERIC_TIMEZONE="America/New_York" -e TZ="America/New_York" \
  -v n8n_data:/home/node/.n8n \
  n8nio/n8n
```

What each part means:

| Part | Meaning |
|---|---|
| `docker volume create n8n_data` | Make a storage box that survives restarts |
| `-p 5678:5678` | Open n8n on port 5678 of your computer |
| `-e GENERIC_TIMEZONE=…` | Set the time zone schedules use |
| `-v n8n_data:/home/node/.n8n` | Keep n8n's data in that storage box |
| `--rm` | Delete the container (not the data) when it stops |

**Just trying it?** If you have Node.js (version 20.19–24) installed, run `npx n8n`.

Then open **http://localhost:5678** in your browser and create the owner account.

> [!NOTE]
> The npm installation method is deprecated from n8n 3.0, when n8n will be distributed only through Docker. Use Docker or Docker Compose for anything long-lived.

> [!WARNING]
> A self-hosted n8n on your laptop only runs while your laptop is on and awake, and outside services can't reach its webhooks. For always-on automations, use n8n Cloud or a small cloud server (see Chapter 5).

> [!TIP]
> Replace `America/New_York` with your own time zone (for example `Europe/London` or `America/Los_Angeles`) so schedules fire at the right local time. Self-hosted n8n uses New York time if you don't set one.

## Create the owner account

The first person to open a new self-hosted instance becomes its **owner**: the administrator who can invite other users and change settings.

:::steps Set up your instance
1. **Open http://localhost:5678.** You'll see the **Set up owner account** screen.
2. **Enter your email, name and a strong password.** Store the password in a password manager.
3. **Answer the short survey** (or skip it). It only tailors suggestions.
4. **Register for free extras (optional).** Open [[Settings > Usage and plan]] and select **Unlock**. Registering your email unlocks folders, debug in editor and custom execution data, at no cost.
:::

## Turn on two-factor authentication

**Two-factor authentication (2FA)** means signing in needs your password *and* a code from an app on your phone. Do this on Cloud and self-hosted alike: your n8n holds the keys to all your other apps.

:::steps Enable 2FA
1. **Open your personal settings.** Go to [[Settings > Personal]].
2. **Select Enable 2FA.** n8n shows a QR code. Scan it with an authenticator app such as Google Authenticator, 1Password or Authy.
3. **Enter the six-digit code** from the app in **Code from authenticator app**, then select **Continue**.
4. **Save the recovery codes** somewhere safe, away from your computer. They get you back in if you lose your phone.
:::

:::checklist
- I have a Cloud trial or a local n8n running
- I can open the editor in my browser
- My time zone is set correctly
- I've created the owner account and turned on 2FA
- I know `down -v` deletes my data, and plain `down` doesn't
:::

