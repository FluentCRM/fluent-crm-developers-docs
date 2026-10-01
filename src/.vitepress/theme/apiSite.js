// The website the REST "Try it" playground sends requests to.
//
// The OpenAPI specs declare `https://{website}/wp-json/fluent-crm/v2`, but the
// playground does not expand server variables, so a request would go to the
// literal host "{website}". Readers instead enter their own site once; it is
// kept in localStorage and substituted into every playground request.

const STORAGE_KEY = 'fluentcrm-api-site'
const API_PATH = '/wp-json/fluent-crm/v2'

/**
 * Turn whatever the reader typed into a site base URL, or '' when it is not one.
 * Accepts `example.com`, `http://localhost:10010`, `https://example.com/blog/`,
 * and a pasted full REST base URL (the `/wp-json/...` tail is dropped).
 */
export function normalizeSite(raw) {
    let value = String(raw || '').trim()
    if (!value) return ''
    if (!/^https?:\/\//i.test(value)) value = 'https://' + value
    try {
        const url = new URL(value)
        const path = url.pathname.replace(/\/wp-json(\/.*)?$/, '').replace(/\/+$/, '')
        return url.origin + path
    } catch {
        return ''
    }
}

export function getSite() {
    try {
        return localStorage.getItem(STORAGE_KEY) || ''
    } catch {
        return ''
    }
}

export function setSite(raw) {
    const site = normalizeSite(raw)
    try {
        if (site) localStorage.setItem(STORAGE_KEY, site)
        else localStorage.removeItem(STORAGE_KEY)
    } catch {
        // Storage can be blocked (private window); the bar still works for this page view.
    }
    return site
}

/** Point a playground request URL at the reader's site; other URLs pass through. */
export function rewriteApiUrl(input, site) {
    if (!site || typeof input !== 'string') return input
    const at = input.indexOf(API_PATH)
    if (at === -1) return input
    return site + input.slice(at)
}
