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

::: info One hook per message, named after the channel
The scheduler fires `fluent_crm/{channel}_sent` or `fluent_crm/{channel}_failed` exactly once per
outbound message, where `{channel}` is the conversation thread's `channel` (`sms` or `whatsapp`). A
WhatsApp message fires the `whatsapp_*` hook **instead of** the `sms_*` one, never both. A channel
registered by an add-on gets its own `fluent_crm/{slug}_sent` and `_failed` the same way.

`$message` is a `Message` model (an `fc_messages` row), already updated when the hook runs. The
channel, destination number and contact hang off `$message->thread` (`channel`, `phone_number`,
`contact_id`, and `->subscriber`). Legacy listeners written against the old `SMSMessage` model
should read `$message->thread->phone_number` instead of `mobile_number`, and the error text from
`$message->meta['error_message']` instead of `notes`.
:::

### `fluent_crm/sms_sent`

Fires after an SMS message is successfully sent. By the time the listener runs, the message row has
been updated and the campaign's `sent_count` incremented.

**Parameters**
- `$message` Message Model - already updated: `status` is `sent`, `sent_at` and `updated_at` are set, and `provider_message_id` is filled when the provider returned one
- `$result` Array - the driver's response: `status` (`success`), `status_code`, `message`, `response`, and `provider_message_id` when the provider returns one

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

Fires after an SMS message fails, once the message row has been marked `failed` and the campaign's
`failed_count` incremented. It fires on **every** failure path: pre-send guards that never reach
the provider (no conversation thread, no phone number, unknown channel, or a contact who is not
subscribed on the channel), a provider error response, and an exception thrown during the send.

**Parameters**
- `$message` Message Model - already updated: `status` is `failed` and `meta['error_message']` holds the reason
- `$errorMessage` String - the guard's reason, the driver response's `message` (or `Unknown error` when it carries none), or the exception message

**Usage:**
```php
add_action('fluent_crm/sms_failed', function($message, $errorMessage) {
    // SMS failed - log or retry
    error_log('SMS failed: ' . $errorMessage);
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Handlers/MessageScheduler.php`

---

### `fluent_crm/whatsapp_sent`

WhatsApp counterpart of [`fluent_crm/sms_sent`](#fluent-crm-sms-sent): a message fires this hook
when its thread's `channel` is `whatsapp`, and does **not** fire `fluent_crm/sms_sent`. It runs
after the message row has been marked sent and the campaign's `sent_count` incremented, and fires
once per message.

**Parameters**
- `$message` Message Model - already updated: `status` is `sent`, `sent_at` and `updated_at` are set, and `provider_message_id` is filled when the provider returned one
- `$result` Array - the WhatsApp driver's response (`status`, `status_code`, `message`, `response`); carries `provider_message_id` when the provider returns one

**Usage:**
```php
add_action('fluent_crm/whatsapp_sent', function($message, $result) {
    // WhatsApp message sent successfully
    // $result contains provider-specific response data
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Handlers/MessageScheduler.php`

---

### `fluent_crm/whatsapp_failed`

WhatsApp counterpart of [`fluent_crm/sms_failed`](#fluent-crm-sms-failed). Fires after a WhatsApp
message fails, once the message row has been marked `failed` and the campaign's `failed_count`
incremented. Like the SMS hook it fires on every failure path, including pre-send guards that never
reach the provider, such as a contact whose WhatsApp thread is not `subscribed`; in that case
`$errorMessage` is `Contact is not subscribed for WhatsApp`.

**Parameters**
- `$message` Message Model - already updated: `status` is `failed` and `meta['error_message']` holds the reason
- `$errorMessage` String - the guard's reason, the driver response's `message` (or `Unknown error` when it carries none), or the exception message

**Usage:**
```php
add_action('fluent_crm/whatsapp_failed', function($message, $errorMessage) {
    // WhatsApp send failed - log or retry
    error_log('WhatsApp failed: ' . $errorMessage);
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Handlers/MessageScheduler.php`

---

## Opt-in & Opt-out

### `fluent_crm/contact_sms_subscribed`

Fires when an inbound message opts a contact in to SMS. The contact is matched by `phone`, so nothing
fires for an unknown number, although the number's consent is still recorded. Consent lives on the
conversation thread (`fc_message_threads.status`), not on the contact: every SMS thread of the
contact is already `subscribed` when this fires. Unless the provider is Twilio, which sends its own
compliance reply, a confirmation message has already been queued to the contact.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber) - the contact whose SMS threads are now `subscribed`
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
nothing fires for an unknown number, although the number's consent is still recorded. Consent lives
on the conversation thread (`fc_message_threads.status`), not on the contact: every SMS thread of
the contact is already `unsubscribed` when this fires. Unless the provider is Twilio, which sends
its own compliance reply, the opt-out confirmation has already been queued; it is the one outbound
message the scheduler delivers to an unsubscribed contact.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber) - the contact whose SMS threads are now `unsubscribed`
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
so nothing fires for an unknown number, although the number's consent is still recorded. Consent
lives on the conversation thread (`fc_message_threads.status`): every WhatsApp thread of the contact
is already `subscribed` when this fires.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber) - the contact whose WhatsApp threads are now `subscribed`
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
`phone`, so nothing fires for an unknown number, although the number's consent is still recorded.
Consent lives on the conversation thread (`fc_message_threads.status`): every WhatsApp thread of the
contact is already `unsubscribed` when this fires. The opt-out confirmation, if enabled, is sent
directly through the provider after this hook.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber) - the contact whose WhatsApp threads are now `unsubscribed`
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
