const express = require("express");
const router = express.Router();
const controller = require("../controllers/exampleController");

router.get("/", (req, res) => controller.getExamples(req, res));

module.exports = router;
