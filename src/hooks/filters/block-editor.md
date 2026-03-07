---
description: "Filter hooks for FluentCRM's block email editor — settings, patterns, capabilities, and allowed blocks."
---

# Block Email Editor Filters

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These filter hooks let you customize FluentCRM's Gutenberg-based block email editor — capabilities, patterns, allowed blocks, and editor settings.

### `fluent_crm/block_editor_required_cap`

Filter the WordPress capability required to access the block email editor.

**Parameters**
- `$capability` String - Required capability slug
- `$blockType` String - Block editor context type
- `$request` Array - Request data

**Usage:**
```php
add_filter('fluent_crm/block_editor_required_cap', function($capability, $blockType, $request) {
    return 'edit_posts'; // Allow editors to use the block email editor
}, 10, 3);
```

**Source:** `app/Hooks/Handlers/FluentBlockEditorHandler.php`

---

### `fluent_crm/new_editor_allowed_block_types`

Filter the array of allowed Gutenberg block type slugs in the CRM email block editor. Use this to enable or disable specific blocks.

**Parameters**
- `$allowedBlocks` Array - Block type slugs (e.g., `core/paragraph`, `core/image`, `core/heading`)

**Usage:**
```php
add_filter('fluent_crm/new_editor_allowed_block_types', function($allowedBlocks) {
    $allowedBlocks[] = 'core/table';
    return $allowedBlocks;
});
```

**Source:** `app/Hooks/Handlers/FluentBlockEditorHandler.php`

---

### `fluent_crm/block_editor_custom_patterns`

Register custom block patterns in the email editor.

**Parameters**
- `$patterns` Array - Default `[]`
- `$context` String - Editor context
- `$data` Array - Request data

**Usage:**
```php
add_filter('fluent_crm/block_editor_custom_patterns', function($patterns, $context, $data) {
    $patterns[] = [
        'name'    => 'my-pattern/hero',
        'title'   => 'Hero Section',
        'content' => '<!-- wp:heading --><h2>Welcome</h2><!-- /wp:heading -->'
    ];
    return $patterns;
}, 10, 3);
```

**Source:** `app/Hooks/Handlers/FluentBlockEditorHandler.php`

---

### `fluent_crm/block_editor_custom_pattern_categories`

Register custom block pattern categories in the email editor.

**Parameters**
- `$categories` Array - Default `[]`
- `$context` String - Editor context
- `$data` Array - Request data

**Usage:**
```php
add_filter('fluent_crm/block_editor_custom_pattern_categories', function($categories, $context, $data) {
    $categories[] = [
        'name'  => 'my-patterns',
        'label' => 'My Custom Patterns'
    ];
    return $categories;
}, 10, 3);
```

**Source:** `app/Hooks/Handlers/FluentBlockEditorHandler.php`

---

### `fluent_crm/block_editor_settings`

Filter the full Gutenberg editor settings array before it is returned to the block editor. This is the most comprehensive hook for customizing the editor experience.

**Parameters**
- `$settings` Array - Complete editor settings object

**Usage:**
```php
add_filter('fluent_crm/block_editor_settings', function($settings) {
    // Customize editor settings
    $settings['__experimentalFeatures']['color']['palette'] = [
        ['name' => 'Brand Blue', 'slug' => 'brand-blue', 'color' => '#0066cc']
    ];
    return $settings;
});
```

**Source:** `app/Hooks/Handlers/FluentBlockEditorHandler.php`

---

### `fluent_crm/block_editor_help_url`

Filter the URL for the Help link in the block email editor.

**Parameters**
- `$url` String - Default `'https://fluentcrm.com/docs/'`

**Usage:**
```php
add_filter('fluent_crm/block_editor_help_url', function($url) {
    return 'https://example.com/email-editor-guide';
});
```

**Source:** `app/Hooks/Handlers/FluentBlockEditorHandler.php`

---

### `fluent_crm/block_editor_unregister_all_patterns`

Control whether all default Gutenberg block patterns are unregistered when the email editor loads. Default `true` (patterns are removed for a cleaner email editing experience).

**Parameters**
- `$unregister` Boolean - Default `true`
- `$context` String - Editor context
- `$data` Array - Request data

**Usage:**
```php
add_filter('fluent_crm/block_editor_unregister_all_patterns', function($unregister, $context, $data) {
    return false; // Keep default Gutenberg patterns
}, 10, 3);
```

**Source:** `app/Hooks/Handlers/FluentBlockEditorHandler.php`

---

### `fluent_crm/theme_pref`

Filter the theme preference defaults (color palette, font sizes) for the email builder.

**Parameters**
- `$prefs` Array - Contains `colors` and `font_sizes` arrays

**Usage:**
```php
add_filter('fluent_crm/theme_pref', function($prefs) {
    $prefs['colors'][] = [
        'name'  => 'Brand Color',
        'slug'  => 'brand',
        'color' => '#FF5733'
    ];
    return $prefs;
});
```

**Source:** `app/Services/Helper.php`

---

## Dynamic Content Blocks

<Badge type="danger" vertical="middle" text="Pro" />

### `fluentcrm/latest_post_blocks_post_types`

Filter available post types for the "Latest Posts" email block.

**Parameters**
- `$postTypes` Array - post type configuration array

**Usage:**
```php
add_filter('fluentcrm/latest_post_blocks_post_types', function($postTypes) {
    $postTypes[] = [
        'value' => 'tutorial',
        'label' => 'Tutorials'
    ];
    return $postTypes;
});
```

**Source:** `fluentcampaign-pro/app/Http/Controllers/DynamicPostDataController.php`

---

### `fluentcrm/latest_post_blocks_taxonomies`

Filter available taxonomies for the "Latest Posts" email block filtering.

**Parameters**
- `$taxonomies` Array - taxonomy definitions

**Usage:**
```php
add_filter('fluentcrm/latest_post_blocks_taxonomies', function($taxonomies) {
    // Add or remove taxonomies for post block filtering
    return $taxonomies;
});
```

**Source:** `fluentcampaign-pro/app/Http/Controllers/DynamicPostDataController.php`

---

### `fluent-crm/woo_product_blocks_taxonomies`

Filter available taxonomies for the "WooCommerce Products" email block.

**Parameters**
- `$taxonomies` Array - taxonomy definitions

**Usage:**
```php
add_filter('fluent-crm/woo_product_blocks_taxonomies', function($taxonomies) {
    // Customize product block taxonomy options
    return $taxonomies;
});
```

**Source:** `fluentcampaign-pro/app/Http/Controllers/DynamicPostDataController.php`
