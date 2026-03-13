---
description: "Action hooks for email template CRUD operations in FluentCRM."
---

# Email Template Hooks

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These action hooks fire when email templates are created, updated, or duplicated.

### `fluent_crm/email_template_created`

This action runs after an email template has been created.

**Parameters**
- `$templateId` INT - Created Template ID
- `$templateData` Array - Template Data as Array

**Usage:**
```php
add_action('fluent_crm/email_template_created', function($templateId, $templateData) {
   // Do your stuff here
}, 10, 2);
```

---

### `fluent_crm/email_template_duplicated`

This action runs after an email template has been duplicated.

**Parameters**
- `$templateId` INT - Created Template ID
- `$oldTemplateData` Array - Original Template Data as Array

**Usage:**
```php
add_action('fluent_crm/email_template_duplicated', function($templateId, $oldTemplateData) {
   // Do your stuff here
}, 10, 2);
```

---

### `fluent_crm/email_template_updated`

This action runs after an email template has been updated.

**Parameters**
- `$templateData` array - Update Data as key value pair
- `$template` [Template Model](/database/models/template)

**Usage:**
```php
add_action('fluent_crm/email_template_updated', function($templateData, $template) {
   // Do your stuff here
}, 10, 2);
```
