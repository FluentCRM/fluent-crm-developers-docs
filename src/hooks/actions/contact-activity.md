---
description: "Action hooks related to contact activity tracking in FluentCRM — email opens, link clicks, smart links, event tracking, and preference updates."
---

# Contact Activity Hooks

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These action hooks fire when contacts interact with emails, links, and subscription preferences.

## Email Opens

### `fluent_crm/email_opened`

This action fires when a tracked contact opens an email (first open only).

**Parameters**
- `$campaignEmail` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_action('fluent_crm/email_opened', function($campaignEmail) {
   // Email was opened by a tracked contact
   $subscriber = $campaignEmail->subscriber;
});
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`, `app/Hooks/Handlers/RedirectionHandler.php`

---

### `fluent_crm/email_opened_anonymously`

This action fires when an email open is detected but the contact is anonymous (tracking pixel loaded without identifiable contact).

**Parameters**
- `$email` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_action('fluent_crm/email_opened_anonymously', function($email) {
   // Anonymous email open detected
});
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

## Link Clicks

### `fluent_crm/email_url_clicked`

This action runs when a tracked contact clicks a link from an email.

**Parameters**
- `$campaignEmail` [CampaignEmail Model](/database/models/campaign-email)
- `$urlData` Object - URL tracking data

**Usage:**
```php
add_action('fluent_crm/email_url_clicked', function($campaignEmail, $urlData) {
   // Do your stuff here
}, 10, 2);
```

**Source:** `app/Hooks/Handlers/RedirectionHandler.php`

---

### `fluent_crm/anonymous_email_url_clicked`

This action fires when a URL in an email is clicked but the contact is anonymous.

**Parameters**
- `$url` string - the clicked URL
- `$campaign` [Campaign Model](/database/models/campaign)
- `$campaignEmail` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_action('fluent_crm/anonymous_email_url_clicked', function($url, $campaign, $campaignEmail) {
   // Anonymous click tracking
}, 10, 3);
```

**Source:** `app/Hooks/Handlers/RedirectionHandler.php`

---

### `fluencrm_benchmark_link_clicked`

This action runs when a benchmark link is clicked.

> **Note:** The typo in the hook name (`fluencrm` instead of `fluentcrm`) is intentional — this is how it exists in the source code.

**Parameters**
- `$benchmarkLinkId` INT - Benchmark ID
- `$subscriber` [Subscriber Model](/database/models/subscriber) or Null if no contact found

**Usage:**
```php
add_action('fluencrm_benchmark_link_clicked', function($benchmarkLinkId, $subscriber) {
   // Do your stuff here
}, 10, 2);
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`, `app/Hooks/Handlers/RedirectionHandler.php`

---

## Smart Links

### `fluentcrm_smartlink_clicked_direct`

This action fires when a contact clicks a smart link via email redirect tracking. This hook fires after the associated tags and lists actions have been processed.

**Parameters**
- `$slug` string - the smart link slug
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$campaignEmail` [CampaignEmail Model](/database/models/campaign-email)

**Usage:**
```php
add_action('fluentcrm_smartlink_clicked_direct', function($slug, $subscriber, $campaignEmail) {
   // Smart link was clicked via tracked email
}, 10, 3);
```

**Source:** `app/Hooks/Handlers/RedirectionHandler.php`

---

### `fluentcrm_smartlink_clicked`

This action fires when a smart link is clicked directly on an external page (not through email tracking).

**Parameters**
- `$slug` string - the smart link slug

**Usage:**
```php
add_action('fluentcrm_smartlink_clicked', function($slug) {
   // Smart link was clicked on an external page
});
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

### `fluent_crm/smart_link_verified`

This action fires when a secure smart link is verified (the security check passes before the link action is executed).

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_action('fluent_crm/smart_link_verified', function($subscriber) {
   // Secure smart link was verified for this contact
});
```

**Source:** `app/Hooks/Handlers/RedirectionHandler.php`

---

## Activity & Event Tracking

### `fluent_crm/track_activity_by_subscriber`

This action runs when a contact logs in to your site or clicks a link. This hook tracks the last_activity timestamp.

**Parameters**
- `$subscriber` INT|[Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_action('fluent_crm/track_activity_by_subscriber', function($subscriber) {
   if(is_numeric($subscriber)) {
     $subscriber = fluentCrmApi('contacts')->getContact($subscriber);
   }

   // Do your stuff here
});
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`, `app/Hooks/Handlers/RedirectionHandler.php`

---

### `fluent_crm/event_tracked`

This action fires when a custom event is tracked for a contact via the Tracker API. Fires for both new events and updated (incremented) events.

**Parameters**
- `$event` EventTracker Model
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_action('fluent_crm/event_tracked', function($event, $subscriber) {
   // A custom event was tracked
   // $event->event_key, $event->value, $event->counter
}, 10, 2);
```

**Source:** `app/Api/Classes/Tracker.php`

---

## Preference Updates

### `fluent_crm/pref_form_self_contact_updated`

This action runs when a contact updates their information on the manage subscriptions page.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$postedData` Array - key value pairs of data filled in the web form

**Usage:**
```php
add_action('fluent_crm/pref_form_self_contact_updated', function($subscriber, $postedData) {
   // Do your stuff here
}, 10, 2);
```

**Source:** `app/Hooks/Handlers/PrefFormHandler.php`
