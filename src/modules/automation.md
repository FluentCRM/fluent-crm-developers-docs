# Automation

The automation module is a powerful tool for creating and managing complex workflows. It allows you to create workflows 
that can be triggered by different events. FLuentCRM provides a set of predefined events that you can use to trigger 
your workflows. You can also create your own custom events and trigger your workflows based on those events.
Let's have an example of a workflow that logs a message when a new user is registered on your site.

## Creating a Workflow
Creat a class that extends `FluentCrm\App\Services\Funnel\BaseTrigger` class.
constructor of the class should have the following signature:
```php
public function __construct()
{
    $this->triggerName = 'user_registered';
    $this->priority = 10;
    $this->actionArgNum = 1;
    parent::__construct();
}
```

The `triggerName` property is the name of the event that will trigger this workflow. In this case, it is `user_registered`.
The `priority` property is the priority of the action that will be added to the `add_action` function.
The `actionArgNum` property is the number of arguments that will be passed to the action callback.
Finally, call the parent constructor. 

Now, we need to define getTrigger method. This method should return an array of the trigger settings.

```php
public function getTrigger()
{
    return [
        'category'    => __('WordPress Triggers', 'my-plugin'),
        'label'       => __('Log New User Sign Up', 'my-plugin'),
        'description' => __('This will log a message after a user is created', 'my-plugin')
        'icon'        => 'fc-icon-wp_new_user_signup',
    ];
}
```

Define the `getFunnelSettingsDefaults` method. This method should return an array of the default settings for the workflow.
```php

public function getFunnelSettingsDefaults()
{
    return [
        'subscription_status' => 'subscribed'
    ];
 }
```

Define the `getSettingsFields` method. This method should return an array of the settings fields that will be displayed in the workflow settings page.
```php
public function getSettingsFields($funnel)
{
    return [
        'title'     => __('New User Sign Up Funnel', 'my-plugin'),
        'sub_title' => __('This Funnel will be initiated when a new user has been registered in your site', 'my-plugin')
    ];
}
```

Finally, this class has a `handle` method that will be called when the workflow is triggered.
```php
public function handle($userId)
{
    $user = get_user_by('ID', $userId);
    $message = sprintf('New user %s has been registered', $user->user_email);
    $wpdb->insert(
        $wpdb->prefix . 'my_plugin_logs',
        [
            'message' => $message,
            'created_at' => current_time('mysql')
        ]
    );
```

The full class will look like this:
```php
<?php
... 
use FluentCrm\App\Services\Funnel\BaseTrigger;
class LogAfterUserCreation extends BaseTrigger {
    public function __construct()
    {
        $this->triggerName = 'your_action_name';
        $this->priority = 10;
        $this->actionArgNum = 1;
        parent::__construct();
    }
    public function getTrigger()
    {
        return [
            'category'    => __('WordPress Triggers', 'my-plugin'),
            'label'       => __('Your action title', 'my-plugin'),
            'description' => __('This will log a message after a user is created', 'my-plugin')
            'icon'        => 'fc-icon-wp_new_user_signup',
        ];
    }
    public function getFunnelSettingsDefaults()
    {
        return [
            'subscription_status' => 'subscribed'
        ];
    }
    public function getSettingsFields($funnel)
    {
        return [
            'title'     => __('New User Sign Up Funnel', 'my-plugin'),
            'sub_title' => __('This Funnel will be initiated when a new user has been registered in your site', 'my-plugin')
        ];
    }
    public function handle($userId)
    {
        $user = get_user_by('ID', $userId);
        $message = sprintf('New user %s has been registered', $user->user_email);
        $wpdb->insert(
            $wpdb->prefix . 'my_plugin_logs',
            [
                'message' => $message,
                'created_at' => current_time('mysql')
            ]
        );
    }
}
```

call the class to register the workflow.
```php
add_action('fluentcrm_loaded', function () {
    $trigger = new Your\Namespace\LogAfterUserCreation();
});
```