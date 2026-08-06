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

::: warning
This filter only runs when the email has a resolved subscriber. Mail sent without one never
evaluates the filter and never gets the header.
:::

**Parameters**
- `$enabled` Boolean - Default `true`
- `$data` Array - Email data
- `$subscriber` [Subscriber Model](/database/models/subscriber) - always present when this filter runs
- `$emailModel` [CampaignEmail Model](/database/models/campaign-email) - may be `null` for non-campaign mail

**Usage:**
```php
add_filter('fluent_crm/enable_unsub_header', function($enabled, $data, $subscriber, $emailModel) {
    return false; // Disable List-Unsubscribe header
}, 10, 4);
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

### `fluent_crm/smartcode_group_callback_{$group}`

Dynamic filter that resolves the value of a custom smart code group. When the parser meets a token
like <span v-pre>`{{my_group.some_key}}`</span> whose group is not one of the built-ins (`contact`, `wp`, `crm`,
`user`, `other`), it hands the token to this filter with `{$group}` set to the group name.

::: tip
[`fluent_crm/smartcode_groups`](/hooks/filters/contacts#fluent-crm-smartcode-groups) only registers
the codes so they show up in the editor's smart code picker — without a matching
`fluent_crm/smartcode_group_callback_{$group}` callback the registered codes never render and the
literal token stays in the sent email. See the
[SmartCode parser reference](/helpers/parser) for the full parsing pipeline.
:::

**Parameters**
- `$code` String - the full unresolved token including braces, e.g. <span v-pre>`{{my_group.some_key|Fallback}}`</span> — returning it unchanged leaves the literal token in the email
- `$valueKey` String - the part after the first dot, with any `|` modifiers stripped, e.g. `some_key` (nested dots are preserved: `meta.city`)
- `$defaultValue` String - the fallback text from the <span v-pre>`{{my_group.some_key|Fallback}}`</span> syntax, `''` when none is given
- `$subscriber` [Subscriber Model](/database/models/subscriber) - always set; the parser returns the default before this filter when no subscriber is available

::: tip
Value transformers (`|trim`, `|ucfirst`, `|strtolower`, `|strtoupper`, `|ucwords`, `|concat_first`,
`|concat_last`, `|show_if`) are applied by the parser **after** your callback returns a non-empty
value, so return the raw value and let the token's modifiers do the formatting.
:::

**Usage:**
```php
add_filter('fluent_crm/smartcode_group_callback_my_group', function($code, $valueKey, $defaultValue, $subscriber) {
    if ($valueKey === 'membership_level') {
        return get_user_meta($subscriber->user_id, 'level', true) ?: $defaultValue;
    }
    return $defaultValue; // Unknown key for this group
}, 10, 4);
```

**Source:** `app/Services/Libs/Parser/ShortcodeParser.php`

---

### `fluentcrm_smartcode_fallback`

Last-chance resolver for smart code tokens the parser cannot attribute to any group: tokens with
empty inner content, without a `group.key` dot structure (e.g. <span v-pre>`{{first_name}}`</span>), or with an empty
key part. The unfiltered value is the raw token itself, so by default such tokens stay as-is in the
sent email.

::: tip
This filter does **not** fire for well-formed <span v-pre>`{{group.key}}`</span> tokens with an unknown group — those
go to [`fluent_crm/smartcode_group_callback_{$group}`](#fluent-crm-smartcode-group-callback-group)
instead. It runs in both parsing passes (the main pass and the later extended-CRM pass), so an
unresolved token can hit your callback more than once.
:::

**Parameters**
- `$code` String - the full unresolved token including braces, e.g. <span v-pre>`{{first_name}}`</span>
- `$subscriber` [Subscriber Model](/database/models/subscriber) - the contact the text is being parsed for

**Usage:**
```php
add_filter('fluentcrm_smartcode_fallback', function($code, $subscriber) {
    if ($code === '{{first_name}}') { // support a legacy un-grouped token
        return $subscriber->first_name;
    }
    return $code;
}, 10, 2);
```

**Source:** `app/Services/Libs/Parser/ShortcodeParser.php`

---

### `fluent_crm/allow_privileged_reset_link_smartcode`

Security gate for the <span v-pre>`{{user.password_reset_direct_link}}`</span> smart code. FluentCRM refuses to mint a
live password-reset link for a privileged WordPress account — any user with the `manage_options`
capability (administrators) — because the rendered link can surface in records readable by
lower-privileged CRM staff (the parsed subject stored on the sent-email row, SMTP logs). Return
`true` to allow it for accounts you trust.

::: warning Silent by design
When the gate blocks a privileged account, the smart code silently renders its default value
(usually an empty string) — no error is raised anywhere. If your site intentionally onboards
administrators with a "set your password" email, this is why their reset link is blank; add this
filter to allow it. Note the smart code also requires the contact's email to exactly match the
linked WP user's email — that check runs first and is **not** filterable.
:::

**Parameters**
- `$allowed` Boolean - Default `false`
- `$wpUser` WP_User - the privileged WordPress user the link would be minted for
- `$subscriber` [Subscriber Model](/database/models/subscriber) - the contact being emailed

**Usage:**
```php
add_filter('fluent_crm/allow_privileged_reset_link_smartcode', function($allowed, $wpUser, $subscriber) {
    // Allow reset links for admins created by our own onboarding flow
    return $subscriber->source === 'internal_onboarding';
}, 10, 3);
```

**Source:** `app/Services/Libs/Parser/ShortcodeParser.php`

---

### `fluent_crm/rss_block_is_safe_feed_url`

Override the SSRF guard that validates RSS feed URLs before the Gutenberg email RSS block fetches
them server-side. The default guard only accepts `http`/`https` URLs whose host resolves to a
public IP — feeds on private ranges (`10.x`, `192.168.x`, `127.0.0.1`) or reserved ranges are
rejected, so the block renders nothing for intranet feeds. Return `true` to allow such a feed.

**Parameters**
- `$isSafe` Boolean - whether the resolved IP passed the public-range check
- `$url` String - the feed URL from the block attributes
- `$host` String - the parsed URL host
- `$ip` String - the IP the host resolved to

::: warning Security trade-off
The feed URL is fetched by your server, so allowing private ranges re-opens the SSRF vector this
guard exists for — an editor-supplied feed URL could then probe internal services. Allow specific
hosts, never return a blanket `true`. Also note the filter only runs after the URL has parsed with
an `http`/`https` scheme and the host has resolved to an IP; other schemes and unresolvable hosts
are rejected before the filter fires and cannot be allowed here.
:::

**Usage:**
```php
add_filter('fluent_crm/rss_block_is_safe_feed_url', function($isSafe, $url, $host, $ip) {
    if ($host === 'news.intranet.local') {
        return true; // Trusted internal feed
    }
    return $isSafe;
}, 10, 4);
```

**Source:** `app/Services/GutenbergEmailParser.php`

---

## Design Templates

### `fluent_crm/email_design_templates`

Filter the list of available email design templates (Simple Boxed, Plain Centered, Plain Left,
Classic Editor, Raw HTML).

**Parameters**
- `$templates` Array - an array **keyed by template slug**. Each entry accepts:
  - `id` String - must equal the array key
  - `label` String - the name shown in the template picker
  - `image` String - preview image URL
  - `config` Array - default design configuration for the template
  - `use_gutenberg` Boolean - whether the block editor is used to author this template
  - `template_type` String - optional; `classic_editor` or `raw_text_box` for the non-Gutenberg editors
  - `template_info` String - optional HTML shown alongside the editor

::: tip
Register a matching
[`fluent_crm/email-design-template-{$template}`](#fluent-crm-email-design-template-template) filter
for your slug, otherwise the body is rendered without a wrapper.
:::

**Usage:**
```php
add_filter('fluent_crm/email_design_templates', function($templates) {
    $templates['my_template'] = [
        'id'            => 'my_template',
        'label'         => 'My Custom Template',
        'image'         => 'https://example.com/template-preview.png',
        'config'        => [],
        'use_gutenberg' => true
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
- `$templateData` Array - Template data: `preHeader`, `email_body`, `footer_text`, `footer_config`, `config`
- `$campaign` [Campaign Model](/database/models/campaign) - may be `null` outside a campaign context
- `$subscriber` [Subscriber Model](/database/models/subscriber) - may be `null` when rendering a preview

::: warning
The third argument is the **campaign**, not the subscriber. FluentCRM's own built-in template
callbacks are registered with `accepted_args` of `3`, so they never receive the subscriber — request
all four only if you need it.
:::

**Usage:**
```php
add_filter('fluent_crm/email-design-template-my_template', function($emailBody, $templateData, $campaign, $subscriber) {
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

### `fluent_crm/email_newsletter_data`

Filter the data array passed to the public shared-newsletter page — the page served by a campaign's
share URL (`_campaign_share_id` hash), as opposed to the per-subscriber "view on browser" link,
which uses [`fluent_crm/email_view_on_browser_data`](#fluent-crm-email-view-on-browser-data). The
email body has already been rendered through the design template when this filter runs.

**Parameters**
- `$data` Array - Page data:
  - `business` Array - the business settings (name, logo, address)
  - `email_heading` String - the campaign subject used as the page heading
  - `email` - always `null` on this page
  - `email_body` Array - `['rendered' => $html]`, the fully rendered email HTML
  - `cssAssets` Array - stylesheet URLs loaded by the page

**Usage:**
```php
add_filter('fluent_crm/email_newsletter_data', function($data) {
    $data['email_heading'] = 'Our Weekly Newsletter';
    return $data;
});
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

### `fluent_crm/editing_template_data`

Filter the email template payload sent to the editor when an existing template is opened for
editing. This does not run for the blank payload used when creating a new template.

**Parameters**
- `$templateData` Array - Template payload:
  - `post_title`, `post_content`, `post_excerpt` String - the stored template post fields
  - `email_subject` String - the `_email_subject` meta
  - `edit_type` String - editor type, `html` when unset
  - `design_template` String - the design template slug
  - `settings` Array - normalized `template_config` and `footer_settings`
- `$template` [Template Model](/database/models/template)

**Usage:**
```php
add_filter('fluent_crm/editing_template_data', function($templateData, $template) {
    $templateData['email_subject'] = strtoupper($templateData['email_subject']);
    return $templateData;
}, 10, 2);
```

**Source:** `app/Http/Controllers/TemplateController.php`

---

### `fluent_crm/editing_recurring_campaign_data`

<Badge type="danger" vertical="middle" text="Pro" />

Filter the recurring campaign payload written to the JSON file when a recurring campaign is
exported for reuse on another site. The Pro sibling of
[`fluent_crm/editing_template_data`](#fluent-crm-editing-template-data): whatever you add or strip
here is what the import on the destination site receives.

**Parameters**
- `$campaignData` Array - Export payload: `title`, `settings`, `template_id`, `email_subject`, `email_pre_header`, `email_body`, `utm_status`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `design_template`, and `status` (always forced to `draft`)
- `$campaign` Object - the `RecurringCampaign` model being exported

**Usage:**
```php
add_filter('fluent_crm/editing_recurring_campaign_data', function($campaignData, $campaign) {
    $campaignData['template_id'] = 0; // Template IDs won't match on the destination site
    return $campaignData;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Hooks/Handlers/DataExporter.php`

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
add_filter('fluent_crm/is_simulated_mail', function($simulated, $data, $headers) {
    return true; // Simulate all emails
}, 10, 3);
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

### `fluent_crm/global_email_limit_per_second`

Filter the global emails-per-second cap enforced by `GlobalRateLimiter`.

The unfiltered value comes from the **Emails per second** setting minus a safety buffer of 3, or
`14` when that setting is empty; either way it is floored at `4` before the filter runs.

::: warning
The resolved limit is cached in a static for the rest of the request, so this filter runs at most
once per PHP process. Do not return a value that varies per email — use
`fluent_crm/enable_global_rate_limit` for per-email decisions instead.
:::

**Parameters**
- `$limit` INT - the resolved limit, already floored at `4`
- `$emailSettings` Array - the `email_settings` global settings array

**Usage:**
```php
add_filter('fluent_crm/global_email_limit_per_second', function($limit, $emailSettings) {
    return 5; // Limit to 5 emails per second
}, 10, 2);
```

**Source:** `app/Services/Libs/Mailer/GlobalRateLimiter.php`

---

### `fluent_crm/enable_global_rate_limit`

Return `false` to skip the global per-second throttle for a given outgoing email. Unlike
`fluent_crm/global_email_limit_per_second`, this runs per email, so it is the right place for
per-email exemptions.

**Parameters**
- `$enabled` Boolean - Default `true`
- `$data` Array - the email payload; inspect keys such as `scope` to exempt specific traffic

**Usage:**
```php
add_filter('fluent_crm/enable_global_rate_limit', function($enabled, $data) {
    if (($data['scope'] ?? '') === 'transactional') {
        return false; // never throttle transactional mail
    }
    return $enabled;
}, 10, 2);
```

**Source:** `app/Services/Libs/Mailer/GlobalRateLimiter.php`

---

### `fluent_crm/mailer_handler_chunk_size`

Filter the number of emails pulled per batch in the standard single-thread mailer handler.

**Parameters**
- `$chunkSize` INT - Default `20`

::: tip
Values of `0` or less are ignored — the handler keeps its default.
:::

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

::: tip
Values of `0` or less are ignored — the handler keeps its default.
:::

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

::: tip
Values of `0` or less are ignored — the handler keeps its default.
:::

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

::: tip
Values of `0` or less are ignored — the handler keeps its default.
:::

**Usage:**
```php
add_filter('fluent_crm/mailer_multi_thread_max_processing_seconds', function($seconds) {
    return 30;
});
```

**Source:** `app/Services/Libs/Mailer/MultiThreadHandler.php`

---

### `fluent_crm/process_subscribers_per_request`

Filter the number of subscribers processed per batch request.

::: danger One hook, three different batch sizes
This filter name is reused by three unrelated batch loops, each passing a **different default**.
A callback that returns a fixed number changes all three at once.

| Where | Default | What it sizes |
|---|---|---|
| `app/Services/CampaignProcessor.php` | `30` | Subscribers enqueued per request while preparing a campaign for sending |
| `app/Http/Controllers/UsersController.php` | `100` | WP users imported per request by the user-import screen |
| `fluentcampaign-pro/app/Http/Controllers/SequenceController.php` | `200` | Contacts added to an email sequence per request |

Branch on the incoming default if you only mean to change one of them.
:::

**Parameters**
- `$count` INT - Default `30`, `100`, or `200` depending on the caller (see table)

**Usage:**
```php
add_filter('fluent_crm/process_subscribers_per_request', function($count) {
    // Only change the campaign-processing batch, leave imports and sequences alone
    if ($count === 30) {
        return 50;
    }
    return $count;
});
```

**Source:** `app/Services/CampaignProcessor.php`, `app/Http/Controllers/UsersController.php`, `fluentcampaign-pro/app/Http/Controllers/SequenceController.php`

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

---

## AI Generation

These filters customize FluentCRM's AI features: email body generation in the campaign editor and
contact summaries on the contact profile.

### `fluent_crm/wordpress_ai_generate`

Route AI generation through your own provider. This filter fires for **every** AI call — email body
generation, the rewrite/shorten/expand text actions, and contact summaries — whenever the AI
provider in Settings is set to **WordPress AI**. Return a non-`null` value to short-circuit the
built-in WordPress AI Client call entirely.

::: tip
This is the single most useful AI hook: set the provider to `wordpress` in the AI settings and add
this filter, and no other provider or API key configuration is needed — all generation goes through
your callback. Returning `null` (the default) falls through to `wp_ai_client_prompt()`, which
requires WordPress 7.0+.
:::

**Parameters**
- `$response` - Default `null`. Return the generated text as a **string** to short-circuit, or a `WP_Error` to report failure. For email body generation the string must be the JSON the system prompt asks for (`{"subject_suggestions":[...],"preview_text":"...","email_body":"..."}`); for text actions and contact summaries, plain text/markdown
- `$userPrompt` String - the fully built user prompt
- `$systemPrompt` String - the system prompt (may be an empty string)
- `$model` String - always `wordpress` for this provider
- `$timeout` INT - request timeout in seconds (`45` for email body generation and contact summaries, `30` for the rewrite/shorten/expand text actions, `15` for the connection test)

**Usage:**
```php
add_filter('fluent_crm/wordpress_ai_generate', function($response, $userPrompt, $systemPrompt, $model, $timeout) {
    $result = my_llm_client()->complete($systemPrompt, $userPrompt, ['timeout' => $timeout]);

    if (!$result) {
        return new \WP_Error('generation_failed', 'My LLM provider did not return content');
    }

    return $result; // Raw text response
}, 10, 5);
```

**Source:** `app/Http/Controllers/AiController.php`

---

### `fluent_crm/ai_email_body_system_prompt`

Filter the system prompt sent to the configured AI provider for email body generation. The default
prompt sets the copywriting persona, allows FluentCRM smartcodes, restricts HTML tags, and — most
importantly — instructs the model to return only JSON in the shape
`{"subject_suggestions":[...],"preview_text":"...","email_body":"..."}`. Any custom prompt saved in
the AI settings is already appended when this filter runs.

::: warning
If you replace the prompt wholesale, keep the JSON output instruction. When the response is not
parseable JSON, the whole raw response is used as the email body and no subject suggestions or
preview text are produced.
:::

**Parameters**
- `$prompt` String - the composed system prompt
- `$settings` Array - the saved AI settings (including `custom_prompt`)

**Usage:**
```php
add_filter('fluent_crm/ai_email_body_system_prompt', function($prompt, $settings) {
    return $prompt . "\n\nAlways write in British English.";
}, 10, 2);
```

**Source:** `app/Http/Controllers/AiController.php`

---

### `fluent_crm/ai_email_body_user_prompt`

Filter the user prompt sent to the AI provider for email body generation, after it has been built
from the brief the user typed in the editor.

**Parameters**
- `$prompt` String - the composed user prompt (goal, tone, length, audience, CTA, editor context, output rules)
- `$promptData` Array - the sanitized inputs: `prompt`, `tone`, `audience`, `length`, `cta`, and `context` (`design_template`, `editor_type`, `output_format`, `campaign_type`, `has_existing_body`)

**Usage:**
```php
add_filter('fluent_crm/ai_email_body_user_prompt', function($prompt, $promptData) {
    return $prompt . "\nBrand voice: friendly but concise.";
}, 10, 2);
```

**Source:** `app/Http/Controllers/AiController.php`

---

### `fluent_crm/ai_email_body_generated_content`

Filter the parsed AI generation result before it is returned to the email editor. Runs after the
provider response has been decoded, so you can post-process or replace the generated copy.

**Parameters**
- `$generated` Array - `subject_suggestions` (array, capped at 5), `preview_text` (string), `email_body` (string)
- `$promptData` Array - the sanitized prompt inputs and editor context
- `$result` String - the raw provider response

::: tip
Return an array with the same keys — returning a non-array resets everything to empty values. The
final response is still sanitized after this filter: `email_body` goes through HTML/blocks
sanitization and the subject suggestions through `sanitize_text_field()`.
:::

**Usage:**
```php
add_filter('fluent_crm/ai_email_body_generated_content', function($generated, $promptData, $result) {
    $generated['preview_text'] = wp_trim_words($generated['preview_text'], 12);
    return $generated;
}, 10, 3);
```

**Source:** `app/Http/Controllers/AiController.php`

---

### `fluent_crm/ai_contact_summary_system_prompt`

Filter the system prompt used when generating the AI contact summary on the contact profile. The
default prompt scopes the model to the supplied contact data, forbids invented facts, and requests
markdown in the site language. Any custom prompt saved in the AI settings is already appended.

**Parameters**
- `$prompt` String - the composed system prompt
- `$settings` Array - the saved AI settings (including `custom_prompt`)
- `$locale` String - the WordPress site locale the summary should be written in

**Usage:**
```php
add_filter('fluent_crm/ai_contact_summary_system_prompt', function($prompt, $settings, $locale) {
    return $prompt . "\n\nOur team cares most about churn risk; lead with it.";
}, 10, 3);
```

**Source:** `app/Http/Controllers/AiController.php`

---

### `fluent_crm/ai_contact_summary_user_prompt`

Filter the user prompt for the AI contact summary. The structured contact context (profile, lists,
tags, email engagement, purchase and support history when available) is JSON-encoded into the
prompt; inspect `$context` to see exactly what the model receives.

**Parameters**
- `$prompt` String - the composed user prompt including the JSON-encoded contact context
- `$context` Array - the structured contact context used to build the prompt
- `$locale` String - the WordPress site locale the summary should be written in

**Usage:**
```php
add_filter('fluent_crm/ai_contact_summary_user_prompt', function($prompt, $context, $locale) {
    return $prompt . "\nHighlight any open support tickets first.";
}, 10, 3);
```

**Source:** `app/Http/Controllers/AiController.php`
