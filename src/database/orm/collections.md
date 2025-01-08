---
description: "The Fluent ORM collection naturally inherits dozens of methods used to fluently work with the underlying array of Fluent ORM models."
---

# Fluent ORM: Collections

<Badge type="tip" vertical="top" text="Fluent Framework" /> <Badge type="warning" vertical="top" text="ORM" />


## Introduction
All multi-result sets returned by Fluent ORM are instances of the `FluentCrm\Framework\Database\Orm\Collection` object, including results retrieved via the `get` method or accessed via a relationship. The Fluent ORM collection naturally inherits dozens of methods used to fluently work with the underlying array of Fluent ORM models.

Of course, all collections also serve as iterators, allowing you to loop over them as if they were simple PHP arrays:
```php
$users = FluentCrm\App\Models\User::where('active', 1)->get();
 
foreach ($users as $user) {
    echo $user->name;
}
```
However, collections are much more powerful than arrays and expose a variety of `map` / `reduce` operations that may be chained using an intuitive interface. For example, let's remove all inactive models and gather the first name for each remaining user:
```php
$users = FluentCrm\App\Models\User::all();
 
$names = $users->reject(function ($user) {
    return $user->active === false;
})
->map(function ($user) {
    return $user->name;
});
```

## Available Methods
All Fluent ORM collections extend the base Fluent Framework collection object; therefore, they inherit all of the powerful methods provided by the base collection class:

<table style="display: table; width: 100%">
    <tbody>
        <tr>
           <th><a href="#all">all</a></th>
           <th><a href="#average">average</a></th>
           <th><a href="#avg">avg</a></th>
           <th><a href="#chunk">chunk</a></th>
        </tr>
        <tr>
           <th><a href="#collapse">collapse</a></th>
           <th><a href="#combine">combine</a></th>
           <th><a href="#concat">concat</a></th>
           <th><a href="#contains">contains</a></th>
        </tr>
        <tr>
           <th><a href="#count">count</a></th>
           <th><a href="#diff">diff</a></th>
           <th><a href="#diffKeys">diffKeys</a></th>
           <th><a href="#each">each</a></th>
        </tr>
         <tr>
           <th><a href="#every">every</a></th>
           <th><a href="#except">except</a></th>
           <th><a href="#filter">filter</a></th>
           <th><a href="#first">first</a></th>
        </tr>
        <tr>
           <th><a href="#flatMap">flatMap</a></th>
           <th><a href="#flatten">flatten</a></th>
           <th><a href="#flip">flip</a></th>
           <th><a href="#forget">forget</a></th>
        </tr>
        <tr>
            <th><a href="#forPage">forPage</a></th>
           <th><a href="#get">get</a></th>
           <th><a href="#groupBy">groupBy</a></th>
           <th><a href="#has">has</a></th>
        </tr>
        <tr>
            <th><a href="#implode">implode</a></th>
           <th><a href="#intersect">intersect</a></th>
           <th><a href="#isEmpty">isEmpty</a></th>
           <th><a href="#keyBy">keyBy</a></th>
        </tr>
         <tr>
           <th><a href="#keys">keys</a></th>
           <th><a href="#last">last</a></th>
           <th><a href="#map">map</a></th>
           <th><a href="#max">max</a></th>
        </tr>
        <tr>
            <th><a href="#median">median</a></th>
           <th><a href="#merge">merge</a></th>
           <th><a href="#min">min</a></th>
           <th><a href="#mode">mode</a></th>
        </tr>
        <tr>
            <th><a href="#only">only</a></th>
           <th><a href="#pipe">pipe</a></th>
           <th><a href="#pluck">pluck</a></th>
           <th><a href="#pop">pop</a></th>
        </tr>
         <tr>
           <th><a href="#prepend">prepend</a></th>
           <th><a href="#pull">pull</a></th>
           <th><a href="#push">push</a></th>
           <th><a href="#put">put</a></th>
        </tr>
        <tr>
            <th><a href="#random">random</a></th>
           <th><a href="#reduce">reduce</a></th>
           <th><a href="#reject">reject</a></th>
           <th><a href="#reverse">reverse</a></th>
        </tr>
        <tr>
            <th><a href="#search">search</a></th>
           <th><a href="#shift">shift</a></th>
           <th><a href="#shuffle">shuffle</a></th>
           <th><a href="#slice">slice</a></th>
        </tr>
         <tr>
           <th><a href="#sort">sort</a></th>
           <th><a href="#sortBy">sortBy</a></th>
           <th><a href="#sortByDesc">sortByDesc</a></th>
           <th><a href="#splice">splice</a></th>
        </tr>
        <tr>
            <th><a href="#split">split</a></th>
           <th><a href="#sum">sum</a></th>
           <th><a href="#take">take</a></th>
           <th><a href="#toArray">toArray</a></th>
        </tr>
        <tr>
            <th><a href="#toJson">toJson</a></th>
           <th><a href="#jsonSerialize">jsonSerialize</a></th>
           <th><a href="#transform">transform</a></th>
           <th><a href="#union">union</a></th>
        </tr>
         <tr>
           <th><a href="#unique">unique</a></th>
           <th><a href="#values">values</a></th>
           <th><a href="#where">where</a></th>
           <th><a href="#whereIn">whereIn</a></th>
        </tr>
        <tr>
            <th><a href="#zip">zip</a></th>
        </tr>
    </tbody>
</table>

## Method Listing

### all()
The `all` method returns the underlying array represented by the collection:
```php
collect([1, 2, 3])->all();
 
// [1, 2, 3]
```

### average()
Alias for the `avg` method.

### avg()
The `avg` method returns the average value of a given key:
```php
$average = collect([['foo' => 10], ['foo' => 10], ['foo' => 20], ['foo' => 40]])->avg('foo');
 
// 20
 
$average = collect([1, 1, 2, 4])->avg();
 
// 2
```

### chunk()
The `chunk` method breaks the collection into multiple, smaller collections of a given size:
```php
$collection = collect([1, 2, 3, 4, 5, 6, 7]);
 
$chunks = $collection->chunk(4);
 
$chunks->toArray();
 
// [[1, 2, 3, 4], [5, 6, 7]]
```

### collapse()
The `collapse` method collapses a collection of arrays into a single, flat collection:
```php
$collection = collect([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
 
$collapsed = $collection->collapse();
 
$collapsed->all();
 
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### combine()
The `combine` method combines the keys of the collection with the values of another array or collection:
```php
$collection = collect(['name', 'age']);
 
$combined = $collection->combine(['George', 29]);
 
$combined->all();
 
// ['name' => 'George', 'age' => 29]
```

### concat()
The `concat` method appends the given `array` or collection values onto the end of the collection:
```php
$collection = collect(['John Doe']);
 
$concatenated = $collection->concat(['Jane Doe'])->concat(['name' => 'Johnny Doe']);
 
$concatenated->all();
 
// ['John Doe', 'Jane Doe', 'Johnny Doe']
```

### contains()
The contains method determines whether the collection contains a given item:
```php
$collection = collect(['name' => 'Desk', 'price' => 100]);
 
$collection->contains('Desk');
 
// true
 
$collection->contains('New York');
 
// false
```
You may also pass a key / value pair to the `contains` method, which will determine if the given pair exists in the collection:
```php
$collection = collect([
    ['product' => 'Desk', 'price' => 200],
    ['product' => 'Chair', 'price' => 100],
]);
 
$collection->contains('product', 'Bookcase');
 
// false
```
Finally, you may also pass a callback to the `contains` method to perform your own truth test:
```php
$collection = collect([1, 2, 3, 4, 5]);
 
$collection->contains(function ($value, $key) {
    return $value > 5;
});
 
// false
```

### count()
The `count` method returns the total number of items in the collection:
```php
$collection = collect([1, 2, 3, 4]);
 
$collection->count();
 
// 4
```

### diff()
The `diff` method compares the collection against another collection or a plain PHP `array` based on its values. This method will return the values in the original collection that are not present in the given collection:
```php
$collection = collect([1, 2, 3, 4, 5]);
 
$diff = $collection->diff([2, 4, 6, 8]);
 
$diff->all();
 
// [1, 3, 5]
```

### diffKeys()
The `diffKeys` method compares the collection against another collection or a plain PHP `array` based on its keys. This method will return the key / value pairs in the original collection that are not present in the given collection:
```php
$collection = collect([
    'one' => 10,
    'two' => 20,
    'three' => 30,
    'four' => 40,
    'five' => 50,
]);
 
$diff = $collection->diffKeys([
    'two' => 2,
    'four' => 4,
    'six' => 6,
    'eight' => 8,
]);
 
$diff->all();
 
// ['one' => 10, 'three' => 30, 'five' => 50]
```

### each()
The `each` method iterates over the items in the collection and passes each item to a callback:
```php
$collection->each(function ($item, $key) {
    //
});
```
If you would like to stop iterating through the items, you may return false from your callback:
```php
$collection->each(function ($item, $key) {
    if (/* some condition */) {
        return false;
    }
});
```

### every()
The `every` method may be used to verify that all elements of a collection pass a given truth test:
```php
collect([1, 2, 3, 4])->every(function ($value, $key) {
    return $value > 2;
});
 
// false
```

### except()
The `except` method returns all items in the collection except for those with the specified keys:
```php
$collection = collect(['product_id' => 1, 'price' => 100, 'discount' => false]);
 
$filtered = $collection->except(['price', 'discount']);
 
$filtered->all();
 
// ['product_id' => 1]
```

For the inverse of `except`, see the <a href="#only">`only`</a> method.

### filter()
The `filter` method filters the collection using the given callback, keeping only those items that pass a given truth test:
```php
$collection = collect([1, 2, 3, 4]);
 
$filtered = $collection->filter(function ($value, $key) {
    return $value > 2;
});
 
$filtered->all();
 
// [3, 4]
```
If no callback is supplied, all entries of the collection that are equivalent to false will be removed:
```php
$collection = collect([1, 2, 3, null, false, '', 0, []]);
 
$collection->filter()->all();
 
// [1, 2, 3]
```
For the inverse of `filter`, see the <a href="#reject">`reject`</a> method.

### first()
The `first` method returns the first element in the collection that passes a given truth test:
```php
collect([1, 2, 3, 4])->first(function ($value, $key) {
    return $value > 2;
});
 
// 3
```
You may also call the `first` method with no arguments to get the first element in the collection. If the collection is empty, `null` is returned:
```php
collect([1, 2, 3, 4])->first();
 
// 1
```

### flatMap()
The `flatMap` method iterates through the collection and passes each value to the given callback. The callback is free to modify the item and return it, thus forming a new collection of modified items. Then, the array is flattened by a level:
```php
$collection = collect([
    ['name' => 'Sally'],
    ['school' => 'Arkansas'],
    ['age' => 28]
]);
 
$flattened = $collection->flatMap(function ($values) {
    return array_map('strtoupper', $values);
});
 
$flattened->all();
 
// ['name' => 'SALLY', 'school' => 'ARKANSAS', 'age' => '28'];
```

### flatten()
The `flatten` method flattens a multi-dimensional collection into a single dimension:
```php
$collection = collect(['name' => 'taylor', 'languages' => ['php', 'javascript']]);
 
$flattened = $collection->flatten();
 
$flattened->all();
 
// ['taylor', 'php', 'javascript'];
```
You may optionally pass the function a "depth" argument:
```php
$collection = collect([
    'Apple' => [
        ['name' => 'iPhone 6S', 'brand' => 'Apple'],
    ],
    'Samsung' => [
        ['name' => 'Galaxy S7', 'brand' => 'Samsung']
    ],
]);
 
$products = $collection->flatten(1);
 
$products->values()->all();
 
/*
    [
        ['name' => 'iPhone 6S', 'brand' => 'Apple'],
        ['name' => 'Galaxy S7', 'brand' => 'Samsung'],
    ]
*/
```
In this example, calling `flatten` without providing the depth would have also flattened the nested arrays, resulting in ['iPhone 6S', 'Apple', 'Galaxy S7', 'Samsung']. Providing a depth allows you to restrict the levels of nested arrays that will be flattened.

### flip()
The `flip` method swaps the collection's keys with their corresponding values:
```php
$collection = collect(['name' => 'taylor', 'framework' => 'laravel']);
 
$flipped = $collection->flip();
 
$flipped->all();
 
// ['taylor' => 'name', 'laravel' => 'framework']
```

### forget()
The `forget` method removes an item from the collection by its key:
```php
$collection = collect(['name' => 'taylor', 'framework' => 'laravel']);
 
$collection->forget('name');
 
$collection->all();
 
// ['framework' => 'laravel']
```

### forPage()
The `forPage` method returns a new collection containing the items that would be present on a given page number. The method accepts the page number as its first argument and the number of items to show per page as its second argument:
```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9]);
 
$chunk = $collection->forPage(2, 3);
 
$chunk->all();
 
// [4, 5, 6]
```

### get()
The `get` method returns the item at a given key. If the key does not exist, `null` is returned:
```php
$collection = collect(['name' => 'taylor', 'framework' => 'laravel']);
 
$value = $collection->get('name');
 
// taylor
```
You may optionally pass a default value as the second argument:
```php
$collection = collect(['name' => 'taylor', 'framework' => 'laravel']);
 
$value = $collection->get('foo', 'default-value');
 
// default-value
```
You may even pass a callback as the default value. The result of the callback will be returned if the specified key does not exist:
```php
$collection->get('email', function () {
    return 'default-value';
});
 
// default-value
```

### groupBy()
The `groupBy` method groups the collection's items by a given key:
```php
$collection = collect([
    ['account_id' => 'account-x10', 'product' => 'Chair'],
    ['account_id' => 'account-x10', 'product' => 'Bookcase'],
    ['account_id' => 'account-x11', 'product' => 'Desk'],
]);
 
$grouped = $collection->groupBy('account_id');
 
$grouped->toArray();
 
/*
    [
        'account-x10' => [
            ['account_id' => 'account-x10', 'product' => 'Chair'],
            ['account_id' => 'account-x10', 'product' => 'Bookcase'],
        ],
        'account-x11' => [
            ['account_id' => 'account-x11', 'product' => 'Desk'],
        ],
    ]
*/
```
Instead of passing a string `key`, you may pass a callback. The callback should return the value you wish to key the group by:
```php
$grouped = $collection->groupBy(function ($item, $key) {
    return substr($item['account_id'], -3);
});
 
$grouped->toArray();
 
/*
    [
        'x10' => [
            ['account_id' => 'account-x10', 'product' => 'Chair'],
            ['account_id' => 'account-x10', 'product' => 'Bookcase'],
        ],
        'x11' => [
            ['account_id' => 'account-x11', 'product' => 'Desk'],
        ],
    ]
*/
```
Multiple grouping criteria may be passed as an array. Each array element will be applied to the corresponding level within a multi-dimensional array:
```php
$data = new Collection([
    10 => ['user' => 1, 'skill' => 1, 'roles' => ['Role_1', 'Role_3']],
    20 => ['user' => 2, 'skill' => 1, 'roles' => ['Role_1', 'Role_2']],
    30 => ['user' => 3, 'skill' => 2, 'roles' => ['Role_1']],
    40 => ['user' => 4, 'skill' => 2, 'roles' => ['Role_2']],
]);
 
$result = $data->groupBy([
    'skill',
    function ($item) {
        return $item['roles'];
    },
], $preserveKeys = true);
 
/*
[
    1 => [
        'Role_1' => [
            10 => ['user' => 1, 'skill' => 1, 'roles' => ['Role_1', 'Role_3']],
            20 => ['user' => 2, 'skill' => 1, 'roles' => ['Role_1', 'Role_2']],
        ],
        'Role_2' => [
            20 => ['user' => 2, 'skill' => 1, 'roles' => ['Role_1', 'Role_2']],
        ],
        'Role_3' => [
            10 => ['user' => 1, 'skill' => 1, 'roles' => ['Role_1', 'Role_3']],
        ],
    ],
    2 => [
        'Role_1' => [
            30 => ['user' => 3, 'skill' => 2, 'roles' => ['Role_1']],
        ],
        'Role_2' => [
            40 => ['user' => 4, 'skill' => 2, 'roles' => ['Role_2']],
        ],
    ],
];
*/
```

### has()
The `has` method determines if a given key exists in the collection:
```php
$collection = collect(['account_id' => 1, 'product' => 'Desk']);
 
$collection->has('product');
 
// true
```

### implode()
The `implode` method joins the items in a collection. Its arguments depend on the type of items in the collection. If the collection contains arrays or objects, you should pass the key of the attributes you wish to join, and the "glue" string you wish to place between the values:
```php
$collection = collect([
    ['account_id' => 1, 'product' => 'Desk'],
    ['account_id' => 2, 'product' => 'Chair'],
]);
 
$collection->implode('product', ', ');
 
// Desk, Chair
```
If the collection contains simple strings or numeric values, pass the "glue" as the only argument to the method:
```php
collect([1, 2, 3, 4, 5])->implode('-');
 
// '1-2-3-4-5'
```

### intersect()
The `intersect` method removes any values from the original collection that are not present in the given `array` or collection. The resulting collection will preserve the original collection's keys:
```php
$collection = collect(['Desk', 'Sofa', 'Chair']);
 
$intersect = $collection->intersect(['Desk', 'Chair', 'Bookcase']);
 
$intersect->all();
 
// [0 => 'Desk', 2 => 'Chair']
```

### isEmpty()
The `isEmpty` method returns true if the collection is empty; otherwise, false is returned:
```php
collect([])->isEmpty();
 
// true
```

### keyBy()
The `keyBy` method keys the collection by the given key. If multiple items have the same key, only the last one will appear in the new collection:
```php
$collection = collect([
    ['product_id' => 'prod-100', 'name' => 'Desk'],
    ['product_id' => 'prod-200', 'name' => 'Chair'],
]);
 
$keyed = $collection->keyBy('product_id');
 
$keyed->all();
 
/*
    [
        'prod-100' => ['product_id' => 'prod-100', 'name' => 'Desk'],
        'prod-200' => ['product_id' => 'prod-200', 'name' => 'Chair'],
    ]
*/
```
You may also pass a callback to the method. The callback should return the value to key the collection by:
```php
$keyed = $collection->keyBy(function ($item) {
    return strtoupper($item['product_id']);
});
 
$keyed->all();
 
/*
    [
        'PROD-100' => ['product_id' => 'prod-100', 'name' => 'Desk'],
        'PROD-200' => ['product_id' => 'prod-200', 'name' => 'Chair'],
    ]
*/
```

### keys()
The `keys` method returns all the collection's keys:
```php
$collection = collect([
    'prod-100' => ['product_id' => 'prod-100', 'name' => 'Desk'],
    'prod-200' => ['product_id' => 'prod-200', 'name' => 'Chair'],
]);
 
$keys = $collection->keys();
 
$keys->all();
 
// ['prod-100', 'prod-200']
```

### last()
The `last` method returns the last element in the collection that passes a given truth test:
```php
collect([1, 2, 3, 4])->last(function ($value, $key) {
    return $value < 3;
});
 
// 2
```
You may also call the `last` method with no arguments to get the last element in the collection. If the collection is empty, `null` is returned:
```php
collect([1, 2, 3, 4])->last();
 
// 4
```

### map()
The `map` method iterates through the collection and passes each value to the given callback. The callback is free to modify the item and return it, thus forming a new collection of modified items:
```php
$collection = collect([1, 2, 3, 4, 5]);
 
$multiplied = $collection->map(function ($item, $key) {
    return $item * 2;
});
 
$multiplied->all();
 
// [2, 4, 6, 8, 10]
```

### max()
The `max` method returns the maximum value of a given key:
```php
$max = collect([['foo' => 10], ['foo' => 20]])->max('foo');
 
// 20
 
$max = collect([1, 2, 3, 4, 5])->max();
 
// 5
```

### median()
The `median` method returns the median value of a given key:
```php
$median = collect([['foo' => 10], ['foo' => 10], ['foo' => 20], ['foo' => 40]])->median('foo');
 
// 15
 
$median = collect([1, 1, 2, 4])->median();
 
// 1.5
```

### merge()
The `merge` method merges the given array or collection with the original collection. If a string key in the given items matches a string key in the original collection, the given items's value will overwrite the value in the original collection:
```php
$collection = collect(['product_id' => 1, 'price' => 100]);
 
$merged = $collection->merge(['price' => 200, 'discount' => false]);
 
$merged->all();
 
// ['product_id' => 1, 'price' => 200, 'discount' => false]
```
If the given items's keys are numeric, the values will be appended to the end of the collection:
```php
$collection = collect(['Desk', 'Chair']);
 
$merged = $collection->merge(['Bookcase', 'Door']);
 
$merged->all();
 
// ['Desk', 'Chair', 'Bookcase', 'Door']
```

### mode()
The `mode` method returns the mode value of a given key:
```php
$mode = collect([['foo' => 10], ['foo' => 10], ['foo' => 20], ['foo' => 40]])->mode('foo');
 
// [10]
 
$mode = collect([1, 1, 2, 4])->mode();
 
// [1]
```

### min()
The `min` method returns the minimum value of a given key:
```php
$min = collect([['foo' => 10], ['foo' => 20]])->min('foo');
 
// 10
 
$min = collect([1, 2, 3, 4, 5])->min();
 
// 1
```

### only()
The `only` method returns the items in the collection with the specified keys:
```php
$collection = collect(['product_id' => 1, 'name' => 'Desk', 'price' => 100, 'discount' => false]);
 
$filtered = $collection->only(['product_id', 'name']);
 
$filtered->all();
 
// ['product_id' => 1, 'name' => 'Desk']
```

### pipe()
The `pipe` method passes the collection to the given callback and returns the result:
```php

```

### pluck()
The `pluck` method retrieves all of the values for a given key:
```php
$collection = collect([
    ['product_id' => 'prod-100', 'name' => 'Desk'],
    ['product_id' => 'prod-200', 'name' => 'Chair'],
]);
 
$plucked = $collection->pluck('name');
 
$plucked->all();
 
// ['Desk', 'Chair']
```
You may also specify how you wish the resulting collection to be keyed:
```php
$plucked = $collection->pluck('name', 'product_id');
 
$plucked->all();
 
// ['prod-100' => 'Desk', 'prod-200' => 'Chair']
```
If duplicate keys exist, the last matching element will be inserted into the plucked collection:
```php
$collection = collect([
    ['brand' => 'Tesla',  'color' => 'red'],
    ['brand' => 'Pagani', 'color' => 'white'],
    ['brand' => 'Tesla',  'color' => 'black'],
    ['brand' => 'Pagani', 'color' => 'orange'],
]);
 
$plucked = $collection->pluck('color', 'brand');
 
$plucked->all();
 
// ['Tesla' => 'black', 'Pagani' => 'orange']
```

### pop()
The `pop` method removes and returns the last item from the collection:
```php
$collection = collect([1, 2, 3, 4, 5]);
 
$collection->pop();
 
// 5
 
$collection->all();
 
// [1, 2, 3, 4]
```

### prepend()
The `prepend` method adds an item to the beginning of the collection:
```php
$collection = collect([1, 2, 3, 4, 5]);
 
$collection->prepend(0);
 
$collection->all();
 
// [0, 1, 2, 3, 4, 5]
```
You may also pass a second argument to set the key of the prepended item:
```php
$collection = collect(['one' => 1, 'two' => 2]);
 
$collection->prepend(0, 'zero');
 
$collection->all();
 
// ['zero' => 0, 'one' => 1, 'two' => 2]
```

### pull()
The `pull` method removes and returns an item from the collection by its key:
```php
$collection = collect(['product_id' => 'prod-100', 'name' => 'Desk']);
 
$collection->pull('name');
 
// 'Desk'
 
$collection->all();
 
// ['product_id' => 'prod-100']
```

### push()
The `push` method appends an item to the end of the collection:
```php
$collection = collect([1, 2, 3, 4]);
 
$collection->push(5);
 
$collection->all();
 
// [1, 2, 3, 4, 5]
```

### put()
The `put` method sets the given key and value in the collection:
```php
$collection = collect(['product_id' => 1, 'name' => 'Desk']);
 
$collection->put('price', 100);
 
$collection->all();
 
// ['product_id' => 1, 'name' => 'Desk', 'price' => 100]
```

### random()
The `random` method returns a random item from the collection:
```php
$collection = collect([1, 2, 3, 4, 5]);
 
$collection->random();
 
// 4 - (retrieved randomly)
```
You may optionally pass an integer to `random` to specify how many items you would like to randomly retrieve. A collection of items is always returned when explicitly passing the number of items you wish to receive:
```php
$random = $collection->random(3);
 
$random->all();
 
// [2, 4, 5] - (retrieved randomly)
```

### reduce()
The `reduce` method reduces the collection to a single value, passing the result of each iteration into the subsequent iteration:
```php
$collection = collect([1, 2, 3]);
 
$total = $collection->reduce(function ($carry, $item) {
    return $carry + $item;
});
 
// 6
```
The value for `$carry` on the first iteration is `null`; however, you may specify its initial value by passing a second argument to `reduce`:
```php
$collection->reduce(function ($carry, $item) {
    return $carry + $item;
}, 4);
 
// 10
```

### reject()
The `reject` method filters the collection using the given callback. The callback should return `true` if the item should be removed from the resulting collection:
```php
$collection = collect([1, 2, 3, 4]);
 
$filtered = $collection->reject(function ($value, $key) {
    return $value > 2;
});
 
$filtered->all();
 
// [1, 2]
```

### reverse()
The `reverse` method reverses the order of the collection's items, preserving the original keys:
```php
$collection = collect(['a', 'b', 'c', 'd', 'e']);
 
$reversed = $collection->reverse();
 
$reversed->all();
 
/*
    [
        4 => 'e',
        3 => 'd',
        2 => 'c',
        1 => 'b',
        0 => 'a',
    ]
*/
```

### search()
The `search` method searches the collection for the given value and returns its key if found. If the item is not found, `false` is returned.
```php
$collection = collect([2, 4, 6, 8]);
 
$collection->search(4);
 
// 1
```
The search is done using a "loose" comparison, meaning a string with an integer value will be considered equal to an integer of the same value. To use "strict" comparison, pass `true` as the second argument to the method:
```php
$collection->search('4', true);
 
// false
```
Alternatively, you may pass in your own callback to search for the first item that passes your truth test:
```php
$collection->search(function ($item, $key) {
    return $item > 5;
});
 
// 2
```

### shift()
The `shift` method removes and returns the first item from the collection:
```php
$collection = collect([1, 2, 3, 4, 5]);
 
$collection->shift();
 
// 1
 
$collection->all();
 
// [2, 3, 4, 5]
```

### shuffle()
The `shuffle` method randomly shuffles the items in the collection:
```php
$collection = collect([1, 2, 3, 4, 5]);
 
$shuffled = $collection->shuffle();
 
$shuffled->all();
 
// [3, 2, 5, 1, 4] - (generated randomly)
```

### slice()
The `slice` method returns a slice of the collection starting at the given index:
```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
 
$slice = $collection->slice(4);
 
$slice->all();
 
// [5, 6, 7, 8, 9, 10]
```
If you would like to limit the size of the returned slice, pass the desired size as the second argument to the method:
```php
$slice = $collection->slice(4, 2);
 
$slice->all();
 
// [5, 6]
```
The returned slice will preserve keys by default. If you do not wish to preserve the original keys, you can use the values method to reindex them.

### sort()
The `sort` method sorts the collection. The sorted collection keeps the original array keys, so in this example we'll use the values method to reset the keys to consecutively numbered indexes:
```php
$collection = collect([5, 3, 1, 2, 4]);
 
$sorted = $collection->sort();
 
$sorted->values()->all();
 
// [1, 2, 3, 4, 5]
```

### sortBy()
The `sortBy` method sorts the collection by the given key. The sorted collection keeps the original array keys, so in this example we'll use the values method to reset the keys to consecutively numbered indexes:
```php
$collection = collect([
    ['name' => 'Desk', 'price' => 200],
    ['name' => 'Chair', 'price' => 100],
    ['name' => 'Bookcase', 'price' => 150],
]);
 
$sorted = $collection->sortBy('price');
 
$sorted->values()->all();
 
/*
    [
        ['name' => 'Chair', 'price' => 100],
        ['name' => 'Bookcase', 'price' => 150],
        ['name' => 'Desk', 'price' => 200],
    ]
*/
```
You can also pass your own callback to determine how to sort the collection values:
```php
$collection = collect([
    ['name' => 'Desk', 'colors' => ['Black', 'Mahogany']],
    ['name' => 'Chair', 'colors' => ['Black']],
    ['name' => 'Bookcase', 'colors' => ['Red', 'Beige', 'Brown']],
]);
 
$sorted = $collection->sortBy(function ($product, $key) {
    return count($product['colors']);
});
 
$sorted->values()->all();
 
/*
    [
        ['name' => 'Chair', 'colors' => ['Black']],
        ['name' => 'Desk', 'colors' => ['Black', 'Mahogany']],
        ['name' => 'Bookcase', 'colors' => ['Red', 'Beige', 'Brown']],
    ]
*/
```

### sortKeysDesc()
This method will sort the collection in the opposite order.

### splice()
The `splice` method removes and returns a slice of items starting at the specified index:
```php
$collection = collect([1, 2, 3, 4, 5]);
 
$chunk = $collection->splice(2);
 
$chunk->all();
 
// [3, 4, 5]
 
$collection->all();
 
// [1, 2]
```
You may pass a second argument to limit the size of the resulting chunk:
```php
$collection = collect([1, 2, 3, 4, 5]);
 
$chunk = $collection->splice(2, 1);
 
$chunk->all();
 
// [3]
 
$collection->all();
 
// [1, 2, 4, 5]
```
In addition, you can pass a third argument containing the new items to replace the items removed from the collection:
```php
$collection = collect([1, 2, 3, 4, 5]);
 
$chunk = $collection->splice(2, 1, [10, 11]);
 
$chunk->all();
 
// [3]
 
$collection->all();
 
// [1, 2, 10, 11, 4, 5]
```

### split()
The `split` method breaks a collection into the given number of groups
```php
$collection = collect([1, 2, 3, 4, 5]);
 
$groups = $collection->split(3);
 
$groups->toArray();
 
// [[1, 2], [3, 4], [5]]
```


### sum()
The sum method returns the sum of all items in the collection:
```php
collect([1, 2, 3, 4, 5])->sum();
 
// 15
```
If the collection contains nested arrays or objects, you should pass a key to use for determining which values to sum:
```php
$collection = collect([
    ['name' => 'JavaScript: The Good Parts', 'pages' => 176],
    ['name' => 'JavaScript: The Definitive Guide', 'pages' => 1096],
]);
 
$collection->sum('pages');
 
// 1272
```
In addition, you may pass your own callback to determine which values of the collection to sum:
```php
$collection = collect([
    ['name' => 'Chair', 'colors' => ['Black']],
    ['name' => 'Desk', 'colors' => ['Black', 'Mahogany']],
    ['name' => 'Bookcase', 'colors' => ['Red', 'Beige', 'Brown']],
]);
 
$collection->sum(function ($product) {
    return count($product['colors']);
});
 
// 6
```

### take()
The take method returns a new collection with the specified number of items:
```php
$collection = collect([0, 1, 2, 3, 4, 5]);
 
$chunk = $collection->take(3);
 
$chunk->all();
 
// [0, 1, 2]
```
You may also pass a negative integer to take the specified amount of items from the end of the collection:
```php
$collection = collect([0, 1, 2, 3, 4, 5]);
 
$chunk = $collection->take(-2);
 
$chunk->all();
 
// [4, 5]
```

### toJson()
The `toJson` method converts the collection into a JSON serialized string:
```php
$collection = collect(['name' => 'Desk', 'price' => 200]);
 
$collection->toJson();
 
// '{"name":"Desk", "price":200}'
```

### transform()
The `transform` method iterates over the collection and calls the given callback with each item in the collection. The items in the collection will be replaced by the values returned by the callback:
```php
$collection = collect([1, 2, 3, 4, 5]);
 
$collection->transform(function ($item, $key) {
    return $item * 2;
});
 
$collection->all();
 
// [2, 4, 6, 8, 10]
```

### union()
The `union` method adds the given array to the collection. If the given array contains keys that are already in the original collection, the original collection's values will be preferred:
```php
$collection = collect([1 => ['a'], 2 => ['b']]);
 
$union = $collection->union([3 => ['c'], 1 => ['b']]);
 
$union->all();
 
// [1 => ['a'], 2 => ['b'], 3 => ['c']]
```

### unique()
The `unique` method returns all of the unique items in the collection. The returned collection keeps the original array keys, so in this example we'll use the values method to reset the keys to consecutively numbered indexes:
```php
$collection = collect([1, 1, 2, 2, 3, 4, 2]);
 
$unique = $collection->unique();
 
$unique->values()->all();
 
// [1, 2, 3, 4]
```
When dealing with nested arrays or objects, you may specify the key used to determine uniqueness:
```php
$collection = collect([
    ['name' => 'iPhone 6', 'brand' => 'Apple', 'type' => 'phone'],
    ['name' => 'iPhone 5', 'brand' => 'Apple', 'type' => 'phone'],
    ['name' => 'Apple Watch', 'brand' => 'Apple', 'type' => 'watch'],
    ['name' => 'Galaxy S6', 'brand' => 'Samsung', 'type' => 'phone'],
    ['name' => 'Galaxy Gear', 'brand' => 'Samsung', 'type' => 'watch'],
]);
 
$unique = $collection->unique('brand');
 
$unique->values()->all();
 
/*
    [
        ['name' => 'iPhone 6', 'brand' => 'Apple', 'type' => 'phone'],
        ['name' => 'Galaxy S6', 'brand' => 'Samsung', 'type' => 'phone'],
    ]
*/
```
You may also pass your own callback to determine item uniqueness:
```php
$unique = $collection->unique(function ($item) {
    return $item['brand'].$item['type'];
});
 
$unique->values()->all();
 
/*
    [
        ['name' => 'iPhone 6', 'brand' => 'Apple', 'type' => 'phone'],
        ['name' => 'Apple Watch', 'brand' => 'Apple', 'type' => 'watch'],
        ['name' => 'Galaxy S6', 'brand' => 'Samsung', 'type' => 'phone'],
        ['name' => 'Galaxy Gear', 'brand' => 'Samsung', 'type' => 'watch'],
    ]
*/
```
The `unique` method uses "loose" comparisons when checking item values, meaning a string with an integer value will be considered equal to an integer of the same value

### values()
The `values` method returns a new collection with the keys reset to consecutive integers:
```php
$collection = collect([
    10 => ['product' => 'Desk', 'price' => 200],
    11 => ['product' => 'Desk', 'price' => 200]
]);
 
$values = $collection->values();
 
$values->all();
 
/*
    [
        0 => ['product' => 'Desk', 'price' => 200],
        1 => ['product' => 'Desk', 'price' => 200],
    ]
*/
```

### where()
The `where` method filters the collection by a given key / value pair:
```php
$collection = collect([
    ['product' => 'Desk', 'price' => 200],
    ['product' => 'Chair', 'price' => 100],
    ['product' => 'Bookcase', 'price' => 150],
    ['product' => 'Door', 'price' => 100],
]);
 
$filtered = $collection->where('price', 100);
 
$filtered->all();
 
/*
    [
        ['product' => 'Chair', 'price' => 100],
        ['product' => 'Door', 'price' => 100],
    ]
*/
```
The `where` method uses "loose" comparisons when checking item values, meaning a string with an integer value will be considered equal to an integer of the same value.

### whereIn()
The `whereIn` method filters the collection by a given key / value contained within the given array:
```php
$collection = collect([
    ['product' => 'Desk', 'price' => 200],
    ['product' => 'Chair', 'price' => 100],
    ['product' => 'Bookcase', 'price' => 150],
    ['product' => 'Door', 'price' => 100],
]);
 
$filtered = $collection->whereIn('price', [150, 200]);
 
$filtered->all();
 
/*
    [
        ['product' => 'Bookcase', 'price' => 150],
        ['product' => 'Desk', 'price' => 200],
    ]
*/
```
The `whereIn` method uses "loose" comparisons when checking item values, meaning a string with an integer value will be considered equal to an integer of the same value.

### zip()
The `zip` method merges together the values of the given array with the values of the original collection at the corresponding index:
```php
$collection = collect(['Chair', 'Desk']);
 
$zipped = $collection->zip([100, 200]);
 
$zipped->all();
 
// [['Chair', 100], ['Desk', 200]]
```