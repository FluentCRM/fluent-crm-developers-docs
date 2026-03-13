# FluentCRM CLI

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Advanced" />

FluentCRM integrates with [WP-CLI](https://wp-cli.org/), enabling you to run CRM tasks via the command line — bulk syncing, sending emails, managing licenses, simulating automations, and more.

## Syntax

```bash
wp fluent_crm <command> [--argument=value]
```

For help on any command:

```bash
wp help fluent_crm <command>
```

---

## General

### `stats`

Displays overall FluentCRM statistics.

```bash
wp fluent_crm stats [--format=<format>]
```

| Argument | Description |
|----------|-------------|
| `--format` | Output format: `table` (default), `json`, `csv`, `yaml` |

Shows: total contacts, subscribed contacts, campaigns, automations, total/sent/scheduled emails, and max run time.

### `reindex_wp_user_ids`

Re-links FluentCRM contacts with their WordPress user accounts by matching email addresses. Corrects mismatches, adds missing links, and removes stale links for deleted WP users.

```bash
wp fluent_crm reindex_wp_user_ids
```

### `reset_db`

::: danger
Drops and recreates ALL FluentCRM database tables. This is irreversible and destroys all CRM data.
:::

Requires `WP_DEBUG` to be enabled. Includes double confirmation prompt.

```bash
wp fluent_crm reset_db
```

---

## Email Sending

### `cli_send`

Sends pending campaign emails via CLI, bypassing cron/Action Scheduler. Designed for high-volume sending on servers with adequate RAM (8GB+ recommended). Requires at least 500 pending emails to start.

```bash
wp fluent_crm cli_send [--force=yes] [--silent=yes] [--run_time=<seconds>] [--offset=<count>] [--min_pending=<count>]
```

| Argument | Default | Description |
|----------|---------|-------------|
| `--force` | — | Skip confirmation prompt |
| `--silent` | — | Suppress output (useful for cron scripts) |
| `--run_time` | `50` | Max seconds to run before stopping |
| `--offset` | `200` | Emails to process per batch |
| `--min_pending` | `300` | Stop when pending count drops below this |
| `--option_key` | `fluentcrm_is_sending_cli_emails` | WordPress option key used as mutex lock |

**Cron example:**

```bash
*/2 * * * * cd /path/to/wordpress && wp fluent_crm cli_send --force=yes --silent=yes
```

---

## Commerce Sync

### `sync_woo_customers`

<Badge type="danger" vertical="middle" text="Pro" />

Bulk-syncs all WooCommerce customers into FluentCRM's commerce relations. Displays order count summary and prompts for confirmation. Supports resuming partial syncs.

```bash
wp fluent_crm sync_woo_customers [--tags=<ids>] [--lists=<ids>] [--contact_status=<status>] [--event=<yes|no>]
```

| Argument | Default | Description |
|----------|---------|-------------|
| `--tags` | — | Comma-separated tag IDs to assign |
| `--lists` | — | Comma-separated list IDs to assign |
| `--contact_status` | `subscribed` | Status for new contacts. Use `pending` to send double opt-in |
| `--event` | `no` | Fire tag/list automation events during sync |

**Example:**

```bash
wp fluent_crm sync_woo_customers --tags=1,2 --lists=3 --contact_status=subscribed
```

### `disable_woo_sync`

<Badge type="danger" vertical="middle" text="Pro" />

Removes all WooCommerce commerce data synced into FluentCRM. Deletes all `fc_contact_relations` and `fc_contact_relation_items` records for the `woo` provider.

```bash
wp fluent_crm disable_woo_sync
```

### `sync_edd_customers`

<Badge type="danger" vertical="middle" text="Pro" />

Bulk-syncs all Easy Digital Downloads customers into FluentCRM. Same arguments as `sync_woo_customers`.

```bash
wp fluent_crm sync_edd_customers [--tags=<ids>] [--lists=<ids>] [--contact_status=<status>] [--event=<yes|no>]
```

### `disable_edd_sync`

<Badge type="danger" vertical="middle" text="Pro" />

Removes all EDD commerce data synced into FluentCRM.

```bash
wp fluent_crm disable_edd_sync
```

### `edd_stats`

<Badge type="danger" vertical="middle" text="Pro" />

Displays EDD-specific statistics from synced data. Requires data to have been synced first.

```bash
wp fluent_crm edd_stats --type=<type> [--product_id=<id|all>] [--period=<period>]
```

| Argument | Description |
|----------|-------------|
| `--type=overall` | Overall revenue and order totals |
| `--type=products` | All products with sales counts. Add `--product_id=ID` for one product or `--product_id=all` for all |
| `--type=license_stats` | License status breakdown (requires EDD Software Licensing) |
| `--type=license_sites` | Activated site counts by license |
| `--period` | Optional time period filter for product stats |

---

## EDD Tagging

### `edd_add_ltd_tag`

<Badge type="danger" vertical="middle" text="Pro" />

Finds all EDD license holders for a product with non-expiring (lifetime) licenses and applies a FluentCRM tag.

```bash
wp fluent_crm edd_add_ltd_tag --product=<product_id> --tag=<tag_id>
```

### `edd_add_price_tag`

<Badge type="danger" vertical="middle" text="Pro" />

Same as `edd_add_ltd_tag` but filtered by a specific EDD price variant.

```bash
wp fluent_crm edd_add_price_tag --product=<product_id> --price_id=<price_id> --tag=<tag_id>
```

---

## LearnDash Sync

### `sync_learndash_students`

<Badge type="danger" vertical="middle" text="Pro" />

Bulk-syncs all LearnDash students (users enrolled in any course or group) into FluentCRM.

```bash
wp fluent_crm sync_learndash_students [--tags=<ids>] [--lists=<ids>] [--contact_status=<status>] [--event=<yes|no>]
```

Same arguments as `sync_woo_customers`.

---

## Automation

### `simulate_funnel`

Fast-forwards a contact through an automation funnel, skipping wait times. Real actions still fire (tags applied, emails sent, etc.) — only delay durations are shortened. Prints a tree map of the funnel steps during execution.

```bash
wp fluent_crm simulate_funnel --funnel_id=<id> (--email=<email> | --subscriber_id=<id>) [--sleep=<seconds>] [--max_steps=<count>]
```

| Argument | Default | Description |
|----------|---------|-------------|
| `--funnel_id` | — | Funnel ID to simulate (required) |
| `--email` | — | Contact email address (required if no `--subscriber_id`) |
| `--subscriber_id` | — | Contact ID (required if no `--email`) |
| `--sleep` | `2` | Seconds between steps. Use `0` for step mode (one step per run) |
| `--max_steps` | `100` | Maximum steps to process in one run |

**Step mode** (`--sleep=0`): Processes exactly one step per invocation. Re-run the command to advance to the next step. Useful for debugging.

```bash
# Run the full funnel
wp fluent_crm simulate_funnel --funnel_id=123 --email=john@example.com

# Step-by-step debugging
wp fluent_crm simulate_funnel --funnel_id=123 --email=john@example.com --sleep=0
```

---

## License Management

### `activate_license`

<Badge type="danger" vertical="middle" text="Pro" />

Activates a FluentCRM Pro license key.

```bash
wp fluent_crm activate_license --key=<license_key>
```

### `license_status`

<Badge type="danger" vertical="middle" text="Pro" />

Displays current FluentCRM Pro license status and expiration date.

```bash
wp fluent_crm license_status
```
