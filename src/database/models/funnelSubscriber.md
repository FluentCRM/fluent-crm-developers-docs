---
description: "Funnel Subscriber Model"
---

# FunnelSubscriber Model

| DB Table Name | {wp_db_prefix}_fc_funnel_subscribers                                      |
|---------------|---------------------------------------------------------------------------|
| Schema        | <a :href="$withBase('/database/#fc-funnel-subscribers')">Check Schema</a> |
| Source File   | fluent-crm/app/Models/FunnelSubscriber.php                                |
| Name Space    | FluentCrm\App\Models                                                      |
| Class         | FluentCrm\App\Models\FunnelSubscriber                                     |

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
            <th>starting_sequence_id</th>
            <td>Integer</td>
            <td></td>
        </tr>
        <tr>
            <th>next_sequence</th>
            <td>Integer</td>
            <td></td>
        </tr>
        <tr>
            <th>subscriber_id</th>
            <td>Integer</td>
            <td></td>
        </tr>
        <tr>
            <th>last_sequence_id</th>
            <td> Integer</td>
            <td></td>
        </tr>
        <tr>
            <th>next_sequence_id</th>
            <td>Integer</td>
            <td></td>
        </tr>
        <tr>
            <th>last_sequence_status</th>
            <td> String</td>
            <td></td>
        </tr>
        <tr>
            <th>status</th>
            <td>String</td>
            <td></td>
        </tr>
        <tr>
            <th>type</th>
            <td> String</td>
            <td></td>
        </tr>
        <tr>
            <th>last_executed_time</th>
            <td>Date Time</td>
            <td></td>
        </tr>
        <tr>
            <th>next_execution_time</th>
            <td>Date Time</td>
            <td></td>
        </tr>
        <tr>
            <th>notes</th>
            <td> String</td>
            <td></td>
        </tr>
        <tr>
            <th>source_trigger_name</th>
            <td>String</td>
            <td></td>
        </tr>
        <tr>
            <th>delay</th>
            <td>Integer</td>
            <td></td>
        <tr>
        <tr>
            <th>source_ref_id</th>
            <td> Integer</td>
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

$funnelSubscriber = FluentCrm\App\Models\FunnelSubscriber::find(1);

$funnelSequence->id; // returns id
$funnelSequence->type; // returns type
.......
```

## Fillable Attributes

```php
'funnel_id',
'starting_sequence_id',
'next_sequence',
'subscriber_id',
'last_sequence_id',
'next_sequence_id',
'last_sequence_status', // pending | : Default: pending
'status',
'type',
'last_executed_time',
'next_executed_time',
'notes',
'source_trigger_name',
'source_ref_id'

```
## Scopes

This model has the following scopes that you can use

### active()

Shorthand for active funnel subscribers
```php 
// get all active funnel subscribers
$funnelSubscribers = FluentCrm\App\Models\FunnelSubscriber::active()->get();
```

## Relations
This model has the following relationship that you can use

### funnel
Get the Funnel related to this funnel subscriber
- returns `FluentCrm\App\Models\Funnel` Model
#### Example:
```php 
// Accessing the relationship
$funnel = $funnelSubscriber->funnel;
```
### next_sequence_item
Get the next sequence funnel item
- returns `FluentCrm\App\Models\FunnelSequence` Model 
#### Example:
```php 
// Accessing the relationship
$nextSequence = $funnelSubscriber->next_sequence_item;
```

### last_sequence
Get all the actions of Funnel Sequence related to this funnel
- returns `FluentCrm\App\Models\FunnelSequence` Model
#### Example:
```php 
// Accessing the relationship
$lastSequence = $funnelSubscriber->last_sequence;
```

### metrics
Get all the actions of Funnel Sequence related to this funnel
- returns `FluentCrm\App\Models\FunnelMetric` Model Collection
#### Example:
```php 
// Accessing the relationship
$metrics = $funnelSubscriber->metrics;
```

### subscriber
Get all the actions of Funnel Sequence related to this funnel
- returns `FluentCrm\App\Models\FunnelMetric` Model Collection
#### Example:
```php 
// Accessing the relationship
$subscriber = $funnelSubscriber->subscriber;
```