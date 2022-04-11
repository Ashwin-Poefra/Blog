const path = require("path");
const LOGGER = require("logger").createLogger(
    path.join(__dirname, "../logs/development.log")
);

// const LOGGER = () => {};

// LOGGER.prototype.info = (message) => {
//     logger.info(message);
//     console.info(message);
// };

module.exports = LOGGER;
