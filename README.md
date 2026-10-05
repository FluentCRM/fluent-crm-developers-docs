<div align="center">
    <img style="margin-top: 50px;" width="300" src="https://fluentcrm.com/wp-content/uploads/2020/10/fluentCRM-logo-color.svg" alt="FluentCRM Logo">
</div>

# FluentCRM Developers Docs

Developer documentation for [FluentCRM](https://fluentcrm.com/): the REST API, action and filter hooks, database schema and models, global functions, CLI, and the extension points (automation steps, profile sections, smart codes, and more).

* [FluentCRM Developers](https://developers.fluentcrm.com/)
* [REST API Docs](https://rest-api.fluentcrm.com/)
* [User Documentation](https://docs.fluentcrm.com/)

## Why this repo

The docs live apart from the plugin so they can be edited, reviewed and deployed on their own schedule. It is a git submodule of the FluentCRM plugin repo (mounted at `dev-docs/`), published from `master` to developers.fluentcrm.com. Docs for *using* FluentCRM belong in the user docs, not here.

The REST API pages are generated from the plugin's own route table, so they match the code. See `dev/rest-docs/README.md` in the plugin repo before editing anything under `src/public/openapi/`.

## Build locally

Built with [VitePress](https://vitepress.dev/). Node 18+ is required.

```bash
pnpm install        # or: npm install
pnpm run dev        # dev server with hot reload
pnpm run build      # static site into src/.vitepress/dist
pnpm run preview    # serve the built site
```

Use **pnpm** if you can. The lockfile is `pnpm-lock.yaml`, and running `npm install` on top of a pnpm-created `node_modules` creates duplicate Vue copies and breaks the build. Pick one package manager per checkout.

A broken internal link fails `build`, so run it before opening a PR.
