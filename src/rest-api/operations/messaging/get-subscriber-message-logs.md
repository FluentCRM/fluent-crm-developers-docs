---
title: Get Subscriber Message Logs
description: "Paginated message history of one contact on one channel, for the contact-profile SMS / WhatsApp tabs. It reads the contact's thread on the channel; a contact never messaged on that channel simply gets an empty list. Rows are sorted by the effective time (`sent_at`, else `scheduled_at`, else `created_at`) then ID, in `order`. A missing contact returns HTTP 422 with `code: 404` in the body (the controller passes 404 inside the payload, not as the HTTP status). Replaces `GET /sms/subscribers/{id}/logs`. **PRO** (FluentCampaign Pro Messaging module)."
outline: false
aside: false
---
<OAOperation operationId="getMessagingSubscriberLogs" specUrl="/openapi/messaging/get-subscriber-message-logs.json" />
