---
title: Custom Automation Benchmark
description: "Learn how to create a custom automation benchmark (goal) for FluentCRM by extending the BaseBenchMark class."
---

# Custom Benchmark

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

A benchmark is a goal or checkpoint within an automation funnel. Unlike triggers (which start a funnel) and actions (which execute tasks), benchmarks act as conditional gates — the automation pauses until the contact meets the benchmark criteria.

For example, "Tag Applied" or "Link Clicked" are benchmarks. Contacts can also enter a funnel directly at a benchmark point if configured.

**Benchmarks have two types:**
- **Optional** — The automation continues past this point without waiting. If the benchmark fires later, the contact jumps to this point.
- **Required (Essential)** — The automation waits at this point until the contact meets the goal before continuing.

## Base Class

Extend `FluentCrm\App\Services\Funnel\BaseBenchMark` and implement the required abstract methods.

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `$triggerName` | String | The WordPress action name this benchmark listens to |
| `$actionArgNum` | Int | Number of arguments passed to the action callback. Default `1` |
| `$priority` | Int | Priority for registration. Default `10` |

**Abstract methods you must implement:**

| Method | Returns | Description |
|--------|---------|-------------|
| `getBlock()` | Array | Block metadata (title, description, icon, default settings) |
| `getBlockFields($funnel)` | Array | Settings fields for configuring this benchmark |
| `handle($benchMark, $originalArgs)` | void | Called when the benchmark event fires — checks if the contact matches |

**Built-in helper methods:**

| Method | Returns | Description |
|--------|---------|-------------|
| `benchmarkTypeField()` | Array | Standard radio field for choosing Optional vs Required |
| `canEnterField()` | Array | Standard checkbox for allowing direct entry at this point |

## Step-by-Step Example

Let's create a benchmark that triggers when specific tags from your plugin are applied to a contact.

### 1. Constructor

```php
<?php

namespace YourPlugin\Automation;

use FluentCrm\App\Services\Funnel\BaseBenchMark;
use FluentCrm\App\Services\Funnel\FunnelProcessor;
use FluentCrm\Framework\Support\Arr;

class TagAppliedBenchmark extends BaseBenchMark
{
    public function __construct()
    {
        $this->triggerName = 'your_plugin_tag_applied';
        $this->actionArgNum = 2;
        $this->priority = 20;
        parent::__construct();
    }
}
```

The parent constructor registers:
- `addBenchmark()` on the `fluentcrm_funnel_blocks` filter
- `pushBlockFields()` on the `fluentcrm_funnel_block_fields` filter
- `handle()` on the `fluentcrm_funnel_benchmark_start_{triggerName}` action
- `assertCurrentGoalState()` on the `fluent_crm/benchmark_already_asserted_{triggerName}` filter

### 2. getBlock()

Return block metadata. Note the `settings` key must include defaults for `type` (benchmark type) and `can_enter`:

```php
public function getBlock()
{
    return [
        'title'       => __('My Plugin Tag Applied', 'your-plugin'),
        'description' => __('This will run when selected tags are applied to a contact', 'your-plugin'),
        'icon'        => 'fc-icon-apply_list',
        'settings'    => [
            'tags'        => [],
            'select_type' => 'any',
            'type'        => 'optional',
            'can_enter'   => 'yes',
        ],
    ];
}
```

### 3. getBlockFields()

Define the settings UI. Use the built-in `benchmarkTypeField()` and `canEnterField()` helpers for the standard benchmark controls:

```php
public function getBlockFields($funnel)
{
    return [
        'title'     => __('My Plugin Tag Applied', 'your-plugin'),
        'sub_title' => __('This will run when selected tags are applied to a contact', 'your-plugin'),
        'fields'    => [
            'tags' => [
                'type'        => 'multi-select',
                'options'     => $this->getTagOptions(),
                'is_multiple' => true,
                'label'       => __('Select Tags', 'your-plugin'),
                'placeholder' => __('Select Tags', 'your-plugin'),
            ],
            'select_type' => [
                'label'   => __('Run When', 'your-plugin'),
                'type'    => 'radio',
                'inline'  => true,
                'options' => [
                    ['id' => 'any', 'title' => __('Contact has any of the selected tags', 'your-plugin')],
                    ['id' => 'all', 'title' => __('Contact has all of the selected tags', 'your-plugin')],
                ],
                'dependency' => [
                    'depends_on' => 'tags',
                    'operator'   => '!=',
                    'value'      => '',
                ],
            ],
            'type'      => $this->benchmarkTypeField(),
            'can_enter' => $this->canEnterField(),
        ],
    ];
}
```

See [Form Field Types](/modules/form-field-code-structure) for all available field types.

### 4. handle()

Called when the benchmark event fires. Check if the contact matches the benchmark criteria, and if so, start or resume the funnel from this point:

```php
public function handle($benchMark, $originalArgs)
{
    $tagIds = $originalArgs[0];
    $subscriber = $originalArgs[1];
    $settings = $benchMark->settings;

    // Quick check: do any applied tags overlap with configured tags?
    $isMatched = array_intersect($settings['tags'], $tagIds);
    if (!$isMatched) {
        return false;
    }

    $matchType = Arr::get($settings, 'select_type');
    $subscriberTags = $subscriber->tags->pluck('id')->toArray();
    $intersection = array_intersect($settings['tags'], $subscriberTags);

    if ($matchType === 'any') {
        $isMatched = !empty($intersection);
    } else {
        // All configured tags must be present
        $isMatched = count($intersection) === count($settings['tags']);
    }

    if (!$isMatched) {
        return false;
    }

    $funnelProcessor = new FunnelProcessor();
    $funnelProcessor->startFunnelFromSequencePoint($benchMark, $subscriber);
}
```

### 5. Fire the Benchmark Event

In your plugin, fire the action when the event occurs:

```php
// When tags are applied in your plugin:
do_action('your_plugin_tag_applied', $tagIds, $subscriber);
```

### 6. Register

```php
add_action('fluent_crm/after_init', function () {
    new YourPlugin\Automation\TagAppliedBenchmark();
});
```

## Complete Code

```php
<?php

namespace YourPlugin\Automation;

use FluentCrm\App\Services\Funnel\BaseBenchMark;
use FluentCrm\App\Services\Funnel\FunnelProcessor;
use FluentCrm\Framework\Support\Arr;

class TagAppliedBenchmark extends BaseBenchMark
{
    public function __construct()
    {
        $this->triggerName = 'your_plugin_tag_applied';
        $this->actionArgNum = 2;
        $this->priority = 20;
        parent::__construct();
    }

    public function getBlock()
    {
        return [
            'title'       => __('My Plugin Tag Applied', 'your-plugin'),
            'description' => __('This will run when selected tags are applied to a contact', 'your-plugin'),
            'icon'        => 'fc-icon-apply_list',
            'settings'    => [
                'tags'        => [],
                'select_type' => 'any',
                'type'        => 'optional',
                'can_enter'   => 'yes',
            ],
        ];
    }

    public function getBlockFields($funnel)
    {
        return [
            'title'     => __('My Plugin Tag Applied', 'your-plugin'),
            'sub_title' => __('This will run when selected tags are applied to a contact', 'your-plugin'),
            'fields'    => [
                'tags' => [
                    'type'        => 'multi-select',
                    'options'     => $this->getTagOptions(),
                    'is_multiple' => true,
                    'label'       => __('Select Tags', 'your-plugin'),
                    'placeholder' => __('Select Tags', 'your-plugin'),
                ],
                'select_type' => [
                    'label'   => __('Run When', 'your-plugin'),
                    'type'    => 'radio',
                    'inline'  => true,
                    'options' => [
                        ['id' => 'any', 'title' => __('Contact has any of the selected tags', 'your-plugin')],
                        ['id' => 'all', 'title' => __('Contact has all of the selected tags', 'your-plugin')],
                    ],
                    'dependency' => [
                        'depends_on' => 'tags',
                        'operator'   => '!=',
                        'value'      => '',
                    ],
                ],
                'type'      => $this->benchmarkTypeField(),
                'can_enter' => $this->canEnterField(),
            ],
        ];
    }

    public function handle($benchMark, $originalArgs)
    {
        $tagIds = $originalArgs[0];
        $subscriber = $originalArgs[1];
        $settings = $benchMark->settings;

        $isMatched = array_intersect($settings['tags'], $tagIds);
        if (!$isMatched) {
            return false;
        }

        $matchType = Arr::get($settings, 'select_type');
        $subscriberTags = $subscriber->tags->pluck('id')->toArray();
        $intersection = array_intersect($settings['tags'], $subscriberTags);

        if ($matchType === 'any') {
            $isMatched = !empty($intersection);
        } else {
            $isMatched = count($intersection) === count($settings['tags']);
        }

        if (!$isMatched) {
            return false;
        }

        $funnelProcessor = new FunnelProcessor();
        $funnelProcessor->startFunnelFromSequencePoint($benchMark, $subscriber);
    }

    private function getTagOptions()
    {
        // Replace with your plugin's tag query
        return [
            ['id' => 'beginner', 'title' => 'Beginner'],
            ['id' => 'advanced', 'title' => 'Advanced'],
        ];
    }
}
```

**Source:** `app/Services/Funnel/BaseBenchMark.php`
