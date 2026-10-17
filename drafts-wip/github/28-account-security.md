# Securing Your Account: 2FA, Passkeys, SSH Keys and Tokens

Your GitHub account can change code that other people run, so it's worth protecting well. This chapter covers how you prove who you are: two-factor authentication, passkeys, SSH keys for Git, and personal access tokens for tools.

:::summary In this chapter
- Choosing 2FA methods and keeping backups
- Passkeys for password-free sign-in
- Creating and testing an SSH key
- Fine-grained personal access tokens
- Reviewing what has access to your account
:::

## Two-factor authentication methods

| Method | How it works | Recommendation |
|---|---|---|
| **Authenticator (TOTP) app** | A 6-digit code that changes every 30 seconds | Best primary method |
| **Passkey** | Fingerprint, face, or device PIN | Excellent; also replaces the password |
| **Security key** | A small USB or NFC device you tap | Excellent backup |
| **GitHub Mobile** | Approve sign-ins on your phone | Convenient extra |
| **Text message (SMS)** | A code by text | Last resort; can be intercepted |

Set up a TOTP app first at [[Settings > Password and authentication]], then add at least one more method so losing a single device doesn't lock you out. After setup, GitHub's 28-day check-up asks you to use 2FA once, to confirm it works.

> [!CAUTION]
> Download your **recovery codes** and store them offline (printed, or in a password manager). Without them, losing your 2FA devices can mean losing the account for good.

## Passkeys

A **passkey** is a pair of cryptographic keys stored by your phone, computer, or password manager. Signing in with one counts as both password and 2FA in a single step, and it can't be phished because it only works on github.com. Add one under [[Settings > Password and authentication]], in the **Passkeys** section. Passkeys synced by Apple, Google, or a password manager work across your devices.

## SSH keys

**SSH** is an alternative way for Git to connect to GitHub, using a key pair instead of a browser sign-in. The **private key** stays on your computer; you give GitHub the **public key**.

:::steps Create and add an SSH key
1. **Generate a key** (press <kbd>Enter</kbd> to accept the default location, and choose a passphrase).
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```
2. **Start the agent and add the key** (macOS shown; on Windows and Linux omit `--apple-use-keychain`).
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add --apple-use-keychain ~/.ssh/id_ed25519
   ```
3. **Copy the public key.** macOS: `pbcopy < ~/.ssh/id_ed25519.pub`. Windows Git Bash: `clip < ~/.ssh/id_ed25519.pub`. Linux: `cat ~/.ssh/id_ed25519.pub` and copy the output.
4. **Add it to GitHub.** [[Settings > SSH and GPG keys > New SSH key]], give it a title like "Personal laptop," choose **Authentication Key**, paste, and click **Add SSH key**.
5. **Test it.**
   ```bash
   ssh -T git@github.com
   ```
   You should see "Hi *username*! You've successfully authenticated."
:::

Then clone with the SSH address from the **Code** button (`git@github.com:owner/repo.git`), or switch an existing clone with `git remote set-url origin git@github.com:owner/repo.git`.

> [!NOTE]
> On macOS, also add a `~/.ssh/config` entry with `UseKeychain yes` so the passphrase is remembered; GitHub's SSH docs show the exact lines. SSH keys can also be added as a **Signing Key**, which lets GitHub show a **Verified** badge on your commits.

## Personal access tokens

Some tools ask for a **personal access token** (PAT), a password-like string that lets a program act on your behalf. Prefer **fine-grained** tokens, which you can limit to specific repositories and permissions:

:::steps Create a fine-grained token
1. **Open developer settings.** Profile picture, then [[Settings > Developer settings > Personal access tokens > Fine-grained tokens]].
2. **Click Generate new token.**
3. **Name it and set an expiration**, for example 90 days.
4. **Choose the resource owner** (your account, or an organization) and **repository access**: *Only select repositories* is safest.
5. **Pick permissions.** Grant only what the tool needs (for example, **Contents: Read and write** and **Pull requests: Read and write**).
6. **Generate and copy the token.** You'll only see it once. Store it in a password manager.
:::

| | Fine-grained | Classic |
|---|---|---|
| Limit to chosen repositories | Yes | No: every repo you can access |
| Permissions | Detailed, per feature | Broad "scopes" |
| Recommended | Yes | Only where fine-grained isn't supported |

You can have up to 50 fine-grained tokens. GitHub automatically removes tokens that haven't been used for a year, but set an expiry anyway.

## Review what has access

Every few months, check:

| Page | Look for |
|---|---|
| [[Settings > Sessions]] | Devices signed in to your account |
| [[Settings > Applications]] | Apps and OAuth apps you've authorized; revoke unused ones |
| [[Settings > SSH and GPG keys]] | Keys for computers you no longer own |
| Personal access tokens | Old or never-expiring tokens |
| [[Settings > Security log]] | Unexpected sign-ins or changes |

:::checklist
- TOTP app plus a passkey or security key as backup
- Recovery codes stored offline
- SSH key added and `ssh -T git@github.com` succeeds (optional)
- Tokens are fine-grained, scoped, and expiring
- Unused apps, keys, and sessions removed
:::
