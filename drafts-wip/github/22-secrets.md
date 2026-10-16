# Secrets, Variables and Environments

Workflows often need passwords or keys, for example to deploy to a hosting service or post to a chat app. Never write those into a workflow file. GitHub stores them for you as **secrets**, encrypted and hidden even from the logs. Settings that aren't sensitive go in **variables**, and **environments** add approvals before important jobs run.

:::summary In this chapter
- Creating secrets and variables
- Using them in a workflow
- Environments with required reviewers
- Rules that keep secrets safe
:::

## Secrets versus variables

| | Secret | Variable |
|---|---|---|
| For | API keys, passwords, tokens | Settings like a site URL or region |
| Visible after saving? | Never; masked in logs as `***` | Yes |
| Used in a workflow as | `${{ secrets.NAME }}` | `${{ vars.NAME }}` |

## Create a secret

:::steps Add a repository secret
1. **Open Settings** on the repository.
2. **Open the Actions secrets page.** In the sidebar's **Security** section: [[Secrets and variables > Actions]].
3. **Click New repository secret.**
4. **Name it** in capitals with underscores, such as `DEPLOY_TOKEN`, and paste the value.
5. **Click Add secret.** You can update or delete it later, but never view it again.
:::

From the terminal: `gh secret set DEPLOY_TOKEN` (it prompts for the value, so it doesn't end up in your shell history). Variables are on the **Variables** tab of the same page, or `gh variable set NAME --body "value"`.

## Use them in a workflow

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - name: Deploy
        env:
          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
          SITE_URL: ${{ vars.SITE_URL }}
        run: ./deploy.sh
```

Passing secrets through `env:` and reading them in your script is the safest pattern. If a secret isn't set, the expression simply becomes empty, so a "permission denied" error often means a misspelled name.

## Environments

An **environment** (such as `production`) groups secrets and adds protection rules. Create one in [[Settings > Environments]], then:

- **Required reviewers:** up to 6 people or teams; one must approve before the job starts.
- **Wait timer:** a delay before the job runs.
- **Deployment branches:** only allow certain branches, like `main`, to deploy.
- **Environment secrets:** only jobs using this environment can read them, after approval.

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - run: echo "Deploying with approval"
```

> [!NOTE]
> On GitHub Free, environments work in public repositories. Private repositories need GitHub Pro (personal) or GitHub Team (organizations). Organization-level secrets also aren't available to private repositories on the Free plan.

## Rules that keep secrets safe

:::checklist
- Never print a secret, even partially, in a `run:` step
- Give each secret the least access possible, and set an expiry at the source
- Secrets aren't passed to workflows triggered from forks (except `GITHUB_TOKEN`), so outside pull requests can't steal them
- Use environments with reviewers for anything that deploys or spends money
- Rotate (replace) secrets when someone leaves the project
- Secrets are limited to 48 KB each; for larger files, encrypt them and store only the passphrase
:::

> [!CAUTION]
> If a secret ever appears in a log or a commit, assume it's leaked: revoke it at the service that issued it and create a new one.
