// node_modules
const router = require("express").Router();

// controllers
const { usersController } = require("../controllers");

// utils
const { checkAuth } = require("../utils");

router.get("/me", checkAuth, usersController.me);
router.put("/user", checkAuth, usersController.updateUser);

// router.post("/blog", checkAuth, blogsController.createBlog);
// router.get("/blogs", checkAuth, blogsController.readBlogs);
// router.get("/blog/:id", checkAuth, blogsController.readBlog);
// router.put("/blog", checkAuth, blogsController.updateBlog);
// router.delete("/blog", checkAuth, blogsController.deleteBlog);

module.exports = router;
