const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, "title talbariig buglunu vv!"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("categories", CategorySchema);
