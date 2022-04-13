// node_modules
const express = require("express");

// setups
const { backendSetup, databaseSetup } = require("./setup");

const app = express();

databaseSetup(() => {
    backendSetup(app);

    app.use("/", (req, res, next) => {
        res.status(200).json({
            message: "Server is running!",
        });
    });
});
