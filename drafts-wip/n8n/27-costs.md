# What n8n Really Costs

n8n's pricing is simple once you know what's counted. This chapter sets out the plans, the hidden extras (AI and servers), and practical ways to keep your bill low.

:::summary In this chapter
- What counts as an execution
- Cloud plans, limits and prices
- Self-hosted costs, including the Business plan
- AI costs: Gateway credits and your own keys
- Ten ways to use fewer executions
:::

## What counts

An **execution** is one full run of a workflow, however many steps it has. Plans count **production executions**: runs started by triggers on published workflows. Manual test runs don't count, and sub-workflow executions don't count towards the monthly limit. For chat agents, each turn of the conversation is one execution.

| Schedule | Executions per month (approx.) |
|---|---|
| Once a day | 30 |
| Every hour | 730 |
| Every 15 minutes | 2,900 |
| Every 5 minutes | 8,700 |
| Every minute | 43,800 |

## n8n Cloud plans

| Plan | Yearly billing | Monthly billing | Executions |
|---|---|---|---|
| **Starter** | €20/month | €24/month | 2,500 |
| **Pro** | €50/month | €60/month | 10,000 |
| **Enterprise** | Contact sales | Contact sales | Custom |

Pro is also sold with more executions (for example 50,000 a month, with 50 concurrent runs). Prices from n8n.io/pricing, October 2026; yearly billing saves about 17%.

:::compact
| Limit | Starter | Pro | Enterprise |
|---|---|---|---|
| Concurrent executions | 5 | 20 or 50 | 200+ |
| Max execution duration | 5 min | 40 min | 40 min |
| Saved executions | 2,500 | 25,000 | 50,000 |
| Execution log retention | 7 days | 30 days | Unlimited |
| Shared projects | 1 | 3 | Unlimited |
| Assistant credits a month | 1,600 | Up to 9,600 | On request |
| Workflow history | 1 day | 5 days | 365+ days |
:::

All plans include unlimited users, unlimited workflows, every integration, AI agents and MCP. Time spent waiting (in a Wait node or for an approval) doesn't count towards the duration limit. Runs over your concurrency limit wait in a queue rather than failing.

## Self-hosted costs

- **Community Edition:** free, unlimited executions. You pay only for the server: a small VPS typically costs a few euros a month, plus a domain name.
- **Business:** €667/month billed yearly (€800 monthly) for 40,000 executions, self-hosted only, adding SSO, environments, Git version control and more shared projects. n8n's Start-up Plan offers 50% off Business for companies with fewer than 20 employees, if you qualify.
- **Enterprise:** contact sales.

Don't forget your time: an hour a month for updates and checks is realistic.

## AI costs

AI model use is billed separately from executions:

- **Gateway credits** (Cloud Starter and Pro): prepaid credit spent per request at the rates on n8n's service pricing page. When the balance hits zero, Gateway-powered nodes stop until you top up; top-ups expire after 12 months.
- **Your own API keys:** the provider bills you directly per token. Set a monthly spending limit in the provider's console.
- **Local models with Ollama** (self-hosted): no per-token cost, but you need capable hardware.

## Ten ways to use fewer executions

:::checklist
- Use the slowest schedule that does the job
- Prefer instant (webhook) triggers to frequent polling where possible
- Filter early, in the trigger's own options if it has them
- Batch work: one run that handles 100 rows beats 100 runs
- Move shared steps into sub-workflows (they don't count)
- Stop chatty triggers, like every Gmail message, with narrower searches
- Unpublish workflows you no longer need
- Use Remove Duplicates or data tables to skip already-handled items
- Pick cheaper AI models for simple jobs like classification
- Check the Insights dashboard monthly to spot heavy workflows
:::

> [!NOTE]
> Prices and limits change. Check n8n.io/pricing before you buy; the figures here were correct in October 2026.

