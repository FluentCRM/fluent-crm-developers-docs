---
description: "Filter hooks for FluentCRM system behavior — experimental settings, loopback requests, remote templates, block parsing, privacy redaction, logs, uploads and smart links."
---

# Settings & System Filters

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Advanced" />

System-level filter hooks that do not belong to a single contact, campaign or automation. For the
matching actions, see [Settings & System Actions](/hooks/actions/settings-and-system).

## Experimental Settings

### `fluent_crm/experimental_settings`

Filter the experimental module settings (the `_fluentcrm_experimental_settings` option merged with its
defaults). `Helper::isExperimentalEnabled()` and every module check read through this.

::: warning Applied once per request
The settings are cached in a static variable before the filter runs, so the filter is applied on the
first call in a request only. Later calls return the unfiltered cached copy. Register your filter
early, before FluentCRM first reads these settings.
:::

**Parameters**
- `$settings` Array - flag => value. Default keys: `campaign_archive`, `campaign_group_by_month`, `campaign_search`, `campaign_max_number`, `campaign_ids`, `campaign_status`, `frontend_portal`, `frontend_portal_slug`, `frontend_portal_render_type`, `frontend_portal_page_id`, `classic_date_time`, `company_module`, `company_auto_logo`, `disable_visual_ai`, `multi_threading_emails`, `system_logs`, `event_tracking`, `abandoned_cart`, `activity_log`, `messaging_module`. Switches use `yes` / `no`

**Usage:**
```php
add_filter('fluent_crm/experimental_settings', function($settings) {
    $settings['system_logs'] = 'yes';
    return $settings;
});
```

**Source:** `fluent-crm/app/Services/Helper.php`

---

## Sender Loopback Requests

After each batch, the email sender continues its chain by firing a non-blocking POST request to the
site itself. cURL is tried first because it bypasses WordPress SSL filters that can break local or
self-signed loopbacks; on failure it falls back to the WordPress HTTP API. All three filters below
receive the request URL and body.

### `fluent_crm/non_blocking_request_timeout`

Filter the total timeout, in seconds, of the loopback request. Values below `1` are raised to `1`.

**Parameters**
- `$timeout` Integer - Default `3`
- `$url` String - the loopback URL
- `$body` Array - the POST body

**Usage:**
```php
add_filter('fluent_crm/non_blocking_request_timeout', function($timeout, $url, $body) {
    return 5;
}, 10, 3);
```

**Source:** `fluent-crm/app/Services/Libs/Mailer/Handler.php`

---

### `fluent_crm/non_blocking_request_connect_timeout`

Filter the connection timeout, in seconds, of the loopback cURL request. Values below `1` are raised
to `1`. The WordPress HTTP fallback has no separate connect timeout and ignores it.

**Parameters**
- `$connectTimeout` Integer - Default `2`
- `$url` String - the loopback URL
- `$body` Array - the POST body

**Usage:**
```php
add_filter('fluent_crm/non_blocking_request_connect_timeout', function($connectTimeout, $url, $body) {
    return 4;
}, 10, 3);
```

**Source:** `fluent-crm/app/Services/Libs/Mailer/Handler.php`

---

### `fluent_crm/non_blocking_request_use_wp_http`

Return `true` to skip cURL and send the loopback request with `wp_remote_post()` instead. This is the
same transport used automatically when cURL is unavailable or fails. Useful on hosts where direct cURL
loopbacks misbehave.

**Parameters**
- `$useWpHttp` Boolean - Default `false`
- `$url` String - the loopback URL
- `$body` Array - the POST body

**Usage:**
```php
add_filter('fluent_crm/non_blocking_request_use_wp_http', '__return_true');
```

**Source:** `fluent-crm/app/Services/Libs/Mailer/Handler.php`

---

### `fluent_crm/intercept_loopback`

Return `true` to swallow the loopback request: nothing is sent and the function returns right away.
It exists as a test seam so test suites can observe that the sender intends to continue without
making HTTP calls. Do not enable it on a live site, because the sender chain would not continue
until the next cron run.

**Parameters**
- `$intercept` Boolean - Default `false`
- `$url` String - the loopback URL
- `$body` Array - the POST body

**Usage:**
```php
add_filter('fluent_crm/intercept_loopback', function($intercept, $url, $body) {
    $GLOBALS['captured_loopbacks'][] = [$url, $body];
    return true;
}, 10, 3);
```

**Source:** `fluent-crm/app/Services/Libs/Mailer/Handler.php`

---

## Templates & Block Parsing

### `fluent_crm/remote_template_allowed_hosts`

Filter the hosts that email templates may be downloaded from. Only `https` URLs whose host is in this
list are fetched. The default list is `fluentcrm.com`, `www.fluentcrm.com`, `wpmanageninja.com`,
`www.wpmanageninja.com`, plus the host of the `FC_TEMPLATE_API_DOMAIN` constant when it is defined.
The result is lowercased and sanitized, and anything other than an array leaves no allowed hosts.

**Parameters**
- `$allowedHosts` Array - host names, for example `fluentcrm.com`

**Usage:**
```php
add_filter('fluent_crm/remote_template_allowed_hosts', function($allowedHosts) {
    $allowedHosts[] = 'templates.example.com';
    return $allowedHosts;
});
```

**Source:** `fluent-crm/app/Services/RemoteTemplateFetcher.php`

---

### `fluent_crm/block_parser_legacy_fallback_enabled`

Control the fallback of the email block parser. When the Gutenberg email parser returns an empty
result for content that contains `<!-- wp:` blocks, FluentCRM re-renders it with WordPress'
`parse_blocks()` and `render_block()`. Return `false` to disable that fallback and keep the empty result.

**Parameters**
- `$enabled` Boolean - Default `true`
- `$content` String - the original block content
- `$parsed` String - the result from the Gutenberg email parser (possibly an empty string)

**Usage:**
```php
add_filter('fluent_crm/block_parser_legacy_fallback_enabled', '__return_false');
```

**Source:** `fluent-crm/app/Services/BlockParser.php`

---

## Privacy & Security

### `fluent_crm/email_log_sensitive_patterns`

Filter the regular expressions used to detect secrets in an email body before it is shown in a
contact's email log. The log viewer is reachable by non-admin contact managers, so a matching body is
replaced with a "hidden for security reasons" notice and the row is flagged `is_redacted`. The default
patterns match WordPress password-reset and set-password links. Add patterns for magic links or OTP URLs.

**Parameters**
- `$patterns` Array - PCRE patterns including delimiters and flags, for example `'/wp-login\.php\?action=rp/i'`
- `$body` String - the rendered email body being inspected

**Usage:**
```php
add_filter('fluent_crm/email_log_sensitive_patterns', function($patterns, $body) {
    $patterns[] = '/[?&]magic_token=/i';
    return $patterns;
}, 10, 2);
```

**Source:** `fluent-crm/app/Http/Controllers/SubscriberController.php`

---

### `fluent_crm/trust_cf_ipcountry`

Decide whether the `CF-IPCountry` request header may be used to set a contact's country. The header
is only considered when it holds a valid two-letter code other than `XX`. By default it is trusted
when the companion `CF-Ray` header is present, which Cloudflare sets on every proxied request. Because
`CF-Ray` can also be forged on direct-to-origin requests, this is a best-effort check. Return `false` to
never trust the header, or `true` if your own proxy setup guarantees it.

**Parameters**
- `$trusted` Boolean - Default `true` when the `CF-Ray` header is present, otherwise `false`

**Usage:**
```php
add_filter('fluent_crm/trust_cf_ipcountry', function($trusted) {
    return $trusted && !empty($_SERVER['HTTP_CF_CONNECTING_IP']);
});
```

**Source:** `fluent-crm/app/Services/Helper.php`

---

## Logs & Storage

### `fluent_crm/system_logs_export_chunk_size`

Filter how many system log rows are read per query while streaming the CSV export. The value is
clamped to between `100` and `5000`.

**Parameters**
- `$chunkSize` Integer - Default `1000`

**Usage:**
```php
add_filter('fluent_crm/system_logs_export_chunk_size', function($chunkSize) {
    return 500; // Lower memory use on small servers
});
```

**Source:** `fluent-crm/app/Http/Controllers/SystemLogController.php`

---

### `fluent_crm/upload_folder_name`

Filter the folder inside the WordPress uploads directory that holds FluentCRM's own uploads. The value
is appended to the uploads base path and base URL, so keep the leading slash. FluentCRM creates the
folder and adds an `.htaccess` file when it is missing.

**Parameters**
- `$folderName` String - Default `/fluentcrm` (the `FLUENTCRM_UPLOAD_DIR` constant)

**Usage:**
```php
add_filter('fluent_crm/upload_folder_name', function($folderName) {
    return '/my-crm-files';
});
```

**Source:** `fluent-crm/app/Services/Libs/FileSystem.php`

---

## Smart Links

Smart links are a FluentCampaign Pro feature. These two filters let the free plugin's campaign link
report show the real destination and title of a smart link instead of its short tracking URL.

### `fluent_crm/has_smartlink`

Report whether smart links are available. When it returns `false`, the campaign link report leaves
URLs as they are. FluentCampaign Pro hooks this at priority 999 and returns its own availability.

**Parameters**
- `$hasSmartLink` Boolean - Default `false`

**Usage:**
```php
add_filter('fluent_crm/has_smartlink', function($hasSmartLink) {
    return true;
}, 999);
```

**Source:** `fluent-crm/app/Models/CampaignUrlMetric.php`

---

### `fluent_crm/smartlink_by_short_url`

Resolve a smart link from a tracked URL. It runs for each link in the campaign link report whose URL
contains `route=smart_url&slug=`, and only when
[`fluent_crm/has_smartlink`](#fluent-crm-has-smartlink) returns `true`. When a smart link object is
returned, the report replaces the link's `destination` with its `target_url` and its `title` with the
smart link's `title`.

**Parameters**
- `$smartLink` Object|null - Default `null`; return an object with `target_url` and `title`
- `$url` String - the tracked smart link URL

**Usage:**
```php
add_filter('fluent_crm/smartlink_by_short_url', function($smartLink, $url) {
    return $smartLink; // Return an object with target_url and title when you can resolve $url
}, 10, 2);
```

**Source:** `fluent-crm/app/Models/CampaignUrlMetric.php`
