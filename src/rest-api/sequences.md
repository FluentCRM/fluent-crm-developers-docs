# Email Sequences

Email Sequences allow you to create automated series of emails that are sent to subscribers over time. This is perfect for onboarding, nurturing, and educational campaigns.

## Sequence Object

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique sequence identifier |
| `title` | string | Sequence name |
| `slug` | string | URL-friendly identifier |
| `status` | string | Sequence status (draft, published) |
| `type` | string | Always "email_sequence" |
| `design_template` | string | Template design type |
| `created_at` | string | Creation timestamp |
| `updated_at` | string | Last update timestamp |

## Get All Sequences

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/sequences
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `per_page` | integer | 15 | Sequences per page |
| `page` | integer | 1 | Page number |
| `search` | string | - | Search sequence names |
| `orderBy` | string | id | Sort field |
| `order` | string | DESC | Sort direction |
| `with[]` | array | - | Additional data to include |

**Available `with` options:**
- `stats` - Include sequence statistics

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/sequences?with[]=stats" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Get a Specific Sequence

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/sequences/{id}
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `with[]` | array | Additional data to include |

**Available `with` options:**
- `sequence_emails` - Include individual emails in sequence
- `email_stats` - Include email performance statistics

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/sequences/1?with[]=sequence_emails" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Get Sequence Subscribers

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/sequences/{id}/subscribers
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `per_page` | integer | 15 | Subscribers per page |
| `page` | integer | 1 | Page number |

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/sequences/1/subscribers" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Get Sequences for Subscriber

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/sequences/subscriber/{subscriber_id}/sequences
```

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/sequences/subscriber/123/sequences" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Duplicate a Sequence

**HTTP Request**
```
POST /wp-json/fluent-crm/v2/sequences/{id}/duplicate
```

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/sequences/1/duplicate" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Delete a Sequence

**HTTP Request**
```
DELETE /wp-json/fluent-crm/v2/sequences/{id}
```

### Bulk Delete

**HTTP Request**
```
POST /wp-json/fluent-crm/v2/sequences/do-bulk-action
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sequence_ids` | array | **Yes** | Array of sequence IDs to delete |

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/sequences/do-bulk-action" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "sequence_ids": [1, 2, 3]
  }'
```

## Sequence Email Structure

Each sequence contains multiple emails sent at different intervals:

```json
{
  "sequence_emails": [
    {
      "id": 1,
      "parent_id": "1",
      "type": "sequence_mail", 
      "title": "Welcome to the Course",
      "email_subject": "Day 1: Getting Started",
      "delay": "0",
      "settings": {
        "timings": {
          "delay_unit": "days",
          "delay": "0"
        }
      }
    },
    {
      "id": 2,
      "parent_id": "1", 
      "type": "sequence_mail",
      "title": "Your First Lesson",
      "email_subject": "Day 3: Diving Deeper", 
      "delay": "2880",
      "settings": {
        "timings": {
          "delay_unit": "days",
          "delay": "2"
        }
      }
    }
  ]
}
```

## Common Sequence Types

### Welcome Series
Onboard new subscribers:
1. **Day 0**: Welcome & Introduction
2. **Day 2**: Getting Started Guide  
3. **Day 5**: Success Stories
4. **Day 7**: Resources & Next Steps

### Educational Course
Deliver educational content:
1. **Week 1**: Foundation Concepts
2. **Week 2**: Intermediate Techniques
3. **Week 3**: Advanced Strategies
4. **Week 4**: Implementation & Action

### Product Launch
Build anticipation:
1. **Day -7**: Announcement
2. **Day -3**: Behind the Scenes
3. **Day 0**: Launch Day
4. **Day +3**: Success Stories

### Nurture Campaign
Build relationships:
1. **Week 1**: Value-driven content
2. **Week 3**: Case study
3. **Week 5**: Social proof
4. **Week 7**: Soft promotion

## Best Practices

### 1. Timing Strategy
- **Welcome sequences**: Daily for first week, then weekly
- **Educational content**: Weekly intervals
- **Promotional sequences**: Every 2-3 days
- **Nurture campaigns**: Bi-weekly to monthly

### 2. Content Flow
- Start with high value, low promotion
- Gradually introduce your products/services
- End with clear call-to-action
- Always provide value in each email

### 3. Personalization
Use merge tags for personalization:
- `\{\{contact.first_name\}\}`
- `\{\{contact.company\}\}`
- Custom field values

### 4. Performance Monitoring
Track key metrics:
- Open rates by email
- Click-through rates
- Unsubscribe rates
- Conversion rates

## Error Handling

### Sequence Not Found (404)
```json
{
  "code": "rest_post_invalid_id",
  "message": "Invalid sequence ID.",
  "data": {"status": 404}
}
```

### Access Denied (403)
```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you are not allowed to access this resource.",
  "data": {"status": 403}
}
```

## Related Endpoints

- [Templates](/rest-api/templates) - Create email templates for sequences
- [Funnels](/rest-api/funnels) - Trigger sequences with automation funnels
- [Contacts](/rest-api/contacts) - Manage sequence subscribers
