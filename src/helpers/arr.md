# Array Helper (Arr)

- Class with Namespace: `FluentCrm\Framework\Support\Arr`
- Method Types: `static`

```php
use FluentCrm\Framework\Support\Arr;
```

## Inspection & Testing

### `Arr::accessible()`

Determines whether the given value is array accessible (plain array or `ArrayAccess` instance):

```php
Arr::accessible([1, 2, 3]);    // true
Arr::accessible(new Collection); // true
Arr::accessible('string');     // false
```

### `Arr::exists()`

Determines if the given key exists in the array. Supports `ArrayAccess`:

```php
$array = ['name' => 'John', 'age' => 30];

Arr::exists($array, 'name');  // true
Arr::exists($array, 'email'); // false
```

### `Arr::has()`

Checks whether all of the given keys exist in an array using "dot" notation:

```php
$array = ['product' => ['name' => 'Desk', 'price' => 100]];

Arr::has($array, 'product.name');                    // true
Arr::has($array, ['product.price', 'product.discount']); // false
```

### `Arr::hasAny()`

Checks whether **any** of the given keys exist in an array using "dot" notation:

```php
$array = ['product' => ['name' => 'Desk', 'price' => 100]];

Arr::hasAny($array, ['product.price', 'product.discount']); // true
Arr::hasAny($array, ['category', 'discount']);               // false
```

### `Arr::isAssoc()`

Returns `true` if the array is associative (does not have sequential integer keys starting from 0):

```php
Arr::isAssoc(['a' => 1, 'b' => 2]); // true
Arr::isAssoc([0, 1, 2]);            // false
```

### `Arr::isList()`

Returns `true` if the array is a list (sequential integer keys starting from 0 with no gaps):

```php
Arr::isList(['a', 'b', 'c']); // true
Arr::isList([1 => 'a']);       // false
```

### `Arr::isTrue()`

Returns a boolean indicating whether the value at the given key is truthy per `FILTER_VALIDATE_BOOLEAN`. Handles string values like `'true'`, `'yes'`, `'1'`, `'on'` and their falsy counterparts:

```php
$array = ['active' => 'yes', 'debug' => 'false'];

Arr::isTrue($array, 'active'); // true
Arr::isTrue($array, 'debug');  // false
```

### `Arr::contains()`

Returns `true` if **all** of the given values exist in the array:

```php
$array = ['apple', 'banana', 'cherry'];

Arr::contains($array, ['apple', 'banana']); // true
Arr::contains($array, ['apple', 'grape']);  // false
```

### `Arr::some()`

Returns `true` if at least one element passes the callback test (like JavaScript's `Array.some`):

```php
$array = [1, 2, 3, 4, 5];

Arr::some($array, fn($v) => $v > 4); // true
Arr::some($array, fn($v) => $v > 5); // false
```

### `Arr::every()`

Returns `true` if all elements pass the callback test (like JavaScript's `Array.every`):

```php
$array = [2, 4, 6, 8];

Arr::every($array, fn($v) => $v % 2 === 0); // true
```

---

## Access & Retrieval

### `Arr::get()`

Retrieves a value from a deeply nested array using "dot" notation:

```php
$array = ['products' => ['desk' => ['price' => 100]]];

$price = Arr::get($array, 'products.desk.price');
// 100

$discount = Arr::get($array, 'products.desk.discount', 0);
// 0 (default)
```

### `Arr::first()`

Returns the first element of an array passing a given truth test:

```php
$array = [100, 200, 300];

$first = Arr::first($array, function ($value, $key) {
    return $value >= 150;
});
// 200
```

A default value may be passed as the third parameter:

```php
$first = Arr::first($array, $callback, $default);
```

### `Arr::last()`

Returns the last element of an array passing a given truth test:

```php
$array = [100, 200, 300, 110];

$last = Arr::last($array, function ($value, $key) {
    return $value >= 150;
});
// 300
```

### `Arr::find()`

Returns the first element that satisfies the callback, or `null`. Pass `true` as third argument to return the key instead:

```php
$users = [
    ['name' => 'John', 'active' => false],
    ['name' => 'Jane', 'active' => true],
];

$active = Arr::find($users, fn($u) => $u['active']);
// ['name' => 'Jane', 'active' => true]

$key = Arr::find($users, fn($u) => $u['active'], true);
// 1
```

### `Arr::only()`

Returns only the specified key/value pairs from the given array:

```php
$array = ['name' => 'Desk', 'price' => 100, 'orders' => 10];

$slice = Arr::only($array, ['name', 'price']);
// ['name' => 'Desk', 'price' => 100]
```

### `Arr::pluck()`

Retrieves all of the values for a given key from an array:

```php
$array = [
    ['developer' => ['id' => 1, 'name' => 'Jewel']],
    ['developer' => ['id' => 2, 'name' => 'Adre']],
];

$names = Arr::pluck($array, 'developer.name');
// ['Jewel', 'Adre']

// Optionally key the result:
$names = Arr::pluck($array, 'developer.name', 'developer.id');
// [1 => 'Jewel', 2 => 'Adre']
```

### `Arr::random()`

Returns a random value from an array:

```php
$array = [1, 2, 3, 4, 5];

$random = Arr::random($array);
// 4 - (retrieved randomly)

// Multiple items:
$items = Arr::random($array, 2);
// [2, 5] - (retrieved randomly)
```

---

## Mutation & Modification

### `Arr::add()`

Adds a given key/value pair to an array if the given key doesn't already exist (supports dot notation):

```php
$array = Arr::add(['name' => 'Desk'], 'price', 100);
// ['name' => 'Desk', 'price' => 100]
```

### `Arr::set()`

Sets a value within a deeply nested array using "dot" notation:

```php
$array = ['products' => ['desk' => ['price' => 100]]];

Arr::set($array, 'products.desk.price', 200);
// ['products' => ['desk' => ['price' => 200]]]
```

### `Arr::forget()`

Removes a given key/value pair from a deeply nested array using "dot" notation (modifies by reference):

```php
$array = ['products' => ['desk' => ['price' => 100]]];

Arr::forget($array, 'products.desk');
// ['products' => []]
```

### `Arr::except()`

Returns a copy of the array with the specified keys removed:

```php
$array = ['name' => 'Desk', 'price' => 100];

$filtered = Arr::except($array, ['price']);
// ['name' => 'Desk']
```

### `Arr::pull()`

Returns and removes a key/value pair from an array:

```php
$array = ['name' => 'Desk', 'price' => 100];

$name = Arr::pull($array, 'name');
// $name: Desk
// $array: ['price' => 100]
```

### `Arr::prepend()`

Pushes an item onto the beginning of an array:

```php
$array = ['one', 'two', 'three', 'four'];

$array = Arr::prepend($array, 'zero');
// ['zero', 'one', 'two', 'three', 'four']

// With key:
$array = Arr::prepend(['price' => 100], 'Desk', 'name');
// ['name' => 'Desk', 'price' => 100]
```

### `Arr::insertAt()`

Inserts a new item at the given numeric position:

```php
$array = ['a', 'b', 'd'];

$result = Arr::insertAt($array, 2, 'c');
// ['a', 'b', 'c', 'd']
```

### `Arr::insertBefore()`

Inserts a new key-value pair immediately before the specified key:

```php
$array = ['name' => 'Desk', 'price' => 100];

$result = Arr::insertBefore($array, 'price', 'category', 'Furniture');
// ['name' => 'Desk', 'category' => 'Furniture', 'price' => 100]
```

### `Arr::insertAfter()`

Inserts a new key-value pair immediately after the specified key:

```php
$array = ['name' => 'Desk', 'price' => 100];

$result = Arr::insertAfter($array, 'name', 'category', 'Furniture');
// ['name' => 'Desk', 'category' => 'Furniture', 'price' => 100]
```

---

## Transformation

### `Arr::collapse()`

Collapses an array of arrays into a single array:

```php
$array = Arr::collapse([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### `Arr::divide()`

Returns two arrays — one containing the keys, the other containing the values:

```php
[$keys, $values] = Arr::divide(['name' => 'Desk']);
// $keys: ['name']
// $values: ['Desk']
```

### `Arr::dot()`

Flattens a multi-dimensional array into a single level using "dot" notation to indicate depth:

```php
$array = ['products' => ['desk' => ['price' => 100]]];

$flattened = Arr::dot($array);
// ['products.desk.price' => 100]
```

### `Arr::undot()`

Converts a flat dot-notation array back into a nested multi-dimensional array:

```php
$array = ['products.desk.price' => 100];

$nested = Arr::undot($array);
// ['products' => ['desk' => ['price' => 100]]]
```

### `Arr::flatten()`

Flattens a multi-dimensional array into a single level:

```php
$array = ['name' => 'Joe', 'languages' => ['PHP', 'Ruby']];

$flattened = Arr::flatten($array);
// ['Joe', 'PHP', 'Ruby']
```

### `Arr::where()`

Filters an array using the given closure:

```php
$array = [100, '200', 300, '400', 500];

$filtered = Arr::where($array, function ($value, $key) {
    return is_string($value);
});
// [1 => '200', 3 => '400']
```

### `Arr::whereNotNull()`

Returns the array with all `null` values removed:

```php
$array = ['a', null, 'b', null, 'c'];

$filtered = Arr::whereNotNull($array);
// [0 => 'a', 2 => 'b', 4 => 'c']
```

### `Arr::map()`

Recursively maps a callback to all non-iterable elements in an array. Delegates to WordPress `map_deep`:

```php
$array = ['name' => ' John ', 'address' => ['city' => ' NYC ']];

$trimmed = Arr::map($array, 'trim');
// ['name' => 'John', 'address' => ['city' => 'NYC']]
```

### `Arr::wrap()`

Wraps a value in an array. Returns `[]` for `null`, and the value unchanged if already an array:

```php
Arr::wrap('hello');   // ['hello']
Arr::wrap(['hello']); // ['hello']
Arr::wrap(null);      // []
```

### `Arr::query()`

Converts an array into a URL query string:

```php
$query = Arr::query(['name' => 'Desk', 'price' => 100]);
// 'name=Desk&price=100'
```

### `Arr::crossJoin()`

Returns all possible permutations (Cartesian product) of the given arrays:

```php
$result = Arr::crossJoin([1, 2], ['a', 'b']);
// [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
```

### `Arr::of()`

Wraps an array in a `Collection` instance:

```php
$collection = Arr::of(['a', 'b', 'c']);
// FluentCrm\Framework\Support\Collection
```

---

## Sorting

### `Arr::sort()`

Sorts an array by its values:

```php
$array = ['Desk', 'Table', 'Chair'];

$sorted = Arr::sort($array);
// ['Chair', 'Desk', 'Table']
```

You may also sort by the results of the given closure:

```php
$array = [
    ['name' => 'Desk'],
    ['name' => 'Table'],
    ['name' => 'Chair'],
];

$sorted = array_values(Arr::sort($array, function ($value) {
    return $value['name'];
}));
// [['name' => 'Chair'], ['name' => 'Desk'], ['name' => 'Table']]
```

### `Arr::sortRecursive()`

Recursively sorts an array using `sort` for numeric sub-arrays and `ksort` for associative sub-arrays:

```php
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

### `Arr::shuffle()`

Shuffles the array randomly, with an optional seed for deterministic output:

```php
$array = Arr::shuffle([1, 2, 3, 4, 5]);
// [3, 1, 5, 2, 4] - (shuffled randomly)
```

---

## Pattern Matching

### `Arr::like()`

Returns array values matching a pattern (case-insensitive, like SQL `LIKE`):

```php
$array = ['FluentCRM', 'FluentForm', 'WooCommerce'];

$result = Arr::like($array, 'fluent');
// ['FluentCRM', 'FluentForm']
```

### `Arr::keysLike()`

Returns items from the array whose keys match the pattern:

```php
$array = ['first_name' => 'John', 'last_name' => 'Doe', 'email' => 'john@example.com'];

$result = Arr::keysLike($array, 'name');
// ['first_name' => 'John', 'last_name' => 'Doe']
```

Other pattern matching methods: `notLike()`, `startsLike()`, `endsLike()`, `keysNotLike()`, `keysStartLike()`, `keysEndLike()`.
