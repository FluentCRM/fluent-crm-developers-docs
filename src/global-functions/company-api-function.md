---
description: "Company API Function provides many utility methods that you can use to get data as your requirement from your custom PHP Snippet or a custom plugin."
---

# Company API Function

Company API Function provides many utility methods that you can use to get data as your requirement from your custom PHP Snippet or a custom plugin.

## Initialization
```php 
$companyApi = FluentCrmApi('companies');
```
`FluentCrmApi('companies')` basically returns `FluentCrm\App\Api\Classes\Companies` Model class instance.

## Methods

### getCompany()
As the name suggests, the `getCompany` method is used to get single company using company id or email. There is also an optional parameter that specifies relationships to be eager-loaded when fetching the company:
```php 
/*
* Get single company using id or email. It accepts two parameters
* @param int|string $idOrName 
* @param array $with
* @return: Single Company Object
*/
$company = $companyApi->getCompany(15, ['subscribers', 'owner', 'notes']);
```

### createOrUpdate()
As the name suggests, the `createOrUpdate` method is used to create a new company or update an existing company:
```php 
/*
* create a new company or update an existing company
* @param array $data
* @return: Created/Updated Company
*/
$company = $companyApi->createOrUpdate([
    'name'     => 'Demo Company',
    'email'    => 'democompany@gmail.com',
    'industry' => 'Medical Practice',
    'owner_id' => 12
]);
```


### attachContactsByIds()
As the name suggests, the `attachContactsByIds` method is responsible for establishing relationships between subscribers and companies based on provided IDs. It accepts two parameters
1. `$contactIds`: An array of IDs representing subscribers (contacts) to be associated with companies.
2. `$companyIds`: An array of IDs representing companies that subscribers will be associated with.


After building relationship between subscribers & companies, the method returns an associative array containing two keys:
1. `companies`: The fetched company objects.
2. `subscribers`: The fetched subscriber objects.

```php 
/*
* establishing relationships between subscribers and companies
* @param array $contactIds
* @param array $companyIds
* @return: array $result
*/
$result = $companyApi->attachContactsByIds([12,38], [1,2]);
```

### detachContactsByIds()
As the name suggests, the `detachContactsByIds` method is responsible for removing relationships between subscribers and companies based on provided IDs. It accepts two parameters
1. `$contactIds`: An array of IDs representing subscribers (contacts) to be associated with companies.
2. `$companyIds`: An array of IDs representing companies that subscribers will be associated with.


After removing relationship between subscribers & companies, the method returns an associative array containing two keys:
1. `companies`: The fetched company objects.
2. `last_primary_company_id`: The last primary company id of subscriber.

```php 
/*
* removing relationships between subscribers and companies
* @param array $contactIds
* @param array $companyIds
* @return: array $result
*/
$result = $companyApi->detachContactsByIds([12,38], [1,2]);
```


### all()
The Eloquent `all` method will return all the results in the model's table.
```php 
/*
* The all method returns the underlying array represented by the collection of Companies
*/
$allCompanies = $companyApi->all();
```

### get()
```php 
/*
* Show a company of all of the companies of FluentCRM
*/
$companies = $companyApi->get();
```
The `get` method returns a Collection containing the results where each result is an instance of the PHP stdClass object.
You may access each column's value by accessing the column as a property of the object:
```php
foreach ($companies as $company) {
    echo $company->name;
}
```

### find()
You may retrieve single records using `find` method. Instead of returning a collection of models, these methods return 
a single model instance:
```php 
/*
* Retrieve a model by its primary key...
* @param: int $id 
* @return: Retrieve a model by matching primary key
*/
$company = $companyApi->find($id);
```
You may also call the `find` method with an array of primary keys, which will return a collection of the matching records:
```php
$companies = $companyApi->find([1, 2, 3]);
```
### first()
In addition to the `find` method, you may also use the `first` method to retrieve the first record matching the given query:
```php 
$company = $companyApi->first();
```

### paginate()
FluentCRM's paginator is integrated with the [query builder](/database/query-builder/) and [ORM](/database/orm/) and provides convenient,
easy-to-use pagination of database results out of the box. The only argument that you need to pass is the number of items per page.
In this example, let's assume that we want to display 15 contacts per page:
```php 
$paginatedCompanies = $companyApi->paginate(15);
```

### getInstance()
If you want to access raw `FluentCrm\App\Models\Companies` model directly then you use like this
```php 
$companyIntance = FluentCrmApi('companies')->getInstance();
```
Now you can use all the methods of query builder or ORM. For example:
```php 
/*
* return companies where id is 1
*/
$company = $companyIntance->where('id', 1)->get(); 

/*
* return first company where status is active
*/
$company = $companyIntance->where('status', 'active')->first(); 
```


