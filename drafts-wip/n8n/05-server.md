# Self-Hosting on a Server

A laptop is fine for learning, but real automations need a computer that never sleeps and that the internet can reach. This chapter walks you through renting a small cloud server and running n8n on it with Docker Compose, a proper PostgreSQL database, your own domain name and automatic HTTPS. Take it slowly: every command is explained.

:::summary In this chapter
- What a VPS, a domain, DNS, HTTPS and a reverse proxy are
- Renting and securing a small Linux server
- A complete Docker Compose setup: n8n, PostgreSQL and Caddy
- The environment variables that make webhooks work
- Other routes: the n8n Caddy repository, Traefik, and npm
:::

> [!IMPORTANT]
> Self-hosting means you are the system administrator. You'll be responsible for updates, backups and security (Chapter 26). If any of this feels like too much, n8n Cloud does all of it for you.

## The pieces, explained

| Piece | What it is | Analogy |
|---|---|---|
| **VPS** | A rented computer in a data centre, always on | A flat you rent |
| **Domain** | A name like `example.com` you buy from a registrar | Your street address |
| **DNS record** | A setting that points `n8n.example.com` at your server's IP address | The signpost to your door |
| **HTTPS** | Encrypted web traffic, shown by the padlock in the browser | Sealed envelopes instead of postcards |
| **Reverse proxy** | A program that receives web traffic and hands it to n8n, handling HTTPS certificates | A receptionist at the front desk |
| **Docker Compose** | A tool that starts several containers together from one file | A recipe card for the whole kitchen |
| **PostgreSQL** | A robust database for n8n's workflows and history | A filing cabinet built for heavy use |

We'll use **Caddy** as the reverse proxy because it fetches and renews free HTTPS certificates from Let's Encrypt on its own, with a three-line configuration file.

## Step 1: rent a server

Any provider works: Hetzner, DigitalOcean, AWS, Azure, Google Cloud and many others. n8n publishes guides for several of them. Choose:

- **Operating system:** Ubuntu LTS (the long-term-support version) is the most common choice and matches the commands below.
- **Size:** n8n's own Hetzner guide says the small CPX11 type is enough for most usage. Choose at least **4 GB RAM and 2 vCPUs** if you plan to turn on n8n Assistant, which runs a code sandbox.
- **Login:** choose an **SSH key** rather than a password. SSH is how you'll log in to type commands; keys are far safer.

When the server is ready, note its **IP address** (four numbers like `203.0.113.10`) and log in from your terminal:

```bash
ssh root@203.0.113.10
```

## Step 2: point your domain at it

In your domain registrar's DNS settings, add an **A record**:

| Record type | Name | Destination |
|---|---|---|
| A | `n8n` | Your server's IP address |

This makes `n8n.example.com` lead to your server. DNS changes can take from a few minutes to a few hours to spread. Check with `ping n8n.example.com` from your own computer: when it shows your server's IP, you're ready.

## Step 3: install Docker and open the firewall

On the server, install Docker with Docker's official convenience script, then check it worked:

```bash
curl -fsSL https://get.docker.com | sh
docker --version
docker compose version
```

Now set up the firewall. **ufw** ("uncomplicated firewall") comes with Ubuntu. Allow SSH first so you don't lock yourself out, then web traffic:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

Port 80 is plain web traffic (Caddy needs it to prove you own the domain and to redirect visitors to HTTPS). Port 443 is HTTPS. You do **not** open port 5678: only Caddy talks to n8n directly.

## Step 4: create the project folder and secrets

```bash
mkdir ~/n8n-compose && cd ~/n8n-compose
openssl rand -hex 32
```

The second command prints a long random string. Copy it: it becomes your **encryption key**, which n8n uses to scramble your saved credentials. Run `openssl rand -hex 32` again for a database password. Now create a file called `.env` with `nano .env` and paste this, replacing every value:

```bash title=.env
N8N_VERSION=2.43.6
N8N_DOMAIN=n8n.example.com
GENERIC_TIMEZONE=Europe/London

N8N_ENCRYPTION_KEY=paste-your-first-random-string-here

POSTGRES_USER=n8n_admin
POSTGRES_PASSWORD=paste-your-second-random-string-here
POSTGRES_DB=n8n
```

Save with <kbd>Ctrl</kbd> + <kbd>O</kbd>, <kbd>Enter</kbd>, then exit with <kbd>Ctrl</kbd> + <kbd>X</kbd>.

> [!TIP]
> `N8N_VERSION` pins the exact n8n version, so an update only happens when you choose. Find the latest stable version on n8n's GitHub releases page (github.com/n8n-io/n8n/releases). At the time of writing the stable release was 2.43.6.

> [!CAUTION]
> Store a copy of `.env`, especially `N8N_ENCRYPTION_KEY`, in your password manager. If you lose the key, every saved credential in n8n becomes unreadable and must be re-entered.

## Step 5: tell Caddy about your domain

Create a file named `Caddyfile` (no extension) with `nano Caddyfile`:

```text title=Caddyfile
n8n.example.com {
    reverse_proxy n8n:5678 {
        flush_interval -1
    }
}
```

Replace `n8n.example.com` with your domain. `reverse_proxy n8n:5678` sends visitors to the container named `n8n` on port 5678. `flush_interval -1` passes streamed data (like live AI chat replies) straight through instead of buffering it.

## Step 6: write the Compose file

Create `compose.yml` with `nano compose.yml`. The file is long, so it's shown in two parts. Paste **part 1** first, then **part 2** directly underneath it in the same file. Indentation (the spaces at the start of lines) matters in YAML, so keep it exactly as shown.

**Part 1** defines Caddy and the PostgreSQL database:

```yaml title=compose.yml (part 1)
services:
  caddy:
    image: caddy:latest
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - caddy_data:/data
      - ./Caddyfile:/etc/caddy/Caddyfile

  postgres:
    image: postgres:18
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
      PGDATA: /var/lib/postgresql/data
    volumes:
      - db_storage:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 5s
      timeout: 5s
      retries: 10
```

The `${...}` placeholders are filled in from your `.env` file. The **healthcheck** lets Docker know when the database is ready, so n8n doesn't start too early. Keep the `PGDATA` line: PostgreSQL 18 changed its default data folder, and this line keeps the data where the volume expects it.

**Part 2** defines n8n itself and the storage volumes:

```yaml title=compose.yml (part 2)
  n8n:
    image: docker.n8n.io/n8nio/n8n:${N8N_VERSION}
    restart: always
    environment:
      DB_TYPE: postgresdb
      DB_POSTGRESDB_HOST: postgres
      DB_POSTGRESDB_PORT: "5432"
      DB_POSTGRESDB_DATABASE: ${POSTGRES_DB}
      DB_POSTGRESDB_USER: ${POSTGRES_USER}
      DB_POSTGRESDB_PASSWORD: ${POSTGRES_PASSWORD}
      N8N_HOST: ${N8N_DOMAIN}
      N8N_PORT: "5678"
      N8N_PROTOCOL: https
      N8N_WEBHOOK_URL: https://${N8N_DOMAIN}/
      N8N_PROXY_HOPS: "1"
      N8N_ENCRYPTION_KEY: ${N8N_ENCRYPTION_KEY}
      NODE_ENV: production
      GENERIC_TIMEZONE: ${GENERIC_TIMEZONE}
      TZ: ${GENERIC_TIMEZONE}
    volumes:
      - n8n_data:/home/node/.n8n
    depends_on:
      postgres:
        condition: service_healthy

volumes:
  caddy_data:
  db_storage:
  n8n_data:
```

## What those settings do

| Setting | Why it matters |
|---|---|
| `DB_TYPE` and `DB_POSTGRESDB_*` | Use PostgreSQL instead of the built-in SQLite file |
| `N8N_HOST`, `N8N_PROTOCOL` | Tell n8n its public name and that it's served over HTTPS |
| `N8N_WEBHOOK_URL` | The public address n8n shows and registers for webhooks |
| `N8N_PROXY_HOPS` | n8n sits behind one proxy (Caddy), so trust its forwarded headers |
| `N8N_ENCRYPTION_KEY` | Your own key for encrypting credentials |
| `TZ`, `GENERIC_TIMEZONE` | The time zone for schedules and dates |
| `restart: always` | Start again automatically after a crash or reboot |

> [!NOTE]
> `N8N_WEBHOOK_URL` is available from n8n 2.30.0. The older name, `WEBHOOK_URL`, still works but is deprecated from 2.35.0, so you'll see it in older tutorials.

## Step 7: start everything

```bash
docker compose up -d
docker compose ps
docker compose logs -f n8n
```

`up -d` starts all three containers in the background ("detached"). `ps` lists them; all should say `running` (Postgres also `healthy`). `logs -f` follows n8n's log; press <kbd>Ctrl</kbd> + <kbd>C</kbd> to stop watching (n8n keeps running). The first start takes a minute or two while Caddy fetches your certificate.

Open `https://n8n.example.com`. You should see the padlock and the owner setup screen. Create the owner account straight away, before anyone else finds the page, and turn on 2FA (Chapter 4).

## Everyday commands

| To do this | Run this (in `~/n8n-compose`) |
|---|---|
| See what's running | `docker compose ps` |
| Read n8n's recent log | `docker compose logs --tail=100 n8n` |
| Restart n8n | `docker compose restart n8n` |
| Stop everything | `docker compose down` |
| Start everything | `docker compose up -d` |
| Apply `.env` changes | `docker compose up -d` |

## Other ways to self-host

- **n8n's Caddy repository.** n8n's Hetzner and DigitalOcean guides clone `github.com/n8n-io/n8n-docker-caddy`, a ready-made Caddy setup using SQLite. It's a good alternative if you'd rather not write files by hand.
- **Traefik.** n8n's Docker Compose server guide uses Traefik, another reverse proxy that obtains certificates automatically, configured with labels in the Compose file.
- **The n8n-hosting repository** (`github.com/n8n-io/n8n-hosting`) has more Compose examples, including a hardened PostgreSQL setup with a separate task runner container.
- **npm.** `npm install n8n -g` then `n8n start` still works with Node.js 20.19–24, but npm installs are deprecated from n8n 3.0 and don't support n8n Assistant. Prefer Docker.
- **Testing webhooks locally.** n8n's docs describe a development tunnel using cloudflared. It's for local testing only, never production.

## If it doesn't work

| Symptom | Likely cause | Fix |
|---|---|---|
| Browser can't reach the site | DNS not updated yet, or firewall | Wait; check `ping`; check `sudo ufw status` |
| Certificate error | Port 80 blocked, or DNS points elsewhere | Open port 80; fix the A record; check `docker compose logs caddy` |
| n8n keeps restarting | Database not ready or wrong password | Check `docker compose logs n8n`; compare `.env` values |
| Webhook URLs show `localhost` | `N8N_WEBHOOK_URL` missing | Add it, then `docker compose up -d` |
| "Credentials could not be decrypted" | Encryption key changed | Restore the original `N8N_ENCRYPTION_KEY` |

:::checklist
- My server has a domain name pointing at it
- The firewall allows only SSH, 80 and 443
- `.env` holds my secrets, and a copy is in my password manager
- n8n opens over HTTPS with a padlock
- I created the owner account and enabled 2FA immediately
- I've read Chapter 26 on backups and updates
:::

