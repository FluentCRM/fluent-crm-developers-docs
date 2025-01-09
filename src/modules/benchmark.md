---
description: "Benchmark is a goal or target that you want to reach. For example, when a user clicks on a link in your email then it can be a benchmark."
---

# Benchmark

Benchmark is a goal or target that you want to reach. For example, when a user clicks on a link in your email then it can be a benchmark.
When one or more tags are applied based on a trigger and a set of actions, then it can be a benchmark. A benchmark is the last step of an automation.

## Creating a Benchmark
Creating a benchmark is very much similar to creating a trigger or action with slight difference.
You just need to extend the `FluentCrm\App\Services\Funnel\BaseBenchmark` class and implement the required methods.
Let's assume some tags are applied for particular users when a course is enrolled. For those users, you want to end the automation. That means, they 
have reached the benchmark.
Please, note that FluentCRM already has a tag benchmark. But, we are creating a custom benchmark for the sake of example.

Create a new class and extend the `FluentCrm\App\Services\Funnel\BaseBenchmark` class. Constructor of the class has the following body:
```php
<?php
namespace Your\Plugin\Name\Automation;

use FluentCrm\App\Services\Funnel\BaseBenchmark;

class CourseEnrolledBenchmark extends BaseBenchmark {
        
    public function __construct()
    {
        $this->triggerName = 'your_own_action_trigger_name'; // Change this with your action trigger that you are targeting
        $this->actionArgNum = 2;
        $this->priority = 20;
        parent::__construct();
    }
}
```
Define the `getBlock` method. This method  actually returns the block of the benchmark. The block is the UI of the benchmark.
```php
    public function getBlock()
    {
        return [
            'category'    => __('MyTag Applied', 'your-plugin'),
            'title'       => __('Course Enrolled', 'your-plugin'),
            'description' => __('This will run when selected tags have been applied to a contact', 'your-plugin'),
            'icon'        => 'fc-icon-apply_list', // use any icon you like
            'settings'    => [
                'tags'        => [],
                'select_type' => 'any',
                'type'        => 'optional',
                'can_enter'   => 'yes'
            ]
        ];
    }
```
define `getDefaultSettings` method. This method returns the default settings of the benchmark.
```php
    public function getDefaultSettings()
    {
        return [
            'tags'        => [],
            'select_type' => 'any',
            'type'        => 'optional',
            'can_enter'   => 'yes'
        ];
    }
```

Now, you need to define `getBlockFields` method which returns the settings of the benchmark.
```php
    public function getBlockFields($funnel)
    {
        $yourCustomTags = [
            [
                'id'    => 'your-tag-id',
                'title' => 'Your Tag Title',
            ],
            [
                'id'    => 'your-other-tag-id',
                'title' => 'Your Other Tag Title',
            ]
        ];
        return [
            'title'     => __('My Plugin Tag Applied', 'your-plugin'),
            'sub_title' => __('This will run when selected Tags have been applied to a contact', 'your-plugin'),
            'fields'    => [
                'tags'        => [
                    'type'        => 'multi-select',
                    'options'  => $yourCustomTags,
                    'is_multiple' => true,
                    'label'       => __('Select Tags', 'your-plugin'),
                    'placeholder' => __('Select Tags', 'your-plugin')
                ],
                'select_type' => [
                    'label'      => __('Run When', 'your-plugin'),
                    'type'       => 'radio',
                    'inline'     => true,
                    'options'    => [
                        [
                            'id'    => 'any',
                            'title' => __('contact added in any of the selected Tags', 'fluent-crm')
                        ],
                        [
                            'id'    => 'all',
                            'title' => __('contact added in all of the selected Tags', 'fluent-crm')
                        ]
                    ],
                    'dependency' => [
                        'depends_on' => 'tags',
                        'operator'   => '!=',
                        'value'      => ''
                    ]
                ]
            ]
        ];
    }
```
Finally, you need to define `handle` method. This method is called when the benchmark is reached. You can do anything you want in this method.
```php
    public function handle($benchMark, $originalArgs)
    {
        $tagIds = $originalArgs[0];
        $subscriber = $originalArgs[1];
        $settings = $benchMark->settings;

        $isMatched = array_intersect($settings['tags'], $tagIds);
        if (!$isMatched) {
            return false; // not in our scope
        }

        $marchType = Arr::get($settings, 'select_type');

        $subscriberTags = $subscriber->tags->pluck('id')->toArray();
        $intersection = array_intersect($tagIds, $subscriberTags);

        if ($marchType === 'any') {
            // At least one funnel list id is available.
            $isMatched = !empty($intersection);
        } else {
            // All the funnel list ids are present.
            $isMatched = count($intersection) === count($settings['tags']);
        }

        if (!$isMatched) {
            return false; // not in our scope
        }

        $funnelProcessor = new FunnelProcessor();
        $funnelProcessor->startFunnelFromSequencePoint($benchMark, $subscriber);
    }
}
```
Let's see what we have done in the `handle` method. First, we have checked if the tags applied to the subscriber are in our scope or not. If not, then we have returned `false`.
Then, we have checked if the tags applied to the subscriber are matching with the tags of the benchmark or not. If not, then we have returned `false`.
Finally, we have started the automation from the benchmark.

The full code of the benchmark should look follows:
```php
<?php
namespace Your\Plugin\Name\Automation;

use FluentCrm\App\Services\Funnel\BaseBenchmark;
use FluentCrm\App\Services\Funnel\FunnelProcessor;
use FluentCrm\Includes\Helpers\Arr;

class CourseEnrolledBenchmark extends BaseBenchmark {
        
    public function __construct()
    {
        $this->triggerName = 'your_own_action_trigger_name';
        $this->actionArgNum = 2;
        $this->priority = 20;
        parent::__construct();
    }
    
    public function getBlock()
    {
        return [
            'category'    => __('MyTag Applied', 'your-plugin'),
            'title'       => __('Course Enrolled', 'your-plugin'),
            'description' => __('This will run when selected tags have been applied to a contact', 'your-plugin'),
            'icon'        => 'fc-icon-apply_list', // use any icon you like
            'settings'    => [
                'tags'        => [],
                'select_type' => 'any',
                'type'        => 'optional',
                'can_enter'   => 'yes'
            ]
        ];
    }
    public function getDefaultSettings()
    {
        return [
            'tags'        => [],
            'select_type' => 'any',
            'type'        => 'optional',
            'can_enter'   => 'yes'
        ];
    }
    
    public function getBlockFields($funnel)
    {
        $yourCustomTags = [
            [
                'id'    => 'your-tag-id',
                'title' => 'Your Tag Title',
            ],
            [
                'id'    => 'your-other-tag-id',
                'title' => 'Your Other Tag Title',
            ]
        ];
        return [
            'title'     => __('My Plugin Tag Applied', 'your-plugin'),
            'sub_title' => __('This will run when selected Tags have been applied to a contact', 'your-plugin'),
            'fields'    => [
                'tags'        => [
                    'type'        => 'multi-select',
                    'options'  => $yourCustomTags,
                    'is_multiple' => true,
                    'label'       => __('Select Tags', 'your-plugin'),
                    'placeholder' => __('Select Tags', 'your-plugin')
                ],
                'select_type' => [
                    'label'      => __('Run When', 'your-plugin'),
                    'type'       => 'radio',
                    'inline'     => true,
                    'options'    => [
                        [
                            'id'    => 'any',
                            'title' => __('contact added in any of the selected Tags', 'fluent-crm')
                        ],
                        [
                            'id'    => 'all',
                            'title' => __('contact added in all of the selected Tags', 'fluent-crm')
                        ]
                    ],
                    'dependency' => [
                        'depends_on' => 'tags',
                        'operator'   => '!=',
                        'value'      => ''
                    ]
                ]
            ]
        ];
    }
    
    public function handle($benchMark, $originalArgs)
    {
        $tagIds = $originalArgs[0];
        $subscriber = $originalArgs[1];
        $settings = $benchMark->settings;

        $isMatched = array_intersect($settings['tags'], $tagIds);
        if (!$isMatched) {
            return false; // not in our scope
        }

        $marchType = Arr::get($settings, 'select_type');

        $subscriberTags = $subscriber->tags->pluck('id')->toArray();
        $intersection = array_intersect($tagIds, $subscriberTags);

        if ($marchType === 'any') {
            // At least one funnel list id is available.
            $isMatched = !empty($intersection);
        } else {
            // All the funnel list ids are present.
            $isMatched = count($intersection) === count($settings['tags']);
        }

        if (!$isMatched) {
            return false; // not in our scope
        }

        $funnelProcessor = new FunnelProcessor();
        $funnelProcessor->startFunnelFromSequencePoint($benchMark, $subscriber);
    }
}
```
### Registering the Benchmark
Your benchmark is ready to use. Now, you need to register it with FluentCRM.
```php
add_action('fluentcrm_addons_loaded', function () {
    new Your\Plugin\Name\Automation\CourseEnrolledBenchmark();
},99);
```


