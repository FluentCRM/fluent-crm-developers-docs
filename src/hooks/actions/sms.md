---
description: "Action hooks for SMS campaigns in FluentCRM Pro — campaign lifecycle, sending, delivery, opt-in/out, and provider webhooks."
---

# SMS Campaign Hooks

<Badge type="danger" vertical="top" text="FluentCRM Pro" /> <Badge type="warning" vertical="top" text="Intermediate" />

These action hooks fire during SMS campaign lifecycle events, message sending, delivery tracking, and subscriber opt-in/out. All SMS hooks require FluentCRM Pro.

## Campaign Lifecycle

### `fluent_crm/sms_campaign_created`

Fires when a new SMS campaign is created.

**Parameters**
- `$campaign` Campaign Model

**Usage:**
```php
add_action('fluent_crm/sms_campaign_created', function($campaign) {
    // New SMS campaign created
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/Http/Controllers/SMSController.php`

---

### `fluent_crm/sms_campaign_updated`

Fires when an SMS campaign is updated.

**Parameters**
- `$campaign` Campaign Model

**Usage:**
```php
add_action('fluent_crm/sms_campaign_updated', function($campaign) {
    // SMS campaign was modified
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/Http/Controllers/SMSController.php`

---

### `fluent_crm/sms_campaign_status_active`

Fires when an SMS campaign is activated (changed from draft to active).

**Parameters**
- `$smsCampaign` Campaign Model

**Usage:**
```php
add_action('fluent_crm/sms_campaign_status_active', function($smsCampaign) {
    // SMS campaign activated
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/Http/Controllers/SMSController.php`

---

### `fluent_crm/sms_campaign_scheduled`

Fires when an SMS campaign is scheduled for future sending.

**Parameters**
- `$smsCampaign` Campaign Model
- `$scheduledAt` INT - Unix timestamp of scheduled send time

**Usage:**
```php
add_action('fluent_crm/sms_campaign_scheduled', function($smsCampaign, $scheduledAt) {
    // SMS campaign scheduled
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/Http/Controllers/SMSController.php`

---

### `fluent_crm/sms_campaign_processing_start`

Fires when SMS campaign processing begins (batch generation starts).

**Parameters**
- `$campaign` Campaign Model

**Usage:**
```php
add_action('fluent_crm/sms_campaign_processing_start', function($campaign) {
    // SMS campaign processing started
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/Http/Controllers/SMSController.php`

---

### `fluent_crm/sms_campaign_duplicated`

Fires when an SMS campaign is duplicated.

**Parameters**
- `$newCampaign` Campaign Model - the new copy
- `$oldCampaign` Campaign Model - the original

**Usage:**
```php
add_action('fluent_crm/sms_campaign_duplicated', function($newCampaign, $oldCampaign) {
    // SMS campaign was duplicated
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/Http/Controllers/SMSController.php`

---

### `fluent_crm/sms_campaign_archived`

Fires when an SMS campaign is archived (auto-archived after completion or timeout).

**Parameters**
- `$smsCampaign` Campaign Model

**Usage:**
```php
add_action('fluent_crm/sms_campaign_archived', function($smsCampaign) {
    // SMS campaign archived
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/Http/Controllers/SMSController.php`, `fluentcampaign-pro/app/Modules/SMS/SMSScheduler.php`

---

### `fluent_crm/sms_campaign_deleted`

Fires when an SMS campaign is permanently deleted.

**Parameters**
- `$campaignId` INT - deleted campaign ID

**Usage:**
```php
add_action('fluent_crm/sms_campaign_deleted', function($campaignId) {
    // SMS campaign deleted
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/Http/Controllers/SMSController.php`

---

## Sending & Delivery

### `fluent_crm/sms_sent`

Fires when an SMS message is successfully sent. The result contains provider-specific response data.

**Parameters**
- `$smsMessage` Object - SMS message data
- `$result` Mixed - provider response

**Usage:**
```php
add_action('fluent_crm/sms_sent', function($smsMessage, $result) {
    // SMS sent successfully
    // $result contains provider-specific response data
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSScheduler.php`

---

### `fluent_crm/sms_failed`

Fires when an SMS message fails to send.

**Parameters**
- `$smsMessage` Object - SMS message data
- `$errorMessage` String - error message from provider

**Usage:**
```php
add_action('fluent_crm/sms_failed', function($smsMessage, $errorMessage) {
    // SMS failed - log or retry
    error_log('SMS failed: ' . $errorMessage);
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSScheduler.php`

---

## Opt-in & Opt-out

### `fluent_crm/contact_sms_subscribed`

Fires when a contact opts in to receive SMS messages.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$data` Array - opt-in data

**Usage:**
```php
add_action('fluent_crm/contact_sms_subscribed', function($subscriber, $data) {
    // Contact opted in to SMS
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSHelper.php`

---

### `fluent_crm/contact_sms_unsubscribed`

Fires when a contact opts out of receiving SMS messages.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$data` Array - opt-out data

**Usage:**
```php
add_action('fluent_crm/contact_sms_unsubscribed', function($subscriber, $data) {
    // Contact opted out of SMS
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSHelper.php`

---

## Provider Webhooks

### `fluent_crm_sms_custom_provider_webhook`

Generic webhook hook for custom SMS providers. Fires when an incoming webhook is received for an unrecognized provider.

**Parameters**
- `$bodyData` Array - webhook request body
- `$provider` String - provider name

**Usage:**
```php
add_action('fluent_crm_sms_custom_provider_webhook', function($bodyData, $provider) {
    if ($provider === 'my_sms_service') {
        // Handle delivery receipt, status update, etc.
    }
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSReceiver.php`

---

### `fluent_crm_sms_{$provider}_webhook`

Provider-specific webhook hook. The hook name includes the provider slug (e.g., `fluent_crm_sms_twilio_webhook`).

**Parameters**
- `$bodyData` Array - webhook request body

**Usage:**
```php
add_action('fluent_crm_sms_twilio_webhook', function($bodyData) {
    // Handle Twilio-specific webhook event
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSReceiver.php`
