# Developer Docs Audit — October 2026

Scope: the whole `dev-docs` repo, checked against FluentCRM (free) and FluentCampaign Pro as they are in the working trees. Method: route table dump + static route parse, controller/policy reflection, hook-name and table-name diffs against the code, and a full `vitepress build` (dead links fail it).

Legend: **Fixed** = changed in this pass. **Open** = found, not changed (needs a decision or is out of scope).

## 1. Try-it playground did not accept a website — Fixed

**Cause.** Every spec declares the server as `https://{website}/wp-json/fluent-crm/v2`. `vitepress-openapi` 0.1.15 lists server URLs but does not expand server variables, so the playground sent requests to the literal host `{website}`. The old `fetch` shim in `theme/index.js` rewrote the host from a `localStorage` key (`fluentcrm-api-server`) that nothing in the site ever set.

**Fix.**
- `theme/apiSite.js` — normalises what the reader types (`example.com`, `http://localhost:10010`, a full URL, a pasted `/wp-json/...` URL), stores it, and rewrites playground URLs.
- `components/ApiSiteBar.vue` — a "Try it on your website" box above every operation page.
- `theme/index.js` — uses both, and rejects with a clear message if no site was entered.

**Open.** The browser sends the request, so the target site must answer cross-origin requests (CORS) including the `Authorization` header. WordPress does not do that by default; the REST index page now says so and suggests `curl` for local sites. Code samples still show `YourWebsite.com`.

> **Scope decision (later in this pass).** The published Messaging reference was narrowed to primary operations: 12 `messaging/` + 4 `whatsapp/` pages (send, templates, history, campaign create/update/schedule/status). The other 36 routes (pause/resume/unschedule, bulk actions, duplicate, one-time audience, consent, migration, inbox housekeeping, template sync/validate/delete, WhatsApp stats/session) are listed in `dev/rest-docs/intentionally-undocumented.json`. The Messaging Channels developer page and the custom SMS/WhatsApp driver docs (`register_*_providers`, custom provider webhooks) were removed because the drivers are not tested yet. Numbers in the table below describe the full pass before that cut; the SMS and WhatsApp channel settings pages (5 routes under `campaign-pro-settings`) were removed as well; documented total is now 369.

## 2. SMS module became Messaging (+ WhatsApp) — Fixed

Pro replaced `sms/*` with `messaging/*` and `whatsapp/*` (`Modules/Messaging/Http/messaging_api.php`).

| | Before | After |
|---|---|---|
| Old `sms/` specs and pages | 25 | removed |
| `messaging/` | — | 43 (inbox threads, migration, per-contact logs/stats/consent/send, campaigns incl. one-time audience, activity log) |
| `whatsapp/` | 9 (written against the old layout) | 9, re-verified and rewritten |
| `pro-settings/` SMS + WhatsApp | 5, partly stale | 5 re-verified |
| Total documented operations | 363 | 410 |

Corrections to the older WhatsApp pages: they named the SMS module and `SMSPolicy`, gave `fcrm_read_emails` for every route (real capabilities differ per route), documented a `components` send field that does not exist, and invented `session_type` / `message_count` fields.

Tooling (`dev/rest-docs`): reads `messaging_api.php`, resolves the real policy classes instead of a hard-coded override, handles `Policy@method` handlers (this had left two bulk-action routes unresolved), and says "Messaging" in generated access notes.

### Behaviour in Pro worth a look (documented as-is)

These are not docs bugs; they are in the plugin code. Worth a ticket each.

1. `sendError()` defaults to HTTP 422, so many "not found" / "bad status" cases return 422 with `code: 404` only in the body (campaign pause/resume/unschedule, resend, delete messages, subscriber logs/stats/send, WhatsApp stats).
2. `POST /messaging/threads/{id}/messages` does not check consent, so it can message an unsubscribed number; the per-contact send does.
3. `MessagePolicy::delete()` (campaign delete) and `sendCustomMessage()` skip the `hasActiveMessagingChannel()` gate every other route has.
4. `GET /campaign-pro-settings/sms` and `/whatsapp-settings` return provider credentials unmasked, and both saves reset any provider credential omitted from the request (a partial save wipes the rest).
5. `schedule` fires the status-active hook and clears the queue before validating `scheduled_at`.
6. `GET /messaging/campaigns/{id}/status` mutates data (flips an overdue `scheduled` campaign to `working`).
7. `GET /messaging/messages` returns rows under the key `sms` for every channel; its `statuses` counts omit `read`, `scheduled`, `processing`, `paused`.
8. User-facing strings still say "SMS Campaign created" for WhatsApp campaigns.
9. `PUT /messaging/campaigns/{id}` lacks the `->int('id')` constraint its siblings have; `per_page` on `/subscribers/{id}/logs` is unclamped.
10. `GET /messaging/migration` returns only `total`, `migrated`, `remaining`, despite a docblock promising a status.

## 3. Rest of the REST reference — Fixed

- **Undocumented routes.** 10 routes had no page: nine `POST /exports/*` attachment endpoints (Pro) and `POST /funnels/{id}/export`. All now documented (nonce-gated, stream a file, `manage_options` for the funnel export).
- **Parameter / response drift.** Fixed: `POST /ai/models` (`settings.api_key` for OpenRouter), `GET /setting/experiments/campaigns` (`searchBy`, `limit`, `include_ids`; wrong column list), bulk contacts (`custom_field.operation`), bulk templates (`search`), the license-status response (ten missing keys, one phantom `activation_hash`), abandon-cart settings (provider keys are conditional).
- **Index page.** Counts (410 endpoints / 33 modules), Messaging and WhatsApp rows, Pro Settings description, Try-it and Extending sections.
- **Gates.** `bash dev/rest-docs/run.sh` — coverage 410/410, 0 parameter gaps, 0 response gaps.

## 4. "Extending the REST API" moved under REST API — Fixed

`modules/{extending-rest-api,rest-api-routing,rest-api-controllers,rest-api-policies}.md` → `rest-api/extending/{index,routing,controllers,policies}.md`. It has its own sidebar group (emitted by `generate-sidebar.py`, so it survives regeneration), the top nav "REST API" is now a dropdown (API Reference / Authentication / Extending), and `public/_redirects` 301s the four old URLs. Internal links updated; the hard-coded "226 routes" claim removed.

## 5. Hooks, functions, CLI, getting-started — Fixed

| Where | Problem | Change |
|---|---|---|
| `hooks/{actions,filters}/sms.md`, `webhooks-and-integrations.md` | Source paths in the deleted `Modules/SMS/` tree; example `use` lines with the old namespace (examples would not load) | Real `Modules/Messaging/...` paths and namespaces |
| `hooks/actions/sms.md` | Warning said the WhatsApp channel is feature-flagged off and the hook never fires | Removed; `register_whatsapp_providers` fires on every module boot |
| `hooks/filters/sms.md` | Scheduler filters documented under `sms_*` names | `message_*` names, with a note that `sms_*` are deprecated aliases (`apply_filters_deprecated`, 3.2.0) |
| `hooks/actions/sms.md` | Treated `sms_campaign_*` as fixed names | Documents the `{channel}_campaign_*` pattern |
| Sidebar + hook indexes | "SMS Campaigns" | "Messaging (SMS & WhatsApp)"; badge "FluentCampaign Pro" |
| `hooks/actions/contacts.md`, `global-functions/index.md` | `subscriber_sms_status_changed` and `fluentcrm_subscriber_sms_statuses()` do not exist in code | Removed |
| `cli/index.md`, `modules/email-sending-speed.md` | `cli_send --offset` documented as the way to spread workers; the code ignores it (use `--modulo` / `--remainder`, even remainders only) and the command no-ops without the multi-threading experiment | Rewritten, incl. the dispatcher script |
| `modules/event-tracking.md` | Claimed `fluent_crm/track_event_activity_done` (no such hook; the action is `event_tracked`); omitted that the feature is off by default | Corrected |
| `getting-started/index.md` | WordPress 5.6+ (plugin requires 6.0), `npm` build for the editor (repo uses pnpm), "200+ hooks" (~407 in code) | Corrected |
| `database/index.md` | `fc_sms_campaigns` / `fc_sms_messages` unexplained after the Messaging move | Notes: campaigns table is still live for both channels; `fc_sms_messages` is legacy, migration source |

DB schema pages otherwise match the migrations (table-by-table diff found no missing tables, columns or wrong types); all 15 CLI commands are documented.

### Second pass — Fixed

- ~~Messaging developer page~~ (written, then removed at the maintainer's request):  architecture diagram, opt-in switches, the channel contract, custom SMS and WhatsApp driver examples, data model, per-thread consent and the 24-hour rule. Finding: `MessageModule::channels()` is a fixed `sms` / `whatsapp` list, so a third channel cannot be registered; only drivers are extensible. (The `ChannelInterface` docblock says otherwise and is stale.)
- **~40 previously undocumented hooks** (verified at their call sites): Messaging/WhatsApp (`whatsapp_message_received`, `whatsapp_message_delivered|read`, `messaging_webhook_rejected`, keyword and media filters, scheduler delays), a new MCP page pair (`mcp_*`), and a Settings & System page pair (`experimental_settings`, `email_sender_session_*`, `non_blocking_request_*`, `remote_template_allowed_hosts`, …). Plugin quirk: `Helper::getExperimentalSettings()` caches before applying `experimental_settings`, so the filter only takes effect on the first call per request.
- `smart-code.md` (`urlencode`, `concat_last`, `show_if`), `trigger.md` (`fluentcrm_funnel_arg_num_*`), `company-profile-section.md` (opt-in module), `authentication.md` (real list response shape, cookie + `X-WP-Nonce` section), `hook_changes.md` (three wrong names, duplicates), front-matter descriptions on 13 pages, `hook_changes.md` linked from the hooks sidebar.

## 6. Open items (not changed)

- **Models with no page:** free `ActivityLog`, `TermRelation`, `CustomCompanyField`, `CustomEmailCampaign`; Pro `Sequence`, `SequenceMail`, `RecurringCampaign`, `SmartLink`, and the four Messaging models. `Subscriber` commerce relations are missing from its page. `Extender::addContactWidget` / `getCompaniesByContactEmail` are undocumented.
- **Hooks still undocumented:** `block_editor_*` (about 14), `global_app_boot_loaded`, `comment_form_subscribe_settings`, `did_run_funnel_email_action_{id}`, `benchmark_url_require_token`, `allow_internal_webhook_test`, and the legacy `fluentcrm_funnel_start_{trigger}`, `fluentcrm_list_created/deleted`, `fluentcrm_tag_updated/deleted`, `fluentcrm_campaign_status_active`, `fluentcrm_contact_emails`, `fluentcrm_memory_exceeded`.
- **`changelog.md`** has a single July 2025 entry and is in no sidebar; maintain it or remove it.
- **`database/index.md`** is one 668-line page and Pro tables lack per-table badges.
- **Modernisation ideas:** a Messaging ERD and a send-pipeline diagram (odd ids web worker, even ids CLI workers); generate REST index counts from the specs; "gated by experimental setting X" callouts on `company_module` / `multi_threading_emails` pages; code samples using the saved Try-it website.
- `fluent_crm/verfied_email_senders` is misspelled in the plugin itself; keep and annotate.

## 7. Verification

- `bash dev/rest-docs/run.sh` — both gates pass (410 routes ↔ 410 operations; 0 parameter gaps; 0 response gaps).
- `vitepress build src` — passes with `ignoreDeadLinks` off.
- Not verified in a browser: the Try-it bar's behaviour against a live site (logic is small and isolated in `theme/apiSite.js`), and rendering of the new specs beyond the build.
- Not run: the plugin's `tests/bin/run-all.sh` (no PHP in `app/` or `includes/` changed; only `dev/rest-docs` tooling).
