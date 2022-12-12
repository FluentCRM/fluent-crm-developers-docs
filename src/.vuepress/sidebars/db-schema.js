module.exports = [
    {
        title: 'Database Schema',
        collapsable: false,
        sidebarDepth: -1,
        children: [
            [
                '',
                'Introduction'
            ],
            [
                '/database/models/',
                'Model Basic'
            ],
            [
                '/database/query-builder',
                'Query Builder'
            ]
        ]
    },
    {
        title: 'Database Models',
        collapsable: true,
        sidebarDepth: -1,
        children: [
            [
                '/database/models/campaign',
                'Campaign Model'
            ],
            [
                '/database/models/campaign-email',
                'Campaign Email Model'
            ],
            [
                '/database/models/campaign-url-matrix',
                'Campaign Url Matrix Model'
            ],
            [
                '/database/models/custom-contact-field',
                'Custom Contact Field Model'
            ],
            [
                '/database/models/funnel',
                'Funnel Model',
            ],
            [
                '/database/models/funnelSubscriber',
                'FunnelSubscriber Model',
            ],
            [
                '/database/models/funnelSequence',
                'FunnelSequence Model',
            ],
            [
                '/database/models/funnelMetric',
                'FunnelMetric Model',
            ],
            [
                '/database/models/meta',
                'Meta Model',
            ],
            [
                '/database/models/subject',
                'Subject Model',
            ],
            [
                '/database/models/subscriber',
                'Subscriber Model'
            ],
            [
                '/database/models/subscriber-meta',
                'Subscriber Meta Model'
            ],
            [
                '/database/models/subscriber-note',
                'Subscriber Note Model'
            ],
            [
                '/database/models/subscriber-pivot',
                'Subscriber Pivot Model'
            ],
            [
                '/database/models/tag',
                'Tag Model',
            ],
            [
                '/database/models/template',
                'Template Model',
            ],
            [
                '/database/models/url-store',
                'Url Store Model',
            ],
            [
                '/database/models/user',
                'User Model',
            ],
            [
                '/database/models/webhook',
                'Webhook Model',
            ],
        ]
    },
    {
        title: 'Fluent ORM',
        collapsable: true,
        sidebarDepth: -1,
        children: [
            [
                '/database/orm/',
                'Getting Started'
            ],
            [
                '/database/orm/relationship',
                'Relationships'
            ],
            [
                '/database/orm/collections',
                'Collections'
            ],
        ]
    }
];
