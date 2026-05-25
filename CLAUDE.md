# FluentCRM Developer Documentation — Project Context

## What This Project Is

This is the official **FluentCRM developer documentation site**, built with **VitePress**.
Repository: `FluentCRM/fluent-crm-developers-docs` | Published at developers.fluentcrm.com.

> **This repo is a git submodule of the main plugin repo** (`WPManageNinja/fluent-crm`), mounted at `dev-docs/`. It is its own repository: commits and pushes here go to `fluent-crm-developers-docs`, and the parent plugin repo only tracks the submodule pointer. The sibling `user-docs/` submodule is the separate **end-user** docs (`WPManageNinja/fluentcrm-user-docs`) — keep developer/extensibility content here, not there.

## Structure

- Markdown content lives under `src/` (e.g. `src/getting-started/`, `src/modules/`, `src/hooks/`, `src/cli/`, `src/database/`, `src/rest-api/`).
- VitePress config: `src/.vitepress/config.js`. Sidebars are split per-section in `src/.vitepress/sidebars/*.js` and imported into the config.
- Theme/styles: `src/.vitepress/theme/` (`custom.css`, etc.). The homepage is `src/index.md` (custom hero layout).
- When you add a page, also add it to the relevant `src/.vitepress/sidebars/*.js` so it's reachable.

## Build & Dev

```bash
npm install
npm run dev      # vitepress dev src
npm run build    # vitepress build src
npm run preview
```

A `pnpm-lock.yaml` and a `package-lock.json` both exist; match whichever the team standardizes on.

## Conventions

- Audience is **developers** extending FluentCRM (hooks, REST API, models, CLI, modules). For end-user "how to use FluentCRM" content, use the `user-docs/` submodule instead.
- Match the existing page style: H2/H3 headings (outline is `[2, 3]`), `<Badge>` for tags, and VitePress containers (`::: tip`, `::: warning`, `::: danger`).
- `ignoreDeadLinks` is enabled, so broken links won't fail the build — still keep links valid.
