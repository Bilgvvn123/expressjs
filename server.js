// npm i morgan rotating-file-stream
// npm i bcrypt

var express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const hpp = require("hpp");
const fileupload = require("express-fileupload");

// db
const connectDb = require("./config/dbConnect");

// routes
const blogsRoutes = require("./routes/blogs");
const usersRoutes = require("./routes/users");
const categoriesRoutes = require("./routes/category");

const log = require("./middlewares/log");
const { accessLogStream } = require("./middlewares/morgan");

const port = process.env.PORT || 2030;
// env
dotenv.config({
	path: "./config/config.env",
});

// database
connectDb();

// app
const app = express();

// middlewares
// app.use(hpp);
app.use(cookieParser());
app.use(fileupload());
app.use(express.json());
app.use(log);
app.use(morgan("combined", { stream: accessLogStream }));
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/blogs", blogsRoutes);
app.use("/api/v1/auth", usersRoutes);

const server = app.listen(port, () => {
	console.log(`Manai server ${port} port deer aslaa.`.rainbow.bold);
});

server.on("unhandledRejection", (err, promise) => {
	console.log(err);
});
