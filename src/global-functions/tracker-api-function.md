---
description: "Event Tracker API — track custom events on contacts via FluentCrmApi('event_tracker')."
---

# Event Tracker API

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Developer Guide" />

The Event Tracker API lets you record custom events on contacts for segmentation, automation triggers, and reporting.

::: warning Experimental Feature
Event tracking must be enabled in FluentCRM settings (Experimental Features). If disabled, the `track()` method returns a `WP_Error`.
:::

## Initialization

```php
$tracker = FluentCrmApi('event_tracker');
```

Returns an instance of `FluentCrm\App\Api\Classes\Tracker`.

> **Note:** The API key is `event_tracker`, not `tracker`.

---

## Methods

### track()

Record a custom event on a contact.

```php
$result = $tracker->track($data, $repeatable = true);
```

**Parameters**
- `$data` `array` — Event data (see fields below)
- `$repeatable` `bool` — If `true` (default), increments the counter on an existing matching event instead of creating a duplicate row

**Returns** `\WP_Error` | `\FluentCrm\App\Models\EventTracker`

Returns `WP_Error` if:
- Event tracking is not enabled
- No contact could be resolved from the data
- Required fields (`event_key`, `title`) are missing

Fires [`fluent_crm/event_tracked`](/hooks/actions/contact-activity#fluent-crm-event-tracked) action hook on success.

**Data fields:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `event_key` | String | Yes | Event identifier (max 192 chars) |
| `title` | String | Yes | Human-readable event name (max 192 chars) |
| `subscriber_id` | Integer | No | Contact ID — use this OR `email` OR `user_id` |
| `email` | String | No | Contact email — resolved to subscriber |
| `user_id` | Integer | No | WordPress user ID — resolved to subscriber |
| `subscriber` | Subscriber | No | Pass a Subscriber instance directly to skip lookup |
| `provider` | String | No | Source identifier (default: `'custom'`) |
| `value` | String/Number | No | Optional event value (e.g., order amount) |

The contact is resolved in this order: `subscriber` instance > `subscriber_id` > `email` > `user_id` > current contact.

**Example:**

```php
$tracker = FluentCrmApi('event_tracker');

// Track by email
$result = $tracker->track([
    'email'     => 'john@example.com',
    'event_key' => 'pricing_page_visit',
    'title'     => 'Visited Pricing Page',
    'provider'  => 'my_plugin',
]);

// Track by subscriber ID with a value
$result = $tracker->track([
    'subscriber_id' => 42,
    'event_key'     => 'purchase_completed',
    'title'         => 'Purchase Completed',
    'value'         => 99.99,
    'provider'      => 'woocommerce',
]);

// Track by WordPress user ID
$result = $tracker->track([
    'user_id'   => get_current_user_id(),
    'event_key' => 'course_completed',
    'title'     => 'Completed Course: PHP 101',
]);

// Check for errors
if (is_wp_error($result)) {
    error_log($result->get_error_message());
}
```

### Repeatable Events

When `$repeatable` is `true` (default), if an event with the same `event_key` and `provider` already exists for the contact, the existing event's counter is incremented instead of creating a new row. Set to `false` to always create a new event record.

```php
// First call creates the event
$tracker->track([
    'email'     => 'john@example.com',
    'event_key' => 'login',
    'title'     => 'User Login',
]);

// Second call increments the counter (same event_key)
$tracker->track([
    'email'     => 'john@example.com',
    'event_key' => 'login',
    'title'     => 'User Login',
]);
```

See also: [Event Tracking Module](/modules/event-tracking) for a full walkthrough.

**Source:** `app/Api/Classes/Tracker.php`
