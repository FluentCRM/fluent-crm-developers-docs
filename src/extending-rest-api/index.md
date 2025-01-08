---
description: "REST (representational state transfer) is a software architectural style that defines a set of constraints to be used for creating Web services. RESTful Web services allow the requesting systems to access and manipulate Web resources through a standardized interface."
---

# Extend the REST API
<Badge type="tip" vertical="top" text="Fluent Framework" />
REST (representational state transfer) is a software architectural style that defines a set of constraints to be used for creating Web services. 
RESTful Web services allow the requesting systems to access and manipulate Web resources through a standardized interface.
In the context of a WordPress plugin, a REST API allows you to create custom endpoints that can be accessed via HTTP requests. These endpoints can be used to perform various tasks, 
such as retrieving data from the WordPress database, creating new posts, updating user information, etc.
For example, you might create a custom REST API endpoint that allows users to retrieve a list of posts from a specific category. To do this, you would create an endpoint URL (e.g. `/wp-json/fluent-crm/v2/posts`) 
and define a callback function that retrieves the posts from the database and returns them in a format 
that can be easily consumed by other systems (e.g. JSON).

## Registering a Custom Endpoint
FluentCRM uses WordPress REST API. So you can use any authorization method that supports WordPress. You may take a look at built-in
[REST API Section](https://rest-api.fluentcrm.com/).

FluentCRM enables you to add custom endpoints to its REST API from your plugin, by registering routes,
policies, and controllers in an easy and convenient way. 
Let's go through some examples of how you might set up a WordPress plugin to extend the FluentCRM plugin using routers and controllers along with policies.

## Routing
```php
add_action( 'fluentcrm_loaded', function( $app ) {
    $app->router->prefix( 'my-prefix' )->withPolicy( 'MyPlugin\Policies\MyPolicy' )->group( function( $router ) {
        $router->get( '/', 'MyPlugin\Controllers\MyController@index' );
        // more routes go here
    } );
});

```
The above code registers a route that will be accessible at `https://yourdomain.com/wp-json/fluent-crm/2/my-prefix/`.
- **API Base URL**: _`https://yourdomain.com/wp-json/fluent-crm/v2/`_

**Note:** _Make sure to autoload your classes. Otherwise, you may get an error like this:
`Class \MyPlugin\Policies\MyPolicy does not exist`. You need to autoload your classes before the `fluentcrm_loaded` action is fired._

This code uses the `add_action` function to register a callback function that will be called when the fluentcrm_loaded action is triggered.
The callback function sets up a route using the FluentCRM router, which is passed to the function as an argument.
The route is defined using the `prefix` and `group` methods of the router. The `prefix` method sets a prefix for the route, which will be added to the beginning of the route's URL. 
The `withPolicy` method sets a policy class that will be used to authorize the request. We will discuss policies in more detail later in this article.
The `group` method creates a group of routes that share the same prefix and policy.
Inside the group, the `get` method is used to define a route for a GET request to the URL `/my-prefix/`.
The route is handled by the `index` method of the MyController class in the `MyPlugin\Controllers` namespace.
Note that group and prefix methods are optional. You can also define routes without them.
```php
 $app->router->post( '/your-url-path/', 'MyPlugin\Controllers\MyController@create');
```
### Route Parameters
You can also define route parameters. For example, if you want to define a route that handles a GET request to the URL `/show/{id}`, 
you can do it like this:
```php
 $app->router->get('/show/{id}', 'MyPlugin\Controllers\MyController@show')->int('id');
```
The `int` method tells the router that the `id` parameter should be an integer. You may chain multiple methods to define multiple parameters.
The `alpha` accepts only alphabetic characters.
```php
 /* in routes */
 $app->router->get('/show/{id}/{name}', 'MyPlugin\Controllers\MyController@show')->int('id')->alpha('name');
 
/*
* Route parameters can be directly accessed in the controller method
*/
public function show($id, $name)
{
    // do something
}

```

### Available Router methods 
The router allows you to define routes for the following HTTP verb:
```php
$router->get( $uri, $callback);
$router->post( $uri, $callback);
$router->put( $uri, $callback);
$router->patch( $uri, $callback);
$router->delete( $uri, $callback);
$router->any( $uri, $callback); // responds to any HTTP verb
```

## Controllers
FluentCRM provides a base controller class that can be extended to create your own controllers. 
The base controller class provides a number of useful methods for working with the request and response objects.
Let's look at an example of a controller class that extends the base controller class:
```php
<?php

namespace MyPlugin\Controllers;

use FluentCrm\Framework\Http\Controller;

class MyController extends Controller
{
    
    public function index()
    {
        // Your controller logic goes here
        // must return something 
    }
}
```
#### Controller Methods

The base controller class provides the following methods with brief descriptions of what each method does:
- `send`: This method is used to send a response with data and a status code.
- `sendSuccess`: This method is used to send a success response with data and a status code.
- `sendError`: This method is used to send an error response with data and a status code
- `request`: This method returns the request object.
- `response`: This method returns the response object.

Let's look at the example of sendSuccess method:
```php
// send user data as json
public function index()
{
    $data = [
        'name' => 'John Doe',
        'email' => 'john.doe@mail.com'
    ];
    return $this->sendSuccess($data, 200);
}
/*
 * the following method takes the request object and returns a response object
 */
public function create()
{
    $data = $this->request->all();
    // do something with the data
    return $this->sendSuccess($data, 201);
}
```




## Policies
Policies are classes that are used to authorize requests to routes. 
The `verifyRequest` method is used to check if the current user has permission to access a route or method.
It returns a boolean value indicating whether the user has permission or not. To authorize it must return true.
You can customize the behavior of this method by checking for specific permissions or conditions. 
You may check for a specific capability, or check if the user is logged in, or check if the user is an administrator, or any other condition you like.
Let's look at an example of a policy class:

```php
<?php

namespace MyPlugin\Policies;

use FluentCrm\App\Http\Policies\BasePolicy;
use FluentCrm\Framework\Request\Request;

/**
 * MyPolicy is a custom policy class for the MyPlugin plugin.
 * It extends the base Policy class from the FluentCRM plugin and provides
 * additional functionality for handling authorization requests.
 */
class MyPolicy extends BasePolicy
{
    /**
     * @param \FluentCrm\Framework\Request\Request $request The request object containing information about the current request.
     * @return bool
     */
    public function verifyRequest(Request $request)
    {
        return true;
        //return $this->currentUserCan('fcrm_manage_contacts');
    }
}

```


## Directory Structure
Your directory structure may look something like this:
(Note that, the directory structure shown here is just an example. You can organize your files however you like.)

```
my-plugin/
├── my-plugin.php
├── Policies/
│   └── MyPolicy.php
└── Controllers/
    └── MyController.php

```

The my-plugin directory is the root directory for your plugin. It contains the following files and directories:

- `my-plugin.php`: This is the entry point for your plugin. It contains the code that run your Application when the plugin is activated.
- `Policies/`: This directory contains the `MyPolicy` class, which is a custom policy class for your plugin. It extends the base Policy class from the FluentCRM plugin and provides additional functionality for handling authorization requests.
- `Controllers/`: This directory contains the `MyController` class, which is a custom controller class for your plugin. It extends the base Controller class from the FluentCRM plugin and provides additional functionality for handling requests.