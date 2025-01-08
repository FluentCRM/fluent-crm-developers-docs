---
description: "Contact API Function provides many utility methods that you can use to interact with contact related operations from your custom PHP Snippet or a custom plugin."
---

# Contact API Function

Contact API Function provides many utility methods that you can use to interact with contact related operations from your custom PHP Snippet or a custom plugin.

## Initialization
```php 
$contactApi = FluentCrmApi('contacts');
```
`FluentCrmApi('contacts')` basically returns `FluentCrm\App\Api\Classes\Contacts` class which has different methods for interacting with `Subscriber` Model.

## Methods

### getContact($emailOrContactId)
```php 
/*
* Find a contact by Email or Subscriber ID
* You can find a contact by email or Subscriber id (SubscriberId is not the user ID).
* @return: null or FluentCrm\App\Models\Subscriber Model
*/
$contact = $contactApi->getContact($emailOrContactId);
```

### getContactByUserRef($userId)
```php 
/*
* Find a contact by user_id
* You can find a contact by user_id
* @return: null or FluentCrm\App\Models\Subscriber Model
*/
$contact = $contactApi-> getContactByUserRef($userId);
```

### getCurrentContact()
```php 
/*
* get current logged in user's contact profile
* @param: $cached boolean, if true then it will use run time caching
* @param: $useSecureCookie boolean, if true then it will check cookie value from email link for logged out users.
* @return: null or FluentCrm\App\Models\Subscriber Model
*/
$contact = $contactApi->getCurrentContact($cached = true, $useSecureCookie = false);
```

### getContactBySecureHash($hash)
if you have secure contact has in the cookie then you can get the Subscriber hash
```php 
/*
* get Subscriber by secure hash
* @param: string 
* @return: null or FluentCrm\App\Models\Subscriber Model
*/
$contact = $contactApi->getContactBySecureHash($hash);
```

### createOrUpdate()
Create or update contact's data including Tags / Lists / Custom Fields

**Parameters**
- $data array of the contact data
- $forceUpdate boolean, if true then contact's status will be updated regardless of their old status
- $deleteOtherValues boolean, if true then custom contact fields data will be saved and it will remove other values
- $sync boolean, no use case yet but it's here for future use cases.

**returns** false | FluentCrm\App\Models\Subscriber Model

```php 
$contactApi = FluentCrmApi('contacts');

/*
* Update/Insert a contact
* You can create or update a contact in a single call
*/

$data = [
    'first_name' => 'Jhon',
    'last_name' => 'Doe',
    'email' => 'jhon@doe.com', // requied
    'status' => 'pending',
    'tags' => [1,2,3, 'Dynamic Tag'], // tag ids/slugs/title as an array
    'lists' => [4, 'Dynamic List'] // list ids/slugs/title as an array,
    'detach_tags' => [6, 'another_tag'] // tag ids/slugs/title as an array,
    'detach_lists' => [10, 'list_slug'] // list ids/slugs/title as an array,
    'custom_values' => [
        'custom_field_slug_1' => 'custom_field_value_1',
        'custom_field_slug_2' => 'custom_field_value_2',
    ]
];

$contact = $contactApi->createOrUpdate($data);

// send a double opt-in email if the status is pending
if($contact && $contact->status == 'pending') {
    $contact->sendDoubleOptinEmail();
}
```

For tags and lists parameter you can use tag ids, tag slugs or tag titles or mixed. Same for lists.

If you provide string value for tags or lists then it will try to find the tag or list by title and if not found then it will create a new tag or list.

**Avaiblable Fillable Main Fields**

|Attribute|Data Type| Comment                                                        |
|:----|:----|:---------------------------------------------------------------|
|user_id|Integer| WordPress User ID                                              |
|company_id|Integer| Primary Company ID                                             |
|prefix|String| Name Prefix                                                    |
|first_name|String| First Name                                                     |
|last_name|String| Last Name                                                      |
|email|String| Contact's Email Address                                        |
|timezone|String| Timezoe String (ISO Format)                                    |
|address_line_1|String| --                                                             |
|address_line_2|String| --                                                             |
|postal_code|String| --                                                             |
|city|String| --                                                             |
|state|String| --                                                             |
|country|String| --                                                             |
|ip|String| --                                                             |
|latitude|Decimal| --                                                             |
|longitude|Decimal| --                                                             |
|phone|String| --                                                             |
|status|String| Possible Values: pending / subscribed / bounced / unsubscribed |
|contact_type|String| lead/customer                                                  |
|source|String| --                                                             |
|avatar|String / URL| Custom Contact Photo URL                                       |
|date_of_birth|Date| Y-m-d format                                                   |
|last_activity|Date Time| --                                                             |
|updated_at|Date Time| --                                                             |



### getInstance()
If you want to access raw `FluentCrm\App\Models\Subscriber` model then you use like this
```php 
$subscriberInstance = FluentCrmApi('contacts')->getInstance();
```

### Filtering Contacts

```php 
$contactApi = FluentCrmApi('contacts');

// get Subscribed Contacts
$subscribedContacts = $contactApi->getInstance()
    ->where('status', 'subscribed')
    ->get(); // you can also use paginate() instead of get();

// Get both pending and upsubscribed contacts
$contacts = $contactApi->getInstance()
    ->whereIn('status', ['unsubscribed', 'pending'])
    ->get();

// Get contacts by tag ids
$tagIds = [1,2];
$tagOneTwoContacts = $contactApi->getInstance()
    ->filterByTags($tagIds)
    ->get();

// Get contacts by list ids
$listIds = [1,2];
$ListOneTwoContacts = $contactApi->getInstance()
    ->filterByLists($listIds)
    ->get();

// search contacts
$searchResult = $contactApi->getInstance()
    ->searchBy('search_string')
    ->get();
```

## Contact Specific Methods
To interact with a single contact you may use the following methods

**Initialization** 
```php 
$contactApi = FluentCrmApi('contacts');
$subscriber = $contactApi->getContact($emailOrContactId);
```

### attachLists($listIds)

Attach Lists to a Subscriber

- Parameters
    - $listIds array or list ids / title / slugs
- Returns FluentCrm\App\Models\Subscriber

#### Usage
```php 
$subscriber->attachLists([1,2,3, 'list_slug']);
```

### detachLists($listIds)

Remove Lists from a Subscriber

- Parameters
    - $listIds array of list ids / title / slugs
- Returns FluentCrm\App\Models\Subscriber

#### Usage
```php 
$subscriber->detachLists([1,2,3, 'list_slug_or_title']);
```

### attachTags($tagIds)
Attach Tags to a Subscriber

- Parameters
    - $tagIds array of tag ids / title / slugs
- Returns FluentCrm\App\Models\Subscriber

#### Usage
```php 
$subscriber->attachTags([1,2,3, 'title_or_slug']);
```

### detachTags($tagIds)

Remove tags from a Subscriber

- Parameters
    - $tagIds array or tag ids / title / slugs
- Returns FluentCrm\App\Models\Subscriber

#### Usage
```php 
$subscriber->detachTags([1,2,3, 'title_or_slug']);
```


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
    - $tagIds array of tag ids or tag slugs or tag titles
- Returns `boolean`

#### Usage
```php 
$isInTags = $subscriber->hasAnyTagId([1,2,3, 'title_or_slug']);
```

### hasAnyListId()

Check if a contact is any of the provided list

- Parameters
    - $listIds array of list ids or list slugs or list titles
- Returns `boolean`

#### Usage
```php 
$isInLists = $subscriber->hasAnyListId([1,2,3, 'title_or_slug']);
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
