<explain-block title="fluent_crm/unsubscribe_head">
This hook fires on Unsubscribe page's `head`. If you want to add any custom css or head attributes then you can use this hook.
Anything echo from this hook will be added to `<head> </head>` in the page

**Parameters**
- `$subscriber` Subscriber Model
- `$campaignEmail` CampaignEmail Model

**Usage:**
```php 
/*
* Add Custom CSS for Unsubscribe page
*/
add_action('fluent_crm/unsubscribe_head', function($subscriber, $campaignEmail) {
   ?>
   <style>
       # your custom css here
   </style>
   <?php
}, 10, 2);
```
</explain-block>

<explain-block title="fluent_crm/before_unsubscribe_form">
This hook fires on Unsubscribe page's before header HTML. If you want to add own HTML at the starting of the page, then you may use this hook.

**Parameters**
- `$subscriber` Subscriber Model
- `$campaignEmail` CampaignEmail Model

**Usage:**
```php 
/*
* Add Custom Content for Unsubscribe page's before default content
*/
add_action('fluent_crm/before_unsubscribe_form', function($subscriber, $campaignEmail) {
   // Add your own code here
}, 10, 2);
```
</explain-block>

<explain-block title="fluent_crm/before_unsubscribe_form">
This hook fires on Unsubscribe page's before header HTML. If you want to add own HTML at the starting of the page, then you may use this hook.

**Parameters**
- `$subscriber` Subscriber Model
- `$campaignEmail` CampaignEmail Model

**Usage:**
```php 
/*
* Add Custom Content for Unsubscribe page's before default content
*/
add_action('fluent_crm/before_unsubscribe_form', function($subscriber, $campaignEmail) {
   // Add your own code here
}, 10, 2);
```
</explain-block>

<explain-block title="fluent_crm/before_unsubscribe_submit">
This hook fires on Unsubscribe page's before submit HTML. If you want to add own HTML before the button, then you may use this hook.

**Parameters**
- `$subscriber` Subscriber Model
- `$campaignEmail` CampaignEmail Model

**Usage:**
```php 
/*
* Add Custom Content for Unsubscribe page's before the button
*/
add_action('fluent_crm/before_unsubscribe_submit', function($subscriber, $campaignEmail) {
   // Add your own code here
}, 10, 2);
```
</explain-block>

<explain-block title="fluent_crm/after_unsubscribe_content">
This hook fires on Unsubscribe page's after the form content.

**Parameters**
- `$subscriber` Subscriber Model
- `$campaignEmail` CampaignEmail Model

**Usage:**
```php 
/*
* Add Custom Content for Unsubscribe page's before the button
*/
add_action('fluent_crm/after_unsubscribe_content', function($subscriber, $campaignEmail) {
   // Add your own code here
}, 10, 2);
```
</explain-block>

<explain-block title="fluent_crm/unsubscribe_footer">
This hook fires on Unsubscribe footer. If you want to add your own content in the page then you may use this hook.

**Parameters**
- `$subscriber` Subscriber Model
- `$campaignEmail` CampaignEmail Model

**Usage:**
```php 
/*
* Add Custom content in the unsubscribe page
*/
add_action('fluent_crm/unsubscribe_footer', function($subscriber, $campaignEmail) {
    if(!$subscriber) {
        return;
    }
   echo 'Hello '.$subscriber->first_name;
}, 10, 2);
```
</explain-block>
