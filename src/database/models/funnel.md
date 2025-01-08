---
description: "Funnel Model represents the Funnel data in the database. It has all the attributes and methods to do the CRUD operations."
---

# Funnel Model

| DB Table Name | {wp_db_prefix}_fc_funnels                                      |
|---------------|----------------------------------------------------------------|
| Schema        | <a :href="$withBase('/database/#fc-funnels')">Check Schema</a> |
| Source File   | fluent-crm/app/Models/Funnel.php                               |
| Name Space    | FluentCrm\App\Models                                           |
| Class         | FluentCrm\App\Models\Funnel                                    |

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
        <tr class="odd">
            <th>type</th>
            <td> String</td>
            <td></td>
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
            <td></td>
        </tr>
        <tr>
            <th>conditions</th>
            <td>String</td>
            <td></td>
        </tr>
        <tr>
            <th>settings</th>
            <td>Array</td>
            <td></td>
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
.......
```

## Fillable Attributes

```php
'type', // funnel : Default: funnel
'title',
'trigger_name',
'status', // draft | published  : Default: draft
'conditions',
'settings',
'created_by',
'updated_at'

```

## Scopes

This model has the following scope that you can use

### published()

returns only published funnels
#### Usage:

```php 
$funnels = FluentCrm\App\Models\Funnel::published()->get();
```

## Relations
This model has the following relationships that you can use

### actions
Get all the actions of Funnel Sequence related to this funnel
- returns `FluentCrm\App\Models\FunnelSequence` Model Collections

#### Example:
```php 
// Accessing actions
$funnelActions = $funnel->actions;
```

// You can also limit your results based on the existence of a relationship. 
For example, if you want to get all the funnels that have ids 1, 2 and 3 in the actions, you can do the following:

```php
// Get Funnels which have sequence ids: 1/2
$funnels = FluentCrm\App\Models\Funnel::whereHas('actions', function($query) {
    $query->whereIn('id', [1,2]);
})->get();
```

### subscribers
Similar to actions, get all the funnel subscribers related to funnel like following:
- return `FluentCrm\App\Models\FunnelSubscriber` Model Collections

#### Example:
```php 
// returns all the funnel subscribers related to funnel
$subscribersOfFunnel = $funnel->subscribers;

// Get funnels filtered by funnel subscribers

// Get Subscribers which has list ids: 1/2/3
$subscribers = FluentCrm\App\Models\Funnel::whereHas('subscribers', function($query) {
    $query->whereIn('id', [1,2,3]);
})->get();
```
You can also use `whereDoseNotHave` to get the funnels that do not have the given relationship.
```php
// Get Subscribers which does not have list ids: 1/2/3
$subscribers = FluentCrm\App\Models\Funnel::whereDoesntHave('subscribers', function($query) {
    $query->whereIn('id', [1,2,3]);
})->get();
```
