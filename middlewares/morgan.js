var path = require("path");
var rfs = require("rotating-file-stream");

exports.accessLogStream = rfs.createStream("access.log", {
	interval: "1d", // rotate daily
	path: path.join("C:/Users/Dell/Desktop/nodejs/expressjs", "/log"),
});
