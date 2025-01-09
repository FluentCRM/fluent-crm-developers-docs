---
description: "Campaign Email Model represents the campaign email data in the database."
---

# Campaign Model

| DB Table Name | {wp_db_prefix}_fc_campaign_emails                                            |
|---------------|------------------------------------------------------------------------------|
| Schema        | <a :href="$withBase('/database/#fc-campaign-emails-table')">Check Schema</a> |
| Source File   | fluent-crm/app/Models/CampaignEmail.php                                      |
| Name Space    | FluentCrm\App\Models                                                         |
| Class         | FluentCrm\App\Models\CampaignEmail                                           |

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
         <th>campaign_id</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>email_type</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>subscriber_id</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>email_subject_id</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>email_address</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>email_subject</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>email_body</th>
         <td>Text</td>
         <td></td>
      </tr>
      <tr>
         <th>email_headers</th>
         <td>Text</td>
         <td></td>
      </tr>
      <tr>
         <th>is_open</th>
         <td>Boolean</td>
         <td></td>
      </tr>
      <tr>
         <th>is_parsed</th>
         <td>Boolean</td>
         <td></td>
      </tr>
      <tr>
         <th>click_counter</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>status</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>note</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>scheduled_at</th>
         <td>Date Time</td>
         <td></td>
      </tr>
      <tr>
         <th>email_hash</th>
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

$campaignEmail = FluentCrm\App\Models\CampaignEmail::find(1);

$campaignEmail->id; // returns id
$campaignEmail->email; // returns email
.......
```

## Relations
This model has the following relationships that you can use

### campaign
Access the associated campaign of a model

- return `FluentCrm\App\Models\Campaign` Model Collection

#### Example:
```php 
// Accessing Template
$campaign = $campaignEmail->campaign;

// For Filtering by template relationship

// Get CampaignEmails which has type: funnel_email_campaign
$campaignEmails = FluentCrm\App\Models\CampaignEmail::whereHas('campaign', function($query) {
    $query->where('type', 'funnel_email_campaign');
})->get();

// Get CampaignEmails which does not have type: funnel_email_campaign
$campaignEmails = FluentCrm\App\Models\CampaignEmail::whereDoesntHave('campaign', function($query) {
    $query->where('type', 'funnel_email_campaign');
})->get();

```

### subscriber
Access all the associated subscriber of a model

- return `FluentCrm\App\Models\Subscriber` Model Collections

#### Example:
```php 
// Accessing Subscriber
$subscriber = $campaignEmail->subscriber;

// For Filtering by tags relationship

// Get CampaignEmails which has first_name Demo
$campaignEmails = FluentCrm\App\Models\CampaignEmail::whereHas('subscriber', function($query) {
    $query->where('first_name', 'Demo');
})->get();

// Get CampaignEmails which does not have first_name Demo
$campaignEmails = FluentCrm\App\Models\CampaignEmail::whereDoesntHave('subscriber', function($query) {
    $query->where('first_name', 'Demo');
})->get();
```

### subject
Access all the associated subject of a model

- return `FluentCrm\App\Models\Subject` Model Collections

#### Example:
```php 
// Access all the associated subject of a model
$subject = $campaignEmail->subject;
```

<hr />

## Methods
Along with Global Model methods, this model has few helper methods.

### markAs($status)
Update campaign email status

- Parameters
  - $status `string`
- Returns `FluentCrm\App\Models\CampaignEmail`

#### Usage
```php 
$campaignEmail = $campaignEmail->markAs('sent');
```

### markAsSent()
Update campaign email status to 'sent' 

- Parameters
  - none
- Returns `FluentCrm\App\Models\CampaignEmail`

#### Usage
```php 
$campaignEmail = $campaignEmail->markAsSent();
```

### markAsFailed()
Update campaign email status to 'failed'

- Parameters
  - none
- Returns `FluentCrm\App\Models\CampaignEmail`

#### Usage
```php 
$campaignEmail = $campaignEmail->markAsFailed();
```


### data()
Get data for the email to be sent

- Parameters
  - none
- Returns `array`

#### Usage
```php 
$emailData = $campaignEmail->data();
```

### previewData()
Preview data for the email to be sent

- Parameters
  - none
- Returns `array` 

#### Usage
```php 
$emailData = $campaignEmail->previewData();
```

### getEmailSubject()
Get the subject of email

- Parameters
  - none
- Returns `string`

#### Usage
```php 
$subject = $campaignEmail->getEmailSubject();
```

### getEmailBody()
Get the email body (actual html code) of email

- Parameters
  - none
- Returns `text`

#### Usage
```php 
$emailBody = $campaignEmail->getEmailBody();
```

### getCampaignUrls()
Get the urls which are shared in an email model

- Parameters
  - none
- Returns `array` list of urls

#### Usage
```php 
$urls = $campaignEmail->getCampaignUrls();
```

### getClicks()
Get the click counts of an email 

- Parameters
  - none
- Returns `array`

#### Usage
```php 
$totalClicks = $campaignEmail->getClicks();
```

### getSubjectCount($campaignId)
Get the total subject of a campaign of email

- Parameters
  - $campaignId `int` 
- Returns `object`

#### Usage
```php 
$result = $campaignEmail->getSubjectCount(1);
```

### getOpenCount()
Get the open count of an email

- Parameters
  - none
- Returns `int`

#### Usage
```php 
$openCount = $campaignEmail->getOpenCount();
```