---
title: Get Messaging Campaign Status
description: "Delivery status of a campaign (`campaign` or `automation` type). While the campaign is `processing` or `pending-scheduled` the response is an empty shell (`stat: []`, `sent_count: 0`) because messages are still being generated. Otherwise `stat` holds message counts grouped by status and `sent_count` counts messages whose status is exactly `sent`. This GET also flips a `scheduled` campaign whose time has passed to `working`, and adds `campaign.sent_by` (display name and email of the user who started it, or `false`)."
outline: false
aside: false
---
<OAOperation operationId="getMessagingCampaignStatus" specUrl="/openapi/messaging/get-campaign-status.json" />
