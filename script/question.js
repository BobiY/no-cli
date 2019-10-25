const chalk = require("chalk");
const getProcessForPort = require('react-dev-utils/getProcessForPort');
const DEFAULT_PORT = 3000;
const existingProcess = getProcessForPort(DEFAULT_PORT);
module.exports = {
    tsQuestion: {
        type: "confirm",
        name: "useTs",
        message: chake.yellow("\n can you use typescript?"),
        defalult: false
    },
    postQuestion: {
        type: "confirm",
        name: "changePort",
        message: chalk.yellow('\nSomething is already running on port ' + DEFAULT_PORT + '.' + (existingProcess ? ' Probably:\n  ' + existingProcess : '') + '\n\nWould you like to run the app on another port instead?');,
        default: false
    },
    DEFAULT_PORT: DEFAULT_PORT
}