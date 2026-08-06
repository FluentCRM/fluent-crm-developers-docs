---
description: "Action hooks related to contact/subscriber lifecycle events in FluentCRM."
---

# Contact Hooks

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These action hooks fire during contact lifecycle events — creation, updates, tag/list changes, status transitions, notes, and more.

## Contact Created & Updated

### `fluent_crm/contact_created`

This action runs when a new contact is created.

::: warning Suppressed by silent imports
Bulk inserts skip this hook entirely when the `FLUENTCRM_DISABLE_TAG_LIST_EVENTS` constant is
defined — that is what "import silently" does, so imported rows do not enroll into
*Contact Created* automations. Do not rely on this hook to see every row that reaches
`fc_subscribers`. The bulk hooks [`fluentcrm_contacts_imported_bulk`](#fluentcrm-contacts-imported-bulk)
and [`fluentcrm_contacts_updated_bulk`](#fluentcrm-contacts-updated-bulk) are **not** suppressed —
listen on those to see silently imported rows.
:::

::: tip Deprecated alias
`fluentcrm_contact_created` fires alongside this hook with the same signature. It has been deprecated
since 2.8.0 — use `fluent_crm/contact_created`.
:::

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

This action runs when a contact is updated. It fires from many paths — the model's bulk import and
`createOrUpdate()`, the REST controller, the auto-subscribe handler, the manage-subscription
preference form, and the Pro *Update Contact Property* automation action.

::: tip Deprecated alias
`fluentcrm_contact_updated` fires alongside this hook with the same signature on every path except
the auto-subscribe handler, which fires only the `fluent_crm/` name. It has been deprecated
since 2.8.0 — use `fluent_crm/contact_updated`.
:::

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber) - already saved
- `$dirtyFields` Array - the changed fields, keyed by column name, holding the **new** values. Use [`fluent_crm/contact_updated_with_changes`](#fluent-crm-contact-updated-with-changes) if you also need the old values.

**Usage:**
```php
add_action('fluent_crm/contact_updated', function($subscriber, $dirtyFields) {
   // $dirtyFields contains the changed field values
}, 10, 2);
```

**Source:** `app/Models/Subscriber.php`, `app/Http/Controllers/SubscriberController.php`, `app/Hooks/Handlers/AutoSubscribeHandler.php`, `app/Hooks/Handlers/PrefFormHandler.php`, `fluentcampaign-pro/app/Services/Funnel/Actions/UpdateContactPropertyAction.php`

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

**Source:** `app/Http/Controllers/SubscriberController.php`, `app/Services/ExternalIntegrations/FluentForm/Bootstrap.php`

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

**Source:** `app/Models/Subscriber.php`, `app/Http/Controllers/SubscriberController.php`, `app/Hooks/Handlers/AutoSubscribeHandler.php`, `app/Hooks/Handlers/ExternalPages.php`, `app/Modules/MCP/Tools/ContactTools.php`

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

::: warning Suppressed by silent imports
Like `fluent_crm/contact_created`, all four tag/list hooks are skipped when the
`FLUENTCRM_DISABLE_TAG_LIST_EVENTS` constant is defined — the CSV importer and the WP-user importer
both define it. They also only fire for rows that actually changed, so re-attaching an existing tag
or list is silent.
:::

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

::: warning Older Pro versions pass only two arguments
FluentCampaign Pro 3.1.10 and earlier fired this hook from the **Change Contact Status** automation
action without `$newStatus`, so a callback declared with three *required* parameters threw an
`ArgumentCountError` when that action ran. If you support those versions, give the third parameter a
default and fall back to the model:

```php
add_action('fluent_crm/subscriber_status_changed', function($subscriber, $oldStatus, $newStatus = null) {
   $newStatus = $newStatus ?: $subscriber->status;
}, 10, 3);
```
:::

**Usage:**
```php
add_action('fluent_crm/subscriber_status_changed', function($subscriber, $oldStatus, $newStatus) {
   // React to any status change
}, 10, 3);
```

**Source:** `app/Models/Subscriber.php`, `app/Http/Controllers/SubscriberController.php`, `fluentcampaign-pro/app/Services/Funnel/Actions/ChangeContactStatusAction.php`

---

### `fluentcrm_subscriber_status_to_{$new_status}`

This dynamic action hook fires when a subscriber's status has been changed to a specific new status.

**Possible Hooks**

One per status returned by [`fluent_crm/contact_statuses`](/hooks/filters/contacts#fluent-crm-contact-statuses):

- `fluentcrm_subscriber_status_to_subscribed`
- `fluentcrm_subscriber_status_to_pending`
- `fluentcrm_subscriber_status_to_unsubscribed`
- `fluentcrm_subscriber_status_to_transactional`
- `fluentcrm_subscriber_status_to_bounced`
- `fluentcrm_subscriber_status_to_complained`
- `fluentcrm_subscriber_status_to_spammed`

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber) - already saved with the new status
- `$oldStatus` string - old status of the contact

::: tip
FluentCRM itself listens on several of these — `subscribed` resumes paused automations, while
`unsubscribed`, `bounced`, `complained` and `spammed` run the unsubscribe cleanup. Your callback runs
alongside those, not instead of them.
:::

**Usage:**
```php
add_action('fluentcrm_subscriber_status_to_subscribed', function($subscriber, $oldStatus) {
   // the subscriber got subscribed status. You can run your code here
}, 10, 2);
```

**Source:** `app/Models/Subscriber.php`, `fluentcampaign-pro/app/Services/Funnel/Actions/ChangeContactStatusAction.php`

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

### `fluent_crm/subscriber_contact_type_to_{$new_type}`

This action hook fires when a subscriber's `contact_type` has been changed to a new type.

::: warning Only fires from the bulk action
This is dispatched from the **Change Contact Type** bulk action in the contacts list, once per
contact whose type actually changed. Editing a single contact's type on the profile screen does not
fire it.
:::

**Possible Hooks**

One per type returned by [`fluent_crm/contact_types`](/hooks/filters/contacts#fluent-crm-contact-types):

- `fluent_crm/subscriber_contact_type_to_lead`
- `fluent_crm/subscriber_contact_type_to_customer`

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber) - already saved with the new type
- `$oldType` string - old type of the contact (eg: lead | customer)

**Usage:**
```php
add_action('fluent_crm/subscriber_contact_type_to_customer', function($subscriber, $oldType) {
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

This action fires after a contact note is deleted from the REST API, both for a single delete and
once per note for the bulk delete.

::: warning
The note row is already gone when this fires, and only its ID is passed. Capture what you need on
`fluent_crm/note_added` or `fluent_crm/note_updated`.
:::

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

### `fluent_crm/note_deleted`

The MCP counterpart of `fluent_crm/note_delete`, fired when a note is deleted through the MCP contact
tools rather than the admin REST API.

::: warning Different name, different signature
Note the past-tense name and that the second argument is a **contact ID**, not a model. Hook both
`fluent_crm/note_delete` and `fluent_crm/note_deleted` if you need to cover every deletion path.
:::

**Parameters**
- `$deletedId` INT - Note ID
- `$subscriberId` INT - Contact ID the note belonged to

**Usage:**
```php
add_action('fluent_crm/note_deleted', function($deletedId, $subscriberId) {
   // A contact note was deleted via MCP
}, 10, 2);
```

**Source:** `app/Modules/MCP/Tools/ContactTools.php`

---

## Birthday

### `fluentcrm_contact_birthday`

<Badge type="danger" vertical="middle" text="Pro" />

Fires when a contact's birthday occurs. Processed in batch during scheduled birthday checks. Used for triggering birthday automations.

**Parameters**
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_action('fluentcrm_contact_birthday', function($subscriber) {
    // Send birthday greeting, apply tags, etc.
});
```

**Source:** `fluentcampaign-pro/app/Hooks/Handlers/IntegrationHandler.php`

---

## Bulk Import

### `fluentcrm_contacts_imported_bulk`

This action fires once at the end of every bulk import run with all the contacts the run inserted.
The CSV importer, the WP-user importer, and the integration importers all funnel through
`Subscriber::import()`, so they all fire it.

::: tip Fires even for silent imports
Unlike [`fluent_crm/contact_created`](#fluent-crm-contact-created), this hook is **not** suppressed
by the `FLUENTCRM_DISABLE_TAG_LIST_EVENTS` constant. When an admin imports silently, this hook and
[`fluentcrm_contacts_updated_bulk`](#fluentcrm-contacts-updated-bulk) are the only signals that the
rows arrived.
:::

**Parameters**
- `$insertedModels` Array - the newly inserted [Subscriber Models](/database/models/subscriber). An empty array when the run only matched existing contacts.

**Usage:**
```php
add_action('fluentcrm_contacts_imported_bulk', function($insertedModels) {
   foreach ($insertedModels as $subscriber) {
       // Sync each newly imported contact to your system
   }
});
```

**Source:** `app/Models/Subscriber.php`

---

### `fluentcrm_contacts_updated_bulk`

This action fires immediately after `fluentcrm_contacts_imported_bulk`, with the already-existing
contacts the import run matched by email.

::: warning Includes unchanged contacts
Every matched existing contact is included, even when its incoming row changed nothing — unlike the
per-row [`fluent_crm/contact_updated`](#fluent-crm-contact-updated), which only fires for rows with
actual changes. The collection is empty when the import ran with "update existing contacts" disabled.
:::

**Parameters**
- `$updatedModels` Collection - [Subscriber Models](/database/models/subscriber) of the existing contacts matched by the import

**Usage:**
```php
add_action('fluentcrm_contacts_updated_bulk', function($updatedModels) {
   foreach ($updatedModels as $subscriber) {
       // React to re-imported contacts
   }
});
```

**Source:** `app/Models/Subscriber.php`

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

---

## Advanced Filter Providers

### `fluentcrm_contacts_filter_{$provider}`

This dynamic action is the extension point behind the contacts **Advanced Filter** UI — and
everything built on it: saved segments, campaign recipient selection, and the Pro automation
conditions. For every filter group, the [ContactsQuery service](/helpers/contacts-query) fires one
action per provider via `do_action_ref_array()`, handing the listener the query builder so it can
add its `WHERE` constraints in place. The return value is ignored — the query object itself is the
contract.

**Possible Hooks**

Core registers `subscriber`, `segment`, `custom_fields`, `activities`, and `event_tracking` (its
listener is registered even while the experimental Event Tracking feature is off — only the
Advanced Filter UI hides it). Integrations register their own providers:
`woo`, `edd`, `learndash`, `lifterlms`, `tutorlms`, and `aff_wp` come from FluentCampaign Pro, and
`fluent_cart` is registered by the Fluent Cart plugin.

**Parameters**
- `$query` Query Builder - the nested where-group for the current filter group. Add constraints to it in place; do not execute it.
- `$filterItems` Array - the filter rows configured for this provider, each with `property`, `operator`, and `value` keys

::: danger Unhandled providers fail closed
If no listener is registered for a provider name (`has_action()` returns false), ContactsQuery adds
`whereRaw('1 = 0')` so the whole filter group matches **nothing**. That is deliberate: a provider
that loses its handler (Pro deactivated, integration disabled) must not silently widen a campaign
audience to "everyone". It also means your custom provider's listener must be registered on every
request *before* the query runs — otherwise every segment or campaign using it quietly resolves to
zero contacts.
:::

::: tip No `&` in your callback
Although the hook is fired with `do_action_ref_array(..., [&$q, $items])`, the query builder is an
object, so a plain `function ($query, $filterItems)` signature mutates it just fine — this is
exactly how every core and Pro listener is declared. Do not add `&` to the parameter.
:::

**Usage:**
```php
add_action('fluentcrm_contacts_filter_my_plugin', function ($query, $filterItems) {
    foreach ($filterItems as $filterItem) {
        if ($filterItem['property'] == 'vip_level') {
            $query->where('fc_subscribers.total_points', '>=', (int) $filterItem['value']);
        }
    }
}, 10, 2);
```

To surface your provider in the Advanced Filter UI, also register its fields through the
`fluentcrm_advanced_filter_options` filter — the provider key there becomes the `{provider}` part of
this hook name.

**Source:** `app/Services/ContactsQuery.php`
