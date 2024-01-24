const log = (req, res, next) => {
	console.log(new Date().magenta);
	next();
};

module.exports = log;
