#!/usr/bin/env node
var webspecDL = require('../');
var argv = require('minimist')(process.argv.slice(2));
var result = webspecDL({
    dir: argv.dir,
    dataPath :argv.ref
});
result.then(function () {
    process.exit(0);
}).catch(function (error) {
    process.exit(1)
});