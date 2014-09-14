/**
 * Created by azu on 2014/09/14.
 * LICENSE : MIT
 */
"use strict";
var biblio = require("./specref/biblio.json");
var downloader = require("./lib/downloader");
var FS = require("q-io/fs");
var SPECURLList = Object.keys(biblio).map(function (key) {
    return biblio[key].href;
}).filter(function (URL) {
    return URL != null;
}).filter(function (URL) {
    return !/(\.pdf$|\.txt$|\.zip$)/i.test(URL);
});


var downloadDir = require("path").join(process.cwd(), "_download");
FS.makeDirectory(downloadDir).finally(function () {
    downloader(SPECURLList, {
        dir: downloadDir
    }).then(function (results) {
        process.exit(0);
    }).catch(function (error) {
        console.error(error);
        process.exit(1);
    });
});
