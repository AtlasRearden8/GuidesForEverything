# AI in n8n: The Basics

n8n has three layers of AI: AI *steps* inside workflows, AI *agents* that decide what to do, and AI that *builds workflows for you*. This chapter starts with the simplest and most reliable: using a language model as one step in an ordinary workflow.

:::summary In this chapter
- Language models, prompts and tokens in plain English
- Connecting a chat model: your own key or Gateway credits
- The ready-made AI nodes: chain, extractor, classifier, sentiment, summariser
- Getting structured answers you can use in later nodes
- n8n Assistant and other ways AI can build for you
:::

## A few AI words

| Word | Meaning |
|---|---|
| **LLM** (large language model) | The AI that reads and writes text, such as Claude, GPT or Gemini |
| **Prompt** | The instructions and text you send the model |
| **System message** | Standing instructions about role and style |
| **Token** | A chunk of text (about ¾ of a word); providers charge per token |
| **Chat model** | The n8n sub-node that connects to an LLM provider |
| **Hallucination** | When a model confidently states something false |

## AI steps in a workflow

Add an AI model node anywhere to summarize, classify, translate, or extract information. The **Basic LLM Chain**, **Information Extractor**, **Text Classifier**, and **Sentiment Analysis** nodes cover the common jobs. Connect a **chat model** (OpenAI, Anthropic Claude, Google Gemini, Mistral, Ollama for local models, and more) using your API key.

| Node | Does | Example |
|---|---|---|
| **Basic LLM Chain** | Sends a prompt, returns the answer | "Summarise this article in three bullets" |
| **Information Extractor** | Pulls named fields out of text | Invoice number, date and total from an email |
| **Text Classifier** | Sorts text into categories you define | Billing / technical / sales / spam |
| **Sentiment Analysis** | Judges tone | Positive, neutral or negative review |
| **Summarization Chain** | Summarises long documents in chunks | A 40-page PDF |

> [!TIP]
> On n8n Cloud Starter and Pro plans you can choose **Use Gateway credits** in a model's credential field. n8n handles billing, so you don't need your own OpenAI or Anthropic account. Great for getting started.

## Connecting a chat model

:::steps Summarise text with Claude
1. **Add a Basic LLM Chain** after a node that outputs text (say, an RSS item with `content`).
2. **Set the prompt.** Choose **Define below** and write: `Summarise this in two sentences for a busy reader: {{ $json.content }}`.
3. **Attach a chat model.** Click the **Model** connector under the node and pick **Anthropic Chat Model** (or OpenAI, Gemini…).
4. **Add a credential.** Paste an API key from the provider's console, or choose **Use Gateway credits** on Cloud.
5. **Pick a model** from the list, then **Execute step**. The answer appears in the output, ready for Slack or email.
:::

> [!NOTE]
> Gateway credits are available on Cloud Starter and Pro (not Enterprise or self-hosted). New accounts and trials include a small free amount. Top-ups expire 12 months after purchase. Rates per model are on n8n's service pricing page.

## Getting structured answers

A paragraph of text is hard for later nodes to use. You want fields: `category`, `priority`, `reply`. Two ways:

- **Information Extractor**: list the attributes you want with a short description of each, or give a JSON example. The output has one field per attribute.
- **Require Specific Output Format** on a Basic LLM Chain or AI Agent, with a **Structured Output Parser** attached. Give it an example like the one below and n8n makes the model fill in exactly that shape.

```json title=Example for the Structured Output Parser
{
  "category": "billing",
  "priority": "high",
  "summary": "Customer was charged twice in October",
  "suggested_reply": "Hi Sam, sorry about that..."
}
```

## Writing good prompts

:::checklist
- Say who the AI is and who the output is for ("You are a support assistant replying to customers")
- Give the exact task and format ("Reply in under 80 words, plain text, no greeting line")
- Include the data clearly, between markers like `---`
- Give one example of a perfect answer
- Say what to do when unsure ("If the category is unclear, answer `other`")
:::

## Running models locally

Self-hosted users can run open models on their own hardware with **Ollama** and connect them with the **Ollama Chat Model** node. Your data never leaves your server, and there's no per-token bill, but you need a capable machine, and small models are less accurate than the big cloud ones.

## Let AI build workflows for you

- **n8n Assistant** (in preview): a chat panel inside n8n that can plan, build, test and fix workflows from a description, and help with tasks like publishing. It's available on Cloud Starter and Pro and on self-hosted Community and Business. It uses **Assistant credits**: a monthly allowance comes with Cloud plans (1,600 a month on Starter). On self-hosted, you add your own model key.
- **From Claude or another MCP client**: connect to n8n's instance-level MCP server and say "build a workflow that saves Gmail attachments to Google Drive" (Chapter 22).

> [!WARNING]
> Review AI-built workflows before publishing, especially nodes that send messages, delete data, or spend money. Test with pinned or sample data first.

```prompt
Build an n8n workflow that runs every weekday at 8am, reads new rows from
my Google Sheet "Leads" added in the last 24 hours, writes a two-line
summary of each with AI, and posts the summaries to the Slack channel
#sales. Use Gateway credits for the model. Don't publish it; I'll review it.
```

:::checklist
- I've connected a chat model with a key or Gateway credits
- I've used Basic LLM Chain for a summary
- I've extracted structured fields with Information Extractor or an output parser
- I review AI-built workflows before publishing
:::

