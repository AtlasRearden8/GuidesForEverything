# The gh CLI Cookbook

The **GitHub CLI** (`gh`) brings GitHub's website features into the terminal: repositories, issues, pull requests, Actions, releases, and more. It's the tool AI agents like Claude Code use to work with GitHub, so knowing the main recipes helps you understand (and check) what they do. Installation and sign-in are in the Install Git chapter.

:::summary In this chapter
- Setup and status checks
- Recipes for repositories, issues, and pull requests
- Recipes for Actions, releases, secrets, and codespaces
- Aliases and the API, for power users
:::

> [!TIP]
> Every command has help: `gh pr --help` or `gh pr create --help`. Most commands also take `--web` to open the matching page in your browser, and `-R owner/repo` to act on a different repository.

## Setup and status

| Recipe | Command |
|---|---|
| Sign in | `gh auth login` |
| Check who you're signed in as | `gh auth status` |
| What needs my attention? | `gh status` |
| Open this repository in the browser | `gh browse` |

## Repositories

:::compact
| Recipe | Command |
|---|---|
| New private repo, cloned locally, with README | `gh repo create bakery --private --add-readme --clone` |
| Publish the current folder | `gh repo create bakery --private --source=. --push` |
| New repo with a license and .gitignore | `gh repo create app --public -l MIT -g Node --clone` |
| Clone | `gh repo clone owner/repo` |
| Fork and clone (sets `upstream`) | `gh repo fork owner/repo --clone` |
| Sync my fork with the original | `gh repo sync your-name/repo -b main` |
| Show a repo's README and details | `gh repo view owner/repo` |
| Find beginner-friendly projects | `gh search repos --language=python --good-first-issues=">=5"` |
:::

## Issues

:::compact
| Recipe | Command |
|---|---|
| Create an issue | `gh issue create --title "Menu typo" --body "Says 'crossiant'" --label bug` |
| My open issues | `gh issue list --assignee "@me"` |
| Issues with a label | `gh issue list --label bug` |
| Read one | `gh issue view 12` |
| Comment | `gh issue comment 12 --body "Fixed in #15"` |
| Close as not planned | `gh issue close 12 --reason "not planned"` |
| Branch for an issue, checked out | `gh issue develop 12 --checkout` |
| Add a label to the repo | `gh label create urgent --color FF0000` |
:::

## Pull requests

:::compact
| Recipe | Command |
|---|---|
| Open a PR from commit messages | `gh pr create --fill` |
| Open a draft PR | `gh pr create --draft --title "WIP: gift cards"` |
| PRs I opened | `gh pr list --author "@me"` |
| My PR status at a glance | `gh pr status` |
| Try someone's PR locally | `gh pr checkout 15` |
| See the diff | `gh pr diff 15` |
| Watch checks until done | `gh pr checks 15 --watch` |
| Approve | `gh pr review 15 --approve` |
| Request changes | `gh pr review 15 --request-changes -b "Please add tests"` |
| Mark draft ready | `gh pr ready 15` |
| Squash-merge and delete branch | `gh pr merge 15 --squash --delete-branch` |
| Merge when checks pass | `gh pr merge 15 --auto --squash` |
:::

## Actions, releases, secrets, codespaces

:::compact
| Recipe | Command |
|---|---|
| Recent workflow runs | `gh run list` |
| Follow a run live | `gh run watch` |
| Show only the failing log lines | `gh run view <run-id> --log-failed` |
| Re-run just the failed jobs | `gh run rerun <run-id> --failed` |
| Start a manual workflow | `gh workflow run deploy.yml` |
| Create a release with auto notes | `gh release create v1.0.0 --generate-notes` |
| Set an Actions secret (prompts for value) | `gh secret set API_KEY` |
| Set a variable | `gh variable set SITE_URL --body "https://example.com"` |
| Create a codespace | `gh codespace create -R owner/repo` |
| List or stop codespaces | `gh codespace list` · `gh codespace stop` |
:::

## Aliases and the API

**Aliases** turn long commands into short ones:

```bash
gh alias set mine 'issue list --assignee "@me"'
gh mine
```

`gh api` calls GitHub's API directly with your login, for anything without its own command:

```bash
gh api repos/owner/repo --jq '.stargazers_count'
```

## A complete feature, start to finish

```bash
gh issue develop 42 --checkout       # branch linked to issue 42
# ...edit, then commit...
git push -u origin HEAD
gh pr create --fill                  # "Fixes #42" goes in the body
gh pr checks --watch                 # wait for tests
gh pr merge --squash --delete-branch # merge and tidy up
git switch main && git pull
```

```prompt
Using the gh CLI, list the open issues in this repository labeled
bug, pick the oldest one, create a linked branch for it, fix it,
and open a draft pull request that says "Fixes #N". Show me each
command before you run it.
```

:::checklist
- `gh auth status` shows I'm signed in
- Created an issue and a pull request from the terminal
- Watched checks with `gh pr checks --watch`
- Made one alias I'll actually use
:::
