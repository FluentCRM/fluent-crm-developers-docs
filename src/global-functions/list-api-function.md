---
description: "List API Function provides many utility methods that you can use to get data as your requirement from your custom PHP Snippet or a custom plugin."
---

# List API Function

List API Function provides many utility methods that you can use to get data as your requirement from your custom PHP Snippet or a custom plugin.

## Initialization
```php 
$listApi = FluentCrmApi('lists');
```
`FluentCrmApi('lists')` basically returns `FluentCrm\App\Api\Classes\Lists` Model class instance.

## Methods

### importBulk()
As the name suggests, the `importBulk` method is used to import multiple lists at once. It accepts an array of lists as an argument.
Each list should be an array of key-value pairs. The following keys are required for each list:
```php 
/*
* add lists in bulk
* @param array $lists 
$lists = [
           [
              'title' => 'List 1',
              'slug'  => 'list-1',
              'description' => 'optional description'
           ],
           [
               'title' => 'List 2',
               'slug'  => 'list-2',
               'description' => 'optional description'
           ]
      ];
* @return: array of List Objects
*/
$importedLists = $listApi->importBulk($lists);
```

### all()
The Eloquent `all` method will return all the results in the model's table.
```php 
/*
* The all method returns the underlying array represented by the collection of Lists
*/
$allLists = $listApi->all();
```

### get()
```php 
/*
* Show a list of all of the lists of FluentCRM
*/
$lists = $listApi->get();
```
The `get` method returns a Collection containing the results where each result is an instance of the PHP stdClass object.
You may access each column's value by accessing the column as a property of the object:
```php
foreach ($lists as $list) {
    echo $list->title;
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
$list = $listApi->find($id);
```
You may also call the `find` method with an array of primary keys, which will return a collection of the matching records:
```php
$lists = $listApi->find([1, 2, 3]);
```
### first()
In addition to the `find` method, you may also use the `first` method to retrieve the first record matching the given query:
```php 
$list = $listApi->first();
```

### paginate()
FluentCRM's paginator is integrated with the [query builder](/database/query-builder/) and [ORM](/database/orm/) and provides convenient,
easy-to-use pagination of database results out of the box. The only argument that you need to pass is the number of items per page.
In this example, let's assume that we want to display 15 contacts per page:
```php 
$paginatedLists = $listApi->paginate(15);
```

### getInstance()
If you want to access raw `FluentCrm\App\Models\Lists` model directly then you use like this
```php 
$listIntance = FluentCrmApi('lists')->getInstance();
```
Now you can use all the methods of query builder or ORM. For example:
```php 
/*
* return lists where id is 1
*/
$list = $listIntance->where('id', 1)->get(); 

/*
* return first list where status is active
*/
$list = $listIntance->where('status', 'active')->first(); 
```


