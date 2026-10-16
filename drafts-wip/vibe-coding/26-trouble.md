# Troubleshooting Table

Find your symptom, try the fix, and if that fails, roll back and use the diagnosis prompts in "When You Get Stuck."

## Building

:::compact
| Symptom | Likely cause | Fix |
|---|---|---|
| AI built something different from what I meant | Vague prompt | Restore; re-prompt with who, what, example, and "done means" |
| Each fix breaks something else | Changes too big; long chat | Roll back; smaller slices; fresh chat with summary |
| AI says it fixed it, but nothing changed | Cached preview, or wrong file edited | Hard refresh; ask it to show which file changed |
| Credits vanish quickly | Large project, big requests | Plan/chat modes, visual edits, focused requests |
| Design keeps drifting | No lasting rules | Put style rules in Knowledge / AGENTS.md |
| AI invents features I didn't ask for | Open-ended prompt | Add "Change only X. Don't add anything else." |
| AI loops on the same error | It's guessing | Ask for three causes and tests, not a fix |
:::

## Data and logins

:::compact
| Symptom | Likely cause | Fix |
|---|---|---|
| Data disappears on refresh | Stored in the page, not a database | "Save this to the database" |
| List is empty after adding RLS | No select policy, or user_id missing | Ask AI to check both |
| Users see each other's data | Missing or `using (true)` policy | Fix RLS now; two-user test |
| Sign-in link goes to localhost | Site URL not updated | [[Authentication > URL Configuration]] |
| Sign-in emails don't arrive | Default sender limits; spam | Custom email service; verify domain |
| App broke after a quiet week | Free Supabase project paused | Restore it in the dashboard |
| "Invalid API key" | Wrong or legacy key, or wrong name | Re-copy into secrets; check names |
:::

## Payments and email

:::compact
| Symptom | Likely cause | Fix |
|---|---|---|
| Payment works but user not upgraded | Webhook missing or failing | Check webhook logs in Stripe; ask AI to fix handler |
| Anyone can get premium | Decided in the browser | Move the decision to the server |
| Real card charged during testing | Live keys used | Switch to sandbox keys until launch |
| Emails go to spam | Domain not verified | Complete the email service's DNS steps |
:::

## Deploying and domains

:::compact
| Symptom | Likely cause | Fix |
|---|---|---|
| Works in preview, broken live | Missing environment variables | Add them on the host; redeploy |
| Build failed | Code or package error | Paste the full build log to the AI |
| Blank white page live | Front-end crash | Open the console; paste the error |
| Domain shows "not found" | DNS not pointing at host yet | Check records match exactly; wait |
| "Not secure" warning | Certificate not issued yet | Wait for DNS; re-check in host settings |
| Email stopped after domain change | MX records deleted | Restore MX records from your email provider |
:::

## Costs and limits

:::compact
| Symptom | Likely cause | Fix |
|---|---|---|
| Surprise AI bill | No limits; bots or loops | Spending limit, sign-in, per-user rate limit |
| "429 Too Many Requests" | Rate limit hit | Wait; reduce calls; raise tier |
| Netlify deploys paused | Free credits used up | Fewer production deploys; upgrade |
| Hosting site paused | Budget hard limit reached | Review usage; raise limit deliberately |
:::

