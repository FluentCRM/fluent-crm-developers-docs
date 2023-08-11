<explain-block title="fluent_crm/disable_global_search">
By Default FluentCRM provides you a search bar when for easily search contacts and access FluentCRM pages. If you want to remove this feature you can use this hook

**Parameters**
- `$status` Boolean - Default false

**Usage:**
```php 
/*
* Disable FluentCRM search on admin bar
*/
add_filter('fluent_crm/disable_global_search', function($status) {
   return true;
});
```
</explain-block>

<explain-block title="fluent_crm/will_auto_unsubscribe">
By Default FluentCRM ask the reason to unsubscribe but if you want to disable that and automatically unsubscribe without showing the form then you can use this hook

**Parameters**
- `$status` enum - 'yes' or 'no', Default 'no'

**Usage:**
```php 
/*
* Disable FluentCRM search on admin bar
*/
add_filter('fluent_crm/will_auto_unsubscribe', function($status) {
   return 'yes';
});
```
</explain-block>

<explain-block title="fluent_crm/will_use_cookie">
By Default FluentCRM set cookie when someone click a link to track further actions like purchase and track revenue for that email campaign / sequence / automation.

**Parameters**
- `$status` boolean

  **Usage:**
  ::: warning Attention
  If you use the code snippet, no revenue report will be recorded
    ```php 
     /*
     * Disable Cookie 
     */
     add_filter('fluent_crm/will_use_cookie', function($status) {
        return false;
     });
    ```
</explain-block>

<explain-block title="fluent_crm/is_simulated_mail">
If you want to simulate all email sending from FluentCRM then you can use this hook.

**Parameters**
- `$status` boolean
- `$data` Email Data
- `$headers` Email Headers
**Usage:**

**Attention**
If you use the code snippet, no email will be sent from FluentCRM

 ```php
    /*
    * Disable Email 
    */
    add_filter('fluent_crm/is_simulated_mail', function($status) {
       return true;
    });
```
</explain-block>

<explain-block title="fluent_crm/countries">
If you alter the country lists of FluentCRM then you may use this filter.

**Parameters**
- `$countries` Array

**Usage:**

```php 
add_filter('fluent_crm/countries', function($countires) {
  // Process the conutries
  
  return $countries;
}, 20); // priority need to be greated than 10
```
</explain-block>
