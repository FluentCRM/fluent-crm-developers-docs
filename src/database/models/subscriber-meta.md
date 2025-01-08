---
description: "Discover the SubscriberMeta Model in FluentCRM, which allows you to store and manage custom metadata for subscribers."
---

# SubscriberMeta Model

| DB Table Name | {wp_db_prefix}_fc_subscriber_meta                                        |
|---------------|--------------------------------------------------------------------------|
| Schema        | <a :href="$withBase('/database/#fc-subscribers-table')">Check Schema</a> |
| Source File   | fluent-crm/app/Models/SubscriberMeta.php                                 |
| Name Space    | FluentCrm\App\Models                                                     |
| Class         | FluentCrm\App\Models\SubscriberMeta                                      |

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
         <th>created_by</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>object_type</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>key</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>value</th>
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

$meta = FluentCrm\App\Models\SubscriberMeta::find(1);

$meta->id; // returns id
$meta->value; // returns meta value
.......
```


## Fillable Attributes

```php

'subscriber_id',
'created_by',
'object_type',
'key',
'value'
```