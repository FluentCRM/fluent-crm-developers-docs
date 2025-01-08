---
description: "Learn about the Url Store Model in FluentCRM, which allows you to store and manage URLs for campaigns and automation"
---

# Url Store Model

| DB Table Name | {wp_db_prefix}_fc_url_stores                                                   |
|---------------|--------------------------------------------------------------------------|
| Schema        | <a :href="$withBase('/database/#fc-subscribers-table')">Check Schema</a> |
| Source File   | fluent-crm/app/Models/UrlStores.php                                      |
| Name Space    | FluentCrm\App\Models                                                     |
| Class         | FluentCrm\App\Models\UrlStores                                           |

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
         <td></td>
      </tr>
      <tr>
         <th>short</th>
         <td>String</td>
         <td></td>
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
$urlStore->url; // returns url
.......
```


## Fillable Attributes

```php

'url',
'short'
```


## Methods
Along with Global Model methods, this model has few helper methods.

### getUrlSlug($longUrl)
Create short url from long url

- Parameters
    - $longUrl `string`
- Returns `string`

#### Usage
```php 
$shortUrl = FluentCrm\App\Models\UrlStores::getUrlSlug('https://www.google.com');
```

### getRowByShort($short)
Get UrlStore object by url short

- Parameters
    - $short `string`
- Returns `FluentCrm\App\Models\UrlStores`

#### Usage
```php 
$urlStore = FluentCrm\App\Models\UrlStores::getRowByShort('12x');
```