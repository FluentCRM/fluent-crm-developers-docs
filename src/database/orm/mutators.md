---
description: "Accessors and mutators allow you to format Fluent ORM attribute values when you retrieve or set them on model instances."
---

# Fluent ORM: Mutators

<Badge type="tip" vertical="top" text="Fluent Framework" /> <Badge type="warning" vertical="top" text="ORM" />


## Introduction
Accessors and mutators allow you to format Fluent ORM attribute values when you retrieve or set them on model instances.


## Accessors & Mutators

### Defining An Accessor
To define an accessor, create a `getFirstNameAttribute` method on your model where Foo is the "studly" cased name of the column you wish to access. In this example, we'll define an accessor for the `first_name` attribute. The accessor will automatically be called by Fluent ORM when attempting to retrieve the value of the `first_name` attribute:
```php
<?php
 
namespace FluentCrm\App\Models;
 
use FluentCrm\Framework\Database\Orm\Model;
 
class User extends Model
{
    /**
     * Get the user's first name.
     *
     * @param  string  $value
     * @return string
     */
    public function getFirstNameAttribute($value)
    {
        return ucfirst($value);
    }
}
```
As you can see, the original value of the column is passed to the accessor, allowing you to manipulate and return the value. To access the value of the accessor, you may access the `first_name` attribute on a model instance:
```php
$user = FluentCrm\App\Models\User::find(1);
 
$firstName = $user->first_name;
```
Of course, you may also use accessors to return new, computed values from existing attributes:
```php
/**
 * Get the user's full name.
 *
 * @return string
 */
public function getFullNameAttribute()
{
    return "{$this->first_name} {$this->last_name}";
}
```

### Defining A Mutator
To define a mutator, define a `setFirstNameAttribute` method on your model where Foo is the "studly" cased name of the column you wish to access. So, again, let's define a mutator for the `first_name` attribute. This mutator will be automatically called when we attempt to set the value of the `first_name` attribute on the model:
```php
<?php
 
namespace FluentCrm\App\Models;
 
use FluentCrm\Framework\Database\Orm\Model;
 
class User extends Model
{
    /**
     * Set the user's first name.
     *
     * @param  string  $value
     * @return void
     */
    public function setFirstNameAttribute($value)
    {
        $this->attributes['first_name'] = strtolower($value);
    }
}
```
The mutator will receive the value that is being set on the attribute, allowing you to manipulate the value and set the manipulated value on the Fluent ORM model's internal `$attributes` property. So, for example, if we attempt to set the `first_name` attribute to Foo:
```php
$user = FluentCrm\App\Models\User::find(1);
 
$user->first_name = 'Foo';
```
In this example, the `setFirstNameAttribute` function will be called with the value `Foo`. The mutator will then apply the `strtolower` function to the name and set its resulting value in the internal `$attributes` `array`.

### Date Mutators
By default, Fluent ORM will convert the `created_at` and `updated_at` columns to instances of `DateTime`, which provide an assortment of helpful methods. You may customize which dates are automatically mutated, and even completely disable this mutation, by overriding the `$dates` property of your model:
```php
<?php
 
namespace FluentCrm\App\Models;
 
use FluentCrm\Framework\Database\Orm\Model;
 
class User extends Model
{
    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];
}
```
When a column is considered a date, you may set its value to a UNIX timestamp, date string `(Y-m-d)`, date-time string, and of course a `DateTime` instance, and the date's value will automatically be correctly stored in your database:
```php
$user = FluentCrm\App\Models\User::find(1);
 
$user->deleted_at = now();
 
$user->save();
```
As noted above, when retrieving attributes that are listed in your `$dates` property, they will automatically be cast to `DateTime` instances, allowing you to use any of `DateTime`'s methods on your attributes:
```php
$user = FluentCrm\App\Models\User::find(1);
 
return $user->deleted_at->getTimestamp();
```

### Date Formats
By default, timestamps are formatted as `Y-m-d H:i:s`. If you need to customize the timestamp format, set the `$dateFormat` property on your model. This property determines how date attributes are stored in the database, as well as their format when the model is serialized to an array or JSON:
```php
<?php
 
namespace FluentCrm\App\Models;
 
use FluentCrm\Framework\Database\Orm\Model;
 
class Flight extends Model
{
    /**
     * The storage format of the model's date columns.
     *
     * @var string
     */
    protected $dateFormat = 'U';
}
```


## Attribute Casting

The `$casts` property on your model provides a convenient method of converting attributes to common data types. The `$casts` property should be an array where the key is the name of the attribute being cast and the value is the type you wish to cast the column to. The supported cast types are: `int`, `integer`, `real`, `float`, `double`, `string`, `boolean`, `bool`, `object`, `array`, `json`, `collection`, `date`, `datetime`, and `timestamp`.

For example, let's cast the `is_admin` attribute, which is stored in our database as an integer `(0 or 1)` to a boolean value:
```php
<?php
 
namespace FluentCrm\App\Models;
 
use FluentCrm\Framework\Database\Orm\Model;
 
class User extends Model
{
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'is_admin' => 'boolean',
    ];
}
```
Now the `is_admin` attribute will always be cast to a boolean when you access it, even if the underlying value is stored in the database as an integer:
```php
$user = FluentCrm\App\Models\User::find(1);
 
if ($user->is_admin) {
    //
}
```


## Array & JSON Casting

The `array` cast type is particularly useful when working with columns that are stored as serialized JSON. For example, if your database has a JSON or TEXT field type that contains serialized JSON, adding the array cast to that attribute will automatically deserialize the attribute to a PHP array when you access it on your Eloquent model:
```php
<?php
 
namespace FluentCrm\App\Models;
 
use FluentCrm\Framework\Database\Orm\Model;
 
class User extends Model
{
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'options' => 'array',
    ];
}
```
Once the cast is defined, you may access the `options` attribute and it will automatically be deserialized from JSON into a PHP array. When you set the value of the `options` attribute, the given array will automatically be serialized back into JSON for storage:
```php
$user = FluentCrm\App\Models\User::find(1);
 
$options = $user->options;
 
$options['key'] = 'value';
 
$user->options = $options;
 
$user->save();
```


## Date Casting

When using the `date` or `datetime` cast type, you may specify the date's format. 
```php
/**
 * The attributes that should be cast to native types.
 *
 * @var array
 */
protected $casts = [
    'created_at' => 'datetime:Y-m-d',
];
```