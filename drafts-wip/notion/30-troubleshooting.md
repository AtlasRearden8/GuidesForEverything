# Tips and Troubleshooting

Most Notion problems have a simple cause: a filter, a permission, or a setting. Find your symptom below.

## Finding things

:::compact
| Problem | Try this |
|---|---|
| Can't find a page | <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>P</kbd> to search; check **Trash** in the sidebar (deleted pages are kept for 30 days) |
| A page vanished from the sidebar | It may be inside another page; search for it and check its breadcrumb |
| Search doesn't show a page | You may not have access, or it's set to Hide in search; ask the owner |
| Database items are "missing" | A view filter is hiding them; check **Filter** or switch views |
| New items appear in the middle | Large databases (1,000+ items) may sort new items oddly; add a sort |
:::

## Sharing and access

:::compact
| Problem | Try this |
|---|---|
| Someone can't open a shared link | Check **Share** settings; they may need an invitation, or general access widened |
| Can't invite a guest | Guest limit reached, guests disabled, or their email domain isn't allowed |
| Teammate sees a page they shouldn't | It inherits sharing from a parent or teamspace; move it to Private or change Share |
| Synced block looks empty to others | They can't access the page with the original block |
| Can't edit a database's properties | You have Can edit content, or the database is locked |
| Export option missing | An Enterprise owner disabled export, or a guest needs Full access |
:::

## Databases and formulas

:::compact
| Problem | Try this |
|---|---|
| Database feels cluttered | Create views with filters instead of deleting data |
| Timeline is empty | It needs a date property with a range (start and end) |
| Map is empty | Add a Place property and real addresses |
| Rollup shows nothing | Check the relation is filled in and the right property is chosen |
| Formula error | Check property names, wrap numbers in `format()`, guard empty values |
| Board won't group by a property | Boards group by Select, Status, Person, and similar types |
| Chart limit reached | Free has one chart; upgrade or delete an old chart |
:::

## Automations and connections

:::compact
| Problem | Try this |
|---|---|
| Automation can't find my page | Share the page with the connection (••• › More › Connections) |
| API returns 404 "object not found" | The database isn't shared with the connection, or the ID is wrong |
| API returns 400 validation error | Property names or types don't match the database |
| Database automation didn't run | It was triggered by another automation, or targets a Private page |
| Button does nothing | The target database is in Private or Shared; move it to a teamspace |
| Slack action unavailable | Needs Plus or above, and a connected Slack workspace |
| AI app can't see Notion | Reconnect Notion MCP and sign in again; check Enterprise allowlists |
:::

## Notion AI and agents

:::compact
| Problem | Try this |
|---|---|
| AI says it's unavailable | Your workspace may have hit its usage allowance; it refreshes within hours |
| A model is missing | An admin must enable premium models, or you hit your credit limit |
| Meeting notes didn't hear others | Use the desktop app for calls; the browser and phone only hear your mic |
| No summary after a meeting | At least one minute of audio is needed |
| Custom Agent did the wrong thing | Open its Activity log, then tighten its instructions and access |
| Custom Agent ignores a page | Add it under Tools and access; links in instructions don't grant access |
:::

## Apps, sync, and performance

:::compact
| Problem | Try this |
|---|---|
| Page is slow | Very large databases or embeds slow things down; split them or use filtered views |
| Want to work offline | Use the desktop or mobile app and mark key pages **Available offline** |
| Offline page isn't on my phone | Offline is per device; turn it on there too |
| App behaves strangely | Update it, log out and in, or reset the app's cache from its help menu |
| Can't log in | Check you're using the same sign-in method (email, Google, or Apple) as before |
| Exported ZIP won't open on Windows | Untick Create folders for subpages, or use 7-Zip |
| Site not on Google | Turn on search indexing and wait up to four weeks |
:::

> [!TIP]
> Still stuck? Click **?** at the bottom of the desktop app to message Notion support, check status.notion.so for outages, or ask Notion AI: "How do I…?"

