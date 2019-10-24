const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const OpenBower = require("open-browser-webpack-plugin");  // 打开默认浏览器
const ProcessBar = require("progress-bar-webpack-plugin");  // 用百分比显示打包进度
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); // 优化命令行显示
const chalk = require("chalk");

module.exports = function config(port, ip){
    return {
        entry: './src/index.js',
        devtool: "cheap-module-eval-source-map",
        output: {
            filename: "bundle.js",
            path: path.resolve("./dist")
        },
        mode: "development",
        stats: 'errors-only',
        resolveLoader: {
            modules: [
                path.resolve(__dirname, 'node_modules'), // 指定当前目录下的 node_modules 优先查找
                path.resolve('node_modules'), // 如果有一些类库是放在一些奇怪的地方的，你可以添加自定义的路径或者目录
            ]
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"]
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: [require.resolve("@babel/preset-env")],
                                plugins: [require.resolve("@babel/plugin-transform-runtime")],
                                cacheDirectory: true
                            }
                        }
                    ], 
                    include: [
                        "./src/",
                        "./mocker/"
                    ]
                },
                { 
                    test: /\.tsx?$/,
                    loader: "awesome-typescript-loader",
                    exclude: /node_modules/,
                    include: [
                        "./src/",
                        "./mocker/"
                    ]
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "my-cmd",
                filename: "./dist/index.html", // 文件输出路径
                template: "./index.html"  // 模板文件路径
            }), 
            // new OpenBower({url: "http://localhost:3000", browser:"chrome"}), // 默认用谷歌浏览器打开
            new ProcessBar({
                clear: false // 达到 100 时不清除这个状态
            }),
            new FriendlyErrorsWebpackPlugin({
                clearConsole: true,
                compilationSuccessInfo:{
                    notes:[
                        "App running at:",
                        `  - Local: ${chalk.blue(`http://localhost:${port}/`)} (copied to clipboard)`,
                        `  - Network: ${chalk.blue(`http://${ip}:${port}/ \n`)}`
                    ]
                }
            })
        ]
    };
}