---
description: "CustomContactField is a utility class for managing custom contact field definitions in FluentCRM."
---

# CustomContactField

| Source File   | fluent-crm/app/Models/CustomContactField.php |
|---------------|----------------------------------------------|
| Name Space    | FluentCrm\App\Models                         |
| Class         | FluentCrm\App\Models\CustomContactField      |

::: warning Not an Eloquent Model
This is a plain PHP utility class — it does **not** extend Model and has no database table. Custom field definitions are stored in WordPress options via `fluentcrm_get_option('contact_custom_fields')`. The actual field **values** for each contact are stored in the `fc_subscriber_meta` table (see <a href="/database/models/subscriber-meta">SubscriberMeta</a>).
:::

## Usage

```php
$customFieldManager = new FluentCrm\App\Models\CustomContactField();
```

## Methods

### getGlobalFields($with)
Get all registered custom field definitions

- Parameters
  - $with `array` — optional, include `['field_types']` and/or `['field_groups']`
- Returns `array`

#### Usage
```php
$customFields = $customFieldManager->getGlobalFields();

// With field type definitions included
$customFields = $customFieldManager->getGlobalFields(['field_types', 'field_groups']);
```

### getFieldTypes()
Get available custom field type definitions

- Parameters
  - none
- Returns `array` — field type definitions (text, textarea, number, select-one, select-multi, radio, checkbox, date, date_time)

#### Usage
```php
$fieldTypes = $customFieldManager->getFieldTypes();
```

### saveGlobalFields($fields)
Save custom field definitions. Auto-generates slugs for new fields.

- Parameters
  - $fields `array`
- Returns `array` — formatted field definitions with generated slugs

#### Usage
```php
$fields = $customFieldManager->saveGlobalFields([
    ['label' => 'Company Name', 'type' => 'text'],
    ['label' => 'Role', 'type' => 'select-one', 'options' => ['Developer', 'Designer']]
]);
```

### formatCustomFieldValues($values, $fields)
Coerce field values to correct types (e.g., comma-separated strings to arrays for multi-select/checkbox fields)

- Parameters
  - $values `array` — key-value map of field slugs to values
  - $fields `array` — optional, field definitions
- Returns `array` — formatted values

#### Usage
```php
$formatted = $customFieldManager->formatCustomFieldValues($values);
```

### getFieldGroups()
Get custom field group definitions

- Parameters
  - none
- Returns `array` — group definitions, defaults to `[{slug: 'default', title: 'Custom Profile Data'}]`

#### Usage
```php
$groups = $customFieldManager->getFieldGroups();
```

### updateGroupName($oldName, $newName)
Rename a custom field group across all field definitions

- Parameters
  - $oldName `string`
  - $newName `string`
- Returns `void`

#### Usage
```php
$customFieldManager->updateGroupName('Old Group', 'New Group');
```
