# Helper Classes

FluentCRM provides several service classes that you can use to build advanced functionalities in your plugin or addon. These classes are used extensively by FluentCRM itself and are available for third-party developers.

## CRM Service Classes

| Class | Namespace | Description |
|-------|-----------|-------------|
| [Helper](/helpers/helper) | `FluentCrm\App\Services\Helper` | Core utility class with 50+ static methods for contacts, emails, settings, SmartCodes, and more |
| [Sanitize](/helpers/sanitize) | `FluentCrm\App\Services\Sanitize` | Data sanitization for contacts, campaigns, funnels, companies, and taxonomy IDs |
| [PermissionManager](/helpers/permission-manager) | `FluentCrm\App\Services\PermissionManager` | Manage FluentCRM capabilities — check, assign, and list user permissions |
| [Parser](/helpers/parser) | `FluentCrm\App\Services\Libs\Parser\Parser` | SmartCode template parser — replace dynamic placeholders in email templates |
| [ContactsQuery](/helpers/contacts-query) | `FluentCrm\App\Services\ContactsQuery` | Advanced contact querying with filtering, sorting, and pagination |

## Framework Classes

| Class | Namespace | Description |
|-------|-----------|-------------|
| [Request](/helpers/request) | `FluentCrm\Framework\Http\Request\Request` | HTTP request handling — input retrieval, type-safe accessors, validation, file uploads |
| [Arr](/helpers/arr) | `FluentCrm\Framework\Support\Arr` | 80+ static array utility methods — get, set, dot notation, filtering, sorting, pattern matching |
| [Str](/helpers/str) | `FluentCrm\Framework\Support\Str` | String utility methods — contains, startsWith, slug, camel, snake, and more |

## Usage

All service classes can be used directly via their fully-qualified namespace:

```php
use FluentCrm\App\Services\Helper;
use FluentCrm\App\Services\Sanitize;
use FluentCrm\App\Services\PermissionManager;
use FluentCrm\App\Services\Libs\Parser\Parser;
use FluentCrm\App\Services\ContactsQuery;

// Example: Check if a feature is enabled
$isCompanyEnabled = Helper::isCompanyEnabled();

// Example: Sanitize contact data before saving
$cleanData = Sanitize::contact($requestData);

// Example: Check current user permissions
$canManage = PermissionManager::currentUserCan('fcrm_manage_contacts');
```
