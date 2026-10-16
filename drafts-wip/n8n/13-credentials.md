# Connecting Your Apps: Credentials and OAuth

To read your email or post to your Slack, n8n needs permission. That permission is stored as a **credential**. This chapter explains the main kinds, walks through the trickiest one (Google on a self-hosted server), and shows how to call any API.

:::summary In this chapter
- What credentials are and where they live
- OAuth versus API keys
- Setting up Google OAuth on self-hosted n8n
- Restricting which domains a credential may be used with
- Calling any API with HTTP Request
- Good security habits
:::

## Credentials

A **credential** stores the sign-in for an app so nodes can use it. Create them from a node (**Credential › Create new credential**) or from **Credentials** in the sidebar. There are two main kinds:

- **OAuth** ("Sign in with Google," "Connect to Slack"): click a button and approve in a pop-up. On n8n Cloud, most of these work instantly.
- **API key or token**: copy a secret key from the app's developer settings and paste it in.

When you save a credential, n8n tests it to confirm it works. Credentials are encrypted in n8n's database with your instance's encryption key, and their secret values are never shown again after saving.

## How OAuth works, in plain English

**OAuth** is the "valet key" of the internet. Instead of giving n8n your Google password, you sign in to Google, and Google hands n8n a limited key that can do only what you approved (for example "read and send Gmail"). You can revoke that key at any time from your Google account without changing your password.

The flow has one fiddly part: the app must know where to send you back after you approve. That address is the **OAuth Redirect URL**, shown in every n8n OAuth credential. It must match exactly what's registered with the app.

## Managed versus custom OAuth

On **n8n Cloud**, many popular apps offer **Managed OAuth2**: just click **Sign in with Google** and you're done. For Google, that covers Gmail, Sheets, Drive, Calendar, Docs, Slides, Contacts, Tasks, Chat and YouTube, plus their triggers.

On **self-hosted** n8n (and for apps without managed OAuth), you create your own **OAuth app** in the provider's developer console. Each credential page in n8n links to step-by-step instructions.

## Walkthrough: Google OAuth on self-hosted n8n

:::steps Create a Google OAuth credential
1. **Create a Google Cloud project.** Go to console.cloud.google.com, open the project dropdown and choose **New project**. Name it "n8n" and select **Create**.
2. **Enable the APIs you need.** Go to **APIs & Services › Library**, search for, say, **Gmail API**, and select **Enable**. Repeat for Sheets, Drive and so on.
3. **Configure the consent screen.** Go to **APIs & Services › OAuth consent screen** and select **Get started**. Enter an app name and support email. For **Audience**, choose **Internal** (Workspace users only) or **External** (any Google account). Accept the policy and create it.
4. **Add your domain.** Under **Branding › Authorized domains**, add your n8n domain (for example `example.com`).
5. **Create the client.** Go to **APIs & Services › Credentials**, choose **+ Create credentials › OAuth client ID**, and set **Application type** to **Web application**.
6. **Paste the redirect URL.** In n8n, create a Google credential (for example "Gmail OAuth2 API") and copy its **OAuth Redirect URL**. Paste it under **Authorized redirect URIs** in Google, then select **Create**.
7. **Copy the ID and secret back.** Paste Google's **Client ID** and **Client Secret** into the n8n credential, select **Sign in with Google**, approve, and **Save**.
:::

> [!WARNING]
> With an **External** audience, your Google app starts in **Testing** mode: only Google accounts you add as **test users** can sign in. Everyone else sees "access denied." Add yourself as a test user on the consent screen settings.

## Restricting where a credential can be used

Many credentials have an **Allowed HTTP Request Domains** field. Set it to **Specific Domains** (for example `api.github.com`) so the credential can't be sent to any other site from an HTTP Request node, or **None** to block HTTP Request use entirely. This protects you if someone edits a workflow carelessly.

## Fixed and end-user credentials

For OAuth credentials, some plans let you choose a **credential type**: a **Fixed credential** (the same account whatever happens, the default) or an **End-user credential** (each person who triggers the workflow uses their own account, a preview feature on higher plans).

## When there's no node: HTTP Request

Almost every online service has an **API**. If n8n has no dedicated node for it, use the **HTTP Request** node with the service's documentation. Many API docs show a `curl` command; n8n's HTTP Request node has **Import cURL**, which fills in everything for you.

:::steps Call an API with a key
1. **Find the API docs.** Note the endpoint URL and how it wants the key, usually a header such as `Authorization: Bearer YOUR_KEY` or `X-API-Key: YOUR_KEY`.
2. **Create a generic credential.** In the HTTP Request node choose **Authentication › Generic Credential Type**, then **Header Auth** (or **Bearer Auth**). Enter the header name and value.
3. **Set method and URL**, add any query parameters, and click **Execute step**.
4. **Inspect the response.** If it fails, read the status code: 401 means the key is wrong, 403 not allowed, 404 wrong URL, 429 too many requests.
:::

## Sharing credentials

On plans with projects, a credential belongs to a project or to your personal space. Everyone in a project can **use** its credentials in workflows without seeing the secret values. Credential sharing with specific people requires a paid plan.

## Security habits

- Name credentials clearly, for example "Gmail: personal" and "Gmail: business."
- Give each credential the minimum access it needs.
- Never paste keys into Code nodes or text fields; always use credentials.
- Remove credentials you no longer use.
- Revoke an app's access at the provider (Google, Slack…) if a credential might have leaked, then create a fresh one.

:::checklist
- I've created at least one OAuth and one API-key credential
- I know where to find the OAuth Redirect URL
- On self-hosted, I've added myself as a Google test user
- I've restricted credential domains where it makes sense
- No secrets live in my Code nodes or text fields
:::

