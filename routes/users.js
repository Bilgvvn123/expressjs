const router = require("express").Router();
const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 1, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	message: "15 minutand ni 1 udaa handah bolomjtoi",
	// store: ... , // Use an external store for consistency across multiple server instances.
});

const { createUser, login } = require("../controllers/users");

// http://localhost:2030/users
router.route("/").post(limiter, createUser);

// http://localhost:2030/auth/login
router.route("/login").post(login);

module.exports = router;
