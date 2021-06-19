const fs = require("fs");
const readline = require("readline");

var Parse = function (text) {
    function load(filename) {
        var interface = readline.createInterface({
            input: fs.createReadStream(filename),
        });
        interface
            .on("line", function (line) {
                console.log("- ", line);
            })
            .on("error", (error) => {
                console.log(filename, "!");
            });
    }

    return {
        load: function (filename) {
            return load(filename);
        },
    };
};

if (typeof exports !== "undefined") exports.Parse = Parse;

if (typeof define !== "undefined")
    define(function () {
        return Parse;
    });
