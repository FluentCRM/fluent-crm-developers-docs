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