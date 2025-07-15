# Funnels

Funnels are automated email sequences that guide contacts through a predefined journey. The Funnels API allows you to manage automation workflows, trigger actions, and track subscriber progress through your marketing funnels.

## Funnel Object

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique funnel identifier |
| `title` | string | Funnel name |
| `trigger_name` | string | Trigger type identifier |
| `status` | string | Funnel status |
| `conditions` | object | Trigger conditions |
| `settings` | object | Funnel configuration |
| `created_by` | integer | Creator user ID |
| `created_at` | string | Creation timestamp |
| `updated_at` | string | Last update timestamp |

## Funnel Status Values

- `published` - Active and accepting new subscribers
- `draft` - Being created or edited
- `paused` - Temporarily disabled

## Get All Funnels

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/funnels
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `search` | string | - | Search by title |
| `status` | string | - | Filter by status |
| `sort_by` | string | id | Sort field |
| `sort_type` | string | DESC | Sort direction |
| `per_page` | integer | 10 | Results per page |
| `page` | integer | 1 | Page number |
| `with` | array | - | Include related data |

**Available `with` options:**
- `subscribers_count` - Include subscriber counts
- `sequences` - Include funnel sequences

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/funnels?with[]=subscribers_count" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "funnels": [
    {
      "id": 1,
      "title": "Welcome Series",
      "trigger_name": "fluentform_submission_xyz",
      "status": "published",
      "created_at": "2024-01-15T10:30:00Z",
      "subscribers_count": 245
    }
  ],
  "total": 1,
  "per_page": 10,
  "current_page": 1,
  "last_page": 1
}
```

## Get a Specific Funnel

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/funnels/{id}
```

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/funnels/1" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Update Funnel Status

Change a funnel's publishing status.

**HTTP Request**
```
PUT /wp-json/fluent-crm/v2/funnels/{id}/status
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | **Yes** | New status: `published`, `draft`, or `paused` |

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/funnels/1/status" \
  -X PUT \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"status": "published"}'
```

## Duplicate a Funnel

Create a copy of an existing funnel.

**HTTP Request**
```
POST /wp-json/fluent-crm/v2/funnels/{id}/duplicate
```

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/funnels/1/duplicate" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Delete a Funnel

**HTTP Request**
```
DELETE /wp-json/fluent-crm/v2/funnels/{id}
```

::: warning Note
Deleting a funnel will stop all active sequences and remove subscriber progress data.
:::

## Funnel Subscribers

### Get Funnel Subscribers

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/funnels/{id}/subscribers
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `status` | string | - | Filter by subscriber status |
| `per_page` | integer | 25 | Results per page |
| `page` | integer | 1 | Page number |

**Available status values:**
- `active` - Currently in funnel
- `completed` - Finished the funnel
- `cancelled` - Manually removed

### Add Subscriber to Funnel

**HTTP Request**
```
POST /wp-json/fluent-crm/v2/funnels/{id}/subscribers
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `subscribers` | array | **Yes** | Array of contact IDs |

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/funnels/1/subscribers" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"subscribers": [123, 456, 789]}'
```

### Remove Subscriber from Funnel

**HTTP Request**
```
DELETE /wp-json/fluent-crm/v2/funnels/{id}/subscribers/{subscriber_id}
```

## Funnel Sequences

### Get Funnel Sequences

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/funnels/{id}/sequences
```

### Get Sequence Details

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/funnels/{id}/sequences/{sequence_id}
```

## Funnel Reports

### Get Funnel Overview

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/funnels/{id}/report
```

### Get Conversion Rates

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/funnels/{id}/conversion-rates
```

## Common Trigger Types

### Form Submissions
- `fluentform_submission_*` - Fluent Forms
- `wpcf7_*` - Contact Form 7
- `wpforms_*` - WPForms
- `gravityforms_*` - Gravity Forms

### WooCommerce Events
- `woocommerce_order_status_*` - Order status changes
- `woocommerce_product_purchased` - Product purchases
- `woocommerce_order_total_*` - Order value triggers

### WordPress Events
- `user_registration` - New user registration
- `wp_login` - User login
- `post_published` - New post publication

### Custom Triggers
- `custom_*` - Developer-defined triggers
- `webhook_*` - Webhook-based triggers

## Funnel Best Practices

### Structure Design
- Clear objective for each sequence
- Logical flow progression
- Appropriate delays between emails
- Exit conditions and branching

### Content Strategy
- Value-driven email content
- Progressive disclosure of information
- Clear calls-to-action
- Personalization opportunities

### Performance Optimization
- Monitor open and click rates
- A/B testing different sequences
- Optimize send timing
- Regular performance review

### Audience Segmentation
- Trigger-based entry conditions
- Behavioral targeting
- Dynamic content based on data
- Exit conditions for irrelevant contacts

## Error Handling

### Funnel Not Found (404)
```json
{
  "code": "rest_post_invalid_id",
  "message": "Invalid funnel ID.",
  "data": {"status": 404}
}
```

### Invalid Status (400)
```json
{
  "code": "rest_invalid_param",
  "message": "Invalid status value. Must be published, draft, or paused.",
  "data": {"status": 400}
}
```

### Subscriber Already in Funnel (409)
```json
{
  "code": "subscriber_already_exists",
  "message": "Subscriber is already active in this funnel.",
  "data": {"status": 409}
}
```

## Integration Examples

### Webhook Trigger

```javascript
// Trigger funnel via webhook
fetch('https://yourdomain.com/wp-json/fluent-crm/v2/webhooks/funnel-trigger', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('username:password')
  },
  body: JSON.stringify({
    funnel_id: 1,
    subscriber_data: {
      email: 'user@example.com',
      first_name: 'John',
      custom_field: 'value'
    }
  })
});
```

### PHP Integration

```php
// Add subscriber to funnel programmatically
$funnelSubscriber = new \FluentCrm\App\Models\FunnelSubscriber();
$funnelSubscriber->funnel_id = 1;
$funnelSubscriber->subscriber_id = $subscriber->id;
$funnelSubscriber->status = 'active';
$funnelSubscriber->save();

// Trigger next sequence
do_action('fluentcrm_funnel_start', $funnelSubscriber);
```

## Related Endpoints

- [Sequences](/rest-api/sequences) - Manage funnel email sequences
- [Contacts](/rest-api/contacts) - Manage funnel subscribers
- [Reports](/rest-api/reports) - Analyze funnel performance
- [Webhooks](/rest-api/webhooks) - Set up funnel triggers
