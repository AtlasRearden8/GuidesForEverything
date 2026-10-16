# Project 2: A Landing Page with a Sign-Up Form

A **landing page** is a single page with one goal: getting visitors to take one action, such as joining a waitlist. This project adds your first piece of back end: a form whose answers are saved in a database, plus an optional confirmation email.

:::summary In this project
- Write a landing page that persuades
- Save form sign-ups in a database
- Protect the form from spam, and handle personal data properly
- Send a confirmation email (optional)
- A no-database alternative with Netlify Forms
:::

| | |
|---|---|
| **Time** | 2–3 hours |
| **Cost** | Free tiers are enough to start |
| **Tools** | Lovable with Lovable Cloud (or Bolt Cloud, Base44, Replit) |
| **You'll learn** | Databases, forms, secrets, email services |

## Step 1: Plan the page

Good landing pages follow a familiar pattern. Fill this in before prompting:

```markdown title=landing-brief.md
Product: "Bloomcast", a weekly email telling you which plants to
water, feed, or repot this week.
Audience: busy houseplant owners.
Goal: join the waitlist (email + first name).
Sections:
1. Hero: headline, one-line promise, sign-up form.
2. Three benefits with icons.
3. How it works: three steps.
4. FAQ: four questions.
5. Final call to action with the form again.
Feel: fresh, botanical, confident.
```

## Step 2: Build the page with a placeholder form

```prompt
Build a landing page from this brief: [paste brief]. Make the form
look real but don't save anything yet. Mobile-first. Use a
plant illustration style for icons.
```

Iterate on the words as much as the design. Ask: "Rewrite the headline five ways, focused on saving time. Show them to me before changing anything."

## Step 3: Save sign-ups to a database

```prompt
Now make the form work. Save each sign-up (first name, email,
created time) to a "signups" table in the built-in database.
Validate the email format. Show a friendly thank-you message after
submitting. If the same email signs up twice, don't create a
duplicate; just show the thank-you message again.
Visitors must NOT be able to read the signups table; only I can,
from the dashboard.
```

That last sentence is crucial. A sign-up form needs to let anyone **add** a row, but nobody but you should **read** the list. This is an access rule, and in Supabase-based back ends (including Lovable Cloud) it is enforced by **row-level security**. More on that in the "Databases and Supabase" chapter.

:::steps Check it works
1. **Submit the form** with your own email.
2. **Open the database view** in your builder (in Lovable, Cloud's **Database** view).
3. **Find your row** in the signups table.
4. **Submit again** with the same email. There should still be one row.
5. **Run the builder's security scan** and fix anything marked critical.
:::

## Step 4: Stop spam

Public forms attract bots. Two cheap defenses:

```prompt
Add spam protection to the sign-up form: a hidden "honeypot" field
that real people never see (reject submissions that fill it in), and
a limit of 5 submissions per minute from the same visitor.
```

A **honeypot** is a hidden field that only bots fill in. **Rate limiting** caps how often someone can submit. If spam persists, ask about adding a CAPTCHA service.

## Step 5: Handle personal data properly

An email address is personal data. Before you go live:

- **Say what you'll do with it.** Add a line under the form: "We'll email you when Bloomcast launches. No spam; unsubscribe anytime."
- **Add a privacy policy page.** Ask the AI for a plain-English draft, then read it carefully and adjust it to what you really do.
- **Collect only what you need.** Name and email, not phone numbers "just in case."

## Step 6: Send a confirmation email (optional)

To send email from an app, you use an **email service** such as **Resend**. Its free plan allows 3,000 emails a month (up to 100 a day), plenty for a waitlist.

:::steps Add a confirmation email
1. **Create a Resend account** and add your domain (email from your own domain is far less likely to land in spam).
2. **Create an API key** in Resend.
3. **Store the key as a secret** in your builder, named `RESEND_API_KEY`. In Lovable, use the Cloud **Secrets** manager, never the `.env` file.
4. **Ask the AI to send the email from the back end:**
   ```prompt
   After a successful sign-up, send a short confirmation email using
   Resend from a back-end function. Use the RESEND_API_KEY secret.
   Never expose the key to the browser. Subject: "You're on the
   Bloomcast list". Friendly, two sentences, unsubscribe link.
   ```
5. **Test with your own address,** and check your spam folder.
:::

## Alternative: Netlify Forms, no database needed

If your page is a simple static site hosted on Netlify, Netlify can collect form submissions for you. You add a `data-netlify="true"` attribute to the form, and submissions appear in your Netlify dashboard. Ask your AI:

```prompt
This site will be hosted on Netlify. Make the sign-up form a Netlify
Form (data-netlify="true"), with a honeypot field and a thank-you page.
```

Form submissions use some of your Netlify plan's monthly credits, so check usage if your page gets busy.

## Step 7: Launch and measure

1. **Publish** and test the live form once more.
2. **Add simple analytics.** Many hosts include visitor analytics; ask the AI to add your host's built-in option or a privacy-friendly one.
3. **Export your list** as a CSV (a spreadsheet file) from the database view when you're ready to email people.

| Problem | Fix |
|---|---|
| Form says "error" with no details | Ask: "Show the real error in the browser console and fix the cause" |
| Sign-ups don't appear in the table | Check the access rule allows inserting; ask the AI to test a submission |
| Visitors can read the list | Stop and fix the access rule now; re-run the security scan |
| Emails land in spam | Verify your domain in the email service; send from your domain |

:::checklist
- Page has one clear goal and one form
- Sign-ups save, with no duplicates
- Visitors cannot read the sign-up list
- Honeypot and rate limit are in place
- A privacy note and policy page exist
- Any email API key is stored as a back-end secret
:::

