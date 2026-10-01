---
title: List Messaging Campaigns
description: "Paginated list of campaigns of `type = campaign`, newest first by default. Unlike most messaging routes, `channel` here is a **filter**: omit it to list campaigns of every channel, pass `sms` or `whatsapp` to narrow. Any other value is used as-is as a filter and matches nothing. With `with[]=stats` each row also carries `next_step` and its `labels`. **PRO** — requires the FluentCampaign Pro Messaging module with at least one channel (SMS or WhatsApp) active."
outline: false
aside: false
---
<OAOperation operationId="listMessagingCampaigns" specUrl="/openapi/messaging/list-campaigns.json" />
