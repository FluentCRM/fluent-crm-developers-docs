---
description: "Companies API — create, update, and manage company records programmatically via FluentCrmApi('companies')."
---

# Companies API

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Developer Guide" />

The Companies API provides methods for creating, finding, and managing company records, and linking them to contacts.

## Initialization

```php
$companyApi = FluentCrmApi('companies');
```

Returns an instance of `FluentCrm\App\Api\Classes\Companies`.

::: warning No query proxy methods
Unlike the [Contacts](/global-functions/contact-api-function), [Tags](/global-functions/tag-api-function), and [Lists](/global-functions/list-api-function) APIs, the Companies API does **not** support `all()`, `get()`, `find()`, `first()`, `paginate()`, or `getInstance()`. To run custom queries on companies, use the [Company model](/database/models/company) directly:

```php
$companies = \FluentCrm\App\Models\Company::where('status', 'active')->get();
```
:::

---

## Methods

### getCompany()

Find a single company by ID or email address, with optional eager-loaded relationships.

```php
$company = $companyApi->getCompany($idOrEmail, $with = []);
```

**Parameters**
- `$idOrEmail` `int|string` — Company ID (integer) or **email address** (string)
- `$with` `array` — Relationships to eager-load (e.g., `['subscribers', 'owner', 'notes']`)

**Returns** `false` | [Company](/database/models/company)

::: info
When passing a string, this searches by the company's **email** field, not by name. To find a company by name, query the model directly:
```php
$company = \FluentCrm\App\Models\Company::where('name', 'Acme Corp')->first();
```
:::

**Example:**

```php
$company = $companyApi->getCompany(15, ['subscribers', 'owner']);

// By email
$company = $companyApi->getCompany('info@acme.com');
```

---

### createOrUpdate()

Create a new company or update an existing one. Matches existing companies by `id` (if provided) or `email`.

```php
$company = $companyApi->createOrUpdate($data);
```

**Parameters**
- `$data` `array` — Company data. Must include `name` for creation. Can include `custom_values` and `owner_id`.

**Returns** `false` | [Company](/database/models/company)

Fires [`fluent_crm/company_created`](/hooks/actions/companies#fluent-crm-company-created) or [`fluent_crm/company_updated`](/hooks/actions/companies#fluent-crm-company-updated) action hooks.

If `owner_id` is provided, the owner contact is automatically attached to the company.

**Example:**

```php
$company = $companyApi->createOrUpdate([
    'name'     => 'Acme Corp',
    'email'    => 'info@acme.com',
    'industry' => 'Technology',
    'owner_id' => 12,
    'custom_values' => [
        'annual_revenue' => '1000000',
    ]
]);
```

---

### attachContactsByIds()

Link contacts to companies by their IDs.

```php
$result = $companyApi->attachContactsByIds($contactIds, $companyIds);
```

**Parameters**
- `$contactIds` `array` — Array of subscriber IDs
- `$companyIds` `array` — Array of company IDs

**Returns** `false|array` — On success: `['companies' => Collection, 'subscribers' => Collection]`

**Example:**

```php
$result = $companyApi->attachContactsByIds([12, 38], [1, 2]);
```

---

### detachContactsByIds()

Remove relationships between contacts and companies.

```php
$result = $companyApi->detachContactsByIds($contactIds, $companyIds);
```

**Parameters**
- `$contactIds` `array` — Array of subscriber IDs
- `$companyIds` `array` — Array of company IDs

**Returns** `false|array` — On success: `['companies' => Collection, 'last_primary_company_id' => int|false]`

**Example:**

```php
$result = $companyApi->detachContactsByIds([12, 38], [1, 2]);
```

---

## Querying Companies Directly

Since the Companies API doesn't provide query proxy methods, use the [Company model](/database/models/company) for advanced queries:

```php
use FluentCrm\App\Models\Company;

// Get all active companies
$companies = Company::where('status', 'active')->get();

// Find by ID
$company = Company::find(15);

// Search by name
$companies = Company::where('name', 'LIKE', '%Acme%')->get();

// Paginate
$paginated = Company::paginate(15);

// With relationships
$company = Company::with(['subscribers', 'owner'])->find(15);
```

**Source:** `app/Api/Classes/Companies.php`
