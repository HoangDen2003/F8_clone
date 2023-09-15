const learningPath = require("../app/controllers/LearningPathController");
const express = require("express");
const router = express.Router();
const route = require("./routes");

router.use("/front_end", learningPath.front_end);

router.use("/back_end", learningPath.back_end);

module.exports = router;
