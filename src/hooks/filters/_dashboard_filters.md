<explain-block title="fluent_crm/dashboard_stats">
If you want to add or remove dashboard stats cards then you can use this filter.

**Parameters**

- `$stats` Array - Dashboard stats cards as containing each `stat`

```php
$stat = [
    'title' => 'Stat Title',
    'count' => 1234,
    'route' => [
        'name' => 'dashboard' // fluentcrm route to reditect once click. Leave blank if not route
    ]
];
```

**Usage:**

```php 
/*
* Add Own Stat
*/
add_filter('fluent_crm/dashboard_stats', function($stats) {
   $stats['my_stat_key'] = [
        'title' => 'Stat Title',
        'count' => 1234
   ];
   return $stats;
});
```
</explain-block>

<explain-block title="fluent_crm/quick_links">
if you want to customize quick links of FluentCRM Dashboard then use this hook.

**Parameters**

- `$links` Array - Dashboard stats cards as containing each `$link`

```php
$link = [
    'title' => 'Link Title',
    'url'   => 'https://domain.com/path-to-link',
    'icon'  => 'el-icon-user' // optional
]; 
```

**Usage:**

```php 
/*
* Add Own Link
*/
add_filter('fluent_crm/quick_links', function($links) {
   $links[] = [
        'title' => 'Link Title',
        'url'   => 'https://domain.com/path-to-link',
        'icon'  => 'el-icon-user' // optional
   ];
   return $links;
});
```
</explain-block>

<explain-block title="fluent_crm/dashboard_notices">
If you want to show notices to FluentCRM admin panel then you may use this hook.

**Parameters**

- `$notices` Flat Array

**Usage:**

```php 
/*
* Add Custom Notice
*/
add_filter('fluent_crm/dashboard_notices', function($notices) {
   $notices[] = '<p>My Custom Notice Here</p>';
   return $notices;
});
```
</explain-block>

<explain-block title="fluent_crm/sales_stats">
If you want to add custom sales stats on FluentCRM Dashboard widget then use this hook.


**Parameters**

- `$stats` Array

**Usage:**

```php 
/*
* Add Custom Sales Stat
*/
add_filter('fluent_crm/sales_stats', function($stats) {
  $stats[] = [
        'title' => 'Custom Stat Title',
        'content' => 'Stat Content'
  ];
  
  return $stats;
});
```
</explain-block>
