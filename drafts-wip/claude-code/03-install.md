# Install and Sign In

Installation takes about two minutes. Anthropic's recommended method is the **native installer**, which also keeps Claude Code up to date automatically.

:::summary In this chapter
- Installing on macOS, Linux, and Windows (native or WSL)
- Choosing a plan and logging in
- Checking that everything works, and fixing the most common install errors
- Updating, choosing a release channel, and uninstalling
:::

## Before you install

Claude Code runs on these systems:

| Requirement | Supported |
|---|---|
| macOS | 13.0 or newer |
| Windows | 10 version 1809 or newer, or Windows Server 2019+ |
| Linux | Ubuntu 20.04+, Debian 10+, Alpine 3.19+ |
| Hardware | 4 GB+ RAM, x64 or ARM64 processor |
| Shell | Bash, Zsh, PowerShell, or CMD |

You also need an internet connection, and you must be in one of Anthropic's supported countries.

## Install with the native installer

:::steps Install Claude Code
1. **Open a terminal.** See Chapter 2 if you're not sure how.
2. **Paste the command for your system and press Enter.**

   macOS, Linux, or WSL:

   ```bash
   curl -fsSL https://claude.ai/install.sh | bash
   ```

   Windows PowerShell:

   ```powershell
   irm https://claude.ai/install.ps1 | iex
   ```

   Windows Command Prompt (CMD):

   ```cmd
   curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
   ```
3. **Wait.** The installer shows no progress bar while it downloads. That's normal.
4. **Open a *new* terminal window** so it picks up the new program.
5. **Check the install.** Type `claude --version`. You should see a version number followed by `(Claude Code)`.
:::

> [!WARNING] "command not found"?
> If your terminal says `claude` isn't found or isn't recognized, the install folder isn't on your **PATH** yet. (The PATH is the list of folders your terminal searches for programs.) Close every terminal window and open a fresh one first. If it still fails, run the installer again and read its last few lines. It prints the exact fix. The full fix for each system is later in this chapter.

### Other ways to install

| Method | Command | Updates |
|---|---|---|
| Homebrew (Mac) | `brew install --cask claude-code` | Manual: `brew upgrade claude-code` |
| WinGet (Windows) | `winget install Anthropic.ClaudeCode` | Manual: `winget upgrade Anthropic.ClaudeCode` |
| npm (needs Node.js 22+) | `npm install -g @anthropic-ai/claude-code` | Manual |
| apt / dnf / apk (Linux) | See the setup page in the official docs | Through your system updates |

> [!CAUTION]
> Never install with `sudo npm install -g`. Running npm as an administrator causes permission problems and is a security risk.

## Notes for each operating system

### macOS

- The native installer puts the program at `~/.local/bin/claude`.
- The Homebrew cask `claude-code` follows the **stable** release channel; `claude-code@latest` follows **latest**. Pick one, not both.
- macOS uses Zsh by default, so PATH fixes go in `~/.zshrc`.

### Windows

You can run Claude Code natively or inside **WSL** (Windows Subsystem for Linux, a built-in way to run Linux on Windows). Pick based on where your projects live:

| Option | Needs | Sandbox support | Use it when |
|---|---|---|---|
| Native Windows | Nothing; Git for Windows optional | No | Your projects and tools are Windows-native |
| WSL 2 | WSL 2 enabled | Yes | You use Linux tools or want the command sandbox |
| WSL 1 | WSL 1 enabled | No | WSL 2 isn't available |

- You do **not** need to run the installer as Administrator.
- Installing **Git for Windows** (from git-scm.com) is recommended. It gives Claude Code a Bash shell to run commands with. Without it, Claude Code uses PowerShell instead, which also works.
- If you already use **WSL**, install from inside your WSL terminal using the macOS/Linux command, and launch `claude` there too.
- If Claude Code can't find Git Bash, point it there in your settings file (Chapter 15 explains settings files):

```json title=~/.claude/settings.json
{
  "env": {
    "CLAUDE_CODE_GIT_BASH_PATH": "C:\\Program Files\\Git\\bin\\bash.exe"
  }
}
```

### Linux

- Most distributions need nothing extra. The program lands in `~/.local/bin/claude`.
- On **Alpine** and other musl-based systems, install the helpers first, then tell Claude Code to use the system copy of `ripgrep` (the fast search tool it relies on):

```bash
apk add bash curl libgcc libstdc++ ripgrep
```

```json title=~/.claude/settings.json
{
  "env": { "USE_BUILTIN_RIPGREP": "0" }
}
```

## Choose a plan

Claude Code needs a paid account. Prices below are from claude.com/pricing in October 2026:

| Plan | Price | Who it's for |
|---|---|---|
| Free | $0 | Chat only, **no Claude Code** |
| Pro | $20/month ($17/month billed yearly) | Learning and light daily use |
| Max 5x | $100/month | Heavy daily use: 5× Pro's usage |
| Max 20x | $200/month | All-day use: 20× Pro's usage |
| Team | $25/seat/month Standard, $125 Premium (less yearly) | Small teams, 2–150 people |
| Enterprise | Custom | Large organizations |
| Console (API) | Pay per use | Developers who prefer metered billing |

> [!TIP]
> Start with **Pro**. If you regularly hit your usage limit, upgrade to Max later. Inside Claude Code, `/usage` shows how much of your limit you've used.

## Log in for the first time

:::steps Sign in
1. **Go to your project folder.** For example: `cd ~/my-first-project`.
2. **Start Claude Code.** Type `claude` and press <kbd>Enter</kbd>.
3. **Pick a theme.** Use the arrow keys to choose light or dark.
4. **Choose how to log in.** Pick your Claude subscription (Pro/Max/Team/Enterprise) or Anthropic Console.
5. **Approve in your browser.** A browser window opens; click **Authorize**. Return to the terminal.
6. **Trust the folder.** Claude Code asks whether you trust the files in this folder. For your own projects, choose **Yes**.
:::

You only log in once; Claude Code remembers your credentials. To switch accounts later, type `/login` inside Claude Code.

> [!TIP]
> If the browser doesn't open, press <kbd>c</kbd> at the login screen to copy the sign-in link, then paste it into any browser. This also helps over SSH (a remote connection to another computer) or inside WSL, where the browser may open on a different machine.

### Signing in from the command line

You can manage your login without starting a session:

| Command | What it does |
|---|---|
| `claude auth login` | Sign in (add `--console` to use Console billing) |
| `claude auth logout` | Sign out |
| `claude auth status` | Show whether you're signed in |

## Health check and updates

- `claude doctor` checks your installation and settings and suggests fixes. Run it whenever something feels off.
- Native installs **update themselves** in the background. To update right now: `claude update`.
- Prefer slower, battle-tested releases? Type `/config` and set **Auto-update channel** to **stable** (about a week behind, skipping releases with major bugs).

> [!NOTE]
> A brand-new model can need a newer Claude Code than the stable channel offers. If `/model` says a model isn't supported, switch back to the **latest** channel or run `claude update`.

## Fixing "command not found"

The installer places `claude` in a folder called `.local/bin` inside your home folder. If your shell doesn't search that folder, add it to your PATH once.

:::steps Fix your PATH on Mac or Linux
1. **Check the program is there.** Run `ls -la ~/.local/bin/claude`. If it says "No such file," the install didn't finish; run the installer again.
2. **Add the folder to your PATH.** For Zsh (the Mac default):
   ```bash
   echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```
   For Bash on Linux, use `~/.bashrc` instead of `~/.zshrc`. For Bash on a Mac, use `~/.bash_profile`.
3. **Test it.** Run `claude --version`.
:::

:::steps Fix your PATH on Windows PowerShell
1. **Check the program is there.** Run `Test-Path "$env:USERPROFILE\.local\bin\claude.exe"`. It should print `True`.
2. **Add the folder to your user PATH.**
   ```powershell
   $p = [Environment]::GetEnvironmentVariable('PATH', 'User')
   [Environment]::SetEnvironmentVariable('PATH',
     "$p;$env:USERPROFILE\.local\bin", 'User')
   ```
3. **Restart the terminal and test it.** Run `claude --version`. If your terminal lives inside an editor such as VS Code, quit and reopen the editor.
:::

## Common install errors

:::compact
| What you see | What it means and what to do |
|---|---|
| `command not found: claude` / `'claude' is not recognized` | PATH problem. Open a new window, then follow the PATH fix above |
| `'irm' is not recognized` | You're in CMD, not PowerShell. Use the CMD command, or open PowerShell |
| `The token '&&' is not a valid statement separator` | You're in PowerShell. Use the PowerShell command |
| `'bash' is not recognized` or `parameter name 'fsSL'` | You pasted the Mac/Linux command into Windows. Use a Windows command |
| `syntax error near unexpected token '<'` | The download returned a web page, not the script (often a proxy or network filter). Check your connection and retry |
| `Killed` during install on Linux | Not enough memory. Close programs or add swap space, then rerun |
| `EACCES: permission denied` | The install folder isn't writable by you. Fix its permissions; don't use `sudo` with npm |
| `unable to get local issuer certificate` | A company network inspects traffic. Ask IT for its certificate setup |
| `App unavailable in region` | Claude Code isn't offered in your country |
| `Claude Code does not support 32-bit Windows` | Open the normal Windows PowerShell, not the "(x86)" one |
:::

### Login problems

| Problem | Fix |
|---|---|
| Login keeps failing for no clear reason | Type `/logout`, close Claude Code, run `claude`, and sign in again |
| `OAuth error: Invalid code` | The code expired or was cut off when copied. Retry quickly; press <kbd>c</kbd> to copy the full link |
| Browser won't open in WSL | Run `export BROWSER="/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"` (or your browser's path), then `claude` |
| Pasting the code does nothing | Try your terminal's other paste shortcut (right-click, or <kbd>Shift</kbd> + <kbd>Insert</kbd>), or use `claude auth login` |
| `403 Forbidden` or "access has not been granted" | Your account or organization role doesn't include Claude Code. Check your plan, or ask your admin |

## Uninstalling

If you ever want to remove Claude Code, use the method that matches how you installed it:

| Installed with | Remove with |
|---|---|
| Native installer (Mac/Linux/WSL) | `rm -f ~/.local/bin/claude` and `rm -rf ~/.local/share/claude` |
| Homebrew | `brew uninstall --cask claude-code` |
| WinGet | `winget uninstall Anthropic.ClaudeCode` |
| npm | `npm uninstall -g @anthropic-ai/claude-code` |

> [!CAUTION]
> Your settings, history, and memory live in `~/.claude` and `~/.claude.json`. Deleting them erases all your preferences, MCP servers, and saved conversations. Only remove them if you want a completely clean slate.

:::checklist
- `claude --version` prints a version number
- I'm signed in with a paid plan or a Console account
- I trusted my practice folder
- I know `claude doctor` checks my setup and `claude update` updates it
:::
