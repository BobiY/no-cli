// less-loader 配置文件
// modifyVars 传入的变量是放在所有文件的最低端解析的，所以会覆盖同名的所有变量
// globalVars 传入的变量是放在所有文件的最顶端解析的，所以会被同名的变量覆盖
// 主题可以通过配置 theme 进行文件或者对象的读取
// javascriptEnabled 允许在 less 文件中内联可执行的脚本（less 3.X 以后默认为 false，需要手动开启）
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    less: {
        test: /\.(le|c)ss$/,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
                loader: "postcss-loader",
                options: {
                    config: {
                        path: path.resolve(__dirname, "./postcss.config.js") // dirname 是必须的，不然识别不到当前文件夹下的 postcss 的配置文件
                    }
                }
            },
            { 
                loader: "less-loader",
                options: { 
                    sourceMap: true, // 是否需要源文件地图
                    modifyVars: {}, // 设置主图色（这个可在运行时更改，作为网站换肤的备选方案）
                    globalVars: {}, // 开始解析前已经设置好
                    javascriptEnabled: true, // 官网不建议开启
                }
            } 
        ],
        exclude: "/node_modules/",  // 排除文件夹，提高编译速度
    }
}