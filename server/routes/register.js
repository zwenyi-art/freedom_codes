const express = require("express");
const router = express.Router();
const authController = require("../controllers/registerController");
router.post("/", authController.handleRegister);
module.exports = router;
