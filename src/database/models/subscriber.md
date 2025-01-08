---
description: "Explore the Subscriber Model in FluentCRM, designed to manage and organize your contacts effectively."
---

# Subscriber Model

| DB Table Name | {wp_db_prefix}_fc_subscribers                                            |
|---------------|--------------------------------------------------------------------------|
| Schema        | <a :href="$withBase('/database/#fc-subscribers-table')">Check Schema</a> |
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
         <td></td>
      </tr>
      <tr>
         <th>hash</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>contact_owner</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>company_id</th>
         <td>Integer</td>
         <td></td>
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
         <td></td>
      </tr>
      <tr>
         <th>contact_type</th>
         <td>String</td>
         <td></td>
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
         <td>concat of first_name and last_name</td>
      </tr>
      <tr>
         <th>photo</th>
         <td>String / URL</td>
         <td>avatar image url</td>
      </tr>
   </tbody>
</table>

## Usage

Please check <a href="/database/models/">Model Basic</a> for Common methods.

### Accessing Attributes

```php 

$subscriber = FluentCrm\App\Models\Subscriber::find(1);

$subsctiber->id; // returns id
$subscriber->email; // returns email
.......
```

## Fillable Attributes

```php

'hash',
'prefix',
'first_name',
'last_name',
'user_id',
'email',
'status', // pending | subscribed | bounced | unsubscribed; Default: subscriber
'contact_type', // lead | customer
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

Apply full text search to basic data attributes
`email`,`first_name`, `last_name`, `address_line_1`, `address_line_2`, `postal_code`, `city`, `state`, `country`, `phone`,`status`

- Parameters
  - $search - String
  - $custom_fields - Boolean, Default `false`. If true then it will search in Custom Field Too
#### Usage: 

```php 
// Search all contacts to match "John"
$subscribers = FluentCrm\App\Models\Subscriber::searchBy('John')->get();
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

Filter contacts by tag attributes
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


## Relations
This model has the following relationships that you can use

### tags
Access all the associated tag of a model

- return FluentCrm\App\Models\Tag Model Collections

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

- return FluentCrm\App\Models\List Model Collections

#### Example:
```php 
// Accessing Lists
$subscriberLists = $subscriber->lists;

// For Filtering by tags relationship

// Get Subscribers which has list ids: 1/2/3
$subscribers = FluentCrm\App\Models\Subscriber::whereHas('lists', function($query) {
    $query->whereIn('id', [1,2,3]);
})->get();

// Get Subscribers which does not have list ids: 1/2/3
$subscribers = FluentCrm\App\Models\Subscriber::whereDoesntHave('lists', function($query) {
    $query->whereIn('id', [1,2,3]);
})->get();
```

### sequences
Access all the associated email sequences of a model

- return `FluentCrm\App\Models\Sequence` Model Collections

#### Example:
```php 
// Accessing All the email sequences of subscriber
$subscriberEmailSequences = $subscriber->sequences;
```

### sequence_trackers
Access all the associated email sequence trackers of a Subscriber model

- return `FluentCrm\App\Models\SequenceTracker` Model Collections

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
// Accessing All the automation funnel tracking of subscriber
$subscriberEmailCollections = $subscriber->campaignEmails;
```

<hr />

## Methods
Along with Global Model methods, this model has few helper methods.

### custom_fields()

Get custom fields data of a contact

- Parameters
  - none
- Returns `Array`

#### Usage
```php 
$customData = $subscriber->custom_fields();
```

### stats

Get Contact's sent emails, opens and clicks count

- Parameters
  - none
- Returns `Array`

#### Usage
```php 
$contactStats = $subscriber->stats();
```

### sendDoubleOptinEmail()

Send Double Optin email if contact is in pending status

- Parameters
  - none
- Returns `boolean`

#### Usage
```php 
$subscriber->sendDoubleOptinEmail();
```

### unsubscribeReason()

Get Unsubscribe reason if contact unsubscribe and provide feedback

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
- Returns `date` string or empty 

#### Usage
```php 
$sunsubscribeDate = $subscriber->unsubscribeReasonDate();
```

### hasAnyTagId()

Check if a contact is any of the provided tag

- Parameters
  - $tagIds array of tag ids
- Returns `boolean`

#### Usage
```php 
$isInTags = $subscriber->hasAnyTagId([1,2,3]);
```

### hasAnyListId()

Check if a contact is any of the provided list

- Parameters
  - $listIds array of list ids
- Returns `boolean`

#### Usage
```php 
$isInLists = $subscriber->hasAnyListId([1,2,3]);
```

### getWpUser()

Get WP User object if WordPress user exist of that contact

- Parameters
  - none
- Returns \WP_User or null

#### Usage
```php 
$user = $subscriber->getWpUser();
```

### getWpUserId()

Get WP User object if WordPress user exist of that contact

- Parameters
  - none
- Returns INT or null

#### Usage
```php 
$userId = $subscriber->getWpUserId();
```

### attachLists($listIds)

Attach Lists to a Subscriber

- Parameters
  - $listIds array 
- Returns `FluentCrm\App\Models\Subscriber`

#### Usage
```php 
$subscriber->attachLists([1,2,3]);
```

### detachLists($listIds)

Remove Lists from a Subscriber

- Parameters
  - $listIds array
- Returns `FluentCrm\App\Models\Subscriber`

#### Usage
```php 
$subscriber->detachLists([1,2,3]);
```

### attachTags($tagIds)
Attach Tags to a Subscriber

- Parameters
  - $tagIds array
- Returns `FluentCrm\App\Models\Subscriber`

#### Usage
```php 
$subscriber->attachTags([1,2,3]);
```

### detachTags($tagIds)

Remove tags from a Subscriber

- Parameters
  - $tagIds array
- Returns `FluentCrm\App\Models\Subscriber`

#### Usage
```php 
$subscriber->detachTags([1,2,3]);
```
