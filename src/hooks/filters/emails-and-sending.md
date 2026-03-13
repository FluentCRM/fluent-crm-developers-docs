---
description: "Filter hooks for email headers, body processing, design templates, tracking, sending pipeline, and rate limits in FluentCRM."
---

# Emails & Sending Filters

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These filter hooks control email headers, body processing, design templates, tracking, the sending pipeline, and compliance settings.

## Email Headers

### `fluent_crm/email_headers`

Filter the full array of outgoing email headers. Use this to add custom MIME headers.

**Parameters**
- `$headers` Array - Email headers
- `$data` Array - Email data
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$emailModel` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_filter('fluent_crm/email_headers', function($headers, $data, $subscriber, $emailModel) {
    $headers[] = 'X-Custom-Header: my-value';
    return $headers;
}, 10, 4);
```

**Source:** `app/Services/Libs/Mailer/Mailer.php`

---

### `fluent_crm/enable_unsub_header`

Control whether the `List-Unsubscribe` header is included in outgoing marketing emails.

**Parameters**
- `$enabled` Boolean - Default `true`
- `$data` Array - Email data
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$emailModel` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_filter('fluent_crm/enable_unsub_header', function($enabled) {
    return false; // Disable List-Unsubscribe header
});
```

**Source:** `app/Services/Libs/Mailer/Mailer.php`

---

### `fluent_crm/enable_mailer_to_name`

Control whether the subscriber's display name is included in the `To:` header for better deliverability.

**Parameters**
- `$enabled` Boolean - Default `true`

**Usage:**
```php
add_filter('fluent_crm/enable_mailer_to_name', function($enabled) {
    return false; // Send to email only, no display name
});
```

**Source:** `app/Services/Libs/Mailer/Mailer.php`

---

### `fluent_crm/email_data_before_headers`

Filter the full email data array before headers are built. Use this to modify the email subject, body, or other fields before sending.

**Parameters**
- `$data` Array - Email data (subject, body, from, etc.)
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$emailModel` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_filter('fluent_crm/email_data_before_headers', function($data, $subscriber, $emailModel) {
    // Modify email data before headers are built
    $data['subject'] .= ' - ' . $subscriber->first_name;
    return $data;
}, 10, 3);
```

**Source:** `app/Services/Libs/Mailer/Mailer.php`

---

## Email Body & Smart Codes

### `fluent_crm/parse_campaign_email_text`

Parse smart codes in email text. This filter is called in many places — campaign body, subject, footer, pre-header, double optin emails, and more. It is the primary filter for resolving smart code tokens.

**Parameters**
- `$text` String - Text containing smart code tokens
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_filter('fluent_crm/parse_campaign_email_text', function($text, $subscriber) {
    // Replace a custom token
    $text = str_replace('{{custom.membership_level}}', get_user_meta($subscriber->user_id, 'level', true), $text);
    return $text;
}, 10, 2);
```

**Source:** Multiple files — `app/Services/Libs/Mailer/Handler.php`, `app/Models/CampaignEmail.php`, `app/Models/Campaign.php`, `app/Http/Controllers/CampaignController.php`, and more.

---

### `fluent_crm/parse_extended_crm_text`

Parse extended CRM smart codes after the email body has been wrapped in a design template. This fires later in the pipeline than `parse_campaign_email_text`.

**Parameters**
- `$text` String - Email body with template wrapper
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_filter('fluent_crm/parse_extended_crm_text', function($text, $subscriber) {
    $text = str_replace('{{crm.custom_footer}}', 'My custom footer', $text);
    return $text;
}, 10, 2);
```

**Source:** `app/Services/Libs/Mailer/Handler.php`, `app/Models/CampaignEmail.php`, `app/Hooks/Handlers/ExternalPages.php`

---

### `fluentcrm_email_body_text`

Filter the final email body text right before click-tracking URLs are injected. This is the last chance to modify the email body before sending.

**Parameters**
- `$emailBody` String - Final HTML email body
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$campaignEmail` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_filter('fluentcrm_email_body_text', function($emailBody, $subscriber, $campaignEmail) {
    // Append a custom tracking pixel
    $emailBody .= '<img src="https://example.com/track/' . $subscriber->id . '" />';
    return $emailBody;
}, 10, 3);
```

**Source:** `app/Models/CampaignEmail.php`

---

### `fluent_crm/web_email_footer_text`

Filter the footer text displayed on the "view in browser" email page.

**Parameters**
- `$footerText` String - Footer HTML
- `$email` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_filter('fluent_crm/web_email_footer_text', function($footerText, $email) {
    return $footerText . '<p>Powered by Our Company</p>';
}, 10, 2);
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

## Design Templates

### `fluent_crm/email_design_templates`

Filter the list of available email design templates (Simple, Classic, Plain, etc.).

**Parameters**
- `$templates` Array - Template definitions, each with `slug`, `title`, `image`

**Usage:**
```php
add_filter('fluent_crm/email_design_templates', function($templates) {
    $templates[] = [
        'slug'  => 'my_template',
        'title' => 'My Custom Template',
        'image' => 'https://example.com/template-preview.png'
    ];
    return $templates;
});
```

**Source:** `app/Services/Helper.php`

---

### `fluent_crm/default_email_design_template`

Filter the default email design template slug used when creating new emails.

**Parameters**
- `$slug` String - Default `'simple'`

**Usage:**
```php
add_filter('fluent_crm/default_email_design_template', function($slug) {
    return 'classic';
});
```

**Source:** `app/Services/Helper.php`

---

### `fluent_crm/email-design-template-{$template}`

Dynamic filter to render the email body through a specific design template. The `{$template}` part is the template slug (e.g., `simple`, `classic`, `visual_builder`).

**Parameters**
- `$emailBody` String - Raw email body HTML
- `$templateData` Array - Template configuration
- `$subscriber` [Subscriber Model](/database/models/subscriber) or [Campaign Model](/database/models/campaign)
- `$config` Array - Email configuration

**Usage:**
```php
add_filter('fluent_crm/email-design-template-my_template', function($emailBody, $templateData, $subscriber, $config) {
    // Wrap the email body in your custom template
    return '<html><body>' . $emailBody . '</body></html>';
}, 10, 4);
```

**Source:** `app/Services/Libs/Mailer/Handler.php`, `app/Models/CampaignEmail.php`, `app/Hooks/Handlers/ExternalPages.php`

---

### `fluent_crm/email_view_on_browser_data`

Filter the data array passed to the "view on browser" page template.

**Parameters**
- `$data` Array - Template data (subject, body, campaign info, etc.)
- `$email` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_filter('fluent_crm/email_view_on_browser_data', function($data, $email) {
    $data['custom_branding'] = true;
    return $data;
}, 10, 2);
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

## Tracking

### `fluent_crm/is_simulated_mail`

Simulate all email sending without actually dispatching. Useful for testing or staging environments.

> **Attention:** If you return `true`, no email will be sent from FluentCRM.

**Parameters**
- `$simulated` Boolean - Default `false`
- `$data` Array - Email data
- `$headers` Array - Email headers

**Usage:**
```php
add_filter('fluent_crm/is_simulated_mail', function($simulated) {
    return true; // Simulate all emails
});
```

**Source:** `app/Services/Libs/Mailer/Mailer.php`

---

### `fluentcrm_disable_email_open_tracking`

Disable the email open tracking pixel globally.

**Parameters**
- `$disabled` Boolean - Default `false`

**Usage:**
```php
add_filter('fluentcrm_disable_email_open_tracking', function($disabled) {
    return true; // Disable open tracking
});
```

**Source:** `app/Services/Helper.php`, `app/Functions/helpers.php`

---

### `fluent_crm/track_click`

Control whether click tracking (URL rewriting) is enabled globally.

**Parameters**
- `$enabled` Boolean - Default `true`

**Usage:**
```php
add_filter('fluent_crm/track_click', function($enabled) {
    return false; // Disable click tracking
});
```

**Source:** `app/Services/Helper.php`, `app/Functions/helpers.php`

---

### `fluent_crm/will_use_cookie`

Control whether FluentCRM sets a tracking cookie when a contact clicks a link or confirms opt-in. This cookie enables revenue attribution and campaign tracking.

> **Attention:** Disabling this will prevent revenue tracking.

**Parameters**
- `$enabled` Boolean - Default `true`

**Usage:**
```php
add_filter('fluent_crm/will_use_cookie', function($enabled) {
    return false; // Disable tracking cookie
});
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`, `app/Hooks/Handlers/RedirectionHandler.php`

---

## Sending Pipeline

### `fluent_crm/disable_email_processing`

Halt all email sending immediately. Return `true` to stop the mailer from processing any emails.

**Parameters**
- `$disabled` Boolean - Default `false`

**Usage:**
```php
add_filter('fluent_crm/disable_email_processing', function($disabled) {
    return true; // Stop all email processing
});
```

**Source:** `app/Services/Libs/Mailer/Handler.php`, `app/Services/Libs/Mailer/MultiThreadHandler.php`, `app/Services/Libs/Mailer/CliSendingHandler.php`

---

### `fluent_crm/email_limit_per_second`

Filter the emails-per-second rate limit for sending.

**Parameters**
- `$limit` INT - Rate limit
- `$emailSettings` Array - Email sending settings
- `$handler` Object - Mailer handler instance

**Usage:**
```php
add_filter('fluent_crm/email_limit_per_second', function($limit) {
    return 5; // Limit to 5 emails per second
});
```

**Source:** `app/Services/Libs/Mailer/BaseHandler.php`

---

### `fluent_crm/mailer_handler_chunk_size`

Filter the number of emails pulled per batch in the standard single-thread mailer handler.

**Parameters**
- `$chunkSize` INT - Default `20`

**Usage:**
```php
add_filter('fluent_crm/mailer_handler_chunk_size', function($chunkSize) {
    return 50;
});
```

**Source:** `app/Services/Libs/Mailer/Handler.php`

---

### `fluent_crm/mailer_handler_max_processing_seconds`

Filter the max processing time (seconds) for the single-thread mailer handler loop.

**Parameters**
- `$seconds` INT - Default `50`

**Usage:**
```php
add_filter('fluent_crm/mailer_handler_max_processing_seconds', function($seconds) {
    return 30;
});
```

**Source:** `app/Services/Libs/Mailer/Handler.php`

---

### `fluent_crm/mailer_multi_thread_chunk_size`

Filter the number of emails per batch in the multi-thread mailer handler.

**Parameters**
- `$chunkSize` INT - Default `20`

**Usage:**
```php
add_filter('fluent_crm/mailer_multi_thread_chunk_size', function($chunkSize) {
    return 50;
});
```

**Source:** `app/Services/Libs/Mailer/MultiThreadHandler.php`

---

### `fluent_crm/mailer_multi_thread_max_processing_seconds`

Filter the max processing time (seconds) for the multi-thread mailer handler loop.

**Parameters**
- `$seconds` INT - Default `50`

**Usage:**
```php
add_filter('fluent_crm/mailer_multi_thread_max_processing_seconds', function($seconds) {
    return 30;
});
```

**Source:** `app/Services/Libs/Mailer/MultiThreadHandler.php`

---

### `fluent_crm/process_subscribers_per_request`

Filter the number of subscribers to enqueue per batch when preparing a campaign for sending.

**Parameters**
- `$count` INT - Default `30`

**Usage:**
```php
add_filter('fluent_crm/process_subscribers_per_request', function($count) {
    return 100;
});
```

**Source:** `app/Services/CampaignProcessor.php`

---

## Compliance & Formatting

### `fluent_crm/disable_check_compliance_string`

Skip the compliance string validation (unsubscribe link requirement) for outgoing emails. Return `true` to bypass the check.

**Parameters**
- `$disabled` Boolean - Default `false`
- `$text` String - Email body text being checked

**Usage:**
```php
add_filter('fluent_crm/disable_check_compliance_string', function($disabled, $text) {
    return true; // Skip compliance check
}, 10, 2);
```

**Source:** `app/Services/Helper.php`

---

### `fluent_crm/disable_emoji_to_image`

Control whether WordPress's emoji-to-image filter is removed before sending emails. Default `true` (emojis stay as unicode text, not converted to images).

**Parameters**
- `$disabled` Boolean - Default `true`

**Usage:**
```php
add_filter('fluent_crm/disable_emoji_to_image', function($disabled) {
    return false; // Allow WordPress to convert emojis to images
});
```

**Source:** `app/Services/Helper.php`

---

### `fluent_crm/is_rtl`

Control whether email templates should be rendered in RTL (right-to-left) direction.

**Parameters**
- `$isRtl` Boolean - Default: WordPress `is_rtl()` value

**Usage:**
```php
add_filter('fluent_crm/is_rtl', function($isRtl) {
    return true; // Force RTL for all emails
});
```

**Source:** `app/Functions/helpers.php`
