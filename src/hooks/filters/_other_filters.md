<explain-block title="fluent_crm/enable_unsub_header">
By Default FluentCRM include unsubscribe header to marketing emails. If you don't want to include the unsubscribe-list header, you can use this hook.

**Parameters**
- `$status` Boolean - Default false

**Usage:**
```php 
/*
* Disable FluentCRM Unsubscribe-List header
*/
add_filter('fluent_crm/enable_unsub_header', function($status) {
   return false;
});
```
</explain-block>

<explain-block title="fluent_crm/email_headers">
If you want to add custom email (mime) header you can use this hook

**Parameters**
- `$headers` array 
- `$data` array - Email Data

**Usage:**
```php 
/*
* Add Custom Header to FluentCRM Email Mime
*/
add_filter('fluent_crm/email_headers', function($headers, $data) {
   // Add or remove headers
   
   return $headers;
}, 10, 2);
```
</explain-block>

<explain-block title="fluent_crm/enable_mailer_to_name">
By Default FluentCRM include name of the contact when sending emails for better deliverability, if you want to disable that, you can use this hook

**Parameters**
- `$status` Boolean - Default false

**Usage:**
```php 
/*
* Disable FluentCRM Name to Email
*/
add_filter('fluent_crm/enable_mailer_to_name', function($status) {
   return false;
});
```
</explain-block>

<explain-block title="fluent_crm/user_permissions">
You can customize the user's permission set from FluentCRM settings page. But if you want to customize that from code level you can use this hook.

**Parameters**
- `$permissions` Flat Array - Permission Array
- `$wpUser` \WP_User - WordPress User

**Usage:**
```php 
/*
* Customize Permissions
*/
add_filter('fluent_crm/user_permissions', function($permissions, $wpUser) {
   // Customize the permission for specific user and then return
   return $permissions;
}, 10, 2);
```
</explain-block>

<explain-block title="fluent_crm/default_email_design_template">
If you want to change the default email design template, you may use this hook.

**Parameters**
- `$designTemplateSlug` string - Default 'simple'

**Usage:**
```php 
/*
* Change Email Template Type to classic
*/
add_filter('fluent_crm/default_email_design_template', function($designTemplateSlug) {
   return 'classic';
});
```
</explain-block>

<explain-block title="fluent_crm/contact_name_prefixes">
By Default FluentCRM name prefixes are `Mr`, `Mrs` and `Ms`, You want to remove or add your own name prefixes here.

**Parameters**
- `$namePrefixes` array 

**Usage:**
```php 
/*
* Add More Name Prefixes
*/
add_filter('fluent_crm/contact_name_prefixes', function($namePrefixes) {
   $namePrefixes[] = 'Dr';
   $namePrefixes[] = 'Engg.';
   
   return $namePrefixes;
});
```
</explain-block>

<explain-block title="fluent_crm/woo_purchase_sidebar_html">
When you view a contact then it shows related woocommerce data for the contact. You may customize that here

**Parameters**
- `$sidebarHtml` string - HTML
- `$subscriber` Subscriber Model
- `$pageNumber` INT - Pagination Page Number

**Usage:**
```php 
/*
* Add Custom Data to sidebar HTML of Contact Woo Summary
*/
add_filter('fluent_crm/woo_purchase_sidebar_html', function($sidebarHtml, $subscriber, $pageNumber) {
   if(!$sidebarHtml) {
        return ''; // No info found
   }
   
   $sidebarHtml .= '<p>My custom info</p>';
}, 20, 3);
```
</explain-block>

<explain-block title="fluent_crm/edd_purchase_sidebar_html">
When you view a contact then it shows related Easy Digital Downloads data for the contact. You may customize that here

**Parameters**
- `$sidebarHtml` string - HTML
- `$subscriber` Subscriber Model
- `$pageNumber` INT - Pagination Page Number

**Usage:**
```php 
/*
* Add Custom Data to sidebar HTML of Contact EDD Summary
*/
add_filter('fluent_crm/edd_purchase_sidebar_html', function($sidebarHtml, $subscriber, $pageNumber) {
   if(!$sidebarHtml) {
        return ''; // No info found
   }
   
   $sidebarHtml .= '<p>My custom info</p>';
}, 20, 3);
```
</explain-block>

<explain-block title="fluent_crm/bounced_email_store">
This filter allows you to customize whether a bounced email should be stored in the system or not

**Parameters**
- `$store` boolean - Default true

**Usage:**
```php
/*
* Prevent storing bounced emails in the system
*/
add_filter('fluent_crm/bounced_email_store', function($store) {
    return false; // Prevent storing bounced emails
}, 20, 3);
```
</explain-block>

<explain-block title="Throughput, Batch, and Time-Limit Filters">
These filters control processing batch sizes and runtime windows for campaign, automation, mailer, and SMS queues.

**Where to add overrides**
- Create an MU plugin: `wp-content/mu-plugins/fluentcrm-throughput-overrides.php`

**Current defaults (Core + Pro)**
- `fluent_crm/funnel_processor_batch_limit` => `200`
- `fluent_crm/funnel_processor_max_processing_seconds` => `55`
- `fluent_crm/contact_bulk_action_limit` => `400`
- `fluent_crm/five_minute_campaign_selection_limit` => `2`
- `fluent_crm/five_minute_campaign_processing_chunk` => `20`
- `fluent_crm/campaign_processing_stat_chunk` => `30`
- `fluent_crm/campaign_processing_stat_runtime_seconds` => `10`
- `fluent_crm/process_subscribers_per_request` => `30` (common), `100` in import/user contexts
- `fluent_crm/mailer_handler_chunk_size` => `20`
- `fluent_crm/mailer_handler_max_processing_seconds` => `50`
- `fluent_crm/mailer_multi_thread_chunk_size` => `20`
- `fluent_crm/mailer_multi_thread_max_processing_seconds` => `50`
- `fluent_crm/mailer_multi_thread_offset` => `250`
- `fluent_crm/email_limit_per_second` => derived from settings (`14` fallback)
- `fluent_crm/max_run_time` => derived from PHP `max_execution_time` (safe-clamped)
- `fluent_crm/sequence_tracker_batch_limit` (Pro) => `200`
- `fluent_crm/recurring_campaign_batch_limit` (Pro) => `10`
- `fluent_crm/sms_five_minute_campaign_selection_limit` (Pro) => `2`
- `fluent_crm/sms_process_subscribers_per_request` (Pro) => `30`
- `fluent_crm/sms_scheduler_chunk_size` (Pro) => `10`
- `fluent_crm/sms_scheduler_max_processing_seconds` (Pro) => `30`
- `fluent_crm/sms_campaign_action_limit` (Pro) => `50`

**Usage:**
```php
<?php
/**
 * Plugin Name: FluentCRM Throughput Overrides
 */

// Core
add_filter('fluent_crm/funnel_processor_batch_limit', function ($limit) {
    return 600;
});

add_filter('fluent_crm/five_minute_campaign_selection_limit', function ($limit) {
    return 4;
});

add_filter('fluent_crm/five_minute_campaign_processing_chunk', function ($chunk, $campaign) {
    return 40;
}, 10, 2);

add_filter('fluent_crm/mailer_handler_chunk_size', function ($chunk) {
    return 30;
});

add_filter('fluent_crm/mailer_handler_max_processing_seconds', function ($seconds) {
    return 50;
});

// Pro
add_filter('fluent_crm/sequence_tracker_batch_limit', function ($limit) {
    return 500;
});

add_filter('fluent_crm/sms_five_minute_campaign_selection_limit', function ($limit) {
    return 3;
});

add_filter('fluent_crm/sms_process_subscribers_per_request', function ($limit) {
    return 120;
});

add_filter('fluent_crm/sms_scheduler_chunk_size', function ($chunk, $scheduler) {
    return 25;
}, 10, 2);
```
</explain-block>
