---
description: "Filter hooks for company types, categories, profile sections, and CSV export in FluentCRM."
---

# Company Filters

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These filter hooks let you customize company types, industry categories, profile sections, and CSV export columns.

### `fluent_crm/company_types`

Filter the list of company type options (e.g., Prospect, Partner, Reseller, Vendor).

**Parameters**
- `$types` Array - Company type strings

**Usage:**
```php
add_filter('fluent_crm/company_types', function($types) {
    $types[] = 'Enterprise';
    $types[] = 'Non-Profit';
    return $types;
});
```

**Source:** `app/Services/Helper.php`

---

### `fluent_crm/company_categories`

Filter the list of company industry/category strings.

**Parameters**
- `$categories` Array - Category strings (e.g., Technology, Healthcare, Finance)

**Usage:**
```php
add_filter('fluent_crm/company_categories', function($categories) {
    $categories[] = 'Aerospace';
    $categories[] = 'Agriculture';
    return $categories;
});
```

**Source:** `app/Services/Helper.php`

---

### `fluent_crm/company_profile_sections`

Filter the array of tab sections displayed on the [Company](/database/models/company) profile page. Use this to add custom tabs.

**Parameters**
- `$sections` Array - Section definitions with `slug`, `title`, `icon`

**Usage:**
```php
add_filter('fluent_crm/company_profile_sections', function($sections) {
    $sections['invoices'] = [
        'slug'  => 'invoices',
        'title' => __('Invoices', 'fluent-crm'),
        'icon'  => 'el-icon-document'
    ];
    return $sections;
});
```

**Source:** `app/Services/Helper.php`

---

### `fluent_crm/company_table_columns`

Filter the column definitions for CSV export of the Companies table.

**Parameters**
- `$columns` Array - Column definitions

**Usage:**
```php
add_filter('fluent_crm/company_table_columns', function($columns) {
    $columns['industry'] = __('Industry', 'fluent-crm');
    return $columns;
});
```

**Source:** `app/Http/Controllers/CsvController.php`
