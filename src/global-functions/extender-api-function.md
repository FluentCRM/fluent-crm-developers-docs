---
description: "Extender API — add custom profile sections, smart codes, and contact widgets via FluentCrmApi('extender')."
---

# Extender API

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Developer Guide" />

The Extender API lets you extend FluentCRM's UI and functionality — add custom tabs to contact/company profiles, register smart codes for email templates, and add widgets to the contact sidebar.

## Initialization

```php
$extender = FluentCrmApi('extender');
```

Returns an instance of `FluentCrm\App\Api\Classes\Extender`.

---

## Methods

### addProfileSection()

Add a custom tab section to the contact profile page.

```php
$extender->addProfileSection($key, $sectionTitle, $callback, $saveCallback = null);
```

**Parameters**
- `$key` `string` — Unique section key
- `$sectionTitle` `string` — Display title for the tab
- `$callback` `callable` — Receives `($content, $subscriber)`, must return HTML string
- `$saveCallback` `callable|null` — Receives `($response, $data, $subscriber)`, must return response array

**Example:**

```php
FluentCrmApi('extender')->addProfileSection(
    'membership_info',
    'Membership',
    function ($content, $subscriber) {
        $level = get_user_meta($subscriber->user_id, 'membership_level', true);
        return '<div class="fc_profile_section"><h3>Membership Level</h3><p>' . esc_html($level) . '</p></div>';
    },
    function ($response, $data, $subscriber) {
        // Handle save if needed
        update_user_meta($subscriber->user_id, 'membership_level', sanitize_text_field($data['level']));
        return $response;
    }
);
```

See also: [Profile Section Module](/modules/contact-profile-section) for a full walkthrough.

---

### addCompanyProfileSection()

Add a custom tab section to the company profile page. Same signature as `addProfileSection()` but for companies.

```php
$extender->addCompanyProfileSection($key, $sectionTitle, $callback, $saveCallback = null);
```

**Parameters**
- `$key` `string` — Unique section key
- `$sectionTitle` `string` — Display title for the tab
- `$callback` `callable` — Receives `($content, $company)`, must return HTML string
- `$saveCallback` `callable|null` — Receives `($response, $data, $company)`, must return response array

---

### addSmartCode()

Register a custom smart code group for use in email templates and automations.

```php
$extender->addSmartCode($key, $title, $shortcodes, $callback);
```

**Parameters**
- `$key` `string` — Group key. Must **not** be a reserved key (`crm`, `contact`, `wp`, `user`, etc.)
- `$title` `string` — Group title shown in the smart code picker
- `$shortcodes` `array` — Associative array of `['shortcode_key' => 'Label']`
- `$callback` `callable` — Receives `($code, $valueKey, $defaultValue, $subscriber)`, must return the parsed value

The smart codes are accessible in templates as double-curly-brace tokens like `key.shortcode_key`.

**Example:**

```php
FluentCrmApi('extender')->addSmartCode(
    'membership',
    'Membership Info',
    [
        'level'      => 'Membership Level',
        'expiry'     => 'Expiry Date',
        'points'     => 'Total Points',
    ],
    function ($code, $valueKey, $defaultValue, $subscriber) {
        if (!$subscriber || !$subscriber->user_id) {
            return $defaultValue;
        }

        switch ($valueKey) {
            case 'level':
                return get_user_meta($subscriber->user_id, 'membership_level', true) ?: $defaultValue;
            case 'expiry':
                return get_user_meta($subscriber->user_id, 'membership_expiry', true) ?: $defaultValue;
            case 'points':
                return get_user_meta($subscriber->user_id, 'total_points', true) ?: $defaultValue;
        }

        return $defaultValue;
    }
);
```

After registering, these smart codes are available in the email editor as `membership.level`, `membership.expiry`, and `membership.points` (wrapped in double curly braces).

See also: [Smart Code Module](/modules/smart-code) for a full walkthrough.

---

### addContactWidget()

Add a custom widget to the contact profile sidebar (info widgets area).

```php
$extender->addContactWidget($callback, $priority = 20);
```

**Parameters**
- `$callback` `callable` — Receives `($subscriber)`. Return an associative array with `title` and `content` keys, or a non-array value to skip rendering.
- `$priority` `int` — Filter priority (default `20`)

**Example:**

```php
FluentCrmApi('extender')->addContactWidget(function ($subscriber) {
    if (!$subscriber->user_id) {
        return null; // Skip — no linked WP user
    }

    $orders = get_user_meta($subscriber->user_id, 'total_orders', true);
    $revenue = get_user_meta($subscriber->user_id, 'total_revenue', true);

    return [
        'title'   => 'E-Commerce',
        'content' => '<p>Orders: ' . intval($orders) . '</p><p>Revenue: $' . esc_html($revenue) . '</p>',
    ];
});
```

---

### getCompaniesByContactEmail()

Get all companies associated with a contact by their email address.

```php
$companies = $extender->getCompaniesByContactEmail($email);
```

**Parameters**
- `$email` `string` — Contact's email address

**Returns** `Collection` of [Company](/database/models/company) models, or empty array if not found.

**Source:** `app/Api/Classes/Extender.php`
