const Category = require("../models/Category");

exports.getCategories = async (req, res) => {
	try {
		const categories = await Category.find();

		if (!categories)
			return res.json({
				success: false,
				error: "Data baihq baina",
			});

		return res.json({
			success: true,
			categories,
		});
	} catch (e) {
		console.log(e);
	}
};

exports.createCategory = async (req, res) => {
	console.log("hello");
	try {
		const newCategory = await Category.create(req.body);

		if (!newCategory)
			return res.json({
				success: false,
				error: "Data nemegdsengvi",
			});
		return res.json({
			success: true,
			newCategory,
		});
	} catch (e) {
		console.log(e);
	}
};
