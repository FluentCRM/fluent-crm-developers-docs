---
description: "FluentCRM integrates with [WP-CLI], enabling you to run certain FluentCRM tasks via the command line interface, without using a web browser."
---

# FluentCRM CLI

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Advanced" />

FluentCRM integrates with [WP-CLI](https://wp-cli.org/), enabling you to run certain FluentCRM tasks via the command line interface, without using a web browser.

## What is WordPress CLI?

WP-CLI is a command line interface for [WordPress](https://wordpress.org/). It offers an alternative to the WordPress admin bar. Using the command line makes it easier for developers, agencies and hosting providers to run actions with fewer clicks, run them remotely, and even perform complex scripts based on certain conditions.

## What is FluentCRM CLI?

FluentCRM CLI is a set of commands integrated into WP-CLI to allow developers to run certain FluentCRM tasks in a command line.

## Syntax

CLI commands syntax:

```bash
wp fluent_crm <command> [--argument]
```

## Available Commands

Currently, the following FluentCRM commands are available:

### `wp fluent_crm stats`
It will return overall FluentCRM stats like emails, contacts, campaigns, automations

### `wp fluent_crm sync_edd_customers`
If you need to sync Easy Digital Downloads Customers and it's associate data with FluentCRM you can run this commands
**Arguments**
- `tags` comma separated tag ids that you want to attach by default contact
- `lists` comma separated list ids you want to attach by default to the contact
- `contact_status` default contact status of new contact default `subscribed`

**Example**
```bash
wp fluent_crm sync_edd_customers --tags=1,2,3 --lists=4,5 --contact_status=subscribed
```

### `wp fluent_crm sync_woo_customers`
If you need to sync WooCommerce Customers and it's associate data with FluentCRM you can run this commands
**Arguments**
- `tags` comma separated tag ids that you want to attach by default contact
- `lists` comma separated list ids you want to attach by default to the contact
- `contact_status` default contact status of new contact default `subscribed`

**Example**
```bash
wp fluent_crm sync_woo_customers --tags=1,2,3 --lists=4,5 --contact_status=subscribed
```

### `wp fluent_crm activate_license`
Activate FluentCRM Pro license key via command line

**Arguments**
- `key` Your FluentCRM Pro License Key

**Example**
```bash
wp fluent_crm activate_license --key=YOUR_LICENSE_KEY
```

### `wp fluent_crm license_status`
See FluentCRM Pro License Status

**Example**
```bash
wp fluent_crm license_status
```

### `wp fluent_crm license_status`
See FluentCRM Pro License Status

**Example**
```bash
wp fluent_crm license_status
```

## Help

For information about an individual command, use the following format:

```bash
wp help fluent_crm <command>
```
