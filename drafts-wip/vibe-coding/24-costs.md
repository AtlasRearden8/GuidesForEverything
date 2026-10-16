# Costs and Credits

Most vibe coding tools charge with **credits** (or **tokens**), units of AI work. Bigger requests and longer conversations use more. The running app has costs too: hosting, database, email, and AI calls. A little planning keeps the total low.

:::summary In this chapter
- Where the money goes
- Making credits last
- Free tiers worth knowing
- A typical budget, and avoiding surprise bills
:::

## Where the money goes

| Cost | Charged by | Typical pattern |
|---|---|---|
| Building | Builder or agent plan | Monthly plan plus top-ups |
| Hosting | Builder, Vercel, Netlify, Cloudflare | Free at first; grows with traffic |
| Database | Supabase, builder cloud | Free until you need more or stop pauses |
| AI features in your app | AI provider or builder credits | Per use; can spike |
| Email | Resend or similar | Free tier, then monthly |
| Domain | Registrar | Yearly |
| Store accounts | Apple ($99/yr), Google ($25 once), Chrome Web Store (one-time) | Only if you publish there |

## Make credits last

- **Plan before building.** A clear brief avoids expensive rewrites.
- **Use visual edits** for small text and color changes instead of chat.
- **Batch small tweaks** into one clear message, but keep big features separate.
- **Roll back instead of re-prompting** when a change goes badly.
- **Use "chat" or "plan" modes** to discuss ideas; many tools charge less when the AI isn't editing code. In Lovable, a Plan mode message costs one credit.
- **Keep projects focused.** Bolt and others use more tokens as projects grow.
- **Move heavy work to an agent subscription** (Claude Code, Codex, Cursor) when you're doing lots of building. A flat monthly plan is often cheaper than pay-per-credit builders.

## Free tiers worth knowing

:::compact
| Service | Free allowance |
|---|---|
| **Lovable** | 5 build credits a day, up to 30 a month |
| **Bolt** | 300K tokens a day, 1M a month |
| **v0** | 7 messages a day |
| **Base44** | 25 message credits a month |
| **Supabase** | 2 projects, 500 MB database, 50,000 monthly users (pauses when idle) |
| **Netlify** | 300 credits a month |
| **Cloudflare Workers** | 100,000 requests a day; static files free |
| **Resend** | 3,000 emails a month (100 a day) |
| **Copilot Free** | 2,000 completions a month |
:::

## A typical starter budget

| Stage | Setup | Monthly cost |
|---|---|---|
| Exploring | Free tiers of 2–3 builders | $0 |
| Building your first real app | One builder plan | ≈ $20–30 |
| Growing a serious project | Builder or editor + Claude Pro or ChatGPT Plus | ≈ $40–60 |
| Running in production | Plus hosting, database, domain | add ≈ $10–50 |

## Avoiding surprise bills

1. **Set limits everywhere:** Supabase's spend cap (on by default on Pro), Vercel's budget and hard limit, AI provider spending limits, Google Cloud budget alerts.
2. **Rate-limit AI features** per user (see Project 6).
3. **Watch usage weekly** for the first month after launch.
4. **Cancel what you don't use.** Credits on many plans expire anyway.

:::checklist
- I know every service my app pays for
- Spending limits or alerts are on for each
- I use plan/chat modes and visual edits to save credits
:::

