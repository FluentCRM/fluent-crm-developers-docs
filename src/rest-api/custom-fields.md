# Custom Fields

Custom Fields allow you to capture additional information about your contacts beyond the standard FluentCRM fields. The Custom Fields API helps you manage these field definitions and access their data.

## Custom Field Object

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field_key` | string | Unique field identifier |
| `type` | string | Field type (text, select-one, checkbox, etc.) |
| `label` | string | Human-readable field name |
| `slug` | string | URL-friendly field identifier |
| `options` | array | Available options (for select/checkbox fields) |

## Field Types

| Type | Description | Options Required |
|------|-------------|------------------|
| `text` | Single line text input | No |
| `textarea` | Multi-line text input | No |
| `select-one` | Dropdown select | Yes |
| `checkbox` | Multiple checkboxes | Yes |
| `radio` | Radio buttons | Yes |
| `number` | Numeric input | No |
| `date` | Date picker | No |
| `url` | URL input | No |
| `email` | Email input | No |

## Get All Custom Fields

Retrieve all custom field definitions for contacts.

**HTTP Request**
```
GET /wp-json/fluent-crm/v2/custom-fields/contacts
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `with` | array | Additional data to include |

**Available `with` options:**
- `field_types` - Include available field type definitions

### Example Request

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/custom-fields/contacts" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "fields": [
    {
      "field_key": "single-select",
      "type": "select-one",
      "label": "Company Size",
      "options": [
        "1-10 employees",
        "11-50 employees", 
        "51-200 employees",
        "200+ employees"
      ],
      "slug": "company_size"
    },
    {
      "field_key": "text",
      "type": "text",
      "label": "Job Title",
      "slug": "job_title"
    },
    {
      "field_key": "checkbox",
      "type": "checkbox",
      "label": "Interests",
      "options": [
        "Email Marketing",
        "Social Media",
        "Content Marketing",
        "SEO"
      ],
      "slug": "interests"
    }
  ]
}
```

## Working with Custom Field Values

### Setting Custom Field Values

When creating or updating contacts, include custom field values:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "status": "subscribed",
    "custom_values": {
      "company_size": "11-50 employees",
      "job_title": "Marketing Manager",
      "interests": ["Email Marketing", "Content Marketing"]
    }
  }'
```

### Retrieving Custom Field Values

Get contact data with custom field values:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers/123?with[]=subscriber.custom_values" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Response with Custom Values

```json
{
  "subscriber": {
    "id": "123",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "custom_values": {
      "company_size": "11-50 employees",
      "job_title": "Marketing Manager", 
      "interests": ["Email Marketing", "Content Marketing"]
    }
  }
}
```

## Custom Field Data Types

### Text Fields
Simple text input for names, titles, etc:

```json
{
  "custom_values": {
    "job_title": "Senior Developer",
    "company": "Tech Corp"
  }
}
```

### Select Fields
Single choice from predefined options:

```json
{
  "custom_values": {
    "company_size": "51-200 employees",
    "industry": "Technology"
  }
}
```

### Checkbox Fields
Multiple selections from options:

```json
{
  "custom_values": {
    "interests": ["Email Marketing", "Social Media"],
    "communication_preferences": ["Email", "SMS"]
  }
}
```

### Number Fields
Numeric data:

```json
{
  "custom_values": {
    "annual_revenue": "250000",
    "employees_count": "45"
  }
}
```

### Date Fields
Date values in YYYY-MM-DD format:

```json
{
  "custom_values": {
    "last_purchase_date": "2023-03-15",
    "trial_end_date": "2023-04-01"
  }
}
```

## Filtering by Custom Fields

While the API doesn't directly support filtering by custom fields in the main endpoints, you can:

1. **Retrieve all contacts with custom values**:
```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers?custom_fields=true&per_page=100" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

2. **Filter client-side** based on custom field values
3. **Use automation funnels** to automatically tag contacts based on custom field values

## Custom Field Best Practices

### 1. Field Naming
Use clear, descriptive field names:
- ✅ "Annual Revenue"
- ✅ "Company Size" 
- ✅ "Last Purchase Date"
- ❌ "Field1", "Custom", "Data"

### 2. Consistent Data Types
Choose appropriate field types:
- **Dates**: Use date fields, not text
- **Numbers**: Use number fields for calculations
- **Predefined choices**: Use select/radio for consistency

### 3. Option Management
For select/checkbox fields, maintain consistent options:

```json
{
  "field_key": "company_size",
  "type": "select-one",
  "label": "Company Size",
  "options": [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees", 
    "201-1000 employees",
    "1000+ employees"
  ]
}
```

### 4. Automation Integration
Use custom fields to trigger automations:
- Tag high-value prospects based on company size
- Send industry-specific content
- Trigger follow-ups based on trial end dates

## Common Use Cases

### Lead Qualification
Capture qualification data:

```json
{
  "custom_values": {
    "budget": "$10,000-$50,000",
    "timeline": "3-6 months",
    "decision_maker": "Yes",
    "current_solution": "Mailchimp"
  }
}
```

### E-commerce Integration
Track purchase behavior:

```json
{
  "custom_values": {
    "lifetime_value": "1250.00",
    "last_order_date": "2023-03-10",
    "preferred_category": "Electronics",
    "vip_status": "Gold"
  }
}
```

### Event Management
Track event participation:

```json
{
  "custom_values": {
    "events_attended": ["Webinar 2023-01", "Conference 2023"],
    "attendance_rate": "85%",
    "speaker_rating": "Excellent"
  }
}
```

### Account Management
B2B account information:

```json
{
  "custom_values": {
    "account_type": "Enterprise",
    "contract_value": "50000",
    "renewal_date": "2024-01-15",
    "account_manager": "Sarah Johnson"
  }
}
```

## Data Validation

### Required Field Validation
Custom fields are generally optional, but you can validate in your application:

```javascript
// Client-side validation example
function validateCustomFields(customValues) {
  const required = ['company_size', 'industry'];
  const missing = required.filter(field => !customValues[field]);
  
  if (missing.length > 0) {
    throw new Error(`Required fields missing: ${missing.join(', ')}`);
  }
}
```

### Data Type Validation
Ensure data matches field types:

```javascript
function validateFieldTypes(customValues, fieldDefinitions) {
  Object.entries(customValues).forEach(([field, value]) => {
    const definition = fieldDefinitions.find(f => f.slug === field);
    
    if (definition?.type === 'select-one' && !definition.options.includes(value)) {
      throw new Error(`Invalid option for ${field}: ${value}`);
    }
  });
}
```

## Error Handling

### Invalid Field Name
```json
{
  "code": "rest_invalid_param",
  "message": "Custom field 'invalid_field' does not exist",
  "data": {"status": 400}
}
```

### Invalid Option Value
```json
{
  "code": "rest_invalid_param", 
  "message": "Invalid option for field 'company_size'",
  "data": {"status": 400}
}
```

## Related Endpoints

- [Contacts](/rest-api/contacts) - Set and retrieve custom field values
- [Reports](/rest-api/reports) - Analyze data by custom field values
