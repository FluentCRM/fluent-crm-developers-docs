<explain-block title="fluent_crm/unsubscribe_texts">
If you want to customize the labels on Unsubscribe page then you can use this filter hook.

**Parameters**

- `$texts` Array - Labels and texts of the unsubscribe page form
- `$subscriber` Subscriber Model - Current Subscriber who is unsubscribing now

```php
$texts = [
  'heading'             => __('Unsubscribe', 'fluent-crm'),
  'heading_description' => __('We\'re sorry to see you go!', 'fluent-crm'),
  'email_label'         => __('Your Email Address', 'fluent-crm'),
  'reason_label'        => __('Please let us know a reason', 'fluent-crm'),
  'button_text'         => __('Unsubscribe', 'fluent-crm')
];
```

**Usage:**

```php 
/*
* Alter Button Text of Unsubscribe form
*/
add_filter('fluent_crm/unsubscribe_texts', function($texts, $subscriber) {
   $texts['button_text'] = 'Unsubscribe (No email updates)';
   return $texts;
}, 10, 2);
```

</explain-block>

<explain-block title="fluent_crm/unsub_response_message">
After a contact unsubscribe and if you want to change the response message programmatically you may use this hook.

**Parameters**

- `$message` String - After Unsubscribe Response Message
- `$subscriber` Subscriber Model - Current Subscriber who is unsubscribing now

**Usage:**

```php 
/*
* Change Unsubscribe Response Text
*/
add_filter('fluent_crm/unsub_response_message', function($message, $subscriber) {
   return 'You are unsubscribed and no further email will be sent';
}, 10, 2);
```

</explain-block>

<explain-block title="fluent_crm/unsub_redirect_url">
After a contact unsubscribe and if you want to redirect the contact programmatically then you can use this hook

**Parameters**

- `$redirectUrl` String URL - After Unsubscribe Redirect URL
- `$subscriber` Subscriber Model - Current Subscriber who is unsubscribing now

**Usage:**

```php 
/*
* Change Unsubscribe Redirect URL
*/
add_filter('fluent_crm/unsub_redirect_url', function($redirectUrl, $subscriber) {
   return 'https://domain.com/path-to-my-custom-redirect';
}, 10, 2);
```

</explain-block>

<explain-block title="fluent_crm/double_optin_options">
After Double Optin Confirmation, if you want to change the default behavior (like redirect to a different URL or show
different content) then you can use this filter hook

**Parameters**

- `$config` Array - Settings of the default response config including redirect URL
- `$subscriber` Subscriber Model - Current Subscriber who is unsubscribing now

```php
$config = [
  'after_confirmation_type' => 'redirect', // or message
  'after_confirm_message'     => 'MESSAGE_DEFINED_IN_SETTINGS',
  'after_conf_redirect_url'   => 'URL DEFINED IN SETTINGS',
];
```

**Usage:**

```php 
/*
* Redirect to custom URL after DOI confirmation
*/
add_filter('fluent_crm/double_optin_options', function($config, $subscriber) {
   $config['after_confirmation_type'] = 'redirect';
   $config['after_conf_redirect_url'] = 'https://domain.com/path-to-confirm-page';
   return $config;
}, 10, 2);
```
</explain-block>

<explain-block title="fluent_crm/pref_labels">
Manage Subscription Page Labels Filter Hook

**Parameters**

- `$labels` - Manage Subscription Page Labels

```php
$labels = [
    'first_name'      => __('First Name', 'fluent-crm'),
    'last_name'       => __('Last Name', 'fluent-crm'),
    'prefix'          => __('Title', 'fluent-crm'),
    'email'           => __('Email', 'fluent-crm'),
    'phone'           => __('Phone/Mobile', 'fluent-crm'),
    'dob'             => __('Date of Birth', 'fluent-crm'),
    'address_line_1'  => __('Address Line 1', 'fluent-crm'),
    'address_line_2'  => __('Address Line 2', 'fluent-crm'),
    'city'            => __('City', 'fluent-crm'),
    'state'           => __('State', 'fluent-crm'),
    'postal_code'     => __('ZIP Code', 'fluent-crm'),
    'country'         => __('Country', 'fluent-crm'),
    'update'          => __('Update info', 'fluent-crm'),
    'address_heading' => __('Address Information', 'fluent-crm'),
    'list_label'      => __('Mailing List Groups', 'fluent-crm'),
];
```

**Usage:**

```php 
/*
* Alter Labels of the form
*/
add_filter('fluent_crm/pref_labels', function($labels) {
    $labels['update'] = 'Update My Profile';
    return $labels;
});
```
</explain-block>

<explain-block title="fluent_crm/pref_form_fields">

Manage Subscription Shortcode Fields customization Hook

**Parameters**

- `$formFields` - Manage Subscription Form Fields Array
- `$subscriber` - Current Subscriber

**Usage:**

```php 

add_filter('fluent_crm/pref_form_fields', function($formFields, $subscriber) {
   // Customize the $formFields and return
   
   return $formFields;
}, 10, 2);
```
</explain-block>

<explain-block title="fluent_crm/show_unsubscribe_on_pref">
By Default FluentCRM does not show unsubscribe button on Manage Subscription Page

**Parameters**

- `$status` - Boolean

**Usage:**

```php 
// Show Unsubscribe Button on Manage Subscription Page
add_filter('fluent_crm/show_unsubscribe_on_pref', function($status) {
   return true;
});
```
</explain-block>

<explain-block title="fluent_crm/double_optin_email_subject">
You can customize the double optin email subject from settings page but if you want to alter that then you can use this hook.

**Parameters**

- `$emailSubject` - String
- `$subscriber` - Subscriber Model

**Usage:**

```php 
add_filter('fluent_crm/double_optin_email_subject', function($emailSubject, $subscriber) {
   // do you staff
   
   return $emailSubject;
}, 10, 2);
```
</explain-block>

<explain-block title="fluent_crm/double_optin_email_body">
You can customize the double optin email body from settings page but if you want to alter that then you can use this hook.

**Parameters**

- `$emailBody` - String
- `$subscriber` - Subscriber Model

**Usage:**

```php 
add_filter('fluent_crm/double_optin_email_body', function($emailBody, $subscriber) {
   // do you staff
   
   return $emailBody;
}, 10, 2);
```
</explain-block>
