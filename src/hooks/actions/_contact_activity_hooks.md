<explain-block title="fluencrm_benchmark_link_clicked">
This action runs when a contact created

**Parameters**
- `$benchmarkLinkId` INT - Benchmark ID
- `$subscriber` Subscriber Model or Null if not contact found

**Usage:**
```php 
add_action('fluencrm_benchmark_link_clicked', function($benchmarkLinkId, $subscriber) {
   // Do you staffs here
});
```
</explain-block>

<explain-block title="fluent_crm/smart_link_clicked_by_contact">
This action runs when a contact clicks a smartlink. This hook fires after the associate tags, lists actions fired.

**Parameters**
- `$smartLink` SmartLink Model
- `$subscriber` Subscriber Model

**Usage:**
```php 
add_action('fluent_crm/smart_link_clicked_by_contact', function($smartLink, $subscriber) {
   // Do you staffs here
});
```
</explain-block>

<explain-block title="fluent_crm/email_url_clicked">
This action runs when a contact clicks a link from email.

**Parameters**
- `$campaignEmail` CampaignEmail Model
- `$urlObject` Url Object

**Usage:**
```php 
add_action('fluent_crm/email_url_clicked', function($campaignEmail, $urlObject) {
   // Do you staffs here
});
```
</explain-block>

<explain-block title="fluent_crm/track_activity_by_subscriber">
This action runs when a contact login to your site, click a link. This hook track the last_activity timestamp

**Parameters**
- `$subscriber` INT|Subscriber Model, When use please check if it's a 

**Usage:**
```php 
add_action('fluent_crm/track_activity_by_subscriber', function($subscriber) {
   if(is_numeric($subscriber)) {
     $subscriber = fluentCrmApi('contacts')->getContact($subscriber);
   }
   
   // Do you staffs
});
```
</explain-block>

<explain-block title="fluent_crm/pref_form_self_contact_updated">
This action runs when a contact update his/her information in the manage subscriptions page

**Parameters**
- `$subscriber` Subscriber Model
- `$postedData` Array - key value pairs of data filled in the web form.

**Usage:**
```php 
add_action('fluent_crm/pref_form_self_contact_updated', function($subscriber, $postedData) {
   // Do you staffs
}, 10, 2);
```
</explain-block>
