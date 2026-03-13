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

---

## Dynamic Segments

<Badge type="danger" vertical="middle" text="Pro" />

### `fluentcrm_dynamic_segments`

Filter the list of registered dynamic segments. Use this to add custom segment types (e.g., "VIP Customers", "Users with Pending Orders").

**Parameters**
- `$segments` Array - registered segment definitions

**Usage:**
```php
add_filter('fluentcrm_dynamic_segments', function($segments) {
    $segments[] = [
        'slug'        => 'high_value_customers',
        'label'       => 'High Value Customers',
        'description' => 'Customers with total orders > $1000'
    ];
    return $segments;
});
```

**Source:** `fluentcampaign-pro/app/Http/Controllers/DynamicSegmentController.php`

---

### `fluentcrm_dynamic_segment_{$slug}`

Filter subscriber data for a specific dynamic segment type. Implement this for each custom segment slug registered via `fluentcrm_dynamic_segments`.

**Parameters**
- `$segmentData` Mixed - segment query results
- `$segmentId` INT - segment ID
- `$options` Array - contains `subscribers` (bool) and `paginate` (bool)

**Usage:**
```php
add_filter('fluentcrm_dynamic_segment_high_value_customers', function($data, $segmentId, $options) {
    // Return subscribers matching segment criteria
    if ($options['subscribers']) {
        // Return actual subscriber data
    }
    return ['total' => 150];
}, 10, 3);
```

**Source:** `fluentcampaign-pro/app/Http/Controllers/DynamicSegmentController.php`

---

## WooCommerce

<Badge type="danger" vertical="middle" text="Pro" />

### `fluent_crm/woo_checkout_fields`

Filter WooCommerce checkout form fields available for newsletter signup integration.

**Parameters**
- `$fields` Array - checkout field definitions

**Usage:**
```php
add_filter('fluent_crm/woo_checkout_fields', function($fields) {
    // Customize checkout fields for CRM
    return $fields;
});
```

**Source:** `fluentcampaign-pro/app/Services/Integrations/WooCommerce/WooInit.php`

---

### `fluent_crm/woo_block_checkout_consent_position`

Control the position of the newsletter consent checkbox in WooCommerce block-based checkout.

**Parameters**
- `$position` String - Default `'order'`

**Usage:**
```php
add_filter('fluent_crm/woo_block_checkout_consent_position', function($position) {
    return 'contact'; // Move to contact section
});
```

**Source:** `fluentcampaign-pro/app/Services/Integrations/WooCommerce/WooInit.php`

---

### `fluent_crm/woo_checkout_auto_subscribe_data`

Filter subscriber data created during WooCommerce checkout auto-subscription.

**Parameters**
- `$subscriberData` Array - contact data to create/update
- `$order` WC_Order - the WooCommerce order

**Usage:**
```php
add_filter('fluent_crm/woo_checkout_auto_subscribe_data', function($subscriberData, $order) {
    $subscriberData['source'] = 'woo_checkout';
    return $subscriberData;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Services/Integrations/WooCommerce/WooInit.php`

---

### `fluent_crm/woo_order_conditions`

Filter available WooCommerce order-based automation conditions.

**Parameters**
- `$orderProps` Array - condition property definitions

**Usage:**
```php
add_filter('fluent_crm/woo_order_conditions', function($orderProps) {
    $orderProps[] = [
        'value' => 'custom_order_field',
        'label' => 'Custom Order Field'
    ];
    return $orderProps;
});
```

**Source:** `fluentcampaign-pro/app/Services/Integrations/WooCommerce/AutomationConditions.php`

---

### `fluent_crm/user_can_view_woo_report`

Control whether a user can access WooCommerce integration reports in FluentCRM.

**Parameters**
- `$canView` Boolean - default checks `view_woocommerce_reports` capability

**Usage:**
```php
add_filter('fluent_crm/user_can_view_woo_report', function($canView) {
    return current_user_can('manage_options');
});
```

**Source:** `fluentcampaign-pro/app/Services/Integrations/WooCommerce/DeepIntegration.php`

---

### `fluent_crm/disable_woo_subscriptions_widget`

Disable the WooCommerce subscriptions widget for specific subscribers.

**Parameters**
- `$shouldDisable` Boolean - Default `false`
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_filter('fluent_crm/disable_woo_subscriptions_widget', function($shouldDisable, $subscriber) {
    return $shouldDisable;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Services/Integrations/WooCommerce/WooInit.php`

---

## WooCommerce Abandoned Cart

<Badge type="danger" vertical="middle" text="Pro" />

### `fluent_crm/ab_cart_cookie_validity`

Filter how long the abandon cart tracking cookie is valid (in days).

**Parameters**
- `$days` INT - Default `30`

**Usage:**
```php
add_filter('fluent_crm/ab_cart_cookie_validity', function($days) {
    return 14; // Track for 14 days
});
```

**Source:** `fluentcampaign-pro/app/Modules/AbandonCart/Woo/WooCartTrackingInit.php`

---

### `fluent_crm/ab_cart_opt_out_cookie_validity`

Filter how long the abandon cart opt-out cookie persists (in days).

**Parameters**
- `$days` INT - Default `7`

**Usage:**
```php
add_filter('fluent_crm/ab_cart_opt_out_cookie_validity', function($days) {
    return 30;
});
```

**Source:** `fluentcampaign-pro/app/Modules/AbandonCart/Woo/WooCartTrackingInit.php`

---

### `fluent_crm/ab_cart_is_win_status`

Determine whether a WooCommerce order status should be considered a "win" (recovered cart).

**Parameters**
- `$isWon` Boolean - whether the status counts as recovery
- `$orderStatus` String - WooCommerce order status
- `$driver` Object - cart driver instance

**Usage:**
```php
add_filter('fluent_crm/ab_cart_is_win_status', function($isWon, $orderStatus, $driver) {
    // Custom statuses that count as cart recovery
    if ($orderStatus === 'wc-on-hold') {
        return true;
    }
    return $isWon;
}, 10, 3);
```

**Source:** `fluentcampaign-pro/app/Modules/AbandonCart/Woo/WooDriver.php`

---

## EDD

<Badge type="danger" vertical="middle" text="Pro" />

### `fluent_crm/user_can_view_edd_report`

Control whether a user can access EDD integration reports in FluentCRM.

**Parameters**
- `$canView` Boolean - default checks `view_shop_sensitive_data` capability

**Usage:**
```php
add_filter('fluent_crm/user_can_view_edd_report', function($canView) {
    return current_user_can('manage_options');
});
```

**Source:** `fluentcampaign-pro/app/Services/Integrations/Edd/DeepIntegration.php`

---

## Integration Metaboxes

<Badge type="danger" vertical="middle" text="Pro" />

### `fluentcrm_disable_integration_metaboxes`

Disable FluentCRM metaboxes within specific third-party plugin admin pages (WooCommerce, EDD, LearnDash, etc.).

**Parameters**
- `$shouldDisable` Boolean - Default `false`
- `$integrationName` String - integration slug (e.g., `woocommerce`, `edd`, `learndash`, `lifterlms`, `learnpress`, `tutorlms`)

**Usage:**
```php
add_filter('fluentcrm_disable_integration_metaboxes', function($shouldDisable, $integrationName) {
    if ($integrationName === 'woocommerce') {
        return true; // Disable metabox on WooCommerce product pages
    }
    return $shouldDisable;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Services/Integrations/` (multiple integration init files)
