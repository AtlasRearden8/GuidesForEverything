# Setting Up Your Computer

Time to build your workshop. You'll install three free tools: **Python** (the programming language your bot is written in), **VS Code** (an editor for writing code), and **Claude Code** (an AI assistant that writes, explains, and reviews code with you).

:::summary In this chapter
- Installing Python 3 and VS Code
- Creating a project folder and a virtual environment
- Installing Claude Code and teaching it about your project
- Prompts for using AI as a careful coding partner
:::

## Install Python {{Free}}

:::steps Install Python
1. **Download it.** Go to python.org/downloads and download the latest Python 3 release for your system. Use Python **3.12 or newer**: the current versions of pandas and vectorbt need at least 3.11.
2. **Windows: tick "Add python.exe to PATH".** This box is on the first installer screen. It lets your terminal find Python.
3. **Mac: run the installer package.** Then open **Terminal** (press <kbd>Cmd</kbd> + <kbd>Space</kbd> and type Terminal).
4. **Check it worked.** Open a new terminal window and type `python3 --version` (on Windows, `python --version`). You should see a version number.
:::

A **terminal** is a window where you type commands instead of clicking. You'll only need a handful of commands, and each is explained.

## Install VS Code {{Free}}

Download Visual Studio Code from code.visualstudio.com and install it. Then open it, click the **Extensions** icon in the left bar, search for **Python**, and install the extension published by Microsoft. It adds colour, error hints, and a way to run scripts.

## Create your project

:::steps Create the project folder
1. **Make a folder.** In your terminal:
   ```bash
   mkdir trading-bot
   cd trading-bot
   ```
2. **Create a virtual environment.** A **virtual environment** is a private box of Python libraries for this one project, so it can't clash with anything else on your computer.
   ```bash
   python3 -m venv .venv
   ```
3. **Turn it on (activate it).** On Mac or Linux:
   ```bash
   source .venv/bin/activate
   ```
   On Windows PowerShell:
   ```powershell
   .venv\Scripts\Activate.ps1
   ```
   Your prompt now starts with `(.venv)`. Do this every time you open a new terminal for the project.
4. **Install the libraries.**
   ```bash
   pip install alpaca-py pandas python-dotenv requests pytest
   ```
5. **Open the folder in VS Code.** Use [[File > Open Folder]] and pick `trading-bot`. When VS Code asks which Python to use, choose the one inside `.venv`.
:::

Here's what each library does:

| Library | Job |
|---|---|
| `alpaca-py` | Talks to Alpaca: prices, account, orders |
| `pandas` | Tables of prices, averages, and statistics |
| `python-dotenv` | Loads secret keys from a `.env` file |
| `requests` | Sends alert messages over the internet |
| `pytest` | Runs automatic tests of your code |

Save the list so you (or a server) can reinstall it exactly:

```bash
pip freeze > requirements.txt
```

## Use Git from day one

**Git** keeps a history of every change to your code, so you can undo mistakes. Install it from git-scm.com, then in your project folder:

```bash
git init
```

Create a file named `.gitignore` so secrets and junk never get saved into history:

```text title=.gitignore
.venv/
.env
state.json
logs/
__pycache__/
KILL_SWITCH
```

> [!CAUTION]
> The line `.env` is the most important line in that file. Your `.env` file will hold API keys. If it's ever pushed to GitHub, assume the keys are stolen and delete them at the broker immediately.

## Install Claude Code

Claude Code is an AI coding agent that works inside your project folder. It needs a paid Claude plan (Pro or higher) or an Anthropic Console account. On macOS, Linux, or WSL:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

On Windows PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

Open a new terminal, go to your project folder, and type `claude`. Follow the login steps in your browser. (The companion manual *Claude Code* covers this in depth.)

## Teach Claude about your project

Claude Code reads a file named `CLAUDE.md` in your project at the start of every session. Use it to set ground rules:

```markdown title=CLAUDE.md
# Trading bot project rules
- This bot trades REAL money if misconfigured. Be careful.
- Always default to Alpaca PAPER trading (paper=True).
- Never print, log, or commit API keys. Secrets live in .env only.
- Only bot/orders.py may submit orders.
- Every order must pass bot/risk.py checks first.
- Write a pytest test for every new rule or signal.
- Explain changes in plain English for a beginner.
- Never add margin, shorting, options, or leverage.
```

Then block Claude from reading your secrets file. Create `.claude/settings.json`:

```json title=.claude/settings.json
{
  "permissions": {
    "deny": [
      "Read(./.env)"
    ]
  }
}
```

## Working with AI safely

AI is a superb tutor and a fast typist, but it can be confidently wrong, especially about library details that changed recently. Use it like this:

- **Ask it to explain before it writes.** "Explain how you'll do this, then wait."
- **Make it test.** Ask for a test with every function.
- **Ask for a review.** A second pass catches many bugs.
- **Check names against the docs.** If an import fails, paste the error back and ask it to check the library's current documentation.

```prompt
I'm a complete beginner building a Python trading bot with alpaca-py
on a PAPER account. Read CLAUDE.md first. Explain, in plain English,
what files a simple daily bot needs and what each one does. Don't
write any code yet.
```

```prompt
Review bot/risk.py like a cautious senior engineer. List every way
this code could let through a trade that is too big, repeated, or
on the wrong symbol. Then write pytest tests for each case.
```

:::checklist
- `python3 --version` shows 3.12 or newer
- VS Code is installed with the Python extension
- My project has a `.venv` and the libraries installed
- `.gitignore` lists `.env`
- Claude Code starts in my project and has a `CLAUDE.md`
- Claude is denied from reading `.env`
:::

