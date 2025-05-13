<explain-block title="fluent_crm/before_contact_unsubscribe_from_email">
This action runs just after a contact unsubscribes by clicking the unsubscribe link in an email or from the email header.

**Parameters**
- `$subscriber` Subscriber Model
- `$campaignEmail` CampaignEmail Model or null
- `$scope` string 'from_header' / 'web_ui'

**Usage:**
```php 
add_action('fluent_crm/before_contact_unsubscribe_from_email', function($subscriber, $campaignEmail, $scope) {
   // Do you staffs here
}, 10, 3);
```

**Example:**

Unsubscribe a user from a specific lists instead of globally depends on the sending lists (If only Lists are being selected when sending)

```php
add_action('fluent_crm/before_contact_unsubscribe_from_email', function($subscriber, $campaignEmail, $scope) {
   // Do you staffs here
   if(!$campaignEmail || !$campaignEmail->campaign) {
        return false; // the campaign email or the campaign is not availble
   }
   
   $settings = $campaignEmail->campaign->settings;

    $sendingType = \FluentCrm\Framework\Support\Arr::get($settings, 'sending_filter');

    if($sendingType != 'list_tag') {
        return false; // this campaign is not using list tag
    }

    $sendingListIds = [];

    foreach ($settings['subscribers'] as $segment) {
        $sendingListIds[] = \FluentCrm\Framework\Support\Arr::get($segment, 'list', 0);
    }

    $sendingListIds = array_values(array_filter(array_unique($sendingListIds)));
    $sendingListIds = array_map('intval', $sendingListIds);
    if(empty($sendingListIds)) {
        return false; // no list ids found
    }
    
    // We will now, remove the lists from the $subscriber object
    $subscriber->detachLists($sendingListIds);

    wp_send_json_success([
        'message'      => 'You are unsubscribed from the lists',
        'redirect_url' => ''// provide a redirect url if you want
    ], 200);
   
}, 10, 3);
```

</explain-block>
