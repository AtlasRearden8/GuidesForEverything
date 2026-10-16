# Logins, Payments, and Email

Three features turn a project into a product: knowing who's using it, taking money, and sending messages. Each one has a proven service you should lean on instead of letting the AI invent its own.

:::summary In this chapter
- Sign-in options and how to choose
- Taking payments safely with Stripe
- Sending email that actually arrives
- API keys and environment variables
:::

## Logins (authentication)

**Authentication** ("auth") is proving who someone is: email and password, a magic link, or "Sign in with Google." Always use your platform's built-in auth or a proven service. Never ask the AI to invent its own password system.

| Method | Good for | Watch out for |
|---|---|---|
| **Magic link** | Simple apps; no passwords to forget | Depends on email arriving quickly |
| **Email + password** | Familiar to everyone | Needs password reset; enforce decent passwords |
| **Google / Apple sign-in** | Fast, trusted | Extra setup in Google's or Apple's console |
| **One-time code** | Phone-friendly | Codes must expire quickly |

```prompt
Add sign-in with email magic links and Google, using the built-in
auth. Each user should only ever see and edit their own plants.
```

That last sentence matters enormously: it is what row-level security enforces. **Authorization** is the related idea of deciding what a signed-in person may do, like "staff can edit orders but not delete them."

> [!TIP]
> After adding sign-in, always set the live address in your auth settings (in Supabase, [[Authentication > URL Configuration]]). Otherwise sign-in links send people back to `localhost`.

## Payments with Stripe

Use **Stripe** (or your builder's payments integration) for anything involving money. Stripe handles card details so they never touch your app. Standard US pricing is 2.9% + 30¢ per successful card charge, with no monthly fee. Lovable offers built-in Stripe or Paddle payments; Bolt and Base44 have Stripe setup guides.

| Option | Effort | Use it for |
|---|---|---|
| **Payment Links** | No code: create in the Stripe dashboard, paste a link | Selling one product or a simple subscription |
| **Checkout** | A Stripe-hosted payment page your app opens | Most apps |
| **Builder integration** | Done by chat | Fastest within Lovable, Bolt, Base44 |

:::steps Add a premium plan safely
1. **Work in a sandbox first.** Stripe's sandboxes are test environments where no real money moves.
2. **Ask the AI to use Stripe-hosted Checkout,** not a home-made card form.
3. **Store the Stripe secret key** as a back-end secret, never in the front end.
4. **Have Stripe tell your back end about payments** with a **webhook** (an automatic message from Stripe to your app). Only the webhook should mark someone as premium.
5. **Test with Stripe's test card** `4242 4242 4242 4242`, any future expiry date, and any three-digit security code. Also test a declined payment and a cancellation.
6. **Switch to live keys** only when every test passes.
:::

```prompt
Explain, step by step, how a payment marks someone as premium in
this app. Where is that decided: browser or server? What happens if
the payment fails, or the user cancels next month?
```

> [!WARNING]
> If "premium" is decided in the browser, anyone can unlock it for free. The server, informed by Stripe's webhook, must decide.

## Sending email

Apps send **transactional email**: sign-in links, receipts, reminders. Use an email service such as **Resend** (free plan: 3,000 emails a month, up to 100 a day) or your builder's built-in email.

- **Send from your own domain** and complete the service's verification steps; otherwise mail lands in spam.
- **Supabase's default sender is for testing only.** Its sending is limited, so connect a custom email service (SMTP) before launch.
- **Include an unsubscribe link** in anything that isn't strictly necessary, like newsletters.

## API keys and environment variables

An **API key** identifies your app to a service. Keys belong in **environment variables** (also called **secrets**): settings stored on the server, outside your code. Every builder has a **Secrets** or **Environment variables** panel.

Some variables are deliberately public. Variables whose names start with `VITE_` (Vite apps) or `NEXT_PUBLIC_` (Next.js apps) are baked into the front end, where anyone can read them. Only publishable values, like a Supabase publishable key, belong there.

```bash title=.env
# Public: fine in the browser
VITE_SUPABASE_URL=https://yourproject.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
# Secret: back end only, never with a public prefix
STRIPE_SECRET_KEY=sk_test_...
RESEND_API_KEY=re_...
```

> [!CAUTION]
> Never paste API keys directly into chat or code, and never put a secret key in front-end code. Anyone can read front-end code in their browser and use your key, and run up your bill.

:::checklist
- Sign-in uses built-in auth; live URLs configured
- Payments use Stripe Checkout or Payment Links, tested in a sandbox
- Premium status set only by the server via webhook
- Email sent from a verified domain through a real email service
- No secret has a `VITE_` or `NEXT_PUBLIC_` prefix
:::

