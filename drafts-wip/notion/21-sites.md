# Notion Sites

**Notion Sites** turns any page into a public website with one click: a portfolio, a résumé, a blog, an event page, or a help center. The site updates automatically whenever you edit the page.

:::summary In this chapter
- Publishing a page as a site
- Slugs, search engines, and embedding
- Customizing on paid plans
- Using your own domain, and what it costs
:::

## Publish a site

:::steps Publish a page
1. **Open the page** and click **Share**.
2. **Open the Publish tab** and click **Publish**.
3. **Click View site** to see it live at a `notion.site` address.
:::

> [!WARNING]
> Publishing a page also publishes all of its subpages. Check them first, and remember that a site's metadata can include the names and photos of people who edited it.

## Site settings

After publishing, open **Share › Publish** again:

- **Copy the link** to share it.
- **Slug** (paid plans): the part after the domain, as in `notion.site/my-slug`. Letters, numbers, and hyphens only, up to 60 characters.
- **Search engine indexing:** switch on **Discoverable on the web** so Google can find it. It can take up to four weeks to appear. Paid plans can edit the title and description search engines show.
- **Duplicate as template:** let visitors copy your page into their own workspace.
- **Embed this page:** copy code to put the page, a form, or a chart on another website.
- **All published sites:** see everything you've published.

## Customize your site (paid plans)

Open **Share › Publish › Site customization**:

| Setting | What it changes |
|---|---|
| **Share preview** | The image and text shown when the link is shared |
| **Theme** | System, Light, or Dark |
| **Favicon** | The little icon in the browser tab |
| **Header** | Breadcrumbs, search, navigation links, and the Notion watermark |
| **Google Analytics** | Add a measurement ID to count visitors |

Click **Publish changes** when you're done.

## Plans and domains

| Feature | Free | Paid plans |
|---|---|---|
| Published sites | Unlimited | Unlimited |
| `notion.site` domains | 1 | Up to 5 |
| Search engine indexing | Yes | Yes, with custom title and description |
| Homepage, customization, analytics | No | Yes |
| Your own domain | No | Add-on: $10/month per domain, or $8/month billed yearly |

### Use your own domain

:::steps Connect a custom domain
1. **Buy a domain** from a domain provider if you don't have one. Notion doesn't sell domains.
2. **Go to [[Settings > Sites]]** and click **New domain › Custom domain**.
3. **Enter the domain with a subdomain**, such as `www.mysite.com`.
4. **Add a CNAME record** at your domain provider pointing to `external.notion.site.` (note the final period).
5. **Wait for it to connect**, then set the page as the domain's homepage.
:::

With a custom domain you can also remove the "Built with Notion" watermark. You can connect up to 25 custom domains.

> [!TIP]
> To make `mysite.com` (without www) work too, set up a redirect to `www.mysite.com` at your domain provider.

:::checklist
- I published a test page and opened it in a private browser window
- I checked which subpages were published with it
- I know how to turn search indexing on or off
:::

