// node_modules
const router = require("express").Router();

// controllers
const { authController } = require("../controllers");

// utils
const { checkAuth } = require("../utils");

router.post("/signin", authController.signin);
router.post("/google", authController.signinGoogle);
router.post("/signup", authController.signup);
router.get("/me", checkAuth, authController.me);

module.exports = router;
