const { Xiang } = require("./xiang.js");
const xiang = new Xiang();

console.log(xiang.version());

xiang.load("games/许银川让九子对聂棋圣.pgn");
xiang.ascii();
console.log(xiang.info());
// xiang.next();
// xiang.ascii();
// console.log(xiang.info());
// xiang.next();
// xiang.ascii();
// console.log(xiang.info());
// xiang.next();
// xiang.ascii();
// console.log(xiang.info());
// xiang.next();
// xiang.ascii();
// console.log(xiang.info());
// xiang.next();
// xiang.ascii();
// console.log(xiang.info());
// xiang.next();
// xiang.ascii();
// console.log(xiang.info());
// xiang.digit();
// xiang.index();
