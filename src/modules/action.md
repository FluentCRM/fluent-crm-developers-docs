---
description: "An action is a precise task that is carried out when a specific trigger occurs. In the context of an application, an action is a programmed response to an event or user interaction."
---

#  Action
An action is a precise task that is carried out when a specific trigger occurs.
In the context of an application, an action is a programmed response to an event or user interaction.
For instance, when a user subscribes to a newsletter, an action could be sending a welcoming email.
These actions can be custom-made and tailored to perform any desired task. Creating an action such as adding a tag to a user when they subscribe to your newsletter,
is just one example of the flexibility actions provide in automating processes. It's the programmed response to a trigger that makes automation happen.
## Creating an Action
Creating an action is very much similar to creating a trigger with slight difference.
You just need to extend the `FluentCrm\App\Services\Funnel\BaseAction` class and implement the required methods.
Let's assume you want to apply a tag in your database when a user enroll a course. Please, note that FluentCRM already has a tag action.
But, we are creating a custom action for the sake of example.

Create a new class and extend the `FluentCrm\App\Services\Funnel\BaseAction` class. Constructor of the class has the following body:
```php
<?php
namespace Your\Plugin\Name\Automation;

use FluentCrm\App\Services\Funnel\BaseAction;

class AddToGroupAction extends BaseAction {
        
    public function __construct()
    {
        $this->actionName = 'add_to_custom_group_action';
        $this->priority = 20;
        parent::__construct();
    }
}
 ```
Define the `getBlock` method. This method  actually returns the block of the action. The block is the UI of the action.
```php
    public function getBlock()
    {
        return [
            'category'    => __('Awesome Course', 'your-plugin'),
            'title'       => __('Enroll to Group', 'your-plugin'),
            'description' => __('Add to a group for particular course', 'your-plugin'),
            'icon'        => 'fc-icon-apply_list', // use any icon you like 
        ];
    }
```
The following segment is the code for when UI block is clicked. This method returns the settings of the action.
```php

    public function getBlockFields()
       {
        $groupOptions = [
            [
                'id' => '1',
                'title' => 'Test'
            ],
            [
                'id' => '2',
                'title' => 'Test 2'
            ]
            //...
        ];
        return [
            'title'     => __('Enroll To a Group', 'fluent-crm'),
            'sub_title' => __('Enroll the subscriber to particular group related to the course', 'fluent-crm'),
            'fields'    => [
                'group_id'        => [
                    'type'        => 'select',
                    'options'     => $groupOptions,
                    'is_multiple' => false,
                    'clearable'   => true,
                    'label'       => __('Select Group to Enroll', 'fluent-crm'),
                    'placeholder' => __('Select Group', 'fluent-crm')
                ]
            ]
        ];
    }      
}
```

Define the `handle` method. This method is called when the action is executed. This method has the following body:
```php
    public function handle($subscriber, $sequence, $funnelSubscriberId, $funnelMetric)
    {
        $settings = $sequence->settings;
        $userId = $subscriber->getWpUserId();

        $groupId = Arr::get($settings, 'group_id');

        // if no group found 
        if (!$groupId) {
            $funnelMetric->notes = __('Funnel Skipped because no group found', 'your-plugin');
            $funnelMetric->save();
            FunnelHelper::changeFunnelSubSequenceStatus($funnelSubscriberId, $sequence->id, 'skipped');
            return false;
        }

        if (!$userId) {
            // If no user found then implement your logic here
           return false;
        }
        // you may also check if the user is already enrolled to the group
        if (already_enrolled_function()) { 
           // implement your logic here
            return false;
        }
        
        // here after all your checks you can enroll the user to the group in the below line
        
    }
```

Let's have a look at the full code of the action class:
```php
<?php

namespace Your\Plugin\Name\Automation;

use FluentCrm\App\Services\Funnel\BaseAction;
use FluentCrm\App\Services\Funnel\FunnelHelper;
use FluentCrm\Framework\Support\Arr;

class ApplyCustomTagAction extends BaseAction {
        
    public function __construct()
    {
        $this->actionName = 'add_to_custom_group_action';
        $this->priority = 20;
        parent::__construct();
    }
    
    public function getBlock()
    {
        return [
            'category'    => __('Awesome Course', 'your-plugin'),
            'title'       => __('Enroll to Group', 'your-plugin'),
            'description' => __('Add to a group for particular course', 'your-plugin'),
            'icon'        => 'fc-icon-apply_list', // use any icon you like 
        ];
    }
    
    public function getBlockFields()
    {
        $groupOptions = [
            [
                'id' => '1',
                'title' => 'Test'
            ],
            [
                'id' => '2',
                'title' => 'Test 2'
            ]
            //...
        ];
        return [
            'title'     => __('Enroll To a Group', 'your-plugin'),
            'sub_title' => __('Enroll the subscriber to particular group related to the course', 'your-plugin'),
            'fields'    => [
                'group_ids'           => [
                    'type'        => 'select',
                    'options' => $groupOptions,
                    'is_multiple' => false,
                    'clearable'   => true,
                    'label'       => __('Select Group to Enroll', 'your-plugin'),
                    'placeholder' => __('Select Group', 'your-plugin')
                ]
            ]
        ];
    }
    
    public function handle($subscriber, $sequence, $funnelSubscriberId, $funnelMetric)
    {
        $settings = $sequence->settings;
        $userId = $subscriber->getWpUserId();

        $groupId = Arr::get($settings, 'group_id');

        // if no group found 
        if (!$groupId) {
            $funnelMetric->notes = __('Funnel Skipped because no group found', 'your-plugin');
            $funnelMetric->save();
            FunnelHelper::changeFunnelSubSequenceStatus($funnelSubscriberId, $sequence->id, 'skipped');
            return false;
        }

        if (!$userId) {
            // If no user found then implement your logic here
           return false;
        }
        // you may also check if the user is already enrolled to the group
        if (already_enrolled_function()) { 
           // implement your logic here
            return false;
        }
        // here after all your checks you can enroll the user to the group in the below line
       
    }
        
}
```
## Registering the Action
All set! Your trigger is ready to use.
Call the class to register the workflow.
```php
add_action('fluent_crm/after_init', function () {
    new Your\Plugin\Name\Automation\AddToGroupAction();
});
```
