---
description: "Campaign URL Matrix Model"
---

# CampaignUrlMetric Model

| DB Table Name | {wp_db_prefix}_fc_campaign_url_metrics                                   |
|---------------|--------------------------------------------------------------------------|
| Schema        | <a :href="$withBase('/database/#fc-subscribers-table')">Check Schema</a> |
| Source File   | fluent-crm/app/Models/CampaignUrlMetric.php                                       |
| Name Space    | FluentCrm\App\Models                                                     |
| Class         | FluentCrm\App\Models\CampaignUrlMetric                                            |

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
         <th>url_id</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>campaign_id</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>subscriber_id</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>type</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>ip_address</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>country</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>city</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>counter</th>
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

$campaignUrlMatric = FluentCrm\App\Models\CampaignUrlMetric::find(1);

$subsctiber->id; // returns id
$campaignUrlMatric->type; // returns type
.......
```

## Fillable Attributes

```php

'url_id',
'campaign_id',
'subscriber_id',
'type', unsubscribe / click
'ip_address',
'country',
'city'
```


## Relations
This model has the following relationships that you can use

### campaign
Access the associated campaign of a model

- return `FluentCrm\App\Models\Campaign` Model Collection

#### Example:
```php 
// Accessing Campaign
$campaignUrlMatric = $campaignUrlMatric->campaign;

// For Filtering by campaign relationship

// Get CampaignUrlMetrics which has type: funnel_email_campaign
$campaignUrlMatrics = FluentCrm\App\Models\CampaignUrlMetric::whereHas('campaign', function($query) {
    $query->where('type', 'funnel_email_campaign');
})->get();

// Get CampaignUrlMetrics which does not have type: funnel_email_campaign
$campaignUrlMatrics = FluentCrm\App\Models\CampaignUrlMetric::whereDoesntHave('campaign', function($query) {
    $query->where('type', 'funnel_email_campaign');
})->get();

```


### subscriber
Access the associated subscriber of a model

- return `FluentCrm\App\Models\Subscriber` Model Collection

#### Example:
```php 
// Accessing Subscriber
$campaignUrlMatric = $campaignUrlMatric->subscriber;

// For Filtering by subscriber relationship

// Get CampaignUrlMetrics which has first_name: Demo
$campaignUrlMatrics = FluentCrm\App\Models\CampaignUrlMetric::whereHas('subscriber', function($query) {
    $query->where('first_name', 'Demo');
})->get();

// Get CampaignUrlMetrics which does not have first_name: Demo
$campaignUrlMatrics = FluentCrm\App\Models\CampaignUrlMetric::whereDoesntHave('subscriber', function($query) {
    $query->where('first_name', 'Demo');
})->get();

```


## Methods
Along with Global Model methods, this model has few helper methods.

### maybeInsert($data)
Store or update campaign url matrix data

- Parameters
  - $data `array` campaign url matrix data
- Returns `\FluentCrm\App\Models\CampaignUrlMetric`

#### Usage
```php 
$campaignUrlMatric = CampaignUrlMatric::maybeInsert($data);
```

### getLinksReport($campaignId)
Get Links report by campaign id

- Parameters
  - $campaignId `int`
- Returns `array`

#### Usage
```php 
$linksReport = $campaignUrlMatric->getLinksReport(1);
```

### getCampaignAnalytics($campaignId)
Get campaign analytics from this model by campaign ID

- Parameters
  - $campaignId `int`
- Returns `array`

#### Usage
```php 
$analytics = $campaignUrlMatric->getCampaignAnalytics(1);
```

### getSubjectStats($campaign)
Get subject stats from this model by campaign

- Parameters
  - $campaign `\FluentCrm\App\Models\Campaign`
- Returns `array`

#### Usage
```php 
$stats = $campaignUrlMatric->getSubjectStats($campaign);
```