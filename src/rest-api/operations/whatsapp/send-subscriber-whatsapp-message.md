---
title: Send WhatsApp Message to Contact
description: "Send one WhatsApp message to a contact right now through the configured provider, and record it on the contact's thread (a failed attempt is recorded as `failed` with the provider's error in meta). Checks, in order: contact exists, has a `phone`, and has not opted out / bounced on WhatsApp (`fcrm_manage_emails` callers still cannot override consent), then a configured driver."
outline: false
aside: false
---
<OAOperation operationId="sendSubscriberWhatsAppMessage" specUrl="/openapi/whatsapp/send-subscriber-whatsapp-message.json" />
