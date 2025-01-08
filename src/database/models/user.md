---
description: "User model is used to interact with the WordPress user table. This model is used to interact with the WordPress user table."
---

# User Model

| DB Table Name | {wp_db_prefix}_users                                                     |
|---------------|--------------------------------------------------------------------------|
| Schema        | <a :href="$withBase('/database/#fc-subscribers-table')">Check Schema</a> |
| Source File   | fluent-crm/app/Models/User.php                                           |
| Name Space    | FluentCrm\App\Models                                                     |
| Class         | FluentCrm\App\Models\User                                                |

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
         <th>ID</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>user_login</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>user_pass</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>user_nicename</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>user_email</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>user_url</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>user_registered</th>
         <td>Date Time</td>
         <td></td>
      </tr>
      <tr>
         <th>user_activation_key</th>
         <td>String</td>
         <td></td>
      </tr>
      <tr>
         <th>user_status</th>
         <td>Integer</td>
         <td></td>
      </tr>
      <tr>
         <th>display_name</th>
         <td>String</td>
         <td></td>
      </tr>
   </tbody>
</table>

## Usage

Please check <a href="/database/models/">Model Basic</a> for Common methods.

### Accessing Attributes

```php 

$user = FluentCrm\App\Models\User::find(1);

$user->id; // returns id
$user->display_name; // returns user name
.......
```


## Fillable Attributes

```php

'user_pass',
'user_nicename',
'user_email',
'display_name'
```
