---
description: "Action hooks for the FluentCRM MCP module — extend the abilities registered for AI agents and log tool exceptions."
---

# MCP Hooks

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Advanced" />

These action hooks belong to the MCP (Model Context Protocol) module, which exposes FluentCRM
abilities to AI agents through the WordPress Abilities API and MCP Adapter. For the filters that
tune the server, see [MCP Filters](/hooks/filters/mcp).

### `fluent_crm/mcp_loaded`

Fires right after FluentCRM has registered its core MCP abilities, inside the
`wp_abilities_api_init` action. Use it to register your own abilities under the same `fluent-crm/`
namespace so agents see one toolset. FluentCampaign Pro registers its Pro abilities here.

To have a custom ability appear in the dedicated FluentCRM MCP server's tool list, also add its
name with the [`fluent_crm/mcp_ability_names`](/hooks/filters/mcp#fluent-crm-mcp-ability-names) filter.

**Parameters**

None.

**Usage:**
```php
add_action('fluent_crm/mcp_loaded', function() {
    wp_register_ability('fluent-crm/my-custom-tool', [
        // label, description, input_schema, execute_callback, permission_callback ...
    ]);
});
```

**Source:** `fluent-crm/app/Modules/MCP/MCPInit.php`

---

### `fluent_crm/mcp_tool_exception`

Fires when an MCP tool throws an unhandled exception, before a generic structured error is returned
to the agent. The agent only receives a short `error_id`; the exception details are never sent to
the client, so hook this to log or alert on failures. The same detail is also written to the CRM
system log (when debug logging is enabled), keyed by the same `error_id`.

**Parameters**
- `$exception` \Throwable - the exception that was thrown
- `$toolName` String - fully-qualified ability name, for example `fluent-crm/upsert-contact`
- `$params` Mixed - the input parameters the tool was called with
- `$errorId` String - 12-character correlation id returned to the client

**Usage:**
```php
add_action('fluent_crm/mcp_tool_exception', function($exception, $toolName, $params, $errorId) {
    error_log(sprintf('[%s] MCP tool %s failed: %s', $errorId, $toolName, $exception->getMessage()));
}, 10, 4);
```

**Source:** `fluent-crm/app/Modules/MCP/AbilitiesRegistrar.php`
