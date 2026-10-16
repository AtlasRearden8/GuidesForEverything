# Project 5: A Simple Mobile App

Phone apps feel like a big step up, but modern tools make a simple one surprisingly approachable. You'll build a habit tracker with **Expo**, a free toolkit for making iPhone and Android apps with React Native, and test it on your own phone with the **Expo Go** app.

:::summary In this project
- Two routes: a browser builder (Bolt or Replit) or an agent on your computer
- Build a habit tracker that stores data on the phone
- Test it on a real phone with Expo Go
- What it takes to publish to the App Store and Google Play
:::

| | |
|---|---|
| **Time** | 2–3 hours |
| **Cost** | Free to build and test; store accounts cost extra |
| **Tools** | Bolt or Replit, or Claude Code/Codex/Cursor with Node.js |
| **You'll learn** | Mobile screens, on-device storage, testing on a phone |

## Route A: In a browser builder

Bolt and Replit both build Expo apps from a prompt and show a QR code you scan with Expo Go. This is the easiest route: nothing to install on your computer.

## Route B: With an agent on your computer

You'll need **Node.js** installed (from nodejs.org; choose the LTS version). Then, in a terminal, create a starter project and start it:

```bash
npx create-expo-app@latest habit-hero
cd habit-hero
npx expo start
```

A QR code appears in the terminal. Open your agent in the `habit-hero` folder for the building steps below.

## Step 1: Install Expo Go on your phone

Install **Expo Go** from the App Store or Google Play. On an iPhone, sign in to Expo Go with the same Expo account you use on your computer (run `npx expo login` there), or the app may refuse to open your project.

## Step 2: Describe the app

```prompt
Build a mobile habit tracker called "Habit Hero" with Expo.
Screens:
1. Today: a list of my habits with a big tap-to-complete circle each.
2. Add habit: name, emoji, and which days of the week.
3. Stats: current streak and a 30-day grid per habit.
Store data on the device so it survives closing the app.
Large tap targets, friendly colors, works in light and dark mode.
Start with the Today screen using sample habits.
```

## Step 3: Test on your phone

Scan the QR code: with the Camera app on iPhone, or inside Expo Go on Android. The app opens on your phone, and it updates automatically when files change.

> [!TIP]
> If the QR code won't connect (common on office or café Wi-Fi), stop the server and run `npx expo start --tunnel`, then scan the new code.

## Step 4: Build the rest in slices

1. "Make the Add habit screen work and save to the device."
2. "Calculate streaks correctly, counting only scheduled days."
3. "Add the Stats screen with the 30-day grid."
4. "Add a daily reminder notification at a time I choose."

Test each slice on the phone itself: tap with your thumb, rotate the screen, close and reopen the app.

## Step 5: Publishing (when you're ready)

Testing with Expo Go is free and enough for personal use. Putting an app in the stores is a bigger step:

| Store | Account cost | What to expect |
|---|---|---|
| Apple App Store | $99 a year (Apple Developer Program) | Review against Apple's guidelines; screenshots, privacy details |
| Google Play | $25 one-time | Identity checks; testing requirements for new accounts |

Replit can build, sign, and upload iOS apps for you, and Bolt has an Expo publishing guide. With your own project, ask your agent to walk you through Expo's build service.

> [!NOTE]
> Expo Go supports a specific Expo SDK version. If it says your project is incompatible, ask the AI: "Make this project use the Expo SDK version my Expo Go app supports."

| Problem | Fix |
|---|---|
| QR code scans but nothing loads | Same Wi-Fi for phone and computer, or use `--tunnel` |
| Data disappears on restart | Ask it to use on-device storage (such as AsyncStorage) |
| Red error screen on the phone | Photograph or copy the message and paste it to the AI |
| Looks wrong on notch phones | "Respect safe areas on all screens" |

:::checklist
- App runs on my own phone through Expo Go
- Data survives closing and reopening the app
- Tested with my thumb, in light and dark mode
- Code committed to Git
:::

