# Prompting That Works Everywhere

The same habits get great results from every AI tool, whether it writes text, images, or code. You don't need special tricks or magic words. You need to explain what you want the way you would to a smart new colleague who knows nothing about your situation.

:::summary In this chapter
- The five ingredients of a strong prompt
- Before-and-after examples
- Follow-up phrases that fix almost any answer
- Common mistakes, and a reusable prompt template
:::

## The five ingredients

A strong prompt usually contains some of these:

1. **Role**: who the AI should act as. *"You're an experienced small-business accountant."*
2. **Context**: the situation and background. *"I'm a freelance designer in Ohio with irregular income."*
3. **Task**: exactly what you want. *"Draft a simple monthly budget."*
4. **Format**: how the answer should look. *"A table with categories, amounts, and notes. Under 200 words."*
5. **Examples or constraints**: what good looks like, and what to avoid. *"Assume $4,000 average monthly income. No jargon."*

```prompt
You're an experienced small-business accountant. I'm a freelance
designer in Ohio with irregular income (about $4,000/month on average).
Draft a simple monthly budget as a table with categories, amounts,
and notes, including a line for quarterly taxes. Under 200 words,
no jargon.
```

> [!TIP]
> Context is the ingredient beginners skip most, and it matters most. The AI can't see your life. Two extra sentences about your situation usually beat any clever wording.

## Before and after

| Vague prompt | Better prompt |
|---|---|
| "Write a birthday message." | "Write a warm, funny birthday message for my sister Ana, turning 40. She loves gardening and bad puns. Two sentences, for a card." |
| "Plan a trip to Italy." | "Plan 7 days in Italy for two adults in late May, flying into Rome. We like food and history, not nightlife. Moderate budget, trains only. Day-by-day table." |
| "Help with my résumé." | "Here's my résumé and a job ad. List the five most important gaps between them, then rewrite my summary section to fit this job. Don't invent experience." |
| "Explain inflation." | "Explain inflation to a 15-year-old using a pizza example, in under 150 words, then give one question to check they understood." |

## Habits of great prompters

- **Have a conversation.** The first answer is a draft. Say what to change: "shorter," "friendlier," "more specific to bakeries."
- **Ask it to ask you questions.** *"Before you write the plan, ask me up to five questions."*
- **Give examples.** Paste a past email you liked and say "in this style." Showing one or two examples of what you want is called **few-shot prompting**, and it works remarkably well.
- **Ask for options, then choose.** *"Give me five subject lines, ranked."*
- **Request reasoning for hard problems.** Turn on a thinking or reasoning mode, or say "think it through step by step."
- **Ask it to check itself.** *"Review your answer for errors and anything you're unsure about."*
- **Start fresh when it goes off track.** A new chat with a clear prompt beats ten corrections.

## Follow-up phrases that fix almost anything

| If the answer is… | Say |
|---|---|
| Too long | "Cut this to half the length. Keep only what matters most." |
| Too generic | "Make this specific to my situation: [details]." |
| Too formal or stiff | "Rewrite this the way a friendly person would say it out loud." |
| Missing something | "What did you leave out? Add the most important missing point." |
| Possibly wrong | "Which parts of this are you least sure about? Search and check them." |
| Hard to scan | "Turn this into a table" or "Use short bullet points." |
| Not quite right | "Give me three different versions so I can pick." |
| Good, but one part is off | "Keep everything except paragraph 2. Rewrite that to…" |

## Working with files and images

When you attach a document, photo, or screenshot, tell the AI what it is and what you want from it:

```prompt
This is a photo of a letter from my insurance company. Explain
in plain English what it's asking me to do, by when, and what
happens if I don't. Then list any phone numbers or reference
numbers in it.
```

- **Point to the part you mean.** "Look at the table on page 4."
- **Ask for quotes.** "Quote the exact sentences you're relying on." This makes it easy to check the answer and reduces made-up details.
- **Screenshots work.** Stuck on a confusing website or error message? Take a screenshot and ask, "What should I click next?"

## Common mistakes

| Mistake | Why it hurts | Fix |
|---|---|---|
| One-line prompts for complex tasks | The AI fills gaps with guesses | Add context, goal, and format |
| Asking several unrelated things at once | Each gets a shallow answer | One task per message, or number them |
| Accepting the first answer | First drafts are rarely the best | Iterate with follow-ups |
| Leading questions | You get agreement, not honesty | Ask neutrally; ask for counterarguments |
| Pasting private data you don't need to | Privacy risk | Remove names and numbers first |
| Arguing in a long, confused chat | Old mistakes keep echoing | Start a fresh chat with a summary |

## A reusable prompt template

Save this somewhere handy and fill in the brackets:

```prompt
You are [role/expert].
Context: [who I am, my situation, what I've tried].
Task: [exactly what I want].
Audience: [who will read or use this].
Format: [table / bullets / email / steps], about [length].
Constraints: [must include, must avoid, tone].
Before you start, ask me any questions you need answered.
```

### Starter prompts

#### Understand something

```prompt
Explain [topic] to me like I'm a smart 12-year-old. Then give me
a real-world example and three questions to test my understanding.
```

#### Decide something

```prompt
I'm deciding between [option A] and [option B] for [goal].
Compare them on cost, time, risk, and long-term value in a table,
then give me your recommendation and why.
```

#### Write something

```prompt
Draft a [type of message] to [who] about [topic]. Goal: [what you
want them to do]. Tone: [friendly/formal/firm]. Keep it under
[N] words. Give me two versions.
```

#### Learn from a document

```prompt
Here's a [contract/report/manual]. Summarize it in five bullets,
then list anything unusual, risky, or that I should ask about.
Quote the exact sections you're referring to.
```

> [!NOTE]
> Speaking works too. In voice mode, just talk as you would to a person: "I'm trying to figure out…" Rambling is fine; the AI will sort it out, and you can say "now summarize what I want in one sentence" to check it understood.

:::checklist
- My prompts include context about my situation
- I say what format and length I want
- I iterate instead of accepting the first draft
- I ask for sources or quotes when facts matter
- I've saved the reusable template somewhere I can find it
:::
