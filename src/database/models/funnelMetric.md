---
description: "FunnelMetric Model is used to store the metrics of a funnel sequence"
---

# FunnelMetric Model

| DB Table Name | {wp_db_prefix}_fc_funnel_metrics                                      |
|---------------|-----------------------------------------------------------------------|
| Schema        | <a :href="$withBase('/database/#fc-funnel-metrics')">Check Schema</a> |
| Source File   | fluent-crm/app/Models/FunnelMetric.php                                |
| Name Space    | FluentCrm\App\Models                                                  |
| Class         | FluentCrm\App\Models\FunnelMetric                                     |

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
            <th>sequence_id</th>
            <td>Integer</td>
            <td></td>
        </tr>
        <tr>
            <th>subscriber_id</th>
            <td>Integer</td>
            <td></td>
        </tr>
        <tr>
            <th>benchmark_value</th>
            <td>Integer</td>
            <td></td>
        </tr>
        <tr>
            <th>benchmark_currency</th>
            <td> String</td>
            <td></td>
        </tr>
        <tr>
            <th>status</th>
            <td>String</td>
            <td></td>
        </tr>
        <tr>
            <th>notes</th>
            <td>String</td>
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

### sequence
Get all the actions of Funnel Sequence related to this funnel
- returns `FluentCrm\App\Models\FunnelSequence` Model Collection
#### Example:
```php 
// Accessing the relationship
$sequence = $funnelMetric->sequence;
```
### subscriber
Get all the actions of Funnel Sequence related to this funnel
- returns `FluentCrm\App\Models\Subscriber` Model Collection
#### Example:
```php 
// Accessing the relationship
$sequence = $funnelMetric->subscriber;
```


