import DefaultTheme from 'vitepress/theme'
import ExplainBlock from '../components/ExplainBlock.vue'
import LlmBar from '../components/LlmBar.vue'
import ZoomBox from '../components/ZoomBox.vue'
import ApiSiteBar from '../components/ApiSiteBar.vue'
import { getSite, rewriteApiUrl } from './apiSite.js'
import { theme, useOpenapi } from 'vitepress-openapi/client'
import 'vitepress-openapi/dist/style.css'
import './vars.css'
import './custom.css'
import './openapi.css'
import { h } from 'vue'

export default {
    extends: DefaultTheme,
    Layout() {
        return h(DefaultTheme.Layout, null, {
            'doc-before': () => [h(LlmBar), h(ApiSiteBar)]
        })
    },
    enhanceApp({ app, router, siteData }) {
        app.component('ExplainBlock', ExplainBlock)
        app.component('ZoomBox', ZoomBox)

        // Register OpenAPI theme components
        theme.enhanceApp({ app, router, siteData })

        if (typeof window !== 'undefined') {
            // Intercept fetch for playground — point requests at the reader's own
            // site (see apiSite.js) and turn a bare "user:app-password" into Basic auth.
            const originalFetch = window.fetch
            window.fetch = function (...args) {
                let [input, init] = args

                if (typeof input === 'string' && input.includes('/wp-json/fluent-crm/v2')) {
                    const site = getSite()
                    if (!site && /\{website\}|%7Bwebsite%7D|YourWebsite\.com/i.test(input)) {
                        return Promise.reject(new TypeError('Enter your website in the "Try it on your website" box above the request first.'))
                    }
                    input = rewriteApiUrl(input, site)

                    if (init?.headers) {
                        const headers = new Headers(init.headers)
                        const auth = headers.get('Authorization')
                        if (auth && !auth.startsWith('Basic ') && auth.includes(':')) {
                            headers.set('Authorization', 'Basic ' + btoa(auth))
                            init = { ...init, headers }
                        }
                    }
                }

                return originalFetch.apply(this, [input, init])
            }
        }
    }
}
