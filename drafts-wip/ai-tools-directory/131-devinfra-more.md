## More model APIs

:::compact
| Provider | What it offers | Price |
|---|---|---|
| **Perplexity Sonar API** | Search-grounded answers via API | {{Paid}} |
| **AI21** | Jamba models for long documents | {{Paid}} |
| **Z.ai API** (Zhipu) | GLM models | {{Paid}} |
| **Moonshot API** | Kimi models | {{Paid}} |
| **MiniMax API** | Text, speech, and video models | {{Paid}} |
| **Alibaba Cloud Model Studio** | Qwen models via API | {{Freemium}} |
| **IBM watsonx.ai** | Granite and other models for business | {{Freemium}} |
| **NVIDIA NIM** | Optimized model containers and a free trial API | {{Freemium}} |
| **Oracle OCI Generative AI** | Models on Oracle Cloud | {{Paid}} |
| **Snowflake Cortex AI** | LLM functions inside Snowflake | {{Paid}} |
| **Writer Palmyra** | Enterprise models via API | {{Paid}} |
| **Inception** (Mercury) | Very fast diffusion language models | {{Freemium}} |
| **fal** | Fast image, video, and audio model APIs | {{Paid}} |
| **Runware** | Low-cost image and video generation API | {{Paid}} |
| **Stability AI API** | Image, 3D, and audio models | {{Paid}} |
:::

## Open-weight model families

**Open-weight** models can be downloaded and run on your own hardware. Check each license: some limit commercial use.

:::compact
| Model family | From | Price |
|---|---|---|
| **gpt-oss** | OpenAI | {{Free}} |
| **Gemma** | Google | {{Free}} |
| **Llama** | Meta | {{Free}} |
| **Qwen** | Alibaba | {{Free}} |
| **DeepSeek** | DeepSeek | {{Free}} |
| **Mistral** and **Devstral** | Mistral AI | {{Free}} |
| **Kimi K2** | Moonshot AI | {{Free}} |
| **GLM** | Zhipu (Z.ai) | {{Free}} |
| **MiniMax M** series | MiniMax | {{Free}} |
| **Phi** | Microsoft | {{Free}} |
| **Granite** | IBM | {{Free}} |
| **Nemotron** | NVIDIA | {{Free}} |
| **OLMo** | Ai2 (fully open, including data) | {{Free}} |
| **SmolLM** | Hugging Face | {{Free}} |
| **Liquid LFM** | Liquid AI | {{Free}} |
| **Falcon** | TII | {{Free}} |
:::

## Model routers and gateways

A **gateway** sits between your app and many model providers. It handles keys, fallbacks, caching, and spending limits in one place.

:::compact
| Tool | What it does | Price |
|---|---|---|
| **LiteLLM** | Open-source proxy for 100+ model APIs | {{Free}} |
| **Portkey** | AI gateway with guardrails and logs | {{Freemium}} |
| **Vercel AI Gateway** | One endpoint for many models | {{Freemium}} |
| **Cloudflare AI Gateway** | Caching, rate limits, and analytics | {{Free}} |
| **Kong AI Gateway** | Enterprise API and AI gateway | {{Freemium}} |
| **Requesty** | Router with cost controls | {{Freemium}} |
| **Not Diamond** | Picks the best model for each prompt | {{Freemium}} |
| **Eden AI** | One API for many AI services | {{Freemium}} |
:::

## More inference and GPU clouds

:::compact
| Tool | What it does | Price |
|---|---|---|
| **SambaNova Cloud** | Fast inference on custom chips | {{Freemium}} |
| **DeepInfra** | Cheap hosted open models | {{Paid}} |
| **Novita AI** | Model APIs and GPU instances | {{Paid}} |
| **Hyperbolic** | Low-cost GPUs and inference | {{Paid}} |
| **Nebius AI Studio** | Open-model inference and fine-tuning | {{Paid}} |
| **Lambda** | GPU cloud for training and inference | {{Paid}} |
| **CoreWeave**, **Crusoe** | Large-scale GPU clouds | {{Paid}} |
| **Vast.ai** | Marketplace of rentable GPUs | {{Paid}} |
| **Anyscale** | Managed Ray for scaling AI | {{Paid}} |
| **DigitalOcean Gradient AI** | Simple GPUs and agent hosting | {{Paid}} |
| **Cerebrium**, **Beam** | Serverless GPU apps | {{Freemium}} |
| **Google Colab** | Free notebooks with GPU time | {{Freemium}} |
| **Kaggle** | Free notebooks, GPUs, and datasets | {{Free}} |
| **Lightning AI** | Cloud studios for AI development | {{Freemium}} |
:::

## Local and open-source runners

Running a model **locally** keeps your data on your machine. **Quantization** shrinks a model so it fits in less memory, with a small loss in quality. **GGUF** is a popular file format for these smaller models.

:::compact
| Tool | What it does | Price |
|---|---|---|
| **LocalAI** | Drop-in local replacement for the OpenAI API | {{Free}} |
| **KoboldCpp** | One-file local runner, popular for stories | {{Free}} |
| **text-generation-webui** | Feature-rich local web interface | {{Free}} |
| **llamafile** (Mozilla) | A model and runner in one file | {{Free}} |
| **MLX** / **mlx-lm** (Apple) | Fast local models on Apple silicon | {{Free}} |
| **MLC LLM** | Run models on phones and browsers | {{Free}} |
| **SGLang** | Fast open-source serving engine | {{Free}} |
| **TensorRT-LLM** (NVIDIA) | Optimized inference on NVIDIA GPUs | {{Free}} |
| **ExLlamaV2** | Fast quantized inference on GPUs | {{Free}} |
| **Docker Model Runner** | Pull and run models like containers | {{Free}} |
| **RamaLama** | Run models in containers | {{Free}} |
| **Foundry Local** (Microsoft) | Local models on Windows and Mac | {{Free}} |
| **Lemonade** (AMD) | Local inference tuned for AMD hardware | {{Free}} |
| **PrivateGPT** | Private document Q&A, fully offline | {{Free}} |
| **PocketPal AI** | Run small models on your phone | {{Free}} |
| **Google AI Edge Gallery** | Try on-device models on Android | {{Free}} |
| **Private LLM** | Offline models for iPhone and Mac | {{Paid}} |
| **LLM** (Simon Willison) | Command-line tool for many models | {{Free}} |
| **Unsloth** | Faster, lower-memory fine-tuning | {{Free}} |
| **Axolotl**, **LLaMA-Factory** | Open-source fine-tuning toolkits | {{Free}} |
| **TRL**, **PEFT** (Hugging Face) | Libraries for training and adapters | {{Free}} |
:::

> [!TIP]
> Rough rule: a computer with 16 GB of memory runs 7–8 billion parameter models comfortably; 32 GB or more opens up much stronger ones. Start with a small model in LM Studio and work up.

## More vector databases and search

An **embedding** turns text into a list of numbers that captures its meaning. A **vector database** stores embeddings so an app can find similar text fast. Together they power **RAG** (retrieval-augmented generation): looking up your documents before the AI answers.

:::compact
| Tool | What it does | Price |
|---|---|---|
| **LanceDB** | Embedded, open-source vector database | {{Freemium}} |
| **Vespa** | Search and recommendation engine | {{Freemium}} |
| **Elasticsearch** | Search with vector and hybrid retrieval | {{Freemium}} |
| **OpenSearch** | Open-source search with vectors | {{Free}} |
| **Redis** | In-memory database with vector search | {{Freemium}} |
| **MongoDB Atlas Vector Search** | Vectors next to your documents | {{Freemium}} |
| **Supabase Vector** | pgvector managed by Supabase | {{Freemium}} |
| **Upstash Vector** | Serverless vector database | {{Freemium}} |
| **Cloudflare Vectorize** | Vector search on Cloudflare | {{Freemium}} |
| **Amazon S3 Vectors** | Cheap vector storage in S3 | {{Paid}} |
| **Azure AI Search** | Microsoft's search with vectors | {{Paid}} |
| **Vertex AI Vector Search** | Google Cloud vector search | {{Paid}} |
| **Astra DB** (DataStax) | Serverless vector database | {{Freemium}} |
| **SingleStore**, **Couchbase** | Databases with vector search | {{Freemium}} |
| **FAISS** (Meta) | Free library for similarity search | {{Free}} |
| **Typesense**, **Meilisearch** | Fast search engines with AI search | {{Freemium}} |
| **Algolia** | Hosted search with AI ranking | {{Freemium}} |
:::

## Embeddings, rerankers, and RAG platforms

A **reranker** re-sorts search results so the most relevant come first.

:::compact
| Tool | What it does | Price |
|---|---|---|
| **Voyage AI** | High-quality embeddings and rerankers | {{Freemium}} |
| **Jina AI** | Embeddings, rerankers, and reader API | {{Freemium}} |
| **Cohere Embed** / **Rerank** | Multilingual embeddings and reranking | {{Freemium}} |
| **Nomic Embed** | Open embedding models | {{Freemium}} |
| **Mixedbread** | Open embeddings and search API | {{Freemium}} |
| **Vectara** | RAG-as-a-service with hallucination checks | {{Freemium}} |
| **Ragie** | Managed RAG for developers | {{Freemium}} |
| **Pinecone Assistant** | Upload files, get a cited chat API | {{Freemium}} |
| **LlamaCloud** | Managed parsing and indexing | {{Freemium}} |
| **RAGFlow** | Open-source RAG engine | {{Free}} |
| **Onyx** | Open-source enterprise search and chat | {{Freemium}} |
:::

## More observability, evals, and guardrails

An **eval** is a repeatable test of AI output quality. **Observability** means recording what your AI app did so you can debug it. **Guardrails** block unsafe inputs or outputs.

:::compact
| Tool | What it does | Price |
|---|---|---|
| **Arize AX** | Enterprise LLM observability | {{Freemium}} |
| **Datadog LLM Observability** | Traces and costs in Datadog | {{Paid}} |
| **Galileo** | Evals and guardrail metrics | {{Freemium}} |
| **HoneyHive** | Testing and monitoring for agents | {{Freemium}} |
| **Opik** (Comet) | Open-source tracing and evals | {{Freemium}} |
| **Promptfoo** | Open-source prompt testing and red teaming | {{Freemium}} |
| **Confident AI** / **DeepEval** | Unit tests for LLM apps | {{Freemium}} |
| **Ragas** | Open-source RAG evaluation | {{Free}} |
| **Laminar** | Open-source agent tracing | {{Freemium}} |
| **Agenta** | Prompt management and evals | {{Freemium}} |
| **PromptLayer** | Prompt registry and logging | {{Freemium}} |
| **Pydantic Logfire** | Observability with AI tracing | {{Freemium}} |
| **MLflow** | Open-source ML and LLM tracking | {{Free}} |
| **Weights & Biases** | Experiment tracking for training | {{Freemium}} |
| **Inspect** (UK AISI) | Open-source evaluation framework | {{Free}} |
| **LMArena** | Public leaderboard from blind votes | {{Free}} |
| **Artificial Analysis** | Independent model speed and quality benchmarks | {{Free}} |
| **Guardrails AI** | Open-source output validation | {{Free}} |
| **NeMo Guardrails** (NVIDIA) | Programmable rails for chatbots | {{Free}} |
| **Llama Guard** | Open safety classifier model | {{Free}} |
| **Lakera** | Prompt-injection protection | {{Paid}} |
:::

## More hosting, backends, and auth

:::compact
| Tool | What it does | Price |
|---|---|---|
| **AWS Amplify** | Full-stack hosting on AWS | {{Freemium}} |
| **Heroku** | Simple app platform with AI add-ons | {{Paid}} |
| **DigitalOcean App Platform** | Easy app hosting | {{Freemium}} |
| **Appwrite** | Open-source backend platform | {{Freemium}} |
| **PocketBase** | One-file open-source backend | {{Free}} |
| **Turso** | Edge SQLite database | {{Freemium}} |
| **PlanetScale** | Managed MySQL and Postgres | {{Paid}} |
| **Prisma Postgres** | Serverless Postgres with Prisma | {{Freemium}} |
| **Upstash** | Serverless Redis, queues, and vectors | {{Freemium}} |
| **WorkOS** | Enterprise sign-in and agent auth | {{Freemium}} |
| **Stytch**, **Descope** | Authentication APIs | {{Freemium}} |
| **Better Auth** | Open-source TypeScript auth library | {{Free}} |
| **Resend** | Email API for developers | {{Freemium}} |
| **Twilio** | SMS, voice, and WhatsApp APIs | {{Paid}} |
| **Sentry** | Error monitoring with AI root-cause help | {{Freemium}} |
:::

