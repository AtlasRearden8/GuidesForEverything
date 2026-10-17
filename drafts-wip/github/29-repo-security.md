# Securing Your Repositories

A secure account is half the story. This chapter covers protecting the repositories themselves: keeping secrets out, keeping dependencies patched, scanning code, and making sure changes to `main` always go through review.

:::summary In this chapter
- Never committing secrets, and what to do if you do
- Secret scanning and push protection
- Dependabot alerts, security updates, and version updates
- Code scanning with CodeQL
- Rulesets and branch protection
:::

## Never commit secrets

A **secret** is anything that grants access: passwords, API keys, tokens. Once pushed, assume a secret is compromised, even if you delete it afterwards, because it remains in the history.

- Keep secrets in a `.env` file and list `.env` in `.gitignore`.
- For Actions, store secrets in [[Settings > Secrets and variables > Actions]].
- GitHub's **push protection** blocks many common secret formats from being pushed to public repositories, and you can turn it on for others under [[Settings > Advanced Security]] (called **Code security** on some accounts).

> [!CAUTION] Leaked a key?
> Revoke or rotate it immediately at the service that issued it (for example, generate a new API key and delete the old one). Removing it from GitHub is not enough.

## Secret scanning and push protection

**Secret scanning** looks through your repository for known kinds of keys and tokens. On public repositories it runs automatically, for free, and GitHub notifies partner services (such as cloud providers) so they can revoke leaked credentials. For private repositories owned by organizations, it's part of the paid **GitHub Secret Protection** product.

**Push protection** stops a push that contains a secret, before it ever reaches GitHub. **Push protection for users** is on by default for your account and covers pushes to public repositories. If it blocks you, remove the secret from your commit (for example with `git commit --amend` or `git reset --soft HEAD~1`), rather than bypassing it.

## Dependabot

Your project probably uses other people's code (**dependencies**). When one of them has a known security hole, **Dependabot** can tell you and fix it.

:::steps Turn on Dependabot
1. **Open Settings**, then **Advanced Security** (in the "Security and quality" part of the sidebar).
2. **Under Dependabot, click Enable** for **Dependabot alerts**, **Dependabot security updates**, and (optionally) **Dependabot version updates**.
3. **See alerts** on the repository's **Security and quality** tab, under **Dependabot**.
:::

| Feature | Does |
|---|---|
| **Alerts** | Warns you when a dependency has a known vulnerability |
| **Security updates** | Opens pull requests that upgrade to a fixed version |
| **Version updates** | Opens regular pull requests to keep everything current |

Version updates are configured in a `.github/dependabot.yml` file. This one keeps npm packages and your Actions versions up to date:

```yaml title=.github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

Treat Dependabot pull requests like any other: let the checks run, then merge.

## Code scanning with CodeQL

**Code scanning** analyzes your own code for security bugs, such as unsafe handling of user input. GitHub's engine is called **CodeQL**. It's free for public repositories (private ones need **GitHub Code Security**).

:::steps Enable default setup
1. **Open [[Settings > Advanced Security]].**
2. **Next to CodeQL analysis, click Set up, then Default.**
3. **Review and click Enable CodeQL.** It runs as an Actions workflow, on pushes and pull requests and on a weekly schedule.
:::

Results appear on the **Security and quality** tab and as comments on pull requests.

## Protect your main branch

A **ruleset** is a named list of rules about who can change which branches, and how. It's the best safety net when several people or AI agents push code.

:::steps Create a ruleset for main
1. **Open [[Settings > Rules > Rulesets]]**, click **New ruleset**, then **New branch ruleset**.
2. **Name it** "Protect main" and set **Enforcement status** to **Active** (new rulesets start as Disabled).
3. **Target branches:** click **Add target** and choose **Include default branch**.
4. **Tick the rules** you want (see below).
5. **Optionally add a bypass** for admins, then click **Create**.
:::

| Rule | Effect |
|---|---|
| **Restrict deletions** | Nobody can delete `main` |
| **Block force pushes** | Nobody can rewrite `main`'s history |
| **Require a pull request before merging** | No direct pushes; set required approvals here |
| **Require status checks to pass** | Tests must be green before merging |
| **Require linear history** | Only squash or rebase merges |
| **Require signed commits** | Commits must show as Verified |

> [!NOTE]
> On the Free plan, rulesets and protected branches work on public repositories. For private repositories you need GitHub Pro (personal) or GitHub Team (organizations). Older repositories may also show classic **branch protection rules** under [[Settings > Branches]]; both kinds work together.

## Security policy

Add a `SECURITY.md` file explaining how to report a vulnerability privately, so people don't post security problems in public issues.

:::checklist
- No secrets in the repository; `.env` is ignored
- Dependabot alerts and security updates on
- `dependabot.yml` keeps Actions and packages current
- CodeQL default setup enabled (public repos)
- A ruleset protects `main`: pull requests required, no force pushes or deletions
- `SECURITY.md` explains how to report problems
:::
