---
title: Admin Top Menu
description: "Add your own item to the FluentCRM top navigation menu, with a PHP hook for the menu entry and an optional Vue screen registered through a JavaScript hook."
---

# Admin Top Menu

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

The FluentCRM admin has a top navigation bar (Dashboard, Contacts, Campaigns and so on). You can add your own item to it, with or without a dropdown of sub-items, and decide what it opens.

The menu entry itself is always added in PHP, because the bar is rendered on the server. What changes is the screen it opens:

::: tip Option 1: PHP only
**Add the menu item and link it anywhere.** Point it at an existing admin page, a custom WordPress admin page, or an external URL.

- No build step
- Best when the destination already exists

[Jump to the PHP option →](#option-1-php-menu-item)
:::

::: tip Option 2: PHP menu item + Vue screen
**Add the menu item, then register a Vue screen it opens** inside the FluentCRM app, with the top bar kept and the item highlighted.

- Needs a build step (Vite or similar)
- Best for a full screen of your own: tables, forms, charts

[Jump to the Vue screen option →](#option-2-vue-screen)
:::

**Not sure which to use? Start with the PHP option.**

## Option 1: PHP menu item

Hook the `fluent_crm/core_menu_items` filter and append an item to the array.

### Basic Example

```php
add_filter('fluent_crm/core_menu_items', function ($menuItems, $permissions, $urlBase) {
    // Only show the item to users who may use it.
    if (!in_array('fcrm_read_contacts', $permissions, true)) {
        return $menuItems;
    }

    $menuItems[] = [
        'key'       => 'my_plugin',
        'label'     => __('My Plugin', 'your-plugin'),
        'permalink' => admin_url('admin.php?page=my-plugin-page'),
    ];

    return $menuItems;
}, 10, 3);
```

### Menu item fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `key` | String | Yes | Unique identifier. Use your plugin prefix. It also marks the item as active (see [Option 2](#option-2-vue-screen)). |
| `label` | String | Yes | Text shown in the bar |
| `permalink` | String | Yes | Where the item links to |
| `sub_items` | Array | No | Dropdown entries, see below |
| `layout_class` | String | No | Shows the dropdown as cards instead of a plain list. Core uses `fc_1_col_menu` for a single column. |

Each entry in `sub_items` takes:

| Field | Required | Description |
|-------|----------|-------------|
| `key` | Yes | Unique identifier |
| `label` | Yes | Entry title |
| `permalink` | Yes | Where it links to |
| `description` | No | Short text under the title (card layout only) |
| `icon` | No | An inline SVG string (card layout only) |

```php
$menuItems[] = [
    'key'          => 'my_plugin',
    'label'        => __('My Plugin', 'your-plugin'),
    'permalink'    => $urlBase . 'my-plugin',
    'layout_class' => 'fc_1_col_menu',
    'sub_items'    => [
        [
            'key'         => 'my_plugin_orders',
            'label'       => __('Orders', 'your-plugin'),
            'permalink'   => $urlBase . 'my-plugin/orders',
            'description' => __('Browse orders linked to your contacts', 'your-plugin'),
            'icon'        => '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h12v12H4z" stroke="currentColor"/></svg>',
        ],
    ],
];
```

::: warning Icons are not escaped
`icon` is printed as raw HTML. Only pass SVG markup that you wrote yourself, never a value that comes from user input. `label` and `permalink` are escaped for you.
:::

### Choosing the filter

There are two filters, and the difference decides where your item appears:

| Filter | When it runs | Use it to |
|--------|--------------|-----------|
| `fluent_crm/core_menu_items` | After Dashboard, Contacts, Campaigns, Emails, Forms and Automations are built, **before** Reports and Settings | Add an item that sits before Reports. This is the usual choice. |
| `fluent_crm/menu_items` | Last, after everything is built | Reorder or remove any item, including Reports and Settings |

Settings is not shown in the center bar. It always renders as the gear icon on the right.

### Also add it to the WordPress sidebar

FluentCRM also lists its main screens under **FluentCRM** in the WordPress admin sidebar. That list is separate from the top bar, so to add yours there, use the `fluent_crm/after_core_menu_items` action:

```php
add_action('fluent_crm/after_core_menu_items', function ($permissions, $isAdmin) {
    if (!in_array('fcrm_read_contacts', $permissions, true)) {
        return;
    }

    add_submenu_page(
        'fluentcrm-admin',
        __('My Plugin', 'your-plugin'),
        __('My Plugin', 'your-plugin'),
        $isAdmin ? 'manage_options' : 'fcrm_read_contacts',
        'fluentcrm-admin#/my-plugin',
        '__return_null'
    );
}, 10, 2);
```

The page slug `fluentcrm-admin#/my-plugin` sends the click to the `/my-plugin` route inside the FluentCRM app, which is what [Option 2](#option-2-vue-screen) registers.

## Option 2: Vue screen

Here your plugin ships a Vue component and registers it as a route in the FluentCRM app. The menu item from Option 1 links to that route, so the page opens inside FluentCRM with the top bar still visible.

It takes three pieces:

1. **A menu item** (PHP), exactly as in Option 1, with `permalink` set to `$urlBase . 'my-plugin'`.
2. **A route** (JavaScript), added with the `fluentcrm_global_routes` filter.
3. **A script** (PHP), enqueued so it loads before the admin app starts.

### 1. Add the menu item (PHP)

Use the Option 1 code and point `permalink` at your route:

```php
'permalink' => $urlBase . 'my-plugin', // opens #/my-plugin
```

`$urlBase` is the FluentCRM app address, for example `…/wp-admin/admin.php?page=fluentcrm-admin#/`.

### 2. Register the route (JavaScript)

```js
// admin/my-plugin.js
const { addFilter } = window.FLUENTCRM || {};

if (addFilter) {
    addFilter(
        'fluentcrm_global_routes',
        'my-plugin/screen',
        (routes) => routes.concat([
            {
                name: 'my_plugin',
                path: '/my-plugin',
                component: () => import('./MyPlugin.vue'),
                props: true,
                meta: {
                    active_menu: 'my_plugin', // the menu item `key`
                    permission: 'fcrm_read_contacts',
                    side_path: '/my-plugin'
                }
            }
        ])
    );
}
```

| `meta` field | What it does |
|--------------|--------------|
| `active_menu` | Highlights the menu item whose `key` matches. Without it, your item is not marked active on your screen. |
| `permission` | Capability required to open the route. Use the same one you checked in PHP. |
| `side_path` | The path the app treats as the current section |

Guard on `window.FLUENTCRM`: core's boot script creates it, and if that did not run there is nothing useful your script can do. Use a lazy `import()` so the screen becomes its own chunk.

### 3. Build the component

```vue
<!-- MyPlugin.vue -->
<template>
    <div class="my_plugin_screen">
        <h2>{{ $t('My Plugin') }}</h2>
        <el-table :data="rows" v-loading="loading">
            <el-table-column prop="id" label="#" width="80" />
            <el-table-column prop="title" :label="$t('Title')" />
        </el-table>
    </div>
</template>

<script>
import { Rest } from '@fluentcrm/ui';

export default {
    name: 'MyPlugin',
    data() {
        return { loading: true, rows: [] };
    },
    created() {
        Rest.get('my-plugin/items')
            .then((response) => { this.rows = response.items; })
            .finally(() => { this.loading = false; });
    }
};
</script>
```

Use the Options API, matching core. Your own REST routes need a permission check like any other, see [Extending the REST API](/modules/extending-rest-api).

### 4. Enqueue the script (PHP)

```php
add_filter('fluent_crm_asset_listed_slugs', function ($slugs) {
    $slugs[] = 'your-plugin'; // your plugin's folder name
    return $slugs;
});

add_action('fluentcrm_loading_app', function () {
    if (!defined('FLUENTCRM_MODULE_API') || FLUENTCRM_MODULE_API < 1) {
        return; // older core without the shared modules
    }

    wp_enqueue_script(
        'my-plugin-screen',
        plugins_url('assets/admin/my-plugin.js', YOUR_PLUGIN_FILE),
        ['fluentcrm_admin_app_boot'],
        YOUR_PLUGIN_VERSION,
        true
    );
});

// The bundle imports `@fluentcrm/*`, so it must load as an ES module.
add_filter('script_loader_tag', function ($tag, $handle) {
    if ($handle === 'my-plugin-screen') {
        $tag = str_replace('<script ', '<script type="module" ', $tag);
    }
    return $tag;
}, 10, 2);
```

- **Why `fluent_crm_asset_listed_slugs`:** FluentCRM screens run in no-conflict mode and drop every plugin script whose URL is not on an approved list. Without your slug the script is registered and then silently removed.
- **Why `fluentcrm_loading_app`:** it only fires on FluentCRM screens.
- **Why depend on `fluentcrm_admin_app_boot`:** it creates `window.FLUENTCRM`, and your script has to run before the app reads the route filters.
- **Why the `FLUENTCRM_MODULE_API` check:** an older core has no shared modules, and your bundle would fail to resolve its imports and break the whole admin app.
- **Why `type="module"`:** the import map that resolves `@fluentcrm/*` only applies to ES modules, and core adds the module type to its own scripts only.

### Share core's Vue and UI kit

Your bundle must not ship its own copy of Vue or Element Plus. Two copies of Vue on one page break every `<el-*>` component. Core publishes shared modules through an import map instead. Mark these as external in your build and import them by name:

| Import | Provides |
|--------|----------|
| `@fluentcrm/vue` | Vue (use in place of `vue`) |
| `@fluentcrm/element-plus` | Element Plus |
| `@fluentcrm/element-plus-icons` | Element Plus icons |
| `@fluentcrm/ui` | FluentCRM's own helpers and components: `Rest`, `$t`, `hasPermission`, `DataTable`, `PageHeader`, `BaseCard`, `Badge` and more |

In Vite, map the packages to those specifiers with `build.rollupOptions.external` and `output.paths`.

::: warning Stable surface
Names exported from `@fluentcrm/ui` are a public API. New names can be added freely. Removals are announced with a `FLUENTCRM_MODULE_API` version bump, which is why the check in step 4 is worth keeping.
:::

## Hooks and filters

| Name | Where | Purpose |
|------|-------|---------|
| `fluent_crm/core_menu_items` | PHP filter | Add items before Reports and Settings. Receives `$menuItems`, `$permissions`, `$urlBase`. |
| `fluent_crm/menu_items` | PHP filter | Final menu array. Reorder or remove any item. |
| `fluent_crm/after_core_menu_items` | PHP action | Add entries to the WordPress admin sidebar. Receives `$permissions`, `$isAdmin`. |
| `fluent_crm/render_top_menu_bar` | PHP filter | Return `false` to hide the top bar |
| `fluent_crm/menu_url_base` | PHP filter | Change the base URL the menu links are built from |
| `fluentcrm_global_routes` | JS filter | Add top-level routes to the FluentCRM app |
| `fluent_crm_asset_listed_slugs` | PHP filter | Allow your plugin's scripts on FluentCRM screens |

**Source:** `app/Hooks/Handlers/AdminMenu.php` (`getMenuItems()`), `app/Views/admin/new_menu_page.php`, `resources/admin/createFluentCrmApp.js`, `resources/admin/shared/`
