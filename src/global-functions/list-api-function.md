---
description: "Lists API — import, query, and manage lists programmatically via FluentCrmApi('lists')."
---

# Lists API

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Developer Guide" />

The Lists API provides methods for importing and querying lists.

## Initialization

```php
$listApi = FluentCrmApi('lists');
```

Returns an instance of `FluentCrm\App\Api\Classes\Lists`.

---

## Methods

### importBulk()

Import multiple lists at once. Creates new lists or updates existing ones (matched by `slug`).

```php
$lists = $listApi->importBulk($lists);
```

**Parameters**
- `$lists` `array` — Array of list arrays

**Returns** `array` — Array of [Lists](/database/models/lists) models

Fires `fluent_crm/list_created` or `fluent_crm/list_updated` for each list.

**Example:**

```php
$imported = $listApi->importBulk([
    [
        'title'       => 'Weekly Digest',
        'slug'        => 'weekly-digest',      // optional, auto-generated from title
        'description' => 'Weekly newsletter',   // optional
    ],
    [
        'title' => 'Product Updates',
        'slug'  => 'product-updates',
    ]
]);
```

---

### getInstance()

Get the underlying [Lists](/database/models/lists) model for direct Eloquent-style queries.

```php
$listModel = $listApi->getInstance();
```

**Returns** `\FluentCrm\App\Models\Lists`

---

### Proxy Methods

The Lists API proxies these methods to the underlying Lists model via `__call()`:

- `all()` — Get all lists
- `get()` — Get lists collection
- `find($id)` — Find by primary key (accepts single ID or array)
- `first()` — Get the first list
- `paginate($perPage)` — Paginate results

**Example:**

```php
$listApi = FluentCrmApi('lists');

// Get all lists
$allLists = $listApi->all();

// Find by ID
$list = $listApi->find(5);

// Find multiple
$lists = $listApi->find([1, 2, 3]);

// Custom query via getInstance()
$recentLists = $listApi->getInstance()
    ->orderBy('created_at', 'desc')
    ->get();
```

**Source:** `app/Api/Classes/Lists.php`
