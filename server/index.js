// node_modules
const express = require("express");

// setups
const { backendSetup, databaseSetup } = require("./setup");

const app = express();

databaseSetup(() => {
    // backendSetup(app);
});

app.listen(8080, () => {
    console.log("app listening");

    app.get("*", (req, res, next) => {
        res.status(200).json({
            message: "hello",
        });
    });
});
