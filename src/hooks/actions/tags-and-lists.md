---
description: "Action hooks for tag and list CRUD operations in FluentCRM."
---

# Tags & Lists Hooks

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These action hooks fire when tags or lists are created, updated, or deleted.

::: tip Legacy aliases take an ID, not a model
Each hook here has a legacy `fluentcrm_*` twin — `fluentcrm_tag_created`, `fluentcrm_list_updated`,
and so on. The create and update aliases receive the **record ID**, not the model, so the two
families are not drop-in equivalents. The delete aliases match, since both pass an ID.

The legacy aliases fire from the controllers, the `fluentCrmApi()` classes, and the CRM migrators;
only the input-sanitizing path fires the `fluent_crm/` hooks alone. Prefer the `fluent_crm/` names.
:::

## Tag Hooks

### `fluent_crm/tag_created`

This action runs when a new tag has been created — from the Tags screen, the bulk create endpoint,
the `fluentCrmApi('tags')` API, the CRM migrators, and whenever an unknown tag name is auto-created
while sanitizing tag input.

**Parameters**
- `$tagModel` [Tag Model](/database/models/tag)

**Usage:**
```php
add_action('fluent_crm/tag_created', function($tagModel) {
   // Do your stuff here
});
```

**Source:** `app/Http/Controllers/TagsController.php`, `app/Api/Classes/Tags.php`, `app/Services/Sanitize.php`, `app/Services/CrmMigrator/BaseMigrator.php`

---

### `fluent_crm/tag_updated`

This action runs when a tag has been updated.

**Parameters**
- `$tagModel` [Tag Model](/database/models/tag) - already saved

**Usage:**
```php
add_action('fluent_crm/tag_updated', function($tagModel) {
   // Do your stuff here
});
```

**Source:** `app/Http/Controllers/TagsController.php`, `app/Api/Classes/Tags.php`

---

### `fluent_crm/tag_deleted`

This action runs after a tag has been deleted, both from the single-delete endpoint and once per tag
from the bulk delete.

::: warning
The tag row is already gone — only its ID is passed.
:::

**Parameters**
- `$tagId` INT - Tag ID

**Usage:**
```php
add_action('fluent_crm/tag_deleted', function($tagId) {
   // Do your stuff here
});
```

**Source:** `app/Http/Controllers/TagsController.php`

---

## List Hooks

### `fluent_crm/list_created`

This action runs when a new list has been created — from the Lists screen, the bulk create endpoint,
the `fluentCrmApi('lists')` API, the CRM migrators, and whenever an unknown list name is
auto-created while sanitizing list input.

::: warning Older versions pass an array from one call site
FluentCRM 3.1.10 and earlier fired this hook from `Sanitize::sanitizeListIds()` — the path that
auto-creates lists from names — with an **array of list IDs** instead of the model. Every call site
now passes the `Lists` model. If you support those versions, guard before using it:

```php
add_action('fluent_crm/list_created', function($listModel) {
   if (!$listModel instanceof \FluentCrm\App\Models\Lists) {
       return; // older Sanitize::sanitizeListIds() passed an array of IDs
   }
   // ...
});
```
:::

**Parameters**
- `$listModel` [Lists Model](/database/models/lists) - the newly created list

**Usage:**
```php
add_action('fluent_crm/list_created', function($listModel) {
   // Do your stuff here
});
```

**Source:** `app/Http/Controllers/ListsController.php`, `app/Api/Classes/Lists.php`, `app/Services/Sanitize.php`, `app/Services/CrmMigrator/BaseMigrator.php`

---

### `fluent_crm/list_updated`

This action runs when a list has been updated.

**Parameters**
- `$listModel` [Lists Model](/database/models/lists) - already saved

**Usage:**
```php
add_action('fluent_crm/list_updated', function($listModel) {
   // Do your stuff here
});
```

**Source:** `app/Http/Controllers/ListsController.php`, `app/Api/Classes/Lists.php`

---

### `fluent_crm/list_deleted`

This action runs after a list has been deleted, both from the single-delete endpoint and once per
list from the bulk delete.

::: warning
The list row is already gone — only its ID is passed.
:::

**Parameters**
- `$listId` INT - List ID

**Usage:**
```php
add_action('fluent_crm/list_deleted', function($listId) {
   // Do your stuff here
});
```

**Source:** `app/Http/Controllers/ListsController.php`
