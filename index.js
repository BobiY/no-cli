#!/usr/bin/env node
const program = require("commander");
const child = require("child_process");
const webpackConfig = require("./webpack.config.js");
const start = require("./server.js");
const detect = require("detect-port");
const inquirer = require('react-dev-utils/inquirer');
const chalk = require("chalk");
const getProcessForPort = require('react-dev-utils/getProcessForPort');
const canRunServer = require("./script/needFileCheck.js");
const DEFAULT_PORT = 3000; // 默认端口号
// console.log(module.paths);
// 初始化执行函数
function init() {

    // 检测默认端口是否被占用
    detect(DEFAULT_PORT, ( err, _port ) => { 
        if ( DEFAULT_PORT === _port ) {
            start(DEFAULT_PORT);
            return ;
        }
        const existingProcess = getProcessForPort(DEFAULT_PORT);
        const message = chalk.yellow('\nSomething is already running on port ' + DEFAULT_PORT + '.' + (existingProcess ? ' Probably:\n  ' + existingProcess : '') + '\n\nWould you like to run the app on another port instead?');
        const question = {
            type: 'confirm',
            name: 'changePort',
            message,
            default: false
        };

        // 如果端口被占用，则询问是否在新的端口开启服务
        inquirer.prompt([question]).then( ({changePort}) => {
            if ( changePort ) {
                start(_port);
            }
        }, err => {
            console.log("err", err)
        } )
    });
}
canRunServer(init);