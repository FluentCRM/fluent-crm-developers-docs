<explain-block title="fluent_crm/unsubscribe_footer">
This hook fires on View On Browser page's `head`. If you want to add any custom css or head attributes then you can use this hook.
Anything echo from this hook will be added to `<head> </head>` in the page

**Parameters**
- `$campaignEmail` CampaignEmail Model

**Usage:**
```php 
/*
* Add Custom CSS
*/
add_action('fluent_crm/unsubscribe_head', function($campaignEmail) {
   ?>
   <style>
       # your custom css here
   </style>
   <?php
});
```
</explain-block>

<explain-block title="fluent_crm/view_on_browser_before_heading">
This hook fires on View On Browser page's before header HTML. If you want to add own HTML at the starting of the page, then you may use this hook.

**Parameters**
- `$campaignEmail` CampaignEmail Model


**Usage:**
```php 
/*
* Add Custom Content for View On Browser page's before default content
*/
add_action('fluent_crm/view_on_browser_before_heading', function($campaignEmail) {
   // Add your own code here
});
```
</explain-block>

<explain-block title="fluent_crm/view_on_browser_before_email_body">
This hook fires on View On Browser page's before header HTML. If you want to add own HTML before the email content, then you may use this hook.

**Parameters**
- `$campaignEmail` CampaignEmail Model

**Usage:**
```php 
/*
* Add Custom Content before email body
*/
add_action('fluent_crm/view_on_browser_before_email_body', function($campaignEmail) {
   // Add your own code here
});
```
</explain-block>

<explain-block title="fluent_crm/view_on_browser_after_email_body">
This hook fires on View On Browser page's after email body HTML.

**Parameters**
- `$campaignEmail` CampaignEmail Model

**Usage:**
```php 
/*
* Add Custom Content for after email body
*/
add_action('fluent_crm/view_on_browser_after_email_body', function($campaignEmail) {
   // Add your own code here
});
```
</explain-block>

<explain-block title="fluent_crm/view_on_browser_footer">
This hook fires on Unsubscribe footer. If you want to add your own content in the page then you may use this hook.

**Parameters**
- `$campaignEmail` CampaignEmail Model

**Usage:**
```php 
/*
* Add Custom content at the footer of the page 
*/
add_action('fluent_crm/view_on_browser_footer', function($campaignEmail) {
    // add your code here
}, 10, 2);
```
</explain-block>
