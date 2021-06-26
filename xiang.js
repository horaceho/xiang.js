const fs = require("fs");

var Xiang = function () {
    // prettier-ignore
    const X = {
        "ChiToEng": {
            "將": "k", "帥": "k", "帅": "k",
            "仕": "a", "士": "a",
            "相": "b", "象": "b",
            "傌": "n", "馬": "n", "马": "n",
            "俥": "r", "車": "r", "硨": "r", "车": "r",
            "炮": "c", "砲": "c", "包": "c",
            "兵": "p", "卒": "p",
        },
        "ColorNum": {
            "r": { // 紅
                "k": 16, "a": 17, "b": 18, "e": 18, "n": 19, "h": 19, "r": 20, "c": 21, "p": 22,
            },
            "b": { // 黑
                "k":  8, "a":  9, "b": 10, "e": 10, "n": 11, "h": 19, "r": 12, "c": 13, "p": 14,
            },
        },
        "ColorCol": {
            "r": [0, 8, 7, 6, 5, 4, 3, 2, 1, 0],
            "b": [0, 0, 1, 2, 3, 4, 5, 6, 7, 8],
        },
        "PieceNum": {
            "k":  8, "a":  9, "b": 10, "e": 10, "n": 11, "h": 19, "r": 12, "c": 13, "p": 14,
            "K": 16, "A": 17, "B": 18, "E": 18, "N": 19, "H": 19, "R": 20, "C": 21, "P": 22,
        },
        "Relative": {
            "前": 1,
            "中": 2,
            "后": 2, "後": 2,
            "二": 2,
            "三": 3,
            "四": 4,
            "五": 5,
        },
        "Position": {
            "一": 1, "１": 1, "1": 1,
            "二": 2, "２": 2, "2": 2,
            "三": 3, "３": 3, "3": 3,
            "四": 4, "４": 4, "4": 4,
            "五": 5, "５": 5, "5": 5,
            "六": 6, "６": 6, "6": 6,
            "七": 7, "７": 7, "7": 7,
            "八": 8, "８": 8, "8": 8,
            "九": 9, "９": 9, "9": 9,
        },
        "Grids": {
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
        },
        "FENs": {
            "Empty": "9/9/9/9/9/9/9/9/9/9 w - - 0 1",
            "Start": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
        },
        "Space": '　',
        "Names": [
            '・', '・', '・', '・', '・', '・', '・', '・',
            '將', '士', '象', '馬', '車', '砲', '卒', '・', // k:8, a:9 ... p:14 
            '帥', '仕', '相', '傌', '俥', '炮', '兵', '・', // K:16, A:17 ... P:22
        ],
        "Asciis": [
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
        ],
        "Relative": {
            "前": 1,
            "中": 2,
            "后": 2, "後": 2,
            "二": 2,
            "三": 3,
            "四": 4,
            "五": 5,
        },
        "Position": {
            "一": 1, "１": 1, "1": 1,
            "二": 2, "２": 2, "2": 2,
            "三": 3, "３": 3, "3": 3,
            "四": 4, "４": 4, "4": 4,
            "五": 5, "５": 5, "5": 5,
            "六": 6, "６": 6, "6": 6,
            "七": 7, "７": 7, "7": 7,
            "八": 8, "８": 8, "8": 8,
            "九": 9, "９": 9, "9": 9,
        },
        "Direction": {
            "進": 1, "进": 1,
            "平": 0,
            "退": -1,
        },
    };

    const Version = "0.0.4";

    var xiang = {
        board: [...X.Grids.Clear],
        infos: { FEN: X.FENs.Empty },
        count: -1,
        index: -1,
        moves: [{}],
        turn: "r",
        remark: "",
        result: "",
    };

    function isEmpty(value) {
        return Object.keys(value).length === 0 && value.constructor === Object;
    }

    function open(filename) {
        let game = {
            infos: {},
            count: -1,
            index: -1,
            moves: [{}],
            remark: "",
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
                game.infos[key] = value.replace(/^"|"$/g, "");
            } else if (result.groups.note !== undefined) {
                note = result.groups.note.replace(/\{|\}/g, "");
                if (game.index < 0) {
                    game.remark += game.remark.length > 0 ? "\n" : "";
                    game.remark += note;
                } else {
                    game.moves[game.index]["note"] = note;
                }
            } else if (result.groups.result !== undefined) {
                game.result = result.groups.result;
            } else if (result.groups.moves !== undefined) {
                let fours = result.groups.moves
                    .trim()
                    .replace(/(\d+\.?\s+)/g, "");
                let split = fours.split(/\s+/g);
                for (let four of split) {
                    if (four.length == 4) {
                        game.index += 1;
                        game.moves[game.index] = {
                            four: four,
                        };
                    }
                }
            }
        }

        return game;
    }

    function load(filename) {
        let game = open(filename);
        fenToBoard(game.infos.FEN);
        xiang.infos = { ...game.infos };
        xiang.moves = [...game.moves];
        xiang.count = game.count;
        xiang.index = game.index;
        xiang.remark = game.remark;
        xiang.result = game.result;
    }

    function ascii() {
        const Digits = "１２３４５６７８９";
        const Soujis = "九八七六五四三二一";
        const Dimmer = "\x1b[2m";
        const Normal = "\x1b[0m";

        var header = Digits;
        var footer = Soujis;
        var ascii = "\n";
        for (let row = 3; row < 3 + 10; row++) {
            for (let col = 3; col < 3 + 9; col++) {
                let offset = (row - 3) * 9 + col - 3;
                value = xiang.board[row * 16 + col];
                ascii += value > 1 ? X.Names[value] : X.Asciis[offset];
            }
            ascii += "\n";
        }

        console.log(
            Dimmer + header + Normal + ascii + Dimmer + footer + Normal
        );
    }

    function digit() {
        let digit = "";
        for (let row = 3; row < 3 + 10; row++) {
            for (let col = 3; col < 3 + 9; col++) {
                value = xiang.board[row * 16 + col];
                digit += value.toString().padStart(3, " ");
            }
            digit += "\n";
        }

        console.log(digit);
    }

    function moves() {
        for (let move of xiang.moves) {
            console.log(`${move.four ?? ""} {${move.note ?? ""}}`);
        }
    }

    function make(four, turn) {
        console.log(four);
        if (four.length !== 4) return false;

        let two = four.substring(0, 2);
        let char1st = two.substr(0, 1);
        let char2nd = two.substr(1, 1);
        let char3rd = four.substr(2, 1);
        let char4th = four.substr(3, 1);
        let piece = "";
        let digit = "";
        let number = "";
        let fromRow = -1;
        let fromCol = -1;
        let direction = X.Direction[char3rd];
        let position = X.Position[char4th];
        let toRow = -1;
        let toCol = -1;
        let via = "";
        if (X.Relative[char1st]) {
            piece = X.ChiToEng[char2nd];
            digit = X.Relative[char1st];
            number = X.ColorNum[turn][piece];
            via = "位";
        } else {
            piece = X.ChiToEng[char1st];
            digit = X.Position[char2nd];
            number = X.ColorNum[turn][piece];
            fromCol = 3 + X.ColorCol[turn][digit];
            for (fromRow = 3; fromRow < 3 + 10; fromRow++) {
                if (xiang.board[fromRow * 16 + fromCol] === number) {
                    break;
                }
            }
            via = "子";
        }
        console.log(via, two, turn, char1st, char2nd, piece, digit, number, fromRow-3, fromCol-3, toRow-3, toCol-3, char3rd, direction, char4th, position);

        return true;
    }

    function next() {
        if (xiang.count < xiang.index) {
            xiang.count += 1;
            let four = xiang.moves[xiang.count].four;
            let turn = xiang.turn;
            if (make(four, turn)) {
                xiang.turn = xiang.turn === "b" ? "r" : "b";
            }
        }
    }

    function prev() {
        if (xiang.count >= 0) {
            xiang.count -= 1;
            xiang.turn = xiang.turn === "b" ? "r" : "b";
        }
    }

    function clear() {
        xiang = {
            board: [...X.Grids.Clear],
            infos: { FEN: X.FENs.Empty },
            count: -1,
            index: -1,
            moves: [{}],
            turn: "r",
            result: "",
        };
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
                            let offset = (row + 3) * 16 + 3 + col;
                            xiang.board[offset] = X.PieceNum[one];
                            col += 1;
                        }
                    }
                    row += 1;
                }
            }
        }
        if (parts.length > 1) {
            xiang.turn = parts[1] === "b" ? "b" : "r";
        }
    }

    return {
        version: function () {
            return Version;
        },
        start: function () {
            fenToBoard(X.FENs.Start);
        },
        empty: function () {
            fenToBoard(X.FENs.Empty);
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
        info: function () {
            return {
                fen: xiang.infos.FEN,
                count: xiang.count,
                index: xiang.index,
                four: xiang.count >= 0 ? xiang.moves[xiang.count].four : "",
            };
        },
        next: function () {
            return next();
        },
        prev: function () {
            return prev();
        },
        dump: function () {
            return xiang;
        },
        ascii: function () {
            return ascii();
        },
        digit: function () {
            return digit();
        },
    };
};

if (typeof exports !== "undefined") exports.Xiang = Xiang;

if (typeof define !== "undefined")
    define(function () {
        return Xiang;
    });
