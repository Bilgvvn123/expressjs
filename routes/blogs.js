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
router.route("/").get(getBlogs).post(protect, createBlog);

// http://localhost:3000/blogs/:id
router.route("/:id").get(getBlog).delete(protect, deleteBlog);

module.exports = router;
