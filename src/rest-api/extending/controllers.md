---
title: REST API Controllers
description: "Build REST API controllers in FluentCRM — request handling, input validation, and response methods."
---

# Controllers

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

Controllers handle the business logic for your REST API endpoints. Extend the base controller to get access to request handling, validation, and response helpers.

## Base Controller

```php
<?php

namespace MyPlugin\Controllers;

use FluentCrm\App\Http\Controllers\Controller;

class ItemController extends Controller
{
    public function index()
    {
        // $this->request — the Request object
        // $this->response — the Response object
        return $this->sendSuccess(['items' => []]);
    }
}
```

The base controller (`FluentCrm\App\Http\Controllers\Controller`) provides:

| Property / Method | Description |
|-------------------|-------------|
| `$this->request` | The [`Request`](#request-object) instance |
| `$this->response` | The `Response` instance |
| `$this->validate($data, $rules, $messages)` | [Validate](#validation) input data |
| `$this->send($data, $code)` | Send a response with status code (default `200`) |
| `$this->sendSuccess($data, $code)` | Send a success response (default `200`) |
| `$this->sendError($data, $code)` | Send an error response (default `422`) |

## Request Object

The `$this->request` object wraps the incoming HTTP request and provides methods to retrieve and check input data.

### Retrieving Input

```php
public function store()
{
    // Get all input
    $all = $this->request->all();

    // Get a single value with optional default
    $name = $this->request->get('name', 'Unknown');

    // Get only specific keys
    $data = $this->request->only('email', 'first_name', 'last_name');

    // Get everything except specific keys
    $data = $this->request->except('password', 'token');
}
```

| Method | Description |
|--------|-------------|
| `get($key, $default)` | Get a single input value, or all input if no key provided |
| `all()` | Get all input data as an array |
| `input($key, $default)` | Alias for `get()` |
| `only(...$keys)` | Get only the specified keys |
| `except(...$keys)` | Get all input except the specified keys |
| `query($key, $default)` | Get from query string (`$_GET`) only |
| `post($key, $default)` | Get from POST body (`$_POST`) only |
| `json($key, $default)` | Get from JSON request body |

### Safe Input Retrieval

Use `getSafe()` to retrieve and sanitize input in one call:

```php
// getSafe($key, $sanitizeCallback, $default)
$name = $this->request->getSafe('name', 'sanitize_text_field', '');
$email = $this->request->getSafe('email', 'sanitize_email');
$orderBy = $this->request->getSafe('sort_by', 'sanitize_sql_orderby', 'id');
```

### Checking Input

```php
if ($this->request->has('email')) {
    // 'email' exists and has a truthy value
}

if ($this->request->exists('status')) {
    // 'status' exists (even if empty/falsy)
}

if ($this->request->missing('notes')) {
    // 'notes' is not present in the request
}
```

| Method | Description |
|--------|-------------|
| `has($key)` | Key exists and has a truthy value |
| `exists($key)` | Key exists (including falsy values) |
| `missing($key)` | Key is not present |
| `hasAny(...$keys)` | At least one key has a truthy value |

### Request Info

```php
$method = $this->request->method();    // GET, POST, etc.
$url = $this->request->url();          // Request URL without query string
$user = $this->request->user();        // Current WordPress user (WPUserProxy)
```

### File Uploads

```php
$file = $this->request->file('attachment');
```

## Validation

The controller provides a `validate()` method that throws a `ValidationException` (HTTP 422) if validation fails.

### Basic Usage

```php
public function store()
{
    $this->validate($this->request->all(), [
        'email'  => 'required|email',
        'name'   => 'required|string|max:255',
        'status' => 'required|in:subscribed,unsubscribed,pending',
    ]);

    // If we reach here, validation passed
    $email = sanitize_email($this->request->get('email'));
    // ...
}
```

### Request-Level Validation

You can also validate directly on the request object:

```php
public function store()
{
    $this->request->validate([
        'email' => 'required|email',
        'name'  => 'required|string',
    ]);

    // Get only validated data
    $data = $this->request->safe()->all();
}
```

### Custom Error Messages

```php
$this->validate($this->request->all(), [
    'email' => 'required|email|unique:fc_subscribers,email',
], [
    'email.required' => __('Email address is required.', 'my-plugin'),
    'email.unique'   => __('This email is already subscribed.', 'my-plugin'),
]);
```

### Validation Error Response

When validation fails, the framework automatically returns a `422` response:

```json
{
    "message": "Unprocessable Entity!",
    "errors": {
        "email": ["The email field is required."],
        "status": ["The selected status is invalid."]
    }
}
```

### Available Rules

| Rule | Description |
|------|-------------|
| `required` | Must be present and non-empty |
| `nullable` | Can be null or empty |
| `string` | Must be a string |
| `numeric` | Must be numeric |
| `integer` | Must be an integer |
| `email` | Must be a valid email |
| `url` | Must be a valid URL |
| `array` | Must be an array |
| `date` | Must be a valid date |
| `date_format:Y-m-d` | Must match the date format |
| `in:val1,val2,...` | Must be one of the listed values |
| `not_in:val1,val2,...` | Must not be one of the listed values |
| `min:n` | Minimum length (string) or value (number) |
| `max:n` | Maximum length (string) or value (number) |
| `size:n` | Exact length (string), count (array), or value (number) |
| `regex:pattern` | Must match the regex pattern |
| `alpha` | Only alphabetic characters |
| `alphanum` | Only alphanumeric characters |
| `alphadash` | Alphanumeric, dashes, and underscores |
| `unique:table,column` | Value must be unique in database table |
| `exists:table,column` | Value must exist in database table |
| `required_if:field,value` | Required when another field equals a value |
| `required_with:field` | Required when another field is present |
| `required_without:field` | Required when another field is absent |
| `same:field` | Must match another field's value |
| `accepted` | Must be `yes`, `on`, `1`, or `true` |
| `filled` | If present, must not be empty |
| `present` | Must exist in request (even if empty) |
| `digits:n` | Must be exactly n digits |
| `mimes:jpg,png,...` | File must have one of the listed extensions |

Rules are separated by `|` and can be combined: `'email' => 'required|email|max:255'`.

## Response Methods

### Returning Data

Controller methods should return data using the response helpers:

```php
public function index()
{
    $items = MyModel::paginate();
    return $this->sendSuccess(['items' => $items]);
}

public function store()
{
    // ... create item
    return $this->sendSuccess([
        'message' => __('Item created', 'my-plugin'),
        'item'    => $item,
    ], 201);
}

public function destroy($id)
{
    // ... delete item
    return $this->sendSuccess([
        'message' => __('Item deleted', 'my-plugin'),
    ]);
}
```

### Error Responses

```php
public function show($id)
{
    $item = MyModel::find($id);

    if (!$item) {
        return $this->sendError([
            'message' => __('Item not found', 'my-plugin'),
        ], 404);
    }

    return $this->sendSuccess(['item' => $item]);
}
```

### Response Methods Reference

| Method | Default Code | Description |
|--------|-------------|-------------|
| `send($data, $code)` | `200` | Send response with data and status code |
| `sendSuccess($data, $code)` | `200` | Send success response |
| `sendError($data, $code)` | `422` | Send error response (code is forced to 400+) |

::: tip
You can also return a plain array from any controller method — the framework wraps it in a `WP_REST_Response` automatically.
:::

## Complete Example

```php
<?php

namespace MyPlugin\Controllers;

use FluentCrm\App\Http\Controllers\Controller;
use FluentCrm\App\Models\Subscriber;

class ContactNotesController extends Controller
{
    public function index($contactId)
    {
        $subscriber = Subscriber::findOrFail($contactId);

        $notes = $subscriber->notes()
            ->orderBy('id', 'DESC')
            ->paginate();

        return $this->sendSuccess([
            'notes' => $notes,
        ]);
    }

    public function store($contactId)
    {
        $this->validate($this->request->all(), [
            'title'   => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $subscriber = Subscriber::findOrFail($contactId);

        $note = $subscriber->notes()->create([
            'title'      => sanitize_text_field($this->request->get('title')),
            'description' => wp_kses_post($this->request->get('content')),
            'type'       => 'note',
            'created_by' => get_current_user_id(),
        ]);

        return $this->sendSuccess([
            'message' => __('Note added', 'my-plugin'),
            'note'    => $note,
        ], 201);
    }

    public function destroy($contactId, $noteId)
    {
        $subscriber = Subscriber::findOrFail($contactId);

        $subscriber->notes()->where('id', $noteId)->delete();

        return $this->sendSuccess([
            'message' => __('Note deleted', 'my-plugin'),
        ]);
    }
}
```

**Source:** `app/Http/Controllers/Controller.php`, `vendor/wpfluent/framework/src/WPFluent/Http/Request/Request.php`, `vendor/wpfluent/framework/src/WPFluent/Validator/Validator.php`
