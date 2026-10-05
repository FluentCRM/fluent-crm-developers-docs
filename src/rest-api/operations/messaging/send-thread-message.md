---
title: Send Thread Message
description: "Send a message into an existing conversation from the Inbox, on the thread's own channel. The send runs inline (no queue); the message row is written as `pending` before the provider is called and updated to `sent` or `failed`, so a request that dies leaves a record. On a provider failure the response is 422 and still carries `sent_message` (with `status: failed` and `error_message`)."
outline: false
aside: false
---
<OAOperation operationId="sendMessagingThreadMessage" specUrl="/openapi/messaging/send-thread-message.json" />
