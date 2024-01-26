const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, "Ta username hesgiig buglunu vv"],
		maxlength: [100, "Hamgiin urtdaa 100 temdeg orson baina"],
	},
	password: {
		type: String,
		required: [true, "Ta password hesgiig buglunu vv"],
		maxlength: [150, "Hamgiin 100 urtdaa baina"],
	},
	email: {
		type: String,
		required: [true, "Ta email hesgiig buglunu vv"],
		unique: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

UserSchema.methods.checkPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getJWT = function () {
	const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});

	return token;
};

module.exports = mongoose.model("users", UserSchema);
// npm i jsonwebtoken
