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
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password)
			return res.status(400).json({
				succes: false,
				error: "Ta email eswel passwordoo damjuulna uu",
			});

		// select * from User where email=""
		const user = await User.findOne({ email }).select("+password");
		console.log(user);

		if (!user)
			return res.status(400).json({
				succes: false,
				error: "Ta email eswel passwordoo shalgana uu",
			});

		const ok = user.checkPassword(password);

		if (!ok)
			return res.status(400).json({
				succes: false,
				error: "Ta passwordoo dahin shalgana uu",
			});

		return res.status(200).json({
			succes: true,
			user,
			token: "",
		});
	} catch (err) {
		return res.status(500).json({
			succes: false,
			error: err,
		});
	}
};
