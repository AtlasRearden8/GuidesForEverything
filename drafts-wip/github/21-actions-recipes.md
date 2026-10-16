# Actions Recipes: Test, Lint, Deploy, Schedule

Here are complete, beginner-sized workflows you can copy into `.github/workflows/`. Each one is short, commented, and uses the action versions shown in GitHub's current documentation.

:::summary In this chapter
- Run tests for a Node.js or Python project
- Check code style (linting) on pull requests
- Run a scheduled job, with cron explained
- Run the same tests on several versions
- Save files from a run as artifacts
:::

## Recipe 1: run Node.js tests

```yaml title=.github/workflows/test.yml
name: Tests
on:
  push:
    branches: [main]
  pull_request:

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v7
        with:
          node-version: '20.x'
      - run: npm ci                       # install exact dependencies
      - run: npm run build --if-present   # build, if there's a build step
      - run: npm test
```

`npm ci` installs exactly what's in your lock file, which keeps runs repeatable.

## Recipe 2: run Python tests

```yaml title=.github/workflows/python.yml
name: Python tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: pip install -r requirements.txt
      - run: pip install pytest
      - run: pytest
```

## Recipe 3: lint on pull requests

A **linter** is a tool that checks code for style problems and common mistakes. This runs the project's own lint script on every pull request, so problems show up before review:

```yaml title=.github/workflows/lint.yml
name: Lint
on: pull_request

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v7
        with:
          node-version: '20.x'
      - run: npm ci
      - run: npm run lint
```

For Python, swap the setup step for `setup-python` and run a linter such as `ruff check .` after installing it with `pip install ruff`.

## Recipe 4: test several versions at once

A **matrix** runs the same job once per value, in parallel:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: ['20.x', '22.x']
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v7
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test
```

## Recipe 5: a scheduled job

```yaml title=.github/workflows/weekly.yml
name: Weekly link check
on:
  schedule:
    - cron: '30 5 * * 1-5'
      timezone: "America/New_York"
  workflow_dispatch:      # also allow running by hand

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - run: echo "Checking links on $(date)"
```

### Cron in one table

Cron has five fields separated by spaces: minute, hour, day of month, month, day of week.

| Expression | Runs |
|---|---|
| `0 6 * * *` | Every day at 06:00 |
| `30 5 * * 1-5` | Weekdays at 05:30 |
| `0 9 * * 1` | Mondays at 09:00 |
| `0 0 1 * *` | Midnight on the 1st of each month |
| `*/15 * * * *` | Every 15 minutes |

> [!NOTE]
> Schedules run in UTC unless you add a `timezone`, always on the newest commit of the default branch, and no more often than every 5 minutes. In public repositories, scheduled workflows are switched off automatically after 60 days without repository activity; re-enable them on the workflow's page in the Actions tab.

## Recipe 6: keep files from a run

**Artifacts** are files saved from a run, such as a build or a test report, that you can download from the run's summary page:

```yaml
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: website-build
          path: dist/
```

## Recipe 7: deploy a website

Deploying to GitHub Pages has its own complete workflow in the GitHub Pages chapter.

## Troubleshooting workflows

| Problem | Likely cause |
|---|---|
| Nothing appears in the Actions tab | File isn't in `.github/workflows/`, or doesn't end in `.yml` |
| "Invalid workflow file" | YAML indentation or a missing colon |
| `npm ci` fails | No `package-lock.json` committed |
| Works locally, fails on Actions | A missing secret, or a file ignored by `.gitignore` |
| Scheduled job stopped | Public repo inactive for 60 days; re-enable it |

:::checklist
- A test workflow runs on every pull request
- My workflows set `permissions` and `timeout-minutes`
- I can read a cron expression
- Dependabot (see Securing Your Repositories) keeps my action versions current
:::
