# Automate with GitHub Actions

**GitHub Actions** runs tasks automatically when something happens in your repository: test the code on every push, publish a site, or send a message when an issue opens. Each automation is a **workflow**, written in a **YAML** file (a simple text format of names and values, indented with spaces) inside the folder `.github/workflows/`.

:::summary In this chapter
- The vocabulary: workflow, event, job, step, runner, action
- Your first workflow, line by line
- Reading results and logs, and re-running
- Triggers you'll use most, including manual runs
- What it costs
:::

## The vocabulary

| Word | Meaning |
|---|---|
| **Workflow** | One automation, in one YAML file |
| **Event** | What starts it: a push, a pull request, a schedule, a button |
| **Job** | A group of steps that run on one machine |
| **Step** | A single command, or a reusable action |
| **Runner** | The machine that runs a job; GitHub provides Linux, Windows, and macOS ones |
| **Action** | A ready-made step someone published, like `actions/checkout` |

## Your first workflow

```yaml title=.github/workflows/check.yml
name: Check my site
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - name: Say hello
        run: echo "Running checks on ${{ github.ref_name }}"
```

Line by line:

- `name:` is what appears in the Actions tab.
- `on:` lists the events that start it: every push and every pull request.
- `jobs:` holds one job, called `test`.
- `runs-on: ubuntu-latest` asks for a fresh Linux runner.
- `uses: actions/checkout@v6` copies your repository onto the runner. The `@v6` pins the version.
- `run:` executes a terminal command. `${{ github.ref_name }}` is an **expression** that inserts the branch name.

> [!WARNING]
> YAML cares about indentation. Use spaces, never tabs, and keep items in a list lined up. Most "my workflow doesn't run" problems are one misplaced space.

Push that file and click the **Actions** tab to watch it run. A green check mark means it passed; a red X means it failed (click it to see why).

Starting from scratch? The **Actions** tab offers ready-made workflow templates for most languages and hosting services.

## Reading results

:::steps Find out why a workflow failed
1. **Open the Actions tab** and click the failed run (red X).
2. **Click the failed job** in the left sidebar.
3. **Expand the red step.** The log shows the exact command and its error output.
4. **Fix and push** a new commit, or click **Re-run jobs** (top right) if it was a temporary hiccup.
:::

Pull requests show the same checks near the merge button, with a **Details** link to the log. From the terminal, `gh run view <run-id> --log-failed` prints just the failing part.

## Triggers you'll use most

```yaml
on:
  push:
    branches: [main]          # only pushes to main
  pull_request:               # every pull request
  workflow_dispatch:          # adds a "Run workflow" button
  schedule:
    - cron: '0 6 * * 1'       # every Monday at 06:00 UTC
```

- `paths:` under `push` limits runs to changes in certain files, for example `paths: ['docs/**']`.
- `workflow_dispatch` shows a **Run workflow** button on the workflow's page in the Actions tab (the file must be on the default branch).
- `schedule` uses **cron** syntax, explained in the next chapter.

## Useful job settings

| Setting | Example | Does |
|---|---|---|
| `timeout-minutes` | `timeout-minutes: 15` | Cancels a stuck job (default is 360) |
| `permissions` | `contents: read` | Limits what the built-in token may do |
| `needs` | `needs: test` | Waits for another job to succeed first |
| `if` | `if: github.ref == 'refs/heads/main'` | Runs only when a condition is true |
| `strategy.matrix` | `node-version: ['20.x', '22.x']` | Runs the job once per value |

### The built-in token

Every run gets an automatic credential called `GITHUB_TOKEN`, which lets the workflow work with its own repository (for example, comment on a pull request). It expires when the job ends. Grant it only what it needs with `permissions:`; `contents: read` is a good default.

## What it costs

| Plan | Included Actions minutes per month (private repos) |
|---|---|
| Free | 2,000 |
| Pro / Team | 3,000 |
| Enterprise | 50,000 |

Actions on **public** repositories using GitHub's standard runners are free.

> [!TIP]
> You rarely need to write workflows by hand. Ask your AI tool: "add a GitHub Actions workflow that runs my tests on every pull request." Then read it with this chapter beside you.

:::checklist
- I can name the parts: workflow, event, job, step, runner, action
- My first workflow ran and showed a green check
- I found and read the log of a failed step
- I know my plan's free minutes
:::
