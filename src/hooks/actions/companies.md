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

::: warning Only fires from the bulk actions
All three are dispatched from the Companies list bulk actions
(`change_company_status`, `change_company_type`, `change_company_category`), once per company whose
value actually changed. Editing a company on its profile screen does not fire them.

The slug in the hook name is the raw new value, so a category such as `Alternative Dispute
Resolution` produces `fluent_crm/company_category_to_Alternative Dispute Resolution`. Build the hook
name from the same value rather than guessing at a slugified form.
:::

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

This dynamic action fires when a company's industry/category is changed. The value is stored in the
company's `industry` column despite the hook's `category` wording.

**Parameters**
- `$company` [Company Model](/database/models/company) - already saved with the new `industry`
- `$oldCategory` string - previous `industry` value

**Usage:**
```php
add_action('fluent_crm/company_category_to_technology', function($company, $oldCategory) {
   // Company category changed to technology
}, 10, 2);
```

**Source:** `app/Http/Controllers/CompanyController.php`

---

## Contact Attachment

::: warning Suppressed by silent imports
Like the contact tag/list hooks, both hooks below are skipped when the
`FLUENTCRM_DISABLE_TAG_LIST_EVENTS` constant is defined — the CSV importer and the WP-user importer
both define it. They also fire only for companies that were actually added or removed, so
re-attaching an already-attached company is silent.
:::

### `fluentcrm_contact_added_to_companies`

This action runs when one or more companies have been attached to a contact via
`Subscriber::attachCompanies()`. It receives only the company IDs that were **newly** attached in
that call. FluentCampaign Pro's *Company Applied* automation trigger listens on this hook.

**Parameters**
- `$attachedCompanyIds` Array - IDs of the companies that were attached to the contact
- `$subscriber` [Subscriber Model](/database/models/subscriber)

::: tip Parameter order
Unlike the modern `fluent_crm/contact_added_to_*` tag/list hooks, the IDs come **first** and the
subscriber second — there is no `fluent_crm/`-prefixed counterpart for companies.
:::

**Usage:**
```php
add_action('fluentcrm_contact_added_to_companies', function($attachedCompanyIds, $subscriber) {
   // Companies were attached to the contact
}, 10, 2);
```

**Source:** `app/Functions/helpers.php` (fired from `app/Models/Subscriber.php`)

---

### `fluentcrm_contact_removed_from_companies`

This action runs when one or more companies have been detached from a contact via
`Subscriber::detachCompanies()`. It receives only the company IDs that were actually removed.
FluentCampaign Pro's *Company Removed* automation trigger listens on this hook.

**Parameters**
- `$detachedCompanyIds` Array - IDs of the companies that were removed from the contact
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_action('fluentcrm_contact_removed_from_companies', function($detachedCompanyIds, $subscriber) {
   // Companies were removed from the contact
}, 10, 2);
```

**Source:** `app/Functions/helpers.php` (fired from `app/Models/Subscriber.php`)

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
