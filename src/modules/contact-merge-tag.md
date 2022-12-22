## Smart Code

Smart Code is a feature that allows you to create custom merge tags that can be used in your emails. Smart Code is available in the Pro and Enterprise plans.
```php
add_action('fluentcrm_loaded', function () {
    $key = 'your_custom_section_key';
    $title = 'Your Custom Section Title';
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

- `$title`: This is the title of the smartcode.

- `$shortCodes`: This is the array of short codes that will be created.

- `callback`: Fourth argument is a callback function which is used to specify the values
that should be returned when the shortcodes are used. If the value key is code_4, the callback function will return Code 4 Value. If the value key is code_5, the callback function will return Code 5 Value followed by the subscriber's email address. If an invalid value key is used, the default value will be returned.

