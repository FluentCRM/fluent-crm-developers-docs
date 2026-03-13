---
description: "Filter hooks for contact data, profile sections, custom fields, avatars, smart codes, bulk actions, and CSV export in FluentCRM."
---

# Contact Filters

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These filter hooks let you customize contact data, profile sections, custom fields, avatars, smart codes, bulk actions, and more.

## Contact Statuses & Types

### `fluent_crm/contact_statuses`

Filter the list of valid contact subscription statuses.

**Parameters**
- `$statuses` Array - Default statuses: `subscribed`, `pending`, `unsubscribed`, `bounced`, `complained`

**Usage:**
```php
add_filter('fluent_crm/contact_statuses', function($statuses) {
    // Add a custom status
    $statuses[] = 'on_hold';
    return $statuses;
});
```

**Source:** `app/Functions/helpers.php`

---

### `fluent_crm/contact_editable_statuses`

Filter which contact statuses are user-editable (can be set manually by admin). System-only statuses like `bounced` or `complained` may be excluded.

**Parameters**
- `$statuses` Array - Subset of contact statuses

**Usage:**
```php
add_filter('fluent_crm/contact_editable_statuses', function($statuses) {
    // Remove a status from the editable list
    return array_diff($statuses, ['complained']);
});
```

**Source:** `app/Functions/helpers.php`

---

### `fluent_crm/contact_types`

Filter the contact type definitions (e.g., Lead, Customer).

**Parameters**
- `$types` Array - Associative array of `slug => label`

**Usage:**
```php
add_filter('fluent_crm/contact_types', function($types) {
    $types['partner'] = __('Partner', 'fluent-crm');
    return $types;
});
```

**Source:** `app/Functions/helpers.php`

---

### `fluent_crm/contact_activity_types`

Filter the activity/timeline event type definitions shown on the contact profile.

**Parameters**
- `$types` Array - Associative array of `slug => label` (e.g., `note`, `call`, `email`, `meeting`)

**Usage:**
```php
add_filter('fluent_crm/contact_activity_types', function($types) {
    $types['sms'] = __('SMS', 'fluent-crm');
    return $types;
});
```

**Source:** `app/Functions/helpers.php`

---

### `fluent_crm/status_text`

Filter the mapping of internal status keys to human-readable labels.

**Parameters**
- `$mapStatus` Array - Associative array of `status_key => display_label`

**Usage:**
```php
add_filter('fluent_crm/status_text', function($mapStatus) {
    $mapStatus['subscribed'] = 'Active Member';
    return $mapStatus;
});
```

**Source:** `app/Services/Helper.php`

---

### `fluent_crm/contact_name_prefixes`

Filter the name prefix/salutation options (Mr, Mrs, Ms, etc.). This is the current hook (since 2.7.0).

> **Note:** A legacy hook `fluentcrm_contact_name_prefixes` also exists (since 2.5.5) and fires first. The current hook applies on top of it.

**Parameters**
- `$prefixes` Array - List of prefix strings

**Usage:**
```php
add_filter('fluent_crm/contact_name_prefixes', function($prefixes) {
    $prefixes[] = 'Dr';
    $prefixes[] = 'Prof';
    return $prefixes;
});
```

**Source:** `app/Services/Helper.php`

---

### `fluent_crm/email_sendable_statuses`

Filter which contact statuses are eligible to receive campaign emails.

**Parameters**
- `$statuses` Array - Default: `['subscribed', 'transactional']`

**Usage:**
```php
add_filter('fluent_crm/email_sendable_statuses', function($statuses) {
    // Only send to subscribed contacts
    return ['subscribed'];
});
```

**Source:** `app/Functions/helpers.php`

---

## Profile Sections & Widgets

### `fluentcrm_profile_sections`

Filter the array of tab sections displayed on the contact profile page. Use this to add custom tabs.

**Parameters**
- `$sections` Array - Each section has `slug`, `title`, `icon`, and other properties

**Usage:**
```php
add_filter('fluentcrm_profile_sections', function($sections) {
    $sections['my_custom_tab'] = [
        'slug'  => 'my_custom_tab',
        'title' => __('My Tab', 'fluent-crm'),
        'icon'  => 'el-icon-setting'
    ];
    return $sections;
});
```

**Source:** `app/Services/Helper.php`

---

### `fluent_crm/subscriber_top_widgets`

Filter the array of "top" widgets shown above the timeline on a contact profile.

**Parameters**
- `$widgets` Array - Widget definitions
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_filter('fluent_crm/subscriber_top_widgets', function($widgets, $subscriber) {
    $widgets[] = [
        'title'   => 'Custom Widget',
        'content' => '<p>Custom content for ' . $subscriber->email . '</p>'
    ];
    return $widgets;
}, 10, 2);
```

**Source:** `app/Http/Controllers/SubscriberController.php`

---

### `fluent_crm/subscriber_info_widgets`

Filter additional sidebar info widgets on a contact profile page.

**Parameters**
- `$widgets` Array - Widget definitions
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_filter('fluent_crm/subscriber_info_widgets', function($widgets, $subscriber) {
    $widgets[] = [
        'title'   => 'Membership',
        'content' => '<p>Gold Member</p>'
    ];
    return $widgets;
}, 10, 2);
```

**Source:** `app/Http/Controllers/SubscriberController.php`

---

### `fluent_crm/contact_note_fields`

Filter the array of additional fields shown on the Add Note form for contacts.

**Parameters**
- `$fields` Array - Additional field definitions

**Usage:**
```php
add_filter('fluent_crm/contact_note_fields', function($fields) {
    $fields[] = [
        'key'   => 'priority',
        'label' => __('Priority', 'fluent-crm'),
        'type'  => 'select',
        'options' => ['low' => 'Low', 'medium' => 'Medium', 'high' => 'High']
    ];
    return $fields;
});
```

**Source:** `app/Services/Helper.php`

---

## Custom Fields & Avatars

### `fluent_crm/global_field_types`

Filter the list of available custom contact field types (text, date, checkbox, etc.).

**Parameters**
- `$fieldTypes` Array - Field type definitions

**Usage:**
```php
add_filter('fluent_crm/global_field_types', function($fieldTypes) {
    $fieldTypes['color_picker'] = [
        'label' => 'Color Picker',
        'type'  => 'color_picker'
    ];
    return $fieldTypes;
});
```

**Source:** `app/Models/CustomContactField.php`

---

### `fluent_crm/modify_custom_field_value`

Filter a custom field value when it is retrieved. Useful for transforming stored values before display.

**Parameters**
- `$value` Mixed - The custom field value

**Usage:**
```php
add_filter('fluent_crm/modify_custom_field_value', function($value) {
    // Transform the value as needed
    return $value;
});
```

**Source:** `app/Models/Subscriber.php`

---

### `fluent_crm/default_avatar`

Filter the default avatar URL used when Gravatar is disabled or no avatar is available.

**Parameters**
- `$url` String - Default avatar image URL
- `$email` String - Contact's email address

**Usage:**
```php
add_filter('fluent_crm/default_avatar', function($url, $email) {
    return 'https://example.com/custom-avatar.png';
}, 10, 2);
```

**Source:** `app/Functions/helpers.php`

---

### `fluent_crm/get_avatar`

Filter the final avatar URL for a contact (Gravatar or custom).

**Parameters**
- `$url` String - Avatar URL (Gravatar by default)
- `$email` String - Contact's email address

**Usage:**
```php
add_filter('fluent_crm/get_avatar', function($url, $email) {
    // Use a custom avatar service
    return 'https://avatars.example.com/' . md5($email);
}, 10, 2);
```

**Source:** `app/Functions/helpers.php`

---

### `fluent_crm/allowed_html_tags`

Filter the array of allowed HTML tags and attributes used in `wp_kses()` for sanitizing content.

**Parameters**
- `$tags` Array - Associative array of tag => attributes

**Usage:**
```php
add_filter('fluent_crm/allowed_html_tags', function($tags) {
    $tags['iframe'] = [
        'src'    => true,
        'width'  => true,
        'height' => true
    ];
    return $tags;
});
```

**Source:** `app/Services/Helper.php`

---

## Smart Codes

### `fluentcrm_contact_smartcodes`

Filter the array of contact smart codes (e.g., `contact.first_name`, `contact.email`) shown in the smart code picker.

**Parameters**
- `$smartCodes` Array - Array of smart code definitions

**Usage:**
```php
add_filter('fluentcrm_contact_smartcodes', function($smartCodes) {
    $smartCodes[] = [
        'key'   => '{{contact.custom_field}}',
        'title' => 'Custom Field'
    ];
    return $smartCodes;
});
```

**Source:** `app/Services/Helper.php`

---

### `fluent_crm/general_smartcodes`

Filter the array of general CRM and WordPress smart codes (e.g., `crm.business_name`, `wp.admin_email`).

**Parameters**
- `$smartCodes` Array - Array of general smart code definitions

**Usage:**
```php
add_filter('fluent_crm/general_smartcodes', function($smartCodes) {
    $smartCodes[] = [
        'key'   => '{{crm.site_phone}}',
        'title' => 'Site Phone Number'
    ];
    return $smartCodes;
});
```

**Source:** `app/Services/Helper.php`

---

### `fluent_crm/smartcode_groups`

Filter the full grouped array of smart code groups returned by `getGlobalSmartCodes()`.

**Parameters**
- `$smartCodes` Array - Grouped smart code array

**Usage:**
```php
add_filter('fluent_crm/smartcode_groups', function($smartCodes) {
    // Add a custom smart code group
    $smartCodes['my_group'] = [
        'title'      => 'My Custom Codes',
        'shortcodes' => [
            '{{my_group.key1}}' => 'Description 1'
        ]
    ];
    return $smartCodes;
});
```

**Source:** `app/Services/Helper.php`

---

### `fluent_crm/extended_smart_codes`

Filter the array of additional smart code groups registered by add-ons.

**Parameters**
- `$extendedCodes` Array - Default `[]`

**Usage:**
```php
add_filter('fluent_crm/extended_smart_codes', function($codes) {
    $codes[] = [
        'title'      => 'WooCommerce',
        'shortcodes' => [
            '{{woo.last_order_total}}' => 'Last Order Total'
        ]
    ];
    return $codes;
});
```

**Source:** `app/Services/Helper.php`

---

## Bulk Actions & Filters

### `fluent_crm/custom_contact_bulk_actions`

Add custom bulk actions to the contacts table dropdown.

**Parameters**
- `$actions` Array - Default `[]`

**Usage:**
```php
add_filter('fluent_crm/custom_contact_bulk_actions', function($actions) {
    $actions[] = [
        'label' => __('Sync to External', 'fluent-crm'),
        'value' => 'sync_external'
    ];
    return $actions;
});
```

> **Tip:** Handle the action via the `fluent_crm/contact_bulk_action_{$actionName}` dynamic filter.

**Source:** `app/Hooks/Handlers/AdminMenu.php`

---

### `fluent_crm/contact_bulk_action_limit`

Filter the maximum number of contacts to process in a single bulk-action request.

**Parameters**
- `$limit` INT - Default `400`
- `$request` Request Object

**Usage:**
```php
add_filter('fluent_crm/contact_bulk_action_limit', function($limit, $request) {
    return 1000;
}, 10, 2);
```

**Source:** `app/Http/Controllers/SubscriberController.php`

---

### `fluentcrm_advanced_filter_options`

Filter the full array of advanced filter groups for the contact filter UI.

**Parameters**
- `$groups` Array - Filter group definitions

**Usage:**
```php
add_filter('fluentcrm_advanced_filter_options', function($groups) {
    // Add a custom filter group
    $groups['my_filters'] = [
        'label'   => 'My Custom Filters',
        'options' => [
            ['label' => 'Has Purchased', 'value' => 'has_purchased']
        ]
    ];
    return $groups;
});
```

**Source:** `app/Services/Helper.php`

---

## CSV Export & Import Mapping

### `fluent_crm/subscriber_table_columns`

Filter the column definitions for CSV export of the Contacts table.

**Parameters**
- `$columns` Array - Column definitions

**Usage:**
```php
add_filter('fluent_crm/subscriber_table_columns', function($columns) {
    $columns['custom_field'] = __('Custom Field', 'fluent-crm');
    return $columns;
});
```

**Source:** `app/Http/Controllers/CsvController.php`

---

### `fluentcrm_user_map_data`

Filter the [Subscriber](/database/models/subscriber) data array when mapping a WordPress user to a CRM contact during sync.

**Parameters**
- `$subscriber` Array - Subscriber data being mapped
- `$user` \WP_User - WordPress user object

**Usage:**
```php
add_filter('fluentcrm_user_map_data', function($subscriber, $user) {
    $subscriber['company_id'] = get_user_meta($user->ID, 'company_id', true);
    return $subscriber;
}, 10, 2);
```

**Source:** `app/Services/Helper.php`

---

### `fluentcrm_update_wp_user_email_on_change`

Control whether the linked WordPress user's email should be updated when the CRM contact's email changes.

**Parameters**
- `$update` Boolean - Default `false`

**Usage:**
```php
add_filter('fluentcrm_update_wp_user_email_on_change', function($update) {
    return true; // Sync email changes to WP user
});
```

**Source:** `app/Models/Subscriber.php`
