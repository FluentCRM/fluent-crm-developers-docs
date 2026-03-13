---
description: "Action hooks for FluentCRM's frontend pages — double optin, manage subscription, unsubscribe, and view on browser."
---

# Frontend Page Hooks

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These action hooks let you customize FluentCRM's frontend pages by injecting custom CSS, HTML, or scripts.

## Double Optin Confirmation Page

### `fluent_crm/confirmation_head`

This hook fires on the double optin confirmation page's `<head>`. Use it to add custom CSS or head attributes.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_action('fluent_crm/confirmation_head', function($subscriber) {
   ?>
   <style>
       /* your custom css here */
   </style>
   <?php
});
```

**Source:** `app/Views/external/confirmation.php`

---

### `fluent_crm/confirmation_footer`

This hook fires on the double optin confirmation page footer. Use it to add your own content.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_action('fluent_crm/confirmation_footer', function($subscriber) {
    if(!$subscriber) {
        return;
    }
   echo 'Hello '.$subscriber->first_name;
});
```

**Source:** `app/Views/external/confirmation.php`

---

## Manage Subscription Page

### `fluent_crm/rendering_pref_form_shortcode`

This action fires before the manage subscription shortcode form is rendered. Use it to enqueue scripts or perform setup.

**Usage:**
```php
add_action('fluent_crm/rendering_pref_form_shortcode', function() {
   // Enqueue custom scripts or perform setup
   wp_enqueue_script('my-custom-script', '...');
});
```

**Source:** `app/Hooks/Handlers/PrefFormHandler.php`

---

### `fluent_crm/manage_subscription_head`

This hook fires on the manage subscription page's `<head>`. Use it to add custom CSS or head attributes.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_action('fluent_crm/manage_subscription_head', function($subscriber) {
   ?>
   <style>
       /* your custom css here */
   </style>
   <?php
});
```

**Source:** `app/Views/external/manage_subscription.php`

---

### `fluent_crm/manage_subscription_footer`

This hook fires on the manage subscription page footer. Use it to add your own content.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_action('fluent_crm/manage_subscription_footer', function($subscriber) {
    if(!$subscriber) {
        return;
    }
   echo 'Hello '.$subscriber->first_name;
});
```

**Source:** `app/Views/external/manage_subscription.php`

---

### `fluent_crm/before_manage_sub_request_email`

This action fires before the manage subscription request email is sent (when a contact requests their subscription management URL).

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$data` Array - email context data

**Usage:**
```php
add_action('fluent_crm/before_manage_sub_request_email', function($subscriber, $data) {
   // Customize or log the manage subscription request
}, 10, 2);
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

## Unsubscribe Page

### `fluent_crm/doing_unsubscribe_request_form`

This action fires when the unsubscribe request form is being rendered. Use it to enqueue scripts or perform setup before the form loads.

**Usage:**
```php
add_action('fluent_crm/doing_unsubscribe_request_form', function() {
   // Setup before unsubscribe form renders
});
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

### `fluent_crm/before_unsubscribe_request_email`

This action fires before the unsubscribe confirmation email is sent (when a contact requests to unsubscribe via the request form).

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$data` Array - email context data

**Usage:**
```php
add_action('fluent_crm/before_unsubscribe_request_email', function($subscriber, $data) {
   // Customize or log the unsubscribe request
}, 10, 2);
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

### `fluent_crm/unsubscribe_head`

This hook fires on the unsubscribe page's `<head>`. Use it to add custom CSS or head attributes.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$campaignEmail` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_action('fluent_crm/unsubscribe_head', function($subscriber, $campaignEmail) {
   ?>
   <style>
       /* your custom css here */
   </style>
   <?php
}, 10, 2);
```

**Source:** `app/Views/external/unsubscribe.php`

---

### `fluent_crm/before_unsubscribe_content`

This hook fires before the unsubscribe page content wrapper. Use it to add custom HTML above all unsubscribe content.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$campaignEmail` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_action('fluent_crm/before_unsubscribe_content', function($subscriber, $campaignEmail) {
   echo '<div class="custom-notice">Custom message here</div>';
}, 10, 2);
```

**Source:** `app/Views/external/unsubscribe.php`

---

### `fluent_crm/before_unsubscribe_form`

This hook fires before the unsubscribe form HTML (inside the content area). Use it to add custom HTML before the form.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$campaignEmail` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_action('fluent_crm/before_unsubscribe_form', function($subscriber, $campaignEmail) {
   // Add your own code here
}, 10, 2);
```

**Source:** `app/Views/external/unsubscribe.php`

---

### `fluent_crm/before_unsubscribe_submit`

This hook fires before the unsubscribe submit button. Use it to add custom HTML before the button.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$campaignEmail` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_action('fluent_crm/before_unsubscribe_submit', function($subscriber, $campaignEmail) {
   // Add your own code here
}, 10, 2);
```

**Source:** `app/Views/external/unsubscribe.php`

---

### `fluent_crm/after_unsubscribe_content`

This hook fires after the unsubscribe form content.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$campaignEmail` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_action('fluent_crm/after_unsubscribe_content', function($subscriber, $campaignEmail) {
   // Add your own code here
}, 10, 2);
```

**Source:** `app/Views/external/unsubscribe.php`

---

### `fluent_crm/unsubscribe_footer`

This hook fires on the unsubscribe page footer. Use it to add your own content.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$campaignEmail` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_action('fluent_crm/unsubscribe_footer', function($subscriber, $campaignEmail) {
    if(!$subscriber) {
        return;
    }
   echo 'Hello '.$subscriber->first_name;
}, 10, 2);
```

**Source:** `app/Views/external/unsubscribe.php`

---

## View On Browser Page

### `fluent_crm/view_on_browser_head`

This hook fires on the View On Browser page's `<head>`. Use it to add custom CSS or head attributes.

**Parameters**
- `$campaignEmail` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_action('fluent_crm/view_on_browser_head', function($campaignEmail) {
   ?>
   <style>
       /* your custom css here */
   </style>
   <?php
});
```

**Source:** `app/Views/external/view_on_browser.php`

---

### `fluent_crm/view_on_browser_before_heading`

This hook fires before the heading on the View On Browser page. Use it to add custom HTML at the top.

**Parameters**
- `$campaignEmail` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_action('fluent_crm/view_on_browser_before_heading', function($campaignEmail) {
   // Add your own code here
});
```

**Source:** `app/Views/external/view_on_browser.php`

---

### `fluent_crm/view_on_browser_before_email_body`

This hook fires before the email body on the View On Browser page.

**Parameters**
- `$campaignEmail` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_action('fluent_crm/view_on_browser_before_email_body', function($campaignEmail) {
   // Add your own code here
});
```

**Source:** `app/Views/external/view_on_browser.php`

---

### `fluent_crm/view_on_browser_after_email_body`

This hook fires after the email body on the View On Browser page.

**Parameters**
- `$campaignEmail` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_action('fluent_crm/view_on_browser_after_email_body', function($campaignEmail) {
   // Add your own code here
});
```

**Source:** `app/Views/external/view_on_browser.php`

---

### `fluent_crm/view_on_browser_footer`

This hook fires on the View On Browser page footer. Use it to add your own content.

**Parameters**
- `$campaignEmail` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_action('fluent_crm/view_on_browser_footer', function($campaignEmail) {
    // add your code here
});
```

**Source:** `app/Views/external/view_on_browser.php`
