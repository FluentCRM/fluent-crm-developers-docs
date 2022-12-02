::: details fluent_crm/contact_created
This action runs when a contact created

**Parameters**
- $subscriber Subscriber Model

**Usage:**
```php 
add_action('fluent_crm/contact_created', function($subscriber) {
   // Do whatever you want with the newly created $subscriber
});
```
:::

::: details fluent_crm/contact_updated
This action runs when a contact created

**Parameters**
- $subscriber Subscriber Model

**Usage:**
```php 
add_action('fluent_crm/contact_updated', function($subscriber) {
   // Do whatever you want with the newly created $subscriber
});
```
:::

::: details fluentcrm_contact_added_to_tags
This action runs when tags have been added to a contact

**Parameters**
- `$attachedTagIds` array of tag ids that has been added to the contact
- `$subscriber` Subscriber Model

**Usage:**
```php 
add_action('fluentcrm_contact_added_to_tags', function($tagIds, $subscriber) {
   // Do whatever you want here
}, 10, 2);
```
:::

::: details fluentcrm_contact_added_to_lists
This action runs when lists have been added to a contact

**Parameters**
- `$attachedListIds` array of list ids that has been added to the contact
- `$subscriber` Subscriber Model

**Usage:**
```php 
add_action('fluentcrm_contact_added_to_lists', function($attachedListIds, $subscriber) {
   // Do whatever you want with here
}, 10, 2);
```
:::

::: details fluentcrm_contact_removed_from_tags
This action runs when tags have been removed from a contact

**Parameters**
- `$detachedTagIds` array of tag ids that has been removed from the contact
- `$subscriber` Subscriber Model

**Usage:**
```php 
add_action('fluentcrm_contact_removed_from_tags', function($detachedTagIds, $subscriber) {
   // Do whatever you want with here
}, 10, 2);
```
:::

::: details fluentcrm_contact_removed_from_lists
This action runs when lists have been removed from a contact

**Parameters**
- `$detachedListIds` array of list ids that has been removed from the contact
- `$subscriber` Subscriber Model

**Usage:**
```php 
add_action('fluentcrm_contact_removed_from_lists', function($detachedListIds, $subscriber) {
   // Do whatever you want with here
}, 10, 2);
```
:::

::: details fluentcrm_subscriber_status_to_{$new_status}
This action hook fires when a subscriber's status has been changed to a new status

**Possible Hooks**
- `fluentcrm_subscriber_status_to_subscribed`
- `fluentcrm_subscriber_status_to_unsubscribed`
- `fluentcrm_subscriber_status_to_pending`
- `fluentcrm_subscriber_status_to_bounced`
- `fluentcrm_subscriber_status_to_complained`

**Parameters**
- `$subscriber` Subscriber Model
- `$oldStatus` string - old status of the contact (eg: subscribed |
  unsubscribed | pending | bounced | complained)

**Usage:**
```php 
add_action('fluentcrm_subscriber_status_to_subscribed', function($subscriber, $oldStatus) {
   // the subscriber got subscribed status. You can do run your code here
}, 10, 2);
```
:::

::: details fluent_crm/subscriber_unsubscribed_from_web_ui
This action hook fires when a subscriber unsubscribe from web UI. Please note that `fluentcrm_subscriber_status_to_unsubscribed` action also fire before this action.

**Parameters**
- `$subscriber` Subscriber Model
- `$postedData` array - post data of the unsubscribe form as key value pair

**Usage:**
```php 
add_action('fluent_crm/subscriber_unsubscribed_from_web_ui', function($subscriber, $data) {
   // the contact unsubscribed from web UI. Do your staffs here
}, 10, 2);
```
:::

::: details fluent_crm/subscribed_confirmed_via_double_optin
This action hook fires when a subscriber do double optin by clicking DOI link. Please note that `fluentcrm_subscriber_status_to_subscribed` action also fire before this action.

**Parameters**
- `$subscriber` Subscriber Model

**Usage:**
```php 
add_action('fluent_crm/subscriber_unsubscribed_from_web_ui', function($subscriber) {
   // the contact condired the subscription from web UI.
});
```
:::

::: details fluentcrm_subscriber_contact_type_to_{$new_type}
This action hook fires when a subscriber's contact_type has been changed to a new type

**Possible Hooks**
- `fluentcrm_subscriber_contact_type_to_lead`
- `fluentcrm_subscriber_contact_type_to_customer`

**Parameters**
- `$subscriber` Subscriber Model
- `$oldType` string - old type of the contact (eg: lead | customer)

**Usage:**
```php 
add_action('fluentcrm_subscriber_contact_type_to_customer', function($subscriber, $oldType) {
   // the conact's type changed to customer. You can do run your code here
}, 10, 2);
```
:::

::: details fluent_crm/contact_email_changed
This action hook fires when a subscriber's has been changed to a new email address


**Parameters**
- `$subscriber` Subscriber Model
- `$oldEmail` string - Old Email Address

**Usage:**
```php 
add_action('fluent_crm/contact_email_changed', function($subscriber, $oldEmail) {
   // the conact's email changed. You can do run your code here
}, 10, 2);
```
:::
