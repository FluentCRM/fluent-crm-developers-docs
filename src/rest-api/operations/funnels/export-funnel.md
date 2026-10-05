---
title: Export Automation
description: "Download an automation (funnel) with its sequences as importable JSON (`<title>-<id>.json`). Requires the `manage_options` WordPress capability — stricter than the rest of the funnel routes. Submit as a form with a `_wpnonce` REST nonce; the server streams the file and ends the request."
outline: false
aside: false
---
<OAOperation operationId="exportFunnel" specUrl="/openapi/funnels/export-funnel.json" />
