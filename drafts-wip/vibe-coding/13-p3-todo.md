# Project 3: A To-Do App with a Database and Logins

This is the project where your app becomes a real, multi-user product. Each person signs in and sees only their own tasks. You'll set up **Supabase**, a popular hosted database with logins built in, so you understand what builders do behind the scenes.

:::summary In this project
- Design a simple data model
- Create a Supabase project and connect it to a builder
- Add sign-in with magic links
- Lock down data with row-level security, and prove it works
- Configure redirect URLs for the live site
:::

| | |
|---|---|
| **Time** | 3–4 hours |
| **Cost** | Free (Supabase Free plan, builder free tier) |
| **Tools** | Lovable (or Bolt) plus your own Supabase project |
| **You'll learn** | Tables, auth, row-level security, testing with two users |

> [!NOTE]
> Lovable Cloud and Bolt Cloud are built on the same technology and do most of this for you. Doing it once with your own Supabase project teaches you what's going on, and gives you a project you fully control.

## Step 1: Design the data

Before prompting, decide what you're storing. For a to-do app, one table is enough:

:::compact
| Column | Type | Meaning |
|---|---|---|
| `id` | unique ID | Identifies each task |
| `user_id` | user reference | Who owns the task |
| `title` | text | What to do |
| `done` | true/false | Finished or not |
| `due_date` | date (optional) | When it's due |
| `created_at` | timestamp | When it was added |
:::

The `user_id` column is what makes a multi-user app possible: every row records its owner.

## Step 2: Create a Supabase project

:::steps Set up Supabase
1. **Sign up** at supabase.com (signing in with GitHub is easiest).
2. **Create a new project.** Pick a name, a region near your users, and a strong database password. Save the password in a password manager.
3. **Wait a minute** while the project starts.
4. **Find your keys** under [[Settings > API Keys]]. You'll see a **publishable key** (starts `sb_publishable_`) and a **secret key** (starts `sb_secret_`).
:::

> [!CAUTION]
> The **publishable key** is safe in your front end: it only reaches what your security rules allow. The **secret key** bypasses all security rules. It must never appear in front-end code, a chat, a screenshot, or GitHub. Older projects show legacy keys called `anon` and `service_role`; Supabase is retiring these by the end of 2026.

> [!NOTE]
> On the Free plan, Supabase pauses projects after a week of inactivity and allows two active projects. Paused projects can be restored from the dashboard.

## Step 3: Connect your builder

In Lovable, use the Supabase integration (Lovable's docs call it **Connect to Supabase**); Bolt has a similar option in its database settings. Authorize it and pick the project you just made. Then:

```prompt
Build a to-do app using the connected Supabase project. Create a
"todos" table with: id, user_id (the owner), title, done, due_date
(optional), created_at. Show the signed-in user's tasks, let them
add, tick off, edit, and delete tasks. Clean, minimal design.
Don't add sign-in yet.
```

## Step 4: Add sign-in

```prompt
Add sign-in with email magic links using Supabase Auth. A magic
link is a one-time sign-in link sent by email, so there are no
passwords. Show a simple sign-in page to signed-out visitors.
New tasks must be saved with the signed-in user's id.
Add a sign-out button in the header.
```

## Step 5: Lock down the data

Now the crucial part. **Row-level security** (RLS) is a set of rules inside the database that decide which rows each user may read or change. With RLS on and the right policies, even someone who pokes at your app with technical tools can't see other people's tasks.

```prompt
Enable row-level security on the todos table and add policies so
that signed-in users can only select, insert, update, and delete
their own rows (where user_id matches their user id). Show me the
SQL you're running and explain each policy in one sentence.
```

The AI should produce something like this. **SQL** is the language databases understand:

```sql title=todos-rls.sql
alter table public.todos enable row level security;

create policy "Users can view their own todos"
  on todos for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can add their own todos"
  on todos for insert to authenticated
  with check ((select auth.uid()) = user_id);
```

Similar policies cover `update` and `delete`. In plain English: `auth.uid()` is "the ID of the person asking," and each rule says "only if that matches the row's owner." The `with check` part stops someone creating a task that belongs to someone else.

## Step 6: Prove it with two users

Never assume security works. Test it.

:::steps The two-user test
1. **Open your app in a normal window** and sign in as user A (your main email).
2. **Add three tasks** whose names start with "A:".
3. **Open a private window** and sign in as user B (a second email address).
4. **Check user B sees none of A's tasks.** Add a "B:" task.
5. **Go back to user A** and confirm the B task isn't visible.
6. **Check Supabase's Security Advisor** in the dashboard, and fix any warnings with the AI's help.
:::

## Step 7: Publish and fix redirects

Magic links send people back to your app after they click. Supabase only redirects to addresses you approve.

:::steps Configure URLs for the live site
1. **Publish your app** and copy its live address.
2. **In Supabase, open** [[Authentication > URL Configuration]].
3. **Set Site URL** to your live address (it starts as `http://localhost:3000`).
4. **Add Redirect URLs** for your live address and your builder's preview address.
5. **Test a magic link** on the live site.
:::

## If something goes wrong

| Problem | Likely cause and fix |
|---|---|
| Tasks list is empty after enabling RLS | No `select` policy yet, or `user_id` isn't being saved. Ask the AI to check both |
| "new row violates row-level security policy" | The insert doesn't set `user_id` to the signed-in user |
| Magic link opens localhost or an error page | Update Site URL and Redirect URLs |
| Magic link email never arrives | Check spam; the built-in email sender has low limits, so set up custom email (SMTP) for real use |
| App stopped working after a quiet week | The free project paused; restore it in the dashboard |

:::checklist
- Data model written down before building
- Secret key never pasted anywhere public
- RLS enabled, with select, insert, update, and delete policies
- Two-user test passed
- Site URL and Redirect URLs point at the live site
:::

