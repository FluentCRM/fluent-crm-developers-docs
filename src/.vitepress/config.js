import dbSchemaSidebar from './sidebars/db-schema.js'
import globalFunctionsSidebar from './sidebars/global-functions.js'
import hooksSidebar from './sidebars/hooks.js'
import helpersSidebar from './sidebars/helpers.js'
import modulesSidebar from './sidebars/modules.js'
import extendRestApiSidebar from './sidebars/extendRestApiSidebar.js'
import restApiSidebar from './sidebars/rest-api.js'

import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    ignoreDeadLinks: true,

    vite: {
        assetsInclude: ['**/*.json'],
        resolve: {
            alias: {
                '/assets': fileURLToPath(new URL('./public/assets', import.meta.url))
            }
        }
    },

    title: 'FluentCRM Developers',
    description: 'Resources and tutorials for FluentCRM developers',

    head: [
        ['link', { rel: 'icon', href: '/favicon.png' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['link', { rel: 'mask-icon', href: '/assets/img/logo.svg', color: '#7742e6' }],
        ['link', { rel: 'apple-touch-icon', href: '/assets/img/logo.svg' }],
        ['meta', { name: 'theme-color', content: '#7742e6' }],
        ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['meta', { name: 'msapplication-TileImage', content: '/assets/img/icon.svg' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
        ['link', {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,500;0,700;1,300;1,500;1,700&display=auto'
        }],
    ],

    themeConfig: {
        logo: '/assets/img/icon.svg',

        nav: [
            {
                text: 'Getting Started',
                link: '/getting-started/'
            },
            {
                text: 'Database',
                items: [
                    {
                        text: 'Database Schema',
                        link: '/database/',
                    },
                    {
                        text: 'Database Models',
                        link: '/database/models/',
                    }
                ],
            },
            {
                text: 'Developer Hooks',
                items: [
                    {
                        text: 'Action Hooks',
                        link: '/hooks/actions/',
                    },
                    {
                        text: 'Filter Hooks',
                        link: '/hooks/filters/',
                    },
                    {
                        text: 'Global Functions',
                        link: '/global-functions/',
                    },
                    {
                        text: 'Helpers Classes',
                        link: '/helpers/',
                    },
                    {
                        text: 'CLI',
                        link: '/cli/',
                    }
                ],
            },
            {
                text: 'Modules',
                items: [
                    {
                        text: 'Automation',
                        link: '/modules/automation',
                    },
                    {
                        text: 'Smart Codes',
                        link: '/modules/smart-code',
                    },
                    {
                        text: "Contact's Profile",
                        link: '/modules/contact-profile-section',
                    },
                    {
                        text: 'Extending REST API',
                        link: '/extending-rest-api/',
                    },
                    {
                        text: 'Event Tracking',
                        link: '/modules/event-tracking/',
                    }
                ],
            },
            {
                text: 'Blog',
                link: 'https://fluentcrm.com/blog/',
            },
            {
                text: 'REST API',
                link: '/rest-api/',
            },
        ],

        sidebar: {
            '/database/': dbSchemaSidebar,
            '/global-functions/': globalFunctionsSidebar,
            '/hooks/': hooksSidebar,
            '/helpers/': helpersSidebar,
            '/modules/': modulesSidebar,
            '/extending-rest-api/': extendRestApiSidebar,
            '/rest-api/': restApiSidebar,
        },

        outline: {
            level: [2, 3]
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/fluentcrm/fluent-crm-developers-docs' }
        ],

        editLink: {
            pattern: 'https://github.com/fluentcrm/fluent-crm-developers-docs/edit/master/src/:path',
            text: 'Edit this page on GitHub'
        },

        lastUpdated: {
            text: 'Last updated'
        },

        search: {
            provider: 'algolia',
            options: {
                appId: '2PWH5XIPGO',
                apiKey: '9d00a167e089bf90059b2085cc88559c',
                indexName: 'crawler_FluentCRM Developers Docs'
            }
        }
    },

})
