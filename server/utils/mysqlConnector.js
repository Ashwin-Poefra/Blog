// node_modules
const QueryBuilder = require("node-querybuilder");

// config
const { DATABASE_CONFIG } = require("../config");

const DATABASE = new QueryBuilder(DATABASE_CONFIG, "mysql", "pool");

module.exports = DATABASE;
