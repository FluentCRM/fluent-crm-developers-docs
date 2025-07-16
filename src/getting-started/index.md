---
description: "Complete developer guide for FluentCRM - learn to build powerful integrations, custom automations, and extend WordPress's most flexible email marketing platform. Everything you need to start developing with FluentCRM."
---

# FluentCRM Developer Guide

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Complete Guide" />

Welcome to the complete developer guide for **FluentCRM** - the self-hosted email marketing automation plugin for WordPress. This comprehensive guide will take you from understanding the basics to building sophisticated integrations and custom functionality.

## What is FluentCRM?

FluentCRM is a **Self-Hosted Email Marketing Automation Plugin** for WordPress that helps businesses manage their customer relationships, email campaigns, and marketing automation workflows. Unlike cloud-based solutions, FluentCRM runs entirely on your WordPress site, ensuring data privacy, unlimited contacts, and no monthly fees.

## Why Extend FluentCRM?

FluentCRM is designed to be highly extensible, allowing developers to customize and extend its functionality far beyond what the plugin offers out-of-the-box. Whether you're a business owner looking to customize your CRM or a developer hired to create specific integrations, FluentCRM provides the tools you need.

### 🔧 **Built for Customization**
- **Extensive hook system** - 100+ action and filter hooks for custom functionality
- **Modular architecture** - Clean separation allows safe modifications and additions
- **RESTful API** - Complete programmatic access to all CRM data and functions
- **WordPress-native** - Follows WordPress coding standards and best practices

### 🏗️ **Flexible Extension Points**
- **Custom automations** - Create triggers, actions, and benchmarks for unique workflows
- **Third-party integrations** - Connect with external services and platforms
- **Custom profile sections** - Add specialized data views and functionality
- **API extensions** - Build custom endpoints for mobile apps or external systems

### 💼 **Business Benefits**
- **No vendor lock-in** - Your customizations stay with you, not dependent on external services
- **Unlimited scalability** - Extend functionality as your business needs grow
- **Cost-effective** - One-time development instead of ongoing SaaS fees
- **Complete control** - Modify any aspect to match your specific business processes

## FluentCRM Versions

### FluentCRM Core (Free)
The free version includes powerful core functionalities:

- ✅ **Contact Management** - Unlimited contacts and custom fields
- ✅ **Email Campaigns** - Beautiful drag-and-drop email builder
- ✅ **Basic Automations** - Simple trigger-based workflows
- ✅ **List Management** - Organize contacts with lists and tags
- ✅ **Form Integration** - Works with popular form plugins
- ✅ **WooCommerce Integration** - Basic e-commerce tracking
- ✅ **Developer API** - Full access to hooks and REST API

### FluentCRM Pro (Premium)
The premium version adds advanced marketing features:

- 🚀 **Advanced Automations** - Complex multi-path workflows
- 🚀 **Email Sequences** - Drip campaigns and nurture sequences
- 🚀 **Advanced Segmentation** - Smart tags and dynamic lists
- 🚀 **Deep Integrations** - 50+ third-party integrations
- 🚀 **Revenue Tracking** - Advanced e-commerce analytics
- 🚀 **A/B Testing** - Split test campaigns and sequences
- 🚀 **Advanced Reporting** - Detailed performance analytics

## Core Development Concepts

### 📊 **Data Architecture**
FluentCRM follows WordPress conventions with a clean, normalized database structure:

**Core Tables & Relationships:**

- **🧑‍💼 Contacts** (`fc_subscribers`) - Central hub for all contact data
  - Stores contact information, status, custom fields
  - Links to all other CRM activities and data

- **📋 Lists** (`fc_lists`) - Organize contacts into categories
  - Marketing segments, customer groups, product interests
  - Many-to-many relationship with contacts

- **🏷️ Tags** (`fc_tags`) - Flexible labeling system
  - Behavioral triggers, preferences, lifecycle stages
  - Dynamic filtering and automation targeting

- **📧 Campaigns** (`fc_campaigns`) - One-time email broadcasts
  - Newsletter campaigns, promotions, announcements
  - Track opens, clicks, and engagement metrics

- **🤖 Funnels** (`fc_funnels`) - Automation workflows
  - Multi-step email sequences and nurture campaigns
  - Trigger-based automated customer journeys

### 🔄 **Automation Workflow**
The three-component automation system:

1. **Triggers** - Events that start workflows (form submission, purchase, etc.)
2. **Actions** - Tasks performed automatically (send email, add tag, etc.)  
3. **Benchmarks** - Goals that define completion (purchase made, link clicked, etc.)

### 🔌 **Extension Points**
Multiple ways to extend FluentCRM:

- **WordPress Hooks** - 100+ actions and filters for custom functionality
- **REST API** - Complete programmatic access to all features  
- **Module System** - Add new triggers, actions, and profile sections
- **Smart Codes** - Dynamic content placeholders for personalization
- **Custom Automations** - Create workflows as per your business needs

## Directory Structure

Understanding FluentCRM's organized codebase:

```yaml
fluent-crm/
├── app/                    # Core application logic
│   ├── Api/               # REST API endpoints and utilities
│   ├── Functions/         # Global helper functions
│   ├── Hooks/            # WordPress action/filter handlers
│   ├── Http/             # Request handling and routing
│   │   ├── Controllers/   # API and admin controllers
│   │   ├── Policies/     # Permission and access control
│   │   └── routes.php    # Route definitions
│   ├── Models/           # Database models and relationships
│   │   ├── Subscriber.php # Contact/subscriber model
│   │   ├── Campaign.php  # Email campaign model
│   │   ├── Funnel.php   # Automation workflow model
│   │   └── ...          # Additional models
│   ├── Services/         # Business logic and services
│   │   ├── Funnel/      # Automation engine services
│   │   ├── Libs/        # Third-party integrations
│   │   └── Helper.php   # Core helper utilities
│   └── views/           # PHP template files
│
├── assets/              # Frontend assets
│   ├── admin/          # Admin interface assets
│   ├── public/         # Public-facing assets
│   └── images/         # Image resources
│
├── boot/               # Plugin initialization
├── config/             # Configuration files
├── database/           # Database migrations and schema
│   ├── migrations/     # Database migration files
│   └── DBMigrator.php # Migration handler
│
└── fluent-crm.php     # Plugin entry point
```

## Development Environment Setup

### Prerequisites
- **WordPress 5.0+** - Modern WordPress installation
- **PHP 7.4+** - Recent PHP version with required extensions
- **MySQL 5.6+** - Database with InnoDB support
- **Basic WordPress Development** - Understanding of hooks, plugins, and themes

### Development Tools
- **Code Editor** - VS Code, PhpStorm, or your preferred editor
- **Local Environment** - Laravel Herd, XAMPP, WAMP, or Docker
- **Version Control** - Git for tracking changes (optional but recommended)
- **API Testing** - Postman or Insomnia for REST API development

### Getting Started Checklist

1. **📖 Read the Fundamentals**
   - [ ] Understand the [database schema](/database/)
   - [ ] Review [core models](/database/models/)
   - [ ] Explore [global functions](/global-functions/)

2. **🔍 Explore the Hooks**
   - [ ] Browse [action hooks](/hooks/actions/)
   - [ ] Study [filter hooks](/hooks/filters/)
   - [ ] Try [helper classes](/helpers/)

3. **🏗️ Build Your First Extension**
   - [ ] Create a [custom trigger](/modules/trigger/)
   - [ ] Build a [custom action](/modules/action/)
   - [ ] Add a [profile section](/modules/contact-profile-section/)

4. **🌐 API Integration**
   - [ ] Set up [REST API access](/rest-api/authentication)
   - [ ] Test [contact management](/rest-api/contacts)
   - [ ] Explore [webhook integration](/rest-api/webhooks)

## Community & Support

### 📚 **Learning Resources**
- **[Official Documentation (User) ](https://fluentcrm.com/docs/)** - User guides and tutorials
- **[Developer Hooks Reference](/hooks/)** - Complete hook documentation
- **[REST API Documentation](/rest-api/)** - Comprehensive API guide

### 💬 **Community**
- **[WPManageNinja Community](https://community.wpmanageninja.com/portal/space/fluent-crm/)** - Official community
- **[Facebook Community](https://www.facebook.com/groups/fluentcrm)** - Active user discussions
- **[Official Support](https://wpmanageninja.com/support-tickets/)** - Technical support

### 🚀 **Next Steps**
Ready to start building? Choose your path:

- **[Build Automations](/modules/automation/)** - Create powerful workflows
- **[Extend the API](/extending-rest-api/)** - Add custom endpoints
- **[Database Deep Dive](/database/)** - Master the data structure
- **[Hook Integration](/hooks/)** - Leverage WordPress hooks

