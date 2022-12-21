# Form Field Code Structure

Fluent CRM has a cool structural format of generating form fields. Using this structural format anyone can make a form without writing any HTML or JavaScript. The form fields will depend on the structural format.

There are several types of form fields in Fluent CRM and all those have almost the same structural format. There are 26 types of form fields in fluent CRM. There are also some common and optional fields in every form block. Let’s look at first the common/optional fields

<table>
    <thead>
        <tr>
            <th>Key</th>
            <th>Description </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>label</td>
            <td>Label title of your form field</td>
        </tr>
        <tr>
            <td>inline_help</td>
            <td>Help message below your form input</td>
        </tr>
        <tr>
            <td>placeholder</td>
            <td>Placeholder of the selector</td>
        </tr>
        <tr>
            <td>help</td>
            <td>Description about selector</td>
        </tr>
        <tr>
            <td>wrapper_class</td>
            <td>(Optional) With this property, someone can customize the form block design.</td>
        </tr>
        <tr>
            <td>readonly</td>
            <td>(Optional) If this property is true, then the field will be read-only</td>
        </tr>
        <tr>
            <td>dependency</td>
            <td></td>
        </tr>
    </tbody>
</table>

- <a href="#option-selectors">Option selectors</a>
- <a href="#single-or-multi-select">Single or multi-select</a>
- <a href="#radio">Radio</a>
- <a href="#number-input">Number input</a>
- <a href="#text-input">Text input</a>
- <a href="#text-input-popper">Text input popper</a>
- <a href="#yes-no-check">Yes & no check</a>
- <a href="#grouped-select">Grouped select</a>
- <a href="#multi-text-options">Multi text options</a>
- <a href="#email-campaign-composer">Email campaign composer</a>
- <a href="#reload-field-selection">Reload field selection</a>
- <a href="#form-group-mapper">Form group mapper</a>
- <a href="#form-many-dropdown-mappers">Form many dropdown mappers</a>
- <a href="#html">Html</a>
- <a href="#url-selector">Url selector</a>
- <a href="#date-time">Date time</a>
- <a href="#condition-groups">Condition groups</a>
- <a href="#input-values-pair-properties">Input values pair properties</a>
- <a href="#text-values-multi-properties">Text values multi properties</a>
- <a href="#html-editor">Html editor</a>
- <a href="#rest-selector">Rest selector</a>
- <a href="#condition-block-groups">Condition block groups</a>
- <a href="#custom-sender-config">Custom sender config</a>
- <a href="#radio-buttons">Radio buttons</a>
- <a href="#checkboxes">Checkboxes</a>
- <a href="#time-selector">Time Selector</a>

## Option selectors

```php
'subscription_status' => [
    'type'        => 'option_selectors',
    'option_key'  => 'editable_statuses',
    'is_multiple' => false,
    'label'       => 'Subscription Status',
    'placeholder' => 'Select Status'
]
```
This is a simple `option_selectors` type field component, you can find this structure in every integration. The `option_key` is used to get the correct options from WordPress. The `is_multiple` defines whether the option selector is multiple or not.

<table>
    <thead>
        <tr>
            <th>Key</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>creatable</td>
            <td>Can the user create a new tag/list</td>
        </tr>
        <tr>
            <td>size</td>
            <td>(Optional) Size of the field </td>
        </tr>
        <tr>
            <td>option_key</td>
            <td>Dynamic Data Sets: Possible Values – <a href="#option-key-possible-sets">See bellow</a></td>
        </tr>
        <tr>
            <td>is_multiple</td>
            <td>If the selector is multiple or not</td>
        </tr>
    </tbody>
</table>

### Option Key possible sets.

<table>
    <thead>
        <tr>
            <th>Key</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>tags</td>
            <td>Tags are like Lists but more ways to filter your contacts inside a list.</td>
        </tr>
        <tr>
            <td>lists</td>
            <td>List are categories of your contacts.</td>
        </tr>
        <tr>
            <td>editable_statuses</td>
            <td>All editable statuses of a user</td>
        </tr>
        <tr>
            <td>woo_products</td>
            <td>All woo-commerce products</td>
        </tr>
        <tr>
            <td>email_sequences</td>
            <td>All sequences of Fluent-CRM</td>
        </tr>
        <tr>
            <td>campaigns</td>
            <td>All campaigns of Fluent-CRM</td>
        </tr>
        <tr>
            <td>product_selector_tutorlms</td>
            <td>All courses of TutorLMS</td>
        </tr>
        <tr>
            <td>edd_coupons</td>
            <td>All coupons of Easy Digital Download</td>
        </tr>
        <tr>
            <td>product_selector_learndash</td>
            <td>All options of Learndash courses</td>
        </tr>
        <tr>
            <td>product_selector_learndash_groups</td>
            <td>All options of Learndash groups</td>
        </tr>
        <tr>
            <td>product_selector_lifterlms</td>
            <td>All options of LifterLMS courses</td>
        </tr>
        <tr>
            <td>product_selector_lifterlms_groups</td>
            <td>All options of LifterLMS memberships</td>
        </tr>
        <tr>
            <td>product_selector_pmpro</td>
            <td>All memberships of Paid Membership Pro</td>
        </tr>
        <tr>
            <td>product_selector_rcp</td>
            <td>All memberships of Restrict Content Pro</td>
        </tr>
        <tr>
            <td>product_selector_wishlist</td>
            <td>All memberships of Wishlist Member</td>
        </tr>
        <tr>
            <td>woo_coupons</td>
            <td>All Woo-commerce coupons</td>
        </tr>
        <tr>
            <td>woo_order_statuses</td>
            <td>All Woo-commerce order statuses</td>
        </tr>
        <tr>
            <td>woo_categories</td>
            <td>All Woo-commerce categories</td>
        </tr>
        <tr>
            <td>product_selector_woo</td>
            <td>All Woo-commerce products</td>
        </tr>
        <tr>
            <td>product_selector_woo_order</td>
            <td>All Woo-commerce products</td>
        </tr>
        <tr>
            <td>edd_products</td>
            <td>All Easy Digital Download products</td>
        </tr>
            <tr><td>product_selector_edd</td>
            <td>All Easy Digital Download products</td>
        </tr>
    </tbody>
</table>

#### The preview of the example block

<img :src="$withBase('/assets/img/option-selectors.png')" alt="Option selectors" />


## Single or multi-select

```php
'product_ids'     => [
    'type'        => 'multi-select',
    'label'       => 'Target Products',
    'help'        => 'Select for which products this goal will run',
    'options'     => [
          [
                'id'    => '2',
                'title' => 'First Product'
          ]
    ],
    'inline_help' => 'Keep it blank to run to any product purchase',
],
```

This is an example `multi-select` type field component, you can find this structure in every integration. The `options` property contains the options of the select field. The structure of single select and multi-select is the same. Every option has two properties, `id` & `title`.

#### The preview of the example block

<img :src="$withBase('/assets/img/single-or-multi-select.png')" alt="Single or multi-select" />

#### Options possible sets:

<table>
    <thead>
        <tr>
            <th>Key</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>id</td>
            <td>set selector id</td>
        </tr>
        <tr>
            <td>title</td>
            <td>set selector title</td>
        </tr>
    </tbody>
</table>


## Radio

```php
'purchase_type'      => [
    'type'        => 'radio',
    'label'       => 'Purchase Type'
    'help'        => 'Select the purchase type',
    'options'     => [
        [
            'id'    => 'all',
            'title' => 'Any type of purchase'
        ]
    ],
    'inline_help' => 'For what type of purchase you want to run this goal'
],
```

This is an example `radio` type field component, you can find this structure in every integration. The `options` property contains the values of the radio fields. Every option has two properties, `id` & `title`.

### Options Key possible sets:

<table>
    <thead>
        <tr>
            <th>Key</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>id</td>
            <td>Set selector id</td>
        </tr>
        <tr>
            <td>title</td>
            <td>Set selector title</td>
        </tr>
    </tbody>
</table>

#### The preview of the example block.

<img :src="$withBase('/assets/img/radio.png')" alt="Radio" />

## Number input

```php
'wait_time_amount' => [
    'label'         => 'Wait Time',
    'type'          => 'input-number',
    'wrapper_class' => 'fc_2col_inline pad-r-20'
],
```

This is an example `input-number` type field component, you can find this structure in every integration. There are also some optional properties.

#### The preview of the example block.

<img :src="$withBase('/assets/img/number-input.png')" alt="Number input" />


## Text input

```php
'send_email_custom'  => [
    'wrapper_class' => 'fc_half_field',
    'type'          => 'input-text',
    'label'         => 'Send To Email Addresses (If Custom)',
    'placeholder'   => 'Custom Email Addresses',
    'inline_help'   => 'Use comma separated values for multiple'
]
```

This is an example `input-text` type field component, you can find this structure in every integration.

#### The preview of the example block.

<img :src="$withBase('/assets/img/text-input.png')" alt="Text input" />


## Text input popper

```php
'note'      => [
    'type'       => 'input-text-popper',
    'field_type' => 'textarea',
    'label'      => 'Order Note',
    'help'       => 'Type the note that you want to add to the reference order. You can also use smart tags'
]
```

This is an example `input-text-popper` type field component, you can find this structure in every integration. The possible value of the `field_type` property is `text` or `textarea`.

#### The preview of the example block.

<img :src="$withBase('/assets/img/text-input-popper.png')" alt="Text input popper" />


## Yes & no check

```php
'run_multiple'       => [
    'type'        => 'yes_no_check',
    'label'       => '',
    'check_label' => 'Restart the Automation Multiple times for a contact for this event. (Only enable if you want to restart automation for the same contact)',
    'inline_help' => 'If you enable, then it will restart the automation for a contact if the contact already in the automation. Otherwise, It will just skip if already exist',
]
```

This is an example `yes_no_check` type field component, you can find this structure in every integration.

#### The preview of the example block:

<img :src="$withBase('/assets/img/yes-no-check.png')" alt="Yes & no check" />


## Grouped select

```php
'lesson_ids'      => [
    'type'        => 'grouped-select',
    'label'       => 'Target Lessons',
    'help'        => 'Select for which Lessons this automation will run',
    'options'     => [
          [
               'title'   => 'First Course',
               'slug'    => 'first_course',
               'options' => [
                     [
                         'id'    => '1'
                         'title' => 'First Lesson'
                     ]
               ]
          ]
    ],
    'is_multiple' => true,
    'inline_help' => 'Keep it blank to run to any Lesson',
],
```

This is an example `grouped-select` type field component, you can find this structure in every integration. The `options` property contains a list. Every option has three properties `title`, `slug` & `options`(Every `options` of this property contains two fields named `id` & `title`).

#### Options possible sets:

<table>
    <thead>
        <tr>
            <th>key</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>title</td>
            <td>set course title</td>
        </tr>
        <tr>
            <td>slug</td>
            <td>set course slug</td>
        </tr>
        <tr>
            <td>options</td>
            <td>Dynamic Data sets: Possible Values – <a href="#options-options-possible-sets">See below</a></td>
        </tr>
    </tbody>
</table>

#### Options -> Options possible sets:

<table>
    <thead>
        <tr>
            <th>Key</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>id</td>
            <td>set selector id</td>
        </tr>
        <tr>
            <td>title</td>
            <td>set selector title</td>
        </tr>
    </tbody>
</table>

#### The preview of the example block.

<img :src="$withBase('/assets/img/grouped-select.png')" alt="Grouped select" />

## Multi text options

```php
'target_lesson' => [
    'type'        => 'multi_text_options',
    'label'       => 'Target lessons',
    'help'        => 'Select target lessons',
    'input_type'  => 'text',
    'placeholder' => 'Target lessons',
    'inline_help' => 'Keep it blank to run all lessons'
]
```

This is an example `multi_text_options` type field component, you can find this structure in every integration.

#### The preview of the example block.

<img :src="$withBase('/assets/img/multi-text-options.png')" alt="Multi text options" />


## Email campaign composer

```php
'campaign'  => [
    'label' => '',
    'type'  => 'email_campaign_composer'
],
```

This is an example `email_campaign_composer` type field component, you can find this structure in every integration.

#### The preview of the example block.

<img :src="$withBase('/assets/img/email-campaign-composer.png')" alt="Email campaign composer" />


## Reload field selection

```php
'course_id'       => [
    'type'        => 'reload_field_selection',
    'label'       => 'Target Course',
    'help'        => 'Select Course to find out Lesson',
    'options'     => [
          [
              'id'    => '1',
              'title' => 'First Course'
          ]
     ],
    'inline_help' => 'You must select a course'
],
```

This is an example `reload_field_selection` type field component, you can find this structure in every integration. The `options` property contains a list. Every option has two properties named `id` & `title`.

#### Options possible sets:

<table>
    <thead>
        <tr>
            <th>Key</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>id</td>
            <td>set selector id</td>
        </tr>
        <tr>
            <td>title</td>
            <td>set selector title</td>
        </tr>
    </tbody>
</table>

#### The preview of the example block.

<img :src="$withBase('/assets/img/reload-field-selection.png')" alt="Reload field selection" />


## Form group mapper

```php
'primary_fields'        => [
    'label'             => 'Map Primary Data',,
    'type'              => 'form-group-mapper',
    'value_options'.    => [
        [
            'id'    => '',
            'title' => ''
        ]
    ],
    'local_label'      => 'Contact Field (CRM)',
    'remote_label'     => 'Form Field',
    'fields'           => [
        'first_name' => [
               'type'   => 'value_options',
               'label'  => 'First Name'
        ],
        'last_name' => [
              'type'   => 'value_options',
              'label'  => 'Last Name'
        ],
        'email'    => [
            'type'    => 'value_options',
            'label'   => 'Email'
        ]
    ]
]
```

This is an example `form-group-mapper` type field component, you can find this structure in every integration. The `value_options` property contains a list of options of Fluent Form. Every option has two properties named `id` & `title`.

There is also a property named `fields` which contains a list of input fields.

#### The preview of the example block.

<img :src="$withBase('/assets/img/form-group-mapper.png')" alt="Form group mapper" />


## Form many dropdown mappers

```php
'other_fields'           => [
    'label'              => 'Map Other Data',
    'type'               => 'form-many-drop-down-mapper',
    'value_options'      => [
        [
            'id'    => '',
            'title' => ''
        ]
    ],
    'local_label'        => 'Select Contact Property',
    'remote_label'       => 'Select Form Field',
    'local_placeholder'  => 'Select Contact Property',
    'remote_placeholder' => 'Select Form Property',
    'fields'             => [
            'prefix'         => [
                'type'  => 'value_options',
                'label' => 'Name Prefix'
            ],
            'address_line_1' => [
                'type'  => 'value_options',
                'label' => 'Address Line 1'
            ],
            'address_line_2' => [
                'type'  => 'value_options',
                'label' => 'Address Line 2'
            ],
     ]
]
```

This is an example `form-many-drop-down-mapper` type field component, you can find this structure in every integration. The `value_options` property contains a list of options of Fluent Form. Every option has two properties named `id` & `title`.

There is also a property named `fields` which contains a list of input fields.

#### The preview of the example block.

<img :src="$withBase('/assets/img/form-many-drop-down-mapper.png')" alt="Form many dropdown mappers" />


## Html

```php
'subscription_status_info' => [
    'type'       => 'html',
    'info'       => 'An Automated double-optin email will be sent for new subscribers',
]
```

This is an example `html` type field component, you can find this structure in every integration. The `info` property is required.


## Url selector

```php
'redirect_to' => [
    'type'        => 'url_selector',
    'label'       => 'Redirect To',
    'placeholder' => 'Your Target URL',
    'help'        => 'Contacts will be redirected to this link.',
    'inline_help' => 'Please provide the url to where the contact will be redirected'
],
```

This is an example `url_selector` type field component, you can find this structure in every integration.

#### The preview of the example block:

<img :src="$withBase('/assets/img/url-selector.png')" alt="Url selector" />


## Input values pair properties

```php
'contact_properties'     => [
    'type'               => 'input_value_pair_properties',
    'support_operations' => 'yes',
    'label'              => 'Setup contact properties that you want to update',
    'data_key_label'     => 'Contact Property',
    'data_value_label'   => 'Property Value',
    'property_options'   => [
         'contact_type'  => [
             'label'     => 'Contact Type',
             'type'      => 'select',
             'options'   => [
                  [
                      'id'    => 'lead',
                      'slug'  => 'lead',
                      'title' => 'Lead'
                  ]
             ]
         ],
    ]
]
```

This is an example `input_value_pair_properties` type field component, you can find this structure in every integration. The `property_options` property contains a list of other different types of field components.

#### property_options possible sets:

<table>
    <thead>
        <tr>
            <th>key</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>label</td>
            <td>set selector label</td>
        </tr>
        <tr>
            <td>type</td>
            <td>set selector type</td>
        </tr>
        <tr>
            <td>options</td>
            <td>Dynamic Data Sets: Possible Values – <a href="#property-options-options-possible-sets">See below</a></td>
        </tr>
    </tbody>
</table>


#### property_options -> options possible sets:

<table>
    <thead>
        <tr>
            <th>key</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>id</td>
            <td>set selector id</td>
        </tr>
        <tr>
            <td>slug</td>
            <td>set selector slug</td>
        </tr>
        <tr>
            <td>title</td>
            <td>set selector title</td>
        </tr>
    </tbody>
</table>

#### The preview of the example block.

<img :src="$withBase('/assets/img/input-value-pair-properties.png')" alt="Input values pair properties" />


## Text values multi properties

```php
'meta_properties'            => [
    'label'                  => 'User Meta Mapping',
    'type'                   => 'text-value-multi-properties',
    'data_key_label'         => 'User Meta Key',
    'data_value_label'       => 'User Meta Value',
    'data_value_placeholder' => 'Meta Value',
    'data_key_placeholder'   => 'Meta key',
    'help'                   => 'If you want to map user meta properties you can add that here. This is totally optional',
    'value_input_type'       => 'text-popper'
],
```

This is an example `text-value-multi-properties` type field component, you can find this structure in every integration.

#### The preview of the example block.

<img :src="$withBase('/assets/img/text-value-multi-properties.png')" alt="Text values multi properties" />


## Html editor

```php
'description' => [
    'type'    => 'html_editor',
    'label'   => 'Description'
]
```

This is an example `html_editor` type field component, you can find this structure in every integration.

#### The preview of the example block.

<img :src="$withBase('/assets/img/html-editor.png')" alt="Html editor" />


## Rest selector

```php
'course_id' => [
    'type'        => 'rest_selector',
    'option_key'  => 'product_selector_learndash',
    'is_multiple' => false,
    'clearable'   => true,
    'label'       => 'Select Course to Enroll',
    'placeholder' => 'Select Course',
]
```

This is an example `rest_selector` type field component, you can find this structure in every integration. The option_key is a required property.


#### The preview of the example block.

<img :src="$withBase('/assets/img/rest-selector.png')" alt="Rest selector" />


## Condition block groups

```php
'conditions' => [
    'type'        => 'condition_block_groups',
    'label'       => 'Specify Matching Conditions',
    'inline_help' => 'Specify which contact properties need to matched. Based on the conditions it will run yes blocks or no blocks',
    'labels'      => [
        'match_type_all_label' => 'True if all conditions match',
        'match_type_any_label' => 'True if any of the conditions match',
        'data_key_label'       => 'Contact Data',
        'condition_label'      => 'Condition',
        'data_value_label'     => 'Match Value'
    ],
    'groups'      => [
            'subscriber' => [
                'label'    => 'Contact',
                'value'    => 'subscriber',
                'children' => [
                    [
                        'label' => 'First Name',
                        'value' => 'first_name',
                        'type'  => 'nullable_text'
                    ],
                 ]
            ]
    ],
    'add_label'   => 'Add Condition to check your contact\'s properties',
]
```

This is an example `condition_block_groups` type field component, you can find this structure in every integration. The `labels` are a required property. The `groups` field contains the condition groups of a specific `condition_block_groups` type field component.

#### The preview of the example block.

<div style="display: flex; align-items: center; justify-content: space-between">
<img style="width: 75%" :src="$withBase('/assets/img/condition-block-groups-1.png')" alt="Condition block groups 1" />
<img width="25%" :src="$withBase('/assets/img/condition-block-groups-2.png')" alt="Condition block groups 2" />
</div>


## Custom sender config

```php
'mailer_settings' => [
    'type'        => 'custom_sender_config',
    'check_label' => 'Set Custom From Name and Email',
]
```

This is an example `custom_sender_config` type field component, you can find this structure in every integration. The `check_label` property is the title of the block

#### The preview of this example block

<img :src="$withBase('/assets/img/custom-sender-config.png')" alt="Custom sender config" />


## Radio buttons

```php
'wait_type'        => [
    'type'    => 'radio_buttons',
    'label'   => 'Waiting Type',
    'options' => [
        [
            'id'    => 'unit_wait',
            'title' => 'Wait for a specific period'
        ],
        [
            'id'    => 'timestamp_wait',
            'title' => 'Wait until a specific date-time'
        ],
        [
            'id'    => 'to_day',
            'title' => 'To a day of the week'
        ]
    ]
],
```

This is an example `radio_buttons` type field component, you can find this structure in every integration. The `options` property is a list.

#### options possible sets:

<table>
    <thead>
        <tr>
            <th>key</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>id</td>
            <td>set selector id</td>
        </tr>
        <tr>
            <td>title</td>
            <td>set selector title</td>
        </tr>
    </tbody>
</table>

#### The preview of this example block.

<img :src="$withBase('/assets/img/radio-buttons.png')" alt="Radio buttons" />


## Checkboxes

```php
'to_day'            => [
    'type'          => 'checkboxes',
    'label'         => 'Wait until next day(s) of the week',
    'wrapper_class' => 'fc_2col_inline pad-r-20',
    'options'       => [
        [
            'id'    => 'Mon',
            'title' => 'Mon'
        ]
    ],
],
```

This is an example `checkboxes` type field component, you can find this structure in every integration. The `options` property is a list containing days info of a week. This example block depends on a wait_type field. If the `wait_type` value is to_day, then this block will show.

#### options possible sets:

<table>
    <thead>
        <tr>
            <th>key</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>id</td>
            <td>set selector id</td>
        </tr>
        <tr>
            <td>title</td>
            <td>set selector title</td>
        </tr>
    </tbody>
</table>

#### The preview of this example block.

<img :src="$withBase('/assets/img/checkboxes.png')" alt="Checkboxes" />


## Time selector

```php
'to_day_time'        => [
    'label'          => 'Time of the day',
    'type'           => 'time_selector',
    'placeholder'    => 'Select Time',
    'wrapper_class'  => 'fc_2col_inline',
    'picker_options' => [
        'start' => '00:00',
        'step'  => '00:10',
        'end'   => '23:59'
    ]
]
```

This is an example `time_selector` type field component, you can find this structure in every integration. The `picker_options` property contains three properties named `start`, `step` & `end`. This example block depends on a wait_type field. If the `wait_type` value is to_day, then this block will show.

#### options possible sets:

<table>
    <thead>
        <tr>
            <th>key</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>id</td>
            <td>set selector id</td>
        </tr>
        <tr>
            <td>title</td>
            <td>set selector title</td>
        </tr>
    </tbody>
</table>

#### The preview of this example block.

<img :src="$withBase('/assets/img/time-selector.png')" alt="Time selector" />
