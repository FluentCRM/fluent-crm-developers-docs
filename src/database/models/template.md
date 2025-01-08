---
description: "Discover the Template Model in FluentCRM, designed to create and manage reusable templates for email campaigns and automations."
---

# Template Model

| DB Table Name | {wp_db_prefix}_posts                                            |
|---------------|-----------------------------------------------------------------|
| Schema        | <a :href="$withBase('/database/#fc-subscribers-table')">Check Schema</a> |
| Source File   | fluent-crm/app/Models/Template.php                              |
| Name Space    | FluentCrm\App\Models                                            |
| Class         | FluentCrm\App\Models\Template                                   |

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
            <th>ID</th>
            <td>Integer</td>
            <td></td>
        </tr>
        <tr class="odd">
            <th>post_author</th>
            <td>Integer</td>
            <td></td>
        </tr>
        <tr>
            <th>post_date</th>
            <td>Date Time</td>
            <td></td>
        </tr>
        <tr>
            <th>post_date_gmt</th>
            <td>Date Time</td>
            <td></td>
        </tr>
        <tr>
            <th>post_content</th>
            <td>Long Text</td>
            <td></td>
        </tr>
        <tr>
            <th>post_title</th>
            <td>Text</td>
            <td></td>
        </tr>
        <tr>
            <th>post_excerpt</th>
            <td>Text</td>
            <td></td>
        </tr>
        <tr>
            <th>post_status</th>
            <td>String</td>
            <td></td>
        </tr>
        <tr>
            <th>comment_status</th>
            <td>String</td>
            <td></td>
        </tr>
        <tr>
            <th>ping_status</th>
            <td>String</td>
            <td></td>
        </tr>
        <tr>
            <th>post_name</th>
            <td>String</td>
            <td></td>
        </tr>
        <tr>
            <th>post_type</th>
            <td>String</td>
            <td></td>
        </tr>
        <tr>
            <th>post_mime_type</th>
            <td>String</td>
            <td></td>
        </tr>
        <tr>
            <th>post_date</th>
            <td>Date Time</td>
            <td></td>
        </tr>
        <tr>
            <th>post_modified</th>
            <td>Date Time</td>
            <td></td>
        </tr>
    </tbody>
</table>

## Usage

Please check <a href="/database/models/">Model Basic</a> for Common methods.

### Accessing Attributes

```php 

$template = FluentCrm\App\Models\Template::find(1);

$template->id; // returns id
$template->post_status; // returns post status
.......
```

## Fillable Attributes

```php
'ID',
'post_author',
'post_date',
'post_date_gmt',
'post_content',
'post_title',
'post_excerpt',
'post_status',
'comment_status',
'ping_status',
'post_name',
'post_type',
'post_mime_type',
'post_date',
'post_modified'

```

## Scopes

This model has the following scope that you can use

### emailTemplates($types)
returns all email templates by filtering post_status

- Parameters
    - $types - `array` - default ['publish']

#### Usage:

```php 
$emailTemplates = FluentCrm\App\Models\Template::emailTemplates(['draft', 'publish'])->get();
```

### campaignTemplate()
returns all email templates by filtering post_status

- Parameters
  - none

#### Usage:

```php 
$campaignTemplate = FluentCrm\App\Models\Template::campaignTemplate()->get();
```


## Relations
This model has the following relationships that you can use

### campaign
Get the campaign of model
- returns `FluentCrm\App\Models\Campaign` Model

#### Example:
```php 
// Accessing actions
$campaign = $funnel->campaign;
```

// You can also limit your results based on the existence of a relationship. 
For example, if you want to get all the templates that have ids 1, 2 and 3 in the campaign, you can do the following:

```php
// Get Templates which have campaign ids: 1/2
$templates = FluentCrm\App\Models\Template::whereHas('campaign', function($query) {
    $query->whereIn('id', [1,2]);
})->get();
```


## Methods
Along with Global Model methods, this model has few helper methods.

### render($content)
Render the template content

- Parameters
  - $content `string` Default: null
- Returns `string`

#### Usage
```php 
$renderedText = $template->render();
```