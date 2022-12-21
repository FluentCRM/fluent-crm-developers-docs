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
This code adds a custom section to the FluentCRM plugin. The custom section is identified by the key `your_custom_section_key` and has a title of `Your Custom Section Title`.

The custom section includes two shortcodes: `code_4` and `code_5`. These shortcodes have titles of `Code 4 Title` and `Code 5 Title`, respectively.

The `$callback` function is used to specify the values that should be returned when the shortcodes are used. If the value key is `code_4`, the callback function will return `Code 4 Value`. If the value key is `code_5`, the callback function will return `Code 5 Value` followed by the subscriber's email address. If an invalid value key is used, the default value will be returned.

To add the custom section to FluentCRM, the `addSmartCode` method of the FluentCRM Extender API is called with the key, title, shortcodes, and callback function as arguments. This action is triggered by the `fluentcrm_loaded` action hook.