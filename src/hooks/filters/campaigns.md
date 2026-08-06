---
description: "Filter hooks for campaign data, processing stats, and scheduling in FluentCRM."
---

# Campaign Filters

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These filter hooks let you customize campaign data, processing behavior, and scheduling.

### `fluent_crm/campaign_data`

Filter the [Campaign](/database/models/campaign) model right before the campaign-detail endpoint
returns it. Runs on read only — it does not affect what is stored or sent.

**Parameters**
- `$campaign` [Campaign Model](/database/models/campaign)

**Usage:**
```php
add_filter('fluent_crm/campaign_data', function($campaign) {
    // Inject custom data into the campaign editor
    $campaign->custom_meta = 'value';
    return $campaign;
});
```

**Source:** `app/Http/Controllers/CampaignController.php`

---

### `fluent_crm/campaign_processing_stat_chunk`

Filter how many emails are processed per pass when the campaign screen polls for delivery stats.
Despite the name, this actually sends email — the stat endpoint drives the processor.

**Parameters**
- `$chunk` INT - Default `30`. Values below `1` are clamped to `1`.
- `$campaign` [Campaign Model](/database/models/campaign)

**Usage:**
```php
add_filter('fluent_crm/campaign_processing_stat_chunk', function($chunk, $campaign) {
    return 100;
}, 10, 2);
```

**Source:** `app/Http/Controllers/CampaignController.php`

---

### `fluent_crm/campaign_processing_stat_runtime_seconds`

Filter the max seconds the campaign stat-check request may spend processing emails.

**Parameters**
- `$seconds` INT - Default `10`. Values below `1` are clamped to `1`.
- `$campaign` [Campaign Model](/database/models/campaign)

**Usage:**
```php
add_filter('fluent_crm/campaign_processing_stat_runtime_seconds', function($seconds, $campaign) {
    return 30;
}, 10, 2);
```

**Source:** `app/Http/Controllers/CampaignController.php`

---

### `fluent_crm/five_minute_campaign_processing_chunk`

Filter the number of campaign emails materialized per chunk during the 5-minute cron batch.

**Parameters**
- `$chunk` INT - Default `50`. Values below `1` are clamped to `1`.
- `$campaign` [Campaign Model](/database/models/campaign) - the campaign being processed

**Usage:**
```php
add_filter('fluent_crm/five_minute_campaign_processing_chunk', function($chunk, $campaign) {
    return 100;
}, 10, 2);
```

::: tip
The run-time budget for this loop is not filterable here — it is
[`fluent_crm/max_run_time`](/hooks/filters/admin-and-dashboard#fluent-crm-max-run-time) minus 5
seconds.
:::

**Source:** `app/Hooks/Handlers/Scheduler.php`

---

## Sequences & Recurring Campaigns

<Badge type="danger" vertical="middle" text="Pro" />

### `fluent_crm/sequence_tracker_batch_limit`

Filter the batch size for processing email sequence tracking records.

**Parameters**
- `$limit` INT - Default `200`

**Usage:**
```php
add_filter('fluent_crm/sequence_tracker_batch_limit', function($limit) {
    return 500;
});
```

**Source:** `fluentcampaign-pro/app/Hooks/Handlers/EmailScheduleHandler.php`

---

### `fluent_crm/recurring_campaign_batch_limit`

Filter how many recurring campaigns are processed in a single scheduled batch.

**Parameters**
- `$limit` INT - Default `10`

**Usage:**
```php
add_filter('fluent_crm/recurring_campaign_batch_limit', function($limit) {
    return 20;
});
```

**Source:** `fluentcampaign-pro/app/Hooks/Handlers/RecurringCampaignHandler.php`

---

### `fluent_crm/campaign_action_limit`

Filter the number of subscribers processed per request during email campaign processing.

**Parameters**
- `$limit` INT - Default `50`

**Usage:**
```php
add_filter('fluent_crm/campaign_action_limit', function($limit) {
    return 100;
});
```

**Source:** `fluentcampaign-pro/app/Http/Controllers/CampaignsProController.php`

---

### `fluent_crm/email_campaign_export_data`

Filter email campaign data during export operations.

**Parameters**
- `$campaignData` Array - exported campaign data
- `$campaign` Campaign Model

**Usage:**
```php
add_filter('fluent_crm/email_campaign_export_data', function($campaignData, $campaign) {
    // Modify export data
    return $campaignData;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Hooks/Handlers/DataExporter.php`

---

### `fluent_crm/sms_campaign_export_data`

Filter SMS campaign data during export operations.

**Parameters**
- `$campaignData` Array - exported SMS campaign data
- `$campaign` Campaign Model

**Usage:**
```php
add_filter('fluent_crm/sms_campaign_export_data', function($campaignData, $campaign) {
    return $campaignData;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Hooks/Handlers/DataExporter.php`
