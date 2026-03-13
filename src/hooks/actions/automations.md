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

## Admin Views

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
