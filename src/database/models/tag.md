---
description: "Explore the Tag Model in FluentCRM, which allows you to categorize and segment your contacts with custom tags."
---

# Tag Model

| DB Table Name | {wp_db_prefix}_fc_tags                                                   |
|---------------|--------------------------------------------------------------------------|
| Schema        | <a :href="$withBase('/database/#fc-subscribers-table')">Check Schema</a> |
| Source File   | fluent-crm/app/Models/Tag.php                                            |
| Name Space    | FluentCrm\App\Models                                                     |
| Class         | FluentCrm\App\Models\Tag                                                 |

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
         <th>title</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>slug</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>description</th>
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

$tag = FluentCrm\App\Models\Tag::find(1);

$tag->id; // returns id
$tag->title; // returns tag title
.......
```


## Fillable Attributes

```php

'title',
'slug',
'description'
```


## Scopes
This model has the following scopes that you can use

### searchBy()

Apply full text search to basic data attributes
`title`,`slug`, `description`

- Parameters
    - $search - String
#### Usage:

```php 
// Search all contacts to match "My-Tag"
$tags = FluentCrm\App\Models\Tag::searchBy('"My-Tag')->get();
```


## Relations
This model has the following relationships that you can use

### subscribers
Access all the associated subscribers of a model

- return `FluentCrm\App\Models\Subscriber` Model Collections

#### Example:
```php 
// Accessing Subscribers
$subscribers = $tag->subscribers;

// For Filtering by subscribers relationship

// Get tags which has subscriber ids: 1/2/3
$tags = FluentCrm\App\Models\Tag::whereHas('subscribers', function($query) {
    $query->whereIn('id', [1,2,3]);
})->get();

// Get tags which does not have subscriber ids: 1/2/3
$tags = FluentCrm\App\Models\Tag::whereDoesntHave('subscribers', function($query) {
    $query->whereIn('id', [1,2,3]);
})->get();

```



## Methods
Along with Global Model methods, this model has few helper methods.

### totalCount()
Get total number of subscribers of a tag

- Parameters
    - none
- Returns `int`

#### Usage
```php 
$total = $tag->totalCount();
```


### countByStatus($status)
Get total number of subscribers of a tag where subscriber status is $status

- Parameters
  - $status `string` default value `subscribed`
- Returns `int`

#### Usage
```php 
$total = $tag->countByStatus('subscribed');
```