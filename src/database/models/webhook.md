# Webhook Model

| DB Table Name | {wp_db_prefix}_fc_meta                                                   |
|---------------|--------------------------------------------------------------------------|
| Schema        | <a :href="$withBase('/database/#fc-subscribers-table')">Check Schema</a> |
| Source File   | fluent-crm/app/Models/Webhook.php                                        |
| Name Space    | FluentCrm\App\Models                                                     |
| Class         | FluentCrm\App\Models\Webhook                                             |

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
         <th>object_type</th>
         <td>String</td>
         <td>For Webhook Model, default object_type is webhook</td>
      </tr>
      <tr>
         <th>object_id</th>
         <td>Integer</td>
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


## Fillable Attributes

```php

'object_type',
'object_id',
'key',
'value'
```


## Methods
Along with Global Model methods, this model has few helper methods.
