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

**Source:** `app/Services/ExternalIntegrations/FluentForm/Bootstrap.php`

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

**Source:** `app/Services/ExternalIntegrations/FluentForm/Bootstrap.php`

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
}, 10, 4);
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

::: danger Two different names for the same event
The WooCommerce driver fires `fluentcrm/ab_cart_restore_failed` — note the `fluentcrm/` prefix,
which does not match FluentCRM's usual `fluent_crm/` convention. The FluentCart driver in core fires
`fluent_crm/ab_cart_restore_failed` instead. Register both if you want to cover either store:

```php
foreach (['fluentcrm/ab_cart_restore_failed', 'fluent_crm/ab_cart_restore_failed'] as $hook) {
    add_action($hook, function($abandonCart) {
        // Log the failed cart restore attempt
    });
}
```
:::

**Parameters**
- `$abandonCart` Object|null - abandoned cart data (null if not found)

**Usage:**
```php
add_action('fluentcrm/ab_cart_restore_failed', function($abandonCart) {
    // WooCommerce carts only — see the warning above for FluentCart
});
```

**Source:** `fluentcampaign-pro/app/Modules/AbandonCart/Woo/WooCartTrackingInit.php` (`fluentcrm/…`), `app/Modules/AbandonCart/Drivers/FluentCart/FluentCartTrackingInit.php` (`fluent_crm/…`)

---

## Abandoned Cart Drivers

### `fluent_crm/abandon_cart_register_drivers`

Fires on `init` (priority 90) while the abandoned cart module boots, right after the built-in
FluentCart driver is registered and **before** the module's active check — so drivers registered
here always appear in the abandoned cart settings, even when the feature is not enabled yet. The
Pro addon registers its WooCommerce driver on this hook.

A driver extends `FluentCrm\App\Modules\AbandonCart\Drivers\AbstractCartDriver` — implementing
`getProviderSlug()`, `getProviderLabel()`, `isAvailable()`, `register()`,
`registerAutomationTrigger()`, and the cart rendering/recovery methods — and must be registered
explicitly with `DriverManager::register()`; unlike SMS drivers, instantiating one does not
self-register. Only drivers that are available **and** toggled on in the settings are booted.

**Parameters**

_None._

**Usage:**
```php
use FluentCrm\App\Modules\AbandonCart\Drivers\DriverManager;

add_action('fluent_crm/abandon_cart_register_drivers', function () {
    DriverManager::register(new MyCartDriver()); // extends AbstractCartDriver
});
```

**Source:** `app/Modules/AbandonCart/AbandonCart.php`

---

## FluentCart Abandoned Cart

These are the FluentCart siblings of the WooCommerce abandoned cart hooks above — same argument
shape, fired by the FluentCart driver that ships in core.

### `fluent_crm/ab_cart_fluent_cart_recovered`

Fires when a FluentCart abandoned cart is marked as recovered — the tracked order is paid, or its
status changes to a "win" status while the cart is still `processing`, `lost`, or `cancelled`.
Carts still in `draft`, `opt_out`, or `pending` are deleted instead of recovered, so this hook does
not fire for them. The cart row is already saved with `status = 'recovered'`, the order ID, the
order total, and `recovered_at` when this runs. FluentCart sibling of
[`fluent_crm/ab_cart_woo_recovered`](#fluent-crm-ab-cart-woo-recovered).

**Parameters**
- `$abCart` Object - abandoned cart model, already saved as `recovered`
- `$order` Object - the FluentCart order
- `$oldStatus` String - the cart's status before recovery

**Usage:**
```php
add_action('fluent_crm/ab_cart_fluent_cart_recovered', function($abCart, $order, $oldStatus) {
    // Track cart recovery metrics
}, 10, 3);
```

**Source:** `app/Modules/AbandonCart/Drivers/FluentCart/FluentCartTrackingInit.php`

---

### `fluent_crm/ab_cart_fluent_cart_lost`

Fires when a FluentCart abandoned cart is marked as lost — the tracked order's status changes to
`failed` or `canceled`. Nothing fires when the cart is already `lost`. The cart row is already
saved with `status = 'lost'` when this runs; the driver's "lost" list/tag actions and automation
cancellation happen after the hook. FluentCart sibling of
[`fluent_crm/ab_cart_woo_lost`](#fluent-crm-ab-cart-woo-lost).

**Parameters**
- `$abCart` Object - abandoned cart model, already saved as `lost`
- `$order` Object - the FluentCart order
- `$oldStatus` String - the cart's status before it was marked lost

**Usage:**
```php
add_action('fluent_crm/ab_cart_fluent_cart_lost', function($abCart, $order, $oldStatus) {
    // Handle lost cart
}, 10, 3);
```

**Source:** `app/Modules/AbandonCart/Drivers/FluentCart/FluentCartTrackingInit.php`

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
