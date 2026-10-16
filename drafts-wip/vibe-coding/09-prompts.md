# Prompts That Work

A **prompt** is the message you type to the AI. You don't need magic words, but a few patterns make a dramatic difference. This chapter collects the ones that work across every tool.

:::summary In this chapter
- The four questions every good prompt answers
- Copy-paste templates for common jobs
- Specs, screenshots, and "make it look like this"
- How to give feedback that the AI can act on
- A personal prompt library
:::

## The anatomy of a great prompt

A strong prompt answers four questions:

1. **What** do you want? ("Add a search box above the plant list.")
2. **Why?** ("I have 30 plants and scrolling is slow.")
3. **How should it behave?** ("Filter as I type; ignore capital letters.")
4. **How will you know it's right?** ("Typing 'fern' shows only my two ferns.")

```prompt
Add a search box above the plant list. I have 30 plants and
scrolling is slow. Filter the list as I type, ignoring capital
letters. Typing "fern" should show only plants with fern in the name.
Don't change anything else on the page.
```

That last line, "don't change anything else," saves a surprising amount of grief.

## Prompt templates

#### Starting an app

```prompt
Build [app] for [who]. They need to [main job 1], [main job 2],
and [main job 3]. Style: [3 adjectives], similar in feel to [an app
you like]. Phone-friendly. Start with just [first slice].
```

#### Adding a feature

```prompt
Add [feature] to [page]. When the user [action], it should [result].
Keep the current design. Don't change other features.
```

#### Fixing a bug

```prompt
Bug: when I [steps to reproduce], I expected [what should happen]
but instead [what actually happens]. Here's the error message: [paste].
Find the cause, explain it in one sentence, then fix it.
```

#### Improving design

```prompt
Make the [page] feel more [premium / playful / calm]. Improve spacing,
typography, and contrast. Keep all content and functionality the same.
```

#### Understanding what was built

```prompt
Explain how this app is organized, as if I'm new to coding.
What are the main files, and what does each one do?
```

## Specs: say exactly what "done" means

For anything bigger than a tweak, write a mini **spec** (specification): a short, structured description of behavior. Specs are where most of the quality in vibe coding comes from.

```prompt
Feature: weekly summary email.
- Who: every signed-in user who has at least one plant.
- When: Mondays at 8am in the user's time zone.
- Contains: plants due this week, with photos; a link to the app.
- Not included: plants the user archived.
- Edge cases: users with no plants get no email; an unsubscribe
  link turns the email off.
- Done when: I can trigger a test send to myself and see it arrive.
Plan this first. Tell me which email service you'd use and why.
```

> [!TIP]
> The **edge cases** line is the most valuable one. An edge case is an unusual situation: an empty list, a very long name, two people editing at once, no internet. Ask the AI: "What edge cases should this feature handle?" before you build.

## Use pictures

Screenshots communicate more than paragraphs. Most tools accept images: paste a screenshot of a bug, a sketch on paper, or a website whose style you admire.

- **For bugs:** screenshot the problem and circle it (any phone photo editor works).
- **For layouts:** sketch boxes on paper, photograph it, and say "build this layout."
- **For style:** screenshot two or three sites you like.

```prompt
Here's a screenshot of a site I like. Match its spacing, font sizes,
and overall calm feel for my home page, but keep my green colors and
my own content. Don't copy their text, logo, or images.
```

> [!WARNING]
> "Make it look like" means borrowing a *feel*, not copying. Never copy another company's logo, text, photos, or distinctive branding. Besides being unfair, it can break copyright and trademark law.

## A vocabulary for design

If you can name it, the AI can build it. A few useful words:

:::compact
| Say this | To get |
|---|---|
| **More white space** | Calmer, less crowded layouts |
| **Larger type scale** | Bigger headings relative to body text |
| **Higher contrast** | Text that's easier to read |
| **Card layout** | Items in tidy boxes with rounded corners |
| **Sticky header** | A top bar that stays while you scroll |
| **Hero section** | The big first section of a landing page |
| **Empty state** | What a page shows when there's no data yet |
| **Loading state** | What shows while data is on its way |
| **Mobile-first** | Designed for phones, then stretched for desktop |
:::

## Giving feedback the AI can act on

Vague feedback ("it's not right") leads to random changes. Use **see / expect / where**:

```prompt
On the Today page (where), the "Watered" button is grey and tiny
(see). It should be a large green button the full width of the
card, easy to tap with a thumb (expect).
```

When the AI gets it partly right, say what to *keep* as well as what to change: "The new colors are perfect. Keep them. Only fix the button size."

## Ask for options before decisions

```prompt
I want users to be able to pay for a premium plan.
Give me three ways to do this, with pros and cons, before building anything.
```

## Let the AI write the prompt

When you're unsure how to ask, ask the AI to help:

```prompt
I want to add a way for users to share a plant with a friend.
Before building, ask me up to five questions to clarify what I
want, then write a clear spec for my approval.
```

## Build your own prompt library

Keep a note of prompts that worked well for you. Over time, you'll collect a personal toolkit: your best "fix this bug" wording, your favorite design prompt, your security check. The Quick Reference at the end of this manual is a starting point.

:::checklist
- My prompts say what, why, how it behaves, and how I'll know
- I write a mini spec, with edge cases, for bigger features
- I use screenshots for bugs and style
- I give feedback as see / expect / where
- I've started a prompt library
:::

