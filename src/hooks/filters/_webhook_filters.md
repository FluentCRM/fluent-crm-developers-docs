<explain-block title="fluent_crm/incoming_webhook_data">
If you want to intercept incoming Webhook before it's get validated and processed you can use this hook to format the data.

**Parameters**
- `$postData` array - Posted data on the webhook
- `$webhook` Webhook Model
- `$request` Request Object

**Usage:**
```php 
/*
* Customize Webhook data for webhook id: 1
*/
add_filter('fluent_crm/incoming_webhook_data', function($postedData, $webhook) {
   if($webhook->id != 1) {
        return $postedData;
   }
   
   // Customize your $postedData and return
   
    return $postedData;
}, 10, 3);
```
</explain-block>

<explain-block title="fluent_crm/webhook_contact_data">
FluentCRM Webhook data has been formatted at this point. If you want to alter the contact data and associated tags, lists, statuses, etc. You may use this hook

**Parameters**
- `$data` Array - Formatted Contact data that will be used to create or update a contact
- `$postedData` Array - Original Post Data
- `$webhook` Related Webhook Model

**Usage:**

```php 
add_filter('fluent_crm/webhook_contact_data', function($data, $postedData, $webhook) {
    // Customize the $data and return
    
    return $data;
}, 10, 3);
```
</explain-block>
