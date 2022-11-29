::: details fluent_crm/email_template_created
This action runs after an email template has been created

**Parameters**
- `$templateId` INT - Created Template ID
- `$templateData` Array - Template Data as Array

**Usage:**
```php 
add_action('fluent_crm/email_template_created', function($templateId, $templateData) {
   // Do you staffs here
}, 10, 2);
```
:::

::: details fluent_crm/email_template_duplicated
This action runs after an email template has been duplicated

**Parameters**
- `$templateId` INT - Created Template ID
- `$oldTemplateData` Array - Original Template Data as Array

**Usage:**
```php 
add_action('fluent_crm/email_template_duplicated', function($templateId, $oldTemplateData) {
   // Do you staffs here
}, 10, 2);
```
:::

::: details fluent_crm/email_template_updated
This action runs after an email template has been duplicated

**Parameters**
- `$templateData` array - Update Data as key value pair
- `$template` Template Model

**Usage:**
```php 
add_action('fluent_crm/email_template_updated', function($templateData, $template) {
   // Do you staffs here
}, 10, 2);
```
:::
