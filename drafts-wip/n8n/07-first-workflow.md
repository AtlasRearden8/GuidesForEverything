# Your First Workflow: A Morning Weather Email

Let's build a workflow that checks the weather every morning and emails you a summary. It uses a free weather service, Open-Meteo, that needs no account. Along the way you'll use a trigger, an HTTP request, an expression and an app node: the four skills behind almost every automation.

:::summary In this chapter
- Build a complete scheduled workflow, step by step
- Read data from a web service with HTTP Request
- Write your first expression
- Add a decision with the If node
- Publish it and check that it ran
:::

:::steps Build the weather workflow
1. **Create a workflow.** On the Overview page click **Create Workflow**. Name it "Morning weather".
2. **Add a Schedule Trigger.** Click **Add first step**, search **Schedule**, and choose **Schedule Trigger**. Set **Trigger Interval** to **Days** and **Trigger at Hour** to **7am**. Close the node.
3. **Add an HTTP Request node.** Click the **+** after the trigger, search **HTTP Request**, and paste this into **URL** (it's New York; change the latitude and longitude to your city):
   ```text
   https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&timezone=auto
   ```
   Click **Execute step**. The output shows today's forecast in a `daily` section.
4. **Add an Edit Fields (Set) node** to make a friendly message. Add a field named `message` and switch its value to **Expression** mode, then enter:
   ```text
   Today: high {{ $json.daily.temperature_2m_max[0] }}°F, low {{ $json.daily.temperature_2m_min[0] }}°F, {{ $json.daily.precipitation_probability_max[0] }}% chance of rain.
   ```
   Click **Execute step** and check the message reads correctly.
5. **Add a Gmail node** (or Outlook, or Send Email). Choose the **Send a message** operation. Under **Credential**, choose **Create new credential** and sign in with Google. Set **To** to your address, **Subject** to `Your morning weather`, and drag the `message` field from the input panel into **Message**.
6. **Test the whole thing.** Click **Execute workflow** and check your inbox.
7. **Publish.** Click **Publish** (top right). From tomorrow, it runs every morning at 7.
:::

Congratulations: you've built a real automation. Notice the pattern you'll use forever: **trigger → get data → reshape data → send it somewhere.**

> [!NOTE]
> The `[0]` in the expression means "the first entry in the list," which is today. `[1]` would be tomorrow.

## Finding your latitude and longitude

Open Google Maps or OpenStreetMap, right-click your town, and the coordinates appear (two numbers such as `51.51, -0.13` for London). The first is latitude, the second longitude. Prefer Celsius? Remove `&temperature_unit=fahrenheit` from the URL and change `°F` to `°C` in your message.

## What just happened, node by node

| Node | Input | Output |
|---|---|---|
| Schedule Trigger | Nothing: it starts the run | One item with the time it fired |
| HTTP Request | That item | One item: the forecast as JSON |
| Edit Fields | The forecast | One item with a `message` field |
| Gmail | The message | One item describing the sent email |

Each node received exactly one item, so each ran once. Open each node after an execution to see these panels for yourself.

## Add a decision

Make it smarter: only send an umbrella warning if rain is likely.

:::steps Add an If node
1. **Insert an If node** between Edit Fields and Gmail. Hover over the connecting line and click **+**.
2. **Set the condition.** Value 1: drag in `precipitation_probability_max` (or use the expression `{{ $('HTTP Request').item.json.daily.precipitation_probability_max[0] }}`). Operation: **Number › is greater than**. Value 2: `50`.
3. **Connect the outputs.** Connect the **true** output to your Gmail node with the subject "☔ Take an umbrella!", and add a second Gmail node on **false** for normal days, or leave false empty to send nothing.
:::

The expression in step 2 uses `$('HTTP Request')`, which means "the output of the node called HTTP Request." That's how you reach back past the previous node to any earlier one. If you rename that node, n8n updates expressions that refer to it.

## Check that it really ran

The morning after you publish, open the workflow and click the **Executions** tab. You should see one run at 7:00 with a green **Succeeded** status. Click it to replay exactly what happened. If it's red, click the failed node to read the error, and see Chapter 18.

> [!TIP]
> Don't want to wait until tomorrow? Temporarily set the schedule to **Minutes** with **Minutes Between Triggers** set to `2`, publish, watch two runs appear in Executions, then set it back to 7am and publish again.

## Make it yours

Try one of these changes on your own. Each takes under five minutes:

:::cols
- Send to Slack or Telegram instead of email
- Add tomorrow's forecast with `[1]`
- Run only on weekdays (Weeks interval)
- Add the city name to the subject
- Send a different message if it will be hot
- Log each forecast to Google Sheets
:::

:::checklist
- My workflow ran successfully with **Execute workflow**
- I understand what `$json` and `[0]` mean
- I added an If node with true and false paths
- I published it and saw a production run in Executions
:::

