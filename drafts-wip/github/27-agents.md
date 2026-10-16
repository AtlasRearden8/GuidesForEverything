# Claude Code and Other AI Agents

AI coding agents use GitHub as their shared workspace: they read your repository, work on branches, and hand back pull requests. Used well, the combination is powerful and safe, because Git records everything and pull requests let you check every line.

:::summary In this chapter
- How Claude Code and other agents work with GitHub
- A safe workflow for AI-written changes
- Prompts that produce reviewable work
:::

## Claude Code and other agents

- **Claude Code** runs `git` and `gh` commands for you. Ask "commit this and open a pull request." Its cloud sessions at claude.ai/code clone your repositories and push branches back.
- Run `/install-github-app` inside Claude Code to install the Claude GitHub App, then mention `@claude` in an issue or pull request to have it do the work.
- **Cursor, Lovable, Bolt, Replit,** and similar tools can connect your GitHub account to save projects to a repository.
- **Copilot**, covered in the previous chapter, can be assigned issues directly.

## A safe workflow for AI changes

:::steps Let an agent work without risk
1. **Protect `main`** with a ruleset requiring pull requests (see Securing Your Repositories), so no agent can push to it directly.
2. **Give each task its own branch.** Several agents can then work in parallel.
3. **Ask for small changes** with a clear definition of done, ideally as a GitHub issue.
4. **Let automated checks run** on the pull request: tests, linting, and security scans.
5. **Review the diff yourself**, using the AI pull request checklist in the Pull Requests chapter.
6. **Squash and merge**, then delete the branch.
:::

> [!WARNING]
> Don't give an agent a personal access token with access to every repository. Use the official apps or sign-in flows, or a fine-grained token limited to one repository and only the permissions it needs.

## Prompts that produce reviewable work

```prompt
Create a new branch for this task. Make the smallest change that
solves it, add or update tests, run them, and commit with clear
messages. Then push and open a draft pull request whose description
explains what changed, why, and how to test it. Don't merge.
```

```prompt
Read the open pull request on this branch and the review comments.
Address each comment with a separate commit, reply to each comment
explaining what you did, and re-run the tests.
```

```prompt
Explain this repository to me as a beginner: what it does, how the
folders are organized, how to run it, and where I'd make a change to
the homepage text.
```

:::checklist
- `main` is protected before any agent touches the repository
- Every agent task happens on its own branch and pull request
- I read every AI diff before merging
:::
