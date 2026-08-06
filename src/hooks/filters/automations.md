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

::: tip
This runs anywhere the trigger catalogue is assembled — the funnel editor, the dashboard, the MCP
context tools and the Pro data exporter. Register triggers unconditionally rather than gating on the
current screen.
:::

**Source:** `app/Http/Controllers/FunnelController.php`, `app/Http/Controllers/DashboardController.php`, `app/Modules/MCP/Tools/FunnelTools.php`, `app/Modules/MCP/Tools/ContextTools.php`, `fluentcampaign-pro/app/Hooks/Handlers/DataExporter.php`

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

::: warning
`$funnel` is `null` when the MCP context tools build the block catalogue with no funnel in scope, and
a plain `stdClass` cast rather than a Funnel model when the Pro data exporter calls it. Guard before
reading properties off it.
:::

**Source:** `app/Http/Controllers/FunnelController.php`, `app/Modules/MCP/Tools/ContextTools.php`, `fluentcampaign-pro/app/Hooks/Handlers/DataExporter.php`

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

**Source:** `app/Http/Controllers/FunnelController.php`, `fluentcampaign-pro/app/Hooks/Handlers/DataExporter.php`

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

Filter which funnel-subscriber statuses the processor picks up each cycle. Only rows on a
`published` funnel of type `funnels` whose `next_execution_time` is due are considered — this filter
narrows that set by status.

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
- `$limit` INT - Default `200`. Values below `1` are clamped to `1`.

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
- `$seconds` INT - Default `55`. Values below `1` are clamped to `1`.

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
- `$funnelSubId` INT - Funnel subscriber ID; may be `0`/empty for a step evaluated outside a contact's run

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

**Source:** Every trigger class that implements a `willProcess()` gate — `app/Services/Funnel/Triggers/`, `app/Services/ExternalIntegrations/FluentCart/Triggers/`, and the Pro integration triggers under `fluentcampaign-pro/app/Services/Integrations/`

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

Control whether SSL is verified for the **Send Test Webhook** request fired from the funnel editor.

::: warning
This does not affect live webhook sends. The HTTP webhook automation action verifies SSL through
Fluent Forms' `ff_webhook_ssl_verify` filter, which defaults to `false`. Filter that hook instead if
you need to change verification for real automation traffic.
:::

**Parameters**
- `$verify` Boolean - Default `true`

**Usage:**
```php
add_filter('fluent_crm/webhook_ssl_verify', function($verify) {
    return false; // Skip verification when testing against a self-signed endpoint
});
```

**Source:** `app/Http/Controllers/FunnelController.php`

---

## Conditions & A/B Testing

<Badge type="danger" vertical="middle" text="Pro" />

### `fluentcrm_automation_condition_groups`

Filter the available condition groups for automation rules. Fired by the Pro conditional block and
by the abandoned-cart automation triggers, including the FluentCart abandoned-cart driver that ships
in core.

::: tip
This hook only registers the group in the UI. At run time, a group that is not one of the built-in
ones is evaluated through
[`fluentcrm_automation_conditions_assess_{$groupName}`](#fluentcrm-automation-conditions-assess-groupname) —
implement that too, or your group always passes.
:::

**Parameters**
- `$groups` Array - condition group definitions
- `$funnel` [Funnel Model](/database/models/funnel)

**Usage:**
```php
add_filter('fluentcrm_automation_condition_groups', function($groups, $funnel) {
    $groups[] = [
        'value' => 'my_custom_group',
        'label' => 'My Custom Conditions'
    ];
    return $groups;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Services/Funnel/Conditions/FunnelCondition.php`, `fluentcampaign-pro/app/Modules/AbandonCart/Woo/AbandonCartAutomationTrigger.php`, `app/Modules/AbandonCart/Drivers/FluentCart/FluentCartAutomationTrigger.php`

---

### `fluentcrm_automation_custom_conditions`

Filter custom condition options for automation rules.

**Parameters**
- `$conditions` Array - condition definitions
- `$funnel` [Funnel Model](/database/models/funnel)

**Usage:**
```php
add_filter('fluentcrm_automation_custom_conditions', function($conditions, $funnel) {
    $conditions['has_membership'] = [
        'label'    => 'Has Active Membership',
        'type'     => 'yes_no_check'
    ];
    return $conditions;
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Services/Funnel/Conditions/FunnelCondition.php`

---

### `fluentcrm_automation_custom_condition_assert_{$propertyName}`

Dynamic filter to evaluate a custom automation condition. Return `true` or `false` to pass or fail
the condition. It is also consulted by the abandoned-cart runner when it re-evaluates conditions.

::: warning
The default is `true`, so an unhandled property name passes the condition rather than failing it.
When the abandoned-cart runner calls this filter, `$sequence` and `$funnelSubscriberId` are both
`null` — guard for that before dereferencing them.
:::

**Parameters**
- `$result` Boolean - Default `true`
- `$condition` Array - condition config
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$sequence` FunnelSequence Model - `null` when called from the abandoned-cart runner
- `$funnelSubscriberId` INT - funnel subscriber ID; `null` when called from the abandoned-cart runner

**Usage:**
```php
add_filter('fluentcrm_automation_custom_condition_assert_has_membership', function($result, $condition, $subscriber) {
    return user_has_membership($subscriber->user_id);
}, 10, 3);
```

**Source:** `fluentcampaign-pro/app/Services/Funnel/Conditions/FunnelCondition.php`, `app/Modules/AbandonCart/AbandonCartRunner.php`

---

### `fluentcrm_automation_conditions_assess_{$groupName}`

Dynamic filter that evaluates one **condition group** of an automation conditional split for a
contact. Return `true` to pass the group, `false` to fail it. The dynamic portion, `$groupName`, is
the `value` the group was registered under on
[`fluentcrm_automation_condition_groups`](#fluentcrm-automation-condition-groups).

The built-in groups — `subscriber`, `custom_fields`, `segment`, `activities`, `event_tracking` and
`other` — are assessed internally and never reach this filter (single conditions inside `other` go
through
[`fluentcrm_automation_custom_condition_assert_{$propertyName}`](#fluentcrm-automation-custom-condition-assert-propertyname)
instead, keyed by the condition's `data_key`). Everything else is dispatched here, which is how the
Pro integrations (WooCommerce, EDD, LearnDash, LifterLMS, TutorLMS, PMPro, RCP, Wishlist Member,
AffiliateWP) and the core FluentCart integration plug in their purchase/enrollment conditions.
Within one condition set every group must pass (AND); multiple condition sets are OR-ed, and the
contact goes down the "No" path of the split only when every set fails.

::: warning
The default is `true`, so a group name nobody handles passes silently. And as with
`fluentcrm_automation_custom_condition_assert_{$propertyName}`: when the abandoned-cart runner calls
this filter, `$sequence` and `$funnelSubscriberId` are both `null` — guard for that before
dereferencing them. Most implementations register with `10, 3` and ignore the last two arguments
entirely.
:::

**Parameters**
- `$result` Boolean - Default `true`
- `$group` Array - the conditions of this group, each carrying `data_key`, `operator` and `value` (plus `property`, `extra_value` and `data_value` where set)
- `$subscriber` [Subscriber Model](/database/models/subscriber)
- `$sequence` FunnelSequence Model - the conditional split step; `null` when called from the abandoned-cart runner
- `$funnelSubscriberId` INT - funnel subscriber ID; `null` when called from the abandoned-cart runner

**Usage:**
```php
add_filter('fluentcrm_automation_conditions_assess_my_group', function($result, $group, $subscriber) {
    foreach ($group as $condition) {
        if (!my_plugin_condition_matches($condition, $subscriber)) {
            return false;
        }
    }
    return true;
}, 10, 3);
```

**Source:** `fluentcampaign-pro/app/Services/Funnel/Conditions/FunnelCondition.php`, `app/Modules/AbandonCart/AbandonCartRunner.php`

---

### `fluent_crm/funnel_ab_test_is_b`

Determines whether a contact falls into the B variant of an automation A/B test. The unfiltered value
is a weighted coin flip using the step's `path_a` / `path_b` split percentages (both default `50`).

::: warning The third argument changed — breaking
FluentCampaign Pro 3.1.10 and earlier passed `$sequence` **twice**, so the contact was unreachable and per-contact
bucketing was impossible. The duplicate has been dropped: the third argument is now the subscriber,
and the funnel-subscriber id was added as a fourth. A callback that read the third argument as a
sequence must be updated.
:::

**Parameters**
- `$isB` Boolean - whether this contact gets variant B
- `$sequence` FunnelSequence Model - the A/B test step; read `$sequence->settings` for the split percentages
- `$subscriber` [Subscriber Model](/database/models/subscriber) - the contact being bucketed
- `$funnelSubscriberId` INT - the funnel subscriber row id

**Usage:**
```php
add_filter('fluent_crm/funnel_ab_test_is_b', function($isB, $sequence, $subscriber) {
    // Stable bucketing: the same contact always lands in the same variant
    return (crc32($subscriber->email) % 100) >= (int) ($sequence->settings['path_a'] ?? 50);
}, 10, 3);
```

**Source:** `fluentcampaign-pro/app/Services/Funnel/Conditions/FunnelABTesting.php`

---

### `fluent_crm/event_tracking_condition_groups`

Filter condition groups available for event tracking automation triggers.

**Parameters**
- `$groups` Array - condition groups

**Usage:**
```php
add_filter('fluent_crm/event_tracking_condition_groups', function($groups) {
    $groups[] = [
        'value' => 'event_custom',
        'label' => 'Custom Event Conditions'
    ];
    return $groups;
});
```

**Source:** `fluentcampaign-pro/app/Services/Funnel/Triggers/TrackingEventRecordedTrigger.php`

---

### `fluent_crm/http_webhook_body`

Filter the request body sent to external webhooks in HTTP webhook automation actions. Smart codes in
the configured body have already been parsed for the contact when this runs.

::: tip
An empty body short-circuits the step before this filter — the step is marked `skipped` with a
"No valid body data found" note. Use this filter to enrich a body, not to create one from nothing.
On a `GET` step, the returned array becomes the query string rather than a request body.
:::

**Parameters**
- `$body` Array - request body, never empty
- `$sequence` FunnelSequence Model - the webhook step
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_filter('fluent_crm/http_webhook_body', function($body, $sequence, $subscriber) {
    $body['custom_field'] = $subscriber->custom_values['my_field'] ?? '';
    return $body;
}, 10, 3);
```

**Source:** `fluentcampaign-pro/app/Services/Funnel/Actions/HTTPSendDataAction.php`
