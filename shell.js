const { Xiang } = require("./xiang.js");
const xiang = new Xiang();
const readline = require("readline");
interface = readline.createInterface(process.stdin, process.stdout);

prefix = "> ";
interface.setPrompt(prefix, prefix.length);
interface.prompt();
interface
    .on("line", function (line) {
        let {
            groups: { key, value },
        } = /(?<key>\w*)\s*(?<value>.*)/gm.exec(line.trim());
        switch (key) {
            case "hello":
                console.log(`${key} "${value}"!`);
                break;
            case "ascii":
                xiang.ascii();
                break;
            case "moves":
                xiang.moves();
                break;
            case "empty":
                xiang.empty();
                xiang.ascii();
                break;
            case "start":
                xiang.start();
                xiang.ascii();
                break;
            case "version":
                console.log(xiang.version());
                break;
            case "load":
                xiang.load(value);
                xiang.ascii();
                break;
            case "fen":
                console.log(xiang.fen());
                break;
            case "turn":
                console.log(xiang.turn());
                break;
            case "info":
                console.log(xiang.info());
                break;
            case "next":
                xiang.next();
                console.log(xiang.info());
                break;
            case "prev":
                xiang.prev();
                console.log(xiang.info());
                break;
            case "dump":
                console.log(xiang.dump());
                break;
            case "exit":
                console.log("Bye!");
                process.exit(0);
                break;
            default:
                if (key) console.log(`${key} ${value}`);
                break;
        }
        interface.setPrompt(prefix, prefix.length);
        interface.prompt();
    })
    .on("close", function () {
        console.log("Bye!");
        process.exit(0);
    });
