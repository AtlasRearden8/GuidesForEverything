
# GitHub: Tokens and Repository Settings

GitHub is where agents push code, open pull requests, and trigger automation. Here's how to give them full power with minimal friction.

## Authenticate agents broadly

**The GitHub CLI** (used by Claude Code, Codex, and others):

```bash
gh auth login
gh auth refresh -h github.com -s repo,workflow,read:org,gist,delete_repo
```

The `workflow` scope lets agents edit `.github/workflows/` files; without it, pushes that touch workflows are rejected. `delete_repo` is only needed if you want agents to delete repositories.

**A fine-grained personal access token** (for MCP servers, n8n, and scripts): go to [[Settings > Developer settings > Personal access tokens > Fine-grained tokens]], then **Generate new token**:

| Option | Maximum-autonomy choice |
|---|---|
| Resource owner | Your account (or the organization the agent works in) |
| Expiration | As long as you're comfortable with, or custom |
| Repository access | **All repositories** (or every repo the agent should touch) |
| Contents | Read and write |
| Pull requests | Read and write |
| Issues | Read and write |
| Workflows | Read and write |
| Actions | Read and write |
| Administration | Read and write (only if agents create repos or change settings) |
| Metadata | Read (required) |

**Classic tokens** are simpler but blunter: the `repo` and `workflow` scopes cover most agent work.

**For teams:** install the **Claude GitHub App** (run `/install-github-app` in Claude Code) on **All repositories** so `@claude` works everywhere.

> [!TIP]
> **GitHub Apps vs tokens.** A **GitHub App** is an integration installed on chosen repositories. It gets short-lived tokens automatically, acts under its own name, and doesn't depend on a person's account. For a team, an App (like the Claude GitHub App, or your own) beats a personal token. For one person, a machine-user account with a fine-grained token is simpler.

:::steps Create a machine-user setup in ten minutes
1. **Create a second GitHub account** (for example `yourname-bot`) with its own email and 2FA.
2. **Invite it** as a collaborator with **Write** access on the repositories agents use.
3. **Sign in as the bot** and create a fine-grained token with the permissions above, scoped to those repositories.
4. **Store the token** in your agent's environment (`GH_TOKEN`) or your CI secrets.
5. **Tell git who it is:** `git config user.name "yourname-bot"` and the bot's email, inside the agent's box.
:::


## Repository settings that remove friction

| Setting | Where | Choose |
|---|---|---|
| Workflow permissions | [[Settings > Actions > General]] | **Read and write permissions** |
| Let Actions open and approve PRs | Same page | Tick **Allow GitHub Actions to create and approve pull requests** |
| Auto-merge | [[Settings > General]], under Pull Requests | Tick **Allow auto-merge**; agents can then run `gh pr merge --auto --squash` |
| Branch rules | [[Settings > Rules > Rulesets]] | Remove required reviews, or add the agent's account or app to the ruleset's **Bypass list** |
| Delete merged branches | [[Settings > General]] | Tick **Automatically delete head branches** |

> [!TIP]
> A powerful, still-sane setup: leave `main` protected by status checks only (tests must pass), put your agent's account on nothing else, and turn on auto-merge. Agents ship on their own, but only green code lands.


## Branch protection that agents can live with

A **ruleset** is a set of rules GitHub enforces on branches. The trick for autonomy is to make rules that check *results* rather than requiring a person:

| Rule | Keep it? | Why |
|---|---|---|
| Require status checks to pass | **Yes** | Only green code lands |
| Block force pushes to `main` | **Yes** | History can't be rewritten |
| Restrict deletions of `main` | **Yes** | The branch can't vanish |
| Require pull request reviews | Optional | Removes autonomy unless the agent is on the bypass list |
| Require signed commits | Optional | Agents need a signing key |

Agents then work on branches like `agent/fix-login`, open pull requests, and enable auto-merge. When tests pass, GitHub merges on its own.

```prompt
Work on a new branch named agent/<short-description>. When the change is
complete and tests pass locally, push, open a pull request with a clear
summary, and run: gh pr merge --auto --squash
```

## What still prompts on GitHub

- **Sudo mode:** sensitive actions in the web interface (deleting repos, changing security settings) re-ask for your password or 2FA. Tokens and the API aren't affected.
- **Push protection:** pushes containing detected secrets are blocked until bypassed for that push.
- **Claude's auto mode** blocks merging pull requests no human approved, and force pushes, by default. Use bypass mode, or grant a specific standing approval, if you want agents to do that.
- **Organization policies** (SSO token authorization, required reviews, Copilot policies) override your personal choices.

- **Copilot cloud agent and Actions approvals:** workflows triggered by first-time contributors or bots may need a maintainer to click **Approve and run**, depending on [[Settings > Actions > General]].

:::checklist
- Agents use a machine user or GitHub App, not your main account
- Fine-grained token scoped to the agent's repos, with `workflow` access if it edits CI
- Workflow permissions set to read and write; Actions may open PRs
- `main` protected by status checks and no force-push; auto-merge allowed
- Push protection left on
:::
