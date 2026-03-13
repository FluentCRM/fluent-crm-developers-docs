---
description: "Filter hooks for SMS campaigns in FluentCRM Pro — providers, batch processing, scheduling, and message content."
---

# SMS Campaign Filters

<Badge type="danger" vertical="top" text="FluentCRM Pro" /> <Badge type="warning" vertical="top" text="Intermediate" />

These filter hooks let you customize SMS campaign behavior — providers, processing limits, scheduling, and message content. All SMS hooks require FluentCRM Pro.

## Providers

### `fluent_crm_sms_providers`

Filter the list of available SMS providers. Use this to register custom SMS provider integrations.

**Parameters**
- `$providers` Array - Default `['twilio', 'aws_end_user_message']`

**Usage:**
```php
add_filter('fluent_crm_sms_providers', function($providers) {
    $providers[] = 'my_sms_service';
    return $providers;
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSHelper.php`

---

### `fluent_crm/sms_provider_definitions`

Filter SMS provider configuration definitions, including form fields and settings structure for each provider.

**Parameters**
- `$definitions` Array - provider config definitions

**Usage:**
```php
add_filter('fluent_crm/sms_provider_definitions', function($definitions) {
    $definitions['my_sms_service'] = [
        'label'  => 'My SMS Service',
        'fields' => [
            'api_key'    => ['type' => 'text', 'label' => 'API Key'],
            'api_secret' => ['type' => 'password', 'label' => 'API Secret']
        ]
    ];
    return $definitions;
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSHelper.php`

---

### `fluent_crm/sms_provider_select`

Filter the SMS provider selection dropdown configuration.

**Parameters**
- `$selectConfig` Array - dropdown options
- `$providerDefinitions` Array - full provider definitions

**Usage:**
```php
add_filter('fluent_crm/sms_provider_select', function($selectConfig, $providerDefinitions) {
    // Customize provider dropdown
    return $selectConfig;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSHelper.php`

---

## Campaign Data

### `fluent_crm/sms_campaign_data`

Filter SMS campaign data before processing or display.

**Parameters**
- `$campaign` Campaign Model

**Usage:**
```php
add_filter('fluent_crm/sms_campaign_data', function($campaign) {
    // Modify campaign data
    return $campaign;
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/Http/Controllers/SMSController.php`

---

### `fluent_crm/parse_campaign_sms_text`

Filter SMS message content before sending. Use this to add custom smart code replacements for SMS messages.

**Parameters**
- `$smsContent` String - SMS message text
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_filter('fluent_crm/parse_campaign_sms_text', function($smsContent, $subscriber) {
    // Replace custom smart codes in SMS
    $smsContent = str_replace('{membership_level}',
        get_user_meta($subscriber->user_id, 'level', true),
        $smsContent
    );
    return $smsContent;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSScheduler.php`

---

## Processing Limits

### `fluent_crm/sms_campaign_action_limit`

Filter the number of subscribers processed per SMS campaign action request.

**Parameters**
- `$limit` INT - Default `50`

**Usage:**
```php
add_filter('fluent_crm/sms_campaign_action_limit', function($limit) {
    return 100;
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/Http/Controllers/SMSController.php`

---

### `fluent_crm/sms_process_subscribers_per_request`

Filter the SMS subscriber batch size per processing request.

**Parameters**
- `$limit` INT - Default `30`

**Usage:**
```php
add_filter('fluent_crm/sms_process_subscribers_per_request', function($limit) {
    return 50;
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSHandler.php`

---

### `fluent_crm/sms_scheduler_chunk_size`

Filter the SMS scheduling chunk size for batch processing.

**Parameters**
- `$chunkSize` INT - chunk size
- `$scheduler` Object - SMS Scheduler instance

**Usage:**
```php
add_filter('fluent_crm/sms_scheduler_chunk_size', function($chunkSize, $scheduler) {
    return 50;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSScheduler.php`

---

### `fluent_crm/sms_scheduler_max_processing_seconds`

Filter the maximum time (in seconds) the SMS scheduler can run per execution.

**Parameters**
- `$maxSeconds` INT - max processing time
- `$scheduler` Object - SMS Scheduler instance

**Usage:**
```php
add_filter('fluent_crm/sms_scheduler_max_processing_seconds', function($maxSeconds, $scheduler) {
    return 30;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSScheduler.php`

---

### `fluent_crm/disable_sms_processing`

Completely disable SMS processing when set to `true`. Useful for maintenance windows.

**Parameters**
- `$shouldDisable` Boolean - Default `false`

**Usage:**
```php
add_filter('fluent_crm/disable_sms_processing', function($shouldDisable) {
    return true; // Pause all SMS sending
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSScheduler.php`
