---
title: Hooks Reference
description: "Every FluentCRM action and filter hook, grouped by area: contacts, campaigns, automations, emails, messaging, MCP and more."
---

# Hooks Reference

FluentCRM exposes more than 400 hooks. **Actions** run your code when something happens; **filters** let you change a value before FluentCRM uses it.

Hook names use two prefixes: current hooks are `fluent_crm/…`, and older ones are `fluentcrm_…`. The legacy names still work; see [Legacy Hook Renames](/hook_changes) for the old-to-new mapping.

<div class="path-grid">
  <div class="path-item">
    <h3>Action Hooks</h3>
    <p>React to contact, campaign, automation, tag, list and messaging events.</p>
    <a href="/hooks/actions/">Browse Action Hooks →</a>
  </div>
  <div class="path-item">
    <h3>Filter Hooks</h3>
    <p>Change contact data, email output, settings, limits and admin UI.</p>
    <a href="/hooks/filters/">Browse Filter Hooks →</a>
  </div>
</div>

## Find a hook by area

| Area | Actions | Filters |
|------|---------|---------|
| Contacts | [Contacts](/hooks/actions/contacts), [Contact Activity](/hooks/actions/contact-activity) | [Contacts](/hooks/filters/contacts) |
| Campaigns & email | [Campaigns](/hooks/actions/campaigns), [Email Templates](/hooks/actions/templates) | [Campaigns](/hooks/filters/campaigns), [Emails & Sending](/hooks/filters/emails-and-sending) |
| Automations | [Automations, Admin & Init](/hooks/actions/automations) | [Automations & Funnels](/hooks/filters/automations) |
| Tags, lists, companies | [Tags & Lists](/hooks/actions/tags-and-lists), [Companies](/hooks/actions/companies) | [Companies](/hooks/filters/companies) |
| Messaging <Badge type="warning" text="Pro" /> | [Messaging](/hooks/actions/sms) | [Messaging](/hooks/filters/sms) |
| Integrations | [Integrations](/hooks/actions/integrations) | [Webhooks & Integrations](/hooks/filters/webhooks-and-integrations) |
| MCP | [MCP](/hooks/actions/mcp) | [MCP](/hooks/filters/mcp) |
| Settings & system | [Settings & System](/hooks/actions/settings-and-system) | [Settings & System](/hooks/filters/settings-and-system) |

Looking for PHP helpers rather than hooks? See [Global Functions](/global-functions/) and [Helper Classes](/helpers/).
