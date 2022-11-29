# FluentCRM Filter Hooks

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

FluentCRM has many interesting filer hooks that let developers change default settings and even extend FluentCRM with new functionality.

## What are Filter Hooks

A hook is a feature that allows developers to manipulate functionality without modifying core files. A hook can help developers inject some functions or edit default settings.

Filter hooks are used to return modified values for certain parameters, based on different factors.

## Available Filter Hooks



------
apply_filters('fluent_crm/disable_global_search', false)
apply_filters('fluent_crm/comment_form_subscribe_settings', $settings)
apply_filters('fluent_crm/unsubscribe_texts', [
'heading'             => __('Unsubscribe', 'fluent-crm'),
'heading_description' => __('We\'re sorry to see you go!', 'fluent-crm'),
'email_label'         => __('Your Email Address', 'fluent-crm'),
'reason_label'        => __('Please let us know a reason', 'fluent-crm'),
'button_text'         => __('Unsubscribe', 'fluent-crm')
], $subscriber)

apply_filters('fluent_crm/unsubscribe_reasons', [
'no_loger'             => __('I no longer want to receive these emails', 'fluent-crm'),
'never_signed_up'      => __('I never signed up for this email list', 'fluent-crm'),
'emails_inappropriate' => __('The emails are inappropriate', 'fluent-crm'),
'emails_spam'          => __('The emails are spam', 'fluent-crm'),
'other'                => __('Other (fill in reason below)', 'fluent-crm')
])
apply_filters('fluent_crm/unsub_response_message', $message, $subscriber)
apply_filters('fluent_crm/unsub_redirect_url', $redirect, $subscriber)
apply_filters('fluent_crm/will_use_cookie', true)
apply_filters('fluent_crm/double_optin_options', $config, $subscriber)
apply_filters('fluent_crm/parse_campaign_email_text', $string, $subscriber)
apply_filters('fluent_crm/incoming_webhook_data', $postData, $webhook, $this->request)
apply_filters('fluent_crm/webhook_contact_data', $data, $postData, $webhook)
apply_filters('fluent_crm/will_auto_unsubscribe', 'no')
apply_filters('fluent_crm/web_email_footer_text', $footerText, $email)
apply_filters('fluent_crm/pref_labels', [
'first_name'      => __('First Name', 'fluent-crm'),
'last_name'       => __('Last Name', 'fluent-crm'),
'prefix'          => __('Title', 'fluent-crm'),
'email'           => __('Email', 'fluent-crm'),
'phone'           => __('Phone/Mobile', 'fluent-crm'),
'dob'             => __('Date of Birth', 'fluent-crm'),
'address_line_1'  => __('Address Line 1', 'fluent-crm'),
'address_line_2'  => __('Address Line 2', 'fluent-crm'),
'city'            => __('City', 'fluent-crm'),
'state'           => __('State', 'fluent-crm'),
'postal_code'     => __('ZIP Code', 'fluent-crm'),
'country'         => __('Country', 'fluent-crm'),
'update'          => __('Update info', 'fluent-crm'),
'address_heading' => __('Address Information', 'fluent-crm'),
'list_label'      => __('Mailing List Groups', 'fluent-crm'),
]);
apply_filters('fluent_crm/pref_form_fields', $formFields, $subscriber)
apply_filters('fluent_crm/countries', [])
apply_filters('fluent_crm/woo_purchase_sidebar_html', '', $subscriber, $page)
apply_filters('fluent_crm/edd_purchase_sidebar_html', '', $subscriber, $page)
apply_filters('fluent_crm/dashboard_notices', [])
apply_filters('fluent_crm/sales_stats', [])
apply_filters('fluent_crm/saas_migrators', [
    'mailchimp'      => (new MailChimpMigrator())->getInfo(),
    'ConvertKit'     => (new ConvertKitMigrator())->getInfo(),
    'MailerLite'     => (new MailerLiteMigrator())->getInfo(),
    'Drip'           => (new DripMigrator())->getInfo(),
    'ActiveCampaign' => (new ActiveCampaignMigrator())->getInfo()
])
apply_filters('fluent_crm/advanced_report_providers', [])
apply_filters('fluent_crm/funnel_seq_delay_in_seconds', $waitTimes, $settings)
apply_filters('fluent_crm/is_simulated_mail', false, $data, $headers)
apply_filters('fluent_crm/double_optin_email_body', $emailBody, $subscriber)
apply_filters('fluent_crm/double_optin_email_subject', $emailSubject, $subscriber)
apply_filters('fluent_crm/enable_unsub_header', true, $data)
apply_filters('fluent_crm/email_headers', $headers, $data)
apply_filters('fluent_crm/enable_mailer_to_name', true)
apply_filters('fluent_crm/user_permissions', $permissions, $user)
apply_filters('fluent_crm/dashboard_stats', $data)
apply_filters('fluent_crm/quick_links', $links)
apply_filters('fluent_crm/show_unsubscribe_on_pref', false)
apply_filters('fluent_crm/anonymize_ip', false)
do_action('fluent_crm/contact_email_changed', $subscriber, $oldEmail);

apply_filters('fluent_crm/default_email_design_template', 'simple')
apply_filters('fluent_crm/contact_name_prefixes', $prefixes)
