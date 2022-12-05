# Lists Model
| DB Table Name | {wp_db_prefix}_fc_lists                                            |
|---------------|--------------------------------------------------------------------|
| Schema        | <a :href="$withBase('/database/#fc-lists-table')">Check Schema</a> |
| Source File   | fluent-crm/app/Models/Lists.php                                    |
| Name Space    | FluentCrm\App\Models                                               |
| Class         | FluentCrm\App\Models\Lists                                         |

## Attributes
<table>
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
            <th>title</th>
            <td>String</td>
            <td></td>
        </tr>
        <tr>
            <th>slug</th>
            <td>String</td>
            <td></td>
        </tr>
        <tr>
            <th>description</th>
            <td>String</td>
            <td></td>
        </tr>
        <tr>
            <th>is_public</th>
            <td>Integer</td>
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

$list = FluentCrm\App\Models\Lists::find(1);

$list->id; // returns id
$list->title; // returns title
.......
```

## Fillable Attributes

```php
'title',
'slug',
'description', // default: null
'is_public', // default: 0
'created_by', // default: null
'updated_at' // default: null

```
## Scopes

This model has the following scopes that you can use

### searchBy()

Apply full text search to basic data attributes
`title`,`slug`,`description`

- Parameters
    - $search - String
#### Usage:

```php 
// Search all contacts to match "test"
$lists = FluentCrm\App\Models\Lists::searchBy('test')->get();
```
### subscribers()

Access all the associated subscribers of a list

- return FluentCrm\App\Models\Subscriber Model Collections

#### Example:
```php 
// Accessing Subscribers
$listSubscribers = $list->subscribers;

// For Filtering by tags relationship

// Get Lists which has subcriber ids: 1/2/3
$lists = FluentCrm\App\Models\Lists::whereHas('subscribers', function($query) {
    $query->whereIn('id', [1,2,3]);
})->get();

// Get Lists which does not have subcriber ids: 1/2/3
$lists = FluentCrm\App\Models\Lists::whereDoesntHave('subscribers', function($query) {
    $query->whereIn('id', [1,2,3]);
})->get();
```

### totalCount()

returns number of subscribers associated with lists

#### Example:
```php 
// Accessing totalCount
$totalSubscribers = $list->totalCount;

$count = FluentCrm\App\Models\Lists::totalCount();
```

### countByStatus()

returns number of subscribers associated with lists which have status 'subscribed'

- Parameters
  - $status - String (Default value 'subscribed') 

#### Example:
```php 
// Accessing totalCount
$count = FluentCrm\App\Models\Lists::countByStatus();
```