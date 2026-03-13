---
description: "Frontend filter hooks in FluentCRM — unsubscribe page, double optin, manage subscription page, and bounce handling customization."
---

# Frontend Filters

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These filter hooks let you customize FluentCRM's frontend pages — unsubscribe forms, double optin behavior, subscription management, and bounce handling.

## Unsubscribe Page

### `fluent_crm/will_auto_unsubscribe`

Control whether FluentCRM auto-unsubscribes in one click without showing the reason form. Default behavior asks for a reason.

**Parameters**
- `$status` String - `'yes'` or `'no'`, Default `'no'`

**Usage:**
```php
add_filter('fluent_crm/will_auto_unsubscribe', function($status) {
    return 'yes'; // One-click unsubscribe, no form
});
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

### `fluent_crm/unsubscribe_texts`

Filter the labels and texts displayed on the unsubscribe page form.

**Parameters**
- `$texts` Array - Form labels
- `$subscriber` [Subscriber Model](/database/models/subscriber) - Contact who is unsubscribing

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
add_filter('fluent_crm/unsubscribe_texts', function($texts, $subscriber) {
    $texts['button_text'] = 'Unsubscribe (No email updates)';
    return $texts;
}, 10, 2);
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

### `fluent_crm/unsubscribe_reasons`

Filter the reasons shown in the unsubscribe reason dropdown.

**Parameters**
- `$reasons` Array - Associative array of `reason_key => label`

**Usage:**
```php
add_filter('fluent_crm/unsubscribe_reasons', function($reasons) {
    $reasons['custom_reason'] = __('Other reason', 'fluent-crm');
    return $reasons;
}, 20);
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

### `fluent_crm/unsub_response_message`

Filter the response message shown after a contact successfully unsubscribes.

**Parameters**
- `$message` String - Response message HTML
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_filter('fluent_crm/unsub_response_message', function($message, $subscriber) {
    return 'You have been unsubscribed. No further emails will be sent.';
}, 10, 2);
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

### `fluent_crm/unsub_redirect_url`

Filter the redirect URL after a contact unsubscribes. Return a URL to redirect instead of showing a message.

**Parameters**
- `$redirectUrl` String - Redirect URL
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_filter('fluent_crm/unsub_redirect_url', function($redirectUrl, $subscriber) {
    return 'https://example.com/goodbye';
}, 10, 2);
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

## Double Optin

### `fluent_crm/double_optin_options`

Filter the double optin confirmation configuration — redirect URL, message, or behavior after a contact confirms.

**Parameters**
- `$config` Array - Confirmation settings
- `$subscriber` [Subscriber Model](/database/models/subscriber)

```php
$config = [
    'after_confirmation_type' => 'redirect', // or 'message'
    'after_confirm_message'   => 'MESSAGE_DEFINED_IN_SETTINGS',
    'after_conf_redirect_url' => 'URL_DEFINED_IN_SETTINGS',
];
```

**Usage:**
```php
add_filter('fluent_crm/double_optin_options', function($config, $subscriber) {
    $config['after_confirmation_type'] = 'redirect';
    $config['after_conf_redirect_url'] = 'https://example.com/welcome';
    return $config;
}, 10, 2);
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

### `fluent_crm/double_optin_email_subject`

Filter the double optin confirmation email subject line.

**Parameters**
- `$subject` String - Email subject
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_filter('fluent_crm/double_optin_email_subject', function($subject, $subscriber) {
    return 'Please confirm your subscription, ' . $subscriber->first_name;
}, 10, 2);
```

**Source:** `app/Services/Libs/Mailer/Handler.php`

---

### `fluent_crm/double_optin_email_body`

Filter the double optin confirmation email body HTML.

**Parameters**
- `$body` String - Email body HTML
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_filter('fluent_crm/double_optin_email_body', function($body, $subscriber) {
    // Customize the DOI email body
    return $body;
}, 10, 2);
```

**Source:** `app/Services/Libs/Mailer/Handler.php`

---

### `fluent_crm/double_optin_email_pre_header`

Filter the double optin confirmation email pre-header text.

**Parameters**
- `$preHeader` String - Pre-header text
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_filter('fluent_crm/double_optin_email_pre_header', function($preHeader, $subscriber) {
    return 'Confirm your email to start receiving updates';
}, 10, 2);
```

**Source:** `app/Services/Libs/Mailer/Handler.php`

---

## Manage Subscription Page

### `fluent_crm/pref_labels`

Filter the field labels on the Manage Subscription page.

**Parameters**
- `$labels` Array - Field labels

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
add_filter('fluent_crm/pref_labels', function($labels) {
    $labels['update'] = 'Update My Profile';
    return $labels;
});
```

**Source:** `app/Hooks/Handlers/PrefFormHandler.php`

---

### `fluent_crm/pref_form_fields`

Filter the fields rendered on the Manage Subscription form.

**Parameters**
- `$formFields` Array - Field definitions
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_filter('fluent_crm/pref_form_fields', function($formFields, $subscriber) {
    // Add, remove, or reorder form fields
    return $formFields;
}, 10, 2);
```

**Source:** `app/Hooks/Handlers/PrefFormHandler.php`

---

### `fluent_crm/show_unsubscribe_on_pref`

Control whether an unsubscribe button is shown on the Manage Subscription page. Default is hidden.

**Parameters**
- `$show` Boolean - Default `false`

**Usage:**
```php
add_filter('fluent_crm/show_unsubscribe_on_pref', function($show) {
    return true; // Show unsubscribe button on manage subscription page
});
```

**Source:** `app/Hooks/Handlers/PrefFormHandler.php`

---

## Newsletter Archive

<Badge type="danger" vertical="middle" text="Pro" />

### `fluent_crm/newsletter_archive_template`

Replace the newsletter archive list template file with a custom one.

**Parameters**
- `$templateFile` String - path to the template file

**Usage:**
```php
add_filter('fluent_crm/newsletter_archive_template', function($templateFile) {
    return plugin_dir_path(__FILE__) . 'templates/my-archive.php';
});
```

**Source:** `fluentcampaign-pro/app/Hooks/Handlers/CampaignArchiveFront.php`

---

### `fluent_crm/newsletter_single_template`

Replace the single newsletter display template file with a custom one.

**Parameters**
- `$templateFile` String - path to the template file

**Usage:**
```php
add_filter('fluent_crm/newsletter_single_template', function($templateFile) {
    return plugin_dir_path(__FILE__) . 'templates/my-newsletter.php';
});
```

**Source:** `fluentcampaign-pro/app/Hooks/Handlers/CampaignArchiveFront.php`

---

### `fluent_crm/newsletter_single_permalink_base`

Customize the base URL for newsletter archive links.

**Parameters**
- `$basePermalink` String - default uses `get_the_permalink()`

**Usage:**
```php
add_filter('fluent_crm/newsletter_single_permalink_base', function($basePermalink) {
    return home_url('/newsletters/');
});
```

**Source:** `fluentcampaign-pro/app/Hooks/Handlers/CampaignArchiveFront.php`

---

### `fluent_crm/newsletter_list_title_single`

Filter individual newsletter titles in the archive list view.

**Parameters**
- `$subject` String - newsletter subject/title
- `$campaign` Campaign Model

**Usage:**
```php
add_filter('fluent_crm/newsletter_list_title_single', function($subject, $campaign) {
    return '[Newsletter] ' . $subject;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Hooks/Handlers/CampaignArchiveFront.php`

---

### `fluent_crm/newsletter_preview_data`

Filter newsletter data before rendering the single newsletter view.

**Parameters**
- `$newsletter` Array - newsletter display data
- `$campaign` Campaign Model

**Usage:**
```php
add_filter('fluent_crm/newsletter_preview_data', function($newsletter, $campaign) {
    // Modify newsletter before rendering
    return $newsletter;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Hooks/Handlers/CampaignArchiveFront.php`

---

### `fluent_crm/disable_newsletter_archive_css`

Disable the default CSS styling on newsletter archive pages.

**Parameters**
- `$shouldDisable` Boolean - Default `false`

**Usage:**
```php
add_filter('fluent_crm/disable_newsletter_archive_css', function($shouldDisable) {
    return true; // Use your own styles
});
```

**Source:** `fluentcampaign-pro/app/Views/single_newsletter.php`, `fluentcampaign-pro/app/Views/all_newsletters.php`

---

## Smart Link Auto-Login

<Badge type="danger" vertical="middle" text="Pro" />

### `fluent_crm/will_make_auto_login`

Control whether a contact is automatically logged in to WordPress when accessing a smart link.

**Parameters**
- `$willMakeLogin` Boolean - default is based on whether `fluent_crm/smart_link_verified` has fired
- `$contact` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_filter('fluent_crm/will_make_auto_login', function($willMakeLogin, $contact) {
    // Disable auto-login for certain contacts
    if ($contact->status !== 'subscribed') {
        return false;
    }
    return $willMakeLogin;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Hooks/Handlers/SmartLinkHandler.php`

---

### `fluent_crm/enable_high_level_auto_login`

Control whether admin or editor-level users can be auto-logged in via smart links. Disabled by default for security.

**Parameters**
- `$shouldEnable` Boolean - Default `false`

**Usage:**
```php
add_filter('fluent_crm/enable_high_level_auto_login', function($shouldEnable) {
    return false; // Keep disabled for safety
});
```

**Source:** `fluentcampaign-pro/app/Hooks/Handlers/SmartLinkHandler.php`

---

## Bounce Handling

### `fluent_crm/bounced_email_store`

Control whether a bounced email should be stored as a new unsubscribed contact in the system.

**Parameters**
- `$store` Boolean - Default `true`

**Usage:**
```php
add_filter('fluent_crm/bounced_email_store', function($store) {
    return false; // Don't create contacts from bounced emails
});
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

### `fluent_crm/soft_bounce_limit`

Filter the number of soft bounces before a contact is permanently marked as bounced.

**Parameters**
- `$limit` INT - Default `3`

**Usage:**
```php
add_filter('fluent_crm/soft_bounce_limit', function($limit) {
    return 5; // Allow more soft bounces before marking as bounced
});
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

### `fluent_crm/bounce_handlers`

Filter the array of bounce handler configurations (e.g., Amazon SES, Mailgun, SendGrid bounce endpoints).

**Parameters**
- `$handlers` Array - Handler config keyed by service name
- `$securityCode` String - Webhook security code

**Usage:**
```php
add_filter('fluent_crm/bounce_handlers', function($handlers, $securityCode) {
    $handlers['my_esp'] = [
        'title' => 'My ESP',
        'url'   => site_url('?fluentcrm=1&route=bounce_handler&provider=my_esp&verify_key=' . $securityCode)
    ];
    return $handlers;
}, 10, 2);
```

**Source:** `app/Http/Controllers/SettingsController.php`
