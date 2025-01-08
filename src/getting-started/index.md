---
description: "FluentCRM is a Self Hosted Email Marketing Automation Plugin for WordPress. Manage your leads and customers, email campaigns, automated email sequencing, learner and affiliate management, and monitor user activities and many more in one place; without ever having to leave your WordPress dashboard!"
---

# What is FluentCRM?

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Basic" />

FluentCRM is a Self Hosted Email Marketing Automation Plugin for WordPress. Manage your leads and customers, email campaigns, automated email sequencing, learner and affiliate management, and monitor user activities and many more in one place; without ever having to leave your WordPress dashboard!

## FluentCRM Versions

FluentCRM comes in different versions:

**FluentCRM Core** is a free WordPress plugin. It includes it's main functionalities, enabling users to manage contacts, send emails, create basic automations.

**FluentCRM Pro** is a paid version that adds a number of advanced features and options not found in the free version. It substantially increases and improves your marketing workflow and build advanced email sequences and automation funnels.

## Directory Structure

```yaml
├── app
│   ├── Api         # contains PHP API Utility classes
│   └── Functions   # contains global functions
│   └── Hooks       # actions and filters handlers
│   └── Http        # REST API routes, controllers, policies
│   └── Models      # Database Models
│   └── Services    # Module Services
│   └── views       # php view files
│   └── App.php
│
├── assets          # contains css,js, media files
├── boot            # [internal] contains plugin boot files
├── config          # [internal] contains plugin framework top level config
├── database        # [internal] Database migration files
├── includes        # [internal] Old Framework deprecated classes
├── language        # [internal] Language Files
├── vendor          # [internal] Core Framework Files
│
└── fluent-crm.php  # Plugin entry File
```

