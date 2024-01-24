// npm i morgan rotating-file-stream
// npm i bcrypt

var express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const connectDb = require("./config/dbConnect");
const blogsRoutes = require("./routes/blogs");
const usersRoutes = require("./routes/users");

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
app.use(express.json());
app.use(log);
app.use(morgan("combined", { stream: accessLogStream }));
app.use("/blogs", blogsRoutes);
app.use("/users", usersRoutes);

app.listen(port, () => {
	console.log(`Manai server ${port} port deer aslaa.`.rainbow.bold);
});
