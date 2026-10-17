# Organizations and Teams

When a project belongs to a group (a business, a club, a class) rather than one person, use an **organization**: a shared account that owns repositories, with members who sign in with their own personal accounts. Nobody has to share a password, and when someone leaves you simply remove them.

:::summary In this chapter
- Personal accounts versus organizations
- Creating an organization and inviting people
- Organization roles and repository roles
- Teams
- Good habits for small organizations
:::

## Why use an organization?

| Personal account repositories | Organization repositories |
|---|---|
| Owned by one person | Owned by the group |
| Collaborators get broad write access | Fine-grained roles per person or team |
| Leave if the owner leaves | Stay when people come and go |
| Simple | Teams, policies, and shared billing |

Organizations are free on GitHub Free, with limited features for private repositories; GitHub Team adds the full feature set (see Plans and Pricing).

## Create an organization

:::steps Start an organization
1. **Open settings.** Profile picture, then **Settings**, then **Organizations** in the "Access" section.
2. **Click New organization** and pick a plan (Free is fine to start).
3. **Name it.** The name becomes github.com/*name*.
4. **Invite members** by username or email. They accept from an email or their GitHub notifications.
5. **Move existing repositories in** if you like: in a repository's [[Settings > General]], **Danger Zone**, **Transfer**.
:::

> [!TIP]
> Make at least two trusted people **owners**, so the organization isn't stranded if one person loses access.

## Organization roles

| Role | Can |
|---|---|
| **Owner** | Everything, including billing and deleting the organization |
| **Member** | Join teams, create repositories (if allowed), and work on what they're given |
| **Moderator** | Block people and manage comments, on top of member access |
| **Billing manager** | Manage payment, without access to code |
| **Security manager** | View and manage security alerts across the organization |
| **Outside collaborator** | Not a member, but invited to specific repositories |

## Repository roles

For each repository, give people or teams one of five roles:

| Role | Recommended for |
|---|---|
| **Read** | People who only need to view or discuss |
| **Triage** | Managing issues and pull requests without writing code |
| **Write** | Contributors who push to the project |
| **Maintain** | Project managers who manage the repository without destructive powers |
| **Admin** | Full control, including security settings and deletion |

Start everyone at the lowest role that lets them do their job.

## Teams

A **team** is a group of members, such as `design` or `kitchen-staff`. Create teams on the organization's **Teams** tab, then give a team a role on repositories in one step. Teams can be **mentioned** (`@bakery-co/design`) to notify everyone, used in `CODEOWNERS` files, and requested as reviewers. Teams can also be nested, so `staff` might contain `design` and `kitchen`.

## Habits for small organizations

:::checklist
- Two or more owners, all with 2FA (you can require it in the organization's security settings)
- Access given through teams, not one person at a time
- Base permission for members set to Read or None
- Outside collaborators reviewed regularly
- Rulesets protecting `main` in important repositories
:::
