# Lists

Lists in FluentCRM help you organize your contacts into groups based on interests, behaviors, or characteristics. The Lists API allows you to manage these groupings programmatically.

## List Object

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique identifier for the list |
| `title` | string | List name |
| `slug` | string | URL-friendly version of the title |
| `description` | string | Optional description |
| `is_public` | string | Whether list is public ("0" or "1") |
| `created_at` | string | Creation timestamp |
| `updated_at` | string | Last update timestamp |
| `totalCount` | integer | Total contacts (when included) |
| `subscribersCount` | integer | Subscribed contacts (when included) |

## Get All Lists

Retrieve all lists with optional filtering and sorting.

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/lists
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sort_by` | string | id | Sort field (id, title, subscribers) |
| `sort_order` | string | DESC | Sort direction (DESC, ASC) |
| `search` | string | - | Search by title, slug, description |
| `exclude_counts` | boolean | false | Exclude subscriber counts |

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/lists?sort_by=title&sort_order=ASC" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "lists": [
    {
      "id": "1",
      "title": "Newsletter Subscribers",
      "slug": "newsletter-subscribers",
      "description": "General newsletter list",
      "is_public": "0",
      "created_at": "2023-01-15 10:30:00",
      "updated_at": "2023-02-01 14:20:00",
      "totalCount": 150,
      "subscribersCount": 142
    },
    {
      "id": "2", 
      "title": "VIP Customers",
      "slug": "vip-customers",
      "description": "High-value customers",
      "is_public": "0",
      "created_at": "2023-01-20 09:15:00",
      "updated_at": "2023-02-10 16:45:00",
      "totalCount": 25,
      "subscribersCount": 25
    }
  ]
}
```

## Get a Specific List

Retrieve details for a single list.

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/lists/{id}
```

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/lists/1" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "title": "Newsletter Subscribers",
  "slug": "newsletter-subscribers", 
  "description": "General newsletter list",
  "updated_at": "2023-02-01 14:20:00",
  "created_at": "2023-01-15 10:30:00",
  "id": 1
}
```

## Create a List

Add a new list to organize your contacts.

**HTTP Request**
```
POST /wp-json/fluent-crm/v2/lists
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | **Yes** | List name |
| `slug` | string | No | URL slug (auto-generated if omitted) |
| `description` | string | No | Optional description |

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/lists" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Product Updates",
    "slug": "product-updates",
    "description": "Subscribers interested in product announcements"
  }'
```

### Example Response

```json
{
  "lists": {
    "title": "Product Updates",
    "slug": "product-updates",
    "description": "Subscribers interested in product announcements",
    "updated_at": "2023-03-15 11:30:00",
    "created_at": "2023-03-15 11:30:00",
    "id": 5
  },
  "message": "Successfully saved the list."
}
```

## Update a List

Modify an existing list's properties.

**HTTP Request**
```
PUT /wp-json/fluent-crm/v2/lists/{id}
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | string | Updated list name |
| `slug` | string | Updated URL slug |
| `description` | string | Updated description |

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/lists/5" \
  -X PUT \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Product & Feature Updates",
    "description": "Get notified about new products and feature releases"
  }'
```

### Example Response

```json
{
  "lists": "5",
  "message": "Successfully saved the list."
}
```

## Delete a List

Remove a list and all its associations.

**HTTP Request**
```
DELETE /wp-json/fluent-crm/v2/lists/{id}
```

::: warning Important
Deleting a list will remove all contact associations with that list, but will not delete the contacts themselves.
:::

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/lists/5" \
  -X DELETE \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "message": "Successfully removed the list."
}
```

## Working with List Memberships

### Adding Contacts to Lists

When creating or updating contacts, you can assign them to lists:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "status": "subscribed",
    "lists": [1, 2, 3]
  }'
```

### Updating List Memberships

Use the contacts API to modify list associations:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers/123" \
  -X PUT \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "subscriber": {
      "attach_lists": [4, 5],
      "detach_lists": [1]
    }
  }'
```

## Filtering Contacts by Lists

You can retrieve contacts belonging to specific lists:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers?lists[]=1&lists[]=2" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## List Management Best Practices

### 1. Naming Conventions
Use clear, descriptive names for your lists:
- ✅ "Weekly Newsletter Subscribers"
- ✅ "Product Launch Waitlist"
- ❌ "List 1", "Random Group"

### 2. List Segmentation
Create focused lists based on:
- **Interests**: "Marketing Tips", "Sales Resources"
- **Behavior**: "Highly Engaged", "Recent Purchasers"  
- **Demographics**: "Enterprise Customers", "Small Business"
- **Lifecycle Stage**: "New Leads", "Long-term Customers"

### 3. Automation Integration
Use lists with automation funnels:
```bash
# Create a list for automated welcome series
curl "https://yourdomain.com/wp-json/fluent-crm/v2/lists" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Welcome Series",
    "description": "New subscribers for automated welcome emails"
  }'
```

### 4. List Hygiene
Regularly review and clean your lists:
- Remove inactive subscribers
- Merge duplicate or overlapping lists
- Archive outdated lists

## Common Use Cases

### Lead Magnets
Create targeted lists for lead magnets:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/lists" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Email Marketing Guide Downloads",
    "description": "Contacts who downloaded our email marketing guide"
  }'
```

### Event Management
Organize event attendees:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/lists" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "2023 Webinar Attendees",
    "description": "Participants in our 2023 webinar series"
  }'
```

### Customer Segmentation
Segment customers by value:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/lists" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "High-Value Customers",
    "description": "Customers with lifetime value > $1000"
  }'
```

## Error Handling

### List Not Found (404)
```json
{
  "code": "rest_post_invalid_id",
  "message": "Invalid post ID.",
  "data": {"status": 404}
}
```

### Duplicate List Title (400)
```json
{
  "code": "rest_invalid_param",
  "message": "List with this title already exists",
  "data": {"status": 400}
}
```

## Related Endpoints

- [Contacts](/rest-api/contacts) - Manage contact data and list memberships
- [Tags](/rest-api/tags) - Another way to organize contacts
- [Campaigns](/rest-api/campaigns) - Send targeted emails to lists
- [Funnels](/rest-api/funnels) - Create automations triggered by list changes
