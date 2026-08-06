---
description: "Filter hooks for SMS campaigns in FluentCRM Pro — providers, batch processing, scheduling, and message content."
---

# SMS Campaign Filters

<Badge type="danger" vertical="top" text="FluentCRM Pro" /> <Badge type="warning" vertical="top" text="Intermediate" />

These filter hooks let you customize SMS campaign behavior — providers, processing limits, scheduling, and message content. All SMS hooks require FluentCRM Pro.

## Providers

::: tip Providers are registered, not filtered
There is no filter for the SMS provider list. Providers are driver classes registered on the
[`fluent_crm/register_sms_providers`](/hooks/actions/sms#fluent-crm-register-sms-providers) action —
the driver's own `getSlug()`, `getLabel()` and `getFields()` supply the slug, the dropdown label
and the settings form fields. See that action for a full custom-driver example.
:::

## Campaign Data

### `fluent_crm/sms_campaign_data`

Filter a single SMS campaign right before it is returned by the campaign-detail endpoint. Runs on
read only — it does not affect what is stored or sent.

**Parameters**
- `$campaign` SMSCampaign Model - also carries a `server_time` attribute set just before the filter runs

**Usage:**
```php
add_filter('fluent_crm/sms_campaign_data', function($campaign) {
    // Modify campaign data
    return $campaign;
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/Http/Controllers/SMSController.php`

---

### `fluent_crm/parse_sms_smartcode`

Filter SMS message content after the shared smartcode parser has run, but before the message is
converted to plain text and sent. Use this to add custom smart code replacements for SMS messages.

**Parameters**
- `$content` String - the parsed SMS message text
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_filter('fluent_crm/parse_sms_smartcode', function($content, $subscriber) {
    // Replace custom smart codes in SMS
    $content = str_replace('{{membership_level}}',
        get_user_meta($subscriber->user_id, 'level', true),
        $content
    );
    return $content;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSHelper.php`

---

### `fluent_crm/parse_whatsapp_smartcode`

The WhatsApp counterpart of `fluent_crm/parse_sms_smartcode`. Fires when WhatsApp message content
is parsed for a contact.

**Parameters**
- `$content` String - the parsed WhatsApp message text
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_filter('fluent_crm/parse_whatsapp_smartcode', function($content, $subscriber) {
    return $content;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/WhatsAppHelper.php`

---

### `fluent_crm/sms_opt_in_confirmation_message`

Filter the confirmation message sent back to a contact when they opt **in** to SMS by replying to a
keyword (for example `START`).

**Parameters**
- `$messageContent` String - the confirmation message
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$data` Array - the inbound webhook payload

**Usage:**
```php
add_filter('fluent_crm/sms_opt_in_confirmation_message', function($messageContent, $subscriber, $data) {
    return 'Welcome back, ' . $subscriber->first_name . '!';
}, 10, 3);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSHelper.php`

---

### `fluent_crm/sms_opt_out_confirmation_message`

Filter the confirmation message sent back to a contact when they opt **out** of SMS by replying to a
keyword (for example `STOP`).

**Parameters**
- `$messageContent` String - the confirmation message
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$data` Array - the inbound webhook payload

**Usage:**
```php
add_filter('fluent_crm/sms_opt_out_confirmation_message', function($messageContent, $subscriber, $data) {
    return 'You are unsubscribed. Reply START to rejoin.';
}, 10, 3);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSHelper.php`

---

## Processing Limits

### `fluent_crm/sms_campaign_action_limit`

Filter the page size used when applying a bulk tag/list action to the recipients of an SMS campaign
(`SMSController::doTagActions()`). It sets both the `LIMIT` and the offset stride for each
`processing_page` pass.

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

Filter how many subscribers are turned into queued SMS messages per batch-generation request.

**Parameters**
- `$limit` INT - Default `30`. Values below `1` fall back to `30`.

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
- `$chunkSize` INT - Default `30`
- `$scheduler` `SMSScheduler` - the scheduler instance (still in its constructor, so its properties are at their defaults)

::: warning
Values of `0` or less are ignored — the scheduler keeps its default of `30`.
:::

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
- `$maxSeconds` INT - Default `30`
- `$scheduler` `SMSScheduler` - the scheduler instance (still in its constructor, so its properties are at their defaults)

::: warning
Values of `0` or less are ignored — the scheduler keeps its default of `30` seconds.
:::

**Usage:**
```php
add_filter('fluent_crm/sms_scheduler_max_processing_seconds', function($maxSeconds, $scheduler) {
    return 60;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSScheduler.php`

---

### `fluent_crm/disable_sms_processing`

Return `true` to make the SMS scheduler treat the system as not ready, so no queued SMS messages are
sent. Useful for maintenance windows. Messages stay queued and resume once the filter returns `false`
again — nothing is dropped.

**Parameters**
- `$shouldDisable` Boolean - Default `false`

**Usage:**
```php
add_filter('fluent_crm/disable_sms_processing', function($shouldDisable) {
    return true; // Pause all SMS sending
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSScheduler.php`
