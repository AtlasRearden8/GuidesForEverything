# How AI Assistants Work

You don't need to understand the math, but a simple mental model makes you dramatically better at using AI, and helps you spot when it's wrong.

:::summary In this chapter
- What a "large language model" is, in plain English
- How these models learn, and what they can and can't do
- Why AI sometimes makes things up, and how to catch it
- The words you'll see on every AI website
:::

## A very well-read prediction engine

Chat assistants like ChatGPT, Claude, and Gemini are powered by a **large language model** (LLM): a program trained on an enormous amount of text to predict what comes next. Ask it a question, and it produces the most helpful-sounding continuation, one small piece (a **token**) at a time.

Because it learned from so much writing, an LLM can explain, summarize, translate, brainstorm, write code, and reason through problems. Modern models can also take in images, audio, and files, which makes them **multimodal**.

### An analogy that helps

Imagine someone who has read most of a giant library, but who has no notes, no internet, and a slightly fuzzy memory. Ask them anything and they'll answer fluently and instantly. Most of the time they're right. But when they half-remember something, they don't say "I'm not sure." They fill the gap with something that *sounds* right. That is roughly what an LLM is like when it isn't connected to search or your files.

## How a model is made

You'll hear a few stages mentioned in the news. In plain English:

:::steps From raw text to helpful assistant
1. **Training.** The model reads a huge collection of text (books, websites, code, and other material) and learns patterns by predicting missing or next words billions of times. This is where its general knowledge comes from.
2. **Tuning.** People then show it examples of good answers and rate its replies. This teaches it to follow instructions, be polite, refuse harmful requests, and format answers helpfully.
3. **Tools.** Finally, the company connects the model to tools: web search, a calculator or code runner, image generation, your files, and apps. Tools let it look things up and act, instead of relying only on memory.
:::

Training is expensive and happens rarely, which is why each model has a **knowledge cutoff**: a date after which it learned nothing new. Anything more recent, it can only know by searching.

## What it's good at, and what it isn't

| Usually great at | Often weak at |
|---|---|
| Explaining, summarizing, rephrasing | Exact facts it hasn't looked up |
| First drafts of almost anything | Very recent events (without search) |
| Brainstorming and options | Precise counting and arithmetic in its head |
| Translating and changing tone | Knowing what it doesn't know |
| Reading your documents and images | Your personal situation, unless you explain it |
| Step-by-step reasoning (in thinking modes) | Judgment calls that need a professional |

> [!TIP]
> When a question needs math, ask the assistant to "use code to calculate this." Most assistants can run small programs, which are far more reliable than mental arithmetic.

## Why it sometimes makes things up

An LLM doesn't look facts up in a database; it generates text that *fits*. Usually that's right. Sometimes it confidently produces something false, such as a fake statistic, a wrong date, or a book that doesn't exist. This is called a **hallucination**.

> [!WARNING]
> Treat AI like a brilliant, fast intern: excellent for drafts and ideas, but **verify anything important**, especially numbers, quotes, legal, medical, and financial information. Prefer answers that cite sources you can click.

Two features reduce hallucinations a lot:

- **Web search:** the assistant searches the internet and cites what it found.
- **Your own files:** upload a document and ask questions about *it*; answers are then grounded in your material. Basing answers on real sources like this is called **grounding**.

### Common kinds of mistakes

| Mistake | What it looks like | How to catch it |
|---|---|---|
| **Invented sources** | A real-sounding article, case, or study that doesn't exist | Click every citation; search the exact title |
| **Wrong details** | Correct story, wrong date, price, or number | Check numbers against an official page |
| **Outdated facts** | Last year's prices, old product names | Ask it to search; check the date on sources |
| **Agreeing too much** | It flips its answer the moment you push back | Ask "what's the strongest case against this?" |
| **Overconfidence** | No hedging, even on guesses | Ask "how sure are you, and why?" |
| **Misreading you** | Answers a slightly different question | Restate what you need; give an example |

The tendency to tell you what you seem to want to hear has a name: **sycophancy**. Good assistants try to avoid it, but you'll get more honest answers if you ask neutral questions ("Is this a good plan?") rather than leading ones ("This is a great plan, right?").

### Bias

Models learn from human writing, so they can repeat human **bias**: stereotypes, one-sided views, or a tilt toward English-speaking and Western perspectives. When it matters (hiring, health, history, politics), ask for several perspectives and check who the sources are.

## Words you'll see everywhere

| Term | Meaning |
|---|---|
| **Model** | The specific AI "brain." Companies offer several, e.g. a fast one and a smarter one |
| **Prompt** | What you type to the AI |
| **Context window** | How much text the AI can consider at once, including your files and the conversation so far |
| **Knowledge cutoff** | The date the model's training data ends; it won't know about later events unless it searches |
| **Reasoning / thinking** | A mode where the model works through a problem step by step before answering: slower, but smarter |
| **Agent** | An AI that takes actions, such as browsing, clicking, or filling forms, not just answering |
| **Connector** | A link that lets an AI read or act in another app (Gmail, Drive, Notion…) |
| **Usage limit** | How much you can use an assistant in a period of time before you must wait or upgrade |

### Fast models, smart models

Most assistants let you pick between models, or pick for you automatically. A rough rule:

- **Fast or "light" models** are great for quick questions, rewording, and simple tasks.
- **Smart or "thinking" models** are better for planning, analysis, math, tricky writing, and anything with several steps. They take longer and use more of your plan's allowance.

If an answer feels shallow, switching to a thinking model is often the single biggest improvement you can make.

## Context: why long chats go wrong

Everything in the current conversation (your messages, its replies, and any files) has to fit in the context window. In very long chats, early details may get less attention, and a wrong assumption made early can echo through every later answer.

> [!TIP]
> One topic per chat. When a conversation gets long or confused, ask for "a summary of everything we've decided so far," then paste that summary into a fresh chat.

## A quick self-check before you trust an answer

:::checklist
- Does this answer depend on facts, numbers, or dates? If so, did it cite sources?
- Did I open at least one source and confirm it says what the AI claims?
- Is the information recent enough, or could it have changed since the cutoff?
- Would being wrong cost me money, health, a grade, or my reputation? If so, verify with an expert or official source.
- Did I ask a neutral question, or did I lead it to the answer I wanted?
:::
