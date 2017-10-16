const rp = require('request-promise');
const cheerio = require('cheerio');
const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');

const optionDefinitions = [
    { 
        name: 'url', 
        alias: 'u',
        type: String, 
        typeLabel: '[underline]{default option}',
        defaultOption: true 
    },
    { 
        name: 'protocol', 
        alias: 'p', 
        type: String, 
        defaultValue: 'ed2k',
        typeLabel: '[[underline]{ed2k}|[underline]{magnet}]'
    },
    { 
        name: 'tab', 
        alias: 't', 
        type: String, 
        defaultValue: 'tab-g101-HR-HDTV',
        typeLabel: '[underline]{tab-g101-HR-HDTV}'
    },
    { 
        name: 'help', 
        alias: 'h', 
        type: Boolean 
    },
]

const args = commandLineArgs(optionDefinitions);

const usage = [
    {
        header: 'DoramaSeeeeeeker',
        content: 'Fetch dramas for you'
    },
    {
        header: 'Options',
        optionList: optionDefinitions
    },
    {
        header: 'Synopsis',
        content: [
          '$ seeker [underline]{http://xiazai002.com/myMOm2} [bold]{--protocol} [underline]{ed2k} [bold]{--tab} [underline]{tab-g101-HR-HDTV} ...',
          '$ seeker [bold]{--help}'
        ]
    }
];

if (args.help) {
    console.log(getUsage(usage))
    return;
}

var options = {
    uri: args.url,
    transform: (body) => {
        return cheerio.load(body);
    }
};

rp(options)
    .then(($) => {
        $(`div#${args.tab} ul.down-list`).find('a.btn').each((i, val) => {
            let link = $(val).attr('href').toString();
            if (link.startsWith(args.protocol)) {
                console.log(link);
            }
        });
    })
    .catch(err => {
        consle.log(`exception with ${err}`);
    });
