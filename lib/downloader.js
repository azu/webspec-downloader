/**
 * Created by azu on 2014/09/14.
 * LICENSE : MIT
 */
"use strict";
var Q = require("q");
var FS = require("q-io/fs");
var HTTP = require("q-io/http");
var path = require("path");
function fileNameSafe(string) {
    var ext = "";
    if (string[string.length - 1] === "/") {
        ext = ".html";
    } else if (/w3c?\.org/.test(string)) {
        ext = ".html";
    }
    return string.replace("http://", "").replace(/[^a-z0-9\.]/gi, '_').toLowerCase() + ext;
}

/**
 * Download URL list and return Q Promise object
 * @param {Array} URLList
 * @param {object} options
 * @returns {Q}
 */
module.exports = function downloader(URLList, options) {
    var promises = URLList.map(function (URL) {
        return  HTTP.request(URL).then(function (response) {
            if (200 <= response.status && response.status < 300) {
                return response.body.read();
            }
            return new Error("download error" + URL);
        }).then(function (body) {
            var filePath = path.join(options.dir, fileNameSafe(URL));
            var appenedURL = "<!-- " + URL + " -->\n" + body;
            return FS.write(filePath, appenedURL);
        }).then(function () {
            console.log("Done: " + URL);
        }).catch(function (error) {
            console.error("Fail Download ", URL, error);
        });
    });
    return Q.all(promises);
};

