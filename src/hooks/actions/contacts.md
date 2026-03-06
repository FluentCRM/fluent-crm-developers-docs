---
description: "Action hooks related to contact/subscriber lifecycle events in FluentCRM."
---

# Contact Hooks

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These action hooks fire during contact lifecycle events — creation, updates, tag/list changes, status transitions, notes, and more.

## Contact Created & Updated

### `fluent_crm/contact_created`

This action runs when a new contact is created.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_action('fluent_crm/contact_created', function($subscriber) {
   // Do whatever you want with the newly created $subscriber
});
```

**Source:** `app/Models/Subscriber.php`

---

### `fluent_crm/contact_updated`

This action runs when a contact is updated.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$dirtyFields` Array - the fields that were changed

**Usage:**
```php
add_action('fluent_crm/contact_updated', function($subscriber, $dirtyFields) {
   // $dirtyFields contains the changed field values
}, 10, 2);
```

**Source:** `app/Models/Subscriber.php`, `app/Http/Controllers/SubscriberController.php`

---

### `fluent_crm/contact_updated_with_changes`

This action provides detailed change tracking, including both old and new values. Fires when a contact is updated via the admin UI or Fluent Forms.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$dirtyFields` Array - changed fields (or custom field values)
- `$oldData` Mixed - original data before changes ([Subscriber Model](/database/models/subscriber) or old custom fields array)
- `$meta` Array - context info e.g. `['source' => 'web', 'type' => 'all_fields']`

**Usage:**
```php
add_action('fluent_crm/contact_updated_with_changes', function($subscriber, $dirtyFields, $oldData, $meta) {
   if ($meta['type'] === 'custom_fields_only') {
       // Only custom fields were changed
   }
   // Compare $dirtyFields with $oldData for detailed change tracking
}, 10, 4);
```

**Source:** `app/Http/Controllers/SubscriberController.php`

---

### `fluent_crm/contact_custom_data_updated`

This action runs when a contact's custom field values are updated.

**Parameters**
- `$newValues` Array - new custom field values
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$updateValues` Array - the values that were actually updated

**Usage:**
```php
add_action('fluent_crm/contact_custom_data_updated', function($newValues, $subscriber, $updateValues) {
   // React to custom field changes
}, 10, 3);
```

**Source:** `app/Models/Subscriber.php`

---

### `fluent_crm/contact_email_changed`

This action hook fires when a subscriber's email has been changed to a new email address.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$oldEmail` string - Old Email Address

**Usage:**
```php
add_action('fluent_crm/contact_email_changed', function($subscriber, $oldEmail) {
   // the contact's email changed. You can run your code here
}, 10, 2);
```

**Source:** `app/Models/Subscriber.php`, `app/Http/Controllers/SubscriberController.php`

---

### `fluent_crm/subscriber_avatar_update`

This action fires when a contact's avatar is updated via the admin profile editor.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$oldValue` string - previous avatar URL

**Usage:**
```php
add_action('fluent_crm/subscriber_avatar_update', function($subscriber, $oldValue) {
   // Avatar was changed
}, 10, 2);
```

**Source:** `app/Http/Controllers/SubscriberController.php`

---

## Tags & Lists Assignment

### `fluent_crm/contact_added_to_tags`

This action runs when tags have been added to a contact.

> **Note:** The legacy hook `fluentcrm_contact_added_to_tags` also fires with reversed parameter order: `($tagIds, $subscriber)`.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$attachedTagIds` Array - tag IDs that were added

**Usage:**
```php
add_action('fluent_crm/contact_added_to_tags', function($subscriber, $tagIds) {
   // Do whatever you want here
}, 10, 2);
```

**Source:** `app/Models/Subscriber.php`

---

### `fluent_crm/contact_added_to_lists`

This action runs when lists have been added to a contact.

> **Note:** The legacy hook `fluentcrm_contact_added_to_lists` also fires with reversed parameter order: `($listIds, $subscriber)`.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$attachedListIds` Array - list IDs that were added

**Usage:**
```php
add_action('fluent_crm/contact_added_to_lists', function($subscriber, $listIds) {
   // Do whatever you want here
}, 10, 2);
```

**Source:** `app/Models/Subscriber.php`

---

### `fluent_crm/contact_removed_from_tags`

This action runs when tags have been removed from a contact.

> **Note:** The legacy hook `fluentcrm_contact_removed_from_tags` also fires with reversed parameter order: `($tagIds, $subscriber)`.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$detachedTagIds` Array - tag IDs that were removed

**Usage:**
```php
add_action('fluent_crm/contact_removed_from_tags', function($subscriber, $tagIds) {
   // Do whatever you want here
}, 10, 2);
```

**Source:** `app/Models/Subscriber.php`

---

### `fluent_crm/contact_removed_from_lists`

This action runs when lists have been removed from a contact.

> **Note:** The legacy hook `fluentcrm_contact_removed_from_lists` also fires with reversed parameter order: `($listIds, $subscriber)`.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$detachedListIds` Array - list IDs that were removed

**Usage:**
```php
add_action('fluent_crm/contact_removed_from_lists', function($subscriber, $listIds) {
   // Do whatever you want here
}, 10, 2);
```

**Source:** `app/Models/Subscriber.php`

---

## Status Changes

### `fluent_crm/subscriber_status_changed`

This action fires whenever a subscriber's status changes, providing both old and new status values. This is the general status change hook — the dynamic hook below also fires alongside it.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$oldStatus` string - previous status
- `$newStatus` string - new status

**Usage:**
```php
add_action('fluent_crm/subscriber_status_changed', function($subscriber, $oldStatus, $newStatus) {
   // React to any status change
}, 10, 3);
```

**Source:** `app/Models/Subscriber.php`

---

### `fluentcrm_subscriber_status_to_{$new_status}`

This dynamic action hook fires when a subscriber's status has been changed to a specific new status.

**Possible Hooks**
- `fluentcrm_subscriber_status_to_subscribed`
- `fluentcrm_subscriber_status_to_unsubscribed`
- `fluentcrm_subscriber_status_to_pending`
- `fluentcrm_subscriber_status_to_bounced`
- `fluentcrm_subscriber_status_to_complained`

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$oldStatus` string - old status of the contact

**Usage:**
```php
add_action('fluentcrm_subscriber_status_to_subscribed', function($subscriber, $oldStatus) {
   // the subscriber got subscribed status. You can run your code here
}, 10, 2);
```

**Source:** `app/Models/Subscriber.php`

---

### `fluent_crm/subscriber_unsubscribed_from_web_ui`

This action hook fires when a subscriber unsubscribes from the web UI. Please note that `fluentcrm_subscriber_status_to_unsubscribed` also fires before this action.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$postedData` array - post data of the unsubscribe form as key value pair

**Usage:**
```php
add_action('fluent_crm/subscriber_unsubscribed_from_web_ui', function($subscriber, $data) {
   // the contact unsubscribed from web UI. Do your stuff here
}, 10, 2);
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

### `fluent_crm/subscriber_confirmed_via_double_optin`

This action hook fires when a subscriber confirms via double optin by clicking the DOI link. Please note that `fluentcrm_subscriber_status_to_subscribed` also fires before this action.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_action('fluent_crm/subscriber_confirmed_via_double_optin', function($subscriber) {
   // the contact confirmed the subscription via double optin
});
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

### `fluent_crm/subscriber_sms_status_changed`

This action fires when a subscriber's SMS status is changed.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$oldStatus` string - previous SMS status
- `$newStatus` string - new SMS status

**Usage:**
```php
add_action('fluent_crm/subscriber_sms_status_changed', function($subscriber, $oldStatus, $newStatus) {
   // SMS status changed
}, 10, 3);
```

**Source:** `app/Http/Controllers/SubscriberController.php`

---

## Contact Type Changes

### `fluentcrm_subscriber_contact_type_to_{$new_type}`

This action hook fires when a subscriber's contact_type has been changed to a new type.

**Possible Hooks**
- `fluentcrm_subscriber_contact_type_to_lead`
- `fluentcrm_subscriber_contact_type_to_customer`

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$oldType` string - old type of the contact (eg: lead | customer)

**Usage:**
```php
add_action('fluentcrm_subscriber_contact_type_to_customer', function($subscriber, $oldType) {
   // the contact's type changed to customer. You can run your code here
}, 10, 2);
```

**Source:** `app/Http/Controllers/SubscriberController.php`

---

## Unsubscribe from Email

### `fluent_crm/before_contact_unsubscribe_from_email`

This action runs just after a contact unsubscribes by clicking the unsubscribe link in an email or from the email header.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$campaignEmail` [CampaignEmail Model](/database/models/campaign-email) or null
- `$scope` string - `'from_header'` or `'web_ui'`

**Usage:**
```php
add_action('fluent_crm/before_contact_unsubscribe_from_email', function($subscriber, $campaignEmail, $scope) {
   // Do your stuff here
}, 10, 3);
```

**Example:**

Unsubscribe a user from specific lists instead of globally, depending on the sending lists:

```php
add_action('fluent_crm/before_contact_unsubscribe_from_email', function($subscriber, $campaignEmail, $scope) {
   if(!$campaignEmail || !$campaignEmail->campaign) {
        return false;
   }

   $settings = $campaignEmail->campaign->settings;
   $sendingType = \FluentCrm\Framework\Support\Arr::get($settings, 'sending_filter');

   if($sendingType != 'list_tag') {
        return false;
   }

   $sendingListIds = [];
   foreach ($settings['subscribers'] as $segment) {
        $sendingListIds[] = \FluentCrm\Framework\Support\Arr::get($segment, 'list', 0);
   }

   $sendingListIds = array_values(array_filter(array_unique($sendingListIds)));
   $sendingListIds = array_map('intval', $sendingListIds);
   if(empty($sendingListIds)) {
        return false;
   }

   $subscriber->detachLists($sendingListIds);

   wp_send_json_success([
        'message'      => 'You are unsubscribed from the lists',
        'redirect_url' => ''
   ], 200);
}, 10, 3);
```

**Source:** `app/Hooks/Handlers/ExternalPages.php`

---

## Contact Notes

### `fluent_crm/note_added`

This action fires when a note is added to a contact.

**Parameters**
- `$subscriberNote` [SubscriberNote Model](/database/models/subscriber-note)
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$note` Array - note data

**Usage:**
```php
add_action('fluent_crm/note_added', function($subscriberNote, $subscriber, $note) {
   // A note was added to the contact
}, 10, 3);
```

**Source:** `app/Http/Controllers/SubscriberController.php`

---

### `fluent_crm/note_updated`

This action fires when a contact note is updated.

**Parameters**
- `$subscriberNote` [SubscriberNote Model](/database/models/subscriber-note)
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$note` Array - updated note data

**Usage:**
```php
add_action('fluent_crm/note_updated', function($subscriberNote, $subscriber, $note) {
   // A contact note was updated
}, 10, 3);
```

**Source:** `app/Http/Controllers/SubscriberController.php`

---

### `fluent_crm/note_delete`

This action fires when a contact note is deleted.

**Parameters**
- `$noteId` INT - Note ID
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_action('fluent_crm/note_delete', function($noteId, $subscriber) {
   // A contact note was deleted
}, 10, 2);
```

**Source:** `app/Http/Controllers/SubscriberController.php`

---

## Bulk Deletion

### `fluentcrm_before_subscribers_deleted`

This action fires before contacts are deleted in bulk.

**Parameters**
- `$contactIds` Array - IDs of contacts about to be deleted

**Usage:**
```php
add_action('fluentcrm_before_subscribers_deleted', function($contactIds) {
   // Clean up related data before contacts are deleted
});
```

**Source:** `app/Services/Helper.php`

---

### `fluentcrm_after_subscribers_deleted`

This action fires after contacts have been deleted in bulk.

**Parameters**
- `$contactIds` Array - IDs of contacts that were deleted

**Usage:**
```php
add_action('fluentcrm_after_subscribers_deleted', function($contactIds) {
   // Post-deletion cleanup
});
```

**Source:** `app/Services/Helper.php`
