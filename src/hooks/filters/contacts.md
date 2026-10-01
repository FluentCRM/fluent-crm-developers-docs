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
- `$statuses` Array - a plain list of status slugs. Defaults to `subscribed`, `pending`, `unsubscribed`, `transactional`, `bounced`, `complained`, `spammed`

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

Filter which contact statuses are user-editable (can be set manually by an admin). The incoming list
is `fluent_crm/contact_statuses` with the three system-only statuses — `bounced`, `complained` and
`spammed` — already removed.

::: tip
Adding a status here only affects the editable list. Register it on
[`fluent_crm/contact_statuses`](#fluent-crm-contact-statuses) as well, or the rest of the CRM will
not recognise it.
:::

**Parameters**
- `$statuses` Array - the status list minus `bounced`, `complained` and `spammed`. Array keys are preserved from `array_diff()`, so the list is not re-indexed.

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

### `fluent_crm/profile_section_{$sectionId}`

<Badge type="tip" text="Since 3.2.1" />

Supplies the content of a custom contact profile section when its tab is opened. `{$sectionId}` is the section ID sent as `section_provider` by the profile screen.

::: warning Deprecated predecessor
`fluencrm_profile_section_{$sectionId}` (note the missing "t" in the prefix) still runs first through `apply_filters_deprecated()` and logs a deprecation notice. Move existing callbacks to this name.
:::

**Parameters**
- `$content` Array - `heading` (string) and `content_html` (string); both start empty
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_filter('fluent_crm/profile_section_my_section', function ($content, $subscriber) {
    return [
        'heading'      => __('Memberships', 'my-plugin'),
        'content_html' => '<p>' . esc_html($subscriber->email) . '</p>',
    ];
}, 10, 2);
```

::: danger Escape your output
`content_html` is rendered as raw HTML in the admin UI. Escape any subscriber-authored data with `esc_html()` or `wp_kses_post()` before returning it.
:::

**Source:** `app/Http/Controllers/SubscriberController.php`

---

### `fluent_crm/profile_section_save_{$sectionId}`

<Badge type="tip" text="Since 3.2.1" />

Handles saving data posted from a custom profile section. Return a truthy value on success; a falsy return makes the request fail with an error.

::: warning Deprecated predecessor
`fluencrm_profile_section_save_{$sectionId}` still runs first through `apply_filters_deprecated()` and logs a deprecation notice.
:::

**Parameters**
- `$response` Mixed - starts as an empty string (or whatever a legacy callback returned)
- `$data` Array - the `data` field of the request
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Source:** `app/Http/Controllers/SubscriberController.php`

---

### `fluent_crm/subscriber_top_widgets`

Filter the array of "top" widgets shown above the timeline on a contact profile. The incoming array
holds the built-in commerce widget when one applies, and the returned array is passed through
`array_filter()`, so returning a falsy entry removes that widget.

::: danger Escape your widget content
Each widget's `content` is rendered as raw HTML in the admin UI (Vue `v-html`) with no client-side
sanitization. Escape any contact-authored data with `esc_html()` or `wp_kses_post()` before returning
it, or you introduce stored XSS in the admin. Rich markup is allowed by design — the responsibility
sits with the code producing the widget.
:::

**Parameters**
- `$widgets` Array - widget definitions, each with `title` and `content`
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

Filter additional sidebar info widgets on a contact profile page. Starts as an empty array. Also
consulted when the MCP contact tools assemble a contact profile. A widget may additionally set
`has_pagination`, `total`, `per_page` and `current_page` keys — the profile sidebar then re-fetches
that single widget page by page through
[`fluent_crm/subscriber_info_widget_{$widgetKey}`](#fluent-crm-subscriber-info-widget-widgetkey).

::: danger Escape your widget content
Same as `fluent_crm/subscriber_top_widgets` — `content` is rendered with Vue `v-html` and is not
sanitized. Escape contact-authored data before returning it.
:::

**Parameters**
- `$widgets` Array - widget definitions, each with `title` and `content`; empty by default
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

**Source:** `app/Http/Controllers/SubscriberController.php`, `app/Modules/MCP/Tools/ContactTools.php`

---

### `fluent_crm/subscriber_info_widget_{$widgetKey}`

Lazy-load or refresh a **single** sidebar info widget. When the profile sidebar requests
`subscribers/{id}/info-widgets` with a `by_widget` parameter — which the admin UI does when paging a
widget that was registered with `has_pagination` on
[`fluent_crm/subscriber_info_widgets`](#fluent-crm-subscriber-info-widgets) — only this dynamic
filter runs instead of the full widget registry. The dynamic portion, `$widgetKey`, is the array key
the widget was registered under.

Return an array of widget definitions: the controller runs it through `array_values()` and uses the
**first** element as the refreshed widget, falling back to `['content' => 'No content found']` when
the array is empty. In practice producers register the same callback on both hooks — core's Event
Tracking handler registers `addSubscriberInfoWidgets` on `fluent_crm/subscriber_info_widgets` and
`fluent_crm/subscriber_info_widget_event_tracking` alike, and reads the request's `page` parameter to
build the requested page.

**Parameters**
- `$widgets` Array - always empty; return an array whose first element is the widget definition (`title`, `content`, and optionally `has_pagination`, `total`, `per_page`, `current_page`)
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_filter('fluent_crm/subscriber_info_widget_my_widget', function($widgets, $subscriber) {
    $page = isset($_REQUEST['page']) ? max(1, (int) $_REQUEST['page']) : 1;

    $widgets['my_widget'] = [
        'title'   => __('My Widget', 'my-plugin'),
        'content' => '<p>Page ' . $page . ' content for ' . esc_html($subscriber->email) . '</p>'
    ];
    return $widgets;
}, 10, 2);
```

**Source:** `app/Http/Controllers/SubscriberController.php` (example producer: `app/Hooks/Handlers/EventTrackingHandler.php`)

---

### `fluentcrm_commerce_provider`

Declare the active commerce provider for the CRM. The unfiltered value is an empty string; a
non-empty slug switches on the purchase widget on contact profiles, the `commerce_stat` payload of
the contact API and the commerce columns of the contacts table query. FluentCampaign Pro hooks this
in `fluentcampaign-pro/app/Hooks/filters.php` and returns `woo` or `edd` (via
`Commerce::getCommerceProvider()`) when the matching deep-integration sync is enabled.

::: tip
The returned slug becomes the dynamic part of
[`fluent_crm/contact_purchase_stat_{$provider}`](#fluent-crm-contact-purchase-stat-provider), so a
custom provider must implement that filter too or the purchase widget stays empty.
:::

**Parameters**
- `$provider` String - commerce provider slug. Default `''` (no provider)

**Usage:**
```php
add_filter('fluentcrm_commerce_provider', function($provider) {
    return $provider ?: 'my_shop';
});
```

**Source:** `app/Http/Controllers/SubscriberController.php`, `app/Hooks/Handlers/PurchaseHistory.php`, `app/Hooks/Handlers/AdminMenu.php`, `app/Services/ContactsQuery.php` (implemented in `fluentcampaign-pro/app/Hooks/filters.php`)

---

### `fluent_crm/contact_purchase_stat_{$provider}`

Supply the purchase statistics shown on a contact profile (the "commerce stat" blocks of the
purchase widget and the `commerce_stat` field of the contact API response). The dynamic portion,
`$provider`, is whatever [`fluentcrm_commerce_provider`](#fluentcrm-commerce-provider) returned.
FluentCampaign Pro registers the `woo` and `edd` variants
(`fluentcampaign-pro/app/Services/Integrations/WooCommerce/DeepIntegration.php` and
`.../Edd/DeepIntegration.php`).

**Parameters**
- `$stats` Array - stat blocks, empty by default. Pro returns a list of blocks, each with `title` (label), `value` (display HTML), `key` (machine key such as `customer_since`, `last_order_date`, `order_count`, `lifetime_value`, `aov`) and `actual_value` (raw value)
- `$subscriberId` INT - the contact id (not the model)

**Usage:**
```php
add_filter('fluent_crm/contact_purchase_stat_my_shop', function($stats, $subscriberId) {
    $stats[] = [
        'title'        => __('Order Count', 'my-plugin'),
        'value'        => '12',
        'key'          => 'order_count',
        'actual_value' => 12
    ];
    return $stats;
}, 10, 2);
```

**Source:** `app/Http/Controllers/SubscriberController.php`, `app/Hooks/Handlers/PurchaseHistory.php`

---

### `fluentcrm_get_form_submissions_{$provider}`

Supply the rows of the **Forms** tab on a contact profile for one form plugin. The dynamic portion,
`$provider`, is the slug the tab was registered under via
[`fluent_crm/form_submission_providers`](/hooks/filters/webhooks-and-integrations#fluent-crm-form-submission-providers).
Core ships the `fluentform` implementation in `app/Hooks/Handlers/FormSubmissions.php`; the request's
`page` and `per_page` parameters are available for pagination.

::: danger Escape your column values
The returned column values are rendered as raw HTML in the admin UI (Vue `v-html`) with no
client-side sanitization. Escape any contact-authored data with `esc_html()` or `wp_kses_post()`
before returning it. Structural markup (links, badges) is allowed by design.
:::

::: tip
Besides `data` and `total`, the return array may carry a `columns_config` map
(`column_key => ['label' => ..., 'width' => ..., 'quick_action' => true]`) to control the table.
A row that includes a `__id` key and `'action' => 'view'` gets a View button that opens a detail
drawer via [`fluent_crm/dynamic_contact_item_view_{$provider}`](#fluent-crm-dynamic-contact-item-view-provider),
receiving the full row as `$params`.
:::

**Parameters**
- `$data` Array - `['data' => [], 'total' => 0]` by default; `data` is a list of rows (`column key => cell HTML`), `total` the overall submission count
- `$subscriber` [Subscriber Model](/database/models/subscriber)

**Usage:**
```php
add_filter('fluentcrm_get_form_submissions_my_forms', function($data, $subscriber) {
    $data['data'][] = [
        '__id'   => 123,
        'id'     => '#123',
        'title'  => esc_html('Contact Form'),
        'action' => 'view'
    ];
    $data['total'] = 1;
    return $data;
}, 10, 2);
```

**Source:** `app/Http/Controllers/SubscriberController.php` (example producer: `app/Hooks/Handlers/FormSubmissions.php`)

---

### `fluent_crm/dynamic_contact_item_view_{$provider}`

Supply the content of the detail drawer that opens from a contact-profile list row — for example the
single-submission view of the Forms tab. The admin UI calls
`subscribers/{id}/dynamic-item-view` with a `provider` and the originating row as `params`, and this
dynamic filter builds what the drawer shows. Core implements the `fluentform` variant
(`app/Hooks/Handlers/FormSubmissions.php`), which reads `__id` from `$params` to load the submission.

The drawer sanitizes `content_html` and `footer_content` client-side (`$sanitize`/DOMPurify) before
rendering — still escape contact-authored data server-side rather than relying on it.

::: warning
A second call site in `app/Http/Controllers/FormsController.php` (`getEntry()`) fires
`fluent_crm/dynamic_contact_item_view_fluentform` with **only two arguments** — the default array and
`['__id' => $id]` — so a callback on this hook must not require the `$subscriber` argument. Core's
own handler registers with `10, 2` for exactly that reason. That call site also passes a smaller
default array (only `content_html`), so do not assume every default key is present.
:::

**Parameters**
- `$dataView` Array - Default `['type' => 'html', 'title' => 'no title', 'content_html' => 'sorry, no content found', 'footer_content' => '']`
- `$params` Array - parameters sent by the UI; for Forms-tab rows this is the row returned by [`fluentcrm_get_form_submissions_{$provider}`](#fluentcrm-get-form-submissions-provider), including `__id`
- `$subscriber` [Subscriber Model](/database/models/subscriber) - not passed on the `FormsController` call site (see warning)

**Usage:**
```php
add_filter('fluent_crm/dynamic_contact_item_view_my_forms', function($dataView, $params) {
    $entryId = isset($params['__id']) ? (int) $params['__id'] : 0;

    $dataView['title'] = sprintf(__('Entry #%d', 'my-plugin'), $entryId);
    $dataView['content_html'] = '<div>' . esc_html(my_plugin_get_entry_text($entryId)) . '</div>';
    return $dataView;
}, 10, 2);
```

**Source:** `app/Http/Controllers/SubscriberController.php`, `app/Http/Controllers/FormsController.php`

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

Filter a custom field value when it is read back — once per value from
`Subscriber::custom_fields()`, and once per value when `ContactsQuery` bulk-loads custom fields for a
contact list.

::: warning
Only the value is passed. There is no field key, no field type and no contact, so a callback cannot
tell which field it is transforming or who it belongs to. Treat it as a blanket transform over every
custom field value.
:::

**Parameters**
- `$value` Mixed - the raw stored value

**Usage:**
```php
add_filter('fluent_crm/modify_custom_field_value', function($value) {
    // Applies to every custom field value — keep it type-safe
    return is_string($value) ? trim($value) : $value;
});
```

**Source:** `app/Models/Subscriber.php`, `app/Services/ContactsQuery.php`

---

### `fluent_crm/default_avatar`

Filter the default avatar URL. This only runs when **Enable Gravatar** is switched off in the
compliance settings — when Gravatar is on, `fluent_crm/get_avatar` runs instead and this one never
fires.

**Parameters**
- `$url` String - Default avatar image URL, `assets/images/avatar.png` from the plugin
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

Filter the final avatar URL for a contact. Only runs when **Enable Gravatar** is switched on; the
default value is the Gravatar URL, with a `ui-avatars.com` fallback appended when
**Gravatar fallback** is enabled and a name is available.

**Parameters**
- `$url` String - the Gravatar URL, sized at 128px
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
- `$limit` INT - Default `400`. Values below `1` are clamped to `1`.
- `$request` Request Object - the incoming bulk-action request, so the limit can vary by action

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

### `fluentcrm_ajax_options_{$optionKey}`

Supply the options of a searchable AJAX selector. The advanced contact filters, automation condition
UIs and several funnel settings load their dropdown choices from the `ajax-options` REST endpoint;
a handful of option keys (`woo_categories`, `company_industries`, `company_types`, `users`, …) are
answered directly by `OptionsController::getAjaxOptions()`, and every other key falls through to this
dynamic filter. The dynamic portion, `$optionKey`, is the `option_key` the selector component was
configured with.

Core registers `event_tracking_keys` (`app/Hooks/Handlers/EventTrackingHandler.php`); FluentCampaign
Pro registers around a dozen variants such as `product_selector_lifterlms`
(`fluentcampaign-pro/app/Services/Integrations/LifterLms/DeepIntegration.php`), `woo_coupons`,
`edd_coupons`, `surecart_products` and `product_selector_pmpro`.

**Parameters**
- `$options` Array - always empty; return a list of option arrays, each with an `id` and a `title` (display label). Some producers return extra keys — e.g. the Woo coupon provider uses `name` instead of `title` for its specific selector component (the EDD coupon provider sticks to `id`/`title`) — but `id`/`title` is the shape generic selectors expect
- `$search` String - the term typed into the selector; filter your query with it
- `$includedIds` Array|String - the values already selected in the UI (`values` request parameter); include them in the result so saved selections keep their labels

**Usage:**
```php
add_filter('fluentcrm_ajax_options_my_products', function($options, $search, $includedIds) {
    $products = my_plugin_search_products($search, (array) $includedIds);

    foreach ($products as $product) {
        $options[] = [
            'id'    => $product->id,
            'title' => $product->name
        ];
    }
    return $options;
}, 10, 3);
```

**Source:** `app/Http/Controllers/OptionsController.php`

---

## CSV Export & Import Mapping

### `fluentcrm_csv_mimes`

Filter the MIME-type whitelist a CSV upload must match when contacts (or companies) are imported
(`CsvController::upload()` validates the file with a `mimetypes:` rule built from this list).

::: tip
This filter matters on hosts whose PHP `finfo` reports unusual MIME types for CSV files — the
default list already includes oddballs like `application/vnd.ms-excel` and
`application/octet-stream` for that reason. If valid CSVs are rejected on a specific server, add the
type that server reports.
:::

**Parameters**
- `$mimes` Array - Default `['text/csv', 'text/plain', 'application/csv', 'text/comma-separated-values', 'application/excel', 'application/vnd.ms-excel', 'application/vnd.msexcel', 'text/anytext', 'application/octet-stream', 'application/txt']`

**Usage:**
```php
add_filter('fluentcrm_csv_mimes', function($mimes) {
    $mimes[] = 'application/x-csv';
    return $mimes;
});
```

**Source:** `app/Functions/helpers.php` (`fluentcrmCsvMimes()`, consumed by `app/Http/Controllers/CsvController.php`)

---

### `fluent_crm/subscriber_table_columns`

Filter the contact columns offered as mapping targets when a CSV is uploaded for **import**
(`CsvController::upload()`). It does not affect CSV export.

**Parameters**
- `$columns` Array - a plain list of column slugs a CSV header can be mapped onto

**Usage:**
```php
add_filter('fluent_crm/subscriber_table_columns', function($columns) {
    $columns[] = 'custom_field';
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

Control whether a CRM email change is pushed to the linked WordPress user. It is consulted in two
places:

- `Subscriber` model — when a saved contact's email no longer matches its linked WP user, returning `true` writes the new address onto the WP user via `wp_update_user()`.
- `SubscriberController` — when a contact is edited to an email that matches no WP user, returning `true` keeps the contact linked to its existing WP user instead of unlinking it.

**Parameters**
- `$update` Boolean - Default `false`

**Usage:**
```php
add_filter('fluentcrm_update_wp_user_email_on_change', function($update) {
    return true; // Sync email changes to WP user
});
```

**Source:** `app/Models/Subscriber.php`, `app/Http/Controllers/SubscriberController.php`

---

### `fluent_crm/get_import_driver_{$driver}`

First phase of a custom contact-import driver: build the configuration screen. Any import driver
that is not the built-in `users` (or CSV) handler is dispatched through this dynamic filter by
`ImporterController::getDriver()`. The dynamic portion, `$driver`, is the key the driver was
registered under on
[`fluent_crm/import_providers`](/hooks/filters/webhooks-and-integrations#fluent-crm-import-providers) —
without that registration the driver never shows up in the import UI.

The controller calls the same filter twice in the wizard:

1. **Screen definition** — return `['config' => [...defaults...], 'fields' => [...field definitions...]]` describing the driver's settings form.
2. **Summary/preview** — when the request carries `summary`, return `['import_info' => ['subscribers' => [...], 'total' => N, 'has_list_config' => true, 'has_status_config' => true, 'has_update_config' => true, 'has_silent_config' => true]]` so the wizard can show a preview and the standard list/status/update options.

Returning `false` (the default) or a `WP_Error` aborts with "Sorry no driver found for this import"
(or the `WP_Error` message). The actual row processing happens in the second hook,
[`fluent_crm/post_import_driver_{$driver}`](#fluent-crm-post-import-driver-driver).

::: tip
FluentCampaign Pro's `fluentcampaign-pro/app/Services/Integrations/BaseImporter.php` wires both
phases for its LMS/membership importers; `PMProImporter` in the same directory is a complete
reference implementation of the two-phase contract.
:::

**Parameters**
- `$response` Boolean|Array|\WP_Error - Default `false`
- `$request` Request Object - the current wizard request; read `config` and `summary` from it

**Usage:**
```php
add_filter('fluent_crm/get_import_driver_my_source', function($response, $request) {
    if ($request->get('summary')) {
        return [
            'import_info' => [
                'subscribers'       => my_source_preview_rows(5),
                'total'             => my_source_total(),
                'has_list_config'   => true,
                'has_status_config' => true,
                'has_update_config' => true,
                'has_silent_config' => true
            ]
        ];
    }

    return [
        'config' => ['import_type' => 'all'],
        'fields' => [
            'import_type' => [
                'label'   => __('Import by', 'my-plugin'),
                'type'    => 'input-radio',
                'options' => [
                    ['id' => 'all', 'label' => __('All Customers', 'my-plugin')]
                ]
            ]
        ]
    ];
}, 10, 2);
```

**Source:** `app/Http/Controllers/ImporterController.php`

---

### `fluent_crm/post_import_driver_{$driver}`

Second phase of a custom contact-import driver: process one page of the actual import.
`ImporterController::importData()` fires this repeatedly — once per batch — with the config collected
by [`fluent_crm/get_import_driver_{$driver}`](#fluent-crm-get-import-driver-driver) and an
incrementing page number, until the returned progress data reports no more pages. Import your batch
(Pro's importers use `Subscriber::import()` with a limit of 100 users per page) and return the
progress array the wizard polls on.

Returning `false` (the default) or a `WP_Error` aborts with an error message, so an unrecognized
config is safe to reject.

**Parameters**
- `$response` Boolean|Array|\WP_Error - Default `false`. On success return progress data: `['page_total' => ..., 'record_total' => ..., 'has_more' => bool, 'current_page' => $page, 'next_page' => $page + 1]`
- `$config` Array - the driver config the user filled in on the screen from phase one
- `$page` INT - the 1-based batch number for this request

**Usage:**
```php
add_filter('fluent_crm/post_import_driver_my_source', function($response, $config, $page) {
    $perPage = 100;
    $total   = my_source_total();

    my_source_import_batch($config, $page, $perPage);

    return [
        'page_total'   => ceil($total / $perPage),
        'record_total' => $total,
        'has_more'     => $total > ($page * $perPage),
        'current_page' => $page,
        'next_page'    => $page + 1
    ];
}, 10, 3);
```

**Source:** `app/Http/Controllers/ImporterController.php`
