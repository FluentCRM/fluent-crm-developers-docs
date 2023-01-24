<explain-block title="fluent_crm/campaign_created">
This action runs after a campaign has been created

**Parameters**
- `$campaign` Campaign Model

**Usage:**
```php 
add_action('fluent_crm/campaign_created', function($campaign) {
   // Do you staffs here
});
```
</explain-block>

<explain-block title="fluent_crm/campaign_data_updated">
This action runs after a campaign has been updated

**Parameters**
- `$campaign` Campaign Model
- `$postedData` Array - Update data

**Usage:**
```php 
add_action('fluent_crm/campaign_data_updated', function($campaign, $postedData) {
   // Do you staffs here
}, 10, 2);
```
</explain-block>

<explain-block title="fluent_crm/campaign_deleted">
This action runs after a campaign has been deleted

**Parameters**
- `$campaignId` INT - deleted campaign ID

**Usage:**
```php 
add_action('fluent_crm/campaign_data_updated', function($campaignId) {
   // Do you staffs here
});
```
</explain-block>

<explain-block title="fluent_crm/campaign_duplicated">
This action runs after a campaign has been duplicated

**Parameters**
- `$newCampaign` Campaign Model - New Campaign Model
- `$oldCampaign` Campaign Model - Old Campaign Model

**Usage:**
```php 
add_action('fluent_crm/campaign_duplicated', function($newCampaign, $oldCampaign) {
   // Do you staffs here
}, 10, 2);
```
</explain-block>

<explain-block title="fluent_crm/campaign_recipients_query_updated">
This action runs when recipients is being updated 

**Parameters**
- `$campaign` Campaign Model

**Usage:**
```php 
add_action('fluent_crm/campaign_recipients_query_updated', function($campaign) {
   // Do you staffs here
});
```
</explain-block>

<explain-block title="fluent_crm/campaign_scheduled">
This action runs when a campaign is being scheduled

**Parameters**
- `$campaign` Campaign Model
- `$scheduleAt` Date Time (Y-m-d H:i:s format)

**Usage:**
```php 
add_action('fluent_crm/campaign_scheduled', function($campaign, $scheduleAt) {
   // Do you staffs here
}, 10, 2);
```
</explain-block>

<explain-block title="fluent_crm/campaign_set_send_now">
This action runs when a campaign is set to sent immediately

**Parameters**
- `$campaign` Campaign Model

**Usage:**
```php 
add_action('fluent_crm/campaign_set_send_now', function($campaign) {
   // Do you staffs here
});
```
</explain-block>

<explain-block title="fluent_crm/campaign_processing_start">
This action runs when emails of a campaigns are being started 

**Parameters**
- `$campaign` Campaign Model

**Usage:**
```php 
add_action('fluent_crm/campaign_processing_start', function($campaign) {
   // Do you staffs here
});
```
</explain-block>
