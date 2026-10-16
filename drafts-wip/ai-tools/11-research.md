# Research and Fact-Checking

AI can read faster than any person, which makes it a superb research assistant. But it can also be confidently wrong, so good research with AI is half asking and half checking. This chapter teaches both.

:::summary In this chapter
- Answer engines, AI Mode, and deep research tools compared
- Gemini Notebook: an AI that only reads your sources
- A simple four-step method for checking any claim
- Research prompts you can reuse
:::

## Answer engines and deep research

For questions where facts matter, use tools that **search and cite**:

- **Perplexity**: every answer comes with numbered sources. Pro adds deeper multi-step research.
- **Deep research modes** in ChatGPT, Claude, and Gemini spend several minutes reading dozens of sources and produce a long, cited report. They're ideal for market research, comparing products, or learning a new field.
- **Google Search's AI Mode**: conversational answers inside Google Search, with links to dig deeper.

> [!TIP]
> Always click through to two or three of the cited sources. Check that they really say what the AI claims, and that they're reputable and recent.

### Which research tool when?

| Your question | Reach for | Why |
|---|---|---|
| A quick fact with a source | Perplexity, or any assistant with search on | Fast, cited |
| "Compare the options for…" | Deep research (ChatGPT, Gemini, Claude, Perplexity) | Reads widely, writes a structured report |
| Questions about *your* documents | Gemini Notebook, or a project in your assistant | Answers only from your files |
| Breaking news or public reaction | Perplexity or Grok, then a reliable news site | Up-to-the-minute, but needs checking |
| Academic papers | Perplexity with academic sources, or a scholarly tool | Finds real, citable studies |

> [!NOTE]
> Gemini's Deep Research works on the free plan with limits; Claude's **Research** feature needs a paid plan. ChatGPT and Perplexity offer some deep research on free plans and much more on paid ones. Limits change often.

### Getting a great deep research report

:::steps Run a deep research job
1. **Write a clear brief.** Say what you want to know, why, and for whom. Mention places, dates, and budget if relevant.
2. **Say what sources you trust.** "Prefer government sites, peer-reviewed studies, and established news outlets. Avoid forums."
3. **Ask for a format.** "Start with a one-paragraph answer, then a comparison table, then details with citations."
4. **Review the plan.** Many tools show a research plan first; edit it before you start.
5. **Read the report critically.** Check the key numbers against the original sources before you rely on them.
:::

```prompt
Research the pros and cons of solar panels for a 1970s house in
Manchester, UK, with a south-facing roof. Include typical costs,
payback time, available grants, and common problems. Prefer
government and consumer-group sources from the last two years.
Start with a summary, then a table, then cited details.
```

## Gemini Notebook: an AI that only reads your sources

**Gemini Notebook** (formerly called NotebookLM; at notebook.google, free with a Google account) lets you upload PDFs, Google Docs, websites, YouTube videos, and audio, then ask questions answered *only* from those sources, with citations to the exact passage. It can also generate:

- **Audio Overviews**: a podcast-style conversation about your material.
- **Video Overviews**, **mind maps**, **study guides**, **flashcards**, and **quizzes**.

It's superb for students, for studying for certifications, or for understanding a stack of reports. Google is also adding the ability to run code for analysis inside notebooks, starting with higher-tier plans.

:::steps Your first notebook
1. **Go to notebook.google** and sign in with your Google account.
2. **Create a new notebook** and add sources: upload files, paste a web link, or paste text.
3. **Ask a question** in the chat. Click the little numbers in the answer to jump to the exact passage.
4. **Generate an Audio Overview** and listen on a walk or drive.
5. **Make flashcards or a quiz** to test yourself.
:::

> [!TIP]
> Because it only uses your sources, Gemini Notebook is far less likely to invent things. That also means it can only be as good as the sources you give it.

## Checking claims: a four-step method

Fact-checkers and librarians teach a simple routine often called **SIFT**. It works for AI answers, social media posts, and news alike.

| Step | What you do | Example |
|---|---|---|
| **1. Stop** | Pause before believing or sharing, especially if it makes you angry or excited | "Is this too perfect?" |
| **2. Investigate the source** | Who published this? Are they experts, a company selling something, or unknown? | Search the site's name plus "about" or "reviews" |
| **3. Find better coverage** | Do reliable outlets or official sites report the same thing? | Search the claim; look for two independent confirmations |
| **4. Trace to the original** | Find the original study, quote, or data, and check it says what's claimed | Open the actual report, not a summary of it |

Checking what other sites say about a source, instead of judging it from its own pages, is called **lateral reading**. It's the single most effective habit of professional fact-checkers.

### Checking AI citations

:::steps Verify a citation in two minutes
1. **Click the link.** Does it open a real page? Made-up links often lead nowhere.
2. **Find the claim on the page.** Use <kbd>Ctrl</kbd> + <kbd>F</kbd> (<kbd>Cmd</kbd> + <kbd>F</kbd> on Mac) to search for a key word or number.
3. **Check the date.** Is it recent enough for your question?
4. **Check the source type.** A government site or peer-reviewed study is stronger than a blog or a company's marketing.
5. **For books and papers,** search the exact title in a library catalog or Google Scholar.
:::

### Checking a photo

Suspicious image? Use a reverse image search such as **Google Lens** (in the Google app, or right-click an image in Chrome and choose to search with Google). It shows where else the picture has appeared, which often reveals an older or unrelated original. See *Scams, Deepfakes, and Good Judgment* for spotting AI-made images.

## Research prompts

```prompt
Give me the strongest arguments on each side of [issue], with
sources for each. Then tell me which points experts generally
agree on, and where the real disagreement is.
```

```prompt
I read this claim: "[claim]". Search for evidence for and
against it. Rate how well supported it is (strong, mixed, weak,
or false) and explain why, with links.
```

```prompt
Find the original source for this statistic: "[statistic]".
Tell me who measured it, when, how, and whether it's being
quoted accurately.
```

```prompt
I'm new to [field]. Give me a reading list of 8 respected
beginner sources (books, sites, courses), what each is best
for, and the order to read them in.
```

:::checklist
- I use search-and-cite tools for anything factual
- I open and read at least two sources for important answers
- I check numbers and quotes against the original
- I know how to use Gemini Notebook for my own documents
- I pause before sharing claims that provoke a strong reaction
:::
