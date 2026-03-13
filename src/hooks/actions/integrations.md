---
description: "Action hooks for third-party integrations in FluentCRM — Fluent Forms, WooCommerce, and more."
---

# Integration Hooks

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These action hooks fire when contacts are created or updated through third-party integrations.

## Fluent Forms

### `fluent_crm/contact_added_by_fluentform`

This action runs when a contact has been added via Fluent Forms.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$entry` Array
- `$form` Object
- `$feed` Array

**Usage:**
```php
add_action('fluent_crm/contact_added_by_fluentform', function($subscriber, $entry, $form, $feed) {
   // Do whatever you want with the $subscriber created by Fluent Forms
}, 10, 4);
```

---

### `fluent_crm/contact_updated_by_fluentform`

This action runs when a contact has been updated via Fluent Forms.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$entry` Array
- `$form` Object
- `$feed` Array

**Usage:**
```php
add_action('fluent_crm/contact_updated_by_fluentform', function($subscriber, $entry, $form, $feed) {
   // Do whatever you want with the $subscriber updated via Fluent Forms
}, 10, 4);
```

---

## WooCommerce

### `fluent_crm/woo_dynamic_coupon_created`

This action runs when a dynamically created coupon has been applied. This hook provides access to the created coupon object and related data, allowing for the programmatic addition of required metadata fields.

**Parameters**
- `$createdCoupon` - WC_Coupon object
- `$funnelMetric` - Funnel Metric Model
- `$subscriber` - [Subscriber Model](/database/models/subscriber)
- `$couponData` - Array of coupon data

**Usage:**
```php
add_action('fluent_crm/woo_dynamic_coupon_created', function($createdCoupon, $funnelMetric, $subscriber, $couponData) {
   // Do your stuff here
});
```

**Source:** `fluentcampaign-pro/app/Services/Integrations/WooCommerce/WooSmartCodeParse.php`

---

### `fluent_crm/before_woo_checkout_check`

<Badge type="danger" vertical="middle" text="Pro" />

Fires before processing the WooCommerce checkout subscription checkbox. Useful for custom validation.

**Parameters**
- `$isChecked` Boolean - whether the checkbox is checked
- `$orderId` INT - WooCommerce order ID

**Usage:**
```php
add_action('fluent_crm/before_woo_checkout_check', function($isChecked, $orderId) {
    // Custom pre-subscription validation
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Services/Integrations/WooCommerce/WooInit.php`

---

## WooCommerce Abandoned Cart

<Badge type="danger" vertical="middle" text="Pro" />

### `fluent_crm/ab_cart_woo_recovered`

Fires when an abandoned cart is recovered (customer returns and completes the purchase).

**Parameters**
- `$abandonCart` Object - abandoned cart data
- `$order` WC_Order - the completed order
- `$oldStatus` String - previous cart status

**Usage:**
```php
add_action('fluent_crm/ab_cart_woo_recovered', function($abandonCart, $order, $oldStatus) {
    // Track cart recovery metrics
}, 10, 3);
```

**Source:** `fluentcampaign-pro/app/Modules/AbandonCart/Woo/WooCartTrackingInit.php`

---

### `fluent_crm/ab_cart_woo_lost`

Fires when an abandoned cart is marked as lost (expired, no recovery).

**Parameters**
- `$abandonCart` Object - abandoned cart data
- `$order` WC_Order - the associated order
- `$oldStatus` String - previous cart status

**Usage:**
```php
add_action('fluent_crm/ab_cart_woo_lost', function($abandonCart, $order, $oldStatus) {
    // Handle lost cart
}, 10, 3);
```

**Source:** `fluentcampaign-pro/app/Modules/AbandonCart/Woo/WooCartTrackingInit.php`

---

### `fluentcrm/ab_cart_restore_failed`

Fires when an abandoned cart restore attempt fails.

**Parameters**
- `$abandonCart` Object|null - abandoned cart data (null if not found)

**Usage:**
```php
add_action('fluentcrm/ab_cart_restore_failed', function($abandonCart) {
    // Log the failed cart restore attempt
});
```

**Source:** `fluentcampaign-pro/app/Modules/AbandonCart/Woo/WooCartTrackingInit.php`

---

## SureCart

<Badge type="danger" vertical="middle" text="Pro" />

### `fluent_surecart_purchase_created_wrap`

Fires when a SureCart purchase is created. Contains formatted order data.

**Parameters**
- `$orderData` Array - formatted order data

**Usage:**
```php
add_action('fluent_surecart_purchase_created_wrap', function($orderData) {
    // Handle SureCart purchase
});
```

**Source:** `fluentcampaign-pro/app/Services/Integrations/SureCart/SureCartInit.php`

---

### `fluent_surecart_purchase_refund_wrap`

Fires when a SureCart purchase is refunded or revoked.

**Parameters**
- `$orderData` Array - formatted order data

**Usage:**
```php
add_action('fluent_surecart_purchase_refund_wrap', function($orderData) {
    // Handle SureCart refund
});
```

**Source:** `fluentcampaign-pro/app/Services/Integrations/SureCart/SureCartInit.php`
