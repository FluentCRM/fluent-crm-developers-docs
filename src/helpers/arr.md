---
description: "The Arr::add method adds a given key / value pair to an array if the given key doesn't already exist in the array:"
---

# Array Helper aka Arr

- Class with Namespace: `\FluentCrm\Framework\Support\Arr`
- Method Types: `static`

<a name="method-array-add"></a>
### `Arr::add()`

The `Arr::add` method adds a given key / value pair to an array if the given key doesn't already exist in the array:
```php 
use FluentCrm\Framework\Support\Arr;

$array = Arr::add(['name' => 'Desk'], 'price', 100);

// ['name' => 'Desk', 'price' => 100]
```
    

<a name="method-array-collapse"></a>
### `Arr::collapse()`

The `Arr::collapse` method collapses an array of arrays into a single array:
```php 
use FluentCrm\Framework\Support\Arr;

$array = Arr::collapse([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

<a name="method-array-divide"></a>
### `Arr::divide()`

The `Arr::divide` method returns two arrays, one containing the keys, and the other containing the values of the given array:
```php 
use FluentCrm\Framework\Support\Arr;

[$keys, $values] = Arr::divide(['name' => 'Desk']);

// $keys: ['name']

// $values: ['Desk']
```

<a name="method-array-dot"></a>
### `Arr::dot()`

The `Arr::dot` method flattens a multi-dimensional array into a single level array that uses "dot" notation to indicate depth:
```php 
use FluentCrm\Framework\Support\Arr;

$array = ['products' => ['desk' => ['price' => 100]]];

$flattened = Arr::dot($array);

// ['products.desk.price' => 100]
```

<a name="method-array-except"></a>
### `Arr::except()`

The `Arr::except` method removes the given key / value pairs from an array:
```php 
use FluentCrm\Framework\Support\Arr;

$array = ['name' => 'Desk', 'price' => 100];

$filtered = Arr::except($array, ['price']);

// ['name' => 'Desk']
```
<a name="method-array-first"></a>
### `Arr::first()`

The `Arr::first` method returns the first element of an array passing a given truth test:
```php 
use FluentCrm\Framework\Support\Arr;

$array = [100, 200, 300];

$first = Arr::first($array, function ($value, $key) {
    return $value >= 150;
});

// 200
```
A default value may also be passed as the third parameter to the method. This value will be returned if no value passes the truth test:
```php 
use FluentCrm\Framework\Support\Arr;

$first = Arr::first($array, $callback, $default);
```

<a name="method-array-flatten"></a>
### `Arr::flatten()`

The `Arr::flatten` method flattens a multi-dimensional array into a single level array:

```php 
use FluentCrm\Framework\Support\Arr;

$array = ['name' => 'Joe', 'languages' => ['PHP', 'Ruby']];

$flattened = Arr::flatten($array);

// ['Joe', 'PHP', 'Ruby']
```

<a name="method-array-forget"></a>
### `Arr::forget()`

The `Arr::forget` method removes a given key / value pair from a deeply nested array using "dot" notation:

```php 
use FluentCrm\Framework\Support\Arr;

$array = ['products' => ['desk' => ['price' => 100]]];

Arr::forget($array, 'products.desk');

// ['products' => []]
```

<a name="method-array-get"></a>
### `Arr::get()`

The `Arr::get` method retrieves a value from a deeply nested array using "dot" notation:
```php 
use FluentCrm\Framework\Support\Arr;

$array = ['products' => ['desk' => ['price' => 100]]];

$price = Arr::get($array, 'products.desk.price');

// 100
```

The `Arr::get` method also accepts a default value, which will be returned if the specific key is not found:

```php 
use FluentCrm\Framework\Support\Arr;

$discount = Arr::get($array, 'products.desk.discount', 0);

// 0
```

<a name="method-array-has"></a>
### `Arr::has()`

The `Arr::has` method checks whether a given item or items exists in an array using "dot" notation:

```php 
use FluentCrm\Framework\Support\Arr;

$array = ['product' => ['name' => 'Desk', 'price' => 100]];

$contains = Arr::has($array, 'product.name');

// true

$contains = Arr::has($array, ['product.price', 'product.discount']);

// false
```

<a name="method-array-last"></a>
### `Arr::last()`

The `Arr::last` method returns the last element of an array passing a given truth test:
```php 
use FluentCrm\Framework\Support\Arr;

$array = [100, 200, 300, 110];

$last = Arr::last($array, function ($value, $key) {
    return $value >= 150;
});

// 300
```

A default value may be passed as the third argument to the method. This value will be returned if no value passes the truth test:
```php 
use FluentCrm\Framework\Support\Arr;

$last = Arr::last($array, $callback, $default);
```

<a name="method-array-only"></a>
### `Arr::only()`

The `Arr::only` method returns only the specified key / value pairs from the given array:
```php 
use FluentCrm\Framework\Support\Arr;

$array = ['name' => 'Desk', 'price' => 100, 'orders' => 10];

$slice = Arr::only($array, ['name', 'price']);

// ['name' => 'Desk', 'price' => 100]
```
<a name="method-array-pluck"></a>
### `Arr::pluck()`

The `Arr::pluck` method retrieves all of the values for a given key from an array:
```php 
use FluentCrm\Framework\Support\Arr;

$array = [
    ['developer' => ['id' => 1, 'name' => 'Jewel']],
    ['developer' => ['id' => 2, 'name' => 'Adre']],
];

$names = Arr::pluck($array, 'developer.name');

// ['Jewel', 'Adre']
```
You may also specify how you wish the resulting list to be keyed:
```php 
use FluentCrm\Framework\Support\Arr;

$names = Arr::pluck($array, 'developer.name', 'developer.id');

// [1 => 'Jewel', 2 => 'Adre']
```
<a name="method-array-prepend"></a>
### `Arr::prepend()`

The `Arr::prepend` method will push an item onto the beginning of an array:
```php 
use FluentCrm\Framework\Support\Arr;

$array = ['one', 'two', 'three', 'four'];

$array = Arr::prepend($array, 'zero');

// ['zero', 'one', 'two', 'three', 'four']
```

If needed, you may specify the key that should be used for the value:
```php 
use FluentCrm\Framework\Support\Arr;

$array = ['price' => 100];

$array = Arr::prepend($array, 'Desk', 'name');

// ['name' => 'Desk', 'price' => 100]
```

<a name="method-array-pull"></a>
### `Arr::pull()`

The `Arr::pull` method returns and removes a key / value pair from an array:
```php 
use FluentCrm\Framework\Support\Arr;

$array = ['name' => 'Desk', 'price' => 100];

$name = Arr::pull($array, 'name');

// $name: Desk

// $array: ['price' => 100]
```

A default value may be passed as the third argument to the method. This value will be returned if the key doesn't exist:
```php 
use FluentCrm\Framework\Support\Arr;

$value = Arr::pull($array, $key, $default);
```
<a name="method-array-random"></a>
### `Arr::random()`

The `Arr::random` method returns a random value from an array:
```php 
use FluentCrm\Framework\Support\Arr;

$array = [1, 2, 3, 4, 5];

$random = Arr::random($array);

// 4 - (retrieved randomly)
```
You may also specify the number of items to return as an optional second argument. Note that providing this argument will return an array, even if only one item is desired:
```php 
use FluentCrm\Framework\Support\Arr;

$items = Arr::random($array, 2);

// [2, 5] - (retrieved randomly)
```

<a name="method-array-set"></a>
### `Arr::set()`

The `Arr::set` method sets a value within a deeply nested array using "dot" notation:
```php 
use FluentCrm\Framework\Support\Arr;

$array = ['products' => ['desk' => ['price' => 100]]];

Arr::set($array, 'products.desk.price', 200);

// ['products' => ['desk' => ['price' => 200]]]
```

<a name="method-array-sort"></a>
### `Arr::sort()`

The `Arr::sort` method sorts an array by its values:
```php 
use FluentCrm\Framework\Support\Arr;

$array = ['Desk', 'Table', 'Chair'];

$sorted = Arr::sort($array);

// ['Chair', 'Desk', 'Table']
```

You may also sort the array by the results of the given Closure:
```php 
use FluentCrm\Framework\Support\Arr;

$array = [
    ['name' => 'Desk'],
    ['name' => 'Table'],
    ['name' => 'Chair'],
];

$sorted = array_values(Arr::sort($array, function ($value) {
    return $value['name'];
}));

/*
    [
        ['name' => 'Chair'],
        ['name' => 'Desk'],
        ['name' => 'Table'],
    ]
*/
```
<a name="method-array-sort-recursive"></a>
### `Arr::sortRecursive()`

The `Arr::sortRecursive` method recursively sorts an array using the `sort` function for numeric sub=arrays and `ksort` for associative sub-arrays:
```php 
use FluentCrm\Framework\Support\Arr;

$array = [
    ['Roman', 'Taylor', 'Li'],
    ['PHP', 'Ruby', 'JavaScript'],
    ['one' => 1, 'two' => 2, 'three' => 3],
];

$sorted = Arr::sortRecursive($array);

/*
    [
        ['JavaScript', 'PHP', 'Ruby'],
        ['one' => 1, 'three' => 3, 'two' => 2],
        ['Li', 'Roman', 'Taylor'],
    ]
*/
```

<a name="method-array-where"></a>
### `Arr::where()`

The `Arr::where` method filters an array using the given Closure:
```php 
use FluentCrm\Framework\Support\Arr;

$array = [100, '200', 300, '400', 500];

$filtered = Arr::where($array, function ($value, $key) {
    return is_string($value);
});

// [1 => '200', 3 => '400']
```
