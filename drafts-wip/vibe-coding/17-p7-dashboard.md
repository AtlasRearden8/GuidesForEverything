# Project 7: An Internal Tool or Dashboard

**Internal tools** are apps used inside a business or club rather than by the public: an inventory tracker, a booking board, a sales dashboard. They are where vibe coding saves the most time, because they replace messy spreadsheets. This project builds an order dashboard in **Base44**, which wires up data, logins, and permissions for you. Replit and Lovable work well too.

:::summary In this project
- Turn a spreadsheet into an app with real data
- Build charts and summary numbers
- Give different people different permissions
- Test safely with a separate test database
:::

| | |
|---|---|
| **Time** | 2–4 hours |
| **Cost** | Free plan to try; a paid plan for daily team use |
| **Tools** | Base44 (or Replit, Lovable) |
| **You'll learn** | Importing data, roles, permissions, charts |

## Step 1: Start from your real spreadsheet

Export your current sheet as a **CSV** file (in Google Sheets, [[File > Download > Comma-separated values]]; in Excel, **Save As** and choose CSV). Remove anything sensitive you don't need, like personal phone numbers.

## Step 2: Describe the tool

```prompt
Build an internal "Order Desk" for my bakery. I'll upload a CSV of
orders with columns: date, customer, item, quantity, price, status
(new, baking, ready, collected).
Pages:
1. Dashboard: today's orders count, this week's revenue, a chart of
   revenue per day for 30 days, and orders by status.
2. Orders: a searchable, filterable table; click a row to edit status.
3. New order form.
Use plan mode first and show me the data structure before building.
```

Review the proposed tables. Check the types: money as numbers, dates as dates. Then let it build and import your CSV.

## Step 3: Roles and permissions

Decide who can do what before inviting anyone:

| Role | Can see | Can change |
|---|---|---|
| **Owner** (you) | Everything, including revenue | Everything |
| **Staff** | Orders | Order status, new orders |
| **Viewer** | Today's orders only | Nothing |

```prompt
Add roles: owner, staff, viewer, with these permissions: [paste table].
Enforce them on the back end, not just by hiding buttons. Only
invited people with company email addresses can sign in.
```

Base44 lets you review **data permissions** in plain English in its settings; read them after the AI changes anything. Then run its **security scan**.

## Step 4: Test without risking real data

Base44 can use a **separate test database**, so experiments don't touch live orders. Turn it on while building, and switch back when you're confident. In other tools, ask the AI to "seed some fake test data" and to keep a backup export of the real data.

:::steps Test as each role
1. **Invite a second email of yours** as staff. Sign in from a private window.
2. **Check the dashboard revenue is hidden** for staff.
3. **Change an order's status.** It should work.
4. **Try deleting an order.** It should be refused.
:::

## Step 5: Make it useful daily

- "Add a 'mark ready' button that emails the customer." (See the email section of the "Logins, Payments, and Email" chapter.)
- "Every morning at 7am, email me yesterday's summary."
- "Add an export to CSV button on the Orders page."

| Problem | Fix |
|---|---|
| Imported numbers are wrong | Currency symbols or commas in the CSV; ask the AI to clean them on import |
| Charts are empty | Dates imported as text; ask it to convert the date column |
| Staff can see revenue | Permission enforced only in the page; insist on back-end rules |
| Team can't sign in | Check invitations and allowed email domains |

:::checklist
- Real data imported and checked against the spreadsheet
- Roles enforced on the back end, tested from each role
- Security scan run, critical issues fixed
- A backup export of the data saved
:::

