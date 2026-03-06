---
description: "Filter hooks for campaign data, processing stats, and scheduling in FluentCRM."
---

# Campaign Filters

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These filter hooks let you customize campaign data, processing behavior, and scheduling.

### `fluent_crm/campaign_data`

Filter the [Campaign](/database/models/campaign) data object before it is returned to the editor.

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

Filter the number of subscribers to process per iteration when checking campaign delivery stats.

**Parameters**
- `$chunk` INT - Default `30`
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

Filter the max seconds to run the campaign stat-check loop per request.

**Parameters**
- `$seconds` INT - Default `10`
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

Filter the number of campaign emails to process during the 5-minute cron batch.

**Parameters**
- `$chunk` INT - Default `20`
- `$campaign` [Campaign Model](/database/models/campaign) - The first campaign in queue

**Usage:**
```php
add_filter('fluent_crm/five_minute_campaign_processing_chunk', function($chunk, $campaign) {
    return 50;
}, 10, 2);
```

**Source:** `app/Hooks/Handlers/Scheduler.php`
