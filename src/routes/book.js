const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/", (req, res) => bookController.find(req, res));

router.post("/", (req, res) => bookController.create(req, res));

router.patch("/:id", (req, res) => bookController.update(req, res));

router.delete("/:id", (req, res) => bookController.destroy(req, res));

module.exports = router;
