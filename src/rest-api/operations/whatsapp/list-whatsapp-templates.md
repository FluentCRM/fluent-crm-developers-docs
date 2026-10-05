---
title: List Messaging Templates
description: "List the template catalogue stored in `fc_message_templates` (newest first) together with review-status counts. Despite the `whatsapp/` prefix the catalogue is shared by channels: `channel` defaults to `whatsapp`, and `sms` or `all` return the local SMS text templates as well. Rows of every provider are returned; each carries `is_selectable` / `disabled_reason`, and only templates of the currently configured provider are selectable."
outline: false
aside: false
---
<OAOperation operationId="listWhatsAppTemplates" specUrl="/openapi/whatsapp/list-whatsapp-templates.json" />
