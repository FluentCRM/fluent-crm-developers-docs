<explain-block title="fluent_crm/tag_created">
This action runs when a new tag has been created

**Parameters**
- `$tagModel` List Model

**Usage:**
```php 
add_action('fluent_crm/tag_created', function($tagModel) {
   // Do you staffs here
});
```
</explain-block>

<explain-block title="fluent_crm/tag_updated">
This action runs when a tag has been updated

**Parameters**
- `$tagModel` Tag Model

**Usage:**
```php 
add_action('fluent_crm/tag_updated', function($tagModel) {
   // Do you staffs here
});
```
</explain-block>

<explain-block title="fluent_crm/tag_deleted">
This action runs when a tag has been updated

**Parameters**
- `$tagId` INT - Tag ID

**Usage:**
```php 
add_action('fluent_crm/tag_deleted', function($tagId) {
   // Do you staffs here
});
```
</explain-block>
