# Troubleshooting

Find the message or symptom you're seeing. Most fixes take one command. If you're unsure, ask an AI agent to explain the situation *before* changing anything, using the prompt in the Undoing Mistakes chapter.

## Setup and sign-in

| Problem | Fix |
|---|---|
| `git: command not found` | Git isn't installed, or the terminal was open during install; reinstall and open a new terminal |
| `Please tell me who you are` | Run the two `git config --global user.…` commands from the Install Git chapter |
| `Authentication failed` / asked for a password | Sign in with `gh auth login`, GitHub Desktop, or Git Credential Manager. Your account password won't work. |
| `Permission denied (publickey)` | SSH key missing or not added to GitHub; test with `ssh -T git@github.com`, or use HTTPS |
| `Repository not found` | Wrong address, or you don't have access to a private repo; check `git remote -v` |
| `push declined due to email privacy` | Set `user.email` to your noreply address and amend the commit |
| Stuck in a strange editor | It's Vim: press <kbd>Esc</kbd>, type `:wq`, press <kbd>Enter</kbd> |

## Everyday Git

| Problem | Fix |
|---|---|
| `fatal: not a git repository` | You're not inside a repository folder. `cd` into it, or run `git init`. |
| `rejected … (fetch first)` when pushing | Someone else pushed first. Run `git pull`, fix any conflicts, then `git push`. |
| `no upstream branch` | First push of a branch: `git push -u origin branch-name` |
| `nothing to commit, working tree clean` | All changes are already committed; check you saved the file |
| `Your local changes would be overwritten` | Commit, or `git stash`, then retry |
| `src refspec main does not match any` | No commits yet, or the branch is called `master`; commit first or check `git branch` |
| `refusing to merge unrelated histories` | The GitHub repo had its own first commit; `git pull origin main --allow-unrelated-histories`, then push |
| `detached HEAD` | You're on an old commit; `git switch main`, or `git switch -c new-branch` to keep work |
| Committed to the wrong branch | Ask your AI agent, or run `git switch -c new-branch` to keep the work on a new branch before switching back. |
| `.gitignore` is ignored | The file was already tracked: `git rm --cached file` and commit |
| File over 100 MB rejected | Remove it from the commit (`git reset --soft HEAD~1`) and use Git LFS or keep it out of the repo |

## Branches, merges, and rebases

| Problem | Fix |
|---|---|
| `CONFLICT (content)` | Follow the Merging chapter: edit, `git add`, `git commit` |
| `You have unmerged paths` | Finish resolving, or `git merge --abort` |
| Rebase went wrong | `git rebase --abort`, or find the old state with `git reflog` |
| Push rejected after rebase | `git push --force-with-lease` (your own branch only) |
| Lost commits | `git reflog`, then `git switch -c rescued <hash>` |
| Can't delete a branch | Switch to another branch first; use `-D` only if you're sure |

## GitHub website and features

| Problem | Fix |
|---|---|
| PR says "This branch has conflicts" | Click **Resolve conflicts**, or merge `main` into the branch locally |
| Merge button greyed out | A ruleset needs approvals or passing checks; see the messages above the button |
| Can't see Settings | You aren't an admin of that repository; look under the **…** menu |
| Issue didn't close after merge | The PR merged into a non-default branch, or the keyword was misspelled |
| Pages site shows 404 | Check that `index.html` is in the folder you chose, wait a few minutes, and check the Actions tab for errors. |
| Workflow doesn't run | File not in `.github/workflows/`, YAML error, or the trigger doesn't match the branch |
| Workflow can't find a secret | Name misspelled, or the run came from a fork |
| Push blocked: secret detected | Remove the secret from the commit; rotate it if it was real |
| Codespace won't start | Free allowance used up; check billing, or wait for the monthly reset |
| Accidentally committed a secret | Revoke the secret at its source first, then remove it from the repo. |
| Locked out after losing phone | Use a recovery code, passkey, or security key; see Securing Your Account |

# Quick Reference {.unnumbered}

:::cheatsheet
**Set up once:** `git config --global user.name "Name"` · `git config --global user.email "you@example.com"` · `gh auth login`

**Start:** `git clone <url>` · or `git init` then `gh repo create <name> --private --source=. --push`

**Daily loop:** `git status` → `git add .` → `git commit -m "message"` → `git push` · Start of day: `git pull`

**Look first:** `git status` · `git diff` · `git diff --staged` · `git log --oneline --graph --all`

**Branch:** `git switch -c <name>` · `git push -u origin <name>` · `gh pr create` · back to main: `git switch main` · tidy: `git branch -d <name>`

**Merge and rebase:** `git merge <branch>` · `git merge --abort` · `git rebase origin/main` · `git rebase --continue` / `--abort` · `git push --force-with-lease`

**Undo:** discard edits `git restore <file>` · unstage `git restore --staged <file>` · fix last commit `git commit --amend` · undo last commit, keep work `git reset --soft HEAD~1` · undo a pushed commit `git revert <id>` · find lost work `git reflog` · shelve `git stash` / `git stash pop`

**Pull requests:** `gh pr checkout <n>` · `gh pr checks --watch` · `gh pr review <n> --approve` · `gh pr merge <n> --squash --delete-branch`

**Releases:** `git tag -a v1.0.0 -m "msg"` · `git push origin v1.0.0` · `gh release create v1.0.0 --generate-notes`

**Website:** [[Settings > Pages]] → Deploy from a branch → `main` / root

**Security:** 2FA + recovery codes · fine-grained tokens · Dependabot on · ruleset protecting `main`
:::
