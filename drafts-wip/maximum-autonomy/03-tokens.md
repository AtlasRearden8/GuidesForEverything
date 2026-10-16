
# Accounts, Tokens, and Spend Caps

A box limits what an agent can touch on *your computer*. Accounts and tokens limit what it can touch on *the internet*. Spend caps limit what it can cost you. Together they turn "the agent went wrong" from a disaster into an annoyance.

:::summary In this chapter
- Why agents should have their own accounts
- How tokens work, and the "narrow but complete" rule
- Where each agent reads its credentials from
- Spend caps for Claude, plus the same idea for other vendors
- Keeping secrets out of an agent's reach
:::

## Give agents their own identity

When an agent uses *your* GitHub login or *your* cloud account, it can do anything you can do, everywhere. A separate identity fences it in.

| Service | Agent identity | What it buys you |
|---|---|---|
| **GitHub** | A second "machine user" account, or a GitHub App | Added only to the repos it works on |
| **Cloud (AWS, GCP, Azure)** | A separate project or account with its own billing | Can't touch production |
| **Notion** | A separate teamspace, or an internal connection | Only pages you share |
| **n8n** | A separate instance or project | Its workflows only |
| **Email / chat** | A dedicated bot or alias | Can't read your personal inbox |

> [!TIP]
> GitHub's terms allow one free **machine user** account per person for automation. Invite it as a collaborator on just the repositories your agents use. Its commits and pull requests are then clearly labeled as the agent's work.

## Tokens: narrow but complete

A **token** (also called an access token, API key, or personal access token) is a long secret string. Whoever holds it can act as the account it belongs to, within its **scopes** (the permissions it was given) and until it **expires**.

The rule for maximum autonomy is **narrow but complete**:

- **Complete:** inside the projects the agent works on, grant everything it might need (read, write, open pull requests, run workflows). Missing permissions cause failures and, worse, prompts.
- **Narrow:** grant nothing outside those projects. No personal repos, no billing, no admin unless it truly needs it.
- **Expiring:** set an expiry date you'll remember, such as 90 days, and put a reminder in your calendar.

Chapter 13 has the exact GitHub token settings.

## Where each agent looks for credentials

Most agents can sign in through a browser, but unattended runs need a token in an **environment variable** (a named value your shell passes to programs).

| Agent | Environment variable(s) | Notes |
|---|---|---|
| Claude Code | `ANTHROPIC_API_KEY` or `CLAUDE_CODE_OAUTH_TOKEN` | Make the OAuth token with `claude setup-token` (Pro, Max, Team, Enterprise) |
| Codex | `CODEX_API_KEY` | Set it only for the `codex exec` call that needs it |
| Copilot CLI | `COPILOT_GITHUB_TOKEN`, then `GH_TOKEN`, then `GITHUB_TOKEN` | Checked in that order |
| Cursor CLI | `CURSOR_API_KEY` | Or `--api-key` |
| Gemini CLI | `GEMINI_API_KEY` | Or Google Cloud credentials |
| GitHub CLI | `GH_TOKEN` | Used by many agents for `gh` |

> [!WARNING]
> OpenAI's Codex docs warn against setting an API key as a job-level variable in CI workflows that also run repository code: build scripts, tests, and dependency hooks in the same job can read it. Give the key only to the step that runs the agent.

## Subscription tokens vs API keys

| Kind | Billed to | Best for |
|---|---|---|
| **Subscription token** (e.g. `claude setup-token`) | Your Pro/Max/Team plan's usage limits | Personal scripts and your own CI |
| **API key** (e.g. from the Claude Console) | Pay-as-you-go API billing | Shared CI, team automation, anything reused across people |

Anthropic recommends an API key rather than an OAuth token for secrets shared across repositories, because an OAuth token is tied to the subscription of the person who created it.

## Spend caps: the seat belt for your wallet

An agent stuck in a loop at 3 a.m. can burn through money. Every account an agent uses should have a hard limit.

:::steps Set spend limits for Claude
1. **Claude Console (API keys).** Open platform.claude.com, then your workspace's limits, and set a **workspace spend limit**. Give agents their own workspace and key so the limit applies only to them.
2. **Pro or Max (usage credits).** Open [[Settings > Usage]] on claude.ai. In **Usage credits**, turn credits on or off and set a **monthly spend limit**. In Claude Code, `/usage` shows spend against it.
3. **Team or Enterprise.** Owners set spend limits in the admin settings and see the spend report in org analytics.
4. **Per run.** In Claude Code print mode, `--max-budget-usd 10` stops a single run at about $10 (a client-side estimate, so leave headroom).
:::

**Other vendors** offer the same idea under different names: project budgets and usage limits for OpenAI API keys, budgets and alerts in Google Cloud Billing, and spending limits in GitHub billing settings for Copilot premium requests and Actions minutes. Set a hard cap wherever one exists and an email alert wherever one doesn't.

> [!IMPORTANT]
> A budget **alert** only tells you; a budget **limit** stops spending. Where a vendor offers only alerts, keep the agent's key in its own project so you can revoke it fast.

## Keep secrets out of reach

Agents read files. If a secret sits in a file the agent can read, assume the agent (or a prompt injection) can read it.

- **Don't mount secrets into the box.** Pass only the one key the agent needs, as an environment variable.
- **Hide credential files.** In Claude Code's sandbox, `sandbox.filesystem.denyRead` can hide `~/.aws/credentials`; in Cursor, `.cursorignore` blocks files from the agent.
- **Redact environment variables.** Copilot CLI's `--secret-env-vars=VAR` hides a variable from shell and MCP server environments.
- **Use separate `.env` files.** Keep production secrets on machines agents never run on.
- **Turn on push protection.** GitHub blocks pushes that contain detected secrets (Chapter 13).

:::checklist
- Agents have their own GitHub account or App
- Every agent token is scoped to its projects only and has an expiry date
- Unattended runs read tokens from environment variables, not files in the repo
- Hard spend limits are set on every AI and cloud account the agent uses
- Production secrets are nowhere the agent can read
:::
