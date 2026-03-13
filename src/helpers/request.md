# Request

`FluentCrm\Framework\Http\Request\Request`

The `Request` class provides a fluent interface for accessing HTTP request data in FluentCRM controllers. It merges `$_GET`, `$_POST`, and JSON body inputs, and offers type-safe retrieval, validation, file uploads, and header access.

In controllers, the request is available as `$this->request`:

```php
class MyController extends Controller
{
    public function index()
    {
        $search = $this->request->get('search', '');
        $perPage = $this->request->getInt('per_page', 15);
    }
}
```

## Retrieving Input

### `get($key = null, $default = null)`

Retrieves a value from the merged request inputs (GET + POST + JSON body). Supports dot notation. Returns all inputs when called with no arguments.

```php
$name = $this->request->get('name');
$city = $this->request->get('address.city', 'Unknown');

// Get all inputs
$all = $this->request->get();
```

### `all()`

Returns all merged request inputs as an array. Alias for `get()` with no arguments.

```php
$data = $this->request->all();
```

### `input($key = null, $default = null)`

Alias for `get()`.

### `only($keys)`

Returns a subset of request inputs containing only the specified keys:

```php
$data = $this->request->only(['email', 'first_name', 'last_name']);
```

### `except($keys)`

Returns all request inputs except the specified keys:

```php
$data = $this->request->except(['password', 'token']);
```

### `query($key = null, $default = null)`

Retrieves a value from the query string (`$_GET`) only:

```php
$page = $this->request->query('page', 1);
```

### `post($key = null, $default = null)`

Retrieves a value from `$_POST` only:

```php
$name = $this->request->post('name');
```

### `json($key = null, $default = null)`

Retrieves a value from the decoded JSON body. Returns `[]` if the request is not JSON:

```php
$data = $this->request->json('settings');
```

---

## Type-Safe Retrieval

These methods retrieve input and cast/sanitize in one step:

### `getInt($key, $default = null)`

Returns the value cast to integer via `intval()`:

```php
$perPage = $this->request->getInt('per_page', 15);
```

### `getText($key, $default = null)`

Returns the value sanitized with `sanitize_text_field()`:

```php
$name = $this->request->getText('first_name');
```

### `getEmail($key, $default = null)`

Returns the value sanitized with `sanitize_email()`:

```php
$email = $this->request->getEmail('email');
```

### `getBool($key, $default = null)`

Casts to boolean. Returns `true` for `"1"`, `"true"`, `"on"`, `"yes"`; `false` for `"0"`, `"false"`, `"off"`, `"no"`; `null` otherwise:

```php
$sendEmail = $this->request->getBool('send_notification');
```

### `getFloat($key, $default = null)`

Returns the value cast to float:

```php
$amount = $this->request->getFloat('price');
```

### `getTitle($key, $default = null)`

Returns the value sanitized with `sanitize_title()`:

```php
$slug = $this->request->getTitle('slug');
```

### `getDate($key, $format = null, $tz = null)`

Parses the value as a DateTime object. Returns `null` if empty:

```php
$date = $this->request->getDate('scheduled_at');
```

### `getSafe($key, $callback = null, $default = null)`

Retrieves one or more keys with custom sanitizer callbacks. Auto-sanitizes by PHP type when no callback is given:

```php
// Single key with callback
$html = $this->request->getSafe('description', 'wp_kses_post');

// Multiple keys with different sanitizers
$data = $this->request->getSafe([
    'name'  => 'sanitize_text_field',
    'email' => 'sanitize_email',
    'count' => 'intval'
]);
```

---

## Existence Checks

### `has($key)`

Returns `true` if the key is present **and** has a truthy (non-empty) value:

```php
if ($this->request->has('search')) {
    // search has a value
}
```

### `exists($key)`

Returns `true` if the key is present in the request, regardless of its value (even if empty):

```php
if ($this->request->exists('status')) {
    // key was sent, could be empty string
}
```

### `hasAny($keys)`

Returns `true` if **any** of the given keys have truthy values:

```php
if ($this->request->hasAny(['search', 'filter_type', 'tags'])) {
    // at least one filter is active
}
```

### `missing($key)`

Inverse of `has()`. Returns `true` if the key is absent or empty:

```php
if ($this->request->missing('email')) {
    // email not provided
}
```

### `whenHas($key, $has, $hasnot = null)`

Conditionally executes a callback based on key presence:

```php
$this->request->whenHas('tags', function ($key, $value) {
    // process tags
}, function ($key) {
    // no tags provided
});
```

---

## Modifying Input

### `set($key, $value)`

Sets or overwrites a key in the request inputs. Returns the instance for chaining:

```php
$this->request->set('status', 'subscribed');
```

### `merge($data)`

Merges an array into the request inputs, overwriting existing keys:

```php
$this->request->merge(['status' => 'subscribed', 'source' => 'api']);
```

### `mergeIfMissing($data)`

Merges only keys that are not already present:

```php
$this->request->mergeIfMissing(['status' => 'pending']);
```

### `forget($key)`

Removes one or more keys from the request inputs:

```php
$this->request->forget('password');
$this->request->forget(['token', 'nonce']);
```

---

## Validation

### `validate($rules, $messages = [])`

Validates all inputs against the given rules. Throws a `ValidationException` (HTTP 422) on failure. Sets validated data on success:

```php
$this->request->validate([
    'email'  => 'required|email',
    'status' => 'required|in:subscribed,pending,unsubscribed',
    'name'   => 'required|string|max:192'
], [
    'email.required' => 'Email is required.'
]);
```

### `safe()`

Returns a clone of the request where data-retrieval methods read from the validated data only (not raw input). Use after `validate()`:

```php
$this->request->validate(['email' => 'required|email', 'name' => 'string']);

$safe = $this->request->safe();
$data = $safe->only(['email', 'name']);
```

### `validated($data = [])`

Gets or sets the validated data array:

```php
// Get validated data
$data = $this->request->validated();

// Set validated data manually
$this->request->validated(['email' => 'john@example.com']);
```

---

## Headers

### `header($key = null, $default = null)`

Retrieves a header value by name, or the entire headers array:

```php
$contentType = $this->request->header('Content-Type');
$auth = $this->request->header('Authorization');

// All headers
$headers = $this->request->header();
```

---

## Files

### `file($key = null, $default = null)`

Retrieves a single uploaded file as a `File` object:

```php
$file = $this->request->file('avatar');
if ($file) {
    $file->move($destinationPath);
}
```

### `hasFile($key)`

Returns `true` if the key corresponds to a valid uploaded file:

```php
if ($this->request->hasFile('csv_file')) {
    $file = $this->request->file('csv_file');
}
```

### `files($key = null)`

Returns all uploaded files as an array of `File` objects:

```php
$allFiles = $this->request->files();
```

---

## Request Metadata

### `method()`

Returns the HTTP method (`GET`, `POST`, `PUT`, `DELETE`, etc.):

```php
$method = $this->request->method(); // 'POST'
```

### `url()`

Returns the request URL without the query string:

```php
$url = $this->request->url();
```

### `getFullUrl()`

Returns the full request URL including query string:

```php
$fullUrl = $this->request->getFullUrl();
```

### `isJson()`

Returns `true` if the request body is JSON:

```php
if ($this->request->isJson()) {
    $data = $this->request->json();
}
```

### `isRest()`

Returns `true` if the current request is a WordPress REST API request:

```php
if ($this->request->isRest()) {
    // Running in REST API context
}
```

### `getIp($anonymize = false)`

Returns the client's IP address. When `$anonymize` is `true`, passes through `wp_privacy_anonymize_ip()`. Respects Cloudflare's `CF-Connecting-IP` header:

```php
$ip = $this->request->getIp();
$anonIp = $this->request->getIp(true);
```

### `user()`

Returns a proxy object for the currently logged-in WordPress user:

```php
$user = $this->request->user();
```

---

## Response Helpers

### `abort($status = 403, $message = null)`

Returns a `WP_REST_Response` with the given status code and message:

```php
return $this->request->abort(404, 'Contact not found');
```

### `terminate($status = 200, $message = null)`

Immediately sends a JSON response and halts execution:

```php
$this->request->terminate(200, 'Done');
```
