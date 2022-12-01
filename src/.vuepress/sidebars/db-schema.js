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
            ]
        ]
    },
    {
        title: 'Database Models',
        collapsable: false,
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
                '/database/models/subscriber',
                'Subscriber Model'
            ]
        ]
    }
];
