# Project 1: A Portfolio Site

Your first complete build is a personal portfolio: a few pages that show who you are and what you do. It needs no database and no logins, so you can focus on the workflow. We'll use **v0**, which excels at good-looking pages and deploys to Vercel in one click. Lovable, Bolt, and Figma Make work just as well.

:::summary In this project
- Gather content before you prompt
- Build a multi-section site in slices
- Add page titles, descriptions, and a sharing image
- Publish and connect a custom domain
:::

| | |
|---|---|
| **Time** | 1–2 hours |
| **Cost** | Free; a custom domain is an optional yearly fee |
| **Tools** | v0 (free plan), Vercel (free Hobby plan for personal sites) |
| **You'll learn** | Prompting for design, iterating, deploying, domains |

> [!NOTE]
> Vercel's free **Hobby** plan is for personal, non-commercial use. A personal portfolio is fine. For a business site, use the Pro plan or another host such as Netlify or Cloudflare.

## Step 1: Gather your content

The AI can invent placeholder text, but your site will feel generic until you give it the real thing. Collect these in a document first:

:::cols
- Your name and a one-line description
- A short "about" paragraph (3–5 sentences)
- 3–6 projects or work samples
- A photo of each project
- A photo of you (optional)
- How to contact you
- Links: LinkedIn, GitHub, Instagram
- Three adjectives for the feel
:::

## Step 2: Describe the whole site, build the first slice

```prompt
I'm building a personal portfolio site. I'm Sam Rivera, a freelance
illustrator who draws for children's books and small brands.
Sections: hero with my name and tagline, selected work (a grid of
6 projects), about me, and contact. Feel: warm, playful, lots of
white space, hand-drawn accents. Mobile-first.
Start with just the hero section and the work grid, using
placeholder images. I'll give you real content next.
```

Look at the preview on desktop and in the phone view. Don't fix everything at once: pick the biggest problem first.

## Step 3: Pour in your real content

```prompt
Replace the placeholder text with my real content below. Keep the
layout. For each project card show the title, a one-line description,
and the image. Clicking a card opens a larger view with the full text.

[paste your about text, project titles and descriptions here]
```

Upload your images in the chat (most builders accept image uploads) and ask the AI to use them in the right cards.

## Step 4: Polish in small passes

Do one pass at a time, checking the preview after each:

1. **Typography:** "Make headings bolder and larger; increase line spacing in paragraphs."
2. **Color:** "Use a warm cream background with a coral accent for links and buttons."
3. **Motion:** "Add a subtle fade-in as sections scroll into view. Keep it gentle."
4. **Phone check:** "Check every section at 375px wide and fix anything cramped."

Use v0's **Design Mode** for small text and color tweaks; it's faster than prompting.

## Step 5: Make it shareable and findable

When someone shares your link, apps show a title, a description, and an image. Search engines use the same information.

```prompt
Add proper page metadata: a page title "Sam Rivera — Illustrator",
a 150-character description, and a social sharing image using my
hero illustration. Add descriptive alt text to every image for
screen readers. Add a favicon using my initials.
```

**Alt text** is a short written description of an image. Screen readers (software that reads pages aloud for blind and low-vision users) speak it, and search engines read it too.

## Step 6: Add a contact option

The simplest option is a link that opens the visitor's email app:

```prompt
In the contact section, add a large "Email me" button that opens
a new email to hello@samrivera.art with the subject "Project inquiry".
Also add icon links to my Instagram and LinkedIn.
```

If you'd rather have a form, see Project 2.

## Step 7: Publish

:::steps Deploy from v0
1. **Click Publish** (or **Deploy**) in v0.
2. **Connect your Vercel account** when asked. v0 creates a Vercel project for you.
3. **Wait a minute.** Vercel builds the site and gives you an address ending in `.vercel.app`.
4. **Open it on your phone and computer.** Click every link.
5. **Connect GitHub** in v0 if you haven't, so your code is backed up.
:::

## Step 8: Add your own domain (optional)

:::steps Connect a domain on Vercel
1. **Buy a domain** from a registrar such as Cloudflare, Namecheap, or Porkbun.
2. **In Vercel, open your project,** then [[Settings > Domains]], and add the domain.
3. **Copy the DNS records Vercel shows you** (usually an A record and a CNAME for `www`).
4. **Add them at your registrar,** in its DNS settings.
5. **Wait.** It can take minutes to a few hours. Vercel shows a green check and sets up HTTPS automatically.
:::

The "Deployment and Domains" chapter explains DNS records in more detail.

## If something goes wrong

| Problem | Fix |
|---|---|
| Site looks generic | Give real content, a reference screenshot, and three adjectives |
| Images are blurry or slow | "Optimize all images and serve sizes appropriate for each screen" |
| Layout breaks on phone | Paste a phone screenshot and say what's wrong |
| Deploy failed | Copy the build error from Vercel into v0: "The deploy failed with this error. Fix it." |
| Domain not working after hours | Check records at your registrar match Vercel's exactly; remove old conflicting records |

:::checklist
- Real content and images, no placeholder text left
- Looks good at phone width and desktop width
- Every image has alt text
- Page title, description, and sharing image set
- Contact button works
- Published, and connected to GitHub
:::

