---
description: "Tag API Function provides many utility methods that you can use to get data as your requirement from your custom PHP Snippet or a custom plugin."
---

# Tag API Function

Tag API Function provides many utility methods that you can use to get data as your requirement from your custom PHP Snippet or a custom plugin.

## Initialization
```php 
$tagApi = FluentCrmApi('tags');
```
`FluentCrmApi('tags')` basically returns `FluentCrm\App\Api\Classes\Tags` Model class instance.

## Methods

### importBulk()
As the name suggests, the `importBulk` method is used to import multiple tags at once. It accepts an array of tags as an argument.
Each tag should be an array of key-value pairs. The following keys are required for each tag:
```php 
/*
* add tags in bulk
* @param array $tags 
$tags = [
           [
              'title' => 'Tag 1',
              'slug'  => 'tag-1',
              'description' => 'optional description'
           ],
           [
               'title' => 'Tag 2',
               'slug'  => 'tag-2',
               'description' => 'optional description'
           ]
      ];
* @return: array of Tag Objects
*/
$importedTags = $tagApi->importBulk($tags);
```

### all()
The Eloquent `all` method will return all the results in the model's table.
```php 
/*
* The all method returns the underlying array represented by the collection of Tags
*/
$allTags = $tagApi->all();
```

### get()
```php 
/*
* Show a tag of all of the tags of FluentCRM
*/
$tags = $tagApi->get();
```
The `get` method returns a Collection containing the results where each result is an instance of the PHP stdClass object.
You may access each column's value by accessing the column as a property of the object:
```php
foreach ($tags as $tag) {
    echo $tag->title;
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
$tag = $tagApi->find($id);
```
You may also call the `find` method with an array of primary keys, which will return a collection of the matching records:
```php
$tags = $tagApi->find([1, 2, 3]);
```
### first()
In addition to the `find` method, you may also use the `first` method to retrieve the first record matching the given query:
```php 
$tag = $tagApi->first();
```

### paginate()
FluentCRM's paginator is integrated with the [query builder](/database/query-builder/) and [ORM](/database/orm/) and provides convenient,
easy-to-use pagination of database results out of the box. The only argument that you need to pass is the number of items per page.
In this example, let's assume that we want to display 15 contacts per page:
```php 
$paginatedTags = $tagApi->paginate(15);
```

### getInstance()
If you want to access raw `FluentCrm\App\Models\Tags` model directly then you use like this
```php 
$tagIntance = FluentCrmApi('tags')->getInstance();
```
Now you can use all the methods of query builder or ORM. For example:
```php 
/*
* return tags where id is 1
*/
$tag = $tagIntance->where('id', 1)->get(); 

/*
* return first tag where status is active
*/
$tag = $tagIntance->where('status', 'active')->first(); 
```


