---
description: "Subscriber Pivot Model manages the many-to-many relationships between subscribers and tags, lists, or companies."
---

# Subscriber Pivot Model

| DB Table Name | {wp_db_prefix}_fc_subscriber_pivot                                            |
|---------------|-------------------------------------------------------------------------------|
| Schema        | <a href="/database/#fc-subscriber-pivot-table">Check Schema</a> |
| Source File   | fluent-crm/app/Models/SubscriberPivot.php                                     |
| Name Space    | FluentCrm\App\Models                                                          |
| Class         | FluentCrm\App\Models\SubscriberPivot                                          |

::: tip Shared Pivot Table
This table is used for Tags, Lists, and Companies relationships. The `object_type` column stores the fully-qualified class name to discriminate between them:
- `FluentCrm\App\Models\Tag`
- `FluentCrm\App\Models\Lists`
- `FluentCrm\App\Models\Company`
:::

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
         <td>FK to fc_subscribers.id</td>
      </tr>
      <tr>
         <th>object_id</th>
         <td>Integer</td>
         <td>FK to tag/list/company ID</td>
      </tr>
      <tr>
         <th>object_type</th>
         <td>String</td>
         <td>Fully-qualified class name (discriminator)</td>
      </tr>
      <tr>
         <th>status</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>is_public</th>
         <td>Boolean</td>
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

## Usage
Please check <a href="/database/models/">Model Basic</a> for Common methods.


### Accessing Attributes

```php

$pivot = FluentCrm\App\Models\SubscriberPivot::find(1);

$pivot->id; // returns id
$pivot->object_type; // returns the class name
.......
```


## Scopes

### filter($constraints)
Filter by any attribute (subscriber_id, object_id, object_type, status, is_public)

- Parameters
  - $constraints `array`
#### Usage:

```php
$pivots = FluentCrm\App\Models\SubscriberPivot::filter([
  'subscriber_id' => 1,
  'object_type'   => 'FluentCrm\App\Models\Tag'
])->get();
```


## Methods

### store($attributes) <Badge type="tip" text="static" />
Create a new pivot record with auto timestamps

- Parameters
    - $attributes `array`
- Returns `FluentCrm\App\Models\SubscriberPivot`

#### Usage
```php
$pivot = FluentCrm\App\Models\SubscriberPivot::store([
  'subscriber_id' => 1,
  'object_id'     => 1,
  'object_type'   => 'FluentCrm\App\Models\Tag',
  'is_public'     => 1
]);
```


### attach($items, $subscriber, $type) <Badge type="tip" text="static" />
Attach tags/lists/companies to a subscriber. Creates pivot rows using firstOrCreate and fires appropriate hooks.

- Parameters
    - $items `array` — Tag, List, or Company IDs
    - $subscriber `int` — Subscriber ID
    - $type `string` — Fully-qualified class name
- Returns `void`

#### Usage
```php
FluentCrm\App\Models\SubscriberPivot::attach([1,3], 1, 'FluentCrm\App\Models\Tag');
```

### detach($items, $subscriber, $type) <Badge type="tip" text="static" />
Detach tags/lists/companies from a subscriber. Deletes pivot rows and fires appropriate hooks.

- Parameters
    - $items `array` — Tag, List, or Company IDs
    - $subscriber `int` — Subscriber ID
    - $type `string` — Fully-qualified class name
- Returns `void`

#### Usage
```php
FluentCrm\App\Models\SubscriberPivot::detach([1,3], 1, 'FluentCrm\App\Models\Tag');
```
