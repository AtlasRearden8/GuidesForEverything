# Troubleshooting

When something isn't working, find the closest symptom below. Most problems fall into a handful of patterns, and each has a quick fix.

## Triggers and publishing

| Symptom | Likely cause | Fix |
|---|---|---|
| Schedule never runs | Workflow not published | Publish it; check the button state |
| Runs at the wrong hour | Time zone | Set it in workflow settings or `GENERIC_TIMEZONE` |
| Webhook works in testing, not live | Unpublished, or app uses the test URL | Publish; give the app the production URL |
| Webhook returns 404 | Wrong path, method or URL type | Check method (GET/POST) and `/webhook/` vs `/webhook-test/` |
| Edits have no effect live | Changes still in draft | Publish again |
| "Published, partial" | A trigger couldn't activate | Hover to see which, fix its credential, republish |
| Telegram stops after testing | One webhook per bot | Publish again after testing |
| Polling trigger misses items | Poll interval or filters | Check **Poll Times** and the trigger's filters |
| Form shows an error after submit | Workflow failed with **Workflow Finishes** | Check Executions for the failed run |

## Data and expressions

| Symptom | Likely cause | Fix |
|---|---|---|
| Expression shows `undefined` | Wrong path or capitals | Drag the field in from the input panel |
| A node runs too many times | It received more items than expected | Check item counts; Aggregate or Limit first |
| Nodes after a step don't run | That step output zero items | Expected? If not, **Always Output Data** |
| "Referenced node is unexecuted" | Expression points at a node not on this path | Reference a node that ran, or use Merge |
| Paired item error | Item links broken | Use `.first()`/`.all()`, or fix the Code node |
| `[object Object]` in text | Inserted a whole object | Pick a field, or `JSON.stringify()` |
| Dates off by hours | Time zone or UTC strings | Set workflow time zone; use `.toDateTime()` |
| Merge outputs nothing | One input received no items | Check both branches ran |
| File missing in next node | Wrong binary property name | Look at the output's binary slot name |

## Credentials and APIs

| Symptom | Likely cause | Fix |
|---|---|---|
| 401 Unauthorized | Key wrong or OAuth token expired | Reconnect or replace the credential |
| 403 Forbidden | Missing permission or scope | Grant the scope; reconnect OAuth |
| 429 Too Many Requests | Rate limit | Batching, Loop Over Items + Wait, Retry On Fail |
| Google "access denied" | App in Testing mode | Add yourself as a test user |
| Google redirect mismatch | Wrong redirect URI | Paste n8n's exact OAuth Redirect URL |
| OAuth redirects to `localhost` | Public URL not set (self-hosted) | Set `N8N_EDITOR_BASE_URL`, `N8N_WEBHOOK_URL` |
| Notion "object not found" | Database not shared with integration | Add the integration to the database |
| "Credentials could not be decrypted" | Encryption key changed | Restore the original `N8N_ENCRYPTION_KEY` |

## AI

| Symptom | Likely cause | Fix |
|---|---|---|
| Agent won't use a tool | Vague tool name or description | Describe exactly when to use it |
| Agent invents facts | No grounding | Use RAG; "say you don't know" |
| Forgets earlier messages | No memory or session key changes | Attach memory; check the session key |
| Agent loops or stops early | Max Iterations | Clarify the task; adjust the limit |
| Output not in the format needed | Free text | Require Specific Output Format + parser |
| Knowledge base empty after restart | Simple Vector Store | Use a persistent vector store |
| Gateway nodes stop working | Credit balance is zero | Top up, or switch to your own key |

## Self-hosting

| Symptom | Likely cause | Fix |
|---|---|---|
| Site unreachable | DNS, firewall, or container down | `ping`, `ufw status`, `docker compose ps` |
| Certificate error | Port 80 closed or DNS wrong | Open 80; check `docker compose logs caddy` |
| n8n restarting in a loop | Database settings | `docker compose logs n8n`; check `.env` |
| Webhook URLs show `localhost` | `N8N_WEBHOOK_URL` not set | Set it and restart |
| Disk full | Execution data | Lower retention; prune; stop saving successes |
| Out of memory | Big files or huge item lists | Batches, sub-workflows, a bigger server |
| Lost data after update | Volume removed with `down -v` | Restore from backup; never use `-v` casually |
| Locked out by 2FA | Lost phone | Recovery codes, or `n8n mfa:disable --email=…` |

> [!TIP]
> Still stuck? Open the failed execution, find the *first* node whose output looks wrong, and ask on the forum with that node's input and error. Chapter 18 has the full routine.

