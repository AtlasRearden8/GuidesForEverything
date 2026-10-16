# Deployment and Domains

**Deploying** (also called publishing or shipping) means putting your app on a computer that's always online so others can use it. This chapter compares the main hosts and walks through connecting your own domain.

:::summary In this chapter
- Where to host, and what the free plans allow
- Deploying from GitHub
- Environment variables in production
- Custom domains and DNS records
- A pre-launch checklist
:::

## Hosting options

| Option | Good for | Free plan |
|---|---|---|
| Your builder's **Publish** button | The easiest path | Usually a free subdomain; custom domains often need a paid plan |
| **Vercel** | Next.js and React apps; great with v0 | Hobby: personal, non-commercial use |
| **Netlify** | Static sites and front-end apps, forms | 300 credits a month |
| **Cloudflare Workers** | Fast sites and apps worldwide | 100,000 requests a day; static files free |
| **GitHub Pages** | Simple static websites (see the *GitHub* manual) | Free for public repos |
| **Replit** | Apps built in Replit | One published app on Starter |

A few details worth knowing:

- **Vercel Pro** is $20/mo with $20 of included usage. New teams get a default on-demand budget of $200 with alerts, and you can set a hard limit that pauses projects.
- **Netlify** charges in credits: on the free plan, each production deploy costs 15 credits, so about 20 deploys a month. Deploy previews are unlimited. Personal is $9/mo (1,000 credits); Pro starts at $20.
- **Cloudflare** now recommends **Workers** for new projects; Pages still works for existing sites.

## Deploying from GitHub

:::steps Deploy a GitHub repo to Vercel or Netlify
1. **Sign in to the host with GitHub.**
2. **Import the repository.** Choose it from the list.
3. **Accept the detected settings.** Hosts recognize Vite and Next.js projects automatically.
4. **Add environment variables** before the first deploy (see below).
5. **Deploy.** You get a live address. From now on, every push to `main` redeploys automatically, and other branches get preview addresses.
:::

## Environment variables in production

Your `.env` file stays on your computer. The host needs its own copy of each value, entered in the project's settings (on Vercel, the project's **Settings**, then **Environment Variables**). After changing a variable, **redeploy**: running deployments don't pick up changes on their own.

## Your own domain name

Buy a domain (like `plantpal.app`) from a registrar such as Cloudflare, Namecheap, or Porkbun. Cloudflare Registrar charges only what the registry charges, with no markup. Lovable, Bolt, Base44, and Replit also sell domains inside the app, which sets up DNS for you.

Then, in your host's **Domains** settings (on Vercel, [[Settings > Domains]]), add it and follow the instructions to update the **DNS records**, the internet's address book that points your domain at your host. Changes can take from minutes to a few hours to work everywhere.

| Record | What it does | Typical use |
|---|---|---|
| **A** | Points a name to a numeric address | The bare domain, `plantpal.app` |
| **CNAME** | Points a name to another name | `www.plantpal.app` → your host |
| **TXT** | Holds text for verification | Proving you own the domain; email setup |
| **MX** | Says where email goes | Receiving email at your domain |

> [!WARNING]
> Copy record values exactly from your host's screen, and don't delete MX or TXT records you don't understand: they may be running your email.

HTTPS certificates are issued automatically once DNS points at the host.

## Pre-launch checklist

:::checklist
- Tested every feature on a phone and a computer
- Tried signing up as a brand-new user, in a private browser window
- Confirmed user A cannot see user B's data
- No secret keys in front-end code; secrets stored in environment variables
- Error messages are friendly, not technical
- A privacy policy page if you collect any personal data
- A backup or export of your database
- Spending limits set on every paid service (AI APIs, hosting, database)
- Auth redirect URLs updated to the live domain
:::

