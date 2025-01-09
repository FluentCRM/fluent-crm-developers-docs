---
description: "The Str::camel method converts the given string to camelCase:"
---

# String Helper aka Str

- Class with Namespace: `\FluentCrm\Framework\Support\Str`
- Method Types: `static`



<a name="method-camel-case"></a>
### `Str::camel()`

The `Str::camel` method converts the given string to `camelCase`:

```php 
    use FluentCrm\Framework\Support\Str;

    $converted = Str::camel('foo_bar');

    // fooBar
```

<a name="method-ends-with"></a>
### `Str::endsWith()`

The `Str::endsWith` method determines if the given string ends with the given value:

```php 
    use FluentCrm\Framework\Support\Str;

    $result = Str::endsWith('This is my name', 'name');

    // true
```

<a name="method-kebab-case"></a>
### `Str::kebab()`

The `Str::kebab` method converts the given string to `kebab-case`:

```php 
    use FluentCrm\Framework\Support\Str;

    $converted = Str::kebab('fooBar');

    // foo-bar
```

<a name="method-preg-replace-array"></a>
### `preg_replace_array()`

The `preg_replace_array` function replaces a given pattern in the string sequentially using an array:

```php 
    $string = 'The event will take place between :start and :end';

    $replaced = preg_replace_array('/:[a-z_]+/', ['8:30', '9:00'], $string);

    // The event will take place between 8:30 and 9:00
```

<a name="method-snake-case"></a>
### `Str::snake()`

The `Str::snake` method converts the given string to `snake_case`:

```php 
    use FluentCrm\Framework\Support\Str;

    $converted = Str::snake('fooBar');

    // foo_bar
```

<a name="method-starts-with"></a>
### `Str::startsWith()`

The `Str::startsWith` method determines if the given string begins with the given value:

```php 
    use FluentCrm\Framework\Support\Str;

    $result = Str::startsWith('This is my name', 'This');

    // true
```

<a name="method-str-after"></a>
### `Str::after()`

The `Str::after` method returns everything after the given value in a string:

```php 
    use FluentCrm\Framework\Support\Str;

    $slice = Str::after('This is my name', 'This is');

    // ' my name'
```

<a name="method-str-before"></a>
### `Str::before()`

The `Str::before` method returns everything before the given value in a string:
```php 
    use FluentCrm\Framework\Support\Str;

    $slice = Str::before('This is my name', 'my name');

    // 'This is '
```

<a name="method-str-contains"></a>
### `Str::contains()`

The `Str::contains` method determines if the given string contains the given value (case sensitive):

```php 
    use FluentCrm\Framework\Support\Str;

    $contains = Str::contains('This is my name', 'my');

    // true
```

You may also pass an array of values to determine if the given string contains any of the values:

```php 
    use FluentCrm\Framework\Support\Str;

    $contains = Str::contains('This is my name', ['my', 'foo']);

    // true
```

<a name="method-str-finish"></a>
### `Str::finish()`

The `Str::finish` method adds a single instance of the given value to a string if it does not already end with the value:

```php 
    use FluentCrm\Framework\Support\Str;

    $adjusted = Str::finish('this/string', '/');

    // this/string/

    $adjusted = Str::finish('this/string/', '/');

    // this/string/
```

<a name="method-str-is"></a>
### `Str::is()`

The `Str::is` method determines if a given string matches a given pattern. Asterisks may be used to indicate wildcards:

```php 
    use FluentCrm\Framework\Support\Str;

    $matches = Str::is('foo*', 'foobar');

    // true

    $matches = Str::is('baz*', 'foobar');

    // false
```

<a name="method-str-limit"></a>
### `Str::limit()`

The `Str::limit` method truncates the given string at the specified length:

```php 
    use FluentCrm\Framework\Support\Str;

    $truncated = Str::limit('The quick brown fox jumps over the lazy dog', 20);

    // The quick brown fox...
```

You may also pass a third argument to change the string that will be appended to the end:

```php 
    use FluentCrm\Framework\Support\Str;

    $truncated = Str::limit('The quick brown fox jumps over the lazy dog', 20, ' (...)');

    // The quick brown fox (...)
```

<a name="method-str-ordered-uuid"></a>
### `Str::orderedUuid()`

The `Str::orderedUuid` method generates a "timestamp first" UUID that may be efficiently stored in an indexed database column:

```php 
    use FluentCrm\Framework\Support\Str;

    return (string) Str::orderedUuid();
```

<a name="method-str-plural"></a>
### `Str::plural()`

The `Str::plural` method converts a string to its plural form. This function currently only supports the English language:

```php 
    use FluentCrm\Framework\Support\Str;

    $plural = Str::plural('car');

    // cars

    $plural = Str::plural('child');

    // children
```

You may provide an integer as a second argument to the function to retrieve the singular or plural form of the string:

```php 
    use FluentCrm\Framework\Support\Str;

    $plural = Str::plural('child', 2);

    // children

    $plural = Str::plural('child', 1);

    // child
```

<a name="method-str-random"></a>
### `Str::random()`

The `Str::random` method generates a random string of the specified length. This function uses PHP's `random_bytes` function:

```php 
    use FluentCrm\Framework\Support\Str;

    $random = Str::random(40);
```

<a name="method-str-replace-array"></a>
### `Str::replaceArray()`

The `Str::replaceArray` method replaces a given value in the string sequentially using an array:

```php 
    use FluentCrm\Framework\Support\Str;

    $string = 'The event will take place between ? and ?';

    $replaced = Str::replaceArray('?', ['8:30', '9:00'], $string);

    // The event will take place between 8:30 and 9:00
```

<a name="method-str-replace-first"></a>
### `Str::replaceFirst()`

The `Str::replaceFirst` method replaces the first occurrence of a given value in a string:

```php 
    use FluentCrm\Framework\Support\Str;

    $replaced = Str::replaceFirst('the', 'a', 'the quick brown fox jumps over the lazy dog');

    // a quick brown fox jumps over the lazy dog
```

<a name="method-str-replace-last"></a>
### `Str::replaceLast()`

The `Str::replaceLast` method replaces the last occurrence of a given value in a string:

```php 
    use FluentCrm\Framework\Support\Str;

    $replaced = Str::replaceLast('the', 'a', 'the quick brown fox jumps over the lazy dog');

    // the quick brown fox jumps over a lazy dog
```

<a name="method-str-singular"></a>
### `Str::singular()`

The `Str::singular` method converts a string to its singular form. This function currently only supports the English language:

```php 
    use FluentCrm\Framework\Support\Str;

    $singular = Str::singular('cars');

    // car

    $singular = Str::singular('children');

    // child
```

<a name="method-str-slug"></a>
### `Str::slug()`

The `Str::slug` method generates a URL friendly "slug" from the given string:

```php 
    use FluentCrm\Framework\Support\Str;

    $slug = Str::slug('Laravel 5 Framework', '-');

    // laravel-5-framework
```

<a name="method-str-start"></a>
### `Str::start()`

The `Str::start` method adds a single instance of the given value to a string if it does not already start with the value:

```php 
    use FluentCrm\Framework\Support\Str;

    $adjusted = Str::start('this/string', '/');

    // /this/string

    $adjusted = Str::start('/this/string', '/');

    // /this/string
```

<a name="method-studly-case"></a>
### `Str::studly()`

The `Str::studly` method converts the given string to `StudlyCase`:

```php 
    use FluentCrm\Framework\Support\Str;

    $converted = Str::studly('foo_bar');

    // FooBar
```

<a name="method-title-case"></a>
### `Str::title()`

The `Str::title` method converts the given string to `Title Case`:

```php 
    use FluentCrm\Framework\Support\Str;

    $converted = Str::title('a nice title uses the correct case');

    // A Nice Title Uses The Correct Case
```

If the specified translation key does not exist, the `trans` function will return the given key. So, using the example above, the `trans` function would return `messages.welcome` if the translation key does not exist.

<a name="method-str-uuid"></a>
### `Str::uuid()`

The `Str::uuid` method generates a UUID (version 4):

```php 
    use FluentCrm\Framework\Support\Str;

    return (string) Str::uuid();
```
