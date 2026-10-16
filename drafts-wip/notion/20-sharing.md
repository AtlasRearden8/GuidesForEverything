# Sharing, Permissions, and Guests

Notion is built for working with others, but you stay in control of who sees what. This chapter explains the Share menu, the access levels, members and guests, and how to work together with comments and version history.

:::summary In this chapter
- Sharing a page with people, teamspaces, or the web
- Every access level, explained
- Members, admins, owners, and guests
- Database permissions by person
- Comments, notifications, and version history
:::

## Sharing a page

Click **Share** at the top right of any page:

- **Invite** people by email and choose their access: **Full access**, **Can edit**, **Can comment**, or **Can view**.
- **General access**: decide whether only invited people, everyone in your workspace, or anyone with the link can open it.
- **Publish** (the **Publish** tab in the Share menu): turn the page into a public website with **Notion Sites** (Chapter 21).

Pages inherit sharing from their parent: share a parent page and everything inside it is shared too.

:::steps Share with a few people
1. **Click Share.**
2. **Type names or email addresses.** People outside your workspace become guests.
3. **Pick an access level** from the dropdown next to them.
4. **Click Invite.** They get an email, and the page appears in their **Shared** section.
:::

## Access levels

| Level | Can view | Can comment | Can edit | Can share |
|---|---|---|---|---|
| **Full access** | Yes | Yes | Yes | Yes |
| **Can edit** | Yes | Yes | Yes | No |
| **Can edit content** (databases) | Yes | Yes | Items only | No |
| **Can comment** | Yes | Yes | No | No |
| **Can view** | Yes | No | No | No |

**Can edit content** lets people add and edit database items without changing the database's structure, views, or filters. **Can create** (Business and Enterprise) lets people add new items to a database without seeing other people's items, which is ideal for tickets and submissions.

## General access

| Setting | Who can open the page |
|---|---|
| **Only people invited** | You and the people you've added |
| **Everyone at your workspace** | Any workspace member, by search or link (you can hide it from search) |
| **Anyone on the web with link** | Anyone with the link, even without a Notion account |

For web links you can set an expiry under **Link expires**. Visitors need to log in to comment or edit.

> [!CAUTION]
> "Anyone on the web with link" means *anyone*. Links get forwarded. Don't use it for private information, and set an expiry for temporary sharing.

## Members, admins, owners, and guests

| Role | What they can do | Paid seat? |
|---|---|---|
| **Workspace owner** | Everything, including billing and security settings | Yes |
| **Membership admin** | Add and remove members and groups | Yes |
| **Member** | Use teamspaces and create content | Yes |
| **Guest** | Only the specific pages shared with them | No |

Add members in [[Settings > People]] (called **Members** on some plans): choose **Add members**, enter an email, pick a role, and click **Invite**. You can also share an invite link, or let anyone with your company email domain join automatically under **Allowed email domains**.

To add a **guest**, share a page with their email and choose **Skip for now** so they're added as a guest, not a member. Guests need their own (free) Notion account. The Free plan allows up to 10 guests; paid plans allow more.

> [!TIP]
> Use guests for clients, contractors, and family members who only need a few pages. They don't cost a seat.

## Groups

On team plans, **groups** (such as "Design" or "Managers") let you share with many people at once. Share a page with the group and everyone in it gets access; add someone to the group later and they get access automatically.

## Database permissions by person

On Business and Enterprise plans, a database with a Person property (or Created by) can give people access only to *their* items. Open the source database, click **Share**, and under **Page-level access** choose **Add a new rule**. For example: people in the *Assignee* property can edit those tasks, and nothing else.

## Stop sharing

- Drag the page into your **Private** section, or
- Open **Share** and choose **Remove** next to a person, group, or teamspace.

## Working together

- **Comments:** select text and click **Comment**, or hover over a block and use its comment icon. Mention teammates with `@`.
- **Page history:** **•••** menu, then **Version history**, to see and restore earlier versions. The history length depends on your plan: 7 days on Free, 30 on Plus, 90 on Business, and unlimited on Enterprise.
- **Notifications:** the **Inbox** in the sidebar collects mentions, comments, and reminders.
- **Access requests:** if someone asks for more access to your page, you can approve or reject it from your Inbox.

> [!WARNING]
> Before publishing a page to the web, check the subpages inside it. They're published too, unless you change their settings.

:::checklist
- I shared a page with one person at Can comment
- I checked the General access setting on an important page
- I know the difference between a member and a guest
- I restored an earlier version from Version history
:::

