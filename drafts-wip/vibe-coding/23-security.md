# Security for Vibe Coders

AI tools make it easy to build apps that *work* but aren't *safe*. Most leaks from vibe-coded apps come from the same handful of mistakes, so a few habits prevent nearly all of them.

:::summary In this chapter
- The big five security habits
- The most common vibe-coded app leaks
- Using built-in scanners, and asking the AI to audit itself
- What to do if a key leaks
- Privacy basics
:::

## The big five

1. **Keep secrets secret.** API keys in environment variables, never in front-end code or GitHub.
2. **Lock down your database.** With Supabase and similar services, turn on **row-level security** (RLS): rules in the database itself that say "users can only read and change their own rows." Without it, anyone who knows your app's address may be able to read everything.
3. **Never trust the browser.** Anything checked only in the front end (prices, permissions, "is premium?") can be faked. Important checks must happen on the server.
4. **Use proven building blocks** for login, payments, and file uploads, not home-made versions.
5. **Set spending limits.** Put budget caps and alerts on AI APIs, hosting, and databases. A bug or a bot can otherwise run up a large bill overnight.

## Common leaks in vibe-coded apps

| Leak | How it happens | Prevention |
|---|---|---|
| Whole database readable | RLS off, or a `using (true)` policy | RLS on everywhere; two-user test |
| Secret key in the browser | Key given a `VITE_`/`NEXT_PUBLIC_` prefix, or pasted in code | Back-end secrets only |
| Admin pages open to all | Hidden link but no server check | Server-side role checks |
| Public file buckets | Uploads stored publicly by default | Private buckets for private files |
| Keys in GitHub | `.env` committed | `.gitignore`, push protection |
| Open AI endpoint | Anyone can call your chatbot's back end | Require sign-in, rate limits |

## Use the scanners

- **Lovable** runs a Quick security scan every time you publish, and offers a Deep scan of your app's logic and permissions.
- **Bolt** scans your Cloud database for issues like a missing RLS policy.
- **Base44** has a one-click security scan with suggested fixes.
- **Supabase** has a Security Advisor in its dashboard.

Scanners catch common problems but can't guarantee safety. For sensitive data, get a professional review.

## Ask the AI to audit itself

```prompt
Act as a security reviewer. Check this app for: exposed secrets,
missing row-level security, actions that only check permissions in the
browser, missing rate limits on forms and AI features, and personal
data we store but don't need. List problems by severity, then fix the
critical ones.
```

## If a key leaks

:::steps Respond to a leaked key
1. **Revoke or rotate it immediately** in the service's dashboard. Deleting it from your code isn't enough: it's in your history.
2. **Create a new key** and store it as a secret.
3. **Check usage and billing** for anything unexpected.
4. **Find how it leaked** (chat, screenshot, commit, front end) and close that gap.
:::

## Privacy and the law

If you collect names, emails, or anything personal, you have responsibilities: tell people what you collect (a privacy policy), collect only what you need, and delete data on request. Rules vary by country (for example GDPR in Europe and CCPA in California). For anything health- or finance-related, get professional advice.

:::checklist
- RLS on for every table; two-user test passed
- No secrets in the front end or Git history
- Server-side checks for roles, prices, and premium status
- Built-in security scan run before each launch
- Spending limits on every paid service
- Privacy policy matches what I actually collect
:::

