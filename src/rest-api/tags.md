# Tags

Tags provide a flexible way to categorize and label your contacts in FluentCRM. Unlike lists, contacts can have multiple tags, making them perfect for tracking behaviors, interests, and characteristics.

## Tag Object

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique identifier for the tag |
| `title` | string | Tag name |
| `slug` | string | URL-friendly version of the title |
| `description` | string | Optional description |
| `created_at` | string | Creation timestamp |
| `updated_at` | string | Last update timestamp |
| `totalCount` | integer | Total contacts (when included) |
| `subscribersCount` | integer | Subscribed contacts (when included) |

## Get All Tags

Retrieve all tags with optional filtering and sorting.

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/tags
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sort_by` | string | id | Sort field (id, title, subscribers) |
| `sort_order` | string | DESC | Sort direction (DESC, ASC) |
| `search` | string | - | Search by title, slug, description |
| `exclude_counts` | boolean | false | Exclude subscriber counts |
| `all_tags` | boolean | false | Return only id, title, slug |

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/tags?sort_by=title&sort_order=ASC" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "tags": [
    {
      "id": "1",
      "title": "Customer",
      "slug": "customer",
      "description": "Paying customers",
      "created_at": "2023-01-15 10:30:00",
      "updated_at": "2023-02-01 14:20:00",
      "totalCount": 85,
      "subscribersCount": 82
    },
    {
      "id": "2",
      "title": "Newsletter Subscriber",
      "slug": "newsletter-subscriber", 
      "description": "Subscribed to weekly newsletter",
      "created_at": "2023-01-20 09:15:00",
      "updated_at": "2023-02-10 16:45:00",
      "totalCount": 200,
      "subscribersCount": 195
    }
  ]
}
```

## Get a Specific Tag

Retrieve details for a single tag.

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/tags/{id}
```

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/tags/1" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "tag": {
    "title": "Customer",
    "slug": "customer",
    "description": "Paying customers", 
    "updated_at": "2023-02-01 14:20:00",
    "created_at": "2023-01-15 10:30:00",
    "id": 1
  }
}
```

## Create a Tag

Add a new tag for categorizing contacts.

**HTTP Request**
```
POST /wp-json/fluent-crm/v2/tags
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | **Yes** | Tag name |
| `slug` | string | No | URL slug (auto-generated if omitted) |
| `description` | string | No | Optional description |

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/tags" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Webinar Attendee",
    "slug": "webinar-attendee",
    "description": "Attended at least one webinar"
  }'
```

### Example Response

```json
{
  "tags": {
    "title": "Webinar Attendee",
    "slug": "webinar-attendee",
    "description": "Attended at least one webinar",
    "updated_at": "2023-03-15 11:30:00",
    "created_at": "2023-03-15 11:30:00", 
    "id": 5
  },
  "message": "Successfully saved the tag."
}
```

## Update a Tag

Modify an existing tag's properties.

**HTTP Request**
```
PUT /wp-json/fluent-crm/v2/tags/{id}
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | string | Updated tag name |
| `slug` | string | Updated URL slug |
| `description` | string | Updated description |

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/tags/5" \
  -X PUT \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Event Attendee",
    "description": "Attended webinars, workshops, or conferences"
  }'
```

### Example Response

```json
{
  "tags": "5",
  "message": "Successfully saved the tag."
}
```

## Delete a Tag

Remove a tag and all its associations.

**HTTP Request**
```
DELETE /wp-json/fluent-crm/v2/tags/{id}
```

::: warning Important
Deleting a tag will remove it from all contacts, but will not delete the contacts themselves.
:::

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/tags/5" \
  -X DELETE \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "message": "Successfully removed the tag."
}
```

## Working with Tag Assignments

### Adding Tags to Contacts

When creating or updating contacts, you can assign tags:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "status": "subscribed",
    "tags": [1, 2, 3]
  }'
```

### Updating Tag Assignments

Use the contacts API to modify tag associations:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers/123" \
  -X PUT \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "subscriber": {
      "attach_tags": [4, 5],
      "detach_tags": [1]
    }
  }'
```

## Filtering Contacts by Tags

You can retrieve contacts with specific tags:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers?tags[]=1&tags[]=2" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Tag Strategy Best Practices

### 1. Behavioral Tags
Track user actions and engagement:

```bash
# Create behavior-based tags
curl "https://yourdomain.com/wp-json/fluent-crm/v2/tags" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "High Engagement",
    "description": "Opens emails regularly and clicks links"
  }'
```

### 2. Interest-Based Tags
Categorize by interests or preferences:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/tags" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Marketing Automation",
    "description": "Interested in marketing automation content"
  }'
```

### 3. Lifecycle Stage Tags
Track customer journey stages:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/tags" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Lead",
    "description": "Prospect in early stage"
  }'
```

### 4. Source Tags
Track where contacts came from:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/tags" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Facebook Ad",
    "description": "Acquired through Facebook advertising"
  }'
```

## Common Tag Automation Scenarios

### 1. Engagement Scoring
Automatically tag highly engaged users:
- Tag users who open 80% of emails
- Tag users who click multiple links
- Tag users who forward emails

### 2. Purchase Behavior
Track buying patterns:
- Tag first-time buyers
- Tag repeat customers
- Tag high-value purchasers

### 3. Content Consumption
Track content interests:
- Tag blog readers by category
- Tag video watchers
- Tag resource downloaders

### 4. Event Participation
Track event engagement:
- Tag webinar registrants
- Tag workshop attendees
- Tag conference participants

## Tag Hierarchies and Organization

### Using Prefixes for Organization
Structure your tags with prefixes:

```bash
# Interest tags
"Interest: Marketing"
"Interest: Sales" 
"Interest: Support"

# Behavior tags
"Behavior: High Engagement"
"Behavior: Low Engagement"
"Behavior: Inactive"

# Source tags
"Source: Website"
"Source: Social Media"
"Source: Referral"
```

### Creating Tag Groups
Organize related tags:

```bash
# Customer lifecycle
curl "https://yourdomain.com/wp-json/fluent-crm/v2/tags" -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"title": "Lifecycle: Lead"}'

curl "https://yourdomain.com/wp-json/fluent-crm/v2/tags" -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"title": "Lifecycle: Prospect"}'

curl "https://yourdomain.com/wp-json/fluent-crm/v2/tags" -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"title": "Lifecycle: Customer"}'
```

## Advanced Tag Operations

### Bulk Tag Assignment
Apply tags to multiple contacts:

```bash
# Get contacts from a specific list and tag them
contacts=$(curl -s "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers?lists[]=1" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" | jq -r '.data[].id')

for contact_id in $contacts; do
  curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers/$contact_id" \
    -X PUT \
    -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
    -H "Content-Type: application/json" \
    -d '{"subscriber": {"attach_tags": [10]}}'
done
```

### Conditional Tag Removal
Remove tags based on criteria:

```bash
# Remove "New Lead" tag from customers
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers?tags[]=5" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" | \
jq -r '.data[] | select(.tags[] | select(.title == "Customer")) | .id' | \
while read contact_id; do
  curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers/$contact_id" \
    -X PUT \
    -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
    -H "Content-Type: application/json" \
    -d '{"subscriber": {"detach_tags": [5]}}'
done
```

## Error Handling

### Tag Not Found (404)
```json
{
  "code": "rest_post_invalid_id",
  "message": "Invalid post ID.",
  "data": {"status": 404}
}
```

### Duplicate Tag Title (400)
```json
{
  "code": "rest_invalid_param",
  "message": "Tag with this title already exists",
  "data": {"status": 400}
}
```

## Related Endpoints

- [Contacts](/rest-api/contacts) - Manage contact data and tag assignments
- [Lists](/rest-api/lists) - Another way to organize contacts  
- [Campaigns](/rest-api/campaigns) - Send targeted emails to tagged contacts
- [Funnels](/rest-api/funnels) - Create automations triggered by tag changes
