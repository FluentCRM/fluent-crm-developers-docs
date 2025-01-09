---
description: "Learn about the FunnelSequence Model in FluentCRM, designed to automate and optimize customer journeys."
---

# FunnelSequence Model

| DB Table Name | {wp_db_prefix}_fc_funnel_sequences                                      |
|---------------|-------------------------------------------------------------------------|
| Schema        | <a :href="$withBase('/database/#fc_funnel_sequences')">Check Schema</a> |
| Source File   | fluent-crm/app/Models/FunnelSequence.php                                |
| Name Space    | FluentCrm\App\Models                                                    |
| Class         | FluentCrm\App\Models\FunnelSequence                                     |

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
            <th>funnel_id</th>
            <td>Integer</td>
            <td></td>
        </tr>
        <tr>
            <th>parent_id</th>
            <td>Integer</td>
            <td></td>
        </tr>
        <tr>
            <th>action_name</th>
            <td> String</td>
            <td></td>
        </tr>
        <tr>
            <th>condition_type</th>
            <td> String</td>
            <td></td>
        </tr>
        <tr>
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
            <th>description</th>
            <td> String</td>
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
            <th>note</th>
            <td>Integer</td>
            <td></td>
        </tr>
        <tr>
            <th>delay</th>
            <td>Integer</td>
            <td></td>
        <tr>
        <tr>
            <th>c_delay</th>
            <td> Integer</td>
            <td></td>
        </tr>
        <tr>
            <th>sequence</th>
            <td> Integer</td>
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

$funnelSequence = FluentCrm\App\Models\FunnelSequence::find(1);

$funnelSequence->id; // returns id
$funnelSequence->status; // returns status
.......
```

## Fillable Attributes

```php
'funnel_id',
'action_name',
'parent_id',
'condition_type',
'title',
'description',
'status', // draft | : Default: draft
'conditions',
'settings',
'delay',
'c_delay',
'sequence',
'created_by',
'type', // sequence | ; Default: sequence
'note',

```

## Relations
This model has the following relationship that you can use

### funnel
Get all the actions of Funnel Sequence related to this funnel
- returns `FluentCrm\App\Models\Funnel` Model
#### Example:
```php 
// Accessing the relationship
$funnel = $funnelSequence->funnel;
```


