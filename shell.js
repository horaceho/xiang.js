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
                console.log(xiang.ascii());
                break;
            case "index":
                console.log(xiang.index());
                break;
            case "digit":
                console.log(xiang.digit());
                break;
            case "moves":
                console.log(xiang.moves());
                break;
            case "grids":
                console.log(xiang.grids());
                break;
            case "empty":
                xiang.empty();
                console.log(xiang.ascii());
                break;
            case "start":
                xiang.start();
                console.log(xiang.ascii());
                break;
            case "version":
                console.log(xiang.version());
                break;
            case "load":
                xiang.load(value);
                break;
            case "open":
                xiang.open(value);
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
