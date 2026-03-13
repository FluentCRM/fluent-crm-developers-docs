---
description: "CompanyNote Model stores notes associated with companies in FluentCRM."
---

# Company Note Model

| DB Table Name | {wp_db_prefix}_fc_subscriber_notes                                            |
|---------------|-------------------------------------------------------------------------------|
| Schema        | <a href="/database/#fc-subscriber-notes-table">Check Schema</a> |
| Source File   | fluent-crm/app/Models/CompanyNote.php                                         |
| Name Space    | FluentCrm\App\Models                                                          |
| Class         | FluentCrm\App\Models\CompanyNote                                              |

## Global Scope

This model has a global scope that filters by `status = '_company_note_'`. The status is auto-set on create.

::: tip Shared Table
This model shares the `fc_subscriber_notes` table with `SubscriberNote` and `SystemLog`. The `subscriber_id` column stores the **company ID** (not a subscriber ID) in this context.
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
         <td>Stores the company ID</td>
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
         <td>Always '_company_note_'</td>
      </tr>
      <tr>
         <th>type</th>
         <td>String</td>
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

## Fillable Attributes

```php
'subscriber_id',  // company ID
'parent_id',
'created_by',
'type',
'title',
'description',
'created_at'
```

## Relations

### company
Access the associated company

- return `FluentCrm\App\Models\Company` Model (BelongsTo via `subscriber_id`)

#### Example:
```php
$company = $note->company;
```

## Methods

### markAs($status)
Update the note status

- Parameters
    - $status `string`
- Returns `FluentCrm\App\Models\CompanyNote`

#### Usage
```php
$note->markAs('open');
```

### createdBy()
Get note creator personal information

- Parameters
    - none
- Returns `array` — `['ID', 'first_name', 'last_name', 'display_name']`

#### Usage
```php
$creatorInfo = $note->createdBy();
```
