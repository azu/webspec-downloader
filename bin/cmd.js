#!/usr/bin/env node
var webspecDL = require('../');
var result = webspecDL({
    dir: process.argv[2]
});
result.then(function () {
    process.exit(0);
}).catch(function (error) {
    process.exit(1)
});