# FluentCRM REST API

Complete REST API documentation for FluentCRM — covering **328 endpoints** across 28 modules, including FluentCampaign Pro.

## Base URL

All API requests use this base URL:

```
https://yourdomain.com/wp-json/fluent-crm/v2
```

## Authentication

FluentCRM uses **WordPress Application Passwords** for REST API authentication. Pass credentials via the `Authorization` header using Basic auth:

```bash
curl -X GET "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers" \
  -H "Authorization: Basic $(echo -n 'username:application_password' | base64)"
```

See [Authentication](/rest-api/authentication) for setup instructions.

## Interactive Playground

Every endpoint page includes an **interactive playground** where you can:
1. Enter your WordPress domain in the Server URL field
2. Add your Application Password credentials
3. Fill in parameters and execute live requests
4. View real-time responses

::: warning
Use test/staging sites only. API requests make permanent changes to your data.
:::

## API Modules

### Core Resources

| Module | Endpoints | Description |
|--------|-----------|-------------|
| [Contacts](/rest-api/operations/contacts/list-contacts) | 31 | Create, update, delete contacts; manage notes, emails, tracking events |
| [Tags](/rest-api/operations/tags/list-tags) | 7 | Organize contacts with tags |
| [Lists](/rest-api/operations/lists/list-lists) | 7 | Group contacts into mailing lists |
| [Companies](/rest-api/operations/companies/list-companies) | 19 | Manage companies, attach contacts, notes, custom fields |
| [Custom Fields](/rest-api/operations/custom-fields/get-contact-custom-fields) | 3 | Define and manage custom contact fields |
| [Labels](/rest-api/operations/labels/list-labels) | 4 | Global labels for campaigns, funnels, and sequences |

### Email & Campaigns

| Module | Endpoints | Description |
|--------|-----------|-------------|
| [Campaigns](/rest-api/operations/campaigns/list-campaigns) | 32 | Create, schedule, send, and analyze email campaigns |
| [Templates](/rest-api/operations/templates/list-templates) | 11 | Email templates, smart codes, global styles |
| [Sequences](/rest-api/operations/sequences/list-sequences) | 18 | Automated email sequences (Pro) |
| [Recurring Campaigns](/rest-api/operations/recurring-campaigns/list-recurring-campaigns) | 14 | Recurring/automated campaigns (Pro) |

### Automation & Analytics

| Module | Endpoints | Description |
|--------|-----------|-------------|
| [Funnels](/rest-api/operations/funnels/list-funnels) | 31 | Marketing automation funnels with triggers, actions, benchmarks |
| [Reports](/rest-api/operations/reports/get-dashboard-stats) | 24 | Dashboard stats, email performance, contact growth |
| [Webhooks](/rest-api/operations/webhooks/list-webhooks) | 5 | Incoming webhook endpoints for data collection |
| [Dynamic Segments](/rest-api/operations/dynamic-segments/list-dynamic-segments) | 9 | Smart contact segments with dynamic conditions (Pro) |

### Administration

| Module | Endpoints | Description |
|--------|-----------|-------------|
| [Settings](/rest-api/operations/settings/get-settings) | 38 | Global settings, double opt-in, integrations, compliance |
| [Import](/rest-api/operations/import/upload-csv-import) | 6 | CSV upload, WP users import, third-party drivers |
| [Users](/rest-api/operations/users/list-users) | 2 | WordPress user listing and roles |
| [Forms](/rest-api/operations/forms/list-forms) | 5 | Fluent Forms integration |
| [Migrators](/rest-api/operations/migrators/get-migrator-drivers) | 5 | Migrate from Mailchimp, ActiveCampaign, etc. |
| [Abandon Carts](/rest-api/operations/abandon-carts/list-abandoned-carts) | 3 | Abandoned cart tracking and recovery |

### Pro Features

| Module | Endpoints | Description |
|--------|-----------|-------------|
| [Smart Links](/rest-api/operations/smart-links/list-smart-links) | 5 | Trackable action links (Pro) |
| [Campaigns Pro](/rest-api/operations/campaigns-pro/resend-failed-emails) | 7 | Resend emails, tag actions, dynamic content (Pro) |
| [Pro Settings](/rest-api/operations/pro-settings/get-license-status) | 11 | License, managers, SMS settings (Pro) |
| [Commerce Reports](/rest-api/operations/commerce-reports/get-commerce-reports) | 2 | WooCommerce/EDD revenue reports (Pro) |
| [SMS](/rest-api/operations/sms/list-sms-campaigns) | 24 | SMS campaigns, messages, subscriber SMS (Pro) |

### Other

| Module | Endpoints | Description |
|--------|-----------|-------------|
| [Global Search](/rest-api/operations/global-search/global-search) | 1 | Search across contacts, campaigns, funnels |
| [Docs](/rest-api/operations/docs/list-docs) | 3 | In-app documentation and addons |
| [Bounce Handler](/rest-api/operations/public-bounce/handle-bounce-with-handle) | 2 | Public webhook for email bounce processing |

## Response Format

FluentCRM returns JSON responses. Paginated endpoints use the Laravel pagination format:

```json
{
  "data": [{ "id": 1, "email": "john@example.com", ... }],
  "total": 150,
  "per_page": 15,
  "current_page": 1,
  "last_page": 10
}
```

## Error Handling

Standard HTTP status codes with descriptive error messages:

| Code | Meaning |
|------|---------|
| `200` | Success |
| `400` | Bad request — missing or invalid parameters |
| `401` | Unauthorized — invalid or missing credentials |
| `403` | Forbidden — insufficient permissions |
| `404` | Not found — resource doesn't exist |
| `422` | Validation error — check the error message for details |

## What's Next?

Start with [Authentication](/rest-api/authentication) to set up your API access, then explore any module above.
