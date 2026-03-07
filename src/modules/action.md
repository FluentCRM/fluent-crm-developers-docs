---
title: Custom Automation Action
description: "Learn how to create a custom automation action for FluentCRM by extending the BaseAction class."
---

# Custom Action

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

An action is a task executed during an automation funnel. For example, adding a note to a contact, enrolling a user in a group, or sending data to an external API. Actions run sequentially after a trigger fires.

## Base Class

Extend `FluentCrm\App\Services\Funnel\BaseAction` and implement the required abstract methods.

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `$actionName` | String | Unique identifier for this action |
| `$priority` | Int | Priority for filter/action registration. Default `10` |

**Abstract methods you must implement:**

| Method | Returns | Description |
|--------|---------|-------------|
| `getBlock()` | Array | Block metadata (category, title, description, icon, default settings) |
| `getBlockFields()` | Array | Settings fields displayed when configuring this action in the editor |
| `handle($subscriber, $sequence, $funnelSubscriberId, $funnelMetric)` | void | Called when the action executes — performs the actual task |

## Step-by-Step Example

Let's create an action that adds a contact to a custom group in your plugin.

### 1. Constructor

Set your action name and call the parent constructor:

```php
<?php

namespace YourPlugin\Automation;

use FluentCrm\App\Services\Funnel\BaseAction;
use FluentCrm\App\Services\Funnel\FunnelHelper;
use FluentCrm\Framework\Support\Arr;

class AddToGroupAction extends BaseAction
{
    public function __construct()
    {
        $this->actionName = 'your_plugin_add_to_group';
        $this->priority = 20;
        parent::__construct();
    }
}
```

The parent constructor calls `register()`, which:
- Adds your block to the `fluentcrm_funnel_blocks` filter
- Adds your fields to the `fluentcrm_funnel_block_fields` filter
- Registers `handle()` on the `fluentcrm_funnel_sequence_handle_{actionName}` action

### 2. getBlock()

Return metadata for how this action appears in the automation builder:

```php
public function getBlock()
{
    return [
        'category'    => __('My Plugin', 'your-plugin'),
        'title'       => __('Add to Group', 'your-plugin'),
        'description' => __('Add the contact to a group in My Plugin', 'your-plugin'),
        'icon'        => 'fc-icon-apply_list',
        'settings'    => [
            'group_id' => '',
        ],
    ];
}
```

The `settings` key provides default values for the action's configuration fields.

### 3. getBlockFields()

Define the settings UI that appears when a user configures this action:

```php
public function getBlockFields()
{
    return [
        'title'     => __('Add to Group', 'your-plugin'),
        'sub_title' => __('Add the contact to a specific group', 'your-plugin'),
        'fields'    => [
            'group_id' => [
                'type'        => 'select',
                'options'     => $this->getGroupOptions(),
                'is_multiple' => false,
                'clearable'   => true,
                'label'       => __('Select Group', 'your-plugin'),
                'placeholder' => __('Choose a group', 'your-plugin'),
            ],
        ],
    ];
}
```

See [Form Field Types](/modules/form-field-code-structure) for all available field types.

### 4. handle()

This is the core method — called when the action executes for a contact. The four parameters are:

| Parameter | Type | Description |
|-----------|------|-------------|
| `$subscriber` | [Subscriber](/database/models/subscriber) | The contact being processed |
| `$sequence` | Object | The sequence step data (contains `settings` with the configured values) |
| `$funnelSubscriberId` | Int | The funnel-subscriber pivot record ID |
| `$funnelMetric` | Object | Metric record for logging notes and status |

```php
public function handle($subscriber, $sequence, $funnelSubscriberId, $funnelMetric)
{
    $settings = $sequence->settings;
    $groupId = Arr::get($settings, 'group_id');

    // Skip if no group selected
    if (!$groupId) {
        $funnelMetric->notes = __('Skipped: no group selected', 'your-plugin');
        $funnelMetric->save();
        FunnelHelper::changeFunnelSubSequenceStatus($funnelSubscriberId, $sequence->id, 'skipped');
        return false;
    }

    $userId = $subscriber->getWpUserId();
    if (!$userId) {
        FunnelHelper::changeFunnelSubSequenceStatus($funnelSubscriberId, $sequence->id, 'skipped');
        return false;
    }

    // Your plugin's enrollment logic
    your_plugin_add_user_to_group($userId, $groupId);
}
```

When skipping an action, use `FunnelHelper::changeFunnelSubSequenceStatus()` to mark the step as `'skipped'` so the automation can continue to the next step.

### 5. Register

```php
add_action('fluent_crm/after_init', function () {
    new YourPlugin\Automation\AddToGroupAction();
});
```

## Complete Code

```php
<?php

namespace YourPlugin\Automation;

use FluentCrm\App\Services\Funnel\BaseAction;
use FluentCrm\App\Services\Funnel\FunnelHelper;
use FluentCrm\Framework\Support\Arr;

class AddToGroupAction extends BaseAction
{
    public function __construct()
    {
        $this->actionName = 'your_plugin_add_to_group';
        $this->priority = 20;
        parent::__construct();
    }

    public function getBlock()
    {
        return [
            'category'    => __('My Plugin', 'your-plugin'),
            'title'       => __('Add to Group', 'your-plugin'),
            'description' => __('Add the contact to a group in My Plugin', 'your-plugin'),
            'icon'        => 'fc-icon-apply_list',
            'settings'    => [
                'group_id' => '',
            ],
        ];
    }

    public function getBlockFields()
    {
        return [
            'title'     => __('Add to Group', 'your-plugin'),
            'sub_title' => __('Add the contact to a specific group', 'your-plugin'),
            'fields'    => [
                'group_id' => [
                    'type'        => 'select',
                    'options'     => $this->getGroupOptions(),
                    'is_multiple' => false,
                    'clearable'   => true,
                    'label'       => __('Select Group', 'your-plugin'),
                    'placeholder' => __('Choose a group', 'your-plugin'),
                ],
            ],
        ];
    }

    public function handle($subscriber, $sequence, $funnelSubscriberId, $funnelMetric)
    {
        $settings = $sequence->settings;
        $groupId = Arr::get($settings, 'group_id');

        if (!$groupId) {
            $funnelMetric->notes = __('Skipped: no group selected', 'your-plugin');
            $funnelMetric->save();
            FunnelHelper::changeFunnelSubSequenceStatus($funnelSubscriberId, $sequence->id, 'skipped');
            return false;
        }

        $userId = $subscriber->getWpUserId();
        if (!$userId) {
            FunnelHelper::changeFunnelSubSequenceStatus($funnelSubscriberId, $sequence->id, 'skipped');
            return false;
        }

        // Your plugin's enrollment logic
        your_plugin_add_user_to_group($userId, $groupId);
    }

    private function getGroupOptions()
    {
        // Replace with your plugin's group query
        return [
            ['id' => '1', 'title' => 'Basic Group'],
            ['id' => '2', 'title' => 'Premium Group'],
        ];
    }
}
```

**Source:** `app/Services/Funnel/BaseAction.php`
