---
title: Get Contact WhatsApp Messages
description: "Paginated WhatsApp conversation history for one contact, read from the contact's WhatsApp thread (`fc_message_threads` / `fc_messages`). A contact with no WhatsApp thread returns an empty page, not an error, and the contact ID is not checked for existence. Default order is **oldest first** (the chat panel loads the last page for the newest messages and pages backwards); pass `order=desc` for newest first. Ordering uses `COALESCE(sent_at, created_at)` with the ID as tie-break."
outline: false
aside: false
---
<OAOperation operationId="getSubscriberWhatsAppMessages" specUrl="/openapi/whatsapp/get-subscriber-whatsapp-messages.json" />
