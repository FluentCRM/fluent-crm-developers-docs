---
title: List Thread Messages
description: "Messages of one conversation, **oldest first** within the returned window, together with the thread (including the contact's list and tag titles). The newest `per_page` messages are returned; to page backwards through history pass `before=<oldest message id you have>` and the next older window comes back. `has_more` tells you whether anything older exists. Message time is `sent_at`, falling back to `scheduled_at` then `created_at`. **PRO** (FluentCampaign Pro Messaging module)."
outline: false
aside: false
---
<OAOperation operationId="listMessagingThreadMessages" specUrl="/openapi/messaging/list-thread-messages.json" />
