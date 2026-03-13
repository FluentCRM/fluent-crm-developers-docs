---
description: "Action hooks for email sequences and recurring campaigns in FluentCRM Pro — sequence completion, deletion, and recurring mail creation."
---

# Sequences & Recurring Campaign Hooks

<Badge type="danger" vertical="top" text="FluentCRM Pro" /> <Badge type="warning" vertical="top" text="Intermediate" />

These action hooks fire during email sequence lifecycle events and recurring campaign operations. All hooks on this page require FluentCRM Pro.

## Email Sequences

### `fluentcrm_email_sequence_completed`

Fires when a subscriber completes all emails in a sequence. Useful for triggering post-sequence actions or tracking completion.

**Parameters**
- `$subscriberId` INT - Subscriber ID
- `$campaignId` INT - Sequence campaign ID

**Usage:**
```php
add_action('fluentcrm_email_sequence_completed', function($subscriberId, $campaignId) {
    // Subscriber finished the email sequence
    $subscriber = FluentCrmApi('contacts')->getContact($subscriberId);
    // Trigger post-sequence logic
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Models/Sequence.php`, `fluentcampaign-pro/app/Hooks/Handlers/EmailScheduleHandler.php`

---

### `fluent_crm/sequence_reapplied`

Fires when a sequence is re-applied to subscribers (e.g., for recurring enrollment).

**Parameters**
- `$data` Array - contains `sequence_id`, `next_execution_time`, and `next_sequence_id`

**Usage:**
```php
add_action('fluent_crm/sequence_reapplied', function($data) {
    // $data['sequence_id'] - the sequence being re-applied
    // $data['next_execution_time'] - when the next email fires
    // $data['next_sequence_id'] - next email ID in the sequence
});
```

**Source:** `fluentcampaign-pro/app/Models/Sequence.php`

---

### `fluentcrm_sequence_deleted`

Fires when an email sequence is deleted.

**Parameters**
- `$sequenceId` INT - deleted sequence ID

**Usage:**
```php
add_action('fluentcrm_sequence_deleted', function($sequenceId) {
    // Clean up related data
});
```

**Source:** `fluentcampaign-pro/app/Http/Controllers/SequenceController.php`

---

### `fluentcrm_sequence_email_deleted`

Fires when a specific email within a sequence is deleted.

**Parameters**
- `$emailId` INT - deleted sequence email ID

**Usage:**
```php
add_action('fluentcrm_sequence_email_deleted', function($emailId) {
    // Individual sequence email was removed
});
```

**Source:** `fluentcampaign-pro/app/Http/Controllers/SequenceMailController.php`

---

## Recurring Campaigns

### `fluent_crm/recurring_mail_created`

Fires when a new mail instance is generated from a recurring campaign.

**Parameters**
- `$recurringMail` Campaign Model - the generated mail
- `$campaign` Campaign Model - the parent recurring campaign

**Usage:**
```php
add_action('fluent_crm/recurring_mail_created', function($recurringMail, $campaign) {
    // A new recurring mail was generated
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Hooks/Handlers/RecurringCampaignHandler.php`

---

### `fluent_crm/recurring_mail_created_as_draft`

Fires when a recurring mail is generated in draft status (requires manual review before sending).

**Parameters**
- `$recurringMail` Campaign Model - the generated draft mail
- `$campaign` Campaign Model - the parent recurring campaign

**Usage:**
```php
add_action('fluent_crm/recurring_mail_created_as_draft', function($recurringMail, $campaign) {
    // Notify admin to review the draft
}, 10, 2);
```

**Source:** `fluentcampaign-pro/app/Hooks/Handlers/RecurringCampaignHandler.php`
