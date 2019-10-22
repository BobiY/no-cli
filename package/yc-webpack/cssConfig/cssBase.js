// 只是用参数是 loader 时的 就是的基础配置
/**
 * style-loader 将 css 样式使用 <style> 标签插入 DOM 中
 * css-loader 解释 @import 和 url() ，然后 import/require() 后再解析(resolve)它们
 * mini-css-extract-plugin 将样式单独提取成文件
 * sass-loader 将 sass 代码编译成 css 代码
 * node-sass 提供了Node.js与LibSass（流行的样式表预处理器Sass的C版本）的绑定。 它使您能够以惊人的速度通过连接中间件自动将.scss文件本地编译为css。 
 * css-cleanup-webpack-plugin 清除无用的 css 规则
 * autoprefixer postcss-loader 给 css 的某些特性添加浏览器前缀
 * pxtorem 添加支持
 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssCleanupPlugin = require('css-cleanup-webpack-plugin');
const devMode = process.env.NODE_ENV !== "production"; // 检测当前的开发状态
const autoprefixer = require('autoprefixer');

module.exports = {
    plugin: [
        new MiniCssExtractPlugin({ // 开发环境需要吗？
            filename: devMode ? "[name].css" : "[name].[hash].css",
            chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
            ignoreOrder: false,
        }),
        new CssCleanupPlugin(), // 开发环境不需要，生产环境需要 ？
        autoprefixer
    ]
}