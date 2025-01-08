---
description: "The Helper::getProfileSections method returns contact's profile section sub navigation items as keyed array"
---

# FluentCRM Core Helper Class

- Class with Namespace: `\FluentCrm\App\Services\Helper`
- Method Types: `static`

### Helper::getProfileSections()

The `Helper::getProfileSections` method returns contact's profile section sub navigation items as keyed array

```php 
$sections = FluentCrm\App\Services\Helper::getProfileSections();

/*
[

    'subscriber'        => [
        'name'    => 'subscriber',
        'title'   => __('Overview', 'fluent-crm'),
        'handler' => 'route'
    ],
    'subscriber_emails' => [
        'name'    => 'subscriber_emails',
        'title'   => __('Emails', 'fluent-crm'),
        'handler' => 'route'
    ],
    .....,
    .....
]
*/
```

**Available Filter:** `fluentcrm_profile_sections`


### Helper::getGlobalSmartCodes()

The `Helper::getGlobalSmartCodes` method returns smartcodes for the contacts

```php 
$sections = FluentCrm\App\Services\Helper::getGlobalSmartCodes();

/*
[
    [
         'key'        => 'contact',
         'title'      => __('Contact', 'fluent-crm'),
         'shortcodes' => apply_filters('fluentcrm_contact_smartcodes', [
            '{{contact.full_name}}'      => __('Full Name', 'fluent-crm'),
            '....' => '....',
            '....' => '....',
         ]
    ],
    [
        'key'        => 'contact_custom_fields',
        'title'      => __('Custom Fields', 'fluent-crm'),
        'shortcodes' => apply_filters('fluentcrm_contact_smartcodes', [
            '{{contact.custom.key_1}}'      => 'Custom Field Label',
            '....' => '....',
            '....' => '....',
         ]
    ],
    [
        'key'        => 'general',
        'title'      => __('General', 'fluent-crm'),
        'shortcodes' => apply_filters('fluentcrm_general_smartcodes', [
            '{{crm.business_name}}' => __('Business Name', 'fluent-crm'),
            '....' => '....',
            '....' => '....',
        ]
    ]
]
*/
```


