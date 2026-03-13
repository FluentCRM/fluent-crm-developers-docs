---
description: "FluentCRM has many interesting filter hooks that let developers change default settings and even extend FluentCRM with new functionality."
---

# FluentCRM Filter Hooks

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

FluentCRM has many interesting filter hooks that let developers change default settings and even extend FluentCRM with new functionality.

## What are Filter Hooks

A hook is a feature that allows developers to manipulate functionality without modifying core files. A hook can help developers inject some functions or edit default settings.

Filter hooks are used to return modified values for certain parameters, based on different factors.

## Available Filter Hooks

1. **[Contacts](/hooks/filters/contacts)** — Contact statuses, types, profile sections, custom fields, avatars, smart codes, bulk actions, CSV export
2. **[Emails & Sending](/hooks/filters/emails-and-sending)** — Email headers, body processing, design templates, tracking, sending pipeline, rate limits, compliance
3. **[Campaigns](/hooks/filters/campaigns)** — Campaign data, processing stats, scheduling
4. **[Automations & Funnels](/hooks/filters/automations)** — Funnel triggers, blocks, processing limits, delays, trigger gates, sequence hooks
5. **[Admin & Dashboard](/hooks/filters/admin-and-dashboard)** — Menus, permissions, dashboard stats, notices, admin vars, general settings
6. **[Frontend Pages](/hooks/filters/frontend)** — Unsubscribe page, double optin, manage subscription, bounce handling
7. **[Companies](/hooks/filters/companies)** — Company types, categories, profile sections, CSV export
8. **[Block Email Editor](/hooks/filters/block-editor)** — Editor settings, patterns, capabilities, allowed blocks
9. **[Webhooks & Integrations](/hooks/filters/webhooks-and-integrations)** — Webhook data, imports, migrations, commerce providers, WooCommerce, EDD, dynamic segments
10. **[SMS Campaigns](/hooks/filters/sms)** <Badge type="danger" vertical="middle" text="Pro" /> — SMS providers, processing limits, scheduling, message content
