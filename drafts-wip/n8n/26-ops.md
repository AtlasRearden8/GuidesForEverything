# Running Your Own n8n: Operations

If you self-host, you are now the person who keeps n8n healthy. The good news: with Docker Compose, the routine is short. This chapter covers backups, updates, configuration, scaling with queue mode, and security hardening.

:::summary In this chapter
- What to back up, and how to restore
- Updating safely
- Environment variables you'll actually use
- Keeping the database small
- Queue mode with Redis and workers
- A security hardening checklist
- Useful command-line tools
:::

If you self-host for real (not just to experiment), cover these basics:

| Topic | What to do |
|---|---|
| **Always-on hosting** | Use a small cloud server (DigitalOcean, Hetzner, AWS…) or a service with one-click n8n, rather than your laptop |
| **Docker Compose** | n8n's recommended production setup, with a proper database (PostgreSQL) |
| **HTTPS and a domain** | Put n8n behind a reverse proxy with a certificate, and set `N8N_WEBHOOK_URL` to your public address so webhooks work |
| **Encryption key** | n8n encrypts credentials with a key in its data folder. Back it up; without it, saved credentials can't be decrypted |
| **Backups** | Back up the data volume and database regularly; export important workflows too |
| **Updates** | Update regularly for features and security fixes; read the release notes for breaking changes first |
| **Access** | Use a strong owner password and two-factor authentication; don't expose the editor to the internet unprotected |

## Backups

A complete backup has two parts:

1. **The `.n8n` folder** (in Docker, the `n8n_data` volume at `/home/node/.n8n`). It holds the `config` file with the encryption key and, with SQLite, the whole database.
2. **Your PostgreSQL database**, if you use one, backed up with Postgres's own tools.

Also keep a copy of your `.env` file and Compose file. Here's a simple nightly backup for the Chapter 5 setup, run from `~/n8n-compose`:

```bash title=backup.sh
#!/bin/sh
cd ~/n8n-compose
DAY=$(date +%F)
mkdir -p backups

# 1. Database dump
docker compose exec -T postgres \
  pg_dump -U n8n_admin n8n > backups/db-$DAY.sql

# 2. The .n8n folder (encryption key, settings)
docker run --rm -v n8n-compose_n8n_data:/data -v "$PWD/backups":/b \
  alpine tar czf /b/n8n-data-$DAY.tgz -C /data .

# 3. Keep 14 days
find backups -type f -mtime +14 -delete
```

Make it executable with `chmod +x backup.sh`, and schedule it with `crontab -e`, adding a line like `30 3 * * * /root/n8n-compose/backup.sh`. Docker names volumes after the project folder, so check yours with `docker volume ls`.

> [!CAUTION]
> A backup on the same server dies with the server. Copy the `backups` folder elsewhere regularly (another provider's storage, or your own computer), and test a restore at least once.

### Exporting workflows and credentials

n8n's command line can export everything as readable JSON. In Docker, run commands with `docker compose exec -u node n8n`:

```bash
n8n export:workflow --backup --output=backups/workflows/
n8n export:credentials --backup --output=backups/credentials/
```

To restore into a fresh instance, complete the owner setup first, then:

```bash
n8n import:workflow --separate --input=backups/workflows/
n8n import:credentials --separate --input=backups/credentials/
```

Imported workflows start unpublished. Credentials only decrypt if the new instance uses the **same encryption key**. CLI exports don't include users, execution history, variables or instance settings, so keep the full backup too.

## Updating

n8n releases a new minor version most weeks. Update at least monthly so you never have to jump many versions at once.

:::steps Update the Chapter 5 setup
1. **Read the release notes** for anything marked as a breaking change.
2. **Back up** (run `backup.sh`).
3. **Change the version.** Edit `N8N_VERSION` in `.env` to the new stable version.
4. **Pull and restart:**
   ```bash
   docker compose pull
   docker compose up -d
   ```
5. **Check it.** `docker compose logs --tail=50 n8n`, then open the editor and look at a few recent executions.
:::

To roll back, set the old version again and restart. If the update migrated the database, restore your database backup too.

## Environment variables you'll actually use

:::compact
| Variable | Default | What it does |
|---|---|---|
| `N8N_WEBHOOK_URL` | – | Public base URL for webhooks (replaces `WEBHOOK_URL`) |
| `N8N_PROXY_HOPS` | `0` | Number of reverse proxies in front of n8n |
| `N8N_HOST` / `N8N_PROTOCOL` | `localhost` / `http` | Public host name and protocol |
| `N8N_EDITOR_BASE_URL` | – | Public URL of the editor, used in emails |
| `N8N_ENCRYPTION_KEY` | Random | Key that encrypts credentials |
| `GENERIC_TIMEZONE` | New York | Default time zone for schedules |
| `EXECUTIONS_DATA_PRUNE` | `true` | Delete old execution data automatically |
| `EXECUTIONS_DATA_MAX_AGE` | `336` | Hours to keep executions (14 days) |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | `10000` | Maximum executions kept |
| `EXECUTIONS_TIMEOUT` | `-1` | Default workflow timeout in seconds (off) |
| `N8N_CONCURRENCY_PRODUCTION_LIMIT` | `-1` | Cap on simultaneous production runs |
| `N8N_PAYLOAD_SIZE_MAX` | `16` | Max request size in MiB |
| `N8N_DATA_TABLES_MAX_SIZE_BYTES` | 200 MiB | Data table storage limit |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | `false` | Stop workflows reading environment variables |
| `N8N_RESTRICT_FILE_ACCESS_TO` | – | Folders file nodes may use |
| `NODES_EXCLUDE` | – | Nodes to disable entirely |
| `N8N_PUBLIC_API_DISABLED` | `false` | Turn off n8n's REST API |
| `N8N_DIAGNOSTICS_ENABLED` | `true` | Anonymous telemetry to n8n |
:::

Add variables to the `environment:` section of the n8n service (or to `.env` and reference them), then run `docker compose up -d`.

## Keeping the database small

Every execution stores its data. Busy instances fill disks quickly. By default n8n prunes executions older than 14 days or beyond 10,000. To save more space, set workflows to not save successful production executions (workflow settings), keep failures for debugging, and lower `EXECUTIONS_DATA_MAX_AGE`.

## Scaling with queue mode

One n8n process handles a lot, but very busy instances can use **queue mode**: the main instance receives triggers and webhooks and puts jobs in a queue; separate **worker** processes run them.

| Piece | Role |
|---|---|
| **Main** | Editor, triggers, webhooks; creates jobs |
| **Redis** | The queue (message broker) |
| **Workers** | Run executions; add more to scale |
| **PostgreSQL** | Required; SQLite isn't supported in queue mode |
| **Webhook processors** (optional) | Extra processes that receive webhook traffic |

The essentials:

- Set `EXECUTIONS_MODE=queue` on main and every worker, and point them at Redis with `QUEUE_BULL_REDIS_HOST` and `QUEUE_BULL_REDIS_PORT` (plus `QUEUE_BULL_REDIS_PASSWORD` if set).
- Give **every** worker the same `N8N_ENCRYPTION_KEY` and database settings as main.
- Start a worker with the `worker` command, for example a second service using the n8n image with `command: worker`, or `n8n worker --concurrency=5`. Worker concurrency defaults to 10; n8n recommends 5 or more.
- Simple Memory and binary data in filesystem mode don't work in queue mode; use database chat memory and S3 storage instead.

> [!NOTE]
> Queue mode itself is free to use. Running several *main* instances (multi-main) and the workers view in settings need paid licences.

## Security hardening checklist

:::checklist
- Owner and all users have strong passwords and 2FA (`N8N_MFA_ENFORCED_ENABLED=true` can enforce it)
- Only ports 22, 80 and 443 are open; n8n's port 5678 isn't exposed
- HTTPS everywhere, through Caddy, Traefik or a load balancer
- n8n and the server's operating system are updated monthly
- Backups run nightly, are copied off the server, and a restore has been tested
- Public webhooks, forms and chats use authentication where possible
- `N8N_BLOCK_ENV_ACCESS_IN_NODE=true` if others build workflows on your instance
- Risky nodes (Execute Command, SSH, file access) are excluded with `NODES_EXCLUDE` if unneeded
- Community nodes only from authors you trust
- `n8n audit` run occasionally to spot risky settings
:::

## Command-line toolbox

Run these inside the container with `docker compose exec -u node n8n <command>`:

| Command | Does |
|---|---|
| `n8n audit` | Generate a security audit report |
| `n8n export:workflow --backup --output=…` | Export all workflows |
| `n8n publish:workflow --id=<ID>` | Publish a workflow |
| `n8n unpublish:workflow --all` | Unpublish everything (emergency stop) |
| `n8n execute --id <ID>` | Run a workflow once |
| `n8n user-management:reset` | Reset users, back to owner setup |
| `n8n mfa:disable --email=you@example.com` | Turn off 2FA for a locked-out user |

