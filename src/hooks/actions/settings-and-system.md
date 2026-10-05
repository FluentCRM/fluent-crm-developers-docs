---
description: "Action hooks for FluentCRM's email sending sessions and experimental module settings."
---

# Settings & System Actions

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Advanced" />

System-level action hooks that do not belong to a single contact, campaign or automation. For the
matching filters, see [Settings & System Filters](/hooks/filters/settings-and-system).

## Email Sending Sessions

A sending session is one lock-winning sender run, which can last up to roughly 50 seconds and spans
many claimed batches. Transport plugins use these two hooks to hold a reusable connection open for the
whole window. FluentSMTP, for example, uses them for SMTP keep-alive and HTTP connection reuse.

### `fluent_crm/email_sender_session_started`

Fires after a sender process wins the processing lock and a bulk sending session begins. It does not
fire for a process that fails to get the lock.

**Parameters**
- `$optionKey` String - the sender lock key; identifies the cron, multi-thread or CLI sender

**Usage:**
```php
add_action('fluent_crm/email_sender_session_started', function($optionKey) {
    // Open a reusable connection for the duration of the session
});
```

**Source:** `fluent-crm/app/Services/Libs/Mailer/BaseHandler.php`

---

### `fluent_crm/email_sender_session_ended`

Fires when the sender releases its processing lock, so close anything you opened on
`email_sender_session_started`. It can fire without a matching session start, because the lock may be
released when it was never held, and it can fire more than once per run. Make listeners idempotent.

**Parameters**
- `$optionKey` String - the sender lock key

**Usage:**
```php
add_action('fluent_crm/email_sender_session_ended', function($optionKey) {
    // Close the connection if it is open; safe to call repeatedly
});
```

**Source:** `fluent-crm/app/Services/Libs/Mailer/BaseHandler.php`

---

## Experimental Settings

### `fluent_crm/experimental_settings_saved`

Fires after the experimental module switches (Settings, Experimental) are saved through the REST API.
Core runs its own migrations for its modules. Modules that live in an add-on cannot be reached from
there, so they listen here to create their tables when their switch has just been turned on.

A partial request is merged into the stored settings first, so `$data` holds the full saved settings,
including flags the request did not carry.

**Parameters**
- `$data` Array - the full experimental settings as saved, for example `['company_module' => 'yes', 'messaging_module' => 'no', ...]`

**Usage:**
```php
add_action('fluent_crm/experimental_settings_saved', function($data) {
    if (($data['my_addon_module'] ?? '') === 'yes') {
        my_addon_create_tables();
    }
});
```

**Source:** `fluent-crm/app/Http/Controllers/SettingsController.php`
