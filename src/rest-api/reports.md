# Reports

The Reports API provides comprehensive analytics and insights into your FluentCRM performance. Get detailed statistics on campaigns, funnels, subscriber activity, and overall email marketing metrics.

## Report Types

FluentCRM provides several types of reports:

- **Overview** - General performance metrics
- **Campaigns** - Individual campaign analytics
- **Funnels** - Automation performance
- **Subscribers** - Contact activity and growth
- **Revenue** - Commerce tracking and attribution

## General Reports

### Dashboard Overview

Get key performance indicators for the dashboard.

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/overview
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `date_range` | string | 30_days | Time period for report |
| `compare_with` | string | - | Comparison period |

**Available `date_range` options:**
- `today`
- `yesterday`
- `7_days`
- `30_days`
- `90_days`
- `12_months`
- `custom` (requires `start_date` and `end_date`)

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/reports/overview?date_range=30_days" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "total_subscribers": 5432,
  "subscriber_growth": {
    "current_period": 234,
    "previous_period": 189,
    "growth_rate": 23.8
  },
  "email_stats": {
    "emails_sent": 12560,
    "emails_opened": 3768,
    "emails_clicked": 942,
    "open_rate": 30.0,
    "click_rate": 7.5
  },
  "revenue": {
    "total": 15680.50,
    "growth": 12.3
  }
}
```

## Campaign Reports

### All Campaigns Performance

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/campaigns
```

### Single Campaign Report

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/campaigns/{id}
```

### Campaign Email Stats

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/campaigns/{id}/email-stats
```

### Example Response

```json
{
  "campaign_id": 123,
  "campaign_title": "Summer Sale Campaign",
  "stats": {
    "sent": 1000,
    "delivered": 985,
    "opened": 295,
    "clicked": 78,
    "unsubscribed": 5,
    "bounced": 15,
    "delivery_rate": 98.5,
    "open_rate": 29.9,
    "click_rate": 7.9,
    "unsubscribe_rate": 0.5
  },
  "revenue": {
    "total": 2450.00,
    "orders": 12,
    "conversion_rate": 1.2
  }
}
```

## Funnel Reports

### All Funnels Performance

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/funnels
```

### Single Funnel Report

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/funnels/{id}
```

### Funnel Conversion Analysis

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/funnels/{id}/conversion-stats
```

### Example Response

```json
{
  "funnel_id": 456,
  "funnel_title": "Welcome Series",
  "subscribers": {
    "total_entered": 523,
    "currently_active": 89,
    "completed": 401,
    "completion_rate": 76.7
  },
  "sequence_performance": [
    {
      "sequence_id": 1,
      "title": "Welcome Email",
      "sent": 523,
      "opened": 387,
      "clicked": 145,
      "open_rate": 74.0,
      "click_rate": 27.7
    }
  ]
}
```

## Subscriber Reports

### Subscriber Growth

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/subscriber-growth
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `date_range` | string | 30_days | Time period |
| `group_by` | string | day | Grouping interval |

**Available `group_by` options:**
- `hour` (for today/yesterday)
- `day` (for weekly/monthly)
- `week` (for quarterly)
- `month` (for yearly)

### Subscriber Activity

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/subscriber-activity
```

### Top Performing Subscribers

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/top-subscribers
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `metric` | string | engagement | Ranking metric |
| `limit` | integer | 10 | Number of results |

**Available `metric` options:**
- `engagement` - Email engagement score
- `revenue` - Purchase activity
- `activity` - Overall activity level

## Revenue Reports

### Revenue Overview

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/revenue
```

### Revenue by Campaign

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/revenue/campaigns
```

### Revenue by Contact

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/revenue/contacts
```

### Example Response

```json
{
  "total_revenue": 45230.50,
  "total_orders": 189,
  "average_order_value": 239.32,
  "attribution": {
    "campaigns": 32450.25,
    "funnels": 12780.25
  },
  "top_campaigns": [
    {
      "campaign_id": 123,
      "title": "Black Friday Sale",
      "revenue": 8950.00,
      "orders": 45
    }
  ]
}
```

## Email Deliverability Reports

### Bounce Analysis

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/bounces
```

### Spam Complaints

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/spam-complaints
```

### Unsubscribe Analysis

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/unsubscribes
```

## List Performance Reports

### All Lists Performance

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/lists
```

### Single List Report

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/lists/{id}
```

## Tag Performance Reports

### All Tags Performance

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/tags
```

### Single Tag Report

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/tags/{id}
```

## Advanced Analytics

### Segmentation Analysis

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/segmentation-analysis
```

### A/B Testing Results

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/ab-testing
```

### Engagement Scoring

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/engagement-scores
```

## Scheduled Reports

### Create Scheduled Report

**HTTP Request**
```
POST /wp-json/fluent-crm/v2/reports/scheduled
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | **Yes** | Report title |
| `type` | string | **Yes** | Report type |
| `frequency` | string | **Yes** | Schedule frequency |
| `recipients` | array | **Yes** | Email recipients |
| `settings` | object | - | Report configuration |

**Available `frequency` options:**
- `daily`
- `weekly`
- `monthly`
- `quarterly`

### Get Scheduled Reports

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/scheduled
```

## Export Reports

### Export Campaign Data

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/campaigns/{id}/export
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `format` | string | csv | Export format |
| `include` | array | basic | Data to include |

**Available `format` options:**
- `csv`
- `xlsx`
- `json`

**Available `include` options:**
- `basic` - Basic statistics
- `subscribers` - Subscriber details
- `activities` - Email activities
- `revenue` - Revenue data

### Export Subscriber Data

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/subscribers/export
```

## Real-time Analytics

### Live Campaign Stats

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/campaigns/{id}/live
```

### Live Funnel Performance

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/reports/funnels/{id}/live
```

## Custom Report Filters

Many report endpoints support advanced filtering:

### Date Range Filtering

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/reports/campaigns?start_date=2024-01-01&end_date=2024-01-31" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Segmentation Filtering

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/reports/overview?lists[]=1&tags[]=2" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Error Handling

### Invalid Date Range (400)
```json
{
  "code": "invalid_date_range",
  "message": "End date must be after start date.",
  "data": {"status": 400}
}
```

### Report Not Found (404)
```json
{
  "code": "report_not_found",
  "message": "The requested report could not be found.",
  "data": {"status": 404}
}
```

## Performance Considerations

### Data Caching
- Reports are cached for performance
- Cache duration varies by report type
- Real-time reports have minimal caching

### Rate Limiting
- Report endpoints have rate limits
- Export operations may take longer
- Consider pagination for large datasets

### Optimization Tips
- Use appropriate date ranges
- Leverage cached reports when possible
- Export large datasets in batches
- Use specific filters to reduce data size

## Related Endpoints

- [Campaigns](/rest-api/campaigns) - Get campaign data for reports
- [Funnels](/rest-api/funnels) - Get funnel data for reports
- [Contacts](/rest-api/contacts) - Analyze subscriber behavior
- [Lists](/rest-api/lists) - List performance analysis
