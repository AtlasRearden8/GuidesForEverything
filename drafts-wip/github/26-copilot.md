# GitHub Copilot

**GitHub Copilot** is GitHub's own AI assistant. It suggests code as you type in VS Code and other editors, answers questions in a chat panel, reviews pull requests, and, as the **Copilot cloud agent** (formerly called the coding agent), can take an issue you assign to it, work in the background, and open a pull request.

:::summary In this chapter
- The plans and what AI credits are
- Copilot in your editor: completions, chat, and agent mode
- Assigning issues to the cloud agent
- Copilot code review
- Copilot CLI
:::

## Plans

| Copilot plan | Price | Highlights |
|---|---|---|
| Free | $0 | 2,000 code completions/month, limited chat and agent use |
| Pro | $10/month | Unlimited completions; cloud agent and code review; monthly AI credits |
| Pro+ | $39/month | More AI credits; third-party agents such as Claude and Codex |
| Max | $100/month | The largest monthly AI credit allowance |
| Business | $19 per seat/month | Organization controls and policies |
| Enterprise | $39 per seat/month | Business features plus enterprise extras |

Prices from github.com/features/copilot/plans and GitHub Docs, October 2026. Copilot measures heavier use in **AI credits** (1 credit = $0.01). Code completions don't use credits on paid plans.

| Individual plan | Total monthly AI credits |
|---|---|
| Pro | 1,500 (1,000 base + 500 flex) |
| Pro+ | 7,000 (3,900 base + 3,100 flex) |
| Max | 20,000 (10,000 base + 10,000 flex) |

> [!TIP]
> Verified students get Copilot free through GitHub Education. Verified teachers and maintainers of popular open source projects can get Copilot Pro free. Check the Copilot settings page after verifying.

## Copilot in your editor

Install the GitHub Copilot extension in VS Code (or JetBrains, Visual Studio, Xcode, and others) and sign in with GitHub.

| Feature | What it does |
|---|---|
| **Inline suggestions** | Grey "ghost text" as you type; press <kbd>Tab</kbd> to accept |
| **Chat** | Ask questions about your code in a side panel |
| **Agent mode** | Copilot edits several files and runs commands to finish a task, asking before risky steps |

## The cloud agent

Copilot can work on GitHub's servers while you do something else, in its own branch, and hand you a pull request.

:::steps Assign an issue to Copilot
1. **Write a clear issue**: what to change, where, and how you'll know it works.
2. **In the issue's sidebar, click Assignees**, then choose **Copilot**.
3. **Wait.** Copilot creates a branch, works in a temporary cloud environment (running tests and linters), and opens a pull request, then requests your review.
4. **Review the pull request** like any other. Comment to ask for changes; Copilot picks up comments on the pull request.
:::

Copilot only sees the issue's text and comments from when it was assigned, so put follow-up information on the pull request. You can also start tasks from the **Agents** panel on GitHub.com, from Copilot Chat, or from GitHub Mobile.

## Copilot code review

On a pull request, under **Reviewers** in the right sidebar, click **Request** next to **Copilot**. Within about half a minute it leaves comments, often with suggested changes you can apply in a couple of clicks. Treat it as a helpful first pass, not a replacement for a human reviewer. Repository rules can request Copilot reviews automatically.

## Copilot CLI

**Copilot CLI** is an AI agent in your terminal, similar to Claude Code.

| System | Install |
|---|---|
| Any (with Node.js) | `npm install -g @github/copilot` |
| Windows | `winget install GitHub.Copilot` |
| macOS / Linux | `brew install --cask copilot-cli` |

Run `copilot` inside a project folder. It asks you to confirm you trust the folder, and to sign in with `/login` the first time.

:::checklist
- Chose a Copilot plan (Free is fine to start)
- Tried inline suggestions and chat in my editor
- Assigned a small, clear issue to Copilot and reviewed its pull request
- Requested a Copilot review on one of my pull requests
:::
