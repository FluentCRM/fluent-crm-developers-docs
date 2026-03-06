---
description: "EventTracker Model stores custom event tracking data for contacts in FluentCRM."
---

# Event Tracker Model

| DB Table Name | {wp_db_prefix}_fc_event_tracking                                              |
|---------------|-------------------------------------------------------------------------------|
| Schema        | <a href="/database/#fc-event-tracking-table">Check Schema</a>   |
| Source File   | fluent-crm/app/Models/EventTracker.php                                        |
| Name Space    | FluentCrm\App\Models                                                          |
| Class         | FluentCrm\App\Models\EventTracker                                             |

## Attributes
<table class="nowrap">
   <thead>
      <tr>
         <th>Attribute</th>
         <td>Data Type</td>
         <td>Comment</td>
      </tr>
   </thead>
   <tbody>
      <tr>
         <th>id</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>subscriber_id</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>counter</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>created_by</th>
         <td>Integer</td>
         <td>Auto-set to current user on create</td>
      </tr>
      <tr>
         <th>provider</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>event_key</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>title</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>value</th>
         <td>Decimal</td>
         <td></td>
      </tr>
      <tr>
         <th>created_at</th>
         <td>Date Time</td>
         <td></td>
      </tr>
      <tr>
         <th>updated_at</th>
         <td>Date Time</td>
         <td></td>
      </tr>
   </tbody>
</table>

## Fillable Attributes

```php
'subscriber_id',
'counter',
'created_by',
'provider',
'event_key',
'title',
'value'
```

## Relations

### subscriber
Access the associated subscriber

- return `FluentCrm\App\Models\Subscriber` Model

#### Example:
```php
$subscriber = $event->subscriber;
```

## Usage

Events can be tracked on a subscriber using the `trackEvent()` method:

```php
$subscriber->trackEvent([
    'event_key' => 'purchase',
    'title' => 'Made a purchase',
    'value' => 99.99,
    'provider' => 'woo'
]);
```

Or via the FluentCRM API:

```php
FluentCrmApi('event_tracker')->track([
    'event_key' => 'login',
    'title' => 'User logged in',
    'subscriber' => $subscriber
]);
```
