---
title: Update Messaging Campaign
description: "Update a campaign's `title`, `message_content` and (when non-empty) `settings`. Both `title` and `message_content` are required on every call. `settings` **replaces** the stored object wholesale, so send the complete settings, including `template_id` / `template_variables` for WhatsApp. Other fields (`channel`, `sender_number`, `scheduled_at`, `status`) are ignored. `next_step` is stored as the wizard step to reopen at. Does not check the campaign status. Fires `fluent_crm/whatsapp_campaign_updated` or `fluent_crm/sms_campaign_updated`."
outline: false
aside: false
---
<OAOperation operationId="updateMessagingCampaign" specUrl="/openapi/messaging/update-campaign.json" />
