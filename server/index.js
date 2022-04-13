// node_modules
const express = require("express");

// setups
const { backendSetup, databaseSetup } = require("./setup");

const app = express();

databaseSetup(() => {
    backendSetup(app);
});
