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
	createdUser: {
		type: mongoose.Types.ObjectId,
		ref: "Users",
	},
});

module.exports = mongoose.model("blogs", BlogSchema);
