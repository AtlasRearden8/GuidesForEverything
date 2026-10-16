# Codespaces and github.dev

Sometimes you want to edit or run a project without installing anything, or from a borrowed computer, a Chromebook, or a tablet. GitHub offers two browser-based editors: **github.dev**, a free lightweight editor, and **Codespaces**, a complete cloud computer.

:::summary In this chapter
- github.dev for quick edits
- Codespaces: creating, stopping, and deleting
- Free monthly usage, and how to stay inside it
- Making a project Codespaces-ready with `devcontainer.json`
:::

## github.dev

Press <kbd>.</kbd> on any repository page, or change `github.com` to `github.dev` in the address. A version of Visual Studio Code opens in your browser with the repository's files.

| You can | You can't |
|---|---|
| Edit many files, search, and preview Markdown | Run code or tests |
| Commit and push from the Source Control panel | Open a terminal |
| Use many VS Code extensions | Install programs |

It's free and needs no setup: ideal for fixing docs or reviewing a pull request.

## Codespaces: a computer in the cloud

**Codespaces** gives you a ready-to-code environment in your browser, with a full VS Code editor, terminal, and tools, running on GitHub's servers. On a repository, click **Code**, choose the **Codespaces** tab, then **Create codespace on main**.

:::steps Work in a codespace
1. **Create it** from the **Code** button (or `gh codespace create`).
2. **Wait a minute** while GitHub builds the machine.
3. **Use the terminal** at the bottom to install packages, run the app, and run tests. Running web apps get a forwarded address you can open.
4. **Commit and push** as normal; the codespace is a full Git clone.
5. **Stop it** when you finish.
:::

> [!TIP]
> Stop codespaces you aren't using. Click **Code**, then **Codespaces**, then the **…** menu, then **Stop codespace**. Idle ones stop automatically after 30 minutes by default, but they still use storage until deleted.

### Life cycle facts

| Fact | Default |
|---|---|
| Idle timeout | Stops after 30 minutes without activity |
| Maximum running time | 12 hours, even while you're active |
| Closing the browser tab | Does *not* stop it; it runs until the timeout |
| Stopped codespaces | Deleted automatically after 30 days of inactivity |

See all of yours at github.com/codespaces, or with `gh codespace list`.

## What it costs

Personal accounts get a free monthly allowance:

| Plan | Compute per month | Storage per month |
|---|---|---|
| Free | 120 core-hours | 15 GB |
| Pro | 180 core-hours | 20 GB |

A 2-core machine uses 2 core-hours per hour, so the Free plan gives about 60 hours on the smallest machine. Without a payment method on file, use stops when the allowance runs out, so you can't be surprised by a bill. Beyond that, pricing starts at $0.18 per hour of compute and $0.07 per GB of storage per month.

## Make a project Codespaces-ready

A **dev container** describes the tools a project needs. Put a `devcontainer.json` in a `.devcontainer` folder, and every codespace is built the same way:

```json title=.devcontainer/devcontainer.json
{
  "name": "Bakery site",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:20",
  "postCreateCommand": "npm install",
  "forwardPorts": [3000]
}
```

Without this file, Codespaces uses a large default image that already includes common languages. VS Code can generate one for you: open the Command Palette and search for "Add Dev Container Configuration Files."

:::checklist
- Opened a repository in github.dev with <kbd>.</kbd>
- Created, used, and stopped a codespace
- Know my free monthly allowance
:::
