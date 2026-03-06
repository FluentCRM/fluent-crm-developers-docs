---
description: "Company Model represents company/organization data in FluentCRM."
---

# Company Model

| DB Table Name | {wp_db_prefix}_fc_companies                                              |
|---------------|--------------------------------------------------------------------------|
| Schema        | <a href="/database/#fc-companies-table">Check Schema</a>   |
| Source File   | fluent-crm/app/Models/Company.php                                        |
| Name Space    | FluentCrm\App\Models                                                     |
| Class         | FluentCrm\App\Models\Company                                             |

## Attributes
<table class="nowrap">
   <thead>
      <tr>
         <th>Attribute</th>
         <td>Data Type</td>
         <td>Comment</td>
      </tr>
   </thead>
   <tbody>
      <tr>
         <th>id</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>hash</th>
         <td>String</td>
         <td>Auto-generated on create</td>
      </tr>
      <tr>
         <th>name</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>owner_id</th>
         <td>Integer</td>
         <td>FK to fc_subscribers.id</td>
      </tr>
      <tr>
         <th>industry</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>type</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>email</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>phone</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>address_line_1</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>address_line_2</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>postal_code</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>city</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>state</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>country</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>timezone</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>employees_number</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>description</th>
         <td>Text</td>
         <td></td>
      </tr>
      <tr>
         <th>logo</th>
         <td>String / URL</td>
         <td></td>
      </tr>
      <tr>
         <th>linkedin_url</th>
         <td>String / URL</td>
         <td></td>
      </tr>
      <tr>
         <th>facebook_url</th>
         <td>String / URL</td>
         <td></td>
      </tr>
      <tr>
         <th>twitter_url</th>
         <td>String / URL</td>
         <td></td>
      </tr>
      <tr>
         <th>website</th>
         <td>String / URL</td>
         <td></td>
      </tr>
      <tr>
         <th>meta</th>
         <td>Text</td>
         <td>Serialized array, auto serialize/unserialize via mutators. Contains custom_values.</td>
      </tr>
      <tr>
         <th>date_of_start</th>
         <td>Date</td>
         <td></td>
      </tr>
      <tr>
         <th>created_at</th>
         <td>Date Time</td>
         <td></td>
      </tr>
      <tr>
         <th>updated_at</th>
         <td>Date Time</td>
         <td></td>
      </tr>
   </tbody>
</table>

## Usage

Please check <a href="/database/models/">Model Basic</a> for Common methods.

### Accessing Attributes

```php
$company = FluentCrm\App\Models\Company::find(1);

$company->id; // returns id
$company->name; // returns company name
$company->meta; // returns deserialized array (auto via accessor)
$company->meta['custom_values']; // returns custom field values
```

## Fillable Attributes

```php
'hash',
'name',
'owner_id',
'industry',
'type',
'email',
'phone',
'address_line_1',
'address_line_2',
'postal_code',
'city',
'state',
'country',
'timezone',
'employees_number',
'description',
'logo',
'linkedin_url',
'facebook_url',
'twitter_url',
'meta',
'website',
'date_of_start',
'created_at',
'updated_at'
```

## Scopes

### searchBy()

Search companies by name, phone, description, and email

- Parameters
    - $search - String

#### Usage:

```php
$companies = FluentCrm\App\Models\Company::searchBy('Acme')->get();
```

### ofType()

Filter companies by type

- Parameters
    - $status - String

#### Usage:

```php
$companies = FluentCrm\App\Models\Company::ofType('enterprise')->get();
```

### ofIndustry()

Filter companies by industry

- Parameters
    - $status - String

#### Usage:

```php
$companies = FluentCrm\App\Models\Company::ofIndustry('technology')->get();
```

## Relations

### subscribers
Access all associated contacts of a company (via pivot table)

- return `FluentCrm\App\Models\Subscriber` Model Collections (BelongsToMany via `fc_subscriber_pivot`)

#### Example:
```php
// Accessing subscribers
$contacts = $company->subscribers;

// Filter companies by subscriber
$companies = FluentCrm\App\Models\Company::whereHas('subscribers', function($query) {
    $query->where('status', 'subscribed');
})->get();
```

### owner
Access the owner contact of the company

- return `FluentCrm\App\Models\Subscriber` Model (BelongsTo via `owner_id`)

#### Example:
```php
// Accessing owner
$owner = $company->owner;
```

### notes
Access all notes for this company

- return `FluentCrm\App\Models\CompanyNote` Model Collections

::: tip Shared Table
Notes are stored in the `fc_subscriber_notes` table with `status = '_company_note_'`. The `subscriber_id` column stores the company ID in this context.
:::

#### Example:
```php
// Accessing company notes
$notes = $company->notes;
```

<hr />

## Methods

### getContactsCount()
Get the number of associated contacts

- Parameters
  - none
- Returns `int`

#### Usage
```php
$count = $company->getContactsCount();
```

### getCustomValues()
Get custom field values from the meta attribute

- Parameters
  - none
- Returns `array`

#### Usage
```php
$customValues = $company->getCustomValues();
```

### mappables() <Badge type="tip" text="static" />
Get human-readable label map for all importable/mappable field keys

- Parameters
  - none
- Returns `array`

#### Usage
```php
$fieldMap = FluentCrm\App\Models\Company::mappables();
```
