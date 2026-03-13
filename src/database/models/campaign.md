---
description: "Campaign Model is used to manage all the campaign related data."
---

# Campaign Model

| DB Table Name | {wp_db_prefix}_fc_campaigns                                            |
|---------------|------------------------------------------------------------------------|
| Schema        | <a href="/database/#fc-campaigns-table">Check Schema</a> |
| Source File   | fluent-crm/app/Models/Campaign.php                                     |
| Name Space    | FluentCrm\App\Models                                                   |
| Class         | FluentCrm\App\Models\Campaign                                          |

## Global Scope

This model has a global scope that filters by `type = 'campaign'`. Every query automatically includes `WHERE type = 'campaign'`. Submodels like `FunnelCampaign` override this with their own type.

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
         <td>Auto-set to 'campaign' by global scope</td>
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
         <td>Auto-sanitized via mutator</td>
      </tr>
      <tr>
         <th>status</th>
         <td>String</td>
         <td>draft | scheduled | working | sent | 0 (archived)</td>
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
         <td>Cast to int via accessor</td>
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
         <th>settings</th>
         <td>Text</td>
         <td>Serialized array, auto serialize/unserialize via mutators</td>
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

### Virtual Attributes (Accessors)

| Attribute | Returns | Description |
|-----------|---------|-------------|
| `rendered_body` | String | Rendered HTML body via Template parser |
| `subject` | String | First A/B Subject value, or `email_subject` fallback |

## Usage
Please check <a href="/database/models/">Model Basic</a> for Common methods.

### Accessing Attributes

```php

$campaign = FluentCrm\App\Models\Campaign::find(1);

$campaign->id; // returns id
$campaign->title; // returns title
$campaign->settings; // returns deserialized array (auto via accessor)
$campaign->subject; // returns A/B subject or email_subject
$campaign->rendered_body; // returns rendered HTML
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
// Get all campaigns with published status
$campaigns = FluentCrm\App\Models\Campaign::ofType('published')->get();
```

### archived()
Filter archived campaigns (status = 0)

#### Usage:

```php
// Get all archived campaigns
$campaigns = FluentCrm\App\Models\Campaign::archived()->get();
```


## Relations
This model has the following relationships that you can use

### template
Access the associated template of a model

- return `FluentCrm\App\Models\Template` Model

#### Example:
```php
// Accessing Template
$campaignTemplate = $campaign->template;

// Get Campaigns which has post_status: publish
$campaigns = FluentCrm\App\Models\Campaign::whereHas('template', function($query) {
    $query->where('post_status', 'publish');
})->get();
```

### emails
Access all the associated emails of a model (all email types)

- return `FluentCrm\App\Models\CampaignEmail` Model Collections

#### Example:
```php
// Accessing CampaignEmails
$campaignEmails = $campaign->emails;
```

### campaign_emails
Access only campaign-type emails (filtered by `email_type = 'campaign'`)

- return `FluentCrm\App\Models\CampaignEmail` Model Collections

#### Example:
```php
// Accessing only campaign emails (excludes sequence emails)
$campaignEmails = $campaign->campaign_emails;
```

### subjects
Access all the A/B subject lines of a Campaign model

- return `FluentCrm\App\Models\Subject` Model Collections

#### Example:
```php
// Accessing All the Subjects of campaign
$campaignSubjects = $campaign->subjects;
```

### labelsTerm
Access labels attached to this campaign via the `fc_term_relations` pivot table

- return `FluentCrm\App\Models\Label` Model Collections (BelongsToMany)

#### Example:
```php
// Accessing labels via relationship
$labels = $campaign->labelsTerm;
```

<hr />

## Methods
Along with Global Model methods, this model has these helper methods.

### syncSubjects($subjects)

Create or update A/B subject lines for the campaign

- Parameters
  - $subjects `array` — array of `['key' => weight, 'value' => text]` items
- Returns `HasMany` relation

#### Usage
```php
$campaign->syncSubjects([
    ['key' => 50, 'value' => 'Subject A'],
    ['key' => 50, 'value' => 'Subject B'],
]);
```

### subscribeBySegment($settings, $limit, $offset)

Subscribe contacts to a campaign based on segment settings

- Parameters
  - $settings `array`
  - $limit `boolean`|`int` Default: false
  - $offset `int` Default: 0
- Returns `array` — `['result' => array, 'total_subscribed' => int, 'total_items' => int]`

#### Usage
```php
$response = $campaign->subscribeBySegment($settings, 10, 2);
```

### getSubscribersModel($settings)
Get Subscriber query builder by campaign settings

- Parameters
  - $settings `array`
- Returns `Builder` or `null`

#### Usage
```php
$contactModel = $campaign->getSubscribersModel($settings);
```

### getSubscriberIdsBySegmentSettings($settings, $limit, $offset)
Get contact IDs by campaign settings (without creating CampaignEmail rows)

- Parameters
  - $settings `array`
  - $limit `boolean`|`int` Default: false
  - $offset `int` Default: 0
- Returns `array` — `['subscriber_ids' => array, 'total_count' => int]`

#### Usage
```php
$result = $campaign->getSubscriberIdsBySegmentSettings($settings, 10, 2);
```

### getSubscriberIdsCountBySegmentSettings($settings, $status)
Get count of contacts matching segment settings

- Parameters
  - $settings `array`
  - $status `string` Default: subscribed
- Returns `int`

#### Usage
```php
$total = $campaign->getSubscriberIdsCountBySegmentSettings($settings, 'subscribed');
```

### subscribe($subscriberIds, $emailArgs, $isModel)
Enqueue campaign emails for subscribers

- Parameters
  - $subscriberIds `array` or Collection
  - $emailArgs `array` — extra campaign_email fields
  - $isModel `boolean` — if the $subscriberIds is a collection
- Returns `array` — inserted CampaignEmail IDs

#### Usage
```php
$emailIds = $campaign->subscribe([1,2,5], [], false);
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

### guessEmailSubject()
Select an A/B subject using weighted random selection

- Parameters
  - none
- Returns `FluentCrm\App\Models\Subject` or `null`

#### Usage
```php
$subject = $campaign->guessEmailSubject();
```

### getParsedText($text, $subscriber)
Parse SmartCode placeholders in text

- Parameters
  - $text `string`
  - $subscriber `Subscriber`
- Returns `string`

#### Usage
```php
$parsed = $campaign->getParsedText('Hello {{contact.first_name}}', $subscriber);
```

### filterDuplicateSubscribers($subscriberIds, $subscribers)
Remove subscribers who already have a CampaignEmail for this campaign

- Parameters
  - $subscriberIds `array`
  - $subscribers `Collection`
- Returns `Collection`

#### Usage
```php
$unique = $campaign->filterDuplicateSubscribers([1,2,3], $subscribers);
```

### archive()
Archive a campaign (sets status to 0)

- Parameters
  - none
- Returns `FluentCrm\App\Models\Campaign`

#### Usage
```php
$campaign->archive();
```

### getUtmParams()
Get UTM parameters if UTM tracking is enabled

- Parameters
  - none
- Returns `array` — non-empty UTM fields, or empty array

#### Usage
```php
$utm = $campaign->getUtmParams();
```

### stats()
Get campaign statistics (total, sent, views, clicks, unsubscribers, revenue)

- Parameters
  - none
- Returns `array`

#### Usage
```php
$campaignStats = $campaign->stats();
```

### getEmailCount()
Get raw email count for this campaign

- Parameters
  - none
- Returns `int`

#### Usage
```php
$total = $campaign->getEmailCount();
```

### maybeDeleteDuplicates()
Remove duplicate CampaignEmail rows for this campaign

- Parameters
  - none
- Returns `FluentCrm\App\Models\Campaign`

#### Usage
```php
$campaign->maybeDeleteDuplicates();
```

### getHash()
Get or generate a persistent campaign hash (stored in meta)

- Parameters
  - none
- Returns `string`

#### Usage
```php
$hash = $campaign->getHash();
```

### deleteCampaignData()
Delete all associated data (emails, URL metrics, meta) but NOT the campaign itself

- Parameters
  - none
- Returns `FluentCrm\App\Models\Campaign`

#### Usage
```php
$campaign->deleteCampaignData();
```

### rangedScheduleDates()
Get start/end dates for range-scheduled campaigns

- Parameters
  - none
- Returns `array` — `['start' => 'Y-m-d H:i:s', 'end' => 'Y-m-d H:i:s']` or `null`

#### Usage
```php
$dates = $campaign->rangedScheduleDates();
```

### getShareableUrl()
Get a public preview URL for the campaign

- Parameters
  - none
- Returns `string` — full URL

#### Usage
```php
$url = $campaign->getShareableUrl();
```

### labels()
Get all labels attached to this campaign

- Parameters
  - none
- Returns `Collection` of `FluentCrm\App\Models\Label`

#### Usage
```php
$labels = $campaign->labels();
```

### getFormattedLabels()
Get labels in simplified format for API responses

- Parameters
  - none
- Returns `Collection` of `['id', 'slug', 'title', 'color']` arrays

#### Usage
```php
$labels = $campaign->getFormattedLabels();
```

### attachLabels($labelIds)
Attach labels to this campaign

- Parameters
  - $labelIds `int` or `array`
- Returns `FluentCrm\App\Models\Campaign`

#### Usage
```php
$campaign->attachLabels([1, 2, 3]);
```

### detachLabels($labelIds)
Remove labels from this campaign

- Parameters
  - $labelIds `int` or `array`
- Returns `FluentCrm\App\Models\Campaign`

#### Usage
```php
$campaign->detachLabels([1, 2]);
```

### getOpenTrackingStatus($globalFallback)
Get the campaign's open tracking setting

- Parameters
  - $globalFallback `boolean` — Default `true`. Falls back to site-wide setting
- Returns `string` or `null` — `'yes'`, `'no'`, `'anonymous'`

#### Usage
```php
$status = $campaign->getOpenTrackingStatus();
```

### getClickTrackingStatus($globalFallback)
Get the campaign's click tracking setting

- Parameters
  - $globalFallback `boolean` — Default `true`. Falls back to site-wide setting
- Returns `string` or `null`

#### Usage
```php
$status = $campaign->getClickTrackingStatus();
```
