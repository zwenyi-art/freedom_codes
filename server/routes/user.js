const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/userLists", userController.getAllUsers);
router.get("/", userController.getUser);
router.post("/", userController.addCoins);
module.exports = router;
