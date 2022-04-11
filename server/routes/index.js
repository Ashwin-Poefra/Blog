// node_modules
const router = require("express").Router();

// sub routes
const authRoute = require("./auth.route");
const usersRoute = require("./users.route");
const blogsRoute = require("./blogs.route");

router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/blogs", blogsRoute);

module.exports = router;
