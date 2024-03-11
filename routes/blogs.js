const express = require("express");
const { protect } = require("../middlewares/protect");

const {
	getBlogs,
	getBlog,
	createBlog,
	deleteBlog,
	likeBlog,
	uploadBlogPhoto,
} = require("../controllers/blogs");

const router = express.Router();

// http://localhost:2030/blogs
router.route("/").get(getBlogs).post(protect, createBlog);

// http://localhost:3000/blogs/:id
router.route("/:id").get(getBlog).delete(protect, deleteBlog);

// http://localhost:3000/blogs/:id/like
router.route("/:id/like").put(protect, likeBlog);

// http://localhost:3000/blogs/:id/photo
router.route("/:id/photo").put(protect, uploadBlogPhoto);

module.exports = router;
