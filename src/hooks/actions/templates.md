---
description: "Action hooks for email template CRUD operations in FluentCRM."
---

# Email Template Hooks

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These action hooks fire when email templates are created, updated, or duplicated.

::: warning Argument order is not consistent
`created` and `duplicated` pass the template **ID first**; `updated` passes the posted **data
first** and the model second. Check each signature rather than assuming a shared shape.
:::

### `fluent_crm/email_template_created`

This action runs after an email template has been created.

**Parameters**
- `$templateId` INT - Created Template ID
- `$templateData` Array - the posted template data, before it was split into post fields and post meta

**Usage:**
```php
add_action('fluent_crm/email_template_created', function($templateId, $templateData) {
   // Do your stuff here
}, 10, 2);
```

**Source:** `app/Http/Controllers/TemplateController.php`

---

### `fluent_crm/email_template_duplicated`

This action runs after an email template has been duplicated.

**Parameters**
- `$newTemplateId` INT - the ID of the new copy
- `$template` [Template Model](/database/models/template) - the original template that was copied, not an array

**Usage:**
```php
add_action('fluent_crm/email_template_duplicated', function($newTemplateId, $template) {
   // $template is the ORIGINAL; $newTemplateId is the copy
}, 10, 2);
```

**Source:** `app/Http/Controllers/TemplateController.php`

---

### `fluent_crm/email_template_updated`

This action runs after an email template has been updated.

**Parameters**
- `$templateData` Array - the posted update data as key/value pairs
- `$template` [Template Model](/database/models/template) - re-read after the update, so it holds the saved values

**Usage:**
```php
add_action('fluent_crm/email_template_updated', function($templateData, $template) {
   // Note the order: data first, model second
}, 10, 2);
```

**Source:** `app/Http/Controllers/TemplateController.php`
