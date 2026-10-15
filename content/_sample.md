---
title: Sample Manual
subtitle: Every building block of the template, on one page
volume: 0
edition: October 2026
accent: "#D97757"
accent2: "#F2C14E"
blurb: |
  This sample exists to test the template. It shows **callouts**, steps, code, tables, badges, menus and the glossary.
---

# Getting Started

This is the lead paragraph. It is a little bigger, and it introduces the chapter in friendly words for a complete beginner.

:::summary In this chapter
- What a terminal is
- How to install the tool
:::

## What is a terminal?

A **terminal** is a text window where you type commands. Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to stop. Open [[Settings > Privacy > Data controls]] to change things. Pricing: {{Free}} {{Freemium}} {{Paid}}.

> [!TIP]
> Use the up-arrow key to repeat the last command.

> [!WARNING] Watch out
> This deletes files.

> [!CAUTION]
> Never paste your API key into a chat.

> [!NOTE]
> Notes are blue.

:::steps Install it
1. **Open a terminal.** On a Mac press <kbd>Cmd</kbd> + <kbd>Space</kbd> and type Terminal.
2. **Run the installer.**
   ```bash
   curl -fsSL https://claude.ai/install.sh | bash
   ```
3. **Check it worked.** Type `claude --version`.
:::

```json title=settings.json
{
  "permissions": {
    "allow": ["Bash(npm run test:*)"],
    "defaultMode": "acceptEdits"
  }
}
```

| Plan | Price | Good for |
|---|---|---|
| Free | $0 | Trying it |
| Pro | $20/mo | Daily use |

:::checklist
- Installed the app
- Logged in
:::

```prompt
Explain this project to me like I'm new to coding.
```

# Glossary {.unnumbered}

:::glossary
Terminal
: A text window for typing commands.

API key
: A secret password that lets a program use a service.
:::
