#!/usr/bin/env node
const program = require("commander");
const child = require("child_process");
const start = require("./server.js");
const detect = require("detect-port");
const inquirer = require('react-dev-utils/inquirer');
const chalk = require("chalk");
const canRunServer = require("./script/needFileCheck.js");
const question = require("./script/question.js");
const DEFAULT_PORT = question.DEFAULT_PORT; // 默认端口号
// 初始化执行函数
function init(entryFile) {

    // 检测默认端口是否被占用
    detect(DEFAULT_PORT, ( err, _port ) => { 
        if ( DEFAULT_PORT === _port ) {
            start(DEFAULT_PORT);
            return ;
        }
        // 如果端口被占用，则询问是否在新的端口开启服务
        inquirer.prompt([question.tsQuestion, question.postQuestion]).then( ({useTs, changePort}) => {
            console.log(changePort, useTs)
            if ( changePort ) {
                start(_port, entryFile);
            }
        }, err => {
            console.log("err", err)
        } )
    });
}
canRunServer(init);