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
- `$stats` Array - stat cards **keyed by slug** (`total_subscribers`, `total_campaigns`, `email_sent`, `total_automations`, and `email_pending` only when there are pending emails). Each entry takes `title`, `count`, and a `route` array of the form `['name' => 'campaigns']` naming the Vue route to open on click.

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
- `$links` Array - a numerically indexed list of quick links. Each item takes `title`, `url`, an optional `icon` (a FluentCRM icon component name such as `Documentations`, or an Element Plus class such as `el-icon-connection`), and an optional `is_external` flag for links that leave the admin.

**Usage:**
```php
add_filter('fluent_crm/quick_links', function($links) {
    $links[] = [
        'title'       => 'Documentation',
        'url'         => 'https://fluentcrm.com/docs/',
        'icon'        => 'el-icon-document',
        'is_external' => true
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

Filter FluentCRM's in-app navigation items, before the Reports and Settings entries are appended for
users holding `fcrm_manage_settings`.

**Parameters**
- `$menuItems` Array - a numerically indexed list of menu items. Each item accepts `key`, `label`, `permalink`, and optionally `icon` (inline SVG), `layout_class`, and a `sub_items` array of the same shape.
- `$permissions` Array - the current user's FluentCRM permissions, as a list of capability slugs
- `$urlBase` String - the admin URL prefix to build `permalink` values from, e.g. `admin.php?page=fluentcrm-admin#/`

**Usage:**
```php
add_filter('fluent_crm/core_menu_items', function($menuItems, $permissions, $urlBase) {
    if (!in_array('fcrm_manage_contacts', $permissions)) {
        return $menuItems;
    }

    $menuItems[] = [
        'key'       => 'my_page',
        'label'     => __('My Page', 'my-plugin'),
        'permalink' => $urlBase . 'my-page'
    ];

    return $menuItems;
}, 10, 3);
```

**Source:** `app/Hooks/Handlers/AdminMenu.php`

---

### `fluent_crm/menu_items`

Filter the finished FluentCRM navigation, after Reports and Settings have been appended. Use this
rather than `fluent_crm/core_menu_items` when you need to reorder or remove those two entries.

**Parameters**
- `$menuItems` Array - the complete numerically indexed menu list, same item shape as `fluent_crm/core_menu_items`

**Usage:**
```php
add_filter('fluent_crm/menu_items', function($menuItems) {
    // Items are a numeric list — match on the `key`, not an array index
    return array_values(array_filter($menuItems, function($item) {
        return ($item['key'] ?? '') !== 'settings';
    }));
});
```

**Source:** `app/Hooks/Handlers/AdminMenu.php`

---

### `fluent_crm/admin_vars`

Filter the admin JavaScript variables localized into the page. The array is exposed to the Vue app as
the global `window.fcAdmin`. Use this to pass custom data to the frontend.

**Parameters**
- `$data` Array - Admin vars object

**Usage:**
```php
add_filter('fluent_crm/admin_vars', function($data) {
    $data['my_custom_setting'] = 'value';
    return $data;
});
```

Read it back in the Vue app as `window.fcAdmin.my_custom_setting`.

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

Decide whether a WordPress administrator passes a FluentCRM permission check.

::: warning This filter only sees administrators
`PermissionManager::currentUserCan()` short-circuits to `true` for any user with `manage_options`,
and this filter is that short-circuit. Users **without** `manage_options` are resolved from their
stored FluentCRM permissions and never reach this hook — so you can use it to take capabilities
away from administrators, but not to grant them to anyone else. Use
[`fluent_crm/user_permissions`](#fluent-crm-user-permissions) for that.
:::

**Parameters**
- `$can` Boolean - Default `true`
- `$permission` String - the FluentCRM permission being checked, e.g. `fcrm_manage_settings`

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

Disable the FluentCRM contact search in the WordPress admin bar. Its result is passed straight into
`fluent_crm/disable_adminbar_search`, which has the final say.

::: tip
The search is also hidden when the request is not an admin screen, or when the current user lacks
contact-read permission — those checks run before either filter.
:::

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

### `fluent_crm/disable_adminbar_search`

The outer gate on the admin bar contact search. It receives whatever
`fluent_crm/disable_global_search` returned, so filtering this hook overrides that one.

**Parameters**
- `$disabled` Boolean - the value returned by `fluent_crm/disable_global_search`

**Usage:**
```php
add_filter('fluent_crm/disable_adminbar_search', function($disabled) {
    return current_user_can('editor') ? true : $disabled;
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
- `$anonymize` Boolean - the **Anonymize IP** compliance setting, `true` when it is set to `yes`

::: tip
The compliance setting is read once and cached in a static for the rest of the request, but the
filter itself runs on every call — so a callback that varies its answer still takes effect.
:::

**Usage:**
```php
add_filter('fluent_crm/anonymize_ip', function($anonymize) {
    return true; // Anonymize all stored IPs
});
```

**Source:** `app/Functions/helpers.php`

---

### `fluent_crm/max_run_time`

Filter the max run time (seconds) FluentCRM allows itself for long-running processes.

The unfiltered value is derived from PHP's `max_execution_time`: `0` (unlimited) becomes `60`, an
unreadable value becomes `30`, the result is capped at `58`, and a 3-second safety margin is
subtracted last. In practice that means **`27` on a typical 30-second host** and **`55` where PHP
reports unlimited**.

**Parameters**
- `$maxRunTime` INT - the derived budget in seconds, already capped and margin-adjusted

**Usage:**
```php
add_filter('fluent_crm/max_run_time', function($maxRunTime) {
    return 120; // Allow up to 2 minutes
});
```

**Source:** `app/Functions/helpers.php`

---

### `fluent_crm/menu_url_base`

Filter the base URL used to build FluentCRM admin links.

::: tip
The newer v3 admin screens use a separate `fluent_crm/new_menu_url_base` filter, whose default is
`admin_url('admin.php?page=fluent-crm-v3#/')`. Filter both if you are relocating the admin app.
:::

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

Control whether SSL is verified on FluentCRM's own background loopback request to `admin-ajax.php`.
Defaults to off because self-signed and mismatched local certificates would otherwise break
background processing.

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
