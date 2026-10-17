# Templates, Buttons, and Automations

Once your databases are set up, Notion can do the repetitive work for you. **Templates** give every new item the same starting layout, **buttons** do several things with one click, and **automations** react to changes on their own.

:::summary In this chapter
- Database templates, and making them repeat
- Buttons and every button action
- Button properties inside databases
- Database automations: triggers and actions
- Webhooks, Slack, and Gmail actions
- What each plan allows
:::

## Database templates

A **database template** is a pre-made page for one database: its properties are pre-filled and its body already holds headings, checklists, or anything else.

:::steps Make a template
1. **Click the arrow next to New** at the top right of the database.
2. **Choose + New template.** A bar at the top shows which database it belongs to.
3. **Title it** with the template's name, such as "Bug report".
4. **Pre-fill properties**, such as Priority = P1.
5. **Add body content**, such as headings "Steps to reproduce", "Expected", "Actual", and a checklist.
:::

To use it, click the arrow next to **New** and pick the template, or create a new item and choose it from the gray menu inside the empty page. Use **•••** next to a template to edit, duplicate, or delete it.

> [!WARNING]
> Don't fill in a relation property in a template unless every new item should link to that same page.

### Repeating templates

A **repeating template** creates a new item on a schedule, such as a "Weekly review" page every Friday at 4 pm.

:::steps Make a template repeat
1. **Open the dropdown next to New.**
2. **Click ••• next to the template.**
3. **Open the Repeat dropdown** and choose daily, weekly, monthly, or yearly.
4. **Set the interval, start date, and time.**
:::

## Buttons

A **button** block runs a list of actions when someone clicks it. Buttons are available on every plan; a few actions need a paid plan.

:::steps Create a button
1. **Type `/button`** and press Enter.
2. **Name it and pick an emoji**, such as "➕ New task".
3. **Click New action** and choose one (table below).
4. **Add more actions** if you like; they run in order.
5. **Click Done**, then try it.
:::

| Action | What it does | Plan |
|---|---|---|
| **Insert blocks** | Adds blocks above or below the button, or at the top or bottom of the page | All |
| **Add page to** | Creates an item in a database with set properties | All |
| **Edit pages in** | Changes properties of items in a database | All |
| **Send notification to** | Notifies up to 20 people, or a Person property | All |
| **Show confirmation** | Asks "Are you sure?" first | All |
| **Open page or URL** | Opens a page or link | All |
| **Define variables** | Stores a value for later actions | All |
| **Send mail to** | Sends an email from your Gmail | Paid |
| **Send webhook** | Sends data to another app's URL | Paid |
| **Send Slack notification to** | Posts in a Slack channel | Plus and up |

> [!NOTE]
> Buttons can only add or edit pages in databases that aren't in your **Private** or **Shared** sections. Put them in a teamspace.

### Button properties

You can also add a **Button** property to a database, so every row gets its own button, such as "✅ Mark done" that sets Status to Done and Completed to today. Button property actions can act on *that row*.

## Database automations

A **database automation** watches a database and runs actions when something happens, without anyone clicking. Open it from the **⚡** icon at the top of a database.

:::steps Create an automation
1. **Click ⚡ › New automation.**
2. **Name it**, such as "Stamp completion date".
3. **Click New trigger** and choose what starts it.
4. **Click New action** and choose what happens.
5. **Click Create.**
:::

**Triggers** (you can combine several, with *any* or *all*):

| Trigger | Fires when… |
|---|---|
| **Page added** | A new item is created |
| **Property edited** | A chosen property changes, optionally to a specific value |
| **Every {frequency}** | On a schedule: daily, weekly, monthly, with a time and timezone |

**Actions** include **Edit property**, **Add page to**, **Edit pages in**, **Send notification to**, **Send mail to** (Gmail), **Send webhook**, **Send Slack notification to**, and **Define variables**.

### Three automations to copy

| Name | Trigger | Action |
|---|---|---|
| Done date | Status set to Done | Edit property: Completed = Today |
| New request alert | Page added | Send Slack notification to #requests |
| Monday digest | Every week, Monday 9:00 | Send notification to the team |

> [!IMPORTANT]
> Automations don't trigger other automations (to prevent loops). A person clicking a button that creates a page *does* trigger them.

### Webhooks

The **Send webhook** action sends an HTTP POST request (a small package of data) to a web address whenever it runs. Tools like n8n, Zapier, and Make give you a URL to receive it, which lets a Notion change kick off work in hundreds of other apps.

## What each plan allows

| Feature | Free | Plus and up |
|---|---|---|
| Templates and repeating templates | Yes | Yes |
| Button blocks (basic actions) | Yes | Yes |
| Database automations | Slack notifications only | All triggers and actions |
| Send mail, Send webhook | No | Yes |

Free plan users can still *use* automations that come in templates, but can't edit them. Creating automations needs full access to the database.

## When automations misbehave

| Problem | Try this |
|---|---|
| Nothing happens | Check the trigger conditions, and that pages aren't in Private |
| It ran twice | Two automations share a trigger; combine them |
| A multi-trigger rule never fires | "All of these" edits must happen within about three seconds; use a more specific trigger |
| Gmail action is greyed out | Only the person who linked Gmail can edit that action |

:::checklist
- I made a database template with a checklist
- I set a template to repeat weekly
- I made a button that adds a pre-filled task
- I created an automation that stamps a completion date
:::

