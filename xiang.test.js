const { Xiang } = require("./xiang.js");
const xiang = new Xiang();

console.log(xiang.version());

xiang.load("games/许银川让九子对聂棋圣.pgn");
console.log(xiang.info());
xiang.ascii();

xiang.next();
console.log(xiang.info());
xiang.ascii();

xiang.next();
console.log(xiang.info());
xiang.ascii();

xiang.next();
console.log(xiang.info());
xiang.ascii();

// xiang.digit();
// xiang.index();
