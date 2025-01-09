---
description: "Learn about the Subscriber Note Model in FluentCRM, designed to add, manage, and organize notes for individual subscribers."
---

# Subscriber Note Model

| DB Table Name | {wp_db_prefix}_fc_subscriber_notes                                       |
|---------------|--------------------------------------------------------------------------|
| Schema        | <a :href="$withBase('/database/#fc-subscribers-table')">Check Schema</a> |
| Source File   | fluent-crm/app/Models/SubscriberNote.php                                 |
| Name Space    | FluentCrm\App\Models                                                     |
| Class         | FluentCrm\App\Models\SubscriberNote                                      |

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
         <th>parent_id</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>created_by</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>status</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>type</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>is_private</th>
         <td>Boolean</td>
         <td></td>
      </tr>
      <tr>
         <th>title</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>description</th>
         <td>Text</td>
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

$note = FluentCrm\App\Models\SubscriberNote::find(1);

$note->id; // returns id
$note->title; // returns meta title
.......
```


## Fillable Attributes

```php

'subscriber_id',
'parent_id',
'created_by',
'status',
'type',
'is_private',
'title',
'description'
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
$notes = FluentCrm\App\Models\SubscriberNote::whereHas('subscriber', function($query) {
    $query->whereIn('id', [1,2,3]);
})->get();

// Get notes which does not have subscriber ids: 1/2/3
$notes = FluentCrm\App\Models\SubscriberNote::whereDoesntHave('subscriber', function($query) {
    $query->whereIn('id', [1,2,3]);
})->get();

```



## Methods
Along with Global Model methods, this model has few helper methods.

### markAs($status)
Get total number of subscribers of a tag

- Parameters
    - $status `string`
- Returns `FluentCrm\App\Models\SubscriberNote`

#### Usage
```php 
$note = $note->markAs('open');
```


### createdBy()
Get note creator personal information

- Parameters
    - none
- Returns `array`

#### Usage
```php 
$creatorInfo = $note->createdBy();
```