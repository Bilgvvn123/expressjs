const express = require("express");

const router = express.Router();

const { getCategories, createCategory } = require("../controllers/category");

// http://localhost:2030/api/v1/categories
router.route("/").get(getCategories).post(createCategory);

module.exports = router;
