---
title: List Message Threads
description: "List conversations for the Inbox rail, newest activity first (ordered by `updated_at` DESC, then `id` DESC). A thread is one phone number on one channel. Consent-only threads (created by recording an opt-out for a number that was never messaged, `initiated_by = system` with no messages) are hidden until a real message lands on them. Each row includes a `last_message` preview and a derived WhatsApp `session` (24-hour window; computed for the whole page in a single query)."
outline: false
aside: false
---
<OAOperation operationId="listMessagingThreads" specUrl="/openapi/messaging/list-message-threads.json" />
