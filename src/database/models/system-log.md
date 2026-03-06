---
description: "SystemLog Model stores internal system log entries in FluentCRM."
---

# System Log Model

| DB Table Name | {wp_db_prefix}_fc_subscriber_notes                                            |
|---------------|-------------------------------------------------------------------------------|
| Schema        | <a href="/database/#fc-subscriber-notes-table">Check Schema</a> |
| Source File   | fluent-crm/app/Models/SystemLog.php                                           |
| Name Space    | FluentCrm\App\Models                                                          |
| Class         | FluentCrm\App\Models\SystemLog                                                |

## Global Scope

This model has a global scope that filters by `status = '_system_log_'`. The status is auto-set on create.

::: tip Shared Table
This model shares the `fc_subscriber_notes` table with `SubscriberNote` and `CompanyNote`. The `subscriber_id` defaults to `0` for system-wide logs.
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
         <td>Defaults to 0 for system-wide logs</td>
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
         <td>Always '_system_log_'</td>
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
'subscriber_id',
'parent_id',
'created_by',
'type',
'title',
'description',
'created_at'
```

## Usage

```php
// Create a system log entry
FluentCrm\App\Models\SystemLog::create([
    'type' => 'email_sending',
    'title' => 'Campaign sending completed',
    'description' => 'Campaign #5 sent 1000 emails'
]);

// Query system logs
$logs = FluentCrm\App\Models\SystemLog::orderBy('id', 'DESC')->limit(50)->get();
```
