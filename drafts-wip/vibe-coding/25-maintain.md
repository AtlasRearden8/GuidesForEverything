# Maintaining and Handing Off

Launching is the start, not the end. Apps need small amounts of care: updates, backups, and documentation. And one day you may want to hand the project to a developer, a colleague, or a future you who has forgotten everything.

:::summary In this chapter
- A light maintenance routine
- Keeping libraries up to date safely
- Writing a README that saves hours
- Handing off to a developer
:::

## A light maintenance routine

| How often | Task |
|---|---|
| Weekly | Glance at usage, errors, and billing; read user feedback |
| Monthly | Export a backup; run the security scan; check auth and email still work |
| Every few months | Update libraries; review who has access to every service |
| Yearly | Renew the domain; review the privacy policy |

> [!TIP]
> Free Supabase projects pause after a week with no activity. If your app is used rarely, expect the occasional restore, or upgrade when it matters.

## Updating libraries safely

Your app depends on dozens of **packages** (code libraries). They get security fixes and new versions.

```prompt
Check this project for outdated or vulnerable packages. Update only
the ones with security fixes or safe minor updates, on a new branch.
Run the app and test script, then summarize what changed.
```

Big "major version" upgrades can break things; do them one at a time, on a branch, with your test script.

## Write a README

A **README** is the front page of your project: a plain-text file explaining what it is and how to run it. Ask the AI to write it, then check it:

```markdown title=README.md
# Plant Pal
Phone-first app reminding people to water houseplants.

## Stack
React + Vite front end; Supabase (database, auth); hosted on Vercel.

## Run locally
1. `npm install`
2. Copy `.env.example` to `.env` and fill in the values.
3. `npm run dev`

## Services and accounts
Supabase (owner: me), Vercel, Resend, domain at Cloudflare.

## Known issues
Reminder emails sometimes send twice (see docs/issues.md).
```

Keep a `.env.example` file listing variable *names* with no real values, so others know what to set.

## Handing off to a developer

:::steps Prepare a clean handoff
1. **Make sure everything is in GitHub,** with a README and `.env.example`.
2. **List every service** the app uses, who owns each account, and how billing works.
3. **Share your brief, specs, and build diary.** They explain *why* things are the way they are.
4. **Give access properly.** Invite people to GitHub, Supabase, and the host as team members; never share your passwords or secret keys in chat.
5. **Ask for a review first.** "Spend two hours reviewing security and structure; tell me the top five risks" is a great first job.
:::

> [!IMPORTANT]
> Own your accounts. Even if someone else builds or maintains the app, the domain, GitHub organization, database, and payment accounts should be registered to you or your business.

:::checklist
- Maintenance routine in my calendar
- README and `.env.example` in the repo
- A list of every service and account owner
- I know how to grant and remove access to each service
:::

