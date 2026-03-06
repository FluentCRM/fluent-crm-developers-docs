---
description: "Action hooks related to email campaigns in FluentCRM — creation, scheduling, sending, archiving, and email template design."
---

# Campaign Hooks

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Intermediate" />

These action hooks fire during campaign lifecycle events, email sending, and email template design rendering.

## Campaign Lifecycle

### `fluent_crm/campaign_created`

This action runs after a campaign has been created.

**Parameters**
- `$campaign` [Campaign Model](/database/models/campaign)

**Usage:**
```php
add_action('fluent_crm/campaign_created', function($campaign) {
   // Do your stuff here
});
```

**Source:** `app/Http/Controllers/CampaignController.php`

---

### `fluent_crm/campaign_data_updated`

This action runs after a campaign has been updated.

**Parameters**
- `$campaign` [Campaign Model](/database/models/campaign)
- `$postedData` Array - update data

**Usage:**
```php
add_action('fluent_crm/campaign_data_updated', function($campaign, $postedData) {
   // Do your stuff here
}, 10, 2);
```

**Source:** `app/Http/Controllers/CampaignController.php`

---

### `fluent_crm/update_campaign_compose`

This action fires when the campaign compose/body step is saved.

**Parameters**
- `$data` Array - compose data
- `$campaign` [Campaign Model](/database/models/campaign)

**Usage:**
```php
add_action('fluent_crm/update_campaign_compose', function($data, $campaign) {
   // Campaign body/compose step was saved
}, 10, 2);
```

**Source:** `app/Http/Controllers/CampaignController.php`

---

### `fluent_crm/update_campaign_subjects`

This action fires when the campaign subject step is saved.

**Parameters**
- `$data` Array - subject data
- `$campaign` [Campaign Model](/database/models/campaign)

**Usage:**
```php
add_action('fluent_crm/update_campaign_subjects', function($data, $campaign) {
   // Campaign subject step was saved
}, 10, 2);
```

**Source:** `app/Http/Controllers/CampaignController.php`

---

### `fluent_crm/campaign_deleted`

This action runs after a campaign has been deleted.

**Parameters**
- `$campaignId` INT - deleted campaign ID

**Usage:**
```php
add_action('fluent_crm/campaign_deleted', function($campaignId) {
   // Do your stuff here
});
```

**Source:** `app/Http/Controllers/CampaignController.php`

---

### `fluent_crm/campaign_duplicated`

This action runs after a campaign has been duplicated.

**Parameters**
- `$newCampaign` [Campaign Model](/database/models/campaign) - new Campaign
- `$oldCampaign` [Campaign Model](/database/models/campaign) - original Campaign

**Usage:**
```php
add_action('fluent_crm/campaign_duplicated', function($newCampaign, $oldCampaign) {
   // Do your stuff here
}, 10, 2);
```

**Source:** `app/Http/Controllers/CampaignController.php`

---

### `fluent_crm/campaign_archived`

This action fires when a campaign is archived (either manually or automatically after all emails are sent).

**Parameters**
- `$campaign` [Campaign Model](/database/models/campaign)

**Usage:**
```php
add_action('fluent_crm/campaign_archived', function($campaign) {
   // Campaign was archived
});
```

**Source:** `app/Http/Controllers/CampaignController.php`, `app/Hooks/Handlers/Scheduler.php`

---

## Campaign Sending

### `fluent_crm/campaign_recipients_query_updated`

This action runs when recipients are being updated.

**Parameters**
- `$campaign` [Campaign Model](/database/models/campaign)

**Usage:**
```php
add_action('fluent_crm/campaign_recipients_query_updated', function($campaign) {
   // Do your stuff here
});
```

**Source:** `app/Http/Controllers/CampaignController.php`

---

### `fluent_crm/campaign_scheduled`

This action runs when a campaign is being scheduled for later.

**Parameters**
- `$campaign` [Campaign Model](/database/models/campaign)
- `$scheduleAt` Date Time (Y-m-d H:i:s format)

**Usage:**
```php
add_action('fluent_crm/campaign_scheduled', function($campaign, $scheduleAt) {
   // Do your stuff here
}, 10, 2);
```

**Source:** `app/Http/Controllers/CampaignController.php`

---

### `fluent_crm/campaign_set_send_now`

This action runs when a campaign is set to send immediately.

**Parameters**
- `$campaign` [Campaign Model](/database/models/campaign)

**Usage:**
```php
add_action('fluent_crm/campaign_set_send_now', function($campaign) {
   // Do your stuff here
});
```

**Source:** `app/Http/Controllers/CampaignController.php`

---

### `fluent_crm/campaign_processing_start`

This action runs when emails of a campaign start being processed.

**Parameters**
- `$campaign` [Campaign Model](/database/models/campaign)

**Usage:**
```php
add_action('fluent_crm/campaign_processing_start', function($campaign) {
   // Do your stuff here
});
```

**Source:** `app/Http/Controllers/CampaignController.php`

---

### `fluent_crm/sending_emails_starting`

This action fires at the start of each email sending batch (campaigns, sequences, and automations all use this).

**Parameters**
- `$campaignEmails` Collection - CampaignEmail models being sent in this batch

**Usage:**
```php
add_action('fluent_crm/sending_emails_starting', function($campaignEmails) {
   // A batch of emails is about to be sent
});
```

**Source:** `app/Services/Libs/Mailer/BaseHandler.php`

---

### `fluentcrm_sending_emails_done`

This action fires after a batch of emails has been sent.

**Parameters**
- `$campaignEmails` Collection - CampaignEmail models that were sent

**Usage:**
```php
add_action('fluentcrm_sending_emails_done', function($campaignEmails) {
   // A batch of emails finished sending
});
```

**Source:** `app/Services/Libs/Mailer/BaseHandler.php`

---

## Email Template Design

### `fluent_crm/email_header`

If you want to add your own custom CSS for a specific email template or all email templates then you can use this hook.

**Parameters**
- `$designSlug` String - Design Name (classic | plain | raw_classic | simple | block_editor)

**Usage:**
```php
/*
* Add Custom CSS for plain design type
*/
add_action('fluent_crm/email_header', function($designName) {
   if($designName == 'plain') {
    ?>
    <style>
      h1 {
        color: red !important;
      }
    </style>
    <?php
   }
});
```

**Source:** `app/Views/emails/`
