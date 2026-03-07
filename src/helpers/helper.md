# Core Helper Class

`FluentCrm\App\Services\Helper`

The `Helper` class is the main utility class in FluentCRM. It provides 50+ static methods for working with contacts, email settings, SmartCodes, templates, compliance, and more.

```php
use FluentCrm\App\Services\Helper;
```

## Contact Management

### `getWPMapUserInfo($user)`

Maps a WordPress user to a FluentCRM contact data array. Automatically pulls WooCommerce billing fields if available.

- **Parameters:** `int|WP_User $user` — User ID or WP_User object
- **Returns:** `array` — Contact field array (user_id, first_name, last_name, email, address fields, phone)
- **Filter:** `fluentcrm_user_map_data`

```php
$contactData = Helper::getWPMapUserInfo($userId);
// ['user_id' => 5, 'first_name' => 'John', 'email' => 'john@example.com', ...]
```

### `deleteContacts($contactIds)`

Deletes contacts by their IDs. Fires `fluentcrm_before_subscribers_deleted` and `fluentcrm_after_subscribers_deleted` hooks.

- **Parameters:** `int|array $contactIds`
- **Returns:** `bool`

```php
Helper::deleteContacts([1, 2, 3]);
```

### `sendDoubleOptin($contactIds)`

Sends double opt-in confirmation emails to contacts with `pending` status.

- **Parameters:** `int|array $contactIds`
- **Returns:** `bool`

```php
Helper::sendDoubleOptin([10, 11, 12]);
```

### `createNewTags($tagsArray)`

Creates tags by title if they don't already exist. Returns an array of tag IDs (existing or newly created).

- **Parameters:** `array $tagsArray` — Array of tag title strings
- **Returns:** `array` — Array of tag IDs

```php
$tagIds = Helper::createNewTags(['VIP', 'Newsletter']);
// [5, 12]
```

### `createNewLists($listsArray)`

Creates lists by title if they don't already exist. Returns an array of list IDs.

- **Parameters:** `array $listsArray` — Array of list title strings
- **Returns:** `array` — Array of list IDs

```php
$listIds = Helper::createNewLists(['Weekly Digest', 'Product Updates']);
```

### `searchWPUsers($searchQuery, $limit = 20)`

Searches WordPress users by login, email, and nicename. Excludes Administrators.

- **Parameters:** `string $searchQuery`, `int $limit` (default: 20)
- **Returns:** `array` — Array of WP_User objects

```php
$users = Helper::searchWPUsers('john', 10);
```

### `getContactPrefixes($withKeyed = false)`

Returns available contact name prefixes (Mr, Mrs, Ms, etc.).

- **Parameters:** `bool $withKeyed` — If true, returns associative array `['Mr' => 'Mr', ...]`
- **Returns:** `array`
- **Filter:** `fluent_crm/contact_name_prefixes`

### `latestListIdOfSubscriber($contactId)`

Returns the most recently assigned list ID for a contact.

- **Parameters:** `int $contactId`
- **Returns:** `int|null`

---

## SmartCodes & Templates

### `getGlobalSmartCodes()`

Returns all available SmartCode groups for the template editor — contact fields, custom fields, and general codes.

- **Returns:** `array` — Array of SmartCode group arrays, each with `key`, `title`, and `shortcodes`
- **Filter:** `fluent_crm/smartcode_groups`

Returns an array of SmartCode group arrays. Each group has `key`, `title`, and `shortcodes` keys. The `shortcodes` key contains an associative array mapping SmartCode placeholders to their human-readable labels (e.g., contact fields, custom fields, general/CRM codes).

### `getExtendedSmartCodes()`

Returns Pro and third-party extended SmartCode groups registered via the `fluent_crm/extended_smart_codes` filter.

- **Returns:** `array`

### `hasComplianceText($text)`

Checks whether an email body contains unsubscribe/manage-subscription SmartCodes (used for compliance validation before sending).

- **Parameters:** `string $text`
- **Returns:** `bool`
- **Filter:** `fluent_crm/disable_check_compliance_string`

```php
if (!Helper::hasComplianceText($emailBody)) {
    // Warn: email is missing unsubscribe link
}
```

### `hasConditionOnString($string)`

Returns `true` if a string contains conditional content SmartCode markers.

- **Parameters:** `string $string`
- **Returns:** `bool`

---

## Email Settings & Design

### `getGlobalEmailSettings()`

Returns global email settings including sender info, footer, and preference form config.

- **Returns:** `array` with keys: `from_name`, `from_email`, `emails_per_second`, `email_footer`, `pref_list_type`, `pref_list_items`, `pref_form`, `pref_general`, `pref_custom`

```php
$settings = Helper::getGlobalEmailSettings();
$fromEmail = $settings['from_email'];
$sendRate = $settings['emails_per_second']; // e.g., 15
```

### `getDoubleOptinSettings()`

Returns double opt-in email settings (subject, body, design template, confirmation page config).

- **Returns:** `array`

### `getEmailDesignTemplates()`

Returns all registered email design template definitions.

- **Returns:** `array` — Keyed by template name, each with `template_name`, `label`, `image`, `config`, `use_gutenberg`

### `getTemplateConfig($templateName = '', $withGlobal = true)`

Returns the configuration array for a named email design template, optionally merged with global style overrides.

- **Parameters:** `string $templateName` (defaults to the default template), `bool $withGlobal`
- **Returns:** `array`

### `getDefaultEmailTemplate()`

Returns the default email design template name (default: `'simple'`).

- **Returns:** `string`
- **Filter:** `fluent_crm/default_email_design_template`

### `getMailHeadersFromSettings($emailSettings = [])`

Builds email headers array (From, Reply-To) from provided or global email settings.

- **Parameters:** `array $emailSettings` (optional — uses global settings if empty)
- **Returns:** `array`

### `getEmailFooterContent($campaign = null)`

Returns the effective footer content for a campaign. Falls back to global footer if no custom footer is set.

- **Parameters:** `Campaign|null $campaign`
- **Returns:** `string`

### `getFooterConfig($campaign = null)`

Returns footer configuration including font size, color, and whether footer is disabled.

- **Parameters:** `Campaign|null $campaign`
- **Returns:** `array` with keys: `disable_footer`, `custom_footer`, `footer_content`, `font_size`, `font_color`

---

## Email Sending & Tracking

### `injectTrackerPixel($emailBody, $hash, $emailId = null)`

Injects a 1x1 tracking pixel image into email HTML for open tracking. Respects the `fluentcrmTrackEmailOpen()` setting.

- **Parameters:** `string $emailBody`, `string $hash`, `int|null $emailId`
- **Returns:** `string` — Modified HTML

### `generateEmailHash($insertId)`

Generates a UUID v4 for use as an email open-tracking hash.

- **Parameters:** `int $insertId` (not used internally, kept for interface compatibility)
- **Returns:** `string` — UUID v4

### `maybeDisableEmojiOnEmail()`

Removes WordPress emoji-to-image conversion filters when sending emails. Runs once per request.

- **Returns:** `void`

### `willMultiThreadEmail($minPendingLimit = 300)`

Returns `true` if multi-thread email sending should activate (requires experimental setting enabled + pending email count above threshold).

- **Parameters:** `int $minPendingLimit` (default: 300)
- **Returns:** `bool`

### `getUpcomingEmailCount()`

Returns the count of pending/scheduled campaign emails due for sending.

- **Returns:** `int`

---

## URL & Tracking

### `getLinksFromString($string)`

Extracts all `href` URLs from anchor tags in an HTML string.

- **Parameters:** `string $string`
- **Returns:** `array` — Array of URL strings

```php
$urls = Helper::getLinksFromString($emailHtml);
// ['https://example.com/page1', 'https://example.com/page2']
```

### `urlReplaces($string)`

Builds a map of original `href` attributes to click-tracking redirect URLs.

- **Parameters:** `string $string` — HTML string
- **Returns:** `array` — `['href="original_url"' => 'tracking_url', ...]`

### `attachUrls($html, $campaignUrls, $insertId, $hash = false)`

Replaces tracked URL placeholders in email HTML with click-tracked URLs (appends `&mid=` and `&fch=` parameters).

- **Parameters:** `string $html`, `array $campaignUrls`, `int $insertId`, `string|false $hash`
- **Returns:** `string`

### `recordCampaignRevenue($campaignId, $amount, $orderId, $currency = 'USD', $isRefunded = false)`

Accumulates revenue attribution data for a campaign. Handles both new orders and refunds.

- **Parameters:** `int $campaignId`, `float $amount`, `int $orderId`, `string $currency`, `bool $isRefunded`
- **Returns:** `Meta`

---

## Profile & UI

### `getProfileSections()`

Returns the contact profile sub-navigation sections array (Overview, Emails, Notes, etc.). Sections are conditional based on active modules.

- **Returns:** `array`
- **Filter:** `fluentcrm_profile_sections`

```php
$sections = Helper::getProfileSections();
/*
[
    'subscriber' => ['name' => 'subscriber', 'title' => 'Overview', 'handler' => 'route'],
    'subscriber_emails' => ['name' => 'subscriber_emails', 'title' => 'Emails', ...],
    ...
]
*/
```

### `getActivatedFeatures()`

Returns an array of feature flags indicating which modules are active.

- **Returns:** `array` with keys: `fluentcampaign` (bool), `company_module` (bool), `event_tracking` (bool), `email_open_tracking` (bool), `email_click_tracking` (bool)

```php
$features = Helper::getActivatedFeatures();
if ($features['fluentcampaign']) {
    // Pro is active
}
```

### `getAdvancedFilterOptions()`

Returns the full advanced filter field schema used by the contacts filter UI.

- **Returns:** `array`
- **Filter:** `fluentcrm_advanced_filter_options`

### `getPurchaseHistoryProviders()`

Returns registered commerce provider options (WooCommerce, FluentCart, EDD, etc.).

- **Returns:** `array`
- **Filter:** `fluent_crm/purchase_history_providers`

---

## Settings & Config

### `getComplianceSettings()`

Returns GDPR/compliance settings with defaults.

- **Returns:** `array` with keys: `anonymize_ip`, `delete_contact_on_user`, `personal_data_export`, `one_click_unsubscribe`, `enable_gravatar`, `gravatar_fallback`, `email_click_tracking`, `email_open_tracking`

### `isExperimentalEnabled($module)`

Returns `true` if a named experimental feature is enabled.

- **Parameters:** `string $module` — e.g., `'company_module'`, `'event_tracking'`, `'sms_module'`
- **Returns:** `bool`

```php
if (Helper::isExperimentalEnabled('event_tracking')) {
    // Event tracking is active
}
```

### `isCompanyEnabled()`

Returns `true` if the Companies module is active. Shortcut for `isExperimentalEnabled('company_module')`.

- **Returns:** `bool`

### `isUserSyncEnabled()`

Returns `true` if WordPress User to Contact sync is enabled.

- **Returns:** `bool`

### `isContactDeleteOnUserDeleteEnabled()`

Returns `true` if contacts should be deleted when their associated WordPress user is deleted.

- **Returns:** `bool`

---

## Utilities

### `parseArrayOrJson($value, $default = [])`

Parses a mixed input (array or JSON string) into an array. Handles WordPress slashed strings. Returns `$default` on failure.

- **Parameters:** `mixed $value`, `array $default`
- **Returns:** `array`

```php
$data = Helper::parseArrayOrJson('{"key": "value"}');
// ['key' => 'value']

$data = Helper::parseArrayOrJson(['already', 'an', 'array']);
// ['already', 'an', 'array']
```

### `sanitizeHtml($html)`

Sanitizes HTML using `wp_kses` with an extended allowed-tag list that includes `<style>`, `<iframe>`, SVG tags, and button `onclick`.

- **Parameters:** `string $html`
- **Returns:** `string`
- **Filter:** `fluent_crm/allowed_html_tags`

### `slugify($text, $fallback = '')`

Converts text to a URL-friendly slug. Handles Latin and non-Latin scripts. Falls back to `generateUniqueId()` for non-Latin text.

- **Parameters:** `string $text`, `string $fallback`
- **Returns:** `string`

```php
Helper::slugify('Hello World');   // 'hello-world'
Helper::slugify('Über Cool');     // 'uber-cool'
Helper::slugify('مرحبا');          // generates unique ID
```

### `generateUniqueId()`

Generates a unique ~11-character hyphenated ID.

- **Returns:** `string` — e.g., `'6f1a2-xyz12'`

### `debugLog($title, $description = '', $type = 'info')`

Writes a system log entry when debug logging is enabled (via `FLUENT_CRM_DEBUG_LOG` constant or experimental setting).

- **Parameters:** `string $title`, `string|array $description`, `string $type`
- **Returns:** `SystemLog|null`

```php
Helper::debugLog('Webhook received', json_encode($payload));
```

### `getStatusText($text)`

Returns a human-readable, translated label for a contact/campaign status slug.

- **Parameters:** `string $text` — e.g., `'subscribed'`, `'pending'`, `'bounced'`
- **Returns:** `string` — e.g., `'Subscribed'`, `'Pending'`, `'Bounced'`
