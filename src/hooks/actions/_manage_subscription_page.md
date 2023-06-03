<explain-block title="fluent_crm/manage_subscription_head">
This hook fires on manage subscription page's `head`. If you want to add any custom css or head attributes then you can use this hook.
Anything echo from this hook will be added to `<head> </head>` in the page

**Parameters**
- `$subscriber` Subscriber Model

**Usage:**
```php 
/*
* Add Custom CSS for manage subscription page
*/
add_action('fluent_crm/manage_subscription_head', function($subscriber) {
   ?>
   <style>
       # your custom css here
   </style>
   <?php
});
```
</explain-block>

<explain-block title="fluent_crm/manage_subscription_footer">
This hook fires on manage subscription footer. If you want to add your own content in the page then you may use this hook.

**Parameters**
- `$subscriber` Subscriber Model

**Usage:**
```php 
/*
* Add Custom content for manage subscription page
*/
add_action('fluent_crm/manage_subscription_footer', function($subscriber) {
    if(!$subscriber) {
        return;
    }
   echo 'Hello '.$subscriber->first_name;
});
```
</explain-block>
