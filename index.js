#!/usr/bin/env node
const detect = require('detect-port');
const inquirer = require('react-dev-utils/inquirer');
const chalk = require('chalk');
const start = require('./server.js');
const canRunServer = require('./script/needFileCheck.js');
const question = require('./script/question.js');
const useTs = require('./script/useTs.js');

const { DEFAULT_PORT } = question; // 默认端口号
// 初始化执行函数
async function init(entryFile) {
  try {
    const { canUseTs } = await useTs();
    const startParam = {
      port: DEFAULT_PORT,
      entryFile,
      canUseTs,
    };
    // 检测默认端口是否被占用
    const port = await detect(DEFAULT_PORT);
    if (DEFAULT_PORT === port) {
      start(startParam);
      return false;
    }
    try {
      const { changePort } = await inquirer.prompt([question.postQuestion]);
      if (changePort) {
        startParam.port = port;
        start(startParam);
      }
    } catch (err) {
      chalk.red('An error occurred~, please try again or contact us~');
    }
  } catch (err) {
    chalk.red('An error occurred~, please try again or contact us~');
    process.exit();
  }
  return Promise.resolve().then(() => ({ isOk: true }));
}
canRunServer(init);
