# Authentication

FluentCRM uses WordPress REST API authentication. You'll need to create application credentials to access the API securely.

## Creating API Credentials

### Step 1: Create a Manager Account

First, create a dedicated user account for API access:

1. Navigate to `FluentCRM → Settings → Managers`
2. Click "Add New Manager" 
3. **Important**: Do NOT use an Administrator user role for API access
4. Select the specific FluentCRM permissions you want to grant
5. Save the manager account

![Create Manager](https://rest-api.fluentcrm.com/images/create_manager-8a396fc8.png)

### Step 2: Generate API Credentials

1. Go to `FluentCRM → Settings → Rest API`
2. Click "Create New API Key"
3. Select the manager account you created in Step 1
4. Click "Generate Key"

![REST API Screen](https://rest-api.fluentcrm.com/images/rest_api_screen-9887ffeb.png)

### Step 3: Save Your Credentials

After generating the key, you'll receive:
- **Username**: Your API username  
- **Application Password**: Your API password

![API Success](https://rest-api.fluentcrm.com/images/rest_api_success_keys-1d59b207.png)

::: warning Important
Save these credentials immediately! The application password cannot be retrieved later.
:::

## Authentication Methods

### Basic Authentication (Recommended)

Use HTTP Basic Authentication with your API credentials:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers" \
  -H "Authorization: Basic $(echo -n 'API_USERNAME:API_PASSWORD' | base64)"
```

### URL Parameters (Not Recommended)

For testing only, you can pass credentials as URL parameters:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers?_wp_http_referer=API_USERNAME:API_PASSWORD"
```

::: warning Security Notice
Never use URL parameter authentication in production. Always use proper Authorization headers.
:::

## Example API Call

Here's a complete example of making an authenticated API request:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json"
```

### Response

```json
{
  "current_page": 1,
  "per_page": 10,
  "total": 150,
  "data": [
    {
      "id": "1",
      "first_name": "John",
      "last_name": "Doe", 
      "email": "john@example.com",
      "status": "subscribed"
    }
  ]
}
```

## Programming Language Examples

### PHP

```php
<?php
$username = 'your_api_username';
$password = 'your_api_password';
$url = 'https://yourdomain.com/wp-json/fluent-crm/v2/subscribers';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
?>
```

### JavaScript (Node.js)

```javascript
const axios = require('axios');

const apiCredentials = Buffer.from('API_USERNAME:API_PASSWORD').toString('base64');

const config = {
  headers: {
    'Authorization': `Basic ${apiCredentials}`,
    'Content-Type': 'application/json'
  }
};

axios.get('https://yourdomain.com/wp-json/fluent-crm/v2/subscribers', config)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error.response.data);
  });
```

### Python

```python
import requests
from requests.auth import HTTPBasicAuth

username = 'your_api_username'
password = 'your_api_password'
url = 'https://yourdomain.com/wp-json/fluent-crm/v2/subscribers'

response = requests.get(
    url,
    auth=HTTPBasicAuth(username, password),
    headers={'Content-Type': 'application/json'}
)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error: {response.status_code}")
    print(response.text)
```

## Testing Your Authentication

To verify your credentials are working, make a simple API call:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/reports/options" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

If successful, you'll receive a JSON response with FluentCRM options data.

## Troubleshooting

### Common Issues

**401 Unauthorized Error**
- Verify your username and password are correct
- Ensure the manager account has proper FluentCRM permissions
- Check that FluentCRM is properly installed and activated

**403 Forbidden Error**  
- The manager account may lack necessary permissions
- Verify the account is not an Administrator role
- Check FluentCRM permission settings for the manager

**404 Not Found Error**
- Verify the API endpoint URL is correct
- Ensure FluentCRM is installed and the REST API is enabled
- Check your WordPress permalink structure

### Permission Requirements

Your API manager account needs these minimum permissions:
- **View Contacts**: Required for GET requests
- **Manage Contacts**: Required for POST/PUT/DELETE requests  
- **View Reports**: Required for analytics endpoints
- **Manage Campaigns**: Required for campaign operations

## Security Best Practices

1. **Use HTTPS**: Always make API calls over secure connections
2. **Rotate Credentials**: Regularly update your API credentials
3. **Limit Permissions**: Grant only the minimum required permissions
4. **Monitor Usage**: Track API usage for unusual activity
5. **Secure Storage**: Never commit credentials to version control

## Next Steps

Now that you have authentication set up, you can:
- [Manage Contacts](/rest-api/contacts)
- [Work with Lists and Tags](/rest-api/lists)
- [Create Campaigns](/rest-api/campaigns)
- [Access Reports](/rest-api/reports)
