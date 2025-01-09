---
description: "Smart Code is a feature that allows you to create custom merge tags that can be used in your emails. Smart Code is available in the Pro and Enterprise plans."
---

## Smart Code

Smart Code is a feature that allows you to create custom merge tags that can be used in your emails.
Smart Code is available in the Pro and Enterprise plans. Let's look at the example given below:
```php
add_action('fluent_crm/after_init', function () {
    $key = 'your_custom_smartcode_group_key';
    $title = 'Your Custom Smartcode Group Title';
    $shortCodes = [
        'code_4' => 'Code 4 Title',
        'code_5' => 'Code 5 Title',
        // ...
    ];
    $callback = function ($code, $valueKey, $defaultValue, $subscriber) {
        if ($valueKey == 'code_4') {
            return 'Code 4 Value';
        }
        if ($valueKey == 'code_5') {
            return 'Code 5 Value'.$subscriber->email;
        }
        return $defaultValue; // default value works in case of invalid value key
    };

    FluentCrmApi('extender')->addSmartCode($key, $title, $shortCodes, $callback);
});
```

### How it works
The custom section is added via the `addSmartCode` method of the FluentCRM Extender API. This method takes four arguments:

- `$key`: The key is unique identifier to identify smartcode group callback. It is recommended to have your own plugin prefix. 
   For example, if your plugin prefix is `mcp`, then you can use `mcp_your_custom_smartcode_group_key` as the key so that it will not conflict with other smartcode groups.

- `$title`: This is the title of the smartcode Group. This title will be displayed in the smartcode dropdown.

- `$shortCodes`: This is the array of short codes that will be available in the smartcode group. The key is the shortcode and the value is the title of the short code.

- `$callback`: Fourth argument is a callback function which is used to specify the values
that should be returned when the shortcodes are used. If the shortcode is code_4, the callback function will return the value you set which is 'Code 4 Value' in our example.
The callback function has four arguments:
    - `$code`: This is the shortcode that is used in the email. In our example, `$code` will be 
        ::: v-pre 
        `{{your_custom_section_key.code_4}}` 
        :::
    - `$valueKey`: This is the key of the shortcode. For example, if the shortcode is `code_4`, then the `$valueKey` will be `code_4`.
    - `$defaultValue`: This is the default value that will be returned if the `$valueKey` is invalid.
    - `$subscriber`: This is the subscriber object. You can use this object to get the subscriber's data.


