#!/usr/bin/env node
const program = require("commander");
const child = require("child_process");
const start = require("./server.js");
const detect = require("detect-port");
const inquirer = require('react-dev-utils/inquirer');
const chalk = require("chalk");
const canRunServer = require("./script/needFileCheck.js");
const question = require("./script/question.js");
const useTs = require("./script/useTs.js");
const DEFAULT_PORT = question.DEFAULT_PORT; // 默认端口号
// 初始化执行函数
// {port, entryFile, canUseTs}
async function init(entryFile) {
    try {
        const {canUseTs} = await useTs();
        const startParam = {
            port: DEFAULT_PORT,
            entryFile: entryFile,
            canUseTs
        }
        // 检测默认端口是否被占用
        const _port = await detect(DEFAULT_PORT);
        if ( DEFAULT_PORT === _port ) {
            start(startParam);
            return ;
        } else {
            try {
                const { changePort } =  await inquirer.prompt([question.postQuestion]);
                if ( changePort ) {
                    startParam.port = _port;
                    start(startParam);
                }
            } catch (err) {
                chalk.red("An error occurred~, please try again or contact us~")
            }
        }
    } catch (err) {
        console.log(err);
    }
}
canRunServer(init);