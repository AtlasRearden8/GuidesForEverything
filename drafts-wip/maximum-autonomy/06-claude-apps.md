
# Claude Desktop, Cowork, and claude.ai

The Claude apps (Desktop, the web at claude.ai, and mobile) put agents in friendlier windows. Under the hood, the desktop **Code** tab is the same Claude Code you met in the last two chapters, while **Cowork** and **connectors** have their own approval switches.

:::summary In this chapter
- Bypass and auto mode in the desktop Code tab
- Claude Code in VS Code and JetBrains
- Cowork's "Automatically approve" mode
- Setting every connector tool to "Always allow"
- Claude in Chrome's per-site approvals
:::

## The Code tab in Claude Desktop

The Code tab uses the same engine and settings files as the CLI.

:::steps Enable bypass in the desktop app
1. **Open Settings** in Claude Desktop and go to **Claude Code**.
2. **Turn on "Allow bypass permissions mode."** On Pro and Max plans this is a personal toggle; on Team and Enterprise, your organization's policy controls it.
3. **Choose the mode.** In a session, open the mode selector next to the send button (or press <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>M</kbd>) and pick **Bypass permissions**, or **Auto** for classifier-reviewed autonomy.
4. **It sticks per folder.** The desktop app remembers the mode you pick for each project folder (except Plan). A `defaultMode` in `~/.claude/settings.json` sets the starting point for new folders.
:::

**Still asks in the desktop app:** the Claude Code list from Chapter 3, plus **safety classifiers on actions Claude takes on external websites** in the built-in browser (any mode), and destructive desktop actions such as deleting a session. On websites, Claude won't purchase things, create accounts, or solve CAPTCHAs without you. Answer a site's first action card with **Always allow** to stop repeat prompts for that site.

## Cowork

**Cowork** (a tab in Claude Desktop) does longer agentic work on your files, in your browser, and through connectors.

- In the Cowork mode selector, choose **Automatically approve**. On Team and Enterprise, an admin must leave **Allow "Automatically approve" mode** on (it's on by default) in [[Organization settings > Cowork > Permissions]].
- For connector **write** tools to stop asking every task, your admin must also turn on **Allow "Always allow" for connector tools** (off by default on Team and Enterprise). Then choose **Allow for all tasks** in the approval dialog.

## Connectors in claude.ai and the Claude apps

Each connector's tools can be set to **Always allow**, **Needs approval**, or **Blocked**.

:::steps Make connectors hands-off
1. **Open** [[Settings > Connectors]] (or **Customize**, then **Connectors**, in the desktop app).
2. **Click a connector**, then **Tool permissions**.
3. **Set each category or tool to Always allow.** Do this for read and write tools you want the agent to use freely.
4. **Repeat for each connector.**
:::

> [!NOTE]
> Custom connectors' tools usually lack "read-only" labels, so they default to asking. Set them to **Always allow** explicitly. Organization owners can cap what members may allow, and that cap can't be overridden by individuals.

## Claude in Chrome

The Chrome extension asks per site the first time Claude acts there. Choose **Always allow** for sites you want it to operate on freely. It will still stop for purchases, account creation, and CAPTCHAs, and its safety classifier can still raise a prompt on risky page actions.

## Claude Code in VS Code

The VS Code extension starts conversations in auto mode by default. To pin a different starting mode, set `claudeCode.initialPermissionMode` in your VS Code user settings to `default`, `acceptEdits`, `plan`, or `bypassPermissions`. It doesn't accept `auto`; to use Auto, leave the setting unset and pick **Auto** from the mode indicator once.

To make **Bypass permissions** appear at all, turn on the extension's **Allow dangerously skip permissions** setting first.

```json title=VS Code settings.json
{
  "claudeCode.initialPermissionMode": "bypassPermissions"
}
```

> [!NOTE]
> Plan mode keeps its blocks in the VS Code chat panel even when bypass is available, and in auto mode a critical-path deletion is denied there immediately, because the panel can't show the terminal's countdown prompt.



## Desktop scheduled tasks

The desktop app can run a Claude Code task on a timetable (minimum interval one minute) while your computer is on, with access to local files. Each task has its own permission setting, so choose a hands-off mode for tasks you won't be watching.

## Troubleshooting the Claude apps

| Problem | Fix |
|---|---|
| No **Bypass permissions** in the mode list | Turn on **Allow bypass permissions mode** in Settings › Claude Code; on Team/Enterprise ask an admin |
| Mode resets each time | The app remembers per folder; set `defaultMode` in `~/.claude/settings.json` for new folders |
| Cowork still asks for connector writes | Admin must enable **Allow "Always allow" for connector tools** |
| A custom connector asks for every tool | Set each tool to **Always allow** explicitly |
| Chrome asks again on every site | Choose **Always allow** on the site's first action card |

:::checklist
- Desktop: **Allow bypass permissions mode** on, mode chosen per folder
- VS Code: bypass setting on, or Auto picked once
- Cowork: **Automatically approve** selected
- Every connector tool you use set to **Always allow**
- Chrome: sites you trust set to **Always allow**
:::
