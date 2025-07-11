</explain-block>

<explain-block title="fluent_crm/woo_dynamic_coupon_created">
This action runs when a dynamically created coupon has been applied. This hook
provides access to the created coupon object and related data, allowing for the
programmatic addition of required metadata fields.



**Parameters**
- `$createdCoupon` - WC_Coupon object
- `$funnelMetric` - Funnel Metric Model
- `$subscriber` - Subscriber Model
- `$couponData` - Array of coupon data

**Usage:**
```php 
add_action('fluent_crm/woo_dynamic_coupon_created', function($createdCoupon, $funnelMetric, $subscriber, $couponData) {
   // Do you staffs here
});
```
</explain-block>