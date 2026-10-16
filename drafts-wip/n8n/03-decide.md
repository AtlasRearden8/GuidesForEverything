# Cloud or Self-Hosted? Making the Choice

There are two ways to get n8n, and both run the same product. The question is simply who looks after the computer it runs on: n8n, or you. This chapter lays out the trade-offs so you can choose with confidence, and reassures you that the choice isn't permanent.

:::summary In this chapter
- What each option means in practice
- A side-by-side comparison
- A quick decision guide
- The free self-hosted editions
- How to switch later
:::

## The two options in plain English

**n8n Cloud** is like renting a fully serviced flat. You sign up, get an address such as `yourname.app.n8n.cloud`, and start building in your browser. n8n handles the server, security patches, updates, backups of the platform and scaling. You pay a monthly fee based on how many workflow runs you need.

**Self-hosted** is like owning a house. You install n8n on your own computer or on a rented server in a data centre (a **VPS**, or *virtual private server*). The software is free and has no execution limits, but you fix the roof: installation, updates, backups, security and keeping it switched on are your job.

## Side by side

| | n8n Cloud | Self-hosted |
|---|---|---|
| Setup time | Minutes | An hour or more |
| Technical skill | None | Comfortable with a terminal |
| Software cost | From €20/month (yearly) | Free Community Edition |
| Server cost | Included | A small VPS, a few euros a month |
| Execution limits | By plan | None (only your server's power) |
| Updates and security | Done for you | Your job |
| Your data's location | n8n's servers | Wherever you choose |
| Custom code libraries | Limited | Allowed |
| AI without API keys | Gateway credits | Bring your own keys |

## Choose n8n Cloud if…

- you are new to n8n, servers or the command line;
- you want to be building within five minutes;
- you'd rather spend your time on workflows than on maintenance;
- you need webhooks reachable from the internet straight away, with HTTPS already set up.

## Choose self-hosting if…

- you are comfortable in a terminal, or keen to learn;
- you want unlimited executions for a fixed, low server cost;
- your data must stay on your own infrastructure (for example for privacy rules);
- you need custom npm or Python packages in Code nodes, your own custom nodes, or bash commands.

> [!IMPORTANT]
> n8n itself recommends self-hosting for people with server experience. Mistakes can lead to data loss, security problems or downtime. If that sounds daunting, start on Cloud. Nothing you learn is wasted: the editor is identical.

## A quick decision guide

:::steps Decide in four questions
1. **Do you just want to learn?** Start a Cloud free trial, or run n8n on your laptop with Docker (Chapter 4). Both are fine for practice.
2. **Will it run real work for you or your business?** Then it must be always on. Choose Cloud, or a VPS with Docker Compose (Chapter 5).
3. **Will you run thousands of executions a month?** Self-hosting is usually far cheaper at high volume.
4. **Does anyone need to approve where data lives?** If yes, self-host somewhere they approve, or ask n8n about Enterprise options.
:::

## The self-hosted editions

Self-hosted n8n comes in four flavours. All run the same software; a licence key unlocks extra features.

| Edition | Cost | What you get |
|---|---|---|
| **Community** | Free | Almost the complete feature set |
| **Registered Community** | Free | Adds folders, debug in editor and custom execution data |
| **Business** | Paid | SSO, environments, projects, Git version control |
| **Enterprise** | Paid | Advanced security, scaling and governance |

To register a Community instance for the free extras, open [[Settings > Usage and plan]] and select **Unlock**. You'll receive a licence key by email.

> [!NOTE]
> Features that need a paid plan include custom variables, environments, external secrets, log streaming, multi-main mode, projects, SSO, workflow and credential sharing, and Git version control. Feature lists change, so check n8n.io/pricing for the current details.

## Switching later

You aren't locked in. Workflows are stored as JSON files that you can download from one instance and import into another (Chapter 16). Credentials (your passwords and tokens) don't travel with downloaded workflows, so you'd reconnect your apps after a move. That takes minutes per app.

:::checklist
- I know who maintains the server in each option
- I have picked Cloud or self-hosted for now
- I know I can move later by exporting workflows
- If self-hosting for real, I'm ready to read Chapters 5 and 26
:::

