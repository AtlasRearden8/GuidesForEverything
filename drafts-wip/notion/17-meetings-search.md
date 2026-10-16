# AI Meeting Notes and Enterprise Search

Two Notion AI features save time every single day on Business and Enterprise plans: **AI Meeting Notes**, which listens to a meeting and writes it up, and **Enterprise Search**, which finds answers across Notion and your other apps.

:::summary In this chapter
- Recording and summarizing a meeting
- Uploading audio, speaker labels, and custom summaries
- Searching across connected apps with citations
- Connecting Slack, Google Drive, and more
:::

## AI Meeting Notes

**AI Meeting Notes** transcribes a meeting (turns speech into text), then writes a summary with key points and action items. It's included on Business and Enterprise plans; Free and Plus get a limited trial.

| Where | What it hears | Best for |
|---|---|---|
| **Desktop app** | Your microphone *and* your computer's sound | Video calls |
| **Browser** | Only your microphone | In-person meetings |
| **Mobile app** | Only your phone's microphone | In-person meetings |

:::steps Take AI meeting notes
1. **Type `/meet`** on any page in the desktop app (or start one from **Upcoming events** on Home).
2. **Jot agenda items** under **Notes** before the meeting. The summary will take them into account.
3. **Click Start transcribing** when the meeting starts. This confirms everyone has agreed to be recorded.
4. **Click Stop** at the end. The summary starts writing automatically (you need at least one minute of audio).
5. **Review the summary.** Hover over a citation to see the exact part of the transcript it came from.
:::

> [!IMPORTANT]
> Always tell people you're transcribing and get their consent. Laws on recording conversations differ between countries and states.

### More options

- **Upload a recording:** open the meeting notes block's settings and choose **Upload audio** (AAC, M4A, MP3, or WAV).
- **Speaker labels:** the desktop app labels who said what, best in one-to-one video calls. For Google Meet in Chrome, the Notion Meetings browser extension improves labels.
- **Change the summary style:** under **Instructions** at the bottom of the block, switch from **Auto** to a format such as a sales call or standup, or click **+ Add custom instructions** to design your own.
- **Calendar link:** connect Notion Calendar to start notes from an event in one click (Chapter 22).
- **Automatic sharing:** in [[Settings > Notion AI]] you can auto-share notes with workspace members who were invited to the event. Otherwise notes are private to you.

```prompt
From this meeting's notes, write a short follow-up email to the client
that thanks them, confirms the three decisions, and lists next steps.
```

## Enterprise Search

**Enterprise Search** answers questions using your Notion workspace, your connected apps, and the web, and always cites its sources. Open **Home** and type your question in the search window.

- **Narrow the scope:** click **All sources** to switch off web search, or to search only your workspace, one teamspace, or one app such as Slack.
- **Add context:** click **Add context** or `@`-mention pages, teamspaces, and people.
- **Databases count too:** it can read views, relations, and properties.

### Connect your other apps

**Notion AI Connectors** let AI search other tools. Set them up in [[Settings > Notion AI > AI connectors]]. Available connectors include Slack, Microsoft Teams, Google Drive, Gmail, Google Calendar, Microsoft Outlook, GitHub, and more; Notion lists Jira, Box, OneDrive, Salesforce, and Asana as beta.

> [!NOTE]
> Connectors respect permissions: you'll only get answers from content you could already open in that app.

## Research mode

For bigger questions, **Research mode** (beta) uses deeper reasoning to write a detailed report from your workspace, connected tools, and current web information. It's available on Business and Enterprise, with a limited trial elsewhere.

```prompt
Research what our customers said about onboarding in the last quarter,
using Slack, support notes, and meeting notes. Write a two-page report
with quotes and recommendations.
```

:::checklist
- I know which app to use for video calls vs in-person meetings
- I recorded or uploaded a meeting and read its summary
- I asked Enterprise Search a question and checked its citations
- I connected at least one other app, or know where to do it
:::

