const lessConfig = require("./lessLoader.js");
const plugins = require("./cssBase.js");
module.exports = {
    lessConfig: lessConfig,
    plugin: [
        ...plugins.plugin
    ]
}