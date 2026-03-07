---
title: Company Profile Section
description: "Learn how to add a custom profile section tab to the FluentCRM company profile page."
---

# Company Profile Section

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

You can add custom tabs to the FluentCRM company profile page using the Extender API. This works the same way as [contact profile sections](/modules/contact-profile-section), but for company profiles.

## Basic Example

```php
add_action('fluent_crm/after_init', function () {
    FluentCrmApi('extender')->addCompanyProfileSection(
        'my_company_section',
        __('My Custom Section', 'your-plugin'),
        function ($contentArr, $company) {
            $contentArr['heading'] = 'Company Details';
            $contentArr['content_html'] = '<div>
                <p>Company: ' . esc_html($company->name) . '</p>
                <p>Industry: ' . esc_html($company->industry) . '</p>
            </div>';
            return $contentArr;
        }
    );
});
```

## API Reference

### `FluentCrmApi('extender')->addCompanyProfileSection($key, $sectionTitle, $callback, $saveCallback)`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `$key` | String | Yes | Unique section identifier. Use your plugin prefix to avoid conflicts. |
| `$sectionTitle` | String | Yes | Tab title displayed in the company profile sidebar |
| `$callback` | Callable | Yes | Renders the section content |
| `$saveCallback` | Callable | No | Handles save requests from the section |

### Render Callback

| Parameter | Type | Description |
|-----------|------|-------------|
| `$contentArr` | Array | Contains `heading` and `content_html` keys to populate |
| `$company` | [Company](/database/models/company) | The company model with all properties |

The `$contentArr` you return must include:
- `heading` — Section heading displayed at the top
- `content_html` — HTML content rendered in the section body

### Save Callback (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `$response` | Array | Response array to return |
| `$data` | Array | Posted form data |
| `$company` | [Company](/database/models/company) | The company model |

```php
FluentCrmApi('extender')->addCompanyProfileSection(
    'my_company_section',
    __('Company Notes', 'your-plugin'),
    function ($contentArr, $company) {
        $notes = get_option('my_plugin_company_notes_' . $company->id, '');
        $contentArr['heading'] = 'Internal Notes';
        $contentArr['content_html'] = '<textarea name="notes">' . esc_textarea($notes) . '</textarea>';
        return $contentArr;
    },
    function ($response, $data, $company) {
        if (isset($data['notes'])) {
            update_option('my_plugin_company_notes_' . $company->id, sanitize_textarea_field($data['notes']));
        }
        $response['message'] = __('Notes saved', 'your-plugin');
        return $response;
    }
);
```

## Available Company Properties

The `$company` model provides access to:

- `$company->name` — Company name
- `$company->industry` — Industry
- `$company->email` — Company email
- `$company->phone` — Phone number
- `$company->address_line_1`, `$company->city`, `$company->state`, `$company->postal_code`, `$company->country` — Address fields
- `$company->website` — Website URL
- `$company->description` — Company description
- `$company->type` — Company type
- `$company->owner_user_id` — WordPress user ID of the company owner

<img src="/assets/img/modules/custom_company_section.png" alt="Custom Company Profile Section" />

**Source:** `app/Api/Classes/Extender.php`
