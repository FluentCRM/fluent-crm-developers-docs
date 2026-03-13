import DefaultTheme from 'vitepress/theme'
import ExplainBlock from '../components/ExplainBlock.vue'
import LlmBar from '../components/LlmBar.vue'
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
            'doc-before': () => h(LlmBar)
        })
    },
    enhanceApp({ app, router, siteData }) {
        app.component('ExplainBlock', ExplainBlock)

        // Register OpenAPI theme components
        theme.enhanceApp({ app, router, siteData })

        if (typeof window !== 'undefined') {
            // Intercept fetch for playground — rewrite server URL and handle auth
            const originalFetch = window.fetch
            window.fetch = function (...args) {
                let [input, init] = args

                if (typeof input === 'string' && input.includes('/wp-json/fluent-crm/v2')) {
                    const customServer = localStorage.getItem('fluentcrm-api-server')
                    if (customServer) {
                        input = input.replace(/https?:\/\/[^/]+/, customServer.replace(/\/$/, ''))
                    }

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
