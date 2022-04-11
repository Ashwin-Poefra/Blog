// node_modules
const router = require("express").Router();

// sub routes
const authRoute = require("./auth.route");

router.use("/auth", authRoute);

module.exports = router;
