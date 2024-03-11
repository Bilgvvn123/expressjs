const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
	let token = req.headers.authorization;

	if (!token)
		return res.status(401).json({
			success: false,
			error: "Tanii erkh hvrehq baina",
		});

	token = token.split(" ")[1];
	const userObj = jwt.verify(token, process.env.JWT_SECRET);

	if (!userObj)
		return res.status(401).json({
			success: false,
			error: "Hvchingvi token baina",
		});

	req.loggedInUser = userObj;
	next();
};
