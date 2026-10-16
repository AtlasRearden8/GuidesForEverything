# Project 6: An AI Chatbot App

Many people's first "real" product idea is an AI assistant for something they know well: a recipe helper, a study buddy, a customer FAQ bot. This project builds one safely, with your AI key hidden on the server and limits that stop a surprise bill.

:::summary In this project
- How an AI chatbot app is wired together
- Get an API key and store it as a back-end secret
- Build a chat interface with a custom personality
- Add usage limits and spending caps
:::

| | |
|---|---|
| **Time** | 2–3 hours |
| **Cost** | Builder free tier, plus pay-per-use AI charges (often cents while testing) |
| **Tools** | Lovable, Bolt, Replit, or Google AI Studio; an AI provider account |
| **You'll learn** | Server functions, secrets, AI APIs, rate limits |

## How it's wired

1. The visitor types a message in your **front end**.
2. The front end sends it to **your back end** (a server or edge function).
3. Your back end adds your instructions and your **secret API key**, and calls the AI provider.
4. The reply comes back, often **streamed** word by word so it appears as it's written.

> [!CAUTION]
> The API key must live only in step 3. If it is in the front end, anyone can copy it from their browser and run up charges on your account.

## Step 1: Choose an AI provider and get a key

You pay providers per **token** of text processed. Popular choices:

- **Anthropic (Claude):** keys at platform.claude.com.
- **OpenAI:** keys at platform.openai.com.
- **Google (Gemini):** keys in Google AI Studio, which also builds Gemini apps for you with the key kept server-side.

Some builders, such as Lovable Cloud, include built-in AI features billed through your plan's credits, with no key needed. That's the simplest option for a first bot.

:::steps Prepare your account
1. **Create an account** with the provider and add a small amount of credit or a payment method.
2. **Set a monthly spending limit** in its billing or limits settings. Start low.
3. **Create an API key** and copy it once. Treat it like a password.
4. **Store it as a secret** in your builder, for example `ANTHROPIC_API_KEY` or `OPENAI_API_KEY`.
:::

## Step 2: Build the chat

```prompt
Build "Kitchen Buddy", a cooking assistant chat app. A clean chat
screen: messages, input box, send button, and a "new chat" button.
Call the AI from a back-end function using the secret
ANTHROPIC_API_KEY. Never send the key to the browser. Stream replies.
Keep the conversation history for the current chat only.
```

## Step 3: Give it a personality and boundaries

The **system prompt** is the hidden instruction that shapes every reply. Ask the AI to put it on the back end:

```prompt
Add this system prompt on the server: "You are Kitchen Buddy, a
friendly home-cooking assistant. Give practical recipes and tips.
Keep answers under 200 words unless asked for more. Always mention
common allergens. If asked about anything unrelated to cooking,
politely steer back to food. Never give medical advice."
```

Test it: ask a cooking question, an off-topic question, and try to trick it ("ignore your instructions"). Adjust the wording until you're happy.

## Step 4: Add limits

AI features are the most common source of surprise bills. Add three layers:

```prompt
Add protections: require sign-in to chat; limit each user to 30
messages per day and show a friendly message when they hit it;
cap message length at 2,000 characters; and log daily usage
per user to a table I can view.
```

Together with the provider's spending limit, a bug or a bot can no longer cost you more than you've decided.

## Step 5: Test, publish, watch

1. **Run your test script** including the limit: send 31 messages on a test account.
2. **Publish**, then check the provider's usage page the next day.
3. **Read some conversations** (with users' knowledge; mention it in your privacy policy) to improve your system prompt.

| Problem | Fix |
|---|---|
| "401" or "invalid API key" | Re-copy the key into the secret; check the variable name matches |
| "429" or "rate limit" | You or the provider hit a limit; wait, or raise your provider tier |
| Replies stop mid-sentence | Ask the AI to raise the maximum reply length or fix streaming |
| Key found in front-end code | Revoke it at the provider immediately, make a new one, move it to secrets |

:::checklist
- API key stored only as a back-end secret
- Provider spending limit set
- Sign-in, daily message limit, and length cap in place
- System prompt tested against off-topic and trick questions
:::

