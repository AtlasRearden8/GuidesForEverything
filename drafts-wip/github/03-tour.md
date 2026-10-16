# A Tour of the GitHub Website

Before you create anything, it helps to know your way around. This chapter is a guided walk through the screens you'll use most, so nothing looks unfamiliar later.

:::summary In this chapter
- The top bar and your dashboard
- The anatomy of a repository page
- What each repository tab is for
- Stars, watching, and forks
- Searching GitHub, and keyboard shortcuts that save time
:::

## The top bar

The strip across the top of every page is your control panel.

| Item | What it does |
|---|---|
| **GitHub logo** (left) | Takes you home to your dashboard |
| **Search box** | Finds repositories, code, issues, and people |
| **+ menu** | Create a new repository, issue, gist, or organization |
| **Copilot icon** | Opens Copilot Chat, if you use Copilot |
| **Bell / inbox icon** | Your notifications |
| **Profile picture** | Your profile, repositories, stars, settings, and sign out |

## Your dashboard

When you're signed in, github.com shows your **dashboard**: a feed of recent activity from people and projects you follow, plus a list of your repositories on the left. Use the left list as a quick launcher for projects you visit often.

## Anatomy of a repository page

A **repository page** (github.com/*owner*/*name*) is where you'll spend most of your time. From top to bottom:

1. **The name line.** The owner and repository name, a Public or Private label, and the **Watch**, **Fork**, and **Star** buttons.
2. **The tabs.** Code, Issues, Pull requests, Actions, and more (see the next table).
3. **The branch menu.** Shows which branch you're looking at, usually `main`. Click it to switch branches or create one.
4. **The green Code button.** Copy the address for cloning, open a codespace, or download a ZIP.
5. **The latest commit line.** Who changed something last, the message, and a link to the full history (the clock icon with the number of commits).
6. **The file list.** Folders and files. Click any name to open it.
7. **The README.** The project's welcome page, shown below the files.
8. **The About sidebar** (right). A description, website link, topics, license, and links to **Releases** and **Packages**.

### What the tabs are for

| Tab | Use it to |
|---|---|
| **Code** | Browse files, branches, and history |
| **Issues** | Track bugs, tasks, and ideas |
| **Pull requests** | Propose, review, and merge changes |
| **Actions** | See automations run, and read their logs |
| **Projects** | Plan work on boards and tables |
| **Wiki** | Longer documentation pages (if turned on) |
| **Security and quality** | Vulnerability alerts and scanning results |
| **Insights** | Graphs of activity, contributors, and traffic |
| **Settings** | Repository options (only if you're an admin) |

> [!NOTE]
> On narrow windows, some tabs hide behind a **…** menu at the end of the tab row. If you can't find a tab, look there first.

## Stars, watching, and forks

- **Star** is a bookmark and a thank-you. Starred repositories are listed under your profile's **Stars** tab, and star counts show how popular a project is.
- **Watch** controls notifications for that repository: everything, only what involves you, or nothing.
- **Fork** makes your own copy of the repository under your account, which you can change freely. The Forking and Open Source chapter explains when and why.

## Finding things

### The search box

Type words into the search box and press <kbd>Enter</kbd>, then use the filters on the left (Code, Repositories, Issues, Pull requests, Users) to narrow the results. You can also type **qualifiers** (little filters written as `name:value`) straight into the box:

| Type this | To find |
|---|---|
| `user:octocat` | Everything owned by that account |
| `repo:owner/name bug` | The word "bug" in one repository |
| `language:python stars:>100` | Popular Python projects |
| `is:issue is:open label:"good first issue"` | Beginner-friendly open issues |
| `is:pr author:@me` | Pull requests you opened |

### Exploring

Visit **github.com/explore** for recommended projects and topics, and **github.com/trending** for repositories getting lots of stars this week. Both are good ways to see how other people structure their projects.

## Keyboard shortcuts

Press <kbd>?</kbd> on any GitHub page to see the shortcuts available there. The most useful ones:

:::compact
| Keys | Action |
|---|---|
| <kbd>S</kbd> or <kbd>/</kbd> | Jump to the search box |
| <kbd>.</kbd> | Open the repository in the github.dev editor |
| <kbd>T</kbd> | File finder: type part of a file name |
| <kbd>L</kbd> | Jump to a line number in a file |
| <kbd>B</kbd> | Show blame (who last changed each line) |
| <kbd>Y</kbd> | Turn the address into a permanent link to this exact version |
| <kbd>G</kbd> then <kbd>C</kbd> | Go to the Code tab |
| <kbd>G</kbd> then <kbd>I</kbd> | Go to Issues |
| <kbd>G</kbd> then <kbd>P</kbd> | Go to Pull requests |
| <kbd>G</kbd> then <kbd>A</kbd> | Go to Actions |
| <kbd>G</kbd> then <kbd>N</kbd> | Go to your notifications |
:::

> [!TIP]
> Shortcuts only work when your cursor isn't inside a text box. Click on an empty part of the page first.

:::checklist
- I can find the + menu, notifications, and Settings
- I know what the Code, Issues, Pull requests, and Actions tabs are for
- I've starred one interesting project
- I've tried <kbd>?</kbd> and <kbd>T</kbd> on a repository
:::
