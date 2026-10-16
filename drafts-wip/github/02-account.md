# Create Your Account

Everything on GitHub starts with a free **personal account**: your identity on the site. This chapter gets you signed up, secured, and looking friendly, in about fifteen minutes.

:::summary In this chapter
- Signing up and choosing a good username
- Keeping your email address private
- Turning on two-factor authentication
- Making your profile and profile README
- Taming notifications
:::

## Sign up

:::steps Create a free GitHub account
1. **Go to github.com.** Click **Sign up**.
2. **Enter your email, a password, and a username.** Your username becomes part of your web address (github.com/*username*), so pick something you're happy to share professionally.
3. **Verify.** Solve the quick puzzle and enter the code GitHub emails you.
4. **Choose the Free plan.** It includes unlimited public and private repositories. You can upgrade later.
:::

> [!TIP]
> Choose a username that's short and easy to say aloud. Changing it later breaks old links to your work.

### Public or private: what the plan gives you

A **public** repository can be seen by anyone on the internet (only people you invite can change it). A **private** repository is visible only to you and the people you invite. The Free plan lets you create as many of each as you like, with unlimited collaborators. The paid plans, covered in the Plans and Pricing chapter, mostly add extra features for private repositories and teams.

## Keep your email address private

Every commit you make is stamped with an email address, and on public projects anyone can read it. GitHub gives you a private stand-in address so your real one stays hidden.

:::steps Hide your email
1. **Open your email settings.** Click your profile picture (top right), then **Settings**, then **Emails** in the sidebar.
2. **Tick "Keep my email addresses private."** GitHub shows your **noreply** address, which looks like `12345+username@users.noreply.github.com`.
3. **Tick "Block command line pushes that expose my email."** Git will then refuse to publish commits that contain your real address by mistake.
4. **Copy the noreply address.** You'll give it to Git in the Install Git chapter.
:::

## Turn on two-factor authentication

**Two-factor authentication** (2FA) means signing in needs your password *plus* a second proof, such as a code from your phone. GitHub requires 2FA for anyone who contributes code, so set it up now.

:::steps Enable 2FA
1. **Open settings.** Click your profile picture (top right), then **Settings**.
2. **Find the security page.** Go to [[Password and authentication]].
3. **Enable two-factor authentication.** Click **Enable two-factor authentication**.
4. **Scan the QR code** with an authenticator app such as Google Authenticator, Microsoft Authenticator, 1Password, or Authy, and type the 6-digit code it shows.
5. **Save your recovery codes.** Download them and keep them somewhere safe, offline. They're your only way back in if you lose your phone.
6. **Add a passkey (optional, recommended).** A **passkey** lets you sign in with your fingerprint, face, or device PIN instead of typing a password.
:::

> [!CAUTION]
> Lose your phone *and* your recovery codes, and GitHub support usually cannot restore your account. Print the recovery codes and store them with your important papers.

After you set up 2FA, GitHub runs a 28-day **check-up**: at some point in those four weeks it asks you to prove you can still produce a code. That catches a badly configured app before it locks you out. The Securing Your Account chapter covers every 2FA method, passkeys, and backups in depth.

## Make your profile friendly

Click your profile picture, then **Your profile**, then **Edit profile** to add a photo, a short bio, your location, and links. Pinning your best repositories (the **Customize your pins** link on your profile) puts them front and center.

### A profile README

A **profile README** is a special page that appears at the top of your profile. It's a great place to say who you are and what you're working on.

:::steps Create a profile README
1. **Create a new repository** named exactly the same as your username. GitHub shows a friendly message when the name matches.
2. **Make it Public.** Profile READMEs only show for public repositories.
3. **Tick "Add a README file"** and click **Create repository**.
4. **Edit README.md.** Write a few lines about yourself (the Markdown chapter shows how to format it) and commit.
5. **Visit your profile.** The README now appears above your repositories.
:::

```markdown title=README.md
# Hi, I'm Sam

I run a small bakery and I'm learning to build our website.

- Currently learning: GitHub and HTML
- Reach me at: sam@example.com
```

## Tame your notifications

GitHub tells you when someone mentions you, asks for your review, or replies to something you're involved in. You choose whether those arrive by email, on the website, or on your phone.

| Setting | Where | Tip |
|---|---|---|
| Delivery (email, web, mobile) | [[Settings > Notifications]] | Start with web and mobile; email gets noisy |
| Which repositories you follow | **Watch** button on a repository | "Participating and @mentions" is calm |
| Your inbox | Bell icon, top right | Mark items **Done** to clear them |

> [!TIP]
> When you're added to a busy project, GitHub may automatically watch it for you. If your inbox fills up, open the repository, click **Watch**, and switch to **Participating and @mentions**.

:::checklist
- Account created on the Free plan
- Email kept private, noreply address copied
- 2FA on, recovery codes printed or saved offline
- Profile photo and bio added
- Notifications set the way I like
:::
