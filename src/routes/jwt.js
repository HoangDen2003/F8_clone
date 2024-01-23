const jwtController = require("../app/controllers/JWTController");
const express = require("express");
const router = express.Router();
const {
  verifyAccessToken,
  verifyRefreshToken,
} = require("../middlewares/jwt_service");

router.post("/register", jwtController.register);
router.post("/login", jwtController.login);
router.delete("/logout", jwtController.logout);
router.post("/refresh-token", jwtController.refresh_token);
router.get("/getlist", verifyAccessToken, jwtController.getList);

module.exports = router;
