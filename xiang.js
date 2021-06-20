var Xiang = function (fen) {

    const Space = '　';

    const Names = [
        '・', '・', '・', '・', '・', '・', '・', '・',
        '將', '士', '象', '馬', '車', '砲', '卒', '・',
        '帥', '仕', '相', '傌', '俥', '炮', '兵', '・',
    ];

    const Pieces = {
        "k":  8, "a":  9, "b": 10, "e": 10, "n": 11, "h": 11, "r": 12, "c": 13, "p": 14,
        "K": 16, "A": 17, "B": 18, "E": 18, "N": 19, "H": 19, "R": 20, "C": 21, "P": 22,
    }

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

    const Version = "0.0.3";

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
        clear();
        var row = 0;
        var col = 0;
        let fen = game.infos.FEN;
        let parts = fen.split(" ");
        if (parts.length === 6) {
            let lines = parts[0].split("/");
            if (lines.length === 10) {
                for (let line of lines) {
                    col = 0;
                    let chars = line.split("");
                    for (let one of chars) {
                        if (one.match(/\d/)) {
                            col += Number(one);
                        } else {
                            place(row, col, one);
                            col += 1;
                        }
                    }
                    row += 1;
                }
            }
        }

        if (row === 10 && col === 9) {
            xiang.game = game;
        }

        return game.count;
    }

    function place(row, col, one) {
        index = (row + 3) * 16 + 3 + col;
        board[index] = Pieces[one];
    }

    function clear() {
        board = Empty;
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
