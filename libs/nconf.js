/**
 * Created by iSuhar on 10.04.2016.
 */
var nconf = require('nconf');

nconf.argv()
    .env()
    .file({ file: './config.json' });

module.exports = nconf;