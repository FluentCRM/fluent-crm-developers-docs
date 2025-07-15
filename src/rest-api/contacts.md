# Contacts

The Contacts API allows you to manage subscriber data in FluentCRM. You can create, read, update, and delete contacts, as well as manage their lists, tags, and custom field values.

## Contact Object

A contact represents a subscriber in your FluentCRM database.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique identifier for the contact |
| `user_id` | integer | WordPress user ID (if linked) |
| `hash` | string | Unique hash for the contact |
| `email` | string | Email address (required, unique) |
| `first_name` | string | Contact's first name |
| `last_name` | string | Contact's last name |
| `full_name` | string | Combined first and last name |
| `status` | string | Subscription status |
| `contact_type` | string | Type of contact (lead, customer, etc.) |
| `phone` | string | Phone number |
| `address_line_1` | string | Address line 1 |
| `address_line_2` | string | Address line 2 |
| `city` | string | City |
| `state` | string | State/Province |
| `country` | string | Country code |
| `postal_code` | string | ZIP/Postal code |
| `date_of_birth` | string | Date of birth (YYYY-MM-DD) |
| `photo` | string | Gravatar photo URL |
| `tags` | array | Associated tags |
| `lists` | array | Associated lists |
| `custom_values` | object | Custom field values |
| `created_at` | string | Creation timestamp |
| `updated_at` | string | Last update timestamp |

### Status Values

- `subscribed` - Active subscriber
- `unsubscribed` - Unsubscribed from emails  
- `pending` - Pending confirmation
- `bounced` - Email bounced
- `complained` - Marked as spam

## List All Contacts

Retrieve a paginated list of contacts.

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/subscribers
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `per_page` | integer | 10 | Number of contacts per page |
| `page` | integer | 1 | Page number for pagination |
| `search` | string | - | Search contacts by name/email |
| `tags` | array | - | Filter by tag IDs |
| `lists` | array | - | Filter by list IDs |
| `statuses` | array | - | Filter by status values |
| `order_by` | string | id | Sort field (id, email, created_at) |
| `order_type` | string | DESC | Sort direction (ASC, DESC) |
| `custom_fields` | boolean | false | Include custom field values |
| `company_ids` | array | - | Filter by company IDs |

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers?per_page=5&search=john" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "current_page": 1,
  "per_page": 5,
  "total": 150,
  "last_page": 30,
  "data": [
    {
      "id": "1",
      "user_id": "12",
      "hash": "abc123def456",
      "email": "john@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "full_name": "John Doe",
      "status": "subscribed",
      "contact_type": "lead",
      "phone": "+1-555-0123",
      "created_at": "2023-01-15 10:30:00",
      "updated_at": "2023-02-01 14:20:00",
      "photo": "https://www.gravatar.com/avatar/abc123?s=128",
      "tags": [
        {
          "id": "1",
          "title": "Newsletter",
          "slug": "newsletter"
        }
      ],
      "lists": [
        {
          "id": "2", 
          "title": "Customers",
          "slug": "customers"
        }
      ]
    }
  ]
}
```

## Get a Specific Contact

Retrieve a single contact by ID or email.

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/subscribers/{id}
GET /wp-json/fluent-crm/v2/subscribers/0?get_by_email={email}
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `with` | array | Additional data to include |

**Available `with` options:**
- `stats` - Email statistics (opens, clicks)
- `custom_fields` - Custom field definitions
- `subscriber.custom_values` - Custom field values
- `commerce_stat` - E-commerce statistics
- `companies` - Associated companies

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers/1?with[]=stats&with[]=custom_values" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "subscriber": {
    "id": "1",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "status": "subscribed",
    "stats": {
      "emails": 25,
      "opens": 18,
      "clicks": 5
    },
    "custom_values": {
      "company": "Acme Corp",
      "industry": "Technology"
    }
  }
}
```

## Create a Contact

Add a new contact to FluentCRM.

**HTTP Request**
```
POST /wp-json/fluent-crm/v2/subscribers
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | **Yes** | Contact's email address |
| `first_name` | string | No | First name |
| `last_name` | string | No | Last name |
| `status` | string | **Yes** | Subscription status |
| `phone` | string | No | Phone number |
| `date_of_birth` | string | No | Date of birth (YYYY-MM-DD) |
| `address_line_1` | string | No | Address line 1 |
| `address_line_2` | string | No | Address line 2 |
| `city` | string | No | City |
| `state` | string | No | State/Province |
| `country` | string | No | Country |
| `postal_code` | string | No | ZIP/Postal code |
| `tags` | array | No | Tag IDs to assign |
| `lists` | array | No | List IDs to assign |
| `custom_values` | object | No | Custom field values |
| `__force_update` | boolean | No | Update if contact exists |

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Jane",
    "last_name": "Smith", 
    "email": "jane@example.com",
    "status": "subscribed",
    "phone": "+1-555-0124",
    "tags": [1, 2],
    "lists": [1],
    "custom_values": {
      "company": "Tech Solutions",
      "industry": "Software"
    }
  }'
```

### Example Response

```json
{
  "message": "Successfully added the subscriber.",
  "contact": {
    "id": 25,
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane@example.com",
    "status": "subscribed",
    "created_at": "2023-03-15 09:30:00",
    "tags": [
      {
        "id": "1",
        "title": "Newsletter"
      }
    ],
    "lists": [
      {
        "id": "1", 
        "title": "General"
      }
    ]
  },
  "action_type": "created"
}
```

## Update a Contact

Modify an existing contact's information.

**HTTP Request**
```
PUT /wp-json/fluent-crm/v2/subscribers/{id}
```

### Parameters

All create parameters are available, plus:

| Parameter | Type | Description |
|-----------|------|-------------|
| `attach_tags` | array | Tags to add |
| `detach_tags` | array | Tags to remove |
| `attach_lists` | array | Lists to add |
| `detach_lists` | array | Lists to remove |

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers/1" \
  -X PUT \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "subscriber": {
      "first_name": "John Updated",
      "attach_tags": [3],
      "detach_tags": [1]
    }
  }'
```

### Example Response

```json
{
  "message": "Subscriber successfully updated",
  "contact": {
    "id": "1",
    "first_name": "John Updated",
    "email": "john@example.com"
  },
  "isDirty": true
}
```

## Create or Update Contact

Create a new contact or update existing one based on email.

**HTTP Request**
```
POST /wp-json/fluent-crm/v2/subscribers
```

### Parameters

Include `__force_update: "yes"` to enable upsert behavior.

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "__force_update": "yes",
    "email": "existing@example.com",
    "first_name": "Updated Name",
    "tags": [1, 2, 3]
  }'
```

## Delete a Contact

Remove a contact from FluentCRM.

**HTTP Request**
```
DELETE /wp-json/fluent-crm/v2/subscribers/{id}
```

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers/1" \
  -X DELETE \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "message": "Selected Subscribers has been deleted"
}
```

## Working with Custom Fields

Custom fields allow you to store additional information about contacts.

### Setting Custom Field Values

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "status": "subscribed",
    "custom_values": {
      "company_size": "50-100",
      "interests": ["marketing", "sales"],
      "annual_revenue": "500000"
    }
  }'
```

### Retrieving Custom Field Values

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers/1?with[]=subscriber.custom_values" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Bulk Operations

### Bulk Update Example

To update multiple contacts, use individual PUT requests or create a batch script:

```bash
# Update multiple contacts with the same data
for id in 1 2 3 4 5; do
  curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers/$id" \
    -X PUT \
    -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
    -H "Content-Type: application/json" \
    -d '{"subscriber": {"attach_tags": [10]}}'
done
```

## Error Handling

Common error responses:

### Contact Not Found (404)
```json
{
  "code": "rest_post_invalid_id",
  "message": "Invalid post ID.",
  "data": {"status": 404}
}
```

### Invalid Email (400)
```json
{
  "code": "rest_invalid_param", 
  "message": "Invalid parameter: email",
  "data": {"status": 400}
}
```

### Duplicate Email (409)
```json
{
  "message": "Contact already exists with this email",
  "data": {"status": 409}
}
```

## Best Practices

1. **Always validate emails** before creating contacts
2. **Use pagination** for large datasets
3. **Handle rate limits** with proper retry logic
4. **Batch operations** when updating multiple contacts
5. **Monitor status changes** to maintain list hygiene
6. **Use webhooks** for real-time synchronization

## Related Endpoints

- [Lists](/rest-api/lists) - Organize contacts into lists
- [Tags](/rest-api/tags) - Categorize contacts with tags  
- [Custom Fields](/rest-api/custom-fields) - Manage custom contact data
- [Companies](/rest-api/companies) - Associate contacts with companies
