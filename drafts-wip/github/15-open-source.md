# Forking and Contributing to Open Source

**Open source** software is published with a license that lets anyone use, study, change, and share it. Much of the internet runs on it, and most projects welcome help, including from beginners and including help that isn't code: fixing typos, improving instructions, reporting bugs, and translating.

:::summary In this chapter
- Forks: your own copy of someone else's project
- Finding a project and a good first issue
- The full contribution workflow, step by step
- Keeping your fork up to date
- Etiquette that gets your pull request merged
:::

## What a fork is

You can't push to other people's repositories. A **fork** is your own copy of their repository, under your account, which you *can* change. You make changes in your fork and then open a pull request from your fork back to the original, called the **upstream** repository.

```text
upstream (their repo)  --Fork-->  your fork on GitHub  --clone-->  your computer
        ^                                                              |
        +------------------ pull request <---- push <------------------+
```

## Finding something to work on

- **Projects you already use** are the best start: you understand the problem.
- **Good first issues:** search `is:issue is:open label:"good first issue"`, or visit a repository's **Issues** tab and filter by that label. The `help wanted` label means maintainers want outside help.
- **From the terminal:** `gh search repos --good-first-issues=">=5" --language=python`.
- **Read before you start:** the README, `CONTRIBUTING.md`, and `CODE_OF_CONDUCT.md`. They tell you how the project likes to work.

> [!TIP]
> Comment on the issue before you begin ("I'd like to work on this; my plan is…") so nobody duplicates your effort and maintainers can steer you.

## The contribution workflow

:::steps Contribute a change
1. **Fork.** On the project page, click **Fork**, then **Create fork**. Or `gh repo fork owner/project --clone`.
2. **Clone your fork.**
   ```bash
   git clone https://github.com/your-username/project.git
   cd project
   ```
3. **Add the original as `upstream`.** (`gh repo fork --clone` does this for you.)
   ```bash
   git remote add upstream https://github.com/owner/project.git
   ```
4. **Create a branch** for your change.
   ```bash
   git switch -c fix-typo-in-install-docs
   ```
5. **Make the change**, following the project's style, and run its tests if it has any.
6. **Commit and push to your fork.**
   ```bash
   git commit -am "Fix typo in install instructions"
   git push -u origin fix-typo-in-install-docs
   ```
7. **Open the pull request.** GitHub shows **Compare & pull request**; check the base is the *upstream* repository's `main`. Fill in any template.
8. **Respond to review** by pushing more commits to the same branch.
:::

## Keeping your fork up to date

The original project keeps moving. Bring its changes into your fork:

- **On the website:** on your fork's page, click **Sync fork**, then **Update branch**.
- **With gh:** `gh repo sync your-username/project -b main`.
- **With Git:**
  ```bash
  git switch main
  git fetch upstream
  git merge upstream/main
  git push
  ```

Start each new contribution from a freshly synced `main`.

## Etiquette that gets pull requests merged

- **Small and focused.** One fix per pull request is far easier to review.
- **Follow the instructions** in CONTRIBUTING, including tests and commit style.
- **Explain the why**, and link the issue.
- **Be patient.** Maintainers are often volunteers. A polite nudge after a week or two is fine.
- **Accept "no" gracefully.** A project may decline changes that don't fit its plans.
- **Disclose AI help** if the project asks, and always understand and test what you submit.

| Situation | What to do |
|---|---|
| CI checks fail on your PR | Click **Details**, read the log, fix, push again |
| Maintainer asks for changes | Push commits to the same branch; don't open a new PR |
| Your branch has conflicts | Sync your fork, merge `main` into your branch, push |
| No response for weeks | Comment politely, or ask in the project's chat or Discussions |

:::checklist
- Forked and cloned a project, with `upstream` set
- Found an issue labeled `good first issue` and commented on it
- Opened a small, well-described pull request
- Synced my fork before starting the next one
:::
