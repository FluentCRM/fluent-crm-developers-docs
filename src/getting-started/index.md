---
description: "Developer guide for FluentCRM — architecture overview, directory structure, key concepts, and links to detailed documentation."
---

# Getting Started

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Developer Guide" />

FluentCRM is a self-hosted email marketing and CRM plugin for WordPress. It runs entirely on your WordPress site — no external API calls for contact storage or email management. This guide covers what you need to know to extend it.

## Architecture Overview

FluentCRM is built on **WPFluent**, a Laravel-like framework for WordPress. It follows MVC patterns with Eloquent-style models, a route/controller/policy system for REST APIs, and a Vue 3 frontend.

**Key technical details:**

- **PHP namespace:** `FluentCrm\App\` and `FluentCrm\Includes\`
- **REST API base:** `/wp-json/fluent-crm/v2/`
- **DB table prefix:** `fc_` (e.g., `fc_subscribers`, `fc_campaigns`, `fc_funnels`)
- **Hook prefixes:** `fluentcrm_` (legacy) and `fluent_crm/` (current)
- **Frontend:** Vue 3 with Element Plus, Pinia for state management
- **Email editor:** Custom Gutenberg block editor for email composition

## Directory Structure

```
fluent-crm/
├── app/
│   ├── Api/                 # Public PHP API classes (Contacts, Companies)
│   ├── Functions/           # Global helper functions (helpers.php)
│   ├── Hooks/               # Hook handler classes
│   │   └── Handlers/        # AdminMenu, ExternalPages, Scheduler, etc.
│   ├── Http/
│   │   ├── Controllers/     # REST API controllers
│   │   ├── Policies/        # Permission & access control policies
│   │   └── Routes/          # Route definitions (api.php)
│   ├── Models/              # Eloquent-style database models
│   ├── Modules/             # Feature modules (AbandonCart, etc.)
│   ├── Services/            # Business logic
│   │   ├── Funnel/          # Automation engine (triggers, actions, benchmarks)
│   │   └── Libs/            # Mailer, parser, file system
│   └── Views/               # PHP templates (external pages, admin)
├── boot/                    # Plugin bootstrap (app.php)
├── config/                  # Configuration files
├── database/                # Migrations and schema
├── resources/               # Frontend source (Vue, JS, CSS)
│   ├── admin/               # Admin Vue app (Options API)
│   └── v3app/               # V3 app modules (Pinia stores)
├── custom-editor/           # Gutenberg email editor
└── fluent-crm.php           # Plugin entry point
```

## Core Concepts

### Data Model

FluentCRM's data model centers around **contacts** (subscribers) with relationships to campaigns, tags, lists, and automations.

| Table | Model | Purpose |
|-------|-------|---------|
| `fc_subscribers` | [Subscriber](/database/models/subscriber) | Contacts — the central entity |
| `fc_campaigns` | [Campaign](/database/models/campaign) | Email campaigns (one-time broadcasts) |
| `fc_campaign_emails` | [CampaignEmail](/database/models/campaign-email) | Individual emails sent per campaign per contact |
| `fc_tags` | [Tag](/database/models/tag) | Flexible contact labels for segmentation |
| `fc_lists` | [Lists](/database/models/lists) | Contact groups for organizing subscribers |
| `fc_funnels` | [Funnel](/database/models/funnel) | Automation workflows |
| `fc_funnel_sequences` | [FunnelSequence](/database/models/funnelSequence) | Steps within an automation |
| `fc_meta` | [Meta](/database/models/meta) | Shared key-value store (multiple types) |
| `fc_subscriber_notes` | [SubscriberNote](/database/models/subscriber-note) | Contact notes and activity logs |
| `fc_companies` | [Company](/database/models/company) | Company/organization records |

See the full [Database Schema](/database/) and [Models Reference](/database/models/) for details.

### Automation System

Automations (funnels) use three building blocks:

- **[Triggers](/modules/trigger)** — Events that start a workflow (form submission, tag added, purchase, etc.)
- **[Actions](/modules/action)** — Steps executed in sequence (send email, add tag, wait, webhook, etc.)
- **[Benchmarks](/modules/benchmark)** — Goal checkpoints a contact must reach (link clicked, purchase made, etc.)

### Hook System

FluentCRM provides 200+ hooks for extending functionality:

- **[Action Hooks](/hooks/actions/)** — Run custom code when events occur (contact created, email sent, campaign completed, etc.)
- **[Filter Hooks](/hooks/filters/)** — Modify data before it's used (email headers, contact statuses, admin menus, etc.)

### REST API

The REST API provides full programmatic access to all CRM data. All endpoints require authentication.

- **[Authentication](/rest-api/authentication)** — Cookie-based (wp_nonce) or Application Passwords
- **[Contacts API](/rest-api/contacts)** — CRUD operations on subscribers
- **[Campaigns API](/rest-api/campaigns)** — Create and manage email campaigns
- **[Tags](/rest-api/tags) & [Lists](/rest-api/lists)** — Manage segmentation
- **[Webhooks](/rest-api/webhooks)** — Inbound data via webhook endpoints

See the full [REST API Reference](/rest-api/).

## Extension Points

### Adding Custom Functionality

| What you want to do | Where to look |
|---------------------|---------------|
| Run code when a contact is created/updated | [Contact Action Hooks](/hooks/actions/contacts) |
| Modify email content before sending | [Email Filters](/hooks/filters/emails-and-sending) |
| Add a custom automation trigger | [Custom Trigger Module](/modules/trigger) |
| Add a custom automation action | [Custom Action Module](/modules/action) |
| Add a tab to the contact profile | [Profile Section Module](/modules/contact-profile-section) |
| Add custom smart codes for emails | [Smart Code Module](/modules/smart-code) |
| Track custom events on contacts | [Event Tracking Module](/modules/event-tracking) |
| Add custom REST API endpoints | [Extending the REST API](/extending-rest-api/) |
| Customize the admin dashboard | [Dashboard Filters](/hooks/filters/admin-and-dashboard) |
| Modify frontend pages (unsubscribe, DOI) | [Frontend Filters](/hooks/filters/frontend) |

### Helper Utilities

FluentCRM includes helper classes and global functions:

- **[Global Functions](/global-functions/)** — `fluentcrm_get_option()`, `fluentCrmApi()`, contact creation helpers
- **[Arr Helper](/helpers/arr)** — Array manipulation utilities
- **[Str Helper](/helpers/str)** — String manipulation utilities
- **[Service Helper](/helpers/service_helper)** — CRM service utilities

## Development Setup

**Requirements:**
- WordPress 5.6+
- PHP 7.4+
- MySQL 5.6+ (InnoDB)

**Build tools** (only needed if modifying frontend):
```bash
pnpm install && pnpm run dev   # Vite dev server
pnpm run build                 # Production build
```

**Custom email editor** (only if modifying the Gutenberg editor):
```bash
cd custom-editor && npm install && npm run build
```

## Next Steps

- **[Database Schema](/database/)** — Understand the data structure
- **[Models Reference](/database/models/)** — Learn the Eloquent-style models and relationships
- **[Action Hooks](/hooks/actions/)** — Hook into contact, campaign, and automation events
- **[Filter Hooks](/hooks/filters/)** — Modify emails, settings, menus, and more
- **[REST API](/rest-api/)** — Build integrations with the API
- **[Modules](/modules/)** — Create custom triggers, actions, and profile sections
