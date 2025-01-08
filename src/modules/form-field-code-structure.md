---
description: "Fluent CRM offers an easy way to create forms without any knowledge of HTML or JavaScript by using its structural format for generating form fields."
---

# Form Field Code Structure

Fluent CRM offers an easy way to create forms without any knowledge of HTML or JavaScript by using its structural format for generating form fields. The form fields are determined by this structure.

There are 26 different types of form fields available in Fluent CRM. In addition to the specific form fields, there are also some common and optional fields that can be included in every form block. These common and optional fields include:

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
            <td>The `label` value is a string that will be displayed as the label for the form field.</td>
        </tr>
        <tr>
            <td>inline_help</td>
            <td>The `inline_help` value is a string that will be displayed as inline help text for the form field.</td>
        </tr>
        <tr>
            <td>placeholder</td>
            <td>The `placeholder` value is a string that will be displayed as the placeholder text in the form field when no option has been selected.</td>
        </tr>
        <tr>
            <td>help</td>
            <td>The `help` value is a string that will be displayed as a help text for the form field.</td>
        </tr>
        <tr>
            <td>wrapper_class</td>
            <td>(Optional) The `wrapper_class` value specifies a class that will be applied to the wrapper element for the form field.</td>
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

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key 'subscription_status', and the values for this field include:

- `type`: `option_selectors`
- `option_key`: `editable_statuses`
- `is_multiple`: false

The `type` value indicates that this form field is an `option_selectors` field, which is a type of form field that allows the user to select one or more options from a list. The `option_key` value specifies the key for the list of options that will be displayed in the form field, which in this case is `editable_statuses`. The `is_multiple` value is a boolean indicating whether the user can select multiple options from the list or just one.

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
          ],
          ...
    ],
    'inline_help' => 'Keep it blank to run to any product purchase',
],
```

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key `product_ids`, and the values for this field include:

- `type`: `multi-select`
- `options`: an array with a single element, which is itself an array with two keys: `id` and `title`. The value of `id` is `2`, and the value of `title` is `First Product`.

The `type` value indicates that this form field is a `multi-select` field, which is a type of form field that allows the user to select one or more options from a list. The `options` value is an array that contains the available options for the form field, with each option represented as an array with `id` and `title` keys.

This form field allows the user to select one or more products from a list of available options. The help and inline help text provide additional information and guidance to the user.

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
        ],
        ...
    ],
    'inline_help' => 'For what type of purchase you want to run this goal'
],
```

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key `purchase_type`, and the values for this field include:

- `type`: `radio`
- `options`: an array with a single element, which is itself an array with two keys: `id` and `title`. The value of `id` is `all`, and the value of `title` is `Any type of purchase`.

The `type` value indicates that this form field is a `radio` field, which is a type of form field that allows the user to select one option from a list of available options by clicking on a radio button. The `options` value is an array that contains the available options for the form field, with each option represented as an array with `id` and `title` keys.

This form field allows the user to select the type of purchase for which they want to run this goal. The user can choose the option `Any type of purchase` by clicking on the corresponding radio button. The help and inline help text provide additional information and guidance to the user.

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

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key `wait_time_amount`, and the values for this field include:

- `type`: `input-number`

The `type` value indicates that this form field is an `input-number` field, which is a type of form field that allows the user to input a numerical value.

This form field allows the user to input a numerical value for the wait time. The label and wrapper class provide additional styling and layout information for the form field.

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

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key `send_email_custom`, and the values for this field include:

- `type`: `input-text`

The `type` value indicates that this form field is an `input-text` field, which is a type of form field that allows the user to input text.

This form field allows the user to input one or more email addresses to which the form should be sent. The user can enter multiple email addresses by separating them with commas. The label, placeholder, and inline help text provide additional guidance and context for the user. The wrapper class provides additional styling information for the form field.

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

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key `note`, and the values for this field include:

- `type`: `input-text-popper`
- `field_type`: `textarea`

The `type` value indicates that this form field is an `input-text-popper` field, which is a type of form field that allows the user to input text and displays a popover or tooltip with additional information when the user hovers over the field. The `field_type` value specifies that the form field should be a `textarea`, which is a type of form field that allows the user to input multi-line text.

This form field allows the user to input a note that will be added to the reference order. The user can use smart tags in the note, and the label and help text provide additional context and guidance for the user. The popover or tooltip will display additional information when the user hovers over the field.

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

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key `run_multiple`, and the values for this field include:

- `type`: `yes_no_check`
- `check_label`: `Restart the Automation Multiple times for a contact for this event. (Only enable if you want to restart automation for the same contact)`

The `type` value indicates that this form field is a `yes_no_check` field, which is a type of form field that allows the user to select either `yes` or `no` by checking or unchecking a checkbox. The `check_label` value is a string that will be displayed next to the checkbox as the label for the field.

This form field allows the user to specify whether the automation should be restarted multiple times for a contact for a specific event. If the user enables the option by checking the checkbox, the automation will be restarted for a contact if the contact is already in the automation. If the option is not enabled, the automation will be skipped for a contact that is already in the automation. The check label and inline help text provide additional information and guidance to the user.

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
                     ],
                     ...
               ]
          ],
          ...
    ],
    'is_multiple' => true,
    'inline_help' => 'Keep it blank to run to any Lesson',
],
```

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key `lesson_ids`, and the values for this field include:

- `type`: `grouped-select`
- `options`: an array with one or more elements, each of which is itself an array with three keys: `title`, `slug`, and `options`. The value of `title` is the title of a course, the value of `slug` is a unique identifier for the course, and the value of `options` is an array with one or more elements, each of which is itself an array with two keys: `id` and `title`. The value of `id` is a unique identifier for a lesson, and the value of `title` is the title of the lesson.
- `is_multiple`: true

The `type` value indicates that this form field is a `grouped-select` field, which is a type of form field that allows the user to select one or more options from a list that is organized into groups. The `options` value is an array that contains the available options for the form field, grouped by course and represented as arrays with `title`, `slug`, and `options` keys. The `is_multiple` value specifies that the user can select multiple options from the list.

This form field allows the user to select one or more lessons from a list of available options, organized by course. The user can select multiple options by holding down the Ctrl key while making their selections. The help and inline help text provide additional information and guidance to the user. The form field will run the automation for the selected lessons. If no lessons are selected, the automation will run for any lesson.

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
            <td>The `title` value is a string that represents the title of the course. </td>
        </tr>
        <tr>
            <td>slug</td>
            <td>The `slug` value is a unique identifier for the course.</td>
        </tr>
        <tr>
            <td>options</td>
            <td>The `options` value is an array that contains the lessons for the course – <a href="#options-options-possible-sets">See below</a></td>
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
            <td>The value of `id` is a unique identifier for a option</td>
        </tr>
        <tr>
            <td>title</td>
            <td>The value of `title` is the title for a option</td>
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

This code defines an array with keys and values for a form field in Fluent CRM. The form field has the key `target_lesson`, and the values for this field include:

- `type`: `multi_text_options`
- `input_type`: `text`

The `type` value indicates that this form field is a `multi_text_options` field, which is a type of form field that allows the user to input multiple text options. The `input_type` value specifies that the form field should be a `text` field, which is a type of form field that allows the user to input a single line of text.

This form field allows the user to input multiple text options, each on a separate line. The options will be stored as an array of strings. The form field has a label and help text that provide context and guidance for the user, and a placeholder and inline help text that provide additional guidance and information. If no options are entered, the form field will run for all lessons.

#### The preview of the example block.

<img :src="$withBase('/assets/img/multi-text-options.png')" alt="Multi text options" />


## Email campaign composer

```php
'campaign'  => [
    'label' => '',
    'type'  => 'email_campaign_composer'
],
```

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key `campaign`, and the values for this field include:

- `type`: `email_campaign_composer`

The `type` value indicates that this form field is an `email_campaign_composer` field, which is a type of form field that allows the user to get an email campaign template editor block.

This form field allows the user to get an email campaign template editor block by inputting various campaign details and creating the email content. The form field does not have a label, so it is likely used in conjunction with other form fields that provide context and guidance for the user.

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
          ],
          ...
     ],
    'inline_help' => 'You must select a course'
],
```

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key `course_id`, and the values for this field include:

- `type`: `reload_field_selection`
- `options`: an array with one or more elements, each of which is itself an array with two keys: `id` and `title`. The value of `id` is a unique identifier for a course, and the value of `title` is the title of the course.

The `type` value indicates that this form field is a `reload_field_selection` field, which is a type of form field that allows the user to select an option from a list and then reloads a selection field based on the selected option. The `options` value is an array that contains the available options for the form field, represented as arrays with `id` and `title` keys.

This form field allows the user to select a course from a list of available options. When the user selects a course, the form field will reload a selection field based on the selected course. The form field has a label and help text that provide context and guidance for the user, and inline help text that reminds the user that they must select a course. The form field uses the unique identifiers and titles of the courses as the options for the selection field.

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
            <td>The value of `id` is a unique identifier for a option</td>
        </tr>
        <tr>
            <td>title</td>
            <td>The value of `title` is the title for a option</td>
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
        ],
        ...
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

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key `primary_fields`, and the values for this field include:

- `type`: `form-group-mapper`
- `value_options`: an array with one or more elements, each of which is itself an array with two keys: `id` and `title`. The values of `id` and `title` are both empty strings.
- `local_label`: `Contact Field (CRM)`
- `remote_label`: `Form Field`
- `fields`: an array with keys and values for form fields that allow the user to select options from a list.

The `type` value indicates that this form field is a `form-group-mapper` field, which is a type of form field that allows the user to map data between two groups of fields. The `value_options` value is an array that contains the available options for the form field. The `local_label` and `remote_label` values are strings that will be displayed as labels for the two groups of fields. The `fields` value is an array that contains keys and values for form fields that allow the user to select options from a list.

This form field allows the user to map data between two groups of fields. The form field has a label and uses the `local_label` and `remote_label` values to label the two groups of fields. The form field uses the `value_options` array to provide the available options for the user to select from. The form field also has keys and values for form fields that allow the user to select options from a list. These form fields allow the user to map specific data between the two groups of fields.

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
        ],
        ...
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

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key `other_fields`, and the values for this field include:

- `type`: `form-many-drop-down-mapper`
- `value_options`: an array with one or more elements, each of which is itself an array with two keys: `id` and `title`. The values of `id` and `title` are both empty strings.
- `local_label`: `Select Contact Property`
- `remote_label`: `Select Form Field`
- `local_placeholder`: `Select Contact Property`
- `remote_placeholder`: `Select Form Property`
- `fields`: an array with keys and values for form fields that allow the user to select options from a list.

The `type` value indicates that this form field is a `form-many-drop-down-mapper` field, which is a type of form field that allows the user to map data between two groups of fields using drop-down menus. The `value_options` value is an array that contains the available options for the form field. The `local_label` and `remote_label` values are strings that will be displayed as labels for the two groups of fields, and the `local_placeholder` and `remote_placeholder` values are strings that will be displayed as placeholders for the drop-down menus. The `fields` value is an array that contains keys and values for form fields that allow the user to select options from a list.

This form field allows the user to map data between two groups of fields using drop-down menus. The form field has a label and uses the `local_label` and `remote_label` values to label the two groups of fields. The form field uses the `value_options` array to provide the available options for the user to select from, and the `local_placeholder` and `remote_placeholder` values provide placeholders for the drop-down menus. The form field also has keys and values for form fields that allow the user to select options from a list. These form fields allow the user to map specific data between the two

#### The preview of the example block.

<img :src="$withBase('/assets/img/form-many-drop-down-mapper.png')" alt="Form many dropdown mappers" />


## Html

```php
'subscription_status_info' => [
    'type'       => 'html',
    'info'       => 'An Automated double-optin email will be sent for new subscribers',
]
```

The `type` element is set to `html`, which indicates that the content in the `info` element is in HTML format.


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

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key `redirect_to`, and the values for this field include:

- `type`: `url_selector`

The `type` value indicates that this form field is a `url_selector` field, which is a type of form field that allows the user to input a URL.

This form field allows the user to input a URL. The form field has a label and a placeholder that provide context and guidance for the user, and help and inline help text that explain the purpose of the form field. When the user inputs a URL and submits the form, contacts will be redirected to the URL.

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
                  ],
                  ...
             ]
         ],
    ]
]
```

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key `contact_properties`, and the values for this field include:

- `type`: `input_value_pair_properties`
- `support_operations`: `yes`
- `data_key_label`: `Contact Property`
- `data_value_label`: `Property Value`
- `property_options`: an array with keys and values for form fields that allow the user to input key-value pairs

The `type` value indicates that this form field is an `input_value_pair_properties` field, which is a type of form field that allows the user to input key-value pairs. The `support_operations` value is a string that specifies whether the form field supports operations. The `data_key_label` and `data_value_label` values are strings that will be displayed as labels for the input fields for the key and value, respectively. The `property_options` value is an array that contains keys and values for form fields that allow the user to input key-value pairs.

This form field allows the user to input key-value pairs for contact properties that they want to update. The form field has a label and labels for the input fields that provide context and guidance for the user. The `property_options` array contains keys and values for form fields that allow the user to input key-value pairs. When the user inputs the key-value pairs and submits the form, the contact properties will be updated with the specified key-value pairs.

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
            <td>id</td>
            <td>The value of `id` is a unique identifier for a option</td>
        </tr>
        <tr>
            <td>slug</td>
            <td>The value of `slug` is the title for a option</td>
        </tr>
        <tr>
            <td>title</td>
            <td>The value of `title` is the title for a option</td>
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

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key `meta_properties`, and the values for this field include:

- `type`: `text-value-multi-properties`
- `data_key_label`: `User Meta Key`
- `data_value_label`: `User Meta Value`
- `data_value_placeholder`: `Meta Value`
- `data_key_placeholder`: `Meta key`
- `value_input_type`: `text-popper`

The `type` value indicates that this form field is a `text-value-multi-properties` field, which is a type of form field that allows the user to input multiple key-value pairs. The `data_key_label` and `data_value_label` values are strings that will be displayed as labels for the input fields for the key and value, respectively. The `data_value_placeholder` and `data_key_placeholder` values are strings that will be displayed as placeholders in the input fields for the value and key, respectively. The `value_input_type` value specifies the type of input field for the value.

This form field allows the user to input multiple key-value pairs for user meta properties. The form field has a label and labels for the input fields that provide context and guidance for the user, and placeholders that provide examples of the expected input. The form field also has a help text that explains the purpose of the form field. When the user inputs the key-value pairs and submits the form, the user meta properties will be updated with the specified key-value pairs.

#### The preview of the example block.

<img :src="$withBase('/assets/img/text-value-multi-properties.png')" alt="Text values multi properties" />


## Html editor

```php
'description' => [
    'type'    => 'html_editor',
    'label'   => 'Description'
]
```

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key `description`, and the values for this field include:

- `type`: `html_editor`

The `type` value indicates that this form field is an `html_editor` field, which is a type of form field that allows the user to input and edit HTML content.

This form field allows the user to input and edit HTML content. The form field has a label that provides context and guidance for the user. When the user inputs and edits the HTML content and submits the form, the HTML content will be stored and processed as needed.

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

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key `course_id`, and the values for this field include:

- `type`: `rest_selector`
- `option_key`: `product_selector_learndash`
- `clearable`: true

The `type` value indicates that this form field is a `rest_selector` field, which is a type of form field that allows the user to select from a list of options that are loaded from a REST endpoint. The `option_key` value specifies the key for the REST endpoint that will be used to load the options. The `clearable` value specifies whether or not the user can clear their selection.

This form field allows the user to select a course from a list of options that are loaded from a REST endpoint. The form field has a label and a placeholder that provide context and guidance for the user, and the user can select a single option or clear their selection if needed. When the user selects a course and submits the form, the selected course will be stored and processed as needed.


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
                    ...
                 ]
            ],
            ...
    ],
    'add_label'   => 'Add Condition to check your contact\'s properties',
]
```

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key `conditions`, and the values for this field include:

- `type`: `condition_block_groups`
- `labels`: an array of labels for different parts of the form field
- `groups`: an array of groups of conditions
- `add_label`: `Add Condition to check your contact`s properties`

The `type` value indicates that this form field is a `condition_block_groups` field, which is a type of form field that allows the user to specify conditions that need to be met for a certain action to be taken.

The `labels` array includes strings that will be used as labels for different parts of the form field, such as the `match_type_all_label` which is the label for the option to match all conditions, the `match_type_any_label` which is the label for the option to match any condition, the `data_key_label` which is the label for the field where the user selects a contact data property, the `condition_label` which is the label for the field where the user selects a condition, and the `data_value_label` which is the label for the field where the user inputs a value to match.

The `groups` array includes groups of conditions that the user can specify. Each group has a `label` and a `value` that identifies the group, and a `children` array that includes the individual conditions in the group. Each condition has a `label`, a `value`, and a `type` that specifies the type of input field to use for the value

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

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key `mailer_settings`, and the value for this field is:

- `type`: `custom_sender_config`
- `check_label`: `Set Custom From Name and Email`

The `type` value indicates that this form field is a `custom_sender_config` field, which is a type of form field that allows the user to specify custom sender settings for an email. The `check_label` value is a string that will be displayed as the label for a checkbox associated with this form field. When the checkbox is checked, the user can specify custom sender settings. When it is not checked, the default sender settings will be used.

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
        ],
        ...
    ]
],
```

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key `wait_type`, and the value for this field is:

- `type`: `radio_buttons`
- `options`: an array of radio button options

The `type` value indicates that this form field is a `radio_buttons` field, which is a type of form field that allows the user to select one option from a list of radio buttons.

The `options` value is an array of radio button options, where each option is an array containing an `id` and `title` value. The `id` value is a string that specifies the unique identifier for the radio button option, and the `title` value is a string that will be displayed as the label for the radio button option.

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
            <td>The value of `id` is a unique identifier for a option</td>
        </tr>
        <tr>
            <td>title</td>
            <td>The value of `title` is the title for a option</td>
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
        ],
        ...
    ],
],
```

This code is defining an array with keys and values for a form field in Fluent CRM. The form field has the key `to_day`, and the value for this field is:

- `type`: `checkboxes`
- `wrapper_class`: `fc_2col_inline pad-r-20`
- `options`: an array of checkbox options

The `type` value indicates that this form field is a `checkboxes` field, which is a type of form field that allows the user to select one or more options from a list of checkboxes. The `wrapper_class` value is a string that specifies a class name for the container element that wraps this form field. 

The `options` value is an array of checkbox options, where each option is an array containing an `id` and `title` value. The `id` value is a string that specifies the unique identifier for the checkbox option, and the `title` value is a string that will be displayed as the label for the checkbox option.

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
            <td>The value of `id` is a unique identifier for a option</td>
        </tr>
        <tr>
            <td>title</td>
            <td>The value of `title` is the title for a option</td>
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

The `to_day_time` field is a time selector that allows the user to select a specific time of the day. The time picker has options for the start time, time increment step, and end time. The start time is set to 00:00 (midnight), the step is set to 10 minutes, and the end time is set to 23:59 (one minute before midnight). The `to_day_time` field is displayed in a two column layout and has a placeholder text of "Select Time". It is likely used in conjunction with the `to_day` field to specify a specific day and time for the wait period.

#### The preview of this example block.

<img :src="$withBase('/assets/img/time-selector.png')" alt="Time selector" />
