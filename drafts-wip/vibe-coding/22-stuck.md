# When You Get Stuck

Every vibe coder hits the same wall: the AI keeps "fixing" a bug and it keeps coming back, or each fix breaks something new. This chapter is your escape plan, plus a playbook for the error messages you'll see most.

:::summary In this chapter
- Breaking the fix-and-break loop
- Where to find error messages
- An error-message playbook
- Prompts for diagnosis
:::

## Break the loop

1. **Stop prompting the same request.** If two attempts failed, a third identical one probably will too.
2. **Roll back** to the last version that worked (version history or Git), and try a different approach.
3. **Ask for a diagnosis, not a fix:**
   ```prompt
   Don't change any code yet. List the three most likely causes of
   this bug, and how we could test each one.
   ```
4. **Add visibility:** "Add logging so we can see what's happening when I click Save." Then paste what the logs say.
5. **Start a fresh chat** with a short summary. Long conversations confuse AIs.
6. **Simplify:** remove the broken feature, get back to green, rebuild it in smaller slices.
7. **Switch models or tools.** A different AI often spots what the first one missed.

## Where errors hide

Error messages look scary but are just clues. Copy the *whole* message, including file names and line numbers, and paste it to the AI.

| Where | How to open it | Shows |
|---|---|---|
| Browser console | <kbd>F12</kbd>, or right-click → **Inspect** → **Console** | Front-end errors |
| Network tab | Same panel → **Network**; click a red row | Failed requests to your back end |
| Builder logs | Your builder's logs or Cloud/database panel | Back-end and database errors |
| Host logs | Vercel/Netlify deployment and function logs | Build failures, server errors |
| Terminal | The window running `npm run dev` | Local errors |

> [!NOTE]
> "It doesn't work" gives the AI nothing to go on. "When I click Save on the Add Plant form, nothing happens, and the console shows `TypeError: cannot read properties of undefined`" gets it fixed.

## Error-message playbook

:::compact
| You see | It usually means | Say to the AI |
|---|---|---|
| `TypeError: cannot read properties of undefined` | Code used data that hadn't arrived | "Handle the case where this data is missing or still loading" |
| `404 Not Found` | A page or address doesn't exist | "This link/request goes to a missing address; fix the route" |
| `401 Unauthorized` / `403 Forbidden` | Not signed in, or not allowed | "Check auth and permissions for this request" |
| `500 Internal Server Error` | The back end crashed | "Check the server logs for this request and fix the cause" |
| `CORS policy` error | A service refused requests from your site's address | "Fix CORS for this API call; call it from the back end if needed" |
| `violates row-level security policy` | Database rule blocked the action | "Explain which policy blocks this and fix the data or policy safely" |
| `Module not found` / `Cannot find package` | A library isn't installed | "Install the missing package and check the import" |
| `429 Too Many Requests` | Rate limit hit | "Add retries with waiting, and reduce how often we call this" |
| Build failed on deploy | Code works in preview, fails on the host | Paste the full build log |
| Blank white page | The front end crashed on load | Paste the console error |
:::

## Diagnosis prompts

```prompt
Here's exactly what happens: [steps]. Here's what I expected: [x].
Here's the full error: [paste]. Before fixing, explain in plain
English what's going wrong and why your fix will work.
```

```prompt
We've tried to fix this three times. Step back. Summarize what we've
tried, what we learned, and propose a completely different approach.
```

:::checklist
- I roll back instead of piling on fixes
- I know how to open the console and network tab
- I paste full errors, with what I did and what I expected
:::

