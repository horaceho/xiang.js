const { Xiang } = require('./xiang.js')
const xiang = new Xiang()
const readline = require('readline');
interface = readline.createInterface(process.stdin, process.stdout);

prefix = '> ';
interface.setPrompt(prefix, prefix.length);
interface.prompt();
interface.on('line', function (line) {
    text = line.trim();
    switch (text) {
        case 'hello':
            console.log(text + ' world!');
            break;
        case 'ascii':
            xiang.ascii();
            break;
        case 'empty':
            xiang.empty();
            xiang.ascii();
            break;
        case 'start':
            xiang.start();
            xiang.ascii();
            break;
        case 'version':
            console.log(xiang.version());
            break;
        case 'exit':
            console.log('Bye!');
            process.exit(0);
            break;
        default:
            console.log(text);
            break;
    }
    interface.setPrompt(prefix, prefix.length);
    interface.prompt();
}).on('close', function () {
    console.log('Bye!');
    process.exit(0);
});
