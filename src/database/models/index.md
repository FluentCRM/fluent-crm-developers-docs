# Database Model Basic

## Introduction
FluentCRM ORM provides a beautiful, simple ActiveRecord implementation for working with database tables. Each database table has a corresponding "Model" which is used to interact with that table. Models allow you to query for data in db tables, as well as insert new records into the table.

::: warning NOTE
FluentCRM offers helper functions and methods to interact with FluentCRM's database so you may use those things instead of Models directly. We are documenting these for our internal usage and very-high level usage by 3rd-party developers.
:::


## Built-in FluentCRM DB Models
All the built-in database models are available at

- `fluent-crm/app/Models/` (Free version)
- `fluentcampaign-pro/app/Models/` (Pro version)

In this Article we will use `FluentCrm\App\Models\Subscriber` model as an example.

## Retrieving Models
Think of each Eloquent model as a powerful query builder allowing you to fluently query the database table associated with the model. For example:

```php
<?php
 
$subscribers = FluentCrm\App\Models\Subscriber::all();
 
foreach ($subscribers as $subscriber) {
    echo $subscriber->email;
}

```

### Adding Additional Constraints

The ORM all method will return all of the results in the model's table. Since each model serves as a query builder, you may also add constraints to queries, and then use the get method to retrieve the results:

```php 
$subscribers = FluentCrm\App\Models\Subscriber::where('status', 'subscribed')
               ->orderBy('email', 'DESC')
               ->limit(10)
               ->skip(5)
               ->get();
```

## Retrieving Single Models / Aggregates

Of course, in addition to retrieving all of the records for a given table, you may also retrieve single records using find or first. Instead of returning a collection of models, these methods return a single model instance:

```php
// Retrieve a model by its primary key...
$subscribers = FluentCrm\App\Models\Subscriber::find(1);
 
// Retrieve the first model matching the query constraints...
$subscriber = FluentCrm\App\Models\Subscriber::where('status', 'subscribed')->first();
```

You may also call the find method with an array of primary keys, which will return a collection of the matching records:

```php
$subscribers = FluentCrm\App\Models\Subscriber::find([1,2,3]);
 ```

## Retrieving Aggregates

You may also use the count, sum, max, and other aggregate methods available. These methods return the appropriate scalar value instead of a full model instance:
```php
$count = FluentCrm\App\Models\Subscriber::where('status', 'subscribed')->count();

$max = FluentCrm\App\Models\Subscriber::where('status', 'subscribed')->max('id');
```

Available aggregate methods such as `count`, `max`, `min`, `avg`, and `sum`.


# Inserting & Updating Models

## Inserts
To create a new record in the database, create a new model instance, set attributes on the model, then call the save method:

```php 
$subscriber = FluentCrm\App\Models\Subscriber::create([
        'first_name' => 'John',
        'last_name'  => 'Doe',
        'email' => 'john@doe.com',
        'status' => 'subscribed'       
]);
```

## Updates

You can update a model few different way. You can assign property and then call `save()` method

```php 
$subscriber = FluentCrm\App\Models\Subscriber::find(1);

$subscriber->first_name = 'Jewel';
$subscriber->last_name = 'Shah';
$subscriber->save();
```

You can also update with an array

```php 
$subscriber = FluentCrm\App\Models\Subscriber::find(1);

$subscriber->update([
    'first_name' => 'Jewel',
    'last_name' => 'Shah'
]);
```

# Accessing Attributes

You can just call the database table column name for accessing the attributes

```php 
$subscriber = FluentCrm\App\Models\Subscriber::find(1);

$firstName = $subscriber->first_name;
$lastName = $subscriber->last_name;
$email = $subscriber->email;
```

# Deleting Models

To delete a model, call the delete method on a model instance:

```php 
  $subscriber = FluentCrm\App\Models\Subscriber::find(1);
  $subscriber->delete();
```

### Deleting Models By Query

Of course, you may also run a delete statement on a set of models. In this example, we will delete all flights that are marked as inactive. Like mass updates, mass deletes will not fire any model events for the models that are deleted:

```php
FluentCrm\App\Models\Subscriber::where('status', 'unsubscribed')->delete();
```

# Query Scopes
Scopes allow you to define common sets of constraints that you may easily re-use throughout application. For example, you may need to frequently retrieve all subscribers by given statuses.In FluentCRM Subscriber model we already have this scope defined like this.

```php

    /**
     * Local scope to filter subscribers by search/query string
     * @param \FluentCrm\Framework\Database\Query\Builder $query
     * @param array $statuses
     * @return \FluentCrm\Framework\Database\Query\Builder $query
     */
    public function scopeFilterByStatues($query, $statuses)
    {
        if ($statuses) {
            $query->whereIn('status', $statuses);
        }

        return $query;
    }

```

Now say you want to get subscribers where status equal subscribed and pending

```php 
$subsctibers = FluentCrm\App\Models\Subscriber::filterByStatues(['subscribed', 'pending'])->get();
```
Please note that, the first letter will be small case.

In the individual model documentation, you will find which FluentCRM models have scopes.

# Relationships
Database tables are often related to one another. For example, a subscriber has multiple campaign emails, or multiple tags / lists. FluentCRM ORM makes managing and working with these relationships easy.
Each Model has predefined relationships and you will find those in the individual model documentation.

```php 

$subsctiber = FluentCrm\App\Models\Subscriber::find(1);

// These will return corresponding Tag and List collection
$subscriberTags = $subsctiber->tags;
$subscriberLists = $subsctiber->lists;

```

For a single relation like and `CampaignEmail` belongs to a subscriber

```php 

$campaignEmail = FluentCrm\App\Models\CampaignEmail::find(1);
$subscriber = $campaignEmail->subscriber; // will return FluentCrm\App\Models\Subscriber
```
