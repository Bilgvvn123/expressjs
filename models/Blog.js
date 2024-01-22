const mongoose = require("mongoose");
// npm i mongoose
const BlogSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("blogs", BlogSchema);
