---
description: "Learn about the Url Store Model in FluentCRM, which stores shortened URLs for email click tracking."
---

# Url Store Model

| DB Table Name | {wp_db_prefix}_fc_url_stores                                              |
|---------------|---------------------------------------------------------------------------|
| Schema        | <a href="/database/#fc-url-stores-table">Check Schema</a>   |
| Source File   | fluent-crm/app/Models/UrlStores.php                                       |
| Name Space    | FluentCrm\App\Models                                                      |
| Class         | FluentCrm\App\Models\UrlStores                                            |

## Attributes
<table class="nowrap">
   <thead>
      <tr>
         <th>Attribute</th>
         <td>Data Type</td>
         <td>Comment</td>
      </tr>
   </thead>
   <tbody>
      <tr>
         <th>id</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>url</th>
         <td>Text</td>
         <td>The original full URL</td>
      </tr>
      <tr>
         <th>short</th>
         <td>String</td>
         <td>Short encoded slug for tracking</td>
      </tr>
      <tr>
         <th>created_at</th>
         <td>Date Time</td>
         <td></td>
      </tr>
      <tr>
         <th>updated_at</th>
         <td>Date Time</td>
         <td></td>
      </tr>
   </tbody>
</table>

## Usage
Please check <a href="/database/models/">Model Basic</a> for Common methods.


### Accessing Attributes

```php

$urlStore = FluentCrm\App\Models\UrlStores::find(1);

$urlStore->id; // returns id
$urlStore->url; // returns the full URL
$urlStore->short; // returns the short slug
```


## Methods
All methods are static.

### getUrlSlug($longUrl) <Badge type="tip" text="static" />
Look up or create a short slug for a URL. Normalizes the URL (strips zero-width spaces, decodes HTML entities) and uses an in-memory cache.

- Parameters
    - $longUrl `string`
- Returns `string` — the short slug

#### Usage
```php
$short = FluentCrm\App\Models\UrlStores::getUrlSlug('https://www.example.com/page');
```

### getNextShortUrl($num) <Badge type="tip" text="static" />
Generate a base-36 style encoded short string from a number

- Parameters
    - $num `int`
- Returns `string`

#### Usage
```php
$short = FluentCrm\App\Models\UrlStores::getNextShortUrl(100001);
```

### getRowByShort($short) <Badge type="tip" text="static" />
Look up a UrlStores record by its short slug (case-sensitive BINARY match)

- Parameters
    - $short `string`
- Returns `object` or `null`

#### Usage
```php
$urlStore = FluentCrm\App\Models\UrlStores::getRowByShort('12x');
```
