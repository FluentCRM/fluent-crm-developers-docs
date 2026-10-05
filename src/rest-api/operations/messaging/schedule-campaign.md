---
title: Schedule Messaging Campaign
description: "Start a `draft` campaign. Without `scheduled_at` the campaign starts immediately (status `pending-scheduled`, `sending_type = instant`) and message generation is queued at once. With `scheduled_at` it is stored in site-local time and generation is queued five minutes before it (or now, if that is already past). Accepts a Unix timestamp, a `Y-m-d H:i:s` string, or any `strtotime`-parseable string such as ISO-8601. A one-time-audience campaign must have a confirmed consent, and a one-time WhatsApp campaign must have `settings.template_id`. `recipients_count` is reset to 0 and recalculated as messages are generated. Fires `fluent_crm/{channel}_campaign_status_active` and, when scheduled, `fluent_crm/{channel}_campaign_scheduled`."
outline: false
aside: false
---
<OAOperation operationId="scheduleMessagingCampaign" specUrl="/openapi/messaging/schedule-campaign.json" />
