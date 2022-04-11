// node_modules
const QueryBuilder = require("node-querybuilder");

// config
const { DATABASE_CONFIG } = require("../config");

// const CONNECTION = new QueryBuilder(DATABASE_CONFIG, "mysql", "pool");
// const DATABASE = await CONNECTION.get_connection();
const DATABASE = new QueryBuilder(DATABASE_CONFIG, "mysql", "pool");

module.exports = DATABASE;
