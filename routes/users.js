const router = require("express").Router();

const { createUser, login } = require("../controllers/users");

// http://localhost:2030/users
router.route("/").post(createUser);

// http://localhost:2030/users/login
router.route("/login").post(login);

// jwt jsonwebtoken
module.exports = router;
