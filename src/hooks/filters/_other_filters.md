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
This filter allows you to customize whether a bounced email should be stored in the system or not.

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
