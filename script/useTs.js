/**
 * 1. 询问是否需要 ts
 * 2. 根据选择的情况判断是否需要创建 tsconfig.json
 * 3. 检测 tsconfig.json 文件的存在性，不存在则创建
 * 4. 将 webpack 的 ts 配置整合进去  
 */
const inquirer = require('react-dev-utils/inquirer');
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const { tsQuestion, createConfig } = require("./question.js");
const nfs = require("../package/nodeToPromiase/newFs.js");

async function createTsConfig() {
    // 自动创建默认的 tsconfig.json 文件 创建好以后退出，重新启动生效
    try {
        const data = await nfs.readFile(path.resolve(__dirname, "../tsconfig.json"));
        const result = await nfs.writeFile(path.resolve(process.cwd(), "tsconfig.json"));
    } catch (err) {
        console.error(err);
        chalk.red("File write failed, please try again!");
        process.exit();
    }
}
module.exports = async function useTs() {
    const { useTs } = await inquirer.prompt([tsQuestion]);
    if ( useTs ) {
        const currentPath = process.cwd();
        const step = path.sep;
        const configFile = `${currentPath}${step}tsconfig.json`;
        const fileStatus = await nfs.access(configFile);
        const { createFile } = await inquirer.prompt([createConfig]); 
        if ( fileStatus.isNeedCreate && createFile ) { // tsconfig.json 不存在且同意新建时才会创建
            createTsConfig();
        }
    }
    return Promise.resolve().then( () => ({useTs}) );
}