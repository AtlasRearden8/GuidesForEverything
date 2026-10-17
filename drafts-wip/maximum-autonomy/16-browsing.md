
# Browsing Agents

A **browsing agent** drives a real web browser: it clicks, types, fills forms, and reads pages for you. ChatGPT's agent mode (which absorbed the earlier Operator), Claude in Chrome, and Claude Desktop's built-in browser are the main examples. They are the hardest agents to make fully hands-off, on purpose: the web is where prompt injection lives, and where money and accounts are.

:::summary In this chapter
- What browsing agents can and can't do without you
- How to cut down their prompts
- A safe "agent browser profile"
:::

## What always stops for you

| Tool | Stops for |
|---|---|
| **ChatGPT agent** | Confirmations before high-impact actions such as purchases or sending; "watch mode" on sensitive sites, where you must keep the tab in view |
| **Claude in Chrome** | First action on each site; purchases, account creation, CAPTCHAs; classifier-flagged risky page actions |
| **Claude Desktop browser** | Safety classifiers on actions on external websites, in every permission mode |

These aren't settings you can remove. Plan around them: let the agent research, compare, and fill in drafts, and do the final "buy" or "send" click yourself.

## Reduce the prompts you can

- **Approve sites once.** In Claude in Chrome, answer a site's first action card with **Always allow**.
- **Sign in ahead of time.** Agents stop at login screens. Log in to the sites the agent will use before you hand over.
- **Write complete instructions.** Include the details the agent would otherwise ask about (sizes, dates, budgets, which account).

```prompt
Find three flights from Boston to Denver on 12 November, leaving after 9 a.m.,
under $350, carry-on only. Compare them in a table. Don't book anything; stop
on the final payment page for the cheapest one so I can review it.
```

## Build an agent browser profile

:::steps Give the agent its own browser
1. **Create a new browser profile** (Chrome: profile icon, then **Add**) named "Agent".
2. **Install only the agent's extension** in it, nothing else.
3. **Sign in only to the accounts the agent needs**, ideally its own accounts, never your bank or main email.
4. **Don't save payment cards** in this profile.
5. **Use it only for agent tasks.** Your personal profile stays out of reach.
:::

> [!CAUTION]
> A browsing agent signed in to your main email can be tricked by a single malicious web page into forwarding messages. Separate profiles and separate accounts are the containment for browsers.

:::checklist
- Browsing agents run in a separate browser profile
- Sites you use often are set to **Always allow**
- Payment and send steps are left for you to click
:::
