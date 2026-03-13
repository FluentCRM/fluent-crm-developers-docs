---
description: "Label Model represents organizational labels (tags for campaigns and funnels) in FluentCRM."
---

# Label Model

| DB Table Name | {wp_db_prefix}_fc_terms                                            |
|---------------|--------------------------------------------------------------------|
| Schema        | <a href="/database/#fc-terms-table">Check Schema</a> |
| Source File   | fluent-crm/app/Models/Label.php                                    |
| Name Space    | FluentCrm\App\Models                                               |
| Class         | FluentCrm\App\Models\Label                                         |

## Global Scope

This model has a global scope that filters by `taxonomy_name = 'global_label'`. The taxonomy_name is auto-set on create.

::: tip Purpose
Labels are used to organize Campaigns and Automation Funnels into categories. They are different from Tags (which are assigned to contacts).
:::

## Attributes
<table class="nowrap">
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
         <th>parent_id</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>slug</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>title</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>description</th>
         <td>Text</td>
         <td></td>
      </tr>
      <tr>
         <th>position</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>settings</th>
         <td>Text</td>
         <td>Serialized array, contains 'color' key</td>
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

## Fillable Attributes

```php
'parent_id',
'slug',
'title',
'description',
'position',
'settings',
'created_at',
'updated_at'
```

## Usage

Labels are associated with Campaigns and Funnels via the `fc_term_relations` pivot table.

```php
// Get all labels
$labels = FluentCrm\App\Models\Label::all();

// Access color from settings
$label = FluentCrm\App\Models\Label::find(1);
$color = $label->settings['color'] ?? '';

// Attach labels to a campaign
$campaign->attachLabels([1, 2, 3]);

// Attach labels to a funnel
$funnel->attachLabels([1, 2]);
```
