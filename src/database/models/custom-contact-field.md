---
description: "Explore the CustomContactField Model in FluentCRM, which allows you to create and manage personalized fields for your contacts."
---

# CustomContactField Model

| DB Table Name | {wp_db_prefix}_fc_meta                                   |
|---------------|--------------------------------------------------------------------------|
| Schema        | <a :href="$withBase('/database/#fc-subscribers-table')">Check Schema</a> |
| Source File   | fluent-crm/app/Models/CustomContactField.php                                       |
| Name Space    | FluentCrm\App\Models                                                     |
| Class         | FluentCrm\App\Models\CustomContactField                                            |

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
         <td></td>
      </tr>
      <tr>
         <th>object_id</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>key</th>
         <td>String</td>
         <td>For Custom Contact Field Model, default key is contact_custom_fields</td>
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

$customContactField = FluentCrm\App\Models\CustomContactField::find(1);

$customContactField->id; // returns id
$customContactField->value; // returns Contact custom fields
.......
```


## Fillable Attributes

```php

'object_type',
'object_id',
'key',
'value'
```


## Methods
Along with Global Model methods, this model has few helper methods.

### getGlobalFields($with)
Get all global custom fields 

- Parameters
  - $with `array` optional
- Returns `array`

#### Usage
```php 
$customFields = $customContactField->getGlobalFields();
```

### getFieldTypes()
Get custom field types

- Parameters
  - none 
- Returns `array`

#### Usage
```php 
$fieldTypes = $customContactField->getFieldTypes();
```

### saveGlobalFields($fields)
Save global custom fields 

- Parameters
  - $fields `array`
- Returns `array`

#### Usage
```php 
$formattedFields = $customContactField->saveGlobalFields($fields);
```

### formatCustomFieldValues($values, $fields = [])
Format custom field values and return formatted values

- Parameters
  - $values `array`
  - $fields `array` optional
- Returns `array`

#### Usage
```php 
$formattedData = $customContactField->formatCustomFieldValues($values);
```