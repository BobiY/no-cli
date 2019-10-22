// 注册 mock 数据
const fs = require("fs");
const path = require("path");
const apiMocker = require('mocker-api');
module.exports = function getMockerConfig(app) {
    fs.access(path.resolve('./mocker/index.js'), err => {
        if (!err) {
            apiMocker(app, path.resolve('./mocker/index.js')); // 注册 mock 数据，开发模式下需要 可选的关闭
        }
    })
}
