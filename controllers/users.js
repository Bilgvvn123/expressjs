const User = require("../models/User");
const bcrypt = require("bcrypt");

// register
exports.createUser = async (req, res) => {
	const { password, username, email } = req.body;

	try {
		if (!username || !password || !email)
			return res.status(400).json({
				succes: false,
				error: "talbaraa bvren buglunu vv",
			});

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const userData = { ...req.body, password: hashedPassword };

		const user = await User.create(userData);

		if (!user)
			return res.status(400).json({
				succes: false,
				error: "hereglegchiig bvrtgej cadsangvi",
			});

		return res.status(200).json({
			success: true,
			user,
		});
	} catch (err) {}
};

// login
