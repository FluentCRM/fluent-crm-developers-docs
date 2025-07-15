# Campaigns

Email Campaigns allow you to send one-time emails to your contact lists. The Campaigns API provides complete control over creating, managing, and analyzing your email campaigns.

## Campaign Object

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique campaign identifier |
| `title` | string | Campaign name |
| `slug` | string | URL-friendly identifier |
| `status` | string | Campaign status |
| `email_subject` | string | Email subject line |
| `email_pre_header` | string | Email preview text |
| `email_body` | string | Email HTML content |
| `recipients_count` | integer | Number of recipients |
| `scheduled_at` | string | Send time (null for sent campaigns) |
| `design_template` | string | Template design type |
| `created_at` | string | Creation timestamp |
| `updated_at` | string | Last update timestamp |

## Campaign Status Values

- `draft` - Campaign being created
- `scheduled` - Scheduled for future sending
- `working` - Currently being sent
- `sent` - Completed sending
- `paused` - Temporarily paused
- `archived` - Archived campaign

## Get All Campaigns

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/campaigns
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `searchBy` | string | - | Search by title |
| `sort_type` | string | DESC | Sort direction |
| `sort_by` | string | id | Sort field |
| `with` | array | - | Additional data |

**Available `with` options:**
- `stats` - Include campaign statistics

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/campaigns?with[]=stats" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Get a Specific Campaign

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/campaigns/{id}
```

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/campaigns/1" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Pause a Campaign

Pause a currently sending campaign.

**HTTP Request**
```
POST /wp-json/fluent-crm/v2/campaigns/{id}/pause
```

::: warning Note
You can only pause campaigns that are in `working` status.
:::

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/campaigns/1/pause" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Resume a Campaign

Resume a paused campaign.

**HTTP Request**
```
POST /wp-json/fluent-crm/v2/campaigns/{id}/resume
```

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/campaigns/1/resume" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Duplicate a Campaign

Create a copy of an existing campaign.

**HTTP Request**
```
POST /wp-json/fluent-crm/v2/campaigns/{id}/duplicate
```

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/campaigns/1/duplicate" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Update Campaign Title

**HTTP Request**
```
PUT /wp-json/fluent-crm/v2/campaigns/{id}/title
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | **Yes** | New campaign title |

## Delete a Campaign

**HTTP Request**
```
DELETE /wp-json/fluent-crm/v2/campaigns/{id}
```

## Campaign Analytics

### Get Recipients Count

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/campaigns/{id}/estimated-recipients-count
```

### Get Campaign Emails

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/campaigns/{id}/emails
```

### Get Campaign Status

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/campaigns/{id}/status
```

### Get Campaign Links

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/campaigns/{id}/link-report
```

### Get Campaign Revenues

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/campaigns/{id}/revenues
```

### Get Unsubscribers

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/campaigns/{id}/unsubscribers
```

## Campaign Creation Workflow

1. **Create** campaign with basic details
2. **Configure** recipients (lists, tags, segments)
3. **Design** email content
4. **Schedule** or send immediately
5. **Monitor** performance and engagement

## Best Practices

### Subject Line Optimization
- Keep under 50 characters
- Avoid spam trigger words
- Use personalization
- Create urgency when appropriate
- A/B test different versions

### Content Guidelines
- Mobile-first design
- Clear call-to-action
- Relevant, valuable content
- Proper image optimization
- Unsubscribe link compliance

### Timing Strategy
- Consider audience time zones
- Avoid major holidays
- Test different send times
- Monitor engagement patterns

### Segmentation
- Send targeted, relevant content
- Use lists and tags effectively
- Leverage custom fields
- Monitor segment performance

## Error Handling

### Campaign Not Found (404)
```json
{
  "code": "rest_post_invalid_id",
  "message": "Invalid campaign ID.",
  "data": {"status": 404}
}
```

### Invalid Operation (400)
```json
{
  "code": "rest_invalid_param",
  "message": "Campaign cannot be paused in current status.",
  "data": {"status": 400}
}
```

## Related Endpoints

- [Templates](/rest-api/templates) - Use templates in campaigns
- [Lists](/rest-api/lists) - Target campaigns to specific lists
- [Tags](/rest-api/tags) - Target campaigns to tagged contacts
- [Reports](/rest-api/reports) - Analyze campaign performance
