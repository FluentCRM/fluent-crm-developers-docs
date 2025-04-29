---
description: "Event Tracking is a versatile feature designed to capture data on various contact behaviors. It allows you to programmatically create events for any activity or generate them from different automations."
---

## Event Tracking

Event Tracking is a versatile feature designed to capture data on various contact behaviors. It allows you to programmatically create events for any activity or generate them from different automations. These events can then be utilized to filter contacts or incorporated into automation conditional logics, offering flexibility in monitoring and responding to user interactions.

There are various methods to create it. Let's go through the process step by step. Initially, we will explore how to create it using the PHP API.


<table cellspacing="0" class="nowrap">
<thead><tr><th>Key</th><td>Type</td><td>Description</td><td>Default</td></tr></thead>
<tbody>
<tr><th>title</th><td>String</td><td>title is required</td><td></td></tr>
<tr><th>event_key</th><td>String</td><td>event_key is required</td><td></td></tr>
<tr><th>email</th><td>String</td><td></td><td></td></tr>
<tr><th>subscriber_id</th><td>String / Number</td><td></td><td></td></tr>
<tr><th>value</th><td>String</td><td>optional field</td><td></td></tr>
<tr><th>provider</th><td>String</td><td>optional field</td><td>custom</td></tr>
</tbody>
</table>

<hr/>

**Example of PHP API**

```php
$tracker = FluentCrmApi('event_tracker')->track([
    'event_key' => 'fcrm_event_tested', // Required
    'title'     => 'Testing FluentCRM Event', // Required
    'value'     => 'This is my event value with plain Text',
    'email'     => 'success+3000@simulator.amazonses.com', // check note
    'user_id' => '', // check note
    'subscriber_id' => '', // check note
    'provider'  => 'woocommerce' // If left empty, 'custom' will be added.
], true);
```
Note: You may provide any of these values: email / subscriber_id / subscriber_id. If not values is given FluentCRM will try to find the the current contact.


Remember one thing: if the `event_key` and `title` are the same, it only increments the count and doesn't create a new event.

<hr/>

### Now let's see how to create with Rest API.

API: `https://your-domain.com/wp-json/fluent-crm/v2/subscribers/track-event`

***Body JSON***
```JSON
{
    "event_key": "testing_from_rest_API",
    "title": "Testing From REST API",
    "email": "success+3000@simulator.amazonses.com",
    "value": "This is my event value with plain Text",
    "provider": "woocommerce"
}
```
<hr/>

### Now let's see how to create with Action Hook.

**Example of Action Hook**

```php
do_action('fluent_crm/track_event_activity', [
    'event_key' => 'fcrm_event_tested',
    'title'     => 'Testing FluentCRM Event',
    'value'     => 'This is my event value with plain Text',
    'email'     => 'success+3000@simulator.amazonses.com',
    'provider'  => 'woocommerce'
], true);
```

<hr />

### Get events of a single contact

If you want to see the event tracking of a single contact, let's see how you can do that.

API: `https://your-domain.com/wp-json/fluent-crm/v2/subscribers/{ID}/tracking-events`

Then You will get response like this:
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
