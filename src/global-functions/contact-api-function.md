---
description: "Contacts API — create, update, query, and manage contacts programmatically via FluentCrmApi('contacts')."
---

# Contacts API

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Developer Guide" />

The Contacts API provides methods for creating, finding, and managing contacts (subscribers).

## Initialization

```php
$contactApi = FluentCrmApi('contacts');
```

Returns an instance of `FluentCrm\App\Api\Classes\Contacts`.

---

## Methods

### getContact()

Find a contact by email address or subscriber ID.

```php
$contact = $contactApi->getContact($idOrEmail);
```

**Parameters**
- `$idOrEmail` `int|string` — Subscriber ID or email address

**Returns** `false` | [Subscriber](/database/models/subscriber)

---

### getContactByUserRef()

Find a contact by WordPress user ID or email. If a user ID is provided, looks up by `user_id` first, then falls back to the user's email address. Auto-links the `user_id` field if the contact is found by email.

```php
$contact = $contactApi->getContactByUserRef($userIdOrEmail);
```

**Parameters**
- `$userIdOrEmail` `int|string` — WordPress user ID or email

**Returns** `false` | [Subscriber](/database/models/subscriber)

---

### getContactByUserId()

Find a contact by WordPress user ID only (no email fallback).

```php
$contact = $contactApi->getContactByUserId($userId);
```

**Parameters**
- `$userId` `int` — WordPress user ID

**Returns** `false` | [Subscriber](/database/models/subscriber)

---

### getCurrentContact()

Get the current logged-in user's contact profile. Falls back to the secure cookie for logged-out users if enabled.

```php
$contact = $contactApi->getCurrentContact($cached = true, $useSecureCookie = false);
```

**Parameters**
- `$cached` `bool` — Use static cache on repeated calls within the same request
- `$useSecureCookie` `bool` — Check `fc_hash_secure` cookie for logged-out users

**Returns** `false` | [Subscriber](/database/models/subscriber)

---

### getContactBySecureHash()

Find a contact by their long-lived secure hash (from email links).

```php
$contact = $contactApi->getContactBySecureHash($hash);
```

**Parameters**
- `$hash` `string|null`

**Returns** `null` | [Subscriber](/database/models/subscriber)

---

### getContactByManagedSecureHash()

Find a contact by their managed secure hash (auto-rotates every 30 days).

```php
$contact = $contactApi->getContactByManagedSecureHash($hash);
```

**Parameters**
- `$hash` `string|null`

**Returns** `null` | [Subscriber](/database/models/subscriber)

---

### createOrUpdate()

Create a new contact or update an existing one. Matches by `email` address.

```php
$contact = $contactApi->createOrUpdate($data, $forceUpdate = false, $deleteOtherValues = false, $sync = false);
```

**Parameters**
- `$data` `array` — Contact data (must include `email`). Can include `tags`, `lists`, `detach_tags`, `detach_lists`, and `custom_values`.
- `$forceUpdate` `bool` — If `true`, updates status even on existing contacts regardless of their current status
- `$deleteOtherValues` `bool` — If `true`, replaces all custom field data (deletes fields not in the new data)
- `$sync` `bool` — Reserved for future use

**Returns** `false` | [Subscriber](/database/models/subscriber)

**Example:**

```php
$contactApi = FluentCrmApi('contacts');

$contact = $contactApi->createOrUpdate([
    'first_name'    => 'John',
    'last_name'     => 'Doe',
    'email'         => 'john@example.com', // required
    'status'        => 'subscribed',
    'tags'          => [1, 2, 'Dynamic Tag'],       // IDs, slugs, or titles
    'lists'         => [4, 'Dynamic List'],          // IDs, slugs, or titles
    'detach_tags'   => [6, 'another_tag'],           // remove these tags
    'detach_lists'  => [10, 'list_slug'],            // remove these lists
    'custom_values' => [
        'custom_field_slug' => 'value',
    ]
]);

// Send double opt-in email if status is pending
if ($contact && $contact->status == 'pending') {
    $contact->sendDoubleOptinEmail();
}
```

For `tags` and `lists` you can pass IDs, slugs, or titles (or mix them). String values that don't match an existing tag/list will create a new one.

**Fillable fields:**

| Field | Type | Notes |
|-------|------|-------|
| `email` | String | **Required** for creation |
| `first_name` | String | |
| `last_name` | String | |
| `prefix` | String | Name prefix (Mr, Mrs, etc.) |
| `user_id` | Integer | WordPress user ID |
| `company_id` | Integer | Primary company ID |
| `status` | String | `pending`, `subscribed`, `unsubscribed`, `transactional`, `bounced`, `complained` |
| `contact_type` | String | `lead`, `customer` |
| `source` | String | |
| `avatar` | String/URL | Custom photo URL |
| `date_of_birth` | Date | `Y-m-d` format |
| `phone` | String | |
| `timezone` | String | ISO timezone string |
| `address_line_1` | String | |
| `address_line_2` | String | |
| `city` | String | |
| `state` | String | |
| `postal_code` | String | |
| `country` | String | |
| `ip` | String | |
| `latitude` | Decimal | |
| `longitude` | Decimal | |
| `last_activity` | DateTime | |
| `updated_at` | DateTime | |

---

### query()

Get a `ContactsQuery` builder instance for advanced contact queries.

```php
$query = $contactApi->query($args);
```

**Parameters**
- `$args` `array` — Query arguments

**Returns** `\FluentCrm\App\Services\ContactsQuery`

---

### getCustomFields()

Get the custom field definitions for contacts.

```php
$fields = $contactApi->getCustomFields($types = [], $byOptions = false);
```

**Parameters**
- `$types` `array` — Filter by field types (e.g., `['text', 'select']`). Empty array returns all.
- `$byOptions` `bool` — If `true`, returns simplified `[['id' => slug, 'title' => label], ...]` format

**Returns** `array`

---

### getInstance()

Get the underlying [Subscriber](/database/models/subscriber) model for direct Eloquent-style queries.

```php
$subscriberModel = $contactApi->getInstance();
```

**Returns** `\FluentCrm\App\Models\Subscriber`

---

### Proxy Methods

The Contacts API proxies these methods to the underlying Subscriber model via `__call()`:

- `all()` — Get all contacts
- `get()` — Get contacts collection
- `find($id)` — Find by primary key (accepts single ID or array)
- `first()` — Get the first contact
- `paginate($perPage)` — Paginate results

---

## Filtering Contacts

Use `getInstance()` to access the full query builder:

```php
$contactApi = FluentCrmApi('contacts');

// Get subscribed contacts
$subscribed = $contactApi->getInstance()
    ->where('status', 'subscribed')
    ->get();

// Get contacts in multiple statuses
$contacts = $contactApi->getInstance()
    ->whereIn('status', ['unsubscribed', 'pending'])
    ->get();

// Get contacts by tag IDs
$tagged = $contactApi->getInstance()
    ->filterByTags([1, 2])
    ->get();

// Get contacts by list IDs
$listed = $contactApi->getInstance()
    ->filterByLists([1, 2])
    ->get();

// Search contacts
$results = $contactApi->getInstance()
    ->searchBy('search_string')
    ->get();

// Paginate
$paginated = $contactApi->getInstance()
    ->where('status', 'subscribed')
    ->paginate(15);
```

---

## Subscriber Model Methods

Once you have a [Subscriber](/database/models/subscriber) instance, these methods are available:

### attachTags() / detachTags()

```php
$subscriber->attachTags([1, 2, 'tag_title_or_slug']);
$subscriber->detachTags([1, 2, 'tag_title_or_slug']);
```

Accepts tag IDs, slugs, or titles. Returns `Subscriber`.

### attachLists() / detachLists()

```php
$subscriber->attachLists([1, 2, 'list_slug']);
$subscriber->detachLists([1, 2, 'list_slug']);
```

Accepts list IDs, slugs, or titles. Returns `Subscriber`.

### custom_fields()

Get the contact's custom field values.

```php
$customData = $subscriber->custom_fields();
// Returns array
```

### stats()

Get sent emails, opens, and clicks count.

```php
$stats = $subscriber->stats();
// Returns array
```

### sendDoubleOptinEmail()

Send a double opt-in confirmation email (only works if contact status is `pending`).

```php
$subscriber->sendDoubleOptinEmail();
// Returns bool
```

### hasAnyTagId() / hasAnyListId()

Check if a contact belongs to any of the given tags or lists.

```php
$inTags = $subscriber->hasAnyTagId([1, 2, 'tag_slug']);
$inLists = $subscriber->hasAnyListId([1, 2, 'list_slug']);
// Returns bool
```

### unsubscribeReason() / unsubscribeReasonDate()

Get the unsubscribe reason and date if the contact unsubscribed.

```php
$reason = $subscriber->unsubscribeReason(); // string
$date = $subscriber->unsubscribeReasonDate(); // string or empty
```

### getWpUser() / getWpUserId()

Get the linked WordPress user.

```php
$user = $subscriber->getWpUser();   // \WP_User or null
$userId = $subscriber->getWpUserId(); // int or null
```

**Source:** `app/Api/Classes/Contacts.php`, `app/Models/Subscriber.php`
