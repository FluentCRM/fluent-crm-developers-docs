---
description: "Filter hooks for webhooks, imports, migrations, commerce providers, and third-party integrations in FluentCRM."
---

# Webhooks & Integration Filters

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These filter hooks let you customize webhook processing, import providers, commerce integrations, and third-party data.

## Webhooks

### `fluent_crm/incoming_webhook_data`

Filter incoming webhook data before it gets validated and processed. Use this to format or transform data from external sources.

**Parameters**
- `$postData` Array - Posted data on the webhook
- `$webhook` [Webhook Model](/database/models/webhook)
- `$request` Request Object

**Usage:**
```php
add_filter('fluent_crm/incoming_webhook_data', function($postData, $webhook, $request) {
    if ($webhook->id != 1) {
        return $postData;
    }
    // Transform data for webhook #1
    $postData['email'] = $postData['user_email'] ?? '';
    return $postData;
}, 10, 3);
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

### `fluent_crm/webhook_contact_data`

Filter the formatted contact data from a webhook before it is used to create or update a contact. At this point the raw webhook data has already been processed.

**Parameters**
- `$data` Array - Formatted contact data
- `$postData` Array - Original posted data
- `$webhook` [Webhook Model](/database/models/webhook)

**Usage:**
```php
add_filter('fluent_crm/webhook_contact_data', function($data, $postData, $webhook) {
    // Override the status for a specific webhook
    if ($webhook->id === 2) {
        $data['status'] = 'subscribed';
    }
    return $data;
}, 10, 3);
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

## Import & Migration

### `fluent_crm/import_providers`

Filter the registered import provider definitions (CSV, WP Users, etc.).

**Parameters**
- `$providers` Array - Import provider definitions

**Usage:**
```php
add_filter('fluent_crm/import_providers', function($providers) {
    $providers['my_source'] = [
        'label'       => 'My Data Source',
        'callback'    => 'MyImporter::handle'
    ];
    return $providers;
});
```

**Source:** `app/Http/Controllers/ImporterController.php`

---

### `fluent_crm/csv_import_contact_limit_per_request`

Filter the number of CSV rows to process per import request.

**Parameters**
- `$limit` INT - Default `100`

**Usage:**
```php
add_filter('fluent_crm/csv_import_contact_limit_per_request', function($limit) {
    return 500;
});
```

**Source:** `app/Http/Controllers/CsvController.php`

---

### `fluent_crm/import_users_limit_per_request`

Filter the number of WordPress users to process per import request.

**Parameters**
- `$limit` INT - Default `100`

**Usage:**
```php
add_filter('fluent_crm/import_users_limit_per_request', function($limit) {
    return 200;
});
```

**Source:** `app/Http/Controllers/ImporterController.php`

---

### `fluent_crm/saas_migrators`

Filter the array of registered SaaS migrator definitions (MailChimp, ConvertKit, MailerLite, etc.).

**Parameters**
- `$migrators` Array - Migrator definitions keyed by service slug

**Usage:**
```php
add_filter('fluent_crm/saas_migrators', function($migrators) {
    $migrators['my_service'] = [
        'title'       => 'My Email Service',
        'description' => 'Import contacts from My Email Service',
        'logo'        => 'https://example.com/logo.png'
    ];
    return $migrators;
});
```

**Source:** `app/Http/Controllers/MigratorController.php`

---

## Commerce & Integration Providers

### `fluent_crm/purchase_history_providers`

Filter the array of registered purchase history providers (WooCommerce, Easy Digital Downloads, etc.).

**Parameters**
- `$providers` Array - Provider definitions

**Usage:**
```php
add_filter('fluent_crm/purchase_history_providers', function($providers) {
    $providers[] = 'my_shop';
    return $providers;
});
```

**Source:** `app/Services/Helper.php`

---

### `fluent_crm/woo_purchase_sidebar_html`

Filter the WooCommerce purchase summary HTML shown on a contact's profile sidebar.

**Parameters**
- `$html` String - Sidebar HTML
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$page` INT - Pagination page number

**Usage:**
```php
add_filter('fluent_crm/woo_purchase_sidebar_html', function($html, $subscriber, $page) {
    if (!$html) {
        return ''; // No data
    }
    $html .= '<p>Custom WooCommerce info</p>';
    return $html;
}, 20, 3);
```

**Source:** `app/Hooks/Handlers/PurchaseHistory.php`

---

### `fluent_crm/edd_purchase_sidebar_html`

Filter the Easy Digital Downloads purchase summary HTML shown on a contact's profile sidebar.

**Parameters**
- `$html` String - Sidebar HTML
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$page` INT - Pagination page number

**Usage:**
```php
add_filter('fluent_crm/edd_purchase_sidebar_html', function($html, $subscriber, $page) {
    if (!$html) {
        return '';
    }
    $html .= '<p>Custom EDD info</p>';
    return $html;
}, 20, 3);
```

**Source:** `app/Hooks/Handlers/PurchaseHistory.php`

---

### `fluent_crm/contact_lifetime_value`

Filter the contact's lifetime value (total revenue). Provided by commerce integrations.

**Parameters**
- `$value` Float - Default `0`
- `$profile` Array - Contact profile data

**Usage:**
```php
add_filter('fluent_crm/contact_lifetime_value', function($value, $profile) {
    // Calculate from your own commerce data
    return $value;
}, 10, 2);
```

**Source:** `app/Functions/helpers.php`

---

### `fluentcrm_currency_sign`

Filter the currency symbol used for displaying monetary values.

**Parameters**
- `$sign` String - Default `''`

**Usage:**
```php
add_filter('fluentcrm_currency_sign', function($sign) {
    return '$';
});
```

**Source:** `app/Hooks/Handlers/AdminMenu.php`, `app/Functions/helpers.php`

---

### `fluent_crm/form_submission_providers`

Filter the list of registered form submission provider slugs for the contact profile (e.g., FluentForms, Gravity Forms).

**Parameters**
- `$providers` Array - Provider slugs

**Usage:**
```php
add_filter('fluent_crm/form_submission_providers', function($providers) {
    $providers[] = 'gravity_forms';
    return $providers;
});
```

**Source:** `app/Hooks/Handlers/AdminMenu.php`

---

### `fluentcrm_deep_integration_providers`

Filter the array of deep-integration provider definitions (Elementor, Gravity Forms, etc.).

**Parameters**
- `$providers` Array - Provider definitions
- `$withFields` Boolean - Whether to include field mappings

**Usage:**
```php
add_filter('fluentcrm_deep_integration_providers', function($providers, $withFields) {
    $providers['my_form_plugin'] = [
        'title'  => 'My Form Plugin',
        'logo'   => 'https://example.com/logo.png'
    ];
    return $providers;
}, 10, 2);
```

**Source:** `app/Http/Controllers/SettingsController.php`

---

### `fluent_crm/advanced_report_providers`

Filter the array of registered advanced reporting provider definitions.

**Parameters**
- `$providers` Array - Default `[]`

**Usage:**
```php
add_filter('fluent_crm/advanced_report_providers', function($providers) {
    $providers['my_reports'] = [
        'title' => 'My Custom Reports',
        'slug'  => 'my_reports'
    ];
    return $providers;
});
```

**Source:** `app/Http/Controllers/ReportingController.php`
