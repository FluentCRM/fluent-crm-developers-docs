---
title: REST API Routing
description: "Register custom REST API routes in FluentCRM using the WPFluent router — HTTP methods, route groups, prefixes, and parameter constraints."
---

# Routing

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

FluentCRM's router is available via the `fluentcrm_loaded` action. All routes you register are served under `/wp-json/fluent-crm/v2/`.

## Registering Routes

Hook into `fluentcrm_loaded` to access the `$app->router`:

```php
add_action('fluentcrm_loaded', function ($app) {
    $app->router->get('/my-endpoint', 'MyPlugin\Controllers\MyController@index');
});
```

This registers a GET endpoint at `/wp-json/fluent-crm/v2/my-endpoint`.

## HTTP Methods

The router supports all standard HTTP verbs:

```php
$router->get($uri, $callback);
$router->post($uri, $callback);
$router->put($uri, $callback);
$router->patch($uri, $callback);
$router->delete($uri, $callback);
$router->any($uri, $callback);   // responds to all HTTP methods
```

::: tip
FluentCRM's JavaScript REST client sends PUT, PATCH, and DELETE as POST requests with an `X-HTTP-Method-Override` header. The framework handles this automatically.
:::

## Route Callbacks

Callbacks can be a `Controller@method` string or a closure:

```php
// Controller string (recommended)
$router->get('/items', 'MyPlugin\Controllers\ItemController@index');

// Closure
$router->get('/ping', function () {
    return ['status' => 'ok'];
});
```

## Route Groups

Group routes that share a prefix, policy, or namespace:

```php
add_action('fluentcrm_loaded', function ($app) {
    $app->router
        ->prefix('my-plugin')
        ->namespace('MyPlugin\Controllers')
        ->withPolicy('MyPlugin\Policies\MyPolicy')
        ->group(function ($router) {
            $router->get('/', 'ItemController@index');         // GET  /my-plugin/
            $router->get('/items', 'ItemController@list');      // GET  /my-plugin/items
            $router->post('/items', 'ItemController@create');   // POST /my-plugin/items
            $router->put('/items/{id}', 'ItemController@update'); // PUT  /my-plugin/items/{id}
            $router->delete('/items/{id}', 'ItemController@delete'); // DELETE /my-plugin/items/{id}
        });
});
```

### Group Methods

| Method | Description |
|--------|-------------|
| `prefix($prefix)` | Prepends a URL prefix to all routes in the group |
| `namespace($ns)` | Sets the controller namespace so you can use short class names |
| `withPolicy($class)` | Applies a policy class for authorization (see [Policies](./rest-api-policies)) |
| `group($callback)` | Defines the route group; receives `$router` as argument |

All group methods are optional and chainable. You can register routes without a group:

```php
$app->router->post('/my-endpoint', 'MyPlugin\Controllers\MyController@create');
```

## Route Parameters

Define dynamic segments using `{param}` syntax:

```php
$router->get('/contacts/{id}', 'ContactController@show');
```

Parameters are passed as arguments to the controller method:

```php
public function show($id)
{
    $contact = Subscriber::findOrFail($id);
    return $this->sendSuccess(['contact' => $contact]);
}
```

### Parameter Constraints

Chain constraint methods to validate parameter formats:

| Method | Accepts |
|--------|---------|
| `int($param)` | Integers only |
| `alpha($param)` | Alphabetic characters only |
| `alphaNum($param)` | Alphanumeric characters |
| `alphaNumDash($param)` | Alphanumeric, dashes, and underscores |
| `where($param, $regex)` | Custom regex pattern |

```php
// Single constraint
$router->get('/contacts/{id}', 'ContactController@show')->int('id');

// Multiple constraints
$router->get('/contacts/{id}/{slug}', 'ContactController@show')
    ->int('id')
    ->alpha('slug');

// Custom regex
$router->get('/reports/{type}', 'ReportController@show')
    ->where('type', '[a-z_]+');
```

## Without Groups

Routes registered without `prefix()` or `group()` are available directly under the FluentCRM base URL:

```php
add_action('fluentcrm_loaded', function ($app) {
    $app->router->get('/health-check', function () {
        return ['status' => 'ok', 'timestamp' => current_time('mysql')];
    });
});
// Accessible at: /wp-json/fluent-crm/v2/health-check
```

## Nested Groups

You can nest groups for more complex URL structures:

```php
$app->router
    ->prefix('my-plugin')
    ->withPolicy('MyPlugin\Policies\MyPolicy')
    ->group(function ($router) {
        $router->get('/', 'MyPlugin\Controllers\DashboardController@index');

        $router->prefix('reports')->group(function ($router) {
            $router->get('/', 'MyPlugin\Controllers\ReportController@index');
            $router->get('/{id}', 'MyPlugin\Controllers\ReportController@show')->int('id');
        });
    });
// Routes:
//   GET /my-plugin/
//   GET /my-plugin/reports/
//   GET /my-plugin/reports/{id}
```

**Source:** `vendor/wpfluent/framework/src/WPFluent/Http/Router.php`, `vendor/wpfluent/framework/src/WPFluent/Http/Route.php`
