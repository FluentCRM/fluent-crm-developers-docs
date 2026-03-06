---
description: "Filter hooks for automation funnels — triggers, blocks, processing, delays, and sequence customization in FluentCRM."
---

# Automation & Funnel Filters

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These filter hooks let you customize automation funnels — trigger registration, block definitions, processing limits, delays, and sequence behavior.

## Funnel Registration

### `fluentcrm_funnel_triggers`

Filter the array of all registered funnel trigger definitions. Use this to add custom automation triggers.

**Parameters**
- `$triggers` Array - Default `[]`

**Usage:**
```php
add_filter('fluentcrm_funnel_triggers', function($triggers) {
    $triggers['my_custom_trigger'] = [
        'category'    => 'Custom',
        'label'       => __('My Custom Trigger', 'fluent-crm'),
        'description' => 'Fires when a custom event occurs'
    ];
    return $triggers;
});
```

**Source:** `app/Http/Controllers/FunnelController.php`, `app/Http/Controllers/DashboardController.php`

---

### `fluentcrm_funnel_blocks`

Filter all funnel step block definitions available in the funnel editor.

**Parameters**
- `$blocks` Array - Default `[]`
- `$funnel` [Funnel Model](/database/models/funnel)

**Usage:**
```php
add_filter('fluentcrm_funnel_blocks', function($blocks, $funnel) {
    $blocks['my_action'] = [
        'category'    => 'Custom',
        'label'       => __('My Custom Action', 'fluent-crm'),
        'description' => 'Does something custom',
        'type'        => 'action'
    ];
    return $blocks;
}, 10, 2);
```

**Source:** `app/Http/Controllers/FunnelController.php`

---

### `fluentcrm_funnel_block_fields`

Filter custom field definitions for funnel step blocks in the editor UI.

**Parameters**
- `$fields` Array - Default `[]`
- `$funnel` [Funnel Model](/database/models/funnel)

**Usage:**
```php
add_filter('fluentcrm_funnel_block_fields', function($fields, $funnel) {
    $fields['my_action'] = [
        'title'     => 'My Action Settings',
        'fields'    => [
            'message' => [
                'type'  => 'text',
                'label' => 'Message'
            ]
        ]
    ];
    return $fields;
}, 10, 2);
```

**Source:** `app/Http/Controllers/FunnelController.php`

---

### `fluent_crm_funnel_context_smart_codes`

Filter the smart codes available in the funnel email composer for a specific trigger context.

**Parameters**
- `$smartCodes` Array - Default `[]`
- `$triggerName` String - The funnel trigger name
- `$funnel` [Funnel Model](/database/models/funnel)

**Usage:**
```php
add_filter('fluent_crm_funnel_context_smart_codes', function($smartCodes, $triggerName, $funnel) {
    if ($triggerName === 'my_custom_trigger') {
        $smartCodes[] = [
            'key'   => '{{trigger.order_id}}',
            'title' => 'Order ID'
        ];
    }
    return $smartCodes;
}, 10, 3);
```

**Source:** `app/Http/Controllers/FunnelController.php`

---

### `fluent_crm/funnel_icons`

Filter the funnel trigger category icons (SVG paths or Element Plus icon class strings).

**Parameters**
- `$icons` Array - Associative array of `slug => icon`

**Usage:**
```php
add_filter('fluent_crm/funnel_icons', function($icons) {
    $icons['my_category'] = '<svg>...</svg>';
    return $icons;
});
```

**Source:** `app/Hooks/Handlers/AdminMenu.php`

---

### `fluent_crm/funnel_label_color`

Filter the array of available label colors for funnel steps.

**Parameters**
- `$colors` Array - Color hex values

**Usage:**
```php
add_filter('fluent_crm/funnel_label_color', function($colors) {
    $colors[] = '#FF5733';
    return $colors;
});
```

**Source:** `app/Services/Helper.php`

---

## Processing & Limits

### `fluent_crm/funnel_subscriber_statuses`

Filter which funnel-subscriber statuses should be processed each cycle.

**Parameters**
- `$statuses` Array - Default `['active']`

**Usage:**
```php
add_filter('fluent_crm/funnel_subscriber_statuses', function($statuses) {
    $statuses[] = 'paused';
    return $statuses;
});
```

**Source:** `app/Services/Funnel/FunnelProcessor.php`

---

### `fluent_crm/funnel_processor_batch_limit`

Filter the maximum number of funnel subscribers processed in a single processor run.

**Parameters**
- `$limit` INT - Default `200`

**Usage:**
```php
add_filter('fluent_crm/funnel_processor_batch_limit', function($limit) {
    return 500;
});
```

**Source:** `app/Services/Funnel/FunnelProcessor.php`

---

### `fluent_crm/funnel_processor_max_processing_seconds`

Filter the hard time limit (seconds) for the funnel processor per run.

**Parameters**
- `$seconds` INT - Default `55`

**Usage:**
```php
add_filter('fluent_crm/funnel_processor_max_processing_seconds', function($seconds) {
    return 30;
});
```

**Source:** `app/Services/Funnel/FunnelProcessor.php`

---

### `fluent_crm/funnel_seq_delay_in_seconds`

Filter the computed delay (in seconds) for a funnel sequence step. This applies to wait/delay steps, custom field date-based delays, and more.

**Parameters**
- `$waitTimeSeconds` INT - Computed delay in seconds
- `$settings` Array - Step settings
- `$sequence` Object - Sequence data
- `$funnelSubId` INT - Funnel subscriber ID

**Usage:**
```php
add_filter('fluent_crm/funnel_seq_delay_in_seconds', function($waitTime, $settings, $sequence, $funnelSubId) {
    // Add an extra 1-hour buffer to all delays
    return $waitTime + 3600;
}, 10, 4);
```

**Source:** `app/Services/Funnel/FunnelHelper.php`

---

## Trigger Gates & Sequence Hooks

### `fluentcrm_funnel_will_process_{$triggerName}`

Dynamic filter to gate whether a funnel should be triggered for a specific event. Return `false` to prevent the funnel from firing.

**Parameters**
- `$willProcess` Boolean - Default `true`
- `$funnel` [Funnel Model](/database/models/funnel)
- `$subscriberData` Array - Contact data
- `$originalArgs` Array - Original trigger arguments

**Usage:**
```php
add_filter('fluentcrm_funnel_will_process_user_registration', function($willProcess, $funnel, $subscriberData, $originalArgs) {
    // Only process for specific roles
    if ($subscriberData['role'] !== 'subscriber') {
        return false;
    }
    return $willProcess;
}, 10, 4);
```

**Source:** Various trigger files in `app/Services/Funnel/Triggers/`

---

### `fluentcrm_funnel_editor_details_{$triggerName}`

Dynamic filter to enrich the [Funnel](/database/models/funnel) object before it is returned to the editor. Use this to inject extra properties or computed data.

**Parameters**
- `$funnel` [Funnel Model](/database/models/funnel)

**Usage:**
```php
add_filter('fluentcrm_funnel_editor_details_my_trigger', function($funnel) {
    $funnel->extra_options = ['option1', 'option2'];
    return $funnel;
});
```

**Source:** `app/Hooks/Handlers/FunnelHandler.php`, `app/Http/Controllers/FunnelController.php`

---

### `fluentcrm_funnel_sequence_saving_{$actionName}`

Dynamic filter to transform or validate a funnel sequence step before it is saved. The `{$actionName}` is the step's action type slug.

**Parameters**
- `$sequence` Array - Sequence step data
- `$funnel` [Funnel Model](/database/models/funnel)

**Usage:**
```php
add_filter('fluentcrm_funnel_sequence_saving_my_action', function($sequence, $funnel) {
    // Validate or transform the sequence settings
    $sequence['settings']['validated'] = true;
    return $sequence;
}, 10, 2);
```

**Source:** `app/Services/Funnel/FunnelHelper.php`, `app/Http/Controllers/FunnelController.php`

---

### `fluent_crm/webhook_ssl_verify`

Control whether SSL is verified when making outgoing webhook requests from a funnel action.

**Parameters**
- `$verify` Boolean - Default `false`

**Usage:**
```php
add_filter('fluent_crm/webhook_ssl_verify', function($verify) {
    return true; // Enforce SSL verification
});
```

**Source:** `app/Http/Controllers/FunnelController.php`
