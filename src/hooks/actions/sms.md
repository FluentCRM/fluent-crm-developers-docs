---
description: "Action hooks for SMS campaigns in FluentCampaign Pro — campaign lifecycle, sending, delivery, and opt-in/out."
---

# Messaging Hooks (SMS & WhatsApp)

<Badge type="danger" vertical="top" text="FluentCampaign Pro" /> <Badge type="warning" vertical="top" text="Intermediate" />

These action hooks fire during messaging campaign lifecycle events, message sending, delivery tracking, and subscriber opt-in/out. All Messaging hooks require FluentCampaign Pro.

::: info Channel-specific hook names
Campaign lifecycle hooks are built from the channel: `fluent_crm/{channel}_campaign_created`, `_updated`, `_scheduled`, `_status_active`, `_duplicated`, `_archived`, `_deleted` and `_processing_start`, where `{channel}` is `sms` or `whatsapp`. Anything documented below as `sms_campaign_*` has a `whatsapp_campaign_*` twin with the same arguments.
:::

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Http/Controllers/MessageController.php`

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Http/Controllers/MessageController.php`

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Http/Controllers/MessageController.php`

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Http/Controllers/MessageController.php`

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Http/Controllers/MessageController.php`

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Http/Controllers/MessageController.php`

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Http/Controllers/MessageController.php`, `fluentcampaign-pro/app/Modules/Messaging/Handlers/MessageScheduler.php`

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Http/Controllers/MessageController.php`

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Handlers/MessageScheduler.php`

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Handlers/MessageScheduler.php`

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Handlers/MessageScheduler.php`

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Handlers/MessageScheduler.php`

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/SMS/SMSHelper.php`

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/SMS/SMSHelper.php`

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/WhatsApp/WhatsAppHelper.php`

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/WhatsApp/WhatsAppHelper.php`

---

## WhatsApp Inbound & Receipts

### `fluent_crm/whatsapp_message_received`

Fires after an inbound WhatsApp message has been stored in its conversation thread. The messaging
module ships no inbound automation trigger, so this is the extension point for reacting to
messages contacts send you. It fires for every stored inbound message, including keyword replies
such as `STOP` and `START`.

::: warning The contact may be null
`$subscriber` is `null` when the sender's number does not match a CRM contact, which is the common
case for a first contact. Always check it before use.
:::

**Parameters**
- `$record` Message Model - the stored inbound message (`direction` is `inbound`, `status` is `received`)
- `$subscriber` [Subscriber Model](/database/models/subscriber)|null - the contact who sent it, or `null` for an unknown number
- `$data` Array - the raw, normalized provider payload for the message

**Usage:**
```php
add_action('fluent_crm/whatsapp_message_received', function($record, $subscriber, $data) {
    if (!$subscriber) {
        return; // Unknown sender
    }

    if (stripos($record->content, 'pricing') !== false) {
        $subscriber->attachTags(['Asked About Pricing']);
    }
}, 10, 3);
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/WhatsApp/WhatsAppHelper.php`

---

### `fluent_crm/whatsapp_message_{type}`

Delivery-receipt hook built from the receipt type. It fires when a provider status webhook reports
that an outbound WhatsApp message was `delivered` or `read`, so the two concrete hooks are
`fluent_crm/whatsapp_message_delivered` and `fluent_crm/whatsapp_message_read`. The WhatsApp funnel
benchmarks listen on these. Other receipt types (such as `failed`) do not fire a hook of this form.

The hook fires after the message row has been updated, and fires even when an out-of-order receipt
did not change the stored status (for example a late `delivered` arriving after `read`).

**Parameters**
- `$message` Message Model - the outbound message, freshly reloaded after the receipt was applied

**Usage:**
```php
add_action('fluent_crm/whatsapp_message_read', function($message) {
    // The contact has read the message
    error_log('WhatsApp message #' . $message->id . ' was read');
});
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/WhatsApp/WhatsAppReceiver.php`

---

## Webhooks & Conversations

### `fluent_crm/messaging_webhook_rejected`

Fires when a messaging provider webhook is rejected before it reaches a receiver (a missing or
invalid provider, a missing or invalid webhook hash, a provider signature that does not verify, or a
request to the retired Twilio URL, which answers 410). The provider only sees a bare
HTTP error and nothing is written to the error log, so hook this when you need a trace of why a
webhook was refused. The request ends right after the action runs.

**Parameters**
- `$reason` String - human-readable reason, also sent as the response body
- `$provider` String - provider slug from the request; empty when the provider was the missing piece
- `$status` Integer - HTTP status code being returned
- `$detail` String - extra context for diagnostics only; never sent in the response

**Usage:**
```php
add_action('fluent_crm/messaging_webhook_rejected', function($reason, $provider, $status, $detail) {
    error_log(sprintf('Messaging webhook rejected (%s, HTTP %d): %s %s', $provider, $status, $reason, $detail));
}, 10, 4);
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Handlers/MessageHandler.php`

---

### `fluent_crm/messaging_thread_contact_linked`

Fires after an inbox conversation that had no contact is attached to a CRM contact from the admin
inbox. It does not fire when the conversation was already linked to that same contact.

**Parameters**
- `$thread` MessageThread Model - the conversation that was linked
- `$contact` [Subscriber Model](/database/models/subscriber) - the contact it was linked to

**Usage:**
```php
add_action('fluent_crm/messaging_thread_contact_linked', function($thread, $contact) {
    // React to a conversation being matched to a contact
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Http/Controllers/MessageThreadController.php`
