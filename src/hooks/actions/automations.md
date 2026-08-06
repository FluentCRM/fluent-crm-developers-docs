---
description: "Action hooks for automation funnels, plugin initialization, admin views, and block editor in FluentCRM."
---

# Automations, Admin & Init Hooks

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These action hooks fire during plugin initialization, automation funnel execution, admin view rendering, and block editor loading.

## Plugin Initialization

### `fluentcrm_loaded`

This action fires when FluentCRM is fully loaded during the `plugins_loaded` WordPress action. Use this to register addons and extensions.

**Parameters**
- `$app` FluentCRM Application instance (DI container)

**Usage:**
```php
add_action('fluentcrm_loaded', function($app) {
   // Register your addon or extension
   // Access services via $app->make('ServiceName')
});
```

**Source:** `boot/app.php`

---

### `fluentcrm_addons_loaded`

This action fires immediately after `fluentcrm_loaded`. Useful for code that depends on other addons being registered.

**Parameters**
- `$app` FluentCRM Application instance

**Usage:**
```php
add_action('fluentcrm_addons_loaded', function($app) {
   // All addons have been registered at this point
});
```

**Source:** `boot/app.php`

---

### `fluent_crm/after_init`

This action fires on the WordPress `init` hook with priority 1000 (very late). Use this for operations that require full WordPress initialization.

::: tip Boot order
`fluentcrm_loaded` and `fluentcrm_addons_loaded` fire earlier, on `plugins_loaded` — before
`init`, the current user, and other plugins' `init` registrations are available. This hook is the
"FluentCRM has fully booted" signal: same `$app` container, but with WordPress fully initialized.
:::

**Parameters**
- `$app` FluentCRM Application instance

**Usage:**
```php
add_action('fluent_crm/after_init', function($app) {
   // WordPress is fully initialized, all plugins loaded
});
```

**Source:** `boot/app.php`

---

## Automation Funnels

### `fluent_crm/automation_funnel_start`

This action runs when a funnel starts for a subscriber.

**Parameters**
- `$funnel` [Funnel Model](/database/models/funnel)
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_action('fluent_crm/automation_funnel_start', function($funnel, $subscriber) {
   // Do whatever you want
}, 10, 2);
```

**Source:** `app/Services/Funnel/FunnelProcessor.php`

---

### `fluent_crm/automation_funnel_completed`

This action runs when a funnel has been completed for a subscriber.

**Parameters**
- `$funnel` [Funnel Model](/database/models/funnel)
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_action('fluent_crm/automation_funnel_completed', function($funnel, $subscriber) {
   // Do whatever you want
}, 10, 2);
```

**Source:** `app/Services/Funnel/FunnelProcessor.php`

---

## Funnel Sequence Steps

These dynamic hooks fire for individual funnel steps (sequences), keyed by the step's action type
slug. They are the lifecycle counterparts of the
[`fluentcrm_funnel_sequence_saving_{$actionName}`](/hooks/filters/automations#fluentcrm-funnel-sequence-saving-actionname)
filter — register all of them for the same `{$actionName}` when your custom action block owns
external resources.

### `fluent_crm/sequence_created_{$actionName}`

This dynamic action fires right after a **new** step row is inserted into `fc_funnel_sequences` —
when a step is added in the funnel editor (including steps inside condition branches), and for the
top-level steps of a cloned or imported funnel. Re-saving an existing step does not fire it, and on
the clone/import paths steps nested inside condition branches do not fire it either.

**Parameters**
- `$createdSequence` [FunnelSequence Model](/database/models/funnelSequence) - the newly created step, already saved

**Usage:**
```php
add_action('fluent_crm/sequence_created_my_custom_action', function($createdSequence) {
    // Provision whatever the new step needs, e.g. an external resource
});
```

**Source:** `app/Services/Funnel/FunnelHelper.php`, `app/Http/Controllers/FunnelController.php`

---

### `fluentcrm_funnel_sequence_deleting_{$actionName}`

This dynamic action fires just before a funnel step is deleted, once per removed step. It fires when
a step is removed in the funnel editor (re-saving the sequence list deletes the rows that are no
longer present) and for every step of an automation that is deleted, singly or in bulk. This is the
cleanup hook for custom action blocks — FluentCRM's own *Send Custom Email* action uses it to delete
the campaign that backed the removed step.

**Parameters**
- `$deletingSequence` [FunnelSequence Model](/database/models/funnelSequence) - the step about to be deleted (still in the database when the hook runs)
- `$funnel` [Funnel Model](/database/models/funnel) - the automation the step belongs to

**Usage:**
```php
add_action('fluentcrm_funnel_sequence_deleting_my_custom_action', function($deletingSequence, $funnel) {
    // Clean up resources the step created, e.g. from the saving filter
}, 10, 2);
```

**Source:** `app/Services/Funnel/FunnelHelper.php`, `app/Http/Controllers/FunnelController.php`

---

## Admin Views

### `fluentcrm_loading_app`

This action fires every time the FluentCRM admin SPA page is rendered, right before the app's
JavaScript is enqueued. It is the standard place for add-ons to enqueue their admin assets — it only
runs on FluentCRM's own admin pages, so nothing leaks into the rest of wp-admin. FluentCRM itself
also uses it to self-heal its cron schedules on each admin page load.

**Parameters**

**Parameters**

_None._

**Usage:**
```php
add_action('fluentcrm_loading_app', function() {
   wp_enqueue_script(
       'my-fluentcrm-addon',
       plugin_dir_url(__FILE__) . 'assets/addon.js',
       ['fluentcrm_admin_app_boot'],
       '1.0.0',
       true
   );
});
```

**Source:** `app/Hooks/Handlers/AdminMenu.php`

---

### `fluent_crm/before_admin_app_wrap`

This action fires before the main FluentCRM admin wrapper HTML is rendered. Use it to inject content above the FluentCRM app.

**Usage:**
```php
add_action('fluent_crm/before_admin_app_wrap', function() {
   echo '<div class="my-custom-banner">Notice</div>';
});
```

**Source:** `app/Views/admin/new_menu_page.php`

---

### `fluent_crm/admin_app`

This action fires after the main FluentCRM admin view is rendered. Use it to inject custom content into the admin panel.

**Usage:**
```php
add_action('fluent_crm/admin_app', function() {
   echo 'My Custom Content Here';
});
```

**Source:** `app/Views/admin/new_menu_page.php`

---

### `fluent_crm/after_core_menu_items`

This action fires after core admin menu items are loaded. Use it to add custom menu items to the FluentCRM admin panel.

**Parameters**
- `$permissions` Array - current user's FluentCRM permission strings
- `$isAdmin` Boolean - whether the current user is an administrator

**Usage:**
```php
add_action('fluent_crm/after_core_menu_items', function($permissions, $isAdmin) {
   if ($isAdmin) {
       // Add custom admin menu items
   }
}, 10, 2);
```

**Source:** `app/Hooks/Handlers/AdminMenu.php`

---

## Block Email Editor

### `fluent_crm/block_editor_head`

This action fires in the `<head>` section of FluentCRM's block email editor page. Use it to enqueue custom styles or scripts.

**Usage:**
```php
add_action('fluent_crm/block_editor_head', function() {
   ?>
   <style>
       /* Custom block editor styles */
   </style>
   <?php
});
```

**Source:** `app/Hooks/Handlers/FluentBlockEditorHandler.php`

---

### `fluent_crm/new_block_editor_footer`

This action fires in the footer of FluentCRM's block email editor page. Use it to add custom scripts or content.

**Usage:**
```php
add_action('fluent_crm/new_block_editor_footer', function() {
   ?>
   <script>
       // Custom block editor scripts
   </script>
   <?php
});
```

**Source:** `app/Hooks/Handlers/FluentBlockEditorHandler.php`
