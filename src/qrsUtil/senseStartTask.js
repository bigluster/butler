var config = require('config');

var https = require('https');
var fs = require('fs');
var options = {
    hostname: config.get('Butler.configQRS.host'),
    port: config.get('Butler.configQRS.port'),
    path: '/qrs/app?xrfkey=abcdefghijklmnop',
    method: 'POST',
    headers: {
        'x-qlik-xrfkey' : 'abcdefghijklmnop',
        'X-Qlik-User' : 'UserDirectory= Internal; UserId= sa_repository '
    },
    key: fs.readFileSync(config.get('Butler.configQRS.key')),
    cert: fs.readFileSync(config.get('Butler.configQRS.cert')),
    ca: fs.readFileSync(config.get('Butler.configQRS.ca'))
};


// Function for starting Sense task, given its task ID (as it appears in the QMC task list)
module.exports.senseStartTask = function (taskId) {
    // QRS config

    console.info('Starting task ' + taskId);
    options.path = '/qrs/task/' + taskId + '/start?xrfkey=abcdefghijklmnop';

    https.get(options, function(res) {
        console.info('Got response: ' + res.statusCode);
        res.on('data', function(chunk) {
            console.info('BODY: ' + chunk);  
        }); 
    }).on('error', function(e) {
        console.error('Got error: ' + e.message);
    });
};
