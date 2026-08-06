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

### `fluent_crm/before_pref_form`

This hook fires inside the `[fluentcrm_pref]` preference form's `<form>` element, right after the
nonce field and before any fields are rendered. Use it to inject custom markup at the top of the
form. The form only renders for an identified contact, so `$subscriber` is always set.

::: tip
These three injection hooks (`before_pref_form`, `after_pref_form_fields`, `after_pref_form`) add
markup only. To add, remove, or change the actual form fields, use the
[`fluent_crm/pref_form_fields`](/hooks/filters/frontend#fluent-crm-pref-form-fields) filter — the
`$fields` array these hooks receive is the result of that filter.
:::

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber) - the contact the form is rendered for
- `$fields` Array - the resolved form field definitions

**Usage:**
```php
add_action('fluent_crm/before_pref_form', function($subscriber, $fields) {
   echo '<p>Update your details below, ' . esc_html($subscriber->first_name) . '</p>';
}, 10, 2);
```

**Source:** `app/Views/external/pref_form.php`

---

### `fluent_crm/after_pref_form_fields`

This hook fires inside the `[fluentcrm_pref]` preference form's `<form>` element after all fields
have been rendered, immediately before the submit button. Use it to inject custom markup between
the last field and the button.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber) - the contact the form is rendered for
- `$fields` Array - the resolved form field definitions

**Usage:**
```php
add_action('fluent_crm/after_pref_form_fields', function($subscriber, $fields) {
   // Add your own code here
}, 10, 2);
```

**Source:** `app/Views/external/pref_form.php`

---

### `fluent_crm/after_pref_form`

This hook fires after the `[fluentcrm_pref]` preference form's closing `</form>` tag, before the
response-message container. Use it to add content below the form.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber) - the contact the form is rendered for
- `$fields` Array - the resolved form field definitions

**Usage:**
```php
add_action('fluent_crm/after_pref_form', function($subscriber, $fields) {
   // Add your own code here
}, 10, 2);
```

**Source:** `app/Views/external/pref_form.php`

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

### `fluent_crm/manage_sub_request_head`

The manage-subscription request page is a standalone page that renders when a visitor opens the
manage-subscription URL but cannot be identified (no valid secure hash). It asks for an email
address and emails the visitor a fresh subscription-management link. This hook fires in that page's
`<head>`, after `wp_head()` — it is the place to add custom CSS or head tags for the page.

::: tip
The setup action fired while this page renders is `fluent_crm/doing_unsubscribe_request_form` —
both the unsubscribe and manage-subscription request pages share that same hook.
:::

**Parameters**

_None._

**Usage:**
```php
add_action('fluent_crm/manage_sub_request_head', function() {
   ?>
   <style>
       /* your custom css here */
   </style>
   <?php
});
```

**Source:** `app/Views/external/manage_subscription_request_form.php`

---

### `fluent_crm/after_manage_sub_request_content`

This hook fires after the request-form block on the manage-subscription request page, inside the
page wrapper `<div>`. Use it to add your own content below the form.

**Parameters**

_None._

**Usage:**
```php
add_action('fluent_crm/after_manage_sub_request_content', function() {
   // Add your own code here
});
```

**Source:** `app/Views/external/manage_subscription_request_form.php`

---

### `fluent_crm/manage_sub_request_footer`

This hook fires at the end of the manage-subscription request page's `<body>`, after `wp_footer()`.
Use it to add scripts or closing content.

**Parameters**

_None._

**Usage:**
```php
add_action('fluent_crm/manage_sub_request_footer', function() {
   // Add your own code here
});
```

**Source:** `app/Views/external/manage_subscription_request_form.php`

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

### `fluent_crm/unsubscribe_request_head`

The unsubscribe request page is a standalone page that renders when a visitor opens the unsubscribe
URL but cannot be identified — there is no valid secure hash, or the campaign email in the URL does
not belong to the identified contact. It asks for an email address and emails the visitor a fresh
unsubscribe link. This hook fires in that page's `<head>`, after `wp_head()` — it is the place to
add custom CSS or head tags for the page.

**Parameters**

_None._

**Usage:**
```php
add_action('fluent_crm/unsubscribe_request_head', function() {
   ?>
   <style>
       /* your custom css here */
   </style>
   <?php
});
```

**Source:** `app/Views/external/unsubscribe_request_form.php`

---

### `fluent_crm/after_unsubscribe_request_content`

This hook fires after the request-form block on the unsubscribe request page, inside the page
wrapper `<div>`. Use it to add your own content below the form.

**Parameters**

_None._

**Usage:**
```php
add_action('fluent_crm/after_unsubscribe_request_content', function() {
   // Add your own code here
});
```

**Source:** `app/Views/external/unsubscribe_request_form.php`

---

### `fluent_crm/unsubscribe_request_footer`

This hook fires at the end of the unsubscribe request page's `<body>`, after `wp_footer()`. Use it
to add scripts or closing content.

**Parameters**

_None._

**Usage:**
```php
add_action('fluent_crm/unsubscribe_request_footer', function() {
   // Add your own code here
});
```

**Source:** `app/Views/external/unsubscribe_request_form.php`

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

### `fluent_crm/unsubscribe_request_email_head`

This hook fires in the `<head>` of the confirmation email that is sent after a visitor submits the
unsubscribe request form (the email that carries the actual unsubscribe link). Use it to add custom
CSS for the email — keep it email-client safe.

**Parameters**

_None._

**Usage:**
```php
add_action('fluent_crm/unsubscribe_request_email_head', function() {
   ?>
   <style>
       /* your custom email css here */
   </style>
   <?php
});
```

**Source:** `app/Views/external/unsubscribe_request_email.php`

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

---

## Frontend Portal Headless Page

<Badge type="danger" vertical="middle" text="Pro" />

FluentCRM Pro's experimental **Frontend Portal** (standalone mode) serves the CRM admin app at a
custom slug outside `wp-admin`, using a minimal "headless" HTML document. These hooks are that
document's extension points. Each receives a `$scope` string identifying which feature is rendering
the page — currently always `'crm_portal'`.

### `fluent_crm/headless/head_early`

This hook fires at the very top of the headless page's `<head>`, before `wp_head()` runs (the portal
renders with WordPress head/footer loading enabled) and before the page's fallback meta tags. Use it
for tags that must precede everything else, such as early meta or preload hints.

**Parameters**
- `$scope` String - the feature rendering the page; currently always `crm_portal`

**Usage:**
```php
add_action('fluent_crm/headless/head_early', function($scope) {
   if ($scope !== 'crm_portal') {
       return;
   }
   echo '<link rel="preconnect" href="https://example-cdn.com" />';
});
```

**Source:** `fluentcampaign-pro/app/Views/headless_page.php`

---

### `fluent_crm/headless/head`

This hook fires at the end of the headless page's `<head>`, after `wp_head()` and the page's inline
styles. Use it to add custom CSS or head attributes.

**Parameters**
- `$scope` String - the feature rendering the page; currently always `crm_portal`

**Usage:**
```php
add_action('fluent_crm/headless/head', function($scope) {
   ?>
   <style>
       /* your custom css here */
   </style>
   <?php
});
```

**Source:** `fluentcampaign-pro/app/Views/headless_page.php`

---

### `fluent_crm/headless/content`

This hook fires inside the headless page's `.fluent_layout` body wrapper and renders the page's main
content.

::: tip
The portal handler prints the portal app markup (or its permission notice) on this same hook at the
default priority `10`. Register with a priority below 10 to output content before the app, or above
10 to output after it.
:::

**Parameters**
- `$scope` String - the feature rendering the page; currently always `crm_portal`

**Usage:**
```php
add_action('fluent_crm/headless/content', function($scope) {
   echo '<div class="my-portal-banner">Welcome to the CRM portal</div>';
}, 9);
```

**Source:** `fluentcampaign-pro/app/Views/headless_page.php` (rendered by `fluentcampaign-pro/app/Hooks/Handlers/FrontendPortalHandler.php`)

---

### `fluent_crm/headless/footer`

This hook fires at the end of the headless page's `<body>`, after `wp_footer()`. Use it to add
scripts or closing content.

**Parameters**
- `$scope` String - the feature rendering the page; currently always `crm_portal`

**Usage:**
```php
add_action('fluent_crm/headless/footer', function($scope) {
   // Add your own code here
});
```

**Source:** `fluentcampaign-pro/app/Views/headless_page.php`

---

## Public Request Dispatch Hooks

FluentCRM's public request router (`?fluentcrm=1`) exposes two dynamic action hooks as extension points. Both fire on **unauthenticated** requests.

### `fluentcrm_webhook_to_{handler}`

Fires for `?fluentcrm=1&route=webhook&handler={handler}`. Intended for inbound webhooks from external services (for example, the Pro SMS module listens on `fluentcrm_webhook_to_sms_webhook`).

**Parameters**
- `$data` (array) The full request data (`$_REQUEST`), **unsanitized**. Only the `handler` segment of the hook name is sanitized.

::: tip
If nothing hooks the handler, FluentCRM responds with a JSON `No Action found` payload and exits.
A listener that produces its own output should emit it and `exit()` before returning.
:::

**Source:** `app/Hooks/Handlers/ExternalPages.php`

### `fluent_crm/handle_frontend_for_{handler}`

Fires for `?fluentcrm=1&route=general&handler={handler}`. Intended for public frontend flows (for example, the abandoned-cart modules use it for cart-recovery links). Nothing fires when the `handler` parameter is empty.

**Parameters**
- `$data` (array) The full request data (`$_REQUEST`), **unsanitized**. Only the `handler` segment of the hook name is sanitized.

::: danger Listeners must authenticate their own requests
These hooks follow the same trust model as WordPress core's `wp_ajax_nopriv_{action}`: FluentCRM performs **no** authentication, capability check, or nonce verification before dispatching. Any visitor can trigger your listener with arbitrary request data.

If your listener changes state (writes to the database, sends email/SMS, modifies a contact), it **must** validate its own per-request secret before acting — for example a signed hash or an unguessable token issued when the URL was generated, as the built-in listeners do (the SMS webhook verifies a webhook hash; cart-recovery links require a matching per-cart `checkout_key`). Treat every field of `$data` as untrusted input.
:::

**Source:** `app/Hooks/Handlers/ExternalPages.php`
