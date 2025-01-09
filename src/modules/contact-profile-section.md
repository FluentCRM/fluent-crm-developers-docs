---
description: "This code adds a custom profile section to the FluentCRM plugin."
---

## Custom Profile Section for FluentCRM
This code adds a custom profile section to the FluentCRM plugin.
```php
add_action('fluent_crm/after_init',  function () {
    $key = 'my_custom_section';
    $sectionTitle = 'My Custom Section';
    $callback = function($contentArr, $subscriber) {
        $contentArr['heading'] = 'Content Heading';
        $contentArr['content_html'] = "
                       <div>
                            <h4>My Content</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
                            dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled ...</p>
                       </div>
               " .$subscriber->email;
        return $contentArr;
    };
    FluentCrmApi('extender')->addProfileSection( $key, $sectionTitle, $callback);
});
```
### How it works
The custom section is added via the `addProfileSection` method of the FluentCRM Extender API. This method takes three arguments:

- `$key`: The key of the custom section which will be used to identify the section. 
  It is recommended to have your own plugin prefix.
  For example, if your plugin prefix is `mcp`, then you can use `mcp_my_custom_section` as the key so that it will not conflict with Profile sections.

- `$sectionTitle`: This is the title of the new section within fluent crm profile sections.

- `callback`: Third argument is a callback function that will be called when the custom section is displayed.
  The function takes two arguments: `$contentArr` and `$subscriber`. `$contentArr` is an array containing the content of the custom section,
  and `$subscriber` is an object representing the subscriber whose profile is being displayed.

The `$contentArr` includes two elements: 
 - `heading`: A string containing the heading for the custom section. This heading will be displayed at the top of the section.
 - `content_html`: A string containing the HTML content of the custom section. This content will be displayed below the heading. 
  You may use any html tags you wish. You will enjoy the flexibility of using any HTML tags to display your custom content.

Finally, the modified `$contentArr` is returned.

The following Image shows the custom section added by the above code:

<img :src="$withBase('/assets/img/modules/custom_profile_section.jpg')" alt="My Custom Section"/>
