var Xiang = function (fen) {

    const Space = '　';

    const Names = [
        '・', '・', '・', '・', '・', '・', '・', '・',
        '帥', '仕', '相', '傌', '俥', '炮', '兵', '・',
        '將', '士', '象', '馬', '車', '砲', '卒', '・',
    ];

    const Grids = [
        '・','－','－','－','－','－','－','－','・',
        '｜','・','・','・','・','・','・','・','｜',
        '｜','＋','・','・','・','・','・','＋','｜',
        '＋','・','＋','・','＋','・','＋','・','＋',
        '｜','－','－','－','－','－','－','－','｜',
        '｜','－','－','－','－','－','－','－','｜',
        '＋','・','＋','・','＋','・','＋','・','＋',
        '｜','＋','・','・','・','・','・','＋','｜',
        '｜','・','・','・','・','・','・','・','｜',
        '・','－','－','－','－','－','－','－','・',
    ];

    const k =  8;
    const a =  9;
    const b = 10;
    const e = 10;
    const n = 11;
    const h = 11;
    const r = 12;
    const c = 13;
    const p = 14;

    const K = 16;
    const A = 17;
    const B = 18;
    const E = 18;
    const N = 19;
    const H = 19;
    const R = 20;
    const C = 21;
    const P = 22;

    const Version = "0.0.2";

    const Empty = [
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    const Start = [
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, r, n, b, a, k, a, b, n, r, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, c, 1, 1, 1, 1, 1, c, 1, 0, 0, 0, 0,
        0, 0, 0, p, 1, p, 1, p, 1, p, 1, p, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, P, 1, P, 1, P, 1, P, 1, P, 0, 0, 0, 0,
        0, 0, 0, 1, C, 1, 1, 1, 1, 1, C, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, R, N, B, A, K, A, B, N, R, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    Game = {
        "Empty": {
            infos: {
                "FEN": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
            },
            count: 0,
            moves: [{}],
            result: "",
        }
    }

    var board = Start;
    var xiang = {
        "game": Game.Empty,
    }

    function load(game) {
        xiang.game = game;

        return xiang.game.count;
    }

    function ascii() {
        const Digits = '１２３４５６７８９';
        const Soujis = '九八七六五四三二一';
        const Dimmer = '\x1b[2m';
        const Normal = '\x1b[0m';

        var header = Digits;
        var footer = Soujis;
        var ascii = '\n';
        for (var row = 3; row <= 3 + 9; row++) {
            for (var col = 3; col <= 3 + 8; col++) {
                index = (row - 3) * 9 + col - 3;
                value = board[row * 16 + col];
                ascii += (value > 1) ? Names[value] : Grids[index];
            }
            ascii += "\n";
        }

        console.log(Dimmer + header + Normal + ascii + Dimmer + footer + Normal);
    }

    return {
        version: function () {
            return Version;
        },
        empty: function () {
            board = Empty;
        },
        start: function () {
            board = Start;
        },
        load: function (game) {
            return load(game);
        },
        fen: function () {
            return xiang.game.infos.FEN;
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
