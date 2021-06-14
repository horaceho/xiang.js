var Xiang = function (fen) {
    var VERSION = "0.0.1";

    return {
        version: function () {
            return VERSION;
        },
    };
};

if (typeof exports !== "undefined") exports.Xiang = Xiang;

if (typeof define !== "undefined")
    define(function () {
        return Xiang;
    });
