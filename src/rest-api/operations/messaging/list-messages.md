---
title: List Messaging Messages
description: "The Activities list: every message, inbound and outbound, newest activity first. `channel` is a **filter** here: `sms` or `whatsapp` narrows the list (and the status counts); omit it, or send anything else, to include all channels. The result key is still named `sms` for backward compatibility even though rows can be WhatsApp. `status` and `sms_type` accept comma-separated lists; unknown values are dropped. The `statuses` array carries a count per status for the filter dropdown, limited to `pending`, `sent`, `delivered`, `failed`, `cancelled` and `received` (messages in other states such as `read` or `scheduled` are not counted or filterable here). **PRO** — requires the FluentCampaign Pro Messaging module with at least one channel (SMS or WhatsApp) active."
outline: false
aside: false
---
<OAOperation operationId="listMessagingMessages" specUrl="/openapi/messaging/list-messages.json" />
