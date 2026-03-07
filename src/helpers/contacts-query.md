# Contacts Query

`FluentCrm\App\Services\ContactsQuery`

The `ContactsQuery` class provides a builder-pattern interface for querying contacts with filters, sorting, and pagination. It wraps the `Subscriber` model and supports both simple and advanced filter modes.

```php
use FluentCrm\App\Services\ContactsQuery;
```

## Basic Usage

```php
// Get all subscribed contacts with tag ID 5
$query = new ContactsQuery([
    'statuses' => ['subscribed'],
    'tags'     => [5],
    'sort_by'  => 'first_name',
    'sort_type'=> 'ASC'
]);

$contacts = $query->get();
```

## Constructor Arguments

The constructor accepts an `$args` array with the following keys:

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `with` | `array` | `['tags', 'lists']` | Eloquent relations to eager-load |
| `filter_type` | `string` | `'simple'` | `'simple'` or `'advanced'` |
| `search` | `string` | `''` | Full-text search across name, email, and optionally custom fields |
| `sort_by` | `string` | `'id'` | Column to sort by (must be a fillable field or `'id'`) |
| `sort_type` | `string` | `'DESC'` | Sort direction: `'ASC'` or `'DESC'` |
| `tags` | `array` | `[]` | Filter by tag IDs (simple mode) |
| `lists` | `array` | `[]` | Filter by list IDs (simple mode) |
| `statuses` | `array` | `[]` | Filter by subscription statuses (validated against allowed statuses) |
| `sms_statuses` | `array` | `[]` | Filter by SMS statuses |
| `company_ids` | `array` | `[]` | Filter by company IDs |
| `contact_ids` | `array` | `[]` | Restrict to specific contact IDs |
| `contact_status` | `string` | `''` | Single status filter (e.g., `'subscribed'`) |
| `has_commerce` | `bool` | `false` | Eager-load commerce relations from the active provider |
| `custom_fields` | `bool` | `false` | Append custom field values to each contact in results. Also enables searching custom fields when combined with `search` |
| `filters_groups_raw` | `array` | `[]` | Raw advanced filter groups (from the UI filter builder) |
| `limit` | `int\|false` | `false` | Limit number of results |
| `offset` | `int\|false` | `false` | Offset for pagination |

## Methods

### `get()`

Executes the query and returns a collection of contacts. Applies `limit` and `offset` if set.

- **Returns:** `Collection` of `Subscriber` models

```php
$contacts = (new ContactsQuery([
    'tags'   => [1, 3],
    'limit'  => 50,
    'offset' => 0
]))->get();

foreach ($contacts as $contact) {
    echo $contact->email;
}
```

### `paginate()`

Executes the query with WordPress-style pagination (uses `$_GET['page']` and default per-page).

- **Returns:** `LengthAwarePaginator`

```php
$paginated = (new ContactsQuery([
    'statuses' => ['subscribed']
]))->paginate();

$contacts = $paginated->items();
$total = $paginated->total();
```

### `getModel()`

Returns the raw underlying `Subscriber` query builder for custom chaining.

- **Returns:** `Builder` — Eloquent query builder instance

```php
$query = new ContactsQuery(['statuses' => ['subscribed']]);
$model = $query->getModel();

// Add custom conditions
$model->where('created_at', '>=', '2024-01-01');
$results = $model->get();
```

## Filter Modes

### Simple Filters

In simple mode (default), you pass filter arrays directly:

```php
$query = new ContactsQuery([
    'filter_type' => 'simple',
    'tags'        => [1, 5],
    'lists'       => [2],
    'statuses'    => ['subscribed', 'pending'],
    'company_ids' => [10]
]);
```

### Advanced Filters

In advanced mode, you pass raw filter groups from the UI filter builder. These are processed by registered filter providers via `fluentcrm_contacts_filter_{provider}` action hooks.

```php
$query = new ContactsQuery([
    'filter_type'        => 'advanced',
    'filters_groups_raw' => [
        // Group 1 (conditions within a group are AND)
        [
            [
                'source'   => ['contacts', 'status'],
                'operator' => 'in',
                'value'    => ['subscribed']
            ],
            [
                'source'   => ['contacts', 'created_at'],
                'operator' => 'date_after',
                'value'    => '2024-01-01'
            ]
        ],
        // Group 2 (groups are OR'd together)
        [
            [
                'source'   => ['contacts', 'tags'],
                'operator' => 'in_all',
                'value'    => [1, 5]
            ]
        ]
    ]
]);
```

## Real-World Examples

### Search with custom fields

```php
$query = new ContactsQuery([
    'search'        => 'john@example.com',
    'custom_fields' => true
]);

$contacts = $query->get();
// Each contact has ->custom_fields populated
```

### Paginated list with commerce data

```php
$query = new ContactsQuery([
    'statuses'     => ['subscribed'],
    'has_commerce' => true,
    'sort_by'      => 'last_activity',
    'sort_type'    => 'DESC'
]);

$paginated = $query->paginate();
```

### Custom query chaining

```php
$query = new ContactsQuery([
    'tags'     => [5],
    'statuses' => ['subscribed']
]);

$model = $query->getModel();
$model->whereNotNull('phone')
      ->where('created_at', '>=', '2024-06-01');

$contacts = $model->limit(100)->get();
```
