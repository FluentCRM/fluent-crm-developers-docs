---
description: "Subject Model"
---

# Subject Model

| DB Table Name | {wp_db_prefix}_fc_meta                                                   |
|---------------|--------------------------------------------------------------------------|
| Schema        | <a :href="$withBase('/database/#fc-subscribers-table')">Check Schema</a> |
| Source File   | fluent-crm/app/Models/Subject.php                                           |
| Name Space    | FluentCrm\App\Models                                                     |
| Class         | FluentCrm\App\Models\Subject                                                |

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
         <th>object_type</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>object_id</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>key</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>value</th>
         <td>Text</td>
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

$subject = FluentCrm\App\Models\Subject::find(1);

$subject->id; // returns id
$subject->value; // returns subject value
.......
```


## Fillable Attributes

```php

'object_type',
'object_id',
'key',
'value'
```


## Relations
This model has the following relationships that you can use

### campaign
Access the associated campaign of a model

- return `FluentCrm\App\Models\Campaign` Model Collections

#### Example:
```php 
// Accessing Campaign
$campaign = $subject->campaign;

// For Filtering by campaign relationship

// Get Subjects which has campaign title 'My First Campaign'
$subjects = FluentCrm\App\Models\Subject::whereHas('campaign', function($query) {
    $query->where('title', 'My First Campaign');
})->get();

// Get Subjects which does not have campaign title 'My First Campaign'
$subjects = FluentCrm\App\Models\Subject::whereDoesntHave('campaign', function($query) {
    $query->where('title', 'My First Campaign');
})->get();

```



### emails
Access the associated emails of a model

- return `FluentCrm\App\Models\CampaignEmail` Model Collections

#### Example:
```php 
// Accessing Campaign
$emails = $subject->emails;

// For Filtering by emails relationship

// Get Subjects which has emails email_subject 'Hello world'
$subjects = FluentCrm\App\Models\Subject::whereHas('emails', function($query) {
    $query->where('email_subject', 'Hello world');
})->get();

// Get Subjects which does not have emails email_subject 'Hello world'
$subjects = FluentCrm\App\Models\Subject::whereDoesntHave('emails', function($query) {
    $query->where('email_subject', 'Hello world');
})->get();

```