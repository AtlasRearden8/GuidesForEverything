# Recipes for Work and Teams

These builds suit small businesses, clubs, and teams. Each one is a starting point; adapt the property names to how your group talks.

:::summary In this chapter
- A simple CRM
- A content calendar
- A team wiki
- A meeting notes system
- A shared request queue
:::

## Recipe 6: a simple CRM

A **CRM** (customer relationship manager) tracks the people and companies you work with, and your conversations with them.

:::steps Build a CRM
1. **Create three databases:** Companies, Contacts, and Interactions.
2. **Companies:** Industry (Select), Website (URL), Owner (Person), Status (Status: Lead, Active, Past).
3. **Contacts:** Company (Relation to Companies, two-way), Email, Phone, Role (Text), Last contacted (Rollup, below).
4. **Interactions:** Date, Type (Select: Call, Email, Meeting), Contact (Relation to Contacts, two-way), Notes in the page body.
5. **In Contacts, add a rollup "Last contacted":** relation *Interactions*, property *Date*, calculate **Latest date**.
6. **Add a "Going cold" view** of Contacts: Last contacted is before *one month ago*.
7. **Add a Deals board** if you sell: a Deals database with Value (Number), Stage (Status), Company (Relation), and a chart of value by stage.
:::

## Recipe 7: a content calendar

:::steps Build a content calendar
1. **Create a database "Content".** Properties: Status (Status: Idea, Drafting, Editing, Scheduled, Published), Publish date (Date), Channel (Multi-select: Blog, Newsletter, Instagram, LinkedIn), Author (Person), Link (URL).
2. **Add a Calendar view** by Publish date.
3. **Add a Board** grouped by Status.
4. **Add an "Ideas" list:** Status is Idea, sorted by Created time.
5. **Make a template** with a brief: Goal, Audience, Key points, Call to action.
6. **Automation (paid):** when Status is set to Editing, notify the editor.
:::

```prompt
Look at the Content database and suggest four blog post ideas for next
month that fill the gaps in our calendar. Add each as an Idea.
```

## Recipe 8: a team wiki

A **wiki** is a shared library of how-to pages that everyone can read and improve.

:::steps Build a wiki
1. **Create a teamspace** (or a top-level page) called "Wiki".
2. **Create a database "Docs"** with: Category (Select: Onboarding, Policies, How-to, Tools), Owner (Person), Last reviewed (Date), Last edited time.
3. **Add a List view** grouped by Category as the wiki's front page.
4. **Add a "Needs review" view:** Last reviewed is before six months ago.
5. **Make a doc template** with sections: Purpose, Steps, Who to ask.
6. **Use synced blocks** for content that appears on many pages, such as support contacts.
7. **On Business plans, verify pages:** mark trusted pages as **verified** so they show a badge in search and AI answers.
:::

> [!TIP]
> Put a short "Start here" page at the top of the wiki that links the five pages a new person needs first.

## Recipe 9: a meeting notes system

:::steps Build meeting notes
1. **Create a database "Meetings".** Properties: Date, Type (Select: 1:1, Team, Client), Attendees (Person), Project (Relation to Projects).
2. **Make a template per type**, each with Agenda, Notes, Decisions, and Action items (to-dos).
3. **On Business plans, add AI Meeting Notes:** type `/meet` in the template body so each meeting can be transcribed and summarized (Chapter 17).
4. **Add views:** a Calendar by Date, and "This week" filtered by Date.
5. **Make a weekly 1:1 template repeat** every week.
6. **After each meeting,** turn action items into tasks with Notion AI.
:::

```prompt
Read this meeting page and add every action item to my Tasks database,
with the right assignee, a due date if one was mentioned, and a link back
to this meeting.
```

## Recipe 10: a shared request queue

:::steps Build a request queue
1. **Create a database "Requests"** with Status, Requester (Created by), Priority (Select), Assigned to (Person), and an ID property with the prefix `REQ`.
2. **Add a Form view** (Chapter 19) with questions for the title, details, and priority.
3. **Share the form** with your workspace or the web.
4. **Add a Board** for the team, grouped by Status.
5. **Automation:** when a page is added, notify the team or post in Slack.
:::

## Recipe 11: the project tracker

Recipe 11 is the Projects + Tasks system from Chapter 12. Link it to Meetings and Docs with relations, and you have the core of a small company's workspace.

:::checklist
- I built one work recipe and shared it with one other person
- I added a template so every new item starts the same way
- I tried an AI prompt on the system I built
:::

