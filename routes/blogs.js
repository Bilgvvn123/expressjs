const express = require("express");
const { protect } = require("../middlewares/protect");

const {
	getBlogs,
	getBlog,
	createBlog,
	deleteBlog,
} = require("../controllers/blogs");

const router = express.Router();

// http://localhost:2030/blogs
router.route("/").get(protect, getBlogs).post(createBlog);

// http://localhost:3000/blogs/:id
router.route("/:id").get(getBlog).delete(deleteBlog);

module.exports = router;
