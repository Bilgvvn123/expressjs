// npm i express colors dotenv

const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");

const connectDb = require("./config/dbConnect");
const blogsRoutes = require("./routes/blogs");

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
app.use("/blogs", blogsRoutes);

app.listen(port, () => {
	console.log(`Manai server ${port} port deer aslaa.`.rainbow.bold);
});
