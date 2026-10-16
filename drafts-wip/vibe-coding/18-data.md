# Databases and Supabase

Sooner or later your app needs to remember things. This chapter explains databases in plain terms, then digs into Supabase, the database behind many builders, and the security rules that keep data safe.

:::summary In this chapter
- Tables, rows, columns, and relationships
- Where your builder keeps data
- Supabase plans, keys, and row-level security
- Backups and checking your data
:::

## Front end, back end, database

- The **front end** is what runs in the user's browser: pages, buttons, layout.
- The **back end** is what runs on a server: storing data, checking passwords, sending emails, talking to other services.
- A **database** is where the back end keeps information, organized into **tables** (like spreadsheet tabs) of **rows** (records) and **columns** (fields).

Browser builders increasingly include a back end for you (Lovable Cloud, Base44, Replit, Bolt Cloud), or connect to **Supabase**, a popular hosted database with login and file storage built in.

## Relationships between tables

Real apps have several tables that point at each other. A recipe app might have:

| Table | Holds | Points to |
|---|---|---|
| `users` | Accounts | – |
| `recipes` | Title, steps, photo | The user who wrote it |
| `ingredients` | Name, amount | The recipe it belongs to |
| `favorites` | Who liked what | A user and a recipe |

That "points to" link is a **foreign key**: a column holding another row's ID. Ask the AI to "show me the data model as a table list with relationships" whenever it adds tables; it's the best way to catch a muddled design early.

> [!TIP]
> Changing the shape of a database once real data is in it is harder than changing a page. Spend extra time getting the tables right early, using plan mode.

## Supabase in brief

| | Free | Pro |
|---|---|---|
| **Price** | $0 | From $25/mo |
| **Active projects** | 2 | First included; more from $10/mo |
| **Database size** | 500 MB | Larger, scales up |
| **Monthly active users** | 50,000 | 100,000, then pay per user |
| **Catch** | Pauses after 1 week of inactivity | Spend cap on by default |

## The two kinds of key

| Key | Starts with | Where it can go |
|---|---|---|
| **Publishable** | `sb_publishable_` | Front end, mobile apps, public code; limited by RLS |
| **Secret** | `sb_secret_` | Back end only; bypasses RLS completely |

Find them in [[Settings > API Keys]]. Older tutorials and AI answers mention `anon` and `service_role` keys (long strings starting `eyJ`): these are the legacy versions, being retired by the end of 2026.

## Row-level security, again

**Row-level security** (RLS) is the database deciding, row by row, who may read or change what. Without it, a table in Supabase's public schema can be read and written by anyone who has your publishable key, which is everyone who visits your app. Rules of thumb:

1. **RLS on for every table.** No exceptions.
2. **A policy for each action you need:** select, insert, update, delete.
3. **`using (true)` means "everyone".** Only for genuinely public data, like published blog posts.
4. **Test with two accounts,** as in Project 3.
5. **Check the Security Advisor** in the dashboard after every database change.

```prompt
Audit the database. For every table, tell me: is RLS on, what
policies exist in plain English, and who can read or change which
rows. Flag anything readable by signed-out visitors.
```

## Looking after your data

- **Look at it.** Every builder has a table view. Glance at real rows weekly.
- **Back it up.** Export important tables as CSV regularly, and before big changes.
- **Never test destructive changes on live data.** Use a test database, or a copy.
- **Store files, not just text.** Photos and uploads go in **storage buckets**, with their own public/private settings.

:::checklist
- I can list my app's tables and how they connect
- RLS is on for every table, with tested policies
- My secret key is only on the back end
- I have a recent export of important data
:::

