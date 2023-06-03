<explain-block title="fluent_crm/confirmation_head">
This hook fires on double optin confirmation head. If you want to add any custom css or head attributes then you can use this hook.
Anything echo from this hook will be added to `<head> </head>` in the page

**Parameters**
- `$subscriber` Subscriber Model

**Usage:**
```php 
/*
* Add Custom CSS for double ontin confirmation page
*/
add_action('fluent_crm/confirmation_head', function($subscriber) {
   ?>
   <style>
       # your custom css here
   </style>
   <?php
});
```
</explain-block>

<explain-block title="fluent_crm/confirmation_footer">
This hook fires on double optin confirmation footer. If you want to add your own content in the double optin confirmation page then you may use this hook.

**Parameters**
- `$subscriber` Subscriber Model

**Usage:**
```php 
/*
* Add Custom Content for double ontin confirmation page
*/
add_action('fluent_crm/confirmation_footer', function($subscriber) {
    if(!$subscriber) {
        return;
    }
   echo 'Hello '.$subscriber->first_name;
});
```
</explain-block>
