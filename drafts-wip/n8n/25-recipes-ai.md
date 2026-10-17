# Recipes: AI Workflows

The last three recipes put AI to work: sorting your inbox, answering customers from your own documents, and a personal assistant you can message from your phone.

:::summary In this chapter
- Recipe 10: email triage with AI
- Recipe 11: AI support chatbot with RAG
- Recipe 12: Telegram assistant bot
:::

## Recipe 10: email triage with AI

**Goal:** every new email is classified, labelled, and, for customer questions, given a draft reply waiting for you to check.

**Nodes:** Gmail Trigger, Text Classifier, Gmail (add label), Basic LLM Chain with Structured Output Parser, Gmail (create draft), Slack.

:::steps Build it
1. **Gmail Trigger:** event **Message Received**, polling every minute or five. Keep **Simplify** on.
2. **Text Classifier:** input `Subject: {{ $json.Subject }} Body: {{ $json.snippet }}`. Categories with short descriptions: `customer_question`, `invoice`, `newsletter`, `personal`, `spam`. Each category becomes an output.
3. **Gmail › Add Label:** on each output, add the matching label to `{{ $json.id }}`.
4. **On customer_question:** a **Basic LLM Chain** with your tone and policies in the prompt, and a Structured Output Parser returning `urgency` (low/medium/high) and `reply`.
5. **Gmail › Create draft:** a reply to the sender with the AI's `reply`. You review and send it yourself.
6. **If urgency is high:** Slack yourself a link to the email.
:::

> [!TIP]
> Start with drafts, never automatic sending. After a few weeks of reading the drafts, you'll know which categories are safe to automate further.

> [!NOTE]
> Every new email is one execution. A busy inbox can use thousands a month. Narrow the trigger with Gmail search filters (for example only the inbox, not promotions) to save executions and AI costs.

## Recipe 11: AI support chatbot with RAG

**Goal:** a chat window, on its own page or your website, that answers customer questions from your help articles and hands over to a human when stuck.

**Two workflows:** a loader (documents → vector store) and the chatbot.

:::steps Workflow A: load your help articles
1. **Trigger:** Schedule (daily) or a Google Drive trigger on your "Help articles" folder.
2. **Google Drive:** download the documents (or HTTP Request to fetch your help-centre pages).
3. **Vector store › Insert Documents:** PGVector, Supabase, Qdrant or Pinecone, with an embeddings model, Default Data Loader and Recursive Character Text Splitter (Chapter 21).
:::

:::steps Workflow B: the chatbot
1. **Chat Trigger:** **Make Chat Publicly Available** on, mode **Hosted Chat** (or **Embedded Chat** for your site). Set a title and welcome message in the options.
2. **Guardrails (optional but wise):** **Check Text for Violations** with jailbreak and topical alignment checks; the Fail branch replies politely that you can only help with your products.
3. **AI Agent:** chat model, **Postgres Chat Memory** (or Simple Memory to start), and the vector store as a tool (**Retrieve Documents (As Tool for AI Agent)**) named `help_articles`.
4. **Add a hand-over tool:** a **Call n8n Workflow Tool** that runs a sub-workflow emailing your support inbox with the conversation and the customer's address. Describe it: "Use when you can't answer from help_articles, or the customer asks for a person."
5. **System message:** your shop's name, "answer only from help_articles," tone, length, and "never promise refunds; hand over instead."
6. **Test hard.** Ask easy questions, off-topic questions, and tricky ones. Read **Return Intermediate Steps** to see which tools it used.
7. **Publish** and share the chat URL, or embed it on your site.
:::

> [!IMPORTANT]
> Tell customers they're talking to an AI, and give them an easy path to a human. Check your local rules on data protection before storing chat histories.

## Recipe 12: Telegram assistant bot

**Goal:** message a private Telegram bot from your phone: "what's on tomorrow?", "add milk to my list", "summarise this link."

**Nodes:** Telegram Trigger, If (security check), AI Agent with memory and tools, Telegram (send message).

:::steps Build it
1. **Create the bot.** In Telegram, message **@BotFather**, send `/newbot`, follow the prompts, and copy the **bot token** into an n8n Telegram credential.
2. **Telegram Trigger:** updates **Message**. Send your bot a message while listening to see the data, and note your own `chat.id`.
3. **If:** continue only when `{{ $json.message.chat.id }}` equals your ID, so strangers can't use your assistant.
4. **AI Agent:** prompt `{{ $json.message.text }}`; chat model; Simple Memory with session key `{{ $json.message.chat.id }}`; tools such as Google Calendar (get events), Google Tasks or a data table (your list), and HTTP Request (fetch a link).
5. **Telegram › Send Message:** chat ID `{{ $('Telegram Trigger').item.json.message.chat.id }}`, text `{{ $json.output }}`.
6. **Publish.** Telegram needs a public HTTPS address, so use Cloud or your server from Chapter 5.
:::

> [!WARNING]
> Telegram allows only one webhook per bot. Testing in the editor while the workflow is published redirects messages to the test URL. Publish again after testing, or use a second bot for development.

**Extend it:** send voice notes and transcribe them with a speech-to-text model; add a daily morning message from a Schedule Trigger.

:::checklist
- My email triage creates drafts, not automatic replies
- My chatbot answers from my documents and can hand over to a human
- My Telegram bot only answers my own chat ID
- Each AI workflow has guardrails or approvals where it matters
:::

