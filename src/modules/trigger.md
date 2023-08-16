# Trigger
An event or action that initiates a specific automated response, that is what we call a trigger.
For example, when a user subscribes to a newsletter, this action is considered a trigger.
A trigger is the foundation of any automation process, it starts the series of actions that follows. The trigger is the first step of automation.

## Creating a Trigger
Say, you are providing some courses on your plugin. You would like to trigger workflows when a user enrols to a course.
You can use the `course-enrolled` trigger to do that.
Create a class that extends `FluentCrm\App\Services\Funnel\BaseTrigger` class.
```php
<?php
namespace Your\Plugin\Name\Automation;
... 
use FluentCrm\App\Services\Funnel\BaseTrigger;

class CourseEnrolledTrigger extends BaseTrigger {


}
```
We need to override the default constructor method to set the trigger's properties.
Constructor of the class should have the following body:
```php

public function __construct()
{
    $this->triggerName = 'course-enrolled';
    $this->priority = 20;
    $this->actionArgNum = 1;
    parent::__construct();
}
```
The `triggerName` property is the name of the event that will trigger this workflow. For our case, let's name it `course-enrolled`.
The `priority` property is the priority of the action that will be added to the `add_action` function.
The `actionArgNum` property is the number of arguments that will be passed to the callback.
Finally, we need to call the parent constructor.

Now, we need to define getTrigger method. This method should return an array of the trigger settings.

```php
public function getTrigger()
{
    return [
        'category'    => __('Awesome Course', 'your-plugin'),
        'label'       => __('User enroll in a course', 'your-plugin'),
        'description' => __('The will start when a student enroll a course', 'your-plugin')
        'icon'        =>  'fc-icon-wp_new_user_signup',
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
You can customize settings as desired . Visit [Form Field Code Structure](/modules/form-field-code-structure/) for more information.

```php
public function getSettingsFields($funnel)
{
    return [
        'title'     => __('User enroll in a course', 'your-plugin'),
        'sub_title' => __('This will start when a student enroll a course', 'your-plugin'),
        'fields'    => [
            'subscription_status' => [
                'type'        => 'option_selectors',
                'option_key'  => 'editable_statuses',
                'is_multiple' => false,
                'label'       => __('Subscription Status', 'your-plugin'),
                'placeholder' => __('Select Status', 'your-plugin')
            ]
        ]
    ];
}
```
There should be an option to select the particular courses for which the workflow should be triggered.
This can be done by adding `getConditionFields` method.
```php
public function getConditionFields($funnel)
{
    $courseOptions = [
        [
            'id'    => '2',
            'title' => 'Think like a pro in JavaScript'
        ],
        [
            'id'    => '3',
            'title' => 'Master in wordpress plugin development'
        ]
    ];
    return [
        'update_type'  => [
            'type'    => 'radio',
            'label'   => __('If Contact Already Exist?', 'your-plugin'),
            'help'    => __('Please specify what will happen if the subscriber already exist in the database', 'your-plugin'),
            'options' => FunnelHelper::getUpdateOptions()
        ],
        'course_ids'   => [
            'type'        => 'multi-select',
            'label'       => __('Target Courses', 'your-plugin'),
            'help'        => __('Select for which Courses this automation will run', 'your-plugin'),
            'options'     => $courseOptions,
            'inline_help' => __('Keep it blank to run to any Course Enrollment', 'your-plugin')
        ],
        'run_multiple' => [
            'type'        => 'yes_no_check',
            'label'       => '',
            'check_label' => __('Restart the Automation Multiple times for a contact for this event. (Only enable if you want to restart automation for the same contact)', 'fluentcampaign-pro'),
            'inline_help' => __('If you enable, then it will restart the automation for a contact if the contact already in the automation. Otherwise, It will just skip if already exist', 'fluentcampaign-pro')
        ]
    ];
}
```
Let's populate some default values for condition fields with `getConditionDefaults` method.
```php
public function getConditionDefaults()
{
    return [
        'update_type'  => 'update', // skip_all_actions, skip_update_if_exist
        'course_ids'   => [],
        'run_multiple' => 'no'
    ];
}
```
The `handle` method needs to be defined in order for it to be called when the trigger event occurs. We are almost finished with this process.
The method takes two arguments. The first argument is the funnel object and second argument is the array of the arguments that are passed to the callback.
Note that, we must prepare subscriber data.
```php
// ... 
public function handle($funnel, $originalArgs)
{
    // separate the arguments
    $enrollmentReference = $originalArgs[0];
    $courseId = $originalArgs[1];
    $userId = $originalArgs[2];

    // get the funnel settings and conditions
    $settings = $funnel->settings;
    $conditions = $funnel->conditions;
    
    // prepare the subscriber data
    $subscriberData = [
        'email' => '', // required
        'first_name' => '',
        'last_name' => '',
        'status' => $settings['subscription_status']
    ];
    // or, you may use the FluentCRM helper function to prepare the subscriber data
    $subscriberData = FunnelHelper::prepareUserData($userId);

    // check if this funnel is able to process this course and run the automation
    if(!$this->isProcessable($funnel, $courseId, $subscriberData)) {
        return false;
    }
    
    // finally start funnel sequence for this subscriber
    (new \FluentCrm\App\Services\Funnel\FunnelProcessor())->startFunnelSequence($funnel, $subscriberData, [
        'source_trigger_name' => $this->triggerName,
        'source_ref_id' => $courseId // optional
    ]);
    
}
// ...
```
```php
// ...
// check if this funnel is able to process this course and run the automation
private function isProcessable($funnel, $courseId, $subscriberData)
{
    $conditions = $funnel->conditions;
    // check update_type
    $updateType = Arr::get($conditions, 'update_type');
    $subscriber = FunnelHelper::getSubscriber($subscriberData['email']);
    if ($subscriber && $updateType == 'skip_all_if_exist') {
        return false;
    }
    // check the products ids
    if($conditions['course_ids'] && !in_array($courseId, $conditions['course_ids'])) {
        return false;
    }
     // check run_only_one
    if ($subscriber && FunnelHelper::ifAlreadyInFunnel($funnel->id, $subscriber->id)) {
        $multipleRun = Arr::get($conditions, 'run_multiple') == 'yes';
        if ($multipleRun) {
            FunnelHelper::removeSubscribersFromFunnel($funnel->id, [$subscriber->id]);
        } else {
            return false;
        }
    }
    return true;
}
// ...
```
Everything is set and ready to go. Let's look at the full source code.
```php
<?php
namespace Your\Plugin\Name\Automation;
... 
use FluentCrm\App\Services\Funnel\BaseTrigger;
use FluentCrm\App\Services\Funnel\FunnelHelper;
use FluentCrm\Framework\Support\Arr;
use FluentCrm\App\Services\Funnel\FunnelProcessor;

class CourseEnrolledTrigger extends BaseTrigger {

    public function __construct()
    {
        $this->triggerName = 'course-enrolled';
        $this->priority = 20;
        $this->actionArgNum = 3;
        parent::__construct();
    }
    
    public function getTrigger()
    {
        return [
            'category'    => __('Awesome Course', 'your-plugin'),
            'label'       => __('User enroll in a course', 'your-plugin'),
            'description' => __('The will start when a student enroll a course', 'your-plugin')
            'icon'        =>  'fc-icon-wp_new_user_signup',
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
            'title'     => __('User enroll in a course', 'your-plugin'),
            'sub_title' => __('This will start when a student enroll a course', 'your-plugin'),
            'fields'    => [
                'subscription_status' => [
                    'type'        => 'option_selectors',
                    'option_key'  => 'editable_statuses',
                    'is_multiple' => false,
                    'label'       => __('Subscription Status', 'your-plugin'),
                    'placeholder' => __('Select Status', 'your-plugin')
                ]
            ]
        ];
    }
    
    public function getConditionFields($funnel)
    {
        $courseOptions = [
            [
                'id'    => '2',
                'title' => 'Think like a pro in JavaScript'
            ],
            [
                'id'    => '3',
                'title' => 'Master in wordpress plugin development'
            ]
        ];
        return [
            'update_type'  => [
                'type'    => 'radio',
                'label'   => __('If Contact Already Exist?', 'your-plugin'),
                'help'    => __('Please specify what will happen if the subscriber already exist in the database', 'your-plugin'),
                'options' => FunnelHelper::getUpdateOptions()
            ],
            'course_ids'   => [
                'type'        => 'multi-select',
                'label'       => __('Target Courses', 'your-plugin'),
                'help'        => __('Select for which Courses this automation will run', 'your-plugin'),
                'options'     => $courseOptions,
                'inline_help' => __('Keep it blank to run to any Course Enrollment', 'your-plugin')
            ],
            'run_multiple' => [
                'type'        => 'yes_no_check',
                'label'       => '',
                'check_label' => __('Restart the Automation Multiple times for a contact for this event. (Only enable if you want to restart automation for the same contact)', 'fluentcampaign-pro'),
                'inline_help' => __('If you enable, then it will restart the automation for a contact if the contact already in the automation. Otherwise, It will just skip if already exist', 'fluentcampaign-pro')
            ]
        ];
    }
    
    public function getConditionDefaults()
    {
        return [
            'update_type'  => 'update', // skip_all_actions, skip_update_if_exist
            'course_ids'   => [],
            'run_multiple' => 'no'
        ];
    }
    
    public function handle($funnel, $originalArgs)
    {
        // separate the arguments
        $enrollmentReference = $originalArgs[0];
        $courseId = $originalArgs[1];
        $userId = $originalArgs[2];
    
        // get the funnel settings and conditions
        $settings = $funnel->settings;
        $conditions = $funnel->conditions;
        
        // prepare the subscriber data
        $subscriberData = [
            'email' => '', // required
            'first_name' => '',
            'last_name' => '',
            'status' => $settings['subscription_status']
        ];
        // you may use the helper function to prepare the subscriber data
        $subscriberData = FunnelHelper::prepareUserData($userId);
    
        // check if this funnel is able to process this course and run the automation
        if(!$this->isProcessable($funnel, $courseId, $subscriberData)) {
            return false;
        }
        
        // finally start funnel sequence for this subscriber
        (new \FluentCrm\App\Services\Funnel\FunnelProcessor())->startFunnelSequence($funnel, $subscriberData, [
            'source_trigger_name' => $this->triggerName,
            'source_ref_id' => $courseId // optional
        ]);
    }
    
    // check if this funnel is able to process this course and run the automation
    private function isProcessable($funnel, $courseId, $subscriberData)
    {
        $conditions = $funnel->conditions;
        // check update_type
        $updateType = Arr::get($conditions, 'update_type');
        $subscriber = FunnelHelper::getSubscriber($subscriberData['email']);
        if ($subscriber && $updateType == 'skip_all_if_exist') {
            return false;
        }
        // check the products ids
        if($conditions['course_ids'] && !in_array($courseId, $conditions['course_ids'])) {
            return false;
        }
         // check run_only_one
        if ($subscriber && FunnelHelper::ifAlreadyInFunnel($funnel->id, $subscriber->id)) {
            $multipleRun = Arr::get($conditions, 'run_multiple') == 'yes';
            if ($multipleRun) {
                FunnelHelper::removeSubscribersFromFunnel($funnel->id, [$subscriber->id]);
            } else {
                return false;
            }
        }
        return true;
    }

}
```
## Registering the Trigger
All set! Your trigger is ready to use.
Call the class to register the workflow.
```php
add_action('fluentcrm_loaded', function () {
    new Your\Plugin\Name\Automation\CourseEnrolledTrigger();
});
```
