const webpack = require("webpack");
const openBrowser = require("react-dev-utils/openBrowser");
const chalk = require("chalk");
const config = require('./webpack.config.js');
const mockerConfig = require("./script/getMockerConfig.js"); 
const loader = require("./package/yc-webpack");
const WebpackDevServer = require("webpack-dev-server");
const clearConsole = require("react-dev-utils/clearConsole");  // 清理控制台

module.exports = function start(port) { // config 读取文件的方式获得

    // 重置 webpack config 的配置项
    config.module.rules.push(...loader.loader);
    config.plugins.push( ...loader.plugin );

    // 获取编译配置项
    const compiler = webpack(config);

    console.log(`info: ${chalk.blue("server is start")} at ${chalk.red(__dirname)}`);

    // 配置开发服务器
    const app = new WebpackDevServer(compiler, {
        disableHostCheck: true,
        compress: true,
        clientLogLevel: 'none',
        contentBase: "./dist",
        hot: true,
        publicPath: config.output.publicPath,
        quiet: true, // 不打印编译时的运行信息
        watchOptions: {
            ignored: /node_modules/ // 需要排除监听的文件夹
        },
        before(app){
            mockerConfig(app); // 注册 mock 数据
        },
        proxy: {} // 设置开发代理
    });

    // 启动开发服务器
    app.listen(port, "localhost",function () {
        if (openBrowser(`http://localhost:${port}`)) {
            // 清理控制台
            clearConsole();
            console.log(chalk.blue(`webpack is runing at ${port} port`));
        }
    });
}
