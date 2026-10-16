# Knowledge for Your AI: Vector Stores and RAG

A language model knows a lot about the world, but nothing about *your* price list, handbook or support articles. **RAG** (retrieval-augmented generation) fixes that: before answering, the AI looks up the most relevant passages from your documents and uses them. This chapter explains the idea and builds a working knowledge base.

:::summary In this chapter
- Embeddings and vector stores, without the maths
- The two halves of RAG: loading and asking
- Building a knowledge base from documents
- Connecting it to an agent as a tool
- Choosing a vector store for production
- Making answers more accurate
:::

## The idea in plain English

Imagine a librarian who has read every page of your documents and sorted them by *meaning*. When a question arrives, they pull out the three most relevant pages and hand them to the writer, who answers using only those pages.

- An **embedding** is a list of numbers that captures the meaning of a piece of text. Texts with similar meanings get similar numbers. An **embeddings model** (for example OpenAI, Gemini, Cohere, Mistral or Ollama embeddings) creates them.
- A **vector store** is a database that stores those numbers alongside the text, and can quickly find the passages closest in meaning to a question.
- **Chunking** means cutting long documents into passages (a few paragraphs each) so each one can be found separately. A **text splitter** does this.

## The two halves of RAG

| Half | Runs | Steps |
|---|---|---|
| **Loading (ingestion)** | When documents change | Get files → split into chunks → embed → store |
| **Asking (retrieval)** | Every question | Embed the question → find similar chunks → answer with them |

## Build a knowledge base

:::steps Load documents into a vector store
1. **Start with a trigger and your documents.** For a first test, use a Manual Trigger and a Google Drive node that downloads a few PDFs or Google Docs.
2. **Add a vector store node** and choose the **Insert Documents** operation. To begin, use **Simple Vector Store** and give it a **Memory Key** such as `handbook`.
3. **Attach an embeddings model** to its **Embedding** connector, for example **Embeddings OpenAI**.
4. **Attach a document loader**: **Default Data Loader**, set to binary (for files) or JSON (for text fields).
5. **Attach a text splitter** to the loader: **Recursive Character Text Splitter** is a good default. Try a chunk size of about 1,000 characters with 200 characters of overlap.
6. **Execute the workflow.** The output shows how many chunks were stored.
:::

## Ask questions with an agent

:::steps Connect the knowledge base to a chatbot
1. **Build the chatbot** from Chapter 20: Chat Trigger → AI Agent with a chat model and memory.
2. **Add a vector store as a tool.** On the agent's **Tool** connector, add the same vector store node with the operation **Retrieve Documents (As Tool for AI Agent)**, and the same Memory Key, `handbook`.
3. **Describe the tool.** Name it `company_handbook` and describe it: "Searches the staff handbook. Use it for any question about policies, holidays or expenses."
4. **Use the same embeddings model** as when loading. Different models produce incompatible numbers.
5. **Set a Limit** of 4 to 6 chunks, so the model gets enough context without drowning.
6. **Tell the agent to rely on it.** Add to the system message: "Answer only from the handbook tool. If it doesn't contain the answer, say you don't know."
:::

## Choosing a vector store

> [!WARNING]
> **Simple Vector Store** keeps data in n8n's memory. It's lost when n8n restarts, and every user on the instance can access it. Use it for experiments only.

| Vector store | Good for |
|---|---|
| **PGVector** | You already run PostgreSQL (add the pgvector extension) |
| **Supabase** | Hosted Postgres with a free tier |
| **Qdrant** | Fast, open source, self-hostable or cloud |
| **Pinecone** | Fully managed cloud service |
| **Others** | Chroma, Milvus, MongoDB Atlas, Redis, Weaviate, Zep, Azure AI Search |

The workflow shape is the same whichever you pick: only the node and credential change.

## Keeping it fresh

Run the loading workflow whenever documents change: on a schedule, or with a Google Drive trigger on file updates. To avoid duplicates, clear the old chunks for a document before inserting new ones (Simple Vector Store has a **Clear Store** option; other stores let you delete by metadata or use a separate collection per source).

## Improving answers

| Problem | Try |
|---|---|
| Answers miss obvious facts | Smaller chunks, more results (higher Limit) |
| Answers mix up topics | Larger chunks with overlap; clearer tool description |
| Agent ignores the knowledge base | Say in the system message to always search it first |
| Made-up answers | "If it isn't in the documents, say you don't know" |
| Slow or expensive | Fewer chunks; a cheaper model for simple questions |
| Ranking is poor | Add a reranker such as **Reranker Cohere** |

:::checklist
- I can explain embeddings and vector stores in my own words
- I've loaded documents with an embeddings model, loader and splitter
- My agent uses the vector store as a tool with a clear description
- I use the same embeddings model for loading and asking
- I've picked a persistent vector store for production
:::

