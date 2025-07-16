# Companies

The Companies API allows you to manage company information and associate contacts with organizations in FluentCRM.

## Company Object

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique identifier |
| `name` | string | Company name |
| `industry` | string | Industry category |
| `website` | string | Company website |
| `email` | string | Company email |
| `phone` | string | Phone number |
| `address_line_1` | string | Address line 1 |
| `address_line_2` | string | Address line 2 |
| `city` | string | City |
| `state` | string | State/Province |
| `country` | string | Country |
| `postal_code` | string | ZIP/Postal code |
| `employees_number` | integer | Number of employees |
| `description` | string | Company description |
| `type` | string | Company type |
| `owner_id` | integer | Contact owner ID |
| `logo` | string | Logo URL |
| `linkedin_url` | string | LinkedIn profile |
| `status` | string | Company status |
| `created_at` | string | Creation timestamp |
| `updated_at` | string | Last update timestamp |

## Get All Companies

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/companies
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `per_page` | integer | 10 | Companies per page |
| `page` | integer | 1 | Page number |
| `search` | string | - | Search by name, phone, description, email |
| `sort_by` | string | id | Sort field |
| `sort_order` | string | DESC | Sort direction |

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/companies" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Create a Company

**HTTP Request**
```
POST /wp-json/fluent-crm/v2/companies
```

### Required Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | **Yes** | Company name |
| `email` | string | No | Company email |
| `phone` | string | No | Phone number |
| `type` | string | No | Company type |
| `owner_id` | integer | No | Owner contact ID |

### Type Values
- `Prospect`
- `Partner` 
- `Reseller`
- `Vendor`
- `Other`

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/companies" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Acme Corporation",
    "email": "info@acme.com",
    "phone": "+1-555-0123",
    "type": "Partner",
    "industry": "Technology"
  }'
```

## Update a Company

**HTTP Request**
```
PUT /wp-json/fluent-crm/v2/companies/{id}
```

## Delete a Company

**HTTP Request**
```
DELETE /wp-json/fluent-crm/v2/companies/{id}
```

## Associate Contacts with Companies

**HTTP Request**
```
PUT /wp-json/fluent-crm/v2/companies/attach-subscribers
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `subscriber_ids` | array | **Yes** | Contact IDs to associate |
| `company_ids` | array | **Yes** | Company IDs to associate with |

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/companies/attach-subscribers" \
  -X PUT \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "subscriber_ids": [123, 456],
    "company_ids": [1, 2]
  }'
```

::: tip Integration Tip
Companies are particularly useful for B2B businesses to track organizational relationships and segment communications by company size, industry, or relationship type.
:::

## Related Endpoints

- [Contacts](/rest-api/contacts) - Associate contacts with companies
- [Reports](/rest-api/reports) - Analyze company-based metrics
