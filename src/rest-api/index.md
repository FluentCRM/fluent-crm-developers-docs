# FluentCRM REST API

Welcome to the FluentCRM REST API documentation. This comprehensive guide will help you integrate with FluentCRM using RESTful HTTP requests to manage contacts, campaigns, automations, and more.

## Overview

The FluentCRM REST API provides programmatic access to your FluentCRM data through standard HTTP methods. You can use this API to:

- **Manage Contacts**: Create, read, update, and delete subscriber information
- **Handle Lists & Tags**: Organize contacts with lists and tags
- **Control Campaigns**: Manage email campaigns and sequences  
- **Access Analytics**: Retrieve performance data and reports
- **Configure Automations**: Set up and manage automation funnels
- **Integrate Systems**: Connect FluentCRM with external applications

## Base URL

All API requests should be made to:
```
https://yourdomain.com/wp-json/fluent-crm/v2
```

## Quick Start

1. [Set up authentication](/rest-api/authentication) 
2. [Make your first API call](/rest-api/authentication#example-api-call)
3. [Explore available endpoints](/rest-api/contacts)

## Available Resources

### Core Resources
- **[Authentication](/rest-api/authentication)** - Secure your API access
- **[Contacts](/rest-api/contacts)** - Manage subscriber data  
- **[Lists](/rest-api/lists)** - Organize contacts into lists
- **[Tags](/rest-api/tags)** - Categorize contacts with tags
- **[Companies](/rest-api/companies)** - Manage company information
- **[Custom Fields](/rest-api/custom-fields)** - Handle custom contact data

### Email & Campaigns
- **[Email Templates](/rest-api/templates)** - Create and manage email templates
- **[Email Sequences](/rest-api/sequences)** - Set up automated email sequences
- **[Campaigns](/rest-api/campaigns)** - Manage email campaigns

### Automation & Analytics  
- **[Automation Funnels](/rest-api/funnels)** - Configure marketing automations
- **[Reports](/rest-api/reports)** - Access analytics and performance data
- **[Webhooks](/rest-api/webhooks)** - Set up webhook integrations

## Response Format

All API responses are returned in JSON format with consistent structure:

```json
{
  "data": {}, // Response data
  "message": "Success message",
  "total": 100, // For paginated responses
  "current_page": 1,
  "per_page": 15
}
```

## Error Handling

The API uses standard HTTP status codes and returns detailed error messages:

```json
{
  "code": "rest_invalid_param",
  "message": "Invalid parameter: email is required",
  "data": {
    "status": 400
  }
}
```

## Rate Limiting

API requests are subject to WordPress rate limiting. For high-volume integrations, consider:
- Implementing proper retry logic
- Batching requests when possible
- Using webhooks for real-time data sync

## SDKs and Tools

While we don't provide official SDKs, the API works with any HTTP client library:
- **PHP**: Guzzle, cURL
- **JavaScript**: Axios, Fetch API
- **Python**: Requests
- **Ruby**: HTTParty
- **Postman**: [Import our collection](#)

## Support

- **Documentation Issues**: Submit a GitHub issue
- **API Questions**: Contact support
- **Feature Requests**: Community forum

## What's Next?

Ready to start building? Begin with [Authentication](/rest-api/authentication) to set up your API access.
