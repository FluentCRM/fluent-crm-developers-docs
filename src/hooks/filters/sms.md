---
description: "Filter hooks for the Messaging module (SMS and WhatsApp) in FluentCampaign Pro — batch processing, scheduling, and message content."
---

# SMS Campaign Filters

<Badge type="danger" vertical="top" text="FluentCampaign Pro" /> <Badge type="warning" vertical="top" text="Intermediate" />

These filter hooks let you customize SMS campaign behavior — processing limits, scheduling, and message content. All SMS hooks require FluentCampaign Pro.

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Http/Controllers/MessageController.php`

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/SMS/SMSHelper.php`

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/WhatsApp/WhatsAppHelper.php`

---

### `fluent_crm/sms_opt_in_confirmation_message`

Filter the confirmation message sent back to a contact when they opt **in** to SMS by replying to a
keyword (for example `START`). Return an empty string to send no confirmation. The filter does not
run for Twilio, which sends its own START/STOP compliance replies. The confirmation is queued as an
outbound message with `ref_type = 'status_confirmation'` and delivered through the normal queue.

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/SMS/SMSHelper.php`

---

### `fluent_crm/sms_opt_out_confirmation_message`

Filter the confirmation message sent back to a contact when they opt **out** of SMS by replying to a
keyword (for example `STOP`). Return an empty string to send no confirmation. The filter does not
run for Twilio, which sends its own START/STOP compliance replies.

The confirmation is queued as an outbound message with `ref_type = 'status_confirmation'` and an
`opt_out` event in its meta. It is the only outbound message the scheduler delivers to a contact
whose SMS consent is `unsubscribed`; the exemption applies to that queued row alone, so it cannot
be resent from the inbox, and the Resend action refuses confirmation rows.

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/SMS/SMSHelper.php`

---

## Processing Limits

::: warning Renamed in 3.2.0
The scheduler filters below were renamed from `fluent_crm/sms_*` to `fluent_crm/message_*` when the SMS module became the Messaging module. The old names still run through `apply_filters_deprecated()`, so existing code keeps working but logs a deprecation notice; move to the new names.
:::

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

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Http/Controllers/MessageController.php`

---

### `fluent_crm/message_process_subscribers_per_request`

Filter how many subscribers are turned into queued SMS messages per batch-generation request.

**Parameters**
- `$limit` INT - Default `30`. Values below `1` fall back to `30`.

**Usage:**
```php
add_filter('fluent_crm/message_process_subscribers_per_request', function($limit) {
    return 50;
});
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Handlers/MessageHandler.php`

---

### `fluent_crm/message_scheduler_chunk_size`

Filter the SMS scheduling chunk size for batch processing.

**Parameters**
- `$chunkSize` INT - Default `30`
- `$scheduler` `SMSScheduler` - the scheduler instance (still in its constructor, so its properties are at their defaults)

::: warning
Values of `0` or less are ignored — the scheduler keeps its default of `30`.
:::

**Usage:**
```php
add_filter('fluent_crm/message_scheduler_chunk_size', function($chunkSize, $scheduler) {
    return 50;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Handlers/MessageScheduler.php`

---

### `fluent_crm/message_scheduler_max_processing_seconds`

Filter the maximum time (in seconds) the SMS scheduler can run per execution.

**Parameters**
- `$maxSeconds` INT - Default `30`
- `$scheduler` `SMSScheduler` - the scheduler instance (still in its constructor, so its properties are at their defaults)

::: warning
Values of `0` or less are ignored — the scheduler keeps its default of `30` seconds.
:::

**Usage:**
```php
add_filter('fluent_crm/message_scheduler_max_processing_seconds', function($maxSeconds, $scheduler) {
    return 60;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Handlers/MessageScheduler.php`

---

### `fluent_crm/disable_message_processing`

Return `true` to make the SMS scheduler treat the system as not ready, so no queued SMS messages are
sent. Useful for maintenance windows. Messages stay queued and resume once the filter returns `false`
again — nothing is dropped.

**Parameters**
- `$shouldDisable` Boolean - Default `false`

**Usage:**
```php
add_filter('fluent_crm/disable_message_processing', function($shouldDisable) {
    return true; // Pause all SMS sending
});
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Handlers/MessageScheduler.php`

---

## WhatsApp Opt-in & Opt-out Keywords

An inbound WhatsApp message is lowercased, stripped of punctuation and emoji, and has the filler
words removed. What remains must equal one of the keywords exactly, so a single-word keyword such as
`stop` also covers "STOP!", "stop please" and "stop sending me messages".

### `fluent_crm/whatsapp_opt_out_keywords`

Filter the keywords that unsubscribe a contact from WhatsApp when they send one as a message.
Add your own words, or translate the list for another language.

**Parameters**
- `$keywords` Array - Default: `stop`, `stopall`, `unsubscribe`, `quit`, `cancel`, `end`, `revoke`, `opt out`, `optout`

**Usage:**
```php
add_filter('fluent_crm/whatsapp_opt_out_keywords', function($keywords) {
    $keywords[] = 'arret'; // French
    return $keywords;
});
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/WhatsApp/WhatsAppHelper.php`

---

### `fluent_crm/whatsapp_opt_in_keywords`

Filter the keywords that (re)subscribe a contact to WhatsApp when they send one as a message.

**Parameters**
- `$keywords` Array - Default: `start`, `unstop`, `subscribe`, `resubscribe`, `resume`, `opt in`, `optin`

**Usage:**
```php
add_filter('fluent_crm/whatsapp_opt_in_keywords', function($keywords) {
    $keywords[] = 'join';
    return $keywords;
});
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/WhatsApp/WhatsAppHelper.php`

---

### `fluent_crm/whatsapp_keyword_filler_words`

Filter the words that are removed from an inbound message before it is compared with the opt-in and
opt-out keyword lists. They carry no intent of their own, so removing them lets one keyword cover
polite and verbose spellings. Add filler words for other languages here.

**Parameters**
- `$words` Array - Default: `please`, `pls`, `plz`, `now`, `again`, `me`, `my`, `all`, `the`, `this`, `to`, `from`, `i`, `want`, `sending`, `send`, `message`, `messages`, `msg`, `msgs`, `update`, `updates`, `sms`, `whatsapp`, `texts`, `text`, `thanks`, `thank`, `you`, `immediately`, `everything`

**Usage:**
```php
add_filter('fluent_crm/whatsapp_keyword_filler_words', function($words) {
    $words[] = 'bitte'; // German "please"
    return $words;
});
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/WhatsApp/WhatsAppHelper.php`

---

### `fluent_crm/whatsapp_send_opt_out_confirmation`

Return `false` to stop FluentCRM replying with a confirmation after a contact opts out of WhatsApp
by keyword. The reply is sent directly through the driver (it skips the campaign queue and the daily
rate limit), and only when the WhatsApp provider is active and the confirmation message is not empty.

**Parameters**
- `$shouldSend` Boolean - Default `true`
- `$subscriber` [Subscriber Model](/database/models/subscriber) - the contact who opted out
- `$data` Array - the raw provider payload of the opt-out message

**Usage:**
```php
add_filter('fluent_crm/whatsapp_send_opt_out_confirmation', function($shouldSend, $subscriber, $data) {
    return false; // Never send an automatic confirmation
}, 10, 3);
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/WhatsApp/WhatsAppHelper.php`

---

### `fluent_crm/whatsapp_opt_out_confirmation_message`

Filter the text of the confirmation sent after a WhatsApp opt-out. Return an empty string to send
no confirmation. For the SMS equivalent see
[`fluent_crm/sms_opt_out_confirmation_message`](#fluent-crm-sms-opt-out-confirmation-message).

**Parameters**
- `$message` String - Default: `You have been unsubscribed. Reply START to receive updates again.` (translatable)

**Usage:**
```php
add_filter('fluent_crm/whatsapp_opt_out_confirmation_message', function($message) {
    return 'You are unsubscribed. Send START any time to rejoin.';
});
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/WhatsApp/WhatsAppHelper.php`

---

## WhatsApp Media Ingestion

Attachments on inbound WhatsApp messages are copied to your uploads directory when the webhook is
processed, because the provider's download links expire within minutes. A failed or skipped download
never drops the message; the attachment keeps its provider metadata and shows as an unstored file.

### `fluent_crm/whatsapp_media_max_items`

Filter how many attachments are downloaded for one inbound event. Items beyond the limit keep their
provider metadata, including the media id.

**Parameters**
- `$maxItems` Integer - Default `5`

**Usage:**
```php
add_filter('fluent_crm/whatsapp_media_max_items', function($maxItems) {
    return 10;
});
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/WhatsApp/MediaStore.php`

---

### `fluent_crm/whatsapp_media_time_budget`

Filter the total time, in seconds, one inbound event may spend downloading attachments. Once the
budget is used up the remaining items are skipped. Keep it low: providers retry webhooks that are
not acknowledged quickly.

**Parameters**
- `$seconds` Float - Default `10`

**Usage:**
```php
add_filter('fluent_crm/whatsapp_media_time_budget', function($seconds) {
    return 20;
});
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/WhatsApp/MediaStore.php`

---

### `fluent_crm/whatsapp_media_max_bytes`

Filter the largest attachment, in bytes, that will be stored. A file whose declared size is larger
is skipped without being downloaded.

**Parameters**
- `$maxBytes` Integer - Default `26214400` (25 MB)

**Usage:**
```php
add_filter('fluent_crm/whatsapp_media_max_bytes', function($maxBytes) {
    return 10 * 1024 * 1024; // 10 MB
});
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/WhatsApp/MediaStore.php`

---

### `fluent_crm/whatsapp_media_download_timeout`

Filter the maximum timeout, in seconds, for a single attachment download request. Each request is
also capped by whatever remains of the overall
[`time budget`](#fluent-crm-whatsapp-media-time-budget), so redirects share one deadline.

**Parameters**
- `$seconds` Float - Default `15`

**Usage:**
```php
add_filter('fluent_crm/whatsapp_media_download_timeout', function($seconds) {
    return 8;
});
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/WhatsApp/MediaStore.php`

---

### `fluent_crm/whatsapp_media_allowed_types`

Filter the MIME types accepted from WhatsApp and the file extension each is stored under. The list is
deliberately narrower than the WordPress upload allowlist; any type not listed keeps its provider
metadata and is not stored.

**Parameters**
- `$types` Array - map of MIME type to extension, for example `'image/jpeg' => 'jpg'`. Default covers common images, video (`mp4`, `3gp`), audio (`ogg`, `opus`, `mp3`, `amr`, `aac`, `m4a`), PDF, Office documents, `txt` and vCard files

**Usage:**
```php
add_filter('fluent_crm/whatsapp_media_allowed_types', function($types) {
    unset($types['text/plain']); // Do not store plain text files
    return $types;
});
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/WhatsApp/MediaStore.php`

---

## Scheduling & Sending

### `fluent_crm/message_next_action_delay`

Filter the delay, in seconds, before the next Action Scheduler step for a messaging campaign is run
when a step queues its continuation without an explicit time. Negative values are treated as `0`.

**Parameters**
- `$delay` Integer - Default `0`

**Usage:**
```php
add_filter('fluent_crm/message_next_action_delay', function($delay) {
    return 5; // Wait 5 seconds between campaign steps
});
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Handlers/MessageScheduler.php`

---

### `fluent_crm/message_inline_send_timeout`

Filter the HTTP timeout cap, in seconds, for a message sent immediately while someone is waiting on
the request (for example an operator pressing Send in the inbox, or an automation step). The cap is applied with `min()`, so it can only
lower the driver's own send timeout, never raise it. Values below `1` are raised to `1`.

**Parameters**
- `$timeout` Integer - Default `5`

**Usage:**
```php
add_filter('fluent_crm/message_inline_send_timeout', function($timeout) {
    return 10;
});
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Handlers/MessageScheduler.php`

---

## Storage

### `fluent_crm/private_storage_path`

Filter the directory used for temporary one-time audience import files. The default is the
`FLUENTCRM_PRIVATE_STORAGE_PATH` constant when defined, otherwise a folder inside the uploads
directory. The returned path is normalized, created if missing, and protected with deny files, so
point it at a location PHP can write to.

**Parameters**
- `$root` String - absolute path to the storage directory

**Usage:**
```php
add_filter('fluent_crm/private_storage_path', function($root) {
    return '/var/private/fluentcrm-imports';
});
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Services/OneTimeAudienceImporter.php`

---

## Campaign Data (WhatsApp)

### `fluent_crm/whatsapp_campaign_data`

WhatsApp counterpart of [`fluent_crm/sms_campaign_data`](#fluent-crm-sms-campaign-data). Filters a
WhatsApp campaign right before the campaign-detail endpoint returns it; the SMS filter runs for SMS
campaigns instead. Runs on read only.

**Parameters**
- `$campaign` MessageCampaign Model - also carries a `server_time` attribute set just before the filter runs

**Usage:**
```php
add_filter('fluent_crm/whatsapp_campaign_data', function($campaign) {
    // Modify campaign data
    return $campaign;
});
```

**Source:** `fluentcampaign-pro/app/Modules/Messaging/Http/Controllers/MessageController.php`

---

### `fluent_crm/whatsapp_campaign_export_data`

Filter the array exported when a WhatsApp campaign is downloaded as JSON. The SMS filter
`fluent_crm/sms_campaign_export_data` runs for SMS campaigns instead.

**Parameters**
- `$campaignData` Array - `title`, `message_content`, `status` (always `draft`), `created_by`, `settings` and `labels`
- `$campaign` MessageCampaign Model - the campaign being exported

**Usage:**
```php
add_filter('fluent_crm/whatsapp_campaign_export_data', function($campaignData, $campaign) {
    unset($campaignData['created_by']);
    return $campaignData;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Hooks/Handlers/DataExporter.php`
