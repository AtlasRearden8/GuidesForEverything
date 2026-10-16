# The Everyday Workflow

Almost all Git work is the same loop: **change files → stage → commit → push**. Here it is with the command line; GitHub Desktop has a button for each step, covered in its own chapter.

:::summary In this chapter
- Getting a repository onto your computer, or publishing one you already have
- Remotes: how your computer and GitHub talk to each other
- The daily loop, and fetch versus pull
- Writing commit messages people will thank you for
- A day in the life, start to finish
:::

## Get a repository onto your computer

:::steps Clone a repository
1. **Copy the address.** On the repository page, click the green **Code** button and copy the HTTPS URL.
2. **Open a terminal** in the folder where you keep projects.
3. **Clone it.**
   ```bash
   git clone https://github.com/your-username/my-first-repo.git
   cd my-first-repo
   ```
:::

Or, with the GitHub CLI: `gh repo clone your-username/my-first-repo`.

**Cloning** downloads every file *and* the full history, and remembers where it came from, so `git push` and `git pull` know where to go.

### Publishing a folder you already have

Starting from a folder you already have instead? Turn it into a repository and publish it in one go:

```bash
cd my-project
git init
git add .
git commit -m "First commit"
gh repo create my-project --private --source=. --push
```

Without the GitHub CLI, create an empty repository on github.com first (don't tick "Add a README"), then connect and push:

```bash
git remote add origin https://github.com/your-username/my-project.git
git push -u origin main
```

## Remotes, explained

A **remote** is a named address of another copy of your repository. When you clone, Git creates one called `origin` pointing at GitHub.

| Command | What it does |
|---|---|
| `git remote -v` | List remotes and their addresses |
| `git remote add origin <url>` | Add a remote named `origin` |
| `git remote set-url origin <url>` | Change the address (for example after renaming) |
| `git push -u origin main` | Push, and remember `origin/main` as the partner of `main` |

The `-u` (short for `--set-upstream`) only needs to be used once per branch. After that, plain `git push` and `git pull` know where to go.

## Save and share changes

:::steps The daily loop
1. **See what changed.**
   ```bash
   git status
   ```
2. **Stage the changes you want to save.** A dot means "everything in this folder."
   ```bash
   git add .
   ```
3. **Commit with a clear message.**
   ```bash
   git commit -m "Add contact page"
   ```
4. **Push to GitHub.**
   ```bash
   git push
   ```
5. **Get other people's changes** before you start work next time.
   ```bash
   git pull
   ```
:::

### Fetch versus pull

| Command | What it does | Safe? |
|---|---|---|
| `git fetch` | Downloads new commits from GitHub, but doesn't touch your files | Always |
| `git pull` | Fetches, then merges those commits into your current branch | Usually; may cause a conflict |

After a `git fetch`, `git status` tells you whether you're **ahead** (you have commits GitHub doesn't), **behind** (GitHub has commits you don't), or both (**diverged**). Ahead means push; behind means pull; diverged means pull, fix any conflicts, then push.

> [!TIP]
> Pull at the start of every work session and before you push. The fewer hours your copy drifts from GitHub's, the smaller and rarer your conflicts.

## Writing good commit messages

A commit message is a note to your future self. Make it short and specific, and start with a verb:

- Good: `Fix crash when cart is empty` · `Add opening hours to homepage`
- Not so good: `stuff` · `changes` · `asdf`

### Simple rules that work

1. **Write the title as a command:** "Add", "Fix", "Remove", "Update". Imagine it finishing the sentence "If applied, this commit will…".
2. **Keep the title under about 50 characters.** GitHub cuts off long titles.
3. **Explain *why* in the body** when it isn't obvious. The diff already shows *what*.
4. **One idea per commit.** "Fix typo and redesign header" should be two commits.

Some teams use **Conventional Commits**, a convention that starts each message with a type, such as `feat: add gift cards` or `fix: correct VAT rounding`. Follow whatever the project already does.

### How often should I commit?

Commit whenever you reach a small point you might want to return to: a feature works, a bug is fixed, a page is drafted. Several commits an hour is normal. Commits are cheap; lost work isn't.

## Looking back in time

| Command | What it shows |
|---|---|
| `git log --oneline` | A compact list of past commits |
| `git diff` | Exactly what you changed since the last commit |
| `git show <commit-id>` | The details of one commit |
| `git restore <file>` | Throw away uncommitted changes to a file |
| `git revert <commit-id>` | Create a new commit that undoes an old one, safely |

> [!WARNING]
> Be careful with commands that contain `--force`, `reset --hard`, or `clean`. They can permanently discard work. If an AI agent wants to run one, read what it's about to do first.

The Git Fundamentals chapter covers history in depth, and the Undoing Mistakes chapter is your recipe book for when things go wrong.

## A day in the life

Here's a realistic morning, start to finish, on a small website project:

```bash
cd ~/projects/bakery-site
git pull                      # get yesterday's changes from a teammate
git switch -c winter-hours    # start a branch for today's task
# ...edit hours.html in your editor...
git status                    # check what changed
git diff                      # read the changes
git add hours.html
git commit -m "Add winter opening hours"
git push -u origin winter-hours
gh pr create --fill           # open a pull request for review
```

Branches and pull requests are the subject of the next chapters. You'll see this exact pattern again and again.

```prompt
Look at my uncommitted changes, group them into sensible small
commits with clear messages starting with a verb, show me the plan,
and then make the commits once I approve. Don't push.
```

:::checklist
- I can clone a repository and publish an existing folder
- `git remote -v` shows `origin` pointing at GitHub
- I pull before starting and before pushing
- My commit messages start with a verb and explain why
:::
