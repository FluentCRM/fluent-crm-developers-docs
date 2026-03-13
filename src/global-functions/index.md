---
description: "Global helper functions in FluentCRM — options, meta CRUD, contact statuses, tracking, caching, and more."
---

# Global Functions

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Developer Guide" />

FluentCRM provides global helper functions defined in `app/Functions/helpers.php`. These are available anywhere after the plugin loads.

## FluentCrmApi()

The main entry point for FluentCRM's PHP API. Returns an API class instance for the given key.

```php
$api = FluentCrmApi($key);
```

**Available keys:**

| Key | Class | Documentation |
|-----|-------|---------------|
| `contacts` | `FluentCrm\App\Api\Classes\Contacts` | [Contact API](/global-functions/contact-api-function) |
| `companies` | `FluentCrm\App\Api\Classes\Companies` | [Company API](/global-functions/company-api-function) |
| `tags` | `FluentCrm\App\Api\Classes\Tags` | [Tag API](/global-functions/tag-api-function) |
| `lists` | `FluentCrm\App\Api\Classes\Lists` | [List API](/global-functions/list-api-function) |
| `extender` | `FluentCrm\App\Api\Classes\Extender` | [Extender API](/global-functions/extender-api-function) |
| `event_tracker` | `FluentCrm\App\Api\Classes\Tracker` | [Event Tracker API](/global-functions/tracker-api-function) |

```php
// Examples
$contact = FluentCrmApi('contacts')->getContact('john@example.com');
$company = FluentCrmApi('companies')->getCompany(15);
FluentCrmApi('event_tracker')->track([
    'email'     => 'john@example.com',
    'event_key' => 'page_visited',
    'title'     => 'Pricing Page Visit',
]);
```

---

## Options

FluentCRM stores its own options in the `fc_meta` table (not `wp_options`). These functions mirror WordPress's `get_option()` / `update_option()` / `delete_option()`.

### fluentcrm_get_option()

```php
$value = fluentcrm_get_option($optionName, $default = '');
```

**Parameters**
- `$optionName` `string` — Option key
- `$default` `mixed` — Value to return if option doesn't exist

**Returns** `mixed`

---

### fluentcrm_update_option()

```php
$id = fluentcrm_update_option($optionName, $value);
```

**Parameters**
- `$optionName` `string` — Option key
- `$value` `mixed` — Value to store

**Returns** `int` — Meta entry ID

---

### fluentcrm_delete_option()

```php
$deleted = fluentcrm_delete_option($optionName);
```

**Parameters**
- `$optionName` `string` — Option key

**Returns** `bool`

---

## Meta CRUD

All meta is stored in the `fc_meta` table with different `object_type` discriminators. FluentCRM provides typed helpers for each entity, plus a generic set.

### Generic Meta

```php
// Get meta entry — returns Meta model or null
$meta = fluentcrm_get_meta($objectId, $objectType, $key);

// Create or update meta — returns Meta model
$meta = fluentcrm_update_meta($objectId, $objectType, $key, $value);

// Delete meta — if $key is empty, deletes all meta for that object
$deleted = fluentcrm_delete_meta($objectId, $objectType, $key = '');
```

### Campaign Meta

```php
// Get — if $returnValue is true, returns the value directly (or false). Otherwise returns Meta model.
$meta = fluentcrm_get_campaign_meta($campaignId, $key, $returnValue = false);

// Create or update — returns Meta model
$meta = fluentcrm_update_campaign_meta($campaignId, $key, $value);

// Delete — if $key is empty, deletes all meta for that campaign
$deleted = fluentcrm_delete_campaign_meta($campaignId, $key = '');
```

### Subscriber (Contact) Meta

```php
// Get — returns the unserialized value, or $default
$value = fluentcrm_get_subscriber_meta($subscriberId, $key, $default = '');

// Create or update — returns SubscriberMeta model
$meta = fluentcrm_update_subscriber_meta($subscriberId, $key, $value);

// Delete
$deleted = fluentcrm_delete_subscriber_meta($subscriberId, $key);
```

### SMS Campaign Meta

```php
$meta = fluentcrm_get_sms_campaign_meta($campaignId, $key, $returnValue = false);
$meta = fluentcrm_update_sms_campaign_meta($campaignId, $key, $value);
$deleted = fluentcrm_delete_sms_campaign_meta($campaignId, $key = '');
```

### Template Meta

```php
$meta = fluentcrm_get_template_meta($templateId, $key);
$meta = fluentcrm_update_template_meta($templateId, $key, $value);
$deleted = fluentcrm_delete_template_meta($templateId, $key);
```

### List Meta

```php
$meta = fluentcrm_get_list_meta($listId, $key);
$meta = fluentcrm_update_list_meta($listId, $key, $value);
$deleted = fluentcrm_delete_list_meta($listId, $key);
```

---

## Contact Statuses & Types

### fluentcrm_subscriber_statuses()

Get all valid contact subscription statuses.

```php
$statuses = fluentcrm_subscriber_statuses($isOptions = false);
```

**Parameters**
- `$isOptions` `bool` — If `true`, returns formatted array with `id`, `slug`, `title` keys

**Returns** `array`

```php
fluentcrm_subscriber_statuses();
// ['subscribed', 'pending', 'unsubscribed', 'transactional', 'bounced', 'complained', 'spammed']

fluentcrm_subscriber_statuses(true);
// [['id' => 'subscribed', 'slug' => 'subscribed', 'title' => 'Subscribed'], ...]
```

**Filter:** [`fluent_crm/contact_statuses`](/hooks/filters/contacts#fluent-crm-contact-statuses)

---

### fluentcrm_subscriber_editable_statuses()

Same as `fluentcrm_subscriber_statuses()` but excludes `bounced`, `complained`, and `spammed`.

```php
$statuses = fluentcrm_subscriber_editable_statuses($isOptions = false);
```

**Filter:** [`fluent_crm/contact_editable_statuses`](/hooks/filters/contacts#fluent-crm-contact-editable-statuses)

---

### fluentcrm_subscriber_sms_statuses()

Get SMS subscription statuses.

```php
$statuses = fluentcrm_subscriber_sms_statuses($isOptions = false);
// ['sms_subscribed', 'sms_pending', 'sms_unsubscribed', 'sms_bounced']
```

---

### fluentcrm_contact_types()

Get contact type definitions.

```php
$types = fluentcrm_contact_types($isOptions = false);
// ['lead' => 'Lead', 'customer' => 'Customer']
```

**Filter:** [`fluent_crm/contact_types`](/hooks/filters/contacts#fluent-crm-contact-types)

---

### fluentcrm_activity_types()

Get contact note/activity type labels.

```php
$types = fluentcrm_activity_types();
// ['note' => 'Note', 'call' => 'Call', 'email' => 'Email', 'meeting' => 'Meeting', ...]
```

**Filter:** [`fluent_crm/contact_activity_types`](/hooks/filters/contacts#fluent-crm-contact-activity-types)

---

### fluentcrm_strict_statues()

Get statuses that block sending (contacts in these statuses won't receive emails).

```php
$statuses = fluentcrm_strict_statues();
// ['unsubscribed', 'bounced', 'complained', 'spammed']
```

---

### fluentCrmEmailSendableStatuses()

Get statuses eligible to receive campaign emails.

```php
$statuses = fluentCrmEmailSendableStatuses();
// ['subscribed', 'transactional']
```

**Filter:** [`fluent_crm/email_sendable_statuses`](/hooks/filters/contacts#fluent-crm-email-sendable-statuses)

---

## Current Contact

### fluentcrm_get_current_contact()

Get the current contact based on logged-in user ID or secure cookie.

```php
$contact = fluentcrm_get_current_contact();
// Returns false|\FluentCrm\App\Models\Subscriber
```

Shorthand for `FluentCrmApi('contacts')->getCurrentContact(true, true)`.

---

## Custom Fields

### fluentcrm_get_custom_contact_fields()

Get the custom field schema for contacts (cached).

```php
$fields = fluentcrm_get_custom_contact_fields();
```

**Returns** `array` — Field definitions from the `contact_custom_fields` option.

---

### fluentcrm_get_custom_company_fields()

Get the custom field schema for companies (cached).

```php
$fields = fluentcrm_get_custom_company_fields();
```

**Returns** `array` — Field definitions from the `company_custom_fields` option.

---

## Secure Hashes

### fluentCrmGetContactSecureHash()

Get or create a long-lived secure hash for a contact. Used for identifying contacts in email links.

```php
$hash = fluentCrmGetContactSecureHash($contactId);
// Returns string hash or false
```

---

### fluentCrmGetContactManagedHash()

Get or create a managed secure hash that auto-rotates every 30 days.

```php
$hash = fluentCrmGetContactManagedHash($contactId);
// Returns string hash
```

---

## Profile Widget

### fluentcrm_get_crm_profile_html()

Get the HTML for a contact's CRM profile widget (photo, name, status, tags, lists, stats).

```php
$html = fluentcrm_get_crm_profile_html($userIdOrEmail, $checkPermission = true, $withCss = true);
```

**Parameters**
- `$userIdOrEmail` `int|string` — WordPress user ID or email address
- `$checkPermission` `bool` — Whether to verify current user has permission to view
- `$withCss` `bool` — Whether to include CSS styles

**Returns** `string` — Profile widget HTML, or empty string on failure.

---

## Tracking Settings

### fluentcrmTrackClicking()

Check if click tracking is enabled.

```php
$tracking = fluentcrmTrackClicking();
// Returns true, false, or 'anonymous'
```

---

### fluentcrmTrackEmailOpen()

Check if open tracking is enabled.

```php
$tracking = fluentcrmTrackEmailOpen();
// Returns true, false, or 'anonymous'
```

---

### fluentCrmWillTrackIp()

Check if IP address tracking is enabled.

```php
$willTrack = fluentCrmWillTrackIp();
// Returns bool
```

---

### fluentCrmWillAnonymizeIp()

Check if IP addresses should be anonymized per compliance settings.

```php
$anonymize = fluentCrmWillAnonymizeIp();
// Returns bool
```

---

## Database Access

### fluentCrmDb()

Get a raw database connection instance for direct queries.

```php
$db = fluentCrmDb();
// Returns \FluentCrm\Framework\Database\Query\WPDBConnection
```

---

## Background Processing

### fluentcrm_queue_on_background()

Fire a non-blocking background HTTP request to process a task asynchronously via `admin-ajax.php`.

```php
fluentcrm_queue_on_background($callbackName, $payload);
```

**Parameters**
- `$callbackName` `string` — The callback function name
- `$payload` `mixed` — Data to pass to the callback

**Returns** `true`

---

## Caching

### fluentCrmGetFromCache()

Get a value from WP object cache, or compute and store it.

```php
$value = fluentCrmGetFromCache($key, $callback = false, $expire = 600);
```

**Parameters**
- `$key` `string` — Cache key
- `$callback` `callable|false` — If cache miss and callable provided, calls it and caches the result
- `$expire` `int` — Cache TTL in seconds (default 600)

---

### fluentCrmSetCache()

Set a value in WP object cache.

```php
fluentCrmSetCache($key, $value, $expire = 600);
```

---

### fluentCrmRunTimeCache()

Static in-memory key-value store. Persists only for the current PHP request.

```php
// Set a value
fluentCrmRunTimeCache('my_key', $value);

// Get a value
$value = fluentCrmRunTimeCache('my_key');
```

---

### fluentCrmPersistentCache()

Database-persisted cache using `fc_meta` table with `persistent_cache` object type.

```php
$value = fluentCrmPersistentCache($key, $callback = false, $expire = 600);
```

---

## RTL

### fluentcrm_is_rtl()

Check if email templates should render in RTL direction.

```php
$isRtl = fluentcrm_is_rtl();
// Returns bool
```

**Filter:** [`fluent_crm/is_rtl`](/hooks/filters/emails-and-sending#fluent-crm-is-rtl)

---

## Memory & Timing

### fluentCrmIsMemoryExceeded()

Check if PHP memory usage exceeds a given percentage of the limit.

```php
$exceeded = fluentCrmIsMemoryExceeded($percent = 75);
// Returns bool
```

---

### fluentCrmMaxRunTime()

Get the maximum safe execution time in seconds (capped at 55, minus 3 for safety).

```php
$seconds = fluentCrmMaxRunTime();
// Returns int
```

---

### fluentCrmIsTimeOut()

Check if execution time has exceeded the given limit since `FLUENT_CRM_STARTING_TIME`.

```php
$timedOut = fluentCrmIsTimeOut($maxSeconds = 30);
// Returns bool
```

---

## Menu URLs

### fluentcrm_menu_url_base()

Get the admin URL for FluentCRM's classic UI.

```php
$url = fluentcrm_menu_url_base($ext = '');
// e.g., 'admin.php?page=fluentcrm-admin#/'
```

---

### fluent_crm_menu_url_base_new()

Get the admin URL for FluentCRM's v3 UI.

```php
$url = fluent_crm_menu_url_base_new($ext = '');
// e.g., 'admin.php?page=fluent-crm-v3#/'
```

---

## Global Settings

### fluentcrmGetGlobalSettings()

Get a value from FluentCRM's global settings (stored in the `fluentcrm-global-settings` WP option).

```php
$value = fluentcrmGetGlobalSettings($key, $default = false);
```

---

## Gravatar

### fluentcrmGravatar()

Get a contact's Gravatar URL, respecting FluentCRM's compliance settings.

```php
$url = fluentcrmGravatar($email, $name = '');
```

Falls back to the default avatar URL when Gravatar is disabled.

**Source:** `app/Functions/helpers.php`
