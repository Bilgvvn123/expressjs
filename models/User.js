const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

module.exports = mongoose.model("users", UserSchema);
