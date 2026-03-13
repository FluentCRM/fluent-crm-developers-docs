---
description: "Action hooks for company lifecycle events in FluentCRM — CRUD operations, status/type changes, and notes."
---

# Company Hooks

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These action hooks fire during company lifecycle events — creation, updates, deletion, status/type/category changes, and notes management.

## Company CRUD

### `fluent_crm/company_created`

This action fires when a new company is created.

**Parameters**
- `$company` [Company Model](/database/models/company)
- `$data` Array - creation data

**Usage:**
```php
add_action('fluent_crm/company_created', function($company, $data) {
   // A new company was created
}, 10, 2);
```

**Source:** `app/Api/Classes/Companies.php`

---

### `fluent_crm/company_updated`

This action fires when a company is updated.

**Parameters**
- `$company` [Company Model](/database/models/company)
- `$data` Array - update data

**Usage:**
```php
add_action('fluent_crm/company_updated', function($company, $data) {
   // Company was updated
}, 10, 2);
```

**Source:** `app/Api/Classes/Companies.php`

---

### `fluent_crm/before_company_delete`

This action fires before a company is deleted. Use it to clean up related data.

**Parameters**
- `$company` [Company Model](/database/models/company)

**Usage:**
```php
add_action('fluent_crm/before_company_delete', function($company) {
   // Clean up related data before company is deleted
});
```

**Source:** `app/Http/Controllers/CompanyController.php`

---

### `fluent_crm/company_deleted`

This action fires after a company has been deleted.

**Parameters**
- `$companyId` INT - deleted company ID

**Usage:**
```php
add_action('fluent_crm/company_deleted', function($companyId) {
   // Company was deleted
});
```

**Source:** `app/Http/Controllers/CompanyController.php`

---

## Status, Type & Category Changes

### `fluent_crm/company_status_to_{$status}`

This dynamic action fires when a company's status is changed.

**Parameters**
- `$company` [Company Model](/database/models/company)
- `$oldStatus` string - previous status

**Usage:**
```php
add_action('fluent_crm/company_status_to_active', function($company, $oldStatus) {
   // Company status changed to active
}, 10, 2);
```

**Source:** `app/Http/Controllers/CompanyController.php`

---

### `fluent_crm/company_type_to_{$type}`

This dynamic action fires when a company's type is changed.

**Parameters**
- `$company` [Company Model](/database/models/company)
- `$oldType` string - previous type

**Usage:**
```php
add_action('fluent_crm/company_type_to_customer', function($company, $oldType) {
   // Company type changed to customer
}, 10, 2);
```

**Source:** `app/Http/Controllers/CompanyController.php`

---

### `fluent_crm/company_category_to_{$category}`

This dynamic action fires when a company's industry/category is changed.

**Parameters**
- `$company` [Company Model](/database/models/company)
- `$oldCategory` string - previous category

**Usage:**
```php
add_action('fluent_crm/company_category_to_technology', function($company, $oldCategory) {
   // Company category changed to technology
}, 10, 2);
```

**Source:** `app/Http/Controllers/CompanyController.php`

---

## Company Notes

### `fluent_crm/company_note_added`

This action fires when a note is added to a company.

**Parameters**
- `$note` [SubscriberNote Model](/database/models/subscriber-note)
- `$company` [Company Model](/database/models/company)
- `$noteData` Array - note data

**Usage:**
```php
add_action('fluent_crm/company_note_added', function($note, $company, $noteData) {
   // A note was added to the company
}, 10, 3);
```

**Source:** `app/Http/Controllers/CompanyController.php`

---

### `fluent_crm/company_note_updated`

This action fires when a company note is updated.

**Parameters**
- `$note` [CompanyNote Model](/database/models/company-note)
- `$company` [Company Model](/database/models/company)
- `$noteData` Array - updated note data

**Usage:**
```php
add_action('fluent_crm/company_note_updated', function($note, $company, $noteData) {
   // A company note was updated
}, 10, 3);
```

**Source:** `app/Http/Controllers/CompanyController.php`

---

### `fluent_crm/company_note_deleted`

This action fires when a company note is deleted.

**Parameters**
- `$noteId` INT - Note ID
- `$company` [Company Model](/database/models/company)

**Usage:**
```php
add_action('fluent_crm/company_note_deleted', function($noteId, $company) {
   // A company note was deleted
}, 10, 2);
```

**Source:** `app/Http/Controllers/CompanyController.php`
