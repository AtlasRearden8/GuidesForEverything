# Glossary {.unnumbered}

:::glossary
Absolute path
: A file or folder address written in full from the top of the drive, such as `/Users/sam/Documents`.

Aggregator
: A marketplace or directory that reads the MCP Registry and adds its own curation.

Annotation
: A hint on a tool, such as `readOnlyHint` or `destructiveHint`, that helps apps decide when to ask for approval.

API key
: A secret string that identifies a program to a service.

Authorization server
: The sign-in service that issues OAuth tokens for a remote MCP server.

Capabilities
: The list of feature families a client or server says it supports.

Client
: The component inside a host app that maintains one connection to one MCP server.

Client ID Metadata Document
: A public web page describing an app, used to introduce it to an OAuth sign-in service.

Connector
: Claude's name for an MCP server connected to your account.

Container
: A sealed box, usually run with Docker, holding a program and everything it needs.

Context (SDK)
: An object the SDK passes to a tool, giving access to progress reports, resources, and request details.

Deprecated
: Still working, but scheduled for removal; new projects shouldn't rely on it.

Desktop extension
: A one-click installable package (`.mcpb` file) for a local server in Claude Desktop.

DNS rebinding
: An attack where a web page tricks your browser into reaching servers on your own computer.

Docker
: A tool for running programs in containers.

Dynamic Client Registration
: An older, now deprecated way for apps to register themselves with an OAuth sign-in service.

Elicitation
: When an MCP server asks the user for extra information during a task.

Environment variable
: A named setting a program can read, often used for API keys.

Extension (MCP)
: An optional add-on to the core protocol, such as MCP Apps or Tasks.

Factory
: A function that builds and returns a fresh server instance.

Header
: A labelled line of extra information sent with a web request, such as `Authorization`.

Host
: The AI application you use, such as Claude Desktop, Cursor, or ChatGPT, which connects to MCP servers.

Idempotent
: Safe to repeat: doing it twice has the same effect as once.

JSON
: A text format for structured settings, using braces, brackets, quotes, and commas.

JSON Schema
: A standard way to describe the shape of JSON data, used for tool inputs.

JSON-RPC
: The simple message format MCP uses to request actions and return results.

Least privilege
: Giving each tool or person only the access their job needs.

Local server
: An MCP server that runs as a program on your own computer.

MCP
: Model Context Protocol: an open standard for connecting AI applications to tools and data.

MCP Apps
: An extension that lets tools show interactive web pages inside the chat.

MCP Inspector
: A free developer tool for testing MCP servers.

MCP Registry
: The official public catalog of MCP server metadata at registry.modelcontextprotocol.io.

MCPServer
: The high-level server class in version 2 of the Python SDK (formerly FastMCP).

MIME type
: A label describing a kind of content, such as `text/plain` or `image/png`.

Multi round-trip request
: The 2026 pattern where a server replies "input required" and the client retries with the answers.

Namespace
: The owner prefix of a registry name, such as `io.github.username/`.

Node.js
: A program that runs JavaScript outside a browser; needed for servers started with `npx`.

npx
: A command that downloads and runs a Node.js package in one step.

OAuth
: A secure "sign in with…" standard that grants an app limited access without sharing your password.

PATH
: The list of folders your system searches for programs.

Personal access token
: A secret token you create on a service's website to let a program act as you.

Plugin (ChatGPT)
: ChatGPT's name for an installed MCP server or app.

Prompt (primitive)
: A reusable template an MCP server offers, often shown as a slash command.

Prompt injection
: Hidden instructions inside content an AI reads, designed to hijack its behavior.

Protocol
: An agreed set of rules for how two programs talk.

Pydantic
: A Python library for describing and checking data, used by the Python SDK.

Remote server
: An MCP server hosted on the internet and reached by a web address.

Resource
: Information an MCP server exposes for the AI to read, such as a file or a schema.

Resource template
: A resource address with blanks, such as `users://{id}/profile`.

Roots
: A deprecated feature where the host tells a server which folders it may use.

Rug pull
: When a trusted server is later updated with harmful behaviour.

Sampling
: A deprecated feature letting a server ask the host's AI model to generate text.

Scope (OAuth)
: The list of permissions a token grants.

Scope (Claude Code)
: Where a server is configured: local, project, or user.

SDK
: Software development kit: a library that makes building something, such as an MCP server, easier.

server.json
: The metadata file describing a server in the MCP Registry.

Server-Sent Events
: A way for a web server to stream updates to a client; used inside Streamable HTTP.

SSRF
: Server-side request forgery: tricking a server into fetching an address the attacker chose.

Stateless
: Not keeping a session between requests; how MCP works from the 2026-07-28 version.

stdio
: Standard input/output: the transport local MCP servers use to talk to their host.

Streamable HTTP
: The transport remote MCP servers use over the web.

Terminal
: A text window for typing commands.

Token
: A secret string an app sends to prove it's allowed to access a service.

Tool
: An action an MCP server lets the AI perform, such as creating an issue or sending a message.

Tool poisoning
: A malicious or manipulative instruction hidden in a server's tool descriptions.

Transport
: The channel messages travel over between an MCP client and server.

Typosquatting
: Publishing a package with a name that looks like a popular one, to trick people into installing it.

TypeScript
: JavaScript with type labels, used by the TypeScript SDK.

URI
: A general form of address, such as `file:///notes.txt` or `config://app`.

uv
: A fast Python tool for installing and running Python programs, used by many MCP servers.

uvx
: uv's command for downloading and running a Python tool in one step.

Workspace Trust
: VS Code's safety feature that blocks workspace servers until you trust the folder.

Zod
: A TypeScript library for describing and checking data shapes, used for tool inputs.
:::
