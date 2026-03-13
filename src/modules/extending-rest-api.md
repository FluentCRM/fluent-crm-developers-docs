---
title: Extending the REST API
description: "Add custom REST API endpoints to FluentCRM using the built-in routing framework with controllers, policies, and middleware."
---

# Extending the REST API

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

FluentCRM provides a Laravel-like routing framework (WPFluent) that lets you register custom REST API endpoints under the FluentCRM namespace. Your endpoints get the same policy-based authorization, request handling, and validation that FluentCRM's built-in 226 routes use.

## Base URL

All FluentCRM REST endpoints are served under:

```
https://yourdomain.com/wp-json/fluent-crm/v2/
```

Custom endpoints you register appear under this same base with your chosen prefix.

## Authentication

FluentCRM uses WordPress cookie-based authentication with nonce verification — the same mechanism as the WordPress admin. There is no separate API key system. Requests must include a valid `wp_rest` nonce, which is automatically handled when making requests from the WordPress admin.

## Quick Start

Here's a complete example that adds a custom endpoint at `/wp-json/fluent-crm/v2/my-plugin/stats`:

**Register routes** — Hook into `fluentcrm_loaded` to access the router:

```php
// my-plugin.php
add_action('fluentcrm_loaded', function ($app) {
    $app->router
        ->prefix('my-plugin')
        ->withPolicy('MyPlugin\Policies\MyPolicy')
        ->group(function ($router) {
            $router->get('/', 'MyPlugin\Controllers\MyController@index');
            $router->get('/stats', 'MyPlugin\Controllers\MyController@stats');
            $router->post('/sync', 'MyPlugin\Controllers\MyController@sync');
        });
});
```

**Controller** — Extend the base controller:

```php
<?php

namespace MyPlugin\Controllers;

use FluentCrm\App\Http\Controllers\Controller;

class MyController extends Controller
{
    public function index()
    {
        return $this->sendSuccess([
            'message' => __('My Plugin API is active', 'my-plugin'),
        ]);
    }

    public function stats()
    {
        $data = [
            'total_synced' => get_option('my_plugin_synced_count', 0),
            'last_sync'    => get_option('my_plugin_last_sync', ''),
        ];

        return $this->sendSuccess($data);
    }

    public function sync()
    {
        $this->validate($this->request->all(), [
            'source' => 'required|string',
        ]);

        $source = sanitize_text_field($this->request->get('source'));

        // ... perform sync logic

        return $this->sendSuccess([
            'message' => __('Sync completed', 'my-plugin'),
        ]);
    }
}
```

**Policy** — Control who can access your endpoints:

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

::: tip
Make sure your classes are autoloaded (via Composer or a custom autoloader) before the `fluentcrm_loaded` action fires.
:::

## Directory Structure

A typical plugin extending FluentCRM's REST API:

```
my-plugin/
├── my-plugin.php          # Route registration
├── composer.json           # PSR-4 autoloading
├── Controllers/
│   └── MyController.php
└── Policies/
    └── MyPolicy.php
```

With `composer.json` autoloading:

```json
{
    "autoload": {
        "psr-4": {
            "MyPlugin\\": ""
        }
    }
}
```

## Next Steps

| Page | Covers |
|------|--------|
| [Routing](./rest-api-routing) | HTTP methods, route groups, prefixes, parameter constraints |
| [Controllers](./rest-api-controllers) | Request handling, validation rules, response methods |
| [Policies & Permissions](./rest-api-policies) | Authorization, FluentCRM capabilities, middleware |

**Source:** `vendor/wpfluent/framework/src/WPFluent/Http/Router.php`
