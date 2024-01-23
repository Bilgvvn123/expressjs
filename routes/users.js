const router = require("express").Router();

const { createUser } = require("../controllers/users");

// http://localhost:2030/users
router.route("/").post(createUser);

module.exports = router;
