const fs = require("fs");
const readline = require("readline");

var Parse = function (text) {
    function file(filename) {
        var game = {
            infos: {},
            count: 0,
            moves: [{}],
            result: "",
        };

        var text = fs.readFileSync(filename, "utf8");
        let regex =
            /(?<setup>\[.+\])|(?<note>{[\S\s]*?})|(?<result>\*|\d-\d|\d\/\d-\d\/\d)|(?<moves>.+)/gm;
        let results = text.matchAll(regex);
        for (let result of results) {
            if (result.groups.setup !== undefined) {
                info = result.groups.setup.replace(/\[|\]/g, "");
                chunks = info.split(/\s+/);
                key = chunks.shift();
                value = chunks.join(" ");
                game.infos[key] = value.replace(/^"|"$/g, '');
            } else if (result.groups.note !== undefined) {
                note = result.groups.note.replace(/\{|\}/g, "");
                game.moves[game.count]["Note"] = note;
            } else if (result.groups.result !== undefined) {
                game.result = result.groups.result;
            } else if (result.groups.moves !== undefined) {
                let fours = result.groups.moves.replace(/(\d+\.?\s+)/g, "");
                let split = fours.split(/\s/g);
                for (let four of split) {
                    game.count += 1;
                    game.moves[game.count] = {
                        Move: four,
                    };
                }
            }
        }

        return game;
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
