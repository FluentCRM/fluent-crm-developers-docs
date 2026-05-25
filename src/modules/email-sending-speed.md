---
title: Email Sending Speed
description: "How FluentCRM sends campaign emails, why sending can feel slow, and how to speed it up — the emails-per-second setting, multi-threading, real cron, and parallel WP-CLI senders."
---

# Email Sending Speed

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Performance" />

If a campaign is "trickling out" — taking hours to send when your email provider could go much faster — this guide explains **why**, and walks through the levers that actually make it faster.

The short version: sending speed is usually decided by two things — **how fast each email leaves your server**, and **how many emails are being sent at the same time**. Your hosting matters too: a powerful server can run many senders at once, while a small or shared host is limited to a slower, steady pace (which is completely fine for most lists). Once you know which of these applies to you, the fixes are straightforward.

## How sending works

When you send a campaign, FluentCRM doesn't blast every email at once. It:

1. **Queues** every recipient as an individual email record.
2. A background process (driven by cron) wakes up, **claims a small batch**, and sends them **one at a time** through your connected email service (Amazon SES, Mailgun, SendGrid, your SMTP, etc.).
3. When a batch finishes, it grabs the next one, and so on until the queue is empty.

The speed you actually get is decided by this simple relationship:

> **Total speed = (how many senders run at once) × (how fast each sender pushes one email)**

Everything below is about increasing one or both of those numbers.

## Why your sending can feel slow

Here are the usual culprits, roughly in order of how often they're the real problem.

### 1. Each email is a round-trip to your provider

Every email is handed off to your email service over the network, and FluentCRM waits for that service to accept it before moving to the next one. That hand-off typically takes anywhere from ~30 milliseconds to ~300+ milliseconds **each**, depending on:

- **Distance to your provider.** If your WordPress server is in one region (say, Europe) and your provider's endpoint is in another (say, US-East), every single email pays that long round-trip. This is the single most common hidden cause of slow sending.
- **Your provider's own response time** and whether you're using its API vs. plain SMTP.

A single sender doing 300 ms per email can only manage ~3 emails/second — no matter how powerful your server is.

### 2. Only one (or two) senders are running

By default, FluentCRM runs **one** sending process. With multi-threading enabled, it runs about **two**. So even if each sender is reasonably fast, you're limited to one or two lanes of traffic. This is why so many setups land "in the teens" per second and stall there.

### 3. Real cron isn't set up

WordPress's built-in "cron" only runs when someone visits your site. On a low-traffic site, sending stalls between visits and comes out in bursts. A real server cron fixes this (see [Set up real cron](#step-1-make-sure-real-cron-is-running)).

### 4. Your server's resources

How much your server can handle is a real limit — and for many sites, it's *the* limit. If you're on **shared hosting** or a small VPS (for example, 2 GB of RAM or a single CPU core), your server can only send so fast, and pushing it harder usually hurts more than it helps.

- On limited or shared hosting, sending in the **single digits to low teens per second is normal and perfectly fine** for most lists. It just means a large campaign takes a little longer.
- **Don't enable multi-threading or run multiple CLI workers on a small/shared server.** Each sender is a full WordPress process; running several can exhaust memory, trip your host's resource limits, or get your account throttled by the host. One steady sender is the right setup there.
- The faster options later in this guide assume a server with spare CPU and RAM — typically a VPS or dedicated server with multiple cores and 4 GB+ of RAM (8 GB+ for many parallel workers).

On the other hand, if you check your server and **CPU usage stays low while sending is slow, the server is *not* your bottleneck.** A near-idle CPU during a slow send is the classic sign that you're waiting on the network (cause #1) and just need more senders (cause #2).

::: tip How to spot your bottleneck in 30 seconds
Watch your server's CPU **and memory** while a campaign sends.
- **CPU/RAM are low + sending is slow** → you're network/parallelism-bound. Add senders (multi-threading or CLI workers) and reduce per-email latency.
- **CPU or RAM is maxed out** → you're server-bound. *Don't* add senders — that makes it worse. Reduce them, or move to a bigger server.
- **Shared hosting or ~2 GB RAM** → expect modest speeds and stick to a single sender. The scaling steps below are designed for servers with spare resources.
:::

## First, clear up the "Emails Per Second" setting

**Settings → Email Settings → Maximum Emails Per Second.**

This setting is a **speed limit, not a target.** It exists to stop FluentCRM from sending *faster* than your provider allows (so you don't get rate-limited or blocked). It can never make sending faster.

- Set it to **just under your provider's documented limit** (e.g. if your provider allows 90/sec, set it around 80–85).
- If you're only getting 10/sec with the limit set to 70, **raising it to 90 changes nothing** — you're not hitting the limit in the first place. The fix is more senders and lower per-email latency, covered below.

::: warning
Never set this *above* your provider's limit. You'll get throttling errors and bounced sends.
:::

## Step 1: Make sure real cron is running

WordPress's default cron is unreliable for steady sending because it only fires on page visits. Switch to a real server cron:

1. Add `define('DISABLE_WP_CRON', true);` to `wp-config.php`.
2. Add a server cron job that triggers WordPress every minute:

```cron
* * * * * wget -q -O - https://yoursite.com/wp-cron.php?doing_wp_cron >/dev/null 2>&1
```

This alone makes sending consistent. For high volume, the CLI approach in [Step 3](#step-3-parallel-sending-with-wp-cli-high-volume) is even better because it doesn't depend on web requests at all.

::: tip
New to WordPress cron, or want to confirm yours is set up correctly? See [Cron Job Basics & Checklist](https://docs.fluentcrm.com/fluentcrm-cron-job-basics-and-checklist) for a step-by-step walkthrough and a checklist to verify it's running.
:::

## Step 2: Enable Multi-Threading

This is the easiest speed boost and a good first step for most sites.

**Settings → Advanced Features → Enable Multi-Threading Email Sending.**

**What it does:** runs a second sending process in parallel, roughly **doubling** throughput. It automatically activates only when there are enough emails queued to be worth it.

**Recommended server requirements** (shown in the settings screen when you enable it):

- More than one CPU core
- At least 4 GB of RAM
- A high enough per-second sending limit from your provider
- PHP `max_execution_time` of around 50–60 seconds

::: tip
If your sending is already fast enough, you don't need this. Multi-threading helps most when you have large campaigns *and* the server headroom to run a second process.
:::

**The honest limitation:** multi-threading gives you about **two** senders. If each sender is slow (high per-email latency), two lanes still won't be fast. For serious volume, use the CLI approach next.

## Step 3: Parallel sending with WP-CLI (high volume)

This is the most powerful option: run **several** independent senders at once. Because each sender spends almost all its time waiting on the network, you can run many in parallel and use the CPU headroom you already have.

It uses the [`cli_send` command](/cli/#cli-send) and a small cron-driven script.

### Requirements

- [WP-CLI](https://wp-cli.org/) installed on your server
- A real server cron (see [Step 1](#step-1-make-sure-real-cron-is-running))
- Enough RAM — roughly budget for each worker being a full WordPress process; **8 GB+** is recommended for running several workers
- A provider sending limit high enough to make parallelism worthwhile
- At least **500 pending emails** for `cli_send` to start

### How it works

Each worker is launched with two distinguishing options so they cooperate instead of colliding:

- `--option_key` — a unique lock name per worker, so each one runs independently.
- `--offset` — where in the queue that worker starts reading, so workers don't all grab the same emails.

FluentCRM also claims each email atomically, so **workers never send duplicates**, even if their ranges overlap as the queue drains.

### Setup

**1. Create a dispatcher script** — `/usr/local/bin/fluentcrm-dispatch.sh`. It checks once whether there's work, and only then launches the workers (so an idle server isn't doing repeated startup work):

```bash
#!/usr/bin/env bash
# Launch parallel FluentCRM email senders only when there's a queue.
WP="wp --path=/var/www/html"   # <-- set your WordPress path
WORKERS=5                       # number of parallel senders (see tuning below)
OFFSET_STEP=300                 # spacing between workers in the queue

# One lightweight check: how many emails are waiting?
PENDING=$($WP eval 'echo \FluentCrm\App\Services\Helper::getUpcomingEmailCount();' 2>/dev/null)

if [ "${PENDING:-0}" -ge 500 ]; then
  for i in $(seq 1 "$WORKERS"); do
    OFFSET=$(( (i - 1) * OFFSET_STEP ))
    $WP fluent_crm cli_send \
        --force=yes \
        --option_key="fc_send_${i}" \
        --offset="${OFFSET}" \
        --min_pending=300 \
        --run_time=50 \
        --silent=yes &
  done
  wait
fi
```

Make it executable:

```bash
chmod +x /usr/local/bin/fluentcrm-dispatch.sh
```

**2. Run it every minute via cron:**

```cron
* * * * * /usr/local/bin/fluentcrm-dispatch.sh >/dev/null 2>&1
```

Each run sends for ~50 seconds, then the next minute's run picks up where it left off. When the queue is empty, the dispatcher does a single quick check and exits — it does **not** hammer your database looking for work.

### Choosing the number of workers

Don't guess — measure:

1. Run a **single** worker against a real campaign and watch its `Sent N` output:
   ```bash
   wp fluent_crm cli_send --force=yes
   ```
2. Note how many emails per second that one worker achieves (e.g. 5/sec).
3. **Workers needed ≈ your target speed ÷ one worker's speed.** For 40/sec at 5/sec per worker, that's ~8 workers.
4. **Keep `workers × per-worker speed` below your provider's limit**, or you'll get throttled.

::: tip Keep multi-threading / cron sending on too
CLI workers stop working on the *tail* of a campaign once the queue drops below the minimum (a few hundred emails). The normal cron-driven sender finishes those last few. So leave regular sending enabled — the two work together.
:::

## Reduce per-email time

More senders multiply your speed; reducing per-email latency multiplies what *each* sender can do. Two high-impact moves:

- **Host your WordPress server in the same region as your email provider's endpoint.** If your provider is in `us-east-1`, a US-East server will send dramatically faster than one across an ocean. This often gives a 4–6× per-sender improvement on its own.
- **Use your provider's API connection rather than plain SMTP.** API connections (for example, the Amazon SES API in FluentSMTP) reuse the connection and skip the per-email handshake that SMTP repeats every time.

## Quick troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Set 70/sec but only getting ~10 | The setting is a *limit*, not a target | Add senders ([multi-threading](#step-2-enable-multi-threading) / [CLI workers](#step-3-parallel-sending-with-wp-cli-high-volume)); reduce latency |
| CPU stays low but sending is slow | Network/parallelism-bound, not server-bound | More senders + closer provider region |
| Sending stalls when no one visits the site | Relying on WordPress pseudo-cron | [Set up real cron](#step-1-make-sure-real-cron-is-running) |
| Multi-threading on, still only ~teens/sec | Only ~2 senders; each is latency-bound | Move to [CLI workers](#step-3-parallel-sending-with-wp-cli-high-volume) and reduce per-email latency |
| Worried about duplicate emails with multiple workers | — | Not possible; emails are claimed atomically before sending |

## See also

- [Cron Job Basics & Checklist](https://docs.fluentcrm.com/fluentcrm-cron-job-basics-and-checklist) — set up and verify WordPress cron
- [FluentCRM CLI — `cli_send`](/cli/#cli-send) — full command reference and arguments
