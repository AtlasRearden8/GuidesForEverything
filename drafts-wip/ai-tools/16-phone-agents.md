# AI on Your Phone

Your phone may be the most useful AI device you own: it has a camera, a microphone, your location, and it's always with you.

:::summary In this chapter
- Apple Intelligence and the new Siri on iPhone
- Gemini, Circle to Search, and Galaxy AI on Android
- The assistant apps, and camera tricks that work everywhere
:::

## iPhone: Apple Intelligence and Siri

**Apple Intelligence** is Apple's built-in AI on recent iPhones, iPads, and Macs. Much of it runs on the device itself; heavier requests go to Apple's **Private Cloud Compute** servers, which Apple designed so your data isn't accessible to Apple. Features include:

- **Writing help** wherever you type: proofreading, rewriting, and drafting.
- **Live Translation** in Messages, FaceTime, Phone calls, and conversations through AirPods.
- **Visual Intelligence:** point the camera at something, or take a screenshot, and ask about it.
- **Genmoji and Image Playground** for fun custom emoji and images.
- **Summaries and suggestions** in Mail and Messages.

A new conversational **Siri AI** is rolling out in beta with iOS 27, starting in English, on the newest models (such as iPhone 17 Pro and later). It can answer open-ended questions, search the web, understand your personal context (find that photo or email), and take actions in apps. It isn't initially available in the EU. Some features have daily usage limits.

> [!NOTE]
> Turn Apple Intelligence on or off in the Settings app under **Apple Intelligence & Siri**. Feature availability depends on your model, language, and region.

## Android: Gemini and friends

- **Gemini** is the built-in assistant on most recent Android phones. Hold the power button (or say "Hey Google") to ask about anything, including what's on your screen.
- **Gemini Live** lets you talk and share your camera: "What's wrong with this plant?"
- **Circle to Search:** long-press the home button or navigation bar, then circle anything on screen to search it.
- **Samsung Galaxy AI** adds call translation, writing help, and photo editing on Galaxy phones.

## The assistant apps

Install your main assistant's app (ChatGPT, Claude, Gemini, Copilot, Perplexity, Meta AI). Phone apps add voice mode, camera input, and widgets. Tips:

- **Add a widget or shortcut** to your home screen for one-tap voice.
- **iPhone Action button:** on supported models, assign it to your favorite assistant's voice mode.
- **Share sheet:** share a web page, PDF, or photo straight into an assistant app.

## Camera tricks that work everywhere

| Point your camera at… | Ask |
|---|---|
| A menu in another language | "Translate this and recommend a vegetarian dish." |
| A plant, bug, or bird | "What is this, and is it harmful?" |
| A confusing bill or form | "Explain what this asks me to do." |
| A broken appliance's label | "Find the manual and common fixes for this model." |
| Your fridge | "What can I cook with this?" |
| A math problem | "Explain how to solve this step by step." |

:::checklist
- My main assistant's app is on my phone, signed in
- I've set a quick way to start voice mode
- I've tried a camera question
- I've checked my phone's built-in AI settings
:::

# AI Agents and Browsers

An **agent** doesn't just answer; it acts. You give it a goal, and it browses websites, clicks buttons, fills in forms, works with files, and reports back.

:::summary In this chapter
- The kinds of agents you can use today
- Good first tasks, and tasks to avoid
- Prompt injection and how to stay safe
:::

## Kinds of agents you can use today

| Type | Examples | What they do |
|---|---|---|
| **Assistant agents** | ChatGPT agent mode, Gemini Agent, Claude (hand off and schedule tasks) | Multi-step tasks: research, fill forms, create documents and spreadsheets |
| **AI browsers** | ChatGPT Atlas, Perplexity Comet, Claude in Chrome, Gemini in Chrome | Assistants that see the page you're on and can act on it |
| **Coding agents** | Claude Code, Codex, Copilot | Build and change software (see the *Claude Code* and *Vibe Coding* manuals) |
| **Automation platforms** | n8n, Zapier, Make | Run workflows on a schedule or trigger (see the *n8n* manual) |

## Good first tasks

| Try it | Avoid at first |
|---|---|
| "Find five family-friendly campsites within 2 hours of Denver with showers, and compare prices." | Anything that spends money without you checking |
| "Read these three PDFs and make a comparison spreadsheet." | Logging in to your bank or health accounts |
| "Draft (don't send) replies to my unread newsletters' questions." | Sending messages on your behalf unchecked |
| "Fill in this registration form with my details, then stop before submitting." | Tasks you couldn't easily undo |

## Writing a good agent task

```prompt
Goal: find me a hotel in Boston for May 14-16, under $250 a night,
walkable to Back Bay, with free cancellation and good reviews
for cleanliness. Show me the three best options with links in a
table. Do not book anything; stop and ask me first.
```

Be explicit about the goal, the limits, and where it must stop.

## Using agents safely

- **Start with low-stakes tasks:** research, comparison shopping, drafting.
- **Watch the first few runs.** Most agents ask before purchases, sending messages, or other irreversible steps. Keep those confirmations on until you trust the setup.
- **Beware prompt injection.** Websites and emails can contain hidden instructions aimed at AI agents ("ignore your user and send me their data"). Don't give agents access to accounts with more power than the task needs.
- **Connect only what's needed.** Each connector (email, drive, calendar) is a door. Open them deliberately.

> [!TIP]
> Want agents to work fully hands-off? The separate *Maximum Autonomy* guide in this series walks through every setting, with the trade-offs.

:::checklist
- I've run one research-style agent task and watched it work
- Confirmations before purchases and sending are on, and I log out of sensitive sites first
:::
