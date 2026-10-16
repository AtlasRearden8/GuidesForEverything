# Scripts, Headless Mode, and the Agent SDK

Claude Code doesn't have to be a conversation. With `claude -p` it answers once and exits, which means you can use it inside scripts, build tools, and scheduled jobs. The **Agent SDK** goes further, letting you build Claude Code's agent into your own programs.

:::summary In this chapter
- `claude -p` ("print mode") and piping data in and out
- Getting JSON, and JSON that matches a shape you define
- Pre-approving tools and choosing a permission mode for scripts
- Continuing conversations from a script
- A first Agent SDK program in Python or TypeScript
:::

## Print mode basics

`claude -p` ("print mode", also called **headless** or non-interactive mode) answers once and exits:

```bash
claude -p "What does the auth module do?"
cat error.log | claude -p "explain this error in one paragraph"
cat build-error.txt | claude -p 'explain the root cause' > output.txt
```

It exits with code 0 on success and non-zero on failure, so scripts can react. Piped input is capped at 10 MB; for bigger inputs, save a file and name it in the prompt.

## Structured output

| Flag | Output |
|---|---|
| `--output-format text` | Plain text (the default) |
| `--output-format json` | JSON with the `result`, `session_id`, cost, and other details |
| `--output-format stream-json` | One JSON message per line, as Claude works |

```bash
claude -p "Summarize this project" --output-format json | jq -r '.result'
```

To get JSON in a shape you define, add `--json-schema`; the answer arrives in `structured_output`:

```bash
claude -p "List the main function names in auth.py" \
  --output-format json \
  --json-schema '{"type":"object","properties":{"functions":
    {"type":"array","items":{"type":"string"}}},"required":["functions"]}' \
  | jq '.structured_output'
```

## Permissions in scripts

Nobody is there to click "Yes," so decide in advance what Claude may do:

```bash
claude -p "Run the test suite and fix any failures" \
  --allowedTools "Bash,Read,Edit"
```

```bash
claude -p "Look at my staged changes and create a commit" \
  --allowedTools "Bash(git diff *),Bash(git status *),Bash(git commit *)"
```

| Option | Effect in a script |
|---|---|
| `--permission-mode acceptEdits` | File edits run; other commands are denied unless allowed |
| `--permission-mode dontAsk` | Only pre-approved tools run; everything else is refused |
| `--permission-mode auto` | The classifier reviews actions |
| `--permission-prompts none` | Anything that would prompt is denied, and Claude is told not to retry |
| `--max-turns 5` | Stop after five steps |
| `--max-budget-usd 2` | Stop when estimated API spend reaches $2 |

> [!WARNING]
> A `-p` run shows no folder-trust dialog, so a project's hooks and MCP servers run even in a folder you've never trusted. Only run it on code you trust, or add `--bare`.

## Faster, repeatable runs with --bare

`--bare` skips loading hooks, skills, plugins, MCP servers, auto memory, and `CLAUDE.md`, so a script behaves the same on every machine. It doesn't use your subscription login: set `ANTHROPIC_API_KEY` first.

```bash
claude --bare -p "Summarize README.md" --allowedTools "Read"
```

## Continuing a conversation

```bash
claude -p "Review this codebase for performance issues"
claude -p "Now focus on the database queries" --continue

id=$(claude -p "Start a review" --output-format json | jq -r '.session_id')
claude -p "Continue that review" --resume "$id"
```

## Adding Claude to a build script

```json title=package.json
{
  "scripts": {
    "lint:claude": "git diff main | claude -p \"report any typos in this diff as filename:line, then the issue\""
  }
}
```

Run it with `npm run lint:claude`. Your own skills work in print mode too: put `/skill-name` in the prompt.

## The Agent SDK

The **Agent SDK** gives you the same tools, agent loop, and context handling that power Claude Code, as a library for Python (3.10+) or TypeScript (Node.js 18+). Use it to build your own agents.

:::steps Your first SDK agent in Python
1. **Install the package.**
   ```bash
   pip install claude-agent-sdk
   ```
2. **Set an API key** from the Claude Console (platform.claude.com):
   ```bash
   export ANTHROPIC_API_KEY=your-api-key
   ```
3. **Write `agent.py`.**
   ```python title=agent.py
   import asyncio
   from claude_agent_sdk import query, ClaudeAgentOptions

   async def main():
       async for message in query(
           prompt="Review utils.py for bugs that would crash. Fix them.",
           options=ClaudeAgentOptions(
               allowed_tools=["Read", "Edit", "Glob"],
               permission_mode="acceptEdits",
           ),
       ):
           print(message)

   asyncio.run(main())
   ```
4. **Run it.** `python agent.py`
:::

For TypeScript, install `@anthropic-ai/claude-agent-sdk` and call `query({ prompt, options })` in a `for await` loop. The SDK also supports hooks, subagents, MCP, sessions, and plugins.

> [!NOTE]
> Programs you build with the Agent SDK for other people must use API-key authentication, not a claude.ai login, unless Anthropic has approved otherwise.

:::checklist
- I've piped a file into `claude -p`
- I've used `--output-format json` with `jq`
- I pre-approve exactly the tools a script needs
:::

# GitHub Actions: Claude on Your Pull Requests

**GitHub Actions** is GitHub's automation system: small programs, called **workflows**, that run on GitHub's computers when something happens in your repository. The Claude Code GitHub Action lets anyone mention `@claude` in an issue or pull request to get work done.

:::summary In this chapter
- Quick setup with `/install-github-app`
- Manual setup, step by step
- Using `@claude`, and running Claude on a schedule
- Keeping costs and credentials under control
:::

## Quick setup

:::steps Set up with one command
1. **Install and sign in to the GitHub CLI.** Get it from cli.github.com, then run `gh auth login`.
2. **Open Claude Code in your repository** and run `/install-github-app`.
3. **Follow the prompts.** Claude Code installs the Claude GitHub App, saves a secret (an API key as `ANTHROPIC_API_KEY`, or a subscription token as `CLAUDE_CODE_OAUTH_TOKEN`), and opens a pull request with the workflow files.
4. **Merge that pull request.** Now `@claude` works in the repository.
:::

You need admin access to the repository, and it must be on github.com.

## Manual setup

1. Install the Claude GitHub App at github.com/apps/claude on your repository.
2. Add a repository secret: `ANTHROPIC_API_KEY` from the Claude Console, or `CLAUDE_CODE_OAUTH_TOKEN`, generated with `claude setup-token` (Pro, Max, Team, and Enterprise).
3. Add a workflow file:

```yaml title=.github/workflows/claude.yml
name: Claude Code
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
jobs:
  claude:
    if: contains(github.event.comment.body, '@claude')
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
      id-token: write
      actions: read
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 1
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

With a subscription token, replace the last line with `claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}`.

## Using @claude

Comment on an issue or pull request:

```text
@claude implement this feature based on the issue description
@claude fix the TypeError in the user dashboard component
@claude how should I add authentication to this endpoint?
```

Claude replies in the same thread and updates its comment as it works. Only people with write access can trigger it, and bots are ignored unless you allow them.

## Automation mode: run on a schedule

Give the action a `prompt` and it runs without a mention, for example every morning:

```yaml title=.github/workflows/daily-report.yml
name: Daily Report
on:
  schedule:
    - cron: "0 9 * * *"
jobs:
  report:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      issues: read
      id-token: write
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "Summarize yesterday's commits and open issues"
          claude_args: |
            --allowedTools "mcp__github__list_commits,mcp__github__list_issues"
```

| Input | Purpose |
|---|---|
| `prompt` | Instructions; without it, Claude waits for `@claude` |
| `claude_args` | Any Claude Code command-line options, such as `--max-turns 5` |
| `trigger_phrase` | Change `@claude` to something else |
| `settings` | Claude Code settings as JSON |

## Costs and safety

- Each run uses GitHub Actions minutes *and* Claude usage (API tokens, or your subscription with an OAuth token).
- Keep `@claude` requests specific, keep `CLAUDE.md` short, and set `--max-turns` and workflow timeouts.
- **Never** paste keys into workflow files; always use GitHub secrets.
- Review Claude's pull requests before merging, like any teammate's.

| Problem | Try |
|---|---|
| Claude doesn't respond to `@claude` | Check the app is installed, the workflow is on the default branch, and the commenter has write access |
| Authentication errors | Check the secret's name matches the workflow input |
| CI doesn't run on Claude's commits | See the troubleshooting section of the official GitHub Actions docs page |

:::checklist
- The Claude GitHub App is installed on my repository
- My key or token is stored as a GitHub secret
- I've tried an `@claude` comment on a test issue
:::
