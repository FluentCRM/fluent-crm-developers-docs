---
description: "When building JSON APIs, you will often need to convert your models and relationships to arrays or JSON."
---

# Fluent ORM: Serialization

<Badge type="tip" vertical="top" text="Fluent Framework" /> <Badge type="warning" vertical="top" text="ORM" />


## Introduction

When building JSON APIs, you will often need to convert your models and relationships to arrays or JSON. Fluent ORM includes convenient methods for making these conversions, as well as controlling which attributes are included in your serializations.

## Serializing Models & Collections

### Serializing To Arrays
To convert a model and its loaded <a href="/database/orm/relationship">`relationships`</a> to an array, you should use the `toArray` method. This method is recursive, so all attributes and all relations (including the relations of relations) will be converted to arrays:
```php
$user = FluentCrm\App\Models\User::with('roles')->first();
 
return $user->toArray();
```
You may also convert entire <a href="/database/orm/collections">collections</a> of models to arrays:
```php
$user = FluentCrm\App\Models\User::all();
 
return $user->toArray();
```

### Serializing To JSON
To convert a model to JSON, you should use the `toJson` method. Like `toArray`, the toJson method is recursive, so all attributes and relations will be converted to JSON. You may also specify JSON encoding options supported by PHP:
```php
$user = FluentCrm\App\Models\User::find(1);
 
return $user->toJson();
 
return $user->toJson(JSON_PRETTY_PRINT);
```


## Hiding Attributes From JSON

Sometimes you may wish to limit the attributes, such as passwords, that are included in your model's array or JSON representation. To do so, add a `$hidden` property to your model:
```php
<?php
 
namespace FluentCrm\App\Models;
 
use FluentCrm\Framework\Database\Orm\Model;
 
class User extends Model
{
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['password'];
}
```

### Temporarily Modifying Attribute Visibility
If you would like to make some typically hidden attributes visible on a given model instance, you may use the `makeVisible` method. The makeVisible method returns the model instance for convenient method chaining:
```php
return $user->makeVisible('attribute')->toArray();
```
Likewise, if you would like to make some typically visible attributes hidden on a given model instance, you may use the `makeHidden` method.
```php
return $user->makeHidden('attribute')->toArray();
```


## Appending Values To JSON

Occasionally, when casting models to an array or JSON, you may wish to add attributes that do not have a corresponding column in your database. To do so, first define an accessor for the value:
```php
<?php
 
namespace FluentCrm\App\Models;
 
use FluentCrm\Framework\Database\Orm\Model;
 
class User extends Model
{
    /**
     * Get the administrator flag for the user.
     *
     * @return bool
     */
    public function getIsAdminAttribute()
    {
        return $this->attributes['admin'] == 'yes';
    }
}
```
After creating the accessor, add the attribute name to the `appends` property on the model. Note that attribute names are typically referenced in "snake case", even though the accessor is defined using "camel case":
```php
<?php
 
namespace FluentCrm\App\Models;
 
use FluentCrm\Framework\Database\Orm\Model;
 
class User extends Model
{
    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['is_admin'];
}
```
Once the attribute has been added to the `appends` list, it will be included in both the model's array and JSON representations. Attributes in the `appends` array will also respect the `visible` and `hidden` settings configured on the model.

### Appending At Run Time
You may instruct a single model instance to `append` attributes using the `append` method. Or, you may use the `setAppends` method to override the entire array of appended properties for a given model instance:
```php
return $user->append('is_admin')->toArray();
 
return $user->setAppends(['is_admin'])->toArray();
```

