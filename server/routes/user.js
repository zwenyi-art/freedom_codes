const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const singboxConfigController = require("../controllers/singboxConfigController");
router.get("/userLists", userController.getAllUsers);
router.get("/", userController.getUser);
router.post("/", userController.addCoins);


module.exports = router;
