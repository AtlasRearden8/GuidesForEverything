# README, LICENSE and .gitignore

Three small files make the difference between a folder of code and a project people can understand, use, and trust. This chapter shows how to write a good README, how to choose a license in plain English, and how to keep junk and secrets out of your repository with `.gitignore`.

:::summary In this chapter
- What makes a README genuinely useful
- Choosing a license: MIT, Apache 2.0, GPL, or none
- Writing and testing a `.gitignore`
- The other "community health" files: CONTRIBUTING, CODE_OF_CONDUCT, SECURITY
:::

## The README: your project's front door

GitHub shows `README.md` below the file list, so it's the first thing visitors read. A good README answers five questions, in this order:

1. **What is this?** One or two sentences, in plain English.
2. **Why would I want it?** The problem it solves.
3. **How do I get it running?** Install steps a newcomer can copy.
4. **How do I use it?** One short example, ideally with a screenshot.
5. **How can I help, and under what license?** Links to CONTRIBUTING and LICENSE.

> [!TIP]
> Write the README for a smart friend who has never seen your project. If they would need to message you to get started, the README is missing a step.

### README checklist

:::checklist
- A title and a one-line description
- A screenshot or short example near the top
- Install and run steps, tested on a fresh computer
- Where to report problems (usually the Issues tab)
- The license name, linking to the LICENSE file
:::

## Choosing a license

A **license** is a short legal text that tells others what they may do with your work. Without one, the default copyright laws apply: you keep all rights, and nobody may legally copy, change, or share your code, even if the repository is public. So if you want people to use your work, add a license.

GitHub runs **choosealicense.com** to help you pick. Most projects use one of these:

| License | In one sentence | Choose it if |
|---|---|---|
| **MIT** | Do anything, just keep the copyright notice | You want maximum use with minimum fuss |
| **Apache 2.0** | Like MIT, plus explicit patent permission | Companies may use it and patents matter |
| **GPL-3.0** | Share changes under the same license | You want improvements to stay open |
| **No license** | All rights reserved | You only want people to look, not reuse |

> [!NOTE]
> This is a plain-English summary, not legal advice. For anything commercial or important, read the full text at choosealicense.com or ask a lawyer.

:::steps Add a license on GitHub
1. **Click Add file**, then **Create new file**.
2. **Type `LICENSE`** (all capitals) as the file name.
3. **Click Choose a license template**, which appears once you type the name.
4. **Pick a license** from the list on the left, check the year and name, and click **Review and submit**.
5. **Commit the file.** GitHub now shows the license in the About sidebar.
:::

## .gitignore: keeping files out

Some files should never go into a repository: passwords, huge downloads, and temporary files. List them in a file named `.gitignore` at the top of your project, and Git pretends they don't exist.

```text title=.gitignore
# secrets
.env
# dependencies (re-downloadable)
node_modules/
# system junk
.DS_Store
```

GitHub offers ready-made `.gitignore` templates when you create a repository; pick the one for your language or tool.

### Pattern rules

| Pattern | Matches |
|---|---|
| `notes.txt` | Any file named `notes.txt`, in any folder |
| `/notes.txt` | Only `notes.txt` at the top level |
| `build/` | Any folder named `build`, and everything inside |
| `*.log` | Every file ending in `.log` |
| `!keep.log` | An exception: do track `keep.log` |
| `# comment` | A note for humans; ignored by Git |

### When .gitignore "doesn't work"

`.gitignore` only affects files Git isn't tracking yet. If you already committed a file, adding it to `.gitignore` won't remove it. Tell Git to stop tracking it (the file stays on your computer):

```bash
git rm --cached .env
git commit -m "Stop tracking .env"
```

To find out which rule is ignoring a file, ask Git directly:

```bash
git check-ignore -v path/to/file
```

> [!CAUTION]
> If the file you committed contained a password or key, removing it is not enough: it's still in the history. Change the password or revoke the key first. See the Securing Your Repositories chapter.

### A personal ignore list

Files your own computer creates, like `.DS_Store` on a Mac or editor settings folders, can go in a global ignore file so you don't have to add them to every project:

```bash
git config --global core.excludesFile ~/.gitignore_global
```

Then list the patterns in `~/.gitignore_global` (the `~` means your home folder).

## Community health files

GitHub recognizes a few more files and links to them automatically when people open issues or pull requests. Put them at the top level, in a `docs` folder, or in a `.github` folder.

| File | What it says |
|---|---|
| `CONTRIBUTING.md` | How to suggest changes, and what you expect from contributors |
| `CODE_OF_CONDUCT.md` | How people should treat each other in the project |
| `SECURITY.md` | How to report a security problem privately |
| `SUPPORT.md` | Where to get help |
| `FUNDING.yml` | Shows a **Sponsor** button (in the `.github` folder) |

On a public repository, open **Insights**, then **Community standards**, to see a checklist of which of these you have, with buttons to add the missing ones from templates.

```prompt
Write a short, friendly CONTRIBUTING.md for my small open source
project. Explain how to report a bug, how to suggest a feature,
and how to open a pull request. Ask contributors to open an issue
before starting big changes. Keep it under 300 words.
```

:::checklist
- README answers what, why, install, use, and license
- A LICENSE file chosen on purpose (or deliberately none)
- `.gitignore` covers secrets, dependencies, and system junk
- CONTRIBUTING and SECURITY files for any public project
:::
