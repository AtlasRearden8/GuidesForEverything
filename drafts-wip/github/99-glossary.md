
# Glossary {.unnumbered}

:::glossary
AI agent
: A program that can take actions, such as running commands or editing files, not just chat.

AI credits
: The unit Copilot uses to measure heavier usage; one credit is $0.01.

Alt text
: A written description of an image, read aloud by screen readers.

Annotated tag
: A tag that stores a message, author, and date; used for releases.

Artifact
: A file saved from a GitHub Actions run, such as a build, that you can download.

Branch
: A separate line of development, letting you change things without affecting the main version.

Blame
: A view showing which commit last changed each line of a file.

Clone
: Download a complete copy of a repository, including its history, to your computer.

Code owner
: A person or team listed in a CODEOWNERS file who is asked to review changes to certain files.

Code scanning
: Automatic analysis of your code for security bugs, for example with CodeQL.

Codespace
: A cloud computer with an editor and terminal, created from a repository.

Commit
: A saved snapshot of your files with a message explaining the change.

Conflict markers
: The `<<<<<<<`, `=======`, and `>>>>>>>` lines Git writes into a file during a merge conflict.

Cron
: A five-field text format for describing schedules, used by scheduled workflows.

Dependabot
: GitHub's tool that warns about and updates vulnerable or outdated dependencies.

Dependency
: Someone else's code that your project uses.

Detached HEAD
: Looking at a specific old commit rather than standing on a branch.

Dev container
: A configuration, usually `devcontainer.json`, describing the tools a codespace needs.

Diff
: A before-and-after view of changes, with removed lines marked `-` and added lines `+`.

Discussion
: A forum-style conversation inside a repository, for questions and ideas.

Draft pull request
: A pull request marked as not ready for review; it can't be merged.

Environment
: A named deployment target in Actions, with its own secrets and protection rules.

Fast-forward
: A merge where Git simply moves the branch label forward, with no merge commit.

Fetch
: Download new commits from GitHub without changing your files.

Fine-grained token
: A personal access token limited to chosen repositories and permissions.

Fork
: Your own copy of someone else's repository on GitHub, used to propose changes.

Git
: Free software that tracks the history of files in a folder.

GitHub
: A website that hosts Git repositories and adds collaboration tools.

GitHub Actions
: GitHub's automation system for running tasks when events happen in a repository.

GitHub CLI
: The `gh` command-line program for working with GitHub from a terminal.

GitHub Desktop
: GitHub's free app for using Git with buttons instead of commands.

GitHub flow
: A simple routine: branch from main, open a pull request, review, merge, delete the branch.

GitHub Mobile
: GitHub's official app for iOS and Android.

GitHub Pages
: Free website hosting straight from a repository.

github.dev
: A lightweight browser editor for a repository, opened with the period key.

GITHUB_TOKEN
: The automatic, short-lived credential every Actions run receives.

.gitignore
: A file listing which files Git should never track.

Hash
: The unique ID of a commit, such as `3f9a2c1`.

HEAD
: Git's name for where you are now, usually the newest commit on your current branch.

Interactive rebase
: `git rebase -i`, which lets you reword, combine, or drop recent commits.

Issue
: A tracked to-do, bug report, or idea on GitHub.

Label
: A colored tag for sorting issues and pull requests.

License
: A legal text saying what others may do with your work.

Linter
: A tool that checks code for style problems and common mistakes.

Main
: The default branch, which holds the official version of a project.

Markdown
: A simple text formatting language used across GitHub.

Matrix
: An Actions setting that runs the same job once for each value, such as several versions.

Merge
: Combine the changes from one branch into another.

Merge commit
: A commit with two parents, recording that two branches were combined.

Merge conflict
: When two branches changed the same lines differently, and a person must choose the result.

Milestone
: A group of issues and pull requests working toward a goal or date.

Organization
: A shared GitHub account that owns repositories, with members and teams.

Passkey
: A passwordless sign-in method using your device's fingerprint, face, or PIN.

Personal access token
: A password-like string that lets a program act on your GitHub account with limited permissions.

Project
: A GitHub planning board, table, or roadmap built from issues and pull requests.

Pull
: Download new commits from GitHub to your computer and merge them.

Pull request
: A proposal to merge one branch into another, with review and discussion.

Push
: Upload your commits from your computer to GitHub.

Push protection
: A feature that blocks pushes containing secrets.

Rebase
: Replay your commits on top of another branch, giving a straight-line history.

README
: The front-page document of a repository, usually `README.md`.

Recovery codes
: One-time codes that let you into your account if you lose your 2FA devices.

Reflog
: Git's record of everywhere HEAD has been, used to recover lost commits.

Release
: A GitHub page for a tagged version, with notes and downloadable files.

Remote
: A copy of the repository hosted elsewhere, usually GitHub, named `origin` by default.

Remote-tracking branch
: A read-only bookmark, like `origin/main`, of where a GitHub branch was at your last fetch.

Repository
: A project folder tracked by Git, together with its full history.

Revert
: Undo a commit by adding a new commit that does the opposite.

Reset
: Move a branch back to an earlier commit, removing later commits from it.

Ruleset
: Settings that protect branches, for example requiring pull requests before changes reach main.

Runner
: The machine that runs an Actions job.

Secret
: Any password, key, or token that grants access and must be kept private.

Secret scanning
: Automatic searching of a repository for leaked keys and tokens.

Semantic versioning
: Version numbers in the form MAJOR.MINOR.PATCH.

SSH key
: A key pair that lets Git connect to GitHub without a browser sign-in.

Staging area
: The list of changes chosen to go into the next commit.

Stash
: A shelf where Git keeps uncommitted changes so you can come back to them.

Sub-issue
: A smaller issue nested under a parent issue.

Squash
: Combine several commits into one.

Tag
: A permanent name for one commit, such as `v1.0.0`.

Team
: A group of organization members that can be given access and mentioned together.

Terminal
: A window for typing commands instead of clicking.

Two-factor authentication
: Signing in with a password plus a second proof, such as a phone code.

Upstream
: The original repository that a fork was copied from.

Version control
: A system that records changes to files over time so you can recall any version.

Workflow
: An automation defined in a YAML file for GitHub Actions.

YAML
: A plain-text format for settings files, using indentation and `name: value` pairs.
:::
