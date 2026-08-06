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

Filter the array of tab sections displayed on the [Company](/database/models/company) profile page.
Use this to add custom tabs. A custom tab registered with `'handler' => 'route'` and a
`'query' => ['handler' => $key]` entry renders its content through
[`fluent_crm/company_profile_section_{$sectionId}`](#fluent-crm-company-profile-section-sectionid) —
register both, or the tab opens empty. The `FluentCrmApi('extend')->addCompanyProfileSection()`
helper (`app/Api/Classes/Extender.php`) wires the pair for you.

**Parameters**
- `$sections` Array - section definitions keyed by section key. Each entry carries a `name` (the Vue route name — custom tabs use `fluent_crm_company_section_extended`), a `title`, `'handler' => 'route'`, and for custom tabs a `'query' => ['handler' => $key]` pointing at the content filter

**Usage:**
```php
add_filter('fluent_crm/company_profile_sections', function($sections) {
    $sections['invoices'] = [
        'name'    => 'fluent_crm_company_section_extended',
        'title'   => __('Invoices', 'fluent-crm'),
        'handler' => 'route',
        'query'   => [
            'handler' => 'invoices'
        ]
    ];
    return $sections;
});
```

**Source:** `app/Services/Helper.php`

---

### `fluent_crm/company_profile_section_{$sectionId}`

Supply the content of a custom company-profile tab. When a tab registered on
[`fluent_crm/company_profile_sections`](#fluent-crm-company-profile-sections) is opened, the admin UI
requests `companies/{id}/custom_tab_view` with a `section_provider` parameter, and
`CompanyController::getCompanyExternalView()` returns whatever this dynamic filter produces. The
dynamic portion, `$sectionId`, is the section's `query.handler` key.

::: danger Escape your section content
`content_html` is rendered as raw HTML in the admin UI (Vue `v-html`) with no client-side
sanitization. Escape any user-authored data with `esc_html()` or `wp_kses_post()` before returning
it, or you introduce stored XSS in the admin. Rich markup is allowed by design.
:::

**Parameters**
- `$section` Array - Default `['heading' => '', 'content_html' => '']`
- `$company` [Company Model](/database/models/company)

**Usage:**
```php
add_filter('fluent_crm/company_profile_section_invoices', function($section, $company) {
    $section['heading'] = __('Invoices', 'my-plugin');
    $section['content_html'] = '<p>' . esc_html($company->name) . ' has 3 open invoices.</p>';
    return $section;
}, 10, 2);
```

**Source:** `app/Http/Controllers/CompanyController.php`

---

### `fluent_crm/company_profile_section_save_{$sectionId}`

Handle the save request of a custom company-profile section. `CompanyController::saveExternalViewData()`
passes the submitted form data to this dynamic filter; return a truthy response array (for example
`['message' => ..., 'content_html' => ...]`) to confirm the save, or leave the default empty string
to make the controller respond with a "Handler could not be found." error.
`FluentCrmApi('extend')->addCompanyProfileSection()` registers a callback here when you pass its
optional `$saveCallback` argument.

::: warning
As of now no REST route is wired to `CompanyController::saveExternalViewData()` — the company
custom-tab UI is read-only and only the GET `companies/{id}/custom_tab_view` route exists. The
contact-profile equivalent (`POST subscribers/{id}/external_view`) does have a route. Treat this
filter as the forward-compatible save contract rather than something reachable today.
:::

**Parameters**
- `$response` String|Array - Default `''`; falsy means "no handler"
- `$data` Array - the submitted section form data (`data` request parameter)
- `$company` [Company Model](/database/models/company)

**Usage:**
```php
add_filter('fluent_crm/company_profile_section_save_invoices', function($response, $data, $company) {
    my_plugin_save_invoice_settings($company->id, $data);

    return [
        'message' => __('Invoice settings saved', 'my-plugin')
    ];
}, 10, 3);
```

**Source:** `app/Http/Controllers/CompanyController.php`

---

### `fluent_crm/company_table_columns`

Filter the company columns offered as mapping targets when a CSV is uploaded for **import**
(`CsvController::upload()`, with `type=company`). It does not affect CSV export.

**Parameters**
- `$columns` Array - a plain list of column slugs a CSV header can be mapped onto

**Usage:**
```php
add_filter('fluent_crm/company_table_columns', function($columns) {
    $columns[] = 'industry';
    return $columns;
});
```

**Source:** `app/Http/Controllers/CsvController.php`
