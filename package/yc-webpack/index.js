/**
 * 默认支持的 loader
 * 1. babel-loader
 * 2. css-loader
 * 3. less-loader
 * 4. file-loader
 * 5. babel-loader（js 相关的 loader） 必须写在webpack 的配置文件中下，不然找不到 
 */
const styleConfig = require("./cssConfig/index.js");

module.exports = {

    // 需要的 loader 部分
    loader: [
        styleConfig.lessConfig.less,  // less 和 css loader
    ],

    // 需要的 plugins 的部分
    plugin: [
        ...styleConfig.plugin
    ]
}