const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
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
module.exports = {
    access: function (configFile) {
        return new Promise( (resolve,reject) => {
            fs.access( path.resolve(configFile), err => {
                if ( err ) {
                    console.log(`current file folder has not ${chalk.red("tsconfig.json")}, you should create it~`);
                    console.log(chalk.blue(`you can use <no -c> to create tsconfig.json at you root file folder`))
                    resolve({isNeedCreate: true});
                    return ;
                } else {
                    resolve({isNeedCreate: false});
                }
            } );
        } );
    },
    readFile: function(filePath) {
        return new Promise( ( resolve, reject ) => {
            fs.readFile( path.resolve(filePath), (err, data) => {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(data);
                }
            } )
        } )
    },
    writeFile: function(filePath, fileName) {
        return new Promise( ( resolve, reject ) => {
            fs.writeFile( path.resolve(filePath), fileName, err => {
                if ( err ) {
                    reject(err);
                } else {
                    resolve({success: true});
                }
            } )
        } )
    }
}