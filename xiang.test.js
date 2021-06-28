const { Xiang } = require("./xiang.js");
const xiang = new Xiang();

console.log(xiang.version());

xiang.load("games/许银川让九子对聂棋圣.pgn");
console.log(xiang.info());
xiang.ascii();

let last = process.argv.length > 2 ? process.argv[2] : 3;
for (let count = 0; count < last; count++) {
    xiang.next();
    console.log(xiang.info());
    xiang.ascii();
}

// xiang.digit();
// xiang.index();
