---
description: "Funnel Model represents the Automation Funnel data in the database."
---

# Funnel Model

| DB Table Name | {wp_db_prefix}_fc_funnels                                      |
|---------------|----------------------------------------------------------------|
| Schema        | <a href="/database/#fc-funnels">Check Schema</a> |
| Source File   | fluent-crm/app/Models/Funnel.php                               |
| Name Space    | FluentCrm\App\Models                                           |
| Class         | FluentCrm\App\Models\Funnel                                    |

## Global Scope

This model has a global scope that filters by `type = 'funnels'`. The type is auto-set on create.

## Attributes
<table>
    <thead>
        <tr>
           <th>Attribute</th>
           <td>Data Type</td>
           <td>Comment</td>
      </tr>
    </thead>
    <tbody>
        <tr>
            <th>id</th>
            <td>Integer</td>
            <td></td>
        </tr>
        <tr>
            <th>type</th>
            <td>String</td>
            <td>Auto-set to 'funnels' by global scope</td>
        </tr>
        <tr>
            <th>title</th>
            <td>String</td>
            <td></td>
        </tr>
        <tr>
            <th>trigger_name</th>
            <td>String</td>
            <td></td>
        </tr>
        <tr>
            <th>status</th>
            <td>String</td>
            <td>draft | published</td>
        </tr>
        <tr>
            <th>conditions</th>
            <td>Text</td>
            <td>Serialized array, auto serialize/unserialize</td>
        </tr>
        <tr>
            <th>settings</th>
            <td>Text</td>
            <td>Serialized array, auto serialize/unserialize</td>
        </tr>
        <tr>
            <th>created_by</th>
            <td>Integer</td>
            <td></td>
        </tr>
        <tr>
            <th>created_at</th>
            <td>Date Time</td>
            <td></td>
        </tr>
        <tr>
            <th>updated_at</th>
            <td>Date Time</td>
            <td></td>
        </tr>
    </tbody>
</table>

## Usage

Please check <a href="/database/models/">Model Basic</a> for Common methods.

### Accessing Attributes

```php

$funnel = FluentCrm\App\Models\Funnel::find(1);

$funnel->id; // returns id
$funnel->status; // returns status
$funnel->settings; // returns deserialized array
$funnel->conditions; // returns deserialized array
.......
```

## Fillable Attributes

```php
'type',          // Default: funnels
'title',
'trigger_name',
'status',        // draft | published
'conditions',
'settings',
'created_by',
'updated_at'
```

## Scopes

### published()

Returns only published funnels

#### Usage:

```php
$funnels = FluentCrm\App\Models\Funnel::published()->get();
```

## Relations

### actions
Get all the actions of Funnel Sequence related to this funnel
- return `FluentCrm\App\Models\FunnelSequence` Model Collections

#### Example:
```php
// Accessing actions
$funnelActions = $funnel->actions;

// Get Funnels which have sequence ids: 1/2
$funnels = FluentCrm\App\Models\Funnel::whereHas('actions', function($query) {
    $query->whereIn('id', [1,2]);
})->get();
```

### subscribers
Get all the funnel subscribers related to this funnel
- return `FluentCrm\App\Models\FunnelSubscriber` Model Collections

#### Example:
```php
// returns all the funnel subscribers related to funnel
$subscribersOfFunnel = $funnel->subscribers;

// Get funnels filtered by funnel subscribers
$funnels = FluentCrm\App\Models\Funnel::whereHas('subscribers', function($query) {
    $query->whereIn('id', [1,2,3]);
})->get();

// Inverse filter
$funnels = FluentCrm\App\Models\Funnel::whereDoesntHave('subscribers', function($query) {
    $query->whereIn('id', [1,2,3]);
})->get();
```

### labelsTerm
Access labels attached to this funnel via the `fc_term_relations` pivot table

- return `FluentCrm\App\Models\Label` Model Collections (BelongsToMany)

#### Example:
```php
$labels = $funnel->labelsTerm;
```

<hr />

## Methods

### getSubscribersCount()
Get the number of subscribers in this funnel

- Parameters
  - none
- Returns `int`

#### Usage
```php
$count = $funnel->getSubscribersCount();
```

### updateMeta($key, $value)
Create or update a meta value for this funnel

- Parameters
  - $key `string`
  - $value `mixed`
- Returns `mixed`

#### Usage
```php
$funnel->updateMeta('some_setting', 'value');
```

### getMeta($key, $default)
Get a meta value for this funnel

- Parameters
  - $key `string`
  - $default `mixed` — Default: `''`
- Returns `mixed`

#### Usage
```php
$value = $funnel->getMeta('some_setting', 'default_value');
```

### deleteMeta($key)
Delete a meta value for this funnel

- Parameters
  - $key `string`
- Returns `mixed`

#### Usage
```php
$funnel->deleteMeta('some_setting');
```

### labels()
Get all labels attached to this funnel

- Parameters
  - none
- Returns `Collection` of `FluentCrm\App\Models\Label`

#### Usage
```php
$labels = $funnel->labels();
```

### getFormattedLabels()
Get labels in simplified format

- Parameters
  - none
- Returns `Collection` of `['id', 'slug', 'title', 'color']` arrays

#### Usage
```php
$labels = $funnel->getFormattedLabels();
```

### attachLabels($labelIds)
Attach labels to this funnel

- Parameters
  - $labelIds `int` or `array`
- Returns `FluentCrm\App\Models\Funnel`

#### Usage
```php
$funnel->attachLabels([1, 2, 3]);
```

### detachLabels($labelIds)
Remove labels from this funnel

- Parameters
  - $labelIds `int` or `array`
- Returns `FluentCrm\App\Models\Funnel`

#### Usage
```php
$funnel->detachLabels([1, 2]);
```
