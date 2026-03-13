---
description: "SmartCode template parser for FluentCRM — replace placeholders like contact.first_name with actual contact data."
---

<div v-pre>

# Parser (SmartCodes)

`FluentCrm\App\Services\Libs\Parser\Parser`

The Parser class replaces SmartCode placeholders (e.g., `{{contact.first_name}}`) in email templates and text strings with actual contact data. It is used throughout FluentCRM for email personalization, automation messages, and dynamic content.

```php
use FluentCrm\App\Services\Libs\Parser\Parser;
```

## SmartCode Syntax

SmartCodes use double-brace `{{ }}` or double-hash `## ##` syntax:

```
{{namespace.key}}
##namespace.key##
```

### Contact Fields

Access any contact/subscriber field:

| SmartCode | Description |
|-----------|-------------|
| `{{contact.full_name}}` | Full name (first + last) |
| `{{contact.prefix}}` | Name prefix (Mr, Mrs, etc.) |
| `{{contact.first_name}}` | First name |
| `{{contact.last_name}}` | Last name |
| `{{contact.email}}` | Email address |
| `{{contact.id}}` | Contact ID |
| `{{contact.user_id}}` | WordPress user ID |
| `{{contact.address_line_1}}` | Address line 1 |
| `{{contact.address_line_2}}` | Address line 2 |
| `{{contact.city}}` | City |
| `{{contact.state}}` | State/province |
| `{{contact.postal_code}}` | Postal/zip code |
| `{{contact.country}}` | Country code |
| `{{contact.phone}}` | Phone number |
| `{{contact.status}}` | Subscription status |
| `{{contact.date_of_birth}}` | Date of birth |

### Custom Fields

Access custom contact fields by their slug:

```
{{contact.custom.field_slug}}
```

Array values are joined with commas. Date/datetime fields are formatted using WordPress date settings.

### Company Fields

Access the contact's primary company data (requires Companies module):

| SmartCode | Description |
|-----------|-------------|
| `{{contact.company.name}}` | Company name |
| `{{contact.company.industry}}` | Industry |
| `{{contact.company.email}}` | Company email |
| `{{contact.company.phone}}` | Company phone |
| `{{contact.company.website}}` | Website URL |
| `{{contact.company.address}}` | Full formatted address |
| `{{contact.company.city}}` | City |
| `{{contact.company.state}}` | State |
| `{{contact.company.country}}` | Country |

### Tags & Lists

| SmartCode | Description |
|-----------|-------------|
| `{{contact.tags.title}}` | Comma-separated tag titles |
| `{{contact.lists.title}}` | Comma-separated list titles |

### CRM / Business Settings

| SmartCode | Description |
|-----------|-------------|
| `{{crm.business_name}}` | Business name |
| `{{crm.business_address}}` | Business address |
| `##crm.unsubscribe_url##` | Unsubscribe URL |
| `##crm.manage_subscription_url##` | Manage subscription URL |
| `{{crm.unsubscribe_html\|Unsubscribe}}` | Unsubscribe link HTML |
| `{{crm.manage_subscription_html\|Manage Preference}}` | Manage subscription link HTML |
| `{{crm.activate_button\|Confirm Subscription}}` | Double opt-in confirmation button |

### WordPress Values

| SmartCode | Description |
|-----------|-------------|
| `{{wp.admin_email}}` | Admin email |
| `##wp.url##` | Site URL |
| `{{wp.name}}` | Site name |
| `{{wp.description}}` | Site description |

### User Meta

Access WordPress user meta for the contact's linked WP user:

```
{{user.display_name}}
{{user.meta.billing_company}}
{{user.password_reset_direct_link}}
```

### Dynamic Content

| SmartCode | Description |
|-----------|-------------|
| `{{other.latest_post.title}}` | Latest published post title |
| `{{other.latest_post.content}}` | Latest post content |
| `{{other.latest_post.excerpt}}` | Latest post excerpt |
| `{{other.date_format.D, d M, Y}}` | Current date with custom PHP format |
| `{{other.date.+2 days}}` | Dynamic date (relative to now) |

## Default Values

Provide a fallback value after a `|` separator:

```
{{contact.first_name|Friend}}
```

If `first_name` is empty, `Friend` is used instead.

## Transformers

Apply string transformations using `||` (double pipe) syntax:

| Transformer | Description | Example |
|-------------|-------------|---------|
| `trim` | Trim whitespace | `{{contact.first_name\|\|trim}}` |
| `ucfirst` | Capitalize first letter | `{{contact.first_name\|\|ucfirst}}` |
| `strtolower` | Lowercase | `{{contact.email\|\|strtolower}}` |
| `strtoupper` | Uppercase | `{{contact.first_name\|\|strtoupper}}` |
| `ucwords` | Capitalize each word | `{{contact.full_name\|\|ucwords}}` |
| `concat_first` | Prepend text | `{{contact.first_name\|\|concat_first\|Hi }}` → `Hi John` |
| `concat_last` | Append text | `{{contact.first_name\|\|concat_last\|,}}` → `John,` |
| `show_if` | Show text if value exists | `{{contact.first_name\|\|show_if\|Name is set}}` |

You can combine a default value with a transformer:

```
{{contact.first_name|Friend||ucfirst}}
```

## Parser API

### `parse($templateString, $subscriber)`

Parses a string (or array of strings) and replaces all SmartCode placeholders using the subscriber's data.

- **Parameters:**
  - `string|array $templateString` — Template with SmartCode placeholders
  - `Subscriber $subscriber` — The contact object to pull data from
- **Returns:** `string|array` — Parsed result

```php
$parser = new Parser();

// Parse a single string
$result = $parser->parse(
    'Hello {{contact.first_name|there}}, welcome to {{crm.business_name}}!',
    $subscriber
);
// "Hello John, welcome to Acme Inc!"

// Parse multiple strings at once
$results = $parser->parse([
    'subject' => 'Hi {{contact.first_name}}',
    'body'    => 'Your email is {{contact.email}}'
], $subscriber);
// ['subject' => 'Hi John', 'body' => 'Your email is john@example.com']
```

### `parseCrmValue($templateString, $subscriber)`

Parses only `{{crm.*}}` and `##crm.*##` patterns. Used internally for two-pass parsing where CRM values (unsubscribe URLs, etc.) are resolved separately.

- **Parameters:** `string $templateString`, `Subscriber $subscriber`
- **Returns:** `string`

## Extending SmartCodes

You can register custom SmartCode namespaces using the `fluent_crm/smartcode_group_callback_{namespace}` filter:

```php
// Register a custom namespace for shop data
add_filter('fluent_crm/smartcode_group_callback_shop', function ($default, $valueKey, $defaultValue, $subscriber) {
    if ($valueKey === 'order_count') {
        return get_user_meta($subscriber->user_id, '_order_count', true) ?: $defaultValue;
    }
    return $default;
}, 10, 4);
```

Then add it to the SmartCode picker in the editor:

```php
add_filter('fluent_crm/smartcode_groups', function ($groups) {
    $groups[] = [
        'key'        => 'shop',
        'title'      => 'Shop',
        'shortcodes' => [
            // Use: {{shop.order_count}}
            'shop.order_count' => 'Order Count'
        ]
    ];
    return $groups;
});
```

</div>
