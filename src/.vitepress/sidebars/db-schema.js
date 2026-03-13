export default [
    {
        text: 'Database Schema',
        collapsed: false,
        items: [
            { text: 'Introduction', link: '/database/' },
            { text: 'Model Basic', link: '/database/models/' },
            { text: 'Query Builder', link: '/database/query-builder' }
        ]
    },
    {
        text: 'Database Models',
        collapsed: true,
        items: [
            { text: 'Subscriber Model', link: '/database/models/subscriber' },
            { text: 'Campaign Model', link: '/database/models/campaign' },
            { text: 'Campaign Email Model', link: '/database/models/campaign-email' },
            { text: 'Campaign Url Metric Model', link: '/database/models/campaign-url-matrix' },
            { text: 'Company Model', link: '/database/models/company' },
            { text: 'Company Note Model', link: '/database/models/company-note' },
            { text: 'Custom Contact Field', link: '/database/models/custom-contact-field' },
            { text: 'Event Tracker Model', link: '/database/models/event-tracker' },
            { text: 'Funnel Model', link: '/database/models/funnel' },
            { text: 'Funnel Campaign Model', link: '/database/models/funnel-campaign' },
            { text: 'FunnelSubscriber Model', link: '/database/models/funnelSubscriber' },
            { text: 'FunnelSequence Model', link: '/database/models/funnelSequence' },
            { text: 'FunnelMetric Model', link: '/database/models/funnelMetric' },
            { text: 'Label Model', link: '/database/models/label' },
            { text: 'Lists Model', link: '/database/models/lists' },
            { text: 'Meta Model', link: '/database/models/meta' },
            { text: 'Subject Model', link: '/database/models/subject' },
            { text: 'Subscriber Meta Model', link: '/database/models/subscriber-meta' },
            { text: 'Subscriber Note Model', link: '/database/models/subscriber-note' },
            { text: 'Subscriber Pivot Model', link: '/database/models/subscriber-pivot' },
            { text: 'System Log Model', link: '/database/models/system-log' },
            { text: 'Tag Model', link: '/database/models/tag' },
            { text: 'Template Model', link: '/database/models/template' },
            { text: 'Url Store Model', link: '/database/models/url-store' },
            { text: 'User Model', link: '/database/models/user' },
            { text: 'Webhook Model', link: '/database/models/webhook' },
        ]
    },
    {
        text: 'Fluent ORM',
        collapsed: true,
        items: [
            { text: 'Getting Started', link: '/database/orm/' },
            { text: 'Relationships', link: '/database/orm/relationship' },
            { text: 'Collections', link: '/database/orm/collections' },
            { text: 'Mutators', link: '/database/orm/mutators' },
            { text: 'Serialization', link: '/database/orm/serialization' },
        ]
    }
]
