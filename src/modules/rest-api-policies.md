---
title: REST API Policies & Permissions
description: "Authorize REST API requests in FluentCRM using policies, capability checks, method-specific permissions, and middleware."
---

# Policies & Permissions

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

Policies control who can access your REST API endpoints. They are checked before your controller method runs — if the policy returns `false`, the request is rejected with a `403` response.

## Creating a Policy

Extend `BasePolicy` and implement `verifyRequest()`:

```php
<?php

namespace MyPlugin\Policies;

use FluentCrm\App\Http\Policies\BasePolicy;
use FluentCrm\Framework\Http\Request\Request;

class MyPolicy extends BasePolicy
{
    public function verifyRequest(Request $request)
    {
        return $this->currentUserCan('fcrm_manage_contacts');
    }
}
```

### Binding a Policy to Routes

Use `withPolicy()` when registering routes:

```php
$app->router
    ->prefix('my-plugin')
    ->withPolicy('MyPlugin\Policies\MyPolicy')
    ->group(function ($router) {
        $router->get('/items', 'MyPlugin\Controllers\ItemController@index');
        $router->post('/items', 'MyPlugin\Controllers\ItemController@store');
        $router->delete('/items/{id}', 'MyPlugin\Controllers\ItemController@destroy')->int('id');
    });
```

## Method-Specific Permissions

The framework automatically matches policy method names to controller method names. If a policy method matching the controller method exists, it runs **instead of** `verifyRequest()`.

```php
class MyPolicy extends BasePolicy
{
    // Fallback for any route without a specific policy method
    public function verifyRequest(Request $request)
    {
        return $this->currentUserCan('fcrm_read_contacts');
    }

    // Runs for ItemController@store
    public function store(Request $request)
    {
        return $this->currentUserCan('fcrm_manage_contacts');
    }

    // Runs for ItemController@destroy
    public function destroy(Request $request)
    {
        return $this->currentUserCan('fcrm_manage_contacts_delete');
    }
}
```

With this setup:
- `GET /items` → calls `verifyRequest()` → requires `fcrm_read_contacts`
- `POST /items` → calls `store()` → requires `fcrm_manage_contacts`
- `DELETE /items/{id}` → calls `destroy()` → requires `fcrm_manage_contacts_delete`

### Read/Write Pattern

A common pattern is to check the HTTP method in `verifyRequest()`:

```php
public function verifyRequest(Request $request)
{
    if ($request->method() == 'GET') {
        return $this->currentUserCan('fcrm_read_contacts');
    }

    return $this->currentUserCan('fcrm_manage_contacts');
}
```

## FluentCRM Capabilities

FluentCRM defines 16 granular capabilities. Use `$this->currentUserCan()` in your policies to check them.

### Dashboard

| Capability | Description |
|------------|-------------|
| `fcrm_view_dashboard` | View the CRM dashboard |

### Contacts

| Capability | Description |
|------------|-------------|
| `fcrm_read_contacts` | View contacts |
| `fcrm_manage_contacts` | Add, update, and import contacts |
| `fcrm_manage_contacts_delete` | Delete contacts |
| `fcrm_manage_contacts_export` | Export contacts |

### Tags, Lists & Companies

| Capability | Description |
|------------|-------------|
| `fcrm_manage_contact_cats` | Create and update tags, lists, companies, segments |
| `fcrm_manage_contact_cats_delete` | Delete tags, lists, companies, segments |

### Emails

| Capability | Description |
|------------|-------------|
| `fcrm_read_emails` | View emails and campaigns |
| `fcrm_manage_emails` | Create, edit, and send emails |
| `fcrm_manage_email_delete` | Delete emails |
| `fcrm_manage_email_templates` | Manage email templates |

### Forms

| Capability | Description |
|------------|-------------|
| `fcrm_manage_forms` | Manage subscription forms |

### Automations

| Capability | Description |
|------------|-------------|
| `fcrm_read_funnels` | View automations |
| `fcrm_write_funnels` | Create and edit automations |
| `fcrm_delete_funnels` | Delete automations |

### Settings

| Capability | Description |
|------------|-------------|
| `fcrm_manage_settings` | Manage CRM settings |

::: tip
WordPress administrators (`manage_options`) automatically have all FluentCRM capabilities.
:::

## Custom Permissions

You can register your own capabilities that appear in FluentCRM's permission manager:

```php
add_filter('fluent_crm/readable_permissions', function ($permissions) {
    $permissions['my_plugin_manage'] = [
        'title'   => __('My Plugin - Manage', 'my-plugin'),
        'depends' => [],
    ];
    $permissions['my_plugin_delete'] = [
        'title'   => __('My Plugin - Delete', 'my-plugin'),
        'depends' => ['my_plugin_manage'],
    ];
    return $permissions;
});
```

The `depends` array defines prerequisite capabilities — a user must have all listed capabilities before this one can be assigned.

Then use them in your policy:

```php
public function verifyRequest(Request $request)
{
    return $this->currentUserCan('my_plugin_manage');
}

public function destroy(Request $request)
{
    return $this->currentUserCan('my_plugin_delete');
}
```

## Middleware

Routes support `before` and `after` middleware for cross-cutting concerns like logging or rate limiting.

### Before Middleware

Runs before the permission check. Can modify the request or block execution:

```php
$app->router
    ->prefix('my-plugin')
    ->withPolicy('MyPlugin\Policies\MyPolicy')
    ->before('MyPlugin\Middleware\LogRequest')
    ->group(function ($router) {
        $router->get('/items', 'MyPlugin\Controllers\ItemController@index');
    });
```

```php
<?php

namespace MyPlugin\Middleware;

class LogRequest
{
    public function handle($request, \Closure $next)
    {
        // Do something before the request is processed
        error_log('API request: ' . $request->method() . ' ' . $request->url());

        return $next($request);
    }
}
```

### After Middleware

Runs after the response is generated. Can transform the response:

```php
$app->router
    ->prefix('my-plugin')
    ->after('MyPlugin\Middleware\AddHeaders')
    ->group(function ($router) {
        // ...
    });
```

### Execution Order

1. **Before middleware** pipeline
2. **Policy** permission check (`verifyRequest` or method-specific)
3. **Controller** method
4. **After middleware** pipeline

## Complete Example

A full plugin with policy, custom permissions, and method-specific authorization:

```php
// my-plugin.php
add_action('fluentcrm_loaded', function ($app) {
    $app->router
        ->prefix('my-reports')
        ->withPolicy('MyPlugin\Policies\ReportPolicy')
        ->group(function ($router) {
            $router->get('/', 'MyPlugin\Controllers\ReportController@index');
            $router->post('/', 'MyPlugin\Controllers\ReportController@create');
            $router->get('/{id}', 'MyPlugin\Controllers\ReportController@show')->int('id');
            $router->delete('/{id}', 'MyPlugin\Controllers\ReportController@destroy')->int('id');
        });
});

// Register custom capabilities
add_filter('fluent_crm/readable_permissions', function ($permissions) {
    $permissions['my_plugin_read_reports'] = [
        'title'   => __('My Plugin - View Reports', 'my-plugin'),
        'depends' => [],
    ];
    $permissions['my_plugin_manage_reports'] = [
        'title'   => __('My Plugin - Manage Reports', 'my-plugin'),
        'depends' => ['my_plugin_read_reports'],
    ];
    return $permissions;
});
```

```php
<?php
// Policies/ReportPolicy.php
namespace MyPlugin\Policies;

use FluentCrm\App\Http\Policies\BasePolicy;
use FluentCrm\Framework\Http\Request\Request;

class ReportPolicy extends BasePolicy
{
    public function verifyRequest(Request $request)
    {
        return $this->currentUserCan('my_plugin_read_reports');
    }

    public function create(Request $request)
    {
        return $this->currentUserCan('my_plugin_manage_reports');
    }

    public function destroy(Request $request)
    {
        return $this->currentUserCan('my_plugin_manage_reports');
    }
}
```

**Source:** `app/Http/Policies/BasePolicy.php`, `app/Services/PermissionManager.php`, `vendor/wpfluent/framework/src/WPFluent/Http/Route.php`
