# Email Templates

Email Templates provide reusable designs and content for your email campaigns. The Templates API allows you to create, manage, and organize your email templates programmatically.

## Template Object

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `ID` | integer | Unique template identifier |
| `post_title` | string | Template name |
| `post_content` | string | Template HTML content |
| `post_excerpt` | string | Template description |
| `email_subject` | string | Default email subject |
| `edit_type` | string | Editor type (html, visual) |
| `design_template` | string | Template design type |
| `post_status` | string | Template status |
| `created_at` | string | Creation timestamp |
| `updated_at` | string | Last update timestamp |

## Design Template Types

- `simple` - Clean, simple layout
- `plain` - Plain text style
- `classic` - Traditional email design
- `raw_classic` - Raw HTML classic
- `raw_html` - Custom HTML

## Get All Templates

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/templates
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `per_page` | integer | 15 | Templates per page |
| `page` | integer | 1 | Page number |
| `search` | string | - | Search template names |
| `order_by` | string | ID | Sort field |
| `order_type` | string | desc | Sort direction |

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/templates" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Create a Template

**HTTP Request**
```
POST /wp-json/fluent-crm/v2/templates
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `template[post_title]` | string | Template name |
| `template[post_content]` | string | HTML content |
| `template[post_excerpt]` | string | Description |
| `template[email_subject]` | string | Default subject |
| `template[edit_type]` | string | Editor type |
| `template[design_template]` | string | Design type |

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/templates" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "template": {
      "post_title": "Welcome Email",
      "post_content": "<h1>Welcome!</h1><p>Thanks for joining us.</p>",
      "email_subject": "Welcome to our community",
      "design_template": "simple"
    }
  }'
```

## Update a Template

**HTTP Request**
```
PUT /wp-json/fluent-crm/v2/templates/{id}
```

## Delete a Template

**HTTP Request**
```
DELETE /wp-json/fluent-crm/v2/templates/{id}
```

## Duplicate a Template

**HTTP Request**
```
POST /wp-json/fluent-crm/v2/templates/duplicate/{id}
```

::: tip Template Management
Email templates are the foundation of your email campaigns. Create a library of templates for different types of communications: welcome emails, newsletters, product announcements, etc.
:::

## Related Endpoints

- [Campaigns](/rest-api/campaigns) - Use templates in email campaigns
- [Sequences](/rest-api/sequences) - Use templates in email sequences
