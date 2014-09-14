/**
 * Created by azu on 2014/09/14.
 * LICENSE : MIT
 */
"use strict";
var downloader = require("./lib/downloader");
var FS = require("q-io/fs");
module.exports = function (options) {
    var biblioPath = options.dataPath ? options.dataPath : "./specref/biblio.json";
    var biblio = require(biblioPath);
    var SPECURLList = Object.keys(biblio).map(function (key) {
        return biblio[key].href;
    }).filter(function (URL) {
        return URL != null;
    }).filter(function (URL) {
        return !/(\.pdf$|\.txt$|\.zip$)/i.test(URL);
    });
    options.dir = options.dir ? options.dir : "_downloads";
    var downloadDir = require("path").join(process.cwd(), options.dir);
    return FS.makeDirectory(downloadDir).finally(function () {
        return downloader(SPECURLList, options).catch(function (error) {
            console.error(error);
            return error;
        });
    });
};
