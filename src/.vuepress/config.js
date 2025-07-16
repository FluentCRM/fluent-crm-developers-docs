const {description, base} = require('../../package');
const dbSchemaSidebar = require('./sidebars/db-schema');
const globalFunctionsSidebar = require('./sidebars/global-functions');
const hooksSidebar = require('./sidebars/hooks');
const helpersSidebar = require('./sidebars/helpers');
const modulesSidebar = require('./sidebars/modules');
const extendRestApiSidebar = require('./sidebars/extendRestApiSidebar');

const path = require('path');

module.exports = {
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#title
     */
    title: 'FluentCRM Developers',

    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#base
     */
    base: process.env.BASE === '1' ? base : undefined,

    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#description
     */
    description: description,

    /**
     * Extra tags to be injected to the page HTML `<head>`
     *
     * Ref：https://v1.vuepress.vuejs.org/config/#head
     */
    head: [
        ['link', {rel: 'icon', href: '/favicon.png'}],
        ['link', {rel: 'manifest', href: '/manifest.json'}],
        ['link', {rel: 'mask-icon', href: '/assets/img/logo.svg', color: '#7742e6'}],
        ['link', {rel: 'apple-touch-icon', href: '/assets/img/logo.svg'}],
        ['meta', {name: 'theme-color', content: '#7742e6'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
        ['meta', {name: 'msapplication-TileImage', content: '/assets/img/icon.svg'}],
        ['meta', {name: 'msapplication-TileColor', content: '#000000'}],
        // Fonts
        ['link', {rel: 'preconnect', href: 'https://fonts.googleapis.com'}],
        ['link', {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''}],
        ['link', {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,500;0,700;1,300;1,500;1,700&display=auto'
        }],
    ],

    /**
     * Theme configuration, here is the default theme configuration for VuePress.
     *
     * Ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
     */
    themeConfig: {
        base: '/fluent-crm-developers-docs/',
        repo: 'fluentcrm/fluent-crm-developers-docs',
        docsBranch: 'master',
        docsDir: 'src',
        editLinks: true,
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: true,
        logo: '/assets/img/icon.svg',
        displayAllHeaders: true,
        smoothScroll: true,
        search: false, // built in search disabled because of Algolia search
        searchPlaceholder: 'Search...',
        searchMaxSuggestions: 10,
        algolia: {
            apiKey: '9d00a167e089bf90059b2085cc88559c',
            indexName: 'crawler_FluentCRM Developers Docs',
            appId: '2PWH5XIPGO',
        },
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
                        link: '/modules/automation/',
                    },
                    {
                        text: 'Smart Codes',
                        link: '/modules/smart-code/',
                    },
                    {
                        text: 'Contact\'s Profile',
                        link: '/modules/contact-profile-section/',
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
                link: 'https://rest-api.fluentcrm.com/',
            },
        ],
        sidebar: {

            '/database/': dbSchemaSidebar,
            '/global-functions/': globalFunctionsSidebar,
            '/hooks/': hooksSidebar,
            '/helpers/': helpersSidebar,
            '/modules/': modulesSidebar,
            '/extending-rest-api/': extendRestApiSidebar,

        }
    },

    /**
     * Markdown rules.
     *
     * Ref：https://v1.vuepress.vuejs.org/config/#markdown
     */
    markdown: {
        lineNumbers: true,
        toc: true
    },

    extendMarkdown: (md) => {
        // use more markdown-it plugins!
        md.use(require('markdown-it-include'))
    },

    /**
     * Apply vue plugins.
     *
     * Ref：https://v1.vuepress.vuejs.org/plugin/
     */
    plugins: [
        [
            '@vuepress/pwa',
            {
                serviceWorker: false,
                updatePopup: {
                    message: 'New content is available.',
                    buttonText: 'Refresh'
                }
            }
        ],
        [
            'vuepress-plugin-clean-urls',
            {
                normalSuffix: '/',
                indexSuffix: '/',
                notFoundPath: '/404.html',
            },
        ],
        [
            'vuepress-plugin-seo',
            {
                siteTitle: (_, $site) => $site.title,
                title: $page => $page.title,
                description: $page => $page.frontmatter.description,
                author: (_, $site) => $site.themeConfig.author,
                tags: $page => $page.frontmatter.tags,
                twitterCard: _ => 'summary_large_image',
                type: $page => ['articles', 'posts', 'blog'].some(folder => $page.regularPath.startsWith('/' + folder)) ? 'article' : 'website',
                url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
                image: () => 'https://avatars.githubusercontent.com/u/71979105',
                publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
                modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
            }
        ],
        [
            '@vuepress/register-components',
            {
                componentsDir: path.resolve(__dirname, './components'),
            },
        ]
    ]
}
