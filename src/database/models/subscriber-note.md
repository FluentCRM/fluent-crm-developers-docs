---
description: "Learn about the Subscriber Note Model in FluentCRM, designed to add, manage, and organize notes for individual subscribers."
---

# Subscriber Note Model

| DB Table Name | {wp_db_prefix}_fc_subscriber_notes                                            |
|---------------|-------------------------------------------------------------------------------|
| Schema        | <a href="/database/#fc-subscriber-notes-table">Check Schema</a> |
| Source File   | fluent-crm/app/Models/SubscriberNote.php                                      |
| Name Space    | FluentCrm\App\Models                                                          |
| Class         | FluentCrm\App\Models\SubscriberNote                                           |

## Global Scope

This model has a global scope that **excludes** rows where `status IN ('_company_note_', '_system_log_')`. This means queries on `SubscriberNote` only return regular contact notes.

::: tip Shared Table
The `fc_subscriber_notes` table is shared by three models:
- **SubscriberNote** — regular contact notes (excludes `_company_note_` and `_system_log_` statuses)
- **CompanyNote** — company notes (`status = '_company_note_'`)
- **SystemLog** — system log entries (`status = '_system_log_'`)
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
         <td>Auto-set to current user on create</td>
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
         <td>Auto-set on create</td>
      </tr>
      <tr>
         <th>updated_at</th>
         <td>Date Time</td>
         <td>Auto-set on create and update</td>
      </tr>
   </tbody>
</table>

## Usage
Please check <a href="/database/models/">Model Basic</a> for Common methods.


### Accessing Attributes

```php

$note = FluentCrm\App\Models\SubscriberNote::find(1);

$note->id; // returns id
$note->title; // returns title
$note->description; // returns description
.......
```


## Fillable Attributes

```php
'subscriber_id',
'parent_id',
'created_by',
'type',
'title',
'description',
'created_at'
```


## Relations

### subscriber
Access the associated subscriber of a note

- return `FluentCrm\App\Models\Subscriber` Model

#### Example:
```php
// Accessing Subscriber
$subscriber = $note->subscriber;

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

### markAs($status)
Update the note status

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
- Returns `array` — `['ID', 'display_name', 'photo']`

#### Usage
```php
$creatorInfo = $note->createdBy();
```
