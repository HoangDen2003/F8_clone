const express = require("express");
const router = express.Router();
const siteController = require("../app/controllers/SitesController");
const { isLogged } = require("../middlewares/checkAuth");
// const route = require("./routes");

router.get("/authentication", siteController.authentication);

router.get("/learning_path", isLogged, siteController.learning_path);

router.get("/search", isLogged, siteController.search);

router.get("/news", isLogged, siteController.news);

router.get("/home", isLogged, siteController.home);

router.get("/main", siteController.mainhome);

router.get("/", siteController.mainhome);

module.exports = router;
