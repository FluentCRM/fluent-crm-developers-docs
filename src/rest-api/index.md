---
title: FluentCRM REST API
description: "Complete FluentCRM REST API reference: every endpoint across contacts, campaigns, automations, Messaging (SMS and WhatsApp), reports and settings."
---

# FluentCRM REST API

Complete reference for every FluentCRM REST endpoint — **369 endpoints across 33 modules**, covering FluentCRM, FluentCampaign Pro, and the Pro Messaging module (SMS and WhatsApp).

Every page is generated from the plugin's own route table and verified against live responses, so what you read here is what the code does.

## Base URL

All requests use this base URL:

```
https://yourdomain.com/wp-json/fluent-crm/v2
```

## Authentication

FluentCRM uses **WordPress Application Passwords**. Pass them via the `Authorization` header using Basic auth:

```bash
curl -X GET "https://yourdomain.com/wp-json/fluent-crm/v2/subscribers" \
  -H "Authorization: Basic $(echo -n 'username:application_password' | base64)"
```

See [Authentication](/rest-api/authentication) for how to create a dedicated manager account and generate keys.

The one exception is the [bounce handler](/rest-api/operations/public-bounce/handle-bounce), which is deliberately public — it is called by your email provider, which cannot present WordPress credentials.

## Permissions

Every endpoint page states the **capability that route actually enforces**, and which policy method enforces it. FluentCRM's capabilities are module-scoped rather than one blanket permission:

| Capability | Grants |
|---|---|
| `fcrm_read_contacts` / `fcrm_manage_contacts` | Read / write contacts |
| `fcrm_manage_contacts_delete` | Delete contacts |
| `fcrm_manage_contacts_export` | Export contacts |
| `fcrm_manage_contact_cats` | Tags, lists, companies |
| `fcrm_manage_contact_cats_delete` | Delete tags, lists, companies |
| `fcrm_read_emails` / `fcrm_manage_emails` | Read / write campaigns and emails |
| `fcrm_manage_email_delete` | Delete emails |
| `fcrm_manage_email_templates` | Email templates |
| `fcrm_read_funnels` / `fcrm_write_funnels` | Read / write automations |
| `fcrm_delete_funnels` | Delete automations |
| `fcrm_manage_forms` | Form integrations |
| `fcrm_view_dashboard` | Reports and dashboard |
| `fcrm_manage_settings` | Settings — the highest FluentCRM permission |

A handful of routes require a **core WordPress** capability instead — `install_plugins` for the MCP adapter installer, plus `manage_options` and `list_users` elsewhere. Those are called out on the pages concerned.

## Modules

### Contacts & Segmentation

| Module | Endpoints | Description |
|--------|-----------|-------------|
| [Contacts](/rest-api/operations/contacts/list-contacts) | 32 | Create, update, delete contacts; notes, emails, tracking events, purchase history |
| [Tags](/rest-api/operations/tags/list-tags) | 7 | Organise contacts with tags |
| [Lists](/rest-api/operations/lists/list-lists) | 7 | Group contacts into mailing lists |
| [Companies](/rest-api/operations/companies/list-companies) | 21 | Companies, attached contacts, notes, custom fields |
| [Custom Fields](/rest-api/operations/custom-fields/get-contact-custom-fields) | 3 | Define contact custom fields |
| [Labels](/rest-api/operations/labels/list-labels) | 4 | Global labels for campaigns, funnels, sequences |

### Email & Campaigns

| Module | Endpoints | Description |
|--------|-----------|-------------|
| [Campaigns](/rest-api/operations/campaigns/list-campaigns) | 32 | Create, schedule, send, and analyse email campaigns |
| [Templates](/rest-api/operations/templates/list-templates) | 12 | Email templates, smart codes, global styles |
| [Email Patterns](/rest-api/operations/email-patterns/list-email-patterns) | 11 | Reusable block patterns for the Gutenberg email editor |
| [Sequences](/rest-api/operations/sequences/list-sequences) | 19 | Automated email sequences <Badge type="warning" text="Pro" /> |
| [Recurring Campaigns](/rest-api/operations/recurring-campaigns/list-recurring-campaigns) | 14 | Scheduled recurring campaigns <Badge type="warning" text="Pro" /> |
| [Campaigns Pro](/rest-api/operations/campaigns-pro/resend-failed-emails) | 7 | Resend failed emails, tag actions, dynamic content <Badge type="warning" text="Pro" /> |
| [Messaging](/rest-api/operations/messaging/list-campaigns) | 12 | Send messages, campaigns (create, update, schedule, status), conversation history and the activity log <Badge type="warning" text="Pro" /> |
| [WhatsApp](/rest-api/operations/whatsapp/list-whatsapp-templates) | 4 | WhatsApp templates, sending a template or free-text message, per-contact message history <Badge type="warning" text="Pro" /> |

### Automation & Analytics

| Module | Endpoints | Description |
|--------|-----------|-------------|
| [Funnels (Automations)](/rest-api/operations/funnels/list-funnels) | 33 | Automations with triggers, actions, benchmarks, and step reporting |
| [Reports](/rest-api/operations/reports/get-dashboard-stats) | 25 | Dashboard stats, email performance, contact growth, automation reports |
| [Dynamic Segments](/rest-api/operations/dynamic-segments/list-dynamic-segments) | 9 | Condition-driven contact segments <Badge type="warning" text="Pro" /> |
| [Commerce Reports](/rest-api/operations/commerce-reports/get-commerce-reports) | 2 | WooCommerce / EDD revenue reporting <Badge type="warning" text="Pro" /> |
| [Smart Links](/rest-api/operations/smart-links/list-smart-links) | 5 | Trackable links that apply tags and lists <Badge type="warning" text="Pro" /> |

### Data In & Out

| Module | Endpoints | Description |
|--------|-----------|-------------|
| [Import](/rest-api/operations/import/upload-csv-import) | 6 | CSV upload, WP users import, third-party drivers |
| [Export](/rest-api/operations/export/export-contacts-page) | 11 | Paged contact export plus file downloads for notes, companies, sequences, templates, campaigns and segments <Badge type="warning" text="Pro" /> |
| [Migrators](/rest-api/operations/migrators/get-migrator-drivers) | 5 | Migrate from Mailchimp, ActiveCampaign, and others |
| [Webhooks](/rest-api/operations/webhooks/list-webhooks) | 4 | Inbound webhooks that create and update contacts |
| [Forms](/rest-api/operations/forms/list-forms) | 5 | Fluent Forms integration and entries |
| [Bounce Handler](/rest-api/operations/public-bounce/handle-bounce) | 2 | Public provider webhook for bounces and complaints |

### Administration

| Module | Endpoints | Description |
|--------|-----------|-------------|
| [Settings](/rest-api/operations/settings/get-settings) | 41 | Global settings, double opt-in, compliance, system logs, DB health |
| [Pro Settings](/rest-api/operations/pro-settings/get-license-status) | 8 | Licence and managers <Badge type="warning" text="Pro" /> |
| [AI](/rest-api/operations/ai/get-ai-settings) | 7 | AI writing assistant configuration and generation |
| [MCP](/rest-api/operations/mcp/get-mcp-status) | 4 | Model Context Protocol bridge for AI agents |
| [Users](/rest-api/operations/users/list-users) | 2 | WordPress user and role lookup |
| [Abandon Carts](/rest-api/operations/abandon-carts/list-abandoned-carts) | 3 | Abandoned cart tracking and recovery |
| [Docs & Addons](/rest-api/operations/docs/list-docs) | 3 | In-app documentation and addon status |
| [Global Search](/rest-api/operations/global-search/global-search) | 1 | Search contacts, campaigns, and automations at once |

## Try it from this site

Every endpoint page has a **Try it on your website** box above the request. Enter your site once (`example.com`, `http://localhost:10010`, or a full URL) and the playground sends requests there; it is remembered in your browser. Authenticate with `username:application_password` in the Authorization field. Requests come straight from your browser, so your site has to answer cross-origin requests (CORS) — on a local or staging site, test with `curl` if the browser blocks the call.

## Extending the REST API

Registering your own endpoints under `fluent-crm/v2` — routes, controllers, policies — is covered in [Extending the REST API](/rest-api/extending/).

## Response Format

Most endpoints return a JSON object keyed by the resource name. Paginated collections use the framework's paginator envelope:

```json
{
  "subscribers": {
    "total": 150,
    "per_page": 15,
    "current_page": 1,
    "last_page": 10,
    "from": 1,
    "to": 15,
    "next_page_url": "/wp-json/fluent-crm/v2/subscribers?page=2",
    "prev_page_url": null,
    "data": [{ "id": 1, "email": "john@example.com" }]
  }
}
```

::: tip Not every collection is a paginator
Some endpoints deliberately return a plain `limit`-capped array with no page metadata — the option and picker endpoints, for example. Others return counts as **strings**, because the value comes straight from a SQL aggregate. Each page documents what that endpoint really returns.
:::

## Conditional Response Keys

Many endpoints return extra keys only when you ask for them, usually through a `with[]` parameter: `GET /funnels` returns `triggers` only with `with[]=triggers`, `GET /tags` returns `all_tags` only when `all_tags` is sent, and so on. Anything conditional is marked as such in its property description — do not rely on a key being present unless the description says it always is.

## Error Handling

| Code | Meaning |
|------|---------|
| `200` | Success |
| `400` | Bad request — missing or invalid parameters |
| `401` | Not authenticated — missing or invalid credentials |
| `403` | Authenticated, but the user lacks the required capability |
| `404` | Resource not found |
| `422` | Validation failed — the message names the offending field |

::: warning Check the body, not just the status
A few endpoints signal failure inside a `200` response. The bounce handler returns `{"status": false}` on a bad security code, and `POST /setting/db-index-health/repair` returns `200` with `pending: true` when another repair already holds the lock.
:::

## Method Override

The admin app sends `PUT`, `PATCH`, and `DELETE` as `POST` with an `X-HTTP-Method-Override` header. Direct API clients can use the real verbs — the override exists for environments that block them.

## Interactive Playground

Every endpoint page includes a playground where you can enter your domain and credentials, fill in parameters, and execute live requests.

::: danger Use a staging site
The playground issues real requests. Mutating endpoints permanently change your data, and campaign endpoints can send real email.
:::

## What's Next?

Start with [Authentication](/rest-api/authentication), then pick a module above.
