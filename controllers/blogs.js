const Blog = require("../models/Blog");

exports.getBlogs = async (req, res) => {
	console.log(req.name);
	console.log(req.cookies);
	try {
		// select * from blogs
		const blogs = await Blog.find();

		if (!blogs)
			return res.status(400).json({
				success: false,
				blogs: "data bhq bna.",
			});

		return res.status(200).json({
			success: true,
			blogs,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			error: err,
		});
	}
};

exports.getBlog = async (req, res) => {
	const { id } = req.params;
	console.log(req.params);

	try {
		const blog = await Blog.findById(id).populate(
			"likes",
			"username email -_id"
		);

		if (!blog)
			return res.status(400).json({
				success: false,
				error: "id-gaa shalgana uu",
			});

		return res.status(200).json({
			success: true,
			blog,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			error: err,
		});
	}
};

exports.createBlog = async (req, res) => {
	try {
		const blog = await Blog.insertMany({
			...req.body,
			createdUser: req.erkagiinHuwiinDugaar,
		});

		console.log(req.erkagiinHuwiinDugaar);

		if (!blog)
			return res.status(400).json({
				success: false,
				error: "data nemegdsengvi.",
			});

		return res.status(200).json({
			success: true,
			blog: "amjilttai nemegdlee",
			data: blog,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			error: err,
		});
	}
};

exports.deleteBlog = async (req, res) => {
	const { id } = req.params;

	try {
		const deletedBlog = await Blog.findByIdAndDelete(id);

		if (!deletedBlog)
			return res.status(400).json({
				success: false,
				error: "id-gaa shalgana uu",
			});

		return res.status(200).json({
			success: true,
			deletedBlog,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			error: err,
		});
	}
};

exports.uploadBlogPhoto = async (req, res) => {
	const file = req.files.ganaa;

	if (!file.mimetype.startsWith("image"))
		return res.status(400).json({
			success: false,
			message: "Ta zurgiin file oruulna uu",
		});

	if (file.size > process.env.UPLOAD_FILE_SIZE)
		return res.status(400).json({
			success: false,
			message: "Tanii zuragnii file-n hemjee 200mb-s ih baina",
		});

	file.name = `photo_${req.params.id}.${file.name.split(".")[1]}`;

	file.mv(process.env.UPLOAD_FILE_PATH + `/${file.name}`, (err) => {
		if (err) console.log("=>", err);
	});

	const blog = await Blog.updateOne(
		{ _id: req.params.id },
		{ $set: { photo: file.name } }
	);

	if (!blog)
		return res.status(400).json({
			success: false,
			message: "Blogiin zurag bairshuulagdsangvi",
		});

	res.status(200).json({
		success: true,
		message: `${file.name} zurag amjilttai upload hiigdlee`,
		blog,
	});
};

exports.likeBlog = async (req, res) => {
	const { id } = req.params;

	try {
		const blog = await Blog.findOne({ _id: id });
		if (!blog)
			return res.status(400).json({
				success: false,
				error: "id-gaa shalgana uu",
			});

		// if (blog.createdUser === req.loggedInUser.userId)
		// 	return res.status(400).json({
		// 		success: false,
		// 		error: "Ta uuriin blog deer like darah bolomjgvi!",
		// 	});

		if (!blog.likes.includes(req.loggedInUser.userId)) {
			await blog.updateOne({ $push: { likes: req.loggedInUser.userId } });

			return res.status(200).json({
				success: true,
				message: `${req.loggedInUser.userId} idtai herglegch like darlaa`,
			});
		} else {
			await blog.updateOne({ $pull: { likes: req.loggedInUser.userId } });

			return res.status(200).json({
				success: true,
				message: `${req.loggedInUser.userId} idtai herglegch unlike darlaa`,
			});
		}
	} catch (err) {
		console.log(err);
	}

	res.end();
};
