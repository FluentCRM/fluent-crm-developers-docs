---
title: Smart Codes
description: "Learn how to register custom SmartCode merge tags in FluentCRM using the Extender API."
---

# Smart Codes

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

Smart Codes are merge tags (like <code v-pre>{{contact.first_name}}</code>) that get replaced with dynamic values when emails are sent. You can register custom SmartCode groups to expose your plugin's data in FluentCRM emails, automation fields, and templates.

## Built-in SmartCode Groups

FluentCRM ships with these SmartCode groups:

| Group | Prefix | Examples |
|-------|--------|----------|
| Contact | `contact` | <code v-pre>{{contact.first_name}}</code>, <code v-pre>{{contact.email}}</code>, <code v-pre>{{contact.phone}}</code> |
| Custom Fields | `contact.custom` | <code v-pre>{{contact.custom.company_size}}</code> |
| Company | `contact.company` | <code v-pre>{{contact.company.name}}</code>, <code v-pre>{{contact.company.industry}}</code> |
| CRM / Business | `crm` | <code v-pre>{{crm.business_name}}</code>, <code v-pre>{{crm.business_address}}</code> |
| WordPress | `wp` | <code v-pre>{{wp.admin_email}}</code> |
| Dynamic Content | `other` | <code v-pre>{{other.latest_post.title}}</code>, <code v-pre>{{other.date.+2 days}}</code> |
| User Meta | `user.meta` | <code v-pre>{{user.meta.billing_phone}}</code> |

### Default Values

Provide a fallback value after a `|` separator:

<div v-pre>

```
{{contact.first_name|Friend}}
```

</div>

If `first_name` is empty, "Friend" is used instead.

### Transformers

Apply a text transformation after `||`:

<div v-pre>

```
{{contact.first_name||ucfirst}}
{{contact.last_name||strtoupper}}
```

</div>

Available transformers:

| Transformer | Description |
|-------------|-------------|
| `trim` | Trims whitespace |
| `ucfirst` | Capitalizes the first letter |
| `ucwords` | Capitalizes the first letter of each word |
| `strtolower` | Converts to lowercase |
| `strtoupper` | Converts to uppercase |
| `concat_first` | Prepends a string (e.g., <code v-pre>{{contact.first_name\|\|concat_first\|Hi}}</code> → "Hi John") |

### Combining Default Values and Transformers

<div v-pre>

```
{{contact.first_name|Friend||ucfirst}}
```

</div>

The syntax is: <code v-pre>{{group.key|default_value||transformer}}</code>

## Registering Custom SmartCodes

Use the Extender API to add your own SmartCode group:

```php
add_action('fluent_crm/after_init', function () {
    $key = 'my_plugin';
    $title = 'My Plugin Data';
    $shortCodes = [
        'membership_level' => 'Membership Level',
        'points_balance'   => 'Points Balance',
        'join_date'        => 'Join Date',
    ];
    $callback = function ($code, $valueKey, $defaultValue, $subscriber) {
        $userId = $subscriber->user_id;

        if (!$userId) {
            return $defaultValue;
        }

        switch ($valueKey) {
            case 'membership_level':
                return get_user_meta($userId, 'membership_level', true) ?: $defaultValue;
            case 'points_balance':
                return get_user_meta($userId, 'points_balance', true) ?: $defaultValue;
            case 'join_date':
                $date = get_user_meta($userId, 'join_date', true);
                return $date ? date('F j, Y', strtotime($date)) : $defaultValue;
            default:
                return $defaultValue;
        }
    };

    FluentCrmApi('extender')->addSmartCode($key, $title, $shortCodes, $callback);
});
```

This registers three SmartCodes that can be used in emails:

<div v-pre>

- `{{my_plugin.membership_level}}` — outputs the contact's membership level
- `{{my_plugin.points_balance|0}}` — outputs points balance, defaults to "0"
- `{{my_plugin.join_date}}` — outputs the formatted join date

</div>

## API Reference

### `FluentCrmApi('extender')->addSmartCode($key, $title, $shortCodes, $callback)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `$key` | String | Unique group identifier. Use your plugin prefix to avoid conflicts. Cannot use reserved keys (see below). |
| `$title` | String | Display title shown in the SmartCode picker dropdown |
| `$shortCodes` | Array | Associative array of `'value_key' => 'Display Label'` pairs |
| `$callback` | Callable | Function called when parsing each SmartCode in this group |

**Callback parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$code` | String | The full SmartCode string (e.g., <code v-pre>{{my_plugin.membership_level}}</code>) |
| `$valueKey` | String | The key portion after the dot (e.g., `membership_level`) |
| `$defaultValue` | String | The default value specified by the user (text after `\|`) |
| `$subscriber` | [Subscriber](/database/models/subscriber) | The contact being processed |

**Reserved keys** (cannot be used as `$key`): `crm`, `other`, `contact`, `wp`, `fluentcrm`, `user`, `learndash`, `tutorlms`, `aff_wp`, `edd_customer`, `lifterlms`, `woo_customer`

**Source:** `app/Api/Classes/Extender.php`
