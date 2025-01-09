---
description: "Subscriber Pivot Model"
---

# Subscriber Pivot Model

| DB Table Name | {wp_db_prefix}_fc_subscriber_pivot                                       |
|---------------|--------------------------------------------------------------------------|
| Schema        | <a :href="$withBase('/database/#fc-subscribers-table')">Check Schema</a> |
| Source File   | fluent-crm/app/Models/SubscriberPivot.php                                 |
| Name Space    | FluentCrm\App\Models                                                     |
| Class         | FluentCrm\App\Models\SubscriberPivot                                      |

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
         <th>object_id</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>object_type</th>
         <td>String</td>
         <td></td>
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
$pivot->is_public; // returns meta is_public
.......
```


## Fillable Attributes

```php

'subscriber_id',
'object_id',
'object_type',
'status',
'is_public'
```


## Scopes

This model has the following scopes that you can use

### filter($constraints)
Filter by `subscriber_id`, `object_id`, `object_type`, `status`, `is_public`

- Parameters
  - $constraints `array` 
#### Usage:

```php 
// Search all pivots
$pivots = FluentCrm\App\Models\SubscriberPivot::filter([
  'subscriber_id' => 1,
  'object_id'     => 1
])->get();
```



## Relations
This model has the following relationships that you can use

### subscriber
Access all the associated subscriber of a model

- return `FluentCrm\App\Models\Subscriber` Model Collections

#### Example:
```php 
// Accessing Subscriber
$subscriber = $note->subscriber;

// For Filtering by subscriber relationship

// Get notes which has subscriber ids: 1/2/3
$notes = FluentCrm\App\Models\SubscriberPivot::whereHas('subscriber', function($query) {
    $query->whereIn('id', [1,2,3]);
})->get();

// Get notes which does not have subscriber ids: 1/2/3
$notes = FluentCrm\App\Models\SubscriberPivot::whereDoesntHave('subscriber', function($query) {
    $query->whereIn('id', [1,2,3]);
})->get();

```



## Methods
Along with Global Model methods, this model has few helper methods.

### store($attributes)
Store subscriber pivot info

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


### attach($items, $subscriber, $type)
Attach tags/lists to the subscriber

- Parameters
    - $items `array` List or Tag ids
    - $subscriber `int` Subscriber ID
    - $type `string` List or Tag class namespace
- Returns `void`

#### Usage
```php 
FluentCrm\App\Models\SubscriberPivot::attach([1,3], 1, 'FluentCrm\App\Models\Tag');
```