---
description: "Explore the Subscriber Model in FluentCRM, designed to manage and organize your contacts effectively."
---

# Subscriber Model

| DB Table Name | {wp_db_prefix}_fc_subscribers                                            |
|---------------|--------------------------------------------------------------------------|
| Schema        | <a href="/database/#fc-subscribers-table">Check Schema</a> |
| Source File   | fluent-crm/app/Models/Subscriber.php                                     |
| Name Space    | FluentCrm\App\Models                                                     |
| Class         | FluentCrm\App\Models\Subscriber                                          |

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
         <th>user_id</th>
         <td>Integer</td>
         <td>WordPress user ID</td>
      </tr>
      <tr>
         <th>hash</th>
         <td>String</td>
         <td>MD5 of email, auto-generated on save</td>
      </tr>
      <tr>
         <th>contact_owner</th>
         <td>Integer</td>
         <td>WordPress user ID of the contact owner</td>
      </tr>
      <tr>
         <th>company_id</th>
         <td>Integer</td>
         <td>Primary company FK</td>
      </tr>
      <tr>
         <th>prefix</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>first_name</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>last_name</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>email</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>timezone</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>address_line_1</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>address_line_2</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>postal_code</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>city</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>state</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>country</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>ip</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>latitude</th>
         <td>Decimal</td>
         <td></td>
      </tr>
      <tr>
         <th>longitude</th>
         <td>Decimal</td>
         <td></td>
      </tr>
      <tr>
         <th>total_points</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>life_time_value</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>phone</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>status</th>
         <td>String</td>
         <td>pending | subscribed | bounced | unsubscribed | complained</td>
      </tr>
      <tr>
         <th>contact_type</th>
         <td>String</td>
         <td>lead | customer</td>
      </tr>
      <tr>
         <th>sms_status</th>
         <td>String</td>
         <td>sms_pending | sms_subscribed | sms_unsubscribed | sms_bounced</td>
      </tr>
      <tr>
         <th>source</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>avatar</th>
         <td>String / URL</td>
         <td></td>
      </tr>
      <tr>
         <th>date_of_birth</th>
         <td>Date</td>
         <td></td>
      </tr>
      <tr>
         <th>created_at</th>
         <td>Date Time</td>
         <td></td>
      </tr>
      <tr>
         <th>last_activity</th>
         <td>Date Time</td>
         <td></td>
      </tr>
      <tr>
         <th>updated_at</th>
         <td>Date Time</td>
         <td></td>
      </tr>
      <tr>
         <th>full_name</th>
         <td>String</td>
         <td>Accessor: concat of first_name and last_name</td>
      </tr>
      <tr>
         <th>photo</th>
         <td>String / URL</td>
         <td>Accessor: avatar URL or Gravatar fallback</td>
      </tr>
   </tbody>
</table>

## Usage

Please check <a href="/database/models/">Model Basic</a> for Common methods.

### Accessing Attributes

```php

$subscriber = FluentCrm\App\Models\Subscriber::find(1);

$subscriber->id; // returns id
$subscriber->email; // returns email
$subscriber->full_name; // returns "first_name last_name"
$subscriber->photo; // returns avatar URL or Gravatar
.......
```

## Fillable Attributes

```php

'hash',
'prefix',
'first_name',
'last_name',
'user_id',
'company_id',
'email',
'status',        // pending | subscribed | bounced | unsubscribed
'contact_type',  // lead | customer
'sms_status',    // sms_pending | sms_subscribed | sms_unsubscribed | sms_bounced
'address_line_1',
'address_line_2',
'postal_code',
'city',
'state',
'country',
'phone',
'timezone',
'date_of_birth',
'source',
'life_time_value',
'last_activity',
'total_points',
'latitude',
'longitude',
'ip',
'created_at',
'updated_at',
'avatar'
```

## Scopes

This model has the following scopes that you can use

### searchBy()

Apply full text search to basic data attributes:
`email`, `first_name`, `last_name`, `address_line_1`, `address_line_2`, `postal_code`, `city`, `state`, `country`, `phone`, `status`

- Parameters
  - $search - String
  - $custom_fields - Boolean, Default `false`. If true then it will search in Custom Fields too
#### Usage:

```php
// Search all contacts to match "John"
$subscribers = FluentCrm\App\Models\Subscriber::searchBy('John')->get();

// Search including custom fields
$subscribers = FluentCrm\App\Models\Subscriber::searchBy('John', true)->get();
```


### filterByStatues()

Filter contacts by statuses
- Parameters
    - $statuses - array

#### Usage:

```php
// Get all which has pending and unsubscribed statuses
$subscribers = FluentCrm\App\Models\Subscriber::filterByStatues(['pending', 'unsubscribed'])->get();
```

### filterByContactType()

Filter contacts by contact type
- Parameters
    - $type - string (`lead` or `customer`)

#### Usage:

```php
// Get all leads
$subscribers = FluentCrm\App\Models\Subscriber::filterByContactType('lead')->get();
```

### filterByTags()

Filter contacts by tag attributes
- Parameters
    - $keys - array, Ex: [tag1, tag2, tag3]
    - $filterBy - string, default: 'id' possible value: id / slug / title

#### Usage:

```php
// Get all contacts are in 1 / 2 /3 tag ids
$subscribers = FluentCrm\App\Models\Subscriber::filterByTags([1,2,3])->get();
```

### filterByNotInTags()

Filter contacts by not in given tags
- Parameters
    - $keys - array, Ex: [tag1, tag2, tag3]
    - $filterBy - string, default: 'id' possible value: id / slug / title

#### Usage:

```php
// Get all contacts who are not in 1 / 2 /3 tag ids
$subscribers = FluentCrm\App\Models\Subscriber::filterByNotInTags([1,2,3])->get();
```

### filterByLists()

Filter contacts by list attributes
- Parameters
    - $keys - array, Ex: [list1, list2, list3]
    - $filterBy - string, default: 'id' possible value: id / slug / title

#### Usage:

```php
// Get all contacts are in 1 / 2 /3 list ids
$subscribers = FluentCrm\App\Models\Subscriber::filterByLists([1,2,3])->get();
```

### filterByNotInLists()

Filter contacts by not in given lists
- Parameters
    - $keys - array, Ex: [list1, list2, list3]
    - $filterBy - string, default: 'id' possible value: id / slug / title

#### Usage:

```php
// Get all contacts who are not in 1 / 2 /3 list ids
$subscribers = FluentCrm\App\Models\Subscriber::filterByNotInLists([1,2,3])->get();
```

### filterByCompanies()

Filter contacts by associated companies
- Parameters
    - $keys - array, Ex: [1, 2, 3]
    - $filterBy - string, default: 'id' possible value: id / slug

#### Usage:

```php
// Get all contacts associated with company ids 1, 2, 3
$subscribers = FluentCrm\App\Models\Subscriber::filterByCompanies([1,2,3])->get();
```


## Relations
This model has the following relationships that you can use

### tags
Access all the associated tags of a model

- return `FluentCrm\App\Models\Tag` Model Collections

#### Example:
```php
// Accessing Tags
$subscriberTags = $subscriber->tags;

// For Filtering by tags relationship

// Get Subscribers which has tag ids: 1/2/3
$subscribers = FluentCrm\App\Models\Subscriber::whereHas('tags', function($query) {
    $query->whereIn('id', [1,2,3]);
})->get();

// Get Subscribers which does not have tag ids: 1/2/3
$subscribers = FluentCrm\App\Models\Subscriber::whereDoesntHave('tags', function($query) {
    $query->whereIn('id', [1,2,3]);
})->get();

```

### lists
Access all the associated lists of a model

- return `FluentCrm\App\Models\Lists` Model Collections

#### Example:
```php
// Accessing Lists
$subscriberLists = $subscriber->lists;

// For Filtering by lists relationship

// Get Subscribers which has list ids: 1/2/3
$subscribers = FluentCrm\App\Models\Subscriber::whereHas('lists', function($query) {
    $query->whereIn('id', [1,2,3]);
})->get();

// Get Subscribers which does not have list ids: 1/2/3
$subscribers = FluentCrm\App\Models\Subscriber::whereDoesntHave('lists', function($query) {
    $query->whereIn('id', [1,2,3]);
})->get();
```

### company
Access the primary company of a subscriber (via `company_id` FK)

- return `FluentCrm\App\Models\Company` Model

#### Example:
```php
// Accessing primary company
$company = $subscriber->company;
```

### companies
Access all associated companies of a subscriber (via pivot table)

- return `FluentCrm\App\Models\Company` Model Collections

#### Example:
```php
// Accessing all companies
$companies = $subscriber->companies;

// Filter subscribers by company
$subscribers = FluentCrm\App\Models\Subscriber::whereHas('companies', function($query) {
    $query->whereIn('id', [1,2,3]);
})->get();
```

### sequences
Access all the associated email sequences of a model *(Pro)*

- return `FluentCampaign\App\Models\Sequence` Model Collections

#### Example:
```php
// Accessing All the email sequences of subscriber
$subscriberEmailSequences = $subscriber->sequences;
```

### sequence_trackers
Access all the associated email sequence trackers of a Subscriber model *(Pro)*

- return `FluentCampaign\App\Models\SequenceTracker` Model Collections

#### Example:
```php
// Accessing All the email sequence trackers of subscriber
$subscriberEmailSequenceTrackers = $subscriber->sequence_trackers;
```

### funnels
Access all the associated Automation Funnels of a Subscriber model

- return `FluentCrm\App\Models\Funnel` Model Collections

#### Example:
```php
// Accessing All the automation funnels of subscriber
$subscriberAutomations = $subscriber->funnels;
```

### funnel_subscribers
Access all the associated Automation Funnels Subscription Trackers of a Subscriber model

- return `FluentCrm\App\Models\FunnelSubscriber` Model Collections

#### Example:
```php
// Accessing All the automation funnel tracking of subscriber
$subscriberAutomationTrackers = $subscriber->funnel_subscribers;
```

### campaignEmails
Access all the sent/sending emails of a Subscriber model

- return `FluentCrm\App\Models\CampaignEmail` Model Collections

#### Example:
```php
// Accessing All the campaign emails of subscriber
$subscriberEmailCollections = $subscriber->campaignEmails;
```

### notes
Access all the notes and activity log entries of a Subscriber model

- return `FluentCrm\App\Models\SubscriberNote` Model Collections

#### Example:
```php
// Accessing All notes of subscriber
$subscriberNotes = $subscriber->notes;
```

### meta
Access all the meta records of a Subscriber model

- return `FluentCrm\App\Models\SubscriberMeta` Model Collections

#### Example:
```php
// Accessing All meta of subscriber
$subscriberMeta = $subscriber->meta;
```

### custom_field_meta
Access only custom field meta records of a Subscriber model (filtered by `object_type = 'custom_field'`)

- return `FluentCrm\App\Models\SubscriberMeta` Model Collections

#### Example:
```php
// Accessing custom field meta
$customFieldMeta = $subscriber->custom_field_meta;
```

### urlMetrics
Access all the URL click/tracking metrics of a Subscriber model

- return `FluentCrm\App\Models\CampaignUrlMetric` Model Collections

#### Example:
```php
// Accessing URL metrics
$urlMetrics = $subscriber->urlMetrics;
```

### trackingEvents
Access all the event tracker records of a Subscriber model

- return `FluentCrm\App\Models\EventTracker` Model Collections

#### Example:
```php
// Accessing tracking events
$events = $subscriber->trackingEvents;
```

### user
Access the associated WordPress user

- return `FluentCrm\App\Models\User` Model or null

#### Example:
```php
// Accessing WordPress user
$wpUser = $subscriber->user;
```

<hr />

## Methods
Along with Global Model methods, this model has these helper methods.

### custom_fields()

Get custom fields data of a contact

- Parameters
  - none
- Returns `array` — key-value map of `['field_slug' => value]`

#### Usage
```php
$customData = $subscriber->custom_fields();
```

### syncCustomFieldValues($values, $deleteOtherValues)

Upsert custom field meta values for a contact

- Parameters
  - $values `array` — key-value map of field slugs to values
  - $deleteOtherValues `boolean` — Default `true`. If true, deletes fields with blank values
- Returns `array` — changed key-value pairs

#### Usage
```php
$changes = $subscriber->syncCustomFieldValues([
    'company_name' => 'Acme Inc',
    'job_title' => 'Developer'
]);
```

### stats()

Get Contact's sent emails, opens and clicks count

- Parameters
  - none
- Returns `array` — `['emails' => int, 'opens' => int, 'clicks' => int]`

#### Usage
```php
$contactStats = $subscriber->stats();
```

### store($data) <Badge type="tip" text="static" />

Create a new subscriber with tags, lists, custom values, and company

- Parameters
  - $data `array` — subscriber fields plus optional `tags`, `lists`, `custom_values`, `company_id`
- Returns `FluentCrm\App\Models\Subscriber`

#### Usage
```php
$subscriber = FluentCrm\App\Models\Subscriber::store([
    'email' => 'john@example.com',
    'first_name' => 'John',
    'status' => 'subscribed',
    'tags' => [1, 2],
    'lists' => [3]
]);
```

### updateOrCreate($data, $forceUpdate, $deleteOtherValues, $sync)

Upsert a subscriber by email. Handles status protection, custom fields, tags, lists, and companies

- Parameters
  - $data `array` — subscriber fields plus optional `tags`, `lists`, `custom_values`
  - $forceUpdate `boolean` — Default `false`
  - $deleteOtherValues `boolean` — Default `false`
  - $sync `boolean` — Default `false`
- Returns `FluentCrm\App\Models\Subscriber`

#### Usage
```php
$subscriber = $subscriber->updateOrCreate([
    'email' => 'john@example.com',
    'first_name' => 'John',
    'tags' => [1, 2]
]);
```

### import($data, $tags, $lists, $update, $newStatus, $doubleOptin, $forceStatusChange, $source) <Badge type="tip" text="static" />

Bulk import contacts

- Parameters
  - $data `array` — array of subscriber data arrays
  - $tags `array` — tag IDs to attach
  - $lists `array` — list IDs to attach
  - $update `boolean` — whether to update existing contacts
  - $newStatus `string` — Default `''`
  - $doubleOptin `boolean` — Default `false`
  - $forceStatusChange `boolean` — Default `false`
  - $source `string` — Default `''`
- Returns `array` — `['inserted' => [], 'updated' => [], 'skips' => [], 'errors' => []]`

#### Usage
```php
$result = FluentCrm\App\Models\Subscriber::import(
    [['email' => 'john@example.com', 'first_name' => 'John']],
    [1, 2],  // tag ids
    [3],     // list ids
    true     // update existing
);
```

### updateStatus($status)

Update contact status with proper hook firing

- Parameters
  - $status `string`
- Returns `FluentCrm\App\Models\Subscriber`

#### Usage
```php
$subscriber->updateStatus('subscribed');
```

### sendDoubleOptinEmail()

Send Double Optin email if contact is in pending status. Rate-limited to once per 150 seconds.

- Parameters
  - none
- Returns `boolean`

#### Usage
```php
$subscriber->sendDoubleOptinEmail();
```

### unsubscribeReason()

Get Unsubscribe reason if contact unsubscribed and provided feedback

- Parameters
  - none
- Returns `string`

#### Usage
```php
$reason = $subscriber->unsubscribeReason();
```

### unsubscribeReasonDate()

Get Unsubscribe reason date if contact is unsubscribed

- Parameters
  - none
- Returns `string` — date string or empty

#### Usage
```php
$unsubscribeDate = $subscriber->unsubscribeReasonDate();
```

### hasAnyTagId($tagIds)

Check if a contact has any of the provided tags

- Parameters
  - $tagIds `array` of tag ids
- Returns `boolean`

#### Usage
```php
$isInTags = $subscriber->hasAnyTagId([1,2,3]);
```

### hasAnyListId($listIds)

Check if a contact has any of the provided lists

- Parameters
  - $listIds `array` of list ids
- Returns `boolean`

#### Usage
```php
$isInLists = $subscriber->hasAnyListId([1,2,3]);
```

### updateMeta($metaKey, $metaValue, $objectType)

Upsert a single meta record for the subscriber

- Parameters
  - $metaKey `string`
  - $metaValue `mixed`
  - $objectType `string`
- Returns `true`

#### Usage
```php
$subscriber->updateMeta('preference', 'weekly', 'custom');
```

### getMeta($metaKey, $objectType)

Retrieve a single meta value for the subscriber

- Parameters
  - $metaKey `string`
  - $objectType `string`
- Returns `mixed` or `false` if not found

#### Usage
```php
$value = $subscriber->getMeta('preference', 'custom');
```

### getWpUser()

Get WP User object if WordPress user exists for this contact

- Parameters
  - none
- Returns `\WP_User` or `false`

#### Usage
```php
$user = $subscriber->getWpUser();
```

### getWpUserId()

Get WordPress user ID for this contact

- Parameters
  - none
- Returns `int` or `null`

#### Usage
```php
$userId = $subscriber->getWpUserId();
```

### getSecureHash()

Get or generate a persistent secure hash for the subscriber (stored in meta)

- Parameters
  - none
- Returns `string`

#### Usage
```php
$secureHash = $subscriber->getSecureHash();
```

### trackEvent($eventData, $isUnique)

Track a custom event for this subscriber

- Parameters
  - $eventData `array` — event data (event_key, title, value, etc.)
  - $isUnique `boolean` — Default `false`
- Returns `mixed`

#### Usage
```php
$subscriber->trackEvent([
    'event_key' => 'purchase',
    'title' => 'Made a purchase',
    'value' => 99.99
]);
```

### attachLists($listIds)

Attach Lists to a Subscriber

- Parameters
  - $listIds `array`
- Returns `FluentCrm\App\Models\Subscriber`

#### Usage
```php
$subscriber->attachLists([1,2,3]);
```

### detachLists($listIds)

Remove Lists from a Subscriber

- Parameters
  - $listIds `array`
- Returns `FluentCrm\App\Models\Subscriber`

#### Usage
```php
$subscriber->detachLists([1,2,3]);
```

### attachTags($tagIds)
Attach Tags to a Subscriber

- Parameters
  - $tagIds `array`
- Returns `FluentCrm\App\Models\Subscriber`

#### Usage
```php
$subscriber->attachTags([1,2,3]);
```

### detachTags($tagIds)

Remove tags from a Subscriber

- Parameters
  - $tagIds `array`
- Returns `FluentCrm\App\Models\Subscriber`

#### Usage
```php
$subscriber->detachTags([1,2,3]);
```

### attachCompanies($companyIds)
Attach Companies to a Subscriber

- Parameters
  - $companyIds `array`
- Returns `FluentCrm\App\Models\Subscriber`

#### Usage
```php
$subscriber->attachCompanies([1,2,3]);
```

### detachCompanies($companyIds)

Remove companies from a Subscriber

- Parameters
  - $companyIds `array`
- Returns `FluentCrm\App\Models\Subscriber`

#### Usage
```php
$subscriber->detachCompanies([1,2,3]);
```

### lastActivityDate($activityName)

Get the most recent date for a specific activity type

- Parameters
  - $activityName `string` — `email_sent`, `email_opened`, or `email_link_clicked`
- Returns `string` date or `false`

#### Usage
```php
$lastSent = $subscriber->lastActivityDate('email_sent');
```

### mappables() <Badge type="tip" text="static" />

Get human-readable label map for all importable/mappable field keys

- Parameters
  - none
- Returns `array`

#### Usage
```php
$fieldMap = FluentCrm\App\Models\Subscriber::mappables();
```
