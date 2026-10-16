# Debugging Executions

When a workflow misbehaves, n8n has kept a detailed record of exactly what happened. Learning to read that record turns debugging from guesswork into a calm, methodical process.

:::summary In this chapter
- The Executions list and what to look for
- Reading a failed execution node by node
- Debug in editor and Copy to editor
- Retrying failed runs
- Custom execution data for searching
- A step-by-step debugging routine
:::

## The Executions list

Click the **Executions** tab of a workflow to see every saved run, or open **Overview › Executions** to see runs of all workflows you can access. Each row shows the status (**Succeeded**, **Error**, **Running**, **Waiting**, **Queued**), start time and duration. Filter by status or date to find the one you need.

> [!NOTE]
> Which runs appear depends on workflow settings (**Save failed / successful production executions**, **Save manual executions**) and on your plan's retention limits. On Cloud Starter, executions are kept for up to 7 days; on Pro, up to 30.

## Reading a failed execution

Click a failed execution. The canvas opens read-only with the run's data. Nodes that ran show a green tick, and the failing node is red. Click any node to see its input and output exactly as they were. Open the red node to read the error message: it usually says what went wrong, and often which field.

## Debug in editor

For a failed run, select **Debug in editor**; for a successful one, **Copy to editor**. n8n loads that run's data into your workflow and **pins** it on the first node. Now you can change the broken node, click **Execute workflow**, and re-run with the exact data that failed, without waiting for the real event to happen again. Remember to unpin afterwards.

> [!NOTE]
> Debug in editor is available on all Cloud plans and on self-hosted Registered Community, Business and Enterprise. Self-hosted users get it by registering for free.

## Retrying

From the Executions list you can **retry** a failed execution, either with the currently published workflow (after you've fixed it) or with the original version. Retries are a quick way to recover the items that failed during an outage.

## Custom execution data

You can tag executions with your own searchable data, such as an order number, then filter the Executions list by it. Use the **Execution Data** node, or in a Code node:

```javascript
$execution.customData.set('orderId', $json.id);
```

Custom execution data is available on Cloud Pro and Enterprise and self-hosted Registered Community and Enterprise.

## A debugging routine

:::steps When something's wrong
1. **Find the run.** Open Executions and click the failed or suspicious run.
2. **Find the first surprise.** Walk through nodes left to right. Check the item count and values in each output. The bug is usually at the first node whose output isn't what you expected, not at the red one.
3. **Read the error carefully.** Copy it into a search of the community forum if it's unclear.
4. **Load the data.** Use **Debug in editor** so you can experiment with real input.
5. **Fix one thing, then test.** Execute the step, check output, repeat.
6. **Publish the fix**, then retry the failed executions if needed.
:::

```prompt
My n8n workflow fails at the node "[node name]" with this error:
[paste the error]. The node's input looks like this: [paste the input JSON].
The node is configured like this: [describe the settings]. Explain in plain
English what's wrong and how to fix it.
```

## Decoding common error types

| Error says | Usually means |
|---|---|
| 401 Unauthorized | Credential wrong or expired: reconnect it |
| 403 Forbidden | The account lacks permission for this action |
| 404 Not Found | Wrong URL, ID or resource |
| 429 Too Many Requests | Slow down: batching, Wait, Retry On Fail |
| 500, 502, 503 | The other service had a problem: retry later |
| "Referenced node is unexecuted" | An expression points at a node that didn't run on this path |
| "JSON parameter needs to be valid JSON" | A body or field contains broken JSON: check quotes and commas |
| Workflow timed out | Took longer than the allowed time: split it up |

:::checklist
- I can find a run in the Executions list
- I can find the first node whose output looks wrong
- I've used Debug in editor to re-run with real data
- I know how to retry failed executions
:::

