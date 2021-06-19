const fs = require("fs");
const readline = require("readline");

var Parse = function (text) {
    function file(filename) {
        var text = fs.readFileSync(filename, 'utf8');
        let regex = /\[(?<key>\S+)\s(?<value>.+)\]/gm;
        let results = text.matchAll(regex);
        for (let result of results) {
            console.log(result.groups.key, ":", result.groups.value);
        }
    }

    return {
        file: function (filename) {
            return file(filename);
        },
    };
};

if (typeof exports !== "undefined") exports.Parse = Parse;

if (typeof define !== "undefined")
    define(function () {
        return Parse;
    });
