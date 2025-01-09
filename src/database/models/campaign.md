---
description: "Campaign Model is used to manage all the campaign related data."
---

# Campaign Model

| DB Table Name | {wp_db_prefix}_fc_campaigns                                            |
|---------------|------------------------------------------------------------------------|
| Schema        | <a :href="$withBase('/database/#fc-campaigns-table')">Check Schema</a> |
| Source File   | fluent-crm/app/Models/Campaign.php                                     |
| Name Space    | FluentCrm\App\Models                                                   |
| Class         | FluentCrm\App\Models\Campaign                                          |

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
         <th>type</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>title</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>available_urls</th>
         <td>Text</td>
         <td></td>
      </tr>
      <tr>
         <th>slug</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>status</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>template_id</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>email_subject</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>email_pre_header</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>email_body</th>
         <td>Text</td>
         <td></td>
      </tr>
      <tr>
         <th>recipients_count</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>delay</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>utm_status</th>
         <td>Boolean</td>
         <td></td>
      </tr>
      <tr>
         <th>utm_source</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>utm_medium</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>utm_campaign</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>utm_term</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>utm_content</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>design_template</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>scheduled_at</th>
         <td>Date Time</td>
         <td></td>
      </tr>
      <tr>
         <th>last_activity</th>
         <td>Date Time</td>
         <td></td>
      </tr>
      <tr>
         <th>settings</th>
         <td>Text</td>
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

$campaign = FluentCrm\App\Models\Campaign::find(1);

$campaign->id; // returns id
$campaign->email; // returns email
.......
```

## Scopes

This model has the following scopes that you can use

### ofType($status)
Filter campaign by status

- Parameters
    - $status - string

#### Usage:

```php 
// Get all which has published, draft and archived status
$campaigns = FluentCrm\App\Models\Campaign::ofType('published')->get();
```

### archived()
Filter campaign by status

#### Usage:

```php 
// Get all campaign which has archived status
$campaigns = FluentCrm\App\Models\Campaign::archived()->get();
```


## Relations
This model has the following relationships that you can use

### template
Access the associated template of a model

- return `FluentCrm\App\Models\Template` Model Collection

#### Example:
```php 
// Accessing Template
$campaignTemplate = $campaign->template;

// For Filtering by template relationship

// Get Campaigns which has post_status: publish
$campaigns = FluentCrm\App\Models\Campaign::whereHas('template', function($query) {
    $query->where('post_status', 'publish');
})->get();

// Get Campaigns which does not have post_status: publish
$campaigns = FluentCrm\App\Models\Campaign::whereDoesntHave('template', function($query) {
    $query->where('post_status', 'publish');
})->get();

```

### emails
Access all the associated emails of a model

- return `FluentCrm\App\Models\CampaignEmail` Model Collections

#### Example:
```php 
// Accessing CampaignEmails
$campaignEmails = $campaign->emails;

// For Filtering by tags relationship

// Get Campaigns which has email ids: 1/2/3
$campaigns = FluentCrm\App\Models\Campaign::whereHas('emails', funtion($query) {
    $query->whereIn('id', [1,2,3]);
})->get();

// Get Campaigns which does not have email ids: 1/2/3
$campaigns = FluentCrm\App\Models\Campaign::whereDoesntHave('emails', funtion($query) {
    $query->whereIn('id', [1,2,3]);
})->get();
```

### campaign_emails
Access all the associated campaign emails which has email_type 'campaign' of a model

- return `FluentCrm\App\Models\CampaignEmail` Model Collections

#### Example:
```php 
// Accessing All the emails which has email_type 'campaign' of campaign
$campaignEmails = $campaign->campaign_emails;
```

### subjects
Access all the associated subjects of a Campaign model

- return `FluentCrm\App\Models\Subject` Model Collections

#### Example:
```php 
// Accessing All the Subjects of campaign
$campaignSubjects = $campaign->subjects;
```

<hr />

## Methods
Along with Global Model methods, this model has few helper methods.

### subscribeBySegment($settings, $limit, $offset)

Subscribe contacts to a campaign

- Parameters
  - $settings `array`
  - $limit `boolean`|`int` Default: false
  - $offset `int` Default: 0
- Returns `array`

#### Usage
```php 
$response = $campaign->subscribeBySegment($settings, 10, 2);
```

### getSubscribersModel($settings)
Get Contact's model by campaign settings

- Parameters
  - $settings `array`
- Returns `array`

#### Usage
```php 
$contactModel = $campaign->getSubscribersModel($settings);
```

### getSubscriberIdsBySegmentSettings($settings, $limit, $offset)
Get contact's ids by campaign settings

- Parameters
  - $settings `array`
  - $limit `boolean`|`int` Default: false
  - $offset `int` Default: 0
- Returns `array`

#### Usage
```php 
$subscriberIds = $campaign->getSubscriberIdsBySegmentSettings($settings, 10, 2);
```

### getSubscriberIdsCountBySegmentSettings($settings, $status)
Get Unsubscribe reason if contact unsubscribe and provide feedback

- Parameters
  - $settings `array`
  - $status `string` Default: subscribed
- Returns `int`

#### Usage
```php 
$total = $campaign->getSubscriberIdsCountBySegmentSettings($settings, 'subscribed');
```

### getSubQueryForLisTorTagFilter($query, $ids, $table, $objectType)
Get the sub-query by list or tag filtering

- Parameters
  - $query `object`
  - $ids `array`
  - $table `string`
  - $objectType `string`
- Returns `object` 

#### Usage
```php 
$query = $campaign->getSubQueryForLisTorTagFilter($query, [1,2,3], 'tags', 'FluentCrm\App\Models\Tag');
```

### getSubscribeIdsByList($items, $status, $limit, $offset)
Get the contact list which has provided lists

- Parameters
  - $items `array`
  - $status `string` Default: subscribed
  - $limit `boolean`|`int` Default: false
  - $offset `int` Default: 0
- Returns `boolean`

#### Usage
```php 
$isInTags = $campaign->getSubscribeIdsByList($items, 'subscribed', 20, 2);
```

### getSubscribeIdsByListCount($items, $status, $limit, $offset)
Get the contact list count which has provided lists

- Parameters
  - $items `array`
  - $status `string` Default: subscribed
  - $limit `boolean`|`int` Default: false
  - $offset `int` Default: 0
- Returns `boolean`

#### Usage
```php 
$total = $campaign->getSubscribeIdsByListCount($items, 'subscribed', 20, 2);
```

### getSubscribeIdsByListModel($items, $status, $limit, $offset)
Get the contact list by list model

- Parameters
  - $items `array`
  - $status `string` Default: subscribed
  - $limit `boolean`|`int` Default: false
  - $offset `int` Default: 0
- Returns  `array`

#### Usage
```php 
$subscriberIds = $campaign->getSubscribeIdsByListModel($items, 'subscribed', 20, 2);
```

### subscribe($subscriberIds, $emailArgs, $isModel)
Subscribe contact to campaign 

- Parameters
  - $subscriberIds `array`
  - $emailArgs `array` extra campaign_email args
  - $isModel `boolean` if the $subscriberIds is collection or not
- Returns `array`

#### Usage
```php 
$updatedSubscriberIds = $campaign->subscribe([1,2,5], [], false);
```

### unsubscribe($subscriberIds)
Remove contacts from a Campaign

- Parameters
  - $subscriberIds `array` 
- Returns `boolean`

#### Usage
```php 
$result = $campaign->unsubscribe([1,2,3]);
```

### guessEmailSubject($listIds)
Guess the subject by probability formula

- Parameters
  - $listIds array
- Returns `object` or `null`

#### Usage
```php 
$campaign->guessEmailSubject();
```

### getParsedText($text, $subscriber)
Parse shortcodes of contact's info

- Parameters
  - $text `string`
  - $subscriber `array`
  - Returns `string`

#### Usage
```php 
$campaign->getParsedText('{{contact.first_name}}', $subscriber);
```

### filterDuplicateSubscribers($subscriberIds, $subscribers)
Filter all duplicate subscribers

- Parameters
  - $subscriberIds `array`
  - $subscribers `array`
- Returns `array`

#### Usage
```php 
$subscriberIds = $campaign->filterDuplicateSubscribers([1,2,3], $subscribers);
```

### archive()
Archive campaign

- Parameters
  - none
- Returns `boolean`

#### Usage
```php 
$result = $campaign->archive();
```



### getUtmParams()
Get utm params [utm_source, utm_medium, utm_campaign, utm_term, utm_content]

- Parameters
  - none
- Returns `array`

#### Usage
```php 
$utm = $campaign->getUtmParams();
```

### stats
Get Campaign's utm records

- Parameters
  - none
- Returns `array`

#### Usage
```php 
$campaignStats = $campaign->stats();
```

### getEmailCount()
get email counts of campaign

- Parameters
  - none
- Returns `int`

#### Usage
```php 
$total = $campaign->getEmailCount();
```

### maybeDeleteDuplicates()
to remove duplicate records of campaign

- Parameters
  - none
- Returns `object` FluentCrm\App\Models\Campaign

#### Usage
```php 
$campaign = $campaign->maybeDeleteDuplicates();
```

### getHash()
Get campaign's hash

- Parameters
  - none
- Returns `string`

#### Usage
```php 
$hash = $campaign->getHash();
```

### deleteCampaignData()
Delete campaign's data

- Parameters
  - none
- Returns `object` FluentCrm\App\Models\Campaign

#### Usage
```php 
$campaign = $campaign->deleteCampaignData();
```
