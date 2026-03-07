# Permission Manager

`FluentCrm\App\Services\PermissionManager`

The `PermissionManager` class manages FluentCRM capabilities for WordPress users. It provides methods to check, assign, and retrieve permissions. WordPress Administrators (`manage_options`) automatically have all FluentCRM permissions.

```php
use FluentCrm\App\Services\PermissionManager;
```

## Capabilities Reference

FluentCRM registers 16 custom capabilities organized by group:

### Dashboard
| Capability | Description |
|------------|-------------|
| `fcrm_view_dashboard` | View the FluentCRM dashboard |

### Contacts
| Capability | Description | Depends On |
|------------|-------------|------------|
| `fcrm_read_contacts` | View contact list and profiles | — |
| `fcrm_manage_contacts` | Create, edit, and import contacts | `fcrm_read_contacts` |
| `fcrm_manage_contacts_delete` | Delete contacts | `fcrm_read_contacts` |
| `fcrm_manage_contacts_export` | Export contacts | `fcrm_read_contacts` |

### Segments (Tags, Lists, Companies)
| Capability | Description | Depends On |
|------------|-------------|------------|
| `fcrm_manage_contact_cats` | Create/update tags, lists, companies, segments | `fcrm_read_contacts` |
| `fcrm_manage_contact_cats_delete` | Delete tags, lists, companies, segments | `fcrm_read_contacts` |

### Emailing
| Capability | Description | Depends On |
|------------|-------------|------------|
| `fcrm_read_emails` | View campaigns and email logs | — |
| `fcrm_manage_emails` | Create, edit, and send emails | `fcrm_read_emails` |
| `fcrm_manage_email_delete` | Delete emails and campaigns | — |
| `fcrm_manage_email_templates` | Manage email templates | — |

### Forms
| Capability | Description |
|------------|-------------|
| `fcrm_manage_forms` | Manage opt-in forms |

### Automations
| Capability | Description | Depends On |
|------------|-------------|------------|
| `fcrm_read_funnels` | View automations | — |
| `fcrm_write_funnels` | Create and edit automations | `fcrm_read_funnels` |
| `fcrm_delete_funnels` | Delete automations | `fcrm_read_funnels` |

### Settings
| Capability | Description |
|------------|-------------|
| `fcrm_manage_settings` | Manage CRM settings |

::: info
The **Depends On** column indicates which capabilities must also be assigned for the permission to work correctly.
:::

## Methods

### `currentUserCan($permission)`

Checks whether the current user holds a specific FluentCRM capability. Administrators always return `true`.

- **Parameters:** `string $permission` — One of the capability slugs above
- **Returns:** `bool`
- **Filter:** `fluentcrm_current_admin_can` (for administrators only)

```php
if (PermissionManager::currentUserCan('fcrm_manage_contacts')) {
    // User can create/edit contacts
}
```

::: warning
In the free version of FluentCRM, only administrators have access. The `currentUserCan()` method returns `false` for non-admins unless FluentCampaign Pro is active.
:::

### `currentUserPermissions($cached = true)`

Returns all FluentCRM permissions held by the currently logged-in user. Results are statically cached within the request.

- **Parameters:** `bool $cached` (default: `true`) — Set to `false` to force re-evaluation
- **Returns:** `array` — Array of capability strings

```php
$permissions = PermissionManager::currentUserPermissions();
// ['fcrm_read_contacts', 'fcrm_manage_contacts', ...]
```

### `getUserPermissions($user = false)`

Returns the FluentCRM permissions for a specific user. Administrators receive all permissions plus `'administrator'`.

- **Parameters:** `int|WP_User|false $user` — User ID, WP_User object, or `false`
- **Returns:** `array`
- **Filter:** `fluent_crm/user_permissions`

```php
$permissions = PermissionManager::getUserPermissions(5);
```

### `attachPermissions($user, $permissions)`

Assigns a set of FluentCRM capabilities to a WordPress user. First removes all existing FluentCRM capabilities, then adds the specified ones. Skips administrators (they always have all permissions).

- **Parameters:** `int|WP_User $user`, `array $permissions` — Array of capability strings
- **Returns:** `WP_User|false`

```php
PermissionManager::attachPermissions($userId, [
    'fcrm_read_contacts',
    'fcrm_manage_contacts',
    'fcrm_read_emails'
]);
```

### `getReadablePermissions()`

Returns the full permission definitions with titles, dependency info, and group assignments.

- **Returns:** `array` — Keyed by capability slug
- **Filter:** `fluent_crm/readable_permissions`

```php
$permissions = PermissionManager::getReadablePermissions();
/*
[
    'fcrm_read_contacts' => [
        'title'   => 'Contacts Read',
        'depends' => [],
        'group'   => 'contacts'
    ],
    'fcrm_manage_contacts' => [
        'title'   => 'Contacts Add/Update/Import',
        'depends' => ['fcrm_read_contacts'],
        'group'   => 'contacts'
    ],
    ...
]
*/
```

### `pluginPermissions()`

Returns a flat array of all registered FluentCRM capability strings.

- **Returns:** `array`
- **Filter:** `fluent_crm/plugin_permissions`

```php
$allCaps = PermissionManager::pluginPermissions();
// ['fcrm_view_dashboard', 'fcrm_read_contacts', 'fcrm_manage_contacts', ...]
```
