# Custom Agents and Notion Credits

**Custom Agents** are AI teammates that run on their own: on a schedule, or when something happens. You set them up once, and they keep doing a job, such as writing a weekly report or sorting incoming requests, in the background.

:::summary In this chapter
- Notion Agent vs Custom Agents
- Building your first Custom Agent
- Triggers, access, and models
- Safety: permissions, logs, and reviews
- Notion credits: what they cost and how to track them
- Claude agents in Notion (beta)
:::

## Notion Agent vs Custom Agents

| | Notion Agent | Custom Agent |
|---|---|---|
| **Starts when** | You ask in chat | A schedule, an event, or a mention |
| **Sees** | Everything you can see | Only what you grant it |
| **Good for** | One-off tasks | Recurring jobs |
| **Plan** | Business, Enterprise | Business, Enterprise, plus credits |

## Build your first Custom Agent

:::steps Create an agent
1. **Go to Agents** in the sidebar and click **+** (you'll need the desktop or web app).
2. **Choose how to start:** describe the job in an **AI chat**, pick a **template**, or **Create blank**.
3. **Review the draft** instructions, triggers, and access that Notion suggests. Edit until they match what you want.
4. **Test it** in the agent's chat: ask it to do a one-off run and watch what it does.
5. **Save and publish.** From now on it runs whenever its triggers fire.
:::

Write instructions like a brief for a new colleague: the job, the outcome you want, the steps, and an example of good output.

```prompt
Every Friday at 3pm, read all pages in the Projects database that were
edited this week. Write a status update with one section per project:
what changed, risks, and next steps. Post it as a new page in the
Weekly updates database and keep it under 400 words.
```

## Triggers

| Trigger type | Examples |
|---|---|
| **Recurring schedule** | Every day at 9:00, every Monday, monthly, with a timezone |
| **Notion events** | A page is added to a database, a property is updated, a comment is added, a page is removed, an AI Meeting Note finishes |
| **Slack events** | A message in a channel, an emoji reaction, the agent is @-mentioned |

You can add filters, such as "only when Status is New" or "only messages containing *bug*". Slack triggers need a Slack admin to connect Slack to Notion first.

## Access and tools

An agent only touches what you give it. In **Settings › Tools and access**:

- **Add specific pages and databases**, such as "Support tickets".
- **Web access:** switch on if the job needs the internet; keep it off for internal work.
- **Slack:** pick exactly which channels it can read and post in.
- **MCP connections:** link other apps.
- **Other agents:** let it hand parts of a job to other Custom Agents.

> [!NOTE]
> Linking a page inside the instructions doesn't grant access to it. Add it under Tools and access.

## Models

Leave the model on **Auto** to start. You can pick a stronger model for planning and checking, and lighter, faster models for simple jobs. Premium models cost more credits.

## Safety by design

- **Permission levels:** **Full access** (configure everything and see logs), **Can edit** (change instructions), **Can view and interact** (run and chat with it).
- **Activity log:** every run is recorded: what triggered it, what it did, and any errors.
- **Version history:** restore an earlier setup if a change goes wrong.
- **Enterprise audit log:** configuration changes are recorded for admins.

> [!TIP]
> Give agents narrow, specific jobs and limited access ("only the Support database and the #help channel"). Review their logs for the first week before trusting them fully.

## Notion credits

**Notion credits** are a paid add-on for Business and Enterprise plans. They're shared across the workspace and pay for Custom Agents, Workers (custom code), premium AI models, and AI use beyond your plan's allowance.

| Type | Price | How it works |
|---|---|---|
| **Monthly credits** | $10 per 1,000 credits | Billed monthly; reset each month; unused credits don't carry over |
| **Annual credits** | $13 per 1,000 credits | Paid upfront; use any time in the year; expire at renewal |

Admins buy credits and watch usage in the **Notion credits dashboard**, and can set a credit limit for each person. Longer jobs, more reading, and premium models use more credits. Custom Agents are free to try before you need credits.

> [!WARNING]
> Sub-agents and hand-offs also spend credits. Check each agent's **Activity** and **Insights** tabs after testing to see what a run really costs.

## Claude agents in Notion (beta)

On Business and Enterprise, some workspaces can add **Claude agents**: agents from Anthropic that you chat with and assign work to inside Notion. Create one from **Agents › New Agent › Claude**. They're paid with Notion credits (no Anthropic account needed), see only what you share with them, and can't browse the web. They're off by default on Enterprise and HIPAA workspaces; owners switch them on under [[Settings > Notion AI]].

## Agent ideas

| Agent | Trigger | Job |
|---|---|---|
| Request triage | Page added to Requests | Set priority, assign an owner, reply with next steps |
| Weekly report | Every Friday | Summarize project changes |
| Q&A helper | Mentioned in #help | Answer from the wiki, with links |
| Meeting follow-up | AI Meeting Note finished | Create tasks from action items |
| Wiki gardener | Monthly | List docs not reviewed in six months |

:::checklist
- I know the difference between Notion Agent and Custom Agents
- I drafted instructions for one recurring job
- I limited the agent's access to the pages it needs
- I know how credits are priced and where usage is shown
:::

