---
description: "Action hooks for SMS campaigns in FluentCRM Pro — campaign lifecycle, sending, delivery, opt-in/out, and provider webhooks."
---

# SMS Campaign Hooks

<Badge type="danger" vertical="top" text="FluentCRM Pro" /> <Badge type="warning" vertical="top" text="Intermediate" />

These action hooks fire during SMS campaign lifecycle events, message sending, delivery tracking, and subscriber opt-in/out. All SMS hooks require FluentCRM Pro.

## Provider Registration

### `fluent_crm/register_sms_providers`

Fires once while the SMS module boots, after the built-in Twilio and AWS drivers are registered.
Instantiate your own driver here — `AbstractSMSDriver`'s constructor registers itself with
`SMSDriverManager`, which is what feeds the provider dropdown and settings form.

This runs before the module's `isActive()` check, so the settings screen always lists your driver
even when SMS is not configured yet.

**Parameters**

_None._

**Usage:**
```php
use FluentCampaign\App\Modules\SMS\Providers\AbstractSMSDriver;

class MySMSDriver extends AbstractSMSDriver
{
    public function getSlug(): string
    {
        return 'my_sms_service';
    }

    public function getLabel(): string
    {
        return 'My SMS Service';
    }

    public function getFields(): array
    {
        return [
            'api_key'    => ['type' => 'text', 'label' => 'API Key'],
            'api_secret' => ['type' => 'password', 'label' => 'API Secret'],
        ];
    }

    public function send(string $to, string $message, array $settings): array
    {
        // Return ['status' => 'success', 'provider_message_id' => '...'] on success,
        // or ['status' => 'error', 'message' => '...'] on failure — the scheduler
        // checks $result['status'] === 'success' to mark the message sent.
    }
}

add_action('fluent_crm/register_sms_providers', function() {
    new MySMSDriver();
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSModule.php`

---

### `fluent_crm/register_whatsapp_providers`

WhatsApp counterpart of [`fluent_crm/register_sms_providers`](#fluent-crm-register-sms-providers).
Fires while the SMS module boots, after the built-in WhatsApp drivers are registered. Instantiate
your own driver here — `AbstractWhatsAppDriver`'s constructor registers itself with
`WhatsAppDriverManager`, which is what feeds the WhatsApp provider dropdown and settings form.

::: warning WhatsApp channel status
The WhatsApp channel is feature-flagged off in current Pro builds — the `do_action()` call in
`SMSModule::register()` is commented out and `WhatsAppHelper::isActive()` returns `false` — so this
hook does not fire yet. It is documented here as the registration point for third-party drivers once
the channel is enabled.
:::

**Parameters**

_None._

**Usage:**
```php
use FluentCampaign\App\Modules\SMS\Providers\AbstractWhatsAppDriver;

class MyWhatsAppDriver extends AbstractWhatsAppDriver
{
    public function getSlug(): string
    {
        return 'my_whatsapp_service';
    }

    public function getLabel(): string
    {
        return 'My WhatsApp Service';
    }

    public function getFields(): array
    {
        return [
            'api_key'    => ['type' => 'text', 'label' => 'API Key', 'required' => true, 'default' => ''],
            'api_secret' => ['type' => 'password', 'label' => 'API Secret', 'required' => true, 'default' => ''],
        ];
    }

    public function send(string $to, string $message, array $settings): array
    {
        // Return ['status' => 'success', 'status_code' => 200, 'message' => '...',
        // 'response' => $response, 'provider_message_id' => '...'] on success,
        // or ['status' => 'error', 'message' => '...'] on failure — the scheduler
        // checks $result['status'] === 'success' to mark the message sent.
    }
}

add_action('fluent_crm/register_whatsapp_providers', function() {
    new MyWhatsAppDriver();
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSModule.php`

---

## Campaign Lifecycle

### `fluent_crm/sms_campaign_created`

Fires when a new SMS campaign is created.

**Parameters**
- `$campaign` SMSCampaign Model

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
- `$campaign` SMSCampaign Model

**Usage:**
```php
add_action('fluent_crm/sms_campaign_updated', function($campaign) {
    // SMS campaign was modified
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/Http/Controllers/SMSController.php`

---

### `fluent_crm/sms_campaign_status_active`

Fires at the start of `SMSController::schedule()`, once the campaign has passed the "must still be a
draft" guard but **before** any status change is written.

::: warning
The campaign passed to this hook still has `status = 'draft'`. Re-read the model if you need the
post-schedule status.
:::

**Parameters**
- `$smsCampaign` SMSCampaign Model - still in `draft` status at this point

**Usage:**
```php
add_action('fluent_crm/sms_campaign_status_active', function($smsCampaign) {
    // SMS campaign activated
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/Http/Controllers/SMSController.php`

---

### `fluent_crm/sms_campaign_scheduled`

Fires when an SMS campaign is scheduled for future sending. It does **not** fire for a
send-immediately campaign — that path schedules the batch-generation job directly instead.

**Parameters**
- `$smsCampaign` SMSCampaign Model - freshly re-read from the database, so its `status` and `scheduled_at` are the saved values
- `$scheduledAt` String - the campaign's `scheduled_at` column, a site-local `Y-m-d H:i:s` datetime (not a Unix timestamp)

**Usage:**
```php
add_action('fluent_crm/sms_campaign_scheduled', function($smsCampaign, $scheduledAt) {
    // $scheduledAt is a MySQL datetime string, e.g. '2026-08-12 09:30:00'
    $timestamp = strtotime($scheduledAt);
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/Http/Controllers/SMSController.php`

---

### `fluent_crm/sms_campaign_processing_start`

Fires when a `pending-scheduled` campaign flips to `processing` — that is, when its scheduled time is
less than six minutes away and the admin screen polls for processing stats. The campaign has already
been saved with `status = 'processing'` and `recipients_count = 0` when this runs.

**Parameters**
- `$campaign` SMSCampaign Model - already saved as `processing`

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
- `$newCampaign` SMSCampaign Model - the new copy, created as a `draft` with a `[Duplicate] ` title prefix and the original's labels already attached
- `$oldCampaign` SMSCampaign Model - the original

**Usage:**
```php
add_action('fluent_crm/sms_campaign_duplicated', function($newCampaign, $oldCampaign) {
    // SMS campaign was duplicated
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/Http/Controllers/SMSController.php`

---

### `fluent_crm/sms_campaign_archived`

Fires when an SMS campaign is archived — either because a recurring/auto-processing campaign has no
future runs left, or by the cleanup cron when a finished campaign has no unsent messages remaining.
The campaign row is saved as `status = 'archived'` in all cases, but only the first two call sites
re-read the model before firing; on the cron path the model still carries its pre-archive status.

**Parameters**
- `$smsCampaign` SMSCampaign Model - the row is saved as `archived`, though on the cron path the passed instance may still show the previous status

**Usage:**
```php
add_action('fluent_crm/sms_campaign_archived', function($smsCampaign) {
    // SMS campaign archived
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/Http/Controllers/SMSController.php`, `fluentcampaign-pro/app/Modules/SMS/SMSScheduler.php`

---

### `fluent_crm/sms_campaign_deleted`

Fires after an SMS campaign is permanently deleted, both from the single-delete endpoint and once per
campaign from the `delete_campaigns` bulk action.

::: warning
The campaign row and its message/meta data are already gone when this fires — only the ID is passed.
Capture anything you need on `fluent_crm/sms_campaign_updated` instead.
:::

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

Fires after an SMS message is successfully sent, once the message row has been marked sent and the
campaign's `sent_count` incremented.

**Parameters**
- `$smsMessage` SMSMessage Model - the pre-update instance, so its `status` still reflects the value from before the send was recorded
- `$result` Array - the driver's response; carries `provider_message_id` when the provider returns one

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

Fires after an SMS message fails to send, once the message row has been marked `failed` and the
campaign's `failed_count` incremented.

**Parameters**
- `$smsMessage` SMSMessage Model - the pre-update instance, so its `status` still reflects the value from before the failure was recorded
- `$errorMessage` String - error message from the provider; also stored on the message's `notes` column

**Usage:**
```php
add_action('fluent_crm/sms_failed', function($smsMessage, $errorMessage) {
    // SMS failed - log or retry
    error_log('SMS failed: ' . $errorMessage);
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSScheduler.php`

---

### `fluent_crm/whatsapp_sent`

WhatsApp counterpart of [`fluent_crm/sms_sent`](#fluent-crm-sms-sent) — messages route here when
their `channel` is `whatsapp`. Fires after a WhatsApp message is successfully sent, once the message
row has been marked sent and the campaign's `sent_count` incremented. Note it fires **in addition
to** the generic `fluent_crm/sms_sent` (which runs for every channel), not instead of it — the same
applies to `whatsapp_failed` and `sms_failed`.

**Parameters**
- `$smsMessage` SMSMessage Model - the pre-update instance, so its `status` still reflects the value from before the send was recorded
- `$result` Array - the WhatsApp driver's response (`status`, `status_code`, `message`, `response`); carries `provider_message_id` when the provider returns one

**Usage:**
```php
add_action('fluent_crm/whatsapp_sent', function($smsMessage, $result) {
    // WhatsApp message sent successfully
    // $result contains provider-specific response data
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSScheduler.php`

---

### `fluent_crm/whatsapp_failed`

WhatsApp counterpart of [`fluent_crm/sms_failed`](#fluent-crm-sms-failed). Fires after a WhatsApp
message fails to send, once the message row has been marked `failed` and the campaign's
`failed_count` incremented. Pre-send guards that mark a message failed without attempting a send —
for example a contact whose `whatsapp_status` is not `whatsapp_subscribed` — do **not** fire this
hook.

**Parameters**
- `$smsMessage` SMSMessage Model - the pre-update instance, so its `status` still reflects the value from before the failure was recorded
- `$errorMessage` String - the driver response's `message`, or `Unknown error` when it carries none; also stored on the message's `notes` column

**Usage:**
```php
add_action('fluent_crm/whatsapp_failed', function($smsMessage, $errorMessage) {
    // WhatsApp send failed - log or retry
    error_log('WhatsApp failed: ' . $errorMessage);
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSScheduler.php`

---

## Opt-in & Opt-out

### `fluent_crm/contact_sms_subscribed`

Fires when an inbound message opts a contact in to SMS. The contact is matched by `phone`, so nothing
fires for an unknown number. The contact's `sms_status` is already saved as `sms_subscribed`.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber) - already saved with `sms_status = 'sms_subscribed'`
- `$data` Array - the inbound webhook context; includes a `provider` key

**Usage:**
```php
add_action('fluent_crm/contact_sms_subscribed', function($subscriber, $data) {
    // Contact opted in to SMS
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSHelper.php`

---

### `fluent_crm/contact_sms_unsubscribed`

Fires when an inbound message opts a contact out of SMS. The contact is matched by `phone`, so
nothing fires for an unknown number. The contact's `sms_status` is already saved as
`sms_unsubscribed`.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber) - already saved with `sms_status = 'sms_unsubscribed'`
- `$data` Array - the inbound webhook context; includes a `provider` key

**Usage:**
```php
add_action('fluent_crm/contact_sms_unsubscribed', function($subscriber, $data) {
    // Contact opted out of SMS
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSHelper.php`

---

### `fluent_crm/contact_whatsapp_subscribed`

WhatsApp counterpart of [`fluent_crm/contact_sms_subscribed`](#fluent-crm-contact-sms-subscribed).
Fires when an inbound WhatsApp message — a `start`/`subscribe` keyword arriving on the Twilio
WhatsApp or Meta Cloud webhook — opts a contact in to WhatsApp. The contact is matched by `phone`,
so nothing fires for an unknown number. The contact's `whatsapp_status` is already saved as
`whatsapp_subscribed`.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber) - already saved with `whatsapp_status = 'whatsapp_subscribed'`
- `$data` Array - the inbound webhook context; includes a `provider` key (`twilio_whatsapp` or `meta_cloud`)

**Usage:**
```php
add_action('fluent_crm/contact_whatsapp_subscribed', function($subscriber, $data) {
    // Contact opted in to WhatsApp
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/WhatsAppHelper.php`

---

### `fluent_crm/contact_whatsapp_unsubscribed`

WhatsApp counterpart of [`fluent_crm/contact_sms_unsubscribed`](#fluent-crm-contact-sms-unsubscribed).
Fires when an inbound WhatsApp message — a `stop`/`cancel`/`unsubscribe` keyword arriving on the
Twilio WhatsApp or Meta Cloud webhook — opts a contact out of WhatsApp. The contact is matched by
`phone`, so nothing fires for an unknown number. The contact's `whatsapp_status` is already saved as
`whatsapp_unsubscribed`.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber) - already saved with `whatsapp_status = 'whatsapp_unsubscribed'`
- `$data` Array - the inbound webhook context; includes a `provider` key (`twilio_whatsapp` or `meta_cloud`)

**Usage:**
```php
add_action('fluent_crm/contact_whatsapp_unsubscribed', function($subscriber, $data) {
    // Contact opted out of WhatsApp
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/WhatsAppHelper.php`

---

## Provider Webhooks

### `fluent_crm_sms_custom_provider_webhook`

Generic webhook hook for custom SMS providers. Fires when an incoming webhook is received for a
provider that has no built-in handler. The signature check has already passed and the payload is
sanitized by the time this runs.

::: warning
Built-in providers never reach this hook. `twilio`, `twilio_whatsapp` and `meta_cloud` are routed to
their own handlers in `SMSHandler`, so only providers registered through
[`fluent_crm/register_sms_providers`](#fluent-crm-register-sms-providers) fire it.
:::

**Parameters**
- `$bodyData` Array - the sanitized webhook request body
- `$provider` String - provider slug taken from the webhook URL

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

Provider-specific webhook hook, fired immediately after
`fluent_crm_sms_custom_provider_webhook`. The hook name includes the provider slug — for a driver
whose `getSlug()` returns `my_sms_service`, the hook is `fluent_crm_sms_my_sms_service_webhook`.

::: warning
Like the generic hook above, this only fires for custom providers. There is no
`fluent_crm_sms_twilio_webhook` — Twilio, Twilio WhatsApp and Meta Cloud are handled by their
built-in `SMSReceiver` methods and never reach this dispatcher.
:::

**Parameters**
- `$bodyData` Array - the sanitized webhook request body

**Usage:**
```php
add_action('fluent_crm_sms_my_sms_service_webhook', function($bodyData) {
    // Handle a delivery receipt or inbound reply from your own provider
});
```

**Source:** `fluentcampaign-pro/app/Modules/SMS/SMSReceiver.php`
