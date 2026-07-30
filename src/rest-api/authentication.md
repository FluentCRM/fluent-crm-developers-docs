# Authentication

FluentCRM uses WordPress Application Passwords for REST API authentication. This is the standard WordPress authentication method that provides secure, non-interactive access to the REST API.

## Creating Application Passwords

### Step 1: Access User Profile

1. Log in to your WordPress admin dashboard
2. Navigate to `Users → Profile` (or `Users → All Users` and click on your user)
3. Scroll down to the "Application Passwords" section

### Step 2: Create New Application Password

1. In the "Application Passwords" section, enter a name for your application (e.g., "FluentCRM API")
2. Click "Add New Application Password"

![WordPress Application Passwords](/assets/img/wordpress-app-passwords.png)

### Step 3: Save Your Credentials

After creating the application password, WordPress will display:
- **Username**: Your WordPress username
- **Application Password**: A generated password (e.g., "oqYd hptb PnKC XHur CJbG 01UW")

![Generated Application Password](/assets/img/wordpress-generated-password.png)

::: warning Important
Save these credentials immediately! The application password cannot be retrieved later and will only be shown once.
:::

::: tip Note
Application passwords are different from your regular WordPress password and are specifically designed for API access. They can be easily revoked if needed.
:::

## Authentication Methods

### Basic Authentication (Recommended)

Use HTTP Basic Authentication with your API credentials:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers" \
  -H "Authorization: Basic $(echo -n 'API_USERNAME:API_PASSWORD' | base64)"
```

### Cookie Authentication (Not Recommended for API)

For testing only, you can use cookie authentication, but this is not recommended for API access:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers" \
  -H "Cookie: wordpress_logged_in_xxx=your_cookie_value"
```

::: warning Security Notice
Never use cookie authentication for API access in production. Always use Application Passwords with proper Authorization headers.
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

### Ruby

```ruby
require 'net/http'
require 'uri'
require 'base64'

username = 'your_api_username'
password = 'your_api_password'
url = URI('https://yourdomain.com/wp-json/fluent-crm/v2/subscribers')

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request['Authorization'] = "Basic #{Base64.strict_encode64("#{username}:#{password}")}"
request['Content-Type'] = 'application/json'

response = http.request(request)
puts response.body
```

## Testing Your Authentication

To verify your credentials are working, make a simple API call:

```bash
curl "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

If successful, you'll receive a JSON response with your subscribers data.

## Troubleshooting

### Common Issues

**401 Unauthorized Error**
- Verify your username and application password are correct
- Ensure the application password hasn't been revoked
- Check that the user account has proper permissions
- Verify that FluentCRM is properly installed and activated

**403 Forbidden Error**  
- The user account may lack necessary permissions
- Verify the account has appropriate WordPress capabilities
- Check if the user has access to FluentCRM features

**404 Not Found Error**
- Verify the API endpoint URL is correct
- Ensure FluentCRM is installed and the REST API is enabled
- Check your WordPress permalink structure

### Permission Requirements

Your API user account needs these minimum permissions:
- **WordPress Administrator role**: Full access to all endpoints
- **Appropriate capabilities**: Required for the specific operations you're performing
- **FluentCRM access**: User must have access to FluentCRM features

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
