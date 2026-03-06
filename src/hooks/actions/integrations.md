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
