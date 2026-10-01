---
title: Extending FluentCRM
description: "Every way to extend FluentCRM in one place: automation steps, contact and company UI, smart codes, event tracking, REST routes, hooks, CLI and models."
---

# Extending FluentCRM

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

FluentCRM is built to be extended from a separate plugin. This page lists every extension point and where to start. Register your code on the `fluent_crm/after_init` hook so FluentCRM is fully loaded before you touch it.

## Pick your goal

| I want to… | Use | Start here |
|---|---|---|
| Start an automation from my own event | Custom trigger | [Trigger](/modules/trigger) |
| Add a step to an automation | Custom action | [Action](/modules/action) |
| Add a goal contacts must reach | Custom benchmark | [Benchmark](/modules/benchmark) |
| Add a tab to the contact profile | Profile section | [Contact Profile Section](/modules/contact-profile-section) |
| Add a tab to the company profile | Profile section | [Company Profile Section](/modules/company-profile-section) |
| Add a dynamic placeholder to emails | Smart code | [Smart Codes](/modules/smart-code) |
| Record custom contact activity | Event tracking | [Event Tracking](/modules/event-tracking) |
| Add my own REST endpoints | Routes, controllers, policies | [Extending the REST API](/rest-api/extending/) |
| Call FluentCRM from my plugin | Global API functions | [Global Functions](/global-functions/) |
| React to or change what FluentCRM does | Action and filter hooks | [Hooks Reference](/hooks/) |
| Query FluentCRM data directly | Models and tables | [Database Models](/database/models/), [Schema](/database/) |
| Script or automate from the server | WP-CLI | [CLI](/cli/) |
| Send email faster | Parallel senders | [Email Sending Speed](/modules/email-sending-speed) |

## Automation Components

FluentCRM automations (called "Funnels") are built from three types of components:

| Component | Base Class | Description |
|-----------|-----------|-------------|
| [Trigger](/modules/trigger) | `BaseTrigger` | An event that starts an automation (e.g., user registers, form submitted) |
| [Action](/modules/action) | `BaseAction` | A task executed during the automation (e.g., apply tag, send email) |
| [Benchmark](/modules/benchmark) | `BaseBenchMark` | A goal/checkpoint that contacts must reach to proceed (e.g., link clicked, tag applied) |

All base classes live in the `FluentCrm\App\Services\Funnel` namespace.

Each component is a PHP class that extends the corresponding base class and implements a set of abstract methods. The base class handles registration automatically — you just define the component's metadata, UI fields, and processing logic.

### Registration

Register your components on the `fluent_crm/after_init` hook:

```php
add_action('fluent_crm/after_init', function () {
    new YourPlugin\Automation\CourseEnrolledTrigger();
    new YourPlugin\Automation\AddToGroupAction();
    new YourPlugin\Automation\TagAppliedBenchmark();
});
```

### Form Fields

Automation components use a declarative field system to render their settings UI. See the [Form Field Types](/modules/form-field-code-structure) reference for all 26 available field types (`input-text`, `select`, `radio`, `yes_no_check`, `html_editor`, etc.).

## Contact, Company and Email Extensions

| Extension | API | Description |
|-----------|-----|-------------|
| [Smart Codes](/modules/smart-code) | `FluentCrmApi('extender')->addSmartCode()` | Custom merge tags for emails and templates |
| [Event Tracking](/modules/event-tracking) | `FluentCrmApi('event_tracker')->track()` | Track custom contact activities and behaviors |
| [Contact Profile Section](/modules/contact-profile-section) | `FluentCrmApi('extender')->addProfileSection()` | Custom tabs on the contact profile page |
| [Company Profile Section](/modules/company-profile-section) | `FluentCrmApi('extender')->addCompanyProfileSection()` | Custom tabs on the company profile page |


## Build on the platform

| Area | What you get | Reference |
|------|--------------|-----------|
| REST API | 369 documented endpoints, plus the ability to add your own under `fluent-crm/v2` | [REST API](/rest-api/), [Extending the REST API](/rest-api/extending/) |
| Hooks | 400+ actions and filters | [Actions](/hooks/actions/), [Filters](/hooks/filters/) |
| Global functions | `FluentCrmApi('contacts')`, `('tags')`, `('lists')`, `('companies')`, `('extender')`, `('event_tracker')` | [Global Functions](/global-functions/) |
| Helper classes | `Arr`, `Str`, `Request`, `ContactsQuery`, `PermissionManager` | [Helpers](/helpers/) |
| Database | Eloquent-style models and the `fc_` tables | [Models](/database/models/), [Schema](/database/) |
| CLI | Sync, send, license and simulation commands | [CLI](/cli/) |

::: tip Some extension points are opt-in
Event tracking, the company module and multi-threaded sending are switched on under **Settings → Experimental**. Each page says when a feature depends on one.
:::
