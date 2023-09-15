const coursesController = require("../app/controllers/CoursesController");
const express = require("express");
const router = express.Router();

router.get("/:slug", coursesController.show);

module.exports = router;
