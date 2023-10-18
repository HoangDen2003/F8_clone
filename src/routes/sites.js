const express = require("express");
const router = express.Router();
const siteController = require("../app/controllers/SitesController");
const route = require("./routes");

router.use("/learning_path", siteController.learning_path);

router.use("/search", siteController.search);

router.use("/news", siteController.news);

router.use("/", siteController.home);

module.exports = router;
