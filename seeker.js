const rp = require('request-promise')
const cheerio = require('cheerio')
const parseArgs = require('minimist')

let args = parseArgs(process.argv.slice(2));
let destUrl = args._[0];

if (!destUrl) {
    console.log('please sepecifiy destination url');
    return;
}

var options = {
    uri: destUrl,
    transform: (body) => {
        return cheerio.load(body);
    }
};

rp(options)
    .then( ($) => {
        $('div#tab-g101-HR-HDTV ul.down-list').find('a.btn').each((i, val) => {
            let link = $(val).attr('href').toString();
            if (link.startsWith('magnet:')) {
                console.log(link, '\n');
            }
        });
    })
    .catch(err => {
        //
    });
