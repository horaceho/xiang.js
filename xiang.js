const { Parse } = require('./parse.js');
const parse = new Parse();

var Xiang = function () {

    const Space = '　';

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

    const Names = [
        '・', '・', '・', '・', '・', '・', '・', '・',
        '將', '士', '象', '馬', '車', '砲', '卒', '・', // k:8, a:9 ... p:14 
        '帥', '仕', '相', '傌', '俥', '炮', '兵', '・', // K:16, A:17 ... P:22
    ];

    const Indexes = {
        "將": 0, "帥": 0, "帅": 0,
        "仕": 1, "士": 1,
        "相": 2, "象": 2,
        "傌": 3, "馬": 3, "马": 3,
        "俥": 4, "車": 4, "硨": 4, "车": 4,
        "炮": 5, "砲": 5, "包": 5,
        "兵": 6, "卒": 6,
    };

    const Pieces = {
        "k": k, "a": a, "b": b, "e": e, "n": n, "h": h, "r": r, "c": c, "p": p,
        "K": K, "A": A, "B": B, "E": E, "N": N, "H": H, "R": R, "C": C, "P": P,
    }

    const Asciis = [
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

    const Version = "0.0.4";

    const Grids = {
        "Clear":  [
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
        ],
    }

    const FENs = {
        "Empty": "9/9/9/9/9/9/9/9/9/9 w - - 0 1",
        "Start": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    }

    var xiang = {
        "board": [...Grids.Clear],
        "infos": { "FEN": FENs.Empty },
        "count": 0,
        "moves": [{}],
        "turn": "r",
        "result": "",
    };

    function load(filename) {
        let game = parse.open(filename);
        fenToBoard(game.infos.FEN);
        xiang.infos = {...game.infos};
        xiang.moves = [...game.moves];
        xiang.count = game.count;
        xiang.result = game.result;
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
                value = xiang.board[row * 16 + col];
                ascii += (value > 1) ? Names[value] : Asciis[index];
            }
            ascii += "\n";
        }

        console.log(Dimmer + header + Normal + ascii + Dimmer + footer + Normal);
    }

    function moves() {
        for (let move of xiang.moves) {
            console.log(`${move.Move ?? ""} {${move.Note ?? ""}}`);
        }
    }

    function clear() {
        xiang = {
            "board": [...Grids.Clear],
            "infos": { "FEN": FENs.Empty },
            "count": 0,
            "moves": [{}],
            "turn": "r",
            "result": "",
        }
    }

    function fenToBoard(fen) {
        clear();
        let parts = fen.split(" ");
        let row = 0;
        let col = 0;
        if (parts.length > 0) {
            let lines = parts[0].split("/");
            if (lines.length === 10) {
                for (let line of lines) {
                    col = 0;
                    let chars = line.split("");
                    for (let one of chars) {
                        if (one.match(/\d/)) {
                            col += Number(one);
                        } else {
                            index = (row + 3) * 16 + 3 + col;
                            xiang.board[index] = Pieces[one];
                            col += 1;
                        }
                    }
                    row += 1;
                }
            }
        }
        if (parts.length > 1) {
            xiang.turn = (parts[1] === "b") ? "b" : "r";
        }
    }

    return {
        version: function () {
            return Version;
        },
        start: function () {
            fenToBoard(FENs.Start);
        },
        empty: function () {
            fenToBoard(FENs.Empty);
        },
        load: function (filename) {
            return load(filename);
        },
        moves: function () {
            return moves();
        },
        fen: function () {
            return xiang.infos.FEN;
        },
        turn: function () {
            return xiang.turn;
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
