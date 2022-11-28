# FluentCRM Action Hooks

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

FluentCRM has many interesting filter hooks that let developers change default settings and even extend FluentCRM with
new functionality.

## What are Action Hooks

Action hooks are used to run custom code when certain events occur.

## Available of Action Hooks in FluentCRM

<div class="listed_internals">

### Contact / Subscriber Specific

* do_action('`fluentcrm_contact_created`', $subscriber);
* do_action('`fluentcrm_contact_updated`', $subscriber);
* do_action( '`fluentcrm_contact_added_to_tags`', $attachedTagIds, $subscriber)
* do_action( '`fluentcrm_contact_added_to_lists`', $attachedListIds, $subscriber)
* do_action( '`fluentcrm_contact_removed_from_tags`', $detachedTagIds, $subscriber)
* do_action( '`fluentcrm_contact_removed_from_lists`', $detachedListIds, $subscriber)
* do_action('`fluentcrm_subscriber_status_to_{$new_status}`', $subscriber, $oldStatus); // status values: subscribed |
  unsubscribed | pending | bounced | complained
* do_action('`fluentcrm_subscriber_unsubscribed_from_web_ui`', $subscriber, $postedData);
* do_action('`fluentcrm_subscribed_confirmed_via_double_optin`', $subscriber);
* do_action('`fluentcrm_subscriber_contact_type_to_{$new_type}`', $subscriber, $oldType); // type values: lead /
  customer

#### Data Types Explanations

| Variable         | Data Type                                                                        | Comment     |
|------------------|----------------------------------------------------------------------------------|-------------|
| $subscriber      | <a href="/database/models/subscriber/">FluentCrm\App\Models\Subscriber Model</a> |             |
| $attachedTagIds  | array of tag ids                                                                 | EX: [1,2,3] |
| $attachedListIds | array of lists ids                                                               | EX: [1,2,3] |
| $detachedTagIds  | array of tag ids                                                                 | EX: [1,2,3] |
| $detachedListIds | array of list ids                                                                | EX: [1,2,3] |
| $postedData      | array of posted data from web UI                                                 | |
| other variables  | all other mentioned variables are string                                         | |

### Fluent Forms - Contact Specific

* do_action('`fluentcrm_contact_added_by_fluentform`', $subscriber, $entry, $form, $feed);
* do_action('`fluentcrm_contact_updated_by_fluentform`', $subscriber, $entry, $form, $feed);


### Contact Activity Specifics

* do_action('`fluencrm_benchmark_link_clicked`', $benchmarkActionId, $currentContact);
* do_action('`fluentcrm_smartlink_clicked`', $smartLinkSlug);
* do_action('`fluentcrm_email_url_clicked`', $campaignEmail, $urlData);
* do_action('`fluentform_track_activity_by_subscriber`', $subscriberOrSubscriberId);
* do_action('`fluent_crm/pref_form_self_contact_updated`', $subscriber, $postedData);

### List Specifics

* do_action('`fluentcrm_list_created`', $listId);
* do_action('`fluentcrm_list_updated`', $listId);
* do_action('`fc_list_deleted`', $listId);

### Tag Specifics

* do_action('`fluentcrm_tag_created`', $tagId);
* do_action('`fluentcrm_tag_updated`', $tagId);
* do_action('`fc_tag_deleted`', $tagId);

### Email Template Specific

* do_action('`fluent_crm/email_template_created`', $templateId, $templateData);
* do_action('`fluent_crm/email_template_duplicated`', $newTemplateId, $template);
* do_action('`fluent_crm/email_template_updated`', $templateData, $oldTemplate);

### Email Campaign Specific

* do_action('`fluent_crm/campaign_created`', $campaign);
* do_action('`fluent_crm/campaign_data_updated`', $campaign, $postedData);
* do_action('`fluentcrm_campaign_deleted`', $campaignId);
* do_action('`fluent_crm/campaign_duplicated`', $campaign, $oldCampaign);
* do_action('`fluent_crm/campaign_recipients_query_updated`', $campaign);
* do_action('`fluent_crm/campaign_scheduled`', $campaign, $scheduleAt);
* do_action('`fluent_crm/campaign_set_send_now`', $campaign);
* do_action('`fluent_crm/campaign_processing_start`', $campaign);

### Automation Funnel Specific

* do_action('`fluent_crm/automation_funnel_start`', $funnel, $subscriber);
* do_action('`fluent_crm/automation_funnel_completed`', $funnel, $subscriber);

### Admin App & View Specific

* do_action('`fluent_crm/admin_app`'); // After Main FluentCRM Admin View

### Email Template Specific

* do_action('`fluentform_email_header`', $designSlug); // $designSlug = classic | plain | raw_classic | simple

### Double Optin Confirmation Page Actions

* do_action('`fluentcrm_confirmation_head`', $subscriber); // just after wp_head (between <span><</span>
  head> <span><</span>/head>)
* do_action('`fluentcrm_confirmation_head_footer`', $subscriber); // After footer

### Manage Subscriptions Page Actions

* do_action('`fluentcrm_confirmation_head`', $subscriber); // just after wp_head (between <span><</span>
  head> <span><</span>/head>)
* do_action('`fluentcrm_confirmation_footer`', $subscriber); // After footer

### Unsubscribe Page Actions

* do_action('`fluentcrm_unsubscribe_head`', $subscriber, $campaignEmail);
* do_action('`fluentcrm_before_unsubscribe_form`', $subscriber, $campaignEmail);
* do_action('`fluentcrm_before_unsubscribe_submit`', $campaignEmail);
* do_action('`fluentcrm_after_unsubscribe_content`', $subscriber, $campaignEmail)
* do_action('`fluentcrm_unsubscribe_footer`', $subscriber, $campaignEmail)

### View On Browser Page Actions

* do_action('`fluentcrm_view_on_browser_head`');
* do_action('`fluentcrm_view_on_browser_after_email_heading`', $email);
* do_action('`fluentcrm_view_on_browser_before_email_body`');
* do_action('`fluentcrm_view_on_browser_after_email_body`');
* do_action('`fluentcrm_view_on_browser_footer`', $email);

</div>
