// 必要文件检测
/**
 * 只要在启动应用之前检测 src/index 是否存在，不存在则退出
 * 允许在命令后加上入口文件的相对路径，以检测文件是否存在
 */
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const program = require('commander');
module.exports = function canRunServer(callback) {
    program
        .version('0.0.1')
        .option('-e, --entry [entry]', 'app entry file')
        .parse(process.argv);
    const entryFile = program.entry || "./src/index.js";
    fs.access(path.resolve(entryFile), err => {
        if ( err ) {
            const currentPath = process.cwd();
            const step = path.sep;
            console.log(`${chalk.red(`${currentPath}${step}src${step}index.js`)} is not exist please create it or set self entry`);
            console.log(chalk.blue(`you can use <no -h> to know more info~`));
            process.exit();
            return;
        }
        callback();
    })
}