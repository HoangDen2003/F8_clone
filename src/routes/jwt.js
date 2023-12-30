const jwtController = require("../app/controllers/JWTController");
const express = require("express");
const router = express.Router();

router.post("/register", jwtController.register);
router.post("/login", jwtController.login);
router.post("/logout", jwtController.logout);
router.post("/refresh-token", jwtController.refresh_token);

module.exports = router;
