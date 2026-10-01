---
title: Create Messaging Template
description: "Create a template. For `channel=whatsapp` (default) the payload is validated against Meta's rules (see *Validate*), submitted to the configured provider for review, and stored locally with the status the provider returns (normally `PENDING`; Meta usually reviews within minutes). For `channel=sms` a local reusable text body is stored immediately as `APPROVED`; only `name` (max 192 chars) and `body_text` (max 1600 chars) are used and the name must be unique among non-DISABLED SMS templates."
outline: false
aside: false
---
<OAOperation operationId="createWhatsAppTemplate" specUrl="/openapi/whatsapp/create-whatsapp-template.json" />
