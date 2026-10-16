# Publish a Website with GitHub Pages

**GitHub Pages** turns a repository into a free public website, which is perfect for portfolios, documentation, and small business sites. You can publish plain HTML files straight from a branch, or build a site with a tool and deploy it with GitHub Actions.

:::summary In this chapter
- Publishing from a branch in five steps
- Your personal `username.github.io` site
- Deploying with a GitHub Actions workflow
- Connecting your own domain name, with HTTPS
- Limits and troubleshooting
:::

## Publish a site from a branch

:::steps Publish a site
1. **Put your site in a repository.** At minimum, an `index.html` file at the top level (or in a `docs` folder).
2. **Open the repository's settings.** Click **Settings**, then **Pages** in the left sidebar.
3. **Choose the source.** Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. **Pick the branch.** Choose `main` and the `/ (root)` folder (or `/docs`), then click **Save**.
5. **Wait a minute or two.** Refresh the Pages settings; your address appears at the top: `https://your-username.github.io/repository-name/`.
:::

> [!NOTE]
> On the Free plan, Pages works for **public** repositories; GitHub Pro, Team, and Enterprise also allow it from private repositories (the site itself is still public). A repository named `your-username.github.io` becomes your main site at `https://your-username.github.io`.

A tiny starter page:

```html title=index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sam's Bakery</title>
  </head>
  <body>
    <h1>Sam's Bakery</h1>
    <p>Fresh bread daily, 8am to 2pm.</p>
  </body>
</html>
```

Branch publishing runs your files through **Jekyll**, a site generator that can turn Markdown into pages. If your site has folders starting with an underscore that vanish, add an empty file named `.nojekyll` at the top level to switch Jekyll off.

## Deploy with GitHub Actions

If your site is built by a tool (React, Vite, Astro, Hugo, Eleventy, and so on), set **Source** to **GitHub Actions** and add a workflow. This one uploads a built `dist` folder; swap in your own build commands:

```yaml title=.github/workflows/pages.yml
name: Deploy site
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v7
        with:
          node-version: '20.x'
      - run: npm ci && npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v4
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

The `pages: write` and `id-token: write` permissions are required for deploying. The Pages settings page also suggests ready-made workflows for popular tools.

## Use your own domain

:::steps Connect a custom domain
1. **Buy a domain** from any registrar.
2. **Enter it in GitHub.** In [[Settings > Pages]], type it under **Custom domain** and click **Save**.
3. **Add DNS records at your registrar.** For `www.example.com`, a `CNAME` record pointing to `your-username.github.io`. For the bare `example.com`, four `A` records:
   ```text
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
4. **Wait.** DNS changes can take up to 24 hours.
5. **Tick Enforce HTTPS** once it becomes available (also up to 24 hours), so visitors get the padlock.
:::

> [!WARNING]
> Don't use wildcard DNS records like `*.example.com`; they let others take over your subdomains. GitHub also recommends **verifying** your domain in your account's Pages settings first.

## Limits

| Limit | Amount |
|---|---|
| Published site size | 1 GB |
| Bandwidth | 100 GB per month (soft limit) |
| Builds from a branch | 10 per hour (soft; not for custom Actions workflows) |
| Deployment time | Times out after 10 minutes |

Pages is meant for websites, not for running online shops or file-sharing services; it serves static files only (no server-side code or databases).

## Troubleshooting

| Problem | Fix |
|---|---|
| Site shows 404 | Check `index.html` is in the chosen folder (name is case-sensitive), wait a few minutes, check Actions for errors |
| Styles or images missing | Use relative paths (`css/style.css`) rather than `/css/style.css` for project sites |
| Changes don't appear | Hard-refresh the browser; check the latest Pages run finished |
| Custom domain keeps resetting | With Actions deploys, set the domain in settings, not with a `CNAME` file |
| Enforce HTTPS is greyed out | DNS isn't finished; wait up to 24 hours |

```prompt
Create a simple, mobile-friendly one-page website for my bakery in
a single index.html with inline CSS: name, opening hours, a short
menu, and a contact section. No frameworks. I'll publish it with
GitHub Pages.
```

:::checklist
- `index.html` published at my github.io address
- I know whether I'm using branch or Actions deployment
- Custom domain with HTTPS enforced (optional)
:::
