# Webhooks

Webhooks allow you to receive real-time notifications when specific events occur in FluentCRM. Set up HTTP endpoints to receive data about subscriber activities, campaign events, and automation triggers.

## Webhook Object

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique webhook identifier |
| `name` | string | Webhook name |
| `url` | string | Target URL for webhook calls |
| `events` | array | Subscribed event types |
| `status` | string | Webhook status |
| `secret` | string | Secret key for verification |
| `created_at` | string | Creation timestamp |
| `updated_at` | string | Last update timestamp |

## Webhook Status Values

- `active` - Webhook is enabled and receiving events
- `inactive` - Webhook is disabled
- `failed` - Webhook has failed delivery attempts

## Get All Webhooks

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/webhooks
```

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/webhooks" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "webhooks": [
    {
      "id": 1,
      "name": "Contact Updates",
      "url": "https://example.com/webhook",
      "events": ["contact.created", "contact.updated"],
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## Create a Webhook

**HTTP Request**
```
POST /wp-json/fluent-crm/v2/webhooks
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | **Yes** | Webhook name |
| `url` | string | **Yes** | Target URL |
| `events` | array | **Yes** | Event types to subscribe to |
| `status` | string | No | Initial status (default: active) |
| `secret` | string | No | Secret key for verification |

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/webhooks" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Webhook",
    "url": "https://example.com/webhook",
    "events": ["contact.created", "contact.updated"],
    "secret": "my-secret-key"
  }'
```

## Update a Webhook

**HTTP Request**
```
PUT /wp-json/fluent-crm/v2/webhooks/{id}
```

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/webhooks/1" \
  -X PUT \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Webhook",
    "events": ["contact.created", "contact.updated", "contact.deleted"]
  }'
```

## Delete a Webhook

**HTTP Request**
```
DELETE /wp-json/fluent-crm/v2/webhooks/{id}
```

## Test a Webhook

Send a test payload to verify webhook configuration.

**HTTP Request**
```
POST /wp-json/fluent-crm/v2/webhooks/{id}/test
```

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/webhooks/1/test" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Available Events

### Contact Events

| Event | Description |
|-------|-------------|
| `contact.created` | New contact added |
| `contact.updated` | Contact information changed |
| `contact.deleted` | Contact removed |
| `contact.status_changed` | Contact status updated |
| `contact.tag_added` | Tag added to contact |
| `contact.tag_removed` | Tag removed from contact |
| `contact.list_added` | Contact added to list |
| `contact.list_removed` | Contact removed from list |

### Email Events

| Event | Description |
|-------|-------------|
| `email.sent` | Email successfully sent |
| `email.opened` | Email opened by recipient |
| `email.clicked` | Link clicked in email |
| `email.bounced` | Email bounced |
| `email.spam_complaint` | Spam complaint received |
| `email.unsubscribed` | Contact unsubscribed |

### Campaign Events

| Event | Description |
|-------|-------------|
| `campaign.created` | New campaign created |
| `campaign.sent` | Campaign finished sending |
| `campaign.paused` | Campaign paused |
| `campaign.resumed` | Campaign resumed |

### Funnel Events

| Event | Description |
|-------|-------------|
| `funnel.subscriber_added` | Contact entered funnel |
| `funnel.subscriber_completed` | Contact completed funnel |
| `funnel.subscriber_exited` | Contact exited funnel |
| `funnel.sequence_completed` | Contact completed sequence |

### Commerce Events

| Event | Description |
|-------|-------------|
| `commerce.order_created` | New order placed |
| `commerce.order_completed` | Order completed |
| `commerce.order_refunded` | Order refunded |
| `commerce.revenue_recorded` | Revenue attributed |

## Webhook Payload Structure

All webhook payloads follow a consistent structure:

```json
{
  "event": "contact.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "webhook_id": 1,
  "data": {
    // Event-specific data
  },
  "signature": "sha256=..."
}
```

### Contact Event Payload

```json
{
  "event": "contact.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "webhook_id": 1,
  "data": {
    "contact": {
      "id": 123,
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "status": "subscribed",
      "created_at": "2024-01-15T10:30:00Z"
    }
  }
}
```

### Email Event Payload

```json
{
  "event": "email.opened",
  "timestamp": "2024-01-15T10:35:00Z",
  "webhook_id": 1,
  "data": {
    "email": {
      "id": 456,
      "subject": "Welcome to our newsletter",
      "contact_id": 123,
      "campaign_id": 789,
      "opened_at": "2024-01-15T10:35:00Z"
    }
  }
}
```

## Webhook Security

### Signature Verification

FluentCRM signs webhook payloads using HMAC-SHA256:

```javascript
// Node.js example
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
  
  return `sha256=${expectedSignature}` === signature;
}

// Verify in your webhook handler
const isValid = verifyWebhook(
  req.body,
  req.headers['x-fluentcrm-signature'],
  'your-webhook-secret'
);
```

### PHP Example

```php
function verifyWebhook($payload, $signature, $secret) {
    $expectedSignature = 'sha256=' . hash_hmac('sha256', $payload, $secret);
    return hash_equals($expectedSignature, $signature);
}

// In your webhook handler
$payload = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_FLUENTCRM_SIGNATURE'];
$isValid = verifyWebhook($payload, $signature, 'your-webhook-secret');
```

## Webhook Delivery

### Retry Logic

- Failed webhooks are retried up to 5 times
- Retry intervals: 1min, 5min, 30min, 2hr, 24hr
- Webhooks are disabled after 5 consecutive failures

### Response Requirements

Your webhook endpoint should:
- Respond with HTTP 200-299 status code
- Respond within 30 seconds
- Return a response body (can be empty)

### Delivery Headers

FluentCRM sends these headers with webhook requests:

```
Content-Type: application/json
User-Agent: FluentCRM-Webhook/1.0
X-FluentCRM-Event: contact.created
X-FluentCRM-Signature: sha256=...
X-FluentCRM-Webhook-ID: 1
X-FluentCRM-Delivery: 12345
```

## Webhook Logs

### Get Webhook Delivery Logs

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/webhooks/{id}/deliveries
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `status` | string | - | Filter by delivery status |
| `per_page` | integer | 25 | Results per page |
| `page` | integer | 1 | Page number |

**Available status values:**
- `success` - Delivered successfully
- `failed` - Delivery failed
- `pending` - Waiting for retry

### Example Response

```json
{
  "deliveries": [
    {
      "id": 12345,
      "event": "contact.created",
      "status": "success",
      "response_code": 200,
      "response_time": 150,
      "attempted_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 50,
    "per_page": 25,
    "current_page": 1,
    "last_page": 2
  }
}
```

## Webhook Examples

### Contact Sync Integration

```javascript
// Express.js webhook handler
app.post('/webhook/fluentcrm', (req, res) => {
  const { event, data } = req.body;
  
  switch(event) {
    case 'contact.created':
      // Sync new contact to your CRM
      syncContactToExternalCRM(data.contact);
      break;
      
    case 'contact.updated':
      // Update contact in your system
      updateExternalContact(data.contact);
      break;
      
    case 'contact.deleted':
      // Remove contact from your system
      removeExternalContact(data.contact.id);
      break;
  }
  
  res.status(200).send('OK');
});
```

### Email Analytics Tracking

```php
// WordPress webhook handler
add_action('rest_api_init', function() {
    register_rest_route('myapp/v1', '/webhook/fluentcrm', [
        'methods' => 'POST',
        'callback' => 'handle_fluentcrm_webhook',
        'permission_callback' => '__return_true'
    ]);
});

function handle_fluentcrm_webhook($request) {
    $data = $request->get_json_params();
    
    switch($data['event']) {
        case 'email.opened':
            // Track email opens in analytics
            track_email_open($data['data']['email']);
            break;
            
        case 'email.clicked':
            // Track link clicks
            track_email_click($data['data']['email']);
            break;
    }
    
    return new WP_REST_Response('OK', 200);
}
```

## Best Practices

### Endpoint Design
- Use HTTPS for webhook URLs
- Implement proper authentication
- Validate webhook signatures
- Handle duplicate events gracefully

### Error Handling
- Return appropriate HTTP status codes
- Log webhook events for debugging
- Implement retry logic for critical operations
- Monitor webhook delivery success rates

### Performance
- Process webhooks asynchronously
- Avoid long-running operations
- Respond quickly to prevent timeouts
- Use queues for heavy processing

### Security
- Verify webhook signatures
- Whitelist FluentCRM IP addresses
- Use secrets for sensitive operations
- Sanitize incoming data

## Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| Webhook not firing | Check event subscription and webhook status |
| Signature verification fails | Ensure secret key matches and payload is raw |
| Timeouts | Optimize endpoint response time |
| Duplicate events | Implement idempotency checks |

### Debug Webhook Delivery

```bash
# Check webhook logs
curl "https://yourdomain.com/wp-json/fluent-crm/v2/webhooks/1/deliveries" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"

# Test webhook endpoint
curl "https://yourdomain.com/wp-json/fluent-crm/v2/webhooks/1/test" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Error Handling

### Webhook Not Found (404)
```json
{
  "code": "rest_post_invalid_id",
  "message": "Invalid webhook ID.",
  "data": {"status": 404}
}
```

### Invalid URL (400)
```json
{
  "code": "invalid_webhook_url",
  "message": "Webhook URL must be a valid HTTPS URL.",
  "data": {"status": 400}
}
```

### Event Not Supported (400)
```json
{
  "code": "invalid_webhook_event",
  "message": "Event type 'invalid.event' is not supported.",
  "data": {"status": 400}
}
```

## Related Endpoints

- [Contacts](/rest-api/contacts) - Manage contacts that trigger webhooks
- [Campaigns](/rest-api/campaigns) - Campaign events for webhooks
- [Funnels](/rest-api/funnels) - Automation events for webhooks
- [Reports](/rest-api/reports) - Analyze webhook delivery performance
