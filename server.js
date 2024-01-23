// npm i morgan rotating-file-stream
// npm i bcrypt

var express = require("express");
var morgan = require("morgan");
var path = require("path");
var rfs = require("rotating-file-stream");
const colors = require("colors");
const dotenv = require("dotenv");

const connectDb = require("./config/dbConnect");
const blogsRoutes = require("./routes/blogs");
const usersRoutes = require("./routes/users");

const port = process.env.PORT || 2030;
// env
dotenv.config({
	path: "./config/config.env",
});

// database
connectDb();

// app
const app = express();

var accessLogStream = rfs.createStream("access.log", {
	interval: "1d", // rotate daily
	path: path.join(__dirname, "log"),
});

const log = (req, res, next) => {
	console.log("Hello bi uur func ajillahaas ni umnu ajilcihlaa.!");
	console.log(new Date());
	token = "dsabdah";
	next();
};

// const login = (req, res, next) => {
// 	// req.token = "token";
// 	console.log("login");

// 	next();
// };

// const authorize = (req, res, next) => {
// 	if (!req.token)
// 		return res.json({
// 			error: "ta login hiine vv!",
// 		});

// 	next();
// };

const manaljaw = (req, res, next) => {
	req.name = "dasda";

	next();
};

// middlewares
app.use(express.json());
// app.use(login);
// app.use(authorize);
app.use(log);
app.use(morgan("combined", { stream: accessLogStream }));
app.use("/blogs", blogsRoutes);
app.use("/users", usersRoutes);

app.listen(port, () => {
	console.log(`Manai server ${port} port deer aslaa.`.rainbow.bold);
});
