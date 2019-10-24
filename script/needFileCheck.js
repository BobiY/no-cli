// 必要文件检测
/**
 * 只要在启动应用之前检测 src/index 是否存在，不存在则退出
 * 允许在命令后加上入口文件的相对路径，以检测文件是否存在
 */
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const program = require('commander');
function isNeedTs(flge) {
    const currentPath = process.cwd();
    const step = path.sep;
    const configFile = `${currentPath}${step}tsconfig.json`;
    if ( flge ) {
        fs.access( path.resolve(configFile), err => {
            if ( err ) {
                console.log(`current file folder has not ${chalk.red("tsconfig.json")}, you should create it~`);
                console.log(chalk.blue(`you can use <no -c> to create tsconfig.json at you root file folder`))
                process.exit();
            }
        } );
    }
}

function createTsConfig() {
    // 自动创建默认的 tsconfig.json 文件 创建好以后退出，重新启动生效
    fs.readFile(path.resolve(__dirname, "../tsconfig.json"), function (err, data) { // 先读取本地的默认配置文件
        if (err) {
            console.error(err);
            process.exit();
        }
        fs.writeFile(path.resolve(process.cwd(), "tsconfig.json"), data, function(err) { // 在将其写入目标文件夹下
            if (err) {
                console.error(err);
                process.exit();
            }
         });
        process.exit();
     });
}
module.exports = function canRunServer(callback) {

    // 设置命令行命令
    program
        .version('0.0.1')
        .option('-e, --entry [entry]', 'app entry file')
        .option("-t, --ts [typescript]", "use typescript")
        .option("-c, --create [create]", "create tsconfig.json at root file folder")
        .parse(process.argv);

    // 创建默认的 tsconfig.json
    if ( program.create ) {
        createTsConfig();
    }

    // 获得入口文件(加入webpack 的入口文件中)
    const entryFile = program.entry || "./src/index.js";

    // 检测入口文件是否存在
    fs.access(path.resolve(entryFile), err => {
        if ( err ) {
            const currentPath = process.cwd();
            const step = path.sep;
            console.log(`${chalk.red(`${currentPath}${step}src${step}index.js`)} is not exist please create it or set self entry`);
            console.log(chalk.blue(`you can use <no -h> to know more info~`));
            process.exit();
            return;
        }
        isNeedTs(program.typescript);
        callback(entryFile);
    })
}