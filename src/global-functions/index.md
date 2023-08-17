## Global Functions

FluentCRM has few global functions which are located at `app/functions/helpers.php` file.
In this article, we are documenting few useful functions that you may use. For full understanding, please check the `app/functions/helpers.php` file 

[[toc]]

### fluentcrm_get_option($optionName, $default = '') : mixed
Get FluentCRM Option. This is similar to WordPress's `get_option()` function but it use it's own database table instead of `wp_options` table

**Parameters**
- $optionName `string` required
- $default `mixed`

**Return** `mixed`


### fluentcrm_update_option($optionName, $default = '') : int
Update FluentCRM Option. This is similar to WordPress's `update_option()` function but it use it's own database table instead of `wp_options` table

**Parameters**
- $optionName `string` required
- $value `mixed`

**Return** INT updated uption id

### fluentcrm_delete_option($optionName) : boolean
Delete FluentCRM Option. This is similar to WordPress's `delete_option()` function but it use it's own database table instead of `wp_options` table

**Parameters**
- $optionName `string` required

**Return** boolean


### fluentcrm_get_campaign_meta($campaignId, $key, $returnValue = false) : mixed
Get Campaign Meta value or Model by campaign id and key

**Parameters**
- $campaignId `int` required
- $key `string` required
- $returnValue `boolean' If true then it will return the value otherwise returns Meta Model

**Return** mixed

### fluentcrm_update_campaign_meta($campaignId, $key, $value) : \FluentCrm\App\Models\Meta
Update Campaign Meta

**Parameters**
- $campaignId `int` required
- $key `string` required, Meta Key of the campaign
- $value `mixed' 

**Return** \FluentCrm\App\Models\Meta Model

### fluentcrm_delete_campaign_meta($campaignId, $key) : Boolean
Delete Campaign Meta

**Parameters**
- $campaignId `int` required
- $key `string` required, Meta Key of the campaign

**Return** Boolean

### fluentcrm_get_subscriber_meta($subscriberId, $key, $deafult = '') : mixed
Get Contact's Meta Value

**Parameters**
- $subscriberId `int` required
- $key `string` required, Meta Key of the subscriber
- $deafult `mixed` default value if no meta found

**Return** mixed


### fluentcrm_update_subscriber_meta($subscriberId, $key, $value) : \FluentCrm\App\Models\SubscriberMeta
Update Contact's Meta Value

**Parameters**
- $subscriberId `int` required
- $key `string` required, Meta Key of the subscriber
- $value `mixed` value of the meat

**Return** \FluentCrm\App\Models\SubscriberMeta


### fluentcrm_delete_subscriber_meta($subscriberId, $key) : Boolean
Delete Subscriber's Meta

**Parameters**
- $subscriberId `int` required
- $key `string` required, Meta Key of the campaign

**Return** Boolean


### fluentcrm_subscriber_statuses($isOptions = false) : array
Get Contact Statuses.

**Parameters**
- $isOptions `boolean` if true then it will return as options structure array with `id`, `slug`, `title` properties

**Return** array

Example: 
```php 
fluentcrm_subscriber_statuses();
//returns
[
    'subscribed',
    'pending',
    'unsubscribed',
    'bounced',
    'complained'
]

fluentcrm_subscriber_statuses(true);
// returns
[
    [
        'id' => 'subscribed',
        'title' => 'Subscribed',
        'slug' => 'subscribed'
    ],
    .....,
    .....
]
```

**Available Filter Hook:** `fluent_crm/contact_statuses`

### fluentcrm_subscriber_editable_statuses($isOptions = false) : array
Get Contact Statuses except `bounced` and `complained`

**Parameters**
- $isOptions `boolean` if true then it will return as options structure array with `id`, `slug`, `title` properties

**Return** array

**Available Filter Hook:** `fluent_crm/contact_editable_statuses`

### fluentcrm_contact_types($isOptions = false) : array
Get Contact Types as array

**Parameters**
- $isOptions `boolean` if true then it will return as options structure array with `id`, `slug`, `title` properties

**Return** array

Example:
```php 
fluentcrm_contact_types();
//returns
[
    'lead'     => 'Lead',
    'customer' => 'Customer'
]

fluentcrm_contact_types(true);
// returns
[
    [
        'id' => 'lead',
        'title' => 'Lead',
        'slug' => 'lead'
    ],
    .....
]

```

**Available Filter Hook:** `fluentcrm_contact_types`


### fluentcrm_activity_types() : array
Get Contact Note Activity Types items as array

**Return** array

Source:
```php 
function fluentcrm_activity_types()
{
    return apply_filters('fluentcrm_contact_activity_types', [
        'note'              => __('Note', 'fluent-crm'),
        'call'              => __('Call', 'fluent-crm'),
        'email'             => __('Email', 'fluent-crm'),
        'meeting'           => __('Meeting', 'fluent-crm'),
        'quote_sent'        => __('Quote: Sent', 'fluent-crm'),
        'quote_accepted'    => __('Quote: Accepted', 'fluent-crm'),
        'quote_refused'     => __('Quote: Refused', 'fluent-crm'),
        'invoice_sent'      => __('Invoice: Sent', 'fluent-crm'),
        'invoice_part_paid' => __('Invoice: Part Paid', 'fluent-crm'),
        'invoice_paid'      => __('Invoice: Paid', 'fluent-crm'),
        'invoice_refunded'  => __('Invoice: Refunded', 'fluent-crm'),
        'transaction'       => __('Transaction', 'fluent-crm'),
        'feedback'          => __('Feedback', 'fluent-crm'),
        'tweet'             => __('Tweet', 'fluent-crm'),
        'facebook_post'     => __('Facebook Post', 'fluent-crm')
    ]);
}
```
**Available Filter Hook:** `fluentcrm_contact_activity_types`

### fluentcrm_get_current_contact(): null|object \FluentCrm\App\Models\Subscriber
Get Current Contact based on the current userID or contact from the cookie value

**@return** `false|object` \FluentCrm\App\Models\Subscriber

### fluentcrm_get_crm_profile_html($userIdOrEmail, $checkPermission = true, $withCss = true): string
Get FluentCRM's contact profile widget HTML

**Parameters**
- $userIdOrEmail `int|string` User ID or email address of the contact
- $checkPermission `boolean` Whether to check current user's permission
- $withCss `boolean` Whether to include CSS


**@return** `false|string` HTML of the contact's profile widget

### fluentcrm_get_custom_contact_fields() : array
Get Custom Fields schema for contacts


### fluentCrmGetContactSecureHash($subscriberId) : string
Get unique long hash of a contact which can be used to identify the contact for various usage when is not logged in.

