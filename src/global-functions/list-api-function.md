# List API Function

List API Function provides many utility methods that you can use to interact with contact related operations from your custom PHP Snippet or a custom plugin.

## Initialization
```php 
$listApi = FluentCrmApi('lists');
```
`FluentCrmApi('lists')` basically returns `FluentCrm\App\Api\Classes\Lists` Model class instance.

## Methods

### all()
```php 
/*
* The all method returns the underlying array represented by the collection of Lists
*/
$allLists = $listApi->all();
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
    'tags' => [1,2,3], // tag ids as an array
    'lists' => [4] // list ids as an array,
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
    - $listIds array
- Returns FluentCrm\App\Models\Subscriber

#### Usage
```php 
$subscriber->attachLists([1,2,3]);
```

### detachLists($listIds)

Remove Lists from a Subscriber

- Parameters
    - $listIds array
- Returns FluentCrm\App\Models\Subscriber

#### Usage
```php 
$subscriber->detachLists([1,2,3]);
```

### attachTags($tagIds)
Attach Tags to a Subscriber

- Parameters
    - $tagIds array
- Returns FluentCrm\App\Models\Subscriber

#### Usage
```php 
$subscriber->attachTags([1,2,3]);
```

### detachTags($tagIds)

Remove tags from a Subscriber

- Parameters
    - $tagIds array
- Returns FluentCrm\App\Models\Subscriber

#### Usage
```php 
$subscriber->detachTags([1,2,3]);
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
    - $tagIds array of tag ids
- Returns `boolean`

#### Usage
```php 
$isInTags = $subscriber->hasAnyTagId([1,2,3]);
```

### hasAnyListId()

Check if a contact is any of the provided list

- Parameters
    - $listIds array of list ids
- Returns `boolean`

#### Usage
```php 
$isInLists = $subscriber->hasAnyListId([1,2,3]);
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
