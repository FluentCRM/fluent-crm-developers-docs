---
description: "Filter hooks for admin menus, permissions, dashboard stats, notices, settings, and general configuration in FluentCRM."
---

# Admin & Dashboard Filters

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These filter hooks let you customize admin menus, permissions, dashboard stats, notices, and general configuration settings.

## Dashboard

### `fluent_crm/dashboard_stats`

Filter the dashboard stats cards. Add or remove stat cards from the FluentCRM dashboard.

**Parameters**
- `$stats` Array - Dashboard stats, each containing `title`, `count`, and optional `route`

**Usage:**
```php
add_filter('fluent_crm/dashboard_stats', function($stats) {
    $stats['my_stat'] = [
        'title' => 'Active Members',
        'count' => 1234,
        'route' => ['name' => 'subscribers']
    ];
    return $stats;
});
```

**Source:** `app/Services/Stats.php`

---

### `fluent_crm/quick_links`

Filter the quick links shown on the FluentCRM dashboard.

**Parameters**
- `$links` Array - Quick link items, each with `title`, `url`, and optional `icon`

**Usage:**
```php
add_filter('fluent_crm/quick_links', function($links) {
    $links[] = [
        'title' => 'Documentation',
        'url'   => 'https://fluentcrm.com/docs/',
        'icon'  => 'el-icon-document'
    ];
    return $links;
});
```

**Source:** `app/Services/Stats.php`

---

### `fluent_crm/dashboard_notices`

Filter the notices displayed at the top of the FluentCRM admin dashboard.

**Parameters**
- `$notices` Array - HTML notice strings

**Usage:**
```php
add_filter('fluent_crm/dashboard_notices', function($notices) {
    $notices[] = '<p>Custom admin notice here</p>';
    return $notices;
});
```

**Source:** `app/Http/Controllers/DashboardController.php`

---

### `fluent_crm/sales_stats`

Filter the sales statistics shown on the FluentCRM dashboard.

**Parameters**
- `$stats` Array - Sales stat items, each with `title` and `content`

**Usage:**
```php
add_filter('fluent_crm/sales_stats', function($stats) {
    $stats[] = [
        'title'   => 'Monthly Revenue',
        'content' => '$5,000'
    ];
    return $stats;
});
```

**Source:** `app/Http/Controllers/DashboardController.php`

---

### `fluent_crm/dashboard_data`

Filter the complete dashboard data object returned to the admin panel. This includes stats, sales, notices, onboarding data, and quick links.

**Parameters**
- `$data` Array - Full dashboard data object

**Usage:**
```php
add_filter('fluent_crm/dashboard_data', function($data) {
    $data['custom_section'] = ['key' => 'value'];
    return $data;
});
```

**Source:** `app/Http/Controllers/DashboardController.php`

---

## Admin Menus

### `fluent_crm/core_menu_items`

Filter the core WordPress admin menu items for FluentCRM (before the Settings item is added).

**Parameters**
- `$menuItems` Array - Menu item definitions
- `$permissions` Array - Current user's FluentCRM permissions

**Usage:**
```php
add_filter('fluent_crm/core_menu_items', function($menuItems, $permissions) {
    $menuItems['my_page'] = [
        'title'      => 'My Page',
        'capability' => 'manage_options',
        'slug'       => 'my-custom-page'
    ];
    return $menuItems;
}, 10, 2);
```

**Source:** `app/Hooks/Handlers/AdminMenu.php`

---

### `fluent_crm/menu_items`

Filter the complete WordPress admin top-level menu items array for FluentCRM.

**Parameters**
- `$menuItems` Array - All menu item definitions

**Usage:**
```php
add_filter('fluent_crm/menu_items', function($menuItems) {
    // Remove or rearrange menu items
    unset($menuItems['settings']);
    return $menuItems;
});
```

**Source:** `app/Hooks/Handlers/AdminMenu.php`

---

### `fluent_crm/admin_vars`

Filter the entire `window.FluentCrmApp` admin JavaScript variables object injected into the page. Use this to add custom data accessible from the Vue frontend.

**Parameters**
- `$data` Array - Admin vars object

**Usage:**
```php
add_filter('fluent_crm/admin_vars', function($data) {
    $data['my_custom_setting'] = 'value';
    return $data;
});
```

**Source:** `app/Hooks/Handlers/AdminMenu.php`

---

## Permissions

### `fluent_crm/user_permissions`

Filter the resolved permissions array for a given WordPress user. You can also customize permissions from the FluentCRM settings page.

**Parameters**
- `$permissions` Array - Permission strings
- `$user` \WP_User - WordPress user object

**Usage:**
```php
add_filter('fluent_crm/user_permissions', function($permissions, $user) {
    if ($user->ID === 5) {
        $permissions[] = 'fcrm_manage_contacts';
    }
    return $permissions;
}, 10, 2);
```

**Source:** `app/Services/PermissionManager.php`

---

### `fluent_crm/readable_permissions`

Filter the full map of human-readable permission definitions (title, description, dependencies).

**Parameters**
- `$permissions` Array - Permission definitions

**Usage:**
```php
add_filter('fluent_crm/readable_permissions', function($permissions) {
    $permissions['fcrm_my_custom'] = [
        'title'       => 'My Custom Permission',
        'description' => 'Allows access to custom features',
        'depends'     => []
    ];
    return $permissions;
});
```

**Source:** `app/Services/PermissionManager.php`

---

### `fluent_crm/plugin_permissions`

Filter all registered permission slugs for the plugin.

**Parameters**
- `$permissions` Array - Permission slug strings

**Usage:**
```php
add_filter('fluent_crm/plugin_permissions', function($permissions) {
    $permissions[] = 'fcrm_my_custom';
    return $permissions;
});
```

**Source:** `app/Services/PermissionManager.php`

---

### `fluentcrm_current_admin_can`

Short-circuit a `currentUserCan()` permission check. Return `false` to deny access, `true` to allow.

**Parameters**
- `$can` Boolean - Default `true`
- `$permission` String - Permission being checked

**Usage:**
```php
add_filter('fluentcrm_current_admin_can', function($can, $permission) {
    if ($permission === 'fcrm_manage_settings' && !current_user_can('manage_options')) {
        return false;
    }
    return $can;
}, 10, 2);
```

**Source:** `app/Services/PermissionManager.php`

---

## General Settings

### `fluent_crm/disable_global_search`

Disable the FluentCRM global search bar from the WordPress admin bar.

**Parameters**
- `$disabled` Boolean - Default `false`

**Usage:**
```php
add_filter('fluent_crm/disable_global_search', function($disabled) {
    return true; // Remove FluentCRM search from admin bar
});
```

**Source:** `app/Hooks/Handlers/AdminBar.php`

---

### `fluent_crm/countries`

Filter the country list used in dropdowns throughout FluentCRM (contact profile, manage subscription, settings).

**Parameters**
- `$countries` Array - Country definitions (code, name)

**Usage:**
```php
add_filter('fluent_crm/countries', function($countries) {
    // Add or modify countries
    return $countries;
}, 20); // priority > 10
```

**Source:** `app/Hooks/Handlers/AdminMenu.php`, `app/Hooks/Handlers/PrefFormHandler.php`, `app/Http/Controllers/OptionsController.php`

---

### `fluent_crm/moment_date_time_format`

Filter the moment.js date/time format string passed to the frontend for date display.

**Parameters**
- `$format` String - moment.js format string

**Usage:**
```php
add_filter('fluent_crm/moment_date_time_format', function($format) {
    return 'DD/MM/YYYY HH:mm';
});
```

**Source:** `app/Hooks/Handlers/AdminMenu.php`

---

### `fluent_crm/will_track_user_ip`

Control whether the user's IP address should be recorded in activity logs.

**Parameters**
- `$track` Boolean - Default `true`

**Usage:**
```php
add_filter('fluent_crm/will_track_user_ip', function($track) {
    return false; // Don't track IP addresses
});
```

**Source:** `app/Functions/helpers.php`

---

### `fluent_crm/anonymize_ip`

Control whether stored IP addresses should be anonymized (e.g., last octet zeroed out).

**Parameters**
- `$anonymize` Boolean

**Usage:**
```php
add_filter('fluent_crm/anonymize_ip', function($anonymize) {
    return true; // Anonymize all stored IPs
});
```

**Source:** `app/Functions/helpers.php`

---

### `fluent_crm/max_run_time`

Filter the max PHP execution time (seconds) for long-running FluentCRM processes.

**Parameters**
- `$maxRunTime` INT - Max seconds

**Usage:**
```php
add_filter('fluent_crm/max_run_time', function($maxRunTime) {
    return 120; // Allow up to 2 minutes
});
```

**Source:** `app/Functions/helpers.php`

---

### `fluent_crm/menu_url_base`

Filter the base URL for generating FluentCRM admin links (v2 menu).

**Parameters**
- `$baseUrl` String - Default: `admin_url('admin.php?page=fluentcrm-admin#/')`

**Usage:**
```php
add_filter('fluent_crm/menu_url_base', function($baseUrl) {
    return admin_url('admin.php?page=fluentcrm-admin#/');
});
```

**Source:** `app/Functions/helpers.php`

---

### `fluent_crm/https_local_ssl_verify`

Control whether SSL is verified in local HTTP requests (e.g., loopback calls for processing triggers).

**Parameters**
- `$verify` Boolean - Default `false`

**Usage:**
```php
add_filter('fluent_crm/https_local_ssl_verify', function($verify) {
    return true; // Enforce SSL verification for local requests
});
```

**Source:** `app/Functions/helpers.php`

---

### `fluent_crm/verfied_email_senders`

Filter the array of verified sender email addresses for the "From" dropdown in campaign/email editors.

**Parameters**
- `$senders` Array - Verified sender email addresses

**Usage:**
```php
add_filter('fluent_crm/verfied_email_senders', function($senders) {
    $senders[] = 'marketing@example.com';
    return $senders;
});
```

**Source:** `app/Hooks/Handlers/AdminMenu.php`

---

### `fluent_crm/global_search_result_limit`

Filter the maximum number of results returned by the global search endpoint.

**Parameters**
- `$limit` INT - Default `100`

**Usage:**
```php
add_filter('fluent_crm/global_search_result_limit', function($limit) {
    return 50;
});
```

**Source:** `app/Http/Controllers/OptionsController.php`
