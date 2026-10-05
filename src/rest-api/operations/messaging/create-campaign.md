---
title: Create Messaging Campaign
description: "Create a campaign in `draft` status. `title` and `message_content` are required. `message_content` is passed through `wp_kses`, so only `<a href title target>` tags survive. The channel is taken from `channel` (`sms` or `whatsapp`; any other value or none falls back to `sms`) and cannot be changed afterwards. Counters and status come from model defaults; if `settings` is omitted it is initialised to a list/tag audience of everyone with `sending_filter = list_tag`. For a WhatsApp template campaign put `template_id` and `template_variables` inside `settings`. Fires `fluent_crm/whatsapp_campaign_created` or `fluent_crm/sms_campaign_created`. **PRO** — requires the FluentCampaign Pro Messaging module with at least one channel (SMS or WhatsApp) active."
outline: false
aside: false
---
<OAOperation operationId="createMessagingCampaign" specUrl="/openapi/messaging/create-campaign.json" />
