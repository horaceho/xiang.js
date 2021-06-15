var Xiang = function (fen) {
    var VERSION = "0.0.1";

    function ascii() {
        var s = '楚河';

        return s
    }

    return {
        version: function () {
            return VERSION;
        },
        ascii: function () {
            return ascii();
        },
    };
};

if (typeof exports !== "undefined") exports.Xiang = Xiang;

if (typeof define !== "undefined")
    define(function () {
        return Xiang;
    });
