---
description: "Filter hooks for the FluentCRM MCP module — server route, ability list, safety levels, bulk caps, capabilities, and agent guidance."
---

# MCP Filters

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Advanced" />

These filter hooks tune the FluentCRM MCP (Model Context Protocol) server and the context returned
to AI agents by the `get-crm-context` tool. For the matching actions, see
[MCP Actions](/hooks/actions/mcp).

## Server

### `fluent_crm/mcp_server_namespace`

Filter the REST namespace of the dedicated FluentCRM MCP server. Together with
[`fluent_crm/mcp_server_route`](#fluent-crm-mcp-server-route) it forms the endpoint, which defaults
to `/wp-json/fluent-crm/mcp`. The same filter is used when the settings screen builds the endpoint
URL, so connection snippets follow your change.

**Parameters**
- `$namespace` String - Default `fluent-crm`

**Usage:**
```php
add_filter('fluent_crm/mcp_server_namespace', function($namespace) {
    return 'my-crm';
});
```

**Source:** `fluent-crm/app/Modules/MCP/MCPInit.php`

---

### `fluent_crm/mcp_server_route`

Filter the route of the dedicated FluentCRM MCP server inside its namespace.

**Parameters**
- `$route` String - Default `mcp`

**Usage:**
```php
add_filter('fluent_crm/mcp_server_route', function($route) {
    return 'agent';
});
```

**Source:** `fluent-crm/app/Modules/MCP/MCPInit.php`

---

### `fluent_crm/mcp_ability_names`

Filter the list of ability names exposed by the dedicated FluentCRM MCP server (what agents discover
through `tools/list`). Add the names of abilities you registered on
[`fluent_crm/mcp_loaded`](/hooks/actions/mcp#fluent-crm-mcp-loaded). FluentCampaign Pro uses this to add
its Pro abilities. The filter also runs when the settings screen counts available abilities.

**Parameters**
- `$abilityNames` Array - fully-qualified ability names, for example `fluent-crm/list-contacts`

**Usage:**
```php
add_filter('fluent_crm/mcp_ability_names', function($abilityNames) {
    $abilityNames[] = 'fluent-crm/my-custom-tool';
    return $abilityNames;
});
```

**Source:** `fluent-crm/app/Modules/MCP/MCPInit.php`

---

## Context Returned to Agents

### `fluent_crm/mcp_capabilities`

Filter the versioned capabilities map the `get-crm-context` tool returns (as `mcp_capabilities`)
so agents can adapt to what the server supports.

**Parameters**
- `$capabilities` Array - keys: `version` (string), `supports` (list of feature slugs), `deprecated`, `corrections` (lists of notes) and `breaking_changes_pending`

**Usage:**
```php
add_filter('fluent_crm/mcp_capabilities', function($capabilities) {
    $capabilities['supports'][] = 'my_custom_tool';
    return $capabilities;
});
```

**Source:** `fluent-crm/app/Modules/MCP/Tools/ContextTools.php`

---

### `fluent_crm/mcp_safety_levels`

Filter the map of ability name to safety level returned in the `safety_levels` section of
`get-crm-context`. Agents use it to decide how careful to be. Add an entry for every custom ability
you register.

Levels used by core: `safe_render`, `readonly`, `creates_or_mutates_draft`, `mutating_with_dry_run`,
`destructive_send` and `destructive_irrecoverable`.

**Parameters**
- `$levels` Array - ability name => safety level

**Usage:**
```php
add_filter('fluent_crm/mcp_safety_levels', function($levels) {
    $levels['fluent-crm/my-custom-tool'] = 'readonly';
    return $levels;
});
```

**Source:** `fluent-crm/app/Modules/MCP/Tools/ContextTools.php`

---

### `fluent_crm/mcp_rate_hints`

Filter the per-ability limits returned in the `rate_hints` section of `get-crm-context`, which let
agents validate batch sizes before calling a tool. Note this only changes what agents are told; to
change the enforced limits use [`fluent_crm/mcp_bulk_cap`](#fluent-crm-mcp-bulk-cap).

**Parameters**
- `$hints` Array - ability name => array with `max_per_call` and `recommended_batch`, or a free-text `note`

**Usage:**
```php
add_filter('fluent_crm/mcp_rate_hints', function($hints) {
    $hints['fluent-crm/my-custom-tool'] = ['max_per_call' => 100];
    return $hints;
});
```

**Source:** `fluent-crm/app/Modules/MCP/Tools/ContextTools.php`

---

### `fluent_crm/mcp_ai_guidelines`

Filter the guidance text returned as the AI guidelines in `get-crm-context`. The default is built
from the current user's permissions. Use it for site-specific rules, and keep it short because agents
may request the context often.

**Parameters**
- `$guidelines` String - the default guidelines text

**Usage:**
```php
add_filter('fluent_crm/mcp_ai_guidelines', function($guidelines) {
    return $guidelines . ' Always tag contacts you edit with "mcp-edited".';
});
```

**Source:** `fluent-crm/app/Modules/MCP/Tools/ContextTools.php`

---

### `fluent_crm/mcp_allowed_design_templates`

Filter the email design templates agents may choose when creating campaigns or emails. By default
these are the registered design templates minus `visual_builder`, which is an interactive editor
and is not meant for agents. The result also feeds the allowed values (enum) in the tool schemas.

**Parameters**
- `$templates` Array - map of template slug => label

**Usage:**
```php
add_filter('fluent_crm/mcp_allowed_design_templates', function($templates) {
    unset($templates['raw_html']); // Do not let agents author raw HTML
    return $templates;
});
```

**Source:** `fluent-crm/app/Modules/MCP/Tools/ContextTools.php`

---

## Limits

### `fluent_crm/mcp_bulk_cap`

Filter the maximum number of contacts a bulk MCP tool will process in one call. It is applied per
tool; compare `$tool` to target one. Calls above the cap are refused with a `cap_reached` error.

Defaults by tool:

| `$tool` | Default cap |
|---|---|
| `bulk-upsert-contacts` | 500 |
| `apply-segments-to-contacts` | 5000 |
| `manage-sequence-subscribers` (FluentCampaign Pro) | 5000 |

**Parameters**
- `$cap` Integer - the default cap for that tool
- `$tool` String - the tool name without the `fluent-crm/` prefix

**Usage:**
```php
add_filter('fluent_crm/mcp_bulk_cap', function($cap, $tool) {
    if ($tool === 'apply-segments-to-contacts') {
        return 1000;
    }
    return $cap;
}, 10, 2);
```

**Source:** `fluent-crm/app/Modules/MCP/Tools/ContactTools.php`

---

## Settings Screen

### `fluent_crm/mcp_is_local_dev`

Override the local-development detection used by the MCP settings screen. A site counts as local when
its host ends in `.test`, `.lab`, `.local`, `.localhost`, `.docker` or `.dev`, is `localhost`, or is a
private or reserved IP address. When detected, the generated Claude Desktop snippet includes
`NODE_TLS_REJECT_UNAUTHORIZED=0` so the proxy accepts self-signed certificates. Return `false` for a
public site on a dev-style hostname.

**Parameters**
- `$isDev` Boolean - whether the install looks like local development
- `$host` String - the lowercased host of `home_url()`

**Usage:**
```php
add_filter('fluent_crm/mcp_is_local_dev', function($isDev, $host) {
    return false;
}, 10, 2);
```

**Source:** `fluent-crm/app/Http/Controllers/MCPSettingsController.php`
