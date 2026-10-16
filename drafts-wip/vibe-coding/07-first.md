# Your First App in a Browser Builder

Time to build something. The steps below use Lovable as the example, but Bolt, v0, Base44, and Replit work almost identically. Allow about an hour, and expect it to be fun.

:::summary In this chapter
- Build and publish a small working app, start to finish
- Find your way around a builder's screen
- Use plan, chat, and visual editing to save credits
- Restore an earlier version when a change goes wrong
:::

## Build it

:::steps Build and publish a first app
1. **Sign up.** Go to lovable.dev (or your chosen tool) and create a free account.
2. **Describe your app in the main box.** Be specific about *who* it's for and *what* they do:
   ```prompt
   Build a simple "Plant Pal" web app where I can add my houseplants
   (name, photo, how often to water), see which plants need water today,
   and tick them off when watered. Friendly, earthy green design.
   Works well on phones.
   ```
3. **Watch it build.** The AI writes the code and a **preview** (a live, clickable version) appears beside the chat.
4. **Try it like a user.** Click every button. Add a plant. Refresh the page. Does your data stay?
5. **Ask for one change at a time.**
   ```prompt
   When I refresh, my plants disappear. Save them permanently
   so they're still there tomorrow.
   ```
6. **Connect GitHub.** Find the GitHub option in the project's settings or menu and link your account. Your code is now backed up, versioned, and portable.
7. **Publish.** Click **Publish** (or **Deploy**). You'll get a public web address to share.
:::

> [!WARNING]
> In step 5 the AI will probably add a **database** and maybe **login**. That's great, but it means your app now stores data. Read the "Databases and Supabase" and "Security for Vibe Coders" chapters before inviting real users.

## Getting to know the screen

Most browser builders share the same layout:

- **Chat panel:** where you describe changes.
- **Preview:** your app running live. Many tools let you switch to a phone-sized view.
- **Code view:** the actual files. Peek in sometimes; it's how you learn.
- **Version history:** earlier versions you can restore if a change goes wrong.
- **Settings / Integrations:** GitHub, database, custom domain, payments, secrets.

## Three ways to talk to a builder

Most builders now offer modes. Using the right one saves both credits and frustration.

| Mode | What it does | Use it when |
|---|---|---|
| **Build** (or Agent) | Changes your code | You know what you want |
| **Plan** | Investigates and writes a plan you approve | The change is big or risky |
| **Chat** (or Discuss) | Talks without touching code | You're exploring or confused |

In Lovable these appear as **Build**, **Plan**, and **Chat** in the chat box. Bolt and Replit have a **Plan Mode**; Base44 has a plan mode too.

```prompt
(Plan mode) I want to add reminders so people get an email when a
plant needs water. Investigate the project and propose a plan. List
any new services or settings I'll need. Don't build yet.
```

## Visual editing

Many builders let you click an element in the preview, say a heading or a button, and change its text, color, or size directly, or point at it and say "make this bigger." This is quicker, and usually cheaper in credits, than describing the change in chat. In v0 it's called **Design Mode**; in Lovable you **edit from the preview**: select an element, then edit, annotate, or comment on it.

## Giving the builder lasting instructions

Builders let you store instructions they read before every message. Lovable calls this **Knowledge** (for a project or a whole workspace); others call it custom instructions or project settings.

```markdown title=Project knowledge
- Phone-first. Check every screen at 375px wide.
- Keep the earthy green palette. No new colors without asking.
- Never delete data without a confirmation step.
- After each change, summarize what you changed in plain English.
```

## When a change goes wrong

Every builder keeps a **version history**. In Lovable you can preview any earlier version, **revert** to it, and **bookmark** versions you know are good. Replit calls its saved points **checkpoints**, with one-click **rollback**; Bolt has version history and backups.

:::steps Undo a bad change
1. **Stop prompting.** Don't try to fix a bad change with more changes.
2. **Open version history.** Look for a clock icon or "History."
3. **Preview the last good version.** Click around to confirm it works.
4. **Restore it.** Then try again with a smaller, clearer request.
:::

## Test on your phone, then share

1. **Open the published address on your phone.** Phone screens reveal cramped buttons and text that's too small.
2. **Send it to two friends.** Ask them to do one specific task, like "add a plant and mark it watered," without help from you.
3. **Watch or ask what confused them.** Their confusion is your next prompt.

## First-build troubleshooting

| Problem | Try this |
|---|---|
| Preview is blank or shows an error | Ask: "The preview shows an error. Read it and fix the cause." Or restore the last version |
| It built something different from what I meant | Restore, then add specifics: who, what, and an example |
| Data disappears on refresh | Ask it to save data in a database, not in the page |
| It looks bad on a phone | "Make every page work well at 375px wide. Larger tap targets." |
| Credits running out fast | Use Plan or Chat mode, visual edits, and smaller requests |

:::checklist
- I built a first app and clicked every button
- I connected GitHub
- I published it and opened it on my phone
- I know where version history is, and I've tried restoring a version
- I've saved some lasting instructions in the builder's settings
:::

