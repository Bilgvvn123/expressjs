// npm i mongoose
const mongoose = require("mongoose");

const connectDb = async () => {
	if (mongoose.connection.readyState >= 1) return;

	await mongoose.connect(process.env.MONGODB_URI);
	console.log(mongoose.connection.host.green.bold);
};

module.exports = connectDb;
