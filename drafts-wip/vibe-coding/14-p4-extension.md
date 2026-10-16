# Project 4: A Chrome Extension

A **browser extension** is a small add-on that changes how your browser works: a button in the toolbar, a tweak to certain websites, a handy popup. Extensions are perfect vibe-coding projects: small, useful, and entirely yours. This project uses an AI agent on your computer (Claude Code, Codex, or Cursor), because browser builders don't make extensions.

:::summary In this project
- How extensions are put together
- Build a "Read Later" extension with an AI agent
- Load and test it in Chrome
- Iterate, add icons, and optionally publish to the Chrome Web Store
:::

| | |
|---|---|
| **Time** | 1–2 hours |
| **Cost** | Free (publishing has a one-time registration fee) |
| **Tools** | Google Chrome; Claude Code, Codex, or Cursor |
| **You'll learn** | Working with local files, manifests, permissions, reloading |

## How an extension is put together

An extension is just a folder of files:

| File | What it does |
|---|---|
| `manifest.json` | The ID card: name, version, permissions, which files to use |
| `popup.html` | The little window that opens when you click the toolbar icon |
| `popup.js` | The popup's behavior |
| `popup.css` | The popup's look |
| `icons/` | Toolbar and store icons in a few sizes |

Chrome extensions use **Manifest V3**, the current format. If an AI ever writes `"manifest_version": 2`, ask it to use version 3.

**Permissions** are what your extension asks the browser to allow, such as storing data or reading the current tab. Ask for as few as possible: users see the list when they install, and fewer permissions means less risk.

## Step 1: Make a folder and open your agent

:::steps Set up
1. **Create a folder** called `read-later` somewhere easy, like your Documents folder.
2. **Open it in your tool.** In Cursor or VS Code: [[File > Open Folder]]. For Claude Code, open a terminal in that folder and run `claude`, or use the desktop app and choose the folder.
3. **Optional but wise:** ask the agent to set up Git: "Initialize a Git repository here and commit after each working step."
:::

## Step 2: Describe the extension

```prompt
Build a Chrome extension (Manifest V3) called "Read Later".
Clicking the toolbar icon opens a popup with:
- a "Save this page" button that stores the current tab's title
  and address;
- a list of saved pages (newest first), each clickable to open it
  in a new tab, with a small "remove" button.
Store the list with chrome.storage.local. Use only the permissions
it truly needs and explain each one. Clean, compact design, 320px
wide. No external libraries, no tracking, no network requests.
```

The agent will create the files. Its manifest should look something like this:

```json title=manifest.json
{
  "manifest_version": 3,
  "name": "Read Later",
  "version": "1.0",
  "description": "Save pages to read later.",
  "action": { "default_popup": "popup.html" },
  "permissions": ["storage", "activeTab"],
  "icons": { "128": "icons/icon128.png" }
}
```

`storage` lets it save your list; `activeTab` lets it read the current tab's title and address, but only when you click the extension.

## Step 3: Load it into Chrome

:::steps Load an unpacked extension
1. **Open Chrome** and type `chrome://extensions` in the address bar.
2. **Turn on Developer mode** with the toggle at the top right.
3. **Click Load unpacked** and choose your `read-later` folder.
4. **Pin it.** Click the puzzle-piece icon in Chrome's toolbar and pin Read Later.
5. **Try it.** Open any article, click the icon, and press "Save this page."
:::

## Step 4: Iterate

Every time the agent changes files, Chrome needs to reload the extension: on `chrome://extensions`, click the circular **reload** arrow on its card, then reopen the popup.

Ideas for next slices, one at a time:

1. "Add a search box to filter saved pages."
2. "Show how many pages are saved as a number on the toolbar icon."
3. "Add a keyboard shortcut to save the current page."
4. "Add an 'export as text' button that copies the list to the clipboard."

## Finding errors in an extension

Extensions have their own error areas:

- On `chrome://extensions`, an **Errors** button appears on the card when something fails. Click it and copy the message to your agent.
- To see the popup's console, right-click inside the open popup and choose **Inspect**.

```prompt
The popup opens but saving does nothing. Here's the error from the
Errors button on chrome://extensions: [paste]. Find the cause and fix it.
```

## Step 5: Icons and polish

```prompt
Create simple icons for the extension at 16, 32, 48, and 128 pixels:
a bookmark shape in deep purple on a transparent background. Add
them to the manifest. Then review the popup for accessibility:
keyboard navigation, focus outlines, and readable contrast.
```

## Step 6: Publish to the Chrome Web Store (optional)

You can keep using an unpacked extension forever. To share it publicly:

:::steps Publish
1. **Register as a Chrome Web Store developer** in the developer dashboard and pay the one-time registration fee. Google suggests a dedicated email address for this account.
2. **Zip the extension folder** (ask your agent to create the ZIP, excluding Git files).
3. **Upload it** in the dashboard and fill in the listing: description, screenshots, category.
4. **Complete the privacy section** honestly. Read Later stores data only on the user's computer and sends nothing anywhere; say so.
5. **Submit for review.** Reviews can take a few days. Fewer permissions usually means a smoother review.
:::

| Problem | Fix |
|---|---|
| "Manifest file is missing or unreadable" | You picked the wrong folder; choose the one containing `manifest.json` |
| Changes don't show up | Click reload on the extension's card, then reopen the popup |
| Saved list disappears | Make sure it uses `chrome.storage`, not variables in the popup |
| Store review rejected | Read the reason; usually unused permissions or an unclear privacy statement |

:::checklist
- Extension uses Manifest V3 and minimal permissions
- Loads unpacked without errors
- Saved pages survive closing and reopening Chrome
- Icons at all sizes
- Code committed to Git
:::

