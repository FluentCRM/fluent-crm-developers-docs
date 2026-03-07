---
title: Event Tracking
description: "Learn how to track custom contact events and activities in FluentCRM using the PHP API, REST API, or action hooks."
---

# Event Tracking

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

Event Tracking captures data on contact behaviors. You can programmatically create events for any activity or generate them from automations. Events can be used to filter contacts or as conditions in automation logic.

There are three methods to create events: PHP API, REST API, and Action Hook.

## Event Data

| Key | Type | Required | Description | Default |
|-----|------|----------|-------------|---------|
| `title` | String | Yes | Event display title | — |
| `event_key` | String | Yes | Unique event identifier | — |
| `email` | String | No | Contact email (used to find the contact) | — |
| `user_id` | String/Number | No | WordPress user ID | — |
| `subscriber_id` | String/Number | No | FluentCRM subscriber ID | — |
| `value` | String | No | Additional event data | — |
| `provider` | String | No | Source identifier | `custom` |

You must provide at least one of `email`, `user_id`, or `subscriber_id` to identify the contact. If none is provided, FluentCRM will try to find the current logged-in contact.

::: tip
If the `event_key` and `title` combination already exists for a contact, FluentCRM increments the counter instead of creating a new event record.
:::

## PHP API

```php
$tracker = FluentCrmApi('event_tracker')->track([
    'event_key' => 'fcrm_event_tested',
    'title'     => 'Testing FluentCRM Event',
    'value'     => 'This is my event value with plain Text',
    'email'     => 'john@example.com',
    'provider'  => 'woocommerce',
], true);
```

The second parameter (`true`) triggers the `fluent_crm/track_event_activity_done` action after the event is recorded.

---

## REST API

**Endpoint:** `POST /wp-json/fluent-crm/v2/subscribers/track-event`

```json
{
    "event_key": "testing_from_rest_api",
    "title": "Testing From REST API",
    "email": "john@example.com",
    "value": "This is my event value with plain text",
    "provider": "woocommerce"
}
```

---

## Action Hook

```php
do_action('fluent_crm/track_event_activity', [
    'event_key' => 'fcrm_event_tested',
    'title'     => 'Testing FluentCRM Event',
    'value'     => 'This is my event value with plain Text',
    'email'     => 'john@example.com',
    'provider'  => 'woocommerce',
], true);
```

---

## Retrieving Events

Get all tracked events for a specific contact:

**Endpoint:** `GET /wp-json/fluent-crm/v2/subscribers/{ID}/tracking-events`

**Response:**
```JSON
{
    "events": {
        "total": 3,
        "per_page": 15,
        "current_page": 1,
        "last_page": 1,
        "next_page_url": null,
        "prev_page_url": null,
        "from": 1,
        "to": 3,
        "data": [
            {
                "id": 2,
                "subscriber_id": "12555",
                "counter": "1",
                "created_by": "0",
                "provider": "woocommerce",
                "event_key": "fcrm_event_tested",
                "title": "Testing FluentCRM Event",
                "value": "This is my event value with plain Text",
                "created_at": "2024-01-17 14:27:35",
                "updated_at": "2024-01-17 14:27:35"
            },
            {
                "id": 1,
                "subscriber_id": "12555",
                "counter": "3",
                "created_by": "0",
                "provider": "custom",
                "event_key": "testing_from_rest_API",
                "title": "Testing From REST API",
                "value": "Hello There",
                "created_at": "2024-01-17 14:14:44",
                "updated_at": "2024-01-17 14:27:35"
            }
        ]
    }
}
```
