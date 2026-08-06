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

### `fluent_crm_handle_bounce_{$serviceName}`

Dynamic filter that processes the inbound bounce webhook for a custom ESP. It fires when the bounce
endpoint (`/wp-json/fluent-crm/v2/public/bounce_handler/{service_name}/handle/{security_code}`) is called
with a `{$serviceName}` that is **not** one of the built-in services (`mailgun`, `pepipost`,
`postmark`, `sendgrid`, `sparkpost`, `elasticemail`, `postalserver`, `smtp2go`, `brevo`, `tosend`)
— built-in services are handled internally and never reach this filter.

::: tip
[`fluent_crm/bounce_handlers`](/hooks/filters/frontend#fluent-crm-bounce-handlers) only lists your
endpoint in the UI — registering it without implementing this filter does nothing. This filter is
where the actual handling happens: parse the ESP payload from `$request` and record the bounce
against the contact, e.g. `(new \FluentCrm\App\Hooks\Handlers\ExternalPages())->recordUnsubscribe(['email' => ..., 'status' => 'bounced', 'reason' => ...])`
for hard bounces (also used with status `complained`/`unsubscribed`), or `recordSoftBounce()` for
temporary failures — that is what the built-in handlers do.
:::

::: danger Verify the security code yourself
For custom services the controller fires this filter **before** its own security-code check — your
callback receives the raw `{security_code}` URL segment and must `hash_equals()` it against the
stored code (`fluentcrm_get_option('_fc_bounce_key')`). Skipping this lets anyone who guesses the
URL mark your contacts as bounced.
:::

**Parameters**
- `$response` Array - Default `['success' => 0, 'message' => '', 'service' => $serviceName, 'result' => '', 'time' => time()]`. Return the same shape with `success => 1` and your handling result; the array is sent back as the webhook HTTP response
- `$request` Request Object - the incoming webhook request; the ESP payload is in its body/params
- `$securityCode` String - the security-code segment from the webhook URL

**Usage:**
```php
add_filter('fluent_crm_handle_bounce_my_esp', function($response, $request, $securityCode) {
    if (!hash_equals(fluentcrm_get_option('_fc_bounce_key'), $securityCode)) {
        return $response; // Invalid code — leave success = 0
    }

    $email = sanitize_email($request->get('recipient'));
    if ($email && $request->get('event') === 'hard_bounce') {
        $result = (new \FluentCrm\App\Hooks\Handlers\ExternalPages())->recordUnsubscribe([
            'email'  => $email,
            'status' => 'bounced',
            'reason' => 'Hard bounce reported by My ESP webhook'
        ]);
        $response['success'] = 1;
        $response['message'] = 'recorded';
        $response['result']  = $result;
    }

    return $response;
}, 10, 3);
```

**Source:** `app/Http/Controllers/WebhookBounceController.php`

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

### `fluentcrm_deep_integration_sync_{$provider}`

Dynamic filter that runs the contact sync for a deep-integration provider. When the admin clicks
"Sync" on a deep integration, FluentCRM fires this filter with `{$provider}` set to the same key
the provider registered under
[`fluentcrm_deep_integration_providers`](#fluentcrm-deep-integration-providers).

::: warning
Registering a provider without implementing both this filter and
[`fluentcrm_deep_integration_save_{$provider}`](#fluentcrm-deep-integration-save-provider) is a
dead end: the provider shows up in the UI, but every sync or save attempt returns "the provided
provider does not exist" because the unfiltered value is `false`.
:::

The sync request is repeated page by page — `$data['syncing_page']` advances on each call — so
process one batch per invocation and report progress back, the way the built-in WooCommerce/EDD
deep integrations do.

**Parameters**
- `$result` Mixed - Default `false` (treated as "provider does not exist"). Return a truthy array to send it as the REST response — the built-ins return `['syncing_status' => $status]` with the paging state — or a `WP_Error` to return its message as an error
- `$data` Array - the full request payload: `provider`, `action` (`sync`), the provider's settings (e.g. `tags`, `lists`, `contact_status`), and `syncing_page`

**Usage:**
```php
add_filter('fluentcrm_deep_integration_sync_my_shop', function($result, $data) {
    $page = (int) ($data['syncing_page'] ?? 1);
    $status = my_shop_sync_customers_page($page, $data['tags'] ?? [], $data['lists'] ?? []);

    return [
        'syncing_status' => $status // e.g. ['page' => $page + 1, 'has_more' => true, ...]
    ];
}, 10, 2);
```

**Source:** `app/Http/Controllers/SettingsController.php`

---

### `fluentcrm_deep_integration_save_{$provider}`

Dynamic filter that saves the settings of a deep-integration provider. Fires for every
deep-integration save request whose `action` is not `sync`; `{$provider}` is the key the provider
registered under [`fluentcrm_deep_integration_providers`](#fluentcrm-deep-integration-providers).
The return contract mirrors
[`fluentcrm_deep_integration_sync_{$provider}`](#fluentcrm-deep-integration-sync-provider): the
unfiltered `false` yields a "provider does not exist" error, so persist the settings yourself and
return a response array.

**Parameters**
- `$result` Mixed - Default `false`. Return a truthy array to send as the REST response — the built-ins return `['message' => ..., 'settings' => ...]` — or a `WP_Error` for an error response
- `$data` Array - the full request payload: `provider`, `action` (e.g. `save` or `disable`), and the settings to persist (e.g. `tags`, `lists`, `contact_status`)

**Usage:**
```php
add_filter('fluentcrm_deep_integration_save_my_shop', function($result, $data) {
    fluentcrm_update_option('_my_shop_sync_settings', [
        'tags'           => $data['tags'] ?? [],
        'lists'          => $data['lists'] ?? [],
        'contact_status' => $data['contact_status'] ?? 'subscribed'
    ]);

    return [
        'message'  => __('Settings have been saved', 'my-plugin'),
        'settings' => fluentcrm_get_option('_my_shop_sync_settings')
    ];
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

::: warning
Also fired from core by `OptionsController`, which builds segment options for the admin UI even when
FluentCRM Pro is not installed. Register segments unconditionally rather than gating on the Pro
controller being loaded.
:::

**Source:** `fluentcampaign-pro/app/Http/Controllers/DynamicSegmentController.php`, `app/Http/Controllers/OptionsController.php`

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

**Source:** `app/Models/Campaign.php`, `fluentcampaign-pro/app/Http/Controllers/DynamicSegmentController.php`, `fluentcampaign-pro/app/Hooks/Handlers/DynamicSegment.php`, `fluentcampaign-pro/app/Modules/SMS/Models/SMSCampaign.php`

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
- `$orderProps` Array - condition property definitions. Each entry takes `value`, `label`, `type` (`numeric`, `selections`, `single_assert_option`, `straight_assert_option`), plus type-specific keys such as `component`, `options`, `is_multiple` and `disabled`.
- `$funnel` [Funnel Model](/database/models/funnel) - the automation the conditions are being built for

**Usage:**
```php
add_filter('fluent_crm/woo_order_conditions', function($orderProps, $funnel) {
    $orderProps[] = [
        'value'    => 'custom_order_field',
        'label'    => 'Custom Order Field',
        'type'     => 'numeric',
        'disabled' => false
    ];
    return $orderProps;
}, 10, 2);
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

**Source:** `fluentcampaign-pro/app/Services/Integrations/WooCommerce/DeepIntegration.php`, `fluentcampaign-pro/app/Services/Integrations/WooCommerce/AdvancedReport.php`

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

### `fluent_crm/woo_trigger_names`

Filter the list of WordPress hook names FluentCRM recognizes as WooCommerce automation triggers.
The list feeds `Helper::isWooTrigger()`, which checks a funnel subscriber's `source_trigger_name`
to decide whether Woo order context is available — gating the Woo end-of-funnel actions, Woo order
smart code parsing (which loads the order from the funnel's `source_ref_id`), and Woo automation
order conditions.

::: tip
If you register a custom funnel trigger that fires on a Woo order hook — a custom order status,
for example — add that hook name here. Otherwise contacts entering through your trigger will have
their Woo smart codes and order conditions silently skipped, because FluentCRM does not know their
funnel carries an order reference.
:::

**Parameters**
- `$triggerNames` Array - Default `['woocommerce_order_status_changed', 'woocommerce_order_status_completed', 'woocommerce_order_refunded', 'woocommerce_order_status_processing', 'woocommerce_subscription_status_cancelled', 'fluent_crm/woo_subscription_expired_simulated', 'woocommerce_subscription_renewal_payment_failed', 'woocommerce_subscription_renewal_payment_complete', 'woocommerce_subscription_status_active']`

**Usage:**
```php
add_filter('fluent_crm/woo_trigger_names', function($triggerNames) {
    $triggerNames[] = 'woocommerce_order_status_shipped'; // Custom order status trigger
    return $triggerNames;
});
```

**Source:** `fluentcampaign-pro/app/Services/Integrations/WooCommerce/Helper.php`

---

### `fluent_crm/woo_subscription_trigger_names`

Filter the subset of hook names treated as WooCommerce **Subscriptions** triggers. Where
[`fluent_crm/woo_trigger_names`](#fluent-crm-woo-trigger-names) marks a funnel as carrying Woo
order context, this list marks it as also carrying subscription context, making the
<span v-pre>`{{woo_subscription.*}}`</span> smart codes available to funnels on that trigger (requires WooCommerce
Subscriptions).

**Parameters**
- `$triggerNames` Array - Default `['woocommerce_subscription_status_cancelled', 'fluent_crm/woo_subscription_expired_simulated', 'woocommerce_subscription_renewal_payment_failed', 'woocommerce_subscription_renewal_payment_complete', 'woocommerce_subscription_status_active']`

**Usage:**
```php
add_filter('fluent_crm/woo_subscription_trigger_names', function($triggerNames) {
    $triggerNames[] = 'woocommerce_subscription_status_on-hold';
    return $triggerNames;
});
```

**Source:** `fluentcampaign-pro/app/Services/Integrations/WooCommerce/Helper.php`

---

### `fluent_crm/get_woo_data`

Resolve the runtime value of a custom WooCommerce order data key. This is the fallback branch of
`WooDataHelper::getOrderItem()`, which supplies the order-side values when automation **order
conditions** are assessed — the built-in keys are `total_value`, `cat_purchased`, `product_ids`,
`billing_country`, `shipping_method`, `payment_gateway`, and `order_status`; any other `data_key`
lands here with an empty-string default.

::: tip
This is the runtime half of a custom order condition: register the condition definition with
[`fluent_crm/woo_order_conditions`](#fluent-crm-woo-order-conditions), then resolve its value from
the order here using the same `value`/`data_key`.
:::

**Parameters**
- `$value` String - Default `''`; return the order's value for this key so the condition assessor can compare it
- `$key` String - the condition `data_key` being resolved
- `$order` WC_Order - the WooCommerce order the funnel subscriber entered with

**Usage:**
```php
add_filter('fluent_crm/get_woo_data', function($value, $key, $order) {
    if ($key === 'coupon_used') {
        return $order->get_coupon_codes() ? 'yes' : 'no';
    }
    return $value;
}, 10, 3);
```

**Source:** `fluentcampaign-pro/app/Services/Integrations/WooCommerce/WooDataHelper.php`

---

## FluentCart

<Badge type="tip" vertical="middle" text="FluentCRM Core" />

### `fluent_crm/fluent_cart_checkout_auto_subscribe_data`

Filter the contact payload before a FluentCart customer is created or updated in FluentCRM. Fires
when a paid FluentCart order whose checkout opt-in box was ticked auto-subscribes the customer —
the FluentCart counterpart of
[`fluent_crm/woo_checkout_auto_subscribe_data`](#fluent-crm-woo-checkout-auto-subscribe-data).

**Parameters**
- `$subscriberData` Array - contact data to create/update: `first_name`, `last_name`, `email`, `country`, `state`, `city`, `postal_code`, `address_line_1`, `address_line_2`, plus `lists`/`tags` when configured and `status` (`pending` when double opt-in is enabled, otherwise `subscribed`)
- `$order` Object - the FluentCart Order model

**Usage:**
```php
add_filter('fluent_crm/fluent_cart_checkout_auto_subscribe_data', function($subscriberData, $order) {
    $subscriberData['source'] = 'fluent_cart_checkout';
    return $subscriberData;
}, 10, 2);
```

::: tip
If the filtered `status` is `pending`, the double opt-in email is sent right after the contact is
stored.
:::

**Source:** `app/Services/ExternalIntegrations/FluentCart/CheckoutSubscription.php`

---

## Abandoned Cart

<Badge type="danger" vertical="middle" text="Pro (WooCommerce)" /> <Badge type="tip" vertical="middle" text="Core (FluentCart)" />

::: tip
These hooks are shared by both abandoned-cart drivers. The WooCommerce driver lives in
FluentCRM Pro; the FluentCart driver ships in core. A callback affects whichever drivers are active.
:::

### `fluent_crm/ab_cart_cookie_validity`

Filter how long the abandoned-cart tracking cookie is valid (in days).

**Parameters**
- `$days` INT - Default `30`

**Usage:**
```php
add_filter('fluent_crm/ab_cart_cookie_validity', function($days) {
    return 14; // Track for 14 days
});
```

**Source:** `fluentcampaign-pro/app/Modules/AbandonCart/Woo/WooCartTrackingInit.php`, `app/Modules/AbandonCart/Drivers/FluentCart/FluentCartTrackingInit.php`

---

### `fluent_crm/ab_cart_opt_out_cookie_validity`

Filter how long the abandoned-cart opt-out cookie persists (in days).

**Parameters**
- `$days` INT - Default `7`

**Usage:**
```php
add_filter('fluent_crm/ab_cart_opt_out_cookie_validity', function($days) {
    return 30;
});
```

**Source:** `fluentcampaign-pro/app/Modules/AbandonCart/Woo/WooCartTrackingInit.php`, `app/Modules/AbandonCart/Drivers/FluentCart/FluentCartTrackingInit.php`

---

### `fluent_crm/ab_cart_is_win_status`

Determine whether an order status should be considered a "win" (recovered cart).

**Parameters**
- `$isWon` Boolean - whether the status counts as recovery
- `$orderStatus` String - the order status being tested; WooCommerce or FluentCart depending on the driver
- `$driver` Object - the cart driver instance, `WooDriver` or `FluentCartDriver`

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

**Source:** `fluentcampaign-pro/app/Modules/AbandonCart/Woo/WooDriver.php`, `app/Modules/AbandonCart/Drivers/FluentCart/FluentCartDriver.php`

---

### `fluent_crm/ab_cart_smart_code_default_value`

Resolve abandoned-cart smart codes the drivers do not handle themselves. Each driver's smart code
parser (<span v-pre>`{{ab_cart_woo.*}}`</span> for WooCommerce, <span v-pre>`{{ab_cart_fluent_cart.*}}`</span> for FluentCart) falls
through to this filter when the `$valueKey` is not one of its built-in keys (`cart_total`,
`recovery_url`, `cart_items_table`, billing/shipping fields, and so on) — so it is the extension
point for custom abandoned-cart smart codes. Both drivers fire the same hook; branch on
`$abCart->provider` (`woo` or `fluent_cart`) if the value differs per driver.

**Parameters**
- `$defaultValue` String - the smart code's fallback text (<span v-pre>`{{ab_cart_woo.my_key|Fallback}}`</span>), returned unchanged when nothing handles the key
- `$valueKey` String - the unresolved smart code key, e.g. `my_key`
- `$abCart` Object - the `AbandonCartModel` row for the cart being emailed (`email`, `total`, `currency`, `cart`, `checkout_key`, `provider`, ...)

**Usage:**
```php
add_filter('fluent_crm/ab_cart_smart_code_default_value', function($defaultValue, $valueKey, $abCart) {
    if ($valueKey === 'support_note') {
        return $abCart->provider === 'woo'
            ? 'Reply to this email and our shop team will help you check out.'
            : 'Your cart is saved — finish checkout any time.';
    }
    return $defaultValue;
}, 10, 3);
```

**Source:** `fluentcampaign-pro/app/Modules/AbandonCart/Woo/WooCartTrackingInit.php`, `app/Modules/AbandonCart/Drivers/FluentCart/FluentCartTrackingInit.php`

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

**Source:** `fluentcampaign-pro/app/Services/Integrations/Edd/DeepIntegration.php`, `fluentcampaign-pro/app/Services/Integrations/Edd/AdvancedReport.php`

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
