// node_modules
const express = require("express");
const path = require("path");

// setups
const { backendSetup, databaseSetup } = require("./setup");

const app = express();

databaseSetup(() => {
    backendSetup(app);

    app.use(express.static(path.join(__dirname, "public")))
        .set("views", path.join(__dirname, "views"))
        .set("view engine", "ejs")
        .get("/", (req, res) => res.render("pages/index"));
});
