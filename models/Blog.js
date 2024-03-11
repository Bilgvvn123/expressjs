const mongoose = require("mongoose");
// npm i mongoose
const BlogSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: String,
	photo: {
		type: String,
		default: "no-photo.png",
	},
	createdUser: {
		type: mongoose.Types.ObjectId,
		ref: "Users",
	},
	category: {
		type: mongoose.Types.ObjectId,
		ref: "Category",
		required: [true, "Category-oo songono uu"],
	},
	likes: [
		{
			type: mongoose.Types.ObjectId,
			ref: "users",
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("blogs", BlogSchema);
