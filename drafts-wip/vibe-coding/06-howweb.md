# How Web Apps Work

You can vibe code without knowing how the web works, but a little understanding goes a long way. When you know the names of the parts, you can tell the AI exactly where a problem is, and you'll spot risky decisions before they bite.

:::summary In this chapter
- The restaurant model: front end, back end, database
- What APIs, hosting, and domains really are
- What happens, step by step, when someone opens your app
- The tech words AI tools use, translated
- A guided tour of a typical project folder
:::

## The restaurant model

Think of a web app as a restaurant.

| Restaurant | Web app | What it does |
|---|---|---|
| Dining room, menu, waiter | **Front end** | What people see and click in their browser |
| Kitchen | **Back end** | Does the work out of sight: checks, calculations, emails |
| Pantry and recipe book | **Database** | Stores information so it's there tomorrow |
| Order slips between rooms | **API** | Structured messages between the parts |
| The building and its address | **Hosting** and **domain** | Where it all runs, and how people find it |

The **front end** runs in the visitor's browser, on their phone or computer. Anything in the front end can be seen and changed by a curious visitor, which is why secrets and important checks belong in the back end.

The **back end** runs on a **server**, a computer that is always on and connected to the internet. It stores data, checks passwords, takes payments, and talks to other services.

The **database** is organized storage, usually in **tables** (like spreadsheet tabs) made of **rows** (one record each, such as one plant) and **columns** (fields, such as "name" or "watering interval").

## APIs: how programs talk

An **API** (application programming interface) is a menu of requests one program accepts from another. Your front end asks your back end, "please save this plant." Your back end asks Stripe, "please charge this card," or asks an AI service, "please write a reply."

Requests and replies are usually written in **JSON**, a simple text format of labels and values:

```json title=plant.json
{
  "name": "Monstera",
  "water_every_days": 7,
  "last_watered": "2026-10-14"
}
```

When a service gives you an **API key**, it is a password that lets your app use that menu. Keys belong on the back end, never in front-end code.

## Hosting and domains

**Hosting** is renting space on an always-on computer so your app is reachable. Builders host for you when you click Publish. Services like Vercel, Netlify, and Cloudflare host apps from a GitHub repository.

A **domain** is a human-friendly address like `plantpal.app`. Behind the scenes, computers find each other by numeric addresses. **DNS** (the domain name system) is the internet's address book that turns your domain into your host's address. **HTTPS** is the padlock in the browser: it encrypts traffic, and every modern host sets it up for free.

## What happens when someone opens your app

:::steps The journey of one visit
1. **The visitor types your address.** Their browser asks DNS where `plantpal.app` lives.
2. **DNS answers.** It points to your host, for example Vercel.
3. **The host sends the front end.** HTML (structure), CSS (style), and JavaScript (behavior) arrive in the browser.
4. **The page asks for data.** The front end calls your back end's API: "show this person's plants."
5. **The back end checks who's asking.** It confirms the visitor is signed in and allowed to see the data.
6. **The database answers.** Only that person's rows come back.
7. **The page fills in.** The browser shows the list. Total time: usually under a second.
:::

Every bug lives somewhere on this journey. "The page is blank" is usually step 3. "My data doesn't show" is usually step 4, 5, or 6. Telling the AI which step seems broken speeds up every fix.

## Static sites and dynamic apps

- A **static site** is the same for every visitor: a portfolio, a menu, a brochure. It needs no back end and hosts almost anywhere for free.
- A **dynamic app** changes per visitor: accounts, saved data, payments. It needs a back end and a database.

Many modern back ends are **serverless functions** (Lovable and Supabase call them **edge functions**): small pieces of back-end code that run only when called. You don't manage a server; you pay little or nothing when nobody is using the app.

## Tech words, translated

AI tools will mention these constantly. You don't need to master them; just recognize them.

:::compact
| Word | What it is |
|---|---|
| **HTML** | The structure of a page: headings, paragraphs, buttons |
| **CSS** | The styling: colors, fonts, spacing, layout |
| **JavaScript** | The language that makes pages interactive |
| **TypeScript** | JavaScript with extra checks that catch mistakes early |
| **React** | A popular way to build interfaces from reusable pieces ("components") |
| **Next.js** | A React framework with built-in back-end features; v0's default |
| **Vite** | A fast tool for building React apps; common in Lovable and Bolt |
| **Tailwind CSS** | A styling approach using short class names like `text-lg` |
| **Node.js** | Lets JavaScript run on a computer or server, not just in browsers |
| **npm** | The tool that installs code libraries ("packages") for Node.js |
| **PostgreSQL** | A powerful, popular database; Supabase is built on it |
| **Expo / React Native** | Tools for building phone apps with React |
:::

## A tour of a project folder

Open the code view in any builder, or a project in an editor, and you'll see something like this:

```text title=project folder
plant-pal/
├── src/             your app's code (pages, components)
├── public/          images and icons served as-is
├── package.json     the project's name and list of libraries
├── node_modules/    installed libraries (never edit; can be huge)
├── .env             secret settings (must stay private)
├── .gitignore       files Git should never save
└── README.md        instructions for humans
```

The file `package.json` also lists **scripts**, short names for common commands. The most common is `npm run dev`, which starts your app on your own computer at an address like `http://localhost:5173`. **Localhost** means "this computer": only you can see it.

> [!TIP]
> Ask your builder: "Give me a guided tour of this project's folders, as if I'm new to coding. Which files would I change to edit the home page text?" You'll be surprised how quickly the structure makes sense.

:::checklist
- I can name the front end, back end, database, and API in my app
- I know why secrets and important checks belong on the back end
- I can describe which step of a visit seems broken
- I've looked inside my project's folder at least once
:::

