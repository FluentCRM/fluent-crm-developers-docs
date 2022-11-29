::: details fluent_crm/list_created
This action runs when a new list has been created

**Parameters**
- `$listModel` List Model

**Usage:**
```php 
add_action('fluent_crm/list_created', function($listModel) {
   // Do you staffs here
});
```
:::

::: details fluent_crm/list_updated
This action runs when a list has been updated

**Parameters**
- `$listModel` List Model

**Usage:**
```php 
add_action('fluent_crm/list_updated', function($listModel) {
   // Do you staffs here
});
```
:::

::: details fluent_crm/list_deleted
This action runs when a list has been updated

**Parameters**
- `$listId` INT - List ID

**Usage:**
```php 
add_action('fluent_crm/list_deleted', function($listId) {
   // Do you staffs here
});
```
:::
