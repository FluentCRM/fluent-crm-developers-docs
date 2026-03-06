---
description: "Tags API — import, query, and manage tags programmatically via FluentCrmApi('tags')."
---

# Tags API

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Developer Guide" />

The Tags API provides methods for importing and querying tags.

## Initialization

```php
$tagApi = FluentCrmApi('tags');
```

Returns an instance of `FluentCrm\App\Api\Classes\Tags`.

---

## Methods

### importBulk()

Import multiple tags at once. Creates new tags or updates existing ones (matched by `slug`).

```php
$tags = $tagApi->importBulk($tags);
```

**Parameters**
- `$tags` `array` — Array of tag arrays

**Returns** `array` — Array of [Tag](/database/models/tag) models

Fires `fluent_crm/tag_created` or `fluent_crm/tag_updated` for each tag.

**Example:**

```php
$imported = $tagApi->importBulk([
    [
        'title'       => 'VIP',
        'slug'        => 'vip',            // optional, auto-generated from title
        'description' => 'VIP customers',  // optional
    ],
    [
        'title' => 'Newsletter',
        'slug'  => 'newsletter',
    ]
]);
```

---

### getInstance()

Get the underlying [Tag](/database/models/tag) model for direct Eloquent-style queries.

```php
$tagModel = $tagApi->getInstance();
```

**Returns** `\FluentCrm\App\Models\Tag`

---

### Proxy Methods

The Tags API proxies these methods to the underlying Tag model via `__call()`:

- `all()` — Get all tags
- `get()` — Get tags collection
- `find($id)` — Find by primary key (accepts single ID or array)
- `first()` — Get the first tag
- `paginate($perPage)` — Paginate results

**Example:**

```php
$tagApi = FluentCrmApi('tags');

// Get all tags
$allTags = $tagApi->all();

// Find by ID
$tag = $tagApi->find(5);

// Find multiple
$tags = $tagApi->find([1, 2, 3]);

// Custom query via getInstance()
$activeTags = $tagApi->getInstance()
    ->where('id', '>', 10)
    ->get();
```

**Source:** `app/Api/Classes/Tags.php`
