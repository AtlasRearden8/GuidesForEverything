# Plan Mode in Depth

Plan mode is Claude Code's "measure twice, cut once" setting. Claude reads, explores, and writes a plan, but doesn't change your files until you approve it. It's the single most useful habit for beginners.

:::summary In this chapter
- How to enter and leave plan mode
- What Claude can and can't do while planning
- Approving, rejecting, and editing a plan
- Making plan mode your default, and when to skip it
:::

## Entering and leaving plan mode

| Way in | How |
|---|---|
| Keyboard | Press <kbd>Shift</kbd> + <kbd>Tab</kbd> until the status bar shows `⏸ plan mode on` |
| One prompt | Start your message with `/plan`, such as `/plan add a newsletter signup` |
| At launch | `claude --permission-mode plan` |

Press <kbd>Shift</kbd> + <kbd>Tab</kbd> again to leave plan mode without approving anything.

## What happens while planning

- Claude **reads files** and **runs commands to explore**, such as listing folders or running tests.
- Claude **does not edit your source files**. Edits stay blocked until you approve a plan.
- For research, Claude often sends a built-in **Plan subagent** to read the code, keeping all that reading out of your main conversation.
- When auto mode is available, a safety classifier reviews exploratory shell commands instead of asking you about each one; otherwise anything beyond simple read-only commands asks for permission.

## Reviewing the plan

When the plan is ready, Claude shows it and asks how to proceed:

| Choice | What happens |
|---|---|
| **Yes, and use auto mode** | Approve; Claude builds with background safety checks instead of prompts (shown as **Yes, auto-accept edits** if auto mode isn't available) |
| **Yes, manually approve edits** | Approve; you confirm each edit |
| **No, keep planning** | Stay in plan mode and tell Claude what to change |

Press <kbd>Ctrl</kbd> + <kbd>G</kbd> to open the plan in your text editor and change it directly before approving. Approving also gives the session a title based on the plan, unless you named it already. The plan is saved to disk, so it survives compaction.

:::steps A complete planning session
1. **Enter plan mode** with <kbd>Shift</kbd> + <kbd>Tab</kbd>.
2. **Ask for understanding first.**
   ```prompt
   read the checkout code and explain how the order total is
   calculated. don't plan anything yet.
   ```
3. **Ask for the plan.**
   ```prompt
   I want to add a 10% discount code called WELCOME10. write a
   step-by-step plan, including how you'll test it.
   ```
4. **Push back where needed.** "No, keep planning: the discount must not apply to gift cards."
5. **Approve** with **Yes, manually approve edits** the first few times, so you see each change.
:::

## Plan mode as your default

To start every session in a project in plan mode, add this to the project's `.claude/settings.json`:

```json title=.claude/settings.json
{
  "permissions": { "defaultMode": "plan" }
}
```

In the VS Code extension, set `claudeCode.initialPermissionMode` to `plan` in VS Code's settings instead.

> [!TIP]
> Try the `opusplan` model setting (`/model opusplan`): it uses the more capable Opus model while planning and switches to Sonnet to build, a good balance of quality and usage.

## When to skip planning

Planning adds a step. Skip it when you could describe the change in one sentence: fixing a typo, renaming a variable, adding a log line. Plan when you're unsure of the approach, the change touches several files, or you don't know the code well.

:::checklist
- I can enter and leave plan mode with <kbd>Shift</kbd> + <kbd>Tab</kbd>
- I've edited a plan with <kbd>Ctrl</kbd> + <kbd>G</kbd>
- I know the three approval choices
:::

# Checkpoints and Rewind

Claude Code quietly saves the state of your files before every prompt. If something goes wrong, you can rewind: the code, the conversation, or both. This chapter shows how, and where the limits are.

:::summary In this chapter
- How checkpoints are taken
- The five rewind options and when to use each
- Summarizing part of a conversation
- What checkpoints can't undo, and why Git still matters
:::

## How checkpoints work

- Every prompt you send that starts a turn creates a **checkpoint** of the files Claude edits with its file tools.
- The last 100 checkpoints in a session keep their file snapshots.
- Checkpoints are saved with the conversation, so `/rewind` still works after you resume a session.
- Snapshots are cleaned up after about 30 days by default.

## Opening the rewind menu

Press <kbd>Esc</kbd> twice on an empty prompt, or type `/rewind` (aliases `/checkpoint` and `/undo`). You'll see the list of prompts you sent. Pick one, then choose:

| Option | What it does | Use it when |
|---|---|---|
| **Restore code and conversation** | Both go back to that point | Claude went down the wrong path entirely |
| **Restore conversation** | Rewinds the chat; files stay as they are | You like the code but want to rephrase your next request |
| **Restore code** | Reverts files; keeps the chat | The edits broke something but the discussion was useful |
| **Summarize from here** | Compresses everything after this point | A long detour you no longer need in detail |
| **Summarize up to here** | Compresses everything before this point | Long setup chat; recent work matters most |
| **Never mind** | Goes back without changes | You changed your mind |

The code options only appear if files changed after that point. After restoring the conversation, your original prompt reappears in the input box, ready to edit and resend.

> [!TIP]
> To steer a summary, highlight a **Summarize** option and type instructions where it says **add context (optional)**, such as "keep the list of failing tests."

## Getting back a cleared conversation

If you ran `/clear` earlier in the same Claude Code window, the top of the rewind menu shows an entry labeled `(previous session)`. Pick it to return to the conversation you cleared.

## What checkpoints can't undo

| Not tracked | Why | What to do |
|---|---|---|
| Changes made by shell commands (`rm`, `mv`, `cp`, scripts) | Only Claude's file-editing tools are tracked | Commit to Git before big changes |
| Edits you make in your own editor | Claude Code didn't make them | Use Git |
| Most edits by background subagents | They run outside your session's checkpoints | Use Git to revert |
| Symlinked or hard-linked files | Skipped on restore, with a warning | Ask Claude to reverse the edit |
| Anything outside your computer | Emails, deploys, databases, cloud files | Be careful; use deny rules for risky commands |

> [!IMPORTANT]
> Checkpoints are a quick "undo" for one session. **Git** is your real safety net: permanent history you can always return to. Ask Claude to "commit everything with a clear message" before any big change.

## Trying an alternative without losing anything

To explore a different approach while keeping the original intact, use `/branch` (Chapter 7) instead of rewinding. You can return to the original with `/resume`.

:::checklist
- I've opened the rewind menu with <kbd>Esc</kbd> <kbd>Esc</kbd>
- I know the difference between restoring code and restoring the conversation
- I commit to Git before big or risky changes
:::
