const Blog = require("../models/Blog");

exports.getBlogs = async (req, res) => {
	// select * from blogs
	const blogs = await Blog.find();

	if (!blogs)
		return res.json({
			success: false,
			blogs: "data bhq bna.",
		});

	return res.status(200).json({
		success: true,
		blogs,
	});
};

exports.createBlog = async (req, res) => {
	try {
		const blog = await Blog.create(req.body);

		if (!blog)
			return res.json({
				success: false,
				error: "data nemegdsengvi.",
			});

		return res.json({
			success: true,
			blog: "amjilttai nemegdlee",
			data: blog,
		});
	} catch (err) {
		console.log(err.message.red);
	}
};

exports.getBlog = async (req, res) => {
	const { id } = req.params;
	console.log(req.params);

	try {
		const blog = await Blog.findById(id);

		if (!blog)
			return res.json({
				success: false,
				error: "id-gaa shalgana uu",
			});

		return res.json({
			success: true,
			blog,
		});
	} catch (err) {
		console.log(err);
	}
};

exports.deleteBlog = async (req, res) => {
	const { id } = req.params;

	try {
		const deletedBlog = await Blog.findByIdAndDelete(id);

		if (!deletedBlog)
			return res.json({
				success: false,
				error: "id-gaa shalgana uu",
			});

		return res.json({
			success: true,
			deletedBlog,
		});
	} catch (err) {
		console.log(err);
	}
};
