# Sanitize

`FluentCrm\App\Services\Sanitize`

The `Sanitize` class provides static methods for sanitizing data before it is saved to the database. Each method applies field-specific sanitization functions (e.g., `sanitize_text_field`, `intval`, `sanitize_email`, `wp_kses_post`) based on the data type.

```php
use FluentCrm\App\Services\Sanitize;
```

## `campaign($data)`

Sanitizes campaign data fields.

- **Parameters:** `array $data`
- **Returns:** `array` — Sanitized data

**Field sanitization rules:**

| Field | Function |
|-------|----------|
| `title` | `sanitize_text_field` |
| `slug` | `sanitize_text_field` |
| `template_id` | `intval` |
| `email_subject` | `sanitize_text_field` |
| `email_pre_header` | `sanitize_text_field` |
| `utm_status` | `intval` |
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` | `sanitize_text_field` |
| `scheduled_at` | `sanitize_text_field` |
| `design_template` | `sanitize_text_field` |

```php
$cleanData = Sanitize::campaign($request->all());
```

## `contact($data)`

Sanitizes contact/subscriber data fields. Also validates that `status` is one of the allowed subscriber statuses.

- **Parameters:** `array $data`
- **Returns:** `array` — Sanitized data (with invalid `status` removed)

**Field sanitization rules:**

| Field | Function |
|-------|----------|
| `first_name`, `last_name`, `prefix` | `sanitize_text_field` |
| `email` | `sanitize_email` |
| `user_id`, `total_points`, `company_id` | `intval` |
| `avatar` | `esc_url_raw` |
| `status`, `contact_type`, `phone`, `city`, `state`, `country`, `postal_code`, `timezone`, `date_of_birth`, `source`, `address_line_1`, `address_line_2`, `life_time_value`, `ip`, `latitude`, `longitude` | `sanitize_text_field` |

**Status validation:** If `status` is not in `fluentcrm_subscriber_statuses()` (`subscribed`, `pending`, `unsubscribed`, `bounced`, `complained`), it is removed from the data.

```php
$cleanData = Sanitize::contact([
    'email'      => 'john@example.com',
    'first_name' => 'John',
    'status'     => 'subscribed'
]);
```

## `contactNote($data)`

Sanitizes contact note data. Uses `wp_kses_post` for the `description` field to allow safe HTML.

- **Parameters:** `array $data`
- **Returns:** `array`

**Field sanitization rules:**

| Field | Function |
|-------|----------|
| `subscriber_id`, `parent_id` | `intval` |
| `created_by`, `status`, `type`, `title` | `sanitize_text_field` |
| `description` | `wp_kses_post` |
| `created_at` | `sanitize_text_field` |

## `funnel($data)`

Sanitizes automation funnel data.

- **Parameters:** `array $data`
- **Returns:** `array`

**Field sanitization rules:**

| Field | Function |
|-------|----------|
| `type`, `title`, `trigger_name`, `status` | `sanitize_text_field` |
| `created_by` | `intval` |
| `updated_at` | `sanitize_text_field` |

## `company($data)`

Sanitizes company data. Also processes `custom_values` through the custom company field formatter.

- **Parameters:** `array $data`
- **Returns:** `array`

**Field sanitization rules:**

| Field | Function |
|-------|----------|
| `name`, `industry`, `type`, `phone`, `city`, `state`, `country`, `postal_code`, `address_line_1`, `address_line_2` | `sanitize_text_field` |
| `email` | `sanitize_email` |
| `owner_id`, `employees_number` | `intval` |
| `description` | `wp_kses_post` |
| `website`, `linkedin_url`, `facebook_url`, `twitter_url`, `logo` | `esc_url_raw` |

If `custom_values` is present, it is formatted through `CustomCompanyField::formatCustomFieldValues()`.

## `sanitizeTagIds($inputTagIds, $willCreate = true)`

Converts a mixed array of tag inputs (numeric IDs or title strings) into an array of numeric tag IDs. Non-numeric values are looked up by title/slug; if not found and `$willCreate` is `true`, a new tag is created.

- **Parameters:** `array $inputTagIds`, `bool $willCreate` (default: `true`)
- **Returns:** `array` — Array of integer tag IDs

```php
// Mix of IDs and titles
$tagIds = Sanitize::sanitizeTagIds([1, 'VIP', 'Newsletter']);
// [1, 5, 12] — existing ID kept, 'VIP' resolved to 5, 'Newsletter' created as 12

// Lookup only, don't create
$tagIds = Sanitize::sanitizeTagIds(['VIP', 'Unknown'], false);
// [5] — 'Unknown' skipped since it doesn't exist
```

::: info
Title strings shorter than 3 characters are skipped.
:::

## `sanitizeListIds($inputListIds, $willCreate = true)`

Same as `sanitizeTagIds` but for lists. Converts mixed list inputs to numeric list IDs.

- **Parameters:** `array $inputListIds`, `bool $willCreate` (default: `true`)
- **Returns:** `array` — Array of integer list IDs

```php
$listIds = Sanitize::sanitizeListIds([2, 'Weekly Digest']);
// [2, 8]
```
