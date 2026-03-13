---
description: "Action hooks for tag and list CRUD operations in FluentCRM."
---

# Tags & Lists Hooks

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These action hooks fire when tags or lists are created, updated, or deleted.

## Tag Hooks

### `fluent_crm/tag_created`

This action runs when a new tag has been created.

**Parameters**
- `$tagModel` [Tag Model](/database/models/tag)

**Usage:**
```php
add_action('fluent_crm/tag_created', function($tagModel) {
   // Do your stuff here
});
```

---

### `fluent_crm/tag_updated`

This action runs when a tag has been updated.

**Parameters**
- `$tagModel` [Tag Model](/database/models/tag)

**Usage:**
```php
add_action('fluent_crm/tag_updated', function($tagModel) {
   // Do your stuff here
});
```

---

### `fluent_crm/tag_deleted`

This action runs when a tag has been deleted.

**Parameters**
- `$tagId` INT - Tag ID

**Usage:**
```php
add_action('fluent_crm/tag_deleted', function($tagId) {
   // Do your stuff here
});
```

---

## List Hooks

### `fluent_crm/list_created`

This action runs when a new list has been created.

**Parameters**
- `$listModel` [Lists Model](/database/models/lists)

**Usage:**
```php
add_action('fluent_crm/list_created', function($listModel) {
   // Do your stuff here
});
```

---

### `fluent_crm/list_updated`

This action runs when a list has been updated.

**Parameters**
- `$listModel` [Lists Model](/database/models/lists)

**Usage:**
```php
add_action('fluent_crm/list_updated', function($listModel) {
   // Do your stuff here
});
```

---

### `fluent_crm/list_deleted`

This action runs when a list has been deleted.

**Parameters**
- `$listId` INT - List ID

**Usage:**
```php
add_action('fluent_crm/list_deleted', function($listId) {
   // Do your stuff here
});
```

