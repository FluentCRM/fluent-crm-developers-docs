---
title: Custom Automation Trigger
description: "Learn how to create a custom automation trigger for FluentCRM by extending the BaseTrigger class."
---

# Custom Trigger

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

A trigger is an event that starts an automation funnel. For example, when a user enrolls in a course, subscribes to a newsletter, or logs in. Triggers are the entry point of every automation.

## Base Class

Extend `FluentCrm\App\Services\Funnel\BaseTrigger` and implement the required abstract methods.

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `$triggerName` | String | Unique identifier for this trigger (used as the WordPress action name) |
| `$priority` | Int | Priority for `add_action` registration. Default `10` |
| `$actionArgNum` | Int | Number of arguments passed to the WordPress action callback. Default `1` |

**Abstract methods you must implement:**

| Method | Returns | Description |
|--------|---------|-------------|
| `getTrigger()` | Array | Trigger metadata (category, label, description, icon) |
| `getFunnelSettingsDefaults()` | Array | Default values for the funnel settings fields |
| `getSettingsFields($funnel)` | Array | Settings fields displayed when configuring the trigger |
| `handle($funnel, $originalArgs)` | void | Called when the trigger event fires — processes the event and starts the funnel |

**Optional methods you can override:**

| Method | Returns | Description |
|--------|---------|-------------|
| `getConditionFields($funnel)` | Array | Additional condition fields (e.g., target user roles, run multiple times) |
| `getFunnelConditionDefaults($funnel)` | Array | Default values for condition fields |

## Step-by-Step Example

Let's create a trigger that fires when a user enrolls in a course.

### 1. Constructor

Set your trigger properties and call the parent constructor:

```php
<?php

namespace YourPlugin\Automation;

use FluentCrm\App\Services\Funnel\BaseTrigger;
use FluentCrm\App\Services\Funnel\FunnelHelper;
use FluentCrm\App\Services\Funnel\FunnelProcessor;
use FluentCrm\Framework\Support\Arr;

class CourseEnrolledTrigger extends BaseTrigger
{
    public function __construct()
    {
        $this->triggerName = 'your_plugin_course_enrolled';
        $this->priority = 20;
        $this->actionArgNum = 2;
        parent::__construct();
    }
}
```

The parent constructor calls `register()`, which hooks into the FluentCRM funnel system:
- Adds your trigger to the `fluentcrm_funnel_triggers` filter
- Registers `handle()` on the `fluentcrm_funnel_start_{triggerName}` action
- Registers `prepareEditorDetails()` on the `fluentcrm_funnel_editor_details_{triggerName}` filter

### 2. getTrigger()

Return metadata that identifies your trigger in the automation builder UI:

```php
public function getTrigger()
{
    return [
        'category'    => __('My Plugin', 'your-plugin'),
        'label'       => __('User Enrolled in Course', 'your-plugin'),
        'description' => __('This automation will start when a student enrolls in a course', 'your-plugin'),
        'icon'        => 'fc-icon-wp_new_user_signup',
    ];
}
```

The `icon` value should be one of the FluentCRM icon classes (prefixed with `fc-icon-`).

### 3. getFunnelSettingsDefaults() and getSettingsFields()

Define what settings the user can configure when creating an automation with this trigger:

```php
public function getFunnelSettingsDefaults()
{
    return [
        'subscription_status' => 'subscribed',
    ];
}

public function getSettingsFields($funnel)
{
    return [
        'title'     => __('User Enrolled in Course', 'your-plugin'),
        'sub_title' => __('This automation will start when a student enrolls in a course', 'your-plugin'),
        'fields'    => [
            'subscription_status' => [
                'type'        => 'option_selectors',
                'option_key'  => 'editable_statuses',
                'is_multiple' => false,
                'label'       => __('Subscription Status', 'your-plugin'),
                'placeholder' => __('Select Status', 'your-plugin'),
            ],
        ],
    ];
}
```

See [Form Field Types](/modules/form-field-code-structure) for all available field types.

### 4. getConditionFields() (Optional)

Add conditions like target courses, user roles, or whether to allow re-entry:

```php
public function getConditionFields($funnel)
{
    return [
        'update_type' => [
            'type'    => 'radio',
            'label'   => __('If Contact Already Exists?', 'your-plugin'),
            'help'    => __('Specify what happens if the subscriber already exists', 'your-plugin'),
            'options' => FunnelHelper::getUpdateOptions(),
        ],
        'course_ids' => [
            'type'        => 'multi-select',
            'label'       => __('Target Courses', 'your-plugin'),
            'help'        => __('Select which courses trigger this automation', 'your-plugin'),
            'options'     => $this->getCourseOptions(), // your method to fetch courses
            'inline_help' => __('Leave blank to run for any course', 'your-plugin'),
        ],
        'run_multiple' => [
            'type'        => 'yes_no_check',
            'label'       => '',
            'check_label' => __('Restart the automation multiple times for the same contact', 'your-plugin'),
            'inline_help' => __('If enabled, the automation restarts for contacts who are already in it', 'your-plugin'),
        ],
    ];
}

public function getFunnelConditionDefaults($funnel)
{
    return [
        'update_type'  => 'update',
        'course_ids'   => [],
        'run_multiple' => 'no',
    ];
}
```

### 5. handle()

This is the core method — called when your trigger event fires. It must:
1. Extract data from `$originalArgs`
2. Validate conditions (is this contact/event processable?)
3. Prepare subscriber data
4. Start the funnel sequence

```php
public function handle($funnel, $originalArgs)
{
    $courseId = $originalArgs[0];
    $userId = $originalArgs[1];

    // Check conditions
    if (!$this->isProcessable($funnel, $courseId, $userId)) {
        return false;
    }

    // Prepare subscriber data from WordPress user
    $subscriberData = FunnelHelper::prepareUserData($userId);
    $subscriberData['status'] = Arr::get($funnel->settings, 'subscription_status', 'subscribed');

    // Start the funnel
    (new FunnelProcessor())->startFunnelSequence($funnel, $subscriberData, [
        'source_trigger_name' => $this->triggerName,
        'source_ref_id'       => $courseId,
    ]);
}

private function isProcessable($funnel, $courseId, $userId)
{
    $conditions = $funnel->conditions;

    // Check if contact exists and handle accordingly
    $user = get_user_by('ID', $userId);
    $subscriber = FunnelHelper::getSubscriber($user->user_email);

    $updateType = Arr::get($conditions, 'update_type');
    if ($subscriber && $updateType == 'skip_all_if_exist') {
        return false;
    }

    // Check course filter
    $courseIds = Arr::get($conditions, 'course_ids', []);
    if (!empty($courseIds) && !in_array($courseId, $courseIds)) {
        return false;
    }

    // Check multiple run
    if ($subscriber && FunnelHelper::ifAlreadyInFunnel($funnel->id, $subscriber->id)) {
        $multipleRun = Arr::get($conditions, 'run_multiple') == 'yes';
        if ($multipleRun) {
            FunnelHelper::removeSubscribersFromFunnel($funnel->id, [$subscriber->id]);
        }
        return $multipleRun;
    }

    return true;
}
```

### 6. Fire the Trigger Event

In your plugin, fire the WordPress action that matches your `$triggerName` when the event occurs:

```php
// In your plugin's course enrollment handler:
do_action('your_plugin_course_enrolled', $courseId, $userId);
```

### 7. Register

Register your trigger class on the `fluent_crm/after_init` hook:

```php
add_action('fluent_crm/after_init', function () {
    new YourPlugin\Automation\CourseEnrolledTrigger();
});
```

## Complete Code

```php
<?php

namespace YourPlugin\Automation;

use FluentCrm\App\Services\Funnel\BaseTrigger;
use FluentCrm\App\Services\Funnel\FunnelHelper;
use FluentCrm\App\Services\Funnel\FunnelProcessor;
use FluentCrm\Framework\Support\Arr;

class CourseEnrolledTrigger extends BaseTrigger
{
    public function __construct()
    {
        $this->triggerName = 'your_plugin_course_enrolled';
        $this->priority = 20;
        $this->actionArgNum = 2;
        parent::__construct();
    }

    public function getTrigger()
    {
        return [
            'category'    => __('My Plugin', 'your-plugin'),
            'label'       => __('User Enrolled in Course', 'your-plugin'),
            'description' => __('This automation will start when a student enrolls in a course', 'your-plugin'),
            'icon'        => 'fc-icon-wp_new_user_signup',
        ];
    }

    public function getFunnelSettingsDefaults()
    {
        return [
            'subscription_status' => 'subscribed',
        ];
    }

    public function getSettingsFields($funnel)
    {
        return [
            'title'     => __('User Enrolled in Course', 'your-plugin'),
            'sub_title' => __('This automation will start when a student enrolls in a course', 'your-plugin'),
            'fields'    => [
                'subscription_status' => [
                    'type'        => 'option_selectors',
                    'option_key'  => 'editable_statuses',
                    'is_multiple' => false,
                    'label'       => __('Subscription Status', 'your-plugin'),
                    'placeholder' => __('Select Status', 'your-plugin'),
                ],
            ],
        ];
    }

    public function getConditionFields($funnel)
    {
        return [
            'update_type' => [
                'type'    => 'radio',
                'label'   => __('If Contact Already Exists?', 'your-plugin'),
                'help'    => __('Specify what happens if the subscriber already exists', 'your-plugin'),
                'options' => FunnelHelper::getUpdateOptions(),
            ],
            'course_ids' => [
                'type'        => 'multi-select',
                'label'       => __('Target Courses', 'your-plugin'),
                'help'        => __('Select which courses trigger this automation', 'your-plugin'),
                'options'     => $this->getCourseOptions(),
                'inline_help' => __('Leave blank to run for any course', 'your-plugin'),
            ],
            'run_multiple' => [
                'type'        => 'yes_no_check',
                'label'       => '',
                'check_label' => __('Restart the automation multiple times for the same contact', 'your-plugin'),
                'inline_help' => __('If enabled, the automation restarts for contacts who are already in it', 'your-plugin'),
            ],
        ];
    }

    public function getFunnelConditionDefaults($funnel)
    {
        return [
            'update_type'  => 'update',
            'course_ids'   => [],
            'run_multiple' => 'no',
        ];
    }

    public function handle($funnel, $originalArgs)
    {
        $courseId = $originalArgs[0];
        $userId = $originalArgs[1];

        if (!$this->isProcessable($funnel, $courseId, $userId)) {
            return false;
        }

        $subscriberData = FunnelHelper::prepareUserData($userId);
        $subscriberData['status'] = Arr::get($funnel->settings, 'subscription_status', 'subscribed');

        (new FunnelProcessor())->startFunnelSequence($funnel, $subscriberData, [
            'source_trigger_name' => $this->triggerName,
            'source_ref_id'       => $courseId,
        ]);
    }

    private function isProcessable($funnel, $courseId, $userId)
    {
        $conditions = $funnel->conditions;
        $user = get_user_by('ID', $userId);
        $subscriber = FunnelHelper::getSubscriber($user->user_email);

        $updateType = Arr::get($conditions, 'update_type');
        if ($subscriber && $updateType == 'skip_all_if_exist') {
            return false;
        }

        $courseIds = Arr::get($conditions, 'course_ids', []);
        if (!empty($courseIds) && !in_array($courseId, $courseIds)) {
            return false;
        }

        if ($subscriber && FunnelHelper::ifAlreadyInFunnel($funnel->id, $subscriber->id)) {
            $multipleRun = Arr::get($conditions, 'run_multiple') == 'yes';
            if ($multipleRun) {
                FunnelHelper::removeSubscribersFromFunnel($funnel->id, [$subscriber->id]);
            }
            return $multipleRun;
        }

        return true;
    }

    private function getCourseOptions()
    {
        // Replace with your plugin's course query
        return [
            ['id' => '1', 'title' => 'Introduction to PHP'],
            ['id' => '2', 'title' => 'Advanced WordPress Development'],
        ];
    }
}
```

**Source:** `app/Services/Funnel/BaseTrigger.php`
