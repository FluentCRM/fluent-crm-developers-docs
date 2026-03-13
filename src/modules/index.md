---
title: Extending FluentCRM
description: "Learn how to extend FluentCRM with custom automation triggers, actions, benchmarks, smart codes, profile sections, and event tracking."
---

# Extending FluentCRM

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

FluentCRM provides a modular architecture that lets third-party plugins add custom automation components, merge tags, profile sections, and more. This section covers all the extension points available to developers.

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

## Other Extension Points

| Extension | API | Description |
|-----------|-----|-------------|
| [Smart Codes](/modules/smart-code) | `FluentCrmApi('extender')->addSmartCode()` | Custom merge tags for emails and templates |
| [Event Tracking](/modules/event-tracking) | `FluentCrmApi('event_tracker')->track()` | Track custom contact activities and behaviors |
| [Contact Profile Section](/modules/contact-profile-section) | `FluentCrmApi('extender')->addProfileSection()` | Custom tabs on the contact profile page |
| [Company Profile Section](/modules/company-profile-section) | `FluentCrmApi('extender')->addCompanyProfileSection()` | Custom tabs on the company profile page |
