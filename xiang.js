const fs = require("fs");

var Xiang = function () {
    // prettier-ignore
    const X = {
        "Grids": {
            "Clear": [
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
        "ChiToEng": {
            "將": "k", "将": "k", "帥": "k", "帅": "k",
            "仕": "a", "士": "a",
            "相": "b", "象": "b",
            "傌": "n", "馬": "n", "马": "n",
            "俥": "r", "車": "r", "硨": "r", "车": "r",
            "炮": "c", "砲": "c", "包": "c",
            "兵": "p", "卒": "p",
            "前": "1",
            "中": "2",
            "后": "2", "後": "2",
            "一": "1", "１": "1", "1": "1",
            "二": "2", "２": "2", "2": "2",
            "三": "3", "３": "3", "3": "3",
            "四": "4", "４": "4", "4": "4",
            "五": "5", "５": "5", "5": "5",
            "六": "6", "６": "6", "6": "6",
            "七": "7", "７": "7", "7": "7",
            "八": "8", "８": "8", "8": "8",
            "九": "9", "９": "9", "9": "9",
            "平": '=',
            "進": '+', "进": '+',
            "退": '-',
        },
        "EngToChi": {
            "r": "紅",
            "b": "黑", "w": "黑",
        },
        "SideDigit": {
            "r": { // 紅
                "k": 16, "a": 17, "b": 18, "e": 18, "n": 19, "h": 19, "r": 20, "c": 21, "p": 22,
            },
            "b": { // 黑
                "k":  8, "a":  9, "b": 10, "e": 10, "n": 11, "h": 19, "r": 12, "c": 13, "p": 14,
            },
        },
        "SideCol": {
            "r": [0, 8, 7, 6, 5, 4, 3, 2, 1, 0],
            "b": [0, 0, 1, 2, 3, 4, 5, 6, 7, 8],
        },
        "PieceDigit": {
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
        "Direction": {
            "平": '=',
            "進": '+', "进": '+',
            "退": '-',
        },
        "MoveIndexAB": {
            "a4-5": [168, 183],
            "a4+5": [200, 183],
            "a5-4": [183, 200],
            "a5+4": [183, 168],
            "a5-6": [183, 198],
            "a5+6": [183, 166],
            "a6-5": [166, 183],
            "a6+5": [198, 183],
            "b1-3": [171, 201],
            "b1+3": [171, 137],
            "b3-1": [137, 171],
            "b3+1": [201, 171],
            "b3-5": [137, 167],
            "b3+5": [201, 167],
            "b5-3": [167, 201],
            "b5+3": [167, 137],
            "b5-7": [167, 197],
            "b5+7": [167, 133],
            "b7-5": [133, 167],
            "b7+5": [197, 167],
            "b7-9": [133, 163],
            "b7+9": [197, 163],
            "b9-7": [163, 197],
            "b9+7": [163, 133],
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
    };

    const Version = "0.0.6";

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
    };

    function clear() {
        xiang = {
            board: [...X.Grids.Clear],
            infos: { FEN: X.FENs.Empty },
            count: -1,
            index: -1,
            moves: [{}],
            turn: "r",
            remark: "",
            result: "",
        };
    };

    function load(filename) {
        clear();
        var text = fs.readFileSync(filename, "utf8");
        let regex =
            /(?<setup>\[.+\])|(?<note>{[\S\s]*?})|(?<result>\*|\d-\d|\d\/\d-\d\/\d)|(?<moves>.+)/gm;
        let results = text.matchAll(regex);
        let turn = "r";
        for (let result of results) {
            if (result.groups.setup !== undefined) {
                info = result.groups.setup.replace(/\[|\]/g, "");
                chunks = info.split(/\s+/);
                key = chunks.shift();
                value = chunks.join(" ");
                xiang.infos[key] = value.replace(/^"|"$/g, "");
                if (key.toUpperCase() === "FEN") {
                    fenToBoard(value);
                    turn = xiang.turn;
                }
            } else if (result.groups.note !== undefined) {
                note = result.groups.note.replace(/\{|\}/g, "");
                if (xiang.index < 0) {
                    xiang.remark += xiang.remark.length > 0 ? "\n" : "";
                    xiang.remark += note;
                } else {
                    xiang.moves[xiang.index]["note"] = note;
                }
            } else if (result.groups.result !== undefined) {
                xiang.result = result.groups.result;
            } else if (result.groups.moves !== undefined) {
                let fours = result.groups.moves
                    .trim()
                    .replace(/(\d+\.?\s+)/g, "");
                let split = fours.split(/\s+/g);
                for (let four of split) {
                    if (four.length == 4) {
                        xiang.index += 1;
                        xiang.moves[xiang.index] = {
                            chi: four,
                            eng: chiToEng(four),
                            turn: turn,
                        };
                        turn = turn === "b" ? "r" : "b";
                    }
                }
            }
        }
    }

    function ascii() {
        const Digits = "１２３４５６７８９";
        const Soujis = "九八七六五四三二一";
        const Reset = "\x1b[0m";
        const Dimmer = "\x1b[2m";
        const Normal = "\x1b[0m";
        const Bright = "\x1b[1m";
        const Red = "\x1b[31m";
        const White = "\x1b[37m";

        var header = Digits;
        var footer = Soujis;
        var ascii = "\n";
        for (let row = 3; row < 3 + 10; row++) {
            for (let col = 3; col < 3 + 9; col++) {
                let offset = (row - 3) * 9 + col - 3;
                value = xiang.board[row * 16 + col];
                if (value > 1) {
                    ascii += (value < 16 ? White : Red);
                    ascii += X.Names[value];
                    ascii += White;
                } else {
                    ascii += Dimmer;
                    ascii += X.Asciis[offset]
                    ascii += Normal;
                }
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
                digit += value.toString().padStart(4, " ");
            }
            digit += "\n";
        }

        console.log(digit);
    }

    function index() {
        let index = "";
        for (let row = 3; row < 3 + 10; row++) {
            for (let col = 3; col < 3 + 9; col++) {
                value = row * 16 + col;
                index += value.toString().padStart(4, " ");
            }
            index += "\n";
        }

        console.log(index);
    }

    function moves() {
        for (let move of xiang.moves) {
            console.log(`${move.chi ?? ""} ${move.turn ?? ""} ${move.eng ?? ""} {${move.note ?? ""}}`);
        }
    }

    function flip(index) {
        return 254 - index;
    }

    function make(move) {
        let piece = -1;
        let from = -1;
        let to = -1;
        let fromTo = X.MoveIndexAB[move.eng]; // 仕象
        if (fromTo) {
            from = (move.turn === "r") ? fromTo[0] : flip(fromTo[0]);
            to = (move.turn === "r") ? fromTo[1] : flip(fromTo[1]);
            piece = xiang.board[from];
        } else {
            let fromRow = -1;
            let fromCol = -1;
            let toRow = -1;
            let toCol = -1;
            let index = -1;
            if (X.Relative[move.chi[0]]) { // 前中後二三四五
                piece = move.eng[1];
                let match = X.Relative[move.chi[0]];
                let count = 0;
                let number = X.SideDigit[move.turn][piece];
                if (move.turn === "r") {
                    Red:
                    for (fromCol = 0; fromCol < 10; fromCol++) {
                        for (fromRow = 0; fromRow < 10; fromRow++) { // from top to bottom
                            let offset = offsetFrom(fromRow, fromCol);
                            if (xiang.board[offset] === number) {
                                count += 1; // found one
                                if (count === match) {
                                    from = offset;
                                    index = 9 - fromCol;
                                    break Red;
                                }
                            }
                        }
                    }
                } else {
                    Black:
                    for (fromCol = 0; fromCol < 10; fromCol++) {
                        for (fromRow = 9; fromRow <= 0; fromRow--) { // from bottom to top
                            let offset = offsetFrom(fromRow, fromCol);
                            if (xiang.board[offset] === number) {
                                count += 1; // found one
                                if (count === match) {
                                    from = offset;
                                    index = fromCol + 1;
                                    break Black;
                                }
                            }
                        }
                    }
                }
            } else {
                piece = move.eng[0];
                index = X.Position[move.chi[1]];
                let number = X.SideDigit[move.turn][piece];
                fromCol = X.SideCol[move.turn][index];
                for (fromRow = 0; fromRow < 10; fromRow++) {
                    let offset = offsetFrom(fromRow, fromCol);
                    if (xiang.board[offset] === number) {
                        from = offsetFrom(fromRow, fromCol);
                        break;
                    }
                }
            }

            let direction = move.eng[2];
            let value = X.Position[move.chi[3]];
            if (piece === "n") {
                let diff = (Math.abs(index - value) === 1) ? 2 : 1;
                if (direction === "+") {
                    toRow = fromRow + ((move.turn === "r") ? -diff : diff);
                } else {
                    toRow = fromRow - ((move.turn === "r") ? -diff : diff);
                }
                toCol = (move.turn === "r") ? 9 - value : value - 1;
                console.log(move.chi.substr(0, 2), move.chi.substr(2, 2), piece, direction, value, fromRow, fromCol, toRow, toCol, diff);
            } else {
                if (direction == '=') { // 平
                    toRow = fromRow;
                    toCol = ((move.turn === "r") ? 9 - value : value - 1);
                } else if (direction == '+') { // 進
                    toRow = fromRow += ((move.turn === "r") ? -value : value);
                    toCol = fromCol;
                } else if (direction == '-') { // 退
                    toRow = fromRow -= ((move.turn === "r") ? -value : value);
                    toCol = fromCol;
                }
            }
            to = offsetFrom(toRow, toCol);
        }

        if (from !== -1 && to !== -1) {
            xiang.board[to] = xiang.board[from];
            xiang.board[from] = 1;
        }
    }

    function next() {
        if (xiang.count < xiang.index) {
            xiang.count += 1;
            make(xiang.moves[xiang.count]);
        }
    }

    function prev() {
        if (xiang.count >= 0) {
            xiang.count -= 1;
        }
    }

    function isInGrid(row, col) {
        return row >= 0 && row < 10 && col >= 0 && col < 9;
    }

    function offsetFrom(row, col) {
        return (row + 3) * 16 + 3 + col;
    }

    function chiToEng(chi) {
        let eng = chi.split('').map((one) => X.ChiToEng[one]).join('');
        return eng;
    }

    function fenToBoard(fen) {
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
                            let offset = offsetFrom(row, col);
                            let digit = X.PieceDigit[one];
                            if (digit > 0) {
                                xiang.board[offset] = digit;
                                col += 1;
                            }
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
                chi: xiang.count >= 0 ? xiang.moves[xiang.count].chi : "",
                eng: xiang.count >= 0 ? xiang.moves[xiang.count].eng : "",
                turn: xiang.count >= 0 ? xiang.moves[xiang.count].turn : "",
                note: xiang.count >= 0 ? xiang.moves[xiang.count].note : "",
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
        index: function () {
            return index();
        },
    };
};

if (typeof exports !== "undefined") exports.Xiang = Xiang;

if (typeof define !== "undefined")
    define(function () {
        return Xiang;
    });
