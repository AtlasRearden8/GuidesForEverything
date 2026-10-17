
# Monitoring Agents

Hands-off doesn't mean eyes-off. A little monitoring tells you when an agent finished, when it got stuck on one of the prompts that never goes away, and what it actually did.

:::summary In this chapter
- Notifications when an agent needs you or finishes
- Logs and transcripts for each tool
- OpenTelemetry for dashboards
- A daily review routine
:::

## Get told when an agent needs you

### Claude Code: Notification and Stop hooks

The **Notification** hook fires on events such as `permission_prompt` (a prompt has waited about six seconds) and `idle_prompt` (Claude finished about 60 seconds ago and you haven't typed). The **Stop** hook fires when Claude finishes responding.

```json title=~/.claude/settings.json (excerpt)
{
  "hooks": {
    "Notification": [
      {
        "matcher": "permission_prompt",
        "hooks": [
          { "type": "command", "command": "~/bin/ping-phone.sh 'Needs you'" }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          { "type": "command", "command": "~/bin/ping-phone.sh 'Done'" }
        ]
      }
    ]
  }
}
```

The script can send anything you like. A simple version posts to a free push service such as ntfy:

```bash title=~/bin/ping-phone.sh
#!/usr/bin/env bash
curl -s -d "$1" https://ntfy.sh/my-secret-topic-name > /dev/null
```

> [!TIP]
> To run a hook the instant Claude asks for permission (rather than after six seconds), use the **PermissionRequest** hook instead.

### Other tools

| Tool | Notification option |
|---|---|
| **Codex CLI** | `notify = ["program", "args"]` runs on each completed turn; `tui.notifications` for terminal alerts |
| **ChatGPT desktop (Codex)** | Settings: turn-completion alerts never, in background, or always |
| **Cline** | "Enable notifications" in Auto Approve |
| **Aider** | `--notifications` (and `--notifications-command`) |
| **Devin Desktop** | Agent Command Center shows local and cloud agents in one view |
| **Cloud agents** | Pull requests, Slack, and email from the vendor |

## Logs and transcripts

| Tool | Where the record is |
|---|---|
| Claude Code | Session transcripts (`.jsonl`) under `~/.claude/projects/`; `--output-format json` in scripts |
| Codex | Session rollout files under `~/.codex/`; `codex exec --json` events |
| Copilot CLI | `--share=FILE` or `--share-gist` after a programmatic run |
| OpenHands | `--headless --json > run.jsonl` |
| GitHub Actions | The workflow run log |

Keep the JSON output of every unattended run. It's your audit trail, and it lets you ask an agent later: "read last night's log and tell me what went wrong."

## Dashboards with OpenTelemetry

**OpenTelemetry (OTel)** is a standard format for sending usage metrics and event logs to monitoring tools such as Grafana, Datadog, or Honeycomb. Claude Code supports it:

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=otlp
export OTEL_LOGS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
```

Set `OTEL_METRICS_EXPORTER=console` to see the data in your terminal first. Team and Enterprise admins also get usage analytics in the admin console, and API users see spend on the Claude Console usage page.

## A five-minute daily review

:::steps Review last night's agents
1. **Check notifications** for anything that got stuck.
2. **Open the pull requests** agents created; read the summaries and diffs.
3. **Skim the logs** for denied actions and repeated failures.
4. **Check spend** against your limits.
5. **Adjust**: add an allow rule for a repeated harmless prompt, or a deny rule for anything that worried you.
:::

:::checklist
- I get a phone or desktop alert when an agent needs me or finishes
- Every unattended run keeps a JSON log
- I review agent pull requests and spend daily
:::
